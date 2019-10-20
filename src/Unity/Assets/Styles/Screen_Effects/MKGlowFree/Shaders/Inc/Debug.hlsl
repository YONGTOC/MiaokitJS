//////////////////////////////////////////////////////
// MK Glow Debug									//
//					                                //
// Created by Michael Kremmel                       //
// www.michaelkremmel.de | www.michaelkremmel.store //
// Copyright © 2019 All rights reserved.            //
//////////////////////////////////////////////////////

#ifndef MK_GLOW_DEBUG
	#define MK_GLOW_DEBUG

	#include "../Inc/Common.hlsl"

	#if defined(DEBUG_RAW_BLOOM)
		UNIFORM_SAMPLER_AND_TEXTURE_2D(_SourceTex)
		uniform float2 _SourceTex_TexelSize;
		uniform half2 _BloomThreshold;
	#else
		UNIFORM_SAMPLER_AND_TEXTURE_2D(_BloomTex)
		uniform half _BloomSpread;
		uniform half _BloomIntensity;
		uniform float _BloomBlooming;
		uniform float2 _BloomTex_TexelSize;
	#endif

	#define VertGeoOutput VertGeoOutputAdvanced

	VertGeoOutput vert (VertexInputOnlyPosition i0)
	{
		VertGeoOutput o;
		UNITY_SETUP_INSTANCE_ID(i0);
		UNITY_INITIALIZE_OUTPUT(VertGeoOutput, o);
		UNITY_INITIALIZE_VERTEX_OUTPUT_STEREO(o);

		o.pos = TransformMeshPos(i0.vertex);

		#ifdef LEGACY_BLIT
			o.uv0.xy = i0.texcoord0;
			#if UNITY_UV_STARTS_AT_TOP
				#if defined(DEBUG_RAW_BLOOM)
					if (_SourceTex_TexelSize.y < 0)
						o.uv0.xy = 1-o.uv0.xy;
				#else //DEBUG_BLOOM
					if (_BloomTex_TexelSize.y < 0)
						o.uv0.xy = 1-o.uv0.xy;
				#endif
			#endif
		#else
			o.uv0.xy = SetMeshUV(o.pos.xy);
		#endif

		#ifndef DEBUG_RAW_BLOOM
			o.uv0.zw = BLOOM_TEXEL_SIZE * _BloomSpread;
		#endif
		return o;
	}

	#define HEADER half4 frag (VertGeoOutput o) : SV_Target

	#ifdef DEBUG_RAW_BLOOM
		HEADER
		{
			UNITY_SETUP_STEREO_EYE_INDEX_POST_VERTEX(o);
			RETURN_TARGET_TEX ConvertToColorSpace(half4(LuminanceThreshold(SampleTex2D(PASS_TEXTURE_2D(_SourceTex, sampler_SourceTex), UV_0).rgb, BLOOM_THRESHOLD), 1));
		}
	#else
		HEADER
		{
			UNITY_SETUP_STEREO_EYE_INDEX_POST_VERTEX(o);
			half4 g = UpsampleHQ(PASS_TEXTURE_2D(_BloomTex, sampler_BloomTex), UV_0, BLOOM_TEXEL_SIZE * _BloomSpread) * BLOOM_INTENSITY;

			RETURN_TARGET_TEX ConvertToColorSpace(g);
		}
	#endif
#endif
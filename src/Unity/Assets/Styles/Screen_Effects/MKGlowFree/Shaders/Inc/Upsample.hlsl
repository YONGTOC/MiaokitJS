//////////////////////////////////////////////////////
// MK Glow Upsample									//
//					                                //
// Created by Michael Kremmel                       //
// www.michaelkremmel.de | www.michaelkremmel.store //
// Copyright © 2019 All rights reserved.            //
//////////////////////////////////////////////////////

#ifndef MK_GLOW_UPSAMPLE
	#define MK_GLOW_UPSAMPLE

	#include "../Inc/Common.hlsl"

	UNIFORM_SAMPLER_AND_TEXTURE_2D(_BloomTex)
	UNIFORM_SAMPLER_AND_TEXTURE_2D(_HigherMipBloomTex)
	uniform float _BloomSpread;
	uniform float2 _BloomTex_TexelSize;
	uniform float2 _HigherMipBloomTex_TexelSize;

	#define VERT_GEO_OUTPUT VertGeoOutputAdvanced
	#define BLOOM_SPREAD uv0.zw
	#define LENS_FLARE_SPREAD uv0.zw

	VERT_GEO_OUTPUT vert (VertexInputOnlyPosition i0)
	{
		VERT_GEO_OUTPUT o;
		UNITY_SETUP_INSTANCE_ID(i0);
		UNITY_INITIALIZE_OUTPUT(VERT_GEO_OUTPUT, o);
		UNITY_INITIALIZE_VERTEX_OUTPUT_STEREO(o);

		o.pos = TransformMeshPos(i0.vertex);
		o.uv0.xy = SetMeshUV(i0.vertex.xy);
		
		o.BLOOM_SPREAD = BLOOM_TEXEL_SIZE * _BloomSpread;

		return o;
	}
		
	#define HEADER FragmentOutputAuto frag (VERT_GEO_OUTPUT o)
	HEADER
	{
		UNITY_SETUP_STEREO_EYE_INDEX_POST_VERTEX(o);
		
		FragmentOutputAuto fO;
		UNITY_INITIALIZE_OUTPUT(FragmentOutputAuto, fO);

		BLOOM_RENDER_TARGET = UpsampleHQ(PASS_TEXTURE_2D(_BloomTex, sampler_BloomTex), BLOOM_UV, BLOOM_UPSAMPLE_SPREAD);
		BLOOM_RENDER_TARGET += half4(SampleTex2D(PASS_TEXTURE_2D(_HigherMipBloomTex, sampler_HigherMipBloomTex), BLOOM_UV).rgb, 0);

		return fO;
	}
#endif
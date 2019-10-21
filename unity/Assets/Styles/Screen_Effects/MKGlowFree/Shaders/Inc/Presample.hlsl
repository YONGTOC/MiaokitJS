//////////////////////////////////////////////////////
// MK Glow Pre Sample								//
//					                                //
// Created by Michael Kremmel                       //
// www.michaelkremmel.de | www.michaelkremmel.store //
// Copyright © 2019 All rights reserved.            //
//////////////////////////////////////////////////////

#ifndef MK_GLOW_PRE_SAMPLE
	#define MK_GLOW_PRE_SAMPLE

	#include "../Inc/Common.hlsl"
	
	UNIFORM_SAMPLER_AND_TEXTURE_2D(_SourceTex)
	uniform float2 _SourceTex_TexelSize;
	uniform half2 _BloomThreshold;
		
	#define HEADER FragmentOutputAuto frag (VertGeoOutputSimple o)
	HEADER
	{
		UNITY_SETUP_STEREO_EYE_INDEX_POST_VERTEX(o);
		FragmentOutputAuto fO;
		UNITY_INITIALIZE_OUTPUT(FragmentOutputAuto, fO);
		
		#ifdef RENDER_PRIORITY_QUALITY
			BLOOM_RENDER_TARGET = DownsampleHQ(PASS_TEXTURE_2D(_SourceTex, sampler_SourceTex), BLOOM_UV, SOURCE_TEXEL_SIZE);
		#else
			BLOOM_RENDER_TARGET = SampleTex2D(PASS_TEXTURE_2D(_SourceTex, sampler_SourceTex), BLOOM_UV);
		#endif
		BLOOM_RENDER_TARGET = half4(LuminanceThreshold(BLOOM_RENDER_TARGET.rgb, BLOOM_THRESHOLD), 1);
		#ifdef COLORSPACE_GAMMA
			BLOOM_RENDER_TARGET = GammaToLinearSpace4(BLOOM_RENDER_TARGET);
		#endif
	
		return fO;
	}
#endif
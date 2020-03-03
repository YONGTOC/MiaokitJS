//////////////////////////////////////////////////////
// MK Glow Downsample		 						//
//					                                //
// Created by Michael Kremmel                       //
// www.michaelkremmel.de | www.michaelkremmel.store //
// Copyright © 2019 All rights reserved.            //
//////////////////////////////////////////////////////
#ifndef MK_GLOW_DOWNSAMPLE
	#define MK_GLOW_DOWNSAMPLE

	#include "../Inc/Common.hlsl"
	
	UNIFORM_SAMPLER_AND_TEXTURE_2D(_BloomTex)
	uniform float2 _BloomTex_TexelSize;

	#define HEADER FragmentOutputAuto frag (VertGeoOutputSimple o)

	HEADER
	{
		UNITY_SETUP_STEREO_EYE_INDEX_POST_VERTEX(o);
		#ifndef COMPUTE_SHADER
			FragmentOutputAuto fO;
			UNITY_INITIALIZE_OUTPUT(FragmentOutputAuto, fO);
		#endif

		BLOOM_RENDER_TARGET = DownsampleHQ(PASS_TEXTURE_2D(_BloomTex, sampler_BloomTex), BLOOM_UV, BLOOM_TEXEL_SIZE);

		return fO;
	}
#endif
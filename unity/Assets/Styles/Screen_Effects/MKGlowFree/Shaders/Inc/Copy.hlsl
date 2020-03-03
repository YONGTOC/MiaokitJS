//////////////////////////////////////////////////////
// MK Glow Copy										//
//					                                //
// Created by Michael Kremmel                       //
// www.michaelkremmel.de | www.michaelkremmel.store //
// Copyright © 2019 All rights reserved.            //
//////////////////////////////////////////////////////

#ifndef MK_GLOW_COPY
	#define MK_GLOW_COPY

	#include "../Inc/Common.hlsl"

	UNIFORM_SAMPLER_AND_TEXTURE_2D(_SourceTex)

	#ifdef COMPUTE_SHADER
		#define HEADER [numthreads(8,8,1)] void Copy (uint2 id : SV_DispatchThreadID)
		UNIFORM_RWTEXTURE_2D(_TargetTex);
	#else
		#define HEADER half4 frag (VertGeoOutputSimple o) : SV_Target
	#endif

	HEADER
	{
		UNITY_SETUP_STEREO_EYE_INDEX_POST_VERTEX(o);
		RETURN_TARGET_TEX SAMPLE_SOURCE;
	}
#endif
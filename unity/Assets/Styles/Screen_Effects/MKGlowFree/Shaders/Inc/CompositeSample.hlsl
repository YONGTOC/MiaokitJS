//////////////////////////////////////////////////////
// MK Glow Composite Sample							//
//					                                //
// Created by Michael Kremmel                       //
// www.michaelkremmel.de | www.michaelkremmel.store //
// Copyright © 2019 All rights reserved.            //
//////////////////////////////////////////////////////
#ifndef MK_GLOW_COMPOSITE_SAMPLE
	#define MK_GLOW_COMPOSITE_SAMPLE
	
	UNITY_SETUP_STEREO_EYE_INDEX_POST_VERTEX(o);
	
	FragmentOutputAuto fO;
	UNITY_INITIALIZE_OUTPUT(FragmentOutputAuto, fO);

	#ifdef RENDER_PRIORITY_QUALITY
		half4 g = UpsampleHQ(PASS_TEXTURE_2D(_BloomTex, sampler_BloomTex), UV_0, BLOOM_COMPOSITE_SPREAD) * BLOOM_INTENSITY;
	#else
		half4 g = SampleTex2D(PASS_TEXTURE_2D(_BloomTex, sampler_BloomTex), UV_0) * BLOOM_INTENSITY;
	#endif
	
	//When using gamma space at least try to get a nice looking result by adding the glow in the linear space of the source even if the base color space is gamma
	#ifdef MK_GLOW_COMPOSITE
		#ifdef COLORSPACE_GAMMA
			g.rgb += GammaToLinearSpace(SAMPLE_SOURCE.rgb).rgb;
			RETURN_TARGET_TEX ConvertToColorSpace(g);
		#else
			g.rgb += SAMPLE_SOURCE.rgb;
			RETURN_TARGET_TEX g;
		#endif
	#else
		RETURN_TARGET_TEX ConvertToColorSpace(g);
	#endif
#endif
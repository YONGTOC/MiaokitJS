//////////////////////////////////////////////////////
// MK Glow Common									//
//					                                //
// Created by Michael Kremmel                       //
// www.michaelkremmel.de | www.michaelkremmel.store //
// Copyright © 2019 All rights reserved.            //
//////////////////////////////////////////////////////

//////////////////////////////////////////////////////
// Keyword replacement matrix                       //
// These keywords are already build-in so we can use//
// some slots to avoid reaching keyword limit (256) //
//////////////////////////////////////////////////////
// _DEBUG_RAW_BLOOM      | _EMISSION
// _DEBUG_BLOOM          | _SMOOTHNESS_TEXTURE_ALBEDO_CHANNEL_A
// _DEBUG_COMPOSITE      | EDITOR_VISUALIZATION

#ifndef MK_GLOW_COMMON
	#define MK_GLOW_COMMON

	#include "UnityCG.cginc"
	
	#ifdef UNITY_COLORSPACE_GAMMA
		#define COLORSPACE_GAMMA
	#endif
	#ifdef _GEOMETRY_SHADER
		#define GEOMETRY_SHADER
	#endif

	//Automatically prefer faster rendering on weaker hardware
	#if !defined(SHADER_API_GLES3) && !defined(SHADER_API_GLES) && !defined(_TARGET_MOBILE) && SHADER_TARGET >= 25
		#define RENDER_PRIORITY_QUALITY
	#endif

	#ifdef _COLOROVERLAY_ON
		#define LEGACY_BLIT
	#endif	

	#ifdef COMPUTE_SHADER
		uniform StructuredBuffer<float> _CArgBuffer;
	#endif

	/////////////////////////////////////////////////////////////////////////////////////////////
	// Shader Model dependent Macros
	/////////////////////////////////////////////////////////////////////////////////////////////
	#if defined(COMPUTE_SHADER) || SHADER_TARGET >= 35
		#if defined(UNITY_STEREO_INSTANCING_ENABLED) || defined(UNITY_STEREO_MULTIVIEW_ENABLED)
			#define UNIFORM_TEXTURE_2D(textureName) uniform Texture2DArray<half4> textureName;
			#define UNIFORM_SAMPLER_AND_TEXTURE_2D(textureName) uniform Texture2DArray<half4> textureName; uniform SamplerState sampler##textureName;
			#define DECLARE_TEXTURE_2D_ARGS(textureName, samplerName) Texture2DArray<half4> textureName, SamplerState samplerName
		#else
			#define UNIFORM_TEXTURE_2D(textureName) uniform Texture2D<half4> textureName;
			#define UNIFORM_SAMPLER_AND_TEXTURE_2D(textureName) uniform Texture2D<half4> textureName; uniform SamplerState sampler##textureName;
			#define DECLARE_TEXTURE_2D_ARGS(textureName, samplerName) Texture2D<half4> textureName, SamplerState samplerName
		#endif

		#define UNIFORM_TEXTURE_2D_NO_SCALE(textureName) uniform Texture2D<half4> textureName;
		#define UNIFORM_SAMPLER_AND_TEXTURE_2D_NO_SCALE(textureName) uniform Texture2D<half4> textureName; uniform SamplerState sampler##textureName;
		#define DECLARE_TEXTURE_2D_NO_SCALE_ARGS(textureName, samplerName) Texture2D<half4> textureName, SamplerState samplerName

		#define PASS_TEXTURE_2D(textureName, samplerName) textureName, samplerName
	#else
		#define UNIFORM_TEXTURE_2D(textureName) uniform sampler2D textureName;
		#define UNIFORM_SAMPLER_AND_TEXTURE_2D(textureName) uniform sampler2D textureName;
		#define DECLARE_TEXTURE_2D_ARGS(textureName, samplerName) sampler2D textureName

		#define UNIFORM_TEXTURE_2D_NO_SCALE(textureName) UNIFORM_TEXTURE_2D(textureName)
		#define UNIFORM_SAMPLER_AND_TEXTURE_2D_NO_SCALE(textureName) UNIFORM_SAMPLER_AND_TEXTURE_2D(textureName)
		#define DECLARE_TEXTURE_2D_NO_SCALE_ARGS(textureName, samplerName) DECLARE_TEXTURE_2D_ARGS(textureName, samplerName)

		#define PASS_TEXTURE_2D(textureName, samplerName) textureName
	#endif

	#ifdef UNITY_SINGLE_PASS_STEREO
		static const float4 _DEFAULT_SCALE_TRANSFORM = float4(0.5,1,0,0);
	#else
		static const float4 _DEFAULT_SCALE_TRANSFORM = float4(1,1,0,0);
	#endif

	/////////////////////////////////////////////////////////////////////////////////////////////
	// Cross compile macros direct compute & shader
	/////////////////////////////////////////////////////////////////////////////////////////////
	//Other
	#define UV_COPY o.uv0.xy
	#define SOURCE_TEXEL_SIZE AutoScaleTexelSize(_SourceTex_TexelSize)
	#define COPY_RENDER_TARGET fO.GET_COPY_RT
	#define SOURCE_UV o.uv0.xy
	#define RETURN_TARGET_TEX return
	#define SAMPLE_SOURCE SampleTex2D(PASS_TEXTURE_2D(_SourceTex, sampler_SourceTex), SOURCE_UV)
	#define RESOLUTION_SCALE _ResolutionScale
	#define UV_0 o.uv0.xy
	#define LUMA_SCALE _LumaScale
	
	//Bloom
	#define BLOOM_UV o.uv0.xy
	#define BLOOM_RENDER_TARGET fO.GET_BLOOM_RT
	#define BLOOM_THRESHOLD _BloomThreshold
	#define BLOOM_TEXEL_SIZE AutoScaleTexelSize(_BloomTex_TexelSize)
	#define BLOOM_UPSAMPLE_SPREAD o.BLOOM_SPREAD
	#define BLOOM_COMPOSITE_SPREAD o.uv0.zw
	#define BLOOM_INTENSITY _BloomIntensity
	#define BLOOMING _BloomBlooming

	/////////////////////////////////////////////////////////////////////////////////////////////
	// Features
	/////////////////////////////////////////////////////////////////////////////////////////////
	//Bloom
	#ifdef _NORMALMAP
		#define MK_BLOOM 1
		#define BLOOM_RT 0
	#endif

	//Debug Raw Bloom
	#ifdef _EMISSION
		#define DEBUG_RAW_BLOOM
	#endif

	//Debug Bloom
	#ifdef _SMOOTHNESS_TEXTURE_ALBEDO_CHANNEL_A
		#define DEBUG_BLOOM
	#endif

	/////////////////////////////////////////////////////////////////////////////////////////////
	// Sampling
	/////////////////////////////////////////////////////////////////////////////////////////////
	static const half3 REL_LUMA = half3(0.2126h, 0.7152h, 0.0722h);
	#define PI 3.14159265
	#define EPSILON 1.0e-4

	inline half4 SampleTex2D(DECLARE_TEXTURE_2D_ARGS(tex, samplerTex), float2 uv)
	{
		#if defined(COMPUTE_SHADER) || SHADER_TARGET >= 35
			#if defined(UNITY_STEREO_INSTANCING_ENABLED) || defined(UNITY_STEREO_MULTIVIEW_ENABLED)
				return tex.SampleLevel(samplerTex, float3((uv).xy, (float)unity_StereoEyeIndex), 0);
			#else
				return tex.SampleLevel(samplerTex, UnityStereoTransformScreenSpaceTex(uv), 0);
			#endif
		#else
			return tex2D(tex, UnityStereoTransformScreenSpaceTex(uv));
		#endif
	}

	inline float2 AutoScaleTexelSize(float2 texelSize)
	{
		#ifdef UNITY_SINGLE_PASS_STEREO
			texelSize.x *= 2;
			return texelSize;
		#else
			return texelSize;
		#endif
	}

	inline half4 ConvertToColorSpace(half4 color)
	{
		#ifdef COLORSPACE_GAMMA
			color.rgb = LinearToGammaSpace(color.rgb);
			return color;
		#else
			return color;
		#endif
	}

	inline half4 GammaToLinearSpace4(half4 color)
	{
		color.rgb = GammaToLinearSpace(color.rgb);
		return color;
	}

	inline half4 LinearToGammaSpace4(half4 color)
	{
		color.rgb = LinearToGammaSpace(color.rgb);
		return color;
	}

	inline half3 LuminanceThreshold(half3 c, half2 threshold)
	{		
		//brightness is defined by the relative luminance combined with the brightest color part to make it nicer to deal with the shader for artists
		//based on unity builtin brightpass thresholding
		//if any color part exceeds a value of 10 (builtin HDR max) then clamp it as a normalized vector to keep the color balance
		c = clamp(c, 0, normalize(c) * threshold.y);
		c *= 0.909;
		//half brightness = lerp(max(dot(c.r, REL_LUMA.r), max(dot(c.g, REL_LUMA.g), dot(c.b, REL_LUMA.b))), max(c.r, max(c.g, c.b)), REL_LUMA);
		//picking just the brightest color part isn´t physically correct at all, but gives nices artistic results
		half brightness = max(c.r, max(c.g, c.b));
		//forcing a hard threshold to only extract really bright parts
		half softPart = EPSILON;//threshold.x * 0.0 + EPSILON;
		return max(0, c * max(pow(clamp(brightness - threshold.x + softPart, 0, 2 * softPart), 2) / (4 * softPart + EPSILON), brightness - threshold.x) / max(brightness, EPSILON));
	}

	static const half2 DOWNSAMPLE_LQ_WEIGHT = half2(0.125, 0.03125);
	static const float4 DOWNSAMPLE_LQ_DIRECTION0 = float4(0.9, -0.9, 0.45, -0.45);
	static const float3 DOWNSAMPLE_LQ_DIRECTION1 = float3(0.9, 0.45, 0);
	//0 X 1 X 2
	//X 3 X 4 X
	//5 X 6 X 7
	//X 8 X 9 X
	//0 X 1 X 2
	inline half4 DownsampleLQ(DECLARE_TEXTURE_2D_ARGS(tex, samplerTex), float2 uv, float2 texelSize)
	{
		half3 sample0 = SampleTex2D(PASS_TEXTURE_2D(tex, samplerTex), uv + texelSize * DOWNSAMPLE_LQ_DIRECTION0.yy).rgb;
		half3 sample1 = SampleTex2D(PASS_TEXTURE_2D(tex, samplerTex), uv - texelSize * DOWNSAMPLE_LQ_DIRECTION1.zx).rgb;
		half3 sample2 = SampleTex2D(PASS_TEXTURE_2D(tex, samplerTex), uv + texelSize * DOWNSAMPLE_LQ_DIRECTION0.xy).rgb;
		half3 sample3 = SampleTex2D(PASS_TEXTURE_2D(tex, samplerTex), uv + texelSize * DOWNSAMPLE_LQ_DIRECTION0.ww).rgb;
		half3 sample4 = SampleTex2D(PASS_TEXTURE_2D(tex, samplerTex), uv + texelSize * DOWNSAMPLE_LQ_DIRECTION0.zw).rgb;
		half3 sample5 = SampleTex2D(PASS_TEXTURE_2D(tex, samplerTex), uv - texelSize * DOWNSAMPLE_LQ_DIRECTION1.xz).rgb;
		half3 sample6 = SampleTex2D(PASS_TEXTURE_2D(tex, samplerTex), uv).rgb;
		half3 sample7 = SampleTex2D(PASS_TEXTURE_2D(tex, samplerTex), uv + texelSize * DOWNSAMPLE_LQ_DIRECTION1.xz).rgb;
		half3 sample8 = SampleTex2D(PASS_TEXTURE_2D(tex, samplerTex), uv + texelSize * DOWNSAMPLE_LQ_DIRECTION0.wz).rgb;
		half3 sample9 = SampleTex2D(PASS_TEXTURE_2D(tex, samplerTex), uv + texelSize * DOWNSAMPLE_LQ_DIRECTION0.zz).rgb;
		half3 sample10 = SampleTex2D(PASS_TEXTURE_2D(tex, samplerTex), uv + texelSize * DOWNSAMPLE_LQ_DIRECTION0.yx).rgb;
		half3 sample11 = SampleTex2D(PASS_TEXTURE_2D(tex, samplerTex), uv + texelSize * DOWNSAMPLE_LQ_DIRECTION1.zx).rgb;
		half3 sample12 = SampleTex2D(PASS_TEXTURE_2D(tex, samplerTex), uv + texelSize * DOWNSAMPLE_LQ_DIRECTION0.xx).rgb;

		half4 o = half4((sample3 + sample4 + sample8 + sample9) * DOWNSAMPLE_LQ_WEIGHT.x, 1);
		o.rgb += (sample0 + sample1 + sample6 + sample5).rgb * DOWNSAMPLE_LQ_WEIGHT.y;
		o.rgb += (sample1 + sample2 + sample7 + sample6).rgb * DOWNSAMPLE_LQ_WEIGHT.y;
		o.rgb += (sample5 + sample6 + sample11 + sample10).rgb * DOWNSAMPLE_LQ_WEIGHT.y;
		o.rgb += (sample6 + sample7 + sample12 + sample11).rgb * DOWNSAMPLE_LQ_WEIGHT.y;

		return o;
	}
	
	static const half3 DOWNSAMPLE_HQ_WEIGHT = half3(0.0833333, 0.0208333, 0.0092333);
	static const float4 DOWNSAMPLE_HQ_DIRECTION0 = float4(1.45, -1.45, 0.9, -0.9);
	static const float4 DOWNSAMPLE_HQ_DIRECTION1 = float4(1.45, -1.45, 0.45, -0.45);
	static const float2 DOWNSAMPLE_HQ_DIRECTION2 = float2(0.9, 0);
	// 0 X 1 X 2 X 3
	// X 4 X 5 X 6 X
	// 7 X 8 X 9 X 0
	// X 1 X 2 X 3 X
	// 4 X 5 X 6 X 7
	// X 8 X 9 X 0 X
	// 1 X 2 X 3 X 4
	inline half4 DownsampleHQ(DECLARE_TEXTURE_2D_ARGS(tex, samplerTex), float2 uv, float2 texelSize)
	{
		#ifdef RENDER_PRIORITY_QUALITY
			half3 sample0 = SampleTex2D(PASS_TEXTURE_2D(tex, samplerTex), uv + texelSize * DOWNSAMPLE_HQ_DIRECTION0.yx).rgb;
			half3 sample1 = SampleTex2D(PASS_TEXTURE_2D(tex, samplerTex), uv + texelSize * DOWNSAMPLE_HQ_DIRECTION1.wx).rgb;
			half3 sample2 = SampleTex2D(PASS_TEXTURE_2D(tex, samplerTex), uv + texelSize * DOWNSAMPLE_HQ_DIRECTION1.zx).rgb;
			half3 sample3 = SampleTex2D(PASS_TEXTURE_2D(tex, samplerTex), uv + texelSize * DOWNSAMPLE_HQ_DIRECTION0.xx).rgb;

			half3 sample4 = SampleTex2D(PASS_TEXTURE_2D(tex, samplerTex), uv + texelSize * DOWNSAMPLE_HQ_DIRECTION0.wz).rgb;
			half3 sample5 = SampleTex2D(PASS_TEXTURE_2D(tex, samplerTex), uv + texelSize * DOWNSAMPLE_HQ_DIRECTION2.yx).rgb;
			half3 sample6 = SampleTex2D(PASS_TEXTURE_2D(tex, samplerTex), uv + texelSize * DOWNSAMPLE_HQ_DIRECTION0.zz).rgb;

			half3 sample7 = SampleTex2D(PASS_TEXTURE_2D(tex, samplerTex), uv + texelSize * DOWNSAMPLE_HQ_DIRECTION1.yz).rgb;
			half3 sample8 = SampleTex2D(PASS_TEXTURE_2D(tex, samplerTex), uv + texelSize * DOWNSAMPLE_HQ_DIRECTION1.wz).rgb;
			half3 sample9 = SampleTex2D(PASS_TEXTURE_2D(tex, samplerTex), uv + texelSize * DOWNSAMPLE_HQ_DIRECTION1.zz).rgb;
			half3 sample10 = SampleTex2D(PASS_TEXTURE_2D(tex, samplerTex), uv + texelSize * DOWNSAMPLE_HQ_DIRECTION1.xz).rgb;

			half3 sample11 = SampleTex2D(PASS_TEXTURE_2D(tex, samplerTex), uv - texelSize * DOWNSAMPLE_HQ_DIRECTION2.xy).rgb;
			half3 sample12 = SampleTex2D(PASS_TEXTURE_2D(tex, samplerTex), uv).rgb;
			half3 sample13 = SampleTex2D(PASS_TEXTURE_2D(tex, samplerTex), uv + texelSize * DOWNSAMPLE_HQ_DIRECTION2.xy).rgb;

			half3 sample14 = SampleTex2D(PASS_TEXTURE_2D(tex, samplerTex), uv + texelSize * DOWNSAMPLE_HQ_DIRECTION1.yw).rgb;
			half3 sample15 = SampleTex2D(PASS_TEXTURE_2D(tex, samplerTex), uv + texelSize * DOWNSAMPLE_HQ_DIRECTION1.ww).rgb;
			half3 sample16 = SampleTex2D(PASS_TEXTURE_2D(tex, samplerTex), uv + texelSize * DOWNSAMPLE_HQ_DIRECTION1.zw).rgb;
			half3 sample17 = SampleTex2D(PASS_TEXTURE_2D(tex, samplerTex), uv + texelSize * DOWNSAMPLE_HQ_DIRECTION1.xw).rgb;

			half3 sample18 = SampleTex2D(PASS_TEXTURE_2D(tex, samplerTex), uv + texelSize * DOWNSAMPLE_HQ_DIRECTION0.ww).rgb;
			half3 sample19 = SampleTex2D(PASS_TEXTURE_2D(tex, samplerTex), uv - texelSize * DOWNSAMPLE_HQ_DIRECTION2.yx).rgb;
			half3 sample20 = SampleTex2D(PASS_TEXTURE_2D(tex, samplerTex), uv + texelSize * DOWNSAMPLE_HQ_DIRECTION0.zw).rgb;

			half3 sample21 = SampleTex2D(PASS_TEXTURE_2D(tex, samplerTex), uv + texelSize * DOWNSAMPLE_HQ_DIRECTION0.yy).rgb;
			half3 sample22 = SampleTex2D(PASS_TEXTURE_2D(tex, samplerTex), uv + texelSize * DOWNSAMPLE_HQ_DIRECTION1.wy).rgb;
			half3 sample23 = SampleTex2D(PASS_TEXTURE_2D(tex, samplerTex), uv + texelSize * DOWNSAMPLE_HQ_DIRECTION1.zy).rgb;
			half3 sample24 = SampleTex2D(PASS_TEXTURE_2D(tex, samplerTex), uv + texelSize * DOWNSAMPLE_HQ_DIRECTION0.xy).rgb;

			half4 color = half4((sample8 + sample9 + sample15 + sample16) * DOWNSAMPLE_HQ_WEIGHT.x, 1);

			color.rgb += (sample4 + sample5 + sample11 + sample12) * DOWNSAMPLE_HQ_WEIGHT.y;
			color.rgb += (sample5 + sample6 + sample12 + sample13) * DOWNSAMPLE_HQ_WEIGHT.y;
			color.rgb += (sample11 + sample12 + sample18 + sample19) * DOWNSAMPLE_HQ_WEIGHT.y;
			color.rgb += (sample12 + sample13 + sample19 + sample20) * DOWNSAMPLE_HQ_WEIGHT.y;

			color.rgb += (sample0 + sample1 + sample7 + sample8) * DOWNSAMPLE_HQ_WEIGHT.z;
			color.rgb += (sample1 + sample2 + sample8 + sample9) * DOWNSAMPLE_HQ_WEIGHT.z;
			color.rgb += (sample2 + sample3 + sample9 + sample10) * DOWNSAMPLE_HQ_WEIGHT.z;
			color.rgb += (sample7 + sample8 + sample14 + sample15) * DOWNSAMPLE_HQ_WEIGHT.z;
			color.rgb += (sample8 + sample9 + sample15 + sample16) * DOWNSAMPLE_HQ_WEIGHT.z;
			color.rgb += (sample9 + sample10 + sample16 + sample17) * DOWNSAMPLE_HQ_WEIGHT.z;
			color.rgb += (sample14 + sample15 + sample21 + sample22) * DOWNSAMPLE_HQ_WEIGHT.z;
			color.rgb += (sample15 + sample16 + sample22 + sample23) * DOWNSAMPLE_HQ_WEIGHT.z;
			color.rgb += (sample16 + sample17 + sample23 + sample24) * DOWNSAMPLE_HQ_WEIGHT.z;

			return color;
		#else
			return DownsampleLQ(PASS_TEXTURE_2D(tex, samplerTex), uv, texelSize);
		#endif
	}

	static const half3 UPSAMPLE_LQ_WEIGHT = half3(0.25, 0.125, 0.0625);
	static const float3 UPSAMPLE_LQ_DIRECTION = float3(1, -1, 0);
	//012
	//345
	//678
	inline half4 UpsampleLQ(DECLARE_TEXTURE_2D_ARGS(tex, samplerTex), float2 uv, float2 texelSize)
	{
		half4 s = half4(0,0,0,1);
		s.rgb += SampleTex2D(PASS_TEXTURE_2D(tex, samplerTex), uv).rgb * UPSAMPLE_LQ_WEIGHT.x;

		s.rgb += SampleTex2D(PASS_TEXTURE_2D(tex, samplerTex), uv - UPSAMPLE_LQ_DIRECTION.zx * texelSize).rgb * UPSAMPLE_LQ_WEIGHT.y;
		s.rgb += SampleTex2D(PASS_TEXTURE_2D(tex, samplerTex), uv - UPSAMPLE_LQ_DIRECTION.xz * texelSize).rgb * UPSAMPLE_LQ_WEIGHT.y;
		s.rgb += SampleTex2D(PASS_TEXTURE_2D(tex, samplerTex), uv + UPSAMPLE_LQ_DIRECTION.xz * texelSize).rgb * UPSAMPLE_LQ_WEIGHT.y;
		s.rgb += SampleTex2D(PASS_TEXTURE_2D(tex, samplerTex), uv + UPSAMPLE_LQ_DIRECTION.zx * texelSize).rgb * UPSAMPLE_LQ_WEIGHT.y;

		s.rgb += SampleTex2D(PASS_TEXTURE_2D(tex, samplerTex), uv - UPSAMPLE_LQ_DIRECTION.xx * texelSize).rgb * UPSAMPLE_LQ_WEIGHT.z;
		s.rgb += SampleTex2D(PASS_TEXTURE_2D(tex, samplerTex), uv + UPSAMPLE_LQ_DIRECTION.xy * texelSize).rgb * UPSAMPLE_LQ_WEIGHT.z;
		s.rgb += SampleTex2D(PASS_TEXTURE_2D(tex, samplerTex), uv + UPSAMPLE_LQ_DIRECTION.yx * texelSize).rgb * UPSAMPLE_LQ_WEIGHT.z;
		s.rgb += SampleTex2D(PASS_TEXTURE_2D(tex, samplerTex), uv + UPSAMPLE_LQ_DIRECTION.xx * texelSize).rgb * UPSAMPLE_LQ_WEIGHT.z;

		return s;
	}

	static const half UPSAMPLE_HQ_WEIGHT[5] = {0.16, 0.08, 0.04, 0.02, 0.01};
	static const float4 UPSAMPLE_HQ_DIRECTION0 = float4(1, -1, 2, -2);
	static const float3 UPSAMPLE_HQ_DIRECTION1 = float3(2, -2, 0);
	static const float3 UPSAMPLE_HQ_DIRECTION2 = float3(1, -1, 0);
	//01234
	//56789
	//01234
	//56789
	//01234
	inline half4 UpsampleHQ(DECLARE_TEXTURE_2D_ARGS(tex, samplerTex), float2 uv, float2 texelSize)
	{
		#ifdef RENDER_PRIORITY_QUALITY
			half4 s = half4(0,0,0,1);
			s.rgb += SampleTex2D(PASS_TEXTURE_2D(tex, samplerTex), uv).rgb * UPSAMPLE_HQ_WEIGHT[0];
			
			s.rgb += SampleTex2D(PASS_TEXTURE_2D(tex, samplerTex), uv - UPSAMPLE_HQ_DIRECTION2.zx * texelSize).rgb * UPSAMPLE_HQ_WEIGHT[1];
			s.rgb += SampleTex2D(PASS_TEXTURE_2D(tex, samplerTex), uv - UPSAMPLE_HQ_DIRECTION2.xz * texelSize).rgb * UPSAMPLE_HQ_WEIGHT[1];
			s.rgb += SampleTex2D(PASS_TEXTURE_2D(tex, samplerTex), uv + UPSAMPLE_HQ_DIRECTION2.xz * texelSize).rgb * UPSAMPLE_HQ_WEIGHT[1];
			s.rgb += SampleTex2D(PASS_TEXTURE_2D(tex, samplerTex), uv + UPSAMPLE_HQ_DIRECTION2.zx * texelSize).rgb * UPSAMPLE_HQ_WEIGHT[1];

			s.rgb += SampleTex2D(PASS_TEXTURE_2D(tex, samplerTex), uv - UPSAMPLE_HQ_DIRECTION2.xx * texelSize).rgb * UPSAMPLE_HQ_WEIGHT[2];
			s.rgb += SampleTex2D(PASS_TEXTURE_2D(tex, samplerTex), uv + UPSAMPLE_HQ_DIRECTION2.xy * texelSize).rgb * UPSAMPLE_HQ_WEIGHT[2];
			s.rgb += SampleTex2D(PASS_TEXTURE_2D(tex, samplerTex), uv + UPSAMPLE_HQ_DIRECTION2.yx * texelSize).rgb * UPSAMPLE_HQ_WEIGHT[2];
			s.rgb += SampleTex2D(PASS_TEXTURE_2D(tex, samplerTex), uv + UPSAMPLE_HQ_DIRECTION2.xx * texelSize).rgb * UPSAMPLE_HQ_WEIGHT[2];
			s.rgb += SampleTex2D(PASS_TEXTURE_2D(tex, samplerTex), uv + UPSAMPLE_HQ_DIRECTION1.zx * texelSize).rgb * UPSAMPLE_HQ_WEIGHT[2];
			s.rgb += SampleTex2D(PASS_TEXTURE_2D(tex, samplerTex), uv + UPSAMPLE_HQ_DIRECTION1.xz * texelSize).rgb * UPSAMPLE_HQ_WEIGHT[2];
			s.rgb += SampleTex2D(PASS_TEXTURE_2D(tex, samplerTex), uv + UPSAMPLE_HQ_DIRECTION1.zy * texelSize).rgb * UPSAMPLE_HQ_WEIGHT[2];
			s.rgb += SampleTex2D(PASS_TEXTURE_2D(tex, samplerTex), uv + UPSAMPLE_HQ_DIRECTION1.yz * texelSize).rgb * UPSAMPLE_HQ_WEIGHT[2];

			s.rgb += SampleTex2D(PASS_TEXTURE_2D(tex, samplerTex), uv + UPSAMPLE_HQ_DIRECTION0.wx * texelSize).rgb * UPSAMPLE_HQ_WEIGHT[3];
			s.rgb += SampleTex2D(PASS_TEXTURE_2D(tex, samplerTex), uv + UPSAMPLE_HQ_DIRECTION0.yz * texelSize).rgb * UPSAMPLE_HQ_WEIGHT[3];
			s.rgb += SampleTex2D(PASS_TEXTURE_2D(tex, samplerTex), uv + UPSAMPLE_HQ_DIRECTION0.xz * texelSize).rgb * UPSAMPLE_HQ_WEIGHT[3];
			s.rgb += SampleTex2D(PASS_TEXTURE_2D(tex, samplerTex), uv + UPSAMPLE_HQ_DIRECTION0.zx * texelSize).rgb * UPSAMPLE_HQ_WEIGHT[3];
			s.rgb += SampleTex2D(PASS_TEXTURE_2D(tex, samplerTex), uv + UPSAMPLE_HQ_DIRECTION0.zy * texelSize).rgb * UPSAMPLE_HQ_WEIGHT[3];
			s.rgb += SampleTex2D(PASS_TEXTURE_2D(tex, samplerTex), uv + UPSAMPLE_HQ_DIRECTION0.xw * texelSize).rgb * UPSAMPLE_HQ_WEIGHT[3];
			s.rgb += SampleTex2D(PASS_TEXTURE_2D(tex, samplerTex), uv + UPSAMPLE_HQ_DIRECTION0.yw * texelSize).rgb * UPSAMPLE_HQ_WEIGHT[3];
			s.rgb += SampleTex2D(PASS_TEXTURE_2D(tex, samplerTex), uv + UPSAMPLE_HQ_DIRECTION0.wy * texelSize).rgb * UPSAMPLE_HQ_WEIGHT[3];

			s.rgb += SampleTex2D(PASS_TEXTURE_2D(tex, samplerTex), uv + UPSAMPLE_HQ_DIRECTION0.wz * texelSize).rgb * UPSAMPLE_HQ_WEIGHT[4];
			s.rgb += SampleTex2D(PASS_TEXTURE_2D(tex, samplerTex), uv + UPSAMPLE_HQ_DIRECTION0.zz * texelSize).rgb * UPSAMPLE_HQ_WEIGHT[4];
			s.rgb += SampleTex2D(PASS_TEXTURE_2D(tex, samplerTex), uv + UPSAMPLE_HQ_DIRECTION0.zw * texelSize).rgb * UPSAMPLE_HQ_WEIGHT[4];
			s.rgb += SampleTex2D(PASS_TEXTURE_2D(tex, samplerTex), uv + UPSAMPLE_HQ_DIRECTION0.ww * texelSize).rgb * UPSAMPLE_HQ_WEIGHT[4];
			
			return s;
		#else
			return UpsampleLQ(PASS_TEXTURE_2D(tex, samplerTex), uv, texelSize);
		#endif
	}

	/////////////////////////////////////////////////////////////////////////////////////////////
	// Default Shader Includes
	/////////////////////////////////////////////////////////////////////////////////////////////
	#ifndef COMPUTE_SHADER
		const static float4 SCREEN_VERTICES[3] = 
		{
			float4(-1.0, -1.0, 0.0, 1.0),
			float4(3.0, -1.0, 0.0, 1.0),
			float4(-1.0, 3.0, 0.0, 1.0)
		};

		/////////////////////////////////////////////////////////////////////////////////////////////
		// Helpers
		/////////////////////////////////////////////////////////////////////////////////////////////
		inline float4 TransformMeshPos(float4 pos)
		{
			#ifdef LEGACY_BLIT
				return UnityObjectToClipPos(pos);
			#else
				return float4(pos.xy, 0.0, 1.0);
			#endif
		}

		inline float2 SetMeshUV(float2 vertex)
		{
			float2 uv = (vertex + 1.0) * 0.5;
			#ifdef UNITY_UV_STARTS_AT_TOP
				uv = uv * float2(1.0, -1.0) + float2(0.0, 1.0);
			#endif
			return uv;
		}

		/////////////////////////////////////////////////////////////////////////////////////////////
		// In / Out Structs
		/////////////////////////////////////////////////////////////////////////////////////////////
		struct VertexInputOnlyPosition
		{
			float4 vertex : POSITION;
			#ifdef LEGACY_BLIT
				float2 texcoord0 : TEXCOORD0;
			#endif
			UNITY_VERTEX_INPUT_INSTANCE_ID
		};

		#ifdef GEOMETRY_SHADER
			struct VertexInputEmpty 
			{
				UNITY_VERTEX_INPUT_INSTANCE_ID
				UNITY_VERTEX_OUTPUT_STEREO
			};
		#endif

		struct VertGeoOutputSimple
		{
			float4 pos : SV_POSITION;
			float2 uv0 : TEXCOORD0;
			UNITY_VERTEX_OUTPUT_STEREO
		};

		struct VertGeoOutputAdvanced
		{
			float4 pos : SV_POSITION;
			float4 uv0 : TEXCOORD0;
			UNITY_VERTEX_OUTPUT_STEREO
		};

		struct VertGeoOutputPlus
		{
			float4 pos : SV_POSITION;
			float4 uv0 : TEXCOORD0;
			float2 uv1 : TEXCOORD1;
			UNITY_VERTEX_OUTPUT_STEREO
		};

		struct VertGeoOutputDouble
		{
			float4 pos : SV_POSITION;
			float4 uv0 : TEXCOORD0;
			float4 uv1 : TEXCOORD1;
			UNITY_VERTEX_OUTPUT_STEREO
		};

		/////////////////////////////////////////////////////////////////////////////////////////////
		// Vertex
		/////////////////////////////////////////////////////////////////////////////////////////////
		VertGeoOutputSimple vertSimple (VertexInputOnlyPosition i0)
		{
			VertGeoOutputSimple o;

			UNITY_SETUP_INSTANCE_ID(i0);
			UNITY_INITIALIZE_OUTPUT(VertGeoOutputSimple, o);
            UNITY_INITIALIZE_VERTEX_OUTPUT_STEREO(o);

			o.pos = TransformMeshPos(i0.vertex);
			o.uv0 = SetMeshUV(i0.vertex.xy);
			return o;
		}

		/////////////////////////////////////////////////////////////////////////////////////////////
		// Fragment Output
		/////////////////////////////////////////////////////////////////////////////////////////////
		#define COUNT_ENABLED_TARGETS MK_BLOOM + MK_COPY + MK_LENS_FLARE + MK_GLARE

		#define RENDER_TARGET(target) half4 rt##target : SV_Target##target;
		#define GET_RT(index) rt##index

		#if BLOOM_RT == 0
			#define GET_BLOOM_RT GET_RT(0)
		#endif

		#if COPY_RT == 0
			#define GET_COPY_RT GET_RT(0)
		#elif COPY_RT == 1
			#define GET_COPY_RT GET_RT(1)
		#endif

		#if LENS_FLARE_RT == 0
			#define GET_LENS_FLARE_RT GET_RT(0)
		#elif LENS_FLARE_RT == 1
			#define GET_LENS_FLARE_RT GET_RT(1)
		#elif LENS_FLARE_RT == 2
			#define GET_LENS_FLARE_RT GET_RT(2)
		#endif

		#if GLARE_RT == 0
			#define GET_GLARE0_RT GET_RT(0)
			#ifdef MK_GLOW_UPSAMPLE
				#define GET_GLARE1_RT GET_RT(1)
				#define GET_GLARE2_RT GET_RT(2)
				#define GET_GLARE3_RT GET_RT(3)
			#endif
		#elif GLARE_RT == 1
			#define GET_GLARE0_RT rt1
			#ifdef MK_GLOW_UPSAMPLE
				#define GET_GLARE1_RT GET_RT(2)
				#define GET_GLARE2_RT GET_RT(3)
				#define GET_GLARE3_RT GET_RT(4)
			#endif
		#elif GLARE_RT == 2
			#define GET_GLARE0_RT GET_RT(2)
			#ifdef MK_GLOW_UPSAMPLE
				#define GET_GLARE1_RT GET_RT(3)
				#define GET_GLARE2_RT GET_RT(4)
				#define GET_GLARE3_RT GET_RT(5)
			#endif
		#elif GLARE_RT == 3
			#define GET_GLARE0_RT GET_RT(3)
			#ifdef MK_GLOW_UPSAMPLE
				#define GET_GLARE1_RT GET_RT(4)
				#define GET_GLARE2_RT GET_RT(5)
				#define GET_GLARE3_RT GET_RT(6)
			#endif
		#endif
		
		struct FragmentOutputAuto
		{	
			#if COUNT_ENABLED_TARGETS == 2
				RENDER_TARGET(0)
				RENDER_TARGET(1)
			#elif COUNT_ENABLED_TARGETS == 3
				RENDER_TARGET(0)
				RENDER_TARGET(1)
				RENDER_TARGET(2)
			#elif COUNT_ENABLED_TARGETS == 4
				RENDER_TARGET(0)
				RENDER_TARGET(1)
				RENDER_TARGET(2)
				RENDER_TARGET(3)
			#elif COUNT_ENABLED_TARGETS == 5
				RENDER_TARGET(0)
				RENDER_TARGET(1)
				RENDER_TARGET(2)
				RENDER_TARGET(3)
				RENDER_TARGET(4)
			#elif COUNT_ENABLED_TARGETS == 6
				RENDER_TARGET(0)
				RENDER_TARGET(1)
				RENDER_TARGET(2)
				RENDER_TARGET(3)
				RENDER_TARGET(4)
				RENDER_TARGET(5)
			#else
				RENDER_TARGET(0)
			#endif
		};
	#endif
#endif
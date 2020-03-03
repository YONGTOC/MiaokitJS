//////////////////////////////////////////////////////
// MK Glow Selective Render Shader    				//
//					                                //
// Created by Michael Kremmel                       //
// www.michaelkremmel.de | www.michaelkremmel.store //
// Copyright © 2017 All rights reserved.            //
//////////////////////////////////////////////////////
Shader "Hidden/MK/Glow/SelectiveRender"
{
	SubShader 
	{
		Tags { "RenderType"="MKGlow" "Queue"="Transparent" "LightMode"="ForwardBase" }
		Blend SrcAlpha OneMinusSrcAlpha
		Pass 
		{
			ZTest LEqual  
			Fog { Mode Off }
			Cull Back
			Lighting Off
			ZWrite On

			HLSLPROGRAM
			#pragma vertex vert
			#pragma fragment frag
			#pragma fragmentoption ARB_precision_hint_fastest
			#pragma target 2.0
			#pragma multi_compile_instancing

			#pragma multi_compile _EMISSION

			#include "UnityCG.cginc"
			
			
			uniform sampler2D _MainTex;
			uniform sampler2D _EmissionMap;
			uniform half3 _EmissionColor;
			uniform fixed4 _Color;
			
			struct Input
			{
				float2 texcoord : TEXCOORD0;
				float4 vertex : POSITION;
				UNITY_VERTEX_INPUT_INSTANCE_ID
			};
			
			struct Output 
			{
				float4 pos : SV_POSITION;
				float2 uv : TEXCOORD0;
				UNITY_VERTEX_OUTPUT_STEREO
			};
			
			Output vert (Input i)
			{
				UNITY_SETUP_INSTANCE_ID(i);
				Output o;
				UNITY_INITIALIZE_OUTPUT(Output,o);
				UNITY_INITIALIZE_VERTEX_OUTPUT_STEREO(o);
				o.pos =  UnityObjectToClipPos(i.vertex);
				o.uv = i.texcoord.xy;
				return o;
			}

			fixed4 frag (Output i) : SV_TARGET
			{
				UNITY_SETUP_STEREO_EYE_INDEX_POST_VERTEX(i)
				#ifdef _EMISSION
					fixed4 glow = tex2D(_EmissionMap, i.uv.xy);
					glow.rgb *= _EmissionColor * glow.a;
					glow.a = tex2D(_MainTex, i.uv.xy).a * _Color.a;
					return glow;
				#else
					return fixed4(0,0,0, tex2D(_MainTex, i.uv.xy).a * _Color.a);
				#endif
			}
			ENDHLSL
		}
	}
	SubShader 
	{
		Tags { "RenderType"="MKGlowLegacy" "Queue"="Transparent" "LightMode"="ForwardBase"}
		Blend SrcAlpha OneMinusSrcAlpha
		Pass 
		{
			ZTest LEqual  
			Fog { Mode Off }
			Cull Back
			Lighting Off
			ZWrite On

			HLSLPROGRAM
			#pragma vertex vert
			#pragma fragment frag
			#pragma fragmentoption ARB_precision_hint_fastest
			#pragma target 2.0
			#pragma multi_compile_instancing

			#include "UnityCG.cginc"
			
			uniform sampler2D _MainTex;
			uniform sampler2D _MKGlowTex;
			uniform float4 _MKGlowTex_ST;
			uniform fixed4 _MKGlowColor;
			uniform half _MKGlowPower;
			uniform half _MKGlowTexPower;
			uniform fixed4 _Color;
			
			struct Input
			{
				float2 texcoord : TEXCOORD0;
				float4 vertex : POSITION;
				UNITY_VERTEX_INPUT_INSTANCE_ID
			};
			
			struct Output 
			{
				float4 pos : SV_POSITION;
				float2 uv : TEXCOORD0;
				UNITY_VERTEX_OUTPUT_STEREO
			};
			
			Output vert (Input i)
			{
				UNITY_SETUP_INSTANCE_ID(i);
				Output o;
				UNITY_INITIALIZE_OUTPUT(Output,o);
				UNITY_INITIALIZE_VERTEX_OUTPUT_STEREO(o);
				o.pos =  UnityObjectToClipPos(i.vertex);
				o.uv = i.texcoord.xy;
				return o;
			}

			fixed4 frag (Output i) : SV_TARGET
			{
				UNITY_SETUP_STEREO_EYE_INDEX_POST_VERTEX(i)
				fixed4 glow = tex2D(_MKGlowTex, i.uv.xy);
				glow.rgb *= (_MKGlowColor * _MKGlowPower);
				glow.rgb *= glow.a;
				glow.a = tex2D(_MainTex, i.uv.xy).a * _Color.a;
				return glow;
			}
			ENDHLSL
		}
	}
	SubShader
	{
		Tags
        {
            "Queue"="Transparent"
            "IgnoreProjector"="True"
            "RenderType"="MKGlowUI"
            "PreviewType"="Plane"
            "CanUseSpriteAtlas"="True"
			"LightMode"="ForwardBase"
        }

        Stencil
        {
            Ref [_Stencil]
            Comp [_StencilComp]
            Pass [_StencilOp]
            ReadMask [_StencilReadMask]
            WriteMask [_StencilWriteMask]
        }

        Cull Off
        Lighting Off
        ZWrite Off
        ZTest [unity_GUIZTestMode]
        Blend SrcAlpha OneMinusSrcAlpha
        ColorMask [_ColorMask]

        Pass
        {
            Name "Default"
            HLSLPROGRAM
            #pragma vertex vert
            #pragma fragment frag
            #pragma target 2.0

			#pragma multi_compile __ UNITY_UI_CLIP_RECT
            #pragma multi_compile __ UNITY_UI_ALPHACLIP
			
			#define _EMISSION_ONLY

            #include "UnityCG.cginc"
            #include "UnityUI.cginc"
			#include "../Inc/UI.hlsl"

            ENDHLSL
        }
	}
	SubShader 
	{
		Tags
        {
            "Queue"="Transparent"
            "IgnoreProjector"="True"
            "RenderType"="MKGlowSprite"
            "PreviewType"="Plane"
            "CanUseSpriteAtlas"="True"
			"LightMode"="ForwardBase"
        }

		Cull Off
		Lighting Off
		ZWrite On
		Blend One OneMinusSrcAlpha

		Pass 
		{
			HLSLPROGRAM
			#pragma vertex SpriteVert
			#pragma fragment SpriteNoMainFrag
			#pragma fragmentoption ARB_precision_hint_fastest
			#pragma target 2.0
			#pragma multi_compile_instancing
            #pragma multi_compile _ PIXELSNAP_ON
            #pragma multi_compile _ ETC1_EXTERNAL_ALPHA

			#define _EMISSION_ONLY

			#include "UnityCG.cginc"
			#include "../Inc/Sprite.hlsl"
			
			ENDHLSL
		}
	}
	SubShader 
	{
		Tags { "RenderType"="Opaque" "LightMode"="ForwardBase" }
		Pass 
		{
			Fog { Mode Off }
			HLSLPROGRAM
			#pragma vertex vert
			#pragma fragment frag
			#pragma fragmentoption ARB_precision_hint_fastest
			#pragma target 2.0
			#pragma multi_compile_instancing
			
			#include "UnityCG.cginc"

			struct Input
			{
				float2 texcoord : TEXCOORD0;
				float4 vertex : POSITION;
				UNITY_VERTEX_INPUT_INSTANCE_ID
			};
			
			struct Output 
			{
				float4 pos : SV_POSITION;
				float2 uv : TEXCOORD0;
				UNITY_VERTEX_OUTPUT_STEREO
			};
			
			Output vert (Input i)
			{
				UNITY_SETUP_INSTANCE_ID(i);
				Output o;
				UNITY_INITIALIZE_OUTPUT(Output,o);
				UNITY_INITIALIZE_VERTEX_OUTPUT_STEREO(o);
				o.pos = UnityObjectToClipPos (i.vertex);
				o.uv = i.texcoord;
				return o;
			}

			fixed4 frag (Output i) : SV_TARGET
			{
				UNITY_SETUP_STEREO_EYE_INDEX_POST_VERTEX(i)
				return fixed4(0,0,0,1);
			}
			
			ENDHLSL
		}
	}
	SubShader 
	{
		Tags { "RenderType"="Transparent" "LightMode"="ForwardBase" }
		Pass 
		{
			Cull Off
			Fog { Mode Off }
			ZWrite Off
			Blend SrcAlpha OneMinusSrcAlpha
			HLSLPROGRAM
			#pragma vertex vert
			#pragma fragment frag
			#pragma fragmentoption ARB_precision_hint_fastest
			#pragma target 2.0
			#pragma multi_compile_instancing

			#include "UnityCG.cginc"

			uniform sampler2D _MainTex;
			uniform float4 _MainTex_ST;
			uniform fixed4 _Color;

			struct Input
			{
				float2 texcoord : TEXCOORD0;
				float4 vertex : POSITION;
				UNITY_VERTEX_INPUT_INSTANCE_ID
			};
			
			struct Output 
			{
				float4 pos : SV_POSITION;
				float2 uv : TEXCOORD0;
				UNITY_VERTEX_OUTPUT_STEREO
			};
			
			Output vert (Input i)
			{
				UNITY_SETUP_INSTANCE_ID(i);
				Output o;
				UNITY_INITIALIZE_OUTPUT(Output,o);
				UNITY_INITIALIZE_VERTEX_OUTPUT_STEREO(o);
				o.pos = UnityObjectToClipPos (i.vertex);
				o.uv = i.texcoord;
				return o;
			}

			fixed4 frag (Output i) : SV_TARGET
			{
				UNITY_SETUP_STEREO_EYE_INDEX_POST_VERTEX(i)
				return fixed4(0,0,0, tex2D(_MainTex, i.uv).a * _Color.a);
			}
			
			ENDHLSL
		}
	}

	SubShader 
	{
		Tags { "RenderType"="TransparentCutout" "LightMode"="ForwardBase" }
		Pass 
		{
			Fog { Mode Off }
			Blend SrcAlpha OneMinusSrcAlpha
			HLSLPROGRAM
			#pragma vertex vert
			#pragma fragment frag
			#pragma fragmentoption ARB_precision_hint_fastest
			#pragma target 2.0
			#pragma multi_compile_instancing

			uniform half _Cutoff;

			#include "UnityCG.cginc"

			struct Input
			{
				float2 texcoord : TEXCOORD0;
				float4 vertex : POSITION;
				UNITY_VERTEX_INPUT_INSTANCE_ID
			};
			
			struct Output 
			{
				float4 pos : SV_POSITION;
				float2 uv : TEXCOORD0;
				UNITY_VERTEX_OUTPUT_STEREO
			};
			
			Output vert (Input i)
			{
				UNITY_SETUP_INSTANCE_ID(i);
				Output o;
				UNITY_INITIALIZE_OUTPUT(Output,o);
				UNITY_INITIALIZE_VERTEX_OUTPUT_STEREO(o);
				o.pos = UnityObjectToClipPos (i.vertex);
				o.uv = i.texcoord;
				return o;
			}

			fixed4 frag (Output i) : SV_TARGET
			{
				UNITY_SETUP_STEREO_EYE_INDEX_POST_VERTEX(i)
				clip(_Cutoff);
				return fixed4(0,0,0,1);
			}
			
			ENDHLSL
		}
	} 
} 


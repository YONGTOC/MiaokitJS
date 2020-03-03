Shader "Hidden/Reflection"
{
    Properties
    {
        _MainTex ("Texture", 2D) = "white" {}
    }
    SubShader
    {
        // No culling or depth
        Cull Off ZWrite Off ZTest Always

        Pass
        {
            CGPROGRAM
            #pragma vertex vert
            #pragma fragment frag

            #include "UnityCG.cginc"

            struct appdata
            {
                float4 vertex : POSITION;
                float2 uv : TEXCOORD0;
            };

            struct v2f
            {
                float2 uv : TEXCOORD0;
                float4 vertex : SV_POSITION;
            };

            v2f vert (appdata v)
            {
                v2f o;
				o.vertex = UnityObjectToClipPos(v.vertex);
                o.uv = v.uv;
                return o;
            }

            sampler2D _MainTex;
			sampler2D _CameraDepthTexture;

            fixed4 frag (v2f i) : SV_Target
            {
				/// 从摄像机出发，穿过当前像素，到达远平面的射线
				float4 mRay = mul(unity_CameraInvProjection, float4((i.uv.x - 0.5) * 2.0, (i.uv.y - 0.5) * 2.0, 1.0, 1.0));
				/// 当前像素深度，并规范化到线性的[0,1]区间
				float nDepth = UNITY_SAMPLE_DEPTH(tex2D(_CameraDepthTexture, i.uv)); nDepth = Linear01Depth(nDepth);
				/// 像素对应点在摄像机空间中的坐标
				float3 mViewPos = mRay.xyz / mRay.w * nDepth;

				fixed4 col = tex2D(_MainTex, i.uv);
				col.rgb = mViewPos/100;

				return col;
				//float linear01Depth = Linear01Depth(depth); // LinearEyeDepth
				//return linear01Depth;
				//(float2(i.uv.x, i.uv.y) - 0.5) * 2.0
				//_WorldSpaceCameraPos
				// ComputeScreenPos
				// 屏幕射线加深度得到摄像机空间坐标点，再转世界坐标点
    //            fixed4 col = tex2D(_MainTex, i.uv);
    //            // just invert the colors
				////_WorldSpaceCameraPos
				//col = SAMPLE_DEPTH_TEXTURE(_CameraDepthTexture, i.uv);
				////col.rgb = depth;// 1 - col.rgb;
    //            return col;
            }
            ENDCG
        }
    }
}

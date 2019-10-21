Shader "Unlit/Tile"
{
    Properties
    {
        _MainTex ("Texture", 2D) = "white" {}
    }
    SubShader
    {
        Tags { "RenderType"="Opaque" }
        LOD 100

        Pass
        {
            CGPROGRAM
            #pragma vertex vert
            #pragma fragment frag

            #include "UnityCG.cginc"

            struct appdata
            {
				// 栅格列索引、行索引、无用值、无用值
                float4 vertex : POSITION;
            };

            struct v2f
            {
				float4 vertex : SV_POSITION;
				float3 normal : NORMAL;
                float2 uv : TEXCOORD0;
            };

			// 瓦片贴图
            sampler2D _MainTex;
			// 起始经度、起始纬度、经度跨距、纬度跨距
			float4 _LngLat;
			// 起始X坐标（米制）、起始Y坐标（米制）、瓦片大小（米制）、瓦片层级
			float4 _Tile;

            v2f vert (appdata v)
            {
				float nLon = _LngLat.x + _LngLat.z * v.vertex.x;
				float nLat = _LngLat.y + _LngLat.w * v.vertex.y;

				// 简化运算：(0.7853981633974483f + nLat * 0.5f) == (nLat + (Mathf.PI * 0.5f)) / 2;
				float nTexU = nLon * 6378137.0f;				
				float nTexV = log(tan(0.7853981633974483f + nLat * 0.5f)) * 6378137.0f;

				nTexU = (nTexU - _Tile.x) / _Tile.z;
				nTexV = (nTexV - _Tile.y) / _Tile.z;

				float nVertexY = sin(nLat);
				float nVertexX = cos(nLat) * cos(nLon);
				float nVertexZ = cos(nLat) * sin(nLon);

				v2f o;
				o.normal = float3(nVertexX, nVertexY, nVertexZ);
				o.vertex = UnityObjectToClipPos(float4(o.normal * 6378137.0f, 1.0f));
				o.normal = mul(o.normal, unity_WorldToObject);
				o.uv = float2(nTexU, nTexV);

				return o;
            }

            fixed4 frag (v2f i) : SV_Target
            {
				fixed3 mNormal = normalize(i.normal);
				fixed3 mLight = normalize(_WorldSpaceLightPos0);
				fixed3 mDiffuse = saturate(dot(mNormal, mLight));

                fixed4 mColor = tex2D(_MainTex, i.uv);
				//mColor.rgb *= mDiffuse * 2;
				
				//if (10.0f < _Tile.w)
				//{
				//	mColor.r = (_Tile.w - 10.0f) / 10;// mDiffuse;
				//	mColor.gb = 0.0f;
				//}
				//else
				//{
				//	mColor.rgb = _Tile.w / 10;// mDiffuse;
				//}

                return mColor;
            }
            ENDCG
        }
    }
}
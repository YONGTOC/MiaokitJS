Shader "Unlit/CTile"
{
    Properties
    {
        _MainTex ("Texture", 2D) = "white" {}
		_HeightTex("Texture", 2D) = "black" {}
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
                float3 uv : TEXCOORD0;
            };

			// 瓦片贴图
			sampler2D _MainTex;
			// 瓦片高度图
			sampler2D _HeightTex;

			// 左上角经度、左上角纬度、经纬度宽度、经纬度跨距
			float4 _LngLat;
			// 高度图缩放、高度图偏移X、高度图偏移Y、瓦片层级
			float4 _Tile;

			float4 CalNormal(float nTexU, float nTexV)
			{
				float4 aUV[5] = {
					{nTexU, nTexV, 0.0f, 0.0f},             // 中
					{nTexU - _LngLat.w, nTexV, 0.0f, 0.0f}, // 西
					{nTexU + _LngLat.w, nTexV, 0.0f, 0.0f}, // 东
					{nTexU, nTexV - _LngLat.w, 0.0f, 0.0f}, // 南
					{nTexU, nTexV + _LngLat.w, 0.0f, 0.0f}  // 北
				};

				float aHeight[5] = { 0.0f, 0.0f, 0.0f, 0.0f, 0.0f };

				for (int i = 0; i < 5; i++)
				{
					aUV[i].xy /= _LngLat.z;
					aUV[i].x = aUV[i].x * _Tile.x + _Tile.y;
					aUV[i].y = aUV[i].y * _Tile.x + _Tile.z;

					float4 mHeight = tex2Dlod(_HeightTex, aUV[i]);
					float nHeight = ((mHeight.r * 256 * 256 * 256) + (mHeight.g * 256 * 256) + (mHeight.b * 256)) * 0.001;
					
					aHeight[i] = nHeight;
				}

				float nLng = _LngLat.x + nTexU;
				float nLat = _LngLat.y - nTexV;

				float3 mNormal = { 0.0f, 0.0f, 0.0f };
				float3 mBinormal = { 0.0f, 0.0f, 0.0f };
				float3 mTangent = { 0.0f, 0.0f, 0.0f };

				mNormal.y = sin(nLat);
				mNormal.x = cos(nLat) * cos(nLng);
				mNormal.z = cos(nLat) * sin(nLng);

				mBinormal.y = sin(nLat);
				mBinormal.x = cos(nLat) * cos(nLng + 1.57079633);
				mBinormal.z = cos(nLat) * sin(nLng + 1.57079633);

				mTangent.y = sin(nLat + 1.57079633);
				mTangent.x = cos(nLat + 1.57079633) * cos(nLng);
				mTangent.z = cos(nLat + 1.57079633) * sin(nLng);

				float nScale = 1.0f / (_LngLat.w * 6378137.0f);
				mNormal += mBinormal * (aHeight[1] - aHeight[2]) * nScale + mTangent * (aHeight[3] - aHeight[4]) * nScale;
				normalize(mNormal);

				return float4(mNormal, aHeight[0]);
			}

            v2f vert (appdata v)
            {
				float nTexU = _LngLat.w * v.vertex.x;
				float nTexV = _LngLat.w * v.vertex.y;

				float nLng = _LngLat.x + nTexU;
				float nLat = _LngLat.y - nTexV;

				float nVertexY = sin(nLat);
				float nVertexX = cos(nLat) * cos(nLng);
				float nVertexZ = cos(nLat) * sin(nLng);

				float4 mNormal = { 0.0f, 0.0f, 0.0f, 0.0f };

				if (8 < _Tile.w)
				{
					mNormal = CalNormal(nTexU, nTexV);
					mNormal.w -= 1000.0f;
				}
				else
				{
					mNormal = float4(nVertexX, nVertexY, nVertexZ, 0.0f);
				}
				
				nTexU /= _LngLat.z;
				nTexV /= _LngLat.z;
				nTexV = 1.0f - nTexV; // 网格从左上角开始，影响贴图从左下角开始

				v2f o;
				o.vertex = UnityObjectToClipPos(float4(float3(nVertexX, nVertexY, nVertexZ) * (6378137.0f + (mNormal.w)), 1.0f));
				o.normal = mul(mNormal.xyz, unity_WorldToObject);
				o.uv = float3(nTexU, nTexV, mNormal.w);

				return o;
            }

            fixed4 frag (v2f i) : SV_Target
            {
				fixed3 mNormal = normalize(i.normal);
				fixed3 mLight = normalize(_WorldSpaceLightPos0);
				fixed3 mDiffuse = saturate(dot(mNormal, mLight));

				fixed4 mColor = tex2D(_MainTex, i.uv.xy);
				mColor.rgb *= mDiffuse;
				
                return mColor;
            }
            ENDCG
        }
    }
}
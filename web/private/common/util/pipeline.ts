
MiaokitJS.ShaderLab.Pipeline = {
    RenderTarget: [null,
        /// 1.绘制不透明物体颜色缓存
        { ID: 1, Format: "RGBA16_FLOAT" },
        /// 2.绘制半透明物体颜色缓存/轮廓与高光颜色缓存
        { ID: 2, Format: "RGBA16_FLOAT" },
        /// 3.绘制不透明物体深度缓存
        { ID: 3, Format: "D24_UNORM" },
        /// 4.高光输入缓存，降采样，需生成MIPMAP
        { ID: 4, Format: "RGBA16_FLOAT", Width: 1024, Height: 1024, Params: ["LINEAR_MIPMAP_LINEAR", "LINEAR", "CLAMP_TO_EDGE", "CLAMP_TO_EDGE"] },
        /// 5.高光模输出缓存，升采样512->X
        { ID: 5, Format: "RGBA16_FLOAT" },
        /// 6.高光模糊缓存，升采样256->512
        { ID: 6, Format: "RGBA16_FLOAT", Width: 512, Height: 512, Params: ["LINEAR", "LINEAR", "CLAMP_TO_EDGE", "CLAMP_TO_EDGE"] },
        /// 7.高光模糊缓存，升采样128->256
        { ID: 7, Format: "RGBA16_FLOAT", Width: 256, Height: 256, Params: ["LINEAR", "LINEAR", "CLAMP_TO_EDGE", "CLAMP_TO_EDGE"] },
        /// 8.高光模糊缓存，升采样64->128
        { ID: 8, Format: "RGBA16_FLOAT", Width: 128, Height: 128, Params: ["LINEAR", "LINEAR", "CLAMP_TO_EDGE", "CLAMP_TO_EDGE"] },
        /// 9.半透明与不透明混合颜色缓存
        { ID: 9, Format: "RGBA16_FLOAT" },
    ],

    Resource: [null,
        /// 1.星空背景贴图
        { ID: 1, TYPE: "2D", URL: "./data/star.jpg" },
        /// 2.默认贴图
        { ID: 2, TYPE: "2D", URL: "./data/default.png" }
    ],

    PassList: [
        // 0、->1，清空画布，绘制天空盒。
        {
            Name: "绘制天空盒",
            Type: "Clear",
            Mask: ["Opaque"],
            RenderTarget: [1, 0],
            ClearTarget: {
                Color: { r: 0.198, g: 0.323, b: 0.561, a: 1.0 }
            },
        },
        // 1、->1，绘制不透明物体。
        {
            Name: "绘制不透明物体",
            Type: "Render",
            Mask: ["Opaque"],
            RenderTarget: [1, 3],
            ClearTarget: {
                Depth: 1.0
            },
            Depth: {
                Func: "LEQUAL",
                Write: true
            },
        },
        // 2、->2，绘制半透明物体。
        {
            Name: "绘制半透明物体",
            Type: "Render",
            Mask: ["Transparent"],
            RenderTarget: [2, 3],
            ClearTarget: {
                Color: { r: 0.0, g: 0.0, b: 0.0, a: 1.0 },
            },
            Depth: {
                Func: "LEQUAL",
                Write: false
            },
            Blend: {
                ColorFunc: "FUNC_ADD",
                ColorSrc: "ONE",
                ColorDest: "ONE",
                AlphaFunc: "FUNC_ADD",
                AlphaSrc: "ZERO",
                AlphaDest: "SRC_ALPHA",
            }
        },
        // 3、1+2->9，混合不透明与半透明缓存。
        {
            Name: "混合不透明与半透明缓存",
            Type: "Postprocess",
            Mask: [],
            RenderTarget: [9, 0],
            Shader: "Combine",
            SetUniforms: function (aAttr, gl: WebGLRenderingContext) {
                let aTarget = MiaokitJS.ShaderLab.Pipeline.RenderTarget;

                aAttr[8]("u_MainTex", [0, aTarget[1].Handle, 0, 0]);
                aAttr[8]("u_MinorTex", [0, aTarget[2].Handle, 0, 0]);
            }
        },
        // 4、9->2，后期处理，提取物体轮廓，抗锯齿，高亮。
        {
            Name: "提取物体轮廓",
            Type: "Postprocess",
            Mask: [],
            RenderTarget: [2, 3],
            Shader: "EdgeDetection",
            SetUniforms: function (aAttr, gl: WebGLRenderingContext) {
                let aTarget = MiaokitJS.ShaderLab.Pipeline.RenderTarget;

                aAttr[8]("u_MainTex", [0, aTarget[9].Handle, 0, 0]);
                aAttr[8]("u_InvTexSize", aTarget[9].Size);
            }
        },
        // 5、2->4，后期处理，提取画面高光部分。
        {
            Name: "提取画面高光部分",
            Type: "Postprocess",
            Mask: [],
            RenderTarget: [4, 0],
            Shader: "HDR",
            SetUniforms: function (aAttr, gl: WebGLRenderingContext) {
                let aTarget = MiaokitJS.ShaderLab.Pipeline.RenderTarget;

                aAttr[8]("u_MainTex", [0, aTarget[2].Handle, 0, 0]);
            },
            Postprocess: (gl: WebGLRenderingContext) => {
                gl.bindTexture(gl.TEXTURE_2D, MiaokitJS.ShaderLab.Pipeline.RenderTarget[4].Texture);
                gl.generateMipmap(gl.TEXTURE_2D)
                gl.bindTexture(gl.TEXTURE_2D, null);
            }
        },
        // 6、4->8->7->6->5，后期处理，模糊高光（经过4个通道处理）。
        {
            Name: "模糊高光",
            Type: "Postprocess",
            Mask: [],
            Shader: "Upsampling",
            PingpongCount: 1,
            Pingpong: [
                {
                    RenderTarget: [8, 0],
                    SetUniforms: function (aAttr, gl: WebGLRenderingContext) {
                        let pTarget4 = MiaokitJS.ShaderLab.Pipeline.RenderTarget[4];

                        aAttr[8]("u_MainTex", [0, pTarget4.Handle, 0, 0]);
                        aAttr[8]("u_MinorTex", [0, pTarget4.Handle, 0, 0]);
                        aAttr[8]("u_InvTexSize", [1.0 / 64.0, 1.0 / 64.0, 4.0, 3.0]);
                    }
                },
                {
                    RenderTarget: [7, 0],
                    SetUniforms: function (aAttr, gl: WebGLRenderingContext) {
                        aAttr[8]("u_MinorTex", [0, MiaokitJS.ShaderLab.Pipeline.RenderTarget[8].Handle, 0, 0]);
                        aAttr[8]("u_InvTexSize", [1.0 / 128.0, 1.0 / 128.0, 0.0, 2.0]);
                    }
                },
                {
                    RenderTarget: [6, 0],
                    SetUniforms: function (aAttr, gl: WebGLRenderingContext) {
                        aAttr[8]("u_MinorTex", [0, MiaokitJS.ShaderLab.Pipeline.RenderTarget[7].Handle, 0, 0]);
                        aAttr[8]("u_InvTexSize", [1.0 / 256.0, 1.0 / 256.0, 0.0, 1.0]);
                    }
                },
                {
                    RenderTarget: [5, 0],
                    SetUniforms: function (aAttr, gl: WebGLRenderingContext) {
                        aAttr[8]("u_MinorTex", [0, MiaokitJS.ShaderLab.Pipeline.RenderTarget[6].Handle, 0, 0]);
                        aAttr[8]("u_InvTexSize", [1.0 / 512.0, 1.0 / 512.0, 0.0, 0.0]);
                    }
                }
            ]
        },
        // 7、2+5->，后期处理，提交图像。
        {
            Name: "提交图像",
            Type: "Postprocess",
            Mask: [],
            Shader: "Present",
            SetUniforms: function (aAttr, gl: WebGLRenderingContext) {
                let aTarget = MiaokitJS.ShaderLab.Pipeline.RenderTarget;

                aAttr[8]("u_MainTex", [0, aTarget[2].Handle, 0, 0]);
                aAttr[8]("u_MinorTex", [0, aTarget[5].Handle, 0, 0]);
            }
        }
    ],

    InternalShader: [
        "Default", /*00*/ "Wall", /*01*/ "Wall", /*02*/ "Default", /*03*/
        "Default", /*04*/ "Default", /*05*/ "Default", /*06*/ "GIS", /*07*/
        "Mapbox", /*08*/ "RoomPanor", /*09*/ "Dioramas", /*10*/ "Panoramas", /*11*/
        "Cosmos", /*12*/ "Ground", /*13*/ "Sky", /*14*/ "Present"  /*15*/
    ],

    Init: function () {
        let nQuality = MiaokitJS.m_pConfig.QUALITY;
        let pPipeline = MiaokitJS.ShaderLab.Pipeline;

        // 高品质
        if (2 === nQuality) {
            let aPass = pPipeline.PassList;
            pPipeline.HighQuality = [
                aPass[0],
                aPass[1],
                aPass[2],
                aPass[3],
                aPass[4],
                aPass[5],
                aPass[6],
                aPass[7]
            ];
            pPipeline.Pass = pPipeline.HighQuality;

        }
        // 中品质
        else if (1 === nQuality) {
            let aPass = pPipeline.PassList;
            pPipeline.MediumQuality = [
                aPass[0],
                aPass[1],
                aPass[2],
                aPass[3],
                aPass[4],
                aPass[5],
                aPass[6],
                aPass[7]
            ];
            pPipeline.Pass = pPipeline.MediumQuality;
        }
        // 低品质
        else {
            //let aTarget = pPipeline.RenderTarget;
            //aTarget[1].Width = 640;
            //aTarget[1].Height = 1024;
            //aTarget[2].Width = 640;
            //aTarget[2].Height = 1024;
            //aTarget[3].Width = 640;
            //aTarget[3].Height = 1024;
            //aTarget[9].Width = 640;
            //aTarget[9].Height = 1024;

            let aPass = pPipeline.PassList;
            aPass[3].RenderTarget = undefined;
            //aPass[1].ClearTarget.Color = { r: 0.198, g: 0.323, b: 0.45, a: 0.0 };
            pPipeline.LowQuality = [
                aPass[0],
                aPass[1],
                aPass[2],
                aPass[3]
            ];
            pPipeline.Pass = pPipeline.LowQuality;
        }
    },

    HighQuality: null,
    MediumQuality: null,
    LowQuality: null,
    Pass: null,
    Picker: null
};


let PNT_SPHERE = `
// 左上角经度、左上角纬度、经度跨距、纬度跨距
uniform vec4 u_LngLat;

varying vec4 v_Position;
varying vec4 v_Normal;
varying vec4 v_UV;

vec4 SPHERE(float nTessell)
{
    float nLng = u_LngLat.x + u_LngLat.z * a_Position.x;
    float nLat = u_LngLat.y - u_LngLat.w * a_Position.y;

    float nY = sin(nLat);
    float nX = cos(nLat) * cos(nLng);
    float nZ = cos(nLat) * sin(nLng);

    v_Normal.xyz = vec3(nX, nY, nZ);
    v_Position.xyz = ObjectToWorldPos(v_Normal.xyz);
    v_UV = vec4(a_Position.xy / 64.0, 0.0, 0.0);
    
    v_Normal.w = 0.0;
    v_Position.w = 0.0;

    return u_MatVP * a_MatW * vec4(v_Normal.xyz, 1.0);
}
`;

let LIGHT_VS = `
#ifdef HIGH_QUALITY
varying vec3 v_Position;
varying vec3 v_Normal;

void LightVS(vec3 mPosition, vec3 mNormal)
{
    v_Normal = mNormal;
    v_Position = mPosition.xyz;
    
    Atmosphere(normalize(u_Sunlight.xyz), mPosition.xyz);
}
#endif
`;

let LIGHT_FS = `
#ifdef HIGH_QUALITY
varying vec3 v_Position;
varying vec3 v_Normal;

vec4 LightFS(vec4 mColor)
{
    vec3 _ViewDir = normalize(u_EyePos.xyz - v_Position.xyz);
    vec3 _Light = normalize(u_Sunlight.xyz);
    
    // 实景模型法线计算不严谨，会有非法值出现
    vec3 _Normal = normalize(vec3(v_Normal.x, v_Normal.y + 0.1, v_Normal.z));
    vec3 _Tangent = vec3(0.0, 0.0, 1.0);
    vec3 _Binormal = vec3(1.0, 0.0, 0.0);
    if(0.7 > _Normal.y)
    {
        _Tangent = normalize(cross(_Normal, vec3(0.0, 1.0, 0.0)));
        _Binormal =  normalize(cross(_Tangent, _Normal));
    }
    
    mColor.rgb += BRDF(_Light, _ViewDir, _Normal, _Tangent, _Binormal) * 0.4;
    
    mColor = AtmosphereLight(mColor, _Light);
    mColor.a = 1.0;

    return mColor;
}
#endif
`;


MiaokitJS.Shader["Default"] = {
    name: "Default",
    type: "Render",
    mark: ["Opaque"],
    include: [
        null,
        null,
        ["ATOM", "BRDF"],
    ],
    vs_src: LIGHT_VS + `
varying vec4 v_UV;

vec4 vs()
{
    v_UV = vec4(a_UV, 0.0, 0.0);
    
    vec4 mPosition = vec4(a_Position.xyz, 1.0);
    mPosition = u_MatG * a_MatW * mPosition;
    
    #ifdef HIGH_QUALITY
    LightVS(mPosition.xyz, ObjectToWorldNormal(a_Normal));
    #endif

    return u_MatVP * mPosition;
}
        `,
    fs_src: LIGHT_FS + `
varying vec4 v_UV;

vec4 fs()
{
    vec4 mColor = Tex2D(u_MainTex, v_UV.xy);
    mColor.rgb *= 0.85;
    
    #ifdef HIGH_QUALITY
    mColor = LightFS(mColor);
    #endif
    
    return mColor;
}
        `
};

MiaokitJS.Shader["Wall"] = {
    name: "Wall",
    type: "Render",
    mark: ["Opaque"],
    vs_src: `
varying vec3 v_Normal;

vec4 vs()
{
    v_Normal = ObjectToWorldNormal(a_Normal);

    vec4 mPosition = vec4(a_Position.xyz, 1.0);
    mPosition = u_MatG * a_MatW * mPosition;

    return u_MatVP * mPosition;
}
        `,
    fs_src: `
varying vec3 v_Normal;

vec4 fs()
{
    vec4 mColor = vec4(0.9255, 0.9412, 0.9647, 1.0);
    float nDiffuse = clamp(dot(v_Normal, normalize(u_Sunlight.xyz)), 0.0, 1.0);
    
    nDiffuse = nDiffuse * 0.4 + 0.3;
    nDiffuse *= 1.8;
    mColor.rgb *= nDiffuse;

    return mColor;
}
        `
};

MiaokitJS.Shader["Corner"] = {
    name: "Corner",
    type: "Render",
    mark: ["Transparent"],
    vs_src: `
vec4 vs()
{
    return ObjectToClipPos(a_Position.xyz);
}
        `,
    fs_src: `
vec4 fs()
{
    return vec4(1.98, 3.23, 5.61, 1.0);
}
        `
};

MiaokitJS.Shader["Mapbox"] = {
    name: "Mapbox",
    type: "Render",
    mark: ["Opaque"],
    vs_src: `
vec4 vs()
{
    return ObjectToClipPos(a_Position.xyz);
}
        `,
    fs_src: `
vec4 fs()
{
    return vec4(0.6019608, 0.7862745, 0.8254902, 1.0);
}
        `
};

MiaokitJS.Shader["Mapbox2"] = {
    name: "Mapbox2",
    type: "Render",
    mark: ["Opaque"],
    vs_src: `
vec4 vs()
{
    return ObjectToClipPos(a_Position.xyz);
}
        `,
    fs_src: `
vec4 fs()
{
    return vec4(0.6019608, 0.7862745, 0.8254902, 1.0);
}
        `
};

MiaokitJS.Shader["Dioramas"] = {
    name: "Dioramas",
    type: "Render",
    mark: ["Opaque"],
    include: [
        null,
        null,
        ["ATOM", "BRDF"],
    ],
    vs_src: LIGHT_VS + `
uniform sampler2D _BuildingTex;

varying vec4 v_UV;

vec4 vs()
{
    vec4 mBuilding = texture2D(_BuildingTex, a_Normal.xy);
    
    //v_Object.a = mBuilding.r;    
    v_UV = vec4(a_UV, 0.0, 0.0);
    
    vec4 mPosition = vec4(a_Position.xyz, 1.0);
    mPosition = u_MatG * a_MatW * mPosition;
    mPosition.y -= mBuilding.r * (mPosition.y - 1.0 - 167.0);
    
    // 高品质下，计算法线，计算大气散射
    #ifdef HIGH_QUALITY
    float n = a_Normal.z; 
    float nx = n / 8.0;  n = floor(nx); nx = (nx - n) * 4.0 - 1.0;
    float ny = n / 8.0;  n = floor(ny); ny = (ny - n) * 4.0 - 1.0;
    float nz = (n - 2.0) * 0.5;

    LightVS(mPosition.xyz, vec3(nx, ny, nz));
    #endif

    return u_MatVP * mPosition;
}
        `,
    fs_src: LIGHT_FS + `
varying vec4 v_UV;

vec4 fs()
{
    vec4 mColor = Tex2D(u_MainTex, v_UV.xy);
    
    #ifdef HIGH_QUALITY
    mColor = LightFS(mColor);
    #endif
    
    return mColor;
}
        `
};

MiaokitJS.Shader["GIS"] = {
    name: "GIS",
    type: "Render",
    mark: ["Opaque"],
    include: [
        null,
        null,
        ["ATOM", "BRDF"],
    ],
    vs_src: `
uniform sampler2D _TerrainTex;
uniform vec4 _LngLat;
uniform vec4 _Terrain;

varying vec3 v_Normal;
varying vec3 v_UV;

vec3 CalNormal(float nTexU, float nTexV, vec4 mLngLat, vec4 mTerrain)
{
    float aHeight[4];
	vec4 aUV[4];
    
	aUV[0] = vec4(nTexU - mLngLat.w, nTexV, 0.0, 0.0);
	aUV[1] = vec4(nTexU + mLngLat.w, nTexV, 0.0, 0.0);
	aUV[2] = vec4(nTexU, nTexV - mLngLat.w, 0.0, 0.0);
	aUV[3] = vec4(nTexU, nTexV + mLngLat.w, 0.0, 0.0);
    
	aHeight[0] = 0.0;
    aHeight[1] = 0.0; 
    aHeight[2] = 0.0; 
    aHeight[3] = 0.0;
    
	for (int i = 0; i < 4; i++)
	{
        // 约束到[0,1]范围
		aUV[i].xy /= mLngLat.z;
		aUV[i].x = aUV[i].x * mTerrain.z + mTerrain.x;
		aUV[i].y = aUV[i].y * mTerrain.z + mTerrain.y;
        
		vec4 mHeight = texture2D(_TerrainTex, aUV[i].xy);
        float nHeight = ((mHeight.r * 256.0 * 256.0 * 256.0) + (mHeight.g * 256.0 * 256.0) + (mHeight.b * 256.0)) * 0.001;

		aHeight[i] = nHeight - 1000.0;
	}
    
	float nLng = (mLngLat.x + nTexU) / 131072.0 * 3.141592654;
	float nLat = (mLngLat.y - nTexV) / 131072.0 * 3.141592654;
    
	vec3 mNormal = vec3(0.0, 1.0, 0.0);
	vec3 mBinormal = vec3(1.0, 0.0, 0.0);
	vec3 mTangent = vec3(0.0, 0.0, 1.0);
    
	float nScale = 1.0 / ((mLngLat.w / 131072.0 * 3.141592654) * 6378137.0);
    nScale *= 2.0;
    
	mNormal = mNormal +  mBinormal * (aHeight[0] - aHeight[1]) * nScale + mTangent * (-aHeight[2] + aHeight[3]) * nScale;
	normalize(mNormal);
    
	return mNormal;
}

vec4 vs()
{
    // 实例数据：左上角经度、左上角纬度、经纬度范围宽度、经纬度跨距。
    vec4 mLngLat = _LngLat; //a_Object;
    // 地形贴图偏移XY，地形贴图缩放Z，瓦片层级W。
	vec4 mTerrain = _Terrain;//a_MatW[0];
    // 图像贴图偏移XY，未使用ZW
	vec4 mMap = vec4(0.0, 0.0, 0.0, 0.0);//a_MatW[1];
    
    float nTexU = mLngLat.w * a_Position.x;
	float nTexV = mLngLat.w * a_Position.y;
    
	float nLng = (mLngLat.x + nTexU) / 131072.0 * 3.141592654;
	float nLat = (mLngLat.y - nTexV) / 131072.0 * 3.141592654;
    
	float nVecY = sin(nLat);
	float nVecX = cos(nLat) * cos(nLng);
	float nVecZ = cos(nLat) * sin(nLng);
    
    vec3 mPosition = vec3(nVecX, nVecY, nVecZ);
    
    v_Normal = vec3(nVecX, nVecY, nVecZ);
    v_Normal = normalize((u_MatG * vec4(v_Normal, 0.0)).xyz);

    float nHeight = 0.0;
    if(7.9 < mTerrain.w)
    {
        vec2 _UV = vec2(nTexU, nTexV) / mLngLat.z;
        
        _UV.x = _UV.x * mTerrain.z + mTerrain.x;
		_UV.y = _UV.y * mTerrain.z + mTerrain.y;
        
        vec4 mHeight = texture2D(_TerrainTex, _UV);
        
		nHeight = ((mHeight.r * 256.0 * 256.0 * 256.0) + (mHeight.g * 256.0 * 256.0) + (mHeight.b * 256.0)) * 0.001;
        nHeight -= 1000.0;
        
        // 高品质下，计算地形法线
        #ifdef HIGH_QUALITY
        v_Normal = CalNormal(nTexU, nTexV, mLngLat, mTerrain);
        #endif
    }
    
    mPosition = mPosition * (6378137.0 + nHeight);

    nTexU /= mLngLat.z;
	nTexV /= mLngLat.z;
    
	// 网格从左上角开始，影像贴图从左下角开始  
    v_UV = vec3(nTexU, nTexV, mMap.y);
    
    // GIS的变换矩阵只包含旋转信息，未包含位移信息，避免精度不足造成画面抖动
    // return u_MatVP * u_MatG * vec4(mPosition.xyz, 1.0);
    
    vec4 mPosition_ = vec4(mPosition.xyz, 1.0);
    mPosition_ = u_MatG * mPosition_;
    mPosition_.y = mPosition_.y - 6378137.0;
    
    // 高品质下，计算大气散射
    #ifdef HIGH_QUALITY
    Atmosphere(normalize(u_Sunlight.xyz), mPosition_.xyz);
    #endif
    
    v_Object.a = 0.0;
    
    return u_MatVP * mPosition_; 
}
        `,
    fs_src: `
uniform sampler2D _TerrainTex;
uniform sampler2D _PhotoTex;
uniform sampler2D _LabelTex;

varying vec3 v_Normal;
varying vec3 v_UV;

vec4 fs()
{
    vec4 mColor = texture(_PhotoTex, v_UV.xy);
    vec4 mLabel = texture(_LabelTex, v_UV.xy);

    mColor.rgb = (mColor.rgb * (1.0 - mLabel.a)) + (mLabel.rgb * mLabel.a);
    mColor.a = 1.0;

    // 高品质下，计算BRDF光照，计算大气散射
    #ifdef HIGH_QUALITY    
    mColor.rgb += BRDF(normalize(u_Sunlight.xyz), normalize(v_ViewDir.xyz), v_Normal, vec3(0.0, 0.0, 1.0), vec3(1.0, 0.0, 0.0)) * 0.4;

    mColor = AtmosphereLight(mColor, normalize(u_Sunlight.xyz));
    mColor.a = 1.0;
    #endif
    
    return mColor;
}
        `
};

MiaokitJS.Shader["Panoramas"] = {
    name: "Panoramas",
    type: "Clear",
    mark: ["Opaque"],
    vs_src: `
// X:瓦片缩放、Y:子投影面索引、Z:绕Y轴逆时针旋转弧度、W:绕X轴逆时针旋转弧度
uniform vec4 u_LngLat;
uniform vec4 u_Position;
uniform vec4 u_Desc;
varying vec4 v_UV;

vec4 vs()
{
    // 中心投影法：设定球心位于原点处，令124*124的正方形立于X=62处，球心到正方形各个顶点的射线投影出一个弧面
    
    // 左上角基准点坐标，从左上角向右下角扫描
    vec4 mPosition = vec4(62.0, 62.0, -62.0, 4.0);
    
    // 投影面可以细分为16个子投影面，修改子投影面左上角基准点坐标
    mPosition.w *= u_LngLat.x;
    mPosition.z += 31.0 * mod(u_LngLat.y, 4.0);
    mPosition.y -= 31.0 * floor(u_LngLat.y / 4.0);

    // 当前投影点坐标
    mPosition.z += a_Position.x * mPosition.w;
    mPosition.y -= a_Position.y * mPosition.w;

    // 单位化投影射线
    mPosition.xyz = normalize(mPosition.xyz) * u_Desc.x;
    mPosition.w = 1.0;

    // 绕Y轴旋转
    float nCos = cos(u_LngLat.z);
    float nSin = sin(u_LngLat.z);
    float nX = mPosition.x;
    float nY = mPosition.y;
    float nZ = mPosition.z;
    mPosition.x = nX * nCos - nZ * nSin;
    mPosition.z = nX * nSin + nZ * nCos;
    
    // 绕X轴旋转
    nCos = cos(u_LngLat.w);
    nSin = sin(u_LngLat.w);
    nZ = mPosition.z;
    mPosition.y = nY * nCos - nZ * nSin;
    mPosition.z = nY * nSin + nZ * nCos;

    // 使指南针朝向正确
    nCos = cos(u_Desc.y);
    nSin = sin(u_Desc.y);
    nX = mPosition.x;
    nZ = mPosition.z;
    mPosition.x = nX * nCos - nZ * nSin;
    mPosition.z = nX * nSin + nZ * nCos;

    // 设置中心点位置
    mPosition.xyz += u_Position.xyz;
    
    // 纹理映射坐标
    v_UV = vec4(a_Position.xy / 31.0, 0.0, 0.0);
    
    return u_MatVP * mPosition;
}
        `,
    fs_src: `
varying vec4 v_UV;

vec4 fs()
{
    vec4 mColor = texture(u_MainTex, vec2(1.0 - v_UV.x, v_UV.y));
    mColor.a = 1.0;
    
    return mColor;
}
        `
};

MiaokitJS.Shader["RoomPanor"] = {
    name: "RoomPanor",
    type: "Clear",
    mark: ["Opaque"],
    uniform_values: [["u_MainTex", 1]],
    vs_src: `
varying vec3 v_Position;
varying vec3 v_Center;

vec4 vs()
{
    vec4 mPosition = vec4(a_Position.xyz, 1.0);
    mPosition = u_MatG * a_MatW * mPosition;
    
    v_Position = mPosition.xyz;
    v_Center = (u_MatG * a_MatW * vec4(-37.9, 1.5, 3.65, 1.0)).xyz;
    
    return u_MatVP * mPosition;
}
        `,
    fs_src: `
varying vec3 v_Position;
varying vec3 v_Center;

vec4 fs()
{
    // 这里u_EyePos是世界空间坐标
    vec3 _Eye = u_EyePos.xyz;
    vec3 _Ray = normalize(_Eye - v_Position);
    vec3 _LineC = v_Center - v_Position;
    
    float _LenProj = dot(_LineC, _Ray);
    float _LenC = length(_LineC);
    float _Dist = _LenC * _LenC - _LenProj * _LenProj;
    float _R = 1.5;
    
    vec3 _ProjC = v_Position + _Ray * _LenProj;
    
    _LenProj = sqrt(_R * _R - _Dist);
    _ProjC = _ProjC - _Ray * _LenProj;
    
    vec3 mView = _ProjC - v_Center;
    
    /////////////////////////////////////////////////////////
    
    //vec3 mView = normalize(v_Position - v_Center);
    
    float nLength = length(mView);    
    float nLat = asin(mView.y / nLength);
    float nLengthXZ = cos(nLat) * nLength;
    float nLng = acos(mView.x / nLengthXZ);
    
    if(0.0 > mView.z)
    {
        nLng = 6.283185308 - nLng;
    }
    
    float x = nLng / 6.283185308;
    float y = 1.0 - ((nLat + 1.570796327) / 3.141592654);
    
    vec4 mColor = texture(u_MainTex, vec2(x, y));
    mColor.a = 1.0;
    
    return mColor;
}
        `
};

MiaokitJS.Shader["Cosmos"] = {
    name: "Cosmos",
    type: "Clear",
    mark: ["Opaque"],
    uniform_values: [["u_MainTex", 1]],
    vs_src: PNT_SPHERE + `
vec4 vs()
{
    return SPHERE(64.0);
}
        `,
    fs_src: `
varying vec4 v_UV;

vec4 fs()
{
    vec4 mColor = Tex2D(u_MainTex, v_UV.xy);
    mColor.a = 1.0;
    
    return mColor;
}
        `
};

MiaokitJS.Shader["Sky"] = {
    name: "Sky",
    type: "Clear",
    mark: ["Opaque"],
    include: [
        ["ATOM"],
        ["ATOM"],
        ["ATOM"],
    ],
    vs_src: PNT_SPHERE + `
vec4 vs()
{
    vec4 mClip = SPHERE(64.0);

    Atmosphere(normalize(u_Sunlight.xyz), v_Position.xyz);
    
    return mClip;
}
        `,
    fs_src: `
vec4 fs()
{
    return AtmosphereColor(vec4(1.0, 1.0, 1.0, 1.0), normalize(u_Sunlight.xyz));
}
        `
};

MiaokitJS.Shader["Ground"] = {
    name: "Ground",
    type: "Clear",
    mark: ["Opaque"],
    vs_src: PNT_SPHERE + `
vec4 vs()
{
    return SPHERE(64.0);
}
        `,
    fs_src: `
vec4 fs()
{
    return vec4(0.1019608, 0.2862745, 0.3254902, 1.0);
}
        `
};

MiaokitJS.Shader["Combine"] = {
    name: "Present",
    type: "Postprocess",
    mark: ["Opaque"],
    vs_src: `
varying vec2 v_UV;

vec4 vs()
{
    v_UV = a_UV;
    v_UV.y = 1.0 - v_UV.y;
    
    return vec4(a_Position, 1.0);
}
        `,
    fs_src: `
uniform sampler2D u_MinorTex;

varying vec2 v_UV;

vec4 fs()
{
    vec4 mColor = vec4(0.0, 0.0, 0.0, 0.0);
    vec4 mColor1 = texture2D(u_MainTex, v_UV);    
    vec4 mColor2 = texture2D(u_MinorTex, v_UV);    
    float nGray2 = mColor2.g / clamp(mColor2.b, 0.001, 50000.0);

    mColor.rgb = mColor1.rgb * mColor2.a + vec3(nGray2, nGray2, nGray2) * (1.0 - mColor2.a);
    mColor.a = mColor1.a + mColor2.r;
    
    // 标识是否高亮，边缘提取时不应再除以混合次数
    mColor.a = ceil(ceil(mColor.a) - mColor.a);

    // 低品质下，合成颜色直接输出，叠加高亮区域颜色
    #ifdef LOW_QUALITY
    mColor.rgb *= vec3(0.2, 0.4, 0.6) + (vec3(0.8, 0.6, 0.4) * (1.0 - mColor.a));
    #endif
    
    return mColor;
}
        `
};

MiaokitJS.Shader["EdgeDetection"] = {
    name: "EdgeDetection",
    type: "Postprocess",
    mark: ["Opaque"],
    vs_src: `
varying vec2 v_UV;

vec4 vs()
{
    v_UV = a_UV;
    v_UV.y = 1.0 - v_UV.y;
    
    return vec4(a_Position, 1.0);
}
        `,
    fs_src: `
uniform vec4 u_InvTexSize;
varying vec2 v_UV;

#define FXAA_REDUCE_MIN   (1.0/ 128.0)
#define FXAA_REDUCE_MUL   (1.0 / 8.0)
#define FXAA_SPAN_MAX     8.0

vec4 fs()
{
    vec4 _OffsetUV = vec4(-1.0, 1.0, 1.0, 1.0) * vec4(u_InvTexSize.xy, u_InvTexSize.xy);
    
    /// 采样中心及周边斜角4个点的颜色================================
    vec4 _Color0 = texture2D(u_MainTex, v_UV);
    vec4 _Color1 = texture2D(u_MainTex, v_UV + _OffsetUV.xy); // NW
    vec4 _Color2 = texture2D(u_MainTex, v_UV - _OffsetUV.xy); // SE
    vec4 _Color3 = texture2D(u_MainTex, v_UV + _OffsetUV.zw); // NE
    vec4 _Color4 = texture2D(u_MainTex, v_UV - _OffsetUV.zw); // SW
    
    /// 计算中心及周边斜角4个点的颜色灰度============================
    vec3 _Luma = vec3(0.299, 0.587, 0.114);
    
    float _LumaM  = dot(_Color0.rgb, _Luma);
    float _LumaNW = dot(_Color1.rgb, _Luma);
    float _LumaNE = dot(_Color3.rgb, _Luma);
    float _LumaSW = dot(_Color4.rgb, _Luma);
    float _LumaSE = dot(_Color2.rgb, _Luma);
    
    float _LumaMin = min(_LumaM, min(min(_LumaNW, _LumaNE), min(_LumaSW, _LumaSE)));
    float _LumaMax = max(_LumaM, max(max(_LumaNW, _LumaNE), max(_LumaSW, _LumaSE)));
    
    ///计算选中对象轮廓==============================================
    float _Diff1 = (_Color1.a - _Color2.a) * 0.5;
	float _Diff2 = (_Color3.a - _Color4.a) * 0.5;
	float _Diff = length(vec2(_Diff1, _Diff2));
    
    ///FXAA处理======================================================
    vec2 _Dir = vec2(-((_LumaNW + _LumaNE) - (_LumaSW + _LumaSE)), ((_LumaNW + _LumaSW) - (_LumaNE + _LumaSE)));

    float _DirReduce = max((_LumaNW + _LumaNE + _LumaSW + _LumaSE) * (0.25 * FXAA_REDUCE_MUL), FXAA_REDUCE_MIN);
    float _RcpDirMin = 1.0 / (min(abs(_Dir.x), abs(_Dir.y)) + _DirReduce);

    _Dir = min(vec2(FXAA_SPAN_MAX, FXAA_SPAN_MAX), max(vec2(-FXAA_SPAN_MAX, -FXAA_SPAN_MAX), _Dir * _RcpDirMin)) * u_InvTexSize.xy;

    vec4 _Blend0 = texture2D(u_MainTex, v_UV + _Dir * (1.0 / 3.0 - 0.5));
    vec4 _Blend1 = texture2D(u_MainTex, v_UV + _Dir * (2.0 / 3.0 - 0.5));
    vec4 _Blend2 = texture2D(u_MainTex, v_UV + _Dir * -0.5);
    vec4 _Blend3 = texture2D(u_MainTex, v_UV + _Dir *  0.5);

    vec3 _ColorA = vec3(0.0, 0.0, 0.0);
    _ColorA += _Blend0.rgb;
    _ColorA += _Blend1.rgb;
    _ColorA *= 0.5;

    vec3 _ColorB = vec3(0.0, 0.0, 0.0);
    _ColorB += _Blend2.rgb;
    _ColorB += _Blend3.rgb;
    _ColorB *= 0.25;
    _ColorB += 0.5 * _ColorA;

    float _LumaB = dot(_ColorB, _Luma);
    if ((_LumaB < _LumaMin) || (_LumaB > _LumaMax))
    {
        _Color0.rgb = _ColorA;
    }
    else
    {
        _Color0.rgb = _ColorB;
    }
    ///计算素描线条==================================================
    _Color0.a = _LumaM / (_LumaMax - _LumaMin);
    ///叠加选中对象轮廓==============================================
    _Color0.rgb += vec3(3.0, 0.5, 0.0) * _Diff;
    
    return _Color0;
}
        `
};

MiaokitJS.Shader["HDR"] = {
    name: "HDR",
    type: "Postprocess",
    mark: ["Opaque"],
    vs_src: `
varying vec2 v_UV;

vec4 vs()
{
    v_UV = a_UV;
    v_UV.y = 1.0 - v_UV.y;
    
    return vec4(a_Position, 1.0);
}
        `,
    fs_src: `
varying vec2 v_UV;

vec4 fs()
{
    vec4 mColor = texture2D(u_MainTex, v_UV);

    // https://catlikecoding.com/unity/tutorials/advanced-rendering/bloom/    
    // 高光阈值。阈值为1时，LDR没有光晕
    float nThreshold = 1.0;
    // 软过渡阈值[0, 1.0]，值为0时，在亮度为1处硬过渡，值为1时，亮度从0开始平滑过渡
    float nSoftThreshold = 0.5;
    // 使用彩色最大组成部分代表它的亮度
    float nBrightness = max(mColor.r, max(mColor.r, mColor.b));
    // 低于高光阈值的部分，给予一个非0的共享，避免硬过渡
    float nSoft = 0.0;
    {
        float nKnee = nThreshold * nSoftThreshold;
        nSoft = nBrightness - nThreshold + nKnee;
        nSoft = clamp(nSoft, 0.0, 2.0 * nKnee);
        nSoft = nSoft * nSoft / (4.0 * nKnee + 0.00001);
    }
    // 贡献因子=亮度-阈值/亮度
    float nContrib = max(nSoft, nBrightness - nThreshold);
    nContrib /= max(nBrightness, 0.00001);
    
    return mColor * nContrib;
}
        `
};

MiaokitJS.Shader["Upsampling"] = {
    name: "Upsampling",
    type: "Postprocess",
    mark: ["Opaque"],
    vs_src: `
varying vec2 v_UV;

vec4 vs()
{
    v_UV = a_UV;
    v_UV.y = 1.0 - v_UV.y;
    
    return vec4(a_Position, 1.0);
}
        `,
    fs_src: `
//[1.0/W, 1.0/H, LOD, 0]
uniform vec4 u_InvTexSize;
uniform sampler2D u_MinorTex;

varying vec2 v_UV;

vec4 fs()
{
    vec4 mColor = vec4(0.0, 0.0, 0.0, 0.0);
    vec4 mBias = vec4(-u_InvTexSize.x, u_InvTexSize.y, u_InvTexSize.x, u_InvTexSize.y);

    mColor += texture2D(u_MinorTex, v_UV + mBias.xy, u_InvTexSize.z);
    mColor += texture2D(u_MinorTex, v_UV - mBias.xy, u_InvTexSize.z);
    mColor += texture2D(u_MinorTex, v_UV + mBias.zw, u_InvTexSize.z);
    mColor += texture2D(u_MinorTex, v_UV - mBias.zw, u_InvTexSize.z);
    mColor *= 0.25;
    
    mColor += texture2D(u_MainTex, v_UV, u_InvTexSize.w);
    
    return mColor;
}
        `
};

MiaokitJS.Shader["Present"] = {
    name: "Present",
    type: "Postprocess",
    mark: ["Opaque"],
    vs_src: `
varying vec2 v_UV;

vec4 vs()
{
    v_UV = a_UV;
    v_UV.y = 1.0 - v_UV.y;
    
    return vec4(a_Position, 1.0);
}
        `,
    fs_src: `
uniform sampler2D u_MinorTex;

varying vec2 v_UV;

vec4 fs()
{
    vec4 mColor = texture2D(u_MainTex, v_UV);
    vec4 mBloom = texture2D(u_MinorTex, v_UV);

    mColor += mBloom;
    
    return mColor;
}
        `
};

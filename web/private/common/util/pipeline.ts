
MiaokitJS.ShaderLab.Pipeline = {
    RenderTarget: [null,
        /// 1.绘制物体颜色缓存
        { ID: 1, Format: "RGBA16_FLOAT", Width: 640, Height: 1024 },
        /// 2.轮廓与高光颜色缓存
        { ID: 2, Format: "RGBA16_FLOAT", Width: 640, Height: 1024 },
        /// 3.绘制不透明物体深度缓存
        { ID: 3, Format: "D24_UNORM", Width: 640, Height: 1024 },
        /// 4.高光输入缓存，降采样，需生成MIPMAP
        {
            ID: 4, Format: "RGBA16_FLOAT", Width: 1024, Height: 1024, Params: [
                "LINEAR_MIPMAP_LINEAR"/*MIN_FILTER*/, "LINEAR"/*MAG_FILTER*/,
                "CLAMP_TO_EDGE"/*WRAP_S*/, "CLAMP_TO_EDGE"/*WRAP_T*/
            ]
        },
        /// 5.高光模输出缓存，升采样512->X
        { ID: 5, Format: "RGBA16_FLOAT" },
        /// 6.高光模糊缓存，升采样256->512
        {
            ID: 6, Format: "RGBA16_FLOAT", Width: 512, Height: 512, Params: [
                "LINEAR"/*MIN_FILTER*/, "LINEAR"/*MAG_FILTER*/,
                "CLAMP_TO_EDGE"/*WRAP_S*/, "CLAMP_TO_EDGE"/*WRAP_T*/
            ]
        },
        /// 7.高光模糊缓存，升采样128->256
        {
            ID: 7, Format: "RGBA16_FLOAT", Width: 256, Height: 256, Params: [
                "LINEAR"/*MIN_FILTER*/, "LINEAR"/*MAG_FILTER*/,
                "CLAMP_TO_EDGE"/*WRAP_S*/, "CLAMP_TO_EDGE"/*WRAP_T*/
            ]
        },
        /// 8.高光模糊缓存，升采样64->128
        {
            ID: 8, Format: "RGBA16_FLOAT", Width: 128, Height: 128, Params: [
                "LINEAR"/*MIN_FILTER*/, "LINEAR"/*MAG_FILTER*/,
                "CLAMP_TO_EDGE"/*WRAP_S*/, "CLAMP_TO_EDGE"/*WRAP_T*/
            ]
        },
    ],

    Resource: [null,
        /// 1.星空背景贴图
        { ID: 1, TYPE: "2D", URL: "./data/star.jpg" },
        /// 2.默认贴图
        { ID: 2, TYPE: "2D", URL: "./data/default.jpg" }
    ],

    Pass: [
        // 0、启用深度测试，启用深度写入，关闭混合。清空画布，绘制天空盒
        {
            Name: "绘制天空盒",
            Type: "Clear",
            Mask: ["Opaque"],
            RenderTarget: [1, 0],
            ClearTarget: {
                Color: { r: 0.198, g: 0.323, b: 0.561, a: 1.0 },
                Depth: 1.0
            },
        },
        // 1、启用深度测试，启用深度写入，关闭混合。绘制不透明物体，无轮廓对象A值为1，有轮廓对象A值为0.99
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
            //Postprocess: (gl: WebGLRenderingContext) => {
            //    if (MiaokitJS.ShaderLab.Pipeline.Picker) {
            //        MiaokitJS.ShaderLab.PickObject();
            //    }
            //}
        },
        // 2、启用深度测试，关闭深度写入，开启混合。绘制半透明物体，无轮廓对象A值为1，有轮廓对象A值为0.99
        {
            Name: "绘制半透明物体",
            Type: "Render",
            Mask: ["Transparent"],
            RenderTarget: [1, 3],
            Depth: {
                Func: "LEQUAL",
                Write: false
            },
            Blend: {
                ColorFunc: "FUNC_ADD",
                ColorSrc: "ONE",
                ColorDest: "ONE",
                AlphaFunc: "FUNC_ADD",
                AlphaSrc: "ONE",
                AlphaDest: "ONE"
            }
        },
        // 3、关闭深度测试，关闭深度写入，关闭混合。后期处理，提取物体轮廓，抗锯齿，颜色混合
        {
            Name: "提取物体轮廓",
            Type: "Postprocess",
            Mask: [],
            RenderTarget: [2, 3],
            Shader: "EdgeDetection",
            SetUniforms: function (aAttr, gl: WebGLRenderingContext) {
                let aTarget = MiaokitJS.ShaderLab.Pipeline.RenderTarget;

                aAttr[8]("u_MainTex", [0, aTarget[1].Handle, 0, 0]);
                aAttr[8]("u_InvTexSize", aTarget[1].Size);
            }
        },
        // 4、关闭深度测试，关闭深度写入，关闭混合。后期处理，提取画面高光部分
        {
            Name: "提取画面高光部分",
            Type: "Postprocess",
            Mask: [],
            RenderTarget: [4, 0],
            Shader: "HDR",
            SetUniforms: function (aAttr, gl: WebGLRenderingContext) {
                let aTarget = MiaokitJS.ShaderLab.Pipeline.RenderTarget;

                aAttr[8]("u_MainTex", [0, aTarget[2].Handle, 0, 0]);
                aAttr[8]("u_InvTexSize", aTarget[2].Size);
            },
            Postprocess: (gl: WebGLRenderingContext) => {
                gl.bindTexture(gl.TEXTURE_2D, MiaokitJS.ShaderLab.Pipeline.RenderTarget[4].Texture);
                gl.generateMipmap(gl.TEXTURE_2D)
                gl.bindTexture(gl.TEXTURE_2D, null);
            }
        },
        // 5、关闭深度测试，关闭深度写入，关闭混合。后期处理，模糊高光
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
        // 6、关闭深度测试，关闭深度写入，关闭混合。后期处理，提交图像
        {
            Name: "提交图像",
            Type: "Postprocess",
            Mask: [],
            Shader: "Present",
            SetUniforms: function (aAttr, gl: WebGLRenderingContext) {
                let aTarget = MiaokitJS.ShaderLab.Pipeline.RenderTarget;

                aAttr[8]("u_MainTex", [0, aTarget[2].Handle, 0, 0]);
                aAttr[8]("u_MinorTex", [0, aTarget[5].Handle, 0, 0]);
                aAttr[8]("u_InvTexSize", aTarget[1].Size);
            }
        }
    ],

    Picker: null,

    InternalShader: [
        "Default", /*00*/ "Default", /*01*/ "Default", /*02*/ "Default", /*03*/
        "Default", /*04*/ "Default", /*05*/ "Default", /*06*/ "GIS", /*07*/
        "Mapbox", /*08*/ "Mapbox2", /*09*/ "Default"/*"Dioramas"*/, /*10*/ "Mapbox2", /*11*/
        "Cosmos", /*12*/ "Ground", /*13*/ "Sky", /*14*/ "Present"  /*15*/
    ],
};


let PNTT = `
varying vec4 v_Position;
varying vec4 v_Normal;
varying vec4 v_Tangent;
varying vec4 v_UV;

void PNTT()
{
    v_Position.xyz = ObjectToWorldPos(a_Position.xyz);
    v_Normal.xyz = ObjectToWorldNormal(a_Normal.xyz);
    v_Tangent.xyz = ObjectToWorldNormal(a_Tangent.xyz);
    v_UV = vec4(a_UV, 0.0, 0.0);
    
    vec3 mBinormal = normalize(cross(v_Tangent.xyz, v_Normal.xyz));
    v_Position.w = mBinormal.x;
    v_Normal.w = mBinormal.y;
    v_Tangent.w = mBinormal.z;
}
`;

let PNTT_P = `
varying vec4 v_Position;
varying vec4 v_Normal;
varying vec4 v_Tangent;
varying vec4 v_UV;

void PNTT(vec3 mPosition, vec3 mNormal, vec3 mTangent)
{
    v_Position.xyz = ObjectToWorldPos(mPosition.xyz);
    v_Normal.xyz = ObjectToWorldNormal(mNormal.xyz);
    v_Tangent.xyz = ObjectToWorldNormal(mTangent.xyz);
    v_UV = vec4(a_UV, 0.0, 0.0);

    vec3 mBinormal = normalize(cross(v_Tangent.xyz, v_Normal.xyz));
    v_Position.w = mBinormal.x;
    v_Normal.w = mBinormal.y;
    v_Tangent.w = mBinormal.z;
}
`;

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

    return ObjectToClipPos(v_Normal.xyz);
}
`;

let BRDF = MiaokitJS.ShaderLab.Shader["Common"]["BRDF"] + `
varying vec4 v_Position;
varying vec4 v_Normal;
varying vec4 v_Tangent;
varying vec4 v_UV;

vec3 BRDF_LIGHT()
{
    // 当前切线计算有漏洞，会导致插值出0
    if(0.3 < length(v_Tangent.xyz))
    {
        vec3 _Light = normalize(u_Sunlight.xyz);
        vec3 _ViewDir = normalize(u_EyePos.xyz - v_Position.xyz);
        
        return BRDF(_Light, _ViewDir, v_Normal.xyz, v_Tangent.xyz, vec3(v_Position.w, v_Normal.w, v_Tangent.w)) * 0.4;
    }

    return vec3(0.0, 0.0, 0.0);
}
`;

let BRDF_P = MiaokitJS.ShaderLab.Shader["Common"]["BRDF"] + `
varying vec4 v_Position;
varying vec4 v_Normal;
varying vec4 v_Tangent;
varying vec4 v_UV;

vec3 BRDF_LIGHT(vec3 mTangent, vec3 mBinormal)
{
    vec3 _Light = normalize(u_Sunlight.xyz);
    vec3 _ViewDir = normalize(u_EyePos.xyz - v_Position.xyz);
        
    return BRDF(_Light, _ViewDir, v_Normal.xyz, mTangent, mBinormal) * 0.4;
}
`;

let ATMOS_VS = MiaokitJS.ShaderLab.Shader["Common"]["AtmosphereVS"];
let ATMOS_FS = MiaokitJS.ShaderLab.Shader["Common"]["AtmosphereFS"];


MiaokitJS.ShaderLab.Shader["Default"] = {
    name: "Default",
    type: "Render",
    mark: ["Opaque"],
    vs_src: PNTT + `
vec4 vs()
{
    //PNTT();
    //v_Normal = a_Object;
    v_UV = vec4(a_UV, 0.0, 0.0);
    
    return ObjectToClipPos(a_Position.xyz);
}
        `,
    fs_src: BRDF + `
vec4 fs()
{
    vec4 mColor = Tex2D(u_MainTex, v_UV.xy);
    
    //mColor.rgb += BRDF_LIGHT();
    
    return mColor;
}
        `
};

MiaokitJS.ShaderLab.Shader["Wall"] = {
    name: "Wall",
    type: "Render",
    mark: ["Transparent"],
    vs_src: PNTT + `
vec4 vs()
{
    PNTT();

    return ObjectToClipPos(a_Position.xyz);
}
        `,
    fs_src: BRDF + `
vec4 fs()
{
    vec4 mColor = vec4(0.3, 0.3, 0.3, 1.0);

    //mColor.rgb += BRDF_LIGHT();
    
    return mColor;
}
        `
};

MiaokitJS.ShaderLab.Shader["Corner"] = {
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
    vec4 mColor = vec4(1.98, 3.23, 5.61, 1.0);

    return mColor;
}
        `
};

MiaokitJS.ShaderLab.Shader["Mapbox"] = {
    name: "Mapbox",
    type: "Render",
    mark: ["Opaque"],
    vs_src: PNTT_P + ATMOS_VS + `
vec4 vs()
{
    PNTT();
    
    Atmosphere(normalize(u_Sunlight.xyz), v_Position.xyz);
    
    return ObjectToClipPos(a_Position.xyz);
}
        `,
    fs_src: BRDF + ATMOS_FS + `
vec4 fs()
{
    vec4 mColor = vec4(0.6019608, 0.7862745, 0.8254902, 1.0);
    
    mColor.rgb += BRDF_LIGHT();

    mColor = AtmosphereLight(mColor, normalize(u_Sunlight.xyz));
    mColor.a = 1.0;

    return mColor;
}
        `
};

MiaokitJS.ShaderLab.Shader["Mapbox2"] = {
    name: "Mapbox2",
    type: "Render",
    mark: ["Opaque"],
    vs_src: PNTT_P + ATMOS_VS + `
vec4 vs()
{
    PNTT();
    
    Atmosphere(normalize(u_Sunlight.xyz), v_Position.xyz);
    
    return ObjectToClipPos(a_Position.xyz);
}
        `,
    fs_src: BRDF + ATMOS_FS + `
vec4 fs()
{
    vec4 mColor = vec4(0.6019608, 0.7862745, 0.8254902, 1.0);
    
    mColor.rgb += BRDF_LIGHT();

    mColor = AtmosphereLight(mColor, normalize(u_Sunlight.xyz));
    mColor.a = 1.0;

    return mColor;
}
        `
};

MiaokitJS.ShaderLab.Shader["Dioramas"] = {
    name: "Dioramas",
    type: "Render",
    mark: ["Opaque"],
    vs_src: PNTT_P + ATMOS_VS + `
vec4 vs()
{
    //float n = a_Normal.x; 
    //float nx = n / 8.0;  n = floor(nx); nx = (nx - n) * 4.0 - 1.0;
    //float ny = n / 8.0;  n = floor(ny); ny = (ny - n) * 4.0 - 1.0;
    //float nz = (n - 2.0) * 0.5;

    ///PNTT(a_Position.xyz, vec3(nx, ny, nz), a_Tangent.xyz);
    
    //Atmosphere(normalize(u_Sunlight.xyz), v_Position.xyz);

    v_UV = vec4(a_UV, 0.0, 0.0);

    return ObjectToClipPos(a_Position.xyz);
}
        `,
    fs_src: BRDF + ATMOS_FS + `
vec4 fs()
{
    vec4 mColor = Tex2D(u_MainTex, v_UV.xy);
    
    //mColor.rgb += BRDF_LIGHT();
    //mColor.rgb = clamp(mColor.rgb, 0.0, 1.0);
    
    //mColor = AtmosphereLight(mColor, normalize(u_Sunlight.xyz));
    //mColor.a = 1.0;
    
    return mColor;
}
        `
};

MiaokitJS.ShaderLab.Shader["GIS"] = {
    name: "GIS",
    type: "Render",
    mark: ["Opaque"],
    vs_src: MiaokitJS.ShaderLab.Shader["Common"]["AtmosphereVS"] + `
uniform sampler2D _TerrainTex;
uniform vec4 _LngLat;
uniform vec4 _Terrain;

varying vec3 v_Normal;
varying vec3 v_UV;

vec4 CalNormal(float nTexU, float nTexV, vec4 mLngLat, vec4 mTerrain)
{
	vec4 aUV[5];
	aUV[0] = vec4(nTexU, nTexV, 0.0, 0.0);
	aUV[1] = vec4(nTexU - mLngLat.w, nTexV, 0.0, 0.0);
	aUV[2] = vec4(nTexU + mLngLat.w, nTexV, 0.0, 0.0);
	aUV[3] = vec4(nTexU, nTexV - mLngLat.w, 0.0, 0.0);
	aUV[4] = vec4(nTexU, nTexV + mLngLat.w, 0.0, 0.0);
    
	float aHeight[5];
	aHeight[0] = 0.0; aHeight[1] = 0.0; aHeight[2] = 0.0; aHeight[3] = 0.0; aHeight[4] = 0.0;
    
	for (int i = 0; i < 5; i++)
	{
        // 约束到[0,1]范围
		aUV[i].xy /= mLngLat.z;
		aUV[i].x = aUV[i].x * mTerrain.z + mTerrain.x;
		aUV[i].y = aUV[i].y * mTerrain.z + mTerrain.y;
        
		vec4 mHeight = texture2D(_TerrainTex, aUV[i].xy);
		float nHeight = ((mHeight.r * 256.0 * 256.0 * 256.0) + (mHeight.g * 256.0 * 256.0) + (mHeight.b * 256.0)) * 0.001;
        
		aHeight[i] = nHeight;
	}
    
	float nLng = (mLngLat.x + nTexU) / 131072.0 * 3.141592654;
	float nLat = (mLngLat.y - nTexV) / 131072.0 * 3.141592654;
    
	vec3 mNormal = vec3(0.0, 0.0, 0.0);
	vec3 mBinormal = vec3(0.0, 0.0, 0.0);
	vec3 mTangent = vec3(0.0, 0.0, 0.0);
    
	mNormal.y = sin(nLat);
	mNormal.x = cos(nLat) * cos(nLng);
	mNormal.z = cos(nLat) * sin(nLng);
    
	mBinormal.y = sin(nLat);
	mBinormal.x = cos(nLat) * cos(nLng + 1.57079633);
	mBinormal.z = cos(nLat) * sin(nLng + 1.57079633);
    
	mTangent.y = sin(nLat + 1.57079633);
	mTangent.x = cos(nLat + 1.57079633) * cos(nLng);
	mTangent.z = cos(nLat + 1.57079633) * sin(nLng);
    
	float nScale = 1.0 / ((mLngLat.w / 131072.0 *  3.141592654) * 6378137.0);
    nScale *= 2.0;
	mNormal += mBinormal * (aHeight[1] - aHeight[2]) * nScale + mTangent * (-aHeight[3] + aHeight[4]) * nScale;
	normalize(mNormal);
    
	return vec4(mNormal, aHeight[0]);
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
    
    // TODO: 需要世界变换矩阵做变换
    v_Normal = vec3(nVecX, nVecY, nVecZ);

    float nHeight = 0.0;
    if(7.9 < mTerrain.w)
    {
        vec2 _UV = vec2(nTexU, nTexV) / mLngLat.z;
        
        _UV.x = _UV.x * mTerrain.z + mTerrain.x;
		_UV.y = _UV.y * mTerrain.z + mTerrain.y;
        
        vec4 mHeight = texture2D(_TerrainTex, _UV);
        
		nHeight = ((mHeight.r * 256.0 * 256.0 * 256.0) + (mHeight.g * 256.0 * 256.0) + (mHeight.b * 256.0)) * 0.001;
        nHeight -= 1000.0;
    }
    
    mPosition = mPosition * (6378137.0 + nHeight);

    nTexU /= mLngLat.z;
	nTexV /= mLngLat.z;
    
	// 网格从左上角开始，影像贴图从左下角开始  
    v_UV = vec3(nTexU, nTexV, mMap.y);
    
    //vec3 mLightDir = normalize(u_Sunlight.xyz);
    //Atmosphere(mLightDir, ObjectToWorldPos(mPos));
    
    return u_MatVP * u_MatG * vec4(mPosition.xyz, 1.0);
}
        `,
    fs_src: MiaokitJS.ShaderLab.Shader["Common"]["BRDF"] + MiaokitJS.ShaderLab.Shader["Common"]["AtmosphereFS"] + `
uniform sampler2D _TerrainTex;
uniform sampler2D _PhotoTex;

varying vec3 v_Normal;
varying vec3 v_UV;

vec4 fs()
{
    vec4 mColor = texture(_PhotoTex, v_UV.xy);
    
    //vec3 _ViewDir = normalize(v_ViewDir.xyz);
    //vec3 _Light = normalize(u_Sunlight.xyz);
    //mColor.rgb += BRDF(_Light, _ViewDir, v_Normal, vec3(1.0, 0.0, 0.0), vec3(0.0, 0.0, 1.0)) * 0.4;
    
    //mColor = AtmosphereLight(mColor, normalize(u_Sunlight.xyz));
    //mColor.a = 1.0;
    
    return mColor;
}
        `
};

MiaokitJS.ShaderLab.Shader["Cosmos"] = {
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

MiaokitJS.ShaderLab.Shader["Sky"] = {
    name: "Sky",
    type: "Clear",
    mark: ["Opaque"],
    vs_src: PNT_SPHERE + ATMOS_VS + `
vec4 vs()
{
    vec4 mClip = SPHERE(64.0);

    Atmosphere(normalize(u_Sunlight.xyz), v_Position.xyz);
    
    return mClip;
}
        `,
    fs_src: ATMOS_FS + `
vec4 fs()
{
    return AtmosphereColor(vec4(1.0, 1.0, 1.0, 1.0), normalize(u_Sunlight.xyz));
}
        `
};

MiaokitJS.ShaderLab.Shader["Ground"] = {
    name: "Ground",
    type: "Clear",
    mark: ["Opaque"],
    vs_src: PNT_SPHERE + ATMOS_VS + `
vec4 vs()
{
    vec4 mClip = SPHERE(64.0);

    Atmosphere(normalize(u_Sunlight.xyz), v_Position.xyz);
    
    return mClip;
}
        `,
    fs_src: BRDF_P + ATMOS_FS + `
vec4 fs()
{
    vec4 mColor = vec4(0.1019608, 0.2862745, 0.3254902, 1.0);
    
    mColor = AtmosphereLight(mColor, normalize(u_Sunlight.xyz)) * 0.5;
    mColor.a = 1.0;
    
    //mColor.rgb += BRDF_LIGHT(vec3(1.0, 0.0, 0.0), vec3(0.0, 0.0, 1.0)) * 0.5;

    return mColor;
}
        `
};

MiaokitJS.ShaderLab.Shader["EdgeDetection"] = {
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
    
    /// 获取中心及周边斜角4个点的颜色混合次数========================
    float _Count0 = ceil(_Color0.a);
    float _Count1 = ceil(_Color1.a);
    float _Count2 = ceil(_Color2.a);
    float _Count3 = ceil(_Color3.a);
    float _Count4 = ceil(_Color4.a);
    
    _Color0.rgb /= _Count0;
    
    /// 计算中心及周边斜角4个点的颜色灰度============================
    vec3 _Luma = vec3(0.299, 0.587, 0.114);
    
    float _LumaM  = dot(_Color0.rgb, _Luma);
    float _LumaNW = dot(_Color1.rgb / _Count1, _Luma);
    float _LumaNE = dot(_Color3.rgb / _Count3, _Luma);
    float _LumaSW = dot(_Color4.rgb / _Count4, _Luma);
    float _LumaSE = dot(_Color2.rgb / _Count2, _Luma);
    
    float _LumaMin = min(_LumaM, min(min(_LumaNW, _LumaNE), min(_LumaSW, _LumaSE)));
    float _LumaMax = max(_LumaM, max(max(_LumaNW, _LumaNE), max(_LumaSW, _LumaSE)));
    
    ///计算选中对象轮廓==============================================
    _Count1 = ceil(_Count1 - _Color1.a);
    _Count2 = ceil(_Count2 - _Color2.a);
    _Count3 = ceil(_Count3 - _Color3.a);
    _Count4 = ceil(_Count4 - _Color4.a);

    float _Diff1 = (_Count1 - _Count2) * 0.5;
	float _Diff2 = (_Count3 - _Count4) * 0.5;
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
    _ColorA += _Blend0.rgb / _Blend0.a;
    _ColorA += _Blend1.rgb / _Blend1.a;
    _ColorA *= 0.5;

    vec3 _ColorB = vec3(0.0, 0.0, 0.0);
    _ColorB += _Blend2.rgb / _Blend2.a;
    _ColorB += _Blend3.rgb / _Blend3.a;
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
    _Color0.rgb += vec3(5.0, 0.7, 0.0) * _Diff;
    
    return _Color0;
}
        `
};

MiaokitJS.ShaderLab.Shader["HDR"] = {
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
uniform vec4 u_InvTexSize;
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

MiaokitJS.ShaderLab.Shader["Upsampling"] = {
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

MiaokitJS.ShaderLab.Shader["Present"] = {
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
uniform vec4 u_InvTexSize;
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

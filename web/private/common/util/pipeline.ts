
MiaokitJS.ShaderLab.Pipeline = {
    "_name": "Pipeline",

    ColorTarget: [
        /// 1.绘制不透明物体颜色缓存;
        { ID: 1, Handle: 0, Format: "RGBA32_FLOAT" },
        /// 2.绘制透明物体颜色缓存
        { ID: 2, Handle: 0, Format: "RGBA32_FLOAT" }
    ],

    DepthTarget: [
        /// 1.绘制物体深度缓存
        { ID: 1, Handle: 0, Format: "D16_UNORM" }
    ],

    BlendState: [
        /// 1.不启用混合
        { ID: 1, Enable: false },
        /// 2.启用混合，用于绘制透明物体
        { ID: 2, Enable: true, ColorOP: "Add", AlphaOP: "Add", ColorSrc: "One", ColorDest: "One", AlphaSrc: "One", AlphaDest: "One" }
    ],

    DepthState: [
        /// 1.不启用深度和模板操作
        { ID: 1, Enable: false },
        /// 2.启用深度测试，启用深度写入
        { ID: 2, Enable: true, Write: true, TestOP: "LessEqual" },
        /// 3.启用深度测试，关闭深度写入
        { ID: 3, Enable: true, Write: false, TestOP: "LessEqual" }
    ],

    Pass: [
        {
            Name: "绘制不透明物体",
            Type: "Render",
            Mask: ["Opaque"],
            Target: [1, 1],
            Blend: 1
        },
        {
            Name: "绘制透明物体",
            Type: "Render",
            Mask: ["Transparent"],
            Target: [2, 1],
            Blend: 2
        },
        {
            Name: "合成图像",
            Type: "Postprocess",
            Mask: [],
            Target: [0, 0],
            Uniforms: function () {
                return null;
            }
        }
    ],

    InternalShader: [
        "Default", /*00*/ "Default", /*01*/ "Default", /*02*/ "Default", /*03*/
        "Default", /*04*/ "Default", /*05*/ "Default", /*06*/ "Default", /*07*/
        "Default", /*08*/ "Default", /*09*/ "Default", /*10*/ "Default", /*11*/
        "Default", /*12*/ "Default", /*13*/ "Default", /*14*/ "Default"  /*15*/
    ]
};


MiaokitJS.ShaderLab.Shader["Common"] = {
    code_vs: `
precision highp float;

attribute vec3 a_Position;
attribute vec3 a_Normal;
attribute vec2 a_UV;
attribute vec4 a_Color;
attribute vec4 a_Tangent;
attribute vec4 a_Binormal;
attribute vec2 a_UV2;

uniform mat4 u_MatW;
uniform mat4 u_MatWV;
uniform mat4 u_MatWVP;

varying vec3 v_Position;
varying vec3 v_Normal;
varying vec2 v_UV;
varying vec4 v_Color;
varying vec4 v_Tangent;
varying vec4 v_Binormal;

/// 对象空间坐标转世界空间坐标
vec3 ObjectToWorldPos(vec3 i_Position)
{
    return (u_MatW * vec4(i_Position, 1.0)).xyz;
}

/// 对象空间坐标转摄像机空间坐标
vec3 ObjectToViewPos(vec3 i_Position)
{
    return (u_MatWV * vec4(i_Position, 1.0)).xyz;
}

/// 对象空间坐标转裁剪空间坐标
vec4 ObjectToClipPos(vec3 i_Position)
{
    return u_MatWVP * vec4(i_Position, 1.0);
}
        `,
    code_fs: `
precision highp float;

uniform mat4 u_MatW;
uniform mat4 u_MatWV;
uniform mat4 u_MatWVP;
uniform sampler2D u_MainTex;

varying vec3 v_Position;
varying vec3 v_Normal;
varying vec2 v_UV;
varying vec4 v_Color;
varying vec4 v_Tangent;
varying vec4 v_Binormal;

/// 对象空间坐标转世界空间坐标
vec3 ObjectToWorldPos(vec3 i_Position)
{
    return (u_MatW * vec4(i_Position, 1.0)).xyz;
}

/// 对象空间坐标转摄像机空间坐标
vec3 ObjectToViewPos(vec3 i_Position)
{
    return (u_MatWV * vec4(i_Position, 1.0)).xyz;
}

/// 对象空间坐标转裁剪空间坐标
vec4 ObjectToClipPos(vec3 i_Position)
{
    return u_MatWVP * vec4(i_Position, 1.0);
}

/// 采样2D纹理
vec4 Tex2D(sampler2D i_Tex, vec2 i_UV)
{
    i_UV.x = fract(i_UV.x);
    i_UV.y = fract(1.0 - i_UV.y);

    return texture2D(i_Tex, i_UV);
}
        `
};

MiaokitJS.ShaderLab.Shader["Default"] = {
    mark: ["Opaque"],
    code_vs: `
void main()
{
    gl_Position = ObjectToClipPos(a_Position);
    v_Normal = a_Normal;
    v_UV = a_UV;
}
        `,
    code_fs: `
void main()
{
    gl_FragColor = Tex2D(u_MainTex, v_UV);
}
        `
};

using System.Collections;
using System.Collections.Generic;
using UnityEngine;

public class Reflection : MonoBehaviour
{
    /// <summary>
    /// 脚本初始化方法。
    /// </summary>
    private void Start()
    {
        Camera.main.depthTextureMode = DepthTextureMode.Depth;
        m_pMaterial = new Material(m_pShader);
    }

    /// <summary>
    /// 图像后期处理。
    /// </summary>
    private void OnRenderImage(RenderTexture pSrc, RenderTexture pDest)
    {
        Graphics.Blit(pSrc, pDest, m_pMaterial);
    }


    /// <summary>
    /// 着色器对象。
    /// </summary>
    public Shader m_pShader;

    /// <summary>
    /// 材质对象。
    /// </summary>
    private Material m_pMaterial;

    // https://blog.csdn.net/lly707649841/article/details/80024156
    // https://www.cnblogs.com/wantnon/p/6979903.html?utm_source=itdadao&utm_medium=referral
    // https://github.com/keijiro/DepthToWorldPos
    // https://docs.unity3d.com/Manual/SL-BuiltinFunctions.html
    // https://blog.csdn.net/notmz/article/details/80513711
}

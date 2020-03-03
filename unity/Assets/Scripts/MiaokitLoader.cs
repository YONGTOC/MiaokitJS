using System;
using System.Runtime.InteropServices;
using UnityEngine;
using MiaokitJS;

public class MiaokitLoader : MonoBehaviour, IMiaokitLoader
{
    /// <summary>
    /// MIAOKIT模块启动驱动。
    /// </summary>
    private void Awake()
    {
#if !UNITY_EDITOR && UNITY_WEBGL
        WebGLInput.captureAllKeyboardInput = false;
        m_bIsWebGL = true;
#else
        m_bIsWebGL = false;
#endif

        new MiaokitJS.Miaokit(this);
    }

    /// <summary>
    /// MIAOKIT模块更新驱动。
    /// </summary>
    private void Update()
    {
        if (null != Miaokit.g_pIns)
        {
            Miaokit.g_pIns.Update();
        }
    }

    /// <summary>
    /// MIAOKIT模块更新销毁。
    /// </summary>
    private void OnDestroy()
    {
        if (null != Miaokit.g_pIns)
        {
            Miaokit.g_pIns.Destory();
        }
    }


    /// <summary>
    /// 编码字符串。
    /// </summary>
    /// <param name="pStr"></param>
    /// <returns></returns>
    public byte[] EncodeString(string pStr)
    {
        return System.Text.Encoding.UTF8.GetBytes(pStr);
    }

    /// <summary>
    /// 加载DLL。
    /// </summary>
    public void LoadLibrary()
    {
#if !((UNITY_IPHONE || UNITY_WEBGL) && !UNITY_EDITOR)
#if UNITY_EDITOR
        if (IntPtr.Zero == m_nLib)
        {
            m_nLib = LoadLibrary(Application.dataPath.Replace("Assets", "./Plugins/x86_64/Miaokit.dll"));
        }
#else
        if (IntPtr.Zero == m_nLib)
        {
            m_nLib = LoadLibrary("./Plugins/x86_64/Miaokit.dll");
        }
#endif
#endif
    }

    /// <summary>
    /// 卸载DLL。
    /// </summary>
    public void FreeLibrary()
    {
#if !((UNITY_IPHONE || UNITY_WEBGL) && !UNITY_EDITOR)
        if (IntPtr.Zero != m_nLib)
        {
            IntPtr nFinalize = GetProcAddress(m_nLib, "Finalize");
            dynCall_v pFinalize = (dynCall_v)Marshal.GetDelegateForFunctionPointer(nFinalize, typeof(dynCall_v));

            pFinalize();

            FreeLibrary(m_nLib);

            m_nLib = IntPtr.Zero;
        }
#endif
    }

    /// <summary>
    /// 获取DLL导出函数。
    /// </summary>
    /// <param name="pFunc">函数名称。</param>
    /// <returns>返回函数地址。</returns>
    public IntPtr GetProcAddress(string pFunc)
    {
#if !((UNITY_IPHONE || UNITY_WEBGL) && !UNITY_EDITOR)
        if (IntPtr.Zero != m_nLib)
        {
            if("CopyMemory" == pFunc)
            {
                return Marshal.GetFunctionPointerForDelegate<dynCall_vjji>(CopyMemory);
            }

            return GetProcAddress(m_nLib, pFunc);
        }
#endif

        return IntPtr.Zero;
    }


    /// <summary>
    /// 是否为本地程序
    /// </summary>
    public bool isNavive
    {
        get
        {
            return !m_bIsWebGL;
        }
    }

    /// <summary>
    /// 服务器地址。
    /// </summary>
    public string serverUrl
    {
        get
        {
            return "http://sve.yongtoc.com/";
        }
    }

    /// <summary>
    /// 主摄像机对象。
    /// </summary>
    public GameObject cameraObject
    {
        get
        {
            return m_pCamera;
        }
    }

    /// <summary>
    /// 样式对象。
    /// </summary>
    public GameObject style
    {
        get
        {
            return m_aStyle[1];
        }
    }


    /// <summary>
    /// 默认摄像机对象。
    /// </summary>
    public GameObject m_pCamera;

    /// <summary>
    /// 内置样式预制件列表。
    /// </summary>
    public GameObject[] m_aStyle;


    /// <summary>
    /// 是否为WEBGL应用。
    /// </summary>
    private bool m_bIsWebGL;
    /// <summary>
    /// DLL库句柄。
    /// </summary>
    private IntPtr m_nLib;
    /// <summary>
    /// 函数签名。
    /// </summary>
    private delegate void dynCall_v();
    /// <summary>
    /// 函数签名。
    /// </summary>
    private delegate void dynCall_vjji(IntPtr p0, IntPtr p1, int p2);


#if !((UNITY_IPHONE || UNITY_WEBGL) && !UNITY_EDITOR)
    [DllImport("kernel32.dll")]
    private extern static IntPtr LoadLibrary(string pPath);
    [DllImport("kernel32.dll")]
    private extern static IntPtr GetProcAddress(IntPtr nLib, string pFunc);
    [DllImport("kernel32.dll")]
    private extern static bool FreeLibrary(IntPtr nLib);
    [DllImport("kernel32.dll")]
    [AOT.MonoPInvokeCallback(typeof(dynCall_vjji))]
    private extern static void CopyMemory(IntPtr nDest, IntPtr nSrc, int nCount);
#endif
}

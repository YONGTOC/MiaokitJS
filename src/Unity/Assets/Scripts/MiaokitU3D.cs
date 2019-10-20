using System;
using System.Collections;
using System.Collections.Generic;
using System.Runtime.InteropServices;
using UnityEngine;
using MiaokitJS;


namespace MiaokitJS
{
    public interface MList
    {
        /// <summary>
        /// 元素数量。
        /// </summary>
        int Count { get; }

        /// <summary>
        /// 获取列表迭代器。
        /// </summary>
        /// <returns>返回列表迭代器。</returns>
        IEnumerator GetEnumerator();
    }

    public interface Tile
    {
        /// <summary>
        /// 对象ID。
        /// </summary>
        int handle { get; }

        /// <summary>
        /// 本地对象指针。
        /// </summary>
        IntPtr nativePtr { get; }

        /// <summary>
        /// 获取场景数量。
        /// </summary>
        int sceneCount { get; }

        /// <summary>
        /// 获取场景列表。
        /// </summary>
        MList scenes { get; }

        /// <summary>
        /// 瓦片原始数据。
        /// </summary>
        byte[] rawData { get; set; }
    }

    public interface Scene
    {
        /// <summary>
        /// 对象ID。
        /// </summary>
        int handle { get; }

        /// <summary>
        /// 本地对象指针。
        /// </summary>
        IntPtr nativePtr { get; }

        /// <summary>
        /// 场景ID。
        /// </summary>
        string id { get; }

        /// <summary>
        /// 获取楼层数量。
        /// </summary>
        int layerCount { get; }

        /// <summary>
        /// 获取楼层列表。
        /// </summary>
        MList layers { get; }

        /// <summary>
        /// 场景根对象。
        /// </summary>
        Object3D object3D { get; }
    }

    public interface Layer
    {
        /// <summary>
        /// 对象ID。
        /// </summary>
        int handle { get; }

        /// <summary>
        /// 本地对象指针。
        /// </summary>
        IntPtr nativePtr { get; }

        /// <summary>
        /// 场景ID。
        /// </summary>
        string id { get; }

        /// <summary>
        /// 获取楼层数量。
        /// </summary>
        int siteCount { get; }

        /// <summary>
        /// 获取楼层列表。
        /// </summary>
        MList sites { get; }

        /// <summary>
        /// 场景根对象。
        /// </summary>
        Object3D object3D { get; }

        /// <summary>
        /// 绘制函数。
        /// </summary>
        void Draw();
    }

    public interface Object3D
    {
        /// <summary>
        /// 对象ID。
        /// </summary>
        int handle { get; }

        /// <summary>
        /// 本地对象指针。
        /// </summary>
        IntPtr nativePtr { get; }

        /// <summary>
        /// 对象ID。
        /// </summary>
        string id { get; }

        /// <summary>
        /// 实际对象。
        /// </summary>
        GameObject gameObject { get; }

        /// <summary>
        /// 对象变换组件。
        /// </summary>
        Transform transform { get; }
    }

    public interface Gis
    {
        /// <summary>
        /// 刷新GIS显示。
        /// </summary>
        void Update(float rLng, float rLat, float nHeight);
    }

    public interface CameraCtrl
    {
        /// <summary>
        /// 初始化摄像机。
        /// </summary>
        void Init();

        /// <summary>
        /// 重置摄像机状态。
        /// </summary>
        void Reset();

        /// <summary>
        /// 刷新摄像机状态。
        /// </summary>
        void Update();

        /// <summary>
        /// 远近拉伸缩放。
        /// </summary>
        void Pinch(float nDelta);

        /// <summary>
        /// 平移:0或者旋转:2。
        /// </summary>
        void Drag(int nCtrl, float nDeltaX, float nDeltaY);
    }


    public class Miaokit
    {
        /// <summary>
        /// 构造函数。
        /// </summary>
        /// <param name="pCamera">默认摄像机对象。</param>
        /// <param name="pMaterial">默认材质。</param>
        public Miaokit(MonoBehaviour pBehaviour, GameObject pCamera, GameObject[] aStyle)
        {
            Factory pFactory = new Factory();
            pFactory.m_pServer = "http://sve.yongtoc.com/";
            pFactory.m_pBehaviour = pBehaviour;
            pFactory.m_pCamera = pCamera;
            pFactory.m_pStyle = new Prefab_(aStyle[1]);
            pFactory.m_pGis = new Gis_(pFactory.m_pStyle.CreateMaterial(1, 7), 64);

#if !UNITY_EDITOR && UNITY_WEBGL
            string pVersion = "20190805_1836";
            string pImports = Exports.Collect(pVersion);

            Imports.Init(pImports, pImports.Length);

            m_nRenderEvent = Marshal.GetFunctionPointerForDelegate<Exports.dynCall_vi>(Imports.RenderingEvent);
#else
            IntPtr[] aFunc = Exports.Collect();
            IntPtr nFuncList = Marshal.UnsafeAddrOfPinnedArrayElement(aFunc, 0);

            string pPath = Application.dataPath.Replace("Assets", "../Bin/Plugins/x86_64/Miaokit.dll");

            m_nLib = Imports.LoadLibrary(pPath);

            IntPtr nInit = Imports.GetProcAddress(m_nLib, "Init");
            Exports.dynCall_vji pInit = (Exports.dynCall_vji)Marshal.GetDelegateForFunctionPointer(nInit, typeof(Exports.dynCall_vji));

            pInit(nFuncList, aFunc.Length);
#endif

            g_pIns = this;
        }

        /// <summary>
        /// 更新函数。
        /// </summary>
        public void Update()
        {
#if !UNITY_EDITOR && UNITY_WEBGL
            GL.IssuePluginEvent(m_nRenderEvent, 1);
#else
#endif
        }

        /// <summary>
        /// 销毁函数。
        /// </summary>
        public void Destory()
        {
#if !UNITY_EDITOR && UNITY_WEBGL
#else
            if (m_nLib != IntPtr.Zero)
            {
                IntPtr nFinalize = Imports.GetProcAddress(m_nLib, "Finalize");
                Exports.dynCall_v pFinalize = (Exports.dynCall_v)Marshal.GetDelegateForFunctionPointer(nFinalize, typeof(Exports.dynCall_v));

                pFinalize();

                Imports.FreeLibrary(m_nLib);
            }
#endif
        }


        /// <summary>
        /// 更新回调函数指针。
        /// </summary>
        private IntPtr m_nRenderEvent = IntPtr.Zero;
        /// <summary>
        /// 动态链接库。
        /// </summary>
        private IntPtr m_nLib = IntPtr.Zero;

        /// <summary>
        /// 全局单例。
        /// </summary>
        public static Miaokit g_pIns = null;

        #region 函数映射
        /// <summary>
        /// GIS对象。
        /// </summary>
        public Gis gis
        {
            get
            {
                if (null == Factory.g_pIns.m_pGis)
                {
                    Factory.g_pIns.m_pGis = new Gis_(Factory.g_pIns.m_pStyle.CreateMaterial(1, 7), 64);
                }

                return Factory.g_pIns.m_pGis;
            }
        }

        /// <summary>
        /// 获取摄像机控制器。
        /// </summary>
        public CameraCtrl cameraCtrl
        {
            get
            {
                if (null == Factory.g_pIns.m_pCameraCtrl)
                {
                    Factory.g_pIns.m_pCameraCtrl = new CameraCtrl_(_GetCameraCtrl(IntPtr.Zero));
                }

                return Factory.g_pIns.m_pCameraCtrl;
            }

            set
            {
                Factory.g_pIns.m_pCameraCtrl = value;
            }
        }

        /// <summary>
        /// 装载瓦片数据。
        /// </summary>
        /// <param name="aData">瓦片数据。</param>
        /// <returns>返回瓦片对象。</returns>
        public Tile LoadTile(byte[] aData)
        {
            if (null != aData)
            {
                IntPtr nAddr = Marshal.UnsafeAddrOfPinnedArrayElement(aData, 0);
                IntPtr nSize = new IntPtr(aData.Length);

                int nTile = _LoadTile(IntPtr.Zero, nAddr, nSize);
                Tile pTile = Factory.g_pIns.GetObject<Tile>(nTile);

                pTile.rawData = aData;

                return pTile;
            }

            return null;
        }

        /// <summary>
        /// 拾取对象。
        /// </summary>
        /// <param name="nLayers"></param>
        /// <returns></returns>
        public Object3D PickEntity(int nLayers)
        {
            int nObject = _PickEntity(nLayers);

            if (0 < nObject)
            {
                return Factory.g_pIns.GetObject<Object3D>(nObject);
            }

            return null;
        }


        /// <summary>
        /// 初始化函数指针。
        /// </summary>
        /// <param name="aName">函数名列表。</param>
        /// <param name="aFunc">函数地址列表。</param>
        internal static void InitFunc(string[] aName, IntPtr[] aFunc)
        {
            for (int i = 0; i < aName.Length; i++)
            {
                switch (aName[i])
                {
                    case nameof(_LoadTile):
                        _LoadTile = (Exports.dynCall_ijjj)Marshal.GetDelegateForFunctionPointer(aFunc[i], typeof(Exports.dynCall_ijjj));
                        break;
                    case nameof(_GetCameraCtrl):
                        _GetCameraCtrl = (Exports.dynCall_jj)Marshal.GetDelegateForFunctionPointer(aFunc[i], typeof(Exports.dynCall_jj));
                        break;
                    case nameof(_PickEntity):
                        _PickEntity = (Exports.dynCall_ii)Marshal.GetDelegateForFunctionPointer(aFunc[i], typeof(Exports.dynCall_ii));
                        break;
                    default:
                        break;
                }
            }
        }

        /// <summary>
        /// 加载瓦片数据。
        /// </summary>
        internal static Exports.dynCall_ijjj _LoadTile = null;

        /// <summary>
        /// 获取内置摄像机控制器。
        /// </summary>
        internal static Exports.dynCall_jj _GetCameraCtrl = null;

        /// <summary>
        /// 拾取对象。
        /// </summary>
        internal static Exports.dynCall_ii _PickEntity = null;
        #endregion
    }
}


public class MiaokitU3D : MonoBehaviour
{
    /// <summary>
    /// MIAOKIT模块启动驱动。
    /// </summary>
    private void Start()
    {
        m_pMiaokit = new MiaokitJS.Miaokit(this, m_pCamera, m_aStyle);

#if !UNITY_EDITOR && UNITY_WEBGL
        WebGLInput.captureAllKeyboardInput = false;
#else
        m_pTest = new TestUtil();
#endif
    }

    /// <summary>
    /// MIAOKIT模块更新驱动。
    /// </summary>
    private void Update()
    {
        if (null != m_pMiaokit)
        {
            m_pMiaokit.Update();

#if !UNITY_EDITOR && UNITY_WEBGL
            // ...
#else
            m_pTest.Update();
#endif
        }
    }

    /// <summary>
    /// MIAOKIT模块更新销毁。
    /// </summary>
    private void OnDestroy()
    {
        if (null != m_pMiaokit)
        {
            m_pMiaokit.Destory();
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
    /// MIAOKIT模块对接对象。
    /// </summary>
    private MiaokitJS.Miaokit m_pMiaokit;


    /// <summary>
    /// 测试对象。
    /// </summary>
    private TestUtil m_pTest;
}


public class TestUtil
{
    public TestUtil()
    {
        Miaokit.g_pIns.cameraCtrl.Init();
        Miaokit.g_pIns.cameraCtrl.Reset();

        //"http://t1.tianditu.gov.cn/DataServer?T=img_w&tk=fb14b0853d59b619e18c259898bd0d4d&x=0&y=0&l=1";

        return;

        Factory.g_pIns.Load("data/upload/admin/project/20190807/5d4a310351522.txt", delegate (byte[] aData)
        {
            Tile pTile = Miaokit.g_pIns.LoadTile(aData);
            Debug.LogError("瓦片：" + pTile.handle + " " + pTile.sceneCount);

            foreach (Scene pScene in pTile.scenes)
            {
                Object3D pObject = pScene.object3D;
                //pObject.transform.position = new Vector3(1582.0f, 155.0f, 2770.0f);
                //pObject.transform.eulerAngles = new Vector3(0.0f, -43.0f, 0.0f);

                float nHeight = 0.0f;

                Debug.LogError("场景：" + pScene.id + " " + pScene.layerCount);

                // if("A栋"== pScene.id)
                {
                    foreach (Layer pLayer in pScene.layers)
                    {
                        Object3D pLayerObj = pLayer.object3D;
                        pLayerObj.transform.localPosition = new Vector3(0.0f, nHeight, 0.0f); nHeight += 9.0f;

                        Debug.LogError("楼层：" + pLayer.id + " " + pLayer.siteCount);

                        m_pLayerList.Add(pLayer);
                    }
                }
            }

            m_nTick = 0;
        });
    }

    public void Update()
    {
        if(Input.GetMouseButtonDown(0))
        {
            Object3D pObj = Miaokit.g_pIns.PickEntity(int.MaxValue);
            if (null != pObj)
            {
                Debug.LogError(pObj.gameObject.name);
            }
        }
        

        if (Input.GetMouseButtonDown(1) || Input.GetMouseButtonDown(0))
        {
            m_mLastMousePosition = Input.mousePosition;
        }

        if (Input.GetMouseButton(1))
        {
            Miaokit.g_pIns.cameraCtrl.Drag(1, (Input.mousePosition.x - m_mLastMousePosition.x), (Input.mousePosition.y - m_mLastMousePosition.y));
            m_mLastMousePosition = Input.mousePosition;
        }

        if (Input.GetMouseButton(0))
        {
            //Vector3 mDelta = Input.mousePosition - m_mLastMousePosition;
            //Move(-mDelta.x, -mDelta.y, 0);
            Miaokit.g_pIns.cameraCtrl.Drag(0, (Input.mousePosition.x - m_mLastMousePosition.x), (Input.mousePosition.y - m_mLastMousePosition.y));
            m_mLastMousePosition = Input.mousePosition;
        }

        float nScroll = Input.GetAxis("Mouse ScrollWheel");
        if (nScroll != 0.0f)
        {
            float nDelta = nScroll / Mathf.Abs(nScroll);
            nDelta *= m_mEye.z * 0.05f;

            m_mEye.z -= nDelta;
            Miaokit.g_pIns.cameraCtrl.Pinch(nDelta);
        }

        Miaokit.g_pIns.cameraCtrl.Update();
        //Miaokit.g_pIns.gis.Update(0 * Mathf.Deg2Rad, 0 * Mathf.Deg2Rad, 10000);
        //Miaokit.g_pIns.gis.Update(m_mEye.x * Mathf.Deg2Rad, m_mEye.y * Mathf.Deg2Rad, m_mEye.z);

        //Miaokit.g_pIns.gis.Update(109.403967f * Mathf.Deg2Rad, 23.966053f * Mathf.Deg2Rad, 2000);
        //109.,23.304984 109.478046,23. 109.,22.
        //Miaokit.g_pIns.gis.Update(102.754256f * Mathf.Deg2Rad, 30.073848f * Mathf.Deg2Rad, 10000);
        //m_nLng += 0.01f * Mathf.PI;

        if (-1 < m_nTick)
        {
            m_pLayerList[m_nCurLayer].Draw();

            if (0 == ++m_nTick % 120)
            {
                if (m_pLayerList.Count == ++m_nCurLayer)
                {
                    m_nCurLayer = 0;
                }
            }
        }
    }

    public void Move(float nLng, float nLat, float nZoom)
    {
        // 60度视角下，距地面距离为地球半径时视线刚好能切过地球

        float nCurDis = m_mEye.z;

        if (nCurDis > 6378137.0f)
        {
            nCurDis = 6378137.0f;
        }

        if (nCurDis < 0.0f)
        {
            nCurDis = 0.0f;
        }

        // 可见弧度角性变化
        float nAngle = nCurDis / 6378137.0f * 120.0f;
        float offsetLng = nLng / Screen.width * nAngle;
        float offsetLat = nLat / Screen.height * nAngle;

        m_mEye.x += offsetLng;
        m_mEye.y += offsetLat;
        m_mEye.z += nZoom;
    }


    private Vector3 m_mLastMousePosition;
    private List<Layer> m_pLayerList = new List<Layer>();
    private int m_nTick = -1;
    private int m_nCurLayer = 0;
    private Vector3 m_mEye = new Vector3(110.30f, 25.22f, 63.781370f);
}

using System;
using System.Collections;
using System.Collections.Generic;
using System.Runtime.InteropServices;
using UnityEngine;


namespace MiaokitJS
{
    /// <summary>
    /// 产品对象类型枚举。
    /// </summary>
    internal enum ProductType
    {
        Invalid = 0,

        Byte,
        Int,
        Float,
        Vector2,
        Vector3,
        Vector4,
        Color,

        Array,
        Texture,
        Material,
        Mesh,
        Transform,
        GameObject,
        Prefab,

        Miaokit,
        Tile,
        Work,
        Layer,
        Site
    }

    /// <summary>
    /// 顶点输入类型枚举。
    /// </summary>
    internal enum VertexType
    {
        Position = 0,
        Normal,
        UV,
        Color,
        Tangent,

        Unknow1,
        Unknow2,
        Unknow3,
        Unknow4,

        UV2,
        UV3,
        UV4,
        UV5,
        UV6,
        UV7,
        UV8
    }

    /// <summary>
    /// 变换组件控制方式枚举。
    /// </summary>
    internal enum TransformCtrl
    {
        TOPOLOGY_TRIANGLE = 0,
        TOPOLOGY_QUAD = 2,
        TOPOLOGY_LINE = 3,
        TOPOLOGY_LINE_STRIP = 4,
        TOPOLOGY_POINT = 5,

        TRANS_INIT = 0,
        TRANS_GET_POSITION = 1,
        TRANS_SET_POSITION = 2,
        TRANS_GET_EULER = 3,
        TRANS_SET_EULER = 4,
        TRANS_GET_ROTATION = 5,
        TRANS_SET_ROTATION = 6,
        TRANS_GET_SCALE = 7,
        TRANS_SET_SCALE = 8,

        TRANS_GET_LOCAL_POSITION = 9,
        TRANS_SET_LOCAL_POSITION = 10,
        TRANS_GET_LOCAL_EULER = 11,
        TRANS_SET_LOCAL_EULER = 12,
        TRANS_GET_LOCAL_ROTATION = 13,
        TRANS_SET_LOCAL_ROTATION = 14,
        TRANS_GET_LOCAL_SCALE = 15,
        TRANS_SET_LOCAL_SCALE = 16,

        TRANS_GET_RIGHT = 17,
        TRANS_SET_RIGHT = 18,
        TRANS_GET_UP = 19,
        TRANS_SET_UP = 20,
        TRANS_GET_FORWARD = 21,
        TRANS_SET_FORWARD = 22,

        TRANS_ROTATE0 = 23,
        TRANS_ROTATE1 = 24,
        TRANS_TRANSLATE0 = 25,

        OBJECT_SET_BOX_COLLIDER = 26,
        OBJECT_IS_NAME = 27,
        OBJECT_ACTIVE = 28,
        OBJECT_ENABLE_COLLODER = 29,
        OBJECT_ENABLE_HIGHLIGHT = 30
    }


    /// <summary>
    /// 产品对象接口。
    /// </summary>
    internal interface IProduct
    {
        /// <summary>
        /// 对象ID。
        /// </summary>
        int ID { get; set; }

        /// <summary>
        /// 获取对象类型标识。
        /// </summary>
        /// <returns>返回对象类型标识。</returns>
        ProductType Type();

        /// <summary>
        /// 获取本地对象指针。
        /// </summary>
        /// <returns>返回本地对象指针。</returns>
        IntPtr GetPointer();

        /// <summary>
        /// 获取实际对象。
        /// </summary>
        /// <returns></returns>
        object Get();

        /// <summary>
        /// 销毁对象，释放内存空间。
        /// </summary>
        void Destroy();
    }

    /// <summary>
    /// 数组产品接口。
    /// </summary>
    internal interface IArray : IProduct
    {
    }


    /// <summary>
    /// 产品工厂。
    /// </summary>
    internal class Factory
    {
        /// <summary>
        /// 构造函数。
        /// </summary>
        public Factory()
        {
            if (null == g_pIns)
            {
                m_pLut = new ProductLut();
                m_nCamera = -1;
                m_aCount = new int[20];
                m_pPicker = new EntityPicker_();
                g_pIns = this;
            }
        }

        /// <summary>
        /// 创建一个产品对象。
        /// </summary>
        /// <param name="nType">产品类型。</param>
        /// <param name="nDesc">产品构造描述。</param>
        /// <returns>返回产品ID。</returns>
        public int Create(int nType, int nDesc, IntPtr nObject)
        {
            ProductType eType = (ProductType)nType;
            IProduct pProduct = null;

            switch (eType)
            {
                case ProductType.Byte:
                    pProduct = new Array_<byte>(nDesc, nObject);
                    break;
                case ProductType.Int:
                    pProduct = new Array_<int>(nDesc, nObject);
                    break;
                case ProductType.Float:
                    pProduct = new Array_<float>(nDesc, nObject);
                    break;
                case ProductType.Vector2:
                    pProduct = new Array_<Vector2>(nDesc, nObject);
                    break;
                case ProductType.Vector3:
                    pProduct = new Array_<Vector3>(nDesc, nObject);
                    break;
                case ProductType.Vector4:
                    pProduct = new Array_<Vector4>(nDesc, nObject);
                    break;
                case ProductType.Color:
                    pProduct = new Array_<Color>(nDesc, nObject);
                    break;
                case ProductType.Texture:
                    pProduct = new Texture_(nDesc, nObject);
                    break;
                case ProductType.Material:
                    pProduct = new Material_(nDesc, nObject);
                    break;
                case ProductType.Mesh:
                    pProduct = new Mesh_(nDesc, nObject);
                    break;
                case ProductType.GameObject:
                    pProduct = GameObject_.Create(nDesc, nObject);
                    break;
                case ProductType.Prefab:
                    pProduct = new Prefab_(nDesc, nObject);
                    break;
                case ProductType.Tile:
                    pProduct = new Tile_(nDesc, nObject);
                    break;
                case ProductType.Work:
                    pProduct = new Scene_(nDesc, nObject);
                    break;
                case ProductType.Layer:
                    pProduct = new Layer_(nDesc, nObject);
                    break;
                default:
                    break;
            }

            if (null != pProduct)
            {
                m_aCount[(int)pProduct.Type()]++;

                return m_pLut.Create(pProduct);
            }

            return 0;
        }

        /// <summary>
        /// 实例化预制件。
        /// </summary>
        /// <param name="nID">预制件ID。</param>
        /// <returns>返回实例对象ID。</returns>
        public IntPtr InstantiatePrefab(int nID)
        {
            List<GameObject> pList = null;

            IProduct pProduct = m_pLut.Get(nID);
            if (null != pProduct)
            {
                ProductType eType = pProduct.Type();
                switch (eType)
                {
                    case ProductType.Prefab:
                        pList = ((Prefab_)pProduct).Instantiate();
                        break;
                    default:
                        break;
                }
            }

            if (null != pList)
            {
                m_aPrefabObject = new int[pList.Count + 1];
                m_aPrefabObject[0] = pList.Count;

                for (int i = 0; i < pList.Count; i++)
                {
                    pProduct = GameObject_.Create(pList[i]);
                    m_aPrefabObject[i + 1] = m_pLut.Create(pProduct);
                }

                return Marshal.UnsafeAddrOfPinnedArrayElement(m_aPrefabObject, 0);
            }

            return IntPtr.Zero;
        }

        /// <summary>
        /// 设置对象数据。
        /// </summary>
        /// <param name="nID">对象ID。</param>
        /// <param name="nDesc">对象数据描述。</param>
        public void SetData(int nID, int nDesc)
        {
            IProduct pProduct = m_pLut.Get(nID);
            if (null != pProduct)
            {
                ProductType eType = pProduct.Type();
                switch (eType)
                {
                    case ProductType.Texture:
                        ((Texture_)pProduct).SetData(nDesc);
                        break;
                    case ProductType.Mesh:
                        ((Mesh_)pProduct).SetData(nDesc);
                        break;
                    case ProductType.Prefab:
                        ((Prefab_)pProduct).SetData(nDesc);
                        break;
                    case ProductType.GameObject:
                        ((GameObject_)pProduct).SetData(nDesc);
                        break;
                    default:
                        break;
                }
            }
        }

        /// <summary>
        /// 销毁一个产品对象。
        /// </summary>
        /// <param name="nID">产品ID。</param>
        public void Free(int nID)
        {
            IProduct pProduct = m_pLut.Get(nID);
            if (null != pProduct)
            {
                m_aCount[(int)pProduct.Type()]--;
                pProduct.Destroy();
            }

            m_pLut.Free(nID);
        }

        /// <summary>
        /// 销毁一个产品对象。
        /// </summary>
        /// <param name="pProduct">产品对象。</param>
        public void Free(IProduct pProduct)
        {
            if (null != pProduct)
            {
                if (0 < pProduct.ID)
                {
                    m_aCount[(int)pProduct.Type()]--;
                    m_pLut.Free(pProduct.ID);
                }
            }
        }

        /// <summary>
        /// 获取产品实际对象。
        /// </summary>
        /// <typeparam name="T">实际对象。</typeparam>
        /// <param name="nID">产品ID。</param>
        /// <returns>返回实际对象。</returns>
        public T Get<T>(int nID) where T : class
        {
            IProduct pProduct = m_pLut.Get(nID);
            if (null != pProduct)
            {
                return (T)pProduct.Get();
            }

            return null;
        }

        /// <summary>
        /// 获取产品对象。
        /// </summary>
        /// <typeparam name="T">产品类型。</typeparam>
        /// <param name="nID">产品ID。</param>
        /// <returns>返回实际对象。</returns>
        public T GetObject<T>(int nID) where T : class
        {
            return (T)m_pLut.Get(nID);
        }

        /// <summary>
        /// 获取默认摄像机对象。
        /// </summary>
        /// <returns>返回默认摄像机对象ID。</returns>
        public int GetCamera()
        {
            if (-1 == m_nCamera)
            {
                IProduct pProduct = GameObject_.Create(m_pCamera);
                m_nCamera = m_pLut.Create(pProduct);
            }

            return m_nCamera;
        }

        /// <summary>
        /// 获取分析数据。
        /// </summary>
        /// <returns>返回分析数据。</returns>
        public IntPtr Analyze()
        {
            string pInfo = "\'引擎对象\':{";
            pInfo += "\'工厂\':[" + m_pLut.m_nTotalCount + ", " + m_pLut.m_nUsedCount + ", " + (m_pLut.m_nTotalCount - m_pLut.m_nUsedCount) + "]";
            pInfo += ", \'Array\':" + m_aCount[(int)ProductType.Array];
            pInfo += ", \'Texture\':" + m_aCount[(int)ProductType.Texture];
            pInfo += ", \'Material\':" + m_aCount[(int)ProductType.Material];
            pInfo += ", \'Mesh\':" + m_aCount[(int)ProductType.Mesh];
            pInfo += ", \'GameObject\':" + m_aCount[(int)ProductType.GameObject];
            pInfo += ", \'Prefab\':" + m_aCount[(int)ProductType.Prefab];
            pInfo += "}0";

            m_aAnalyze = System.Text.Encoding.UTF8.GetBytes(pInfo);
            m_aAnalyze[m_aAnalyze.Length - 1] = 0;

            return Marshal.UnsafeAddrOfPinnedArrayElement(m_aAnalyze, 0);
        }

        /// <summary>
        /// 加载二进制数据。
        /// </summary>
        /// <param name="pPath">路径。</param>
        /// <param name="pCallback">加载完成回调。</param>
        public void Load(string pPath, Action<byte[]> pCallback)
        {            
            if(pPath.StartsWith("http"))
            {
                m_pBehaviour.StartCoroutine(LoadAsyn(pPath, pCallback));
            }
            else
            {
                m_pBehaviour.StartCoroutine(LoadAsyn(m_pServer + pPath, pCallback));
            }
        }

        /// <summary>
        /// 加载二进制数据。
        /// </summary>
        /// <param name="pPath">路径。</param>
        /// <param name="pCallback">加载完成回调。</param>
        public void Load(string pPath, Action<string> pCallback)
        {
            if (pPath.StartsWith("http"))
            {
                m_pBehaviour.StartCoroutine(LoadAsyn(pPath, pCallback));
            }
            else
            {
                m_pBehaviour.StartCoroutine(LoadAsyn(m_pServer + pPath, pCallback));
            }
        }

        /// <summary>
        /// 加载二进制数据。
        /// </summary>
        /// <param name="pPath">路径。</param>
        /// <param name="pCallback">加载完成回调。</param>
        private IEnumerator LoadAsyn(string pPath, Action<byte[]> pCallback)
        {
            WWW www = new WWW(pPath);
            yield return www;

            if (www.isDone && null != www.error)
            {
                Debug.LogError(www.url + " : " + www.error);
                pCallback(null);
            }
            else
            {
                pCallback(www.bytes);
            }
        }

        /// <summary>
        /// 加载二进制数据。
        /// </summary>
        /// <param name="pPath">路径。</param>
        /// <param name="pCallback">加载完成回调。</param>
        private IEnumerator LoadAsyn(string pPath, Action<string> pCallback)
        {
            WWW www = new WWW(pPath);
            yield return www;

            if (www.isDone && null != www.error)
            {
                Debug.LogError(www.url + " : " + www.error);
                pCallback(null);
            }
            else
            {
                pCallback(www.text);
            }
        }


        /// <summary>
        /// 服务器地址。
        /// </summary>
        public string m_pServer;

        /// <summary>
        /// 组件行为。
        /// </summary>
        public MonoBehaviour m_pBehaviour;

        /// <summary>
        /// 默认摄像机对象。
        /// </summary>
        public GameObject m_pCamera;

        /// <summary>
        /// 内置默认材质预制件。
        /// </summary>
        public Prefab_ m_pStyle;

        /// <summary>
        /// GIS对象。
        /// </summary>
        public Gis_ m_pGis;

        /// <summary>
        /// 内置摄像机控制器。
        /// </summary>
        public CameraCtrl m_pCameraCtrl;

        /// <summary>
        /// 内置对象拾取器。
        /// </summary>
        public EntityPicker_ m_pPicker;

        /// <summary>
        /// 产品查找表。
        /// </summary>
        private ProductLut m_pLut;

        /// <summary>
        /// 默认摄像机对象ID。
        /// </summary>
        private int m_nCamera;

        /// <summary>
        /// 各类对象数量统计。
        /// </summary>
        private int[] m_aCount;

        /// <summary>
        /// 分析数据。
        /// </summary>
        private byte[] m_aAnalyze;

        /// <summary>
        /// 预制件实例化对象ID列表。
        /// </summary>
        private int[] m_aPrefabObject;


        /// <summary>
        /// 全局单例。
        /// </summary>
        public static Factory g_pIns;
    }


    /// <summary>
    /// 产品对象查找表。
    /// </summary>
    internal class ProductLut
    {
        #region 成员函数
        /// <summary>
        /// 构造函数。
        /// </summary>
        public ProductLut()
        {
            m_aTable = new IProduct[0];
            m_aFreeLut = new int[0];
            m_nFree = 0;
        }

        /// <summary>
        /// 托管一个对象。
        /// </summary>
        /// <param name="pObject">托管对象。</param>
        /// <returns>返回托管ID。</returns>
        public int Create(IProduct pObject)
        {
            int nID = CreateID();

            if (null != m_aTable[nID])
            {
                Debug.LogError("SELut.Create: null != m_aTable[nID] : " + nID);
                return -1;
            }

            pObject.ID = nID;
            m_aTable[nID] = pObject;
            m_nUsedCount++;

            return nID;
        }

        /// <summary>
        /// 释放一个托管对象。
        /// </summary>
        /// <param name="nID">指定托管对象ID。</param>
        public void Free(int nID)
        {
            if (null == m_aTable[nID])
            {
                Debug.LogError("SELut.Free: null == m_aTable[nID]");
                return;
            }

            m_aTable[nID] = null;
            m_nUsedCount--;

            FreeID(nID);
        }

        /// <summary>
        /// 获取一个对象。
        /// </summary>
        /// <param name="nID">指定对象ID。</param>
        /// <returns>返回托管对象。</returns>
        public IProduct Get(int nID)
        {
            return m_aTable[nID];
        }


        /// <summary>
        /// 创建分配一个ID。
        /// </summary>
        /// <returns>返回新分配ID。</returns>
        private int CreateID()
        {
            int nCurLength = m_aTable.Length;

            if (nCurLength == m_nFree)
            {
                int nLength = (0 == nCurLength ? 1024 : (2 * nCurLength));

                IProduct[] aTable = new IProduct[nLength];
                int[] aFreeLut = new int[nLength];

                if (0 < nCurLength)
                {
                    Array.Copy(m_aTable, aTable, nCurLength);
                    Array.Copy(m_aFreeLut, aFreeLut, nCurLength);
                }

                for (int i = nCurLength; i < nLength; i++)
                {
                    aFreeLut[i] = i + 1;
                }

                m_aTable = aTable;
                m_aFreeLut = aFreeLut;

                if (0 == nCurLength)
                {
                    m_nFree = 1;
                }
            }

            int nID = m_nFree;
            m_nFree = m_aFreeLut[m_nFree];

            m_aFreeLut[nID] = -1;

            return nID;
        }

        /// <summary>
        /// 释放一个ID。
        /// </summary>
        /// <param name="nID">指定需要释放的ID。</param>
        private void FreeID(int nID)
        {
            m_aFreeLut[nID] = m_nFree;
            m_nFree = nID;
        }
        #endregion

        #region 数据成员
        /// <summary>
        /// 成员存储表。
        /// </summary>
        private IProduct[] m_aTable;

        /// <summary>
        /// 空闲插槽查找表。
        /// </summary>
        private int[] m_aFreeLut;

        /// <summary>
        /// 当前空闲插槽。
        /// </summary>
        private int m_nFree;

        /// <summary>
        /// 当前使用数量。
        /// </summary>
        public int m_nUsedCount;

        /// <summary>
        /// 当前槽位总数。
        /// </summary>
        public int m_nTotalCount
        {
            get
            {
                return m_aTable.Length;
            }
        }
        #endregion
    }


    /// <summary>
    /// 数组产品。
    /// </summary>
    internal class Array_<T> : IArray
    {
        /// <summary>
        /// 对象ID。
        /// </summary>
        public int ID { get; set; }

        /// <summary>
        /// 获取对象类型标识。
        /// </summary>
        /// <returns>返回对象类型标识。</returns>
        public ProductType Type()
        {
            return ProductType.Array;
        }

        /// <summary>
        /// 获取数组指针。
        /// </summary>
        /// <returns>返回数组指针。</returns>
        public IntPtr GetPointer()
        {
            return Marshal.UnsafeAddrOfPinnedArrayElement(m_aArray, 0);
        }

        /// <summary>
        /// 获取实际对象。
        /// </summary>
        /// <returns></returns>
        public object Get()
        {
            return m_aArray;
        }

        /// <summary>
        /// 销毁对象，释放内存空间。
        /// </summary>
        public void Destroy()
        {
            m_aArray = null;
        }


        /// <summary>
        /// 数组对象。
        /// </summary>
        private T[] m_aArray;


        /// <summary>
        /// 构造函数。
        /// </summary>
        /// <param name="nDesc">资源描述表格。</param>
        public Array_(int nDesc, IntPtr nObject)
        {
            m_aArray = new T[nDesc];
        }
    }


    /// <summary>
    /// 贴图产品。
    /// </summary>
    internal class Texture_ : IProduct
    {
        /// <summary>
        /// 对象ID。
        /// </summary>
        public int ID { get; set; }

        /// <summary>
        /// 获取对象类型标识。
        /// </summary>
        /// <returns>返回对象类型标识。</returns>
        public ProductType Type()
        {
            return ProductType.Texture;
        }

        /// <summary>
        /// 获取本地对象指针。
        /// </summary>
        /// <returns>返回本地对象指针。</returns>
        public IntPtr GetPointer()
        {
            return m_nAddr;
        }

        /// <summary>
        /// 获取实际对象。
        /// </summary>
        /// <returns></returns>
        public object Get()
        {
            return m_pTexture;
        }

        /// <summary>
        /// 销毁对象，释放内存空间。
        /// </summary>
        public void Destroy()
        {
            Texture.Destroy(m_pTexture);
            m_pTexture = null;
        }

        /// <summary>
        /// 贴图对象。
        /// </summary>
        private Texture2D m_pTexture;
        /// <summary>
        /// 本地对象地址。
        /// </summary>
        private IntPtr m_nAddr;


        /// <summary>
        /// 构造函数。
        /// </summary>
        /// <param name="nDesc">资源描述表格。</param>
        public Texture_(int nDesc, IntPtr nObject)
        {
            m_nAddr = nObject;

            if (0 == nDesc)
            {
                m_pTexture = new Texture2D(1, 1);
            }
            else
            {
                int[] aDesc = Factory.g_pIns.Get<int[]>(nDesc);
                int nWidth = aDesc[0];
                int nHeight = aDesc[1];
                int nFormat = aDesc[2];
                int nMipMap = aDesc[3];
                int nLinear = aDesc[4];
                int nDataArray = aDesc[5];

                m_pTexture = new Texture2D(nWidth, nHeight, (UnityEngine.TextureFormat)nFormat, nMipMap > 0, nLinear > 0);

                SetData(nDataArray);
            }
        }

        /// <summary>
        /// 设置贴图数据。
        /// </summary>
        /// <param name="nArray">字节数据数组。</param>
        public void SetData(int nArray)
        {
            if (0 == nArray)
            {
                return;
            }

            if (0 < nArray)
            {
                byte[] aData = Factory.g_pIns.Get<byte[]>(nArray);

                m_pTexture.LoadImage(aData, true);
                //m_pTexture.Apply(false, true);
            }

            if (0 > nArray)
            {
                IntPtr nDesc = Marshal.ReadIntPtr(m_nAddr, -nArray);
                int nWidth = Marshal.ReadInt32(nDesc, 0);
                int nHeight = Marshal.ReadInt32(nDesc, 4);
                int nFormat = Marshal.ReadInt32(nDesc, 8);
                int nSize = Marshal.ReadInt32(nDesc, 12);
                IntPtr nData = Marshal.ReadIntPtr(nDesc, 16);

                //if(m_pTexture.width != nWidth && m_pTexture.height != nWidth && (int)m_pTexture.format != nFormat)
                {
                    Texture.Destroy(m_pTexture);
                    m_pTexture = new Texture2D(nWidth, nHeight, (TextureFormat)nFormat, false, false);
                }

                m_pTexture.LoadRawTextureData(nData, nSize);
                m_pTexture.Apply(false, true);
            }
        }
    }


    /// <summary>
    /// 材质对象。
    /// </summary>
    internal class Material_ : IProduct
    {
        /// <summary>
        /// 对象ID。
        /// </summary>
        public int ID { get; set; }

        /// <summary>
        /// 获取对象类型标识。
        /// </summary>
        /// <returns>返回对象类型标识。</returns>
        public ProductType Type()
        {
            return ProductType.Material;
        }

        /// <summary>
        /// 获取本地对象指针。
        /// </summary>
        /// <returns>返回本地对象指针。</returns>
        public IntPtr GetPointer()
        {
            return m_nAddr;
        }

        /// <summary>
        /// 获取实际对象。
        /// </summary>
        /// <returns></returns>
        public object Get()
        {
            return m_pMaterial;
        }

        /// <summary>
        /// 销毁对象，释放内存空间。
        /// </summary>
        public void Destroy()
        {
            Material.Destroy(m_pMaterial);
            m_pMaterial = null;
        }

        /// <summary>
        /// 材质对象。
        /// </summary>
        private Material m_pMaterial;
        /// <summary>
        /// 本地对象地址。
        /// </summary>
        private IntPtr m_nAddr;


        /// <summary>
        /// 构造函数。
        /// </summary>
        /// <param name="nDesc">资源描述表格。</param>
        public Material_(int nDesc, IntPtr nObject)
        {
            if (0 == nDesc)
            {
                m_nAddr = nObject;
                m_pMaterial = new Material(Factory.g_pIns.m_pStyle.CreateMaterial(1, 0));
            }
            else
            {
                int nShared = Marshal.ReadIntPtr(nObject, 0).ToInt32();
                int nAsset = Marshal.ReadIntPtr(nObject, IntPtr.Size).ToInt32();
                int nIndex = Marshal.ReadIntPtr(nObject, IntPtr.Size * 2).ToInt32();

                Prefab_ pAsset = Factory.g_pIns.m_pStyle;

                m_nAddr = Marshal.ReadIntPtr(nObject, IntPtr.Size * 3);
                m_pMaterial = pAsset.CreateMaterial(nShared, nIndex);
            }
        }

        /// <summary>
        /// 设置贴图对象。
        /// </summary>
        /// <returns></returns>
        public void SetTexture(int nTexture)
        {
            Texture2D pTexture = Factory.g_pIns.Get<Texture2D>(nTexture);
            m_pMaterial.mainTexture = pTexture;
        }
    }


    /// <summary>
    /// 网格产品。
    /// </summary>
    internal class Mesh_ : IProduct
    {
        /// <summary>
        /// 对象ID。
        /// </summary>
        public int ID { get; set; }

        /// <summary>
        /// 获取对象类型标识。
        /// </summary>
        /// <returns>返回对象类型标识。</returns>
        public ProductType Type()
        {
            return ProductType.Mesh;
        }

        /// <summary>
        /// 获取本地对象指针。
        /// </summary>
        /// <returns>返回本地对象指针。</returns>
        public IntPtr GetPointer()
        {
            return m_nAddr;
        }

        /// <summary>
        /// 获取实际对象。
        /// </summary>
        /// <returns></returns>
        public object Get()
        {
            return m_pMesh;
        }

        /// <summary>
        /// 销毁对象，释放内存空间。
        /// </summary>
        public void Destroy()
        {
            m_pMesh.Clear(false);
            Mesh.Destroy(m_pMesh);
            m_pMesh = null;
            m_aMaterial = null;
        }

        /// <summary>
        /// 网格对象。
        /// </summary>
        private Mesh m_pMesh;
        /// <summary>
        /// 材质属性。
        /// </summary>
        private Material[] m_aMaterial;
        /// <summary>
        /// 本地对象地址。
        /// </summary>
        private IntPtr m_nAddr;


        /// <summary>
        /// 构造函数。
        /// </summary>
        /// <param name="nDesc">资源描述表格。</param>
        public Mesh_(int nDesc, IntPtr nObject)
        {
            m_nAddr = nObject;

            m_pMesh = new Mesh();
            m_aMaterial = new Material[1];
            m_aMaterial[0] = Factory.g_pIns.m_pStyle.CreateMaterial(1, 0);

            SetData(nDesc);
        }

        /// <summary>
        /// 设置网格数据。
        /// </summary>
        /// <param name="nDesc">资源描述表格。</param>
        public void SetData(int nDesc)
        {
            if (0 == nDesc)
            {
                return;
            }

            int[] aDesc = Factory.g_pIns.Get<int[]>(nDesc);

            int nInputCount = aDesc[0];
            int nSubmeshCount = aDesc[1];
            int nIndex = 2;

            m_pMesh.Clear(false);
            m_pMesh.subMeshCount = nSubmeshCount;

            for (int i = 0; i < nInputCount; i++)
            {
                SetInput(aDesc[nIndex++], aDesc[nIndex++]);
            }

            for (int i = 0; i < nSubmeshCount; i++)
            {
                SetIndices(i, aDesc[nIndex++], aDesc[nIndex++], aDesc[nIndex++]);
            }

            m_pMesh.RecalculateBounds();
            m_pMesh.UploadMeshData(true);

            m_aMaterial = new Material[nSubmeshCount];
            Material pMaterial = Factory.g_pIns.m_pStyle.CreateMaterial(1, 0);
            for (int i = 0; i < nSubmeshCount; i++)
            {
                m_aMaterial[i] = pMaterial;
            }
        }

        /// <summary>
        /// 设置子网格材质。
        /// </summary>
        /// <param name="nSubMesh">子网格索引。</param>
        /// <param name="pMaterial">材质对象。</param>
        public void SetMaterial(int nSubMesh, int nMaterial)
        {
            // 批量设置所有子网格使用相同材质
            if (-1 == nSubMesh)
            {
                Material pMaterial = 0 == nMaterial ? Factory.g_pIns.m_pStyle.CreateMaterial(1, 0) : Factory.g_pIns.Get<Material>(nMaterial);
                for (int i = 0; i < m_aMaterial.Length; i++)
                {
                    m_aMaterial[i] = pMaterial;
                }

                return;
            }

            if (nSubMesh < m_aMaterial.Length)
            {
                m_aMaterial[nSubMesh] = 0 == nMaterial ? Factory.g_pIns.m_pStyle.CreateMaterial(1, 0) : Factory.g_pIns.Get<Material>(nMaterial);
            }
        }

        /// <summary>
        /// 获取网格材质数组。
        /// </summary>
        /// <returns>返回网格材质数组。</returns>
        public Material[] GetMaterials()
        {
            return m_aMaterial;
        }

        /// <summary>
        /// 绘制网格。
        /// </summary>
        public void Draw()
        {
            for (int i = 0; i < m_aMaterial.Length; i++)
            {
                Graphics.DrawMesh(m_pMesh, Matrix4x4.identity, m_aMaterial[i], 0, Camera.main, i);
            }
        }

        /// <summary>
        /// 设置顶点输入。
        /// </summary>
        /// <param name="nSlot">输入槽。</param>
        /// <param name="nArray">数组ID。</param>
        private void SetInput(int nSlot, int nArray)
        {
            Factory pFactory = Factory.g_pIns;

            switch ((VertexType)nSlot)
            {
                case VertexType.Position:
                    m_pMesh.vertices = pFactory.Get<Vector3[]>(nArray);
                    break;
                case VertexType.Normal:
                    m_pMesh.normals = pFactory.Get<Vector3[]>(nArray);
                    break;
                case VertexType.UV:
                    m_pMesh.uv = pFactory.Get<Vector2[]>(nArray);
                    break;
                case VertexType.Color:
                    m_pMesh.colors = pFactory.Get<Color[]>(nArray);
                    break;
                case VertexType.Tangent:
                    m_pMesh.tangents = pFactory.Get<Vector4[]>(nArray);
                    break;
                case VertexType.UV2:
                    m_pMesh.uv2 = pFactory.Get<Vector2[]>(nArray);
                    break;
                case VertexType.UV3:
                    m_pMesh.uv3 = pFactory.Get<Vector2[]>(nArray);
                    break;
                case VertexType.UV4:
                    m_pMesh.uv4 = pFactory.Get<Vector2[]>(nArray);
                    break;
                case VertexType.UV5:
                    m_pMesh.uv5 = pFactory.Get<Vector2[]>(nArray);
                    break;
                case VertexType.UV6:
                    m_pMesh.uv6 = pFactory.Get<Vector2[]>(nArray);
                    break;
                case VertexType.UV7:
                    m_pMesh.uv7 = pFactory.Get<Vector2[]>(nArray);
                    break;
                case VertexType.UV8:
                    m_pMesh.uv8 = pFactory.Get<Vector2[]>(nArray);
                    break;
                default:
                    break;
            }
        }

        /// <summary>
        /// 设置网格索引。
        /// </summary>
        /// <param name="nSubMesh">子网格。</param>
        /// <param name="nTopology">图元类型。</param>
        /// <param name="nBaseVertex">起始顶点编号。</param>
        /// <param name="nArray">索引数组ID。</param>
        private void SetIndices(int nSubMesh, int nTopology, int nBaseVertex, int nArray)
        {
            m_pMesh.SetIndices(Factory.g_pIns.Get<int[]>(nArray), (MeshTopology)nTopology, nSubMesh, false, nBaseVertex);
        }
    }


    /// <summary>
    /// 变换组件产品。
    /// </summary>
    internal class Transform_ : IProduct
    {
        /// <summary>
        /// 对象ID。
        /// </summary>
        public int ID { get; set; }

        /// <summary>
        /// 获取对象类型标识。
        /// </summary>
        /// <returns>返回对象类型标识。</returns>
        public ProductType Type()
        {
            return ProductType.Transform;
        }

        /// <summary>
        /// 获取本地对象指针。
        /// </summary>
        /// <returns>返回本地对象指针。</returns>
        public IntPtr GetPointer()
        {
            return m_nAddr;
        }

        /// <summary>
        /// 获取实际对象。
        /// </summary>
        /// <returns></returns>
        public object Get()
        {
            return m_pTransform;
        }

        /// <summary>
        /// 销毁对象，释放内存空间。
        /// </summary>
        public void Destroy()
        {
            m_pTransform = null;
        }

        /// <summary>
        /// 变换组件所属对象。
        /// </summary>
        private GameObject_ m_pObject;
        /// <summary>
        /// 变换组件对象。
        /// </summary>
        private Transform m_pTransform;
        /// <summary>
        /// 数据交换中间变量。
        /// </summary>
        private Vector4[] m_aBridge;
        /// <summary>
        /// 数据交换空间地址。
        /// </summary>
        public IntPtr m_nBridgeAddr;
        /// <summary>
        /// 本地对象地址。
        /// </summary>
        public IntPtr m_nAddr;

        /// <summary>
        /// 构造函数。
        /// </summary>
        /// <param name="pTransform"></param>
        public Transform_(GameObject_ pObject, Transform pTransform)
        {
            m_pObject = pObject;
            m_pTransform = pTransform;
            m_aBridge = new Vector4[2];
            m_nBridgeAddr = Marshal.UnsafeAddrOfPinnedArrayElement(m_aBridge, 0);
        }

        /// <summary>
        /// 执行变换组件操作。
        /// </summary>
        public void Do(int nCtrl)
        {
            BoxCollider pCollider = null;

            switch ((TransformCtrl)nCtrl)
            {
                case TransformCtrl.TRANS_INIT:
                    m_nAddr = Marshal.ReadIntPtr(m_nBridgeAddr);
                    m_pObject.m_nAddr = Marshal.ReadIntPtr(m_nBridgeAddr + IntPtr.Size);
                    break;
                case TransformCtrl.TRANS_GET_POSITION:
                    m_aBridge[0] = m_pTransform.position;
                    break;
                case TransformCtrl.TRANS_SET_POSITION:
                    m_pTransform.position = m_aBridge[0];
                    break;
                case TransformCtrl.TRANS_GET_EULER:
                    m_aBridge[0] = m_pTransform.eulerAngles;
                    break;
                case TransformCtrl.TRANS_SET_EULER:
                    m_pTransform.eulerAngles = m_aBridge[0];
                    break;
                case TransformCtrl.TRANS_GET_ROTATION:
                    m_aBridge[0] = new Vector4(m_pTransform.rotation.x, m_pTransform.rotation.y, m_pTransform.rotation.z, m_pTransform.rotation.w);
                    break;
                case TransformCtrl.TRANS_SET_ROTATION:
                    m_pTransform.rotation = new Quaternion(m_aBridge[0].x, m_aBridge[0].y, m_aBridge[0].z, m_aBridge[0].w);
                    break;
                case TransformCtrl.TRANS_GET_SCALE:
                    m_aBridge[0] = m_pTransform.localScale;
                    break;
                case TransformCtrl.TRANS_SET_SCALE:
                    m_pTransform.localScale = m_aBridge[0];
                    break;

                case TransformCtrl.TRANS_GET_LOCAL_POSITION:
                    m_aBridge[0] = m_pTransform.localPosition;
                    break;
                case TransformCtrl.TRANS_SET_LOCAL_POSITION:
                    m_pTransform.localPosition = m_aBridge[0];
                    break;
                case TransformCtrl.TRANS_GET_LOCAL_EULER:
                    m_aBridge[0] = m_pTransform.localEulerAngles;
                    break;
                case TransformCtrl.TRANS_SET_LOCAL_EULER:
                    m_pTransform.localEulerAngles = m_aBridge[0];
                    break;
                case TransformCtrl.TRANS_GET_LOCAL_ROTATION:
                    m_aBridge[0] = new Vector4(m_pTransform.localRotation.x, m_pTransform.localRotation.y, m_pTransform.localRotation.z, m_pTransform.localRotation.w);
                    break;
                case TransformCtrl.TRANS_SET_LOCAL_ROTATION:
                    m_pTransform.localRotation = new Quaternion(m_aBridge[0].x, m_aBridge[0].y, m_aBridge[0].z, m_aBridge[0].w);
                    break;
                case TransformCtrl.TRANS_GET_LOCAL_SCALE:
                    m_aBridge[0] = m_pTransform.localScale;
                    break;
                case TransformCtrl.TRANS_SET_LOCAL_SCALE:
                    m_pTransform.localScale = m_aBridge[0];
                    break;

                case TransformCtrl.TRANS_GET_RIGHT:
                    m_aBridge[0] = m_pTransform.right;
                    break;
                case TransformCtrl.TRANS_SET_RIGHT:
                    m_pTransform.right = m_aBridge[0];
                    break;
                case TransformCtrl.TRANS_GET_UP:
                    m_aBridge[0] = m_pTransform.up;
                    break;
                case TransformCtrl.TRANS_SET_UP:
                    m_pTransform.up = m_aBridge[0];
                    break;
                case TransformCtrl.TRANS_GET_FORWARD:
                    m_aBridge[0] = m_pTransform.forward;
                    break;
                case TransformCtrl.TRANS_SET_FORWARD:
                    m_pTransform.forward = m_aBridge[0];
                    break;

                case TransformCtrl.TRANS_ROTATE0:
                    m_pTransform.Rotate(m_aBridge[0], (Space)(int)(m_aBridge[0].w));
                    break;
                case TransformCtrl.TRANS_ROTATE1:
                    m_pTransform.Rotate(m_aBridge[0], m_aBridge[0].w, (Space)(int)(m_aBridge[1].x));
                    break;
                case TransformCtrl.TRANS_TRANSLATE0:
                    m_pTransform.Translate(m_aBridge[0], (Space)(int)(m_aBridge[0].w));
                    break;

                case TransformCtrl.OBJECT_SET_BOX_COLLIDER:
                    pCollider = m_pTransform.GetComponent<BoxCollider>();
                    if(null == pCollider)
                    {
                        pCollider = m_pTransform.gameObject.AddComponent<BoxCollider>();
                    }
                    pCollider.center = m_aBridge[0];
                    pCollider.size = m_aBridge[1];
                    break;
                case TransformCtrl.OBJECT_IS_NAME:
                    IntPtr nName = Marshal.ReadIntPtr(m_nBridgeAddr, 0);
                    if (IntPtr.Zero != nName) {
                        string pName = Marshal.PtrToStringAnsi(nName);

                        if(pName.Equals(m_pTransform.name))
                        {
                            m_aBridge[0].x = 100.0f;
                            break;
                        }
                    }
                    m_aBridge[0].x = 0.0f;
                    break;
                case TransformCtrl.OBJECT_ACTIVE:
                    m_pTransform.gameObject.SetActive(0.0f < m_aBridge[0].x);
                    break;
                case TransformCtrl.OBJECT_ENABLE_COLLODER:
                    pCollider = m_pTransform.GetComponent<BoxCollider>();
                    pCollider.enabled = 0.0f < m_aBridge[0].x;
                    break;
                case TransformCtrl.OBJECT_ENABLE_HIGHLIGHT:
                    HighlightableObject pHo = m_pTransform.GetComponent<HighlightableObject>();
                    if(0.0f < m_aBridge[0].x)
                    {
                        if(null == pHo)
                        {
                            pHo = m_pTransform.gameObject.AddComponent<HighlightableObject>();
                            pHo.FlashingOn();
                            pHo.ReinitMaterials();
                        }
                    }
                    else if(null != pHo)
                    {
                        pHo.FlashingOff();
                        UnityEngine.Object.Destroy(pHo);
                    }
                    break;
                default:
                    break;
            }
        }
    }


    /// <summary>
    /// 游戏对象产品。
    /// </summary>
    internal class GameObject_ : MonoBehaviour, Object3D, IProduct
    {
        /// <summary>
        /// 响应游戏对象销毁。
        /// </summary>
        private void OnDestroy()
        {
            m_pTransform.Destroy();
            m_pTransform = null;

            // 释放当前对象ID
            Factory.g_pIns.Free(this);
        }

        /// <summary>
        /// 对象ID。
        /// </summary>
        public int ID { get; set; }

        /// <summary>
        /// 获取对象类型标识。
        /// </summary>
        /// <returns>返回对象类型标识。</returns>
        public ProductType Type()
        {
            return ProductType.GameObject;
        }

        /// <summary>
        /// 获取本地对象指针。
        /// </summary>
        /// <returns>返回本地对象指针。</returns>
        public IntPtr GetPointer()
        {
            return m_nAddr;
        }

        /// <summary>
        /// 获取实际对象。
        /// </summary>
        /// <returns></returns>
        public object Get()
        {
            return gameObject;
        }

        /// <summary>
        /// 销毁对象，释放内存空间。
        /// </summary>
        public void Destroy()
        {
            GameObject.Destroy(gameObject);
        }

        /// <summary>
        /// 对象变换组件。
        /// </summary>
        private Transform_ m_pTransform;
        /// <summary>
        /// 子级列表。
        /// </summary>
        private IntPtr[] m_aChild;
        /// <summary>
        /// 本地对象地址。
        /// </summary>
        public IntPtr m_nAddr;


        /// <summary>
        /// 构造函数。
        /// </summary>
        /// <param name="nDesc">资源描述表格。</param>
        public static GameObject_ Create(int nDesc, IntPtr nObject)
        {
            GameObject pObject = new GameObject();
            GameObject_ pHook = pObject.AddComponent<GameObject_>();
            pHook.m_pTransform = new Transform_(pHook, pObject.transform);
            pHook.m_nAddr = nObject;

            return pHook;
        }

        /// <summary>
        /// 构造函数。
        /// </summary>
        /// <param name="pObject">现有游戏对象。</param>
        public static GameObject_ Create(GameObject pObject)
        {
            GameObject_ pHook = pObject.AddComponent<GameObject_>();
            pHook.m_pTransform = new Transform_(pHook, pObject.transform);

            return pHook;
        }

        /// <summary>
        /// 设置对象数据。
        /// </summary>
        /// <param name="nDesc">对象地址。</param>
        public void SetData(int nDesc)
        {
        }

        /// <summary>
        /// 设置对象网格。
        /// </summary>
        /// <param name="nMesh">网格ID。</param>
        public void SetMesh(int nMesh)
        {
            if (0 == nMesh)
            {
                MeshFilter pFilter = GetComponent<MeshFilter>();
                MeshRenderer pRenderer = GetComponent<MeshRenderer>();

                if (null != pFilter)
                {
                    MeshFilter.Destroy(pFilter);
                }

                if (null != pRenderer)
                {
                    MeshRenderer.Destroy(pRenderer);
                }
            }
            else
            {
                Mesh_ pMesh = Factory.g_pIns.GetObject<Mesh_>(nMesh);
                MeshFilter pFilter = GetComponent<MeshFilter>();
                MeshRenderer pRenderer = GetComponent<MeshRenderer>();

                if (null == pFilter)
                {
                    pFilter = gameObject.AddComponent<MeshFilter>();
                }

                if (null == pRenderer)
                {
                    pRenderer = gameObject.AddComponent<MeshRenderer>();
                    //pRenderer.lightProbeUsage = UnityEngine.Rendering.LightProbeUsage.Off;
                    //pRenderer.reflectionProbeUsage = UnityEngine.Rendering.ReflectionProbeUsage.Off;
                    //pRenderer.shadowCastingMode = UnityEngine.Rendering.ShadowCastingMode.Off;
                    //pRenderer.receiveShadows = false;
                }

                pFilter.mesh = (Mesh)pMesh.Get();
                pRenderer.materials = pMesh.GetMaterials();
            }
        }

        /// <summary>
        /// 设置父级对象。
        /// </summary>
        /// <param name="nParent">父级对象ID。</param>
        /// <param name="nStays">世界位置是否保持。</param>
        public void SetParent(int nParent, int nStays)
        {
            if (0 == nParent)
            {
                transform.SetParent(null, 0 < nStays);
            }
            else
            {
                GameObject_ pParent = Factory.g_pIns.GetObject<GameObject_>(nParent);
                if (null != pParent)
                {
                    transform.SetParent(pParent.transform, 0 < nStays);
                }
            }
        }


        /// <summary>
        /// 获取变换组件对象。
        /// </summary>
        public Transform_ transform_
        {
            get
            {
                return m_pTransform;
            }
        }

        /// <summary>
        /// 获取子级对象
        /// </summary>
        /// <returns>返回子级列表地址。</returns>
        public IntPtr children
        {
            get
            {
                GameObject_[] aChild = GetComponentsInChildren<GameObject_>();

                if (null != aChild && 0 < aChild.Length)
                {
                    m_aChild = new IntPtr[aChild.Length + 1];
                    m_aChild[0] = new IntPtr(aChild.Length);

                    for (int i = 0; i < aChild.Length; i++)
                    {
                        m_aChild[i + 1] = aChild[i].m_nAddr;
                    }

                    return Marshal.UnsafeAddrOfPinnedArrayElement(m_aChild, 0);
                }

                return IntPtr.Zero;
            }
        }

        /// <summary>
        /// 父级对象。
        /// </summary>
        public IntPtr parent
        {
            get
            {
                if (null == transform.parent)
                {
                    return IntPtr.Zero;
                }

                GameObject_ pParent = transform.parent.GetComponent<GameObject_>();
                if (null == transform.parent)
                {
                    Debug.LogError("对象父级对象为非托管类型");
                    return IntPtr.Zero;
                }

                return pParent.m_nAddr;
            }
        }

        #region 函数映射
        /// <summary>
        /// 对象ID。
        /// </summary>
        public int handle { get { return ID; } }

        /// <summary>
        /// 本地对象指针。
        /// </summary>
        public IntPtr nativePtr { get { return GetPointer(); } }

        /// <summary>
        /// 场景ID。
        /// </summary>
        public string id
        {
            get
            {
                return "";//Marshal.PtrToStringAnsi(_GetID(m_nAddr, 1));
            }
        }
        #endregion
    }


    /// <summary>
    /// 游戏对象预制件。
    /// </summary>
    internal class Prefab_ : IProduct
    {
        /// 加载对象的默认资源（网格、材质、贴图）以为一对多的关系（增大性能开销）而无法被前端代码读取；
        //  当前我们提供不建议高频访问的接口访问加载对象的默认资源，但这样会产生一个拷贝，拷贝会避免前端代码销毁资源产生破环；
        /// 加载对象的所有GameObject被处理并分配ID，前端对象可以操作根对象和子对象；
        //  变换组件应当记录其ID，这样前端代码可以高效的遍历子级；
        /// 预制件对象，所有加载对象都由预制件对象克隆出来；

        /// <summary>
        /// 对象ID。
        /// </summary>
        public int ID { get; set; }

        /// <summary>
        /// 获取对象类型标识。
        /// </summary>
        /// <returns>返回对象类型标识。</returns>
        public ProductType Type()
        {
            return ProductType.Prefab;
        }

        /// <summary>
        /// 获取本地对象指针。
        /// </summary>
        /// <returns>返回本地对象指针。</returns>
        public IntPtr GetPointer()
        {
            return m_nAddr;
        }

        /// <summary>
        /// 获取实际对象。
        /// </summary>
        /// <returns></returns>
        public object Get()
        {
            return m_pPrefab;
        }

        /// <summary>
        /// 销毁对象，释放内存空间。
        /// </summary>
        public void Destroy()
        {
            if (null != m_pAsset)
            {
                m_pAsset.Unload(true);

                AssetBundle.Destroy(m_pAsset);

                m_pPrefab = null;
                m_pAsset = null;
            }
        }

        /// <summary>
        /// 预制件对象。
        /// </summary>
        private UnityEngine.Object m_pPrefab;
        /// <summary>
        /// 预制件资源包。
        /// </summary>
        private AssetBundle m_pAsset;
        /// <summary>
        /// 本地对象地址。
        /// </summary>
        public IntPtr m_nAddr;


        /// <summary>
        /// 构造函数。
        /// </summary>
        /// <param name="nDesc">资源描述表格。</param>
        public Prefab_(int nDesc, IntPtr nObject)
        {
            m_nAddr = nObject;

            if (0 == nDesc)
            {
                m_pPrefab = ((GameObject)Factory.g_pIns.m_pStyle.m_pPrefab).transform.Find("Lose").gameObject;
            }
            else
            {
                SetData(nDesc);
            }
        }

        /// <summary>
        /// 构造函数。
        /// </summary>
        /// <param name="pObject">现有游戏对象。</param>
        public Prefab_(GameObject pPrefab)
        {
            m_nAddr = IntPtr.Zero;
            m_pAsset = null;
            m_pPrefab = pPrefab;
        }

        /// <summary>
        /// 设置预制件数据。
        /// </summary>
        /// <param name="nArray">字节数据数组。</param>
        public void SetData(int nArray)
        {
            if (0 == nArray)
            {
                return;
            }

            byte[] aData = Factory.g_pIns.Get<byte[]>(nArray);

            m_pAsset = AssetBundle.LoadFromMemory(aData);
            m_pPrefab = m_pAsset.LoadAsset(m_pAsset.GetAllAssetNames()[0]);

            m_pAsset.Unload(false);
        }

        /// <summary>
        /// 实例化预制件。
        /// </summary>
        /// <returns>返回实例对象。</returns>
        public List<GameObject> Instantiate()
        {
            GameObject pObject = GameObject.Instantiate(m_pPrefab) as GameObject;
            List<GameObject> pList = new List<GameObject>();

            int nIndex = 0;
            pList.Add(pObject);

            while (nIndex < pList.Count)
            {
                pObject = pList[nIndex++];

                foreach (Transform pChild in pObject.transform)
                {
                    pList.Add(pChild.gameObject);
                }
            }

            return pList;
        }

        /// <summary>
        /// 从预制件中创建材质。
        /// </summary>
        /// <param name="nShared">是否实例化材质。</param>
        /// <param name="nIndex">材质索引。</param>
        /// <returns>材质对象。</returns>
        public Material CreateMaterial(int nShared, int nIndex)
        {
            Material pMaterial = ((GameObject)m_pPrefab).GetComponent<MeshRenderer>().sharedMaterials[nIndex];

            if (0 == nShared)
            {
                pMaterial = Material.Instantiate(pMaterial);
            }

            return pMaterial;
        }
    }


    /// <summary>
    /// 游戏地图瓦片。
    /// </summary>
    internal class Tile_ : Tile, IProduct
    {
        /// <summary>
        /// 对象ID。
        /// </summary>
        public int ID { get; set; }

        /// <summary>
        /// 获取对象类型标识。
        /// </summary>
        /// <returns>返回对象类型标识。</returns>
        public ProductType Type()
        {
            return ProductType.Tile;
        }

        /// <summary>
        /// 获取本地对象指针。
        /// </summary>
        /// <returns>返回本地对象指针。</returns>
        public IntPtr GetPointer()
        {
            return m_nAddr;
        }

        /// <summary>
        /// 获取实际对象。
        /// </summary>
        /// <returns></returns>
        public object Get()
        {
            return null;
        }

        /// <summary>
        /// 销毁对象，释放内存空间。
        /// </summary>
        public void Destroy()
        {
        }

        /// <summary>
        /// 瓦片原始数据。
        /// </summary>
        public byte[] rawData
        {
            get
            {
                return m_aRawData;
            }

            set
            {
                m_aRawData = value;
            }
        }

        /// <summary>
        /// 本地对象地址。
        /// </summary>
        public IntPtr m_nAddr;
        /// <summary>
        /// 原始瓦片数据。
        /// </summary>
        private byte[] m_aRawData;

        /// <summary>
        /// 构造函数。
        /// </summary>
        /// <param name="nDesc">资源描述表格。</param>
        public Tile_(int nDesc, IntPtr nObject)
        {
            m_nAddr = nObject;
        }


        #region 函数映射
        /// <summary>
        /// 对象ID。
        /// </summary>
        public int handle { get { return ID; } }

        /// <summary>
        /// 本地对象指针。
        /// </summary>
        public IntPtr nativePtr { get { return GetPointer(); } }

        /// <summary>
        /// 获取场景数量。
        /// </summary>
        public int sceneCount
        {
            get
            {
                return _IterWork(m_nAddr, new IntPtr(-1));
            }
        }

        /// <summary>
        /// 获取场景列表。
        /// </summary>
        public MList scenes
        {
            get
            {
                return new ProductList_(delegate (IntPtr p1)
                {
                    return _IterWork(m_nAddr, p1);
                });
            }
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
                    case nameof(_IterWork):
                        _IterWork = (Exports.dynCall_ijj)Marshal.GetDelegateForFunctionPointer(aFunc[i], typeof(Exports.dynCall_ijj));
                        break;
                    default:
                        break;
                }
            }
        }

        /// <summary>
        /// 场景列表迭代器。
        /// </summary>
        internal static Exports.dynCall_ijj _IterWork = null;
        #endregion
    }


    /// <summary>
    /// 游戏场景。
    /// </summary>
    internal class Scene_ : Scene, IProduct
    {
        /// <summary>
        /// 对象ID。
        /// </summary>
        public int ID { get; set; }

        /// <summary>
        /// 获取对象类型标识。
        /// </summary>
        /// <returns>返回对象类型标识。</returns>
        public ProductType Type()
        {
            return ProductType.Work;
        }

        /// <summary>
        /// 获取本地对象指针。
        /// </summary>
        /// <returns>返回本地对象指针。</returns>
        public IntPtr GetPointer()
        {
            return m_nAddr;
        }

        /// <summary>
        /// 获取实际对象。
        /// </summary>
        /// <returns></returns>
        public object Get()
        {
            return null;
        }

        /// <summary>
        /// 销毁对象，释放内存空间。
        /// </summary>
        public void Destroy()
        {
        }

        /// <summary>
        /// 本地对象地址。
        /// </summary>
        public IntPtr m_nAddr;


        /// <summary>
        /// 构造函数。
        /// </summary>
        /// <param name="nDesc">资源描述表格。</param>
        public Scene_(int nDesc, IntPtr nObject)
        {
            m_nAddr = nObject;
        }


        #region 函数映射
        /// <summary>
        /// 对象ID。
        /// </summary>
        public int handle { get { return ID; } }

        /// <summary>
        /// 本地对象指针。
        /// </summary>
        public IntPtr nativePtr { get { return GetPointer(); } }

        /// <summary>
        /// 场景ID。
        /// </summary>
        public string id
        {
            get
            {
                return Marshal.PtrToStringAnsi(_GetID(m_nAddr, 1));
            }
        }

        /// <summary>
        /// 获取楼层数量。
        /// </summary>
        public int layerCount
        {
            get
            {
                return _IterLayer(m_nAddr, new IntPtr(-1));
            }
        }

        /// <summary>
        /// 获取场景列表。
        /// </summary>
        public MList layers
        {
            get
            {
                return new ProductList_(delegate (IntPtr p1)
                {
                    return _IterLayer(m_nAddr, p1);
                });
            }
        }

        /// <summary>
        /// 场景根对象。
        /// </summary>
        public Object3D object3D
        {
            get
            {
                int nObject = _GetObject(m_nAddr);
                if (0 == nObject)
                {
                    return null;
                }

                return Factory.g_pIns.GetObject<GameObject_>(nObject);
            }
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
                    case nameof(_IterLayer):
                        _IterLayer = (Exports.dynCall_ijj)Marshal.GetDelegateForFunctionPointer(aFunc[i], typeof(Exports.dynCall_ijj));
                        break;
                    case nameof(_GetID):
                        _GetID = (Exports.dynCall_jji)Marshal.GetDelegateForFunctionPointer(aFunc[i], typeof(Exports.dynCall_jji));
                        break;
                    case nameof(_GetObject):
                        _GetObject = (Exports.dynCall_ij)Marshal.GetDelegateForFunctionPointer(aFunc[i], typeof(Exports.dynCall_ij));
                        break;
                    default:
                        break;
                }
            }
        }

        /// <summary>
        /// 场景ID获取函数。
        /// </summary>
        internal static Exports.dynCall_jji _GetID = null;
        /// <summary>
        /// 场景列表迭代器。
        /// </summary>
        internal static Exports.dynCall_ijj _IterLayer = null;
        /// <summary>
        /// 场景根对象获取函数。
        /// </summary>
        internal static Exports.dynCall_ij _GetObject = null;
        #endregion
    }


    /// <summary>
    /// 游戏图层。
    /// </summary>
    internal class Layer_ : Layer, IProduct
    {
        /// <summary>
        /// 对象ID。
        /// </summary>
        public int ID { get; set; }

        /// <summary>
        /// 获取对象类型标识。
        /// </summary>
        /// <returns>返回对象类型标识。</returns>
        public ProductType Type()
        {
            return ProductType.Layer;
        }

        /// <summary>
        /// 获取本地对象指针。
        /// </summary>
        /// <returns>返回本地对象指针。</returns>
        public IntPtr GetPointer()
        {
            return m_nAddr;
        }

        /// <summary>
        /// 获取实际对象。
        /// </summary>
        /// <returns></returns>
        public object Get()
        {
            return null;
        }

        /// <summary>
        /// 销毁对象，释放内存空间。
        /// </summary>
        public void Destroy()
        {
        }

        /// <summary>
        /// 本地对象地址。
        /// </summary>
        public IntPtr m_nAddr;


        /// <summary>
        /// 构造函数。
        /// </summary>
        /// <param name="nDesc">资源描述表格。</param>
        public Layer_(int nDesc, IntPtr nObject)
        {
            m_nAddr = nObject;
        }


        #region 函数映射
        /// <summary>
        /// 对象ID。
        /// </summary>
        public int handle { get { return ID; } }

        /// <summary>
        /// 本地对象指针。
        /// </summary>
        public IntPtr nativePtr { get { return GetPointer(); } }

        /// <summary>
        /// 场景ID。
        /// </summary>
        public string id
        {
            get
            {
                return Marshal.PtrToStringAnsi(_GetID(m_nAddr, 1));
            }
        }

        /// <summary>
        /// 获取位置点数量。
        /// </summary>
        public int siteCount
        {
            get
            {
                return _IterSite(m_nAddr, new IntPtr(-1));
            }
        }

        /// <summary>
        /// 获取场景列表。
        /// </summary>
        public MList sites
        {
            get
            {
                return new ProductList_(delegate (IntPtr p1)
                {
                    return _IterSite(m_nAddr, p1);
                });
            }
        }

        /// <summary>
        /// 场景根对象。
        /// </summary>
        public Object3D object3D
        {
            get
            {
                int nObject = _GetObject(m_nAddr);
                if (0 == nObject)
                {
                    return null;
                }

                return Factory.g_pIns.GetObject<GameObject_>(nObject);
            }
        }

        /// <summary>
        /// 绘制函数。
        /// </summary>
        public void Draw()
        {
            _Draw(m_nAddr);
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
                    case nameof(_IterSite):
                        _IterSite = (Exports.dynCall_ijj)Marshal.GetDelegateForFunctionPointer(aFunc[i], typeof(Exports.dynCall_ijj));
                        break;
                    case nameof(_GetID):
                        _GetID = (Exports.dynCall_jji)Marshal.GetDelegateForFunctionPointer(aFunc[i], typeof(Exports.dynCall_jji));
                        break;
                    case nameof(_Draw):
                        _Draw = (Exports.dynCall_vj)Marshal.GetDelegateForFunctionPointer(aFunc[i], typeof(Exports.dynCall_vj));
                        break;
                    case nameof(_GetObject):
                        _GetObject = (Exports.dynCall_ij)Marshal.GetDelegateForFunctionPointer(aFunc[i], typeof(Exports.dynCall_ij));
                        break;
                    default:
                        break;
                }
            }
        }

        /// <summary>
        /// 楼层ID获取函数。
        /// </summary>
        internal static Exports.dynCall_jji _GetID = null;
        /// <summary>
        /// 楼层列表迭代器。
        /// </summary>
        internal static Exports.dynCall_ijj _IterSite = null;
        /// <summary>
        /// 楼层根对象获取函数。
        /// </summary>
        internal static Exports.dynCall_ij _GetObject = null;
        /// <summary>
        /// 楼层绘制函数。
        /// </summary>
        internal static Exports.dynCall_vj _Draw = null;
        #endregion
    }


    /// <summary>
    /// 游戏对象列表。
    /// </summary>
    internal class ProductList_ : MList, IEnumerator, IEnumerable
    {
        /// <summary>
        /// 构造函数。
        ///  Reset、MoveNext、Current、MoveNext、Current ...
        /// </summary>
        /// <param name="pNext">获取下一元素方法。</param>
        /// <param name="bLinear">元素是否以线性表存储。</param>
        internal ProductList_(Exports.dynCall_ij pNext, bool bLinear = false)
        {
            Count = pNext(new IntPtr(-1));

            m_bLinear = bLinear;
            m_nIndex = 0;
            m_nCur = 0;
            m_pNext = pNext;
        }

        /// <summary>
        /// 获取列表迭代器。
        /// </summary>
        /// <returns>返回列表迭代器。</returns>
        public IEnumerator GetEnumerator()
        {
            return this;
        }

        /// <summary>
        /// 重置迭代器。
        /// </summary>
        public void Reset()
        {
            m_nIndex = 0;
            m_nCur = 0;
        }

        /// <summary>
        /// 移动指针到下一个元素
        /// </summary>
        /// <returns>返回新目标是否有效。</returns>
        public bool MoveNext()
        {
            if (m_bLinear)
            {
                m_nCur = m_pNext(new IntPtr(m_nIndex)); m_nIndex++;
            }
            else
            {
                m_nCur = m_pNext(0 == m_nCur ? IntPtr.Zero : Factory.g_pIns.GetObject<IProduct>(m_nCur).GetPointer()); m_nIndex++;
            }

            return (m_nCur > 0) ? true : false;
        }

        /// <summary>
        /// 获取当前元素。在没有MoveNext或Reset前无效。
        /// </summary>
        public object Current
        {
            get { return Factory.g_pIns.GetObject<IProduct>(m_nCur); }
        }

        /// <summary>
        /// 元素数量。
        /// </summary>
        public int Count { get; private set; }


        /// <summary>
        /// 元素是否以线性表存储。
        /// </summary>
        private bool m_bLinear = false;
        /// <summary>
        /// 当前元素索引。
        /// </summary>
        private int m_nIndex = 0;
        /// <summary>
        /// 当前元素ID。
        /// </summary>
        private int m_nCur = 0;
        /// <summary>
        /// 返回下一个对象。
        /// </summary>
        private Exports.dynCall_ij m_pNext = null;
    }


    /// <summary>
    /// GIS对象。
    /// </summary>
    internal class Gis_ : Gis
    {
        /// <summary>
        /// 构造函数。
        /// </summary>
        internal Gis_(Material pMaterial, int nTessell)
        {
            m_nProjection = 0;
            m_nTessell = nTessell;
            m_nRadius = 6378137.0f;
            m_pMesh = CreateMesh(nTessell);
            m_pMesh2 = CreateMesh(nTessell / 2);
            m_pMesh3 = CreateMesh(nTessell / 4);

            m_pMaterial = pMaterial;
            m_aDrawInfo = new Vector4[3];
            m_nDrawInfo = Marshal.UnsafeAddrOfPinnedArrayElement(m_aDrawInfo, 0);
            m_pDrawInfo = new MaterialPropertyBlock();
        }

        /// <summary>
        /// 刷新GIS显示。
        /// </summary>
        /// <param name="rLng"></param>
        /// <param name="rLat"></param>
        /// <param name="nHeight"></param>
        internal IntPtr Flush(float rLng, float rLat, float nHeight)
        {
            m_aDrawInfo[0].x = rLng;
            m_aDrawInfo[0].y = rLat;
            m_aDrawInfo[0].z = nHeight;

            // 令本初子午线从-Z轴穿过，中心点始终朝上
            if (0 == m_nProjection)
            {
                m_pRotation = Quaternion.Euler(90.0f - rLat * Mathf.Rad2Deg, 0.0f, 0.0f) * Quaternion.Euler(0.0f, -90.0f + rLng * Mathf.Rad2Deg, 0.0f);
                m_pPosition = Vector3.up * -m_nRadius;
            }
            else
            {
                m_pRotation = Quaternion.Euler(90.0f - rLat * Mathf.Rad2Deg, 0.0f, 0.0f) * Quaternion.Euler(0.0f, 90.0f + rLng * Mathf.Rad2Deg, 0.0f);
                m_pPosition = Vector3.up * -m_nRadius;
            }

            // 避免视域裁剪
            m_pMesh.bounds = new Bounds(-m_pPosition, new Vector3(m_nRadius * 2.0f, m_nRadius * 2.0f, m_nRadius * 2.0f));

            m_aDrawInfo[1] = m_pPosition;

            m_aDrawInfo[2].x = m_pRotation.x;
            m_aDrawInfo[2].y = m_pRotation.y;
            m_aDrawInfo[2].z = m_pRotation.z;
            m_aDrawInfo[2].w = m_pRotation.w;

            return m_nDrawInfo;
        }

        /// <summary>
        /// 绘制瓦片。
        /// </summary>
        internal void Draw()
        {
            int nLevel = (int)m_aDrawInfo[1].z;
            int nTessell = m_nTessell / 4;
            Mesh pMesh = m_pMesh3;

            if (8 < nLevel && 13 > nLevel)
            {
                nTessell = m_nTessell;
                pMesh = m_pMesh;
            }
            else if (13 == nLevel)
            {
                nTessell = m_nTessell / 2;
                pMesh = m_pMesh2;
            }

            m_aDrawInfo[0].w = m_aDrawInfo[0].z / (nTessell - 1);

            m_pDrawInfo.Clear();
            m_pDrawInfo.SetVector("_LngLat", m_aDrawInfo[0]);
            m_pDrawInfo.SetVector("_Tile", m_aDrawInfo[1]);

            int nTexture = (int)m_aDrawInfo[2].x;
            if (0 < nTexture)
            {
                Texture2D pTexture = Factory.g_pIns.Get<Texture2D>(nTexture);
                if (null != pTexture)
                {
                    // 避免裂缝
                    pTexture.wrapMode = TextureWrapMode.Clamp;

                    m_pDrawInfo.SetTexture("_MainTex", pTexture);
                }
            }

            nTexture = (int)m_aDrawInfo[2].y;
            if (0 < nTexture)
            {
                Texture2D pTexture = Factory.g_pIns.Get<Texture2D>(nTexture);
                if (null != pTexture)
                {
                    // 避免裂缝
                    pTexture.wrapMode = TextureWrapMode.Clamp;

                    m_pDrawInfo.SetTexture("_HeightTex", pTexture);
                }
            }

            /// SSAO会导致一个灰色面片出现
            Graphics.DrawMesh(pMesh, m_pPosition, m_pRotation, m_pMaterial, 0, Camera.main, 0, m_pDrawInfo);
        }

        /// <summary>
        /// 创建网格对象。
        /// </summary>
        /// <param name="nTessell">网格细分数量。</param>
        /// <returns></returns>
        private Mesh CreateMesh(int nTessell)
        {
            Vector3[] aVertex = new Vector3[nTessell * nTessell];

            for (int nVertex = 0, nCol = 0; nCol < nTessell; nCol++)
            {
                for (int nRow = 0; nRow < nTessell; nRow++)
                {
                    aVertex[nVertex++] = new Vector3(nCol, nRow, 0.0f);
                }
            }

            int nCellCount = nTessell - 1;
            int[] aIndex = new int[6 * nCellCount * nCellCount];

            for (int nIndex = 0, nCol = 0; nCol < nCellCount; nCol++)
            {
                for (int nRow = 0; nRow < nCellCount; nRow++)
                {
                    int nVertex0 = (nRow * nTessell) + nCol;
                    int nVertex1 = nVertex0 + 1;
                    int nVertex2 = ((nRow + 1) * nTessell) + nCol;
                    int nVertex3 = nVertex2 + 1;

                    // 从左上角开始

                    aIndex[nIndex++] = nVertex0;
                    aIndex[nIndex++] = nVertex2;
                    aIndex[nIndex++] = nVertex3;

                    aIndex[nIndex++] = nVertex0;
                    aIndex[nIndex++] = nVertex3;
                    aIndex[nIndex++] = nVertex1;
                }
            }

            Mesh pMesh = new Mesh();
            pMesh.vertices = aVertex;
            pMesh.triangles = aIndex;
            pMesh.UploadMeshData(true);
            pMesh.bounds = new Bounds(Vector3.zero, new Vector3(m_nRadius, m_nRadius, m_nRadius));

            return pMesh;
        }


        /// <summary>
        /// 地图投影方式：0-经纬度投影，1-墨卡托投影。
        /// </summary>
        private int m_nProjection;

        /// <summary>
        /// 曲面细分数量。
        /// </summary>
        private int m_nTessell;

        /// <summary>
        /// 地球半径。
        /// </summary>
        private float m_nRadius;

        /// <summary>
        /// 用于绘制瓦片的网格对象。
        /// </summary>
        private Mesh m_pMesh;

        /// <summary>
        /// 用于绘制瓦片的网格对象。
        /// </summary>
        private Mesh m_pMesh2;

        /// <summary>
        /// 用于绘制瓦片的网格对象。
        /// </summary>
        private Mesh m_pMesh3;

        /// <summary>
        /// 瓦片网格绘制材质。
        /// </summary>
        private Material m_pMaterial;

        /// <summary>
        /// 地球旋转。
        /// </summary>
        private Quaternion m_pRotation;

        /// <summary>
        /// 地球偏移。
        /// </summary>
        private Vector3 m_pPosition;

        /// <summary>
        /// 瓦片绘制数据。
        /// 起始经度、起始纬度、经度跨距、纬度跨距；
        /// 起始X坐标（米制）、起始Y坐标（米制）、瓦片大小（米制）、瓦片层级；
        /// </summary>
        private Vector4[] m_aDrawInfo;

        /// <summary>
        /// 瓦片绘制数据缓存地址。
        /// </summary>
        private IntPtr m_nDrawInfo;

        /// <summary>
        /// 瓦片绘制数据着色器属性。
        /// </summary>
        private MaterialPropertyBlock m_pDrawInfo;


        #region 函数映射
        /// <summary>
        /// 刷新GIS显示。
        /// </summary>
        public void Update(float rLng, float rLat, float nHeight)
        {
            _Update(IntPtr.Zero, rLng, rLat, nHeight);
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
                    case nameof(_Update):
                        _Update = (Exports.dynCall_vjfff)Marshal.GetDelegateForFunctionPointer(aFunc[i], typeof(Exports.dynCall_vjfff));
                        break;
                    default:
                        break;
                }
            }
        }

        /// <summary>
        /// 摄像机控制器状态更新函数。
        /// </summary>
        internal static Exports.dynCall_vjfff _Update = null;
        #endregion
    }


    /// <summary>
    /// 内置摄像机控制器。
    /// </summary>
    internal class CameraCtrl_ : CameraCtrl
    {
        /// <summary>
        /// 构造函数。
        /// </summary>
        /// <param name="nAddr">本地对象地址。</param>
        public CameraCtrl_(IntPtr nAddr)
        {
            m_nAddr = nAddr;
        }

        /// <summary>
        /// 本地对象地址。
        /// </summary>
        private IntPtr m_nAddr;

        #region 函数映射
        /// <summary>
        /// 初始化摄像机。
        /// </summary>
        public void Init()
        {
            _Init(m_nAddr);
        }

        /// <summary>
        /// 重置摄像机状态。
        /// </summary>
        public void Reset()
        {
            _Reset(m_nAddr, IntPtr.Zero);
        }

        /// <summary>
        /// 刷新摄像机状态。
        /// </summary>
        public void Update()
        {
            _Update(m_nAddr);
        }

        /// <summary>
        /// 远近拉伸缩放。
        /// </summary>
        public void Pinch(float nDelta)
        {
            _Pinch(m_nAddr, (int)(nDelta * 100));
        }

        /// <summary>
        /// 平移:0或者旋转:2。
        /// </summary>
        public void Drag(int nCtrl, float nDeltaX, float nDeltaY)
        {
            _Drag(m_nAddr, nCtrl, (int)(nDeltaX * 100), (int)(nDeltaY * 100));
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
                    case nameof(_Init):
                        _Init = (Exports.dynCall_vj)Marshal.GetDelegateForFunctionPointer(aFunc[i], typeof(Exports.dynCall_vj));
                        break;
                    case nameof(_Reset):
                        _Reset = (Exports.dynCall_vjj)Marshal.GetDelegateForFunctionPointer(aFunc[i], typeof(Exports.dynCall_vjj));
                        break;
                    case nameof(_Update):
                        _Update = (Exports.dynCall_vj)Marshal.GetDelegateForFunctionPointer(aFunc[i], typeof(Exports.dynCall_vj));
                        break;
                    case nameof(_Pinch):
                        _Pinch = (Exports.dynCall_vji)Marshal.GetDelegateForFunctionPointer(aFunc[i], typeof(Exports.dynCall_vji));
                        break;
                    case nameof(_Drag):
                        _Drag = (Exports.dynCall_vjiii)Marshal.GetDelegateForFunctionPointer(aFunc[i], typeof(Exports.dynCall_vjiii));
                        break;
                    default:
                        break;
                }
            }
        }

        /// <summary>
        /// 摄像机控制器初始化函数。
        /// </summary>
        internal static Exports.dynCall_vj _Init = null;
        /// <summary>
        /// 摄像机控制器状态重置函数。
        /// </summary>
        internal static Exports.dynCall_vjj _Reset = null;
        /// <summary>
        /// 摄像机控制器状态更新函数。
        /// </summary>
        internal static Exports.dynCall_vj _Update = null;
        /// <summary>
        /// 摄像机远近拉伸缩放。
        /// </summary>
        internal static Exports.dynCall_vji _Pinch = null;
        /// <summary>
        /// 摄像机平移:0或者旋转:2。
        /// </summary>
        internal static Exports.dynCall_vjiii _Drag = null;
        #endregion
    }


    /// <summary>
    /// 对象拾取器。
    /// </summary>
    internal class EntityPicker_
    {
        /// <summary>
        /// 鼠标拾取实体对象。
        /// </summary>
        /// <param name="mPosition">选择位置。</param>
        /// <param name="nLayers">层标志集。</param>
        /// <returns>返回选中的实体对象ID。</returns>
        internal IntPtr PickEntity(Vector3 mPosition, int nLayers)
        {
            GameObject_ pEntity = HitEntity(mPosition, nLayers);
            if (null != pEntity)
            {
                return pEntity.nativePtr;
            }

            return IntPtr.Zero;
        }

        /// <summary>
        /// 鼠标拾取实体对象。
        /// </summary>
        /// <param name="mPosition">选择位置。</param>
        /// <param name="nLayers">层标志集。</param>
        /// <returns>返回选中的实体对象。</returns>
        internal GameObject_ HitEntity(Vector3 mPosition, int nLayers)
        {
            GameObject pObject = HitObject(mPosition, nLayers);
            if (null != pObject)
            {
                Transform pTransform = pObject.transform;
                while (null != pTransform)
                {
                    GameObject_ pEntity = pTransform.GetComponent<GameObject_>();

                    if (null != pEntity)
                    {
                        return pEntity;
                    }

                    pTransform = pTransform.parent;
                }
            }

            return null;
        }

        /// <summary>
        /// 鼠标拾取对象。
        /// </summary>
        /// <param name="mPosition">选择位置。</param>
        /// <param name="nLayers">层标志集。</param>
        /// <returns>返回当前选中的对象。</returns>
        private GameObject HitObject(Vector3 mPosition, int nLayers)
        {
            Ray mRay = Camera.main.ScreenPointToRay(mPosition);
            RaycastHit mHitInfo;

            if (Physics.Raycast(mRay, out mHitInfo, 20000.0f, nLayers))
            {
                return mHitInfo.transform.gameObject;
            }

            return null;
        }
    }
}

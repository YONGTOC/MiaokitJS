using System;
using System.Runtime.InteropServices;
using UnityEngine;


namespace MiaokitJS
{
    internal static class Imports
    {
        #region 函数导入
#if (UNITY_IPHONE || UNITY_WEBGL) && !UNITY_EDITOR
	    [DllImport("__Internal")]
        internal static extern void UnityRegisterRenderingPlugin(int nLoad, int nUnload);

        [DllImport("__Internal")]
        [AOT.MonoPInvokeCallback(typeof(Exports.dynCall_vi))]
        internal static extern void PluginLoad(int pUnity);

        [DllImport("__Internal")]
        [AOT.MonoPInvokeCallback(typeof(Exports.dynCall_v))]
        internal static extern void PluginUnload();

        [DllImport("__Internal")]

        [AOT.MonoPInvokeCallback(typeof(Exports.dynCall_vi))]
        public static extern void RenderingEvent(int nEventID);

        [DllImport("__Internal")]
        public static extern void Init(string pImports, int nLength);
#else
        [DllImport("kernel32.dll")]
        internal extern static IntPtr LoadLibrary(string pPath);
        [DllImport("kernel32.dll")]
        internal extern static IntPtr GetProcAddress(IntPtr nLib, string pFunc);
        [DllImport("kernel32.dll")]
        internal extern static bool FreeLibrary(IntPtr nLib);
#endif
        #endregion
    }


    internal static class Exports
    {
        /// <summary>
        /// 收集导出函数列表。
        /// </summary>
        /// <param name="pVersion"></param>
        /// <returns></returns>
        public static string Collect(string pVersion)
        {
            FuncList.Func[] aFunc = new FuncList.Func[20];

            Collect(aFunc);

            foreach (FuncList.Func pFunc in aFunc)
            {
                pFunc.Addr = pFunc.Addr_.ToInt32();
            }

            FuncList pList = new FuncList();
            pList.Version = pVersion;
            pList.List = aFunc;

            return JsonUtility.ToJson(pList);
        }

        /// <summary>
        /// 收集导出函数列表。
        /// </summary>
        /// <param name="pVersion"></param>
        /// <returns></returns>
        public static IntPtr[] Collect()
        {
            int nCount = 20;
            FuncList.Func[] aFunc = new FuncList.Func[nCount];

            Collect(aFunc);

            IntPtr[] aFunc_ = new IntPtr[nCount + 5];

            for (int i = 0; i < nCount; i++)
            {
                aFunc_[i] = aFunc[i].Addr_;
            }

            aFunc_[nCount + 0] = Marshal.GetFunctionPointerForDelegate<dynCall_vjii>(__print);
            aFunc_[nCount + 1] = Marshal.GetFunctionPointerForDelegate<dynCall_vjjjjj>(__load);
            aFunc_[nCount + 2] = Marshal.GetFunctionPointerForDelegate<dynCall_vji>(__export_class);
            aFunc_[nCount + 3] = Marshal.GetFunctionPointerForDelegate<dynCall_vi>(__free_js_obj);
            aFunc_[nCount + 4] = Marshal.GetFunctionPointerForDelegate<dynCall_vjiiijj>(__load_map_tile);

            return aFunc_;
        }

        /// <summary>
        /// 收集导出函数列表。
        /// </summary>
        /// <param name="pVersion"></param>
        /// <returns></returns>
        private static void Collect(FuncList.Func[] aFunc)
        {
            aFunc[0] = new FuncList.Func();
            aFunc[0].Name = nameof(__engine_register_plugin);
            aFunc[0].Call = "dynCall_v";
            aFunc[0].Addr_ = Marshal.GetFunctionPointerForDelegate<dynCall_v>(__engine_register_plugin);

            aFunc[1] = new FuncList.Func();
            aFunc[1].Name = nameof(__engine_create_obj);
            aFunc[1].Call = "dynCall_iiii";
            aFunc[1].Addr_ = Marshal.GetFunctionPointerForDelegate<dynCall_iiij>(__engine_create_obj);

            aFunc[2] = new FuncList.Func();
            aFunc[2].Name = nameof(__engine_free_obj);
            aFunc[2].Call = "dynCall_vi";
            aFunc[2].Addr_ = Marshal.GetFunctionPointerForDelegate<dynCall_vi>(__engine_free_obj);

            aFunc[3] = new FuncList.Func();
            aFunc[3].Name = nameof(__engine_get_array_pointer);
            aFunc[3].Call = "dynCall_ii";
            aFunc[3].Addr_ = Marshal.GetFunctionPointerForDelegate<dynCall_ji>(__engine_get_array_pointer);

            aFunc[4] = new FuncList.Func();
            aFunc[4].Name = nameof(__engine_get_camera);
            aFunc[4].Call = "dynCall_i";
            aFunc[4].Addr_ = Marshal.GetFunctionPointerForDelegate<dynCall_i>(__engine_get_camera);

            aFunc[5] = new FuncList.Func();
            aFunc[5].Name = nameof(__engine_draw_mesh);
            aFunc[5].Call = "dynCall_vi";
            aFunc[5].Addr_ = Marshal.GetFunctionPointerForDelegate<dynCall_vi>(__engine_draw_mesh);

            aFunc[6] = new FuncList.Func();
            aFunc[6].Name = nameof(__engine_set_mat_tex);
            aFunc[6].Call = "dynCall_vii";
            aFunc[6].Addr_ = Marshal.GetFunctionPointerForDelegate<dynCall_vii>(__engine_set_mat_tex);

            aFunc[7] = new FuncList.Func();
            aFunc[7].Name = nameof(__engine_get_trans_bridge);
            aFunc[7].Call = "dynCall_ii";
            aFunc[7].Addr_ = Marshal.GetFunctionPointerForDelegate<dynCall_ji>(__engine_get_trans_bridge);

            aFunc[8] = new FuncList.Func();
            aFunc[8].Name = nameof(__engine_trans);
            aFunc[8].Call = "dynCall_vii";
            aFunc[8].Addr_ = Marshal.GetFunctionPointerForDelegate<dynCall_vii>(__engine_trans);

            aFunc[9] = new FuncList.Func();
            aFunc[9].Name = nameof(__engine_set_obj_data);
            aFunc[9].Call = "dynCall_vii";
            aFunc[9].Addr_ = Marshal.GetFunctionPointerForDelegate<dynCall_vii>(__engine_set_obj_data);

            aFunc[10] = new FuncList.Func();
            aFunc[10].Name = nameof(__engine_analyze);
            aFunc[10].Call = "dynCall_i";
            aFunc[10].Addr_ = Marshal.GetFunctionPointerForDelegate<dynCall_j>(__engine_analyze);

            aFunc[11] = new FuncList.Func();
            aFunc[11].Name = nameof(__engine_set_mesh_mat);
            aFunc[11].Call = "dynCall_viii";
            aFunc[11].Addr_ = Marshal.GetFunctionPointerForDelegate<dynCall_viii>(__engine_set_mesh_mat);

            aFunc[12] = new FuncList.Func();
            aFunc[12].Name = nameof(__engine_set_obj_mesh);
            aFunc[12].Call = "dynCall_vii";
            aFunc[12].Addr_ = Marshal.GetFunctionPointerForDelegate<dynCall_vii>(__engine_set_obj_mesh);

            aFunc[13] = new FuncList.Func();
            aFunc[13].Name = nameof(__engine_instantiate_prefab);
            aFunc[13].Call = "dynCall_ii";
            aFunc[13].Addr_ = Marshal.GetFunctionPointerForDelegate<dynCall_ji>(__engine_instantiate_prefab);

            aFunc[14] = new FuncList.Func();
            aFunc[14].Name = nameof(__engine_get_children);
            aFunc[14].Call = "dynCall_ii";
            aFunc[14].Addr_ = Marshal.GetFunctionPointerForDelegate<dynCall_ji>(__engine_get_children);

            aFunc[15] = new FuncList.Func();
            aFunc[15].Name = nameof(__engine_set_obj_parent);
            aFunc[15].Call = "dynCall_viii";
            aFunc[15].Addr_ = Marshal.GetFunctionPointerForDelegate<dynCall_viii>(__engine_set_obj_parent);

            aFunc[16] = new FuncList.Func();
            aFunc[16].Name = nameof(__engine_get_parent);
            aFunc[16].Call = "dynCall_ii";
            aFunc[16].Addr_ = Marshal.GetFunctionPointerForDelegate<dynCall_ji>(__engine_get_parent);

            aFunc[17] = new FuncList.Func();
            aFunc[17].Name = nameof(__engine_draw_map_tile);
            aFunc[17].Call = "dynCall_v";
            aFunc[17].Addr_ = Marshal.GetFunctionPointerForDelegate<dynCall_v>(__engine_draw_map_tile);

            aFunc[18] = new FuncList.Func();
            aFunc[18].Name = nameof(__engine_flush_map);
            aFunc[18].Call = "dynCall_ifff";
            aFunc[18].Addr_ = Marshal.GetFunctionPointerForDelegate<dynCall_jfff>(__engine_flush_map);

            aFunc[19] = new FuncList.Func();
            aFunc[19].Name = nameof(__engine_pick_obj);
            aFunc[19].Call = "dynCall_iii";
            aFunc[19].Addr_ = Marshal.GetFunctionPointerForDelegate<dynCall_jji>(__engine_pick_obj);
        }

        #region 导出函数实现
        [AOT.MonoPInvokeCallback(typeof(dynCall_v))]
        internal static void __engine_register_plugin()
        {
#if (UNITY_IPHONE || UNITY_WEBGL) && !UNITY_EDITOR
            int nLoad = Marshal.GetFunctionPointerForDelegate<dynCall_vi>(Imports.PluginLoad).ToInt32();
            int nUnload = Marshal.GetFunctionPointerForDelegate<dynCall_v>(Imports.PluginUnload).ToInt32();

            Imports.UnityRegisterRenderingPlugin(nLoad, nUnload);
#endif
        }

        [AOT.MonoPInvokeCallback(typeof(dynCall_v))]
        internal static void __engine_draw_map_tile()
        {
            Factory.g_pIns.m_pGis.Draw();
        }

        [AOT.MonoPInvokeCallback(typeof(dynCall_vi))]
        internal static void __engine_free_obj(int nID)
        {
            Factory.g_pIns.Free(nID);
        }

        [AOT.MonoPInvokeCallback(typeof(dynCall_vi))]
        internal static void __engine_draw_mesh(int nMesh)
        {
            Mesh_ pMesh = Factory.g_pIns.GetObject<Mesh_>(nMesh);
            if (null != pMesh)
            {
                pMesh.Draw();
            }
        }

        [AOT.MonoPInvokeCallback(typeof(dynCall_vii))]
        internal static void __engine_trans(int nID, int nCtrl)
        {
            GameObject_ pObject = Factory.g_pIns.GetObject<GameObject_>(nID);
            if (null != pObject)
            {
                pObject.transform_.Do(nCtrl);
            }
        }

        [AOT.MonoPInvokeCallback(typeof(dynCall_vii))]
        internal static void __engine_set_mat_tex(int nMaterial, int nTexture)
        {
            Material_ pMaterial = Factory.g_pIns.GetObject<Material_>(nMaterial);
            if (null != pMaterial)
            {
                pMaterial.SetTexture(nTexture);
            }
        }

        [AOT.MonoPInvokeCallback(typeof(dynCall_vii))]
        internal static void __engine_set_obj_data(int nID, int nDesc)
        {
            Factory.g_pIns.SetData(nID, nDesc);
        }

        [AOT.MonoPInvokeCallback(typeof(dynCall_vii))]
        internal static void __engine_set_obj_mesh(int nObject, int nMesh)
        {
            GameObject_ pObject = Factory.g_pIns.GetObject<GameObject_>(nObject);
            if (null != pObject)
            {
                pObject.SetMesh(nMesh);
            }
        }

        [AOT.MonoPInvokeCallback(typeof(dynCall_viii))]
        internal static void __engine_set_mesh_mat(int nMesh, int nSubIndex, int nMaterial)
        {
            Mesh_ pMesh = Factory.g_pIns.GetObject<Mesh_>(nMesh);
            if (null != pMesh)
            {
                pMesh.SetMaterial(nSubIndex, nMaterial);
            }
        }

        [AOT.MonoPInvokeCallback(typeof(dynCall_viii))]
        internal static void __engine_set_obj_parent(int nObject, int nParent, int nStays)
        {
            GameObject_ pObject = Factory.g_pIns.GetObject<GameObject_>(nObject);
            if (null != pObject)
            {
                pObject.SetParent(nParent, nStays);
            }
        }


        [AOT.MonoPInvokeCallback(typeof(dynCall_i))]
        internal static int __engine_get_camera()
        {
            return Factory.g_pIns.GetCamera();
        }

        [AOT.MonoPInvokeCallback(typeof(dynCall_iiij))]
        internal static int __engine_create_obj(int nType, int nDesc, IntPtr nObject)
        {
            return Factory.g_pIns.Create(nType, nDesc, nObject);
        }


        [AOT.MonoPInvokeCallback(typeof(dynCall_j))]
        internal static IntPtr __engine_analyze()
        {
            return Factory.g_pIns.Analyze();
        }

        [AOT.MonoPInvokeCallback(typeof(dynCall_jji))]
        internal static IntPtr __engine_pick_obj(IntPtr nPosition, int nLayers)
        {
            Vector3 mPosition = Input.mousePosition;
            if (IntPtr.Zero != nPosition)
            {
                mPosition.x = Marshal.ReadInt32(nPosition, 0);
                mPosition.y = Marshal.ReadInt32(nPosition, 4);
                mPosition.z = Marshal.ReadInt32(nPosition, 8);
            }

            return Factory.g_pIns.m_pPicker.PickEntity(mPosition, nLayers);
        }

        [AOT.MonoPInvokeCallback(typeof(dynCall_ji))]
        internal static IntPtr __engine_get_array_pointer(int nID)
        {
            IArray pArray = Factory.g_pIns.GetObject<IArray>(nID);
            if (null != pArray)
            {
                return pArray.GetPointer();
            }

            return IntPtr.Zero;
        }

        [AOT.MonoPInvokeCallback(typeof(dynCall_ji))]
        internal static IntPtr __engine_get_trans_bridge(int nID)
        {
            GameObject_ pObject = Factory.g_pIns.GetObject<GameObject_>(nID);
            if (null != pObject)
            {
                return pObject.transform_.m_nBridgeAddr;
            }

            return IntPtr.Zero;
        }

        [AOT.MonoPInvokeCallback(typeof(dynCall_ji))]
        internal static IntPtr __engine_get_children(int nID)
        {
            GameObject_ pObject = Factory.g_pIns.GetObject<GameObject_>(nID);
            if (null != pObject)
            {
                return pObject.children;
            }

            return IntPtr.Zero;
        }

        [AOT.MonoPInvokeCallback(typeof(dynCall_ji))]
        internal static IntPtr __engine_get_parent(int nID)
        {
            GameObject_ pObject = Factory.g_pIns.GetObject<GameObject_>(nID);
            if (null != pObject)
            {
                return pObject.parent;
            }

            return IntPtr.Zero;
        }

        [AOT.MonoPInvokeCallback(typeof(dynCall_ji))]
        internal static IntPtr __engine_instantiate_prefab(int nID)
        {
            return Factory.g_pIns.InstantiatePrefab(nID);
        }

        [AOT.MonoPInvokeCallback(typeof(dynCall_jfff))]
        internal static IntPtr __engine_flush_map(float rLng, float rLat, float nHeight)
        {
            return Factory.g_pIns.m_pGis.Flush(rLng, rLat, nHeight);
        }


        [AOT.MonoPInvokeCallback(typeof(dynCall_vi))]
        internal static void __free_js_obj(int nID)
        {
            Debug.LogError("未实现：" + "__free_js_obj");
        }

        [AOT.MonoPInvokeCallback(typeof(dynCall_vji))]
        internal static void __export_class(IntPtr nList, int nCount_)
        {
            int nIndex = 0;
            int nCount = Marshal.ReadInt32(nList, nIndex); nIndex += 4;
            int nOffset = Marshal.ReadInt32(nList, nIndex) * 4; nIndex += 4;

            for (int i = 0; i < nCount; i++)
            {
                int nItemCount = Marshal.ReadInt32(nList, nIndex) - (IntPtr.Size / 4); nIndex += 4;

                IntPtr nSignAddr = Marshal.ReadIntPtr(nList, nOffset); nOffset += 8;
                IntPtr nSignSize = Marshal.ReadIntPtr(nList, nOffset); nOffset += 8;

                string pSign = Marshal.PtrToStringAnsi(nSignAddr);
                pSign = "{\"Names\":" + pSign + "}";
                FuncList2 pFuncList = JsonUtility.FromJson<FuncList2>(pSign);
                IntPtr[] aFunc = new IntPtr[nItemCount];

                Debug.Log(pSign);

                for (int j = 0; j < nItemCount; j++)
                {
                    aFunc[j] = Marshal.ReadIntPtr(nList, nOffset); nOffset += 8;
                }

                switch (pFuncList.Names[0])
                {
                    case nameof(MiaokitJS.Miaokit):
                        MiaokitJS.Miaokit.InitFunc(pFuncList.Names, aFunc);
                        break;
                    case nameof(MiaokitJS.CameraCtrl):
                        MiaokitJS.CameraCtrl_.InitFunc(pFuncList.Names, aFunc);
                        break;
                    case nameof(MiaokitJS.Gis):
                        MiaokitJS.Gis_.InitFunc(pFuncList.Names, aFunc);
                        break;
                    case nameof(MiaokitJS.Tile):
                        MiaokitJS.Tile_.InitFunc(pFuncList.Names, aFunc);
                        break;
                    case nameof(MiaokitJS.Scene):
                        MiaokitJS.Scene_.InitFunc(pFuncList.Names, aFunc);
                        break;
                    case nameof(MiaokitJS.Layer):
                        MiaokitJS.Layer_.InitFunc(pFuncList.Names, aFunc);
                        break;
                    default:
                        break;
                }
            }
        }

        [AOT.MonoPInvokeCallback(typeof(dynCall_vjii))]
        internal static void __print(IntPtr nMsg, int nLength, int nCtrl)
        {
            string pMsg = Marshal.PtrToStringAnsi(nMsg);

            if (2 == nCtrl)
            {
                Debug.LogWarning("" + nLength + " " + pMsg);
            }
            else if (2 < nCtrl)
            {
                Debug.LogError("" + nLength + " " + pMsg);
            }
            else
            {
                Debug.Log("" + nLength + " " + pMsg);
            }
        }

        [AOT.MonoPInvokeCallback(typeof(dynCall_vjjjjj))]
        internal static void __load(IntPtr nPath, IntPtr nLength, IntPtr nObject, IntPtr nAlloc, IntPtr nCallback)
        {
            string pPath = Marshal.PtrToStringAnsi(nPath);

            Factory.g_pIns.Load(pPath, delegate (byte[] aData)
            {
                Exports.dynCall_jjj pAlloc = (Exports.dynCall_jjj)Marshal.GetDelegateForFunctionPointer(nAlloc, typeof(Exports.dynCall_jjj));
                Exports.dynCall_vj pCallback = (Exports.dynCall_vj)Marshal.GetDelegateForFunctionPointer(nCallback, typeof(Exports.dynCall_vj));

                if (null != aData)
                {
                    IntPtr nBuffer = pAlloc(nObject, new IntPtr(aData.Length));
                    if (IntPtr.Zero != nBuffer)
                    {
                        Marshal.Copy(aData, 0, nBuffer, aData.Length);
                    }
                }

                pCallback(nObject);
            });
        }

        [AOT.MonoPInvokeCallback(typeof(dynCall_vjiiijj))]
        internal static void __load_map_tile(IntPtr nTile, int nRow, int nCol, int nLevel, IntPtr nAlloc, IntPtr nCallback)
        {
            string pPath = String.Format("http://127.0.0.1:8888/baidu_tile_3d?&x={0}&y={1}&l={2}", nRow, nCol, nLevel);

            Factory.g_pIns.Load(pPath, delegate (string pText)
            {
                Exports.dynCall_jjj pAlloc = (Exports.dynCall_jjj)Marshal.GetDelegateForFunctionPointer(nAlloc, typeof(Exports.dynCall_jjj));
                Exports.dynCall_vjji pCallback = (Exports.dynCall_vjji)Marshal.GetDelegateForFunctionPointer(nCallback, typeof(Exports.dynCall_vjji));

                if (null != pText)
                {
                    TILE_DATA_3D pData = JsonUtility.FromJson<TILE_DATA_3D>(pText);
                    if (null != pData.m_aData)
                    {
                        pCallback(nTile, Marshal.UnsafeAddrOfPinnedArrayElement(pData.m_aData, 0), pData.m_nCount);
                        return;
                    }
                }

                pCallback(nTile, IntPtr.Zero, 0);
            });
        }
        #endregion

        #region 函数签名
        internal delegate void dynCall_v();
        internal delegate void dynCall_vi(int p0);
        internal delegate void dynCall_vii(int p0, int p1);
        internal delegate void dynCall_viii(int p0, int p1, int p2);
        internal delegate void dynCall_vj(IntPtr p0);
        internal delegate void dynCall_vji(IntPtr p0, int p1);
        internal delegate void dynCall_vjj(IntPtr p0, IntPtr p1);
        internal delegate void dynCall_vjii(IntPtr p0, int p1, int p2);
        internal delegate void dynCall_vjji(IntPtr p0, IntPtr p1, int p2);
        internal delegate void dynCall_vjiii(IntPtr p0, int p1, int p2, int p3);
        internal delegate void dynCall_vjjjjj(IntPtr p0, IntPtr p1, IntPtr p2, IntPtr p3, IntPtr p4);
        internal delegate void dynCall_vjiiijj(IntPtr p0, int p1, int p2, int p3, IntPtr p4, IntPtr p5);
        internal delegate void dynCall_vjfff(IntPtr p0, float p1, float p2, float p3);

        internal delegate int dynCall_i();
        internal delegate int dynCall_ii(int p0);
        internal delegate int dynCall_iiij(int p0, int p1, IntPtr p2);
        internal delegate int dynCall_ij(IntPtr p0);
        internal delegate int dynCall_ijj(IntPtr p0, IntPtr p2);
        internal delegate int dynCall_ijjj(IntPtr p0, IntPtr p1, IntPtr p2);

        internal delegate IntPtr dynCall_j();
        internal delegate IntPtr dynCall_ji(int p0);
        internal delegate IntPtr dynCall_jj(IntPtr p0);
        internal delegate IntPtr dynCall_jji(IntPtr p0, int p1);
        internal delegate IntPtr dynCall_jjj(IntPtr p0, IntPtr p1);
        internal delegate IntPtr dynCall_jfff(float p0, float p1, float p2);
        #endregion

        #region 嵌套类型
        internal class FuncList
        {
            public string Version = "20190101_0000";
            public Func[] List = null;

            [System.Serializable]
            public class Func
            {
                public string Name = null;
                public string Call = null;
                public int Addr = 0;
                public IntPtr Addr_ = IntPtr.Zero;
            }
        }

        [System.Serializable]
        internal class FuncList2
        {
            public string[] Names = null;
        }

        internal class TILE_DATA_3D
        {
            public int m_nCount = 0;
            public float[] m_aData = null;
        }
        #endregion
    }
}

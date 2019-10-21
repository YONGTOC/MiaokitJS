using System.IO;
using System.Collections;
using System.Collections.Generic;
using UnityEngine;
using UnityEditor;

public class Exporter
{
    // AB: https://blog.csdn.net/llj1985/article/details/51314384

    [MenuItem("GameObject/加载模型", false, 0)]
    static void Load()
    {
        string pFile = EditorUtility.OpenFilePanel("加载模型", m_pProjectPath, "assetbundle");
        if (null != pFile && 0 < pFile.Length)
        {
            AssetBundle pAsset = AssetBundle.LoadFromFile(pFile);
            UnityEngine.Object pPrefab = pAsset.LoadAsset(pAsset.GetAllAssetNames()[0]);

            GameObject pObject = GameObject.Instantiate(pPrefab) as GameObject;

            pAsset.Unload(false);

            Debug.LogWarning("加载模型完成：" + pFile);
        }
        else
        {
            Debug.LogWarning("请选择一个文件！");
        }
    }

    [MenuItem("Assets/加载并优化模型", false, 0)]
    static void LoadOptimize()
    {
        string pFile = EditorUtility.OpenFilePanel("加载模型", m_pProjectPath, "assetbundle");
        if (null != pFile && 0 < pFile.Length)
        {
            AssetBundle pAsset = AssetBundle.LoadFromFile(pFile);
            UnityEngine.Object pPrefab = pAsset.LoadAsset(pAsset.GetAllAssetNames()[0]);

            GameObject pObject = m_pOptimizer.Combine(pPrefab as GameObject);
            pObject.name = pPrefab.name;

            pAsset.Unload(false);

            Debug.LogWarning("加载优化模型完成：" + pFile);
        }
        else
        {
            Debug.LogWarning("请选择一个文件！");
        }
    }

    [MenuItem("Assets/优化模型", false, 0)]
    static void Optimize()
    {
        if (null != Selection.activeGameObject)
        {
            GameObject pObject = m_pOptimizer.Combine(Selection.activeGameObject);
            pObject.name = Selection.activeGameObject.name;

            Debug.LogWarning("优化模型完成：" + pObject.name);
        }
        else
        {
            Debug.LogWarning("请选中一个对象！");
        }
    }

    [MenuItem("Assets/导出模型/WebGL", false, 0)]
    static void ExportWebGL()
    {
        Export("webgl");
    }

    [MenuItem("Assets/导出模型/PC", false, 0)]
    static void ExportPC()
    {
        Export("pc");
    }


    static void Export(string pTarget)
    {
        if (null != Selection.activeGameObject)
        {
            string pObjectName = Selection.activeGameObject.name;
            string pPrefabName = AssetDatabase.GetAssetPath(Selection.activeObject);

            string pName = "opt-" + pTarget + "-" + pObjectName;
            string pFile = EditorUtility.SaveFilePanel("保存模型", m_pProjectPath, pName, "assetbundle");
            string pPath = pFile.Substring(0, pFile.LastIndexOf('/'));

            BuildTarget eTarget = "webgl" == pTarget ? BuildTarget.WebGL : BuildTarget.StandaloneWindows;

            AssetBundleBuild[] aBuild = new AssetBundleBuild[1];
            aBuild[0].assetBundleName = pName;
            aBuild[0].assetNames = new string[] { pPrefabName };
            aBuild[0].assetBundleVariant = "assetbundle";

            if (File.Exists(pFile))
            {
                File.Delete(pFile);
            }

            BuildPipeline.BuildAssetBundles(pPath, aBuild, (
                BuildAssetBundleOptions.ForceRebuildAssetBundle |
                BuildAssetBundleOptions.StrictMode
                ), eTarget);

            AssetDatabase.Refresh();

            Debug.LogWarning("导出模型完成：" + pFile);

            System.Diagnostics.Process.Start("explorer.exe", pPath.Replace('/', '\\'));
        }
        else
        {
            Debug.LogWarning("请选中一个对象！");
        }
    }


    private static string m_pPath = Application.dataPath + "/";
    private static string m_pProjectPath = m_pPath.Substring(0, m_pPath.Length - 7);
    private static Optimizer m_pOptimizer = new Optimizer();
}


public class Optimizer
{
    /// <summary>
    /// 合并优化对象。
    /// </summary>
    /// <param name="pObject">待优化对象。</param>
    /// <returns>已优化对象。</returns>
    public GameObject Combine(GameObject pObject)
    {
        List<Group> pIndependentList = new List<Group>();
        GameObject pNewObject = null;

        Independent(pObject.transform, pIndependentList);

        foreach (Group pItem in pIndependentList)
        {
            Collect(pItem.m_pTransform, pItem, pIndependentList);
            Create(pItem);

            Debug.LogError(pItem.m_pTransform.name + " " + pItem.m_pFilterList.Count);
        }

        foreach (Group pItem in pIndependentList)
        {
            if (null != pItem.m_pTransform.parent)
            {
                foreach (Group pParent in pIndependentList)
                {
                    if (pParent.m_pTransform == pItem.m_pTransform.parent)
                    {
                        pItem.m_pObject.transform.parent = pParent.m_pObject.transform;
                    }
                }
            }
            else
            {
                pNewObject = pItem.m_pObject;
            }
        }

        CreatePrefab(pNewObject);

        return pNewObject;
    }

    /// <summary>
    /// 创建分组合并网格后的新对象。
    /// </summary>
    /// <param name="pGroup">分组。</param>
    private void Create(Group pGroup)
    {
        MeshFilter[] aFilter = pGroup.m_pFilterList.ToArray();
        Matrix4x4 mMatrix = Matrix4x4.identity; /*pItem.m_pTransform.worldToLocalMatrix;*/

        Dictionary<Material, MaterialGroup> pSubDict = new Dictionary<Material, MaterialGroup>();
        int nVertexCount = 0;

        for (int i = 0; i < aFilter.Length; i++)
        {
            MeshFilter pFilter = aFilter[i];
            MeshRenderer pRenderer = pFilter.GetComponent<MeshRenderer>();
            Mesh pMesh = pFilter.sharedMesh;
            Matrix4x4 mTrans = mMatrix * pFilter.transform.localToWorldMatrix;

            nVertexCount += pMesh.vertexCount;

            for (int j = 0; j < pMesh.subMeshCount; j++)
            {
                CombineInstance mInstance = new CombineInstance();
                mInstance.mesh = pMesh;
                mInstance.transform = mTrans;
                mInstance.subMeshIndex = j;

                Material pMaterial = pRenderer.sharedMaterials[j];
                MaterialGroup pSub = null;

                if (pSubDict.ContainsKey(pMaterial))
                {
                    pSub = pSubDict[pMaterial];
                }
                else
                {
                    pSub = new MaterialGroup();
                    pSub.m_pMaterial = pMaterial;
                    pSubDict.Add(pMaterial, pSub);
                }

                pSub.m_aInstance.Add(mInstance);
            }
        }

        foreach (MaterialGroup pSub in pSubDict.Values)
        {
            if (1 == pSub.m_aInstance.Count)
            {
                pSub.m_pInstance = pSub.m_aInstance[0];
            }
            else
            {
                Mesh pSubMesh = new Mesh();

                pSubMesh.indexFormat = 65535 < nVertexCount ? UnityEngine.Rendering.IndexFormat.UInt32 : UnityEngine.Rendering.IndexFormat.UInt16;
                pSubMesh.CombineMeshes(pSub.m_aInstance.ToArray(), true, true, false);

                pSub.m_pInstance.mesh = pSubMesh;
                pSub.m_pInstance.transform = Matrix4x4.identity;
                pSub.m_pInstance.subMeshIndex = 0;
            }
        }

        int nSubCount = pSubDict.Values.Count;
        CombineInstance[] aInstance = new CombineInstance[nSubCount];
        Material[] aMaterial = new Material[nSubCount];

        foreach (MaterialGroup pSub in pSubDict.Values)
        {
            nSubCount--;
            aInstance[nSubCount] = pSub.m_pInstance;
            aMaterial[nSubCount] = pSub.m_pMaterial;
        }

        GameObject pNewObject = new GameObject(pGroup.m_pTransform.gameObject.name);
        MeshFilter pNewFilter = pNewObject.AddComponent<MeshFilter>();
        MeshRenderer pNewRenderer = pNewObject.AddComponent<MeshRenderer>();
        Mesh pNewMesh = new Mesh();

        pNewMesh.indexFormat = 65535 < nVertexCount ? UnityEngine.Rendering.IndexFormat.UInt32 : UnityEngine.Rendering.IndexFormat.UInt16;
        pNewMesh.CombineMeshes(aInstance, false, true, false);
        pNewMesh.name = pNewObject.name;

        pNewFilter.mesh = pNewMesh;
        pNewRenderer.sharedMaterials = aMaterial;

        pGroup.m_pObject = pNewObject;
    }

    /// <summary>
    /// 创建预制件资源。
    /// </summary>
    /// <param name="pObject">对象。</param>
    /// <param name="bNew">是否新建资源，AB资源需要新建。</param>
    private void CreatePrefab(GameObject pObject)
    {
        if (null == pObject)
        {
            return;
        }

        string pPathRoot = "Assets/Optimize/" + pObject.name;
        string pPathTexture = pPathRoot + "/Texture";
        string pPathMaterial = pPathRoot + "/Material";
        string pPathMesh = pPathRoot + "/Mesh";

        if (!AssetDatabase.IsValidFolder("Assets/Optimize"))
        {
            AssetDatabase.CreateFolder("Assets", "Optimize");
        }

        if (!AssetDatabase.IsValidFolder(pPathRoot))
        {
            AssetDatabase.CreateFolder("Assets/Optimize", pObject.name);
        }

        if (!AssetDatabase.IsValidFolder(pPathTexture))
        {
            AssetDatabase.CreateFolder(pPathRoot, "Texture");
        }

        if (!AssetDatabase.IsValidFolder(pPathMaterial))
        {
            AssetDatabase.CreateFolder(pPathRoot, "Material");
        }

        if (!AssetDatabase.IsValidFolder(pPathMesh))
        {
            AssetDatabase.CreateFolder(pPathRoot, "Mesh");
        }


        MeshFilter[] aFilter = pObject.GetComponentsInChildren<MeshFilter>();

        for (int i = 0; i < aFilter.Length; i++)
        {
            Mesh pMesh = aFilter[i].sharedMesh;
            if (null != pMesh)
            {
                pMesh.Optimize();
                pMesh.name = "" + i + "-" + pMesh.name;
                AssetDatabase.CreateAsset(pMesh, pPathMesh + "/" + pMesh.name + ".asset");
            }
        }


        MeshRenderer[] aRenderer = pObject.GetComponentsInChildren<MeshRenderer>();
        Dictionary<Texture, Texture> pTextureList = new Dictionary<Texture, Texture>();
        List<Material> pMaterialList = new List<Material>();

        for (int i = 0; i < aRenderer.Length; i++)
        {
            Material[] aMaterial = aRenderer[i].sharedMaterials;

            for (int j = 0; j < aMaterial.Length; j++)
            {
                Material pMaterial = aMaterial[j];

                if (!pMaterialList.Contains(pMaterial))
                {
                    if (AssetDatabase.Contains(pMaterial))
                    {
                        AssetDatabase.RemoveObjectFromAsset(pMaterial);
                    }

                    pMaterialList.Add(pMaterial);
                }
                else
                {
                    continue;
                }

                Shader pShader = Shader.Find(pMaterial.shader.name);
                pMaterial.shader = pShader;

                int nCount = ShaderUtil.GetPropertyCount(pShader);
                for (int k = 0; k < nCount; k++)
                {
                    switch (ShaderUtil.GetPropertyType(pShader, k))
                    {
                        case ShaderUtil.ShaderPropertyType.TexEnv:
                            string pName = ShaderUtil.GetPropertyName(pShader, k);
                            Texture pTexture = pMaterial.GetTexture(pName);
                            if (pTexture)
                            {
                                if (!pTextureList.ContainsKey(pTexture))
                                {
                                    if (pTexture.dimension == UnityEngine.Rendering.TextureDimension.Tex2D)
                                    {
                                        Texture2D pNewTexture = OptimizeTrxture((Texture2D)pTexture, true, pPathTexture, pTextureList.Count);
                                        pTextureList.Add(pTexture, pNewTexture);

                                        pMaterial.SetTexture(pName, pNewTexture);
                                    }
                                    else
                                    {
                                        pTextureList.Add(pTexture, pTexture);
                                    }
                                }
                                else
                                {
                                    pMaterial.SetTexture(pName, pTextureList[pTexture]);
                                }
                            }
                            break;
                        default:
                            break;
                    }
                }
            }

            aRenderer[i].receiveShadows = false;
            aRenderer[i].shadowCastingMode = UnityEngine.Rendering.ShadowCastingMode.Off;
            aRenderer[i].reflectionProbeUsage = UnityEngine.Rendering.ReflectionProbeUsage.Off;
            aRenderer[i].lightProbeUsage = UnityEngine.Rendering.LightProbeUsage.Off;
        }

        for (int i = 0; i < pMaterialList.Count; i++)
        {
            pMaterialList[i].name = "" + i + "-" + pMaterialList[i].name;

            AssetDatabase.CreateAsset(pMaterialList[i], pPathMaterial + "/" + pMaterialList[i].name + ".mat");
        }


        AssetDatabase.Refresh();
        PrefabUtility.SaveAsPrefabAsset(pObject, pPathRoot + "/" + pObject.name + ".prefab");
    }

    /// <summary>
    /// 优化转换贴图。
    /// </summary>
    /// <param name="pTexture">原始贴图。</param>
    /// <returns>返回优化后贴图。</returns>
    private Texture2D OptimizeTrxture(Texture2D pOrgin, bool bOpacity, string pPath, int nIndex)
    {
        Texture2D pUncompress = null;
        Texture2D pSwitch = new Texture2D(pOrgin.width, pOrgin.height, pOrgin.format, pOrgin.mipmapCount > 1, false);
        pSwitch.LoadRawTextureData(pOrgin.GetRawTextureData());
        pSwitch.Apply(false, false);

        if (bOpacity)
        {
            pUncompress = new Texture2D(pOrgin.width / 2, pOrgin.height / 2, TextureFormat.RGB24, true, false);
        }
        else
        {
            pUncompress = new Texture2D(pOrgin.width, pOrgin.height, TextureFormat.RGBA32, true, false);
        }

        for (int level = 0; level < pSwitch.mipmapCount - 1; level++)
        {
            pUncompress.SetPixels(pSwitch.GetPixels(level + 1), level);
        }

        pUncompress.Apply(false, false);


        string pName = "" + (nIndex) + "-" + pOrgin.name;
        string pImageFile = pPath + "/" + pName + ".jpg";
        byte[] aImageData = pUncompress.EncodeToJPG();

        File.WriteAllBytes(pImageFile, aImageData);
        AssetDatabase.ImportAsset(pImageFile);
        TextureImporter pImporter = AssetImporter.GetAtPath(pImageFile) as TextureImporter;

        if (null != pImporter)
        {
            pImporter.compressionQuality = 50;
            pImporter.crunchedCompression = true;
            pImporter.isReadable = false;
            pImporter.SaveAndReimport();
        }

        AssetDatabase.Refresh();

        Texture.DestroyImmediate(pSwitch);
        Texture.DestroyImmediate(pUncompress);

        Texture2D pTexture = AssetDatabase.LoadAssetAtPath<Texture2D>(pImageFile);

        return pTexture;
    }

    /// <summary>
    /// 收集一个分组所有的网格组件。
    /// </summary>
    /// <param name="pObject">分组主对象。</param>
    /// <param name="pGroup">分组。</param>
    /// <param name="pIndependentList">分组列表</param>
    private void Collect(Transform pObject, Group pGroup, List<Group> pIndependentList)
    {
        MeshFilter pFilter = pObject.GetComponent<MeshFilter>();
        if (null != pFilter)
        {
            MeshRenderer pRenderer = pFilter.GetComponent<MeshRenderer>();

            if (!(null == pFilter.sharedMesh || null == pRenderer || !pRenderer.enabled || pRenderer.gameObject.name.Contains("ThinTree")))
            {
                pGroup.m_pFilterList.Add(pFilter);
            }
        }

        foreach (Transform pChild in pObject)
        {
            bool bCombine = true;

            foreach (Group pGroup_ in pIndependentList)
            {
                if (pGroup_.m_pTransform == pChild)
                {
                    bCombine = false;
                    break;
                }
            }

            if (bCombine)
            {
                Collect(pChild, pGroup, pIndependentList);
            }
        }
    }

    /// <summary>
    /// 确认对象是否独立。
    /// </summary>
    /// <param name="pObject">对象。</param>
    /// <param name="pList">独立对象存储列表。</param>
    /// <returns>独立返回对象变换组件。</returns>
    private Transform Independent(Transform pObject, List<Group> pList)
    {
        // 独立子节点列表
        List<Transform> pIndependentList = new List<Transform>();

        // 遍历所有子节点，确认它们是否需要独立存在
        foreach (Transform pChild in pObject)
        {
            Transform pIndependent = Independent(pChild, pList);
            if (null != pIndependent)
            {
                pIndependentList.Add(pIndependent);
            }
        }

        // 如果节点存在独立子节点，或者节点被标记为独立，又或者节点为跟节点，此时该节点独立
        if (0 < pIndependentList.Count || 0 < CheckLayer(pObject.gameObject.layer) || null == pObject.parent)
        {
            Group pGroup = new Group();
            pGroup.m_pTransform = pObject;

            pList.Add(pGroup);

            return pObject;
        }

        return null;
    }

    /// <summary>
    /// 确认对象被标记了特殊层。
    /// </summary>
    /// <param name="nLayer">对象层标识。</param>
    /// <returns>返回独立标记。</returns>
    private int CheckLayer(int nLayer)
    {
        switch (nLayer)
        {
            case 11/*AEdge*/:
                return 1;
            case 12/*AAreaBottom*/:
                return 1;
            case 13/*AAreaTop*/:
                return 1;
            case 14/*AHoleModel*/:
                return 1;
            case 15/*AEdgeModel*/:
                return 1;
            case 16/*EBuildingModel*/:
                return 1;
            case 17/*EStoreyModel*/:
                return 1;
            case 18/*EFurnitureModel*/:
                return 1;
            case 19/*EAssetsModel*/:
                return 1;
            case 20/*EPanel*/:
                return 1;
            case 21/*EGroup*/:
                return 0;
            case 22/*EPlaceholder*/:
                return 0;
            default:
                break;
        }

        return 0;
    }


    #region 嵌套类型
    public class Group
    {
        public GameObject m_pObject = null;
        public Transform m_pTransform = null;
        public List<MeshFilter> m_pFilterList = new List<MeshFilter>();
    }

    public class MaterialGroup
    {
        public List<CombineInstance> m_aInstance = new List<CombineInstance>();
        public Material m_pMaterial = null;
        public CombineInstance m_pInstance;
    }
    #endregion
}

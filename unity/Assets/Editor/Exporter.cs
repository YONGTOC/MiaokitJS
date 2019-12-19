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

    [MenuItem("GameObject/转换移动端资源包", false, 0)]
    static void Convert()
    {
        string pPath = EditorUtility.OpenFolderPanel("转换移动端资源包", m_pProjectPath, "");
        if (null != pPath && 0 < pPath.Length)
        {
            string[] aFile = Directory.GetFiles(pPath, "*.assetbundle", SearchOption.AllDirectories);

            foreach (string pFile in aFile)
            {
                AssetBundle pAsset = AssetBundle.LoadFromFile(pFile);
                UnityEngine.Object pPrefab = pAsset.LoadAsset(pAsset.GetAllAssetNames()[0]);

                m_pPacker.PackObject(pPrefab as GameObject, pFile + ".bin");

                pAsset.Unload(false);

                Debug.LogError("转换文件：" + pFile);
            }
        }
        else
        {
            Debug.LogWarning("请选择一个文件夹！");
        }
    }

    [MenuItem("GameObject/导出移动端模型", false, 0)]
    static void ExportWX()
    {
        if (null != Selection.activeGameObject)
        {
            m_pPacker.PackObject(Selection.activeGameObject);

            Debug.LogWarning("导出移动端模型完成：" + Selection.activeGameObject.name);
        }
        else
        {
            Debug.LogWarning("请选中一个对象！");
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

            pAsset.Unload(true);

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
    private static Packer m_pPacker = new Packer();
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


public class Packer
{
    /// <summary>
    /// 构造函数。
    /// </summary>
    public Packer()
    {
    }

    /// <summary>
    /// 打包对象。
    /// </summary>
    /// <param name="pObject"></param>
    public void PackObject(GameObject pObject, string pFile ="xxx.bin")
    {
        // 版本，头数据大小，名称数据大小
        Group_.g_nTotalHeader = 4 + 4 + 4;
        Group_.g_nTotalName = 0;

        m_aCroup = new Group_[5];

        for (int i = 0; i < m_aCroup.Length; i++)
        {
            m_aCroup[i] = new Group_();
        }


        Pack(pObject, -1);


        FileStream pStream = new FileStream(pFile, FileMode.OpenOrCreate);
        BinaryWriter pWriter = new BinaryWriter(pStream);

        pWriter.Write(1);
        pWriter.Write(Group_.g_nTotalHeader - 12);
        pWriter.Write(Group_.g_nTotalName);

        int nNameOffset = Group_.g_nTotalHeader;
        int nDataOffset = Group_.g_nTotalHeader + Group_.g_nTotalName;

        for (int i = 0; i < m_aCroup.Length; i++)
        {
            m_aCroup[i].WriteHeader(pWriter, ref nNameOffset, ref nDataOffset);
        }

        for (int i = 0; i < m_aCroup.Length; i++)
        {
            m_aCroup[i].WriteNameBuffer(pWriter);
        }

        for (int i = 0; i < m_aCroup.Length; i++)
        {
            m_aCroup[i].WriteDataBuffer(pWriter);
        }

        for (int i = 0; i < m_aCroup.Length; i++)
        {
            m_aCroup[i].Close();
        }

        pWriter.Close();
        pStream.Close();
    }

    /// <summary>
    /// 收集数据。
    /// </summary>
    /// <param name="pObject"></param>
    private void Pack(GameObject pObject, int nParent)
    {
        // [是否启用，父级索引，网格索引，网格渲染器索引，本地变换数据]

        int nMesh = -1;
        int nMeshRenderer = -1;
        int nObject = -1;

        MeshFilter pFilter = pObject.GetComponent<MeshFilter>();
        if (null != pFilter)
        {
            MeshRenderer pRenderer = pFilter.GetComponent<MeshRenderer>();
            if (null != pFilter.sharedMesh && null != pRenderer)
            {
                nMesh = m_aCroup[MESH].FindObject(pFilter.sharedMesh);
                if (-1 == nMesh)
                {
                    if (pFilter.sharedMesh.isReadable)
                    {
                        nMesh = m_aCroup[MESH].AddObject(pFilter.sharedMesh);
                        Pack(pFilter.sharedMesh);
                    }
                    else
                    {
                        Debug.LogError("PackMesh(网格数据不可读): " + pFilter.sharedMesh.name);
                    }
                }

                foreach (Material pMaterial in pRenderer.sharedMaterials)
                {
                    int nMaterial = m_aCroup[MATERIAL].FindObject(pMaterial);
                    if (-1 == nMaterial)
                    {
                        nMaterial = m_aCroup[MATERIAL].AddObject(pMaterial);
                        Pack(pMaterial);
                    }
                }

                if (-1 == nMeshRenderer)
                {
                    nMeshRenderer = m_aCroup[RENDERER].AddObject(pRenderer);
                    Pack(pRenderer);
                }
            }
        }

        if (-1 == nObject)
        {
            nObject = m_aCroup[OBJECT].AddObject(pObject);

            m_aCroup[OBJECT].WriteName(pObject.name);

            if (-1 == nParent)
            {
                m_aCroup[OBJECT].WriteData(1);
            }
            else
            {
                m_aCroup[OBJECT].WriteData(pObject.activeInHierarchy ? 1 : 0);
            }

            m_aCroup[OBJECT].WriteData(nMesh);
            m_aCroup[OBJECT].WriteData(nMeshRenderer);

            m_aCroup[OBJECT].WriteData(nParent);

            m_aCroup[OBJECT].WriteData(pObject.transform.localPosition);
            m_aCroup[OBJECT].WriteData(pObject.transform.localRotation);
            m_aCroup[OBJECT].WriteData(pObject.transform.localScale);

            Debug.LogError("OBJECT: " + nParent);
        }


        foreach (Transform pChild in pObject.transform)
        {
            Pack(pChild.gameObject, nObject);
        }
    }

    /// <summary>
    /// 打包网格对象。
    /// </summary>
    /// <param name="pMesh"></param>
    private void Pack(Mesh pMesh)
    {
        //[顶点数量，输入数量，子网格数量，{ 输入插槽，数据地址 }，{ 图元类型，数据数量，数据地址 }]

        m_aCroup[MESH].WriteName(pMesh.name);

        Vector3[] aPosition = pMesh.vertices;
        Vector3[] aNormal = pMesh.normals;
        Vector2[] aUV = pMesh.uv;

        int nInputCount = 1 + (null == aNormal ? 0 : 1) + (null == aUV ? 0 : 1);
        int nSubCount = pMesh.subMeshCount;
        int nDescCount = 3 + 2 * nInputCount + 3 * nSubCount;
        int[] aDesc = new int[nDescCount];

        int nIndex = 0;
        int nAddr = 4 * nDescCount;

        aDesc[nIndex++] = aPosition.Length;
        aDesc[nIndex++] = nInputCount;
        aDesc[nIndex++] = nSubCount;

        if (null != aPosition)
        {
            aDesc[nIndex++] = 0;
            aDesc[nIndex++] = nAddr;

            nAddr += 12 * aPosition.Length;
        }

        if (null != aNormal)
        {
            aDesc[nIndex++] = 1;
            aDesc[nIndex++] = nAddr;

            nAddr += 12 * aPosition.Length;
        }

        if (null != aUV)
        {
            aDesc[nIndex++] = 2;
            aDesc[nIndex++] = nAddr;

            nAddr += 8 * aPosition.Length;
        }

        for (int i = 0; i < nSubCount; i++)
        {
            int[] aIndex = pMesh.GetTriangles(i);

            aDesc[nIndex++] = 0;
            aDesc[nIndex++] = aIndex.Length;
            aDesc[nIndex++] = nAddr;

            nAddr += 4 * aIndex.Length;
        }

        m_aCroup[MESH].WriteData(aDesc);
        m_aCroup[MESH].WriteData(aPosition);
        m_aCroup[MESH].WriteData(aNormal);
        m_aCroup[MESH].WriteData(aUV);

        for (int i = 0; i < nSubCount; i++)
        {
            m_aCroup[MESH].WriteData(pMesh.GetTriangles(i));
        }

        Debug.LogError("MESH: " + pMesh.vertexCount);
    }

    /// <summary>
    /// 打包材质对象。
    /// </summary>
    /// <param name="pMesh"></param>
    private void Pack(Material pMaterial)
    {
        // [着色器名称，渲染模式，主颜色，贴图数量，贴图名称，贴图索引，贴图变换...]

        m_aCroup[MATERIAL].WriteName(pMaterial.name);

        int nMode = 0;
        if (pMaterial.HasProperty("_Mode"))
        {
            float nMode_ = pMaterial.GetFloat("_Mode");
            if (2.0f == nMode_)
            {
                nMode = 2;
            }

            if (3.0f == nMode)
            {
                nMode = 1;
            }
        }

        m_aCroup[MATERIAL].WriteData(pMaterial.shader.name);
        m_aCroup[MATERIAL].WriteData(nMode);

        m_aCroup[MATERIAL].WriteData(pMaterial.color);

        Dictionary<string, int> pImageList = new Dictionary<string, int>();

        int nCount = ShaderUtil.GetPropertyCount(pMaterial.shader);
        for (int k = 0; k < nCount; k++)
        {
            switch (ShaderUtil.GetPropertyType(pMaterial.shader, k))
            {
                case ShaderUtil.ShaderPropertyType.TexEnv:
                    string pName = ShaderUtil.GetPropertyName(pMaterial.shader, k);
                    Texture pTexture = pMaterial.GetTexture(pName);
                    if (pTexture && pTexture.dimension == UnityEngine.Rendering.TextureDimension.Tex2D)
                    {
                        int nImage = m_aCroup[IMAGE].FindObject(pTexture);
                        if (-1 == nImage)
                        {
                            nImage = m_aCroup[IMAGE].AddObject(pTexture);
                            Pack((Texture2D)pTexture);
                        }

                        if (-1 != nImage)
                        {
                            pImageList.Add(pName, nImage);
                        }
                    }
                    break;
                default:
                    break;
            }
        }

        m_aCroup[MATERIAL].WriteData(pImageList.Count);

        foreach (var pImage in pImageList)
        {
            m_aCroup[MATERIAL].WriteData(pImage.Key);
            m_aCroup[MATERIAL].WriteData(pImage.Value);

            Vector2 mOffset = pMaterial.GetTextureOffset(pImage.Key);
            Vector2 mScale = pMaterial.GetTextureScale(pImage.Key);

            m_aCroup[MATERIAL].WriteData(mOffset);
            m_aCroup[MATERIAL].WriteData(mScale);
        }

        Debug.LogError("MATERIAL: " + pMaterial.shader.name);
    }

    /// <summary>
    /// 打包贴图对象。
    /// </summary>
    /// <param name="pMesh"></param>
    private void Pack(Texture2D pOrgin)
    {
        // [数据大小，数据]

        Texture2D pUncompress = null;
        Texture2D pSwitch = new Texture2D(pOrgin.width, pOrgin.height, pOrgin.format, pOrgin.mipmapCount > 1, false);
        pSwitch.LoadRawTextureData(pOrgin.GetRawTextureData());
        pSwitch.Apply(false, false);

        if (!pOrgin.alphaIsTransparency)
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

        byte[] aData = pOrgin.alphaIsTransparency ? pUncompress.EncodeToPNG() : pUncompress.EncodeToJPG();

        Texture2D.DestroyImmediate(pUncompress);
        Texture2D.DestroyImmediate(pSwitch);

        m_aCroup[IMAGE].WriteName(pOrgin.name);
        m_aCroup[IMAGE].WriteData(aData.Length);
        m_aCroup[IMAGE].WriteData(aData);

        Debug.LogError("IMAGE: " + aData.Length);
    }

    /// <summary>
    /// 打包网格对象。
    /// </summary>
    /// <param name="pMesh"></param>
    private void Pack(MeshRenderer pRenderer)
    {
        // [是否启用，材质数量，材质列表]

        m_aCroup[RENDERER].WriteName(null);

        m_aCroup[RENDERER].WriteData(pRenderer.enabled ? 1 : 0);
        m_aCroup[RENDERER].WriteData(pRenderer.sharedMaterials.Length);

        foreach (Material pMaterial in pRenderer.sharedMaterials)
        {
            int nIndex = m_aCroup[MATERIAL].FindObject(pMaterial);
            m_aCroup[RENDERER].WriteData(nIndex);
        }

        Debug.LogError("RENDERER: " + pRenderer.sharedMaterials.Length);
    }


    /// <summary>
    /// 各类数据组[0-图片，1-材质，2-网格，3-网格渲染器，4-对象]。
    /// </summary>
    private Group_[] m_aCroup;
    private const int IMAGE = 0;
    private const int MATERIAL = 1;
    private const int MESH = 2;
    private const int RENDERER = 3;
    private const int OBJECT = 4;

    #region 嵌套类型
    /// <summary>
    /// 数据组。
    /// </summary>
    private class Group_
    {
        /// <summary>
        /// 构造函数。
        /// </summary>
        public Group_()
        {
            m_aDesc = new List<int>();

            m_pNameStream = new MemoryStream();
            m_pNameWriter = new BinaryWriter(m_pNameStream);

            m_pDataStream = new MemoryStream();
            m_pDataWriter = new BinaryWriter(m_pDataStream);

            m_pDict = new Dictionary<Object, int>();

            // 数量、名称地址、数据地址
            g_nTotalHeader += 4 + 4 + 4;
        }

        /// <summary>
        /// 关闭数据组。
        /// </summary>
        public void Close()
        {
            m_pNameWriter.Close();
            m_pNameStream.Close();

            m_pDataWriter.Close();
            m_pDataStream.Close();
        }

        /// <summary>
        /// 写入数据组头数据。
        /// </summary>
        /// <param name="pWriter"></param>
        /// <param name="nNameOffset"></param>
        /// <param name="nDataOffset"></param>
        public void WriteHeader(BinaryWriter pWriter, ref int nNameOffset, ref int nDataOffset)
        {
            pWriter.Write(m_aDesc.Count / 2);
            pWriter.Write(nNameOffset);
            pWriter.Write(nDataOffset);

            foreach (int i in m_aDesc)
            {
                pWriter.Write(i);
            }

            nNameOffset += (int)m_pNameStream.Position;
            nDataOffset += (int)m_pDataStream.Position;
        }

        /// <summary>
        /// 写入名称缓存。
        /// </summary>
        /// <param name="pWriter"></param>
        public void WriteNameBuffer(BinaryWriter pWriter)
        {
            pWriter.Write(m_pNameStream.GetBuffer(), 0, (int)m_pNameStream.Position);
        }

        /// <summary>
        /// 写入名称缓存。
        /// </summary>
        /// <param name="pWriter"></param>
        public void WriteDataBuffer(BinaryWriter pWriter)
        {
            pWriter.Write(m_pDataStream.GetBuffer(), 0, (int)m_pDataStream.Position);
        }


        /// <summary>
        /// 写入名称。
        /// </summary>
        /// <param name="pName"></param>
        public void WriteName(string pName)
        {
            if (null == pName)
            {
                pName = "UNNAME";
            }

            byte[] aName = System.Text.ASCIIEncoding.UTF8.GetBytes(pName);

            m_pNameWriter.Write(aName.Length);

            AddName((int)m_pNameStream.Position);
            AddData((int)m_pDataStream.Position);

            m_pNameWriter.Write(aName);
            m_pNameWriter.Write((byte)0);

            // 名称地址偏移、数据地址偏移
            g_nTotalHeader += 4 + 4;
            g_nTotalName += 4 + aName.Length + 1;
        }

        /// <summary>
        /// 写入数据。
        /// </summary>
        /// <param name="aData"></param>
        public void WriteData(byte[] aData)
        {
            if (null == aData)
            {
                return;
            }

            m_pDataWriter.Write(aData);
        }

        /// <summary>
        /// 写入数据。
        /// </summary>
        /// <param name="aData"></param>
        public void WriteData(int[] aData)
        {
            if (null == aData)
            {
                return;
            }

            for (int i = 0; i < aData.Length; i++)
            {
                m_pDataWriter.Write(aData[i]);
            }
        }

        /// <summary>
        /// 写入数据。
        /// </summary>
        /// <param name="aData"></param>
        public void WriteData(Vector3[] aData)
        {
            if (null == aData)
            {
                return;
            }

            for (int i = 0; i < aData.Length; i++)
            {
                m_pDataWriter.Write(aData[i].x);
                m_pDataWriter.Write(aData[i].y);
                m_pDataWriter.Write(aData[i].z);
            }
        }

        /// <summary>
        /// 写入数据。
        /// </summary>
        /// <param name="aData"></param>
        public void WriteData(Vector2[] aData)
        {
            if (null == aData)
            {
                return;
            }

            for (int i = 0; i < aData.Length; i++)
            {
                m_pDataWriter.Write(aData[i].x);
                m_pDataWriter.Write(aData[i].y);
            }
        }

        /// <summary>
        /// 写入数据。
        /// </summary>
        /// <param name="aData"></param>
        public void WriteData(Vector2 mData)
        {
            m_pDataWriter.Write(mData.x);
            m_pDataWriter.Write(mData.y);
        }

        /// <summary>
        /// 写入数据。
        /// </summary>
        /// <param name="aData"></param>
        public void WriteData(Vector3 mData)
        {
            m_pDataWriter.Write(mData.x);
            m_pDataWriter.Write(mData.y);
            m_pDataWriter.Write(mData.z);
        }

        /// <summary>
        /// 写入数据。
        /// </summary>
        /// <param name="aData"></param>
        public void WriteData(Quaternion mData)
        {
            m_pDataWriter.Write(mData.x);
            m_pDataWriter.Write(mData.y);
            m_pDataWriter.Write(mData.z);
            m_pDataWriter.Write(mData.w);
        }

        /// <summary>
        /// 写入数据。
        /// </summary>
        /// <param name="aData"></param>
        public void WriteData(Color mData)
        {
            m_pDataWriter.Write(mData.r);
            m_pDataWriter.Write(mData.g);
            m_pDataWriter.Write(mData.b);
            m_pDataWriter.Write(mData.a);
        }

        /// <summary>
        /// 写入数据。
        /// </summary>
        /// <param name="aData"></param>
        public void WriteData(int nData)
        {
            m_pDataWriter.Write(nData);
        }

        /// <summary>
        /// 写入数据。
        /// </summary>
        /// <param name="pName"></param>
        public void WriteData(string pData)
        {
            if (null == pData)
            {
                pData = "";
            }

            byte[] aData = System.Text.ASCIIEncoding.UTF8.GetBytes(pData);

            m_pDataWriter.Write(aData.Length);
            m_pDataWriter.Write(aData);
            m_pDataWriter.Write((byte)0);
        }


        /// <summary>
        /// 添加名称地址。
        /// </summary>
        /// <param name="nAddr"></param>
        private void AddName(int nAddr)
        {
            if (0 != m_aDesc.Count % 2)
            {
                Debug.LogError("AddName(): 0 != m_aDesc.Count % 2");
            }

            m_aDesc.Add(nAddr);
        }

        /// <summary>
        /// 添加名称地址。
        /// </summary>
        /// <param name="nAddr"></param>
        private void AddData(int nAddr)
        {
            if (1 != m_aDesc.Count % 2)
            {
                Debug.LogError("AddData(): 0 != m_aDesc.Count % 2");
            }

            m_aDesc.Add(nAddr);
        }


        /// <summary>
        /// 查找对象索引。
        /// </summary>
        /// <param name="pObject"></param>
        /// <returns></returns>
        public int FindObject(Object pObject)
        {
            if (!m_pDict.ContainsKey(pObject))
            {
                return -1;
            }

            return m_pDict[pObject];
        }

        /// <summary>
        /// 添加新对象。
        /// </summary>
        /// <param name="pObject"></param>
        /// <returns></returns>
        public int AddObject(Object pObject)
        {
            int nIndex = m_pDict.Count;

            m_pDict.Add(pObject, nIndex);

            return nIndex;
        }


        /// <summary>
        /// 数据项数据引用描述：[名称地址偏移、数据地址偏移]
        /// </summary>
        private List<int> m_aDesc;

        /// <summary>
        /// 名称数据流对象。
        /// </summary>
        private MemoryStream m_pNameStream;

        /// <summary>
        /// 名称写入器对象。
        /// </summary>
        private BinaryWriter m_pNameWriter;

        /// <summary>
        /// 数据数据流对象。
        /// </summary>
        private MemoryStream m_pDataStream;

        /// <summary>
        /// 数据写入器对象。
        /// </summary>
        private BinaryWriter m_pDataWriter;

        /// <summary>
        /// 对象字典。
        /// </summary>
        private Dictionary<Object, int> m_pDict;


        /// <summary>
        /// 头数据总计大小。
        /// </summary>
        public static int g_nTotalHeader = 0;

        /// <summary>
        /// 名称数据总计大小。
        /// </summary>
        public static int g_nTotalName = 0;
    }
    #endregion
}

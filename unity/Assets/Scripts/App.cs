using System.Collections;
using System.Collections.Generic;
using UnityEngine;
using MiaokitJS;


public class App : MonoBehaviour
{
    // 应用启动方法
    private void Start()
    {
        m_pCamera = Camera.main.gameObject;
        m_pCameraCtrl = new CameraCtrl(m_pCamera);
        m_pPicker = null;

        InitProject();
    }

    // 应用帧更新方法
    private void Update()
    {
        OnEvent();

        m_pCameraCtrl.Update();

        if (null != m_pGis)
        {
            m_pGis.Update(m_pCameraCtrl.lng * (Mathf.PI / 180), m_pCameraCtrl.lat * (Mathf.PI / 180), m_pCameraCtrl.distance);
        }

        if (null != m_pDioramas)
        {
            m_pDioramas.Update();
        }
    }

    // 响应鼠标控制事件。
    private void OnEvent()
    {
        //if(Input.GetKeyDown(KeyCode.N))
        //{
        //    System.Windows.Forms.OpenFileDialog pDialog = new System.Windows.Forms.OpenFileDialog();
        //    pDialog.InitialDirectory = "file://" + UnityEngine.Application.dataPath;
        //    if (pDialog.ShowDialog() == System.Windows.Forms.DialogResult.OK)
        //    {
        //        m_pDioramas = Miaokit.g_pIns.CreateDioramas("file://" + pDialog.FileName);
        //    }
        //}

        if (Input.GetMouseButtonDown(0) || Input.GetMouseButtonDown(1))
        {
            m_pLastMouse = Input.mousePosition;
        }

        if (Input.GetMouseButton(0))
        {
            Vector3 mDelta = Input.mousePosition - m_pLastMouse;
            m_pLastMouse = Input.mousePosition;

            m_pCameraCtrl.Move(-mDelta.x, -mDelta.y, Screen.width, Screen.height);
        }
        else if (Input.GetMouseButton(1))
        {
            Vector3 mDelta = Input.mousePosition - m_pLastMouse;
            m_pLastMouse = Input.mousePosition;

            m_pCameraCtrl.Rotate(mDelta.x, -mDelta.y, Screen.width, Screen.height);
        }

        float nScroll = Input.GetAxis("Mouse ScrollWheel");
        if (nScroll != 0.0f)
        {
            float nDelta = nScroll / Mathf.Abs(nScroll);

            m_pCameraCtrl.Scale(-nDelta, Screen.width, Screen.height);
        }
    }

    // 初始化项目。
    private void InitProject()
    {
        EagleParam pParam = new EagleParam();
        pParam.m_nLng = 110.326477f;
        pParam.m_nLat = 25.247935f;
        pParam.m_nDistance = 20000.0f;
        pParam.m_nPitch = 60.0f;
        pParam.m_nYaw = 0.0f;

        m_pCameraCtrl.Jump(CTRL_MODE.EAGLE, pParam);
        
        m_pGis = Miaokit.g_pIns.gis;
        m_pGis.imageServer = "http://t%d.tianditu.gov.cn/DataServer?T=img_c&tk=addfe5066d3d51cff95f9b58976befe0&x=%d&y=%d&l=%d";
        m_pGis.terrainServer = "https://t%d.tianditu.gov.cn/dem_sjk/DataServer?T=ele_c&tk=addfe5066d3d51cff95f9b58976befe0&x=%d&y=%d&l=%d";

        /// 添加桂林区域3D地图（请启动Plugins文件夹下的GisServer.bat服务）
        m_pGis.AddMapbox(new Vector2(110.310452f, 25.276903f), new Vector2(10000.0f, 10000.0f), new Vector3(0.0f, 160.0f, 0.0f), new Vector3(0.90f, 1.0f, 0.91f));

        /// 注册添加一个SVE工程到GIS中，实现动态管理
        m_pGis.AddSvetile("data/upload/admin/project/20191018/5da9159b2005e.txt", 1, 0, new Vector2(110.326814f, 25.248106f), new Vector2(1000.0f, 1000.0f), delegate (Tile pTile, bool bActive)
        {
            if (bActive)
            {
                Vector3 mOffset = new Vector3(-450.0f, 155.0f, -400.0f);
                Vector3 mEuler = new Vector3(0.0f, -42 + 180.0f, 0.0f);

                int nIndex = 0;

                foreach (Scene pScene in pTile.scenes)
                {
                    if (2 != nIndex++)
                    {
                        continue;
                    }

                    Object3D pObject = pScene.object3D;
                    pObject.transform.localPosition = mOffset;
                    pObject.transform.localEulerAngles = mEuler;

                    float nHeight = 0.0f;

                    Debug.LogError("场景：" + pScene.id + " " + pScene.layerCount);

                    foreach (Layer pLayer in pScene.layers)
                    {
                        Object3D pLayerObj = pLayer.object3D;
                        pLayerObj.transform.localPosition = new Vector3(0.0f, nHeight, 0.0f); nHeight += 9.0f;

                        Debug.LogError("楼层：" + pLayer.id + " " + pLayer.siteCount);

                        pLayer.Draw();
                    }
                }
            }
        });

        /// 注册添加一个SVE工程(仅含一个内景)到GIS中，实现动态管理
        m_pGis.AddSvetile("data/upload/admin/project/20190807/5d4a310351522.txt", 2, 0, new Vector2(110.326814f, 25.248106f), new Vector2(1000.0f, 1000.0f), delegate (Tile pTile, bool bActive)
        {
            if (bActive)
            {
                Vector3 mOffset = new Vector3(-10.0f, 164.0f, -40.0f);
                Vector3 mEuler = new Vector3(0.0f, -42.0f, 0.0f);

                foreach (Scene pScene in pTile.scenes)
                {
                    Object3D pObject = pScene.object3D;
                    pObject.transform.localPosition = mOffset;
                    pObject.transform.localEulerAngles = mEuler;

                    float nHeight = 0.0f;

                    Debug.LogError("2场景：" + pScene.id + " " + pScene.layerCount);

                    foreach (Layer pLayer in pScene.layers)
                    {
                        Object3D pLayerObj = pLayer.object3D;
                        pLayerObj.transform.localPosition = new Vector3(0.0f, nHeight, 0.0f); nHeight += 9.0f;

                        Debug.LogError("2楼层：" + pLayer.id + " " + pLayer.siteCount);

                        pLayer.Draw();

                        if (10.0 < nHeight)
                        {
                            break;
                        }
                    }
                }
            }
        });
        

        /// 注册一个实景模型到GIS中。
        //m_pDioramas = Miaokit.g_pIns.CreateDioramas("file://H:/PictureModel/金秀县城/Scene/Production_1.3mx");
    }


    /// GIS对象。
    private Gis m_pGis = null;
    /// 摄像机对象。
    private GameObject m_pCamera = null;
    /// 摄像机控制器。
    private CameraCtrl m_pCameraCtrl = null;
    /// 对象拾取器。
    private object m_pPicker = null;
    /// 实景模型对象。
    private Dioramas3MX m_pDioramas = null;

    /// 上一光标位置。
    private Vector3 m_pLastMouse = Vector3.zero;
}

/*
11276 47957 18 https://ss1.bdstatic.com/8bo_dTSlR1gBo1vgoIiO_jowehsv/pvd/?qt=tile&param=3N5L>;C8:ME>;EK9FL5@@;G8NE9FA;C9
2E98O5K?CDI8A=B?BE92A;B6KCHLA;C6KH8DM=;@BPEB>38@GD9:A;D82JED>3K86ND>OCO82J544
11274 47959 18 https://ss3.bdstatic.com/8bo_dTSlR1gBo1vgoIiO_jowehsv/pvd/?qt=tile&param=3N5L>;C8:ME:;EK9FL5@@;G96E9FA;C9
2E98O5K?CDI8A=B?BE92A;B6KCHLA;C6KH8DM=;@BPEB>38@GD9:A;D82JED>3K86ND>OCO82J544
11274 47958 18 https://ss2.bdstatic.com/8bo_dTSlR1gBo1vgoIiO_jowehsv/pvd/?qt=tile&param=3N5L>;C8:ME:;EK9FL5@@;G92E9FA;C9
2E98O5K?CDI8A=B?BE92A;B6KCHLA;C6KH8DM=;@BPEB>38@GD9:A;D82JED>3K86ND>OCO82J544
 * */

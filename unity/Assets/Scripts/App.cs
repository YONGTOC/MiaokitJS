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

        if(null != m_pGis)
        {
            m_pGis.Update(110.326477f * (Mathf.PI / 180), 25.247935f * (Mathf.PI / 180), 2000.0f);
        }

        if(null != m_pDioramas)
        {
            m_pDioramas.Update();
        }
    }

    // 响应鼠标控制事件。
    private void OnEvent()
    {
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
        PanoramaParam pParam = new PanoramaParam();
        pParam.m_nLng = 0.0f;
        pParam.m_nLat = 0.0f;
        pParam.m_mTarget = Vector3.zero; //new Vector3(0.0f, 160.0f, 0.0f);// Vector3.zero;
        pParam.m_nDistance = 128.0f;
        pParam.m_nPitch = 60.0f;
        pParam.m_nYaw = 0.0f;

        m_pCameraCtrl.Jump(CTRL_MODE.PANORAMA, pParam);

        if(true)
        {
            m_pDioramas = Miaokit.g_pIns.CreateDioramas("file://H:/PictureModel/某镇政府/Production_8.3mx");

            return;
        }

        Miaokit.g_pIns.Load("data/upload/admin/project/20191018/5da9159b2005e.txt", delegate (byte[] aData)
        {
            if (null != aData)
            {
                Tile pTile = Miaokit.g_pIns.LoadTile(aData);
                int nIndex = 0;

                Debug.LogError("瓦片：" + pTile.handle + " " + pTile.sceneCount);

                foreach (Scene pScene in pTile.scenes)
                {
                    if (2 != nIndex++)
                    {
                        continue;
                    }

                    Object3D pObject = pScene.object3D;
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

        m_pGis = Miaokit.g_pIns.gis;
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

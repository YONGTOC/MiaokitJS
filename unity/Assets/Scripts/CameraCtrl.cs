using System.Collections;
using System.Collections.Generic;
using UnityEngine;


class CameraCtrl
{
    /// 构造函数。
    public CameraCtrl(GameObject pCamera)
    {
        m_pCamera = pCamera;
        m_pTransform = m_pCamera.transform;
    }

    /// 立即设置新的摄像机控制模式。
    public void Jump(CTRL_MODE eMode, object pParam_)
    {
        m_eCtrlMode = eMode;

        if (CTRL_MODE.REMOTE == eMode)
        {
            RemoteParam pParam = (RemoteParam)pParam_;
            m_nLng = pParam.m_nLng;
            m_nLat = pParam.m_nLat;
            m_nDistance = pParam.m_nHeight;
            m_nPitch = 90.0f;
            m_nYaw = 0.0f;
            m_mTarget = Vector3.zero;
        }
        else if (CTRL_MODE.EAGLE == eMode)
        {
            EagleParam pParam = (EagleParam)pParam_;
            m_nLng = pParam.m_nLng;
            m_nLat = pParam.m_nLat;
            m_nDistance = pParam.m_nDistance;
            m_nPitch = pParam.m_nPitch;
            m_nYaw = pParam.m_nYaw;
            m_mTarget = Vector3.zero;
        }
        else if (CTRL_MODE.PANORAMA == eMode)
        {
            PanoramaParam pParam = (PanoramaParam)pParam_;
            m_nLng = pParam.m_nLng;
            m_nLat = pParam.m_nLat;
            m_nDistance = pParam.m_nDistance;
            m_nPitch = pParam.m_nPitch;
            m_nYaw = pParam.m_nYaw;
            m_mTarget = pParam.m_mTarget;
        }
        else if (CTRL_MODE.WANDER == eMode)
        {
            WanderParam pParam = (WanderParam)pParam_;
            m_nLng = pParam.m_nLng;
            m_nLat = pParam.m_nLat;
            m_nDistance = 0.0f;
            m_nPitch = pParam.m_nPitch;
            m_nYaw = pParam.m_nYaw;
            //m_mTarget = pParam.m_mTarget;
        }
    }

    /// 飞行切换到指定状态。
    public void Fly(CTRL_MODE eMode, Vector3 mTarget, float nLng, float nLat, float nDistance, float nPitch, float nYaw)
    {
        m_pFlyTask = new FlyTask(this, eMode, mTarget, nLng, nLat, nDistance, nPitch, nYaw);
    }

    /// 移动摄像机。
    public void Move(float nOffsetX, float nOffsetY, int nWidth, int nHeight)
    {
        if (CTRL_MODE.REMOTE == ctrlMode || CTRL_MODE.EAGLE == ctrlMode)
        {
            // 60度视角下，距地面距离为地球半径时视线刚好能切过地球
            float nDistance = distance;
            float nLng = lng;
            float nLat = lat;

            if (nDistance > 6378137.0f)
            {
                nDistance = 6378137.0f;
            }

            if (nDistance < 0.0f)
            {
                nDistance = 0.0f;
            }

            // 可见弧度角性变化
            float nAngle = nDistance / 6378137.0f * 120.0f;
            float offsetLng = nOffsetX / nWidth * nAngle;
            float offsetLat = nOffsetY / nHeight * nAngle;

            nLng += offsetLng;
            nLat += offsetLat;

            lng = nLng;
            lat = nLat;
        }
        else if (CTRL_MODE.PANORAMA == ctrlMode)
        {
            float nViewHeight = 1.0f * distance;
            float nFactor = nViewHeight / nHeight;

            nOffsetX *= nFactor;
            nOffsetY *= nFactor;

            Vector3 mTarget = target;
            float rYaw = (yaw / 180.0f) * Mathf.PI;
            mTarget.x += nOffsetX * Mathf.Cos(rYaw);
            mTarget.z -= nOffsetX * Mathf.Sin(rYaw);
            mTarget.z += nOffsetY * Mathf.Cos(rYaw);
            mTarget.x += nOffsetY * Mathf.Sin(rYaw);

            target = mTarget;
        }
    }

    /// 旋转视野。
    public void Rotate(float nOffsetX, float nOffsetY, int nWidth, int nHeight)
    {
        if (CTRL_MODE.REMOTE != ctrlMode)
        {
            float nPitch = pitch;
            float nYaw = yaw;

            nYaw += nOffsetX / nWidth * 180f;
            nPitch += nOffsetY / nHeight * 90.0f;

            if (5.0f > nPitch)
            {
                nPitch = 5.0f;
            }

            if (90.0f < nPitch)
            {
                nPitch = 90.0f;
            }

            pitch = nPitch;
            yaw = nYaw;
        }
    }

    /// 缩放视野。
    public void Scale(float nDelta, float nWidth, float nHeight)
    {
        float nDistance = distance;
        nDistance += nDelta * nDistance * 0.05f;

        distance = nDistance;
    }

    /// 应用最新设置的参数，更新摄像机状态
    public void Update()
    {
        if (null != m_pFlyTask)
        {
            if (m_pFlyTask.Update())
            {
                m_pFlyTask = null;
            }

            return;
        }

        /// 非漫游模式：控制类似
        if (CTRL_MODE.WANDER != m_eCtrlMode)
        {
            // 遥感模式：俯角强制调整为90度，偏航角强制调整为0度
            if (CTRL_MODE.REMOTE == m_eCtrlMode)
            {
                if (20000.0f > height)
                {
                    m_eCtrlMode = CTRL_MODE.EAGLE;
                    Debug.Log("自动切换到鹰眼模式");
                }
                else
                {
                    float nBias = m_nPitch - 90.0f;
                    if (-0.1f > nBias || 0.1f < nBias)
                    {
                        m_nPitch -= nBias * 0.1f;
                    }

                    nBias = m_nYaw - 0.0f;
                    if (-0.1f > nBias || 0.1f < nBias)
                    {
                        m_nYaw -= nBias * 0.1f;
                    }
                }
            }
            else if (CTRL_MODE.EAGLE == m_eCtrlMode)
            {
                if (20000.0f < distance)
                {
                    m_eCtrlMode = CTRL_MODE.REMOTE;
                    Debug.Log("自动切换到遥感模式");
                }
                else
                {
                    float nBias = m_nPitch - 85.0f;
                    if (0.1 < nBias)
                    {
                        m_nPitch -= nBias * 0.1f;
                    }

                    nBias = 5.0f - m_nPitch;
                    if (0.1f < nBias)
                    {
                        m_nPitch += nBias * 0.1f;
                    }
                }
            }

            // 非全景模式：目标坐标强制调整为场景中心
            if (CTRL_MODE.PANORAMA != m_eCtrlMode)
            {
                Vector3 mTarget = target;

                float nBias = mTarget.x - 0.0f;
                if (-0.1f > nBias || 0.1f < nBias)
                {
                    mTarget.x += nBias * 0.1f;
                }

                nBias = mTarget.y - 0.0f;
                if (-0.1f > nBias || 0.1f < nBias)
                {
                    mTarget.y += nBias * 0.1f;
                }

                nBias = mTarget.z - 0.0f;
                if (-0.1f > nBias || 0.1f < nBias)
                {
                    mTarget.z += nBias * 0.1f;
                }

                target = mTarget;
            }

            m_pTransform.position = Vector3.zero;
            m_pTransform.eulerAngles = Vector3.zero;
            m_pTransform.Rotate(Vector3.right, pitch, Space.Self);
            m_pTransform.Rotate(Vector3.up, yaw, Space.World);
            m_pTransform.position = target;
            m_pTransform.Translate(-distance * Vector3.forward, Space.Self);
        }
        /// 漫游模式
        else
        {
            Debug.Log("未实现漫游模式");
        }
    }


    /// 获取当前摄像机控制模式。
    public CTRL_MODE ctrlMode
    {
        get
        {
            return m_eCtrlMode;
        }
    }

    /// 获取当前经度参数。
    public float lng
    {
        get
        {
            return m_nLng;
        }

        // 设置当前经度参数。仅REMOTE/EAGLE模式下设置生效。
        set
        {
            if (CTRL_MODE.REMOTE == m_eCtrlMode || CTRL_MODE.EAGLE == m_eCtrlMode)
            {
                m_nLng = value;
            }
        }
    }

    /// 获取当前经度参数。
    public float lat
    {
        get
        {
            return m_nLat;
        }

        // 设置当前经度参数。仅REMOTE/EAGLE模式下设置生效。
        set
        {
            if (CTRL_MODE.REMOTE == m_eCtrlMode || CTRL_MODE.EAGLE == m_eCtrlMode)
            {
                m_nLat = value;
            }
        }
    }

    /// 获取当前高度参数。
    public float height
    {
        get
        {
            return m_nDistance;
        }

        // 设置当前高度参数。仅REMOTE模式下设置生效。
        set
        {
            if (CTRL_MODE.REMOTE == m_eCtrlMode)
            {
                m_nDistance = value;
            }
        }
    }

    /// 获取当前距离参数。
    public float distance
    {
        get
        {
            return m_nDistance;
        }

        // 设置当前距离参数。仅REMOTE/EAGLE/PANORAMA模式下设置生效。
        set
        {
            if (CTRL_MODE.REMOTE == m_eCtrlMode || CTRL_MODE.EAGLE == m_eCtrlMode || CTRL_MODE.PANORAMA == m_eCtrlMode)
            {
                m_nDistance = value;
            }
        }
    }

    /// 获取当前俯角参数。
    public float pitch
    {
        get
        {
            return m_nPitch;
        }

        // 设置当前俯角参数。仅EAGLE/PANORAMA/WANDER模式下设置生效。
        set
        {
            if (CTRL_MODE.EAGLE == m_eCtrlMode || CTRL_MODE.PANORAMA == m_eCtrlMode || CTRL_MODE.WANDER == m_eCtrlMode)
            {
                m_nPitch = value;
            }
        }
    }

    /// 获取当前偏航角参数。
    public float yaw
    {
        get
        {
            return m_nYaw;
        }

        // 设置当前偏航角参数。仅EAGLE/PANORAMA/WANDER模式下设置生效。
        set
        {
            if (CTRL_MODE.EAGLE == m_eCtrlMode || CTRL_MODE.PANORAMA == m_eCtrlMode || CTRL_MODE.WANDER == m_eCtrlMode)
            {
                m_nYaw = value;
            }
        }
    }

    /// 获取当前目标坐标参数。
    public Vector3 target
    {
        get
        {
            return m_mTarget;
        }

        // 设置当前目标坐标参数。仅PANORAMA模式下设置生效。
        set
        {
            if (CTRL_MODE.PANORAMA == m_eCtrlMode)
            {
                m_mTarget = value;
            }
        }
    }

    /// 获取当前角色坐标参数。
    public Vector3 position
    {
        get
        {
            return m_mTarget;
        }

        // 设置当前角色坐标参数。仅WANDER模式下设置生效。
        set
        {
            if (CTRL_MODE.WANDER == m_eCtrlMode)
            {
                m_mTarget = value;
            }
        }
    }


    /// 摄像机对象。
    private GameObject m_pCamera = null;
    /// 摄像机变换组件。
    private Transform m_pTransform = null;

    /// 当前控制模式。
    private CTRL_MODE m_eCtrlMode = CTRL_MODE.REMOTE;
    /// 当前经度参数。
    private float m_nLng = 0.0f;
    /// 当前经度参数。
    private float m_nLat = 0.0f;
    /// 当前距离参数。
    private float m_nDistance = 0.0f;
    /// 当前俯角参数。
    private float m_nPitch = 0.0f;
    /// 当前偏航角参数。
    private float m_nYaw = 0.0f;
    /// 当前目标坐标参数。
    private Vector3 m_mTarget = Vector3.zero;
    /// 当前飞行任务。
    private FlyTask m_pFlyTask = null;


    class FlyTask
    {
        public FlyTask(CameraCtrl pCtrl, CTRL_MODE eMode, Vector3 mTarget, float nLng, float nLat, float nDistance, float nPitch, float nYaw)
        {
            m_pCameraCtrl = pCtrl;
            m_eMode = eMode;
            m_mTarget = mTarget;
            m_nLng = nLng;
            m_nLat = nLat;
            m_nDistance = nDistance;
            m_nPitch = nPitch;
            m_nYaw = nYaw;
        }

        public bool Update()
        {
            CameraCtrl pThis = m_pCameraCtrl;
            bool bComplete = true;
            float bSpeed = 0.5f;

            /// 经度渐变
            {
                float nBias = m_nLng - pThis.m_nLng;
                if (-0.1f > nBias || 0.1f < nBias)
                {
                    pThis.m_nLng += nBias * bSpeed;
                    bComplete = false;
                }
                else
                {
                    pThis.m_nLng = m_nLng;
                }
            }

            /// 纬度渐变
            {
                float nBias = m_nLat - pThis.m_nLat;
                if (-0.1f > nBias || 0.1f < nBias)
                {
                    pThis.m_nLat += nBias * bSpeed;
                    bComplete = false;
                }
                else
                {
                    pThis.m_nLat = m_nLat;
                }
            }

            /// 远近渐变
            {
                float nBias = m_nDistance - pThis.m_nDistance;
                if (-1.0f > nBias || 1.0f < nBias)
                {
                    pThis.m_nDistance += nBias * bSpeed;
                    bComplete = false;
                }
                else
                {
                    pThis.m_nDistance = m_nDistance;
                }
            }

            /// 俯仰角渐变
            {
                float nBias = m_nPitch - pThis.m_nPitch;
                if (-1.0f > nBias || 1.0f < nBias)
                {
                    pThis.m_nPitch += nBias * bSpeed;
                    bComplete = false;
                }
                else
                {
                    pThis.m_nPitch = m_nPitch;
                }
            }

            /// 偏航角渐变
            {
                float nBias = m_nYaw - pThis.m_nYaw;
                if (-1.0f > nBias || 1.0f < nBias)
                {
                    pThis.m_nYaw += nBias * bSpeed;
                    bComplete = false;
                }
                else
                {
                    pThis.m_nYaw = m_nYaw;
                }
            }

            // 目标位置渐变
            {
                float nBias = m_mTarget.x - pThis.m_mTarget.x;
                if (-1.0f > nBias || 1.0f < nBias)
                {
                    pThis.m_mTarget.x += nBias * bSpeed;
                    bComplete = false;
                }
                else
                {
                    pThis.m_mTarget.x = m_mTarget.x;
                }

                nBias = m_mTarget.y - pThis.m_mTarget.y;
                if (-1.0f > nBias || 1.0f < nBias)
                {
                    pThis.m_mTarget.y += nBias * bSpeed;
                    bComplete = false;
                }
                else
                {
                    pThis.m_mTarget.y = m_mTarget.y;
                }

                nBias = m_mTarget.z - pThis.m_mTarget.z;
                if (-1.0f > nBias || 1.0f < nBias)
                {
                    pThis.m_mTarget.z += nBias * bSpeed;
                    bComplete = false;
                }
                else
                {
                    pThis.m_mTarget.z = m_mTarget.z;
                }
            }

            if (bComplete)
            {
                pThis.m_eCtrlMode = m_eMode;
            }
            else
            {
                pThis.m_pTransform.position = Vector3.zero;
                pThis.m_pTransform.eulerAngles = Vector3.zero;
                pThis.m_pTransform.Rotate(Vector3.right, pThis.pitch, Space.Self);
                pThis.m_pTransform.Rotate(Vector3.up, pThis.yaw, Space.World);
                pThis.m_pTransform.position = pThis.target;
                pThis.m_pTransform.Translate(-pThis.distance * Vector3.forward, Space.Self);
            }

            return bComplete;
        }


        private CameraCtrl m_pCameraCtrl = null;
        private CTRL_MODE m_eMode = CTRL_MODE.REMOTE;
        private Vector3 m_mTarget = Vector3.zero;
        private float m_nLng = 0.0f;
        private float m_nLat = 0.0f;
        private float m_nDistance = 0.0f;
        private float m_nPitch = 0.0f;
        private float m_nYaw = 0.0f;
    }
}


enum CTRL_MODE
{
    /// 无效模式。
    INVALID = 0,
    /// 遥感模式：远地模式，始终垂直地表，可以设置目标经纬度和镜头距地高度。
    REMOTE = 1,
    /// 鹰眼模式：近地模式，距地高度20000米一下，可以设置目标经纬度和镜头距目标距离，可以设置镜头偏航角和俯仰角。
    EAGLE = 2,
    /// 全景模式：近地模式，锁定目标，固定场景中心经纬度，可以设置目标坐标，可以设置观察设备距目标距离、偏航角、俯仰角。
    PANORAMA = 3,
    /// 漫游模式：地表模式，无目标，可以移动自身位置，可设置偏航角、俯仰角。
    WANDER = 4,
}

enum VIEW_MODE
{
    /// 无效模式。
    INVALID = 1,
    /// 2D视图。
    _2D = 2,
    /// 3D视图。
    _3D = 3
}


class RemoteParam
{
    /// 目标经度坐标。
    public float m_nLng = 0.0f;
    /// 目标纬度坐标。
    public float m_nLat = 0.0f;
    /// 镜头距地表高度。
    public float m_nHeight = 0.0f;
}

class EagleParam
{
    /// 目标经度坐标。
    public float m_nLng = 0.0f;
    /// 目标纬度坐标。
    public float m_nLat = 0.0f;
    /// 镜头距目标距离。
    public float m_nDistance = 0.0f;

    /// 镜头对目标的俯角。
    public float m_nPitch = 0.0f;
    /// 镜头对目标的偏航角。
    public float m_nYaw = 0.0f;
}

class PanoramaParam
{
    /// 场景中心经度坐标。
    public float m_nLng = 0.0f;
    /// 场景中心纬度坐标。
    public float m_nLat = 0.0f;

    /// 目标坐标。
    public Vector3 m_mTarget = Vector3.zero;
    /// 镜头距目标距离。
    public float m_nDistance = 0.0f;
    /// 镜头对目标的俯角。
    public float m_nPitch = 0.0f;
    /// 镜头对目标的偏航角。
    public float m_nYaw = 0.0f;
}

class WanderParam
{
    /// 场景中心经度坐标。
    public float m_nLng = 0.0f;
    /// 场景中心纬度坐标。
    public float m_nLat = 0.0f;

    /// 角色坐标。
    public Vector3 m_mPosition = Vector3.zero;
    /// 角色视线俯角。
    public float m_nPitch = 0.0f;
    /// 角色视线偏航角。
    public float m_nYaw = 0.0f;
}

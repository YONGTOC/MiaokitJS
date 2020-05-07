
enum CTRL_MODE {
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

enum VIEW_MODE {
    /// 无效模式。
    INVALID = 1,
    /// 2D视图。
    _2D = 2,
    /// 3D视图。
    _3D = 3
}


class RemoteParam {
    /// 目标经度坐标。
    public m_nLng: number = 0.0;
    /// 目标纬度坐标。
    public m_nLat: number = 0.0;
    /// 镜头距地表高度。
    public m_nHeight: number = 0.0;
}

class EagleParam {
    /// 目标经度坐标。
    public m_nLng: number = 0.0;
    /// 目标纬度坐标。
    public m_nLat: number = 0.0;
    /// 镜头距目标距离。
    public m_nDistance: number = 0.0;

    /// 镜头对目标的俯角。
    public m_nPitch: number = 0.0;
    /// 镜头对目标的偏航角。
    public m_nYaw: number = 0.0;
}

class PanoramaParam {
    /// 场景中心经度坐标。
    public m_nLng: number = 0.0;
    /// 场景中心纬度坐标。
    public m_nLat: number = 0.0;

    /// 目标坐标。
    public m_mTarget: any = { x: 0.0, y: 0.0, z: 0.0 };
    /// 镜头距目标距离。
    public m_nDistance: number = 0.0;
    /// 镜头对目标的俯角。
    public m_nPitch: number = 0.0;
    /// 镜头对目标的偏航角。
    public m_nYaw: number = 0.0;
}

class WanderParam {
    /// 场景中心经度坐标。
    public m_nLng: number = 0.0;
    /// 场景中心纬度坐标。
    public m_nLat: number = 0.0;

    /// 角色坐标。
    public m_mPosition: any = { x: 0.0, y: 0.0, z: 0.0 };
    /// 角色视线俯角。
    public m_nPitch: number = 0.0;
    /// 角色视线偏航角。
    public m_nYaw: number = 0.0;
}


class CameraCtrl {
    /// 构造函数。
    public constructor(pCamera) {
        this.m_pCamera = pCamera;
        this.m_pTransform = this.m_pCamera.transform;
    }

    /// 立即设置新的摄像机控制模式。
    public Jump(eMode: CTRL_MODE, pParam: any): void {
        this.m_eCtrlMode = eMode;

        if (CTRL_MODE.REMOTE === eMode) {
            this.m_nLng = pParam.m_nLng;
            this.m_nLat = pParam.m_nLat;
            this.m_nDistance = pParam.m_nHeight;
            this.m_nPitch = 90.0;
            this.m_nYaw = 0.0;
            this.m_mTarget = { x: 0.0, y: 0.0, z: 0.0 };
        }
        else if (CTRL_MODE.EAGLE === eMode) {
            this.m_nLng = pParam.m_nLng;
            this.m_nLat = pParam.m_nLat;
            this.m_nDistance = pParam.m_nDistance;
            this.m_nPitch = pParam.m_nPitch;
            this.m_nYaw = pParam.m_nYaw;
            this.m_mTarget = { x: 0.0, y: 0.0, z: 0.0 };
        }
        else if (CTRL_MODE.PANORAMA === eMode) {
            this.m_nLng = pParam.m_nLng;
            this.m_nLat = pParam.m_nLat;
            this.m_nDistance = pParam.m_nDistance;
            this.m_nPitch = pParam.m_nPitch;
            this.m_nYaw = pParam.m_nYaw;
            this.m_mTarget = { x: pParam.m_mTarget.x, y: pParam.m_mTarget.y, z: pParam.m_mTarget.z };
        }
        else if (CTRL_MODE.WANDER === eMode) {
            this.m_nLng = pParam.m_nLng;
            this.m_nLat = pParam.m_nLat;
            this.m_nDistance = 0.0;
            this.m_nPitch = pParam.m_nPitch;
            this.m_nYaw = pParam.m_nYaw;
            this.m_mTarget = { x: pParam.m_mPosition.x, y: pParam.m_mPosition.y, z: pParam.m_mPosition.z };
        }
    }

    /// 飞行切换到指定状态。
    public Fly(eMode: CTRL_MODE, pParam: any, nSpeed_: any): void {
        let pThis = this;

        pThis.m_pFlyTask = {
            m_eMode: eMode,
            m_pParam: pParam,
            Update: function () {
                let bComplete = true;
                let bSpeed = nSpeed_ ? nSpeed_ : 0.1;

                if (undefined !== this.m_pParam.m_nLng) {
                    let nBias = this.m_pParam.m_nLng - pThis.m_nLng;
                    if (-0.1 > nBias || 0.1 < nBias) {
                        pThis.m_nLng += nBias * bSpeed;
                        bComplete = false;
                    }
                    else {
                        pThis.m_nLng = this.m_pParam.m_nLng;
                    }
                }

                if (undefined !== this.m_pParam.m_nLat) {
                    let nBias = this.m_pParam.m_nLat - pThis.m_nLat;
                    if (-0.1 > nBias || 0.1 < nBias) {
                        pThis.m_nLat += nBias * bSpeed;
                        bComplete = false;
                    }
                    else {
                        pThis.m_nLat = this.m_pParam.m_nLat;
                    }
                }

                let nDistance = undefined != this.m_pParam.m_nHeight ? this.m_pParam.m_nHeight : this.m_pParam.m_nDistance;
                if (undefined !== nDistance) {
                    let nBias = nDistance - pThis.m_nDistance;
                    if (-1.0 > nBias || 1.0 < nBias) {
                        pThis.m_nDistance += nBias * bSpeed;
                        bComplete = false;
                    }
                    else {
                        pThis.m_nDistance = nDistance;
                    }
                }

                if (undefined !== this.m_pParam.m_nPitch) {
                    let nBias = this.m_pParam.m_nPitch - pThis.m_nPitch;
                    if (-1 > nBias || 1 < nBias) {
                        pThis.m_nPitch += nBias * bSpeed;
                        bComplete = false;
                    }
                    else {
                        pThis.m_nPitch = this.m_pParam.m_nPitch;
                    }
                }

                if (undefined !== this.m_pParam.m_nYaw) {
                    let nBias = this.m_pParam.m_nYaw - pThis.m_nYaw;
                    if (-1 > nBias || 1 < nBias) {
                        pThis.m_nYaw += nBias * bSpeed;
                        bComplete = false;
                    }
                    else {
                        pThis.m_nYaw = this.m_pParam.m_nYaw;
                    }
                }

                let mTarget = undefined != this.m_pParam.m_mTarget ? this.m_pParam.m_mTarget : this.m_pParam.m_mPosition;
                if (undefined !== mTarget) {
                    let nBias = mTarget.x - pThis.m_mTarget.x;
                    if (-1 > nBias || 1 < nBias) {
                        pThis.m_mTarget.x += nBias * bSpeed;
                        bComplete = false;
                    }
                    else {
                        pThis.m_mTarget.x = mTarget.x;
                    }

                    nBias = mTarget.y - pThis.m_mTarget.y;
                    if (-1 > nBias || 1 < nBias) {
                        pThis.m_mTarget.y += nBias * bSpeed;
                        bComplete = false;
                    }
                    else {
                        pThis.m_mTarget.y = mTarget.y;
                    }

                    nBias = mTarget.z - pThis.m_mTarget.z;
                    if (-1 > nBias || 1 < nBias) {
                        pThis.m_mTarget.z += nBias * bSpeed;
                        bComplete = false;
                    }
                    else {
                        pThis.m_mTarget.z = mTarget.z;
                    }
                }

                if (bComplete) {
                    pThis.m_eCtrlMode = this.m_eMode;
                }
                else {
                    pThis.m_pTransform.position = { x: 0, y: 0, z: 0 };
                    pThis.m_pTransform.euler = { x: 0, y: 0, z: 0 };
                    pThis.m_pTransform.Rotate2({ x: 1, y: 0, z: 0 }, pThis.pitch, 1);
                    pThis.m_pTransform.Rotate2({ x: 0, y: 1, z: 0 }, pThis.yaw, 0);
                    pThis.m_pTransform.position = pThis.target;
                    pThis.m_pTransform.Translate(MiaokitJS.Vector3.Scale(-pThis.distance, { x: 0, y: 0, z: 1 }), 1);
                }

                return bComplete;
            }
        };
    }

    /// 移动摄像机。
    public Move(nOffsetX, nOffsetY, nWidth, nHeight): void {
        if (CTRL_MODE.REMOTE === this.ctrlMode || CTRL_MODE.EAGLE === this.ctrlMode) {
            // 60度视角下，距地面距离为地球半径时视线刚好能切过地球
            let nDistance = this.distance;
            let nLng = this.lng;
            let nLat = this.lat;

            if (nDistance > 6378137.0) {
                nDistance = 6378137.0;
            }

            if (nDistance < 0.0) {
                nDistance = 0.0;
            }

            // 可见弧度角性变化
            let nAngle = nDistance / 6378137.0 * 120.0;
            let offsetLng = nOffsetX / nWidth * nAngle;
            let offsetLat = nOffsetY / nHeight * nAngle;

            let rYaw = (this.yaw / 180.0) * Math.PI;
            nLng += offsetLng * Math.cos(rYaw);
            nLat -= offsetLng * Math.sin(rYaw);
            nLat += offsetLat * Math.cos(rYaw);
            nLng += offsetLat * Math.sin(rYaw);

            this.lng = nLng;
            this.lat = nLat;
        }
        else if (CTRL_MODE.PANORAMA === this.ctrlMode) {
            let nViewHeight = 1.0 * this.distance;
            let nFactor = nViewHeight / nHeight;

            nOffsetX *= nFactor;
            nOffsetY *= nFactor;

            let mTarget = this.target;
            if (2 === this.m_nViewMode) {
                mTarget.x += nOffsetX;
                mTarget.z += nOffsetY;
            }
            else {
                let rYaw = (this.yaw / 180.0) * Math.PI;
                mTarget.x += nOffsetX * Math.cos(rYaw);
                mTarget.z -= nOffsetX * Math.sin(rYaw);
                mTarget.z += nOffsetY * Math.cos(rYaw);
                mTarget.x += nOffsetY * Math.sin(rYaw);
            }            

            this.target = mTarget;
        }
    }

    /// 旋转视野。
    public Rotate(nOffsetX, nOffsetY, nWidth, nHeight): void {
        if (CTRL_MODE.REMOTE !== this.ctrlMode) {
            let nPitch = this.pitch;
            let nYaw = this.yaw;

            nYaw += nOffsetX / nWidth * 180;
            nPitch += nOffsetY / nHeight * 90.0;

            if (5.0 > nPitch) {
                nPitch = 5.0;
            }

            if (90.0 < nPitch) {
                nPitch = 90.0;
            }

            this.pitch = nPitch;
            this.yaw = nYaw;
        }
    }

    /// 缩放视野。
    public Scale(nDelta, nWidth, nHeight): void {
        let nDistance = this.distance;
        nDistance += nDelta * nDistance * 0.05;

        this.distance = nDistance;
    }

    /// 应用最新设置的参数，更新摄像机状态
    public Update(): void {
        if (!this.m_nEnabled) {
            return;
        }

        if (this.m_pFlyTask) {
            if (this.m_pFlyTask.Update()) {
                this.m_pFlyTask = null;
            }

            return;
        }

        /// 非漫游模式：控制类似
        if (CTRL_MODE.WANDER !== this.m_eCtrlMode) {
            // 遥感模式：俯角强制调整为90度，偏航角强制调整为0度
            if (CTRL_MODE.REMOTE === this.m_eCtrlMode) {
                if (20000.0 > this.height) {
                    this.m_eCtrlMode = CTRL_MODE.EAGLE;
                    console.log("自动切换到鹰眼模式");
                }
                else {
                    let nBias = this.m_nPitch - 90.0;
                    if (-0.1 > nBias || 0.1 < nBias) {
                        this.m_nPitch -= nBias * 0.1;
                    }

                    nBias = this.m_nYaw - 0.0;
                    if (-0.1 > nBias || 0.1 < nBias) {
                        this.m_nYaw -= nBias * 0.1;
                    }
                }
            }
            else if (CTRL_MODE.EAGLE === this.m_eCtrlMode) {
                if (20000.0 < this.distance) {
                    this.m_eCtrlMode = CTRL_MODE.REMOTE;
                    console.log("自动切换到遥感模式");
                }
                else {
                    let nBias = this.m_nPitch - 85.0;
                    if (0.1 < nBias) {
                        this.m_nPitch -= nBias * 0.1;
                    }

                    nBias = 5.0 - this.m_nPitch;
                    if (0.1 < nBias) {
                        this.m_nPitch += nBias * 0.1;
                    }
                }
            }

            // 非全景模式：目标坐标强制调整为场景中心
            if (CTRL_MODE.PANORAMA !== this.m_eCtrlMode) {
                let mTarget = this.target;

                let nBias = mTarget.x - 0.0;
                if (-0.1 > nBias || 0.1 < nBias) {
                    mTarget.x += nBias * 0.1;
                }

                nBias = mTarget.y - 0.0;
                if (-0.1 > nBias || 0.1 < nBias) {
                    mTarget.y += nBias * 0.1;
                }

                nBias = mTarget.z - 0.0;
                if (-0.1 > nBias || 0.1 < nBias) {
                    mTarget.z += nBias * 0.1;
                }

                this.target = mTarget;
            }

            if (2 === this.m_nViewMode) {
                this.m_pTransform.position = { x: 0, y: 0, z: 0 };
                this.m_pTransform.euler = { x: 0, y: 0, z: 0 };
                this.m_pTransform.Rotate2({ x: 1, y: 0, z: 0 }, 90, 0);
                this.m_pTransform.position = this.target;
                this.m_pTransform.Translate(MiaokitJS.Vector3.Scale(-this.distance, { x: 0, y: 0, z: 1 }), 1);
            }
            else {
                this.m_pTransform.position = { x: 0, y: 0, z: 0 };
                this.m_pTransform.euler = { x: 0, y: 0, z: 0 };
                this.m_pTransform.Rotate2({ x: 1, y: 0, z: 0 }, this.pitch, 1);
                this.m_pTransform.Rotate2({ x: 0, y: 1, z: 0 }, this.yaw, 0);
                this.m_pTransform.position = this.target;
                this.m_pTransform.Translate(MiaokitJS.Vector3.Scale(-this.distance, { x: 0, y: 0, z: 1 }), 1);
            }            
        }
        /// 漫游模式
        else {
            console.log("未实现漫游模式");
        }
    }


    /// 设置摄像机控制器可控状态。
    public set enabled(enabled: boolean) {
        this.m_nEnabled = enabled;
    }

    /// 获取当前摄像机控制模式。
    public get ctrlMode(): CTRL_MODE {
        return this.m_eCtrlMode;
    }

    /// 视图模式。
    public get viewMode(): number {
        return this.m_nViewMode;
    }
    public set viewMode(mode: number) {
        if (this.m_nViewMode !== mode) {
            this.m_nViewMode = mode;
            MiaokitJS.Miaokit.cameraMode = mode;
        }
    }

    /// 获取当前摄像机状态。
    public get curView(): any {
        return {
            m_eCtrlMode: this.m_eCtrlMode,
            m_nLng: this.m_nLng,
            m_nLat: this.m_nLat,
            m_mTarget: this.m_mTarget,
            m_nDistance: this.m_nDistance,
            m_nPitch: this.m_nPitch,
            m_nYaw: this.m_nYaw
        }
    }

    /// 获取当前经度参数。
    public get lng(): number {
        return this.m_nLng;
    }
    /// 设置当前经度参数。仅REMOTE/EAGLE模式下设置生效。
    public set lng(value) {
        if (CTRL_MODE.REMOTE === this.m_eCtrlMode || CTRL_MODE.EAGLE === this.m_eCtrlMode) {
            this.m_nLng = value;
        }
    }

    /// 获取当前经度参数。
    public get lat(): number {
        return this.m_nLat;
    }
    /// 设置当前经度参数。仅REMOTE/EAGLE模式下设置生效。
    public set lat(value) {
        if (CTRL_MODE.REMOTE === this.m_eCtrlMode || CTRL_MODE.EAGLE === this.m_eCtrlMode) {
            this.m_nLat = value;
        }
    }

    /// 获取当前高度参数。
    public get height(): number {
        return this.m_nDistance;
    }
    /// 设置当前高度参数。仅REMOTE模式下设置生效。
    public set height(value) {
        if (CTRL_MODE.REMOTE === this.m_eCtrlMode) {
            this.m_nDistance = value;
        }
    }

    /// 获取当前距离参数。
    public get distance(): number {
        return this.m_nDistance;
    }
    /// 设置当前距离参数。仅REMOTE/EAGLE/PANORAMA模式下设置生效。
    public set distance(value) {
        if (CTRL_MODE.REMOTE === this.m_eCtrlMode || CTRL_MODE.EAGLE === this.m_eCtrlMode || CTRL_MODE.PANORAMA === this.m_eCtrlMode) {
            this.m_nDistance = value;
        }
    }

    /// 获取当前俯角参数。
    public get pitch(): number {
        return this.m_nPitch;
    }
    /// 设置当前俯角参数。仅EAGLE/PANORAMA/WANDER模式下设置生效。
    public set pitch(value) {
        if (CTRL_MODE.EAGLE === this.m_eCtrlMode || CTRL_MODE.PANORAMA === this.m_eCtrlMode || CTRL_MODE.WANDER === this.m_eCtrlMode) {
            this.m_nPitch = value;
        }
    }

    /// 获取当前偏航角参数。
    public get yaw(): number {
        return this.m_nYaw;
    }
    /// 设置当前偏航角参数。仅EAGLE/PANORAMA/WANDER模式下设置生效。
    public set yaw(value) {
        if (CTRL_MODE.EAGLE === this.m_eCtrlMode || CTRL_MODE.PANORAMA === this.m_eCtrlMode || CTRL_MODE.WANDER === this.m_eCtrlMode) {
            this.m_nYaw = value;
        }
    }

    /// 获取当前目标坐标参数。
    public get target(): any {
        return { x: this.m_mTarget.x, y: this.m_mTarget.y, z: this.m_mTarget.z };
    }
    /// 设置当前目标坐标参数。仅PANORAMA模式下设置生效。
    public set target(value) {
        if (CTRL_MODE.PANORAMA === this.m_eCtrlMode) {
            this.m_mTarget.x = value.x;
            this.m_mTarget.y = value.y;
            this.m_mTarget.z = value.z;
        }
    }

    /// 获取当前角色坐标参数。
    public get position(): any {
        return { x: this.m_mTarget.x, y: this.m_mTarget.y, z: this.m_mTarget.z };
    }
    /// 设置当前角色坐标参数。仅WANDER模式下设置生效。
    public set position(value) {
        if (CTRL_MODE.WANDER === this.m_eCtrlMode) {
            this.m_mTarget.x = value.x;
            this.m_mTarget.y = value.y;
            this.m_mTarget.z = value.z;
        }
    }


    /// 摄像机对象。
    private m_pCamera: any = null;
    /// 摄像机变换组件。
    private m_pTransform: any = null;
    /// 摄像机控制启用状态。
    private m_nEnabled: boolean = true;

    /// 当前控制模式。
    private m_eCtrlMode: CTRL_MODE = CTRL_MODE.REMOTE;
    /// 当前视图模式。
    private m_nViewMode: number = 3;
    /// 当前经度参数。
    private m_nLng: number = 0.0;
    /// 当前经度参数。
    private m_nLat: number = 0.0;
    /// 当前距离参数。
    private m_nDistance: number = 0.0;
    /// 当前俯角参数。
    private m_nPitch: number = 0.0;
    /// 当前偏航角参数。
    private m_nYaw: number = 0.0;
    /// 当前目标坐标参数。
    private m_mTarget: any = { x: 0.0, y: 0.0, z: 0.0 };
    /// 当前飞行任务。
    private m_pFlyTask: any = null;
}


MiaokitJS.UTIL = MiaokitJS.UTIL || {};
MiaokitJS.UTIL.CTRL_MODE = CTRL_MODE;
MiaokitJS.UTIL.VIEW_MODE = VIEW_MODE;
MiaokitJS.UTIL.RemoteParam = RemoteParam;
MiaokitJS.UTIL.EagleParam = EagleParam;
MiaokitJS.UTIL.PanoramaParam = PanoramaParam;
MiaokitJS.UTIL.WanderParam = WanderParam;
MiaokitJS.UTIL.CameraCtrl = CameraCtrl;

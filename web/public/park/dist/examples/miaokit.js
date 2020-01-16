var CTRL_MODE;
(function (CTRL_MODE) {
    CTRL_MODE[CTRL_MODE["INVALID"] = 0] = "INVALID";
    CTRL_MODE[CTRL_MODE["REMOTE"] = 1] = "REMOTE";
    CTRL_MODE[CTRL_MODE["EAGLE"] = 2] = "EAGLE";
    CTRL_MODE[CTRL_MODE["PANORAMA"] = 3] = "PANORAMA";
    CTRL_MODE[CTRL_MODE["WANDER"] = 4] = "WANDER";
})(CTRL_MODE || (CTRL_MODE = {}));
var VIEW_MODE;
(function (VIEW_MODE) {
    VIEW_MODE[VIEW_MODE["INVALID"] = 1] = "INVALID";
    VIEW_MODE[VIEW_MODE["_2D"] = 2] = "_2D";
    VIEW_MODE[VIEW_MODE["_3D"] = 3] = "_3D";
})(VIEW_MODE || (VIEW_MODE = {}));
class RemoteParam {
    constructor() {
        this.m_nLng = 0.0;
        this.m_nLat = 0.0;
        this.m_nHeight = 0.0;
    }
}
class EagleParam {
    constructor() {
        this.m_nLng = 0.0;
        this.m_nLat = 0.0;
        this.m_nDistance = 0.0;
        this.m_nPitch = 0.0;
        this.m_nYaw = 0.0;
    }
}
class PanoramaParam {
    constructor() {
        this.m_nLng = 0.0;
        this.m_nLat = 0.0;
        this.m_mTarget = { x: 0.0, y: 0.0, z: 0.0 };
        this.m_nDistance = 0.0;
        this.m_nPitch = 0.0;
        this.m_nYaw = 0.0;
    }
}
class WanderParam {
    constructor() {
        this.m_nLng = 0.0;
        this.m_nLat = 0.0;
        this.m_mPosition = { x: 0.0, y: 0.0, z: 0.0 };
        this.m_nPitch = 0.0;
        this.m_nYaw = 0.0;
    }
}
class CameraCtrl {
    constructor(pCamera) {
        this.m_pCamera = null;
        this.m_pTransform = null;
        this.m_eCtrlMode = CTRL_MODE.REMOTE;
        this.m_nLng = 0.0;
        this.m_nLat = 0.0;
        this.m_nDistance = 0.0;
        this.m_nPitch = 0.0;
        this.m_nYaw = 0.0;
        this.m_mTarget = { x: 0.0, y: 0.0, z: 0.0 };
        this.m_pFlyTask = null;
        this.m_pCamera = pCamera;
        this.m_pTransform = this.m_pCamera.transform;
    }
    Jump(eMode, pParam) {
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
    Fly(eMode, pParam) {
        let pThis = this;
        pThis.m_pFlyTask = {
            m_eMode: eMode,
            m_pParam: pParam,
            Update: function () {
                let bComplete = true;
                let bSpeed = 0.5;
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
                    if (-1 > nBias || 1 < nBias) {
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
    Move(nOffsetX, nOffsetY, nWidth, nHeight) {
        if (CTRL_MODE.REMOTE === this.ctrlMode || CTRL_MODE.EAGLE === this.ctrlMode) {
            let nDistance = this.distance;
            let nLng = this.lng;
            let nLat = this.lat;
            if (nDistance > 6378137.0) {
                nDistance = 6378137.0;
            }
            if (nDistance < 0.0) {
                nDistance = 0.0;
            }
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
            let rYaw = (this.yaw / 180.0) * Math.PI;
            mTarget.x += nOffsetX * Math.cos(rYaw);
            mTarget.z -= nOffsetX * Math.sin(rYaw);
            mTarget.z += nOffsetY * Math.cos(rYaw);
            mTarget.x += nOffsetY * Math.sin(rYaw);
            this.target = mTarget;
        }
    }
    Rotate(nOffsetX, nOffsetY, nWidth, nHeight) {
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
    Scale(nDelta, nWidth, nHeight) {
        let nDistance = this.distance;
        nDistance += nDelta * nDistance * 0.05;
        this.distance = nDistance;
    }
    Update() {
        if (this.m_pFlyTask) {
            if (this.m_pFlyTask.Update()) {
                this.m_pFlyTask = null;
            }
            return;
        }
        if (CTRL_MODE.WANDER !== this.m_eCtrlMode) {
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
            this.m_pTransform.position = { x: 0, y: 0, z: 0 };
            this.m_pTransform.euler = { x: 0, y: 0, z: 0 };
            this.m_pTransform.Rotate2({ x: 1, y: 0, z: 0 }, this.pitch, 1);
            this.m_pTransform.Rotate2({ x: 0, y: 1, z: 0 }, this.yaw, 0);
            this.m_pTransform.position = this.target;
            this.m_pTransform.Translate(MiaokitJS.Vector3.Scale(-this.distance, { x: 0, y: 0, z: 1 }), 1);
        }
        else {
            console.log("未实现漫游模式");
        }
    }
    get ctrlMode() {
        return this.m_eCtrlMode;
    }
    get curView() {
        return {
            m_eCtrlMode: this.m_eCtrlMode,
            m_nLng: this.m_nLng,
            m_nLat: this.m_nLat,
            m_mTarget: this.m_mTarget,
            m_nDistance: this.m_nDistance,
            m_nPitch: this.m_nPitch,
            m_nYaw: this.m_nYaw
        };
    }
    get lng() {
        return this.m_nLng;
    }
    set lng(value) {
        if (CTRL_MODE.REMOTE === this.m_eCtrlMode || CTRL_MODE.EAGLE === this.m_eCtrlMode) {
            this.m_nLng = value;
        }
    }
    get lat() {
        return this.m_nLat;
    }
    set lat(value) {
        if (CTRL_MODE.REMOTE === this.m_eCtrlMode || CTRL_MODE.EAGLE === this.m_eCtrlMode) {
            this.m_nLat = value;
        }
    }
    get height() {
        return this.m_nDistance;
    }
    set height(value) {
        if (CTRL_MODE.REMOTE === this.m_eCtrlMode) {
            this.m_nDistance = value;
        }
    }
    get distance() {
        return this.m_nDistance;
    }
    set distance(value) {
        if (CTRL_MODE.REMOTE === this.m_eCtrlMode || CTRL_MODE.EAGLE === this.m_eCtrlMode || CTRL_MODE.PANORAMA === this.m_eCtrlMode) {
            this.m_nDistance = value;
        }
    }
    get pitch() {
        return this.m_nPitch;
    }
    set pitch(value) {
        if (CTRL_MODE.EAGLE === this.m_eCtrlMode || CTRL_MODE.PANORAMA === this.m_eCtrlMode || CTRL_MODE.WANDER === this.m_eCtrlMode) {
            this.m_nPitch = value;
        }
    }
    get yaw() {
        return this.m_nYaw;
    }
    set yaw(value) {
        if (CTRL_MODE.EAGLE === this.m_eCtrlMode || CTRL_MODE.PANORAMA === this.m_eCtrlMode || CTRL_MODE.WANDER === this.m_eCtrlMode) {
            this.m_nYaw = value;
        }
    }
    get target() {
        return { x: this.m_mTarget.x, y: this.m_mTarget.y, z: this.m_mTarget.z };
    }
    set target(value) {
        if (CTRL_MODE.PANORAMA === this.m_eCtrlMode) {
            this.m_mTarget.x = value.x;
            this.m_mTarget.y = value.y;
            this.m_mTarget.z = value.z;
        }
    }
    get position() {
        return { x: this.m_mTarget.x, y: this.m_mTarget.y, z: this.m_mTarget.z };
    }
    set position(value) {
        if (CTRL_MODE.WANDER === this.m_eCtrlMode) {
            this.m_mTarget.x = value.x;
            this.m_mTarget.y = value.y;
            this.m_mTarget.z = value.z;
        }
    }
}
MiaokitJS.SVECLASS = MiaokitJS.SVECLASS || {};
MiaokitJS.SVECLASS.CTRL_MODE = CTRL_MODE;
MiaokitJS.SVECLASS.VIEW_MODE = VIEW_MODE;
MiaokitJS.SVECLASS.RemoteParam = RemoteParam;
MiaokitJS.SVECLASS.EagleParam = EagleParam;
MiaokitJS.SVECLASS.PanoramaParam = PanoramaParam;
MiaokitJS.SVECLASS.WanderParam = WanderParam;
MiaokitJS.SVECLASS.CameraCtrl = CameraCtrl;
class EntityPicker {
    constructor(pCameraCtrl) {
        this.m_pFirstView = [];
        this.m_pCameraCtrl = null;
        this.m_pCameraCtrl = pCameraCtrl;
        this.m_SelectStruct = new SelectStruct();
    }
    Select() {
        let pObject = MiaokitJS.Miaokit.PickEntity(0xFFFFFFF);
        if (pObject) {
            let nEntity = this.Stack(pObject);
            if (nEntity) {
                if (nEntity !== this.m_SelectStruct.Entity) {
                    nEntity.m_pViewState = nEntity.m_pUserData.viewState;
                    if (this.m_SelectStruct.Entity) {
                        this.m_SelectStruct.Entity.m_pObject3D.highlight = false;
                    }
                    this.m_SelectStruct.PushEntity(nEntity);
                    this.m_SelectStruct.Entity.m_pObject3D.highlight = true;
                    if ("Layer" === nEntity.m_pUserData._type_name) {
                        console.log("点击了楼层---");
                        if (nEntity.m_pUserData.OnSelect) {
                            nEntity.m_pUserData.OnSelect();
                        }
                    }
                }
                else {
                    if ("Attachment" === nEntity.m_pUserData._type_name) {
                        if (this.m_SelectStruct.Entity) {
                            this.m_SelectStruct.Entity.m_pObject3D.highlight = false;
                        }
                        if (2 === nEntity.m_pUserData.entityType && 202 === nEntity.m_pUserData.secondType) {
                            this.EnterScene(nEntity.m_pUserData.flag);
                            return this.m_SelectStruct.Entity;
                        }
                    }
                }
            }
            if (1 === this.m_SelectStruct.Length && 1 === this.m_SelectStruct.m_SelectList[0].Length) {
                this.m_pFirstView = this.m_pCameraCtrl.curView;
            }
            return nEntity;
        }
        return null;
    }
    UnSelect() {
        if (this.m_SelectStruct.Length > 0) {
            let pLast = this.m_SelectStruct.PopEntity();
            if (pLast) {
                pLast.m_pObject3D.highlight = false;
                if ("Layer" === pLast.m_pUserData._type_name) {
                    if (pLast.m_pUserData.UnSelect) {
                        pLast.m_pUserData.UnSelect();
                    }
                }
                if (!this.m_SelectStruct.Entity) {
                    this.PopScene();
                }
            }
            else {
                this.PopScene();
            }
        }
        if (this.m_SelectStruct.Entity) {
            this.m_SelectStruct.Entity.m_pObject3D.highlight = true;
        }
        else {
            if (this.m_pFirstView) {
                this.m_pCameraCtrl.Fly(this.m_pFirstView.m_eCtrlMode, this.m_pFirstView);
                this.m_pFirstView = null;
            }
        }
        return this.m_SelectStruct.Entity;
    }
    Stack(pObject) {
        if (null === this.m_SelectStruct.Scene) {
            this.FindScene(pObject);
            if (null === this.m_SelectStruct.Scene) {
                return null;
            }
        }
        let pTop = this.m_SelectStruct.Entity;
        let pLast = null;
        let pPush = null;
        while (pObject) {
            let pItem = this.CheckStackable(pObject);
            if (pItem) {
                if (pTop && pTop.m_pObject3D === pItem.m_pObject3D) {
                    pPush = pLast || pTop;
                    break;
                }
                else {
                    pLast = pItem;
                }
            }
            pObject = pObject.parent;
        }
        if (!pTop) {
            pPush = pLast;
        }
        return pPush;
    }
    FindScene(pObject) {
        while (pObject) {
            let pItem = this.CheckStackable(pObject);
            if (pItem && "Scene" === pItem.m_pUserData._type_name) {
                this.PushScene(pItem.m_pUserData);
                return;
            }
            pObject = pObject.parent;
        }
    }
    CheckStackable(pObject) {
        let pData = pObject.data;
        if (pData) {
            let bStackable = false;
            if (null == this.m_SelectStruct.Scene && null == this.m_SelectStruct.Entity) {
                if ("Scene" === pData._type_name) {
                    bStackable = true;
                }
            }
            else {
                if (1 < this.m_SelectStruct.Scene.layers.length && ("Layer" === pData._type_name || "Scene" === pData._type_name)) {
                    bStackable = true;
                }
                else if ("Layer" === pData._type_name) {
                    bStackable = true;
                }
                else if ("Attachment" === pData._type_name) {
                    if (0 < pData.entityType && 1 < pData.secondType) {
                        bStackable = true;
                    }
                }
                else if (pData.stackable) {
                    bStackable = true;
                }
            }
            if (bStackable) {
                return {
                    m_pObject3D: pObject,
                    m_pUserData: pData,
                    m_pViewState: null
                };
            }
        }
        return null;
    }
    EnterScene(nIndex) {
        let pScene = MiaokitJS.Miaokit.GetScene(nIndex);
        if (pScene) {
            this.PushScene(pScene);
            let pEntity = {
                m_pObject3D: pScene.object3D,
                m_pUserData: pScene,
                m_pViewState: pScene.viewState
            };
            this.m_SelectStruct.PushEntity(pEntity);
            this.m_SelectStruct.Entity.m_pObject3D.highlight = true;
            console.log("进入场景:", pScene);
        }
    }
    PushScene(pScene) {
        if (this.m_SelectStruct.Length > 1) {
            this.m_SelectStruct.Scene.object3D.active = false;
        }
        console.log("场景入栈：", pScene.id);
        this.m_SelectStruct.PushScene(pScene);
        this.ActiveScene(pScene);
        let pBinding = pScene.binding;
        if (pBinding) {
            let pBindingObj = pBinding.object3D;
            if (pBindingObj) {
                pBindingObj.active = false;
            }
        }
    }
    PopScene() {
        if (this.m_SelectStruct.Length > 0) {
            if (this.m_SelectStruct.Length > 1) {
                this.m_SelectStruct.Scene.object3D.active = false;
            }
            console.log("场景出栈：", this.m_SelectStruct.Scene.id);
            let pScene = this.m_SelectStruct.PopScene();
            if (pScene) {
                let pBinding = pScene.binding;
                if (pBinding) {
                    let pBindingObj = pBinding.object3D;
                    if (pBindingObj) {
                        pBindingObj.active = true;
                    }
                }
            }
        }
    }
    ActiveScene(pScene) {
        if (pScene.OnSelect) {
            pScene.OnSelect();
        }
        pScene.object3D.active = true;
    }
}
class SelectStruct {
    constructor() {
        this.m_SelectList = [];
    }
    PushEntity(entity) {
        this.m_SelectList[this.m_SelectList.length - 1].m_SceneSelectStack.push(entity);
    }
    PopEntity() {
        if (this.m_SelectList[this.m_SelectList.length - 1].m_SceneSelectStack.length > 0) {
            return this.m_SelectList[this.m_SelectList.length - 1].m_SceneSelectStack.pop();
        }
        else {
            return null;
        }
    }
    PushScene(scene) {
        let SSN = new SceneSelectNode();
        SSN.m_Scene = scene;
        this.m_SelectList.push(SSN);
    }
    PopScene() {
        if (this.Length > 0) {
            let SSN = this.m_SelectList.pop();
            return SSN.m_Scene;
        }
        else {
            return null;
        }
    }
    get Scene() {
        if (this.Length > 0) {
            return this.m_SelectList[this.m_SelectList.length - 1].m_Scene;
        }
        else {
            return null;
        }
    }
    get Entity() {
        if (this.Length > 0) {
            return this.m_SelectList[this.m_SelectList.length - 1].m_SceneSelectStack[this.m_SelectList[this.m_SelectList.length - 1].Length - 1];
        }
        else {
            return null;
        }
    }
    get Length() {
        return this.m_SelectList.length;
    }
}
class SceneSelectNode {
    constructor() {
        this.m_Scene = null;
        this.m_SceneSelectStack = [];
    }
    get Length() {
        return this.m_SceneSelectStack.length;
    }
}
MiaokitJS.SVECLASS = MiaokitJS.SVECLASS || {};
MiaokitJS.SVECLASS.EntityPicker = EntityPicker;
class SVE {
    constructor() {
        this.m_pContainer = null;
        this.m_pCanvas2D = null;
        this.m_pCanvasCtx2D = null;
        this.OnGUI = null;
        this.InitGUI = null;
        this.m_nTick = null;
        this.m_nTime = 0;
        this.m_aAnalyze = null;
        this.m_pGis = null;
        this.m_pCamera = null;
        this.m_pCameraCtrl = null;
        this.m_pPicker = null;
    }
    Start() {
        let pContainer = document.getElementById("unityContainer");
        let pCanvas2D = document.createElement("canvas");
        pCanvas2D.id = "2d";
        pCanvas2D.width = pContainer.offsetWidth;
        pCanvas2D.height = pContainer.offsetHeight;
        pCanvas2D.style.width = "100%";
        pCanvas2D.style.height = "100%";
        pCanvas2D.style.top = "0rem";
        pCanvas2D.style.bottom = "0rem";
        pCanvas2D.style.left = "0rem";
        pCanvas2D.style.right = "0rem";
        pCanvas2D.style.position = "absolute";
        pCanvas2D.style.zIndex = "1";
        pContainer.appendChild(pCanvas2D);
        this.m_pContainer = pContainer;
        this.m_pCanvas2D = pCanvas2D;
        this.m_pCanvasCtx2D = pCanvas2D.getContext('2d');
        this.m_pCamera = MiaokitJS.Miaokit.camera;
        this.m_pCameraCtrl = new MiaokitJS.SVECLASS.CameraCtrl(this.m_pCamera);
        this.m_pPicker = new MiaokitJS.SVECLASS.EntityPicker(this.m_pCameraCtrl);
        this.RegisterEvent(this.m_pCanvas2D, MiaokitJS.Miaokit.cameraCtrl);
        this.InitProject();
    }
    Update() {
        this.m_nTick++;
        this.Draw2D();
        this.m_pCameraCtrl.Update();
        if (this["m_pDioramas"]) {
            this["m_pDioramas"].Update();
        }
        if (this.m_pGis) {
            this.m_pGis.Update(this.m_pCameraCtrl.lng * (Math.PI / 180), this.m_pCameraCtrl.lat * (Math.PI / 180), this.m_pCameraCtrl.height);
        }
    }
    Draw2D() {
        this.m_pCanvasCtx2D.clearRect(0, 0, this.m_pCanvas2D.clientWidth, this.m_pCanvas2D.clientHeight);
        this.Analyze();
        if (0 < MiaokitJS.Miaokit.progress) {
            let pMsg = "正在执行任务: " + MiaokitJS.Miaokit.progress;
            this.m_pCanvasCtx2D.font = "20px Microsoft YaHei";
            this.m_pCanvasCtx2D.strokeStyle = "black";
            this.m_pCanvasCtx2D.lineWidth = 2;
            this.m_pCanvasCtx2D.fillStyle = "#FFFFFF";
            this.m_pCanvasCtx2D.strokeText(pMsg, this.m_pCanvas2D.clientWidth / 2 - 20.0, this.m_pCanvas2D.clientHeight / 2);
            this.m_pCanvasCtx2D.fillText(pMsg, this.m_pCanvas2D.clientWidth / 2 - 20.0, this.m_pCanvas2D.clientHeight / 2);
        }
        if (this.OnGUI) {
            this.OnGUI(this.m_pCanvas2D, this.m_pCanvasCtx2D);
        }
    }
    Analyze() {
        if (1 === this.m_nTick % 60) {
            let nTime = MiaokitJS.Time();
            if (this.m_nTime) {
                this.m_aAnalyze = MiaokitJS.Miaokit.Analyze((60 / ((nTime - this.m_nTime) / 1000)).toFixed(0));
                this.m_nTime = nTime;
            }
            else {
                this.m_aAnalyze = MiaokitJS.Miaokit.Analyze(1);
                this.m_nTime = nTime;
            }
        }
        let pCanvas = this.m_pCanvasCtx2D;
        let aInfo = this.m_aAnalyze;
        let nOffset = 18;
        if (aInfo) {
            pCanvas.font = "14px Microsoft YaHei";
            pCanvas.strokeStyle = "black";
            pCanvas.lineWidth = 2;
            pCanvas.fillStyle = "#FFFFFF";
            for (let pInfo of aInfo) {
                pCanvas.strokeText(pInfo, 10, nOffset);
                pCanvas.fillText(pInfo, 10, nOffset);
                nOffset += 18;
            }
            pCanvas.strokeText("CameraTargetPos:(" + this.m_pCameraCtrl.m_mTarget.x + "," + this.m_pCameraCtrl.m_mTarget.y + "," + this.m_pCameraCtrl.m_mTarget.z + ")", 10, nOffset);
            pCanvas.fillText("CameraTargetPos:(" + this.m_pCameraCtrl.m_mTarget.x + "," + this.m_pCameraCtrl.m_mTarget.y + "," + this.m_pCameraCtrl.m_mTarget.z + ")", 10, nOffset);
            nOffset += 18;
            pCanvas.strokeText("Cameram_nYaw:(" + this.m_pCameraCtrl.m_nYaw + ")", 10, nOffset);
            pCanvas.fillText("Cameram_nYaw:(" + this.m_pCameraCtrl.m_nYaw + ")", 10, nOffset);
            nOffset += 18;
            pCanvas.strokeText("Cameram_nPitch:(" + this.m_pCameraCtrl.m_nPitch + ")", 10, nOffset);
            pCanvas.fillText("Cameram_nPitch:(" + this.m_pCameraCtrl.m_nPitch + ")", 10, nOffset);
            nOffset += 18;
            pCanvas.strokeText("Cameram_nDistance:(" + this.m_pCameraCtrl.m_nDistance + ")", 10, nOffset);
            pCanvas.fillText("Cameram_nDistance:(" + this.m_pCameraCtrl.m_nDistance + ")", 10, nOffset);
            nOffset += 18;
            pCanvas.strokeText("CameraLngLat:(" + this.m_pCameraCtrl.m_nLng + "," + this.m_pCameraCtrl.m_nLat + ")", 10, nOffset);
            pCanvas.fillText("CameraLngLat:(" + this.m_pCameraCtrl.m_nLng + "," + this.m_pCameraCtrl.m_nLat + ")", 10, nOffset);
        }
    }
    RegisterEvent(pCavans, pCamera) {
        let nDrag = -1;
        let nPressTime = MiaokitJS.Time();
        let nClickTime = 0;
        let pThis = this;
        pCavans.addEventListener("mousewheel", function (e) {
            pThis.m_pCameraCtrl.Scale(e.deltaY / Math.abs(e.deltaY), pThis.m_pCanvas2D.clientWidth, pThis.m_pCanvas2D.clientHeight);
        }, true);
        pCavans.addEventListener("DOMMouseScroll", function (e) {
            pThis.m_pCameraCtrl.Scale(e.detail / Math.abs(e.detail), pThis.m_pCanvas2D.clientWidth, pThis.m_pCanvas2D.clientHeight);
        }, true);
        pCavans.addEventListener("mousedown", function (e) {
            nDrag = e.button;
            if (2 === nDrag) {
                nDrag = 1;
            }
            nPressTime = MiaokitJS.Time();
        }, false);
        pCavans.addEventListener("mouseup", function (e) {
            nDrag = -1;
            if (250 > MiaokitJS.Time() - nPressTime) {
                if (500 > MiaokitJS.Time() - nClickTime) {
                    let pSelect = null;
                    if (0 == e.button) {
                        pSelect = pThis.m_pPicker.Select();
                    }
                    else if (2 == e.button) {
                        pSelect = pThis.m_pPicker.UnSelect();
                    }
                    if (pSelect) {
                        if (pThis.InitGUI)
                            pThis.InitGUI(pSelect, pSelect.m_pUserData._type_name);
                        console.log("当前选中：", pSelect.m_pUserData._type_name, pSelect.m_pUserData.entityType, pSelect.m_pUserData.secondType, pSelect);
                        if (pSelect && pSelect.m_pViewState) {
                            pSelect.m_pViewState.m_mTarget = pSelect.m_pObject3D.transform.position;
                            pThis.m_pCameraCtrl.Fly(MiaokitJS.SVECLASS.CTRL_MODE.PANORAMA, pSelect.m_pViewState);
                        }
                    }
                    if (pThis["pObject2"]) {
                        pThis["pObject2"].Destory();
                        pThis["pObject2"] = null;
                    }
                    else if (pThis["pObject"]) {
                        pThis["pObject"].Destory();
                        pThis["pObject"] = null;
                    }
                }
                else {
                }
                nClickTime = MiaokitJS.Time();
            }
        }, false);
        pCavans.addEventListener("mouseout", function (e) {
            nDrag = -1;
        }, false);
        pCavans.addEventListener("mousemove", function (e) {
            if (0 === nDrag) {
                pThis.m_pCameraCtrl.Move(-e.movementX, e.movementY, pThis.m_pCanvas2D.clientWidth, pThis.m_pCanvas2D.clientHeight);
            }
            else if (1 === nDrag) {
                pThis.m_pCameraCtrl.Rotate(e.movementX, e.movementY, pThis.m_pCanvas2D.clientWidth, pThis.m_pCanvas2D.clientHeight);
            }
        }, false);
    }
    GetTileInfo(pUser, pPassword, pTileName, pCallback) {
        let pServer = "http://sve.yongtoc.com:80/";
        let pForm = new FormData();
        pForm.append("mobile", pUser);
        pForm.append("password", pPassword);
        MiaokitJS["Request"]("POST", "json", pServer + "api/Data/sveDoLogin", pForm, null, function (pInfo) {
            if ("100" === pInfo.returnCode) {
                MiaokitJS["Request"]("GET", "json", pServer + "api/Data/projectList/userid/" + pInfo.user_id, null, null, function (pList) {
                    if ("100" === pList.returnCode) {
                        for (let pTile of pList.dataInfo) {
                            if (pTile.name === pTileName) {
                                pCallback({
                                    "m_pID": pTile.id + ":" + pTileName,
                                    "m_pPath": pServer + pTile.file_url,
                                    "m_pData": null,
                                    "m_pTile": null
                                });
                                return;
                            }
                        }
                        pCallback(null);
                    }
                    else {
                        pCallback(null);
                    }
                });
            }
            else {
                pCallback(null);
            }
        });
    }
    InitProject() {
        let pThis = this;
        pThis.m_pCameraCtrl.Jump(MiaokitJS.SVECLASS.CTRL_MODE.PANORAMA, {
            m_nLng: 108.36882987572415,
            m_nLat: 22.842736594752864,
            m_mTarget: { x: 0.0, y: 0.0, z: 0.0 },
            m_nDistance: 100.0,
            m_nPitch: 55.0,
            m_nYaw: -103.0
        });
        MiaokitJS["Request"]("GET", "arraybuffer", "./data/project.txt", null, function (nRate) {
            pThis.m_nTick = nRate;
        }, function (aData) {
            let pTileInfo = {
                m_pData: aData,
                m_pTile: MiaokitJS["Miaokit"]["LoadTile"](aData)
            };
            let m_offset = { x: 0.0, y: 0.0, z: 0.0 };
            let m_euler = { x: 0.0, y: 0.0, z: 0.0 };
            let m_offsetA = { x: 0.0, y: 0.0, z: 0.0 };
            let m_eulerA = { x: 0.0, y: 0.0, z: 0.0 };
            for (let pScene of pTileInfo["m_pTile"].scenes) {
                console.log("场景：", pScene.id);
                let pObject = pScene.object3D;
                switch (pScene.id) {
                    case "Default":
                        pObject.transform.localPosition = m_offset;
                        pObject.transform.euler = m_euler;
                        let nHeight = 0.0;
                        for (let pLayer of pScene.layers) {
                            let pObject = pLayer.object3D;
                            pObject.transform.localPosition = { x: 0.0, y: nHeight, z: 0.0 };
                            nHeight += 9.0;
                            pLayer._Draw();
                        }
                        break;
                    case "A":
                        pScene.OnSelect = function () {
                            pObject.transform.position = { x: pScene.binding.object3D.transform.position.x + m_offsetA.x, y: pScene.binding.object3D.transform.position.y + m_offsetA.y, z: pScene.binding.object3D.transform.position.z + m_offsetA.z };
                            pObject.transform.euler = { x: pScene.binding.object3D.transform.euler.x + m_eulerA.x, y: pScene.binding.object3D.transform.euler.y + m_eulerA.y, z: pScene.binding.object3D.transform.euler.z + m_eulerA.z };
                            let nHeight = 0.0;
                            for (let pLayer of pScene.layers) {
                                let pObject = pLayer.object3D;
                                pObject.transform.localPosition = { x: 0, y: nHeight, z: 0 };
                                nHeight += 9.0;
                                pLayer._Draw();
                                pLayer.OnSelect = function () {
                                    for (let layer of pScene.layers) {
                                        if (layer.id !== pLayer.id) {
                                            layer.object3D.active = false;
                                        }
                                        else {
                                            layer.object3D.enableCollider = false;
                                        }
                                    }
                                };
                                pLayer.UnSelect = function () {
                                    for (let layer of pScene.layers) {
                                        if (layer.id !== pLayer.id) {
                                            layer.object3D.active = true;
                                        }
                                        else {
                                            layer.object3D.enableCollider = true;
                                        }
                                    }
                                };
                            }
                        };
                        break;
                    default:
                        break;
                }
            }
            pThis.m_pTile = pTileInfo["m_pTile"];
        });
        return;
        pThis.m_pGis.AddSvetile({
            m_nID: 1,
            m_nFlags: 0,
            m_pUrl: "./data/project.txt",
            m_mLngLat: { x: 108.36882987572415, y: 22.842736594752864 },
            m_mSize: { x: 461.0, y: 340.0 },
            OnActive: function (pTile, bActive) {
                if (bActive) {
                    pTile.m_mOffet = { x: 50.0, y: -1003.0, z: -60.0 };
                    pTile.m_mEuler = { x: 0.0, y: 170.0, z: 0.0 };
                    pTile.m_mOffetL = { x: 0.0, y: 0.0, z: -40.0 };
                    pTile.m_mEulerL = { x: 0.0, y: 0.0, z: 0.0 };
                    pTile.m_mOffetA = { x: -12.0, y: -4.5, z: -23.7 };
                    pTile.m_mEulerA = { x: 0.0, y: 180.0, z: 0.0 };
                    for (let pScene of pTile.scenes) {
                        console.log("初始化加载场景：", pScene.id);
                        let pObject = pScene.object3D;
                        switch (pScene.id) {
                            case "Default":
                                pObject.transform.localPosition = pTile.m_mOffet;
                                pObject.transform.localEuler = pTile.m_mEuler;
                                let nHeight = 0.0;
                                for (let pLayer of pScene.layers) {
                                    let pObject = pLayer.object3D;
                                    pObject.transform.localPosition = { x: pTile.m_mOffetL.x, y: pTile.m_mOffetL.y + nHeight, z: pTile.m_mOffetL.z };
                                    nHeight += 9.0;
                                    pObject.transform.localEuler = { x: pTile.m_mEulerL.x, y: pTile.m_mEulerL.y, z: pTile.m_mEulerL.z };
                                    pLayer._Draw();
                                }
                                break;
                            case "南宁青秀区政务中心":
                                pScene.OnSelect = function () {
                                    pObject.transform.position = { x: pScene.binding.object3D.transform.position.x + pTile.m_mOffetA.x, y: pScene.binding.object3D.transform.position.y + pTile.m_mOffetA.y, z: pScene.binding.object3D.transform.position.z + pTile.m_mOffetA.z };
                                    pObject.transform.euler = { x: pScene.binding.object3D.transform.euler.x + pTile.m_mEulerA.x, y: pScene.binding.object3D.transform.euler.y + pTile.m_mEulerA.y, z: pScene.binding.object3D.transform.euler.z + pTile.m_mEulerA.z };
                                    let nHeight = 0.0;
                                    for (let pLayer of pScene.layers) {
                                        let pObject = pLayer.object3D;
                                        pObject.transform.localPosition = { x: 0, y: nHeight, z: 0 };
                                        nHeight += 9.0;
                                        pLayer._Draw();
                                        pLayer.OnSelect = function () {
                                            for (let layer of pScene.layers) {
                                                if (layer.id !== pLayer.id) {
                                                    layer.object3D.active = false;
                                                }
                                                else {
                                                    layer.object3D.enableCollider = false;
                                                }
                                            }
                                        };
                                        pLayer.UnSelect = function () {
                                            for (let layer of pScene.layers) {
                                                if (layer.id !== pLayer.id) {
                                                    layer.object3D.active = true;
                                                }
                                                else {
                                                    layer.object3D.enableCollider = true;
                                                }
                                            }
                                        };
                                    }
                                };
                                break;
                            default:
                                break;
                        }
                    }
                }
                else {
                    console.log("隐藏显示");
                }
            }
        });
    }
}
MiaokitJS.SVECLASS = MiaokitJS.SVECLASS || {};
MiaokitJS.SVECLASS.SVE = SVE;
MiaokitJS.SVE = new SVE();

class RoomViewer {
    constructor() {
        this.m_nState = 0;
        this.m_nStep = 0;
        this.m_nStepCount = 0;
        this.m_pCurView = null;
        this.m_pDstView = null;
        this.m_pIndoor = null;
        this.m_pLayer = null;
        this.m_pRoom = null;
        this.m_pCamera = null;
    }
    Enter(pIndoor, pLayer, pRoom) {
        let pThis = this;
        pThis.m_pCamera = MiaokitJS.App.m_pCameraCtrl;
        if (pThis.m_pIndoor !== pIndoor) {
            if (pThis.m_pIndoor) {
                pThis.m_pIndoor.Deactive();
            }
            pThis.m_pIndoor = pIndoor;
            pThis.SetState(1);
        }
        if (pThis.m_pLayer !== pLayer) {
            pThis.m_pLayer = pLayer;
            pThis.m_pLayer.m_pView = {
                m_mTarget: { x: pThis.m_pIndoor.m_pView.m_mTarget.x, y: pThis.m_pIndoor.m_pView.m_mTarget.y + pLayer.m_nIndex * 7.0, z: pThis.m_pIndoor.m_pView.m_mTarget.z },
                m_nDistance: 150.0,
                m_nPitch: pThis.m_pIndoor.m_pView.m_nPitch,
                m_nYaw: pThis.m_pIndoor.m_pView.m_nYaw
            };
            if (2 < pThis.m_nState) {
                pThis.SetState(3);
            }
        }
        {
            pThis.m_pRoom = pRoom;
            pRoom.m_mTarget.y = pThis.m_pLayer.m_pView.m_mTarget.y;
            pThis.m_pRoom.m_pView = {
                m_mTarget: pRoom.m_mTarget,
                m_nDistance: 30.0,
                m_nPitch: 50.0,
                m_nYaw: pThis.m_pLayer.m_pView.m_nYaw
            };
            if (2 < pThis.m_nState) {
                pThis.SetState(4);
            }
        }
    }
    Exit() {
        let pThis = this;
        if (1 < pThis.m_nState) {
            pThis.SetState(6);
        }
        else {
            pThis.SetState(7);
        }
        webgl_call_web_hide_floor_list();
    }
    SwitchLayer(pID) {
        let pThis = this;
        let pLayer = null;
        if (5 !== pThis.m_nState) {
            return;
        }
        for (let pLayer_ of pThis.m_pIndoor.m_pScene.m_pScene.layers) {
            let bShow = pLayer_._id === pID;
            pLayer_.object3D.active = bShow;
            pLayer_.object3D.highlight = false;
            pLayer_.decorationObject3D.active = bShow;
            if (bShow) {
                webgl_call_web_active_floor(pID);
                pLayer = pLayer_;
            }
        }
        pThis.m_pCurView = {
            m_mTarget: pThis.m_pCamera.target,
            m_nDistance: pThis.m_pCamera.distance,
            m_nPitch: pThis.m_pCamera.pitch,
            m_nYaw: pThis.m_pCamera.yaw
        };
        pThis.m_pDstView = pThis.m_pLayer.m_pView;
        pThis.m_nStep = 0;
        pThis.m_nStepCount = 60;
        let aPart = null;
        if (pID === pThis.m_pLayer.m_pLayer.id) {
            aPart = pThis.m_pRoom.m_aPart;
        }
        MiaokitJS.App.m_pProject.DrawIndoorPOI(pThis.m_pIndoor.m_pTile.m_pName, pThis.m_pIndoor.m_pScene.building_id, pID, aPart);
    }
    Update() {
        let pThis = this;
        if (0 < pThis.m_nState) {
            if (pThis.m_nStepCount > pThis.m_nStep) {
                let nLerp = ++pThis.m_nStep / pThis.m_nStepCount;
                let mCurTarget = pThis.m_pCurView.m_mTarget;
                let mDstTarget = pThis.m_pDstView.m_mTarget;
                let mTarget = { x: 0.0, y: 0.0, z: 0.0 };
                let nDistance = 0.0;
                let nPitch = 0.0;
                let nYaw = 0.0;
                mTarget.x = mCurTarget.x + (mDstTarget.x - mCurTarget.x) * nLerp;
                mTarget.y = mCurTarget.y + (mDstTarget.y - mCurTarget.y) * nLerp;
                mTarget.z = mCurTarget.z + (mDstTarget.z - mCurTarget.z) * nLerp;
                nDistance = pThis.m_pCurView.m_nDistance + (pThis.m_pDstView.m_nDistance - pThis.m_pCurView.m_nDistance) * nLerp;
                nPitch = pThis.m_pCurView.m_nPitch + (pThis.m_pDstView.m_nPitch - pThis.m_pCurView.m_nPitch) * nLerp;
                nYaw = pThis.m_pCurView.m_nYaw + (pThis.m_pDstView.m_nYaw - pThis.m_pCurView.m_nYaw) * nLerp;
                pThis.m_pCamera.target = mTarget;
                pThis.m_pCamera.distance = nDistance;
                pThis.m_pCamera.pitch = nPitch;
                pThis.m_pCamera.yaw = nYaw;
                if (2 === pThis.m_nState) {
                    nDistance = (150.0 > nDistance ? 150.0 : (300.0 < nDistance ? 300.0 : nDistance)) - 150.0;
                    pThis.m_pIndoor.SetBuildingOpacity(nDistance / 150.0 * 255.0);
                }
                else if (3 === pThis.m_nState) {
                    pThis.m_pIndoor.StackLayer(1.0, nLerp, pThis.m_pLayer.m_nIndex);
                }
                if (pThis.m_nStepCount === pThis.m_nStep && 5 !== pThis.m_nState) {
                    pThis.SetState(pThis.m_nState + 1);
                }
            }
        }
    }
    ResetCamera() {
        let pThis = this;
        if (5 === pThis.m_nState) {
            if (pThis.m_nStepCount === pThis.m_nStep) {
                pThis.m_pCurView = {
                    m_mTarget: pThis.m_pCamera.target,
                    m_nDistance: pThis.m_pCamera.distance,
                    m_nPitch: pThis.m_pCamera.pitch,
                    m_nYaw: pThis.m_pCamera.yaw
                };
                pThis.m_nStep = 0;
                pThis.m_nStepCount = 1;
                return true;
            }
        }
        return false;
    }
    SetState(nState) {
        let pThis = this;
        pThis.m_nState = nState;
        if (1 === nState) {
            pThis.m_pCurView = {
                m_mTarget: pThis.m_pCamera.target,
                m_nDistance: pThis.m_pCamera.distance,
                m_nPitch: pThis.m_pCamera.pitch,
                m_nYaw: pThis.m_pCamera.yaw
            };
            pThis.m_pDstView = pThis.m_pIndoor.m_pView;
            pThis.m_pCamera.lng = pThis.m_pIndoor.m_pView.m_nLng;
            pThis.m_pCamera.lat = pThis.m_pIndoor.m_pView.m_nLat;
            pThis.m_nStep = 0;
            pThis.m_nStepCount = 60;
            MiaokitJS.App.m_pProject.HideIndoorPOI();
            pThis.m_pIndoor.FocusBuilding();
        }
        else if (2 === nState) {
            pThis.m_pCurView = pThis.m_pIndoor.m_pView;
            pThis.m_pDstView = {
                m_mTarget: pThis.m_pCurView.m_mTarget,
                m_nDistance: 150.0,
                m_nPitch: 20.0,
                m_nYaw: pThis.m_pCurView.m_nYaw
            };
            pThis.m_nStep = 0;
            pThis.m_nStepCount = 60;
            MiaokitJS.App.m_pProject.HideIndoorPOI();
        }
        else if (3 === nState) {
            pThis.m_pIndoor.SetBuildingOpacity(255);
            pThis.m_pCurView = {
                m_mTarget: pThis.m_pIndoor.m_pView.m_mTarget,
                m_nDistance: 150.0,
                m_nPitch: 20.0,
                m_nYaw: pThis.m_pIndoor.m_pView.m_nYaw
            };
            pThis.m_pDstView = pThis.m_pLayer.m_pView;
            pThis.m_nStep = 0;
            pThis.m_nStepCount = 60;
        }
        else if (4 === nState) {
            MiaokitJS.App.m_pProject.DrawIndoorPOI(pThis.m_pIndoor.m_pTile.m_pName, pThis.m_pIndoor.m_pScene.building_id, pThis.m_pLayer.m_pLayer.id, pThis.m_pRoom.m_aPart);
            pThis.m_pCurView = pThis.m_pLayer.m_pView;
            pThis.m_pDstView = pThis.m_pRoom.m_pView;
            pThis.m_nStep = 0;
            pThis.m_nStepCount = 60;
            pThis.m_pIndoor.ShowOneLayer(pThis.m_pLayer.m_nIndex, pThis.m_pRoom.m_aPart);
        }
        else if (5 === nState) {
            pThis.m_pIndoor.ShowLayerList(pThis.m_pLayer.m_nIndex);
        }
        else if (6 === nState) {
            if (pThis.m_pIndoor) {
                pThis.m_pCurView = {
                    m_mTarget: pThis.m_pCamera.target,
                    m_nDistance: pThis.m_pCamera.distance,
                    m_nPitch: pThis.m_pCamera.pitch,
                    m_nYaw: pThis.m_pCamera.yaw
                };
                pThis.m_pDstView = pThis.m_pIndoor.m_pView;
                pThis.m_nStep = 0;
                pThis.m_nStepCount = 60;
                MiaokitJS.App.m_pProject.HideIndoorPOI();
            }
        }
        else if (7 === nState) {
            if (pThis.m_pIndoor) {
                pThis.m_pIndoor.Deactive();
                pThis.m_nState = 0;
                pThis.m_nStep = 0;
                pThis.m_nStepCount = 0;
                pThis.m_pCurView = null;
                pThis.m_pDstView = null;
                pThis.m_pIndoor = null;
                pThis.m_pLayer = null;
                pThis.m_pRoom = null;
            }
        }
        if (0 < pThis.m_nStepCount) {
            let nBias = (pThis.m_pCurView.m_nYaw - pThis.m_pDstView.m_nYaw) % 360.0;
            if (0.0 > nBias) {
                nBias += 360.0;
            }
            if (180.0 < nBias) {
                nBias -= 360.0;
            }
            pThis.m_pCurView.m_nYaw = pThis.m_pDstView.m_nYaw + nBias;
            pThis.m_nStepCount = Math.ceil(pThis.m_nStepCount / MiaokitJS.App.m_nSensitivity);
        }
    }
}
class Indoor {
    constructor(pTile, pScene) {
        this.m_pTile = null;
        this.m_pScene = null;
        this.m_nBuildingType = 0;
        this.m_pBuilding = null;
        this.m_pDioramas = null;
        this.m_pScreenPos = null;
        this.m_pView = null;
        let pThis = this;
        pThis.m_pTile = pTile;
        pThis.m_pScene = pScene;
        pThis.m_pBuilding = pScene.m_pScene.binding;
        pThis.m_pDioramas = null;
        for (let pDior of MiaokitJS.m_pConfig.DIORS) {
            if (pTile.m_pDior === pDior.m_pName) {
                pThis.m_pDioramas = pDior;
                break;
            }
        }
        pThis.m_pView = {
            m_nLng: pTile.m_nLng,
            m_nLat: pTile.m_nLng,
            m_mTarget: { x: pScene.m_pView.m_mTarget.x, y: pScene.m_pView.m_mTarget.y, z: pScene.m_pView.m_mTarget.z },
            m_nDistance: pScene.m_pView.m_nDistance,
            m_nPitch: pScene.m_pView.m_nPitch,
            m_nYaw: pScene.m_pView.m_nYaw
        };
        if (MiaokitJS.m_pConfig.GIS.m_pTerrainServer) {
            pThis.m_pView.m_mTarget.y += pThis.m_pTile.m_nHeight;
        }
    }
    get name() {
        let pThis = this;
        if (pThis.m_pBuilding) {
            return pThis.m_pScene.building_id;
        }
        else {
            return pThis.m_pTile.m_pName;
        }
        return "Default";
    }
    get screenPoint() {
        let pThis = this;
        if (pThis.m_pBuilding) {
            let pBuildingObj = pThis.m_pBuilding.object3D;
            if (pBuildingObj) {
                let pPosition = pBuildingObj.transform.regionPosition;
                let pPoint = MiaokitJS.Miaokit.WorldToScreenPoint(pPosition);
                return pPoint;
            }
        }
        else {
            let pPosition = pThis.m_pView.m_mTarget;
            let pPoint = MiaokitJS.Miaokit.WorldToScreenPoint(pPosition);
            return pPoint;
        }
        return null;
    }
    FocusBuilding() {
        let pThis = this;
        if (pThis.m_pBuilding) {
            let pBuildingObj = pThis.m_pBuilding.object3D;
            if (pBuildingObj) {
                pBuildingObj.highlight = true;
                pBuildingObj.opacity = 255;
            }
        }
        else {
        }
    }
    SetBuildingOpacity(nOpacity) {
        let pThis = this;
        if (pThis.m_pBuilding) {
            let pBuildingObj = pThis.m_pBuilding.object3D;
            if (pBuildingObj) {
                pBuildingObj.opacity = nOpacity;
            }
        }
        else {
            if (250 < nOpacity && pThis.m_pDioramas) {
                pThis.m_pDioramas.m_pDior.Deplanation({ x: pThis.m_pView.m_mTarget.x, y: 35.0, z: pThis.m_pView.m_mTarget.z });
            }
        }
    }
    StackLayer(nOffset, nRate, nStressLayer) {
        let pThis = this;
        let nCount = pThis.m_pScene.layerList.length;
        let nMinHeight = 4.0 * nCount;
        let nMaxHeight = (4.0 + nOffset) * nCount;
        let nShowHeight = nRate * nMaxHeight;
        let nHeight = 0.0;
        let nCutRate = nMinHeight / nMaxHeight;
        let pPosition = null;
        let nIndex = 0;
        pThis.m_pScene.m_pScene.object3D.active = true;
        if (nRate > nCutRate) {
            nOffset = 4.0 + (nOffset * ((nRate - nCutRate) / (1.0 - nCutRate)));
        }
        else {
            nOffset = 4.0;
        }
        for (let pLayer of pThis.m_pScene.m_pScene.layers) {
            let pObject = pLayer.object3D;
            if (pPosition) {
                pPosition.y += nOffset;
                pObject.transform.localPosition = pPosition;
            }
            else {
                pPosition = pObject.transform.localPosition;
            }
            pLayer._Draw();
            pLayer.decorationObject3D.active = false;
            pObject.active = nHeight < nShowHeight;
            pObject.highlight = nIndex === nStressLayer;
            nHeight += nOffset;
            nIndex++;
        }
    }
    ShowOneLayer(nIndex, aRoom) {
        let pThis = this;
        let nIndex_ = 0;
        for (let pLayer of pThis.m_pScene.m_pScene.layers) {
            let bShow = nIndex === nIndex_++;
            pLayer.object3D.active = bShow;
            pLayer.object3D.highlight = false;
            pLayer.decorationObject3D.active = bShow;
            if (bShow) {
                pThis.FocusRoom(pLayer, aRoom);
            }
        }
    }
    ShowLayerList(nIndex) {
        let pThis = this;
        let aList = [];
        for (let pLayer of pThis.m_pScene.m_pScene.layers) {
            aList.push({
                id: pLayer._id,
                name: pLayer._id
            });
        }
        webgl_call_web_show_floor_list(aList);
        webgl_call_web_active_floor(aList[nIndex].id);
    }
    SwitchRoom(nIndex) {
        let pThis = this;
        let nIndex_ = 0;
        for (let pLayer of pThis.m_pScene.m_pScene.layers) {
            let bShow = nIndex === nIndex_++;
            pLayer.object3D.active = bShow;
            pLayer.object3D.highlight = false;
            pLayer.decorationObject3D.active = bShow;
            if (bShow) {
                webgl_call_web_active_floor(pLayer._id);
            }
        }
    }
    FocusRoom(pLayer, aPoint) {
        let bAdd = false;
        for (let pPoint of aPoint) {
            pLayer.HighlightRoom(pPoint.point, bAdd);
            bAdd = true;
        }
    }
    Deactive() {
        let pThis = this;
        if (pThis.m_pBuilding) {
            let pBuildingObj = pThis.m_pBuilding.object3D;
            if (pBuildingObj) {
                pBuildingObj.highlight = false;
                pBuildingObj.opacity = 255;
            }
        }
        else {
            if (pThis.m_pDioramas) {
                pThis.m_pDioramas.m_pDior.Recover();
            }
        }
        pThis.m_pScene.m_pScene.object3D.active = false;
    }
    Open() {
        return;
        let pBuildingObj = this.m_pBuilding.object3D;
        if (pBuildingObj) {
            pBuildingObj.highlight = true;
            pBuildingObj.opacity = 250;
        }
        this.m_pScene.m_pScene.object3D.active = true;
        let pPosition = null;
        let nOffset = 6.0;
        for (let pLayer of this.m_pScene.m_pScene.layers) {
            let pObject = pLayer.object3D;
            if (pPosition) {
                pPosition.y += nOffset;
                pObject.transform.localPosition = pPosition;
            }
            else {
                pPosition = pObject.transform.localPosition;
            }
            pLayer._Draw();
        }
    }
    Close() {
        return;
        let pBuildingObj = this.m_pBuilding.object3D;
        if (pBuildingObj) {
            pBuildingObj.highlight = false;
            pBuildingObj.opacity = 255;
        }
        this.m_pScene.m_pScene.object3D.active = false;
    }
    Update(mEyePos) {
        return;
        let pBuildingObj = this.m_pBuilding.object3D;
        if (pBuildingObj) {
            let mPos = pBuildingObj.transform.regionPosition;
            let x = mEyePos.x - mPos.x;
            x *= x;
            let y = mEyePos.y - mPos.y;
            y *= y;
            let z = mEyePos.z - mPos.z;
            z *= z;
            let nDistance = Math.sqrt(x + y + z);
            nDistance = (120 > nDistance ? 120 : (300 < nDistance ? 300 : nDistance)) - 120;
            pBuildingObj.opacity = nDistance / 180.0 * 255.0;
        }
    }
}
class Main {
    constructor() {
        this.iii = 0;
        this.m_pApp = null;
        this.m_pGis = null;
        this.m_pPanoramas = null;
        this.m_aDioramas = null;
        this.m_aTile = null;
        this.m_aRooms = null;
        this.m_nLoading = 0;
        this.m_nTaskMax = 0;
        this.m_pClick = null;
        this.m_pCity = null;
        this.m_pPark = null;
        this.m_pIndoor = null;
        this.m_pRoomViewer = null;
        this.m_aIcon = [
            { m_pName: "楼宇", m_pPath: "./data/building.png", m_pImage: null, m_pDraw: null, m_aList: null, m_pDrawList: null },
            { m_pName: "全景", m_pPath: "./data/panor.png", m_pImage: null, m_pDraw: null, m_aList: null, m_pDrawList: null },
            { m_pName: "商圈", m_pPath: "./data/business.png", m_pImage: null, m_pDraw: null, m_aList: null, m_pDrawList: null },
            { m_pName: "公交车", m_pPath: "./data/bus.png", m_pImage: null, m_pDraw: null, m_aList: null, m_pDrawList: null },
            { m_pName: "停车场", m_pPath: "./data/park.png", m_pImage: null, m_pDraw: null, m_aList: null, m_pDrawList: null },
            { m_pName: "公司", m_pPath: "./data/building.png", m_pImage: null, m_pDraw: null, m_aList: null, m_pDrawList: null },
            { m_pName: "房间", m_pPath: "./data/building.png", m_pImage: null, m_pDraw: null, m_aList: null, m_pDrawList: null },
        ];
        let pThis = this;
        pThis.m_pApp = MiaokitJS.App;
        pThis.m_pApp.m_pProject = this;
        pThis.m_pRoomViewer = new RoomViewer();
    }
    Preload() {
        let pThis = this;
        pThis.m_aDioramas = MiaokitJS.m_pConfig.DIORS;
        pThis.m_aTile = MiaokitJS.m_pConfig.SVE;
        pThis.m_nLoading = pThis.m_aTile ? pThis.m_aTile.length : 0;
        let DrawList = [];
        let Overlap = function (A, B) {
            if (A[0] > B[0] + B[2]) {
                return 0.0;
            }
            if (A[0] + A[2] < B[0]) {
                return 0.0;
            }
            if (A[1] - A[3] > B[1]) {
                return 0.0;
            }
            if (A[1] < B[1] - B[3]) {
                return 0.0;
            }
            let COL = Math.abs(Math.min(A[0] + A[2], B[0] + B[2]) - Math.max(A[0], B[0]));
            let ROW = Math.abs(Math.min(A[1], B[1]) - Math.max(A[1] - A[3], B[1] - B[3]));
            return COL * ROW;
        };
        let Drawable = function (pRect) {
            for (let pRect_ of DrawList) {
                if (1000 < Overlap(pRect, pRect_)) {
                    return false;
                }
            }
            DrawList.push(pRect);
            return true;
        };
        for (let pIcon_ of pThis.m_aIcon) {
            let pIcon = pIcon_;
            let pImage = new Image();
            pImage.src = pIcon.m_pPath;
            pImage.crossOrigin = "anonymous";
            pImage.onload = function (e) {
                pIcon.m_pImage = pImage;
                if ("楼宇" === pIcon.m_pName) {
                    pIcon.m_pDraw = function (canvas, text, point) {
                        canvas.font = "18px Microsoft YaHei";
                        canvas.lineWidth = 2;
                        let w_ = canvas.measureText(text).width;
                        if (16 > w_) {
                            w_ = 16;
                        }
                        let x = point.x;
                        let y = point.y;
                        let y_ = y - 30;
                        let w = 48 + w_;
                        let hw = 0.5 * w;
                        if (!Drawable([x - hw, y_ - 32, w, 32])) {
                            return;
                        }
                        canvas.beginPath();
                        canvas.moveTo(x, y);
                        canvas.lineTo(x + 10, y - 6);
                        canvas.lineTo(x + 10, y - 14);
                        canvas.lineTo(x + 0, y - 8);
                        canvas.lineTo(x - 10, y - 14);
                        canvas.lineTo(x - 10, y - 6);
                        canvas.closePath();
                        canvas.fillStyle = "#3ABAF2";
                        canvas.fill();
                        canvas.beginPath();
                        canvas.arc(x + hw - 16, y_ - 16, 15, 1.570796, -1.570796, true);
                        canvas.lineTo(x - hw + 16, y_ - 31);
                        canvas.lineTo(x - hw + 16, y_ - 1);
                        canvas.closePath();
                        canvas.fillStyle = "#3ABAF2C0";
                        canvas.fill();
                        canvas.strokeStyle = "#A3D5EA";
                        canvas.stroke();
                        canvas.drawImage(pImage, x - hw, y_ - 32, 32, 32);
                        canvas.fillStyle = "#FFFFFF";
                        canvas.fillText(text, x - w_ * 0.5 + 10, y_ - 10);
                    };
                    pIcon.m_pDrawList = function (canvas, width, height) {
                        DrawList = [];
                        if (!pIcon.m_aList) {
                            return;
                        }
                        for (let pItem of pIcon.m_aList) {
                            if (pItem.m_aIndoor) {
                                for (let pIndoor of pItem.m_aIndoor) {
                                    let pPoint = pIndoor.screenPoint;
                                    if (-1.0 > pPoint.z) {
                                        continue;
                                    }
                                    pPoint.x = pPoint.x * width;
                                    pPoint.y = pPoint.y * height;
                                    pIcon.m_pDraw(canvas, pIndoor.name, pPoint);
                                }
                            }
                        }
                    };
                }
                else if ("全景" === pIcon.m_pName) {
                    pIcon.m_pDraw = function (canvas, text, point, click) {
                        canvas.font = "18px Microsoft YaHei";
                        canvas.lineWidth = 2;
                        let w_ = canvas.measureText(text).width;
                        if (16 > w_) {
                            w_ = 16;
                        }
                        let x = point.x;
                        let y = point.y;
                        let y_ = y - 30;
                        let w = 48 + w_;
                        let hw = 0.5 * w;
                        if (!Drawable([x - hw, y_ - 32, w, 32])) {
                            return;
                        }
                        canvas.beginPath();
                        canvas.moveTo(x, y);
                        canvas.lineTo(x + 10, y - 6);
                        canvas.lineTo(x + 10, y - 14);
                        canvas.lineTo(x + 0, y - 8);
                        canvas.lineTo(x - 10, y - 14);
                        canvas.lineTo(x - 10, y - 6);
                        canvas.closePath();
                        canvas.fillStyle = "#6D56E8";
                        canvas.fill();
                        canvas.beginPath();
                        canvas.arc(x + hw - 16, y_ - 16, 15, 1.570796, -1.570796, true);
                        canvas.lineTo(x - hw + 16, y_ - 31);
                        canvas.lineTo(x - hw + 16, y_ - 1);
                        canvas.closePath();
                        canvas.fillStyle = "#6D56E8C0";
                        canvas.fill();
                        canvas.strokeStyle = "#FCE2CE";
                        canvas.stroke();
                        canvas.drawImage(pImage, x - hw, y_ - 32, 32, 32);
                        canvas.fillStyle = "#FFFFFF";
                        canvas.fillText(text, x - w_ * 0.5 + 10, y_ - 10);
                        if (click) {
                            if ((x - hw) < click.x && (x + hw) > click.x) {
                                if ((y_ - 32) < click.y && y_ > click.y) {
                                    return true;
                                }
                            }
                        }
                        return false;
                    };
                    pIcon.m_pDrawList = function (canvas, width, height, click) {
                        if (!pIcon.m_aList) {
                            return;
                        }
                        let pClick = null;
                        for (let pItem of pIcon.m_aList) {
                            let pPoint = MiaokitJS.Miaokit.WorldToScreenPoint(pItem.m_mPosition);
                            if (-1.0 > pPoint.z) {
                                continue;
                            }
                            pPoint.x = pPoint.x * width;
                            pPoint.y = pPoint.y * height;
                            if (pIcon.m_pDraw(canvas, pItem.name, pPoint, click)) {
                                pClick = pItem;
                            }
                        }
                        return pClick;
                    };
                }
                else if ("商圈" === pIcon.m_pName) {
                    pIcon.m_pDraw = function (canvas, text, point) {
                        canvas.font = "18px Microsoft YaHei";
                        canvas.lineWidth = 2;
                        let w_ = canvas.measureText(text).width;
                        if (16 > w_) {
                            w_ = 16;
                        }
                        let x = point.x;
                        let y = point.y;
                        let y_ = y - 30;
                        let w = 48 + w_;
                        let hw = 0.5 * w;
                        if (!Drawable([x - hw, y_ - 32, w, 32])) {
                            return;
                        }
                        canvas.beginPath();
                        canvas.moveTo(x, y);
                        canvas.lineTo(x + 10, y - 6);
                        canvas.lineTo(x + 10, y - 14);
                        canvas.lineTo(x + 0, y - 8);
                        canvas.lineTo(x - 10, y - 14);
                        canvas.lineTo(x - 10, y - 6);
                        canvas.closePath();
                        canvas.fillStyle = "#F28A3A";
                        canvas.fill();
                        canvas.beginPath();
                        canvas.arc(x + hw - 16, y_ - 16, 15, 1.570796, -1.570796, true);
                        canvas.lineTo(x - hw + 16, y_ - 31);
                        canvas.lineTo(x - hw + 16, y_ - 1);
                        canvas.closePath();
                        canvas.fillStyle = "#F28A3AC0";
                        canvas.fill();
                        canvas.strokeStyle = "#FCE2CE";
                        canvas.stroke();
                        canvas.drawImage(pImage, x - hw, y_ - 32, 32, 32);
                        canvas.fillStyle = "#FFFFFF";
                        canvas.fillText(text, x - w_ * 0.5 + 10, y_ - 10);
                    };
                    pIcon.m_pDrawList = function (canvas, width, height) {
                        if (!pIcon.m_aList) {
                            return;
                        }
                        for (let pItem of pIcon.m_aList) {
                            let pPoint = MiaokitJS.Miaokit.WorldToScreenPoint(pItem.m_mPosition);
                            if (-1.0 > pPoint.z) {
                                continue;
                            }
                            pPoint.x = pPoint.x * width;
                            pPoint.y = pPoint.y * height;
                            pIcon.m_pDraw(canvas, pItem.name, pPoint);
                        }
                    };
                }
                else if ("公交车" === pIcon.m_pName) {
                    pIcon.m_pDraw = function (canvas, text, point) {
                        canvas.font = "18px Microsoft YaHei";
                        canvas.lineWidth = 2;
                        let w_ = canvas.measureText(text).width;
                        if (16 > w_) {
                            w_ = 16;
                        }
                        let x = point.x;
                        let y = point.y;
                        let y_ = y - 30;
                        let w = 48 + w_;
                        let hw = 0.5 * w;
                        if (!Drawable([x - hw, y_ - 32, w, 32])) {
                            return;
                        }
                        canvas.beginPath();
                        canvas.moveTo(x, y);
                        canvas.lineTo(x + 10, y - 6);
                        canvas.lineTo(x + 10, y - 14);
                        canvas.lineTo(x + 0, y - 8);
                        canvas.lineTo(x - 10, y - 14);
                        canvas.lineTo(x - 10, y - 6);
                        canvas.closePath();
                        canvas.fillStyle = "#5BD648";
                        canvas.fill();
                        canvas.beginPath();
                        canvas.arc(x + hw - 16, y_ - 16, 15, 1.570796, -1.570796, true);
                        canvas.lineTo(x - hw + 16, y_ - 31);
                        canvas.lineTo(x - hw + 16, y_ - 1);
                        canvas.closePath();
                        canvas.fillStyle = "#5BD648C0";
                        canvas.fill();
                        canvas.strokeStyle = "#D6F5D2";
                        canvas.stroke();
                        canvas.drawImage(pImage, x - hw, y_ - 32, 32, 32);
                        canvas.fillStyle = "#FFFFFF";
                        canvas.fillText(text, x - w_ * 0.5 + 10, y_ - 10);
                    };
                    pIcon.m_pDrawList = function (canvas, width, height) {
                        if (!pIcon.m_aList) {
                            return;
                        }
                        for (let pItem of pIcon.m_aList) {
                            let pPoint = MiaokitJS.Miaokit.WorldToScreenPoint(pItem.m_mPosition);
                            if (-1.0 > pPoint.z) {
                                continue;
                            }
                            pPoint.x = pPoint.x * width;
                            pPoint.y = pPoint.y * height;
                            pIcon.m_pDraw(canvas, pItem.name, pPoint);
                        }
                    };
                }
                else if ("停车场" === pIcon.m_pName) {
                    pIcon.m_pDraw = function (canvas, text, point) {
                        canvas.font = "18px Microsoft YaHei";
                        canvas.lineWidth = 2;
                        let w_ = canvas.measureText(text).width;
                        if (16 > w_) {
                            w_ = 16;
                        }
                        let x = point.x;
                        let y = point.y;
                        let y_ = y - 30;
                        let w = 48 + w_;
                        let hw = 0.5 * w;
                        if (!Drawable([x - hw, y_ - 32, w, 32])) {
                            return;
                        }
                        canvas.beginPath();
                        canvas.moveTo(x, y);
                        canvas.lineTo(x + 10, y - 6);
                        canvas.lineTo(x + 10, y - 14);
                        canvas.lineTo(x + 0, y - 8);
                        canvas.lineTo(x - 10, y - 14);
                        canvas.lineTo(x - 10, y - 6);
                        canvas.closePath();
                        canvas.fillStyle = "#0F73D8";
                        canvas.fill();
                        canvas.beginPath();
                        canvas.arc(x + hw - 16, y_ - 16, 15, 1.570796, -1.570796, true);
                        canvas.lineTo(x - hw + 16, y_ - 31);
                        canvas.lineTo(x - hw + 16, y_ - 1);
                        canvas.closePath();
                        canvas.fillStyle = "#0F73D8C0";
                        canvas.fill();
                        canvas.strokeStyle = "#C3DCF6";
                        canvas.stroke();
                        canvas.drawImage(pImage, x - hw, y_ - 32, 32, 32);
                        canvas.fillStyle = "#FFFFFF";
                        canvas.fillText(text, x - w_ * 0.5 + 10, y_ - 10);
                    };
                    pIcon.m_pDrawList = function (canvas, width, height) {
                        if (!pIcon.m_aList) {
                            return;
                        }
                        for (let pItem of pIcon.m_aList) {
                            let pPoint = MiaokitJS.Miaokit.WorldToScreenPoint(pItem.m_mPosition);
                            if (-1.0 > pPoint.z) {
                                continue;
                            }
                            pPoint.x = pPoint.x * width;
                            pPoint.y = pPoint.y * height;
                            pIcon.m_pDraw(canvas, pItem.name, pPoint);
                        }
                    };
                }
                else if ("公司" === pIcon.m_pName) {
                    pIcon.m_pDraw = function (canvas, text, point) {
                        canvas.font = "18px Microsoft YaHei";
                        canvas.lineWidth = 2;
                        let w_ = canvas.measureText(text).width;
                        let x = point.x;
                        let y = point.y;
                        let rw = 32 + w_;
                        let rh = 32 + 10;
                        let rx = x - rw * 0.5;
                        let ry = y + 2;
                        if (!Drawable([rx, ry - rh, rw, rh])) {
                            return;
                        }
                        canvas.beginPath();
                        canvas.moveTo(rx, ry);
                        canvas.lineTo(rx + rw, ry);
                        canvas.lineTo(rx + rw, ry - rh);
                        canvas.lineTo(rx, ry - rh);
                        canvas.closePath();
                        canvas.fillStyle = "#777777";
                        canvas.fill();
                        canvas.beginPath();
                        canvas.moveTo(x, y);
                        canvas.lineTo(x + 8, y - 8);
                        canvas.lineTo(x + 6, y - 10);
                        canvas.lineTo(x + 0, y - 4);
                        canvas.lineTo(x - 6, y - 10);
                        canvas.lineTo(x - 8, y - 8);
                        canvas.closePath();
                        canvas.fillStyle = "#FFFFFF";
                        canvas.fill();
                        canvas.fillStyle = "#FFFFFF";
                        canvas.fillText(text, x - w_ * 0.5, y - 14);
                    };
                    pIcon.m_pDrawList = function (canvas, width, height) {
                        if (!pIcon.m_aList) {
                            return;
                        }
                        for (let pItem of pIcon.m_aList) {
                            if (pItem.position) {
                                let pPoint = MiaokitJS.Miaokit.WorldToScreenPoint(pItem.position);
                                if (-1.0 > pPoint.z) {
                                    continue;
                                }
                                pPoint.x = pPoint.x * width;
                                pPoint.y = pPoint.y * height;
                                pIcon.m_pDraw(canvas, pItem.name, pPoint);
                            }
                        }
                    };
                }
                else if ("房间" === pIcon.m_pName) {
                    pIcon.m_pDraw = function (canvas, text, point, click, url) {
                        canvas.font = "18px Microsoft YaHei";
                        canvas.lineWidth = 2;
                        let w_ = canvas.measureText(text).width;
                        let x = point.x;
                        let y = point.y;
                        let rw = 32 + w_;
                        let rh = 32 + 10;
                        let rx = x - rw * 0.5;
                        let ry = y + 2;
                        if (!Drawable([rx, ry - rh, rw, rh])) {
                            return;
                        }
                        canvas.beginPath();
                        canvas.moveTo(rx, ry);
                        canvas.lineTo(rx + rw, ry);
                        canvas.lineTo(rx + rw, ry - rh);
                        canvas.lineTo(rx, ry - rh);
                        canvas.closePath();
                        canvas.fillStyle = url ? "#3598FE" : "#777777";
                        canvas.fill();
                        canvas.beginPath();
                        canvas.moveTo(x, y);
                        canvas.lineTo(x + 8, y - 8);
                        canvas.lineTo(x + 6, y - 10);
                        canvas.lineTo(x + 0, y - 4);
                        canvas.lineTo(x - 6, y - 10);
                        canvas.lineTo(x - 8, y - 8);
                        canvas.closePath();
                        canvas.fillStyle = "#FFFFFF";
                        canvas.fill();
                        canvas.fillStyle = "#FFFFFF";
                        canvas.fillText(text, x - w_ * 0.5, y - 14);
                        if (click && url) {
                            if (rx < click.x && (rx + rw) > click.x) {
                                if ((ry - rh) < click.y && ry > click.y) {
                                    return true;
                                }
                            }
                        }
                        return false;
                    };
                    pIcon.m_pDrawList = function (canvas, width, height, click) {
                        if (!pIcon.m_aList) {
                            return;
                        }
                        let pClick = null;
                        for (let pItem of pIcon.m_aList) {
                            if (pItem.position_) {
                                let pPoint = MiaokitJS.Miaokit.WorldToScreenPoint(pItem.position_);
                                if (-1.0 > pPoint.z) {
                                    continue;
                                }
                                pPoint.x = pPoint.x * width;
                                pPoint.y = pPoint.y * height;
                                if (pIcon.m_pDraw(canvas, pItem.name, pPoint, click, pItem.panoramaurl)) {
                                    pClick = pItem;
                                }
                            }
                        }
                        return pClick;
                    };
                }
            };
        }
    }
    Start() {
        let pThis = this;
        if (!pThis.m_pCity) {
            pThis.m_pCity = {
                m_pName: "桂林",
                m_nLng: 110.344301,
                m_nLat: 25.272208
            };
        }
        pThis.m_pGis = pThis.m_pApp.m_pGis;
        pThis.m_pPanoramas = pThis.m_pApp.m_pPanoramas;
        pThis.m_pApp.m_pCameraCtrl.Jump(MiaokitJS.UTIL.CTRL_MODE.PANORAMA, {
            m_nLng: pThis.m_pCity.m_nLng,
            m_nLat: pThis.m_pCity.m_nLat,
            m_mTarget: { x: 0.0, y: 0.0, z: 0.0 },
            m_nDistance: 3000.000,
            m_nPitch: 20.0,
            m_nYaw: 90.0
        });
        MiaokitJS.ShaderLab.SetSunlight(0.0, 60.0, 0.1);
    }
    Update() {
        if ((this.iii++) % 180 === 0) {
        }
        if (this.m_pPanoramas.panor) {
            let nState = this.m_pPanoramas.panor.m_nState;
            this.m_pPanoramas.Update();
            if (2 < nState) {
                return;
            }
        }
        this.m_pRoomViewer.Update();
        if (this.m_pGis) {
            this.m_pGis.Update(this.m_pApp.m_pCameraCtrl.lng, this.m_pApp.m_pCameraCtrl.lat, this.m_pApp.m_pCameraCtrl.height);
        }
        if (this.m_aDioramas) {
            for (let pDior of this.m_aDioramas) {
                pDior.m_pDior.Update();
            }
        }
        let nTaskCount = MiaokitJS.Miaokit.progress;
        if (0 === nTaskCount) {
            let pCanvas = MiaokitJS.App.m_pCanvas2D;
            let nCenter = { x: 0.5 * pCanvas.width, y: 0.5 * pCanvas.height };
            let pNearest = null;
            let nDistance = 1000.0;
            for (let pTile of this.m_aTile) {
                if (pTile.m_aIndoor) {
                    for (let pIndoor of pTile.m_aIndoor) {
                        let pPoint = pIndoor.screenPoint;
                        pPoint.x = pPoint.x * pCanvas.width;
                        pPoint.y = pPoint.y * pCanvas.height;
                        let x = pPoint.x - nCenter.x;
                        x *= x;
                        let y = pPoint.y - nCenter.y;
                        y *= y;
                        let nDistance_ = Math.sqrt(x + y);
                        if (nDistance > nDistance_) {
                            nDistance = nDistance_;
                            pNearest = pIndoor;
                        }
                    }
                }
            }
            if (pNearest && pNearest !== this.m_pIndoor) {
                if (this.m_pIndoor) {
                    this.m_pIndoor.Close();
                }
                this.m_pIndoor = pNearest;
                this.m_pIndoor.Open();
            }
            if (this.m_pIndoor) {
                this.m_pIndoor.Update(this.m_pApp.m_pCameraCtrl.m_pTransform.position);
            }
        }
        if (this.m_nLoading || 0 < nTaskCount) {
            this.m_nTaskMax = this.m_nTaskMax < nTaskCount ? nTaskCount : this.m_nTaskMax;
            if (this.m_nLoading || this["InitComplete"]) {
            }
            else {
            }
        }
        else {
            if (this["InitComplete"]) {
                this.m_nTaskMax = 0;
                this["InitComplete"]();
            }
            else {
                if (0 < this.m_nTaskMax) {
                    MiaokitJS.Track("Loaded Tasks");
                    this.m_nTaskMax = 0;
                }
            }
        }
    }
    OnGUI(pCanvas, pCanvasCtx) {
        let pThis = this;
        let nTaskCount = MiaokitJS.Miaokit.progress;
        if (0 !== nTaskCount) {
            return;
        }
        pCanvas.font = "16px Microsoft YaHei";
        pCanvas.strokeStyle = "black";
        pCanvas.lineWidth = 2;
        pCanvas.fillStyle = "#FFFFFF";
        let bOutPanor = true;
        if (this.m_pPanoramas.panor) {
            if (2 < this.m_pPanoramas.panor.m_nState) {
                if (10 > this.m_pPanoramas.panor.m_nRadius) {
                    bOutPanor = false;
                }
            }
        }
        for (let i = 0; i < pThis.m_aIcon.length; i++) {
            let pIcon = pThis.m_aIcon[i];
            if (pIcon.m_pDraw) {
                if (0 === i) {
                    if (bOutPanor) {
                        pIcon.m_aList = pThis.m_aTile;
                        pIcon.m_pDrawList(pCanvasCtx, pCanvas.width, pCanvas.height);
                    }
                    else {
                        pIcon.m_aList = null;
                        pIcon.m_pDrawList(pCanvasCtx, pCanvas.width, pCanvas.height);
                    }
                }
                else if (1 === i) {
                    let pPanor = pIcon.m_pDrawList(pCanvasCtx, pCanvas.width, pCanvas.height, pThis.m_pClick);
                    if (pPanor) {
                        if (!pPanor.m_pPanor) {
                            let mLngLat = { x: parseFloat(pPanor.long), y: parseFloat(pPanor.lat) };
                            let mOffset = { x: 0.0, y: 80.0, z: 0.0 };
                            let pGisPosition = MiaokitJS.Miaokit.LngLatToGis(mLngLat, mOffset, 167.0);
                            let pPosition = MiaokitJS.Miaokit.GisToWorld(pGisPosition);
                            pPanor.m_pPanor = {
                                m_pName: pPanor.name,
                                m_pPath: pPanor.data,
                                m_mPosition: pPosition,
                                m_nRadius: 50.0,
                                m_nAngle: Math.PI * -0.35
                            };
                        }
                        pThis.EnterPanoramas(pPanor.m_pPanor);
                    }
                }
                else if (6 === i) {
                    let pPanor = pIcon.m_pDrawList(pCanvasCtx, pCanvas.width, pCanvas.height, pThis.m_pClick);
                    if (pPanor) {
                        if (!pPanor.m_pPanor) {
                            let pPosition = { x: pPanor.position_.x, y: pPanor.position_.y + 1.5, z: pPanor.position_.z };
                            pPanor.m_pPanor = {
                                m_pName: pPanor.name,
                                m_pPath: pPanor.panoramaurl,
                                m_mPosition: pPosition,
                                m_nRadius: 2.0,
                                m_nAngle: Math.PI * -0.35,
                                m_nStartLevel: 0,
                            };
                        }
                        pThis.EnterPanoramas(pPanor.m_pPanor);
                    }
                }
                else if (bOutPanor) {
                    pIcon.m_pDrawList(pCanvasCtx, pCanvas.width, pCanvas.height);
                }
            }
        }
        pThis.m_pClick = null;
    }
    DrawIndoorPOI(pTile_, pBuilding_, pFloor_, pPart_) {
        let pThis = this;
        let aBuilding = pThis.m_aRooms;
        for (let pBuilding of aBuilding) {
            if (pTile_ === pBuilding.project_title && pBuilding_ === pBuilding.code) {
                if (!pBuilding.tile) {
                    for (let pTile of pThis.m_aTile) {
                        if (pBuilding.project_title === pTile.m_pName) {
                            pBuilding.tile = pTile;
                            for (let pScene of pTile.m_aScene) {
                                if (pBuilding_ === pScene.building_id) {
                                    pBuilding.scene = pScene;
                                    break;
                                }
                            }
                            break;
                        }
                    }
                }
                if (pBuilding.scene) {
                    for (let pFloor of pBuilding.child) {
                        if (pFloor_ === pFloor.code) {
                            if (!pFloor.layer) {
                                for (let pLayer of pBuilding.scene.layerList) {
                                    if (pFloor_ === pLayer.id) {
                                        pFloor.layer = pLayer;
                                        break;
                                    }
                                }
                            }
                            if (pFloor.layer) {
                                let pTransform = pFloor.layer.m_pLayer.object3D.transform;
                                let pGisPosition = pTransform.position;
                                let pPosition = MiaokitJS.Miaokit.GisToWorld(pGisPosition);
                                let bReset = false;
                                if (pFloor.position) {
                                    let x = Math.abs(pPosition.x - pFloor.position.x);
                                    let y = Math.abs(pPosition.y - pFloor.position.y);
                                    let z = Math.abs(pPosition.z - pFloor.position.z);
                                    if (x > 1.0 || y > 1.0 || z > 1.0) {
                                        bReset = true;
                                    }
                                }
                                else {
                                    bReset = true;
                                }
                                if (bReset) {
                                    pFloor.position = pPosition;
                                    for (let pSite of pFloor.layer.m_pLayer.sites) {
                                        let pID = pSite.id;
                                        for (let pRoom of pFloor.child) {
                                            if (pRoom.code === pID) {
                                                pGisPosition = pTransform.TransformPoint(pSite.position);
                                                pPosition = MiaokitJS.Miaokit.GisToWorld(pGisPosition);
                                                pPosition.y = pFloor.position.y + 1;
                                                pRoom.position = pPosition;
                                                break;
                                            }
                                        }
                                    }
                                }
                                for (let pRoom of pPart_) {
                                    pGisPosition = pTransform.TransformPoint(pRoom.point);
                                    pPosition = MiaokitJS.Miaokit.GisToWorld(pGisPosition);
                                    pPosition.y = pFloor.position.y + 1;
                                    pRoom.position_ = pPosition;
                                }
                                pThis.m_aIcon[5].m_aList = pFloor.child;
                                pThis.m_aIcon[6].m_aList = pPart_;
                            }
                        }
                    }
                }
                break;
            }
        }
    }
    HideIndoorPOI() {
        this.m_aIcon[5].m_aList = null;
        this.m_aIcon[6].m_aList = null;
    }
    ShowOutdoorPOI(pType, aList) {
        let pThis = this;
        for (let pIcon of pThis.m_aIcon) {
            if (pType === pIcon.m_pName) {
                pIcon.m_aList = aList;
                if (aList) {
                    for (let pItem of aList) {
                        let nLat = parseFloat(pItem.lat);
                        let nLng = parseFloat(pItem.long);
                        pItem.m_mGisPos = MiaokitJS.Miaokit.LngLatToGis({ x: nLng, y: nLat }, { x: 0.0, y: 0.0, z: 0.0 }, 168.0);
                        pItem.m_mPosition = MiaokitJS.Miaokit.GisToWorld(pItem.m_mGisPos);
                    }
                }
                break;
            }
        }
    }
    EnterPark(pPark) {
        if (MiaokitJS.m_pConfig.GIS.m_pTerrainServer) {
            pPark.m_pView.m_mTarget.y += 167;
        }
        this.m_pPark = pPark;
        this.m_pApp.m_pCameraCtrl.Fly(MiaokitJS.UTIL.CTRL_MODE.PANORAMA, pPark.m_pView, 0.05);
    }
    EnterPanoramas(pPanor) {
        let pCamera = this.m_pApp.m_pCameraCtrl;
        let mTarget = pCamera.target;
        this.m_pPanoramas.Open(pPanor, {
            m_pTransform: pCamera.m_pTransform,
            m_mTarget: { x: mTarget.x, y: mTarget.y, z: mTarget.z },
            m_nDistance: pCamera.distance,
            m_nPitch: pCamera.pitch,
            m_nYaw: pCamera.yaw,
            m_nField: 60.0
        });
        pCamera.enabled = false;
        webgl_call_web_showVR();
    }
    ClosePanoramas() {
        this.m_pPanoramas.Close();
        this.m_pApp.m_pCameraCtrl.enabled = true;
    }
    EnterCompany(pCompany) {
        this.m_pApp.m_pCameraCtrl.Fly(MiaokitJS.UTIL.CTRL_MODE.PANORAMA, pCompany.m_pView, 0.05);
    }
    EnterRoom(pRoom) {
        let pThis = this;
        for (let pTile of pThis.m_aTile) {
            if (pRoom.m_pTile === pTile.m_pName) {
                if (pTile.m_aIndoor) {
                    for (let pIndoor of pTile.m_aIndoor) {
                        if (pRoom.m_pBuilding === pIndoor.m_pScene.building_id) {
                            let nLayer = 0;
                            for (let pLayer of pIndoor.m_pScene.layerList) {
                                if (pRoom.m_pLayer === pLayer.floor_id) {
                                    for (let pSite of pLayer.m_pLayer.sites) {
                                        if (pRoom.m_pRoom === pSite.id) {
                                            let pTransform = pLayer.m_pLayer.object3D.transform;
                                            let pPoiPos = pSite.position;
                                            let pGisPosition = pTransform.TransformPoint(pPoiPos);
                                            let pPosition = MiaokitJS.Miaokit.GisToWorld(pGisPosition);
                                            let aPart = pRoom.m_pPart;
                                            if (!aPart || aPart.length === 0) {
                                                aPart = [{
                                                        id: 0,
                                                        name: pRoom.m_pRoom,
                                                        position: pRoom.m_pRoom,
                                                        headimageurl: null,
                                                        panoramaurl: null,
                                                        point: pPoiPos
                                                    }];
                                            }
                                            else {
                                                for (let pPart of aPart) {
                                                    for (let pSite_ of pLayer.m_pLayer.sites) {
                                                        if (pPart.position === pSite_.id) {
                                                            pPart.point = pSite_.position;
                                                            continue;
                                                        }
                                                    }
                                                }
                                            }
                                            pThis.m_pRoomViewer.Enter(pIndoor, { m_nIndex: nLayer, m_pLayer: pLayer }, { m_pID: pRoom.m_pRoom, m_mTarget: pPosition, m_mPoiPos: pPoiPos, m_aPart: aPart });
                                            return;
                                        }
                                    }
                                }
                                nLayer++;
                            }
                        }
                    }
                }
            }
        }
    }
    ExitViewer() {
        let pThis = this;
        pThis.m_pRoomViewer.Exit();
    }
    ResetCamera() {
        if (!this.m_pRoomViewer.ResetCamera()) {
            this.m_pApp.m_pCameraCtrl.Jump(MiaokitJS.UTIL.CTRL_MODE.PANORAMA, this.m_pPark.m_pView);
        }
    }
    SwitchCameraMode(nMode) {
        MiaokitJS.App.m_pCameraCtrl.viewMode = nMode;
    }
    ActiveTile(pTile) {
        let pThis = this;
        if (!pTile.m_aScene) {
            pTile.m_aScene = [];
        }
        if (!pTile.m_aIndoor) {
            pTile.m_aIndoor = [];
        }
        if (!pTile.m_aLayer) {
            pTile.m_aLayer = [];
        }
        if (!pTile.m_aSite) {
            pTile.m_aSite = [];
        }
        let AddScene = function (pSceneA) {
            let pID = pSceneA.id;
            let pSceneB = {
                BuildingNum: pID,
                Name: pID,
                building_id: pID,
                building_name: pID,
                ID: "0",
                id: "0",
                Icon: "",
                icon_url: "",
                layerList: [],
                m_pScene: pSceneA,
                m_pView: pTile.m_aView[pID]
            };
            for (let pLayer of pSceneA.layers) {
                pID = pLayer.id;
                let pLayerB = {
                    FloorID: pID,
                    floor_id: pID,
                    id: pID,
                    b_id: pID,
                    name: pID,
                    floor_name: pID,
                    build_name: pSceneB.building_id,
                    build_num: pSceneB.BuildingNum,
                    building_name: pSceneB.building_name,
                    detail: "",
                    icon: null,
                    iconUrl: null,
                    is_default: "0"
                };
                pSceneB.layerList.push(pLayerB);
                pTile.m_aLayer.push(pLayerB);
            }
            for (let pSite of pTile.m_aSite) {
                if (!pSite.layer) {
                    for (let pLayer of pSceneB.layerList) {
                        if (!pSite.floorID || pLayer.id === pSite.floorID) {
                            pSite.layer = pLayer;
                            pSite.floorID = pLayer.floor_id;
                            pSite.buildingID = pSceneB.building_id;
                            break;
                        }
                    }
                }
            }
            pTile.m_aScene.push(pSceneB);
            return pSceneB;
        };
        for (let pSceneA of pTile.m_pTile.scenes) {
            let pScene = null;
            for (let pSceneB of pTile.m_aScene) {
                if (!pSceneB.m_pScene && pSceneA.id === pSceneB.building_id) {
                    pSceneB.m_pScene = pSceneA;
                    pScene = pSceneB;
                    break;
                }
            }
            if (!pScene) {
                pScene = AddScene(pSceneA);
            }
            if (pTile.m_pOutdoorID === pScene.building_id) {
                pTile.m_pOutdoor = pScene;
            }
            else {
                pTile.m_aIndoor.push(new Indoor(pTile, pScene));
            }
        }
        for (let pScene of pTile.m_aScene) {
            let pAdjust = pTile.m_aAdjust[pScene.building_id];
            let pObject = pScene.m_pScene.object3D;
            let bOutdoor = pScene.building_id === (pTile.m_pOutdoor ? pTile.m_pOutdoor.building_id : "");
            pObject.active = bOutdoor ? true : false;
            for (let pLayerA of pScene.m_pScene.layers) {
                if (pAdjust) {
                    let pObject = pLayerA.object3D;
                    if (pAdjust[0]) {
                        pObject.transform.localPosition = pAdjust[0];
                        pAdjust[0].y += pAdjust[2];
                    }
                    if (pAdjust[1]) {
                        pObject.transform.localEuler = pAdjust[1];
                    }
                }
                if (bOutdoor) {
                    pLayerA._Draw();
                }
                for (let pLayerB of pScene.layerList) {
                    if (pLayerB.floor_id === pLayerA.id) {
                        pLayerB.m_pLayer = pLayerA;
                        break;
                    }
                }
            }
        }
        if (0 === --pThis.m_nLoading) {
            MiaokitJS.Track("Actived Tiles");
            pThis["InitComplete"] = function () {
                MiaokitJS.Track("Showed Tiles");
                pThis["InitComplete"] = null;
                for (let pTile of pThis.m_aTile) {
                    let pOutdoor = pTile.m_pOutdoor ? pTile.m_pOutdoor.building_id : "";
                    for (let pScene of pTile.m_aScene) {
                        if (pOutdoor !== pScene.building_id) {
                            for (let pLayer of pScene.layerList) {
                                pLayer.m_pLayer._Draw();
                            }
                        }
                    }
                }
            };
        }
    }
    ShowIndoor(nTile, nScene, nType) {
        let pTile = this.m_aTile[nTile];
        if (pTile) {
            let pScene = pTile.m_aScene[nScene];
            if (pScene && (pScene = pScene.m_pScene)) {
                let pBuilding = pScene.binding;
                if (pBuilding) {
                    let pBuildingObj = pBuilding.object3D;
                    if (pBuildingObj) {
                        if (0 === nType) {
                            pBuildingObj.transparent = true;
                        }
                        else {
                            pBuildingObj.transparent = false;
                            pBuildingObj.active = false;
                        }
                    }
                }
                pScene.object3D.active = true;
                let pPosition = null;
                let nOffset = 0 === nType ? 6.0 : 9.0;
                for (let pLayer of pScene.layers) {
                    let pObject = pLayer.object3D;
                    if (pPosition) {
                        pPosition.y += nOffset;
                        pObject.transform.localPosition = pPosition;
                    }
                    else {
                        pPosition = pObject.transform.localPosition;
                    }
                    pLayer._Draw();
                }
            }
        }
    }
    HideIndoor(nTile, nScene) {
        let pTile = this.m_aTile[nTile];
        if (pTile) {
            let pScene = pTile.m_aScene[nScene];
            if (pScene && (pScene = pScene.m_pScene)) {
                let pBuilding = pScene.binding;
                if (pBuilding) {
                    let pBuildingObj = pBuilding.object3D;
                    if (pBuildingObj) {
                        pBuildingObj.active = true;
                    }
                }
                pScene.object3D.active = false;
            }
        }
    }
    OnDrag(nOffsetX, nOffsetY, nWidth, nHeight) {
        this.m_pPanoramas.Rotate(nOffsetX, nOffsetY, nWidth, nHeight);
    }
    OnClick(nTimes, pPoint) {
        if (1 === nTimes) {
            this.m_pClick = pPoint;
        }
    }
}
new Main();

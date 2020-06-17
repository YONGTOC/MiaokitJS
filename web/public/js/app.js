class City {
    constructor(jData) {
        this.m_nState = 0;
        this.m_nActive = 0;
        this.m_nLife = 0;
        this.m_jData = null;
        this.m_pMaster = null;
        this.m_pRoomViewer = new IndoorViewer();
        this.m_pActivePark = null;
        let pThis = this;
        pThis.m_jData = jData;
        pThis.m_pMaster = MiaokitJS.App.m_pProject;
    }
    Update() {
        let pThis = this;
        if (1 === pThis.m_nActive) {
            pThis.m_nLife = pThis.m_pMaster.tick;
            if (pThis.m_jData.dioramas) {
                for (let pDior of pThis.m_jData.dioramas) {
                    pDior.m_pDior.Update();
                }
            }
        }
        else {
            if (3600 < (pThis.m_pMaster.tick - pThis.m_nLife)) {
                pThis.Unload();
            }
        }
    }
    Enter() {
        let pThis = this;
        if (0 === pThis.m_nActive) {
            if (0 === pThis.m_nState) {
                pThis.Load();
            }
            pThis.m_nActive = 1;
        }
    }
    Leave() {
        let pThis = this;
        if (1 === pThis.m_nActive) {
            pThis.m_nActive = 0;
        }
    }
    EnterDior(pName) {
        let pThis = this;
        let pDior = pThis.GetDior(pName);
        let pCamera = pThis.m_pMaster.camera;
        if (!pDior) {
            return;
        }
        let aOffset = pDior.offset.split(",");
        let nLng = parseFloat(pDior.longitude);
        let nLat = parseFloat(pDior.latitude);
        let nHeight = parseFloat(pDior.height);
        pThis.m_pMaster.FlyLngLat({
            m_nLng: pCamera.lng,
            m_nLat: pCamera.lat,
            m_nDistance: pCamera.distance,
            m_nPitch: pCamera.pitch,
            m_nYaw: pCamera.yaw,
            m_mTarget: pCamera.target
        }, {
            m_nLng: nLng,
            m_nLat: nLat,
            m_nDistance: 3000.0,
            m_nPitch: 30.0,
            m_nYaw: 0.0,
            m_mTarget: { x: aOffset[0], y: nHeight, z: aOffset[2] }
        }, 60, null);
    }
    EnterPark(pName) {
        let pThis = this;
        let pPark = pThis.GetPark(pName);
        let pCamera = pThis.m_pMaster.camera;
        if (!pPark) {
            return;
        }
        pThis.m_pActivePark = pPark;
        let aOffset = pPark.offset.split(",");
        let nLng = parseFloat(pPark.longitude);
        let nLat = parseFloat(pPark.latitude);
        let nHeight = parseFloat(pPark.height);
        pThis.m_pMaster.FlyLngLat({
            m_nLng: pCamera.lng,
            m_nLat: pCamera.lat,
            m_nDistance: pCamera.distance,
            m_nPitch: pCamera.pitch,
            m_nYaw: pCamera.yaw,
            m_mTarget: pCamera.target
        }, {
            m_nLng: nLng,
            m_nLat: nLat,
            m_nDistance: 1000.0,
            m_nPitch: 30.0,
            m_nYaw: 0.0,
            m_mTarget: { x: aOffset[0], y: nHeight, z: aOffset[2] }
        }, 60, function (nStep, nCount) {
            if (nStep === nCount) {
                pThis.m_pActivePark = pPark;
            }
        });
    }
    EnterRoom(pRoom) {
        let pThis = this;
        if (pThis.m_pActivePark) {
            for (let pTile of pThis.m_pActivePark.sves) {
                if (pRoom.m_pTile === pTile.name) {
                    if (pTile.m_aIndoor) {
                        for (let pIndoor of pTile.m_aIndoor) {
                            if (pRoom.m_pBuilding === pIndoor.m_pScene.BuildingID) {
                                let nLayer = 0;
                                for (let pLayer of pIndoor.m_pScene.m_aLayer) {
                                    if (pRoom.m_pLayer === pLayer.ID) {
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
    }
    CloseRoom() {
        let pThis = this;
        if (pThis.m_pActivePark) {
            pThis.m_pRoomViewer.Exit();
        }
    }
    SwitchLayer(pID) {
        let pThis = this;
        if (pThis.m_pActivePark) {
            pThis.m_pRoomViewer.SwitchLayer(pID);
        }
    }
    GetPark(pName) {
        let pThis = this;
        if (pThis.m_jData.parks) {
            for (let pPark of pThis.m_jData.parks) {
                if (pName === pPark.name) {
                    return pPark;
                }
            }
        }
        return null;
    }
    GetDior(pName) {
        let pThis = this;
        if (pThis.m_jData.dioramas) {
            for (let pPark of pThis.m_jData.dioramas) {
                if (pName === pPark.name) {
                    return pPark;
                }
            }
        }
        return null;
    }
    ResetCamera() {
        let pThis = this;
        if (pThis.m_pActivePark) {
            let pCamera = pThis.m_pMaster.camera;
            let nStepCount = Math.ceil(10.0 / MiaokitJS.App.m_nSensitivity);
            let pCurView = null;
            let pDstView = null;
            if (5 === pThis.m_pRoomViewer.m_nState && pThis.m_pRoomViewer.m_nStepCount === pThis.m_pRoomViewer.m_nStep) {
                pCurView = {
                    m_nLng: pCamera.lng,
                    m_nLat: pCamera.lat,
                    m_nDistance: pCamera.distance,
                    m_nPitch: pCamera.pitch,
                    m_nYaw: pCamera.yaw,
                    m_mTarget: pCamera.target
                };
                pDstView = pThis.m_pRoomViewer.m_pDstView;
            }
            else {
                pCurView = {
                    m_nLng: pCamera.lng,
                    m_nLat: pCamera.lat,
                    m_nDistance: pCamera.distance,
                    m_nPitch: pCamera.pitch,
                    m_nYaw: pCamera.yaw,
                    m_mTarget: pCamera.target
                };
                let aOffset = pThis.m_pActivePark.offset.split(",");
                let nHeight = parseFloat(pThis.m_pActivePark.height);
                pDstView = {
                    m_nDistance: 1000.0,
                    m_nPitch: 30.0,
                    m_nYaw: 0.0,
                    m_mTarget: { x: aOffset[0], y: nHeight, z: aOffset[2] }
                };
            }
            let nBias = (pCurView.m_nYaw - pDstView.m_nYaw) % 360.0;
            if (0.0 > nBias) {
                nBias += 360.0;
            }
            if (180.0 < nBias) {
                nBias -= 360.0;
            }
            pCurView.m_nYaw = pDstView.m_nYaw + nBias;
            MiaokitJS.App.m_pProject.Fly(pCurView, pDstView, 10, null);
        }
    }
    Load() {
        let pThis = this;
        if (0 === pThis.m_nState) {
            if (pThis.m_jData.dioramas) {
                let pServer = pThis.m_jData.url + "/";
                for (let pDior of pThis.m_jData.dioramas) {
                    let nLng = parseFloat(pDior.longitude);
                    let nLat = parseFloat(pDior.latitude);
                    let nHeight = parseFloat(pDior.height);
                    let aOffset = pDior.offset.split(",");
                    let aAdjust = pDior.angle.split(",");
                    let pPath = null;
                    let pMark = null;
                    for (let pFile of pDior.files) {
                        if (!pPath) {
                            if (pFile.endsWith("3mx")) {
                                pPath = pServer + pDior.root_path + pFile;
                            }
                        }
                        if (!pMark) {
                            if ("mark.bin" === pFile) {
                                pMark = pServer + pDior.root_path + pFile;
                            }
                        }
                    }
                    pDior.m_pDior = new MiaokitJS.Dioramas3MX(pPath, pMark, {
                        m_pGis: MiaokitJS.App.m_pGis,
                        m_mLngLat: { x: nLng, y: nLat },
                        m_mOffset: { x: aOffset[0], y: aOffset[1], z: aOffset[2] },
                        m_nHeight: nHeight,
                        m_mAdjust: (0.0 < aAdjust[0] ? { x: aAdjust[1], y: aAdjust[2] } : undefined),
                        m_nPitch: undefined === aAdjust[3] ? 0 : aAdjust[3]
                    });
                }
            }
            if (pThis.m_jData.sves) {
                let pServer = pThis.m_jData.url + "/";
                let i = 0;
                for (let pSve of pThis.m_jData.sves) {
                    let pTile = pSve;
                    pTile.m_pDesc = null;
                    pTile.m_pProject = null;
                    pTile.m_pData = null;
                    pTile.m_pTile = null;
                    if (pSve.desc) {
                        pTile.m_pDesc = JSON.parse(pSve.desc);
                    }
                    pTile.m_pProject = pServer + pSve.root_path + "project.lzma.bin";
                    MiaokitJS.Fetch(pTile.m_pProject, function (aData) {
                        pTile.m_pData = aData;
                        if (aData) {
                            pTile.m_pTile = MiaokitJS.Miaokit.LoadTile(pTile.m_pData);
                            pTile.m_pData = null;
                            pThis.ActiveTile(pTile);
                            if (pTile.m_pOutdoor) {
                                pThis.ActiveScene(pTile.m_pOutdoor);
                            }
                        }
                    });
                }
            }
            if (pThis.m_jData.parks) {
                for (let pPark of pThis.m_jData.parks) {
                    if (pPark.desc && 0 < pPark.desc.length) {
                        let pDesc = JSON.parse(pPark.desc);
                        if (pDesc.diorama && pThis.m_jData.dioramas) {
                            for (let pDior of pThis.m_jData.dioramas) {
                                if (pDesc.diorama === pDior.name) {
                                    pPark.diorama = pDior;
                                    break;
                                }
                            }
                        }
                        if (pDesc.sves && pThis.m_jData.sves) {
                            pPark.sves = [];
                            for (let pName of pDesc.sves) {
                                for (let pSve of pThis.m_jData.sves) {
                                    if (pName === pSve.name) {
                                        pSve.m_pDioramas = pPark.diorama;
                                        pPark.sves.push(pSve);
                                        break;
                                    }
                                }
                            }
                        }
                    }
                }
            }
            console.log("Load", pThis.m_jData);
            pThis.m_nState = 1;
        }
    }
    Unload() {
        let pThis = this;
        if (0 !== pThis.m_nState) {
            pThis.m_nState = 0;
        }
    }
    ActiveTile(pTile) {
        let pThis = this;
        let pObject = pTile.m_pTile.object3D;
        let nLng = parseFloat(pTile.longitude);
        let nLat = parseFloat(pTile.latitude);
        let nHeight = parseFloat(pTile.height);
        let aOffset = pTile.offset.split(",");
        let aAngle = pTile.angle.split(",");
        pThis.m_pMaster.gis.AddGameObject(pObject, nLng, nLat, nHeight);
        pObject.transform.Translate({ x: aOffset[0], y: aOffset[1], z: aOffset[2] }, 1);
        pObject.transform.localEuler = { x: aAngle[0], y: aAngle[1], z: aAngle[2] };
        pTile.m_aScene = [];
        pTile.m_aIndoor = [];
        pTile.m_aLayer = [];
        pTile.m_aSite = [];
        for (let pScene_ of pTile.m_pTile.scenes) {
            let pID = pScene_.id;
            if ("大理政务服务中心" === pTile.name) {
                console.log(pTile.name, pID);
            }
            let pScene = {
                ID: pID,
                BuildingID: pID,
                m_nState: 0,
                m_pDioramas: null,
                m_pScene: pScene_,
                m_pView: pTile.m_pDesc.m_aView[pID],
                m_aLayer: [],
            };
            let pAdjust = pTile.m_pDesc.m_aAdjust[pID];
            let bOutdoor = pID === pTile.m_pDesc.m_pOutdoorID;
            for (let pLayer_ of pScene_.layers) {
                if (pAdjust) {
                    let pLayerObj = pLayer_.object3D;
                    if (pAdjust[0]) {
                        pLayerObj.transform.localPosition = pAdjust[0];
                        pAdjust[0].y += pAdjust[2];
                    }
                    if (pAdjust[1]) {
                        pLayerObj.transform.localEuler = pAdjust[1];
                    }
                }
                let pLayer = {
                    ID: pLayer_.id,
                    BuildingID: pID,
                    m_pLayer: pLayer_
                };
                pScene.m_aLayer.push(pLayer);
                pTile.m_aLayer.push(pLayer);
            }
            if (bOutdoor) {
                pTile.m_pOutdoor = pScene;
            }
            else {
                pTile.m_aIndoor.push(new Indoor(pTile, pScene));
            }
            pTile.m_aScene.push(pScene);
            pScene_.object3D.active = false;
        }
    }
    ActiveScene(pScene) {
        if (0 === pScene.m_nState) {
            for (let pLayer of pScene.m_aLayer) {
                pLayer.m_pLayer._Draw();
            }
            pScene.m_nState = 1;
        }
        pScene.m_pScene.object3D.active = true;
    }
    get object() {
        return this.m_jData;
    }
    get state() {
        return this.m_nState;
    }
    get park() {
        return this.m_pActivePark;
    }
    get indoors() {
        let pThis = this;
        if (pThis.m_pActivePark) {
            return pThis.m_pActivePark.sves;
        }
        return null;
    }
}
class Indoor {
    constructor(pTile, pScene) {
        this.m_pTile = null;
        this.m_pScene = null;
        this.m_pBuilding = null;
        this.m_pDioramas = null;
        this.m_pView = null;
        this.m_mTarget = null;
        let pThis = this;
        let mTarget = pScene.m_pView.m_mTarget;
        pThis.m_pTile = pTile;
        pThis.m_pScene = pScene;
        pThis.m_pBuilding = pScene.m_pScene.binding;
        pThis.m_pDioramas = pTile.m_pDioramas;
        pThis.m_mTarget = { x: mTarget.x, y: mTarget.y, z: mTarget.z, w: mTarget.y, h: parseFloat(pTile.height) };
        pThis.m_pView = {
            m_nLng: parseFloat(pTile.longitude),
            m_nLat: parseFloat(pTile.latitude),
            m_mTarget: pThis.m_mTarget,
            m_nDistance: pScene.m_pView.m_nDistance,
            m_nPitch: pScene.m_pView.m_nPitch,
            m_nYaw: pScene.m_pView.m_nYaw
        };
    }
    get name() {
        let pThis = this;
        if (pThis.m_pBuilding) {
            return pThis.m_pScene.BuildingID;
        }
        else {
            return pThis.m_pTile.name;
        }
        return "Default";
    }
    get view() {
        let pThis = this;
        pThis.m_mTarget.y = pThis.m_mTarget.w + pThis.m_mTarget.h;
        return pThis.m_pView;
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
            let pPosition = pThis.view.m_mTarget;
            let pPoint = MiaokitJS.Miaokit.WorldToScreenPoint({ x: pPosition.x, y: pPosition.y, z: pPosition.z });
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
        let nCount = pThis.m_pScene.m_aLayer.length;
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
}
class IndoorViewer {
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
            let mTarget = pThis.m_pIndoor.view.m_mTarget;
            pThis.m_pLayer = pLayer;
            pThis.m_pLayer.m_pView = {
                m_mTarget: { x: mTarget.x, y: mTarget.y + pLayer.m_nIndex * 7.0, z: mTarget.z },
                m_nDistance: 150.0,
                m_nPitch: pThis.m_pIndoor.view.m_nPitch,
                m_nYaw: pThis.m_pIndoor.view.m_nYaw
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
        MiaokitJS.App.m_pProject.DrawIndoorPOI(pThis.m_pIndoor.m_pTile.name, pThis.m_pIndoor.m_pScene.BuildingID, pID, aPart);
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
            pThis.m_pDstView = pThis.m_pIndoor.view;
            pThis.m_pCamera.lng = pThis.m_pDstView.m_nLng;
            pThis.m_pCamera.lat = pThis.m_pDstView.m_nLat;
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
                m_mTarget: pThis.m_pIndoor.view.m_mTarget,
                m_nDistance: 150.0,
                m_nPitch: 20.0,
                m_nYaw: pThis.m_pIndoor.view.m_nYaw
            };
            pThis.m_pDstView = pThis.m_pLayer.m_pView;
            pThis.m_nStep = 0;
            pThis.m_nStepCount = 60;
        }
        else if (4 === nState) {
            MiaokitJS.App.m_pProject.DrawIndoorPOI(pThis.m_pIndoor.m_pTile.name, pThis.m_pIndoor.m_pScene.BuildingID, pThis.m_pLayer.m_pLayer.ID, pThis.m_pRoom.m_aPart);
            pThis.m_pCurView = pThis.m_pLayer.m_pView;
            pThis.m_pDstView = pThis.m_pRoom.m_pView;
            pThis.m_nStep = 0;
            pThis.m_nStepCount = 60;
            pThis.m_pIndoor.ShowOneLayer(pThis.m_pLayer.m_nIndex, pThis.m_pRoom.m_aPart);
        }
        else if (5 === nState) {
            pThis.m_nStep = 0;
            pThis.m_nStepCount = 0;
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
            MiaokitJS.App.m_pProject.Fly(pThis.m_pCurView, pThis.m_pDstView, pThis.m_nStepCount, function (nStep, nCount) {
                if (5 !== pThis.m_nState) {
                    if (2 === pThis.m_nState) {
                        let nDistance = pThis.m_pCurView.m_nDistance + (pThis.m_pDstView.m_nDistance - pThis.m_pCurView.m_nDistance) * (nStep / nCount);
                        nDistance = (150.0 > nDistance ? 150.0 : (300.0 < nDistance ? 300.0 : nDistance)) - 150.0;
                        if (1 === nStep) {
                            nDistance = 300.0;
                        }
                        pThis.m_pIndoor.SetBuildingOpacity(nDistance / 150.0 * 255.0);
                    }
                    else if (3 === pThis.m_nState) {
                        pThis.m_pIndoor.StackLayer(1.0, nStep / nCount, pThis.m_pLayer.m_nIndex);
                    }
                    if (nStep === nCount) {
                        pThis.SetState(pThis.m_nState + 1);
                    }
                }
            });
        }
    }
}
class Main {
    constructor() {
        this.m_aCity = [];
        this.m_pActiveCity = null;
        this.m_pCamera = null;
        this.m_nTick = 0;
        this.m_nViewStep = 0;
        this.m_nViewStepCount = 0;
        this.m_pViewFlush = null;
        this.m_pClick = null;
        this.m_aIcon = [
            { m_pName: "楼宇", m_pPath: "./data/projects/images/building.png", m_pImage: null, m_pDraw: null, m_aList: null, m_pDrawList: null },
            { m_pName: "全景", m_pPath: "./data/projects/images/panor.png", m_pImage: null, m_pDraw: null, m_aList: null, m_pDrawList: null },
            { m_pName: "商圈", m_pPath: "./data/projects/images/business.png", m_pImage: null, m_pDraw: null, m_aList: null, m_pDrawList: null },
            { m_pName: "公交车", m_pPath: "./data/projects/images/bus.png", m_pImage: null, m_pDraw: null, m_aList: null, m_pDrawList: null },
            { m_pName: "停车场", m_pPath: "./data/projects/images/park.png", m_pImage: null, m_pDraw: null, m_aList: null, m_pDrawList: null },
            { m_pName: "公司", m_pPath: "./data/projects/images/building.png", m_pImage: null, m_pDraw: null, m_aList: null, m_pDrawList: null },
            { m_pName: "房间", m_pPath: "./data/projects/images/building.png", m_pImage: null, m_pDraw: null, m_aList: null, m_pDrawList: null },
        ];
        let pThis = this;
        MiaokitJS.App.m_pProject = pThis;
    }
    Preload() {
        let pThis = this;
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
                        return;
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
                            pItem.m_mPosition = MiaokitJS.Miaokit.GisToWorld(pItem.m_mGisPos);
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
                            pItem.m_mPosition = MiaokitJS.Miaokit.GisToWorld(pItem.m_mGisPos);
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
                            pItem.m_mPosition = MiaokitJS.Miaokit.GisToWorld(pItem.m_mGisPos);
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
                            pItem.m_mPosition = MiaokitJS.Miaokit.GisToWorld(pItem.m_mGisPos);
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
        pThis.m_pCamera = MiaokitJS.App.m_pCameraCtrl;
        MiaokitJS.ShaderLab.SetSunlight(0.0, 60.0, 0.1);
        MiaokitJS.Request("GET", "json", "http://infrastructure.yongtoc.com/api/engineering/getInfoByCity?city=桂林", null, null, function (jCity) {
            jCity.response.longitude = "110.309393";
            jCity.response.latitude = "25.282938";
            pThis.SwitchCity(jCity.response);
        });
    }
    Update() {
        let pThis = this;
        pThis.m_nTick++;
        if (pThis.m_nTick % 180 === 0) {
            console.log(pThis.m_pCamera);
        }
        if (pThis.m_nViewStepCount > pThis.m_nViewStep) {
            pThis.m_pViewFlush(++pThis.m_nViewStep, pThis.m_nViewStepCount);
        }
        if (MiaokitJS.App.m_pPanoramas.panor) {
            let nState = MiaokitJS.App.m_pPanoramas.panor.m_nState;
            MiaokitJS.App.m_pPanoramas.Update();
            if (2 < nState) {
                return;
            }
        }
        for (let pCity of pThis.m_aCity) {
            pCity.Update();
        }
        if (MiaokitJS.App.m_pGis) {
            MiaokitJS.App.m_pGis.Update(pThis.m_pCamera.lng, pThis.m_pCamera.lat, pThis.m_pCamera.distance);
        }
    }
    OnGUI(pCanvas, pCanvasCtx) {
        let pThis = this;
        pCanvas.font = "16px Microsoft YaHei";
        pCanvas.strokeStyle = "black";
        pCanvas.lineWidth = 2;
        pCanvas.fillStyle = "#FFFFFF";
        let bOutPanor = true;
        if (MiaokitJS.App.m_pPanoramas.panor) {
            if (2 < MiaokitJS.App.m_pPanoramas.panor.m_nState) {
                if (10 > MiaokitJS.App.m_pPanoramas.panor.m_nRadius) {
                    bOutPanor = false;
                }
            }
        }
        for (let i = 0; i < pThis.m_aIcon.length; i++) {
            let pIcon = pThis.m_aIcon[i];
            if (pIcon.m_pDraw) {
                if (0 === i) {
                    if (bOutPanor) {
                        pIcon.m_aList = null;
                        if (pThis.m_pActiveCity) {
                            pIcon.m_aList = pThis.m_pActiveCity.indoors;
                        }
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
    SwitchCity(jCity) {
        let pThis = this;
        let pCity = null;
        for (let pCity_ of pThis.m_aCity) {
            if (pCity_.object.city === jCity.city) {
                pCity = pCity_;
                break;
            }
        }
        if (!pCity) {
            pCity = new City(jCity);
            pThis.m_aCity.push(pCity);
        }
        if (pCity !== pThis.m_pActiveCity) {
            if (pThis.m_pActiveCity) {
                pThis.m_pActiveCity.Leave();
            }
            pThis.m_pActiveCity = pCity;
            pThis.m_pActiveCity.Enter();
            let nLng = parseFloat(pCity.object.longitude);
            let nLat = parseFloat(pCity.object.latitude);
            MiaokitJS.Miaokit.gisBase = { x: nLng, y: nLat, z: 0.0 };
            pThis.m_pCamera.Jump(MiaokitJS.UTIL.CTRL_MODE.REMOTE, {
                m_nLng: nLng,
                m_nLat: nLat,
                m_nHeight: 18000.0
            });
        }
    }
    EnterDior(pName) {
        let pThis = this;
        if (pThis.m_pActiveCity) {
            pThis.m_pActiveCity.EnterDior(pName);
        }
    }
    EnterPark(pName) {
        let pThis = this;
        if (pThis.m_pActiveCity) {
            pThis.m_pActiveCity.EnterPark(pName);
        }
    }
    EnterRoom(pRoom) {
        let pThis = this;
        if (pThis.m_pActiveCity) {
            pThis.m_pActiveCity.EnterRoom(pRoom);
        }
    }
    CloseRoom() {
        let pThis = this;
        if (pThis.m_pActiveCity) {
            pThis.m_pActiveCity.CloseRoom();
        }
    }
    SwitchLayer(pID) {
        let pThis = this;
        if (pThis.m_pActiveCity) {
            pThis.m_pActiveCity.SwitchLayer(pID);
        }
    }
    EnterPanoramas(pPanor) {
        let pThis = this;
        let mTarget = pThis.m_pCamera.target;
        MiaokitJS.App.m_pPanoramas.Open(pPanor, {
            m_pTransform: pThis.m_pCamera.m_pTransform,
            m_mTarget: { x: mTarget.x, y: mTarget.y, z: mTarget.z },
            m_nDistance: pThis.m_pCamera.distance,
            m_nPitch: pThis.m_pCamera.pitch,
            m_nYaw: pThis.m_pCamera.yaw,
            m_nField: 60.0
        });
        pThis.m_pCamera.enabled = false;
        webgl_call_web_showVR();
    }
    ClosePanoramas() {
        let pThis = this;
        MiaokitJS.App.m_pPanoramas.Close();
        pThis.m_pCamera.enabled = true;
    }
    SetParkInfo(aHierarchical) {
        let pThis = this;
        let pPark = pThis.m_pActiveCity ? pThis.m_pActiveCity.park : null;
        if (pPark && !pPark.m_aHierarchical) {
            pPark.m_aHierarchical = aHierarchical;
        }
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
    DrawIndoorPOI(pTile_, pBuilding_, pFloor_, pPart_) {
        let pThis = this;
        let pPark = pThis.m_pActiveCity ? pThis.m_pActiveCity.park : null;
        if (!pPark) {
            return;
        }
        let aBuilding = pPark.m_aHierarchical;
        if (!aBuilding) {
            return;
        }
        for (let pBuilding of aBuilding) {
            if (pTile_ === pBuilding.project_title && pBuilding_ === pBuilding.code) {
                if (!pBuilding.tile) {
                    for (let pTile of pPark.sves) {
                        if (pBuilding.project_title === pTile.name) {
                            pBuilding.tile = pTile;
                            for (let pScene of pTile.m_aScene) {
                                if (pBuilding_ === pScene.BuildingID) {
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
                                for (let pLayer of pBuilding.scene.m_aLayer) {
                                    if (pFloor_ === pLayer.ID) {
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
                                if (pPart_) {
                                    for (let pRoom of pPart_) {
                                        pGisPosition = pTransform.TransformPoint(pRoom.point);
                                        pPosition = MiaokitJS.Miaokit.GisToWorld(pGisPosition);
                                        pPosition.y = pFloor.position.y + 1;
                                        pRoom.position_ = pPosition;
                                    }
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
    OnGisSwitch() {
        let pThis = this;
        for (let pCity of pThis.m_aCity) {
            if (1 === pCity.state) {
                let data = pCity.object;
                if (data.dioramas) {
                    for (let pDior of data.dioramas) {
                        let pObject = pDior.m_pDior.object3D;
                        let nLng = parseFloat(pDior.longitude);
                        let nLat = parseFloat(pDior.latitude);
                        let nHeight = parseFloat(pDior.height);
                        MiaokitJS.App.m_pGis.MoveGameObject(pObject, nLng, nLat, nHeight);
                    }
                }
                if (data.sves) {
                    for (let pSve of data.sves) {
                        if (pSve.m_pTile) {
                            let pObject = pSve.m_pTile.object3D;
                            let nLng = parseFloat(pSve.longitude);
                            let nLat = parseFloat(pSve.latitude);
                            let nHeight = parseFloat(pSve.height);
                            MiaokitJS.App.m_pGis.MoveGameObject(pObject, nLng, nLat, nHeight);
                        }
                    }
                }
            }
        }
    }
    SwitchCameraMode(nMode) {
        MiaokitJS.App.m_pCameraCtrl.viewMode = nMode;
    }
    ResetCamera() {
        let pThis = this;
        if (pThis.m_pActiveCity) {
            pThis.m_pActiveCity.ResetCamera();
        }
    }
    FlyLngLat(pStart, pEnd, nStepCount, pProcess) {
        let nLngS = pStart.m_nLng;
        let nLngE = pEnd.m_nLng;
        let nLatS = pStart.m_nLat;
        let nLatE = pEnd.m_nLat;
        let pCamera = MiaokitJS.App.m_pCameraCtrl;
        let nThreshold = Math.ceil(nStepCount * 0.5);
        let pPosS = MiaokitJS.Miaokit.LngLatToGis({ x: nLngS, y: nLatS }, pStart.m_mTarget, 0.0);
        let pPosE = MiaokitJS.Miaokit.LngLatToGis({ x: nLngE, y: nLatE }, pEnd.m_mTarget, 0.0);
        let X = pPosE.x - pPosS.x;
        X *= X;
        let Y = pPosE.y - pPosS.y;
        Y *= Y;
        let Z = pPosE.z - pPosS.z;
        Z *= Z;
        let nHeightM = Math.sqrt(X + Y + Z);
        if (nHeightM < pStart.m_nDistance) {
            nHeightM = pStart.m_nDistance;
        }
        let nDistanceS0 = pStart.m_nDistance;
        let nDistanceE0 = nHeightM;
        let nPitchS0 = pStart.m_nPitch;
        let nPitchE0 = 90.0;
        let nYawS0 = pStart.m_nYaw;
        let nYawE0 = 0.0;
        let mTargetS0 = pStart.m_mTarget;
        let mTargetE0 = { x: 0.0, y: 0.0, z: 0.0 };
        let nDistanceS1 = nHeightM;
        let nDistanceE1 = pEnd.m_nDistance;
        let nPitchS1 = 90.0;
        let nPitchE1 = pEnd.m_nPitch;
        let nYawS1 = 0.0;
        let nYawE1 = pEnd.m_nYaw;
        let mTargetS1 = { x: 0.0, y: 0.0, z: 0.0 };
        let mTargetE1 = pEnd.m_mTarget;
        pCamera.ctrlMode = MiaokitJS.UTIL.CTRL_MODE.PANORAMA;
        let Flush = function (nStep, nCount) {
            let nStage = nStep > nThreshold ? 1 : 0;
            let nLerp = nStep / nCount;
            let nLng = nLngS + (nLngE - nLngS) * nLerp;
            let nLat = nLatS + (nLatE - nLatS) * nLerp;
            if (0 === nStage) {
                nLerp = nStep / nThreshold;
                let nDistance = nDistanceS0 + (nDistanceE0 - nDistanceS0) * nLerp;
                let nPitch = nPitchS0 + (nPitchE0 - nPitchS0) * nLerp;
                let nYaw = nYawS0 + (nYawE0 - nYawS0) * nLerp;
                let nX = mTargetS0.x + (mTargetE0.x - mTargetS0.x) * nLerp;
                let nY = mTargetS0.y + (mTargetE0.y - mTargetS0.y) * nLerp;
                let nZ = mTargetS0.z + (mTargetE0.z - mTargetS0.z) * nLerp;
                pCamera.lng = nLng;
                pCamera.lat = nLat;
                pCamera.distance = nDistance;
                pCamera.pitch = nPitch;
                pCamera.yaw = nYaw;
                pCamera.target = { x: nX, y: nY, z: nZ };
            }
            else {
                nLerp = (nStep - nThreshold) / (nCount - nThreshold);
                let nDistance = nDistanceS1 + (nDistanceE1 - nDistanceS1) * nLerp;
                let nPitch = nPitchS1 + (nPitchE1 - nPitchS1) * nLerp;
                let nYaw = nYawS1 + (nYawE1 - nYawS1) * nLerp;
                let nX = mTargetS1.x + (mTargetE1.x - mTargetS1.x) * nLerp;
                let nY = mTargetS1.y + (mTargetE1.y - mTargetS1.y) * nLerp;
                let nZ = mTargetS1.z + (mTargetE1.z - mTargetS1.z) * nLerp;
                pCamera.lng = nLng;
                pCamera.lat = nLat;
                pCamera.distance = nDistance;
                pCamera.pitch = nPitch;
                pCamera.yaw = nYaw;
                pCamera.target = { x: nX, y: nY, z: nZ };
            }
            if (pProcess) {
                pProcess(nStep, nCount);
            }
        };
        this.m_nViewStep = 0;
        this.m_nViewStepCount = nStepCount;
        this.m_pViewFlush = Flush;
    }
    Fly(pStart, pEnd, nStepCount, pProcess) {
        let pCamera = MiaokitJS.App.m_pCameraCtrl;
        let mTargetS = pStart.m_mTarget;
        let mTargetE = pEnd.m_mTarget;
        pCamera.ctrlMode = MiaokitJS.UTIL.CTRL_MODE.PANORAMA;
        let Flush = function (nStep, nCount) {
            let nLerp = nStep / nCount;
            let nDistance = pStart.m_nDistance + (pEnd.m_nDistance - pStart.m_nDistance) * nLerp;
            let nPitch = pStart.m_nPitch + (pEnd.m_nPitch - pStart.m_nPitch) * nLerp;
            let nYaw = pStart.m_nYaw + (pEnd.m_nYaw - pStart.m_nYaw) * nLerp;
            let nX = mTargetS.x + (mTargetE.x - mTargetS.x) * nLerp;
            let nY = mTargetS.y + (mTargetE.y - mTargetS.y) * nLerp;
            let nZ = mTargetS.z + (mTargetE.z - mTargetS.z) * nLerp;
            pCamera.distance = nDistance;
            pCamera.pitch = nPitch;
            pCamera.yaw = nYaw;
            pCamera.target = { x: nX, y: nY, z: nZ };
            if (pProcess) {
                pProcess(nStep, nCount);
            }
        };
        this.m_nViewStep = 0;
        this.m_nViewStepCount = nStepCount;
        this.m_pViewFlush = Flush;
    }
    OnDrag(nOffsetX, nOffsetY, nWidth, nHeight) {
        MiaokitJS.App.m_pPanoramas.Rotate(nOffsetX, nOffsetY, nWidth, nHeight);
    }
    OnClick(nTimes, pPoint) {
        if (1 === nTimes) {
            this.m_pClick = pPoint;
        }
    }
    get tick() {
        return this.m_nTick;
    }
    get camera() {
        return this.m_pCamera;
    }
    get gis() {
        return MiaokitJS.App.m_pGis;
    }
}
new Main();


class City {
    /// 城市构造函数。
    public constructor(jData) {
        let pThis = this;
        //jData.dioramas = null;
        //jData.sves = null;
        //jData.parks = null;
        pThis.m_jData = jData;
        pThis.m_pMaster = MiaokitJS.App.m_pProject;
    }

    /// 城市状态更新。
    public Update(): void {
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

    /// 进入城市范围。
    public Enter(): void {
        let pThis = this;

        if (0 === pThis.m_nActive) {
            if (0 === pThis.m_nState) {
                pThis.Load();
            }

            pThis.m_nActive = 1;
        }
    }

    /// 离开城市范围。
    public Leave(): void {
        let pThis = this;

        if (1 === pThis.m_nActive) {
            pThis.m_nActive = 0;
        }
    }

    /// 进入实景范围。
    public EnterDior(pName): void {
        let pThis = this;
        let pDior = pThis.GetDior(pName);
        let pCamera = pThis.m_pMaster.camera;

        if (!pDior) {
            return;
        }

        let aOffset = pDior.offset.split(",");
        let nLng = parseFloat(pDior.longitude);
        let nLat = parseFloat(pDior.latitude)
        let nHeight = parseFloat(pDior.height);

        pThis.m_pMaster.FlyLngLat(
            {
                m_nLng: pCamera.lng,
                m_nLat: pCamera.lat,
                m_nDistance: pCamera.distance,
                m_nPitch: pCamera.pitch,
                m_nYaw: pCamera.yaw,
                m_mTarget: pCamera.target
            },
            {
                m_nLng: nLng,
                m_nLat: nLat,
                m_nDistance: 3000.0,
                m_nPitch: 30.0,
                m_nYaw: 0.0,
                m_mTarget: { x: aOffset[0], y: nHeight, z: aOffset[2] }
            },
            60, null);
    }

    /// 进入园区范围。
    public EnterPark(pName): void {
        let pThis = this;
        let pPark = pThis.GetPark(pName);
        let pCamera = pThis.m_pMaster.camera;

        if (!pPark) {
            return;
        }

        pThis.m_pActivePark = pPark;

        let aOffset = pPark.offset.split(",");
        let nLng = parseFloat(pPark.longitude);
        let nLat = parseFloat(pPark.latitude)
        let nHeight = parseFloat(pPark.height);

        pThis.m_pMaster.FlyLngLat(
            {
                m_nLng: pCamera.lng,
                m_nLat: pCamera.lat,
                m_nDistance: pCamera.distance,
                m_nPitch: pCamera.pitch,
                m_nYaw: pCamera.yaw,
                m_mTarget: pCamera.target
            },
            {
                m_nLng: nLng,
                m_nLat: nLat,
                m_nDistance: 1000.0,
                m_nPitch: 30.0,
                m_nYaw: 0.0,
                m_mTarget: { x: aOffset[0], y: nHeight, z: aOffset[2] }
            },
            60,
            function (nStep, nCount) {
                if (nStep === nCount) {
                    pThis.m_pActivePark = pPark;
                }
            });
    }

    /// 进入房间。
    public EnterRoom(pRoom): void {
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

    /// 退出房间回到园区。
    public CloseRoom(): void {
        let pThis = this;

        if (pThis.m_pActivePark) {
            pThis.m_pRoomViewer.Exit();
        }
    }

    /// 切换当前楼层。
    public SwitchLayer(pID): void {
        let pThis = this;

        if (pThis.m_pActivePark) {
            pThis.m_pRoomViewer.SwitchLayer(pID);
        }
    }

    /// 进入园区。
    public GetPark(pName): any {
        let pThis = this;

        if (pThis.m_jData.parks) {
            for (let pPark of pThis.m_jData.parks) {
                if (pName === pPark.name) {
                    return pPark;
                }
            }
        }

        /*
        if (pThis.m_jData.dioramas) {
            for (let pPark of pThis.m_jData.dioramas) {
                if (pName === pPark.name) {
                    return pPark;
                }
            }
        }
        */

        return null;
    }

    /// 进入实景。
    public GetDior(pName): any {
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

    /// 重置摄像机状态。
    public ResetCamera(): void {
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

    /// 加载城市数据。
    private Load(): void {
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

    /// 卸载城市数据。
    private Unload(): void {
        let pThis = this;

        if (0 !== pThis.m_nState) {
            pThis.m_nState = 0;
        }
    }

    /// SVE瓦片激活。
    private ActiveTile(pTile): void {
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

                pScene.m_aLayer.push(pLayer)
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

    /// 激活场景显示。
    private ActiveScene(pScene): void {
        if (0 === pScene.m_nState) {
            for (let pLayer of pScene.m_aLayer) {
                pLayer.m_pLayer._Draw();
            }

            pScene.m_nState = 1;
        }

        pScene.m_pScene.object3D.active = true;
    }


    /// 获取城市数据对象。
    public get object(): any {
        return this.m_jData;
    }

    /// 获取城市数据状态。
    public get state(): any {
        return this.m_nState;
    }

    /// 获取当前活动园区。
    public get park(): any {
        return this.m_pActivePark;
    }

    /// 获取室内场景列表。
    public get indoors(): any {
        let pThis = this;

        if (pThis.m_pActivePark) {
            return pThis.m_pActivePark.sves;
        }

        return null;
    }


    /// 城市数据加载状态：0-未加载、1-已加载。
    private m_nState: number = 0;
    /// 城市激活状态：0-未进入、1-当前处于。
    private m_nActive: number = 0;
    /// 城市活动心跳。
    private m_nLife: number = 0;
    /// 城市描述数据。
    private m_jData: any = null;
    /// 城市管理员。
    private m_pMaster: Main = null;
    /// 室内查看器。
    private m_pRoomViewer: IndoorViewer = new IndoorViewer();
    /// 当前活动园区。
    private m_pActivePark: any = null;
}

class Indoor {
    /// 构造函数。
    public constructor(pTile, pScene) {
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

    /// 场景名称。
    public get name() {
        let pThis = this;

        if (pThis.m_pBuilding) {
            return pThis.m_pScene.BuildingID;
        }
        else {
            return pThis.m_pTile.name;
        }

        return "Default";
    }

    /// 获取观察视图。
    public get view() {
        let pThis = this;

        pThis.m_mTarget.y = pThis.m_mTarget.w + pThis.m_mTarget.h;

        return pThis.m_pView;
    }

    /// 场景中心点屏幕坐标。
    public get screenPoint() {
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

    /// 聚焦大楼。
    public FocusBuilding() {
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

    /// 刷新大楼透明度。
    public SetBuildingOpacity(nOpacity) {
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

    /// 层叠楼层。
    public StackLayer(nOffset, nRate, nStressLayer) {
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

    /// 显示单层。
    public ShowOneLayer(nIndex, aRoom) {
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

    /// 显示楼层列表。
    public ShowLayerList(nIndex) {
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

    /// 切换楼层。
    public SwitchRoom(nIndex) {
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

    /// 聚焦房间。
    public FocusRoom(pLayer, aPoint) {
        let bAdd = false;

        for (let pPoint of aPoint) {
            pLayer.HighlightRoom(pPoint.point, bAdd);
            bAdd = true;
        }
    }

    /// 关闭室内显示和取消聚焦大楼
    public Deactive() {
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


    /// 瓦片对象。
    private m_pTile: any = null;
    /// 场景对象。
    private m_pScene: any = null;
    /// 建筑对象。
    private m_pBuilding: any = null;
    /// 实景模型对象。
    private m_pDioramas: any = null;
    /// 内景整体观察视角。
    private m_pView: any = null;
    /// 坐标位置。
    private m_mTarget: any = null;
}

class IndoorViewer {
    /// 房间浏览器：0未开始->1大楼整体->2楼层展开->3聚焦楼层->4聚焦房间->5自由交互->6进行退出->7完成退出。
    public constructor() {
    }

    /// 进入房间。
    public Enter(pIndoor, pLayer, pRoom): void {
        let pThis = this;

        pThis.m_pCamera = MiaokitJS.App.m_pCameraCtrl;

        if (pThis.m_pIndoor !== pIndoor) {
            if (pThis.m_pIndoor) {
                pThis.m_pIndoor.Deactive();
            }

            pThis.m_pIndoor = pIndoor;

            /// 重新从大楼整体开始浏览
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

            /// 当前已经展开楼层，重新从聚焦楼层开始浏览
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

            /// 当前已经聚焦楼层，重新开始聚焦房间
            if (2 < pThis.m_nState) {
                pThis.SetState(4);
            }
        }
    }

    /// 退出房间。
    public Exit(): void {
        let pThis = this;

        if (1 < pThis.m_nState) {
            pThis.SetState(6);
        }
        else {
            pThis.SetState(7);
        }

        webgl_call_web_hide_floor_list();
    }

    /// 切换楼层。
    public SwitchLayer(pID): void {
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

    /// 切换浏览状态。
    private SetState(nState): void {
        let pThis = this;

        pThis.m_nState = nState;

        // 大楼整体
        if (1 === nState) {
            pThis.m_pCurView = {
                m_mTarget: pThis.m_pCamera.target,
                m_nDistance: pThis.m_pCamera.distance,
                m_nPitch: pThis.m_pCamera.pitch,
                m_nYaw: pThis.m_pCamera.yaw
            }

            pThis.m_pDstView = pThis.m_pIndoor.view;

            pThis.m_pCamera.lng = pThis.m_pDstView.m_nLng;
            pThis.m_pCamera.lat = pThis.m_pDstView.m_nLat;

            pThis.m_nStep = 0;
            pThis.m_nStepCount = 60;

            MiaokitJS.App.m_pProject.HideIndoorPOI();

            pThis.m_pIndoor.FocusBuilding();
        }
        // 楼层展开
        else if (2 === nState) {
            pThis.m_pCurView = pThis.m_pIndoor.m_pView;

            pThis.m_pDstView = {
                m_mTarget: pThis.m_pCurView.m_mTarget,
                m_nDistance: 150.0,
                m_nPitch: 20.0,
                m_nYaw: pThis.m_pCurView.m_nYaw
            }

            pThis.m_nStep = 0;
            pThis.m_nStepCount = 60;

            MiaokitJS.App.m_pProject.HideIndoorPOI();
        }
        // 聚焦楼层
        else if (3 === nState) {
            pThis.m_pIndoor.SetBuildingOpacity(255);

            pThis.m_pCurView = {
                m_mTarget: pThis.m_pIndoor.view.m_mTarget,
                m_nDistance: 150.0,
                m_nPitch: 20.0,
                m_nYaw: pThis.m_pIndoor.view.m_nYaw
            }

            pThis.m_pDstView = pThis.m_pLayer.m_pView;

            pThis.m_nStep = 0;
            pThis.m_nStepCount = 60;
        }
        // 聚焦房间
        else if (4 === nState) {
            MiaokitJS.App.m_pProject.DrawIndoorPOI(pThis.m_pIndoor.m_pTile.name, pThis.m_pIndoor.m_pScene.BuildingID, pThis.m_pLayer.m_pLayer.ID, pThis.m_pRoom.m_aPart);

            pThis.m_pCurView = pThis.m_pLayer.m_pView;
            pThis.m_pDstView = pThis.m_pRoom.m_pView;

            pThis.m_nStep = 0;
            pThis.m_nStepCount = 60;

            pThis.m_pIndoor.ShowOneLayer(pThis.m_pLayer.m_nIndex, pThis.m_pRoom.m_aPart);
        }
        // 自由交互
        else if (5 === nState) {
            pThis.m_nStep = 0;
            pThis.m_nStepCount = 0;

            pThis.m_pIndoor.ShowLayerList(pThis.m_pLayer.m_nIndex);
        }
        // 进行退出
        else if (6 === nState) {
            if (pThis.m_pIndoor) {
                pThis.m_pCurView = {
                    m_mTarget: pThis.m_pCamera.target,
                    m_nDistance: pThis.m_pCamera.distance,
                    m_nPitch: pThis.m_pCamera.pitch,
                    m_nYaw: pThis.m_pCamera.yaw
                }

                pThis.m_pDstView = pThis.m_pIndoor.m_pView;

                pThis.m_nStep = 0;
                pThis.m_nStepCount = 60;

                MiaokitJS.App.m_pProject.HideIndoorPOI();
            }
        }
        // 完成退出
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
                    /// 刷新大楼透明度
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


    /// 当前浏览进度。
    public m_nState: number = 0;
    /// 当前步进。
    public m_nStep: number = 0;
    /// 当前步进总数。
    public m_nStepCount: number = 0;
    /// 当前视图。
    public m_pCurView: any = null;
    /// 当前目标视图。
    public m_pDstView: any = null;
    /// 当前内景。
    public m_pIndoor: any = null;
    /// 当前楼层。
    public m_pLayer: any = null;
    /// 当前房间。
    public m_pRoom: any = null;
    /// 摄像机控制器。
    public m_pCamera: any = null;
}

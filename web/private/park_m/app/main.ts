
declare var MiaokitJS: any;

class Indoor {
    /// 构造函数。
    public constructor(pTile, pScene) {
        this.m_pTile = pTile;
        this.m_pScene = pScene;
        this.m_pBuilding = pScene.m_pScene.binding;
    }

    /// 场景中心点屏幕坐标。
    public get screenPoint() {
        if (this.m_pBuilding) {
            let pBuildingObj = this.m_pBuilding.object3D;
            if (pBuildingObj) {
                let pPosition = pBuildingObj.transform.regionPosition;
                let pPoint = MiaokitJS.Miaokit.WorldToScreenPoint(pPosition);

                return pPoint;
            }
        }

        return null;
    }

    /// 打开室内场景。
    public Open() {
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

    /// 关闭室内场景。
    public Close() {
        let pBuildingObj = this.m_pBuilding.object3D;
        if (pBuildingObj) {
            pBuildingObj.highlight = false;
            pBuildingObj.opacity = 255;
        }

        this.m_pScene.m_pScene.object3D.active = false;
    }

    /// 刷新室内场景显示。
    public Update(mEyePos) {
        let pBuildingObj = this.m_pBuilding.object3D;
        if (pBuildingObj) {
            let mPos = pBuildingObj.transform.regionPosition;
            let x = mEyePos.x - mPos.x; x *= x;
            let y = mEyePos.y - mPos.y; y *= y;
            let z = mEyePos.z - mPos.z; z *= z;
            let nDistance = Math.sqrt(x + y + z);

            nDistance = (100 > nDistance ? 100 : (500 < nDistance ? 500 : nDistance)) - 100;

            pBuildingObj.opacity = nDistance / 400.0 * 255.0;
        }
    }


    /// 瓦片对象。
    public m_pTile: any = null;
    /// 场景对象。
    public m_pScene: any = null;
    /// 建筑类型：0-无模型、1-建模模型、2-实景模型、3-GIS模型
    public m_nBuildingType: number = 0;
    /// 建筑对象。
    public m_pBuilding: any = null;
    /// 屏幕显示坐标。
    public m_pScreenPos: any = null;
}

class Main {
    /// 构造函数。
    public constructor() {
        let pThis = this;

        pThis.m_pApp = MiaokitJS.App;
        pThis.m_pApp.m_pProject = this;
    }

    /// 数据预加载。
    public Preload() {
        let pThis = this;

        pThis.m_aDioramas = MiaokitJS.m_pConfig.DIORS;
        pThis.m_aTile = MiaokitJS.m_pConfig.SVE;
        pThis.m_nLoading = pThis.m_aTile ? pThis.m_aTile.length : 0;

        pThis.LoadNavData();
    }

    /// 开始主程序。
    public Start(): void {
        let pThis = this;

        if (!pThis.m_pCity) {
            /// 根据定位获取城市信息，默认设置桂林市
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
            m_nDistance: 300.000,
            m_nPitch: 20.0,
            m_nYaw: 90.0
        });

        MiaokitJS.ShaderLab.SetSunlight(0.0, 60.0, 0.1);
    }


    private iii = 0;
    /// 帧更新方法。
    public Update(): void {
        if ((this.iii++) % 180 === 0) {
            console.log(this.m_pApp.m_pCameraCtrl);
        }

        if (this.m_pPanoramas.panor) {
            let nState = this.m_pPanoramas.panor.m_nState;

            this.m_pPanoramas.Update();

            if (2 < nState) {
                return;
            }
        }

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
            // 距屏幕中心1000像素距离内，哪个距离小锁定那个场景，如果室内完全显示就不再切换
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

                        let x = pPoint.x - nCenter.x; x *= x;
                        let y = pPoint.y - nCenter.y; y *= y;

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

            /// 刷新主进度条
            if (this.m_nLoading || this["InitComplete"]) {
            }
            /// 刷新辅进度条
            else {
            }
        }
        else {
            /// 关闭主进度条，启动完成
            if (this["InitComplete"]) {
                this.m_nTaskMax = 0;
                this["InitComplete"]();
            }
            /// 在运行过程中可能随时触发加载任务，此时显示辅进度条
            else {
                /// 如果上一帧有显示进度条，在此隐藏进度条
                if (0 < this.m_nTaskMax) {
                    MiaokitJS.Track("Loaded Tasks");
                    this.m_nTaskMax = 0;
                }
            }
        }
    }

    /// 响应UI绘制。
    public OnGUI(pCanvas, pCanvasCtx): void {
        let nTaskCount = MiaokitJS.Miaokit.progress;
        if (0 !== nTaskCount) {
            return;
        }

        pCanvas.font = "16px Microsoft YaHei";
        pCanvas.strokeStyle = "black";
        pCanvas.lineWidth = 2;
        pCanvas.fillStyle = "#FFFFFF";

        for (let pTile of this.m_aTile) {
            if (pTile.m_aIndoor) {
                for (let pIndoor of pTile.m_aIndoor) {
                    let pPoint = pIndoor.screenPoint;
                    let pText = pIndoor.m_pScene.building_id;
                    let pRect = pCanvasCtx.measureText(pText);

                    pPoint.x = pPoint.x * pCanvas.width;
                    pPoint.y = pPoint.y * pCanvas.height;

                    pCanvasCtx.strokeText(pText, pPoint.x - pRect.width / 2, pPoint.y);
                    pCanvasCtx.fillText(pText, pPoint.x - pRect.width / 2, pPoint.y);
                }
            }
        }

        let aPanors = MiaokitJS.m_pConfig.PANORS;
        if (aPanors) {
            for (let pPanor of aPanors) {
                let pPoint = this.m_pPanoramas.ScreenPoint(pPanor);
                let pText = pPanor.m_pName;
                let pRect = pCanvasCtx.measureText(pText);

                pPoint.x = pPoint.x * pCanvas.width;
                pPoint.y = pPoint.y * pCanvas.height;

                pCanvasCtx.strokeText(pText, pPoint.x - pRect.width / 2, pPoint.y);
                pCanvasCtx.fillText(pText, pPoint.x - pRect.width / 2, pPoint.y);
            }
        }
    }

    /// 进入园区。
    public EnterPark(pPark): void {
        this.m_pApp.m_pCameraCtrl.Fly(MiaokitJS.UTIL.CTRL_MODE.PANORAMA, pPark.m_pView, 0.05);
    }

    /// 进入全景图。
    public EnterPanoramas(pPanor): void {
        let pCamera = this.m_pApp.m_pCameraCtrl;
        let mTarget = pCamera.target;

        this.m_pPanoramas.Open(MiaokitJS.m_pConfig.PANORS[0], {
            m_pTransform: pCamera.m_pTransform,
            m_mTarget: { x: mTarget.x, y: mTarget.y, z: mTarget.z },
            m_nDistance: pCamera.distance,
            m_nPitch: pCamera.pitch,
            m_nYaw: pCamera.yaw,
            m_nField: 60.0
        });

        pCamera.enabled = false;
    }

    /// 关闭全景图。
    public ClosePanoramas(): void {
        this.m_pPanoramas.Close();
        this.m_pApp.m_pCameraCtrl.enabled = true;
    }

    /// 进入企业。
    public EnterCompany(pCompany): void {
        // 分两步执行。聚焦半透明楼栋，叠加楼层并高亮企业对应区域
        // 如果尚未完成进入园区，则立即切换到园区

        //if (pCamera.m_pFlyTask) {
        //}

    }

    /// 加载导航后台数据。
    private LoadNavData(): void {
        let pThis = this;

        let LoadData = function (pTile, aServer, pCallback) {
            MiaokitJS.Request("GET", "json", aServer[0], null, null, function (pSceneList) {
                if (pSceneList && pSceneList.response) {
                    let aScene = pSceneList.response;
                    let nSceneCount = aScene.length;
                    let nSceneIndex = 0;
                    let aLayer = [];
                    let aSite = null;

                    for (let i = 0; i < nSceneCount; i++) {
                        let pScene = aScene[i];
                        pScene.id = pScene.ID;
                        pScene.icon_url = pScene.Icon;
                        pScene.building_id = pScene.BuildingNum;
                        pScene.building_name = pScene.Name;
                        pScene.layerList = null;

                        MiaokitJS.Request("GET", "json", aServer[1] + pScene.id, null, null, function (pLayerList) {
                            if (pLayerList && pLayerList.response) {
                                let aLayer_ = pLayerList.response;

                                for (let pLayer of aLayer_) {
                                    pLayer.id = pLayer.FloorID;
                                    pLayer.b_id = pLayer.FloorID;
                                    pLayer.floor_id = pLayer.FloorID;
                                    pLayer.floor_name = pLayer.name;
                                    pLayer.build_num = pLayer.building_name;
                                    pLayer.build_name = pLayer.building_name;
                                    pLayer.icon = pLayer.iconUrl;
                                    pLayer.detail = pLayer.name;
                                    pLayer.is_default = "0";
                                    pLayer.scene = pScene;
                                    pLayer.sites = [];

                                    aLayer.push(pLayer);
                                }

                                pScene.layerList = aLayer_;
                            }

                            if (++nSceneIndex === nSceneCount) {
                                MiaokitJS.Request("GET", "json", aServer[2], null, null, function (pSiteList) {
                                    if (pSiteList && pSiteList.response) {
                                        aSite = pSiteList.response;

                                        for (let pSite of aSite) {
                                            pSite.HyID = parseInt(pSite.HyID);
                                            pSite.buildingID = "默认值";
                                            pSite.layer = null;

                                            // 已经将非公共设施图标类型ID设为0
                                            if (2 > pSite.HyID) {
                                                pSite.HyID = 0;
                                            }

                                            for (let pLayer of aLayer) {
                                                if (pLayer.id === pSite.floorID) {
                                                    pSite.layer = pLayer;
                                                    if (pLayer.scene) {
                                                        pSite.buildingID = pScene.building_id;
                                                    }

                                                    pLayer.sites.push(pSite);

                                                    break;
                                                }
                                            }
                                        }
                                    }

                                    pTile.m_aScene = aScene;
                                    pTile.m_aLayer = aLayer;
                                    pTile.m_aSite = aSite;

                                    pCallback(pTile);
                                });
                            }
                        });
                    }
                }
                else {
                    console.error("加载后台数据失败！");
                    pCallback(pTile);
                }
            });
        }

        for (let pTile of pThis.m_aTile) {
            if (pTile.m_pEasygoServer) {
                let aServer = [
                    pTile.m_pEasygoServer + "api/info/getBuildingListH5.php",
                    pTile.m_pEasygoServer + "api/info/getFloorListH5.php?id=",
                    pTile.m_pEasygoServer + "api/info/getroomlistH5.php",
                ];

                pTile.m_nLoading = 1;

                LoadData(pTile, aServer, function (pTile_) {
                    pTile_.m_nLoading--;

                    if (0 === pTile_.m_nLoading && pTile_.m_pWait) {
                        pTile_.m_pWait(pTile_);
                    }
                });
            }
        }
    }

    /// SVE瓦片激活方法。
    private ActiveTile(pTile): void {
        let pThis = this;

        if (0 !== pTile.m_nLoading) {
            pTile.m_pWait = function (pTile_) {
                pThis.ActiveTile(pTile_);
            };

            return;
        }

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
                m_pScene: pSceneA
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

                pSceneB.layerList.push(pLayerB)
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
        }

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
            let bOutdoor = pScene.building_id === pTile.m_pOutdoor.building_id;

            pObject.active = bOutdoor ? true : false;
            console.error("cccccccccccccccccc");
            /// 叠加当前场景楼层
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
                    console.error("3-------------------");
                    pLayerA._Draw();
                    console.error("4-------------------");
                }

                /// 前后端楼层对象绑定
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
                    for (let pScene of pTile.m_aScene) {
                        if (pTile.m_pOutdoor.building_id !== pScene.building_id) {
                            for (let pLayer of pScene.layerList) {
                                pLayer.m_pLayer._Draw();
                            }
                        }
                    }
                }
            }
        }
    }

    /// 显示室内。
    private ShowIndoor(nTile, nScene, nType): void {
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

    /// 隐藏室内。
    private HideIndoor(nTile, nScene): void {
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

    /// 响应拖拽事件。
    private OnDrag(nOffsetX, nOffsetY, nWidth, nHeight): void {
        this.m_pPanoramas.Rotate(nOffsetX, nOffsetY, nWidth, nHeight);
    }


    /// 应用框架对象。
    private m_pApp: any = null;
    /// GIS对象。
    private m_pGis: any = null;
    /// 全景图对象。
    private m_pPanoramas: any = null;
    /// 实景对象数组。
    private m_aDioramas: any[] = null;
    /// SVE瓦片数组。
    private m_aTile: any[] = null;
    /// 当前瓦片加载进度。
    private m_nLoading: number = 0;
    /// 当前进度条最大值。
    private m_nTaskMax: number = 0;

    /// 当前聚焦城市。
    private m_pCity: any = null;
    /// 当前锁定室内场景。
    private m_pIndoor: any = null;
}

new Main();

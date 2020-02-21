
declare var MiaokitJS: any;
declare var GLOBAL: any;

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

        MiaokitJS.Track("LoadServerData");

        pThis.LoadData(function (pTile) {
            MiaokitJS.Track("LoadServerData End");

            pThis.m_pTile = pTile;

            if (pThis.m_pWait) {
                pThis.m_pWait();
            }
        });
    }

    /// 开始主程序。
    public Start(): void {
        let pThis = this;

        pThis.MajorProgress(true, 0.4);

        pThis.m_pApp.m_pCameraCtrl.Jump(MiaokitJS.UTIL.CTRL_MODE.PANORAMA, {
            m_nLng: 110.344301,
            m_nLat: 25.272208,
            m_mTarget: { x: 0.0, y: 0.0, z: 0.0 },
            m_nDistance: 300.0,
            m_nPitch: 30.0,
            m_nYaw: 21
        });
    }

    /// 主程序帧更。
    public Update(): void {
        let pThis = this;
        let nTaskCount = MiaokitJS.Miaokit.progress;

        if (0 < nTaskCount) {
            pThis.m_nTaskMax = pThis.m_nTaskMax < nTaskCount ? nTaskCount : pThis.m_nTaskMax;

            /// 刷新主进度条
            if (pThis.OnInit) {
                pThis.MajorProgress(true, 0.4 + (1.0 - (nTaskCount / pThis.m_nTaskMax)) * 0.6);
            }
            /// 刷新辅进度条
            else {
                pThis.MinorProgress(true, 1.0 - (nTaskCount / pThis.m_nTaskMax));
            }
        }
        else {
            /// 关闭主进度条，启动完成
            if (pThis.OnInit) {
                pThis.m_nTaskMax = 0;
                pThis.MajorProgress(false, 1.0);

                pThis.OnInit();
            }
            /// 在运行过程中可能随时触发加载任务，此时显示辅进度条
            else {
                /// 如果上一帧有显示进度条，在此隐藏进度条
                if (0 < pThis.m_nTaskMax) {
                    pThis.m_nTaskMax = 0;
                    pThis.MinorProgress(false, 1.0);
                }
            }
        }
    }

    /// SVE瓦片激活方法。
    private ActiveTile(pTile): void {
        let pThis = this;

        if (!pThis.m_pTile) {
            pThis.m_pWait = function () {
                pThis.ActiveTile(pTile);
            };

            return;
        }

        let pOutdoor = null;

        for (let pScene3D of pTile.m_pTile.scenes) {
            let pScene = null;

            /// 前后端场景对象绑定
            for (let pSceneData of pTile.m_aScene) {
                if (!pSceneData.scene && pScene3D.id === pSceneData.building_id) {
                    pSceneData.scene = pScene3D;
                    pScene = pSceneData;
                    break;
                }
            }

            /// 后端可能没有录入外景
            if (!pScene && 1 === pScene3D.layers.length) {
                if (pOutdoor) {
                    console.log("该场景后台未录入信息", pScene3D);
                    continue;
                }

                let pID = pScene3D.id;

                pOutdoor = {
                    BuildingNum: pID,
                    Name: pID,
                    building_id: pID,
                    building_name: pID,
                    ID: "0",
                    id: "0",
                    Icon: "",
                    icon_url: "",
                    layerList: [null],
                    scene: pScene3D
                };

                for (let pLayer of pScene3D.layers) {
                    pID = pLayer.id;

                    pOutdoor.layerList[0] = {
                        FloorID: pID,
                        floor_id: pID,
                        id: pID,
                        b_id: pID,
                        name: pID,
                        floor_name: pID,
                        build_name: pOutdoor.building_id,
                        build_num: pOutdoor.BuildingNum,
                        building_name: pOutdoor.building_name,
                        detail: "外景",
                        icon: null,
                        iconUrl: null,
                        is_default: "0",
                    };

                    pTile.m_aLayer.push(pOutdoor.layerList[0]);
                }

                for (let pSite of pTile.m_aSite) {
                    if (!pSite.layer) {
                        pSite.layer = pOutdoor.layerList[0];
                        pSite.floorID = pOutdoor.layerList[0].floor_id;
                        pSite.buildingID = pOutdoor.building_id;
                    }
                }

                pScene = pOutdoor;
                pTile.m_aScene.push(pOutdoor);
            }
        }

        pOutdoor = pTile.m_pOutdoor;

        for (let pScene of pTile.m_aScene) {
            let pAdjust = pTile.m_aAdjust[pScene.building_id];
            let pObject = pScene.scene.object3D;
            let bOutdoor = pScene.building_id === pOutdoor;

            pObject.transform.localPosition = pTile.m_nOffset;
            pObject.transform.euler = pTile.m_mRotate;
            pObject.active = bOutdoor ? true : false;

            /// 叠加当前场景楼层
            for (let pLayer3D of pScene.scene.layers) {
                if (pAdjust) {
                    let pObject = pLayer3D.object3D;

                    if (pAdjust[0]) {
                        pObject.transform.localPosition = pAdjust[0];
                        pAdjust[0].y += pAdjust[2];
                    }

                    if (pAdjust[1]) {
                        pObject.transform.localEuler = pAdjust[1];
                    }
                }

                if (bOutdoor) {
                    pLayer3D._Draw();
                }

                /// 前后端楼层对象绑定
                for (let pLayerData of pScene.layerList) {
                    if (pLayerData.floor_id === pLayer3D.id) {
                        pLayerData.layer = pLayer3D;
                        break;
                    }
                }
            }
        }

        pThis.OnInit = function () {
            pThis.Inited(null);
            pThis.OnInit = null;

            let nIndex = 0;

            for (let pScene of pTile.m_aScene) {
                if (pOutdoor !== pScene.building_id) {
                    for (let pLayer of pScene.layerList) {
                        pLayer.layer._Draw();
                    }
                }
                else {
                    pThis.m_pCurScene = pScene;
                }

                pScene.index = nIndex++;
            }

            console.log(pTile);
        }
    }

    /// SVE场景切换方法。
    private SwitchScene(pName): void {
        let pThis = this;

        if (!pName) {
            pName = pThis.m_pTile.m_pOutdoor;
        }

        for (let pScene of pThis.m_pTile.m_aScene) {
            if (pName !== pScene.building_id) {
                pThis.m_pCurScene.scene.object3D.active = false;
                pScene.scene.object3D.active = true;
                pThis.m_pCurScene = pScene;
                break;
            }
        }
    }

    /// 加载后台数据。
    private LoadData(pCallback: (pTile: any) => void): void {
        let pConfig = MiaokitJS.m_pConfig.SVE[0];
        let pServer = pConfig.m_pEasygoServer;
        let aServer = [
            pServer + "api/info/getBuildingListH5.php",
            pServer + "api/info/getFloorListH5.php?id=",
            pServer + "api/info/getroomlistH5.php",
        ];

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

                                pConfig.m_aScene = aScene;
                                pConfig.m_aLayer = aLayer;
                                pConfig.m_aSite = aSite;

                                pCallback(pConfig);
                            });
                        }
                    });
                }
            }
            else {
                pCallback(null);
            }
        });
    }


    /// 应用框架对象。
    private m_pApp: any = null;
    /// SVE瓦片对象。
    private m_pTile: any = null;
    /// 当前激活的场景。
    private m_pCurScene: any = null;
    /// 当前进度条最大值。
    private m_nTaskMax: number = 0;
    /// 主进度条显示控制。
    private MajorProgress: (bShow, nRate) => void = null;
    /// 辅进度条显示控制。
    private MinorProgress: (bShow, nRate) => void = null;
    /// 启动完成回调。
    private Inited: (pError) => void = null;
    /// 初始化完成前的任务队列。
    private m_pWait: () => void = null;
    /// 响应启动完成。
    private OnInit: () => void = null;
}

new Main();

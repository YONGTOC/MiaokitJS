
declare var MiaokitJS: any;

class Main {
    /// 构造函数。
    public constructor() {
        this.m_pApp = MiaokitJS.App;
        this.m_pApp.m_pProject = this;
    }

    /// 初始化项目。
    private Init(): void {
        MiaokitJS.Fetch("./data/mark.bmp", function (pArray) {
            console.log(JSON.stringify(new Uint8Array(pArray)));
        });

        let pThis = this;

        pThis.m_pApp.m_pCameraCtrl.Jump(MiaokitJS.UTIL.CTRL_MODE.PANORAMA, {
            m_nLng: 110.344301,
            m_nLat: 25.272208,
            m_mTarget: { x: 0.0, y: 0.0, z: 0.0 },
            m_nDistance: 30.0,
            m_nPitch: 30.0,
            m_nYaw: 21
        });

        // 获取GIS对象
        pThis.m_pGis = MiaokitJS.Miaokit.gis;
        pThis.m_pGis.imageServer = "http://t%d.tianditu.gov.cn/DataServer?T=img_c&tk=3d26628c3a0e2694fecfbbb983ff7d87&x=%d&y=%d&l=%d"; // vec_c
        pThis.m_pGis.terrainServer = "https://t%d.tianditu.gov.cn/dem_sjk/DataServer?T=ele_c&tk=3d26628c3a0e2694fecfbbb983ff7d87&x=%d&y=%d&l=%d";

        // 添加实景对象
        pThis.m_pDioramas = new MiaokitJS.Dioramas3MX("./data/test/diors/Production_1.3mx", {
            m_pGis: MiaokitJS.Miaokit.gis,
            m_mLngLat: { x: 110.344098, y: 25.272612 },
            m_mOffset: { x: 2.0, y: 242.0, z: 0.0 }
        });

        // 添加开始动画
        pThis.InitMovie();
    }

    /// 帧更新方法。
    public Update(): void {
        if (this.m_pStartMovie) {
            this.m_pStartMovie();
            return;
        }

        if (this.m_pDioramas) {
            this.m_pDioramas.Update();
        }

        if (this.m_pGis) {
            this.m_pGis.Update(this.m_pApp.m_pCameraCtrl.lng, this.m_pApp.m_pCameraCtrl.lat, this.m_pApp.m_pCameraCtrl.height);
        }
    }

    /// 初始化开始动画。
    private InitMovie(): void {
        let pThis: any = this;
        let pCamera = this.m_pApp.m_pCameraCtrl;
        let pDoing = null;

        let aList: any[] = [
            {
                m_pCtrl: "Jump",
                m_nMode: MiaokitJS.UTIL.CTRL_MODE.PANORAMA,
                m_pParam: {
                    m_nLng: 110.344301,
                    m_nLat: 25.272208,
                    m_mTarget: { x: -75126.2, y: 170.0, z: -1438049.8 },
                    m_nDistance: 2003360.0,
                    m_nPitch: 5.0,
                    m_nYaw: -70.0
                }
            },
            {
                m_pCtrl: "Fly",
                m_nMode: MiaokitJS.UTIL.CTRL_MODE.PANORAMA,
                m_pParam: {
                    m_nLng: 110.344301,
                    m_nLat: 25.272208,
                    m_mTarget: { x: 0.0, y: 170.0, z: 0.0 },
                    m_nDistance: 2003360.0,
                    m_nPitch: 5.0,
                    m_nYaw: -45.0
                }
            },
            {
                m_pCtrl: "Fly",
                m_nMode: MiaokitJS.UTIL.CTRL_MODE.PANORAMA,
                m_pParam: {
                    m_nLng: 110.344301,
                    m_nLat: 25.272208,
                    m_mTarget: { x: 0.0, y: 170.0, z: 0.0 },
                    m_nDistance: 570475.0,
                    m_nPitch: 5.0,
                    m_nYaw: 90.0
                }
            },/*
            {
                m_pCtrl: "Fly",
                m_nMode: MiaokitJS.UTIL.CTRL_MODE.PANORAMA,
                m_nSpeed: 0.05,
                m_pParam: {
                    m_nLng: 110.344301,
                    m_nLat: 25.272208,
                    m_mTarget: { x: 0.0, y: 170.0, z: 0.0 },
                    m_nDistance: 95500.0,
                    m_nPitch: 19.0,
                    m_nYaw: 90.0
                }
            },
            {
                m_pCtrl: "Fly",
                m_nMode: MiaokitJS.UTIL.CTRL_MODE.PANORAMA,
                m_nSpeed: 0.02,
                m_pParam: {
                    m_nLng: 110.344301,
                    m_nLat: 25.272208,
                    m_mTarget: { x: 18.0, y: 170.0, z: -3.0 },
                    m_nDistance: 288.0,
                    m_nPitch: 18.6,
                    m_nYaw: 67.4
                }
            },
            {
                m_pCtrl: "Fly",
                m_nMode: MiaokitJS.UTIL.CTRL_MODE.PANORAMA,
                m_pParam: {
                    m_nLng: 110.344301,
                    m_nLat: 25.272208,
                    m_mTarget: { x: 25.0, y: 170.0, z: -35.0 },
                    m_nDistance: 313.0,
                    m_nPitch: 15.0,
                    m_nYaw: -122.0
                }
            },
            {
                m_pCtrl: "Fly",
                m_nMode: MiaokitJS.UTIL.CTRL_MODE.PANORAMA,
                m_pParam: {
                    m_nLng: 110.344301,
                    m_nLat: 25.272208,
                    m_mTarget: { x: 25.0, y: 170.0, z: -35.0 },
                    m_nDistance: 313.0,
                    m_nPitch: 15.0,
                    m_nYaw: -122.0
                },
                Do: function () {
                    let nStart = 15.0;
                    let nEnd = 175.0;

                    pDoing = function () {
                        if (nStart > nEnd) {
                            pDoing = null;
                        }
                        else {
                            nStart += 1.0;
                            MiaokitJS.ShaderLab.SetSunlight(0.0, nStart, 1.0);
                        }
                    }
                }
            },
            {
                m_pCtrl: "Fly",
                m_nMode: MiaokitJS.UTIL.CTRL_MODE.PANORAMA,
                m_pParam: {
                    m_nLng: 110.344301,
                    m_nLat: 25.272208,
                    m_mTarget: { x: 125.0, y: 170.0, z: -35.0 },
                    m_nDistance: 130.0,
                    m_nPitch: 35.0,
                    m_nYaw: -270.0
                },
                Do: function () {
                    pThis.ShowIndoor(0, 0, 0);
                }
            },
            {
                m_pCtrl: "Fly",
                m_nMode: MiaokitJS.UTIL.CTRL_MODE.PANORAMA,
                m_pParam: {
                    m_nLng: 110.344301,
                    m_nLat: 25.272208,
                    m_mTarget: { x: 200.0, y: 170.0, z: -35.0 },
                    m_nDistance: 100.0,
                    m_nPitch: 35.0,
                    m_nYaw: -270.0
                },
                Do: function () {
                    pThis.ShowIndoor(0, 0, 1);
                }
            },
            {
                m_pCtrl: "Fly",
                m_nMode: MiaokitJS.UTIL.CTRL_MODE.PANORAMA,
                m_pParam: {
                    m_nLng: 110.344301,
                    m_nLat: 25.272208,
                    m_mTarget: { x: 217.0, y: 170.0, z: -13.0 },
                    m_nDistance: 133.0,
                    m_nPitch: 28.0,
                    m_nYaw: -185.0
                },
                Do: function () {
                    pThis.HideIndoor(0, 0);
                    pThis.ShowIndoor(0, 1, 0);
                }
            },
            {
                m_pCtrl: "Fly",
                m_nMode: MiaokitJS.UTIL.CTRL_MODE.PANORAMA,
                m_pParam: {
                    m_nLng: 110.344301,
                    m_nLat: 25.272208,
                    m_mTarget: { x: 217.0, y: 170.0, z: -13.0 },
                    m_nDistance: 100.0,
                    m_nPitch: 28.0,
                    m_nYaw: -175.0
                },
                Do: function () {
                    pThis.ShowIndoor(0, 1, 1);
                }
            },*/
            {
                m_pCtrl: "Fly",
                m_nMode: MiaokitJS.UTIL.CTRL_MODE.PANORAMA,
                m_pParam: {
                    m_nLng: 110.344301,
                    m_nLat: 25.272208,
                    m_mTarget: { x: 0.0, y: 170.0, z: 0.0 },
                    m_nDistance: 100.0,
                    m_nPitch: 90.0,
                    m_nYaw: 0.0
                },
                Do: function () {
                    pThis.ShowIndoor(0, 1, 1);
                }
            },
        ];

        /// 添加开始动画
        pThis.m_pStartMovie = (function () {
            let nIndex = 0;
            let pFlash = function () {
                /// 等待程序初始化到最高性能
                if (0 < nIndex && 120 > pThis.m_nTick) {
                    return false;
                }

                if (!pDoing && !pCamera.m_pFlyTask) {
                    if (nIndex === aList.length) {
                        return true;
                    }

                    let pState = aList[nIndex];
                    if (pState.m_pCtrl) {
                        pCamera[pState.m_pCtrl](pState.m_nMode, pState.m_pParam, pState.m_nSpeed);
                    }
                    if (pState.Do) {
                        pState.Do();
                    }

                    nIndex++;
                }
                else if (pDoing) {
                    pDoing();
                }

                return false;
            };

            return function () {
                let bEnd = pFlash();

                pCamera.Update();

                if (pThis.m_pDioramas) {
                    pThis.m_pDioramas.Update();
                }

                if (pThis.m_pGis) {
                    pThis.m_pGis.Update(pCamera.lng, pCamera.lat, 5 > nIndex ? 50000.0 : 5000.0);
                }

                if (bEnd) {
                    pThis.m_pStartMovie = null;
                }
            }
        })();
    }

    /// SVE瓦片激活方法。
    private ActiveTile(pTile): void {
        let aScene = [];

        for (let pScene of pTile.scenes) {
            aScene.push(pScene);
        }

        pTile.m_mOffet = { x: 200.0, y: 167.0, z: -50.0 };
        pTile.m_mEuler = { x: 0.0, y: -85.0, z: 0.0 };

        let aAdjust: any[] = [
            [{ x: 2.0, y: 2.5, z: 2.0 }, { x: 0.0, y: 180.0, z: 0.0 }, 6.0],
            [{ x: 71.0, y: 1.0, z: -6.0 }, { x: 0.0, y: -90.0, z: 0.0 }, 9.0],
            [{ x: 0.0, y: 0.0, z: 0.0 }, null, 9.0]
        ];

        for (let i = aScene.length - 1; i > -1; i--) {
            let pScene = aScene[i];
            let pAdjust = aAdjust[i];
            let pObject = pScene.object3D;
            pObject.transform.localPosition = pTile.m_mOffet;
            pObject.transform.euler = pTile.m_mEuler;
            pObject.active = (aScene.length - 1) === i ? true : false;

            /// 叠加当前场景楼层
            for (let pLayer of pScene.layers) {
                let pObject = pLayer.object3D;
                pObject.transform.localPosition = pAdjust[0]; pAdjust[0].y += pAdjust[2];
                if (pAdjust[1]) {
                    pObject.transform.localEuler = pAdjust[1];
                }

                pLayer._Draw();
            }
        }

        this.m_aTile[0] = {
            m_aScene: aScene
        };
    }

    /// 显示室内。
    private ShowIndoor(nTile, nScene, nType): void {
        let pTile = this.m_aTile[nTile];
        if (pTile) {
            let pScene = pTile.m_aScene[nScene];
            if (pScene) {
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
            if (pScene) {
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

    /// 应用框架对象。
    private m_pApp: any = null;
    /// GIS对象。
    private m_pGis: any = null;
    /// 实景对象。
    private m_pDioramas: any = null;
    /// 开始动画。
    private m_pStartMovie: any = null;
    /// SVE瓦片数组。
    private m_aTile: any[] = [];
}

new Main();

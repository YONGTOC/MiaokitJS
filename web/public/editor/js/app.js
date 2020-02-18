class Main {
    constructor() {
        this.m_pApp = null;
        this.m_pGis = null;
        this.m_pDioramas = null;
        this.m_pStartMovie = null;
        this.m_aTile = [];
        this.m_pApp = MiaokitJS.App;
        this.m_pApp.m_pProject = this;
    }
    Init() {
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
        pThis.m_pGis = MiaokitJS.Miaokit.gis;
        pThis.m_pGis.imageServer = "http://t%d.tianditu.gov.cn/DataServer?T=img_c&tk=3d26628c3a0e2694fecfbbb983ff7d87&x=%d&y=%d&l=%d";
        pThis.m_pGis.terrainServer = "https://t%d.tianditu.gov.cn/dem_sjk/DataServer?T=ele_c&tk=3d26628c3a0e2694fecfbbb983ff7d87&x=%d&y=%d&l=%d";
        pThis.m_pDioramas = new MiaokitJS.Dioramas3MX("./data/test/diors/Production_1.3mx", {
            m_pGis: MiaokitJS.Miaokit.gis,
            m_mLngLat: { x: 110.344098, y: 25.272612 },
            m_mOffset: { x: 2.0, y: 242.0, z: 0.0 }
        });
        pThis.InitMovie();
    }
    Update() {
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
    InitMovie() {
        let pThis = this;
        let pCamera = this.m_pApp.m_pCameraCtrl;
        let pDoing = null;
        let aList = [
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
            },
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
        pThis.m_pStartMovie = (function () {
            let nIndex = 0;
            let pFlash = function () {
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
            };
        })();
    }
    ActiveTile(pTile) {
        let aScene = [];
        for (let pScene of pTile.scenes) {
            aScene.push(pScene);
        }
        pTile.m_mOffet = { x: 200.0, y: 167.0, z: -50.0 };
        pTile.m_mEuler = { x: 0.0, y: -85.0, z: 0.0 };
        let aAdjust = [
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
            for (let pLayer of pScene.layers) {
                let pObject = pLayer.object3D;
                pObject.transform.localPosition = pAdjust[0];
                pAdjust[0].y += pAdjust[2];
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
    ShowIndoor(nTile, nScene, nType) {
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
    HideIndoor(nTile, nScene) {
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
}
new Main();

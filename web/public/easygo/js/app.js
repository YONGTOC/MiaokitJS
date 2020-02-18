class Main {
    constructor() {
        this.m_pApp = null;
        this.m_pTile = null;
        this.m_aScene = null;
        this.m_aAdjust = null;
        this.m_nScene = 0;
        this.m_nTaskMax = 0;
        this.MajorProgress = null;
        this.MinorProgress = null;
        this.Inited = null;
        this.OnInit = null;
        this.m_pApp = MiaokitJS.App;
        this.m_pApp.m_pProject = this;
    }
    Init() {
        this.MajorProgress(true, 0.4);
        this.m_pApp.m_pCameraCtrl.Jump(MiaokitJS.UTIL.CTRL_MODE.PANORAMA, {
            m_nLng: 110.344301,
            m_nLat: 25.272208,
            m_mTarget: { x: 0.0, y: 0.0, z: 0.0 },
            m_nDistance: 300.0,
            m_nPitch: 30.0,
            m_nYaw: 21
        });
    }
    Update() {
        let pThis = this;
        let nTaskCount = MiaokitJS.Miaokit.progress;
        if (0 < nTaskCount) {
            pThis.m_nTaskMax = pThis.m_nTaskMax < nTaskCount ? nTaskCount : pThis.m_nTaskMax;
            if (pThis.OnInit) {
                pThis.MajorProgress(true, 0.4 + (1.0 - (nTaskCount / pThis.m_nTaskMax)) * 0.6);
            }
            else {
                pThis.MinorProgress(true, 1.0 - (nTaskCount / pThis.m_nTaskMax));
            }
        }
        else {
            if (pThis.OnInit) {
                pThis.m_nTaskMax = 0;
                pThis.MajorProgress(false, 1.0);
                pThis.OnInit();
            }
            else {
                if (0 < pThis.m_nTaskMax) {
                    pThis.m_nTaskMax = 0;
                    pThis.MinorProgress(false, 1.0);
                }
            }
        }
    }
    ActiveTile(pTile) {
        let pThis = this;
        let aScene = [];
        for (let pScene of pTile.scenes) {
            aScene.push(pScene);
        }
        pTile.m_mOffet = { x: 0.0, y: 0.0, z: 0.0 };
        pTile.m_mEuler = { x: 0.0, y: 0.0, z: 0.0 };
        pThis.m_aAdjust = [
            [{ x: 2.0, y: 2.5, z: 2.0 }, { x: 0.0, y: 180.0, z: 0.0 }, 6.0],
            [{ x: 71.0, y: 1.0, z: -6.0 }, { x: 0.0, y: -90.0, z: 0.0 }, 9.0],
            [null, null, 0.0]
        ];
        for (let i = aScene.length - 1; i > -1; i--) {
            let pScene = aScene[i];
            let pAdjust = pThis.m_aAdjust[i];
            let pObject = pScene.object3D;
            pObject.transform.localPosition = pTile.m_mOffet;
            pObject.transform.euler = pTile.m_mEuler;
            pObject.active = (aScene.length - 1) === i ? true : false;
            for (let pLayer of pScene.layers) {
                let pObject = pLayer.object3D;
                if (pAdjust[0]) {
                    pObject.transform.localPosition = pAdjust[0];
                    pAdjust[0].y += pAdjust[2];
                }
                if (pAdjust[1]) {
                    pObject.transform.localEuler = pAdjust[1];
                }
                if ((aScene.length - 1) === i) {
                    pLayer._Draw();
                    pThis.m_nScene = i;
                }
            }
        }
        pThis.m_pTile = pTile;
        pThis.m_aScene = aScene;
        pThis.OnInit = function () {
            for (let i = 0; i < (pThis.m_aScene.length - 1); i++) {
                let pScene = aScene[i];
                for (let pLayer of pScene.layers) {
                    pLayer._Draw();
                }
            }
            pThis.Inited(null);
            pThis.OnInit = null;
        };
    }
    SwitchScene(pName) {
        let pThis = this;
        let nScene = "体育场" === pName ? 0 : (this.m_aScene.length - 1);
        if (pThis.m_nScene !== nScene) {
            pThis.m_aScene[pThis.m_nScene].object3D.active = false;
            pThis.m_aScene[nScene].object3D.active = true;
            pThis.m_nScene = nScene;
        }
    }
}
new Main();

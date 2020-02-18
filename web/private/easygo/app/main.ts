
declare var MiaokitJS: any;
declare var GLOBAL: any;

class Main {
    /// 构造函数。
    public constructor() {
        this.m_pApp = MiaokitJS.App;
        this.m_pApp.m_pProject = this;
    }

    /// 初始化项目。
    private Init(): void {
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

    /// 帧更新方法。
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

            /// 叠加当前场景楼层
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
        }
    }

    /// SVE场景切换方法。
    private SwitchScene(pName): void {
        let pThis = this;
        let nScene = "体育场" === pName ? 0 : (this.m_aScene.length - 1);

        if (pThis.m_nScene !== nScene) {
            pThis.m_aScene[pThis.m_nScene].object3D.active = false;
            pThis.m_aScene[nScene].object3D.active = true;
            pThis.m_nScene = nScene;
        }
    }

    /// 应用框架对象。
    private m_pApp: any = null;
    /// SVE瓦片。
    private m_pTile: any = null;
    /// SVE场景数组。
    private m_aScene: any[] = null;
    /// 场景显示矫正。
    private m_aAdjust: any[] = null;
    /// 当前显示场景索引。
    private m_nScene: number = 0;
    /// 当前进度条最大值。
    private m_nTaskMax: number = 0;
    /// 主进度条显示控制。
    private MajorProgress: (bShow, nRate) => void = null;
    /// 辅进度条显示控制。
    private MinorProgress: (bShow, nRate) => void = null;
    /// 启动完成回调。
    private Inited: (pError) => void = null;
    /// 响应启动完成。
    private OnInit: () => void = null;
}

new Main();

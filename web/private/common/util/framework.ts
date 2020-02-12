
declare var MiaokitJS: any;

class App {
    /// 构造函数。
    public constructor() {
    }

    /// SVE核心逻辑功能启动。
    public Start(): void {
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

        MiaokitJS["Miaokit"]["ResizeCavans"](pCanvas2D.width, pCanvas2D.height);

        this.m_pContainer = pContainer;
        this.m_pCanvas2D = pCanvas2D;
        this.m_pCanvasCtx2D = pCanvas2D.getContext('2d');

        this.m_pCamera = MiaokitJS.Miaokit.camera;
        this.m_pCameraCtrl = new MiaokitJS.UTIL.CameraCtrl(this.m_pCamera);
        this.m_pPicker = new MiaokitJS.UTIL.EntityPicker(this.m_pCameraCtrl);

        this.RegisterEvent(this.m_pCanvas2D, MiaokitJS.Miaokit.cameraCtrl);
        this.InitProject();
    }

    /// SVE核心逻辑功能帧更新。
    public Update(): void {
        this.m_nTick++;
        this.Draw2D();

        if (this.m_pStartMovie) {
            this.m_pStartMovie();
            return;
        }

        this.m_pCameraCtrl.Update();

        if (this.m_pDioramas) {
            this.m_pDioramas.Update();
        }

        if (this.m_pGis) {
            this.m_pGis.Update(this.m_pCameraCtrl.lng, this.m_pCameraCtrl.lat, this.m_pCameraCtrl.height);
        }
    }

    /// 绘制2D画布。
    private Draw2D(): void {
        this.m_pCanvasCtx2D.clearRect(0, 0, this.m_pCanvas2D.clientWidth, this.m_pCanvas2D.clientHeight);
        this.Analyze();

        if (0 < MiaokitJS.Miaokit.progress) {
            let pMsg = "正在执行任务: " + MiaokitJS.Miaokit.progress;
            this.m_pCanvasCtx2D.font = "20px Microsoft YaHei";
            this.m_pCanvasCtx2D.strokeStyle = "black";
            this.m_pCanvasCtx2D.lineWidth = 2;
            this.m_pCanvasCtx2D.fillStyle = "#FF0000";
            this.m_pCanvasCtx2D.strokeText(pMsg, this.m_pCanvas2D.clientWidth / 2 - 20.0, this.m_pCanvas2D.clientHeight / 2);
            this.m_pCanvasCtx2D.fillText(pMsg, this.m_pCanvas2D.clientWidth / 2 - 20.0, this.m_pCanvas2D.clientHeight / 2);
        }

        if (this.OnGUI) {
            this.OnGUI(this.m_pCanvas2D, this.m_pCanvasCtx2D);
        }
    }

    /// 显示运行情况分析数据。
    private Analyze(): void {
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


            if (MiaokitJS.Profiler) {
                let pInfo = MiaokitJS.Profiler.m_pMsg;
                pCanvas.strokeText(pInfo, 10, nOffset);
                pCanvas.fillText(pInfo, 10, nOffset);
                nOffset += 18;
            }

        }
    }

    /// 注册交互事件。
    private RegisterEvent(pCavans: HTMLElement, pCamera): void {
        // -1=不响应，2=旋转，0=平移，1=缩放
        let nDrag = -1;
        // 鼠标按键按下计时
        let nPressTime = MiaokitJS.Time();
        // 鼠标按键上一次单击时间
        let nClickTime = 0;
        let pThis = this;

        pCavans.addEventListener("mousewheel", function (e: WheelEvent) {
            pThis.m_pCameraCtrl.Scale(e.deltaY / Math.abs(e.deltaY), pThis.m_pCanvas2D.clientWidth, pThis.m_pCanvas2D.clientHeight);
        }, true);
        /// 火狐浏览器的鼠标滚轮事件。
        pCavans.addEventListener("DOMMouseScroll", function (e: WheelEvent) {
            pThis.m_pCameraCtrl.Scale(e.detail / Math.abs(e.detail), pThis.m_pCanvas2D.clientWidth, pThis.m_pCanvas2D.clientHeight);
        }, true);
        pCavans.addEventListener("mousedown", function (e: MouseEvent) {
            nDrag = e.button;
            if (2 === nDrag) {
                nDrag = 1;
            }
            nPressTime = MiaokitJS.Time();
        }, false);
        pCavans.addEventListener("mouseup", function (e: MouseEvent) {
            nDrag = -1;
            if (250 > MiaokitJS.Time() - nPressTime) {
                /// 鼠标双击
                if (500 > MiaokitJS.Time() - nClickTime) {
                    let pSelect = null;

                    if (0 == e.button) {
                        pSelect = pThis.m_pPicker.Select();
                    }
                    else if (2 == e.button) {
                        pSelect = pThis.m_pPicker.UnSelect();
                    }

                    if (pSelect) {
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
                    //console.log("双击:", null);
                }
                /// 鼠标单击
                else {
                    //console.log("单击:", null);
                }

                nClickTime = MiaokitJS.Time();
            }
        }, false);
        pCavans.addEventListener("mouseout", function (e: MouseEvent) {
            nDrag = -1;
        }, false);
        pCavans.addEventListener("mousemove", function (e: MouseEvent) {
            if (0 === nDrag) {
                pThis.m_pCameraCtrl.Move(-e.movementX, e.movementY, pThis.m_pCanvas2D.clientWidth, pThis.m_pCanvas2D.clientHeight);
            }
            else if (1 === nDrag) {
                pThis.m_pCameraCtrl.Rotate(e.movementX, e.movementY, pThis.m_pCanvas2D.clientWidth, pThis.m_pCanvas2D.clientHeight);
            }
        }, false);


        let pStartEvent: TouchEvent = null;
        let Distance = function (p0, p1): number {
            let mVec = { x: p0.x - p1.x, y: p0.y - p1.y };

            return Math.sqrt((mVec.x * mVec.x) + (mVec.y * mVec.y));
        }

        pCavans.addEventListener("touchstart", function (e: TouchEvent) {
            if (1 == e.touches.length) {
                nDrag = 2;
                pStartEvent = e;
            }
            else if (2 == e.touches.length) {
            }
        }, false);
        pCavans.addEventListener("touchmove", function (e: TouchEvent) {
            e.preventDefault();
            if (e.touches == null)
                return;
            if (1 == e.touches.length && 2 == nDrag) {
                let nDeltaX = e.touches[0].clientX - pStartEvent.touches[0].clientX;
                let nDeltaY = e.touches[0].clientY - pStartEvent.touches[0].clientY;

                pStartEvent = e;

                pThis.m_pCameraCtrl.Move(nDeltaX * -2, nDeltaY * 2, pThis.m_pCanvas2D.clientWidth, pThis.m_pCanvas2D.clientHeight);
            }
            else if (2 == e.touches.length && 2 == pStartEvent.touches.length) {
                let mStartPoint = { x: (pStartEvent.touches[0].clientX + pStartEvent.touches[1].clientX) * 0.5, y: (pStartEvent.touches[0].clientY + pStartEvent.touches[1].clientY) * 0.5 };
                let mCurPoint = { x: (e.touches[0].clientX + e.touches[1].clientX) * 0.5, y: (e.touches[0].clientY + e.touches[1].clientY) * 0.5 };
                let mMoveDelta = { x: -mCurPoint.x + mStartPoint.x, y: mCurPoint.y - mStartPoint.y };

                let mStartPoint0 = { x: pStartEvent.touches[0].clientX, y: pStartEvent.touches[0].clientY };
                let mStartPoint1 = { x: pStartEvent.touches[1].clientX, y: pStartEvent.touches[1].clientY };
                let mCurPoint0 = { x: e.touches[0].clientX, y: e.touches[0].clientY };
                let mCurPoint1 = { x: e.touches[1].clientX, y: e.touches[1].clientY };
                let nScaleDelta = Distance(mCurPoint0, mCurPoint1) - Distance(mStartPoint1, mStartPoint0);

                pStartEvent = e;

                pThis.m_pCameraCtrl.Rotate(mMoveDelta.x * -5, mMoveDelta.y * 5, pThis.m_pCanvas2D.clientWidth, pThis.m_pCanvas2D.clientHeight);
                if (Math.abs(nScaleDelta) > 10) {
                    pThis.m_pCameraCtrl.Scale(-nScaleDelta / Math.abs(nScaleDelta), pThis.m_pCanvas2D.clientWidth, pThis.m_pCanvas2D.clientHeight);
                }
            }
            else {
                pStartEvent = e;
            }
        }, false);
        pCavans.addEventListener("touchend", function (e: TouchEvent) { nDrag = -1; pStartEvent = null; }, false);
    }

    /// 初始化项目。
    private InitProject(): void {
        let pThis = this;

        pThis.m_pCameraCtrl.Jump(MiaokitJS.UTIL.CTRL_MODE.PANORAMA, {
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
        pThis.m_pDioramas = new MiaokitJS.Dioramas3MX("./diors/Production_1.3mx", {
            m_pGis: MiaokitJS.Miaokit.gis,
            m_mLngLat: { x: 110.341637, y: 25.270798 },
            m_mOffset: { x: -24.0, y: 242.0, z: 0.0 }
        });

        // 添加开始动画
        pThis.InitMovie();
    }

    /// 初始化开始动画
    private InitMovie(): void {
        let pThis: any = this;
        let pCamera = this.m_pCameraCtrl;
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
            },
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
            }
            //{
            //    m_pCtrl: "Fly",
            //    m_nMode: MiaokitJS.UTIL.CTRL_MODE.PANORAMA,
            //    m_pParam: {
            //        m_nLng: 110.344301,
            //        m_nLat: 25.272208,
            //        m_mTarget: { x: 0.0, y: 170.0, z: 0.0 },
            //        m_nDistance: 283.0,
            //        m_nPitch: 5.0,
            //        m_nYaw: 90.0
            //    }
            //},
            //{
            //    m_pCtrl: "Fly",
            //    m_nMode: MiaokitJS.UTIL.CTRL_MODE.PANORAMA,
            //    m_pParam: {
            //        m_nLng: 110.344301,
            //        m_nLat: 25.272208,
            //        m_mTarget: { x: -50.0, y: 170.0, z: 39.0 },
            //        m_nDistance: 165.0,
            //        m_nPitch: 10.0,
            //        m_nYaw: -56.0
            //    }
            //},
            //{
            //    m_pCtrl: "Fly",
            //    m_nMode: MiaokitJS.UTIL.CTRL_MODE.PANORAMA,
            //    m_pParam: {
            //        m_nLng: 110.344301,
            //        m_nLat: 25.272208,
            //        m_mTarget: { x: 0, y: 170.0, z: 0 },
            //        m_nDistance: 180.0,
            //        m_nPitch: 11.05,
            //        m_nYaw: -72.73
            //    },
            //    Do: function () {
            //        let nStart = 15.0;
            //        let nEnd = 175.0;

            //        pDoing = function () {
            //            if (nStart > nEnd) {
            //                pDoing = null;
            //            }
            //            else {
            //                nStart += 1.0;
            //                MiaokitJS.ShaderLab.SetSunlight(0.0, nStart, 1.0);
            //            }
            //        }
            //    }
            //}
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


    /// 画布容器。
    public m_pContainer: any = null;
    /// 2D画布，接收鼠标事件。
    public m_pCanvas2D: any = null;
    /// 2D画布上下文，用户绘制标签文字。
    public m_pCanvasCtx2D: any = null;
    /// 响应2D画布绘制。
    public OnGUI: any = null;

    /// 帧数统计。
    private m_nTick: any = null;
    /// 60帧时间统计。
    private m_nTime: number = 0;
    /// 分析数据。
    private m_aAnalyze: any = null;

    /// GIS对象。
    private m_pGis: any = null;
    /// 实景对象。
    private m_pDioramas: any = null;
    /// 摄像机对象。
    private m_pCamera: any = null;
    /// 摄像机控制器。
    private m_pCameraCtrl: any = null;
    /// 对象拾取器。
    private m_pPicker: any = null;
    /// 开始动画。
    private m_pStartMovie: any = null;
}


MiaokitJS.UTIL = MiaokitJS.UTIL || {};
MiaokitJS.UTIL.App = App;
MiaokitJS.App = new App();

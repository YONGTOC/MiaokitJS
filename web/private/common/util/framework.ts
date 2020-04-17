
declare var MiaokitJS: any;

class App {
    /// 构造函数。
    public constructor() {
    }

    /// 数据预加载。
    public Preload(): void {
        this.m_pProject.Preload();
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

        if (MiaokitJS.m_pConfig.GIS) {
            this.m_pGis = MiaokitJS.Miaokit.gis;
            this.m_pGis.imageServer = MiaokitJS.m_pConfig.GIS.m_pImageServer;

            if (MiaokitJS.m_pConfig.GIS.m_pLabelServer) {
                this.m_pGis.labelServer = MiaokitJS.m_pConfig.GIS.m_pLabelServer;
            }

            if (MiaokitJS.m_pConfig.GIS.m_pTerrainServer) {
                this.m_pGis.terrainServer = MiaokitJS.m_pConfig.GIS.m_pTerrainServer;
            }
        }

        if (MiaokitJS.m_pConfig.DIORS) {
            for (let pDior of MiaokitJS.m_pConfig.DIORS) {
                pDior.m_pDior = new MiaokitJS.Dioramas3MX(pDior.m_pPath, !this.m_pGis ? null : {
                    m_pGis: this.m_pGis,
                    m_mLngLat: pDior.m_mLngLat,
                    m_mOffset: pDior.m_nOffset,
                    m_nHeight: pDior.m_nHeight
                });
            }
        }

        this.RegisterEvent(this.m_pCanvas2D, MiaokitJS.Miaokit.cameraCtrl);
        this.m_pProject.Start();
    }

    /// SVE核心逻辑功能帧更新。
    public Update(): void {
        this.m_nTick++;
        this.Draw2D();
        this.m_pCameraCtrl.Update();
        this.m_pProject.Update();
    }

    /// SVE瓦片激活。
    public ActiveTile(pTile): void {
        let pObject = pTile.m_pTile.object3D;
        this.m_pGis.AddGameObject(pObject, pTile.m_nLng, pTile.m_nLat, pTile.m_nHeight);

        pObject.transform.Translate(pTile.m_nOffset, 1);
        pObject.transform.localEuler = pTile.m_mRotate;

        this.m_pProject.ActiveTile(pTile);
    }

    /// 绘制2D画布。
    private Draw2D(): void {
        this.m_pCanvasCtx2D.clearRect(0, 0, this.m_pCanvas2D.clientWidth, this.m_pCanvas2D.clientHeight);
        this.Analyze();

        this.m_pProject.OnGUI(this.m_pCanvas2D, this.m_pCanvasCtx2D);

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
        let nOffset = 68;

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

        let pLastObj = null;

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
            MiaokitJS.ShaderLab.Pipeline.Picker = {
                Feedback: (pObject, nSubmesh) => {
                    if (pObject) {
                        if (!pLastObj || pLastObj.m_nID !== pObject.m_nID) {
                            if (pLastObj) {
                                pLastObj.highlight = false;
                            }

                            console.log(pObject.name, nSubmesh);
                            pObject.highlight = true;

                            pLastObj = pObject;
                        }
                    }
                },
                x: e.clientX,
                y: e.clientY
            };

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

    /// 摄像机对象。
    private m_pCamera: any = null;
    /// 摄像机控制器。
    private m_pCameraCtrl: any = null;
    /// 对象拾取器。
    private m_pPicker: any = null;
    /// GIS对象。
    private m_pGis: any = null;
    /// 项目逻辑对象。
    private m_pProject: any = null;
}


MiaokitJS.UTIL = MiaokitJS.UTIL || {};
MiaokitJS.UTIL.App = App;
MiaokitJS.App = new App();


declare var MiaokitJS: any;

class SVE {
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

        this.m_pContainer = pContainer;
        this.m_pCanvas2D = pCanvas2D;
        this.m_pCanvasCtx2D = pCanvas2D.getContext('2d');

        this.m_pCamera = MiaokitJS.Miaokit.camera;
        this.m_pCameraCtrl = new MiaokitJS.SVECLASS.CameraCtrl(this.m_pCamera);
        this.m_pPicker = new MiaokitJS.SVECLASS.EntityPicker();

        this.RegisterEvent(this.m_pCanvas2D, MiaokitJS.Miaokit.cameraCtrl);
        this.InitProject();
    }

    /// SVE核心逻辑功能帧更新。
    public Update(): void {
        this.m_nTick++;
        this.Draw2D();

        this.m_pCameraCtrl.Update();

        if (this["m_pDioramas"]) {
            this["m_pDioramas"].Update();
        }

        if (this.m_pGis && !this.m_pPicker.indoor) {
            this.m_pGis.Update(this.m_pCameraCtrl.lng * (Math.PI / 180), this.m_pCameraCtrl.lat * (Math.PI / 180), this.m_pCameraCtrl.height);
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
            this.m_pCanvasCtx2D.fillStyle = "#FFFFFF";
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
    }

    /// 获取瓦片信息。
    public GetTileInfo(pUser, pPassword, pTileName, pCallback): void {
        let pServer = "http://sve.yongtoc.com:80/";

        let pForm = new FormData();
        pForm.append("mobile", pUser);
        pForm.append("password", pPassword);

        MiaokitJS["Request"]("POST", "json", pServer + "api/Data/sveDoLogin", pForm, null, function (pInfo) {
            if ("100" === pInfo.returnCode) {
                MiaokitJS["Request"]("GET", "json", pServer + "api/Data/projectList/userid/" + pInfo.user_id, null, null, function (pList) {
                    if ("100" === pList.returnCode) {
                        for (let pTile of pList.dataInfo) {
                            if (pTile.name === pTileName) {
                                pCallback({
                                    "m_pID": pTile.id + ":" + pTileName,
                                    "m_pPath": pServer + pTile.file_url,
                                    "m_pData": null,
                                    "m_pTile": null
                                });

                                return;
                            }
                        }

                        pCallback(null);
                    }
                    else {
                        pCallback(null);
                    }
                });
            }
            else {
                pCallback(null);
            }
        });
    }

    /// 初始化项目。
    private InitProject(): void {
        let pThis: any = this;

        pThis.m_pCameraCtrl.Jump(MiaokitJS.SVECLASS.CTRL_MODE.PANORAMA, {
            m_nLng: 110.326477,
            m_nLat: 25.247935,
            m_mTarget: { x: 0.0, y: -481.0, z: 0.0 },
            m_nDistance: 2000.0,
            m_nPitch: 30.0,
            m_nYaw: 0
        });

        //let pPath = "./examples/data/某镇政府/Production_8.3mx";
        //let pDioramas = new MiaokitJS.Dioramas3MX(pPath);
        //pThis.m_pDioramas = pDioramas;
        
        //return;

        //MiaokitJS["Request"]("GET", "arraybuffer", "./examples/data/Tile_p001_p001_L20_0010t7.bin", null, null, function (aData) {
        //    let pDioramas = new MiaokitJS.Dioramas3MX();
        //    console.log(pDioramas);
        //    pDioramas.Parse("./examples/data/Tile_p001_p001_L20_0010t7.bin", aData);
        //});

        //return;

        // 4个对象
        //MiaokitJS.LoadPrefab("./examples/data/prefab.assetbundle.bin", function (pPrefab) {
        //    pThis.pObject = pPrefab.Instantiate();
        //    pThis.pObject2 = new MiaokitJS.GameObject();

        //    console.log(pThis.pObject, pThis.pObject2);
        //});
        //return;

        // 加载进度显示
        MiaokitJS["SVE"].OnGUI = function (pCanvas, pCanvasCtx) {
            if (!pThis.m_pTile) {
                let pMsg = "正在加载工程文件: " + (pThis.m_nTick ? pThis.m_nTick : 0.0).toFixed(2);
                pCanvasCtx.font = "20px Microsoft YaHei";
                pCanvasCtx.strokeStyle = "black";
                pCanvasCtx.lineWidth = 2;
                pCanvasCtx.fillStyle = "#FFFFFF";
                pCanvasCtx.strokeText(pMsg, pCanvas.clientWidth / 2 - 20.0, pCanvas.clientHeight / 2);
                pCanvasCtx.fillText(pMsg, pCanvas.clientWidth / 2 - 20.0, pCanvas.clientHeight / 2);
            }
        };

        /// 加载工程路径
        MiaokitJS["Request"]("GET", "arraybuffer", "./examples/data/5db799d41b740.txt", null,
            function (nRate) {
                pThis.m_nTick = nRate;
            },
            function (aData) {
                let pTileInfo = {
                    m_pData: aData,
                    m_pTile: MiaokitJS["Miaokit"]["LoadTile"](aData)
                };

                let nIndex = 0;

                /// 遍历当前瓦片所有场景，打印场景ID
                for (let pScene of pTileInfo["m_pTile"].scenes) {
                    if (1 !== nIndex++) {
                        continue;
                    }

                    let pObject = pScene.object3D;
                    pObject.transform.localPosition = { x: 0.0, y: 164.0, z: 0.0 };
                    pObject.transform.euler = { x: 1.0, y: -42 + 180.0, z: 1.0 };

                    let nHeight = 0.0;
                    console.log("场景：", pScene.id);

                    /// 遍历当前场景所有楼层，打印楼层ID
                    for (let pLayer of pScene.layers) {
                        let pObject = pLayer.object3D;
                        pObject.transform.localPosition = { x: 0.0, y: nHeight, z: 0.0 }; nHeight += 9.0;
                        console.log("楼层：", pLayer, pObject, nHeight);
                        pLayer._Draw();
                    }

                    break;
                }

                pThis.m_pTile = pTileInfo["m_pTile"];
            });
        return;

        // 获取GIS对象
        this.m_pGis = MiaokitJS.Miaokit.gis;
        
        /// 注册添加一个SVE工程到GIS中，实现动态管理
        pThis.m_pGis.AddSvetile({
            m_nID: 1,
            m_nFlags: 0,
            m_pUrl: "data/upload/admin/project/20190807/5d4a310351522.txt",
            m_mLngLat: { x: 110.326814, y: 25.248106 },
            m_mSize: { x: 1000.0, y: 1000.0 },
            OnActive: function (pTile, bActive) {
                if (bActive) {
                    pTile.m_mOffet = { x: -10.0, y: 164.0, z: -40.0 };
                    pTile.m_mEuler = { x: 0.0, y: -42, z: 0.0 };

                    /// 遍历当前瓦片所有场景，打印场景ID
                    for (let pScene of pTile.scenes) {
                        if (pTile.m_mOffet && pTile.m_mEuler) {
                            let pObject = pScene.object3D;
                            pObject.transform.localPosition = pTile.m_mOffet;
                            pObject.transform.euler = pTile.m_mEuler;
                        }

                        let nHeight = 0.0;
                        console.log("场景：", pScene.id);

                        /// 遍历当前场景所有楼层，打印楼层ID
                        for (let pLayer of pScene.layers) {
                            let pObject = pLayer.object3D;
                            pObject.transform.localPosition = { x: 0.0, y: nHeight, z: 0.0 }; nHeight += 9.0;
                            console.log("楼层：", pLayer, pObject, nHeight);
                            pLayer._Draw();

                            if (10.0 < nHeight) {
                                break;
                            }
                            //for (let pSite of pLayer.sites) {
                            //    console.log("位置点：", pSite.id, pSite.type, pSite.number, pSite.scene.id, pSite.layer.id, pSite.position);
                            //}
                        }
                        break;
                    }
                }
                else {
                    console.log("隐藏显示");
                }
            }
        });
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
    /// 摄像机对象。
    private m_pCamera: any = null;
    /// 摄像机控制器。
    private m_pCameraCtrl: any = null;
    /// 对象拾取器。
    private m_pPicker: any = null;
}


MiaokitJS.SVECLASS = MiaokitJS.SVECLASS || {};
MiaokitJS.SVECLASS.SVE = SVE;
MiaokitJS.SVE = new SVE();

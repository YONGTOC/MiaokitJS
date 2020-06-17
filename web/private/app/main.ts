
declare var MiaokitJS: any;
declare var webgl_call_web_hide_floor_list: any;
declare var webgl_call_web_show_floor_list: any;
declare var webgl_call_web_active_floor: any;
declare var webgl_call_web_showVR: any;

class Main {
    /// 构造函数。
    public constructor() {
        let pThis = this;

        MiaokitJS.App.m_pProject = pThis;
    }

    /// 数据预加载。
    public Preload() {
        let pThis = this;

        let DrawList = [];
        let Overlap = function (A, B) {
            if (A[0] > B[0] + B[2]) { return 0.0; }
            if (A[0] + A[2] < B[0]) { return 0.0; }
            if (A[1] - A[3] > B[1]) { return 0.0; }
            if (A[1] < B[1] - B[3]) { return 0.0; }

            let COL = Math.abs(Math.min(A[0] + A[2], B[0] + B[2]) - Math.max(A[0], B[0]));
            let ROW = Math.abs(Math.min(A[1], B[1]) - Math.max(A[1] - A[3], B[1] - B[3]));

            return COL * ROW;
        };
        let Drawable = function (pRect) {
            for (let pRect_ of DrawList) {
                if (1000 < Overlap(pRect, pRect_)) {
                    return false;
                }
            }

            DrawList.push(pRect);

            return true;
        };

        for (let pIcon_ of pThis.m_aIcon) {
            let pIcon = pIcon_;
            let pImage = new Image();

            pImage.src = pIcon.m_pPath;
            pImage.crossOrigin = "anonymous";
            pImage.onload = function (e) {
                pIcon.m_pImage = pImage;

                if ("楼宇" === pIcon.m_pName) {
                    pIcon.m_pDraw = function (canvas, text, point) {
                        canvas.font = "18px Microsoft YaHei";
                        canvas.lineWidth = 2;

                        let w_ = canvas.measureText(text).width;
                        if (16 > w_) {
                            w_ = 16;
                        }

                        let x = point.x;
                        let y = point.y;
                        let y_ = y - 30;
                        let w = 48 + w_;
                        let hw = 0.5 * w;

                        if (!Drawable([x - hw, y_ - 32, w, 32])) {
                            return;
                        }

                        canvas.beginPath();
                        canvas.moveTo(x, y);
                        canvas.lineTo(x + 10, y - 6);
                        canvas.lineTo(x + 10, y - 14);
                        canvas.lineTo(x + 0, y - 8);
                        canvas.lineTo(x - 10, y - 14);
                        canvas.lineTo(x - 10, y - 6);
                        canvas.closePath();
                        canvas.fillStyle = "#3ABAF2";
                        canvas.fill();

                        canvas.beginPath();
                        canvas.arc(x + hw - 16, y_ - 16, 15, 1.570796, -1.570796, true);
                        canvas.lineTo(x - hw + 16, y_ - 31);
                        canvas.lineTo(x - hw + 16, y_ - 1);
                        canvas.closePath();
                        canvas.fillStyle = "#3ABAF2C0";
                        canvas.fill();
                        canvas.strokeStyle = "#A3D5EA";
                        canvas.stroke();

                        canvas.drawImage(pImage, x - hw, y_ - 32, 32, 32);

                        canvas.fillStyle = "#FFFFFF";
                        canvas.fillText(text, x - w_ * 0.5 + 10, y_ - 10);
                    };

                    pIcon.m_pDrawList = function (canvas, width, height) {
                        DrawList = [];
                        return;
                        if (!pIcon.m_aList) {
                            return;
                        }

                        for (let pItem of pIcon.m_aList) {
                            if (pItem.m_aIndoor) {
                                for (let pIndoor of pItem.m_aIndoor) {
                                    let pPoint = pIndoor.screenPoint;
                                    if (-1.0 > pPoint.z) {
                                        continue;
                                    }

                                    pPoint.x = pPoint.x * width;
                                    pPoint.y = pPoint.y * height;

                                    pIcon.m_pDraw(canvas, pIndoor.name, pPoint);
                                }
                            }
                        }
                    }
                }
                else if ("全景" === pIcon.m_pName) {
                    pIcon.m_pDraw = function (canvas, text, point, click) {
                        canvas.font = "18px Microsoft YaHei";
                        canvas.lineWidth = 2;

                        let w_ = canvas.measureText(text).width;
                        if (16 > w_) {
                            w_ = 16;
                        }

                        let x = point.x;
                        let y = point.y;
                        let y_ = y - 30;
                        let w = 48 + w_;
                        let hw = 0.5 * w;

                        if (!Drawable([x - hw, y_ - 32, w, 32])) {
                            return;
                        }

                        canvas.beginPath();
                        canvas.moveTo(x, y);
                        canvas.lineTo(x + 10, y - 6);
                        canvas.lineTo(x + 10, y - 14);
                        canvas.lineTo(x + 0, y - 8);
                        canvas.lineTo(x - 10, y - 14);
                        canvas.lineTo(x - 10, y - 6);
                        canvas.closePath();
                        canvas.fillStyle = "#6D56E8";
                        canvas.fill();

                        canvas.beginPath();
                        canvas.arc(x + hw - 16, y_ - 16, 15, 1.570796, -1.570796, true);
                        canvas.lineTo(x - hw + 16, y_ - 31);
                        canvas.lineTo(x - hw + 16, y_ - 1);
                        canvas.closePath();
                        canvas.fillStyle = "#6D56E8C0";
                        canvas.fill();
                        canvas.strokeStyle = "#FCE2CE";
                        canvas.stroke();

                        canvas.drawImage(pImage, x - hw, y_ - 32, 32, 32);

                        canvas.fillStyle = "#FFFFFF";
                        canvas.fillText(text, x - w_ * 0.5 + 10, y_ - 10);

                        if (click) {
                            if ((x - hw) < click.x && (x + hw) > click.x) {
                                if ((y_ - 32) < click.y && y_ > click.y) {
                                    return true;
                                }
                            }
                        }

                        return false;
                    };

                    pIcon.m_pDrawList = function (canvas, width, height, click) {
                        if (!pIcon.m_aList) {
                            return;
                        }

                        let pClick = null;

                        for (let pItem of pIcon.m_aList) {
                            pItem.m_mPosition = MiaokitJS.Miaokit.GisToWorld(pItem.m_mGisPos);
                            let pPoint = MiaokitJS.Miaokit.WorldToScreenPoint(pItem.m_mPosition);
                            if (-1.0 > pPoint.z) {
                                continue;
                            }

                            pPoint.x = pPoint.x * width;
                            pPoint.y = pPoint.y * height;

                            if (pIcon.m_pDraw(canvas, pItem.name, pPoint, click)) {
                                pClick = pItem;
                            }
                        }

                        return pClick;
                    }
                }
                else if ("商圈" === pIcon.m_pName) {
                    pIcon.m_pDraw = function (canvas, text, point) {
                        canvas.font = "18px Microsoft YaHei";
                        canvas.lineWidth = 2;

                        let w_ = canvas.measureText(text).width;
                        if (16 > w_) {
                            w_ = 16;
                        }

                        let x = point.x;
                        let y = point.y;
                        let y_ = y - 30;
                        let w = 48 + w_;
                        let hw = 0.5 * w;

                        if (!Drawable([x - hw, y_ - 32, w, 32])) {
                            return;
                        }

                        canvas.beginPath();
                        canvas.moveTo(x, y);
                        canvas.lineTo(x + 10, y - 6);
                        canvas.lineTo(x + 10, y - 14);
                        canvas.lineTo(x + 0, y - 8);
                        canvas.lineTo(x - 10, y - 14);
                        canvas.lineTo(x - 10, y - 6);
                        canvas.closePath();
                        canvas.fillStyle = "#F28A3A";
                        canvas.fill();

                        canvas.beginPath();
                        canvas.arc(x + hw - 16, y_ - 16, 15, 1.570796, -1.570796, true);
                        canvas.lineTo(x - hw + 16, y_ - 31);
                        canvas.lineTo(x - hw + 16, y_ - 1);
                        canvas.closePath();
                        canvas.fillStyle = "#F28A3AC0";
                        canvas.fill();
                        canvas.strokeStyle = "#FCE2CE";
                        canvas.stroke();

                        canvas.drawImage(pImage, x - hw, y_ - 32, 32, 32);

                        canvas.fillStyle = "#FFFFFF";
                        canvas.fillText(text, x - w_ * 0.5 + 10, y_ - 10);
                    };

                    pIcon.m_pDrawList = function (canvas, width, height) {
                        if (!pIcon.m_aList) {
                            return;
                        }

                        for (let pItem of pIcon.m_aList) {
                            pItem.m_mPosition = MiaokitJS.Miaokit.GisToWorld(pItem.m_mGisPos);
                            let pPoint = MiaokitJS.Miaokit.WorldToScreenPoint(pItem.m_mPosition);
                            if (-1.0 > pPoint.z) {
                                continue;
                            }

                            pPoint.x = pPoint.x * width;
                            pPoint.y = pPoint.y * height;

                            pIcon.m_pDraw(canvas, pItem.name, pPoint);
                        }
                    }
                }
                else if ("公交车" === pIcon.m_pName) {
                    pIcon.m_pDraw = function (canvas, text, point) {
                        canvas.font = "18px Microsoft YaHei";
                        canvas.lineWidth = 2;

                        let w_ = canvas.measureText(text).width;
                        if (16 > w_) {
                            w_ = 16;
                        }

                        let x = point.x;
                        let y = point.y;
                        let y_ = y - 30;
                        let w = 48 + w_;
                        let hw = 0.5 * w;

                        if (!Drawable([x - hw, y_ - 32, w, 32])) {
                            return;
                        }

                        canvas.beginPath();
                        canvas.moveTo(x, y);
                        canvas.lineTo(x + 10, y - 6);
                        canvas.lineTo(x + 10, y - 14);
                        canvas.lineTo(x + 0, y - 8);
                        canvas.lineTo(x - 10, y - 14);
                        canvas.lineTo(x - 10, y - 6);
                        canvas.closePath();
                        canvas.fillStyle = "#5BD648";
                        canvas.fill();

                        canvas.beginPath();
                        canvas.arc(x + hw - 16, y_ - 16, 15, 1.570796, -1.570796, true);
                        canvas.lineTo(x - hw + 16, y_ - 31);
                        canvas.lineTo(x - hw + 16, y_ - 1);
                        canvas.closePath();
                        canvas.fillStyle = "#5BD648C0";
                        canvas.fill();
                        canvas.strokeStyle = "#D6F5D2";
                        canvas.stroke();

                        canvas.drawImage(pImage, x - hw, y_ - 32, 32, 32);

                        canvas.fillStyle = "#FFFFFF";
                        canvas.fillText(text, x - w_ * 0.5 + 10, y_ - 10);
                    };

                    pIcon.m_pDrawList = function (canvas, width, height) {
                        if (!pIcon.m_aList) {
                            return;
                        }

                        for (let pItem of pIcon.m_aList) {
                            pItem.m_mPosition = MiaokitJS.Miaokit.GisToWorld(pItem.m_mGisPos);
                            let pPoint = MiaokitJS.Miaokit.WorldToScreenPoint(pItem.m_mPosition);
                            if (-1.0 > pPoint.z) {
                                continue;
                            }

                            pPoint.x = pPoint.x * width;
                            pPoint.y = pPoint.y * height;

                            pIcon.m_pDraw(canvas, pItem.name, pPoint);
                        }
                    }
                }
                else if ("停车场" === pIcon.m_pName) {
                    pIcon.m_pDraw = function (canvas, text, point) {
                        canvas.font = "18px Microsoft YaHei";
                        canvas.lineWidth = 2;

                        let w_ = canvas.measureText(text).width;
                        if (16 > w_) {
                            w_ = 16;
                        }

                        let x = point.x;
                        let y = point.y;
                        let y_ = y - 30;
                        let w = 48 + w_;
                        let hw = 0.5 * w;

                        if (!Drawable([x - hw, y_ - 32, w, 32])) {
                            return;
                        }

                        canvas.beginPath();
                        canvas.moveTo(x, y);
                        canvas.lineTo(x + 10, y - 6);
                        canvas.lineTo(x + 10, y - 14);
                        canvas.lineTo(x + 0, y - 8);
                        canvas.lineTo(x - 10, y - 14);
                        canvas.lineTo(x - 10, y - 6);
                        canvas.closePath();
                        canvas.fillStyle = "#0F73D8";
                        canvas.fill();

                        canvas.beginPath();
                        canvas.arc(x + hw - 16, y_ - 16, 15, 1.570796, -1.570796, true);
                        canvas.lineTo(x - hw + 16, y_ - 31);
                        canvas.lineTo(x - hw + 16, y_ - 1);
                        canvas.closePath();
                        canvas.fillStyle = "#0F73D8C0";
                        canvas.fill();
                        canvas.strokeStyle = "#C3DCF6";
                        canvas.stroke();

                        canvas.drawImage(pImage, x - hw, y_ - 32, 32, 32);

                        canvas.fillStyle = "#FFFFFF";
                        canvas.fillText(text, x - w_ * 0.5 + 10, y_ - 10);
                    };

                    pIcon.m_pDrawList = function (canvas, width, height) {
                        if (!pIcon.m_aList) {
                            return;
                        }

                        for (let pItem of pIcon.m_aList) {
                            pItem.m_mPosition = MiaokitJS.Miaokit.GisToWorld(pItem.m_mGisPos);
                            let pPoint = MiaokitJS.Miaokit.WorldToScreenPoint(pItem.m_mPosition);
                            if (-1.0 > pPoint.z) {
                                continue;
                            }

                            pPoint.x = pPoint.x * width;
                            pPoint.y = pPoint.y * height;

                            pIcon.m_pDraw(canvas, pItem.name, pPoint);
                        }
                    }
                }
                else if ("公司" === pIcon.m_pName) {
                    pIcon.m_pDraw = function (canvas, text, point) {
                        canvas.font = "18px Microsoft YaHei";
                        canvas.lineWidth = 2;

                        let w_ = canvas.measureText(text).width;
                        let x = point.x;
                        let y = point.y;
                        let rw = 32 + w_;
                        let rh = 32 + 10;
                        let rx = x - rw * 0.5;
                        let ry = y + 2;

                        if (!Drawable([rx, ry - rh, rw, rh])) {
                            return;
                        }

                        canvas.beginPath();
                        canvas.moveTo(rx, ry);
                        canvas.lineTo(rx + rw, ry);
                        canvas.lineTo(rx + rw, ry - rh);
                        canvas.lineTo(rx, ry - rh);
                        canvas.closePath();
                        canvas.fillStyle = "#777777";
                        canvas.fill();

                        canvas.beginPath();
                        canvas.moveTo(x, y);
                        canvas.lineTo(x + 8, y - 8);
                        canvas.lineTo(x + 6, y - 10);
                        canvas.lineTo(x + 0, y - 4);
                        canvas.lineTo(x - 6, y - 10);
                        canvas.lineTo(x - 8, y - 8);
                        canvas.closePath();
                        canvas.fillStyle = "#FFFFFF";
                        canvas.fill();

                        canvas.fillStyle = "#FFFFFF";
                        canvas.fillText(text, x - w_ * 0.5, y - 14);
                    };

                    pIcon.m_pDrawList = function (canvas, width, height) {
                        if (!pIcon.m_aList) {
                            return;
                        }

                        for (let pItem of pIcon.m_aList) {
                            if (pItem.position) {
                                let pPoint = MiaokitJS.Miaokit.WorldToScreenPoint(pItem.position);
                                if (-1.0 > pPoint.z) {
                                    continue;
                                }

                                pPoint.x = pPoint.x * width;
                                pPoint.y = pPoint.y * height;

                                pIcon.m_pDraw(canvas, pItem.name, pPoint);
                            }
                        }
                    }
                }
                else if ("房间" === pIcon.m_pName) {
                    pIcon.m_pDraw = function (canvas, text, point, click, url) {
                        canvas.font = "18px Microsoft YaHei";
                        canvas.lineWidth = 2;

                        let w_ = canvas.measureText(text).width;
                        let x = point.x;
                        let y = point.y;
                        let rw = 32 + w_;
                        let rh = 32 + 10;
                        let rx = x - rw * 0.5;
                        let ry = y + 2;

                        if (!Drawable([rx, ry - rh, rw, rh])) {
                            return;
                        }

                        canvas.beginPath();
                        canvas.moveTo(rx, ry);
                        canvas.lineTo(rx + rw, ry);
                        canvas.lineTo(rx + rw, ry - rh);
                        canvas.lineTo(rx, ry - rh);
                        canvas.closePath();
                        canvas.fillStyle = url ? "#3598FE" : "#777777";
                        canvas.fill();

                        canvas.beginPath();
                        canvas.moveTo(x, y);
                        canvas.lineTo(x + 8, y - 8);
                        canvas.lineTo(x + 6, y - 10);
                        canvas.lineTo(x + 0, y - 4);
                        canvas.lineTo(x - 6, y - 10);
                        canvas.lineTo(x - 8, y - 8);
                        canvas.closePath();
                        canvas.fillStyle = "#FFFFFF";
                        canvas.fill();

                        canvas.fillStyle = "#FFFFFF";
                        canvas.fillText(text, x - w_ * 0.5, y - 14);

                        if (click && url) {
                            if (rx < click.x && (rx + rw) > click.x) {
                                if ((ry - rh) < click.y && ry > click.y) {
                                    return true;
                                }
                            }
                        }

                        return false;
                    };

                    pIcon.m_pDrawList = function (canvas, width, height, click) {
                        if (!pIcon.m_aList) {
                            return;
                        }

                        let pClick = null;

                        for (let pItem of pIcon.m_aList) {
                            if (pItem.position_) {
                                let pPoint = MiaokitJS.Miaokit.WorldToScreenPoint(pItem.position_);
                                if (-1.0 > pPoint.z) {
                                    continue;
                                }

                                pPoint.x = pPoint.x * width;
                                pPoint.y = pPoint.y * height;

                                if (pIcon.m_pDraw(canvas, pItem.name, pPoint, click, pItem.panoramaurl)) {
                                    pClick = pItem;
                                }
                            }
                        }

                        return pClick;
                    }
                }
            };
        }
    }

    /// 开始主程序。
    public Start(): void {
        let pThis = this;

        pThis.m_pCamera = MiaokitJS.App.m_pCameraCtrl;

        MiaokitJS.ShaderLab.SetSunlight(0.0, 60.0, 0.1);

        MiaokitJS.Request("GET", "json", "http://infrastructure.yongtoc.com/api/engineering/getInfoByCity?city=桂林", null, null, function (jCity) {
            jCity.response.longitude = "110.309393";
            jCity.response.latitude = "25.282938";

            pThis.SwitchCity(jCity.response);
        });
    }

    /// 帧更新方法。
    public Update(): void {
        let pThis = this;

        pThis.m_nTick++;

        if (pThis.m_nTick % 180 === 0) {
            console.log(pThis.m_pCamera);
        }

        if (pThis.m_nViewStepCount > pThis.m_nViewStep) {
            pThis.m_pViewFlush(++pThis.m_nViewStep, pThis.m_nViewStepCount);
        }

        if (MiaokitJS.App.m_pPanoramas.panor) {
            let nState = MiaokitJS.App.m_pPanoramas.panor.m_nState;

            MiaokitJS.App.m_pPanoramas.Update();

            if (2 < nState) {
                return;
            }
        }

        for (let pCity of pThis.m_aCity) {
            pCity.Update();
        }

        if (MiaokitJS.App.m_pGis) {
            MiaokitJS.App.m_pGis.Update(pThis.m_pCamera.lng, pThis.m_pCamera.lat, pThis.m_pCamera.distance);
        }
    }

    /// 响应UI绘制。
    public OnGUI(pCanvas, pCanvasCtx): void {
        let pThis = this;

        pCanvas.font = "16px Microsoft YaHei";
        pCanvas.strokeStyle = "black";
        pCanvas.lineWidth = 2;
        pCanvas.fillStyle = "#FFFFFF";
        //0\5\6
        let bOutPanor = true;

        if (MiaokitJS.App.m_pPanoramas.panor) {
            if (2 < MiaokitJS.App.m_pPanoramas.panor.m_nState) {
                if (10 > MiaokitJS.App.m_pPanoramas.panor.m_nRadius) {
                    bOutPanor = false;
                }
            }
        }

        for (let i = 0; i < pThis.m_aIcon.length; i++) {
            let pIcon = pThis.m_aIcon[i];
            if (pIcon.m_pDraw) {
                if (0 === i) {
                    if (bOutPanor) {
                        pIcon.m_aList = null;

                        if (pThis.m_pActiveCity) {
                            pIcon.m_aList = pThis.m_pActiveCity.indoors;
                        }

                        pIcon.m_pDrawList(pCanvasCtx, pCanvas.width, pCanvas.height);
                    }
                    else {
                        pIcon.m_aList = null;
                        pIcon.m_pDrawList(pCanvasCtx, pCanvas.width, pCanvas.height);
                    }
                }
                else if (1 === i) {
                    let pPanor = pIcon.m_pDrawList(pCanvasCtx, pCanvas.width, pCanvas.height, pThis.m_pClick);
                    if (pPanor) {
                        if (!pPanor.m_pPanor) {
                            let mLngLat = { x: parseFloat(pPanor.long), y: parseFloat(pPanor.lat) };
                            let mOffset = { x: 0.0, y: 80.0, z: 0.0 };
                            let pGisPosition = MiaokitJS.Miaokit.LngLatToGis(mLngLat, mOffset, 167.0);
                            let pPosition = MiaokitJS.Miaokit.GisToWorld(pGisPosition);

                            pPanor.m_pPanor = {
                                m_pName: pPanor.name,
                                m_pPath: pPanor.data,
                                m_mPosition: pPosition,
                                m_nRadius: 50.0,
                                m_nAngle: Math.PI * -0.35
                            };
                        }

                        pThis.EnterPanoramas(pPanor.m_pPanor);
                    }
                }
                else if (6 === i) {
                    let pPanor = pIcon.m_pDrawList(pCanvasCtx, pCanvas.width, pCanvas.height, pThis.m_pClick);
                    if (pPanor) {
                        if (!pPanor.m_pPanor) {
                            let pPosition = { x: pPanor.position_.x, y: pPanor.position_.y + 1.5, z: pPanor.position_.z };

                            pPanor.m_pPanor = {
                                m_pName: pPanor.name,
                                m_pPath: pPanor.panoramaurl,
                                m_mPosition: pPosition,
                                m_nRadius: 2.0,
                                m_nAngle: Math.PI * -0.35,
                                m_nStartLevel: 0,
                            };
                        }

                        pThis.EnterPanoramas(pPanor.m_pPanor);
                    }
                }
                else if (bOutPanor) {
                    pIcon.m_pDrawList(pCanvasCtx, pCanvas.width, pCanvas.height);
                }
            }
        }

        pThis.m_pClick = null;
    }


    /// 切换城市。
    public SwitchCity(jCity): void {
        let pThis = this;
        let pCity = null;

        for (let pCity_ of pThis.m_aCity) {
            if (pCity_.object.city === jCity.city) {
                pCity = pCity_;
                break;
            }
        }

        if (!pCity) {
            pCity = new City(jCity);
            pThis.m_aCity.push(pCity);
        }

        if (pCity !== pThis.m_pActiveCity) {
            if (pThis.m_pActiveCity) {
                pThis.m_pActiveCity.Leave();
            }

            pThis.m_pActiveCity = pCity;

            pThis.m_pActiveCity.Enter();

            let nLng = parseFloat(pCity.object.longitude);
            let nLat = parseFloat(pCity.object.latitude);
            MiaokitJS.Miaokit.gisBase = { x: nLng, y: nLat, z: 0.0 };

            pThis.m_pCamera.Jump(MiaokitJS.UTIL.CTRL_MODE.REMOTE, {
                m_nLng: nLng,
                m_nLat: nLat,
                m_nHeight: 18000.0
            });
        }
    }

    /// 进入实景范围。
    public EnterDior(pName): void {
        let pThis = this;

        if (pThis.m_pActiveCity) {
            pThis.m_pActiveCity.EnterDior(pName);
        }
    }

    /// 切换园区。
    public EnterPark(pName): void {
        let pThis = this;

        if (pThis.m_pActiveCity) {
            pThis.m_pActiveCity.EnterPark(pName);
        }
    }

    /// 进入房间。
    public EnterRoom(pRoom): void {
        let pThis = this;

        if (pThis.m_pActiveCity) {
            pThis.m_pActiveCity.EnterRoom(pRoom);
        }
    }

    /// 退出房间回到园区。
    public CloseRoom(): void {
        let pThis = this;

        if (pThis.m_pActiveCity) {
            pThis.m_pActiveCity.CloseRoom();
        }
    }

    /// 切换当前楼层。
    public SwitchLayer(pID): void {
        let pThis = this;

        if (pThis.m_pActiveCity) {
            pThis.m_pActiveCity.SwitchLayer(pID);
        }
    }

    /// 进入全景图。
    public EnterPanoramas(pPanor): void {
        let pThis = this;
        let mTarget = pThis.m_pCamera.target;

        MiaokitJS.App.m_pPanoramas.Open(pPanor, {
            m_pTransform: pThis.m_pCamera.m_pTransform,
            m_mTarget: { x: mTarget.x, y: mTarget.y, z: mTarget.z },
            m_nDistance: pThis.m_pCamera.distance,
            m_nPitch: pThis.m_pCamera.pitch,
            m_nYaw: pThis.m_pCamera.yaw,
            m_nField: 60.0
        });

        pThis.m_pCamera.enabled = false;
        webgl_call_web_showVR();
    }

    /// 关闭全景图。
    public ClosePanoramas(): void {
        let pThis = this;

        MiaokitJS.App.m_pPanoramas.Close();
        pThis.m_pCamera.enabled = true;
    }

    /// 设置后台录入的园区层次结构信息
    public SetParkInfo(aHierarchical): void {
        let pThis = this;
        let pPark = pThis.m_pActiveCity ? pThis.m_pActiveCity.park : null;
        if (pPark && !pPark.m_aHierarchical) {
            pPark.m_aHierarchical = aHierarchical;
        }
    }

    /// 显示兴趣点。
    public ShowOutdoorPOI(pType, aList): void {
        let pThis = this;

        for (let pIcon of pThis.m_aIcon) {
            if (pType === pIcon.m_pName) {
                pIcon.m_aList = aList;

                if (aList) {
                    for (let pItem of aList) {
                        let nLat = parseFloat(pItem.lat);
                        let nLng = parseFloat(pItem.long);

                        pItem.m_mGisPos = MiaokitJS.Miaokit.LngLatToGis({ x: nLng, y: nLat }, { x: 0.0, y: 0.0, z: 0.0 }, 168.0);
                        pItem.m_mPosition = MiaokitJS.Miaokit.GisToWorld(pItem.m_mGisPos);
                    }
                }

                break;
            }
        }
    }

    /// 绘制室内POI。
    public DrawIndoorPOI(pTile_, pBuilding_, pFloor_, pPart_): void {
        let pThis = this;
        let pPark = pThis.m_pActiveCity ? pThis.m_pActiveCity.park : null;

        if (!pPark) {
            return;
        }
        
        let aBuilding = pPark.m_aHierarchical;
        if (!aBuilding) {
            return;
        }

        for (let pBuilding of aBuilding) {
            if (pTile_ === pBuilding.project_title && pBuilding_ === pBuilding.code) {
                if (!pBuilding.tile) {
                    for (let pTile of pPark.sves) {
                        if (pBuilding.project_title === pTile.name) {
                            pBuilding.tile = pTile;

                            for (let pScene of pTile.m_aScene) {
                                if (pBuilding_ === pScene.BuildingID) {
                                    pBuilding.scene = pScene;
                                    break;
                                }
                            }

                            break;
                        }
                    }
                }

                if (pBuilding.scene) {
                    for (let pFloor of pBuilding.child) {
                        if (pFloor_ === pFloor.code) {
                            if (!pFloor.layer) {
                                for (let pLayer of pBuilding.scene.m_aLayer) {
                                    if (pFloor_ === pLayer.ID) {
                                        pFloor.layer = pLayer;
                                        break;
                                    }
                                }
                            }

                            if (pFloor.layer) {
                                let pTransform = pFloor.layer.m_pLayer.object3D.transform;
                                let pGisPosition = pTransform.position;
                                let pPosition = MiaokitJS.Miaokit.GisToWorld(pGisPosition);

                                let bReset = false;

                                if (pFloor.position) {
                                    let x = Math.abs(pPosition.x - pFloor.position.x);
                                    let y = Math.abs(pPosition.y - pFloor.position.y);
                                    let z = Math.abs(pPosition.z - pFloor.position.z);

                                    if (x > 1.0 || y > 1.0 || z > 1.0) {
                                        bReset = true;
                                    }
                                }
                                else {
                                    bReset = true;
                                }

                                if (bReset) {
                                    pFloor.position = pPosition;

                                    for (let pSite of pFloor.layer.m_pLayer.sites) {
                                        let pID = pSite.id;

                                        for (let pRoom of pFloor.child) {
                                            if (pRoom.code === pID) {
                                                pGisPosition = pTransform.TransformPoint(pSite.position);
                                                pPosition = MiaokitJS.Miaokit.GisToWorld(pGisPosition);
                                                pPosition.y = pFloor.position.y + 1;

                                                pRoom.position = pPosition;
                                                break;
                                            }
                                        }
                                    }
                                }

                                if (pPart_) {
                                    for (let pRoom of pPart_) {
                                        pGisPosition = pTransform.TransformPoint(pRoom.point);
                                        pPosition = MiaokitJS.Miaokit.GisToWorld(pGisPosition);
                                        pPosition.y = pFloor.position.y + 1;

                                        pRoom.position_ = pPosition;
                                    }
                                }
                                

                                pThis.m_aIcon[5].m_aList = pFloor.child;
                                pThis.m_aIcon[6].m_aList = pPart_;
                            }
                        }
                    }
                }

                break;
            }
        }
    }

    /// 隐藏室内POI。
    public HideIndoorPOI(): void {
        this.m_aIcon[5].m_aList = null;
        this.m_aIcon[6].m_aList = null;
    }

    /// 响应GIS样式变换。
    public OnGisSwitch(): void {
        let pThis = this;

        for (let pCity of pThis.m_aCity) {
            if (1 === pCity.state) {
                let data = pCity.object;

                if (data.dioramas) {
                    for (let pDior of data.dioramas) {
                        let pObject = pDior.m_pDior.object3D;
                        let nLng = parseFloat(pDior.longitude);
                        let nLat = parseFloat(pDior.latitude);
                        let nHeight = parseFloat(pDior.height);

                        MiaokitJS.App.m_pGis.MoveGameObject(pObject, nLng, nLat, nHeight);
                    }
                }

                if (data.sves) {
                    for (let pSve of data.sves) {
                        if (pSve.m_pTile) {
                            let pObject = pSve.m_pTile.object3D;
                            let nLng = parseFloat(pSve.longitude);
                            let nLat = parseFloat(pSve.latitude);
                            let nHeight = parseFloat(pSve.height);

                            MiaokitJS.App.m_pGis.MoveGameObject(pObject, nLng, nLat, nHeight);
                        }
                    }
                }
            }
        }
    }

    /// 切换摄像机2/3D模式。
    public SwitchCameraMode(nMode): void {
        MiaokitJS.App.m_pCameraCtrl.viewMode = nMode;
    }

    /// 重置摄像机。
    public ResetCamera(): void {
        let pThis = this;

        if (pThis.m_pActiveCity) {
            pThis.m_pActiveCity.ResetCamera();
        }
    }


    /// 经纬度渐进跳转。
    public FlyLngLat(pStart, pEnd, nStepCount, pProcess) {
        // 视图飞跃只能在全景模式下操作，飞跃过程中暂停瓦片刷新。遥感模式、鹰眼模式为手控模式，在退出全景模式时可用
        let nLngS = pStart.m_nLng;
        let nLngE = pEnd.m_nLng;

        let nLatS = pStart.m_nLat;
        let nLatE = pEnd.m_nLat;

        let pCamera = MiaokitJS.App.m_pCameraCtrl;
        let nThreshold = Math.ceil(nStepCount * 0.5);

        let pPosS = MiaokitJS.Miaokit.LngLatToGis({ x: nLngS, y: nLatS }, pStart.m_mTarget, 0.0);
        let pPosE = MiaokitJS.Miaokit.LngLatToGis({ x: nLngE, y: nLatE }, pEnd.m_mTarget, 0.0);
        let X = pPosE.x - pPosS.x; X *= X;
        let Y = pPosE.y - pPosS.y; Y *= Y;
        let Z = pPosE.z - pPosS.z; Z *= Z;
        let nHeightM = Math.sqrt(X + Y + Z);
        if (nHeightM < pStart.m_nDistance) {
            nHeightM = pStart.m_nDistance;
        }

        // 0.摄像机抬高到中间高度，俯角趋向90度，偏航角趋向0，坐标趋向0
        let nDistanceS0 = pStart.m_nDistance;
        let nDistanceE0 = nHeightM;

        let nPitchS0 = pStart.m_nPitch;
        let nPitchE0 = 90.0;

        let nYawS0 = pStart.m_nYaw;
        let nYawE0 = 0.0;

        let mTargetS0 = pStart.m_mTarget;
        let mTargetE0 = { x: 0.0, y: 0.0, z: 0.0 };

        // 2.摄像机降低到指定高度，俯角趋向指定值，偏航角趋向指定值，坐标趋向指定值
        let nDistanceS1 = nHeightM;
        let nDistanceE1 = pEnd.m_nDistance;

        let nPitchS1 = 90.0;
        let nPitchE1 = pEnd.m_nPitch;

        let nYawS1 = 0.0;
        let nYawE1 = pEnd.m_nYaw;

        let mTargetS1 = { x: 0.0, y: 0.0, z: 0.0 };
        let mTargetE1 = pEnd.m_mTarget;

        pCamera.ctrlMode = MiaokitJS.UTIL.CTRL_MODE.PANORAMA;

        // 视图刷新方法
        let Flush = function (nStep, nCount) {
            let nStage = nStep > nThreshold ? 1 : 0;

            let nLerp = nStep / nCount;
            let nLng = nLngS + (nLngE - nLngS) * nLerp;
            let nLat = nLatS + (nLatE - nLatS) * nLerp;

            if (0 === nStage) {
                nLerp = nStep / nThreshold;

                let nDistance = nDistanceS0 + (nDistanceE0 - nDistanceS0) * nLerp;
                let nPitch = nPitchS0 + (nPitchE0 - nPitchS0) * nLerp;
                let nYaw = nYawS0 + (nYawE0 - nYawS0) * nLerp;

                let nX = mTargetS0.x + (mTargetE0.x - mTargetS0.x) * nLerp;
                let nY = mTargetS0.y + (mTargetE0.y - mTargetS0.y) * nLerp;
                let nZ = mTargetS0.z + (mTargetE0.z - mTargetS0.z) * nLerp;

                pCamera.lng = nLng;
                pCamera.lat = nLat;
                pCamera.distance = nDistance;
                pCamera.pitch = nPitch;
                pCamera.yaw = nYaw;
                pCamera.target = { x: nX, y: nY, z: nZ };
            }
            else {
                nLerp = (nStep - nThreshold) / (nCount - nThreshold);

                let nDistance = nDistanceS1 + (nDistanceE1 - nDistanceS1) * nLerp;
                let nPitch = nPitchS1 + (nPitchE1 - nPitchS1) * nLerp;
                let nYaw = nYawS1 + (nYawE1 - nYawS1) * nLerp;

                let nX = mTargetS1.x + (mTargetE1.x - mTargetS1.x) * nLerp;
                let nY = mTargetS1.y + (mTargetE1.y - mTargetS1.y) * nLerp;
                let nZ = mTargetS1.z + (mTargetE1.z - mTargetS1.z) * nLerp;

                pCamera.lng = nLng;
                pCamera.lat = nLat;
                pCamera.distance = nDistance;
                pCamera.pitch = nPitch;
                pCamera.yaw = nYaw;
                pCamera.target = { x: nX, y: nY, z: nZ };
            }

            if (pProcess) {
                pProcess(nStep, nCount);
            }
        };

        this.m_nViewStep = 0;
        this.m_nViewStepCount = nStepCount;
        this.m_pViewFlush = Flush;
    }

    /// 镜头渐进跳转。
    public Fly(pStart, pEnd, nStepCount, pProcess) {
        // 视图飞跃只能在全景模式下操作，飞跃过程中暂停瓦片刷新。遥感模式、鹰眼模式为手控模式，在退出全景模式时可用

        let pCamera = MiaokitJS.App.m_pCameraCtrl;
        let mTargetS = pStart.m_mTarget;
        let mTargetE = pEnd.m_mTarget;

        pCamera.ctrlMode = MiaokitJS.UTIL.CTRL_MODE.PANORAMA;

        // 视图刷新方法
        let Flush = function (nStep, nCount) {
            let nLerp = nStep / nCount;

            let nDistance = pStart.m_nDistance + (pEnd.m_nDistance - pStart.m_nDistance) * nLerp;
            let nPitch = pStart.m_nPitch + (pEnd.m_nPitch - pStart.m_nPitch) * nLerp;
            let nYaw = pStart.m_nYaw + (pEnd.m_nYaw - pStart.m_nYaw) * nLerp;

            let nX = mTargetS.x + (mTargetE.x - mTargetS.x) * nLerp;
            let nY = mTargetS.y + (mTargetE.y - mTargetS.y) * nLerp;
            let nZ = mTargetS.z + (mTargetE.z - mTargetS.z) * nLerp;

            pCamera.distance = nDistance;
            pCamera.pitch = nPitch;
            pCamera.yaw = nYaw;
            pCamera.target = { x: nX, y: nY, z: nZ };

            if (pProcess) {
                pProcess(nStep, nCount);
            }
        };

        this.m_nViewStep = 0;
        this.m_nViewStepCount = nStepCount;
        this.m_pViewFlush = Flush;
    }

    /// 响应拖拽事件。
    private OnDrag(nOffsetX, nOffsetY, nWidth, nHeight): void {
        MiaokitJS.App.m_pPanoramas.Rotate(nOffsetX, nOffsetY, nWidth, nHeight);
    }

    /// 响应点击事件。
    private OnClick(nTimes, pPoint): void {
        if (1 === nTimes) {
            this.m_pClick = pPoint;
        }
    }


    /// 获取主程序计时。
    public get tick(): number {
        return this.m_nTick;
    }

    /// 获取摄像机控制器。
    public get camera(): any {
        return this.m_pCamera;
    }

    /// 获取GIS对象。
    public get gis(): any {
        return MiaokitJS.App.m_pGis;
    }


    /// 城市对象列表。
    private m_aCity: City[] = [];
    /// 当前处在的城市。
    private m_pActiveCity: City = null;
    /// 摄像机对象。
    private m_pCamera: any = null;
    /// 主程序计时器。
    private m_nTick: number = 0;

    /// 当前步进。
    private m_nViewStep: number = 0;
    /// 当前步进总数。
    private m_nViewStepCount: number = 0;
    /// 镜头运动进度刷新函数。
    private m_pViewFlush: any = null;

    /// 当前点击时间。
    private m_pClick: any = null;
    /// 图标列表。
    private m_aIcon = [
        { m_pName: "楼宇", m_pPath: "./data/projects/images/building.png", m_pImage: null, m_pDraw: null, m_aList: null, m_pDrawList: null },
        { m_pName: "全景", m_pPath: "./data/projects/images/panor.png", m_pImage: null, m_pDraw: null, m_aList: null, m_pDrawList: null },
        { m_pName: "商圈", m_pPath: "./data/projects/images/business.png", m_pImage: null, m_pDraw: null, m_aList: null, m_pDrawList: null },
        { m_pName: "公交车", m_pPath: "./data/projects/images/bus.png", m_pImage: null, m_pDraw: null, m_aList: null, m_pDrawList: null },
        { m_pName: "停车场", m_pPath: "./data/projects/images/park.png", m_pImage: null, m_pDraw: null, m_aList: null, m_pDrawList: null },
        { m_pName: "公司", m_pPath: "./data/projects/images/building.png", m_pImage: null, m_pDraw: null, m_aList: null, m_pDrawList: null },
        { m_pName: "房间", m_pPath: "./data/projects/images/building.png", m_pImage: null, m_pDraw: null, m_aList: null, m_pDrawList: null },
    ];
}

new Main();

/*
高亮选中房间格局；
绑定后台录入的房间名称并显示；
进入室内后显示楼层列表菜单并可以切换楼层；
预处理实景模型，预处理后跳转室内可立即压平建筑；
摄像机2D/3D切换按钮（待优化）；
摄像机重置按钮；
商圈、公交车、停车场POI、全景图显示隐藏按钮（待优化）；
点击全景图浮标进入全景图；
全景图叠加POI；

已提交以下更新：
POI背后可见性判断；
POI动态遮挡隐藏；
切换到2D视图状态优化；
摄像机旋转累积量约束；
优化摄像机跳转时的旋转；
摄像机远近拉伸按钮实现；
修复实景模型在2D模式下裁剪异常问题；
不加载室内模型；
首页展示全景图按钮，优化全景图关闭；

室内名称显示优化；
室内格局名称；
室内全景图显示跳转；
楼宇压平问题修复；
提高低画质版本画质；
稳定不同帧率情况下的动画流畅性；
略微降低低帧率情况下触屏事件延迟；

1、实现实景模型绕Y轴旋转、缩放矫正；
2、实现地图样式切换；
3、实现地图样式切换时，附着模型坐标修改；
4、实现地图基准坐标设置，可移动观察中心经纬度时附着模型跟随移动并维持绘制精度；
5、修复对象设置父级为空时异常问题；
6、更新新地形返回无效数据的判断；
7、修复子线程加载数据失败不返回问题；
8、实现实景模型绕X轴旋转；
9、移除SVE工程预加载代码；
10、实现SVE工程资源地址配置；

1、修复跳转到低精度区域，地图等所有高清瓦片加载完才一次性显示处理的问题（3级->12级[中间级]->17级）
——3级覆盖范围下有数百个12级，由低级到高级加载顺序下，要等这数百个12级都加载完才会隐藏第3级。如果由高级到低级顺序加载，12级的中间级无效，因为中间级会因为没有被绘制而被卸载（此时仍在绘制第3级），因而等到所有第17级加载完才会隐藏第3级
——要保留中间级卸载机制，要保留从高级到低级的加载顺序，要保证快速递进显示，设定9级、12级为阈值中间层级，保证渐变。第10级以下权重+30，10级到12级权重+10，12级以上权重+0，按权重从高到低加载。
——存在子级，但子级资源未加载完成时，从父级引用资源来绘制子级，避免大级别跃迁时，要耗费大量时间等待所有叶子层级都加载完资源才显示叶子层级。
2、3000米以下，低于12级瓦片不绘制的限制，在急速接近地表时，地图漏空问题。实现继承上级资源绘制后解决了该问题；

1、编辑上传15个SVE工程，6个实景模型，2个园区。
2、修复“U型楼梯”模型错乱问题。Exporter.cs->Packer.Pack(Mesh pMesh)，添加判断UV和法线不为空并且长度不为0的判断。
3、重新开放室内模型加载。
4、实现空预制件、在模型缺失时处理掉异常。
5、APP_LOAD_BIN追加判断路径为空的情况。
6、公共库修改：移除摄像机Fly方法、优化摄像机经纬度平移控制参数、移除摄像机经纬度赋值限制，修改GIS配置方法、移除实景模型配置初始化、移除SVE工程配置初始化、新增GIS样式切换方法，渲染管线添加GIS参考偏移、修复GIS球体大小误差、修改GIS地形高度矫正参数、新增GIS继承瓦片参数

道路显示


GIS瓦片精度匹配优化（还有优化空间）；
GIS经纬度平移优化（还有优化空间）；
GIS瓦片动态管理优化
低画质抗锯齿优化

去除实景模型初始化时加载
去除SVE工程初始化时加载

城市自由配置
完善经纬度移动是，附着模型的移动功能
完善不同GIS模式下，模型高程适配问题
优化渲染管线，优化抗锯齿

必须从数据端缩放和旋转实景模型，否则基于世界坐标的压平有问题，可见性判断也不好处理。
如果GIS不带地形，去除GIS的深度缓存
摄像机小于3000时，GIS瓦片突然消失（此时高精度未加载出来）（设计在摄像机小于3000时，不会制精度低于12级的瓦片来节省开销，暂时移除该限制）
摄像机拉远时，地图会有漏洞（一个范围低精度瓦片还没有加载完成，但其子级已经被卸载了）
突然切换到某个地方，加载非常慢，本来第5级显示，突然切换到第17级显示，需要等第5级覆盖范围的所有17级都加载完成才会显示出来，过程就会很慢（修改为8、12几个中间级要加载）

已提交以下更新：
临时移除楼栋标签显示

Fanglb
 */

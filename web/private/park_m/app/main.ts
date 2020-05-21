
declare var MiaokitJS: any;
declare var webgl_call_web_hide_floor_list: any;
declare var webgl_call_web_show_floor_list: any;
declare var webgl_call_web_active_floor: any;
declare var webgl_call_web_showVR: any;


class RoomViewer {
    /// 房间浏览器：0未开始->1大楼整体->2楼层展开->3聚焦楼层->4聚焦房间->5自由交互->6进行退出->7完成退出。
    public constructor() {
    }

    /// 进入房间。
    public Enter(pIndoor, pLayer, pRoom): void {
        let pThis = this;

        pThis.m_pCamera = MiaokitJS.App.m_pCameraCtrl;

        if (pThis.m_pIndoor !== pIndoor) {
            if (pThis.m_pIndoor) {
                pThis.m_pIndoor.Deactive();
            }

            pThis.m_pIndoor = pIndoor;

            /// 重新从大楼整体开始浏览
            pThis.SetState(1);
        }

        if (pThis.m_pLayer !== pLayer) {
            pThis.m_pLayer = pLayer;
            pThis.m_pLayer.m_pView = {
                m_mTarget: { x: pThis.m_pIndoor.m_pView.m_mTarget.x, y: pThis.m_pIndoor.m_pView.m_mTarget.y + pLayer.m_nIndex * 7.0, z: pThis.m_pIndoor.m_pView.m_mTarget.z },
                m_nDistance: 150.0,
                m_nPitch: pThis.m_pIndoor.m_pView.m_nPitch,
                m_nYaw: pThis.m_pIndoor.m_pView.m_nYaw
            };

            /// 当前已经展开楼层，重新从聚焦楼层开始浏览
            if (2 < pThis.m_nState) {
                pThis.SetState(3);
            }
        }

        {
            pThis.m_pRoom = pRoom;

            pRoom.m_mTarget.y = pThis.m_pLayer.m_pView.m_mTarget.y;

            pThis.m_pRoom.m_pView = {
                m_mTarget: pRoom.m_mTarget,
                m_nDistance: 30.0,
                m_nPitch: 50.0,
                m_nYaw: pThis.m_pLayer.m_pView.m_nYaw
            };

            /// 当前已经聚焦楼层，重新开始聚焦房间
            if (2 < pThis.m_nState) {
                pThis.SetState(4);
            }
        }
    }

    /// 退出房间。
    public Exit(): void {
        let pThis = this;

        if (1 < pThis.m_nState) {
            pThis.SetState(6);
        }
        else {
            pThis.SetState(7);
        }

        webgl_call_web_hide_floor_list();
    }

    /// 切换楼层。
    public SwitchLayer(pID): void {
        let pThis = this;
        let pLayer = null;

        if (5 !== pThis.m_nState) {
            return;
        }

        for (let pLayer_ of pThis.m_pIndoor.m_pScene.m_pScene.layers) {
            let bShow = pLayer_._id === pID;

            pLayer_.object3D.active = bShow;
            pLayer_.object3D.highlight = false;
            pLayer_.decorationObject3D.active = bShow;

            if (bShow) {
                webgl_call_web_active_floor(pID);
                pLayer = pLayer_;
            }
        }

        pThis.m_pCurView = {
            m_mTarget: pThis.m_pCamera.target,
            m_nDistance: pThis.m_pCamera.distance,
            m_nPitch: pThis.m_pCamera.pitch,
            m_nYaw: pThis.m_pCamera.yaw
        };

        pThis.m_pDstView = pThis.m_pLayer.m_pView;

        pThis.m_nStep = 0;
        pThis.m_nStepCount = 60;

        pThis.m_pDrawPOI = MiaokitJS.App.m_pProject.DrawIndoorPOI(pThis.m_pIndoor.m_pTile.m_pName, pThis.m_pIndoor.m_pScene.building_id, pID);
    }

    /// 更新浏览状态。
    public Update(): void {
        let pThis = this;

        if (0 < pThis.m_nState) {
            if (pThis.m_nStepCount > pThis.m_nStep) {
                let nLerp = ++pThis.m_nStep / pThis.m_nStepCount;
                let mCurTarget = pThis.m_pCurView.m_mTarget;
                let mDstTarget = pThis.m_pDstView.m_mTarget;
                let mTarget = { x: 0.0, y: 0.0, z: 0.0 };
                let nDistance = 0.0;
                let nPitch = 0.0;
                let nYaw = 0.0;

                mTarget.x = mCurTarget.x + (mDstTarget.x - mCurTarget.x) * nLerp;
                mTarget.y = mCurTarget.y + (mDstTarget.y - mCurTarget.y) * nLerp;
                mTarget.z = mCurTarget.z + (mDstTarget.z - mCurTarget.z) * nLerp;

                nDistance = pThis.m_pCurView.m_nDistance + (pThis.m_pDstView.m_nDistance - pThis.m_pCurView.m_nDistance) * nLerp;
                nPitch = pThis.m_pCurView.m_nPitch + (pThis.m_pDstView.m_nPitch - pThis.m_pCurView.m_nPitch) * nLerp;
                nYaw = pThis.m_pCurView.m_nYaw + (pThis.m_pDstView.m_nYaw - pThis.m_pCurView.m_nYaw) * nLerp;

                pThis.m_pCamera.target = mTarget;
                pThis.m_pCamera.distance = nDistance;
                pThis.m_pCamera.pitch = nPitch;
                pThis.m_pCamera.yaw = nYaw;

                /// 刷新大楼透明度
                if (2 === pThis.m_nState) {
                    nDistance = (150.0 > nDistance ? 150.0 : (300.0 < nDistance ? 300.0 : nDistance)) - 150.0;

                    pThis.m_pIndoor.SetBuildingOpacity(nDistance / 150.0 * 255.0);
                }
                else if (3 === pThis.m_nState) {
                    pThis.m_pIndoor.StackLayer(1.0, nLerp, pThis.m_pLayer.m_nIndex);
                }

                if (pThis.m_nStepCount === pThis.m_nStep && 5 !== pThis.m_nState) {
                    pThis.SetState(pThis.m_nState + 1);
                }
            }
        }
    }

    /// 响应UI绘制。
    public OnGUI(pCanvas, pCanvasCtx): void {
        let pThis = this;

        if (pThis.m_pDrawPOI) {
            pThis.m_pDrawPOI(pCanvas, pCanvasCtx);
        }
    };

    /// 重置摄像机状态。
    public ResetCamera(): boolean {
        let pThis = this;

        if (5 === pThis.m_nState) {
            if (pThis.m_nStepCount === pThis.m_nStep) {
                pThis.m_pCurView = {
                    m_mTarget: pThis.m_pCamera.target,
                    m_nDistance: pThis.m_pCamera.distance,
                    m_nPitch: pThis.m_pCamera.pitch,
                    m_nYaw: pThis.m_pCamera.yaw
                };

                pThis.m_nStep = 0;
                pThis.m_nStepCount = 1;

                return true;
            }
        }

        return false;
    }

    /// 切换浏览状态。
    private SetState(nState): void {
        let pThis = this;

        pThis.m_nState = nState;

        // 大楼整体
        if (1 === nState) {
            pThis.m_pCurView = {
                m_mTarget: pThis.m_pCamera.target,
                m_nDistance: pThis.m_pCamera.distance,
                m_nPitch: pThis.m_pCamera.pitch,
                m_nYaw: pThis.m_pCamera.yaw
            }

            pThis.m_pDstView = pThis.m_pIndoor.m_pView;

            pThis.m_pCamera.lng = pThis.m_pIndoor.m_pView.m_nLng;
            pThis.m_pCamera.lat = pThis.m_pIndoor.m_pView.m_nLat;

            pThis.m_nStep = 0;
            pThis.m_nStepCount = 60;
            pThis.m_pDrawPOI = null;

            pThis.m_pIndoor.FocusBuilding();
        }
        // 楼层展开
        else if (2 === nState) {
            pThis.m_pCurView = pThis.m_pIndoor.m_pView;

            pThis.m_pDstView = {
                m_mTarget: pThis.m_pCurView.m_mTarget,
                m_nDistance: 150.0,
                m_nPitch: 20.0,
                m_nYaw: pThis.m_pCurView.m_nYaw
            }

            pThis.m_nStep = 0;
            pThis.m_nStepCount = 60;
            pThis.m_pDrawPOI = null;
        }
        // 聚焦楼层
        else if (3 === nState) {
            pThis.m_pCurView = {
                m_mTarget: pThis.m_pIndoor.m_pView.m_mTarget,
                m_nDistance: 150.0,
                m_nPitch: 20.0,
                m_nYaw: pThis.m_pIndoor.m_pView.m_nYaw
            }

            pThis.m_pDstView = pThis.m_pLayer.m_pView;

            pThis.m_nStep = 0;
            pThis.m_nStepCount = 60;

            pThis.m_pDrawPOI = MiaokitJS.App.m_pProject.DrawIndoorPOI(pThis.m_pIndoor.m_pTile.m_pName, pThis.m_pIndoor.m_pScene.building_id, pThis.m_pLayer.m_pLayer.id);
        }
        // 聚焦房间
        else if (4 === nState) {
            pThis.m_pCurView = pThis.m_pLayer.m_pView;
            pThis.m_pDstView = pThis.m_pRoom.m_pView;

            pThis.m_nStep = 0;
            pThis.m_nStepCount = 60;

            pThis.m_pIndoor.ShowOneLayer(pThis.m_pLayer.m_nIndex, pThis.m_pRoom.m_aPart);
        }
        // 自由交互
        else if (5 === nState) {
            pThis.m_pIndoor.ShowLayerList(pThis.m_pLayer.m_nIndex);
        }
        // 进行退出
        else if (6 === nState) {
            if (pThis.m_pIndoor) {
                pThis.m_pCurView = {
                    m_mTarget: pThis.m_pCamera.target,
                    m_nDistance: pThis.m_pCamera.distance,
                    m_nPitch: pThis.m_pCamera.pitch,
                    m_nYaw: pThis.m_pCamera.yaw
                }

                pThis.m_pDstView = pThis.m_pIndoor.m_pView;

                pThis.m_nStep = 0;
                pThis.m_nStepCount = 60;
                pThis.m_pDrawPOI = null;
            }
        }
        // 完成退出
        else if (7 === nState) {
            if (pThis.m_pIndoor) {
                pThis.m_pIndoor.Deactive();

                pThis.m_nState = 0;
                pThis.m_nStep = 0;
                pThis.m_nStepCount = 0;
                pThis.m_pCurView = null;
                pThis.m_pDstView = null;
                pThis.m_pIndoor = null;
                pThis.m_pLayer = null;
                pThis.m_pRoom = null;
                pThis.m_pDrawPOI = null;
            }
        }

        if (0 < pThis.m_nStepCount) {
            let nBias = (pThis.m_pCurView.m_nYaw - pThis.m_pDstView.m_nYaw) % 360.0;
            if (0.0 > nBias) {
                nBias += 360.0;
            }

            if (180.0 < nBias) {
                nBias -= 360.0;
            }

            pThis.m_pCurView.m_nYaw = pThis.m_pDstView.m_nYaw + nBias;
        }        
    }


    /// 当前浏览进度。
    public m_nState: number = 0;
    /// 当前步进。
    public m_nStep: number = 0;
    /// 当前步进总数。
    public m_nStepCount: number = 0;
    /// 当前视图。
    public m_pCurView: any = null;
    /// 当前目标视图。
    public m_pDstView: any = null;
    /// 当前内景。
    public m_pIndoor: any = null;
    /// 当前楼层。
    public m_pLayer: any = null;
    /// 当前房间。
    public m_pRoom: any = null;
    /// 绘制POI。
    public m_pDrawPOI: any = null;
    /// 摄像机控制器。
    public m_pCamera: any = null;
}

class Indoor {
    /// 构造函数。
    public constructor(pTile, pScene) {
        let pThis = this;

        pThis.m_pTile = pTile;
        pThis.m_pScene = pScene;
        pThis.m_pBuilding = pScene.m_pScene.binding;
        pThis.m_pDioramas = null;

        for (let pDior of MiaokitJS.m_pConfig.DIORS) {
            if (pTile.m_pDior === pDior.m_pName) {
                pThis.m_pDioramas = pDior;
                break;
            }
        }

        pThis.m_pView = {
            m_nLng: pTile.m_nLng,
            m_nLat: pTile.m_nLng,
            m_mTarget: { x: pScene.m_pView.m_mTarget.x, y: pScene.m_pView.m_mTarget.y, z: pScene.m_pView.m_mTarget.z },
            m_nDistance: pScene.m_pView.m_nDistance,
            m_nPitch: pScene.m_pView.m_nPitch,
            m_nYaw: pScene.m_pView.m_nYaw
        };

        if (MiaokitJS.m_pConfig.GIS.m_pTerrainServer) {
            pThis.m_pView.m_mTarget.y += pThis.m_pTile.m_nHeight;
        }
    }

    /// 场景名称。
    public get name() {
        let pThis = this;

        if (pThis.m_pBuilding) {
            return pThis.m_pScene.building_id;
        }
        else {
            return pThis.m_pTile.m_pName;
        }

        return "Default";
    }

    /// 场景中心点屏幕坐标。
    public get screenPoint() {
        let pThis = this;

        if (pThis.m_pBuilding) {
            let pBuildingObj = pThis.m_pBuilding.object3D;
            if (pBuildingObj) {
                let pPosition = pBuildingObj.transform.regionPosition;
                let pPoint = MiaokitJS.Miaokit.WorldToScreenPoint(pPosition);

                return pPoint;
            }
        }
        else {
            let pPosition = pThis.m_pView.m_mTarget;
            let pPoint = MiaokitJS.Miaokit.WorldToScreenPoint(pPosition);

            return pPoint;
        }

        return null;
    }

    /// 聚焦大楼。
    public FocusBuilding() {
        let pThis = this;

        if (pThis.m_pBuilding) {
            let pBuildingObj = pThis.m_pBuilding.object3D;
            if (pBuildingObj) {
                pBuildingObj.highlight = true;
                pBuildingObj.opacity = 255;
            }
        }
        else {
        }
    }

    /// 刷新大楼透明度。
    public SetBuildingOpacity(nOpacity) {
        let pThis = this;

        if (pThis.m_pBuilding) {
            let pBuildingObj = pThis.m_pBuilding.object3D;
            if (pBuildingObj) {
                pBuildingObj.opacity = nOpacity;
            }
        }
        else {
            if (250 < nOpacity && pThis.m_pDioramas) {
                pThis.m_pDioramas.m_pDior.Deplanation({ x: pThis.m_pView.m_mTarget.x, y: 35.0, z: pThis.m_pView.m_mTarget.z });
            }
        }

    }

    /// 层叠楼层。
    public StackLayer(nOffset, nRate, nStressLayer) {
        let pThis = this;
        let nCount = pThis.m_pScene.layerList.length;
        let nMinHeight = 4.0 * nCount;
        let nMaxHeight = (4.0 + nOffset) * nCount;
        let nShowHeight = nRate * nMaxHeight;
        let nHeight = 0.0;
        let nCutRate = nMinHeight / nMaxHeight;
        let pPosition = null;
        let nIndex = 0;

        pThis.m_pScene.m_pScene.object3D.active = true;

        if (nRate > nCutRate) {
            nOffset = 4.0 + (nOffset * ((nRate - nCutRate) / (1.0 - nCutRate)));
        }
        else {
            nOffset = 4.0;
        }

        for (let pLayer of pThis.m_pScene.m_pScene.layers) {
            let pObject = pLayer.object3D;
            if (pPosition) {
                pPosition.y += nOffset;
                pObject.transform.localPosition = pPosition;
            }
            else {
                pPosition = pObject.transform.localPosition;
            }

            pLayer._Draw();
            pLayer.decorationObject3D.active = false;

            pObject.active = nHeight < nShowHeight;
            pObject.highlight = nIndex === nStressLayer;

            nHeight += nOffset;
            nIndex++;
        }
    }

    /// 显示单层。
    public ShowOneLayer(nIndex, aRoom) {
        let pThis = this;
        let nIndex_ = 0;

        for (let pLayer of pThis.m_pScene.m_pScene.layers) {
            let bShow = nIndex === nIndex_++;
            pLayer.object3D.active = bShow;
            pLayer.object3D.highlight = false;
            pLayer.decorationObject3D.active = bShow;

            if (bShow) {
                pThis.FocusRoom(pLayer, aRoom);
            }
        }
    }

    /// 显示楼层列表。
    public ShowLayerList(nIndex) {
        let pThis = this;
        let aList = [];

        for (let pLayer of pThis.m_pScene.m_pScene.layers) {
            aList.push({
                id: pLayer._id,
                name: pLayer._id
            });
        }

        webgl_call_web_show_floor_list(aList);
        webgl_call_web_active_floor(aList[nIndex].id);
    }

    /// 切换楼层。
    public SwitchRoom(nIndex) {
        let pThis = this;
        let nIndex_ = 0;

        for (let pLayer of pThis.m_pScene.m_pScene.layers) {
            let bShow = nIndex === nIndex_++;
            pLayer.object3D.active = bShow;
            pLayer.object3D.highlight = false;
            pLayer.decorationObject3D.active = bShow;

            if (bShow) {
                webgl_call_web_active_floor(pLayer._id);
            }
        }
    }

    /// 聚焦房间。
    public FocusRoom(pLayer, aPoint) {
        let bAdd = false;

        for (let pPoint of aPoint) {
            pLayer.HighlightRoom(pPoint.point, bAdd);
            bAdd = true;
        }
    }

    /// 关闭室内显示和取消聚焦大楼
    public Deactive() {
        let pThis = this;

        if (pThis.m_pBuilding) {
            let pBuildingObj = pThis.m_pBuilding.object3D;
            if (pBuildingObj) {
                pBuildingObj.highlight = false;
                pBuildingObj.opacity = 255;
            }
        }
        else {
            if (pThis.m_pDioramas) {
                pThis.m_pDioramas.m_pDior.Recover();
            }
        }


        pThis.m_pScene.m_pScene.object3D.active = false;
    }

    //======================-------------------------------------------

    /// 打开室内场景。
    public Open() {
        return;
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
        return;
        let pBuildingObj = this.m_pBuilding.object3D;
        if (pBuildingObj) {
            pBuildingObj.highlight = false;
            pBuildingObj.opacity = 255;
        }

        this.m_pScene.m_pScene.object3D.active = false;
    }

    /// 刷新室内场景显示。
    public Update(mEyePos) {
        return;
        let pBuildingObj = this.m_pBuilding.object3D;
        if (pBuildingObj) {
            let mPos = pBuildingObj.transform.regionPosition;
            let x = mEyePos.x - mPos.x; x *= x;
            let y = mEyePos.y - mPos.y; y *= y;
            let z = mEyePos.z - mPos.z; z *= z;
            let nDistance = Math.sqrt(x + y + z);

            nDistance = (120 > nDistance ? 120 : (300 < nDistance ? 300 : nDistance)) - 120;

            pBuildingObj.opacity = nDistance / 180.0 * 255.0;
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
    /// 实景模型对象。
    public m_pDioramas: any = null;
    /// 屏幕显示坐标。
    public m_pScreenPos: any = null;
    /// 内景整体观察视角。
    public m_pView: any = null;
}

class Main {
    /// 构造函数。
    public constructor() {
        let pThis = this;

        pThis.m_pApp = MiaokitJS.App;
        pThis.m_pApp.m_pProject = this;

        pThis.m_pRoomViewer = new RoomViewer();
    }

    /// 数据预加载。
    public Preload() {
        let pThis = this;

        pThis.m_aDioramas = MiaokitJS.m_pConfig.DIORS;
        pThis.m_aTile = MiaokitJS.m_pConfig.SVE;
        pThis.m_nLoading = pThis.m_aTile ? pThis.m_aTile.length : 0;

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
                            DrawList = [];
                            return;
                        }

                        for (let pItem of pIcon.m_aList) {
                            let pPoint = MiaokitJS.Miaokit.WorldToScreenPoint(pItem.m_mPosition);
                            if (-1.0 > pPoint.z) {
                                continue;
                            }

                            pPoint.x = pPoint.x * width;
                            pPoint.y = pPoint.y * height;

                            pIcon.m_pDraw(canvas, pItem.name, pPoint);
                        }

                        DrawList = [];
                    }
                }
            };
        }
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
            m_nDistance: 3000.000,
            m_nPitch: 20.0,
            m_nYaw: 90.0
        });

        MiaokitJS.ShaderLab.SetSunlight(0.0, 60.0, 0.1);
    }


    private iii = 0;
    /// 帧更新方法。
    public Update(): void {
        if ((this.iii++) % 180 === 0) {
            //console.log(this.m_pApp.m_pCameraCtrl);
        }

        if (this.m_pPanoramas.panor) {
            let nState = this.m_pPanoramas.panor.m_nState;

            this.m_pPanoramas.Update();

            if (2 < nState) {
                return;
            }
        }

        this.m_pRoomViewer.Update();

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
        let pThis = this;

        let nTaskCount = MiaokitJS.Miaokit.progress;
        if (0 !== nTaskCount) {
            return;
        }

        pCanvas.font = "16px Microsoft YaHei";
        pCanvas.strokeStyle = "black";
        pCanvas.lineWidth = 2;
        pCanvas.fillStyle = "#FFFFFF";

        pThis.m_pRoomViewer.OnGUI(pCanvas, pCanvasCtx);

        for (let i = 0; i < pThis.m_aIcon.length; i++) {
            let pIcon = pThis.m_aIcon[i];
            if (pIcon.m_pDraw) {
                if (0 === i) {
                    pIcon.m_aList = pThis.m_aTile;
                    pIcon.m_pDrawList(pCanvasCtx, pCanvas.width, pCanvas.height);
                }
                else if (1 === i) {
                    let pPanor = pIcon.m_pDrawList(pCanvasCtx, pCanvas.width, pCanvas.height, pThis.m_pClick);
                    if (pPanor) {
                        if (!pPanor.m_pPanor) {
                            pPanor.m_pPanor = {
                                m_pName: pPanor.name,
                                m_pPath: pPanor.data,
                                m_mLngLat: { x: parseFloat(pPanor.long), y: parseFloat(pPanor.lat) },
                                m_nOffset: { x: 0.0, y: 80.0, z: 0.0 },
                                m_nHeight: 167.0
                            };
                        }

                        pThis.EnterPanoramas(pPanor.m_pPanor);
                    }
                }
                else {
                    pIcon.m_pDrawList(pCanvasCtx, pCanvas.width, pCanvas.height);
                }
            }
        }

        pThis.m_pClick = null;
    }

    /// 绘制室内POI。
    public DrawIndoorPOI(pTile_, pBuilding_, pFloor_) {
        let pThis = this;
        let aBuilding = pThis.m_aRooms;

        for (let pBuilding of aBuilding) {
            if (pTile_ === pBuilding.project_title && pBuilding_ === pBuilding.code) {
                if (!pBuilding.tile) {
                    for (let pTile of pThis.m_aTile) {
                        if (pBuilding.project_title === pTile.m_pName) {
                            pBuilding.tile = pTile;

                            for (let pScene of pTile.m_aScene) {
                                if (pBuilding_ === pScene.building_id) {
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
                                for (let pLayer of pBuilding.scene.layerList) {
                                    if (pFloor_ === pLayer.id) {
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

                                                pRoom.position = pPosition;

                                                break;
                                            }
                                        }
                                    }
                                }

                                let pDraw = function (pCanvas, pCanvasCtx) {
                                    pCanvas.font = "16px Microsoft YaHei";
                                    pCanvas.strokeStyle = "black";
                                    pCanvas.lineWidth = 2;
                                    pCanvas.fillStyle = "#FFFFFF";

                                    for (let pRoom of pFloor.child) {
                                        if (pRoom.position) {
                                            let pPoint = MiaokitJS.Miaokit.WorldToScreenPoint(pRoom.position);
                                            let pText = pRoom.name;
                                            let pRect = pCanvasCtx.measureText(pText);

                                            pPoint.x = pPoint.x * pCanvas.width;
                                            pPoint.y = pPoint.y * pCanvas.height;

                                            pCanvasCtx.strokeText(pText, pPoint.x - pRect.width / 2, pPoint.y);
                                            pCanvasCtx.fillText(pText, pPoint.x - pRect.width / 2, pPoint.y);
                                        }
                                    }
                                };

                                return pDraw;
                            }
                        }
                    }
                }
            }
        }

        return null;
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

    /// 进入园区。
    public EnterPark(pPark): void {
        if (MiaokitJS.m_pConfig.GIS.m_pTerrainServer) {
            pPark.m_pView.m_mTarget.y += 167;
        }

        this.m_pPark = pPark;

        this.m_pApp.m_pCameraCtrl.Fly(MiaokitJS.UTIL.CTRL_MODE.PANORAMA, pPark.m_pView, 0.05);
    }

    /// 进入全景图。
    public EnterPanoramas(pPanor): void {
        let pCamera = this.m_pApp.m_pCameraCtrl;
        let mTarget = pCamera.target;

        this.m_pPanoramas.Open(pPanor, {
            m_pTransform: pCamera.m_pTransform,
            m_mTarget: { x: mTarget.x, y: mTarget.y, z: mTarget.z },
            m_nDistance: pCamera.distance,
            m_nPitch: pCamera.pitch,
            m_nYaw: pCamera.yaw,
            m_nField: 60.0
        });

        pCamera.enabled = false;
        webgl_call_web_showVR();
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

        this.m_pApp.m_pCameraCtrl.Fly(MiaokitJS.UTIL.CTRL_MODE.PANORAMA, pCompany.m_pView, 0.05);
    }

    /// 进入房间。
    public EnterRoom(pRoom): void {
        let pThis = this;

        for (let pTile of pThis.m_aTile) {
            if (pRoom.m_pTile === pTile.m_pName) {
                if (pTile.m_aIndoor) {
                    for (let pIndoor of pTile.m_aIndoor) {
                        if (pRoom.m_pBuilding === pIndoor.m_pScene.building_id) {
                            let nLayer = 0;
                            for (let pLayer of pIndoor.m_pScene.layerList) {
                                if (pRoom.m_pLayer === pLayer.floor_id) {
                                    for (let pSite of pLayer.m_pLayer.sites) {
                                        if (pRoom.m_pRoom === pSite.id) {
                                            let pTransform = pLayer.m_pLayer.object3D.transform;
                                            let pPoiPos = pSite.position;
                                            let pGisPosition = pTransform.TransformPoint(pPoiPos);
                                            let pPosition = MiaokitJS.Miaokit.GisToWorld(pGisPosition);

                                            let aPart = pRoom.m_pPart;
                                            if (!aPart || aPart.length === 0) {
                                                aPart = [{
                                                    id: 0,
                                                    name: pRoom.m_pRoom,
                                                    position: pRoom.m_pRoom,
                                                    headimageurl: null,
                                                    panoramaurl: null,
                                                    point: pPoiPos
                                                }];
                                            }
                                            else {
                                                for (let pPart of aPart) {
                                                    for (let pSite_ of pLayer.m_pLayer.sites) {
                                                        if (pPart.position === pSite_.id) {
                                                            pPart.point = pSite_.position;
                                                            continue;
                                                        }
                                                    }
                                                }
                                            }

                                            pThis.m_pRoomViewer.Enter(pIndoor, { m_nIndex: nLayer, m_pLayer: pLayer }, { m_pID: pRoom.m_pRoom, m_mTarget: pPosition, m_mPoiPos: pPoiPos, m_aPart: aPart });
                                            return;
                                        }
                                    }
                                }

                                nLayer++;
                            }
                        }
                    }
                }
            }
        }
    }

    /// 退出查看。
    public ExitViewer(): void {
        let pThis = this;

        pThis.m_pRoomViewer.Exit();
    }

    /// 重置摄像机。
    public ResetCamera(): void {
        if (!this.m_pRoomViewer.ResetCamera()) {
            this.m_pApp.m_pCameraCtrl.Jump(MiaokitJS.UTIL.CTRL_MODE.PANORAMA, this.m_pPark.m_pView);
        }
    }

    /// 切换摄像机2/3D模式。
    public SwitchCameraMode(nMode): void {
        MiaokitJS.App.m_pCameraCtrl.viewMode = nMode;
    }

    /// SVE瓦片激活方法。
    private ActiveTile(pTile): void {
        let pThis = this;

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
                m_pScene: pSceneA,
                m_pView: pTile.m_aView[pID]
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
            let bOutdoor = pScene.building_id === (pTile.m_pOutdoor ? pTile.m_pOutdoor.building_id : "");

            pObject.active = bOutdoor ? true : false;

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
                    pLayerA._Draw();
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
                    let pOutdoor = pTile.m_pOutdoor ? pTile.m_pOutdoor.building_id : "";

                    for (let pScene of pTile.m_aScene) {
                        if (pOutdoor !== pScene.building_id) {
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

    /// 响应点击事件。
    private OnClick(nTimes, pPoint): void {
        if (1 === nTimes) {
            this.m_pClick = pPoint;
        }
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
    /// 后台房间列表。
    private m_aRooms: any = null;
    /// 当前瓦片加载进度。
    private m_nLoading: number = 0;
    /// 当前进度条最大值。
    private m_nTaskMax: number = 0;
    /// 当前点击时间。
    private m_pClick: any = null;

    /// 当前聚焦城市。
    private m_pCity: any = null;
    /// 当前聚焦园区。
    private m_pPark: any = null;
    /// 当前锁定室内场景。
    private m_pIndoor: any = null;
    /// 房间查看器。
    private m_pRoomViewer: RoomViewer = null;
    /// 图标列表。
    private m_aIcon = [
        { m_pName: "楼宇", m_pPath: "./data/building.png", m_pImage: null, m_pDraw: null, m_aList: null, m_pDrawList: null },
        { m_pName: "全景", m_pPath: "./data/panor.png", m_pImage: null, m_pDraw: null, m_aList: null, m_pDrawList: null },
        { m_pName: "商圈", m_pPath: "./data/business.png", m_pImage: null, m_pDraw: null, m_aList: null, m_pDrawList: null },
        { m_pName: "公交车", m_pPath: "./data/bus.png", m_pImage: null, m_pDraw: null, m_aList: null, m_pDrawList: null },
        { m_pName: "停车场", m_pPath: "./data/park.png", m_pImage: null, m_pDraw: null, m_aList: null, m_pDrawList: null },
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
*/
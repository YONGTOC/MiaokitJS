
//<script src="./common/miaokit/MiaokitLoader.min.js" > </script>
declare var MiaokitJS: any;
///<script src="https://res.wx.qq.com/open/js/jweixin-1.1.0.js"></script>
declare var wx: any;
///<script src="https://indoor.yunweizhi.net/locationLib/1.2.5/locationlib.js"></script>
declare var LocationLib: any;
///<script src="https://webapi.amap.com/maps?v=1.4.14&key=8f7b2fefdf8ce375c7badee5a2d60a48"></script>
declare var AMap: any;
///<script src="./common/lazy-load-img.min.js"></script>
declare var LazyLoadImg: any;


class Vector3 {
    /// 三维向量构造函数。
    public constructor(x: number, y: number, z: number) {
        this.x = x;
        this.y = y;
        this.z = z;
    }

    x: number = 0.0;
    y: number = 0.0;
    z: number = 0.0;

    /// TODO:求两个三维向量距离。
    public static Distance(a: Vector3, b: Vector3): number {
        console.log("Vector3.Distance");
        return 0;
    }

    /// TODO:求两个三维向量夹角。
    public static AngleTo(a: Vector3, b: Vector3): number {
        console.log("Vector3.AngleTo");
        return 0;
    }
}

class NLandmark {
    /// 对象引用句柄构造函数。
    public constructor() {
    }

    /// 获取位置标记对象。
    public get Object(): NLandmark {
        return this;
    }

    /// TODO:位置标记所在节点对象。
    public get m_mPoint(): NPoint {
        console.log("NLandmark.m_mPoint");
        return null;
    }

    /// TODO:位置标记序列号
    public get m_pSerial(): string {
        console.log("NLandmark.m_pSerial");
        return "";
    }

    /// TODO:位置标记名称
    public get m_pName(): string {
        console.log("NLandmark.m_pName");
        return "";
    }

    /// TODO:位置标记类型名称。
    public TypeName(): string {
        console.log("NLandmark.TypeName");
        return "";
    }
}

class NPoint {
    /// 路径节点构造函数。
    public constructor() {
    }

    /// 获取节点对象。
    public get Object(): NPoint {
        return this;
    }

    /// TODO:路径节点坐标。
    public get m_mPosition(): Vector3 {
        console.log("NPoint.m_mPosition");
        return { x: 0, y: 0, z: 0 };
    }

    /// TODO:路径节点位置标记对象。
    public get m_mLandmark(): NLandmark {
        console.log("NPoint.m_mLandmark");
        return null;
    }
}

class NPath {
    /// 路径层构造函数。
    public constructor() {
    }

    /// 路径层楼层索引。
    public m_nLayer: number = 0;
    /// 路径层楼层名称。
    public m_pLayerName: string = null;
    /// 路径层终止节点对象。
    public m_pEndPoint: NPoint = null;
    /// 路径层节点数组。
    public m_aPath: Vector3[] = null;
}

class NavBackData {
    /// 路径回放路径层信息构造函数。
    public constructor(nHousId: any, pPId: any, nLayerId: any, nLayerName: any = null) {
        this.HousId = nHousId;
        this.LayerId = nLayerId;
        this.PId = pPId;
        this.LayerName = nLayerName;
    }

    //// 场景ID。
    public HousId: number = 0;
    /// 楼宇名字。
    public PId: string = null;
    /// 楼层ID。
    public LayerId: number = 0;
    /// 楼层名称。
    public LayerName: string = null;
}

class NNavigation {
    /// 路径构造函数。
    public constructor() {
    }

    /// 优化后的路径层数组。
    public m_aPath: NPath[] = null;
    /// 当前路径层索引。
    public m_nCurPath: number = -1;
    /// 当前道路起点索引。
    public m_nWayStart: number = 0;
    /// 当前道路终点索引。
    public m_nWayEnd: number = 0;
    /// 当前道路步进。
    public m_nWayStep: number = 0;

    ///================------------------------------------

    /// TODO:开关实时定位。
    public static EnableLocate(bEnable: boolean) {
        console.log("NNavigation.EnableLocate");
    }

    /// TODO:更新实时定位位置
    public static UpdateLocation(nWork: number, nLayer: number, mPosition: Vector3) {
        console.log("NNavigation.UpdateLocation");
    }

    /// 导航信息提示（前端扩展实现）。
    public static TipMessage: (message: any) => void = null;
    /// 导航语音提示（前端扩展实现）。
    public static TipVoice: (message: any) => void = null;
    /// 导航结束（前端扩展实现）。
    public static NavigateCancel: () => void = null;
    /// 导航更新（前端扩展实现）。
    public static m_goNext: any = null;
    /// 导航当前楼层（前端扩展实现）。
    public static ng_nActiveLayerPath: number = 0;
    /// 当前蓝牙定位信息。
    public static g_pCurLocation: any = null;
    /// 激活的路径列表。
    public static g_pActiveList: NNavigation[] = [];
}

class ALinerDC {
    /// 楼层模块构造函数。
    public constructor() {
    }

    /// TODO:获取当前楼层索引接口链。
    public static get DC(): { m_pLayerMgr: { m_pActiveLayer: { m_nIndex: number } } } {
        console.log("ALinerDC.DC");
        return {
            m_pLayerMgr: {
                m_pActiveLayer: {
                    m_nIndex: 0
                }
            }
        };
    }
}

class NavChartDC {
    /// 导航模块构造函数。
    public constructor() {
    }

    /// TODO:获取当前楼层位置标记列表接口链。
    public static get DC(): { m_pLayerMgr: { m_pActiveLayer: { m_mLandmarkList: NLandmark[] } } } {
        console.log("ALinerDC.DC");
        return {
            m_pLayerMgr: {
                m_pActiveLayer: {
                    m_mLandmarkList: []
                }
            }
        };
    }
}

class Work {
    /// 场景对象构造函数。
    public constructor() {
    }

    /// TODO:当前场景索引。
    public get m_nIndex(): number {
        console.log("Work.m_nIndex");
        return 0;
    }

    /// TODO:当前场景ID。
    public get m_pID(): string {
        console.log("Work.m_nIndex");
        return "";
    }

    /// TODO:模型摆放模块。
    public get m_pEyejiaDC(): { m_pLayerMgr: { GetLayer: (number) => { m_pViewState: any } } } {
        console.log("Work.m_pEyejiaDC");
        return {
            m_pLayerMgr: {
                GetLayer(number): { m_pViewState: any } {
                    return {
                        get m_pViewState(): any {
                            return null;
                        }
                    }
                }
            }
        };
    }
}

class MiaokitDC_ {
    /// MIAOKIT模块构造函数。
    public constructor() {
    }

    /// TODO:当前场景索引。
    public get m_nCurWork(): number {
        console.log("MiaokitDC.DC.m_nCurWork");
        return 0;
    }

    /// TODO:场景列表。
    public get m_aWork(): Work[] {
        console.log("MiaokitDC.DC.m_aWork");
        return [];
    }

    /// TODO:根据场景索引获取对应的场景对象。
    public GetWork(nWork: number): Work {
        console.log("MiaokitDC.DC.GetWork");
        return null;
    }

    /// 导航构造器。
    public m_pNavigator = {
        /// TODO:场景位置列表。
        get m_pSiteList(): NLandmark[] {
            console.log("MiaokitDC.DC.m_pNavigator.m_pSiteList");
            return [];
        },

        /// TODO:创建所有临时线路连接。
        Link(): void {
            console.log("MiaokitDC.DC.m_pNavigator.Link");
        }
    }
}

class MiaokitDC {
    /// MIAOKIT模块构造函数。
    public constructor() {
    }

    /// 获取MIAOKIT各类接口。
    public static DC_: MiaokitDC_ = null;
    public static get DC(): MiaokitDC_ {
        if (null === MiaokitDC.DC_) {
            MiaokitDC.DC_ = new MiaokitDC_();
        }

        return MiaokitDC.DC_;
    }    
}

class Project {
    /// 项目接口构造函数。
    public constructor() {
    }


    /// TODO:当前段语音网络加载完成并开始播放。
    public VoiceStart() {
        console.log("Project.VoiceStart");
    }

    /// TODO:当前段语音播放完毕。
    public VoiceEnd() {
        console.log("Project.VoiceEnd");
    }

    /// TODO:停止当前非实时导航流程动画。
    public StopAutoMotion() {
        console.log("Project.StopAutoMotion");
    }

    /// TODO:线路回看。
    public NavBack(pNavBackData: NavBackData, _unused: any) {
        console.log("Project.NavBack");
    }

    /// TODO:退出回放。
    public CloseNavBack() {
        console.log("Project.CloseNavBack");
    }

    /// TODO:通过世界坐标获取最近的房间。
    public SetPos(pWordPos: Vector3, pScenePos: any) {
        console.log("Project.SetPos");
    }
}

class Engine {
    /// 引擎接口构造函数。
    public constructor() {
    }

    /// TODO:设置摄像机位置。
    public get m_pCameraCtrl(): { setCpoint: any, LineWidth: any } {
        console.log("Engine.m_pCameraCtrl");
        return null;
    }

    /// TODO:设置导航目标点。
    public set m_pSetNavPoint(pPoint: any) {
        console.log("Engine.m_pSetNavPoint");
    }

    /// TODO:设置摄像机状态。
    public SetViewState(pState: any = null) {
        console.log("Engine.SetViewState");
    }

    /// TODO:项目对象。
    public get project(): Project {
        console.log("Engine.SetViewState");
        return null;
    }

    /// 是否标记终点。
    public m_pTackEnd: boolean = false;
    /// 标记终点图标。
    public m_pImageEnd: any = null;
    /// 当前屏幕坐标。
    public m_screenPos: any = null;
    // 当前需要显示的线路点数组
    public pPath: NPath[] = [];
    /// 项目对象。
    public m_pProject: Project = null;

    /// 获取引擎实例接口。
    public static g_pInstance_: Engine = null;
    public static get g_pInstance(): Engine {
        if (null === Engine.g_pInstance_) {
            Engine.g_pInstance_ = new Engine();
        }

        return Engine.g_pInstance_;
    }
}


/// 3D入口
function Init3D(pCallback) {
    let pProject = MiaokitJS.App.m_pProject;

    pProject.MajorProgress = function (bShow, nRate) {
        GLOBAL.Action.pMajorProgress(bShow, nRate);
    };

    pProject.MinorProgress = function (bShow, nRate) {
        GLOBAL.Action.pMinorProgress(bShow, nRate);
    };

    pProject.Inited = function (pError) {
        pCallback(pError);
    };
}

/// 启动渲染
function Start() {
    MiaokitJS.Start();
}

/// 停止渲染
function Stop() {
    MiaokitJS.Stop();
}

/// TODO:切换室内外场景
function SwitchScene(pName) {
    MiaokitJS.App.m_pProject.SwitchScene(pName);
    GLOBAL.Action.pLayerListFlush(4, 0);
    $("#select-add").text("返回室外");
    $(".floor_box ul li:first").trigger("click", {
        type: "noNeedActive"
    });

    console.log("SwitchScene", pName);
}

/// TODO:切换楼层
function SwitchLayer(pName) {
    console.log("SwitchLayer");
}

/// 切换视图模式，2表示2D模式、3表示3D模式
function SwitchView(nMode) {
    let nMode_ = MiaokitJS.App.m_pCameraCtrl.viewMode;
    if (nMode_ !== nMode) {
        MiaokitJS.App.m_pCameraCtrl.viewMode = nMode;
        GLOBAL.Action.pViewSwich(2 === nMode ? 0 : 1);
    }
}

/// TODO:基于距离和类型过滤POI列表
function FilterPOI(bEnable, mCenter, nRadius, aType) {
    console.log("FilterPOI");
}

/// TODO:搜索路径：参数分别为起点ID、终点ID、优先楼层通道类型（0：最近、1楼梯、2电梯、3扶梯）
function Navigate(pStartID, pEndID, nType = 0) {
    console.log("Navigate");
}

/// TODO:是否将视角锁定在摄像机上，还是可以自由浏览地图
function LockCameraToPath(bLock) {
    console.log("LockCameraToPath");
}

/// TODO:设置摄像机视角。参数分布为观察目标坐标，仰角，偏航角，3D距离观察点距离/2D观察范围大小。某项参数赋值为undefined则维持其状态由鼠标控制
function SetCamera(mTarget, nPitch, nYaw, nDistance) {
    console.log("SetCamera");
}


var GLOBAL = {
    /// GPS配置信息
    GpsConfig: {
        /// 启用GPS定位
        launch: true,
        /// 定位范围的四个角
        config: {
            upleft: [112.528431, 37.760350],
            upright: [112.538345, 37.760803],
            leftlower: [112.528431, 37.753734],
            rightlower: [112.538345, 37.753548]
        },
        unit: {
            /// 为了统一蓝牙的参数 此处为中心点经度
            centX: 112.52847,
            /// 中心点维度
            centY: 37.75644251,
            /// 中心经度换算单位
            unitX: 111234.41893076,
            /// 中心纬度换算单位
            unitY: 131234.70522803
        }
    },
    // 当前所处楼宇，处于外景时该值为空
    pCurBuilding: null,
    // 场景列表。
    pWorkList: [],
    Navigating: false,
    PLocation: null,
    history_Layer: null,
    // SDK用户根据需要自定义实现以下响应函数
    Action: {
        // 主进度条更新
        pMajorProgress: function (bShow, nRate) { },
        // 副进度条更新
        pMinorProgress: function (bShow, nRate) { },
        // 帧更新函数
        pUpdate: function () { },
        // 帧POI绘制函数
        pDrawPOI: function (pCavans, pSite) { },
        // 楼层列表刷新
        pLayerListFlush: function (nLayerCount, m_nIndex) { },
        // 室内外切换响应
        pOutsideSwich: function (bOut) { },
        // 2D/3D切换响应
        pViewSwich: function (nView) { },
        // 指南针旋转更新
        pCompassUpdate: function (nDeg) { },
        // 楼层激活响应
        pLayerActive: function (nFloorIndex) { },
        // 楼层显示响应
        pLayerShow: function (nLayerCount, nWorkIndex) { },
        // 光标位置信息反馈
        pCursorInfo: function (pID, pName, mPos, pEvent) { },
        // 导航路径信息反馈
        pPathDataFeedback: function (aPoint) { },
        // 导航提示信息反馈
        pHintFeedback: function (pID, pName, mPos, pEvent) { },
        // 鼠标单击画布反馈
        pOnClick: function (pPoint) { },
        // 加载完proje后加载
        pProjectEnd: function () { },
        // 隐藏光标
        pChickTouchMove: null,
        // 隐藏拾取光标
        pHideCursor: null, // hideSetPoint
        // 获取基站列表
        pStationListFeedback: null, // getBleList
        // 获取导航动画类型
        pGetAnimateType: null, // getAnimateType
        // 搜索路径失败响应
        pPathNotFound: null, // notFoundRoute
    }
};

var startIcon: any = null;
var endIcon: any = null;
var endName: any = null;
var startName: any = null;
var gpscpArry: any = null;

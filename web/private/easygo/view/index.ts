/// <reference path="compat.ts" />

//TODO name.replace("/ \s * / g", ""))
//TODO 170行 let toggle: any = $(this).find('h3').toggle;
//TODO 512行 $(".lockScene").toggle(UnlockScene, LockScene);

var lockFlag = 0;
var ppSearch = decodeURIComponent(window.location.search);
var LockIcon = false; /// TODO 命名统一
var mockFlag = false;
var chooseStartFlag = false;

/// TODO 注释，规范
function mSetItem(e, t) {
    window.localStorage.setItem(e, t);
}

/// TODO 注释，规范
function mGetItem(e) {
    return window.localStorage.getItem(e);
}

/// 获取URL参数
function GetQueryString(pName) {
    let reg = new RegExp("(^|&)" + pName + "=([^&]*)(&|$)", "i");
    let regRewrite = new RegExp("(^|/)" + pName + "/([^/]*)(/|$)", "i");

    let r = null;
    if (ppSearch) {
        let r = ppSearch.substr(1).match(reg);
    }

    let q = window.location.pathname.substr(1).match(regRewrite);
    if (r != null) {
        return unescape(r[2]);
    }
    else if (q != null) {
        return unescape(q[2]);
    }
    else {
        return null;
    }
}

/// 线路提示
function ToastShow(text) {
    var mes = "";
    let Infoheight = $(".InfoToast").height();
    for (var i = 0; i < text.length; i++) {
        if (text[i]) {
            mes += text[i];
            /**插在里面判断直行 */
            if (text[i].indexOf("米") != -1) {
                let distance = text[i].replace("米", "");
                distance = parseInt(distance);
                // if ($(".InfoToast span").text().indexOf(text[text.length - 1]) == -1) {
                //   LockIcon = false;
                // }
                if (!LockIcon) {
                    $("#Info-Img").attr("src", "images/ts.png");
                    LockIcon = true;
                }
            }
        }
    }
    $(".InfoToast span").text(mes);
    if ($(".InfoToast").is(":hidden")) {
        $(".InfoToast").show();
        $(".InfoToast").animate({
            opacity: 0.73
        }, 200, function () {
            $(".lockScene").css("top", Infoheight + 120);
            $(".current-address").css("top", Infoheight + 80);
            $(".two_d_btn").css("top", Infoheight + 180);
            $("#select-add").css("top", Infoheight + 130);
            $("#shusan").css("top", Infoheight + 80);
        });
    }
}

/// 隐藏土司
function ToastHide() {
    $(".InfoToast").animate({
        opacity: 0
    }, 200, function () {
        $(this).hide();
        $(".lockScene").css("top", "108px");
        $(".current-address").css("top", "62px");
        $(".two_d_btn").css("top", "168px");
        $("#select-add").css("top", "7.25rem");
        $("#shusan").css("top", "4rem");
    });

    removeC();
}

/// 镜头固定，不能切换楼层与楼宇
function LockScene() {
    lockFlag = 1;
    if (Posfault && !mockFlag) {
        NNavigation.EnableLocate(true);
    }
    LockCameraToPath(1);
    if (NNavigation.g_pActiveList.length > 0) {
        let cachePOS = new Vector3(NNavigation.g_pActiveList[0].m_aPath[0].m_aPath[0].x, 0, -NNavigation.g_pActiveList[0].m_aPath[0].m_aPath[0].z);
        // if (MiaokitDC.DC.m_nCurWork==0){
        //   SetCamera(cachePOS, undefined, undefined, 500);

        // }else{
        // SetCamera(cachePOS, undefined, undefined, 100);
        // }
    }
    //SwitchView(2);
    $(".lockScene").css("backgroundImage", 'url("images/freescene.png")');

    if ($(".history-rollback-wrapper").is(":visible")) {
        $(".floor_box").hide();
        $("#select-add").unbind("click");
        var layerFlag = true;
        for (var layer = GLOBAL.history_Layer.length - 1; layer >= 0; layer--) {
            if (
                MiaokitDC.DC.m_nCurWork ==
                GLOBAL.history_Layer.eq(layer).attr("house-id") &&
                ALinerDC.DC.m_pLayerMgr.m_pActiveLayer.m_nIndex ==
                GLOBAL.history_Layer.eq(layer).attr("layer-id")
            ) {
                layerFlag = false;
                break;
            }
        }
        if (layerFlag) {
            $(".history-rollback-wrapper ul li").eq(0).trigger("click");
        }
        NNavigation.TipMessage = function (message) {
            // console.log(message);
            ToastShow(message);
        };
        //语音提示
        if (!NNavigation.TipVoice) {
            NNavigation.TipVoice = function (message) {
                console.info(message);
                l(message);
            };
        }
    }
}

/// TODO 注释
function hideRollback() {
    audio.volume = 0,
        $("#select-add").unbind("click").click(function () {
            MiaokitDC.DC.m_nCurWork != 0 ? SwitchScene(null) : SwitchScene("体育场");
        }),
        // icondown(),
        ToastHide(),
        $(".history-rollback-wrapper").css("display", "none");
    if (!Posfault) {
        $(".lockScene").hide()
    }
    $(".floor-box-div").hide();
}

/// 显示再次导航
function showNavAgain() {
    $("#nav-again").css("display", "flex");
    $("#nav-again").animate({
        opacity: 0.9
    }, 200);
    iconup($('#nav-again').height());
}

/// 隐藏再次导航
function hideNavAgain() {
    icondown();
    $("#nav-again").animate({
        opacity: 0
    }, 200);
    $('#nav-again').hide();
    /**逻辑有点懵，应该是恢复成真正导航结束的样子，就是把路线清空，然后是显示所有POI点 */
}

/// 镜头自由，判断是否是导航楼层
function UnlockScene() {
    lockFlag = 0;
    if (Posfault && NNavigation.g_pActiveList.length == 0) {
        NNavigation.EnableLocate(false);
    }
    LockCameraToPath(0);
    FilterPOI(false, null, 0, null);
    //SwitchView(3);
    $(".lockScene").css("backgroundImage", 'url("images/lockscene.png")');
    if (MiaokitDC.DC.m_nCurWork != 0 || $("#select-add").text() == "返回室外") {
        $(".floor_box").show();
    }
    $("#select-add").unbind("click").click(function () {
        (MiaokitDC.DC.m_nCurWork != 0 || $("#select-add").text() == "返回室外") ? SwitchScene(null) : SwitchScene("体育场");
    });
    NNavigation.TipMessage = null;
    if ($(".navigating-btn").is(":visible")) {
        NNavigation.TipVoice = null;
    }
    else {
        NNavigation.TipVoice = null;
    }
    ToastHide();
}

/// 导航开始后自由镜头，隐藏光点
function navigatehiden(startid, endid, nType, event = null) {
    UnlockScene();
    // NNavigation.ClearAllPath();
    Navigate(startid, endid, nType);
    if (NNavigation.g_pActiveList.length != 0) {
        // let cachePOS = new Vector3(NNavigation.g_pActiveList[0].m_aPath[0].m_aPath[0].x, 0, -NNavigation.g_pActiveList[0].m_aPath[0].m_aPath[0].z);
        Engine.g_pInstance.m_pCameraCtrl.setCpoint = NNavigation.g_pActiveList[0].m_aPath[0].m_aPath[0];
    }
    GPSNavigation();
    /**暂时未找到切换导航路径的方法，先用模拟点击作为方案 */
    if (!event) {
        $(".history-rollback-wrapper ul li").eq(0).trigger("click");
        if (NNavigation.g_pActiveList.length != 0) {
            if (GPSTimer) {
                setTimeout(function () {
                    SetCamera(PLocation.Position, undefined, undefined, undefined);
                }, 200);
            }
            else {
                let cachePOS = new Vector3(NNavigation.g_pActiveList[0].m_aPath[0].m_aPath[0].x, 0, -NNavigation.g_pActiveList[0].m_aPath[0].m_aPath[0].z);
                SetCamera(cachePOS, undefined, undefined, undefined);
            }
        }
    }
    else if (event == "chongzhi") {
        $(".history-rollback-wrapper ul li").eq(-1).trigger("click");
    }
}

/// 原有导航方案，模拟导航
function navigation(startid, endid, nType, event = null) {
    // NNavigation.ClearAllPath();
    if (Posfault && $(".start_input input").val() != "我的位置") {
        NNavigation.EnableLocate(false);
        NNavigation.g_pCurLocation = null;
        mockFlag = true;
        PLocation = null;
        event = "autostep";
    }
    LockIcon = false;
    Navigate(startid, endid, nType);
    $(".history-rollback-wrapper ul li").eq(0).trigger("click");
    LockScene();
    if (event == "autostep") {
        NNavigation.EnableLocate(false);
        NNavigation.g_pCurLocation = null;
        console.error("关闭蓝牙");
    }
    $(".search-box").hide();
    $(".lockScene").show();
    $(".search-box").hide();
    $(".pre-navigate").hide();
    $(".navigating-btn").show();
    GLOBAL.Navigating = true;
    $("#Info-Img").attr("src", "images/ts.png");
    Engine.g_pInstance.m_pSetNavPoint = null;
    iconup($(".search_direction_box").height());
    GPSNavigation();
}

/// 检查起终点的方法
function checkset(event) {
    audio.volume = 1;
    var e = $(".start_input input").attr("roomid"), //获取startid
        t = $(".end_input input").attr("roomid"); //获取endid
    $(".end_input input").val();
    if ($(".start_input input").val() == "我的位置") {
        e = PLocation;
    }
    else if ($(".start_input input").val() != "我的位置") {
        NNavigation.EnableLocate(false);
        NNavigation.g_pCurLocation = null;
        mockFlag = true;
        PLocation = null;
        event = "autostep";
    }
    if (e && t && e != t) {
        $(".search-path-floor").css("display", "flex");
        if (Posfault && $(".lockScene").is(":visible")) {
            $(".lockScene").hide();
        }

        navigatehiden(e, t, 0, event);
        $(".navigation_btn .search-nav-text").text("开始导航");
        $(".search-path").show();
    }
    else {
        if (!e) {
            D("点击地图选择起点", 3000);
            chooseStartFlag = true;
        }
        $(".history-rollback-wrapper").css("display", "none");
        $(".search-path").hide();
    }
    let curPage = window.location.href.split("#")[1];
    if (!curPage) {
        iconup($(".search_direction_box").height());
    }
    else {
        $(document).one("pageshow", "#page-index", function () {
            iconup($(".search_direction_box").height());
        });
    }
}

/// 设置起点的方法
function setStartPoint(id, name, event = undefined) {
    /**设置需要做的几点，
     * 1、填入start_input
     * 2、build和floor填入后方标签
     * 3、检验是否起终点合格checkset
     * 以上
     */
    if (chooseStartFlag) {
        D("已选择起点", 1000);
    }
    chooseStartFlag = false;
    $("#start_position").val(name.replace("/ \s * / g", ""));
    startName = name;
    $("#start_position").attr("roomid", id);
    let build, floor;
    if (name != "位置点") {
        $.ajax({
            url: SVE_H5_URL + "api/info/getroomName.php",
            data: {
                id: id
            },
            async: false,
            success: function (res) {
                res = JSON.parse(res);
                if (res.response.length > 0) {
                    build = res.response[0].Building_ID;
                    floor = res.response[0].Floor_ID;
                    if (floor != "室外") {
                        let reg = / -[0 - 9] | [0 - 9] /;
                        floor = reg.exec(floor) + "F";
                    }
                    else {
                        floor = "";
                    }
                }
            }
            // complete: function(){
            //     return pName;
            // }
        });
    }
    else {
        build = currentScene;
        floor = $(".floor_box .current-active-floor").text();
        if (!floor) {
            floor = "1F";
        }
    }
    $("#start-build").text(build);
    $("#start-floor").text(floor);
    if (event == "defaultStart") { }
    else {
        let event = null;
        if (Posfault) {
            NNavigation.EnableLocate(false);
            NNavigation.g_pCurLocation = null;
            mockFlag = true;
            PLocation = null;
            event = "autostep";
        }
        checkset(event);
    }
}

/// 设置终点的方法
function setEndPoint(id, name, build = undefined, floor = undefined) {
    $("#end_position").val(name.replace("/ \s * / g", ""));
    endName = name;
    $("#end_position").attr("roomid", id);
    let ebuild, efloor;
    if (name != "位置点") {
        $.ajax({
            url: SVE_H5_URL + "api/info/getroomName.php",
            data: {
                id: id
            },
            async: false,
            success: function (res) {
                res = JSON.parse(res);
                if (res.response.length > 0) {
                    ebuild = res.response[0].Building_ID;
                    efloor = res.response[0].Floor_ID;
                    if (efloor) {
                        let reg = / -[0 - 9] | [0 - 9] /;
                        efloor = reg.exec(efloor) + "F";
                    }
                    else {
                        efloor = "";
                    }
                }
            }
            // complete: function(){
            //     return pName;
            // }
        });
    }
    else {
        let sss = "xxx"; sss.split
        let pot = $(".post-text")["splice"](" - ");
        ebuild = pot[0];
        efloor = pot[1];
    }
    $("#end-build").text(ebuild);
    if (!efloor)
        $("#end-floor").text(efloor);
    if (Posfault) {
        $(".start_input input").val("我的位置");
    }
    Engine.g_pInstance.m_pTackEnd = true;
    let event = null;
    if (NNavigation.g_pActiveList.length > 0) {
        event = "chongzhi"
    }
    checkset(event);
}

/// 显示吐司
function showMsg(text, status) {
    if (text) {
        $("#msgBox .msgtxt").text(text);
    }
    $("#msgBox").show();
    if (status) {
        setTimeout(hideMsg, status);
    }
}

/// 隐藏信息
function hideMsg() {
    $("#msgBox").hide("fast");
}

/// 显示模拟导航按钮
function showMockBtn() {
    console.log("showmockbtn");
    let btn = $("#autostep");
    btn.show();
    let btn2 = $("#search-go");
    btn2.css({
        'transform': 'translateY(-50%)',
        'left': '56%'
    });
}

/// 隐藏模拟导航按钮
function hideMockBtn() {
    console.log("hidemockbtn");
    let btn = $("#autostep");
    btn.hide();
    let btn2 = $("#search-go");
    btn2.css({
        'transform': 'translate(-50%,-50%)',
        'left': '50%'
    });
}

/// 路径更新
NNavigation.m_goNext = function () {
    setTimeout(function () {
        LockIcon = false;
    }, 500);
}

/// 初始化
$(function () {
    if (Posfault) {
        $(".lockScene").show();
    }

    $(".lockScene").click(function () {
        if (lockFlag) {
            UnlockScene()
        } else {
            LockScene()
        }
    });

    // $(".lockScene").click(function(){
    //     if ($(".lockScene").text()=="自由镜头") {
    //         LockScene();
    //     } else {
    //         UnlockScene();
    //     }
    // });

    $("#again-canel").click(function () {
        hideNavAgain();
    });
    $("#again-btn").click(function () {
        hideNavAgain();
        $(".search_direction_box").show();
        $(".navigation_btn").show();
        iconup($(".search_direction_box").height());
    });
    /** */
    $(".btn-exit-rollback")["live"]("click", function (e) {
        e.preventDefault();
        $(".search_direction_box").hide();
        $(".pre-navigate").show();
        $(".navigating-btn").hide();
        $(".search-box").show();
        UnlockScene();
        icondown();
        Posfault = false;
    });
    $("#replanning").click(() => {
        $(".navigation_btn .search-nav-text").text("再次导航");
        $(".search-box").show();
        $(".lockScene").hide();
        $(".pre-navigate").show();
        $(".navigating-btn").hide();
        UnlockScene();
        GLOBAL.Navigating = false;
        Engine.g_pInstance.m_pSetNavPoint = GLOBAL.Action.pCursorInfo;
        iconup($(".search_direction_box").height());
    });

    /**切换路线 */
    $(".search-path .path").each(function () {
        $(this).click(function () {
            if (!$(this).hasClass("active")) {
                $(this).addClass("active").siblings().removeClass("active");
                let type = $(".search-path .path").index($(this)),
                    startid = $(".start_input input").attr("roomid"), //获取startid
                    endid = $(".end_input input").attr("roomid"); //获取endid
                if ($(".start_input input").val() == "我的位置") {
                    startid = PLocation;
                }
                navigatehiden(startid, endid, type);
                /**有没有只改变一个参数的办法 */
            }
        });
    });
    /**蓝牙定位下进行模拟导航 */
    $("#autostep").click(function () {
        let PLocation = GLOBAL.PLocation;
        let type = $(".search-path .path").index($(".search-path .active")),
            startid = $(".start_input input").attr("roomid"), //获取startid
            endid = $(".end_input input").attr("roomid"),
            event = null; //获取endid
        if ($(".start_input input").val() == "我的位置") {
            startid = PLocation;
            event = "autostep";
        }
        else {
            NNavigation.EnableLocate(false);
            NNavigation.g_pCurLocation = null;
            console.error("关闭蓝牙");
            PLocation = null;
        }
        mockFlag = true;
        navigation(startid, endid, type, event);
    });

    $("#search-navigate-btn").click(function () {
        $(".search_direction_box").show();
        $(".navigation_btn .search-nav-text").text("开始导航");
        $(".search-box").show();
        $(".lockScene").hide();
        $(".pre-navigate").show();
        $(".navigating-btn").hide();
        $("#search-go").show();
        iconup($(".search_direction_box").height());
    });

    /**紧急疏散 */
    function shusan() {
        if (!$(".start_input input").attr("roomid")) {
            $(".start_input input").attr("roomid", "LT212");
            $(".start_input input").val("体育馆");
        }
        $(".search_direction_box").show();
        $("#search-go").show();
        setEndPoint("001", "疏散点", 0, 0);
        $(".search-path-floor li:first").trigger("click");
    }

    /** */
    $("#shusan").bind("click", shusan);
});

//TODO:旧代码=========================----------------------------------------------

var _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ?
    function (e) {
        return typeof e;
    } :
    function (e) {
        return e &&
            "function" == typeof Symbol &&
            e.constructor === Symbol &&
            e !== Symbol.prototype ?
            "symbol" :
            typeof e;
    };

function canRunES6(e) {
    try {
        return new Function(e)(), !0;
    } catch (e) {
        return !1;
    }
}

function D(e, t=0) {
    t = isNaN(t) ? 3e3 : t;
    var a = document.createElement("div");
    (a.innerHTML = e),
        (a.style.cssText =
            "width:60%; overflow: hidden; white-space: nowrap; text-overflow: ellipsis; min-width:150px; background:#000; opacity:0.5; height:40px; color:#fff; line-height:40px; text-align:center; border-radius:5px; position:absolute; top:0px; left:0px; right:0px; bottom:0px;margin:auto; z-index:999999; font-weight:bold;"),
        document.body.appendChild(a),
        setTimeout(function () {
            (a.style.webkitTransition =
                "-webkit-transform 0.5s ease-in, opacity 0.5s ease-in"),
                (a.style.opacity = "0"),
                setTimeout(function () {
                    document.body.removeChild(a);
                }, 500);
        }, t);
}

var app_version = "3.1.0";
var index_status = !1;
var audio: any = document.getElementById("voice");

var Froomloc = "";
var buildName = "";
var floorName = "";
var Fevent = null;
var currentScene = "室外";
var pageStatus = false;
var http_cache_time = 864e5;
var dpr = window.devicePixelRatio || 1;
var scale = {
    x: 1,
    y: 1
};
var upLoadPath = "../";

var pageSymble = location.href.indexOf("#") > -1 ? location.href.split("#")[1] : "index";
var popped = "state" in window.history;
var initialURL = location.href;

function reSetNavIcon(e) {
    $(".bottom_menu ul li a").each(function () {
        if (e.indexOf($(this).attr("pageid")) > -1) {
            $(".bottom_menu ul li").find("span").removeClass("current"),
                $(this).find("span").addClass("current"),
                $("title").html(
                    $(this).find("span").html()
                ),
                $(".bottom_menu ul li div").each(function () {
                    var e = $(this).attr("class");
                    (e = e.replace("_current", "")), $(this).attr("class", e);
                });
            var t = $(this).find("div").attr("class");
            $(this).find("div").removeClass(t),
                $(this).find("div").addClass(t + "_current");
        }
    });
}

function closeLeftSide() {
    $("#left-slide").animate({
        right: "-60%"
    }, 100);
    $(".mash").hide();
}

function closePartSide() {
    $("#self-part-slide").animate({
        left: "-50%"
    },
        100
    ),
        $(".mash").hide();
}

function closeModelSide() {
    $("#self-model-slide").animate({
        left: "-50%"
    },
        100
    ),
        $(".mash").hide();
}

function renderHospital(e) {
    var t = JSON.parse(e).response.list[0],
        a = t.titleA,
        i = t.ContentA,
        s = t.titleB,
        o = t.ContentB,
        n = t.titleC,
        l = t.ContentC;
    $("#page-hospital .hospital_name").html(a),
        $("#page-hospital .hospital_content").html(i),
        $("#page-hospital .history .name").html(s),
        $("#page-hospital .history-content").html(o),
        $("#page-hospital .kssz .name").html(n),
        $("#page-hospital .kssz-content").html(l);
}

function renderDepartments(e) {
    var t = JSON.parse(e),
        a = "",
        i = "",
        s = "",
        o = null;
    for (var n in t.response) {
        (a = (o = t.response[n]).ID), o.roomID, (i = o.iconUrl), (s = o.roomName);
        var l = "";
        (l += "<li><a href='#page-dep-detail' data-id='"),
            (l += a + "' data-transition='slide'><center>"),
            (l +=
                '<img src="images/default.png" data-src="' +
                upLoadPath +
                i +
                '"/></center><p>'),
            (l += s + "</p></a></li>"),
            $("#page-departments .departments_list ul").append(l);
    }
}

function renderExpert(e) {
    var t = JSON.parse(e),
        a = "",
        i = "",
        s = "",
        o = null;
    for (var n in t.response) {
        (a = (o = t.response[n]).ID), o.roomID, (i = o.iconUrl), (s = o.roomName);
        var l = "";
        (l += "<li><a href='#page-expert-list' data-id='"),
            (l += a + "' data-transition='slide'><center>"),
            (l +=
                "<img src='images/default.png' data-src='" +
                upLoadPath +
                i +
                "'/></center><p>"),
            (l += s + "</p></a></li>"),
            $("#page-expert .departments_list ul").append(l);
    }
}

function renderDepDetail(e) {
    var t = JSON.parse(e),
        a = t.Name,
        i = t.Detail,
        s = t.iconUrl;
    $("#page-dep-detail .dep_title").html(a),
        $("#page-dep-detail .dep_detail").html(i),
        "" === s || "string" != typeof s ?
            $("#page-dep-detail img").attr("src", "images/hospital_img.png") :
            $("#page-dep-detail img").attr("src", upLoadPath + s);
}

function renderExpertList(e) {
    var t = JSON.parse(e).response,
        a = null,
        i = "",
        s = "",
        o = "",
        n = "",
        l = "",
        r = "",
        c = "";
    for (var d in t)
        (s = (a = t[d]).Name),
            (o = a.Education),
            (n = a.Position),
            (l = a.Header),
            (r = a.ID),
            (c = a.Content),
            (i +=
                "<li><a href='#page-expert-detail' data-transition='slide' data-id='" +
                r +
                "'>"),
            (i +=
                "<img src='images/default.png' data-src='" +
                upLoadPath +
                l +
                "' class='header'>"),
            (i += "<div class='info_box'>"),
            (i += "<div class='name'>" + s + "</div>"),
            (i +=
                "0" !== n && "0" !== o ?
                    "<div class='professor'>" + n + "," + o + "</div>" :
                    "0" !== n && "0" === o ?
                        "<div class='professor'>" + n + "</div>" :
                        "0" === n && "0" !== o ?
                            "<div class='professor'>" + o + "</div>" :
                            "<div class='professor'>医务人员</div>"),
            (i += "<div class='info'>" + c + "</div>"),
            (i += "</div></a><div class='clearfix'></div></li>"),
            $("#page-expert .departments_list ul").html(i);
}

function renderExpertDetail(e) {
    var t,
        a,
        i,
        s,
        o,
        n,
        l,
        r = JSON.parse(e);
    (s = r.name),
        (t = r.content),
        (a = upLoadPath + r.header),
        (o = r.position),
        (n = r.education),
        (i = r.workTime),
        (l = r.roomId),
        "0" !== o && "0" !== n ?
            $("#page-expert-detail .personal-msg .expert-msg").text(o + "," + n) :
            "0" !== o && "0" === n ?
                $("#page-expert-detail .personal-msg .expert-msg").text(o) :
                "0" === o &&
                "0" !== n &&
                $("#page-expert-detail .personal-msg .expert-msg").text(n),
        $("#page-expert-detail .personal-msg .expert-msg").text().length < 5 &&
        $("#page-expert-detail .personal-msg .expert-msg").css(
            "padding-right",
            "1em"
        ),
        $("#page-expert-detail .expert-personal-detail .content").html(t),
        $("#page-expert-detail .department-msg .go-ahead").attr("room-id", l),
        $("#page-expert-detail .personal-msg .name").text(s),
        $("#page-expert-detail .head-box img").attr("src", a);
    var c = new Array("Mon", "Tues", "Wed", "Thur", "Fri", "Sat", "Sun");
    $(".work-table td span").each(function () {
        $(this).css("visibility", "hidden");
    });
    if (i) {
        for (var d in i[0])
            if ("1" === i[0][d]) {
                var p = c.indexOf(d) + 1;
                $(".work-table .am td")
                    .eq(p)
                    .children("span")
                    .css("visibility", "visible");
            }
        for (var d in i[1])
            if ("1" === i[1][d]) {
                p = c.indexOf(d) + 1;
                $(".work-table .pm td")
                    .eq(p)
                    .children("span")
                    .css("visibility", "visible");
            }
    }
}

function changePicModel() {
    var e = true,
        t = "";
    $(".self-sex-tag li:first-child").hasClass("self-tag-current") ?
        e ?
            ((t +=
                '<div class="person-model">\n\t\t\t\t\t\t<img src="images/male_face.jpg" alt="" width="1080" height="1920" usemap="#Map"/>\n                        <map name="Map" id="Map">\n                            <area dataid="toubu" alt="" title="" href="#头部" shape="poly" coords="482,161,524,153,565,150,595,161,632,177,640,208,645,238,641,259,636,278,639,299,629,320,620,330,611,343,597,366,572,388,552,392,531,394,513,385,490,368,474,329,462,319,452,302,450,284,450,257,448,210,459,187" />\n                            <area dataid="yanjingbu" alt="" title="" href="#咽颈部" shape="poly" coords="598,375,592,381,585,385,578,392,564,395,549,397,531,397,521,393,503,384,496,380,487,374,490,385,491,400,491,411,488,416,473,423,465,428,451,432,491,435,527,437,559,437,585,435,607,436,621,431,623,422,605,415,596,407" />\n                            <area dataid="xiongbu" alt="" title="" href="#胸部" shape="poly" coords="362,557,354,531,361,508,377,471,389,452,416,445,438,436,457,438,487,443,532,443,570,447,601,444,627,437,642,428,668,437,697,444,694,463,692,500,702,534,713,556,705,572,702,608,694,638,683,649,640,652,595,655,532,632,521,648,494,658,455,659,414,663,387,656,374,578" />\n                            <area dataid="fubu" alt="" title="" href="#腹部" shape="poly" coords="392,664,407,665,421,666,437,666,456,667,481,665,500,663,514,659,530,650,539,642,558,647,568,651,584,660,603,659,625,658,650,658,670,658,687,654,685,670,680,683,674,701,670,717,664,732,665,749,672,768,678,791,681,814,684,836,687,857,687,876,663,875,634,873,603,874,576,878,537,879,511,877,480,877,454,873,426,871,409,876,398,878,400,822,408,785,416,760,415,728" />\n                            <area dataid="shengzhibuwei" alt="" title="" href="#生殖部位" shape="poly" coords="395,884,434,879,453,879,492,884,508,884,540,884,593,884,622,879,654,881,684,883,685,906,685,931,684,947,695,973,694,998,697,1026,695,1033,659,1028,641,1029,615,1032,592,1036,576,1047,552,1047,546,1024,545,1018,536,1018,529,1018,524,1022,523,1032,522,1047,507,1046,478,1042,457,1038,434,1038,405,1039,385,1044,377,1045" />\n                            <area dataid="tuibu" alt="" title="" href="#腿部" shape="poly" coords="384,1099,386,1074,386,1057,386,1050,404,1049,424,1047,445,1046,460,1043,474,1045,489,1049,504,1052,516,1056,529,1056,527,1046,538,1038,545,1048,555,1058,567,1059,585,1052,602,1049,612,1041,637,1038,657,1037,674,1037,691,1040,698,1045,699,1053,694,1067,690,1089,690,1124,688,1150,679,1183,682,1198,682,1236,676,1266,674,1295,675,1324,678,1351,678,1385,678,1423,665,1484,655,1520,651,1553,645,1580,649,1609,651,1633,646,1657,647,1686,655,1713,666,1733,659,1750,647,1759,618,1756,589,1755,576,1753,577,1718,582,1689,581,1654,589,1625,594,1607,584,1550,577,1496,579,1441,575,1359,569,1285,567,1243,559,1205,560,1138,555,1072,554,1062,524,1060,521,1071,519,1106,518,1149,516,1187,516,1210,509,1262,503,1300,500,1338,499,1380,496,1439,499,1491,496,1535,487,1579,481,1615,489,1632,494,1649,494,1677,498,1708,500,1728,508,1747,500,1759,471,1756,446,1756,430,1759,414,1753,419,1714,430,1686,430,1649,429,1556,418,1504,402,1415,400,1265,398,1183" />\n                            <area dataid="shoubu" alt="" title="" href="#手部" shape="poly" coords="383,659,368,675,357,696,337,729,319,762,304,801,293,827,273,869,250,908,221,951,199,976,202,1018,198,1049,198,1087,190,1099,182,1059,179,1052,170,1075,164,1106,151,1121,149,1089,159,1053,146,1076,135,1105,115,1130,113,1109,127,1067,132,1046,116,1058,101,1082,83,1099,91,1069,112,1032,120,1012,113,1002,96,1011,78,1013,74,1006,93,991,122,973,146,961,161,943,171,915,183,863,209,814,227,777,258,698,283,632,303,593,316,575,319,552,330,526,366,468,377,459,365,480,357,503,347,532,364,572,373,593" />\n                            <area dataid="shoubu" alt="" title="" href="#手部" shape="poly" coords="704,447,700,464,699,484,702,516,715,549,716,562,713,574,710,588,707,603,703,620,699,636,698,648,721,676,737,712,763,754,783,803,796,819,815,864,842,908,869,950,883,967,879,995,886,1030,885,1065,889,1094,896,1087,900,1056,904,1046,909,1065,916,1089,924,1112,936,1107,926,1062,925,1048,931,1060,941,1081,958,1122,968,1124,972,1113,958,1075,948,1038,954,1036,993,1093,1001,1088,999,1075,980,1047,983,1050,965,1002,971,997,983,1003,998,1013,1014,1004,985,983,940,958,915,922,887,833,849,741,793,604,740,491" />\n                        </map>\n\t\t\t\t\t</div>'),
                console.info("male-adult")) :
            ((t +=
                '<div class="person-model">\n\t\t\t\t\t\t<img src="images/child_male_face.jpg" alt="" width="1080" height="1920" usemap="#Map"/>\n\t\t\t\t\t\t    <map name="Map" id="Map">\n                                <area dataid="toubu" alt="" title="" href="#头部" shape="poly" coords="492,505,464,473,457,462,433,451,422,432,426,404,430,397,424,364,430,332,440,296,445,276,439,244,461,258,485,245,511,234,577,230,598,235,626,255,650,284,665,322,668,360,659,393,669,410,667,435,647,457,625,472,607,500,585,511,544,527" />\n                                <area dataid="yanjingbu" alt="" title="" href="#咽颈部" shape="poly" coords="452,570,480,557,499,536,501,516,521,525,535,532,554,530,569,524,581,520,584,530,599,546,621,559,636,570" />\n                                <area dataid="xiongbu" alt="" title="" href="#胸部" shape="poly" coords="434,712,428,669,417,628,415,597,418,578,436,574,455,581,493,578,536,578,590,576,631,576,653,576,669,577,665,597,661,619,657,633,650,667,646,697,638,715,627,724,472,722" />\n                                <area dataid="fubu" alt="" title="" href="#腹部" shape="poly" coords="420,925,437,855,437,791,434,727,437,720,476,727,535,728,599,733,634,730,647,719,647,741,642,795,646,856,663,913,665,919,596,901,496,901" />\n                                <area dataid="shengzhibuwei" alt="" title="" href="#生殖部位" shape="poly" coords="411,930,436,926,464,919,491,912,523,907,554,906,587,906,610,914,627,912,644,922,663,923,673,930,682,945,682,964,668,970,621,977,584,998,558,1021,535,1027,517,1017,476,998,426,976,406,972" />\n                                <area dataid="tuibu" alt="" title="" href="#腿部" shape="poly" coords="406,1094,404,1038,403,995,402,975,423,978,442,989,472,999,493,1014,524,1031,544,1033,560,1028,578,1015,601,996,630,985,651,978,677,973,680,996,681,1041,667,1113,660,1199,649,1254,660,1305,665,1385,655,1465,639,1527,639,1583,665,1630,703,1658,699,1685,667,1699,621,1696,587,1654,558,1627,566,1572,572,1505,556,1445,556,1366,567,1297,550,1238,546,1153,548,1073,550,1040,532,1037,529,1070,534,1233,517,1309,524,1353,529,1418,514,1489,512,1544,526,1600,530,1623,514,1653,490,1659,484,1668,453,1697,412,1700,387,1689,378,1659,411,1635,444,1591,443,1530,424,1442,418,1379,426,1282,427,1215" />\n                                <area dataid="shoubu" alt="" title="" href="#手部" shape="poly" coords="413,578,413,592,411,635,420,669,428,711,424,724,401,781,366,872,333,935,299,1012,278,1053,257,1098,250,1090,224,1103,220,1098,202,1101,212,1069,189,1079,207,1020,184,1011,220,992,246,969,271,923,299,857,362,693,369,641,395,588" />\n                                <area dataid="shoubu" alt="" title="" href="#手部" shape="poly" coords="686,582,718,681,738,740,762,795,787,867,810,924,838,974,878,998,900,1004,893,1016,867,1017,881,1050,895,1083,874,1070,862,1051,869,1064,882,1094,868,1106,856,1106,832,1088,828,1101,799,1053,776,1017,766,968,713,860,661,724,653,712,650,705,676,579" />\n                            </map>\n\t\t\t\t\t</div>'),
                console.info("male-child")) :
        e ?
            ((t +=
                '<div class="person-model">\n\t\t\t\t\t\t<img src="images/female_face.jpg" alt="" width="1080" height="1920" usemap="#Map"/>\n\t\t\t\t\t\t    <map name="Map" id="Map">\n                             <area dataid="toubu" alt="" title="" href="#头部" shape="poly" coords="436,246,419,248,412,242,403,233,386,217,377,194,397,206,397,194,394,175,411,186,415,172,424,162,439,153,456,146,470,143,489,153,498,170,503,192,506,199,517,198,528,197,522,179,510,148,514,141,543,156,557,191,576,190,625,204,666,246,676,264,686,301,688,334,681,358,668,383,653,413,641,432,626,451,600,445,580,450,570,456,552,463,532,470,514,463,496,452,479,438,469,444,452,444,428,399,419,381,409,346,413,281" />\n                             <area dataid="yanjingbu" alt="" title="" href="#咽颈部" shape="poly" coords="462,498,485,493,495,487,501,479,505,466,510,467,524,472,538,472,549,471,561,467,571,463,576,459,580,459,582,471,584,482,587,487,596,490,607,496,622,501,629,504" />\n                             <area dataid="xiongbu" alt="" title="" href="#胸部" shape="poly" coords="443,500,442,511,434,609,429,642,428,676,449,694,498,698,538,689,593,701,641,692,659,660,651,605,641,557,641,504,623,510" />\n                             <area dataid="fubu" alt="" title="" href="#腹部" shape="poly" coords="450,794,461,732,455,700,481,701,510,701,536,694,591,706,633,700,623,739,633,793,668,868,639,878,595,888,545,891,504,887,470,882,439,875,418,867" />\n                             <area dataid="shengzhibuwei" alt="" title="" href="#生殖部位" shape="poly" coords="406,895,412,869,423,876,445,881,465,886,497,889,518,892,556,895,597,894,621,889,643,881,663,877,671,873,677,890,678,899,623,924,560,968,518,965" />\n                             <area dataid="tuibu" alt="" title="" href="#腿部" shape="poly" coords="398,1017,397,961,408,898,528,975,555,972,565,971,677,906,686,968,684,1038,670,1170,660,1243,669,1304,663,1435,658,1507,639,1584,634,1628,638,1656,636,1679,658,1725,671,1742,653,1756,625,1757,597,1756,578,1749,584,1719,578,1669,576,1630,576,1537,581,1347,585,1288,550,982,530,983,522,1117,499,1290,496,1313,499,1345,505,1637,507,1660,501,1680,501,1725,507,1746,494,1755,470,1753,453,1753,437,1756,424,1749,419,1737,437,1712,447,1671,449,1623,442,1597,427,1510,414,1354,417,1278,416,1186" />\n                             <area dataid="shoubu" alt="" title="" href="#手部" shape="poly" coords="435,504,434,522,431,553,431,590,426,621,423,645,422,670,421,689,402,718,361,767,340,800,329,820,320,844,259,916,246,958,241,993,233,1018,221,1040,212,1052,206,1044,212,1019,212,1010,206,1023,194,1040,190,1052,175,1062,173,1051,188,1019,181,1030,170,1053,166,1060,156,1055,164,1025,164,1017,153,1036,148,1041,142,1037,144,1016,158,992,163,972,152,968,132,962,129,953,153,952,177,940,187,927,202,915,210,902,375,613,410,521" />\n                             <area dataid="shoubu" alt="" title="" href="#手部" shape="poly" coords="647,506,646,523,645,558,653,596,660,634,662,674,662,687,680,709,718,761,747,806,766,847,800,888,829,923,835,960,837,998,853,1024,864,1046,877,1051,866,1009,888,1050,905,1069,906,1056,890,1011,907,1048,918,1063,927,1058,909,1004,928,1035,938,1038,929,1002,916,970,946,970,952,958,931,952,899,936,874,920,857,864,705,611,696,551,666,508" />\n                         </map>\n\t\t\t\t\t</div>'),
                console.info("female-adult")) :
            ((t +=
                '<div class="person-model">\n\t\t\t\t\t\t<img src="images/child_female_face.jpg" alt="" width="1080" height="1920" usemap="#Map"/>\n\t\t\t\t\t\t  <map name="Map" id="Map">\n                            <area dataid="toubu" alt="" title="" href="#头部" shape="poly" coords="615,515,547,540,492,526,461,509,445,474,421,439,414,496,420,556,380,622,378,534,381,494,367,440,372,325,388,300,410,304,439,263,485,238,541,222,578,233,623,252,654,281,668,301,688,302,706,324,711,359,704,408,702,455,704,504,707,582,707,596,707,606,712,619,661,564,666,512,677,484,664,444,638,475" />\n                            <area dataid="yanjingbu" alt="" title="" href="#咽颈部" shape="poly" coords="505,533,505,549,505,564,476,583,460,588,444,591,491,593,533,593,574,592,609,590,636,590,589,565,579,545,576,535,557,540,534,543" />\n                            <area dataid="xiongbu" alt="" title="" href="#胸部" shape="poly" coords="414,618,436,650,442,671,450,758,469,764,533,770,584,773,627,759,634,744,642,659,649,645,664,614,649,599,626,596,543,597,484,599,442,599,429,603" />\n                            <area dataid="fubu" alt="" title="" href="#腹部" shape="poly" coords="436,852,451,802,451,765,462,767,485,771,514,774,538,777,571,777,595,778,612,771,626,765,633,762,634,784,640,829,646,854,662,889,670,929,618,946,549,952,490,952,447,941,418,931,416,919" />\n                            <area dataid="shengzhibuwei" alt="" title="" href="#生殖部位" shape="poly" coords="412,933,435,941,466,951,488,955,574,959,614,953,667,937,672,936,673,997,671,1037,668,1064,668,1079,622,1087,571,1087,552,1052,542,1037,531,1048,522,1059,513,1085,502,1093,463,1087,416,1078" />\n                            <area dataid="tuibu" alt="" title="" href="#腿部" shape="poly" coords="469,1573,449,1494,438,1418,432,1334,435,1275,424,1223,416,1141,415,1084,441,1091,490,1099,512,1097,575,1095,612,1094,667,1086,666,1133,663,1221,655,1273,649,1336,648,1409,618,1564,616,1608,633,1662,613,1692,580,1691,557,1638,554,1584,562,1539,564,1472,570,1367,567,1279,569,1187,570,1097,510,1099,514,1291,521,1546,528,1599,527,1635,515,1668,508,1692,472,1695,458,1680,452,1660" />\n                            <area dataid="shoubu" alt="" title="" href="#手部" shape="poly" coords="409,622,424,642,437,671,441,709,445,748,425,790,395,835,357,908,312,987,319,995,311,1020,301,1039,269,1040,255,1048,236,1038,239,990,253,975,307,857,346,805" />\n                            <area dataid="shoubu" alt="" title="" href="#手部" shape="poly" coords="672,614,687,666,701,721,721,764,742,815,784,876,810,929,828,976,843,988,846,1018,844,1033,820,1044,810,1038,780,1035,761,993,772,987,752,949,638,747,644,675,653,648" />\n                         </map>\n\t\t\t\t\t</div>'),
                console.info("female-child")),
        $("#page-self-service .container").html(t),
        initPeoplePic();
}

function renderSelfPartSlide(e) {
    var t = JSON.parse(e).response,
        a = "";
    for (var i in t)
        a += '<li dataid="' + t[i].BodyID + '">' + t[i].Name + "</li>";
    $("#self-part-slide ul").html(a);
}

function renderSicknessSlide(e) {
    var t = JSON.parse(e).response,
        a = "",
        i = t.SicknessList;
    for (var s in i)
        a +=
            '<a href="#page-self-service-rusult" data-transition="slide"><li dataid="' +
            i[s].ID +
            '">' +
            i[s].Name +
            "</li></a>";
    $("#self-sickness-slide ul").html(a),
        mSetItem("sickness", JSON.stringify(t.SicknessList));
}

function renderSelfIllnessSlide(e) {
    var t = JSON.parse(e).response,
        a = "";
    for (var i in t)
        if ("object" == _typeof(t[i])) {
            var s = null;
            for (var o in t[i])
                a +=
                    '<a href="#page-self-service-rusult" data-transition="slide"><li dataid="' +
                    (s = t[i][o]).ID +
                    '">' +
                    s.Name +
                    "</li></a>";
            mSetItem("illness", JSON.stringify(t[i]));
        }
    $("#self-illness-slide ul").html(a);
}

function initPeoplePic() {
    var e = arguments.length > 0 && void 0 !== arguments[0] ? arguments[0] : 0,
        t = arguments.length > 1 && void 0 !== arguments[1] ? arguments[1] : 0;
    e <= 1 || 0 === e ?
        ((scale.x = $(window).width() / 1080),
            (scale.y = $(window).height() / 1920)) :
        ((scale.x = e), (scale.y = t)),
        $(".container img,.container map").css({
            transform: "scale(" + scale.x + "," + scale.y + ")"
        });
    var a = $("#page-self-service img").width() * scale.x,
        i = $("#page-self-service img").height() * scale.y;
    $("#page-self-service .person-model")
        .width(a)
        .height(i);
}

function renderSelfModelSlide(e) {
    var t = "",
        a = JSON.parse(e).response;
    for (var i in a) t += '<li dataid="' + a[i].ID + '">' + a[i].Name + "</li>";
    $("#self-model-slide ul").html(t)
}

function getByteLen(e) {
    var t = 0;
    if (e)
        for (var a = 0; a < e.length; a++) {
            null != e.charAt(a).match(/[^\x00-\xff]/gi) ? (t += 2) : (t += 1);
        }
    return t;
}

reSetNavIcon(pageSymble);


$(window).bind("popstate", function (e) {
    var t = location.href,
        a = !popped && t == initialURL;
    if (
        ((popped = !0),
            !a && $(".index").hasClass("ui-page-active"),
            !a && $("#page-self-service").hasClass("ui-page-active"))
    ) {
        var i = !0,
            s = !0;
        "none" != $("#self-illness-slide").css("display") &&
            ((i = !1),
                window.history.pushState({
                    title: "自助导诊"
                },
                    "自助导诊",
                    "/h5/index.html#page-self-service"
                ),
                $("#self-illness-slide").css("display", "none")),
            "0px" == $("#self-model-slide").css("left") &&
            "none" == $("#self-illness-slide").css("display") &&
            i &&
            ('{"title":"自助导诊"}' != JSON.stringify(window.history.state) &&
                window.history.pushState({
                    title: "自助导诊"
                },
                    "自助导诊",
                    "/h5/index.html#page-self-service"
                ),
                $(".mash").trigger("click")),
            "none" != $("#self-sickness-slide").css("display") &&
            ((s = !1),
                window.history.pushState({
                    title: "自助导诊"
                },
                    "自助导诊",
                    "/h5/index.html#page-self-service"
                ),
                $("#self-sickness-slide").css("display", "none"),
                $(".self-part-sub").removeClass("self-part-sub-current")),
            "0px" == $("#self-part-slide").css("left") &&
            "none" == $("#self-sickness-slide").css("display") &&
            s &&
            ('{"title":"自助导诊"}' != JSON.stringify(window.history.state) &&
                window.history.pushState({
                    title: "自助导诊"
                },
                    "自助导诊",
                    "/h5/index.html#page-self-service"
                ),
                $(".mash").trigger("click"));
    }
    reSetNavIcon(
        (pageSymble =
            location.href.indexOf("#") > -1 ? location.href.split("#")[1] : "index")
    );
});
$(".bottom_menu ul li a").click(function () {
    (audio.volume = 0),
        Engine.g_pInstance.m_pProject.StopAutoMotion(),
        $(".bottom_menu ul li")
            .find("span")
            .removeClass("current"),
        $(this)
            .find("span")
            .addClass("current"),
        $("title").html(
            $(this)
                .find("span")
                .html()
        ),
        $(".bottom_menu ul li div").each(function () {
            var e = $(this).attr("class");
            (e = e.replace("_current", "")), $(this).attr("class", e);
        });
    var e = $(this)
        .find("div")
        .attr("class");
    $(this)
        .find("div")
        .removeClass(e),
        $(this)
            .find("div")
            .addClass(e + "_current"),
        "index" != $(this).attr("pageid") ?
            window.history.replaceState({
                title: "导航"
            },
                "导航",
                "/h5/index.html"
            ) :
            index_status ?
                window.history.replaceState({
                    title: "导航"
                },
                    "导航",
                    "/h5/index.html"
                ) :
                index_status || (index_status = !0);
});
$(document).on("pageinit", "#page-hospital", function (e) {
    reSetNavIcon((pageSymble = "hospital"));
    var t = new Date().valueOf();
    "null" != JSON.stringify(mGetItem("page-hospital")) &&
        parseInt(mGetItem("page-hospital-time")) > t - http_cache_time ?
        (renderHospital(mGetItem("page-hospital")),
            console.info("读取医院信息缓存")) :
        ($.ajax({
            type: "get",
            url: SVE_H5_URL + "api/info/getHospitalH5.php",
            async: !0,
            success: function (e) {
                e
                    ?
                    (renderHospital(e),
                        mSetItem("page-hospital", e),
                        mSetItem("page-hospital-time", new Date().valueOf())) :
                    console.info("请求数据出错.");
            },
            error: function (e) {
                console.warn("get page-hospital data error: " + e);
            }
        }),
            console.info("请求医院信息数据"));
});
$(document).on("pagebeforeshow", "#page-hospital", function () {
    $("#page-hospital .hospital_img img").attr("src", "images/hospital_img.jpg")
});
$(document).on("pageinit", "#page-departments", function (e) {
    reSetNavIcon((pageSymble = "departments"));
    var t = new Date().valueOf();
    "null" != JSON.stringify(mGetItem("page-departments")) &&
        parseInt(mGetItem("page-departments-time")) > t - http_cache_time ?
        (renderDepartments(mGetItem("page-departments")),
            console.info("读取科室列表缓存")) :
        $.ajax({
            type: "get",
            url: SVE_H5_URL + "api/info/getKeShilistH5.php",
            async: !0,
            success: function (e) {
                e
                    ?
                    (renderDepartments(e),
                        mSetItem("page-departments", e),
                        mSetItem("page-departments-time", new Date().valueOf()),
                        console.info("请求科室列表数据")) :
                    console.info("请求数据出错.");
            },
            error: function (e) {
                console.warn("get page-departments data error: " + e);
            }
        });
});
$(document).on("pageshow", "#page-index", function (e) {
    reSetNavIcon((pageSymble = "index"));
    if (pageStatus) {
        null !== Engine.g_pInstance && Start();
    }
    $("#search-go").show();
});
$(document).on("pageinit", "#page-expert", function (e) {
    reSetNavIcon((pageSymble = "expert"));
    var t = new Date().valueOf();
    "null" != JSON.stringify(mGetItem("page-expert")) &&
        parseInt(mGetItem("page-expert-time")) > t - http_cache_time ?
        (renderExpertList(mGetItem("page-expert")),
            console.info("读取专家[科室]列表缓存")) :
        ($.ajax({
            type: "get",
            url: SVE_H5_URL + "api/info/getExpertListH5.php",
            async: !0,
            success: function (e) {
                e
                    ?
                    (renderExpertList(e),
                        mSetItem("page-expert", e),
                        mSetItem("page-expert-time", new Date().valueOf())) :
                    console.info("请求数据出错.");
            },
            error: function (e) {
                console.log("get page-expert data error: " + e);
            }
        }),
            console.info("请求专家[科室]列表数据"));
});
$(document).on("pageshow", "#page-dep-detail", function (e) {
    reSetNavIcon((pageSymble = "departments"));
    var t = mGetItem("paramID");
    $.ajax({
        type: "get",
        url: SVE_H5_URL + "api/info/getcompanyinfoH5.php?id=" + t,
        async: !0,
        success: function (e) {
            e ? renderDepDetail(e) : console.info("请求数据出错.");
        },
        error: function (e) {
            console.warn("get page-dep-detail data error: " + e);
        }
    }),
        console.info("请求科室详情数据");
});
$(document).on("pagebeforeshow", "#page-dep-detail", function () {
    $("#page-dep-detail .img-container img").attr("src", "images/hospital_img.jpg")
});
$(document).on("pageshow", "#page-expert-list", function (e) {
    reSetNavIcon((pageSymble = "expert"));
    var t = mGetItem("paramID");
    $.ajax({
        type: "get",
        url: SVE_H5_URL + "api/info/getExpertListH5.php?departmentId=" + t,
        async: !0,
        success: function (e) {
            e ? renderExpertList(e) : console.info("请求数据出错.");
        },
        error: function (e) {
            console.info("get page-expert-list data error: " + e);
        }
    }),
        console.info("请求专家列表数据");
    new LazyLoadImg({
        el: document.querySelector("#page-expert-list .expert_list ul"),
        mode: "default",
        time: 300,
        complete: !0,
        position: {
            top: 0,
            right: 0,
            bottom: 0,
            left: 0
        },
        before: function () { },
        success: function (e) {
            e.classList.add("success");
        },
        error: function (e) {
            e.src = "images/default.png";
        }
    });
});
$(document).on("pageshow", "#page-expert-detail", function (e) {
    reSetNavIcon((pageSymble = "expert"));
    var t = mGetItem("paramID");
    $.ajax({
        type: "get",
        url: SVE_H5_URL + "api/info/getExpertInfoH5.php?ID=" + t,
        async: !0,
        success: function (e) {
            e ? renderExpertDetail(e) : console.info("请求数据出错.");
        },
        error: function (e) {
            console.warn("get expert detail error: " + e);
        }
    }),
        console.info("请求专家详情数据");
});
$(document).on("pagehide", "#page-index", function (e) {
    closeLeftSide();
    if (pageStatus) {
        null !== Engine.g_pInstance && Stop();
    }
});
$(document).on("pagehide", "#page-self-service", function (e) {
    closePartSide(), closeModelSide();
});
$(document).on("pageshow", "#page-expert", function () {
    new LazyLoadImg({
        el: document.querySelector("#page-expert .dep_box .departments_list ul"),
        mode: "default",
        time: 300,
        complete: !0,
        position: {
            top: 0,
            right: 0,
            bottom: 0,
            left: 0
        },
        before: function () { },
        success: function (e) {
            e.classList.add("success");
        },
        error: function (e) {
            e.src = "images/dep_icon1.png";
        }
    });
});
$(document).on("pageshow", "#page-departments", function () {
    new LazyLoadImg({
        el: document.querySelector(
            "#page-departments .dep_box .departments_list ul"
        ),
        mode: "default",
        time: 300,
        complete: !0,
        position: {
            top: 0,
            right: 0,
            bottom: 0,
            left: 0
        },
        before: function () { },
        success: function (e) {
            e.classList.add("success");
        },
        error: function (e) {
            e.src = "images/dep_icon1.png";
        }
    });
});
$(document).on("pageshow", "#page-self-service", function () {
    reSetNavIcon((pageSymble = "self")), initPeoplePic();
});
$(document).on("pageinit", "#page-self-service", function () {
    $("#page-self-service .person-model img").attr("src", "images/male_face.jpg")
});
$(document).on("pageinit", "#page-sheshi", function () {
    var e = new Date().valueOf();
    "null" != JSON.stringify(mGetItem("base-Toilet-list")) &&
        parseInt(mGetItem("base-Toilet-list-time")) > e - http_cache_time ?
        (Initsheshi(mGetItem("base-Toilet-list")),
            console.info("读取基础设施信息缓存")) :
        $.ajax({
            type: "get",
            async: !0,
            url: SVE_H5_URL + "api/info/getToiletList.php",
            success: function (e) {
                e
                    ?
                    (Initsheshi(e),
                        mSetItem("base-Toilet-list", e),
                        mSetItem("base-Toilet-list-time", new Date().valueOf())) :
                    console.info("请求数据出错.");
            },
            error: function (e) {
                console.warn("get basePosition err: " + e);
            }
        });

    function Initsheshi(e) {
        for (
            var t = JSON.parse(e),
            a = null,
            i = null,
            s = '<div class="panel-box">',
            o = 0; o < t.response.length; o++
        )
            if ((i = (a = t.response[o]).roomChildList)) {
                s +=
                    '<div class="pannel"><div class="panel-head"><span class="title">' +
                    "室外卫生间" +
                    '</span><span class="fold-icon"><span class="icon-chevron-thin-down"></span></span></div><div class="panel-body" style="display: none">';
                for (var n = 0; n < 2; n++)
                    s +=
                        '<span roomid="' + i[n].roomID + '">' + i[n].roomName + "</span>";
                s += "</div></div>";
                s +=
                    '<div class="pannel"><div class="panel-head"><span class="title">' +
                    "室内卫生间" +
                    '</span><span class="fold-icon"><span class="icon-chevron-thin-down"></span></span></div><div class="panel-body" style="display: none">';
                for (var n = 2; n < i.length; n++)
                    s +=
                        '<span roomid="' + i[n].roomID + '">' + i[n].roomName + "</span>";
                s += "</div></div>";
            }
        (s += "</div>"), $(".search-list-toilet").append(s);
        $("#page-sheshi .panel-head").eq(0).trigger("click");
        $("#page-sheshi .panel-head").eq(1).trigger("click");
    }
});
$(document).on("click", ".self-sex-tag li", function () {
    $(this).addClass("self-tag-current").removeClass("self-tag-normal").siblings().removeClass("self-tag-current").addClass("self-tag-normal"),
        changePicModel();
});
$(document).on("touchstart", ".self-head-tag", function () {
    window.history.replaceState({
        title: "自助导诊"
    },
        "自助导诊",
        "/h5/index.html#page-self-service"
    ),
        window.history.pushState({
            title: "导航"
        },
            "导航",
            "/h5/index.html"
        ),
        $("#self-part-slide").scrollTop(0);
    var e = new Date().valueOf();
    "null" != JSON.stringify(mGetItem("body-info")) &&
        parseInt(mGetItem("body-info-time")) > e - http_cache_time ?
        (renderSelfPartSlide(mGetItem("body-info")),
            console.info("读取人体部位列表缓存")) :
        ($.ajax({
            type: "get",
            url: SVE_H5_URL + "api/info/getBodyInfoList.php",
            async: !0,
            success: function (e) {
                e
                    ?
                    (renderSelfPartSlide(e),
                        mSetItem("body-info", e),
                        mSetItem("body-info-time", new Date().valueOf())) :
                    console.info("请求数据出错.");
            },
            error: function (e) {
                console.warn("get body-info error: " + e);
            }
        }),
            console.info("请求人体部位列表"));
    $("#self-part-slide").animate({
        left: "0"
    },
        "fast"
    ),
        $(".mash").show();
});
$(document).on("click", ".self-head-tag", function (e) {
    e.preventDefault();
});
$(document).on("touchstart", "#self-part-slide ul li", function () {
    if (
        ($(".mash").show(),
            $("#self-sickness-slide").hide(),
            !$(this).hasClass("self-part-sub"))
    ) {
        $("#self-part-slide ul li.self-part-sub").each(function () {
            $(this).remove();
        });
        var e = $(this).attr("dataid"),
            t = $(this),
            a = "",
            i = !1;
        $("#self-part-slide ul li:last").is(t) && (i = !0),
            $.ajax({
                type: "get",
                url: SVE_H5_URL + "api/info/getSymptomList.php?bodyId=" + e + "&sex=0",
                async: !0,
                success: function (e) {
                    var s = JSON.parse(e).response;
                    for (var o in s)
                        a +=
                            '<li class="self-part-sub" dataid="' +
                            s[o].ID +
                            '">' +
                            s[o].Name +
                            "</li>";
                    t.after(a),
                        i &&
                        $("#self-part-slide").animate({
                            scrollTop: $("#self-part-slide").height()
                        },
                            "fast"
                        );
                },
                error: function (e) {
                    console.warn("get self-part-sub-data error: " + e);
                }
            });
    }
});
$(document).on("click", ".self-part-sub", function () {
    $(this)
        .addClass("self-part-sub-current")
        .siblings()
        .removeClass("self-part-sub-current");
    var e = $(this).attr("dataid");
    $.ajax({
        type: "get",
        url: SVE_H5_URL + "api/info/getSicknessList.php?Id=" + e,
        async: !0,
        success: function (e) {
            e
                ?
                ($("#self-sickness-slide").show(), renderSicknessSlide(e)) :
                console.info("请求数据出错.");
        },
        error: function (e) {
            console.warn("get self-sickness-data error: " + e);
        }
    });
});
$(document).on("click", "#self-sickness-slide li", function () {
    closePartSide(), $("#self-sickness-slide").hide();
    var e = $(this).attr("dataid"),
        t = JSON.parse(mGetItem("sickness")),
        a = null,
        i = '<li class="list-head">自助导诊结果</li>';
    for (var s in t)
        if (t[s].ID == e) {
            for (var o in (a = t[s].RoomList))
                i +=
                    '<li><span class="self-advice"><span>建议科室：</span><span class="room-name">' +
                    a[o].Room_Name +
                    '</span></span><div class="self-go"><span dataid="' +
                    a[o].Room_ID +
                    '" class="self-go-ahead">直达科室</span></div></li>';
            i += '<div class="self-result-content">' + t[s].Content + "</div>";
        }
    $("#page-self-service-rusult ul").html(i);
});
$(document).on("touchstart", "#self-model-slide ul li", function () {
    $(this).addClass("self-model-current").siblings().removeClass("self-model-current");
    var e = $(this).attr("dataid");
    $.ajax({
        type: "get",
        url: SVE_H5_URL + "api/info/getSicknessList.php?Id=" + e,
        async: !0,
        success: function (e) {
            e ? ($("#self-illness-slide").show(), renderSelfIllnessSlide(e)) : console.log("请求数据出错.")
        },
        error: function (e) {
            console.warn("get self-illness-data error: " + e);
        }
    });
});
$(document).on("click", "#self-illness-slide ul li", function () {
    var e = $(this).attr("dataid");
    closeModelSide(), $("#self-illness-slide").hide();
    var t = JSON.parse(mGetItem("illness")),
        a = '<li class="list-head">自助导诊结果</li>',
        i = null;
    for (var s in t)
        if (t[s].ID == e) {
            for (var o in (i = t[s].RoomList))
                a +=
                    '<li><span class="self-advice"><span>建议科室：</span><span class="room-name">' +
                    i[o].Room_Name +
                    '</span></span><div class="self-go"><span dataid="' +
                    i[o].Room_ID +
                    '" class="self-go-ahead">直达科室</span></div></li>';
            a += '<div class="self-result-content">' + t[s].Content + "</div>";
        }
    $("#page-self-service-rusult ul").html(a);
});
$(document).on("pageshow", "#page-self-service-rusult", function () {
    reSetNavIcon((pageSymble = "self")),
        console.info("enter page-self-service-rusult.");
});
$(document).on("pagehide", "#page-self-service", function () {
    closePartSide(),
        closeModelSide(),
        $("#self-illness-slide").hide(),
        $("#self-sickness-slide").hide();
});
$(document).on("touchstart", "#page-self-service map area", function (e: any) {
    e.preventDefault();
    window.history.replaceState({
        title: "自助导诊"
    }, "自助导诊", "/h5/index.html#page-self-service"), window.history.pushState({
        title: "导航"
    }, "导航", "/h5/index.html"), $("#self-model-slide").scrollTop(0);
    e = true;
    var t = true;
    var a = $(".self-sex-tag li:first-child").hasClass("self-tag-current");
    var i = $(this).attr("dataid") || "all";
    e = t && a ? 1 : t && !a ? 2 : !t && a ? 3 : t || a ? 0 : 4;

    $.ajax({
        type: "get",
        url: SVE_H5_URL + "api/info/getSymptomList.php?bodyId=" + i + "&sex=" + e,
        async: !0,
        success: function (e) {
            e ? renderSelfModelSlide(e) : console.info("请求数据出错.");
        },
        error: function (e) {
            console.warn("get self-part-data error: " + e);
        }
    }), console.info("请求人体部位相应疾病数据"), $("#self-model-slide").animate({
        left: "0%"
    }, "fast"), $(".mash").show(200)
});
$(document).on("click", "#page-self-service map area", function (e) {
    e.preventDefault();
});
$(document).on("click", ".reversal", function () {
    var e = $(".person-model img").attr("src"),
        t = $(".person-model img")
            .attr("src")
            .split("/"),
        a = t[t.length - 1],
        i = (e.substr(0, e.length - a.length), "");
    switch (a) {
        case "male_face.jpg":
            i +=
                '<div class="person-model">\n                            <img src="images/male_back.jpg" alt="" width="1080" height="1920" usemap="#Map"/>\n                            <map name="Map" id="Map">\n                            <area dataid="toubu" alt="" title="" href="#头部" shape="poly" coords="447,205,483,160,563,145,632,176,645,240,638,273,639,298,623,323,613,342,599,365,539,364,493,363,471,329,450,302" />\n                            <area dataid="yanjingbu" alt="" title="" href="#咽颈部" shape="poly" coords="494,410,595,411,598,369,496,367" />\n                            <area dataid="yaobeibu" alt="" title="" href="#腰背部" shape="poly" coords="360,553,372,566,375,589,380,611,388,645,395,669,401,694,413,718,419,742,413,778,405,801,397,828,397,872,427,873,472,869,518,871,562,875,609,876,643,877,665,877,682,874,682,828,674,779,668,727,682,689,692,655,695,627,704,595,709,557,717,545,702,498,694,466,687,445,685,441,654,426,625,417,609,415,541,417,493,414,478,415,438,431,396,444" />\n                            <area dataid="tunbugangmen" alt="" title="" href="#臀部及肛门" shape="poly" coords="395,882,387,913,385,945,383,973,379,1003,378,1030,381,1036,425,1029,477,1032,520,1032,543,1035,567,1036,613,1033,651,1031,694,1033,699,992,688,939,685,909,684,882,495,873" />\n                            <area dataid="tuibu" alt="" title="" href="#腿部" shape="poly" coords="381,1046,415,1040,438,1037,489,1038,522,1039,546,1041,562,1043,597,1043,623,1040,674,1040,695,1042,700,1048,694,1067,692,1096,689,1119,688,1152,683,1181,680,1203,680,1238,678,1263,675,1295,675,1335,677,1382,674,1427,672,1457,666,1492,656,1518,649,1555,645,1586,646,1614,645,1632,649,1652,649,1667,650,1690,650,1703,650,1720,654,1731,659,1743,652,1759,636,1763,618,1772,603,1774,581,1773,568,1752,571,1722,572,1694,578,1665,590,1633,582,1574,577,1465,576,1391,569,1300,565,1257,558,1216,556,1161,557,1123,556,1075,553,1055,541,1055,534,1090,525,1138,521,1170,520,1202,514,1228,509,1261,503,1300,504,1329,501,1358,499,1393,500,1432,497,1478,495,1528,493,1563,490,1597,483,1632,484,1651,496,1664,499,1683,499,1705,502,1727,499,1748,485,1768,468,1778,441,1777,424,1762,415,1738,422,1681,428,1621,411,1507,402,1408,402,1275" />\n                            <area dataid="shoubu" alt="" title="" href="#手部" shape="poly" coords="387,449,384,472,380,485,369,508,365,523,358,547,355,563,362,573,368,599,378,618,383,639,386,654,367,675,352,707,341,729,329,743,315,766,307,786,298,809,287,825,276,854,262,881,242,911,223,940,202,970,202,988,202,1016,198,1034,201,1067,196,1091,187,1094,184,1072,181,1045,174,1071,165,1108,152,1119,148,1097,157,1051,143,1080,134,1112,126,1124,115,1129,112,1113,130,1041,119,1052,102,1079,87,1097,81,1091,107,1035,116,1005,107,1006,93,1011,72,1012,103,978,158,953,189,848,263,687,298,595,313,570,321,540,345,489,364,463" />\n                            <area dataid="shoubu" alt="" title="" href="#手部" shape="poly" coords="695,442,700,462,705,480,713,505,719,532,724,550,716,563,711,587,706,613,698,642,714,664,729,691,739,714,754,737,769,758,778,788,793,817,806,846,839,896,859,928,884,967,882,1004,885,1031,882,1073,891,1089,900,1063,905,1043,913,1068,919,1094,930,1112,936,1092,924,1044,935,1066,947,1088,958,1117,968,1123,972,1109,962,1077,951,1035,963,1045,975,1065,998,1089,998,1070,974,1032,965,997,972,993,981,1002,997,1008,1007,999,985,978,949,960,918,937,898,852,835,718,796,610,750,506,716,453" />\n                         </map>\n\t\t\t\t\t </div>';
            break;
        case "male_back.jpg":
            i +=
                '<div class="person-model">\n\t\t\t\t\t\t<img src="images/male_face.jpg" alt="" width="1080" height="1920" usemap="#Map"/>\n                        <map name="Map" id="Map">\n                            <area dataid="toubu" alt="" title="" href="#头部" shape="poly" coords="482,161,524,153,565,150,595,161,632,177,640,208,645,238,641,259,636,278,639,299,629,320,620,330,611,343,597,366,572,388,552,392,531,394,513,385,490,368,474,329,462,319,452,302,450,284,450,257,448,210,459,187" />\n                            <area dataid="yanjingbu" alt="" title="" href="#咽颈部" shape="poly" coords="598,375,592,381,585,385,578,392,564,395,549,397,531,397,521,393,503,384,496,380,487,374,490,385,491,400,491,411,488,416,473,423,465,428,451,432,491,435,527,437,559,437,585,435,607,436,621,431,623,422,605,415,596,407" />\n                            <area dataid="xiongbu" alt="" title="" href="#胸部" shape="poly" coords="362,557,354,531,361,508,377,471,389,452,416,445,438,436,457,438,487,443,532,443,570,447,601,444,627,437,642,428,668,437,697,444,694,463,692,500,702,534,713,556,705,572,702,608,694,638,683,649,640,652,595,655,532,632,521,648,494,658,455,659,414,663,387,656,374,578" />\n                            <area dataid="fubu" alt="" title="" href="#腹部" shape="poly" coords="392,664,407,665,421,666,437,666,456,667,481,665,500,663,514,659,530,650,539,642,558,647,568,651,584,660,603,659,625,658,650,658,670,658,687,654,685,670,680,683,674,701,670,717,664,732,665,749,672,768,678,791,681,814,684,836,687,857,687,876,663,875,634,873,603,874,576,878,537,879,511,877,480,877,454,873,426,871,409,876,398,878,400,822,408,785,416,760,415,728" />\n                            <area dataid="shengzhibuwei" alt="" title="" href="#生殖部位" shape="poly" coords="395,884,434,879,453,879,492,884,508,884,540,884,593,884,622,879,654,881,684,883,685,906,685,931,684,947,695,973,694,998,697,1026,695,1033,659,1028,641,1029,615,1032,592,1036,576,1047,552,1047,546,1024,545,1018,536,1018,529,1018,524,1022,523,1032,522,1047,507,1046,478,1042,457,1038,434,1038,405,1039,385,1044,377,1045" />\n                            <area dataid="tuibu" alt="" title="" href="#腿部" shape="poly" coords="384,1099,386,1074,386,1057,386,1050,404,1049,424,1047,445,1046,460,1043,474,1045,489,1049,504,1052,516,1056,529,1056,527,1046,538,1038,545,1048,555,1058,567,1059,585,1052,602,1049,612,1041,637,1038,657,1037,674,1037,691,1040,698,1045,699,1053,694,1067,690,1089,690,1124,688,1150,679,1183,682,1198,682,1236,676,1266,674,1295,675,1324,678,1351,678,1385,678,1423,665,1484,655,1520,651,1553,645,1580,649,1609,651,1633,646,1657,647,1686,655,1713,666,1733,659,1750,647,1759,618,1756,589,1755,576,1753,577,1718,582,1689,581,1654,589,1625,594,1607,584,1550,577,1496,579,1441,575,1359,569,1285,567,1243,559,1205,560,1138,555,1072,554,1062,524,1060,521,1071,519,1106,518,1149,516,1187,516,1210,509,1262,503,1300,500,1338,499,1380,496,1439,499,1491,496,1535,487,1579,481,1615,489,1632,494,1649,494,1677,498,1708,500,1728,508,1747,500,1759,471,1756,446,1756,430,1759,414,1753,419,1714,430,1686,430,1649,429,1556,418,1504,402,1415,400,1265,398,1183" />\n                            <area dataid="shoubu" alt="" title="" href="#手部" shape="poly" coords="383,659,368,675,357,696,337,729,319,762,304,801,293,827,273,869,250,908,221,951,199,976,202,1018,198,1049,198,1087,190,1099,182,1059,179,1052,170,1075,164,1106,151,1121,149,1089,159,1053,146,1076,135,1105,115,1130,113,1109,127,1067,132,1046,116,1058,101,1082,83,1099,91,1069,112,1032,120,1012,113,1002,96,1011,78,1013,74,1006,93,991,122,973,146,961,161,943,171,915,183,863,209,814,227,777,258,698,283,632,303,593,316,575,319,552,330,526,366,468,377,459,365,480,357,503,347,532,364,572,373,593" />\n                            <area dataid="shoubu" alt="" title="" href="#手部" shape="poly" coords="704,447,700,464,699,484,702,516,715,549,716,562,713,574,710,588,707,603,703,620,699,636,698,648,721,676,737,712,763,754,783,803,796,819,815,864,842,908,869,950,883,967,879,995,886,1030,885,1065,889,1094,896,1087,900,1056,904,1046,909,1065,916,1089,924,1112,936,1107,926,1062,925,1048,931,1060,941,1081,958,1122,968,1124,972,1113,958,1075,948,1038,954,1036,993,1093,1001,1088,999,1075,980,1047,983,1050,965,1002,971,997,983,1003,998,1013,1014,1004,985,983,940,958,915,922,887,833,849,741,793,604,740,491" />\n                        </map>\n\t\t\t\t\t</div>';
            break;
        case "female_face.jpg":
            i +=
                '<div class="person-model">\n\t\t\t\t\t\t<img src="images/female_back.jpg" alt="" width="1080" height="1920" usemap="#Map"/>\n\t\t\t\t\t\t<map name="Map" id="Map">\n                            <area dataid="toubu" alt="" title="" href="#头部" shape="poly" coords="489,446,528,450,558,450,586,464,598,468,615,456,623,463,638,439,664,380,670,337,677,350,687,332,640,208,593,191,552,189,543,165,506,143,513,168,525,183,515,194,498,196,484,175,445,168,421,179,407,191,391,209,382,202,374,201,377,221,386,235,376,231,366,219,363,235,385,264,401,274,403,290,398,327,404,364,418,400,439,435,467,460,482,464,520,459" />\n                            <area dataid="yanjingbu" alt="" title="" href="#咽颈部" shape="poly" coords="492,467,511,466,525,461,533,457,548,457,561,459,580,471,590,474,590,486,602,496,616,499,602,506,532,507,510,507,486,502,466,501" />\n                            <area dataid="yaobeibu" alt="" title="" href="#腰背部" shape="poly" coords="453,503,425,599,433,614,441,635,442,662,445,709,455,761,436,833,414,883,480,878,599,874,670,881,644,807,638,710,644,656,641,616,656,582,650,522,644,505,626,498,612,503,592,509,530,512" />\n                            <area dataid="tunbugangmen" alt="" title="" href="#臀部及肛门" shape="poly" coords="410,896,403,924,401,954,398,986,396,1001,412,1010,455,1009,484,1004,516,999,542,998,550,993,569,995,585,1004,595,1011,658,1016,677,1015,685,1007,693,962,683,910,676,887,636,884,573,881,484,885,436,887" />\n                            <area dataid="tuibu" alt="" title="" href="#腿部" shape="poly" coords="415,1098,404,1014,451,1014,503,1006,536,1005,559,1004,596,1019,632,1019,673,1025,682,1022,680,1061,676,1224,686,1330,695,1388,685,1464,683,1568,686,1772,656,1777,622,1769,621,1695,623,1633,617,1531,604,1465,604,1361,602,1270,573,1191,549,1012,535,1009,530,1084,515,1203,497,1261,483,1301,483,1362,490,1431,480,1511,468,1602,469,1658,476,1685,467,1727,470,1772,436,1781,408,1781,396,1404" />\n                            <area dataid="shoubu" alt="" title="" href="#手部" shape="poly" coords="446,504,438,530,431,566,422,586,420,610,430,633,435,660,434,682,387,744,301,868,260,925,251,988,218,1048,208,1036,182,1064,179,1049,158,1062,166,1032,148,1040,169,973,132,953,186,930,215,909,266,806,373,623,404,523" />\n                            <area dataid="shoubu" alt="" title="" href="#手部" shape="poly" coords="654,505,661,541,662,564,659,601,653,603,648,633,646,666,667,706,730,780,757,830,787,869,820,915,836,1000,865,1047,877,1042,904,1062,910,1059,919,1059,921,1031,939,1036,914,966,953,955,898,933,869,912,759,710,715,634,693,572,676,522" />\n                        </map>\n\t\t\t\t\t</div>';
            break;
        case "female_back.jpg":
            i +=
                '<div class="person-model">\n\t\t\t\t\t\t    <img src="images/female_face.jpg" alt="" width="1080" height="1920" usemap="#Map"/>\n\t\t\t\t\t\t    <map name="Map" id="Map">\n                             <area dataid="toubu" alt="" title="" href="#头部" shape="poly" coords="436,246,419,248,412,242,403,233,386,217,377,194,397,206,397,194,394,175,411,186,415,172,424,162,439,153,456,146,470,143,489,153,498,170,503,192,506,199,517,198,528,197,522,179,510,148,514,141,543,156,557,191,576,190,625,204,666,246,676,264,686,301,688,334,681,358,668,383,653,413,641,432,626,451,600,445,580,450,570,456,552,463,532,470,514,463,496,452,479,438,469,444,452,444,428,399,419,381,409,346,413,281" />\n                             <area dataid="yanjingbu" alt="" title="" href="#咽颈部" shape="poly" coords="462,498,485,493,495,487,501,479,505,466,510,467,524,472,538,472,549,471,561,467,571,463,576,459,580,459,582,471,584,482,587,487,596,490,607,496,622,501,629,504" />\n                             <area dataid="xiongbu" alt="" title="" href="#胸部" shape="poly" coords="443,500,442,511,434,609,429,642,428,676,449,694,498,698,538,689,593,701,641,692,659,660,651,605,641,557,641,504,623,510" />\n                             <area dataid="fubu" alt="" title="" href="#腹部" shape="poly" coords="450,794,461,732,455,700,481,701,510,701,536,694,591,706,633,700,623,739,633,793,668,868,639,878,595,888,545,891,504,887,470,882,439,875,418,867" />\n                             <area dataid="shengzhibuwei" alt="" title="" href="#生殖部位" shape="poly" coords="406,895,412,869,423,876,445,881,465,886,497,889,518,892,556,895,597,894,621,889,643,881,663,877,671,873,677,890,678,899,623,924,560,968,518,965" />\n                             <area dataid="tuibu" alt="" title="" href="#腿部" shape="poly" coords="398,1017,397,961,408,898,528,975,555,972,565,971,677,906,686,968,684,1038,670,1170,660,1243,669,1304,663,1435,658,1507,639,1584,634,1628,638,1656,636,1679,658,1725,671,1742,653,1756,625,1757,597,1756,578,1749,584,1719,578,1669,576,1630,576,1537,581,1347,585,1288,550,982,530,983,522,1117,499,1290,496,1313,499,1345,505,1637,507,1660,501,1680,501,1725,507,1746,494,1755,470,1753,453,1753,437,1756,424,1749,419,1737,437,1712,447,1671,449,1623,442,1597,427,1510,414,1354,417,1278,416,1186" />\n                             <area dataid="shoubu" alt="" title="" href="#手部" shape="poly" coords="435,504,434,522,431,553,431,590,426,621,423,645,422,670,421,689,402,718,361,767,340,800,329,820,320,844,259,916,246,958,241,993,233,1018,221,1040,212,1052,206,1044,212,1019,212,1010,206,1023,194,1040,190,1052,175,1062,173,1051,188,1019,181,1030,170,1053,166,1060,156,1055,164,1025,164,1017,153,1036,148,1041,142,1037,144,1016,158,992,163,972,152,968,132,962,129,953,153,952,177,940,187,927,202,915,210,902,375,613,410,521" />\n                             <area dataid="shoubu" alt="" title="" href="#手部" shape="poly" coords="647,506,646,523,645,558,653,596,660,634,662,674,662,687,680,709,718,761,747,806,766,847,800,888,829,923,835,960,837,998,853,1024,864,1046,877,1051,866,1009,888,1050,905,1069,906,1056,890,1011,907,1048,918,1063,927,1058,909,1004,928,1035,938,1038,929,1002,916,970,946,970,952,958,931,952,899,936,874,920,857,864,705,611,696,551,666,508" />\n                         </map>\n\t\t\t\t\t    </div>';
            break;
        case "child_male_face.jpg":
            i +=
                '<div class="person-model">\n\t\t\t\t\t\t    <img src="images/child_male_back.jpg" alt="" width="1080" height="1920" usemap="#Map"/>\n\t\t\t\t\t\t    <map name="Map" id="Map">\n                            <area dataid="toubu" alt="" title="" href="#头部" shape="poly" coords="501,508,459,458,433,445,419,431,427,399,434,399,429,375,444,280,464,257,512,237,563,230,606,241,624,255,643,239,646,275,658,300,665,334,664,375,653,404,670,403,669,427,660,445,632,464,591,512" />\n                            <area dataid="yanjingbu" alt="" title="" href="#咽颈部" shape="poly" coords="501,513,525,514,562,514,588,516,585,526,589,543,605,556,634,571,578,575,465,569,457,569,495,540" />\n                            <area dataid="yaobeibu" alt="" title="" href="#腰背部" shape="poly" coords="452,668,451,645,454,601,460,572,473,576,512,579,585,580,630,576,632,592,636,643,640,676,651,700,651,709,647,800,642,846,664,917,584,900,528,900,462,909,415,921,436,841,437,773,437,708" />\n                            <area dataid="tunbugangmen" alt="" title="" href="#臀部及肛门" shape="poly" coords="414,930,447,919,480,912,508,910,542,907,572,906,594,908,621,913,647,913,657,919,667,922,675,934,679,951,670,963,647,987,628,1007,599,1018,574,1027,549,1027,522,1027,495,1029,463,1023,438,1012,419,998,403,981" />\n                            <area dataid="tuibu" alt="" title="" href="#腿部" shape="poly" coords="415,1138,407,1084,403,1032,402,996,402,988,413,1002,431,1016,455,1025,486,1032,512,1035,530,1033,545,1032,564,1030,583,1031,609,1024,633,1011,652,998,671,980,679,966,683,994,683,1042,670,1104,657,1195,654,1238,662,1320,663,1393,647,1488,639,1540,637,1585,647,1609,642,1627,640,1645,642,1676,631,1688,599,1688,570,1684,551,1674,553,1633,556,1605,572,1559,572,1502,559,1443,555,1388,560,1345,567,1302,558,1271,552,1222,548,1038,532,1039,533,1250,517,1302,520,1338,528,1388,525,1444,509,1514,515,1580,526,1607,530,1646,536,1671,515,1687,485,1692,442,1679,442,1625,443,1565,428,1452,429,1237,425,1354,425,1421" />\n                            <area dataid="shoubu" alt="" title="" href="#手部" shape="poly" coords="451,568,447,671,426,713,401,794,362,875,302,1010,277,1055,257,1099,250,1088,238,1098,220,1107,204,1105,200,1094,210,1064,191,1080,211,1018,185,1005,209,992,229,977,256,963,287,892,310,816,340,755,359,699,389,597,417,571" />\n                            <area dataid="shoubu" alt="" title="" href="#手部" shape="poly" coords="641,570,677,576,703,614,723,707,749,761,776,833,788,874,820,961,847,977,896,1001,890,1018,868,1015,876,1041,895,1076,892,1083,863,1054,874,1080,885,1100,874,1106,863,1095,859,1108,838,1094,824,1094,800,1055,782,1011,758,941,722,877,680,783,659,720,649,674,639,618" />\n                          </map>\n\t\t\t\t\t    </div>';
            break;
        case "child_male_back.jpg":
            i +=
                '<div class="person-model">\n\t\t\t\t\t\t    <img src="images/child_male_face.jpg" alt="" width="1080" height="1920" usemap="#Map"/>\n\t\t\t\t\t\t    <map name="Map" id="Map">\n                                <area dataid="toubu" alt="" title="" href="#头部" shape="poly" coords="492,505,464,473,457,462,433,451,422,432,426,404,430,397,424,364,430,332,440,296,445,276,439,244,461,258,485,245,511,234,577,230,598,235,626,255,650,284,665,322,668,360,659,393,669,410,667,435,647,457,625,472,607,500,585,511,544,527" />\n                                <area dataid="yanjingbu" alt="" title="" href="#咽颈部" shape="poly" coords="452,570,480,557,499,536,501,516,521,525,535,532,554,530,569,524,581,520,584,530,599,546,621,559,636,570" />\n                                <area dataid="xiongbu" alt="" title="" href="#胸部" shape="poly" coords="434,712,428,669,417,628,415,597,418,578,436,574,455,581,493,578,536,578,590,576,631,576,653,576,669,577,665,597,661,619,657,633,650,667,646,697,638,715,627,724,472,722" />\n                                <area dataid="fubu" alt="" title="" href="#腹部" shape="poly" coords="420,925,437,855,437,791,434,727,437,720,476,727,535,728,599,733,634,730,647,719,647,741,642,795,646,856,663,913,665,919,596,901,496,901" />\n                                <area dataid="shengzhibuwei" alt="" title="" href="#生殖部位" shape="poly" coords="411,930,436,926,464,919,491,912,523,907,554,906,587,906,610,914,627,912,644,922,663,923,673,930,682,945,682,964,668,970,621,977,584,998,558,1021,535,1027,517,1017,476,998,426,976,406,972" />\n                                <area dataid="tuibu" alt="" title="" href="#腿部" shape="poly" coords="406,1094,404,1038,403,995,402,975,423,978,442,989,472,999,493,1014,524,1031,544,1033,560,1028,578,1015,601,996,630,985,651,978,677,973,680,996,681,1041,667,1113,660,1199,649,1254,660,1305,665,1385,655,1465,639,1527,639,1583,665,1630,703,1658,699,1685,667,1699,621,1696,587,1654,558,1627,566,1572,572,1505,556,1445,556,1366,567,1297,550,1238,546,1153,548,1073,550,1040,532,1037,529,1070,534,1233,517,1309,524,1353,529,1418,514,1489,512,1544,526,1600,530,1623,514,1653,490,1659,484,1668,453,1697,412,1700,387,1689,378,1659,411,1635,444,1591,443,1530,424,1442,418,1379,426,1282,427,1215" />\n                                <area dataid="shoubu" alt="" title="" href="#手部" shape="poly" coords="413,578,413,592,411,635,420,669,428,711,424,724,401,781,366,872,333,935,299,1012,278,1053,257,1098,250,1090,224,1103,220,1098,202,1101,212,1069,189,1079,207,1020,184,1011,220,992,246,969,271,923,299,857,362,693,369,641,395,588" />\n                                <area dataid="shoubu" alt="" title="" href="#手部" shape="poly" coords="686,582,718,681,738,740,762,795,787,867,810,924,838,974,878,998,900,1004,893,1016,867,1017,881,1050,895,1083,874,1070,862,1051,869,1064,882,1094,868,1106,856,1106,832,1088,828,1101,799,1053,776,1017,766,968,713,860,661,724,653,712,650,705,676,579" />\n                            </map>\n\t\t\t\t\t    </div>';
            break;
        case "child_female_face.jpg":
            i +=
                '<div class="person-model">\n\t\t\t\t\t\t    <img src="images/child_female_back.jpg" alt="" width="1080" height="1920" usemap="#Map"/>\n\t\t\t\t\t\t   <map name="Map" id="Map">\n                                <area dataid="toubu" alt="" title="" href="#头部" shape="poly" coords="425,587,404,598,384,612,375,594,375,559,378,515,377,494,363,460,362,427,363,350,372,315,394,299,412,298,428,279,464,251,519,232,554,225,591,237,619,255,650,274,669,300,688,305,708,326,707,414,707,462,705,523,711,586,716,637,712,660,693,612,678,582,665,557,664,536,674,500,677,476,670,453,650,469,642,488,630,507,572,529,553,528,511,525,496,525,475,520,460,509,447,485,440,464,425,450,419,444,411,469" />\n                                <area dataid="yanjingbu" alt="" title="" href="#咽颈部" shape="poly" coords="504,531,519,530,537,530,552,533,573,533,580,536,579,554,578,565,593,578,605,584,573,586,489,586,476,586,504,563" />\n                                <area dataid="yaobeibu" alt="" title="" href="#腰背部" shape="poly" coords="443,600,440,619,435,647,441,666,445,697,446,757,453,807,437,859,417,917,428,942,456,945,501,954,620,951,649,942,670,930,661,889,633,785,632,747,637,662,646,642,654,610,639,592,620,588,461,594,452,594,449,594" />\n                                <area dataid="tunbugangmen" alt="" title="" href="#臀部及肛门" shape="poly" coords="416,938,435,946,470,957,491,959,617,958,651,950,668,939,673,958,678,989,676,1014,668,1053,662,1085,610,1093,567,1092,556,1055,540,1040,529,1052,522,1063,518,1080,500,1096,461,1094,417,1083,410,978,413,941" />\n                                <area dataid="tuibu" alt="" title="" href="#腿部" shape="poly" coords="420,1237,417,1088,444,1095,476,1102,509,1098,576,1099,628,1096,667,1092,667,1184,658,1244,653,1293,655,1355,636,1504,620,1555,625,1576,621,1644,577,1648,556,1638,566,1573,566,1534,575,1292,572,1107,510,1102,510,1297,519,1556,523,1565,518,1583,529,1638,504,1652,478,1653,462,1638,460,1578,458,1547,441,1466,430,1317,428,1269" />\n                                <area dataid="shoubu" alt="" title="" href="#手部" shape="poly" coords="353,809,375,746,402,652,414,614,440,599,437,620,428,651,435,669,440,697,440,722,442,755,311,987,312,998,322,999,310,1038,305,1043,271,1044,258,1050,235,1040,241,991,255,973,296,890" />\n                                <area dataid="shoubu" alt="" title="" href="#手部" shape="poly" coords="637,749,669,808,775,987,771,993,764,994,764,1009,774,1037,813,1039,826,1047,847,1038,843,989,826,974,792,899,748,827,718,755,702,718,684,665,671,615,661,608,649,648,640,699" />\n                            </map>\n\t\t\t\t\t    </div>';
            break;
        case "child_female_back.jpg":
            i +=
                '<div class="person-model">\n\t\t\t\t\t\t  <img src="images/child_female_face.jpg" alt="" width="1080" height="1920" usemap="#Map"/>\n\t\t\t\t\t\t  <map name="Map" id="Map">\n                            <area dataid="toubu" alt="" title="" href="#头部" shape="poly" coords="615,515,547,540,492,526,461,509,445,474,421,439,414,496,420,556,380,622,378,534,381,494,367,440,372,325,388,300,410,304,439,263,485,238,541,222,578,233,623,252,654,281,668,301,688,302,706,324,711,359,704,408,702,455,704,504,707,582,707,596,707,606,712,619,661,564,666,512,677,484,664,444,638,475" />\n                            <area dataid="yanjingbu" alt="" title="" href="#咽颈部" shape="poly" coords="505,533,505,549,505,564,476,583,460,588,444,591,491,593,533,593,574,592,609,590,636,590,589,565,579,545,576,535,557,540,534,543" />\n                            <area dataid="xiongbu" alt="" title="" href="#胸部" shape="poly" coords="414,618,436,650,442,671,450,758,469,764,533,770,584,773,627,759,634,744,642,659,649,645,664,614,649,599,626,596,543,597,484,599,442,599,429,603" />\n                            <area dataid="fubu" alt="" title="" href="#腹部" shape="poly" coords="436,852,451,802,451,765,462,767,485,771,514,774,538,777,571,777,595,778,612,771,626,765,633,762,634,784,640,829,646,854,662,889,670,929,618,946,549,952,490,952,447,941,418,931,416,919" />\n                            <area dataid="shengzhibuwei" alt="" title="" href="#生殖部位" shape="poly" coords="412,933,435,941,466,951,488,955,574,959,614,953,667,937,672,936,673,997,671,1037,668,1064,668,1079,622,1087,571,1087,552,1052,542,1037,531,1048,522,1059,513,1085,502,1093,463,1087,416,1078" />\n                            <area dataid="tuibu" alt="" title="" href="#腿部" shape="poly" coords="469,1573,449,1494,438,1418,432,1334,435,1275,424,1223,416,1141,415,1084,441,1091,490,1099,512,1097,575,1095,612,1094,667,1086,666,1133,663,1221,655,1273,649,1336,648,1409,618,1564,616,1608,633,1662,613,1692,580,1691,557,1638,554,1584,562,1539,564,1472,570,1367,567,1279,569,1187,570,1097,510,1099,514,1291,521,1546,528,1599,527,1635,515,1668,508,1692,472,1695,458,1680,452,1660" />\n                            <area dataid="shoubu" alt="" title="" href="#手部" shape="poly" coords="409,622,424,642,437,671,441,709,445,748,425,790,395,835,357,908,312,987,319,995,311,1020,301,1039,269,1040,255,1048,236,1038,239,990,253,975,307,857,346,805" />\n                            <area dataid="shoubu" alt="" title="" href="#手部" shape="poly" coords="672,614,687,666,701,721,721,764,742,815,784,876,810,929,828,976,843,988,846,1018,844,1033,820,1044,810,1038,780,1035,761,993,772,987,752,949,638,747,644,675,653,648" />\n                         </map>\n\t\t\t\t\t    </div>';
    }
    $("#page-self-service .container").html(i), initPeoplePic();
});
$("#page-departments .departments_list a").live("click", function () {
    mSetItem("paramID", $(this).attr("data-id"));
});
$("#page-expert .departments_list a").live("click", function () {
    mSetItem("paramID", $(this).attr("data-id"));
});
$("#page-expert-list .expert_list a").live("click", function () {
    mSetItem("paramID", $(this).attr("data-id"));
});

var initStatus = !1,
    cache_start_point = "cache-start-point",
    cache_end_point = "cache-end-point",
    cacheType = cache_start_point,
    isStartInput = !0,
    isNavSuccess = !0,
    isNowNavigating = !1,
    defaultStart = "default-start-point",
    compass = $(".compass").get(0),
    oBeancons = null,
    animates = {
        type0: "0",
        type1: "1",
        type2: "2",
        type3: "3",
        type4: "4",
        type5: "5",
        type6: "6",
        type7: "7"
    },
    current_floor = null;

/// 文字转换语音
function l(e) {
    var t,
        a,
        i = "";
    /**图标控制（toast和弹出框的） */
    if (e[e.length - 1].indexOf("转") != -1) {
        switch (e[e.length - 1]) {
            case "左转":
                $("#Info-Img").attr("src", "images/tl.png");
                $("#msgBox img").attr("src", "images/tl.png");
                break;
            case "即将左转":
                $("#Info-Img").attr("src", "images/tl.png");
                $("#msgBox img").attr("src", "images/tl.png");
                break;
            case "右转":
                $("#Info-Img").attr("src", "images/tr.png");
                $("#msgBox img").attr("src", "images/tr.png");
                break;
            case "即将右转":
                $("#Info-Img").attr("src", "images/tr.png");
                $("#msgBox img").attr("src", "images/tr.png");
                break;
            default:
                $("#Info-Img").attr("src", "images/ts.png");
                $("#msgBox img").attr("src", "images/ts.png");
                break;
        }!lockFlag && showMsg(e[e.length - 1], 2000);
        LockIcon = true;
    } else if (e[e.length - 2] == "进入" || e[e.length - 1] == "抵达终点") {
        $("#Info-Img").attr("src", "images/ex.png");
        !lockFlag && showMsg(e[e.length - 2], 2000);
        LockIcon = true;
    }
    for (var s in e)
        null == mGetItem("v" + e[s]) &&
            (null == e[s] && (e[s] = "位置点"), (i += e[s] + ","));
    (i = i.substr(0, i.length - 1)),
        (a = e),
        "" === (t = i) ?
            r(a) : $.ajax({
                type: "get",
                async: !0,
                url: SVE_H5_URL + "api/info/getbdvoiceH5.php?keyname=" + t,
                success: function (e) {
                    if (e) {
                        var t = JSON.parse(e).response;
                        for (var i in t)
                            mSetItem(
                                "v" + t[i].key_name,
                                "data:audio/mp3;base64," + t[i].mp3_url
                            );
                        r(a);
                    } else console.info("请求数据出错.");
                },
                error: function (e) {
                    console.log("get voice error: " + e);
                }
            });
}

function r(e) {
    var t = 0;
    e.length > 0 &&
        ((audio.currentTime = 0),
            audio.pause(),
            (audio.src = mGetItem("v" + e[t])),
            console.info("开始播放."),
            ++t,
            Engine.g_pInstance.m_pProject.VoiceStart(),
            setTimeout(function () {
                audio.play();
            }, 0)),
        (audio.onended = function () {
            t < e.length ?
                ((audio.currentTime = 0),
                    audio.pause(),
                    (audio.src = mGetItem("v" + e[t])),
                    ++t,
                    setTimeout(function () {
                        audio.play();
                    }, 0)) :
                Engine.g_pInstance.m_pProject.VoiceEnd();
        });
}

$(function () {
    function c(e) {
        console.info("播放动画：" + e),
            (function (e, t) {
                t = isNaN(t) ? 2e3 : t;
                var a = document.createElement("img");
                (a.src = "images/animate/" + e + ".gif"),
                    (a.style.cssText =
                        "position:absolute;padding:5px; top:150px; left:0px; right:0px;margin:auto; z-index:999999;background-image:linear-gradient(45deg, #eee 25%, transparent 25%, transparent 75%, #eee 75%, #eee 100%),linear-gradient(45deg, #eee 25%, white 25%, white 75%, #eee 75%, #eee 100%);"),
                    document.body.appendChild(a),
                    setTimeout(function () {
                        (a.style.webkitTransition =
                            "-webkit-transform 0.5s ease-in, opacity 0.5s ease-in"),
                            (a.style.opacity = "0"),
                            setTimeout(function () {
                                document.body.removeChild(a);
                            }, 500);
                    }, t);
            })(e, 3e3);
    }
    /** 山西体育馆特有*/
    $("#select-add").click(function () {
        MiaokitDC.DC.m_nCurWork != 0 ? SwitchScene(null) : SwitchScene("体育场");
    });

    var e,
        t,
        a,
        i = $(window).width(),
        s = $(window).height();

    function n() {
        isNavSuccess = !1;
    }

    (e = function () {
        wx.ready(function () {
            var e;
            (e = location.protocol + "://" + window.location.host),
                wx.onMenuShareAppMessage({
                    title: "龙岩人民医院",
                    desc: "龙岩人民医院，是集医疗、预防、教学、科研、康复、保健于一体的大型综合性医院",
                    link: e + "/h5/index.html",
                    imgUrl: e + "/favicon.ico",
                    success: function () { },
                    cancel: function () { }
                }),
                wx.onMenuShareTimeline({
                    title: "龙岩人民医院",
                    link: e + "/h5/index.html",
                    imgUrl: e + "/favicon.ico",
                    success: function () { },
                    cancel: function () { }
                }),
                wx.onMenuShareQQ({
                    title: "龙岩人民医院",
                    desc: "龙岩人民医院，是集医疗、预防、教学、科研、康复、保健于一体的大型综合性医院",
                    link: e + "/h5/index.html",
                    imgUrl: e + "/favicon.ico",
                    success: function () { },
                    cancel: function () { }
                });
        }),
            wx.error(function (e) {
                alert(e.errMsg);
            });
        var e = JSON.parse(mGetItem(defaultStart));
        e && setStartPoint(e.id, e.name, "defaultStart");
    }),
        (function (e) {
            var t = new Date().valueOf();
            if (
                "null" != JSON.stringify(mGetItem("room-list")) &&
                parseInt(mGetItem("room-list-time")) > t - http_cache_time
            ) {
                var a = JSON.parse(mGetItem("room-list")).response;
                e(a), console.info("读取房间列表缓存");
            } else {
                $.ajax({
                    type: "get",
                    url: SVE_H5_URL + "/api/info/getroomlistH5.php",
                    async: !0,
                    success: function (t) {
                        t
                            ?
                            (e(JSON.parse(t).response),
                                mSetItem("room-list", t),
                                mSetItem("room-list-time", new Date().valueOf())) :
                            console.info("请求数据出错.");
                    },
                    error: function (e) {
                        console.warn("get room list error: " + e);
                    }
                }),
                    console.info("请求房间列表数据");
            }
        })(function (t) {
            GLOBAL.Action.pMajorProgress = g;
            GLOBAL.Action.pMinorProgress = v;
            GLOBAL.Action.pLayerListFlush = u;
            GLOBAL.Action.pPathDataFeedback = m;
            GLOBAL.Action.pOutsideSwich = w;
            GLOBAL.Action.pViewSwich = S;
            GLOBAL.Action.pLayerActive = p;
            GLOBAL.Action.pPathNotFound = n;
            GLOBAL.Action.pCompassUpdate = I;
            GLOBAL.Action.pCursorInfo = C;
            GLOBAL.Action.pChickTouchMove = N;
            GLOBAL.Action.pHintFeedback = l;
            GLOBAL.Action.pGetAnimateType = c;
            GLOBAL.Action.pLayerShow = h;
            GLOBAL.Action.pProjectEnd = function () {
                Engine.g_pInstance.m_pCameraCtrl.LineWidth = function () {
                    return 50;
                };
                initParam();
                //InitCustomModel(g_pConfig3d.m_pCustomModelInfo, function () {});
            }
            // GLOBAL.Action.pOnClick = function pOnClick(pPoint) {
            //     console.log(pPoint)
            // }
            Init3D(function (t) {
                null === t && (Start(), e(), (initStatus = !0));
            });
        }),
        (t = "voice"),
        (a = document.getElementById(t))["play"]();
    document.addEventListener(
        "WeixinJSBridgeReady",
        function () {
            a.play();
        },
        !1
    );
    var d = 0;

    function p(e) {
        (d = f), $(".floor_box ul").scrollTop(d * (e - 1));
    }

    function u(e, t) {

        /**--end-- */
        let o: any = "";
        if (GLOBAL.pCurBuilding) {
            for (var n in GLOBAL.pCurBuilding.layerList)
                o += "<li house-id='" + t + "' layer-id='" + n + "'>" + GLOBAL.pCurBuilding.layerList[n].floor_name + "</li>";
        }

        $(".floor_box ul").html(o),
            (a = 0),
            (i = 0),
            (s = 0),
            $(".floor_box ul li").unbind("click").bind("click", function (e: JQueryEventObject, t = undefined): any {
                o = $(".floor_box ul li").index($(this));
                var floor = $(this).text(),
                    n = $(this).attr("house-id");
                if (1) {
                    if (
                        ($(this).addClass("current-active-floor"),
                            $(this).siblings().removeClass("current-active-floor"),
                            $(this).removeClass("top middle bottom ctop cmiddle cbottom").siblings().removeClass("top middle bottom ctop cmiddle cbottom"),
                            $(".floor_box ul").children("li").each(function (e) {
                                $(this).hasClass("current-active-floor") && (s = e);
                            }),
                            $(".floor_box ul").children("li").each(function (e) {
                                Math.abs($(this).position().top) < (2 * f) / 3 &&
                                    ($(this).addClass("top"),
                                        (i = (a = e) + 3),
                                        $(".floor_box ul li").eq(i).addClass("bottom").siblings().removeClass("bottom"),
                                        $(".floor_box ul li").eq(a + 1).siblings().removeClass("middle"),
                                        $(".floor_box ul li").eq(a + 1).addClass("middle"),
                                        $(".floor_box ul li").eq(a + 2).addClass("middle"),
                                        s == a ? $(".floor_box ul li").eq(s).removeClass("top cmiddle cbottom").addClass("ctop").siblings().removeClass("ctop") :
                                            s == i ? $(".floor_box ul li").eq(s).removeClass("bottom ctop cmiddle").addClass("cbottom").siblings().removeClass("cbottom") :
                                                s < i && s > a && $(".floor_box ul li").eq(s).removeClass("middle ctop cbottom").addClass("cmiddle").siblings().removeClass("cmiddle"));
                            }),
                            void 0 == t)
                    ) {

                        var l = !1;
                        if (NNavigation.g_pActiveList.length > 0) {
                            $(".history-rollback-wrapper ul li").each(function (e) {
                                if ($(this).attr("layer-id") == o && $(this).attr("house-id") == n) {
                                    $(".history-rollback-wrapper ul li").eq(e).trigger("click");
                                    var t = $(".history-rollback-wrapper ul li").eq(0).width();
                                    $(".history-rollback-wrapper ul").scrollLeft($(this).index() * t),
                                        (l = !0);
                                }
                            });
                        }
                        l || ($(".history-rollback-wrapper ul li").eq(0).removeClass("item-active").siblings().removeClass("item-active"),
                            $(".history-rollback-wrapper ul").scrollLeft(0)),
                            //Engine.g_pInstance.m_pProject.ActiveFloor(o),
                            SwitchLayer(floor),
                            console.info("floor_box needActive layer");
                    } else "noNeedActive" == t.type && console.info("floor_box noNeedActive layer");
                } else {
                    return 0;
                }

                return 0;
            });
        (f = $(".floor_box ul li:first").outerHeight(!0));
    }


    function h(e, i) {

        current_floor = e;
        if (e.PId == "山西体育中心") {
            $("#select-add").text("进入室内");
            GLOBAL.pCurBuilding = null;
        } else {
            $("#select-add").text("返回室外");
            for (let pWork of GLOBAL.pWorkList) {
                if (pWork.building_name === e.PId) {
                    GLOBAL.pCurBuilding = pWork;
                    break;
                }
            }
        }

        var t = getByteLen(e.PId) / 2 + 1;
        $(".current-address .current-point").css("width", t + "em"),
            $(".current-address .current-point").text(e.PId),
            $(".floor_box ul li")
                .eq(current_floor.LayerId)
                .trigger("click", {
                    type: "noNeedActive"
                }),
            //$(".history-rollback-wrapper ul li").eq(NNavigation.g_nActiveLayerPath).trigger("click");
            $(".history-rollback-wrapper ul li").each(function () {
                if (i) {
                    let rollbackflag = true;
                    current_floor.LayerId == $(this).attr("layer-id") &&
                        current_floor.HousId == $(this).attr("house-id") && (i == $(this).index()) &&
                        ($(this).trigger("click", {
                            type: "noNeedActive"
                        }), rollbackflag = false);
                    if (!rollbackflag) {
                        return false;
                    }
                } else {
                    let rollbackflag = true;
                    current_floor.LayerId == $(this).attr("layer-id") &&
                        current_floor.HousId == $(this).attr("house-id") && (!NNavigation.ng_nActiveLayerPath || NNavigation.ng_nActiveLayerPath == $(this).index()) &&
                        ($(this).trigger("click", {
                            type: "noNeedActive"
                        }), rollbackflag = false);
                    if (!rollbackflag) {
                        if (!NNavigation.ng_nActiveLayerPath && NNavigation.g_pActiveList[0] && NNavigation.g_pActiveList[0].m_nCurPath == $(this).index()) {
                            return false;
                        } else if (NNavigation.ng_nActiveLayerPath) {
                            return false;
                        }
                    }
                }
            });
        let curPath;
        if (NNavigation.g_pActiveList.length > 0) {
            curPath = NNavigation.g_pActiveList[0].m_nCurPath;
            if (Posfault) {
                let lastPoint = NNavigation.g_pActiveList[0].m_aPath[curPath].m_pEndPoint.m_mPosition;
                endX = lastPoint.x;
                endY = lastPoint.y;
                if (Posfault && lockFlag && !NNavigation.TipMessage) {
                    NNavigation.TipMessage = function (message) {
                        ToastShow(message);
                    };
                    removeC();
                }
            }
            let cachePOS = new Vector3(NNavigation.g_pActiveList[0].m_aPath[curPath].m_aPath[0].x, 0, -NNavigation.g_pActiveList[0].m_aPath[curPath].m_aPath[0].z);
            if (!lockFlag) {
                if (MiaokitDC.DC.m_nCurWork == 0) {
                    setTimeout(() => {
                        SetCamera(cachePOS, undefined, undefined, 400);
                    }, 0);
                } else {
                    setTimeout(() => {
                        SetCamera(cachePOS, undefined, undefined, 200);
                    }, 0);
                }
            } else {
                if (MiaokitDC.DC.m_nCurWork == 0) {
                    setTimeout(() => {
                        SetCamera(cachePOS, undefined, undefined, 400);
                    }, 0);
                } else {
                    setTimeout(() => {
                        SetCamera(cachePOS, undefined, undefined, 200);
                    }, 0);
                }
            }
        }
    }

    function getbuildname() {
        var e = "";
        for (var t in MiaokitDC.DC.m_aWork)
            0 == MiaokitDC.DC.m_aWork[t].m_nIndex &&
                (e +=
                    "<li class='exterior active'>" +
                    MiaokitDC.DC.m_aWork[0].m_pID +
                    " （室外）</li>");
        for (var t in MiaokitDC.DC.m_aWork)
            0 != MiaokitDC.DC.m_aWork[t].m_nIndex &&
                (e +=
                    "<li class='work' data-id='" +
                    MiaokitDC.DC.m_aWork[t].m_pID +
                    "'>" +
                    MiaokitDC.DC.m_aWork[t].m_pID +
                    "</li>");
        $("#left-slide ul").html(e);
        $("#left-slide").animate({
            top: "0px"
        });
        $("#left-slide .exterior").click(function () {
            $("#select-add").text("进入室内");
        });
    }

    function m(e) {
        var t = "";
        for (var a in e) {
            if (e[a].HousId == 0) {
                e[a].LayerName = "室外";
                e[a].PId = '';
            } else if (!e[a].LayerName) {
                e[a].LayerName = e[a].LayerId + 1 + "F";
            }
            t += "<li layer-id='" + e[a].LayerId + "' house-id='" + e[a].HousId + "' p-id='" + e[a].PId + "'><span class='floor-item'> " + e[a].PId + e[a].LayerName + "</span>",
                t += "</li>";
        }
        $(".history-rollback-wrapper ul").html(t),
            $(".history-rollback-wrapper").css("display", "flex");
        iconup($(".search_direction_box").height());
    }
    var f = 0;

    function g(e, t) {
        if (!e) {
            //FilterPOI(true, new Vector3(0, 0, 0), 100, [0, 3, 9]);
            //timeout然后开始导航
            setTimeout(getbuildname, 200);
            /**新加载方式 重新制定链接导航方案 */
            setTimeout(DefaultNav, 200);
            // SwitchScene("山西体育中心");
            let code = GetQueryString("code");
            if (code) {
                getCode(code);
            }
            pageStatus = true;
            MiaokitDC.DC.m_pNavigator.Link();
            if (Froomloc != "") {
                setTimeout(function () {
                    findSta(Froomloc, buildName, floorName, Fevent);
                }, 1000);
            }
            Engine.g_pInstance.m_pImageEnd = endIcon;
        }
        e || $(".processcontainer").hide(),
            (document.getElementById("processbar").style.width = 100 * t + "%");
    }

    function v(e, t) {
        e || $(".top-process").hide(),
            (document.getElementById("topprocessbar").style.width = 100 * t + "%");
    }

    function b() {
        document.activeElement["blur"](), $("#pop-input-start").removeClass("list-bg");
        var e = new Date().valueOf();
        "null" != JSON.stringify(mGetItem("base-position-list")) &&
            parseInt(mGetItem("base-position-list-time")) > e - http_cache_time ?
            (y(mGetItem("base-position-list")),
                console.info("读取基础设施信息缓存")) :
            $.ajax({
                type: "get",
                async: !0,
                url: SVE_H5_URL + "api/info/getBaseSortListH5.php",
                success: function (e) {
                    e
                        ?
                        (y(e),
                            mSetItem("base-position-list", e),
                            mSetItem("base-position-list-time", new Date().valueOf())) :
                        console.info("请求数据出错.");
                },
                error: function (e) {
                    console.warn("get basePosition err: " + e);
                }
            });
    }

    function y(e) {
        var t = JSON.parse(e).response,
            a = '<div class="basePosition">';
        for (var i in t)
            t[i].iconUrl &&
                (a +=
                    '<div sort-id="' +
                    t[i].ID +
                    '" class="base-item"><img src="../' +
                    t[i].iconUrl +
                    '" alt="基础设施"/><span class="base-text">' +
                    t[i].HyName +
                    "</span></div>");
        (a += "</div>"), $(".search-list").html(a);

        var s = new Date().valueOf();
        "null" != JSON.stringify(mGetItem("page-departments")) &&
            parseInt(mGetItem("page-departments-time")) > s - http_cache_time ?
            (_((e = mGetItem("page-departments"))),
                console.info("读取科室列表缓存")) :
            $.ajax({
                type: "get",
                url: SVE_H5_URL + "api/info/getKeShilistH5.php",
                async: !0,
                success: function (e) {
                    e
                        ?
                        (_(e),
                            mSetItem("page-departments", e),
                            mSetItem("page-departments-time", new Date().valueOf()),
                            console.info("请求科室列表数据")) :
                        console.info("请求数据出错.");
                },
                error: function (e) {
                    console.warn("get page-departments data error: " + e);
                }
            });
    }
    /** 链接获取参数值*/
    function DefaultNav() {
        let comm = decodeURIComponent(window.location.search);
        let pSearch = comm.split("state")[1];
        if (!pSearch && comm) {
            pSearch = comm;
        }

        function GetQueryString1(pName) {
            var reg = new RegExp("(^|&)" + pName + "=([^&]*)(&|$)", "i");
            var regRewrite = new RegExp("(^|/)" + pName + "/([^/]*)(/|$)", "i");
            var r = comm.substr(1).match(reg);
            var q = window.location.pathname.substr(1).match(regRewrite);
            if (r != null) {
                return unescape(r[2]);
            } else if (q != null) {
                return unescape(q[2]);
            } else {
                return null;
            }
        }

        function GetQueryString2(pName) {
            var reg = new RegExp("(^|&)" + pName + "=([^&]*)(&|$)", "i");
            var regRewrite = new RegExp("(^|/)" + pName + "/([^/]*)(/|$)", "i");
            var r = pSearch.substr(1).match(reg);
            var q = window.location.pathname.substr(1).match(regRewrite);
            if (r != null) {
                return unescape(r[2]);
            } else if (q != null) {
                return unescape(q[2]);
            } else {
                return null;
            }
        }

        function getName(id) {
            var pName = "";
            $.ajax({
                url: SVE_H5_URL + "api/info/getroomName.php",
                data: {
                    id: id
                },
                async: false,
                success: function (res) {
                    pName = JSON.parse(res).response[0].Name;
                }
                // complete: function(){
                //     return pName;
                // }
            });
            return pName;
        }

        function setLoc(pStartID, pStartName, pEndID, pEndName) {
            console.log("%s,%s,%s,%s", pStartID, pStartName, pEndID, pEndName);
            if (pStartID && pStartName && pEndID && pEndName) {
                $("#end_position").val(pEndName);
                $("#end_position").attr("roomid", pEndID);
                $("#start_position").val(pStartName);
                $("#start_position").attr("roomid", pStartID);
                //模拟点击导航按钮
                var btn = $(".navigation_btn");

                $(".search_direction_box").show();
                // iconup($('.search_direction_box').height());
                //$(".btn-exit-rollback").trigger("click");
                iconup($(".search_direction_box-container").height());
            } else if (pEndID && pEndName) {
                $("#end_position").val(pEndName);
                $("#end_position").attr("roomid", pEndID);
                $(".navigation_btn").trigger("click");
                $(".navigation_btn").show();
            } else if (pStartID && pStartName) {
                $("#start_position").val(pStartName);
                $("#start_position").attr("roomid", pStartID);
                $(".navigation_btn").trigger("click");
                $(".navigation_btn").show();
            }
        }
        if (pSearch) {
            let pStartID = GetQueryString2("startId");
            let pStartName = getName(pStartID);

            let pEndID = GetQueryString2("endId");
            let pEndName = getName(pEndID);
            setTimeout(function () {
                setLoc(pStartID, pStartName, pEndID, pEndName);
            }, 1000);
        }
    }

    function _(e) {
        for (
            var t = JSON.parse(e),
            a = null,
            i = null,
            s = '<div class="panel-box">',
            o = 0; o < t.response.length; o++
        )
            if ((i = (a = t.response[o]).roomChildList)) {
                s +=
                    '<div class="pannel"><div class="panel-head"><span class="title">' +
                    a.roomName +
                    '</span><span class="fold-icon"><span class="icon-chevron-thin-down"></span></span></div><div class="panel-body" style="display: none">';
                for (var n = 0; n < i.length; n++)
                    s +=
                        '<span roomid="' + i[n].roomID + '">' + i[n].roomName + "</span>";
                s += "</div></div>";
            }
        (s += "</div>"), $(".search-list").append(s);
    }

    function x(e, t) {
        var a = JSON.parse(e).response,
            i = null,
            s = "";
        for (var o in a)
            (i = a[o]),
                ("" === t || i.roomName.indexOf(t) >= 0) &&
                i.roomName.indexOf("楼梯") < 0 &&
                "" != i.roomID &&
                i.roomName.indexOf("电梯") < 0 &&
                i.roomName.indexOf("卫生间") < 0 &&
                ((s += "<li class='search-info' roomid='" + i.roomID + "'>"),
                    (s +=
                        "<span class='ico_addr'></span><span class='context'>" +
                        i.roomName +
                        "</span>"),
                    "string" == typeof i.FloorID &&
                    "" != i.FloorID &&
                    (s +=
                        "<span class='floor-num'>" +
                        i.Building_ID +
                        "-" +
                        i.FloorID +
                        "</span>"),
                    (s += "</li>"));
        "" === s &&
            (s = "<li style='text-align: center;color: #999;'>无匹配信息.</li>"),
            $(".search-list").html(s);
        $(".search-list .search-info").each(function () {
            $(this).bind("click", function () {
                var lit = $(this).find(".floor-num").text().split("-");
                if (lit.length > 1) {
                    var FbuildName = lit[0],
                        FfloorName = lit[1];
                    let reg = /-[0-9]|[0-9]/;
                    FfloorName = reg.exec(FfloorName) + "F";
                    // FfloorName = FfloorName.replace(/[^0-9]/ig, "");
                    // FfloorName += "F";
                    if (MiaokitDC.DC.m_pNavigator.m_pSiteList != null) {
                        findSta($(this).attr("roomid"), FbuildName, FfloorName, "panel");
                    } else {
                        Froomloc = $(this).attr("roomid");
                        buildName = FbuildName;
                        floorName = FfloorName;
                        Fevent = "panel";
                    }
                }
            });
        });
    }

    function w(e) {
        e
            ?
            ($(".mash").hide(),
                $(".floor_box").hide(),
                console.info("由楼宇进入院区")) :
            ($(".InfoToast").is(":hidden") && $(".floor_box").show() && console.info("由院区进入楼宇"));
    }

    function S(e) {
        0 === e ? $(".two_d_btn a").text("3D") : $(".two_d_btn a").text("2D");
    }

    function I(e) {
        compass.style.webkitTransform = "rotate(" + e + "deg)";
    }

    function k(e) {
        (function (e, t) {
            t = isNaN(t) ? 3e3 : t;
            var a = document.createElement("div");
            (a.onclick = function () {
                var e = {
                    id: $(".start_input input").attr("roomid"),
                    name: $(".start_input input").val()
                };
                mSetItem(defaultStart, JSON.stringify(e)), D("设置成功!", 500);
            }),
                (a.innerHTML = e),
                (a.style.cssText =
                    "font-size:16px; max-width:100%; background:#000; opacity:0.98; height:40px; color:#fff; line-height:40px; text-align:center; border-radius:5px; position:absolute; left:0px; right:0px; bottom:13.5rem;margin:auto; z-index:999999;"),
                document.body.appendChild(a),
                setTimeout(function () {
                    (a.style.webkitTransition =
                        "-webkit-transform 0.5s ease-in, opacity 0.5s ease-in"),
                        (a.style.opacity = "0"),
                        setTimeout(function () {
                            document.body.removeChild(a);
                        }, 500);
                }, t);
        })('点此将<span style="color:#ff0000;">' + e + "</span>设置为默认起点", 3e3);
    }

    function C(e, t, a) {
        if (a == null) {
            $("choose-set-point").hide();
            setStartPoint(e, t);
        } else if (a == "panel") {
            if (Posfault && lockFlag) {
                //UnlockScene();
            }
        } else {
            if ("" !== t) {
                if (Posfault && lockFlag) {
                    //UnlockScene();
                }
                if ($(".search_direction_box").is(":hidden")) {
                    if ($(".search_direction_box").is(":visible")) {
                        $(".search_direction_box").hide();
                        $(".search-box").show();
                        Engine.g_pInstance.m_pProject.CloseNavBack();
                    }
                    if (currentScene == "室外") {
                        var post = currentScene;
                    } else {
                        var post =
                            currentScene + " - " + $(".floor_box .current-active-floor").text();
                    }
                    hideNavAgain();
                    //$(".btn-exit-rollback").trigger("click"),
                    $(".choose-set-point .text").text(t),
                        $(".choose-set-point .post-text").text(post),
                        iconup(75);
                    $(".choose-set-point").show("fast");
                    var i = {
                        id: e,
                        name: t
                    };
                    mSetItem("choose-set-point", JSON.stringify(i));
                    if (MiaokitDC.DC.m_nCurWork == 0) {
                        SetCamera(Engine.g_pInstance.m_screenPos, 0, 0, 300);
                    } else {
                        SetCamera(Engine.g_pInstance.m_screenPos, 0, 0, 100);
                    }
                } else {
                    if (a == "getloc") {
                        setEndPoint(e, t);
                    } else if (a == "getstartloc") {
                        setStartPoint(e, t);
                    } else if (chooseStartFlag) {
                        setStartPoint(e, t);
                    }
                }
            }
        }
    }

    function N() {
        $(".choose-set-point").hide("fast");
        icondown();
    }

    function M(e) {
        for (var t in ((oBeancons = e), e)) console.log(e[t]);
    }
    $(".floor_box ul").scroll(function () {
        var e = $(this).children("li"),
            t = 0,
            a = 0,
            i = 0;
        $(this)
            .children("li")
            .each(function (e) {
                $(this).hasClass("current-active-floor") && (i = e);
            }),
            $(this)
                .children("li")
                .each(function (s) {
                    Math.abs($(this).position().top) < (2 * f) / 3 &&
                        ($(this)
                            .addClass("top")
                            .siblings()
                            .removeClass("top"),
                            (a = (t = s) + 3),
                            e
                                .eq(a)
                                .addClass("bottom")
                                .siblings()
                                .removeClass("bottom"),
                            e
                                .eq(t + 1)
                                .siblings()
                                .removeClass("middle"),
                            e.eq(t + 1).addClass("middle"),
                            e.eq(t + 2).addClass("middle"),
                            i == t ?
                                e
                                    .eq(i)
                                    .removeClass("top cmiddle cbottom")
                                    .addClass("ctop")
                                    .siblings()
                                    .removeClass("ctop") :
                                i == a ?
                                    e
                                        .eq(i)
                                        .removeClass("bottom ctop cmiddle")
                                        .addClass("cbottom")
                                        .siblings()
                                        .removeClass("cbottom") :
                                    i < a &&
                                    i > t &&
                                    e
                                        .eq(i)
                                        .removeClass("middle ctop cbottom")
                                        .addClass("cmiddle")
                                        .siblings()
                                        .removeClass("cmiddle"));
                });
    }),
        $(".start_input input").live("click", function () {
            (isStartInput = !0),
                $("#pop-input-start input").attr("placeholder", "请输入起点"),
                (cacheType = cache_start_point),
                b();
        }),
        $(".end_input input").live("click", function () {
            (isStartInput = !1),
                $("#pop-input-start input").attr("placeholder", "请输入终点"),
                (cacheType = cache_end_point),
                b();
        }),
        $("#page-index .center-container input").live("click", function () {
            (isStartInput = !1),
                $("#pop-input-start input").attr("placeholder", "请输入终点"),
                (cacheType = cache_end_point),
                b();
        }),
        $("#search-cancel").live("click", function (e) {
            e.preventDefault();
            if (!Posfault) {
                UnlockScene(),
                    $(".lockScene").hide();
            } else {
                Posfault = false;
                ToastHide();
                console.log("Posfault = false");
            }
            Engine.g_pInstance.m_pProject.CloseNavBack(),
                $(".search_direction_box").hide();
            $(".navigation_btn").hide();
            icondown();
        }),
        $(document).on("click", ".basePosition .base-item", function () {
            var e = $(this).attr("sort-id");
            $(".base-position-list").show(),
                $.mobile.changePage("", {
                    transition: "slide"
                }),
                $(".search_direction_box").hide(),
                $(".navigation_btn").hide(),
                $.ajax({
                    type: "get",
                    url: SVE_H5_URL + "api/info/getBaseSortSelectH5.php?id=" + e,
                    success: function (e) {
                        e
                            ?
                            (function (e) {
                                var t = "",
                                    a = JSON.parse(e).response;
                                for (var i in a)
                                    (t +=
                                        '<li room-id="' +
                                        a[i].Room_ID +
                                        '"><span class="ico_addr"></span><span class="context">' +
                                        a[i].Name +
                                        "</span>"),
                                        "string" == typeof a[i].Floor_ID &&
                                        "" != a[i].Floor_ID &&
                                        (t +=
                                            "<span class='floor-num'>" +
                                            a[i].Floor_ID +
                                            "</span>"),
                                        (t += "</li>");
                                $(".base-position-list ul").html(t),
                                    $(".base-position-list ul").scrollTop(0);
                            })(e) :
                            console.info("请求数据出错.");
                    },
                    error: function (e) {
                        console.warn("get base-roomid-list err: " + e);
                    }
                });
        }),
        $(document).on("click", ".base-position-list li", function () {
            var e = $(this).attr("room-id"),
                t = $(this)
                    .children(".context")
                    .html();
            isStartInput
                ?
                ($(".start_input input").attr("roomid", e),
                    $(".start_input input").val(t),
                    k(t)) :
                setEndPoint(e, t),
                $(".base-position-list").hide(),
                $(".search_direction_box").show(),
                $(".navigation_btn").show();
        }),
        $(document).on("click", ".panel-body span", function () {
            var e = $(this).attr("roomid"),
                t = $(this).html();
            if ($(".search-box").is(":hidden")) {
                $("#replanning").trigger("click");
            }
            isStartInput ? (setStartPoint(e, t), k(t)) : setEndPoint(e, t),
                $(".choose-set-point").hide("fast"),
                $(".search_direction_box").show(),
                $(".navigation_btn .search-nav-text").text("开始导航"),
                $(".navigation_btn").show(),
                $.mobile.changePage("", {
                    transition: "slide"
                });
        }),
        $(document).on("click", ".base-position-list p", function () {
            $(".navigation_btn").show(), $(".base-position-list").hide();
        }),
        $(document).on("click", ".panel-head", function () {
            var e = $(this).parent().children(".panel-body"),
                t = $(this),
                a = $(this).children(".fold-icon").children("span");
            a.hasClass("icon-chevron-thin-down") ?
                a.removeClass("icon-chevron-thin-down").addClass("icon-chevron-thin-up") : a.removeClass("icon-chevron-thin-up").addClass("icon-chevron-thin-down"),
                e.is(":visible") ?
                    (e.hide("fast"), t.css("border-bottom", "none")) :
                    (e.show("slow"), t.css("border-bottom", "1px solid #DDDDDD"));
        }),
        $(".input-head .visual-input input").bind(
            "input focus propertychange",
            function (e) {
                $("#pop-input-start").addClass("list-bg"),
                    $(".input-head .visual-input .ico-qrcode").css("display", "none"),
                    $(".input-head .visual-input .ico-close").css("display", "none");
                var t = $(this).val();
                "" !== t &&
                    ($(".input-head .visual-input .ico-qrcode").css("display", "none"),
                        $(".input-head .visual-input .ico-close").css(
                            "display",
                            "inline-block"
                        )),
                    ("focus" != e.type && "input" != e.type) ||
                    (function (e) {
                        var t = new Date().valueOf();
                        if (
                            "null" != JSON.stringify(mGetItem("keshi-list")) &&
                            parseInt(mGetItem("keshi-list-time")) > t - http_cache_time
                        ) {
                            var a = mGetItem("keshi-list");
                            x(a, e), console.info("读取科室列表缓存");
                        } else
                            $.ajax({
                                type: "get",
                                url: SVE_H5_URL + "api/info/getKeShiSelectH5.php?keshi_name=",
                                async: !0,
                                success: function (t) {
                                    t
                                        ?
                                        (x(t, e),
                                            mSetItem("keshi-list", t),
                                            mSetItem("keshi-list-time", new Date().valueOf())) :
                                        console.info("请求数据出错.");
                                },
                                error: function () {
                                    console.warn("模糊请求查询科室数据出错.");
                                }
                            }),
                                console.info("请求科室列表数据");
                    })(t.trim());
            }
        ),
        $(document).on("click", ".delete", function (e) {
            var t = $(this)
                .parent()
                .attr("roomid");
            if (window.confirm("确定删除此条记录?")) {
                if (
                    ($(this).parent().remove(),
                        (function (e, t) {
                            var a = JSON.parse(mGetItem(e));
                            for (var i in a) t === a[i].id && a.splice(i, 1);
                            mSetItem(e, JSON.stringify(a));
                        })(cacheType, t),
                        D("删除成功", 1e3),
                        $(".search-list .delete").length < 1)
                ) {
                    var a = '<li class="input-history-li">历史记录</li>';
                    (a += '<li class="input-history-none">暂无历史数据</li>'),
                        $(".search-list").html(a);
                }
            } else D("已取消删除操作", 1e3);
            e.stopPropagation();
        }),
        $(".input-head .visual-input .ico-close").live("click", function () {
            $(".input-head .visual-input input").val(""), $(this).hide();
            // var e = $(".input-head .visual-input input").val();
            // e.length < 1 ? ($(this).hide(),
            // $(".input-head .visual-input .ico-qrcode").css("display", "inline-block")) : (e = e.substr(0, e.length - 1),
            // $(".input-head .visual-input input").val(e),
            // e.length < 1 && ($(this).hide(),
            // $(".input-head .visual-input .ico-qrcode").css("display", "inline-block")))
        }),
        $("#pop-input-start .arrow-left").live("click", function () {
            // $.mobile.changePage("", {
            //     transition: "slide"
            // })
            history.back();
        }),
        $(document).on("pagehide", "#pop-input-start", function () {
            $(".input-head .visual-input input").val("");
        }),
        $(".search-list .search-info").live("click", function () {
            if (
                $(this).hasClass("input-history-clear") ||
                $(this).hasClass("input-history-li") ||
                $(this).hasClass("input-history-none")
            ) {
                if (
                    $(this).hasClass("input-history-clear") &&
                    window.confirm("清除历史记录?")
                ) {
                    mSetItem(cacheType, null);
                    var e = '<li class="input-history-li">历史记录</li>';
                    (e += '<li class="input-history-none">暂无历史数据</li>'),
                        $(".search-list").html(e),
                        D("已清除历史记录", 1e3);
                }
            } else
                "请输入起点" === $("#pop-input-start input").attr("placeholder") ?
                    (k(
                        $(this)
                            .children(".context")
                            .text()
                    ),
                        setStartPoint($(this).attr("roomid"), $(this).children(".context").text())) :
                    (setEndPoint($(this).attr("roomid"), $(this).children(".context").text())),
                    $.mobile.changePage("", {
                        transition: "slide"
                    });
            if ($(".history-rollback-wrapper").is(":hidden")) {
                $(".choose-set-point").hide("fast"),
                    $(".search_direction_box").show(),
                    $(".navigation_btn .search-nav-text").text("开始导航"),
                    // $(".navigation_btn").show(),
                    $("#pop-input-start input").val("");
            }
        }),
        $(".search-list").live("click", function () {
            document.activeElement["blur"]();
        }),
        $(".navigation_btn").live("click", function () {
            var ntype = $(".search-path .path").index($(".search-path .active"));
            if ($(".search_direction_box").is(":hidden")) {
                $(".search_direction_box").show();
                $(".choose-set-point").hide();
                iconup($(".search_direction_box").height()), $(this).text("开始导航");
                if ($(".start_input input").val() == "") {
                    D("未获取起点，请手动选择起点", 2220);
                }
            } else {
                if (0 && GPSTimer) {
                    $("#autostep").trigger("click");
                } else {
                    audio.volume = 1;
                    var e = $(".start_input input").attr("roomid"), //获取startid
                        t = ($(".start_input input").val(),
                            $(".end_input input").attr("roomid")); //获取endid
                    $(".end_input input").val();
                    if ($(".start_input input").val() == "我的位置") {
                        e = PLocation;
                        console.log("e:" + e);
                    } else {
                        console.log("start_input", $(".start_input input").val(), "e:", e);
                    }
                    e && t ? //判断是否起点终点id均符合规范
                        e != t ?
                            ((isNowNavigating = !0),
                                //Engine.g_pInstance.m_pProject.Navigate(e, t, 0),
                                navigation(e, t, ntype), //进行导航规划路线
                                (endX = 0.0),
                                (endY = 0.0),
                                !isNavSuccess ?
                                    ($(".navigation_btn").show(),
                                        (isNavSuccess = !0),
                                        D("无法找到当前线路.", 1500)) : console.log()) :
                            (D("起点和终点相同！", 1500)) :
                        D("请开启蓝牙或手动选择起点", 2220);
                }
            }
        }),
        $(".btn-exit-rollback").live("click", function () {
            (audio.volume = 0),
                Engine.g_pInstance.m_pProject.CloseNavBack(),
                ToastHide(),
                $(".history-rollback-wrapper").css("display", "none");
            if (!Posfault) {
                $(".lockScene").hide()
            } else {
                Posfault = false;
                console.log("Posfault = false");
            }
            $(".floor-box-div").hide();
        }),
        $("#left-slide li").live("click", function () {
            if ((closeLeftSide(), (isNavSuccess = !0), $(this).hasClass("work"))) {
                var e = $(this).attr("data-id");
                //Engine.g_pInstance.m_pProject.SwitchWork(e),
                SwitchScene(e);
            }
            $(this).hasClass("exterior") &&
                SwitchScene(null) /*Engine.g_pInstance.m_pProject.GoOutWork()*/,
                $(this).siblings().removeClass("active"),
                $(this).addClass("active");
        }),
        $(".mash").live("touchstart", function () {
            closeLeftSide(), closePartSide(), closeModelSide();
        }),
        $(".two_d_btn a").live("click", function () {
            "2D" === $(this).text() ? SwitchView(2) /*Engine.g_pInstance.m_pProject.SwitchViewMode(ViewMode.View2D)*/ : SwitchView(3); /* Engine.g_pInstance.m_pProject.SwitchViewMode(ViewMode.View3D)*/
        }),
        $(".reset").live("click", function () {
            let pViewState = MiaokitDC.DC.GetWork(MiaokitDC.DC.m_nCurWork).m_pEyejiaDC.m_pLayerMgr.GetLayer(ALinerDC.DC.m_pLayerMgr.m_pActiveLayer.m_nIndex).m_pViewState;
            if (pViewState != null) {
                Engine.g_pInstance.SetViewState(pViewState);
            }
        }),
        $(".two_code_btn").live("click", function () {
            wx.scanQRCode({
                needResult: 1,
                desc: "scanQRCode desc",
                success: function (e) {
                    if (e) {
                        if (e.resultStr) {
                            var t = JSON.parse(e.resultStr);
                            $(".start_input input").attr("roomid", t.Room_ID),
                                $(".start_input input").val(t.Name);
                        }
                        $.mobile.changePage("", {
                            transition: "slide"
                        }),
                            $("#pop-input-start input").val("");
                    } else console.info("请求数据出错.");
                }
            });
        }),
        $(".input-head .visual-input .ico-qrcode").live("click", function () {
            wx.scanQRCode({
                needResult: 1,
                desc: "scanQRCode desc",
                success: function (e) {
                    if (e) {
                        if (e.resultStr) {
                            var t = JSON.parse(e.resultStr);
                            $(".start_input input").attr("roomid", t.Room_ID),
                                $(".start_input input").val(t.Name);
                        }
                        $.mobile.changePage("", {
                            transition: "slide"
                        }),
                            $("#pop-input-start input").val("");
                    } else console.info("请求数据出错.");
                }
            });
        }),
        $(".history-rollback-wrapper ul li").live("click", function (e, t) {
            if (
                ((audio.volume = 1),
                    $(this)
                        .addClass("item-active")
                        .siblings()
                        .removeClass("item-active"),
                    void 0 == t)
            ) {
                var a = new NavBackData(
                    $(this).attr("house-id"),
                    $(this).attr("p-id"),
                    $(this).attr("layer-id")
                );
                Engine.g_pInstance.m_pProject.NavBack(a, $(this).index()),
                    (isNowNavigating = !1);
                if (NNavigation.g_pActiveList.length > 0 && lockFlag)
                    SetCamera(new Vector3(0.0, 0.0, 0.0), undefined, undefined, 20)
                console.info("history-rollback-wrapper needActive layer");
            } else if ("noNeedActive" == t.type) {
                if (
                    ($(".floor_box ul li").eq(parseInt($(this).attr("layer-id"))).trigger("click", {
                        type: "noNeedActive"
                    }),
                        isNowNavigating)
                ) {
                    var i = $(".history-rollback-wrapper ul li").eq(0).width();
                    $(".history-rollback-wrapper ul").scrollLeft($(this).index() * i);
                }
                console.info("history-rollback-wrapper noNeedActive layer");
            }
        }),
        $("#page-expert-detail .department-msg .go-ahead").live(
            "click",
            function () {
                var e = $(this).attr("room-id");
                $(".end_input input").attr("roomid", e),
                    $(".start_input input").attr("roomid") ?
                        ($.mobile.changePage("", {
                            transition: "slide"
                        }),
                            reSetNavIcon("index"),
                            $(".history-rollback-wrapper").css("display", "none"),
                            $(".navigation_btn").show(),
                            $(".search_direction_box").show(),
                            iconup($(".search_direction_box").height()),
                            $(".btn-exit-rollback").trigger("click"),
                            $(".navigation_btn").trigger("click")) :
                        alert("请先到导航页输入起点位置.");
            }
        ),
        $(document).on(
            "click",
            "#page-self-service-rusult .self-go-ahead",
            function () {
                var e = $(this).attr("dataid"),
                    t = $("#page-self-service-rusult .room-name").html();
                setEndPoint(e, t),
                    $(".start_input input").attr("roomid") ?
                        ($.mobile.changePage("", {
                            transition: "slide"
                        }),
                            reSetNavIcon("index"),
                            $(".history-rollback-wrapper").css("display", "none"),
                            $(".navigation_btn").show(),
                            $(".search_direction_box").show(),
                            iconup($(".search_direction_box").height()),
                            $(".btn-exit-rollback").trigger("click"),
                            $(".navigation_btn").trigger("click")) :
                        alert("请先到导航页输入起点位置.");
            }
        ),
        $(".choose-set-point li .set").click(function () {
            var e = $(this).attr("type"),
                t = JSON.parse(mGetItem("choose-set-point"));
            switch (e) {
                case "start":
                    setStartPoint(t.id, t.name), $(".search_direction_box").show();
                    break;
                case "end":
                    let posarray = $(".post-text").text().split(" - ");
                    $(".start_input input").attr("roomid") != t.id ?
                        (
                            $("#start_position").val(""),
                            $("#start_position").attr("roomid", ""),
                            $("#start-build").text(""),
                            $("#start-floor").text(""),
                            setEndPoint(t.id, t.name),
                            $(".navigation_btn").show("fast"),
                            $("#end-build").text(posarray[0]),
                            $("#end-floor").text(posarray[1]),
                            $(".search_direction_box").show(),
                            $(".search-box").show()
                        )
                        /**$(".navigation_btn").trigger("click")*/
                        :
                        D("起点和终点相同！", 1500);
                    break;
                default:
                    $(".search_direction_box").hide(), icondown();
            }
            $(".choose-set-point").hide();
        }),
        $(".bottom_menu ul li a").live("click", function () {
            $(".choose-set-point").hide();
            icondown();
        });
});

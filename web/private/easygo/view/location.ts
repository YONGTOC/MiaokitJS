/// <reference path="compat.ts" />

var locationlib = new LocationLib();
var hostParams = location.href.split("#")[0];
var PLocation = null;
var openid = "";
var loclist = null;
var resfloor = {
  name: null,
  status: 1, //等同参数code
  time: null,
  count: 0
};
var resPos = {
  x: 0.0,
  y: 0.0,
  floor: 0,
  count: 0
};
var gpsPosition = {
  latitude: null,
  longitude: null,
  speed: null,
  accuracy: null,
  count: 0
}
var gpsPositionPro = {
  latitude: null,
  longitude: null
}
var GPSTimer = null;
var InitPosArry = [],
  InitPosStatus = false,
  recentTime = 0;
  /**语音播报的地方 实时定位时 */
  var curEndX,curEndY,curEndPath = {
    num:null,
    status:true
  };

/**暂时不用的wxconfig方法 */
function initParam() {
  var host = window.location.host;
  var currentUrl = "/h5/weixin/sign.php?url=" + encodeURIComponent(hostParams);
  $.ajax({
    type: "get",
    async: true,
    url: currentUrl,
    success: function (data) {
      var wxParams = JSON.parse(data);
      wx.Timestamp = wxParams["Timestamp"];
      wx.Noncestr = wxParams["Noncestr"];
      wx.Signature = wxParams["Signature"];
      wx.Appid = wxParams["Appid"];
      wx.Ticket = wxParams["jsapi_ticket"];

      wx.config({
        beta: true,
        debug: false,
        appId: wx.Appid,
        timestamp: wx.Timestamp,
        nonceStr: wx.Noncestr,
        signature: wx.Signature,
        jsApiList: [
          "startSearchBeacons",
          "onSearchBeacons",
          "scanQRCode",
          "startMonitoringBeacons",
          "stopMonitoringBeacons",
          "onBeaconsInRange",
          "onMenuShareTimeline",
          "onMenuShareAppMessage",
          "onMenuShareQQ",
          "openWXDeviceLib",
          "closeWXDeviceLib",
          "onWXDeviceBluetoothStateChange",
          'openLocation', //使用微信内置地图查看地理位置接口
          'getLocation' //获取地理位置接口
        ]
      });
    },
    // complete: function () {
    //   getLocList();
    // },
    error: function (err) {
      console.log("get wxAPI error: " + err);
    }
  });
}

var openId = "";
var GPSaccuracy = {
  accuracy:null,
  count:0
};
var nstepLLL=0;
/** 用户点击链接触发登录*/
function getCode(code) {
  /**后台微信登录地址 */
  var openidURL = "/h5/weixin/login.php?code=" + code;

  $.ajax({
    url: openidURL,
    success: function (data) {
      openid = JSON.parse(data).openid;
      console.info(openid);
      openId = openid;

      if (openid) {
        if (!loclist) {
          getLocList();
        }
        locationlib.locationInit("RFaUJsuCZVYMTPbbEY5z", "sxtyzx", openid, function (x, y, floorId, code) {
          var mytime = new Date().getTime();
          getLocation(x, y, floorId, code, mytime);
        });
      }
    }
  });
}

function locationTest() {
  /**模拟蓝牙信号 模拟init里的回调函数 */
  !Posfault && (Posfault = true, NNavigation.EnableLocate(true), LockScene(), $(".lockScene").show(), showMockBtn());
  setInterval(function () {
    var mytime = new Date().getTime();
    getLocation(1110, 360.862 + nstepLLL * 2, 2, 0, mytime);
    //NNavigation.UpdateLocation(1, 1, new Vector3(nstepLLL, 0.0, nstepLLL)); //外景的workid与floorid始终为0
  
  PLocation = {
    Work: 0,
    Layer: 0,
    Position: new Vector3(nstepLLL, 0.0, nstepLLL)
  };
  GLOBAL.PLocation = PLocation;
  nstepLLL++;
  }, 1000);
}

wx.ready(function () {
  // config信息验证后会执行ready方法，所有接口调用都必须在config接口获得结果之后，config是一个客户端的异步操作，
  //所以如果需要在页面加载时就调用相关接口，则须把相关接口放在ready函数中调用来确保正确执行。对于用户触发时才调用的接口，则可以直接调用，不需要放在ready函数中。
  wx.startSearchBeacons({
    ticket: wx.Ticket,
    complete: function (argv) {
      var result = JSON.stringify(argv);
      if (result.indexOf("bluetooth power off") != -1) {
        $("#page-bluetooth").css("display", "block");
        $("#page-bluetooth").animate({
            left: "0"
          },
          "fast",
          function () {
            $("#page-index-new").css("height", "100vh");
          }
        );
        setTimeout(() => {
          IndoorStatus = false;
        }, 2000);
      } else if (result.indexOf("system unsupported") != -1) {
        alert("您的系统不支持此服务。");
      } else {
        setTimeout(() => {
          if (!Posfault)
            IndoorStatus = false;
        }, 5000);
      }
    }
  });
  wx.onSearchBeacons({
    complete: function (argv) {
      if ($("#page-bluetooth").is(":visible")) {
        $("#page-index-new").css("height", "auto");
        $("#page-bluetooth").animate({
            left: "100vw"
          },
          "fast",
          function () {
            $("#page-bluetooth").hide();
          }
        );
      }
      locationlib.bleLocation(argv.beacons);
      // console.log("onsearch ing2");
      !Posfault && (Posfault = true, NNavigation.EnableLocate(true), NNavigation.g_pActiveList.length <= 0 && LockScene(), $(".lockScene").show(), showMockBtn());
      /**传递到和盛华提供接口 */
      $.post("http://api.heshenghua.net/rpc/beancons/setBeancons", {
        'beacons': JSON.stringify(argv.beacons),
        complete: function () {
          // console.log(JSON.stringify(shili.beacons));
        }
      });
      // getLocationOld();
    }
  });
  wx.invoke(
    "openWXDeviceLib", {
      brandUserName: "gh_b62862b4ed11"
    },
    function (res) {
      console.log("openWXDeviceLib", res);
    }
  );
  wx.on("onWXDeviceBluetoothStateChange", function (res) {
    if (res.state == "on") {
      if ($("#page-bluetooth").is(":visible")) {
        $("#page-index-new").css("height", "auto");
        $("#page-bluetooth").animate({
            left: "100vw"
          },
          "fast",
          function () {
            $("#page-bluetooth").hide();
          }
        );
      }
      NNavigation.TipVoice = function (message) {
        console.info(message);
        l(message);
      };
    } else if (res.state == "off") {
      //开启定位后关闭，需要恢复为模拟导航的配置
      PLocation = null;
      $(".start_input input").val("");
      D("未能获取蓝牙信息");
      NNavigation.EnableLocate(false);
      Posfault = false;
      hideMockBtn();
    }
  });
  if (GLOBAL.GpsConfig.launch) {
    // InitGDMap();
    getGpsLocationGeo();
    console.log("getGPS start");
    // GPSTimer = setInterval(getGpsLocation, 1000);
    // let gpsParam = GLOBAL.GpsConfig.config;
    // let gpscoordArry = Object.keys(gpsParam).map(function (i) {
    //   return gpsParam[i]
    // });
    // let maxlongitude = gpscoordArry[0][0],
    //   minlongitude = gpscoordArry[0][0],
    //   maxlatitude = gpscoordArry[0][1],
    //   minlatitude = gpscoordArry[0][1];
    // for (i = 1; i < 4; i++) {
    //   if (gpscoordArry[i][0] < minlongitude) {
    //     minlongitude = gpscoordArry[i][0];
    //   } else {
    //     maxlongitude = gpscoordArry[i][0];
    //   }
    //   if (gpscoordArry[i][1] < minlatitude) {
    //     minlatitude = gpscoordArry[i][1];
    //   } else {
    //     maxlatitude = gpscoordArry[i][1];
    //   }
    // }
    gpscpArry = new Vector3(112.52847,0.0,37.75644251);
    //   maxlongitude,
    //   minlongitude,
    //   maxlatitude,
    //   minlatitude
    // };
    // console.log(gpscpArry);
  }
});

function getRelLoc(x, y, floor, nWork) {
  var floorId = floor - 1;
  if (loclist) {
    var relX = 0,
      relY = 0,
      centX = loclist[floorId].centX,
      centY = loclist[floorId].centY,
      offsetX = loclist[floorId].offsetX,
      offsetY = loclist[floorId].offsetY,
      unit = loclist[floorId].unit,
      relLoc = [],
      Lx = x,
      Ly = y;

    relX = (Lx - centX) * unit + offsetX;
    relY = (Ly - centY) * unit + offsetY;
    relLoc = [relX, relY];
    /**连续的点相距5米以上不传值 */
    // if (resPos.x != 0.0 && resPos.y != 0.0 && resPos.floor == floor) {
    //   if (
    //     Math.sqrt(Math.pow(relX - resPos.x, 2) + Math.pow(relY - resPos.y, 2)) <
    //     5 + resPos.count * 2 ||
    //     resPos.count > 5
    //   ) {
    //     NNavigation.UpdateLocation(nWork, floorId, new Vector3(relX, 0.0, relY));
    //     resPos.x = relX;
    //     resPos.y = relY;
    //     resPos.floor = floor;
    //   } else {
    //     resPos.count++;
    //   }
    // } else {
    let curPonit = new  Vector3(relX, 0.0, relY);
    //$("title").text(nWork+","+floorId+","+relX+","+relY);
    NNavigation.UpdateLocation(nWork, floorId, {x:relX,y:0.0,z:relY});
    //   resPos.x = relX;
    //   resPos.y = relY;
    //   resPos.floor = floor;
    // }
    // if (GLOBAL.pathLayer.length > 0 && floorId == GLOBAL.pathLayer[GLOBAL.pathLayer.length - 1]) {
      if (NNavigation.g_pActiveList.length > 0 && GLOBAL.Navigating){
      // $("title").text(curEndPath.num+","+curEndX+','+curEndY);
      if (!curEndX&&!curEndY||curEndPath.num!=NNavigation.g_pActiveList[0].m_nCurPath){
        let Nav;
        ( Nav =  NNavigation.g_pActiveList[0],
          curEndPath.num = Nav.m_nCurPath,
          curEndPath.status = false,
          curEndX = Nav.m_aPath[Nav.m_nCurPath].m_aPath[Nav.m_aPath[Nav.m_nCurPath].m_aPath.length-1].x,
          curEndY = Nav.m_aPath[Nav.m_nCurPath].m_aPath[Nav.m_aPath[Nav.m_nCurPath].m_aPath.length-1].z
        );
      } else if (curEndPath.num==NNavigation.g_pActiveList[0].m_nCurPath&&!curEndPath.status){
        if (NNavigation.g_pActiveList[0].m_nCurPath >= NNavigation.g_pActiveList[0].m_aPath.length - 1) {
          switch(Engine.g_pInstance.pPath[Engine.g_pInstance.pPath.length - 1]
            .m_pEndPoint.m_mLandmark.Object.m_pName[0]){
              case "1" :
                calcDistance(relX, relY, 5,22);
                break;
                case "2":
                    calcDistance(relX, relY, 5,8);
              break;
              case "3":
                calcDistance(relX, relY, 5,17);
                break;
              default:
                calcDistance(relX, relY, 5,12);
                break;
              }
        } else {
          switch (NNavigation.g_pActiveList.length > 0 && NNavigation.g_pActiveList[0].m_aPath[NNavigation.g_pActiveList[0].m_nCurPath].m_pEndPoint.m_mLandmark.Object.TypeName())
           {
            case "出入口":
              calcDistance(relX, relY, 4);
              break;
            case "楼梯":
              calcDistance(relX, relY, 1);
              break;
            case "电梯":
              calcDistance(relX, relY, 2);
              break;
            case "扶梯":
              calcDistance(relX, relY, 3);
              break;
            default:
          }
        }
      }
    }
    // }

    /**蓝牙定位储存当前位置点信息（开启蓝牙和关闭蓝牙还是需要添加判断） */
    PLocation = {
      Work: nWork,
      Layer: floorId,
      Position: curPonit
    };
    GLOBAL.PLocation = PLocation;
    // if (MiaokitDC.DC.m_nCurWork == 0) {
    //   SwitchScene("体育场");
    // }
  } else {
    getLocList();
    console.log("undefined loclist");
  }
}
var OutdoorStatus = false;
var IndoorStatus = true;
/**播放动画 不自动结束 */
function c2 (e) {
  console.info("播放动画：" + e);
      var a = document.createElement("img");
      (a.src = "images/animate/" + e + ".gif"),
      (a.style.cssText =
          "position:absolute;padding:5px; top:150px; left:0px; right:0px;margin:auto; z-index:999999;background-image:linear-gradient(45deg, #eee 25%, transparent 25%, transparent 75%, #eee 75%, #eee 100%),linear-gradient(45deg, #eee 25%, white 25%, white 75%, #eee 75%, #eee 100%);"),
      document.body.appendChild(a);
      a.setAttribute("id","movieC");
}
/**删除当前动画 */
function removeC () {
  var a = document.getElementById("movieC");
  if (a){
    (a.style.webkitTransition =
      "-webkit-transform 0.5s ease-in, opacity 0.5s ease-in"),
  (a.style.opacity = "0"),
  setTimeout(function () {
      document.body.removeChild(a);
  }, 500);
}
}

/** 返回位置坐标（美迪端原始坐标）*/
function getLocation(initX, initY, floorId, code, time) {
  if (floorId == 4) {
    floorId = 5;
  }
  var floor = floorId;
  $("title").text(code + "," + initX + "," + initY + "," + floorId);
  if (code == 0) {
    if (NNavigation.g_pActiveList.length>0&&NNavigation.g_pActiveList[0].m_aPath[0].m_pLayerName=="5F"&&
      NNavigation.g_pActiveList[0].m_aPath[NNavigation.g_pActiveList[0].m_aPath.length-1].m_pLayerName=="室外"&&
      floorId==2) {
      IndoorStatus&&!GPSTimer && (getGpsLocationGeo());
      IndoorStatus = false;
    } else{
      resfloor.time = time;
      IndoorStatus = true;
      GPSTimer && (navigator.geolocation.clearWatch(GPSTimer),
        // console.log("cleargpstimer in onsearch"),
        GPSTimer = null, checkBLE());
      getRelLoc(initX, initY, floor, 1);
      if (resfloor.status) {
        resfloor.status = 0;
        hideMsg();
      }
    }
  } else {
    let interval = 8000;
    /**看情况 有导航和无导航，导航是否下一楼是室外还是啥，给不同的无信号时间，或者检测已经在区域外 */
    if ((new Date().getTime() - resfloor.time > interval) && !resfloor.status) {
      $("#msgBox img").attr("src","images/loading.gif");
      showMsg("", 5000);
      resfloor.status = 1;
      resfloor.time = time;
      if (NNavigation.g_pActiveList.length>0&&NNavigation.g_pActiveList[0].m_aPath[NNavigation.g_pActiveList[0].m_aPath.length-1].m_pLayerName=="室外") {
        IndoorStatus&&!GPSTimer && (getGpsLocationGeo());
        IndoorStatus = false;
      }
    } else if (!GPSTimer&&IndoorStatus) {
      getRelLoc(initX, initY, floor, 1);
    }
  }
}
/**通过接口获取位置信息 */
function getLocationOld() {
  $.ajax({
    url: "https://indoor.yunweizhi.net:3000/getjspos?mapId=" + "ychospital" + "&openId=" + openid,
    success: function (res) {
      var location = JSON.parse(res).data;
      if (location.code == 0) {
        getRelLoc(location.x, location.y, 0, 0);
      } else {
        // $("title").text(location.x + "," + location.y);
      }
    }
  });
}

/**当前终点距离计算
 * 出入口and楼梯通道and终点
 * type分别213
 */
function calcDistance(x, y, type, faraway = 15) {
  // let a = x - endX;
  // a = a * a;
  // let b = y - endY;
  // b = b * b;
  let EndPOI = new Vector3(curEndX,0.0,curEndY);
  let curPonit = new Vector3(x,0.0,y);
  let distance = Vector3.Distance(EndPOI,curPonit);
  // $("title").text(distance+","+type);
  if (distance < faraway) {
    switch (type) {
      case 1:
        if (NNavigation.g_pActiveList[0].m_aPath[0].m_nLayer < NNavigation.g_pActiveList[0].m_aPath[1].m_nLayer) {
          c2(0);
        } else {
          c2(1);
        }
        NNavigation.TipMessage = null;
        ToastShow("请上下楼梯");
        l(["请上下","楼梯"]);
        break;
      case 2:
        if (NNavigation.g_pActiveList[0].m_aPath[0].m_nLayer < NNavigation.g_pActiveList[0].m_aPath[1].m_nLayer) {
          c2(6);
        } else {
          c2(7);
        }
        NNavigation.TipMessage = null;
        ToastShow("请上下电梯");
        l(["请上下","电梯"]);
        break;
      case 3:
        if (NNavigation.g_pActiveList[0].m_aPath[0].m_nLayer < NNavigation.g_pActiveList[0].m_aPath[1].m_nLayer) {
          c2(4);
        } else {
          c2(5);
        }
        NNavigation.TipMessage = null;
        ToastShow("请上下扶梯");
        l(["请上下","扶梯"]);
        break;
      case 4:
        if (MiaokitDC.DC.m_nCurWork == 0) {
          c2(3);
          ToastShow("请通过出入口进入室内");
          l(["通过出入口","进入室内"]);
          } else {
          c2(2);
          ToastShow("请通过出入口前往室外");
          l(["通过出入口","前往室外"]);
        }
        NNavigation.TipMessage = null;
        break;
      case 5:
        /**终点播报 */
        D(
          "到达目的地" +
          Engine.g_pInstance.pPath[Engine.g_pInstance.pPath.length - 1]
          .m_pEndPoint.m_mLandmark.Object.m_pName,
          1500
        );
        ToastShow("到达目的地附近");
        l(["到达目的地附近", "结束导航"]);
        NNavigation.NavigateCancel();
        Engine.g_pInstance.m_pProject.CloseNavBack();
        GLOBAL.Navigating = false;
        break;
      default:
        return true;
    }
    // endX = null;
    // endY = null;
    $(".Info-Img-Box img").attr("src","images/ex.png");
    curEndPath.status = true;
    }
}

/**判断是否为定位跳动 */
function floorCheck(initX, initY, floor, time) {
  let date = time;
  if (NNavigation.g_pActiveList.length == 0) {
    if (resfloor.name) {
      if (resfloor.name != floor) {
        if (date - resfloor.time > 2000) {
          getRelLoc(initX, initY, floor, 1);
          resfloor.name = floor;
          resfloor.time = date;
        }
      } else {
        getRelLoc(initX, initY, floor, 1);
        resfloor.time = date;
      }
    } else {
      getRelLoc(initX, initY, floor, 1);
      resfloor.name = floor;
      resfloor.time = date;
    }
  } else {
    resfloor.time = time;
    getRelLoc(initX, initY, floor, 1);
  }
}
var resscene = "";
let ff;
var voiceFLag = true,
  endX = null,
  endY = null,
  PosTime,
  Posfault = false,
  bleOn;

/**定时检测是否能够定位成功 */
function buletoothOn() {
  var curTime = Date.parse((new Date()).toString());
  if (curTime - PosTime > 5000 && Posfault == true) {
    NNavigation.EnableLocate(false);
    Posfault = false;
    if ($(".history-rollback-wrapper").is(":hidden")) {
      $(".lockScene").hide();
      LockCameraToPath(0);
      NNavigation.TipVoice = null;
    }
  }
}

function getLocList() {
  $.ajax({
    url: "../api/info/getBluetooth.php",
    success: function (data) {
      loclist = JSON.parse(data);
      for (let loc of loclist) {
        for (var i in loc) {
          loc[i] = parseFloat(loc[i]);
        }
      }
    }
  });
}
/**体育馆的中心坐标，以其画圆排除 */
let CentrePoint = new Vector3(112.53005, 0.0, 37.7573);
/**是否启动排除方案 */
var rangeIn = false;
/**原生watch接口 */
function getGpsLocationGeo () {
  //获取设备信息
  GPSTimer=navigator.geolocation.watchPosition(
    function (p) {
        //ShowObjProperty(p);
        lat = p.coords.latitude || 0;
        lng = p.coords.longitude || 0;
        alt = p.coords.altitude || 0;
        gpsTime =new Date().getTime();
        dataLngLatAccuracy = p.coords.accuracy || 0;
        dataAltAccuracy = p.coords.altitudeAccuracy || 0
        angle = p.coords.heading || 0;
        speed = p.coords.speed || 0;
        // console.log(gpsTime);
        //暂时只判断经纬度海拔变化值是否变化
        if (!IndoorStatus&&(!last_gpsTime||gpsTime - last_gpsTime>1000)){
          // console.log("获取GPS一次");
          if (last_lat != lat || last_lng != lng || last_alt != alt) {//|| last_gpsTime != gpsTime
              eqcount = 0;
              gpsPosition.latitude = lat;
              gpsPosition.longitude = lng;
              gpsPosition.accuracy = dataLngLatAccuracy;
              $("title").text(alt+","+lng + "," + lat + "," + dataLngLatAccuracy);
              last_gpsTime = gpsTime;
              /**当前位置点GPS坐标vector3对象 */
              let curpointGPS = new Vector3(lng,0.0,lat);
              if (
                Vector3.Distance(gpscpArry,curpointGPS)<=0.006527
                //gpsPosition.latitude <= gpscpArry.maxlatitude && gpsPosition.latitude >= gpscpArry.minlatitude && gpsPosition.longitude <= gpscpArry.maxlongitude && gpsPosition.longitude >= gpscpArry.minlongitude
                //NNavigation.g_pActiveList.length<=0
              ) {
                
                if (0) {
                  // OutdoorStatus = true;
                  // if (Vector3.Distance(CentrePoint,curpointGPS)<=0.00177){
                  //   gpsPosition.accuracy = 40;
                  //   OutdoorStatus = false;
                  //   //return false;
                  // } else {
                  //   rangeIn = false;
                  // }
                }else {
                  if (
                    gpsPosition.accuracy<=30){
                      $("title").text("okgeo:"+alt+"," + lng + "," + lat + "," + dataLngLatAccuracy);
                !Posfault && (Posfault = true, NNavigation.EnableLocate(true), NNavigation.g_pActiveList.length <= 0 && LockScene(), $(".lockScene").show(), showMockBtn());
                setgpsLocation(gpsPosition);
              } else{
                OutdoorStatus&&PLocation&&speed>1&&StepMock();
              }
            }
            }
          }else {
            if (PLocation&&speed>1){
              eqcount++
              if (eqcount<8){
                StepMock();
              }
            }
          }
        } else if (new Date().getTime() - resfloor.time>1000){
          IndoorStatus = false;
        }
    },
    function (e) {

    },
    {
        maximumAge: 0,
        enableHighAccuracy: true
    }
);
}
/**获取GPS坐标，地图内判断 */
function getGpsLocation() {
  wx.getLocation({
    type: 'gcj02', // 默认为wgs84的gps坐标，如果要返回直接给openLocation用的火星坐标，可传入'gcj02'
    success: function (res) {
    if(gpsPosition.longitude!=res.longitude&&gpsPosition.latitude!=res.latitude){
      eqcount = 0;
      gpsPosition.longitude = res.longitude; // 经度，浮点数，范围为180 ~ -180。
      gpsPosition.latitude = res.latitude; // 纬度，浮点数，范围为90 ~ -90
      // gpsPosition.longitude = 110.28852; // 经度，浮点数，范围为180 ~ -180。
      // gpsPosition.latitude = 25.273695; // 纬度，浮点数，范围为90 ~ -90
      gpsPosition.speed = res.speed; // 速度，以米/每秒计
      gpsPosition.accuracy = res.accuracy; // 位置精度
      // $("title").text(res.longitude + "," + res.latitude + "," + res.accuracy);
      if (res.accuracy>30){
        StepMock();
        return false
      }
      if (
        // 1
        //gpsPosition.accuracy<=90&&
        gpsPosition.latitude <= gpscpArry.maxlatitude && gpsPosition.latitude >= gpscpArry.minlatitude && gpsPosition.longitude <= gpscpArry.maxlongitude && gpsPosition.longitude >= gpscpArry.minlongitude
        &&NNavigation.g_pActiveList.length<=0
      ) {
        // $("title").text("okwx:" + res.longitude + "," + res.latitude + "," + res.accuracy);
        !Posfault && (Posfault = true, NNavigation.EnableLocate(true), $(".lockScene").show()) && NNavigation.g_pActiveList.length == 0 && LockScene();
        setgpsLocation(gpsPosition);
      } else {
        return false;
      }
    } else {
      if (PLocation){
        eqcount++
        if (eqcount<8){
          StepMock();
        }
      }
    }
    }
  });
}

var GDmap, geolocation;

function InitGDMap() {
  GDmap = new AMap.Map('GDcontainer', {
    resizeEnable: true
  });
  AMap.plugin('AMap.Geolocation', function () {
    geolocation = new AMap.Geolocation({
      enableHighAccuracy: true, //是否使用高精度定位，默认:true
      timeout: 10000000, //超过10秒后停止定位，默认：5s
      convert: true, //自动偏移坐标，偏移后的坐标为高德坐标，默认：true
      showButton: false, //显示定位按钮，默认：true
      showMarker: false, //定位成功后在定位到的位置显示点标记，默认：true
      showCircle: false, //定位成功后用圆圈表示定位精度范围，默认：true
      panToLocation: false, //定位成功后将定位到的位置作为地图中心点，默认：true
      zoomToAccuracy: false //定位成功后调整地图视野范围使定位位置及精度范围视野内可见，默认：false

    });
    GDmap.addControl(geolocation);

  });
}

var shili = {
  "beacons": [{
    major: 10008,
    minor: 57686,
    uuid: "FDA50693-A4E2-4FB1-AFCF-C6EB07647825",
    accuracy: "0.235344",
    rssi: "-66",
    proximity: "1",
    heading: "288.1355"
  }]
}
var GPSAcount = 0;
/**使用高德api获得GPS坐标，做地图区域判断 */
function getGpsLocationGD() {
  console.log("gaode GPS0");
  geolocation.getCurrentPosition(function (status, res) {
    // $.post("http://api.heshenghua.net/rpc/beancons/setBeancons", {
    //   'beancons': JSON.stringify(shili.beacons),
    //   // 'beancons': shili.beacons,
    //   complete: function () {
    //     console.log(JSON.stringify(shili.beacons));
    //   }
    // });
    console.log("gaode GPS1");
    if (status == 'complete') {
      console.log("gaode GPS");
      if (!PLocation||!gpsPosition.longitude||1){
        eqcount = 0;
        gpsPosition.longitude = res.position.lng; // 经度，浮点数，范围为180 ~ -180。
        gpsPosition.latitude = res.position.lat; // 纬度，浮点数，范围为90 ~ -90
        // gpsPosition.longitude = 110.28852; // 经度，浮点数，范围为180 ~ -180。
        // gpsPosition.latitude = 25.273695; // 纬度，浮点数，范围为90 ~ -90
        // gpsPosition.speed = res.speed; // 速度，以米/每秒计
        gpsPosition.accuracy = res.accuracy; // 位置精度
        // $("title").text(res.position.lng + "," + res.position.lat + "," + res.accuracy);
        if (!GPSaccuracy.accuracy) {
          GPSaccuracy.accuracy = gpsPosition.accuracy
        } else if (gpsPosition.accuracy>GPSaccuracy.accuracy) {
          if (GPSaccuracy.count>5){
            GPSaccuracy.count = 0;
            GPSaccuracy.accuracy = gpsPosition.accuracy;
          } else {
            GPSaccuracy.count++;
            return false;
          }
        } else {
          GPSaccuracy.count = 0;
        }
        if (GPSaccuracy.accuracy>90){
          //navigator.geolocation.clearWatch(GPSTimer);
          GPSTimer = setInterval(getGpsLocation,1000);
          return false;
        }
        if (
          // 1
          (gpsPosition.accuracy <= 30 || gpsPosition.accuracy <= GPSaccuracy) &&
          gpsPosition.latitude <= gpscpArry.maxlatitude && gpsPosition.latitude >= gpscpArry.minlatitude && gpsPosition.longitude <= gpscpArry.maxlongitude && gpsPosition.longitude >= gpscpArry.minlongitude
        ) {
            // $("title").text("okgd:" + res.position.lng + "," + res.position.lat + "," + res.accuracy);
            if (!Posfault) {
                Posfault = true;
                NNavigation.EnableLocate(true);
                $(".lockScene").show();
                showMockBtn();

                if (NNavigation.g_pActiveList.length == 0) {
                    LockScene();
                }
            }

            setgpsLocation(gpsPosition);
        } else {
            return false;
        }
      } else {
        eqcount++;
        if (PLocation&&eqcount<5){
          StepMock();
        }
      }
    } else {
      console.log(res);
    }
  });
}
var rangeCount = 0;
/**误差太大出现次数 */
var disablecount = 0;
/**GPS相同次数 */
var eqcount = 0;
/**获取GPS坐标，是否在体育馆范围内判断 */
function RangeInGps() {
  wx.getLocation({
    type: 'gcj02', // 默认为wgs84的gps坐标，如果要返回直接给openLocation用的火星坐标，可传入'gcj02'
    success: function (res) {
      if (res.accuracy<=30){
      let g = {
        x: 0.0,
        y: 0.0,
        z: 0.0
      };
      g.x = res.longitude; // 经度，浮点数，范围为180 ~ -180。
      g.y = res.latitude; // 纬度，浮点数，范围为90 ~ -90
      /**画圆心判断 */
      let CentrePoint = new Vector3(112.52985059057416, 0.0, 37.75731239593483);
      if (Vector3.Distance(g, CentrePoint) < 0.001806) {
        rangeCount = 0;
        return false;
      } else {
        if (rangeCount > 2) {
          return true;
        } else {
          rangeCount++;
          return false;
        }
      }
    }}
  });
}
var currentTime;
function setgpsLocation(position) {
  if ($("#msgBox").is(":visible")) {
    hideMsg();
    D("已切换室外定位", 1000);
  }
  let rellongitude = 0.0,
    relatitude = 0.0;
  let gpsParam = GLOBAL.GpsConfig.unit;
  rellongitude = -(position.longitude - gpsParam.centX) * gpsParam.unitX;
  relatitude = -(position.latitude - gpsParam.centY) * gpsParam.unitY;
  position.longitude = rellongitude;
  position.latitude = relatitude;
  //FilterGPSPoi(position);
  if (NNavigation.g_pActiveList.length > 0 && GLOBAL.Navigating){
    //$("title").text(curEndPath.num+","+curEndX+','+curEndY);
    if (!curEndX&&!curEndY||curEndPath.num!=NNavigation.g_pActiveList[0].m_nCurPath){
      let Nav;
      ( Nav =  NNavigation.g_pActiveList[0],
        curEndPath.num = Nav.m_nCurPath,
        curEndPath.status = false,
        curEndX = Nav.m_aPath[Nav.m_nCurPath].m_aPath[Nav.m_aPath[Nav.m_nCurPath].m_aPath.length-1].x,
        curEndY = Nav.m_aPath[Nav.m_nCurPath].m_aPath[Nav.m_aPath[Nav.m_nCurPath].m_aPath.length-1].z
      );
    } else if (curEndPath.num==NNavigation.g_pActiveList[0].m_nCurPath&&!curEndPath.status){
      let dt = 60;
      if (NNavigation.g_pActiveList[0].m_nCurPath >= NNavigation.g_pActiveList[0].m_aPath.length - 1) {
        calcDistance(rellongitude, relatitude, 5, dt);
      } else {
        switch (NNavigation.g_pActiveList.length > 0 && NNavigation.g_pActiveList[0].m_aPath[NNavigation.g_pActiveList[0].m_nCurPath].m_pEndPoint.m_mLandmark.Object.TypeName()
        ) {
          case "出入口":
            calcDistance(rellongitude, relatitude, 4,dt/2);
            break;
          case "楼梯":
            calcDistance(rellongitude, relatitude, 1,dt);
            break;
          case "电梯":
            calcDistance(rellongitude, relatitude, 2,dt);
            break;
          case "扶梯":
            calcDistance(rellongitude, relatitude, 3,dt);
            break;
          default:
        }
      }
    }
  }
  NNavigation.UpdateLocation(0, 0, new Vector3(rellongitude, 0.0, relatitude)); //外景的workid与floorid始终为0
  
  PLocation = {
    Work: 0,
    Layer: 0,
    Position: new Vector3(rellongitude, 0.0, relatitude)
  };
  GLOBAL.PLocation = PLocation;
//   var canvas=document.getElementsByTagName('canvas')[0];
//  var cxt=canvas.getContext("webgl2");
//  cxt.beginPath();
//  cxt.arc(PLocation.Position.x,PLocation.Position.z,50,0,360,false);
//  cxt.fillStyle="red";//填充颜色,默认是黑色
// cxt.fill();//画实心圆
// cxt.closePath();
  /**试图精准定位，然后数据量太大还不准 */
  // if (InitPosArry.length < 1) {
  //   NNavigation.UpdateLocation(0, 0, new Vector3(rellongitude, 0.0, relatitude)); //外景的workid与floorid始终为0
  //   PLocation = {
  //     Work: 0,
  //     Layer: 0,
  //     Position: new Vector3(rellongitude, 0.0, relatitude)
  //   };
  //   GLOBAL.PLocation = PLocation;
  //   //addDeviceMotion();
  //   recentTime = new Date().getTime();
  //   InitPosArry.push({
  //     x: rellongitude,
  //     y: relatitude,
  //     count: 0
  //   });
  // } else if (!InitPosStatus && InitPosArry.length < 30) {
  //   let poi = PosToRoad(rellongitude, relatitude);
  //   rellongitude = poi.x;
  //   relatitude = poi.z;
  //   let InitPos;
  //   /**找个可靠的点 */
  //   for (var i = InitPosArry.length - 1; i >= 0; i--) {
  //     if (InitPosArry[i].count > 0) {
  //       InitPos = InitPosArry[i];
  //       break;
  //     } else if (i == 0) {
  //       InitPos = InitPosArry[InitPosArry.length - 1];
  //     }
  //   }
  //   console.log("InitPos:", InitPos);
  //   /**与上次定位点相差不过distance时，进行传递定位点 */
  //   if (clacInitPos(rellongitude, relatitude, InitPos)) {
  //     NNavigation.UpdateLocation(0, 0, new Vector3(rellongitude, 0.0, relatitude)); //外景的workid与floorid始终为0
  //     PLocation = {
  //       Work: 0,
  //       Layer: 0,
  //       Position: new Vector3(rellongitude, 0.0, relatitude)
  //     };
  //     GLOBAL.PLocation = PLocation;
  //   }
  //   /**寻找当前定位点相邻的点 */
  //   for (let pos of InitPosArry) {
  //     if (clacInitPos(rellongitude, relatitude, pos)) {
  //       pos.count++;
  //       console.log("rangein pos:", pos);
  //       if (pos.count >= 3) {
  //         InitPosStatus = true;
  //         NNavigation.UpdateLocation(0, 0, new Vector3(pos.x, 0.0, pos.y)); //外景的workid与floorid始终为0
  //         PLocation = {
  //           Work: 0,
  //           Layer: 0,
  //           Position: new Vector3(pos.x, 0.0, pos.y)
  //         };
  //         GLOBAL.PLocation = PLocation;
  //         return false;
  //       }
  //     }
  //   }
  //   InitPosArry.push({
  //     x: rellongitude,
  //     y: relatitude,
  //     count: 0
  //   });
  //   /**确立起始点以后 */
  // } else {
  //   InitPosStatus = true;
  //   /**这里开始就启用模拟策略
  //    * 首先判定是否是走动的
  //    * 是的话才计算是否和上个点在范围内
  //    * 不在就模拟，在的话修正
  //    */
  //   if (NNavigation.g_pActiveList.length <= 0) {
  //     if (curStep.status) {
  //       let poi = PosToRoad(rellongitude, relatitude);
  //       rellongitude = poi.x;
  //       relatitude = poi.z;
  //       if (clacInitPos(rellongitude, relatitude, PLocation.Position)) {
  //         let distance, dif;
  //         recentTime = new Date().getTime();
  //         distance = Math.sqrt((rellongitude - PLocation.Position.x) * (rellongitude - PLocation.Position.x) + (relatitude - PLocation.Position.z) * (relatitude - PLocation.Position.z));
  //         dif = correctDis(distance);
  //         NNavigation.UpdateLocation(0, 0, new Vector3(PLocation.Position.x + dif.difX, 0.0, PLocation.Position.z + dif.difY)); //外景的workid与floorid始终为0
  //         console.log("truestatus:", PLocation.Position.x, PLocation.Position.z + dif.difY);
  //         PLocation = {
  //           Work: 0,
  //           Layer: 0,
  //           Position: new Vector3(PLocation.Position.x + dif.difX, 0.0, PLocation.Position.z + dif.difY)
  //         };
  //         GLOBAL.PLocation = PLocation;
  //       } else {
  //         if (new Date().getTime() - recentTime < 5500) {
  //           StepMock();
  //         } else {
  //           InitPosArry = [];
  //         }
  //       }
  //     } else {
  //       let poi = PosToRoad(rellongitude, relatitude);
  //       rellongitude = poi.x;
  //       relatitude = poi.z;
  //       NNavigation.UpdateLocation(0, 0, new Vector3(rellongitude, 0.0, relatitude)); //外景的workid与floorid始终为0
  //       PLocation = {
  //         Work: 0,
  //         Layer: 0,
  //         Position: new Vector3(rellongitude, 0.0, relatitude)
  //       };
  //       GLOBAL.PLocation = PLocation;
  //     }
  //   } else {
  //     //if (curStep.status) {
  //     if (clacInitPos(rellongitude, relatitude, PLocation.Position) || position.accuracy <= 31) {
  //       recentTime = new Date().getTime();
  //       NNavigation.UpdateLocation(0, 0, new Vector3(rellongitude, 0.0, relatitude)); //外景的workid与floorid始终为0
  //       PLocation = {
  //         Work: 0,
  //         Layer: 0,
  //         Position: new Vector3(rellongitude, 0.0, relatitude)
  //       };
  //       GLOBAL.PLocation = PLocation;
  //     } else {
  //       if (new Date().getTime() - recentTime < 5500) {
  //         StepMock();
  //       } else {
  //         InitPosArry = [];
  //       }
  //     }

  //   }
  // }
}
/**监听设备运动状态 */
function addDeviceMotion() {
  if (window.DeviceMotionEvent) {
    window.addEventListener('devicemotion', handleMotion);
  }
}

/**解除监听设备运动状态 */
function removeDeviceMotion() {
  if (window.DeviceMotionEvent) {
    window.removeEventListener('devicemotion', handleMotion);
  }
}

/**精益求精的圆 */
function clacInitPos(x, y, InitPos) {
  let radius = 15,
    distance = 0.0;
  if (InitPos.z) {
    distance = Math.sqrt((x - InitPos.x) * (x - InitPos.x) + (y - InitPos.z) * (y - InitPos.z));
  } else if (InitPos.y) {
    distance = Math.sqrt((x - InitPos.x) * (x - InitPos.x) + (y - InitPos.y) * (y - InitPos.y));
  } else {
    distance = 0;
  }
  if (distance < radius) {
    return true;
  } else {
    return false;
  }
}

var posList = [];//调试用 记录传入点
/**模拟步进 */
var StepMock = function () {
  /**怎么写
   * 最终--》NNavigation.update()
   * 得到两个的坐标值即可、
   * 拿到方向 然后计算 ojbk
   */
  console.log("step mock");
  var difX = 0.0,
    difY = 0.0,
    nAngle = linshi;
  while (nAngle > 360) {
    nAngle = nAngle - 360;
  }
    /**nnvigation */
    if (NNavigation.g_pActiveList.length>0){
    var Nav = NNavigation.g_pActiveList[0];
    if (curWayStart===null){
      curWayStart = Nav.m_nWayStart;
      mnAngle = Vector3.AngleTo(NNavigation.g_pActiveList[0].m_aPath[Nav.m_nCurPath].m_aPath[Nav.m_nWayEnd],NNavigation.g_pActiveList[0].m_aPath[Nav.m_nCurPath].m_aPath[Nav.m_nWayStart])
      console.log('angle',mnAngle);
    } else if (mnAngle===0){
      mnAngle = -Vector3.AngleTo(NNavigation.g_pActiveList[0].m_aPath[Nav.m_nCurPath].m_aPath[Nav.m_nWayEnd+1],NNavigation.g_pActiveList[0].m_aPath[Nav.m_nCurPath].m_aPath[Nav.m_nWayEnd])
      console.log('angle',mnAngle);
    }else{
      if (Nav.m_nWayStart!=curWayStart){
       mnAngle = -Vector3.AngleTo(NNavigation.g_pActiveList[0].m_aPath[Nav.m_nCurPath].m_aPath[Nav.m_nWayEnd],NNavigation.g_pActiveList[0].m_aPath[Nav.m_nCurPath].m_aPath[Nav.m_nWayStart])
       console.log('angle',mnAngle);
      }
    } 
  } else {
    while (nAngle > 360) {
      nAngle = nAngle - 360;
    }
    mnAngle = nAngle*0.017453293;
  }
  // while (nAngle > 360) {
  //   nAngle = nAngle - 360;
  // }
  // difX = Math.sin(0.017453293 * nAngle) * 1.8;
  // difY = Math.cos(0.017453293 * nAngle) * 1.8;
  difX = Math.sin(mnAngle) * 2.8;
  difY = Math.cos(mnAngle) * 2.8;
  if (!difX){
    difX = 0;
  }
  if (!difY)
    difY=0;

  console.log("position",PLocation.Position);
  NNavigation.UpdateLocation(0, 0, new Vector3(PLocation.Position.x+difX, 0.0, PLocation.Position.z+difY)); //外景的workid与floorid始终为0
  NNavigation.g_pActiveList.length>0&&console.log(NNavigation.g_pActiveList[0].m_nWayStep,"step");
  // posList.push(PLocation.Position);
  // if (posList.length>30){
  //   console.log(posList);
  // }
  return new Vector3(PLocation.Position.x+difX, 0.0, PLocation.Position.z+difY);
};

function correctDis(distance=1) {
  var difX = 0.0,
    difY = 0.0,
    nAngle = linshi;
  while (nAngle > 360) {
    nAngle = nAngle - 360;
  }
  difX = Math.sin(0.017453293 * nAngle) * distance;
  difY = Math.cos(0.017453293 * nAngle) * distance;
  return {
    difX,
    difY
  };
}
var curStep = {
  count: 0,
  status: false
};
var nowline = null;
var orline = [];
var linshi;
var curWayStart;
var mnAngle=null;
function handleMotion(event) {
  //$("title").text(event.accelerationIncludingGravity.x + "," + event.accelerationIncludingGravity.y + "," + event.accelerationIncludingGravity.z);
  /**进行判断 */
  var sqr = 0;
  sqr = Math.sqrt(event.accelerationIncludingGravity.x * event.accelerationIncludingGravity.x +
    event.accelerationIncludingGravity.y * event.accelerationIncludingGravity.y +
    event.accelerationIncludingGravity.z * event.accelerationIncludingGravity.z);
  if (nowline) { // 当存在初始值时才进行趋势判断
    if (sqr >= nowline) { // 如果获取到的计算后的加速度值 大于 上一个值
      orline.push(1); // 表明趋势增加，记录趋势值为1
      nowline = sqr; // 更新比较值
    } else if (sqr < nowline) { // 如果小于的话
      orline.push(-1); // 表明趋势减少，记录趋势值为-1
      nowline = sqr; // 更新比较值
    }
  } else { // 初始值不存在时，记录当前的数据，并将当前的趋势值记录为0
    nowline = sqr;
    orline.push(0);
  }

  watchPause();
}
var step = 1;

/**计步器实际调用情况 */
function watchPause() {
  if (orline.length > 75) {//60次约1秒调用一次
    console.log("***计步器调用***");
    var x = 0, y = 0;
    for (var i = 0; i < orline.length; i++) {
      if (orline[i] == 1) {
        x++;
        y = 0;
        x >= 5 ? (step++, curStep.status = true) : (step = step);
      } else if (orline[i] == -1) {
        x = 0;
        y++;
      }
    }
    if (1
      //parseInt(step / 2) > curStep.count
    ) {
        curStep.count = Math.floor(step / 2);
      console.log("计步+1",step,curStep.count);
      if (StepMock)
        StepMock();
    } else {
      curStep.status = false;
    }
    orline = [];
  }
}

/**将位置点移动到路径上 */
function PosToRoad(x, y) {
  let poi = new Vector3(x, 0.0, y);
  /**先获取最近的两个位置点 */
  let PosArry = [];
  if (NearistArr.length > 1) {
    if (Vector3.Distance(poi, NearistArr[0].p) > NearistArr[0].d) {
      NearistArr[0].d = Vector3.Distance(poi, NearistArr[0].p);
      NearistArr.reverse();
    } else {
      NearistArr[0].d = Vector3.Distance(poi, NearistArr[0].p);
    }
    if (x <= NearistArr[0].p.x || y <= NearistArr[0].p.z) {
      PosArry = [NearistArr[0].p, NearistArr[1].p];
    } else {
      NearistArr.pop();
      return poi;
    }
  } else {
    FindNearistPoint2L(poi);
    return poi;
  }
  let A = (PosArry[0].z - PosArry[1].z) / (PosArry[0].x - PosArry[1].x);
  let B = PosArry[0].z - A * PosArry[0].z;
  let m = x + A * y;

  let Rx = m - (A + B) / (A * A + 1);
  let Ry = A * Rx + B;
  console.log("return postoroad", x, y, Rx, Ry);

  return new Vector3(Rx, 0.0, Ry);
}

var NearistArr = [];
/**找到最近距离的两个点 */
function FindNearistPoint2L(position) {
  console.log("findNearistPoi", NearistArr);
  let first = false;
  for (let pLandmark of NavChartDC.DC.m_pLayerMgr.m_pActiveLayer.m_mLandmarkList) {
    if (NearistArr.length < 1) {
      NearistArr.push({
        p: pLandmark.m_mPoint.Object.m_mPosition,
        d: Vector3.Distance(pLandmark.m_mPoint.Object.m_mPosition, position)
      });
    } else if (NearistArr.length < 2) {
      let dt = Vector3.Distance(pLandmark.m_mPoint.Object.m_mPosition, position);
      if (dt >= NearistArr[0].d && pLandmark.m_mPoint.Object.m_mPosition != NearistArr[0].p) {
        NearistArr.push({
          p: pLandmark.m_mPoint.Object.m_mPosition,
          d: dt
        });
      } else if (pLandmark.m_mPoint.Object.m_mPosition != NearistArr[0].p) {
        NearistArr.unshift({
          p: pLandmark.m_mPoint.Object.m_mPosition,
          d: dt
        });
      }
    } else {
      if (Vector3.Distance(pLandmark.m_mPoint.Object.m_mPosition, position) < NearistArr[0].d) {
        first = true;
        NearistArr.pop();
        NearistArr.unshift({
          p: pLandmark.m_mPoint.Object.m_mPosition,
          d: Vector3.Distance(pLandmark.m_mPoint.Object.m_mPosition, position)
        });
      }
    }
  }
  if (!first) {
    for (let pLandmark of NavChartDC.DC.m_pLayerMgr.m_pActiveLayer.m_mLandmarkList) {
      if (Vector3.Distance(pLandmark.m_mPoint.Object.m_mPosition, position) < NearistArr[1].d && pLandmark.m_mPoint.Object.m_mPosition != NearistArr[0].p) {
        NearistArr.pop();
        NearistArr.push({
          p: pLandmark.m_mPoint.Object.m_mPosition,
          d: Vector3.Distance(pLandmark.m_mPoint.Object.m_mPosition, position)
        });
      }
    }
  }
}

/**对于GPS定位的约束方法 */
function LimitGPS() {

}

/**过滤精度大的值 */
function FilterGPSPoi (gpsPosition) {
  /**几个点，拿到的第一个精度<=30的为基准数据，之后每个30一下的数据先做相交测试，成功做为基准数据
   * 大于30的做相交计算，拿到相交点，半径为精度值，然后更新基准数据
   * 先这么做
   */
  let mGPSpiont;
  if (!PLocation){
    if (gpsPosition.accuracy<=30){
      PLocation = {
        Work:0,
        Layer:0,
        Position:new Vector3(gpsPosition.longitude,0.0,gpsPosition.latitude)
      }
      GLOBAL.PLocation = PLocation;
      NNavigation.UpdateLocation(0,0,PLocation.Position);
    }
    /**如果有一直没得30的情况 遇到了再说吧 */
  }else {
    mGPSpiont = new Vector3(gpsPosition.longitude,0.0,gpsPosition.latitude);
    /**小于30时情况 */
    if (gpsPosition.accuracy<=15){
      let mPointDis = Vector3.Distance(PLocation.Position,mGPSpiont);
      if (mPointDis<=10){
        console.log("distance小于15");
        PLocation = {
          Work:0,
          Layer:0,
          Position:new Vector3(gpsPosition.longitude,0.0,gpsPosition.latitude)
        }
        GLOBAL.PLocation = PLocation;
        NNavigation.UpdateLocation(0,0,PLocation.Position);
      } else {
        console.log("distance 大于15小于30");
        /**相交后的交点 */
        let cPoint;
        cPoint=CrossPoint(mGPSpiont,gpsPosition.accuracy);
        if (cPoint) {
          PLocation = {
            Work:0,
            Layer:0,
            Position:new Vector3(cPoint.x,0.0,cPoint.z)
          }
          GLOBAL.PLocation = PLocation;
          NNavigation.UpdateLocation(0,0,PLocation.Position);
        } else {
          let mockPos;
          mockPos=StepMock();
          PLocation = {
            Work:0,
            Layer:0,
            Position:mockPos
          }
          GLOBAL.PLocation = PLocation;
        }
      }
    }
    /**大于30的情况 */
    else {
      let cPoint;
        cPoint=CrossPoint(mGPSpiont,gpsPosition.accuracy/2);
        if (cPoint) {
          PLocation = {
            Work:0,
            Layer:0,
            Position:new Vector3(cPoint.x,0.0,cPoint.z)
          }
          GLOBAL.PLocation = PLocation;
          NNavigation.UpdateLocation(0,0,PLocation.Position);
        } else {
          StepMock();
        }
    }
  }
}

/**两点做相交，PLocation一直为基准点 */
function CrossPoint (Point,acc) {
  let mPointDis = Vector3.Distance(Point,PLocation.Position);
  /**先算有没有相交点，没有就count */
  if (mPointDis>acc+15+disablecount*10){
    if (disablecount>=5){
      let MockPoint;
      MockPoint = StepMock();
      return MockPoint;
    }
    disablecount++;
    StepMock();
    return null;
  }
  /**先得到两个点，然后拿靠近两圆心的中点的那个点 */
  else {
    let C0,C1,C2;
    let x0,x1,x2,y0,y1,y2;
    let pointcX,pointcY,pointdX,pointdY;
    let a,h;
    a = (225-acc*acc+mPointDis*mPointDis)/(2*mPointDis);
    h = Math.sqrt(225-a*a);
    if (isNaN(h))
    h=0;
    x1 = PLocation.Position.x;
    x2 = Point.x;
    y1 = PLocation.Position.z;
    y2 = Point.z;
    x0 = x1+(a/mPointDis)*(x2-x1);
    y0 = y1+(a/mPointDis)*(y2-y1);
    C0 = new Vector3(x0,0.0,y0);
    pointcX = x0-(h/mPointDis)*(y2-y1);
    pointcY = y0 - (h/mPointDis)*(x2-x1);
    pointdX = x0 + (h/mPointDis)*(y2-y1);
    pointdY = y0 + (h/mPointDis)*(x2-x1);
    C1 = new Vector3(pointcX,0.0,pointcY);
    C2 = new Vector3(pointdX,0.0,pointdY);
    if (Vector3.Distance(C0,C1)<=Vector3.Distance(C0,C1)){
      console.log("c1",C1,x0,y0,a,h,mPointDis);
      return C1;
    } else {
      console.log("C2",C2);
      return C2;
    }
  }
}

/**检测是否还有蓝牙 */
function checkBLE () {
  if (IndoorStatus){
    if (new Date().getTime() - resfloor.time>2000){
      if (NNavigation.g_pActiveList.length>0){
        if(NNavigation.g_pActiveList[0].m_aPath[NNavigation.g_pActiveList[0].m_aPath.length-1].m_pLayerName=="5F"&&new Date().getTime() - resfloor.time>8000){
          IndoorStatus = false;
          D("请重新规划室外导航路线",1000);
        }
      }else {
        IndoorStatus = false;
      }
    }
    checkBLE();
  }
}

/**GPS导航采用完全模拟导航
 * 如何知晓转弯
 * 
 */
function GPSNavigation () {
  // if (GPSTimer) {
  //   console.log("切换模拟导航");
  //   navigator.geolocation.clearWatch(GPSTimer);
  //   GPSTimer = "GPS";
  //   addDeviceMotion();
  //   StepMock();
  // }
}

function GPSNavigationEnd () {
  // if (GPSTimer == "GPS"){
  //   console.log("恢复定位");
  //   removeDeviceMotion();
  //   GPSTimer = setInterval(getGpsLocationGD, 1000);
  // }
}
/**GPS参数申明 */
var last_lat, lat;
var last_lng, lng;
var last_alt, alt;
var last_gpsTime, gpsTime;
lat = last_lat = 0;
lng = last_lng = 0;
alt = last_alt = 0;
//gpsTime = last_gpsTime = new Date().getTime();
var dataLngLatAccuracy = 0;
var dataAltAccuracy = 0
var angle = 0;
var speed = 0;

var tempCount = 0;
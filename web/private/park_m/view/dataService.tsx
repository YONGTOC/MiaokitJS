import FindLease from 'findLease';

class DataService {

  public componentDidMount() {
    console.log(localStorage.getItem("token"));

    // this.setToken = this.setToken.bind(this);
  }

  // 点击地图点，获取回调
  public callback(a, pBack) {
    console.log("callback1", a);
    //$.ajax({
    //    url: '',
    //    data: { "a": a },
    //    success: function (data) {
    //        if (!data) {
    //            pBackajax(data);
    //        };
    //    }
    //})
    pBack("callback")
  }

  // 2.(注册登录模块)用户登陆接口  
  public login() {
    $.ajax({
      url: this.state.rooturl + '/api/login',
      data: {
        "username": "admin",
        "password": "admin",
      },
      type: "post",    
      success: function (data) {
        localStorage.setItem("token", data.token);
        }
    })

    //返回数据存储
    let userName = "王铁柱"
    localStorage.setItem("userName", userName);

    let phone = "15296811111"
    localStorage.setItem("phone", phone);

    let userid = "1008112"
    localStorage.setItem("userid", userid);

    let enterprises = [
      {
        "id": "1009",
        "name": "力拓科技",
      },
      {
        "id": "1003",
        "name": "永拓拓科技",
      }
    ]
    localStorage.setItem("enterprises", JSON.stringify(enterprises));

     //获取：
   // var arr = JSON.parse(localStorage.getItem("arr"));
  }

  //  原有token过期，换取新 token
  public refreshToken(ytoken) {
    //  /api/refresh ?token=ytoken；
    //获取到ntoken，存localStorage.setItem("token", data.access_token);
    $.ajax({
      url: this.state.rooturl + '/api/refresh',
      data: {
        "token": ytoken,
      },
      type: "post",
      success: function (data) {
        // console.log("login",data);
        //pBackajax(data);
        console.log("login-getToken", data);
        //localStorage.setItem("token", data.token);
      }
    })
  }

  //4.(园区信息-3D显示)获取园区详细信息
  public getParkInfo(pBack, park_id) {
    let thetoken = localStorage.getItem("token");
    //$.ajax({
    //  url: this.state.rooturl + '/api/getParkInfo',
    //  data: {
    //    "park_id": 1,
    //    "token": thetoken,
    //  },
    //  type: "get",
    //  success: function (data) {
    //    console.log("getParkInfo", data);
    //    if (data.status == 113) {
    //      // 113 token到期，跳转登录页面
    //      // console.log(window.location.pathname);
    //      //  window.location.href = window.location.pathname+"#/"
    //    } else {
    //     // pBack(data);
    //      console.log("getParkInfo", data);
    //    }
    //  }
    // })


    var data = {
      //错误码
      "return_code": "100",
      "response": [
        {
          //id
          "id": "1009",
          //园区图像url
          "headimgurl": "http://xxx.jpg",
          //所在城市
          "province": "桂林",
          //经度
          "longitude": "10.55",
          //纬度
          "latitude": "66.666",
          //园区名字
          "name": "桂林国家高新",
          //地址
          "address": "桂林七星朝阳路D-11",
          //工程列表，列表内为园区使用的工程。
          "project": [
            {
              //id
              "id": "1009",
              //工程名。
              "name": "电子信息",
              //工程类型 1为普通模型 2为航拍实景图 3为sve工程 4为其它
              "type": 1,
              //使用类型 1为完整场景 2为单独内景
              "use_type": 0,
              //工程地址
              "project_url": "http://xxx.bin",
              //经度
              "longitude": "10.55",
              //纬度
              "latitude": "66.666",
              //偏移值
              "offset": "10,20,10",
              //旋转角度
              "rotate": "10",
            }
          ],
          //园区讲解列表
          "audio": [
            { name: "园区交通", url: "http://downsc.chinaz.net/Files/DownLoad/sound1/201906/11582.mp3" },
            { name: "园区配套", url: "http://downsc.chinaz.net/files/download/sound1/201206/1638.mp3" },
            { name: "园区建筑", url: "http://downsc.chinaz.net/Files/DownLoad/sound1/201906/11582.mp3" },
          ]
        }

      ],
      //错误代码信息
      "err_msg": ""
    }

    pBack(data);
  }

  // 5. (企业园区模块-搜索类型)获取园区下面企业类型列表
  public getCompanyType(pBack, park_id) {
    // id =1
    let thetoken = localStorage.getItem("token");
    $.ajax({
      url: this.state.rooturl + '/api/getCompanyType',
      data: {
        "park_id": park_id,
        "token":thetoken,
      },
      type: "get",    
      success: function (data) {
        console.log("5-企业类型列表",data);
        pBack(data);
        }
    })
  }

  //6 通过园区id，企业类型，关键词搜索园区下面企业列表
  public findCompany(pBack, park_id, company_type_id, companyName) {
    // id=1
    // console.log("findCompany", park_id, company_type_id, name);
    let thetoken = localStorage.getItem("token");
    $.ajax({
      url: this.state.rooturl + '/api/findCompany',
      data: {
        "park_id": 1,
        "company_type_id": company_type_id,
        "token": thetoken,
        "name": companyName
      },
      type: "get",
      success: function (data) {
        console.log("findCompany企业列表", data);
        if (data.status == 113) {
          // 113 token到期，跳转登录页面
         // console.log(window.location.pathname);
         //  window.location.href = window.location.pathname+"#/"
        } else {
          pBack(data);
          console.log("fin企业列表", data);
        }
      }
    })
  }

  //7 通过企业id, 获企业详细信息
  public getCompanyInfo(pBack, id) {
    // id=2 模拟id
    console.log("getCompanyInfo", pBack, id);
    let thetoken = localStorage.getItem("token");
    $.ajax({
      url: this.state.rooturl + '/api/getCompanyInfo',
      data: {
        "id": id,
        "token": thetoken,
      },
      type: "get",
      success: function (data) {
        if (data.status == 113) {
          // 113 token到期，跳转登录页面
         // console.log(window.location.pathname);
         //  window.location.href = window.location.pathname+"#/"
        } else {
          pBack(data);
          console.log("CompanyInfo_ajax, 获企业详细信息", data);
        }
      }
    })

  }

  //8 通过园区id, 获取面积分类
  public getRoomRentSquareType(pBack, park_id) {
    console.log("init-AllareaType", pBack, park_id);
    // console.log("findCompany", park_id, company_type_id, name, token);
    let thetoken = localStorage.getItem("token");
    $.ajax({
      url: this.state.rooturl + '/api/getRoomRentSquareType',
      data: {
        "park_id": 1,
        "token": thetoken,
      },
      type: "get",
      success: function (data) {
        //  console.log("getRoomRentSquareType", data);
        if (data.status == 113) {
          // 113 token到期，跳转登录页面
          // console.log(window.location.pathname);
          //  window.location.href = window.location.pathname+"#/"
        } else {
          pBack(data);
          //console.log("getRoomRentSquareType", data);
        }
      }
     });

  }

  //9 通过园区id, 获取招租的场地列表接口(findRoomRent);
  public findRoomRentByparkid(pBack, park_id, square) {
    // id =1
    console.log("findRoomRentByparkid", pBack, park_id, square);
    let thetoken = localStorage.getItem("token");
    $.ajax({
      url: this.state.rooturl + '/api/findRoomRent',
      data: {
        "park_id": park_id,
        "token": thetoken,
        "square": square
      },
      type: "get",
      success: function (data) {
        console.log("getfindRoomRent", data);
        if (data.status == 113) {
          // 113 token到期，跳转登录页面
          // console.log(window.location.pathname);
          //  window.location.href = window.location.pathname+"#/"
        } else {
          pBack(data);
          console.log("findRoomRentByparkid", data);
        }
      }
    })
 
  }

  //10 通过招租id,获取租房信息列表接口(getRoomRentInfo)
  public findRoomRentByroomid(pBack, id) {
    console.log("findRoomRentByroomid-jxxxxxxxxxxxx", id);
    let thetoken = localStorage.getItem("token");
    $.ajax({
      url: this.state.rooturl + '/api/getRoomRentInfo',
      data: {
        "id": id,
        "token": thetoken,
      },
      type: "get",
      success: function (data) {
        //console.log("getRoomRentSquareType", data);
        if (data.status == 113) {
          // 113 token到期，跳转登录页面
          // console.log(window.location.pathname);
          //  window.location.href = window.location.pathname+"#/"
        } else {
          pBack(data);
          console.log("findRoomRentByroomid", data);
        }
      }
    })

  }

  //11.(随手拍模块-曝光类型) 通过园区id获取随手拍曝光类型 
  public getTakingPhotosType(pBack, park_id) {
    console.log("getTakingPhotosType", pBack, park_id);
    var data = {
      //错误码
      "return_code": "100",
      "response": [
        {
          //id
          "id": "1009",
          //名称。
          "name": "阻挡主要出入口",
        },
        {
          //id
          "id": "1009",
          //名称。
          "name": "非停车位侧停车",
        }
      ],
      //错误代码信息
      "err_msg": ""
    }
    pBack(data);
  }

  //12.(随手拍模块-列表)通过园区id获取随手拍列表 
  public getTakingPhotos(pBack, park_id, name) {
    console.log("随手拍list", park_id, name);
    let data = {
      //错误码
      "return_code": "100",
      "response": [
        {
          //id
          "id": "1009",
          //类型id
          "type": "非停车位侧停车",
          //车牌
          "car_license": "桂C123456",
          //申请时间
          "time": "2020-02-28 14:38:15",
          //位置
          "position": "A座厦门旁",
          //经度
          "longitude": "10.55",
          //纬度
          "latitude": "66.666",
          //照片
          "photo": "./park_m/image/i.png"
        }, {
          //id
          "id": "1009",
          //类型id
          "type": "非停车位侧停车",
          //车牌
          "car_license": "桂C120000",
          //申请时间
          "time": "2020-02-28 14:38:15",
          //位置
          "position": "A座厦门旁",
          //经度
          "longitude": "10.55",
          //纬度
          "latitude": "66.666",
          //照片
          "photo": "./park_m/image/i.png"
        }
      ],
      //错误代码信息
      "err_msg": ""
    }
    pBack(data);
  }

  //13.(随手拍模块-列表-详情) 通过随手拍id获取随手拍详细信息 
  public getTakingPhotoInfo(pBack, id) {
    console.log("随手拍list", id);
    let data = {
      //错误码
      "return_code": "100",
      "response": {
        //id
        "id": "1009",
        //类型名称
        "type_name": "非停车位侧停车",
        //车牌
        "car_license": "桂A5000",
        //申请时间
        "time": "2020-02-28 14:38:15",
        //位置
        "position": "A座厦门旁",
        //经度
        "longitude": "10.55",
        //纬度
        "latitude": "66.666",
        //描述
        "descript": "横跨在斑马线上",
        //违规照片
        "photo": "./park_m/image/i.png",
      },
      //错误代码信息
      "err_msg": ""
    }
    pBack(data);
  }

  // 14.(随手拍模块-提交)提交随手拍信息
  public postTakingPhotoInfo(pBack, data) {
    let theData = {
      "park_id": localStorage.getItem("park_id"),
      "type_id": data.type_id,
      "car_license": data.car_license,
      "time": data.time,
      "position": data.position,
      "longitude": data.longitude,
      "latitude": data.latitude,
      "descript": data.descript,
      "photo": data.files[0].url,
    }
    console.log("postTakingPhotoInfo", theData);
    pBack("随手拍提交完成");
  }

  // 15.2(摆点申请模块)提交摆点申请接口 
  public postAdvertisementPoint(pBack, data) {
    //console.log("postAdvertisementPoint", data);
    let datas = {
      'park_id': localStorage.getItem("park_id"),
      'staff_id': data.staff_id,
      "staff_name": data.applicant,
      "phone": data.phone,
      "company_id": data.company_id,
      "company": data.company,
      "content": data.content,
      "positions": data.applyList
    };
    let thedata = JSON.stringify(datas)
      $.ajax({
        url: this.state.rooturl2 + '/api/postAdvertisementPoint',
        data: thedata,
        type: "post",
        dataType: "json",
      success: function (data) {
         console.log("getRoomRentSquareType", data);
        if (data.status == 113) {
          // 113 token到期，跳转登录页面
          // console.log(window.location.pathname);
          //  window.location.href = window.location.pathname+"#/"
        } else {
          //pBack("摆点申请提交完成");
          //console.log("getRoomRentSquareType", data);
        }
        if (data.return_code == 100) {
          pBack("摆点申请提交完成");
        }
      }
     });
  }

  //16.(场地预定模块-搜索)通过园区id获取园区内可以预定的场地列表接口
  public getRoomBook(pBack, park_id, name) {
    console.log("getRoomBook", pBack, park_id, name);
    let theurl
    if (name && name!=="搜索") {
       theurl = this.state.rooturl2 + '/api/getRoomBook/' + 1 + '/' + name
    } else {
       theurl= this.state.rooturl2 + '/api/getRoomBook/' + 1 
    }
    $.ajax({
      url: theurl,
      type: "get",
      success: function (data) {
        //console.log("getRoomBookajax", data);
        if (data.status == 113) {
          // 113 token到期，跳转登录页面
          // console.log(window.location.pathname);
          //  window.location.href = window.location.pathname+"#/"
        } else {
          let dataJ = JSON.parse(data);
          //console.log("getRoomBookajax", dataJ);
          pBack(dataJ);
         
        }
      }
     });
  }

  //##17.(场地预单模块-详细信息)通过场地预定id,获取预定相关详情接口 ###
  public getRoomBookInfo(pBack, id) {
    //console.log("getRoomBookInfo", id);
    $.ajax({
      url: this.state.rooturl2 + '/api/getRoomBookInfo'+"/"+id,
      type: "get",
      success: function (data) {
        console.log("getRoomBookInfoajax", data);
        if (data.status == 113) {
          // 113 token到期，跳转登录页面
          // console.log(window.location.pathname);
          //  window.location.href = window.location.pathname+"#/"
        } else {
          let dataJ = JSON.parse(data);
            //console.log("getRoomBookInfoajax", data);
          pBack(dataJ);
        }
      }
    });

  }

  //##18.(场地预定模块-提交信息)提交场地预定申请 ###
  public bookingRoom(pBack, data) {
  //  console.log("bookingRoom", data);
   // console.log("bookingRoom", data.room_id)
   // pBack("提交成功！");
    let datas = {
      'park_id': localStorage.getItem("park_id"),
      'staff_id': data.staff_id,
      "staff_name": data.applicant,
      "phone": data.phone,
      "company_id": data.company_id,
      "company": data.company,
      "room": data.room_name,
      "building_id": data.building_id,
      "floor_id": data.floor_id,
      "room_id": data.room_id,
      "start_date": data.start_date,
      "end_date": data.end_date,
      "theme": data.theme,
      "content": data.content,
    }

    let thedata = JSON.stringify(datas)
   // console.log("提交场地预定", thedata);
    $.ajax({
      url: this.state.rooturl2 + '/api/BookingRoom',
      data: thedata,
      type: "post",
      dataType: "json",
      success: function (data) {
        console.log("BookingRoom", data);
        if (data.status == 113) {
          // 113 token到期，跳转登录页面
          // console.log(window.location.pathname);
          //  window.location.href = window.location.pathname+"#/"
        } else {
          //pBack("摆点申请提交完成");
          //console.log("BookingRoom", data);
        }
        if (data.return_code == 100) {
          pBack("场地预定申请完成");
        }
      }
    });
  }

  //19.(在线报修模块-报修类型)通过园区id获取在线报修类型
  public getRepairType(pBack) {
    $.ajax({
      url: this.state.rooturl2 + '/api/getRepairType',
      type: "get",
      success: function (data) {
        console.log("getRepairType", data);
        let dataJ = JSON.parse(data);
        console.log("getRepairType", dataJ);
        //if (data.status == 113) {
        //  // 113 token到期，跳转登录页面
        //  // console.log(window.location.pathname);
        //  //  window.location.href = window.location.pathname+"#/"
        //} else {
        //  //pBack("摆点申请提交完成");
        //  //console.log("getRoomRentSquareType", data);
        //}
        if (dataJ.return_code == 100) {
          pBack(dataJ);
        }
      }
    });

  }

  //20.(在线报修模块-提交)提交在线报修信息
  public saveRepairInfo(pBack, data) {
    let datas = {
      'park_id': localStorage.getItem("park_id"),
      "type_id": data.type_id,
      "position": data.position,
      "longitude": data.longitude,
      "latitude": data.latitude,
      "building_id": data.building_id,
      "floor_id": data.floor_id,
      "room_id": data.room_id,
      "room": data.room,
      "company_id": data.company_id,
      "company": data.company,
      'staff_id': data.staff_id,
      "staff_name": data.contact,
      "phone": data.phone,
      "descript": data.descript,
      "img_url": data.files[0].url
    }
    console.log("saveRepairInfo", datas);
    let thedata = JSON.stringify(datas)
    $.ajax({
      url: this.state.rooturl2 + '/api/saveRepairInfo',
      data: thedata,
      type: "post",
      dataType: "json",
      success: function (data) {
        console.log("saveRepairInfo", data);
        if (data.status == 113) {
          // 113 token到期，跳转登录页面
          // console.log(window.location.pathname);
          //  window.location.href = window.location.pathname+"#/"
        } else {
          //pBack("摆点申请提交完成");
          //console.log("getRoomRentSquareType", data);
        }
        if (data.err_msg == "请求成功") {
          pBack("场地预定申请完成");
        }
      }
    });
  }

  //22.(停车业务模块-地下停车场列表)通过园区id获取停车场列表
  public getParkingList(pBack, park_id) {
    let data = {
      //错误码
      "return_code": "100",
      "response": [
        {
          //id
          "id": "100001",
          //名称。
          "name": "a座地下停车场",
          //经度
          "longitude": "10.55",
          //纬度
          "latitude": "66.666",
        },
        {
          //id
          "id": "100002",
          //名称。
          "name": "b座地下停车场",
          //经度
          "longitude": "10.55",
          //纬度
          "latitude": "66.666",
        }
      ],
      //错误代码信息
      "err_msg": ""
    }

    pBack(data);
  }

  //23.(停车业务模块-车辆类型)通过园区id获取车辆类型 
  public getCarType(pBack, park_id) {
    console.log("显示车辆类型列表");
    let data = {
      //错误码
      "return_code": "100",
      "response": [
        {
          //id
          "id": "1009",
          //名称。
          "name": "中小型车",
        },
        {
          //id
          "id": "1009",
          //名称。
          "name": "大型车",
        }
      ],
      //错误代码信息
      "err_msg": ""
    }
    pBack(data);
  }

  // 24.(停车业务模块-车位申请)提交车位申请信息
  public saveParkingApply(pBack, data) {
    let thedata = {
      'park_id': localStorage.getItem("park_id"),
      "car_license_color": data.car_license_color,
      "car_license": data.car_license,
      "applicant": data.applicant,
      "phone": data.phone,
      "company": data.company,
      "company_address": data.company_address,
      "car_owner": data.car_owner,
      "car_brand": data.car_brand,
      "car_model": data.car_model,
      "car_color": data.car_color,
      "car_type": data.car_type,
    }
    console.log("24提交车位申请信息", thedata);
   // pBack("车位，提交成功！");
  }

  // 25.(停车业务模块-地库车位预约)提交地库车位预约
  public saveParkingAppointment(pBack, data) {
    let thedata = {
      'park_id': localStorage.getItem("park_id"),
      "car_license_color": data.car_license_color,
      "car_license": data.car_license,
      "applicant": data.applicant,
      "phone": data.phone,
      "company": data.company,
      "company_address": data.company_address,
      "car_owner": data.car_owner,
      "car_brand": data.car_brand,
      "car_model": data.car_model,
      "car_color": data.car_color,
      "car_type": data.car_type,
      "underground_parking_id": data.underground_parking_id,
      "underground_parking_name": data.underground_parking_name,
    }
    console.log("25提交地库申请信息", thedata);
  //  pBack("地库，提交成功！");
  }

  // 26.(停车业务模块-车位变更)提交车位变更（目前：变更车辆，不变更车位） 
  public changeParkingCarInfo(pBack, data) {
    let thedata = {
      'park_id': localStorage.getItem("park_id"),
      "car_license_color": data.car_license_color,
      "car_license": data.car_license,
      "applicant": data.applicant,
      "phone": data.phone,
      "company": data.company,
      "company_address": data.company_address,
      "car_owner": data.car_owner,
      "car_brand": data.car_brand,
      "car_model": data.car_model,
      "car_color": data.car_color,
      "car_type": data.car_type,
      "orgin_car_license_color": data.orgin_car_license_color,
      "orgin_car_license": data.orgin_car_license,
      "orgin_car_owner": data.orgin_car_owner,
      "orgin_phone": data.orgin_phone,
    }
    console.log("26 提交车位变更", thedata);
    pBack("提交车位变更,成功！")
  }

  //27.(停车业务模块-来访车辆预约)提交来访车辆预约
  public saveVisitorParkingAppointment(pBack, data) {
    let thedata = {
      'park_id': localStorage.getItem("park_id"),
      "car_license_color": data.car_license_color,
      "car_license": data.car_license,
      "applicant": data.applicant,
      "phone": data.phone,
      "company": data.company,
      "underground_parking_id": data.underground_parking_id,
      "underground_parking_name": data.underground_parking_name,
      "start_time": data.start_time,
      "end_time": data.end_time,
    }
    console.log("27 提交来访车辆预约", thedata);
    pBack("提交来访车辆预约,成功！")
  }

  //94.(我的个人中心-房间管理-楼宇楼层房间列表)通过园区的id，获取园区大楼，及大楼下楼层，及楼层下房间列表 
  public getParkBuildingInfo(pBack) {
    $.ajax({
      url: this.state.rooturl + '/api/getParkBuildingInfo',
      data: {
        id: 1001,
        park_id: 1001,
        token: localStorage.getItem("token")
      },
      type: "get",
      success: function (data) {
        pBack(data)
      }
    })
  }

  public state = {
    //rooturl: "http://192.168.1.13:90",  //wl

    rooturl: "http://parkadmin.yongtoc.com",  //wl
    rooturl2: "http://192.168.1.30:8002", //qjf
    rooturl3: "http://192.168.1.27:89", //twl

    token: "",

  }
}

export default DataService;
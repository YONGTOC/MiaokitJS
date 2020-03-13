import FindLease from 'findLease';

class DataService {

  public componentDidMount() {
    console.log(localStorage.getItem("token"));

   // this.setToken = this.setToken.bind(this);
  }

  //public setToken() {
  //  this.setState({
  //    this.state.token = localStorage.getItem("token");
  //  })
  //}

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

  // 2.2.(注册登录模块)用户登陆接口 ### email:test@test.com password:123456 
  public login(pBackajax) {
    console.log("login");
        $.ajax({
          url: this.state.rooturl + '/api/login',
          data: {
            "email": "test@test.com",
            "password":123456
          },
      type: "post",    
      success: function (data) {
       // console.log("login",data);
        //pBackajax(data);
        console.log("login-getToken", data);
        localStorage.setItem("token", data.token);
        }
    })

  //  pBackajax(data);
  }

  // 原有token过期，换取新 token
  public refreshToken(ytoken) {
    //  /api/refresh ?token=ytoken；
    //获取到ntoken，存localStorage.setItem("token", data.access_token);
    $.ajax({
      url: this.state.rooturl + '/api/refresh',
      data: {
        "token": ytoken ,
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

  // 5. (企业园区模块-搜索类型)获取园区下面企业类型列表
  public getCompanys(pBackajax, park_id) {

    //$.ajax({
    //  url: this.state.rooturl + '/api/getCompanyType',
    //  data: { "park_id": 1001 },
    //  type: "get",    
    //  success: function (data) {
    //    console.log("TTTTTTTTTT",data);
    //        if (!data) {
    //            pBackajax(data);
    //        };
    //    }
    //})

    console.log("init-companyType", pBackajax, park_id);
    var data = {
      //错误码
      "return_code": "100",
      "response": [
        {
          //id
          "id": "1009",
          //公司名字
          "name": "科技服务",
        },
        {
          //id
          "id": "1019",
          //公司名字
          "name": "文化创意",
        }
      ],
      //错误代码信息
      "err_msg": ""
    };

    pBackajax(data);
  }

  //6 (企业园区模块-搜索类型)获取园区下面企业类型列表
  public findCompany(pBackajax, park_id, company_type_id, name,token) {
    console.log("findCompany", park_id, company_type_id, name, token);
    let thetoken = "eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJpc3MiOiJodHRwOlwvXC8xOTIuMTY4LjEuMTM6OTBcL2FwaVwvbG9naW4iLCJpYXQiOjE1ODQwMDM4MzMsImV4cCI6MTU4NDAwNzQzMywibmJmIjoxNTg0MDAzODMzLCJqdGkiOiJ1azFacEdiVjJ0TURRVGFFIiwic3ViIjoxLCJwcnYiOiI4N2UwYWYxZWY5ZmQxNTgxMmZkZWM5NzE1M2ExNGUwYjA0NzU0NmFhIn0.A39kqiUJYPG-dYMyIy4wfcKMWGPUDGZrQSWUWNHo-fQ"
   // let url = this.state.rooturl;
    $.ajax({
      url: this.state.rooturl + '/api/findCompany',
      data: {
        "park_id": 1,
        "company_type_id": 1 ,
        "token": thetoken
      },
      type: "get",
      success: function (data) {
        console.log("findCompanyJJJJJJJ", data);
        if (data.status == 113) {
          // 113 token到期，跳转登录页面
         // console.log(window.location.pathname);
         //  window.location.href = window.location.pathname+"#/"
        } else {
          pBackajax(data);
          console.log("finJJJ", data);
        }
          
      }
    })


  }

  //7 通过企业id, 获企业详细信息
  public getCompanyInfo(pBackajax, id) {
    console.log("getCompanyInfo", pBackajax, id);
    var data = {
      //错误码
      "return_code": "100",
      "response": {
        //id
        "id": "1009",
        //公司名字
        "name": "桂林国家高新",
        //企业图像url
        "headimgurl": "./mPark/image/i.png",
        //场地对应大楼id(用于匹配对应3d大楼)
        "building_id": "a座",
        //场地对应大楼id(用于匹配对应3d大楼)
        "floor_id": "1F",
        //场地(用于匹配对应3d房间)
        "room_id": "201-2",
        //地址
        "address": "桂林市七星区信息产业园E座B区三楼",
        //联系人
        "Contacts": "莫xxx",
        //电话
        "phone": "15266666666",
        //企业官网
        "website": "www.yongtoc.com",
        //企业详情详情文字
        "descript": "xxx公司是由计算机图形学，计算机应用学组方面专家成。",
        //企业服务内容
        "service": [
          {
            //id
            "id": "1009",
            //服务内容名字
            "name": "科技服务",
          }
        ],
        //企业风采
        "elegant": [
          {
            //id
            "id": "1009",
            //图片名字
            "name": "xxx图片",
            //图片地址
            "pic_url": "./mPark/image/i.png",
          }, {
            //id
            "id": "1009",
            //图片名字
            "name": "xxx图片",
            //图片地址
            "pic_url": "./mPark/image/i.png",
          }
        ],
        //产品展示
        "product": [
          {
            //id
            "id": "1009",
            //图片名字
            "name": "xxx图片",
            //图片地址
            "pic_url": "./mPark/image/i.png",
          }, {
            //id
            "id": "1009",
            //图片名字
            "name": "xxx图片",
            //图片地址
            "pic_url": "./mPark/image/i.png",
          }
        ],
        //全景图
        "panorama": [
          {
            //id
            "id": "1009",
            //图片名字
            "name": "xxx图片",
            //图片地址
            "pic_url": "http://xxx.pic",
            //位置信息待定为string类型
            "position": "",
          }
        ]
      },
      //错误代码信息
      "err_msg": ""
    }

    pBackajax(data);
  }

  //8 通过园区id, 获取面积分类
  public getRoomRentSquareType(pBackajax, park_id) {
    console.log("init-AllareaType", pBackajax, park_id);
    var data = {
      //错误码
      "return_code": "100",
      "response": [
        {
          //区间
          "Section": "0-100",
        },
        {
          //区间
          "Section": "100-200",
        }
      ],
      //错误代码信息
      "err_msg": ""
    }
    pBackajax(data);
  }

  //9 通过园区id, 获取招租的场地列表接口(findRoomRent);
  public findRoomRentByparkid(pBackajax, park_id, square) {
    console.log("findRoomRentByparkid", pBackajax, park_id, square);
    var data = {
      //错误码
      "return_code": "100",
      "response": [
        {
          //id
          "id": "10091",
          //头像url
          "headimgurl": "./mPark/image/i.png",
          //使用场地对应大楼id(用于匹配对应3d大楼)
          "building_id": "a座",
          //使用场地对应大楼id(用于匹配对应3d大楼)
          "floor_id": "1F",
          //使用场地房间id(用于匹配对应3d房间)
          "room_id": "201-1",
          //租用开始时间
          "date": "2019-07-05",
          //面积
          "square": "45m²",
          //价格。
          "price": "2.8元/m²/天"
        }, {
          //id
          "id": "10092",
          //头像url
          "headimgurl": "./mPark/image/i.png",
          //使用场地对应大楼id(用于匹配对应3d大楼)
          "building_id": "a座",
          //使用场地对应大楼id(用于匹配对应3d大楼)
          "floor_id": "1F",
          //使用场地房间id(用于匹配对应3d房间)
          "room_id": "201-2",
          //租用开始时间
          "date": "2019-07-05",
          //面积
          "square": "45m²",
          //价格。
          "price": "2.8元/m²/天"
        }
      ],
      //错误代码信息
      "err_msg": ""
    }
    pBackajax(data);
  }

  //10 通过招租id,获取租房信息列表接口(getRoomRentInfo)
  public findRoomRentByroomid(pBackajax, id) {
    console.log("findRoomRentByroomid", pBackajax, id);
    var data = {
      //错误码
      "return_code": "100",
      "response": {
        //id
        "id": "1009",
        //头像url
        "headimgurl": "./mPark/image/i.png",
        //使用场地对应大楼id(用于匹配对应3d大楼)
        "building_id": "a座",
        //使用场地对应大楼id(用于匹配对应3d大楼)
        "floor_id": "1F",
        //使用场地房间id(用于匹配对应3d房间)
        "room_id": "201-2",
        //时间
        "date": "2019-07-05",
        //面积
        "square": "45m²",
        //价格。
        "price": "2.8元/m²/天",
        //建筑面积
        "squre": "150",
        //所在楼层
        "floor": "4楼",
        //是否有电梯
        "lift": "有",
        //联系人
        "Contacts": "莫xxx",
        //电话
        "phone": "135000000",
        //看房时间
        "inspection_time": "80:30-12:00",
        //租房要求
        "require": "一年起租",
        "pic": [
          {
            //id
            "id": "1009",
            //图片名字
            "name": "xxx图片",
            //图片地址
            "url": "./mPark/image/i.png",
          }, {
            //id
            "id": "1009",
            //图片名字
            "name": "xxx图片",
            //图片地址
            "url": "./mPark/image/i.png",
          }, {
            //id
            "id": "1009",
            //图片名字
            "name": "xxx图片",
            //图片地址
            "url": "./mPark/image/i.png",
          }
        ],
        //全景图
        "panorama": [
          {
            //id
            "id": "1009",
            //图片名字
            "name": "xxx图片",
            //图片地址
            "url": "http://xxx.pic",
            //位置信息待定为string类型
            "position": "",
          }
        ],
        //视频
        "video": [
          {
            //id
            "id": "1009",
            //图片名字
            "name": "xxx图片",
            //地址
            "url": "https://www.yongtoc.com/themes/ytyc.mp4",
            //位置信息待定为string类型
            "position": "",
          }
        ]
      },
      //错误代码信息
      "err_msg": ""
    }
    pBackajax(data);
  }

  // 获取招商房间列表
  public getRoomdata(pBackajax) {
    console.log("initRoomdata");
    pBackajax(111);
  }

  public state = {
    rooturl: "http://192.168.1.13:90",
   // token: "eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJpc3MiOiJodHRwOlwvXC8xOTIuMTY4LjEuMTM6OTBcL2FwaVwvbG9naW4iLCJpYXQiOjE1ODQwMDM4MzMsImV4cCI6MTU4NDAwNzQzMywibmJmIjoxNTg0MDAzODMzLCJqdGkiOiJ1azFacEdiVjJ0TURRVGFFIiwic3ViIjoxLCJwcnYiOiI4N2UwYWYxZWY5ZmQxNTgxMmZkZWM5NzE1M2ExNGUwYjA0NzU0NmFhIn0.A39kqiUJYPG-dYMyIy4wfcKMWGPUDGZrQSWUWNHo-fQ"
  }
}

export default DataService;
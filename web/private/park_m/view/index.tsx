import * as React from "react";
import * as ReactDOM from "react-dom";
import "css!./styles/index.css";
import { Link } from 'react-router-dom';
import Router from 'router';
import ParkCompany from "parkCompany";
import FindLease from "findLease";
import ApplyPut from "applyPut";
import Photograph from "photograph";
import BookSite from "bookSite";
import Parking from "parking";
import BottomBtn from "bottomBtn";
import RepairsOnline from "repairsOnline";

import DataService from "dataService";
import GlobalAction from "compat";


interface IProps {
  history: any
  children: any
}

interface IState {
  inputValue: string,
  city: string,
  parkArr: Array<any>,
  tagArr: Array<any>,
  longitude: string,
  latitude: string,
  longitudeLocal: string,
  latitudeLocal: string,
  type: boolean,
  isPosition: boolean,
  area: Array<any>,
  subway: Array<any>,
  areaIndex: number,
  areaChildrenIndex: number,
  subwayChildrenIndex: number,
  subwayIndex: number,
  isArea: boolean,
  position: string,
  areas: Array<any>,
  isAreas: boolean,
  _isArea: boolean,
  isMask: boolean,
  _isPosition: boolean,
  _areaIndex: number,
  _subwayIndex: number,
  _areaChildrenIndex: number,
  _area: Array<any>,
  _subway: Array<any>,
  totalPrice: Array<any>,
  unitPrice: Array<any>,
  _position: string,
  areasIndex: number,
  _subwayChildrenIndex: number,
  areasName: string,
  isPrice: boolean,
  priceName: string,
  isTotalPrice: boolean,
  totalPriceIndex: number,
  unitPriceIndex: number,
  isMore: boolean,
  decorationArr: Array<any>,
  typeArr: Array<any>,
  decorationIndex: number,
  moreName: string,
  typeIndex: number,
  isCompanyArr: boolean,
  isLoginBox: boolean,
}

class Index extends React.Component {
  constructor(props) {
    super(props);

    Index.g_pIns = this;
    this.setParks = this.setParks.bind(this);
    this.isLoginData = this.isLoginData.bind(this);
    Index.hideCompanyArr = this.hideCompanyArr.bind(this);
    Index.hideLoginBox = this.hideLoginBox.bind(this);
    Index.showLoginBox = this.showLoginBox.bind(this);
    
  }
  public static g_pIns: Index = null;

  public dataService: DataService = new DataService();
  public globalAction: GlobalAction = new GlobalAction();

  public readonly state: Readonly<IState> = {
    inputValue: "请输入园区名/区域名/商圈名", // 输入框默认值
    city: "", // 城市
    parkArr: [
      {   
        "id":"1009",
        "headimgurl":null,
        "province":"桂林",
        "longitude":"10.55",
        "latitude":"66.666",
        "name":"桂林国家高新",
        "phone":"0773-123456",
        "address":"桂林七星朝阳路D-11",
        "service":[
          {   
            //id
            "id":"1009",
            //服务内容名字
            "name":"电子信息",
          }
        ]
      }
    ],
    tagArr: ["七星区", "东二环路", "1号线"], // 标签
    longitude: "",
    latitude: "",
    longitudeLocal: "",
    latitudeLocal: "",
    type: true,
    area: [
      { name: "全桂林", children: [{ name: "全部" }, { name: "A" }, { name: "B" }, { name: "C" }, { name: "D" }, { name: "D" }, { name: "D" }, { name: "D" }, { name: "D" }, { name: "D" }, { name: "G" }, { name: "K" }] },
      { name: "秀峰区", children: [{ name: "全部" }, { name: "E" }, { name: "B" }, { name: "C" }, { name: "D" }] }, { name: "叠彩区", children: [{ name: "全部" }, { name: "F" }, { name: "B" }, { name: "C" }, { name: "D" }] }, { name: "象山区", children: [] },
      { name: "七星区", children: [] }, { name: "雁山区", children: [] }, { name: "临桂区", children: [] }, { name: "兴安县", children: [] },
      { name: "永福县", children: [] }, { name: "龙胜县", children: [] }, { name: "叠彩区A", children: [] }, { name: "象山区A", children: [] },
      { name: "七星区A", children: [] },
    ],
    subway: [
      { name: "全地铁", children: [{ name: "全部" }, { name: "A地铁" }, { name: "B" }, { name: "C" }, { name: "D" }, { name: "D" }, { name: "D" }, { name: "D" }, { name: "D" }, { name: "D" }, { name: "G" }, { name: "K" }] },
      { name: "秀峰区", children: [{ name: "全部" }, { name: "E" }, { name: "B" }, { name: "C" }, { name: "D" }] }, { name: "叠彩区", children: [{ name: "全部" }, { name: "F" }, { name: "B" }, { name: "C" }, { name: "D" }] }, { name: "象山区", children: [] },
      { name: "七星区", children: [] }, { name: "雁山区", children: [] }, { name: "临桂区", children: [] }, { name: "兴安县", children: [] },
      { name: "永福县", children: [] }, { name: "龙胜县", children: [] }, { name: "叠彩区A", children: [] }, { name: "象山区A", children: [] },
      { name: "七星区A", children: [] },
    ],
    _area: [
      { name: "全桂林", children: [{ name: "全部" }, { name: "A" }, { name: "B" }, { name: "C" }, { name: "D" }, { name: "D" }, { name: "D" }, { name: "D" }, { name: "D" }, { name: "D" }, { name: "G" }, { name: "K" }] },
      { name: "秀峰区", children: [{ name: "全部" }, { name: "E" }, { name: "B" }, { name: "C" }, { name: "D" }] }, { name: "叠彩区", children: [{ name: "全部" }, { name: "F" }, { name: "B" }, { name: "C" }, { name: "D" }] }, { name: "象山区", children: [] },
      { name: "七星区", children: [] }, { name: "雁山区", children: [] }, { name: "临桂区", children: [] }, { name: "兴安县", children: [] },
      { name: "永福县", children: [] }, { name: "龙胜县", children: [] }, { name: "叠彩区A", children: [] }, { name: "象山区A", children: [] },
      { name: "七星区A", children: [] },
    ],
    _subway: [
      { name: "全地铁", children: [{ name: "全部" }, { name: "A地铁" }, { name: "B" }, { name: "C" }, { name: "D" }, { name: "D" }, { name: "D" }, { name: "D" }, { name: "D" }, { name: "D" }, { name: "G" }, { name: "K" }] },
      { name: "秀峰区", children: [{ name: "全部" }, { name: "E" }, { name: "B" }, { name: "C" }, { name: "D" }] }, { name: "叠彩区", children: [{ name: "全部" }, { name: "F" }, { name: "B" }, { name: "C" }, { name: "D" }] }, { name: "象山区", children: [] },
      { name: "七星区", children: [] }, { name: "雁山区", children: [] }, { name: "临桂区", children: [] }, { name: "兴安县", children: [] },
      { name: "永福县", children: [] }, { name: "龙胜县", children: [] }, { name: "叠彩区A", children: [] }, { name: "象山区A", children: [] },
      { name: "七星区A", children: [] },
    ],
    areas: [{ name: "不限" }, { name: "0-100m" }, { name: "100-200m" }, { name: "200-300m" }, { name: "300-500m" }, { name: "500-1000m" }, { name: ">1000m" }],
    totalPrice: [{ name: "不限" }, { name: "0-0.5万元/月" }, { name: "1.5-3万元/月" }, { name: "3-5万元/月" }, { name: "5-10万元/月" }, { name: "10万元/月以上" }],
    unitPrice: [{ name: "不限" }, { name: "1-0.5万元/月" }, { name: "1.5-3万元/月" }, { name: "3-5万元/月" }, { name: "5-10万元/月" }, { name: "10万元/月以上" }],
    isPosition: false, // 园区弹出
    position: "", // 园区位置名字 
    isArea: true, // 园区区域和地铁切换
    areaIndex: 0, // 园区区域下标
    subwayIndex: 0, // 园区地铁下标
    areaChildrenIndex: 0, // 园区子区域下标
    subwayChildrenIndex: 0, // 园区子地铁下标
    _isPosition: false, // 房源位置弹出
    _position: "", // 房源位置名字
    _isArea: true, // 房源位置区域和地铁切换
    _areaIndex: 0, // 房源位置区域下标
    _subwayIndex: 0, // 房源位置地铁下标
    _areaChildrenIndex: 0, // 房源位置子区域下标
    _subwayChildrenIndex: 0, // 房源地铁子区域下标
    isAreas: false, // 房源面积弹出
    areasName: "", // 房源面积名字
    areasIndex: 0, // 房源面积下标
    isPrice: false, // 房源价格弹出
    priceName: "", // 房源价格名字
    isTotalPrice: true, // 房源总价和单价切换
    totalPriceIndex: 0, // 房源总价下标
    unitPriceIndex: 0, // 房源单价下标
    isMore: false, // 房源更多弹出
    decorationArr: ["不限", "毛坯", "简装", "中等", "精装", "豪华"],
    typeArr: ["不限", "共享办公", "独立办公"],
    decorationIndex: 0,
    typeIndex: 0,
    moreName: "",
    isMask: false, // 遮罩
    isCompanyArr: false,  //判断是否拥有多个企业
    isLoginBox: false,
   
  }

  public readonly props: Readonly<IProps> = {
    history: this.props.history
  }

  componentWillMount() {
  this.dataService.getUserInfo(this.callBackGetUserInfo.bind(this))

   // this.dataService.login(this.isLoginData);


    //let _this = this
    //if (!sessionStorage.getItem("city")) {
    //  var geolocation = new BMap.Geolocation();
    //  geolocation.getCurrentPosition(function (r) {
    //    if (this.getStatus() == BMAP_STATUS_SUCCESS) {
    //      let parkArr = _this.state.parkArr
    //      parkArr.forEach(item => {
    //        item.distance = _this.getFlatternDistance(parseFloat(r.latitude), parseFloat(r.longitude), parseFloat(item.latitude), parseFloat(item.longitude))
    //      })
    //      sessionStorage.setItem("city", r.address.city)
    //      _this.setState({ city: r.address.city, parkArr: parkArr })
    //    }
    //    else {
    //      if (this.getStatus() === 6) {
    //        console.log("没有权限")
    //      }
    //      if (this.getStatus() === 8) {
    //        console.log("连接超时")
    //      }
    //    }
    //  });
    //}

    curtainHide();

        let data = sessionStorage.getItem("userInfos");
    let dataObj = JSON.parse(data);
  
    if (dataObj) {
      console.log("77777777777771", dataObj.name)
      this.dataService.getParks(this.setParks);
    }

  }

  callBackGetUserInfo(data) {
    data = JSON.parse(data)
    console.log("userInfos", data)
    let userInfo = {
      userId: data.id, name: data.name, phone: data.phone, avatar: data.avatar, enterprise: data.enterprise, enterpriseId: data.enterprises.length > 0 ? data.enterprises[0].id : "",
      roles: {
        role_id: data.roles[0].role_id, role_name: data.roles[0].role_name
      },
      enterprises: data.enterprises,
    }
    sessionStorage.setItem("token", data.token);
    sessionStorage.setItem("userInfos", JSON.stringify(userInfo));
    this.dataService.getParks(this.setParks);
    this.isLoginData();
  }

  //显示登录框
  static showLoginBox() {}
  public showLoginBox() {
    this.setState({
      isLoginBox:true
    })
  }

    //隐藏登录列表
  static hideLoginBox() { }
  public hideLoginBox() {
    this.setState({
      isLoginBox: false,
    })
    this.isLoginData();
    //获取park list
    this.dataService.getParks(this.setParks);

  }
  
  // 模拟按钮，隐藏登录列表
  static hideLoginBox2() { }
  public hideLoginBox2() {
    this.setState({
      isLoginBox: false,
    })
  }

    // 判断所属企业
  public isLoginData() {
    let data = sessionStorage.getItem("userInfos");
    let dataObj = JSON.parse(data)

    console.log("LoginData", dataObj);
    console.log(" LoginData", typeof dataObj);
    console.log("LoginData21", dataObj.enterprises);
    console.log(" LoginData22",typeof   dataObj.enterprises);
  //  let dataObj = JSON.parse( dataObj.enterprises);
    //   console.log(" LoginData1", typeof dataObj);
    //console.log(" LoginData2", dataObj);
    //console.log(" LoginData2", dataObj.length);
    IsCompanys.getCompanyArr(dataObj.enterprises);
    if (dataObj.enterprises.length > 1) {
      this.setState({
        isCompanyArr: true,
      })

    } else {
      if (dataObj.enterprises.length ==0 ) {
           sessionStorage.setItem("enterprise","请先关联企业");
        sessionStorage.setItem("enterpriseId", "请先关联企业");
      } else {
        // sessionStorage.setItem("enterprise", dataObj.enterprises[0].name);
       // sessionStorage.setItem("enterpriseId", dataObj.enterprises[0].id);
         sessionStorage.setItem("enterprise", dataObj.enterprise);
        sessionStorage.setItem("enterpriseId", dataObj.enterpriseId);
      }
      
    }
  }

  //隐藏企业选择列表
  static hideCompanyArr() { }
  public hideCompanyArr() {
    this.setState({
      isCompanyArr: false,
    })
  }


  // 聚焦
  foucus() {
    if (this.state.inputValue === "请输入园区名/区域名/商圈名") {
      this.setState({ inputValue: "" })
    }
  }

  // 失焦
  blur() {
    if (this.state.inputValue === "") {
      this.setState({ inputValue: "请输入园区名/区域名/商圈名" })
    }
  }

  //  输入
  change(event) {
    this.setState({ inputValue: event.target.value })
  }

  // 加载园区地图
  public initPark(this,park_id) {
    console.log("initPark", park_id)
    sessionStorage.setItem("park_id", park_id);
    this.globalAction.web_call_webgl_initPark(park_id);
  }

  //加载园区信息列表
  public setParks(data) {
    this.setState({
      parkArr: data
    });
    
    let _this = this
    if (!sessionStorage.getItem("city")) {
      var geolocation = new BMap.Geolocation();
      geolocation.getCurrentPosition(function (r) {
        if (this.getStatus() == BMAP_STATUS_SUCCESS) {
          let parkArr = _this.state.parkArr
          parkArr.forEach(item => {
            item.distance = _this.getFlatternDistance(parseFloat(r.latitude), parseFloat(r.longitude), parseFloat(item.latitude), parseFloat(item.longitude))
          })
          sessionStorage.setItem("city", r.address.city)
          _this.setState({ city: r.address.city, parkArr: parkArr })
        }
        else {
          if (this.getStatus() === 6) {
            console.log("没有权限")
          }
          if (this.getStatus() === 8) {
            console.log("连接超时")
          }
        }
      });
    }
  }

  getRad(d) {
    return d * Math.PI / 180.0;
  }

  getFlatternDistance(lat1, lng1, lat2, lng2) {
  var f = this.getRad((lat1 + lat2) / 2);
  var g = this.getRad((lat1 - lat2) / 2);
  var l = this.getRad((lng1 - lng2) / 2);

  var sg = Math.sin(g);
  var sl = Math.sin(l);
  var sf = Math.sin(f);

  var s, c, w, r, d, h1, h2;
  var a = 6378137.0;
  var fl = 1 / 298.257;

  sg = sg * sg;
  sl = sl * sl;
  sf = sf * sf;

  s = sg * (1 - sl) + (1 - sf) * sl;
  c = (1 - sg) * (1 - sl) + sf * sl;

  w = Math.atan(Math.sqrt(s / c));
  r = Math.sqrt(s * c) / w;
  d = 2 * w * a;
  h1 = (3 * r - 1) / 2 / c;
  h2 = (3 * r + 1) / 2 / s;
  return d * (1 + fl * (h1 * sf * (1 - sg) - h2 * (1 - sf) * sg));
  }

  changeType() {
    this.setState({ type: !this.state.type, isPosition: false, _isPosition: false, isAreas: false, isPrice: false, isMore: false, isMask: false })
  }

  changePosition() {
    this.setState({
      isPosition: !this.state.isPosition,
      position: this.state.isArea ? this.state.area[this.state.areaIndex].name + (
      this.state.area[this.state.areaIndex].children.length > 0 ? this.state.area[this.state.areaIndex].children[this.state.areaChildrenIndex].name : null ):
      this.state.subway[this.state.subwayIndex].name + ( 
      this.state.subway[this.state.subwayIndex].children.length > 0 ? this.state.subway[this.state.subwayIndex].children[this.state.subwayChildrenIndex].name : null),
      isMask: !this.state.isMask
    })
  }

  changePositions() {
    this.setState({
      _isPosition: !this.state._isPosition, isAreas: false, isPrice: false, isMore: false,
      _position: this.state._isArea ? this.state._area[this.state._areaIndex].name + (
      this.state._area[this.state._areaIndex].children.length > 0 ? this.state._area[this.state._areaIndex].children[this.state._areaChildrenIndex].name : null ) :
      this.state._subway[this.state._subwayIndex].name + (
      this.state._subway[this.state._subwayIndex].children.length > 0 ? this.state._subway[this.state._subwayIndex].children[this.state._subwayChildrenIndex].name : null ),
      isMask: !this.state._isPosition
    })
  }

  clickAreas() {
    this.setState({
      isAreas: !this.state.isAreas, _isPosition: false, isPrice: false, isMore: false,
      isMask: !this.state.isAreas, areasName: this.state.areas[this.state.areasIndex].name
    })
  }

  changeArea(index) {
    this.setState({ areaIndex: index })
  }

  changeAreaChildren(index) {
    this.setState({ areaChildrenIndex: index })
  }

  _changeArea(index) {
    this.setState({ _areaIndex: index })
  }

  changeAreas(index) {
    this.setState({ areasIndex: index })
  }

  _changeAreaChildren(index) {
    this.setState({ _areaChildrenIndex: index })
  }

  _changeSubwayChildren(index) {
    this.setState({ _subwayChildrenIndex: index })
  }

  changeSubway(index) {
    this.setState({ _subwayIndex: index })
  }

  changeSubwayChildren(index) {
    this.setState({ subwayChildrenIndex: index })
  }

  ckArea() {
    this.setState({ isArea: true })
  }

  ckSubway() {
    this.setState({ isArea: false })
  }

  clickPrice() {
    this.setState({
      isPrice: !this.state.isPrice, _isPosition: false, isAreas: false, isMore: false, isMask: !this.state.isPrice,
      priceName: this.state.isTotalPrice ? this.state.totalPrice[this.state.totalPriceIndex].name : this.state.unitPrice[this.state.unitPriceIndex].name,
    })
  }

  changeTotalPrice(index) {
    this.setState({ totalPriceIndex: index })
  }

  changeUnitPrice(index) {
    this.setState({ unitPriceIndex: index })
  }

  ckTotalPrice() {
    this.setState({ isTotalPrice: true })
  }

  ckUnitPrice() {
    this.setState({ isTotalPrice: false })
  }

  changeDecorationIndex(index) {
    this.setState({ decorationIndex: index })
  }

  changeTypeIndex(index) {
    this.setState({ typeIndex: index })
  }

  clickMore() {
    this.setState({
      isMore: !this.state.isMore, _isPosition: false, isAreas: false, isPrice: false, isMask: !this.state.isMore,
      moreName: this.state.typeArr[this.state.typeIndex],
    })
  }

  clickMask() {
    this.setState({ isPosition: false, _isPosition: false, isAreas: false, isPrice: false, isMore: false, isMask: false })
  }

  render() {
    return (
      <div className="index">
             <div className={this.state.isCompanyArr == true ? "show" : "hide"}>
          <IsCompanys />
        </div>
        <div className={this.state.isLoginBox == true ? "show" : "hide"}>
          <LoginTest />
        </div>

        <div className="index-input-div">
          <div className="index-child-right">
            <span style={{ fontWeight: "600" }}>{sessionStorage.getItem("city")}</span>
            <img src="./park_m/image/bottom.png" width="50px" height="50px" style={{ marginTop: "-10px" }} />
          </div>
          <div className="index-child-left">
            <input className="index-input" value={this.state.inputValue} onFocus={this.foucus.bind(this)} onBlur={this.blur.bind(this)} onChange={this.change.bind(this)} />
            <img src="./park_m/image/search.png" className="index-search-img" />
          </div>
        </div>
        <div style={{ width: "100%", color: "#333333", fontWeight: "600", fontSize: "48px", marginTop: "30px", overflow: "hidden" }}>
          <div className="index-park-a" onClick={this.changeType.bind(this)}>
            <div style={{ position: "relative", backgroundColor: "#ffffff", zIndex: 2, color: this.state.type ? "#0B8BF0" : "#333333" }}>园区</div>
            <div style={{ position: "relative", top: "-62px", backgroundColor: "#ffffff", color: "#ffffff" }}>a</div>
            {this.state.type ? <div style={{ width: "23%", margin: "auto", border: "6px solid #0B8BF0", borderRadius: "50%", color: "#ffffff", marginTop: "-125px" }}>a</div> : null}
          </div>
          <div className="index-park-b" onClick={this.changeType.bind(this)}>
            <div style={{ position: "relative", backgroundColor: "#ffffff", zIndex: 2, color: !this.state.type ? "#0B8BF0" : "#333333" }}>房源推荐</div>
            <div style={{ position: "relative", top: "-62px", backgroundColor: "#ffffff", color: "#ffffff" }}>a</div>
            {!this.state.type ? <div style={{ width: "23%", margin: "auto", border: "6px solid #0B8BF0", borderRadius: "50%", color: "#ffffff", marginTop: "-125px" }}>a</div> : null}
          </div>
        </div>
        <div className="index-number">
          {this.state.type ?
            <div onClick={this.changePosition.bind(this)} style={{ overflow: "hidden", float: "left", width: "25%", textAlign: "center" }}>
              <div style={{ float: "left", fontSize: "42px", fontWeight: "600", color: this.state.position ? "#0B8BF0" : "#333333", width: "80%" }} className="index-white-space">{this.state.position ? this.state.position : "位置"}</div>
              <div className={this.state.position ? "corner-add" : "corner"} style={{ transform: this.state.isPosition ? "rotate(180deg)" : "", margin: this.state.isPosition ? "15px 0 0 0" : "" }}></div>
            </div> : null
          }
          {
            this.state.type ? 
            <div style={{ float: "right", marginRight: "50px" }}>
                已有<span style={{ color: "#0B8BF0", margin: "0 15px 0 15px" }}>{this.state.parkArr.length}</span>家园区上线
            </div> :
            <div style={{ overflow: "hidden", float: "left", width: "100%" }}>
              <div onClick={this.changePositions.bind(this)} style={{ overflow: "hidden", float: "left", width: "25%", textAlign: "center" }}>
                <div style={{ float: "left", fontSize: "42px", fontWeight: "600", color: this.state._position ? "#0B8BF0" : "#333333", width: "80%" }} className="index-white-space">{this.state._position ? this.state._position : "位置"}</div>
                <div className={this.state._position ? "corner-add" : "corner"} style={{ transform: this.state._isPosition ? "rotate(180deg)" : "", margin: this.state._isPosition ? "15px 0 0 0" : "" }}></div>
              </div>
              <div onClick={this.clickAreas.bind(this)} style={{ overflow: "hidden", float: "left", width: "25%", textAlign: "center" }}>
                <div style={{ float: "left", fontSize: "42px", fontWeight: "600", color: this.state.areasName ? "#0B8BF0" : "#333333", width: "80%" }} className="index-white-space">{this.state.areasName ? this.state.areasName : "面积"}</div>
                <div className={this.state.areasName ? "corner-add" : "corner"} style={{ transform: this.state.isAreas ? "rotate(180deg)" : "", margin: this.state.isAreas ? "15px 0 0 0" : "" }}></div>
              </div>
              <div onClick={this.clickPrice.bind(this)} style={{ overflow: "hidden", float: "left", width: "25%", textAlign: "center" }}>
                <div style={{ float: "left", fontSize: "42px", fontWeight: "600", color: this.state.priceName ? "#0B8BF0" : "#333333", width: "80%" }} className="index-white-space">{this.state.priceName ? this.state.priceName : "价格"}</div>
                <div className={this.state.priceName ? "corner-add" : "corner"} style={{ transform: this.state.isPrice ? "rotate(180deg)" : "", margin: this.state.isPrice ? "15px 0 0 0" : "" }}></div>
              </div>
              <div onClick={this.clickMore.bind(this)} style={{ overflow: "hidden", float: "left", width: "25%", textAlign: "center" }}>
                <div style={{ float: "left", fontSize: "42px", fontWeight: "600", color: this.state.moreName ? "#0B8BF0" : "#333333", width: "80%" }} className="index-white-space">{this.state.moreName ? this.state.moreName : "更多"}</div>
                <div className={this.state.moreName ? "corner-add" : "corner"} style={{ transform: this.state.isMore ? "rotate(180deg)" : "", margin: this.state.isMore ? "15px 0 0 0" : "" }}></div>
              </div>
            </div>
          }
        </div>
        { this.state.isPosition ? 
          <div className="index-position">
            <div style={{overflow: "hidden"}}>
              <div onClick={this.ckArea.bind(this)}
                style={{ float: "left", backgroundColor: this.state.isArea ? "#0B8BF0" : "#F2F2F2", width: "230px", borderRadius: "5px", height: "75px", lineHeight: "75px", textAlign: "center", color: this.state.isArea ? "#ffffff" : "#6C6C6C" }}
              >
                区域
              </div>
              <div onClick={this.ckSubway.bind(this)}
                style={{ float: "left", backgroundColor: this.state.isArea ? "#F2F2F2" : "#0B8BF0", width: "230px", borderRadius: "5px", height: "75px", lineHeight: "75px", textAlign: "center", marginLeft: "50px", color: this.state.isArea ? "#6C6C6C" : "#ffffff" }}
              >
                地铁站
              </div>
            </div>
            {this.state.isArea ?
              <div style={{height: "100%"}}>
                <div className="index-area">
                  {
                    this.state.area.map((item, index) => {
                      return (
                        <div key={index}
                          style={{ height: "100px", lineHeight: "100px", fontWeight: "600", color: index === this.state.areaIndex ? "#0B8BF0" : "#333333" }}
                          onClick={e => this.changeArea(index)}
                        >
                          {item.name}
                        </div>
                      )
                    })
                  }
                </div>
                <div className="index-area-child">
                  {
                    this.state.area[this.state.areaIndex].children.map((item, index) => {
                      return (
                        <div key={index}
                          style={{ height: "100px", lineHeight: "100px", fontWeight: "600", color: index === this.state.areaChildrenIndex ? "#0B8BF0" : "#333333" }}
                          onClick={e => this.changeAreaChildren(index)}
                        >
                          {item.name}
                        </div>
                      )
                    })
                  }
                </div> 
              </div>  
                :
              <div style={{ height: "100%" }}>
                <div className="index-subway">
                  {
                    this.state.subway.map((item, index) => {
                      return (
                        <div key={index}
                          style={{ height: "100px", lineHeight: "100px", fontWeight: "600", color: index === this.state.subwayIndex ? "#0B8BF0" : "#333333" }}
                          onClick={e => this.changeSubway(index)}
                        >
                          {item.name}
                        </div>
                      )
                    })
                  }
                </div>
                <div className="index-subway-child">
                  {
                    this.state.subway[this.state.subwayIndex].children.map((item, index) => {
                      return (
                        <div key={index}
                          style={{ height: "100px", lineHeight: "100px", fontWeight: "600", color: index === this.state.subwayChildrenIndex ? "#0B8BF0" : "#333333" }}
                          onClick={e => this.changeSubwayChildren(index)}
                        >
                          {item.name}
                        </div>
                      )
                    })
                  }
                </div>
              </div>
            }
          </div> : null
        }

        {this.state._isPosition ?
          <div className="index-position">
            <div style={{ overflow: "hidden" }}>
              <div onClick={this.ckArea.bind(this)}
                style={{ float: "left", backgroundColor: this.state.isArea ? "#0B8BF0" : "#F2F2F2", width: "230px", borderRadius: "5px", height: "75px", lineHeight: "75px", textAlign: "center", color: this.state.isArea ? "#ffffff" : "#6C6C6C" }}
              >
                区域
              </div>
              <div onClick={this.ckSubway.bind(this)}
                style={{ float: "left", backgroundColor: this.state.isArea ? "#F2F2F2" : "#0B8BF0", width: "230px", borderRadius: "5px", height: "75px", lineHeight: "75px", textAlign: "center", marginLeft: "50px", color: this.state.isArea ? "#6C6C6C" : "#ffffff" }}
              >
                地铁站
              </div>
            </div>
            {this.state._isArea ?
              <div style={{ height: "100%" }}>
                <div className="index-area">
                  {
                    this.state._area.map((item, index) => {
                      return (
                        <div key={index}
                          style={{ height: "100px", lineHeight: "100px", fontWeight: "600", color: index === this.state._areaIndex ? "#0B8BF0" : "#333333" }}
                          onClick={e => this._changeArea(index)}
                        >
                          {item.name}
                        </div>
                      )
                    })
                  }
                </div>
                <div className="index-area-child">
                  {
                    this.state._area[this.state._areaIndex].children.map((item, index) => {
                      return (
                        <div key={index}
                          style={{ height: "100px", lineHeight: "100px", fontWeight: "600", color: index === this.state._areaChildrenIndex ? "#0B8BF0" : "#333333" }}
                          onClick={e => this._changeAreaChildren(index)}
                        >
                          {item.name}
                        </div>
                      )
                    })
                  }
                </div>
              </div>
              :
              <div style={{ height: "100%" }}>
                <div className="index-subway">
                  {
                    this.state._subway.map((item, index) => {
                      return (
                        <div key={index}
                          style={{ height: "100px", lineHeight: "100px", fontWeight: "600", color: index === this.state._subwayIndex ? "#0B8BF0" : "#333333" }}
                          onClick={e => this.changeSubway(index)}
                        >
                          {item.name}
                        </div>
                      )
                    })
                  }
                </div>
                <div className="index-subway-child">
                  {
                    this.state._subway[this.state._subwayIndex].children.map((item, index) => {
                      return (
                        <div key={index}
                          style={{ height: "100px", lineHeight: "100px", fontWeight: "600", color: index === this.state._subwayChildrenIndex ? "#0B8BF0" : "#333333" }}
                          onClick={e => this._changeSubwayChildren(index)}
                        >
                          {item.name}
                        </div>
                      )
                    })
                  }
                </div>
              </div>
            }
          </div> : null
        }


        {this.state.isAreas ?
          <div className="index-position">
              <div style={{ height: "100%" }}>
                <div className="index-area">
                  {
                    this.state.areas.map((item, index) => {
                      return (
                        <div key={index}
                          style={{ height: "100px", lineHeight: "100px", fontWeight: "600", color: index === this.state.areasIndex ? "#0B8BF0" : "#333333" }}
                          onClick={e => this.changeAreas(index)}
                        >
                          {item.name}{index !== 0 ? <span>&sup2;</span> : null}
                        </div>
                      )
                    })
                  }
                </div>
              </div>
          </div> : null
        }

        {this.state.isPrice ?
          <div className="index-position">
            <div style={{ overflow: "hidden" }}>
              <div onClick={this.ckTotalPrice.bind(this)}
                style={{ float: "left", backgroundColor: this.state.isTotalPrice ? "#0B8BF0" : "#F2F2F2", width: "230px", borderRadius: "5px", height: "75px", lineHeight: "75px", textAlign: "center", color: this.state.isTotalPrice ? "#ffffff" : "#6C6C6C" }}
              >
                总价
              </div>
              <div onClick={this.ckUnitPrice.bind(this)}
                style={{ float: "left", backgroundColor: this.state.isTotalPrice ? "#F2F2F2" : "#0B8BF0", width: "230px", borderRadius: "5px", height: "75px", lineHeight: "75px", textAlign: "center", marginLeft: "50px", color: this.state.isTotalPrice ? "#6C6C6C" : "#ffffff" }}
              >
                单价
              </div>
            </div>
            {this.state.isTotalPrice ?
              <div style={{ height: "100%" }}>
                <div className="index-area">
                  {
                    this.state.totalPrice.map((item, index) => {
                      return (
                        <div key={index}
                          style={{ height: "100px", lineHeight: "100px", fontWeight: "600", color: index === this.state.totalPriceIndex ? "#0B8BF0" : "#333333" }}
                          onClick={e => this.changeTotalPrice(index)}
                        >
                          {item.name}
                        </div>
                      )
                    })
                  }
                </div>
              </div>
              :
              <div style={{ height: "100%" }}>
                <div className="index-subway">
                  {
                    this.state.unitPrice.map((item, index) => {
                      return (
                        <div key={index}
                          style={{ height: "100px", lineHeight: "100px", fontWeight: "600", color: index === this.state.unitPriceIndex ? "#0B8BF0" : "#333333" }}
                          onClick={e => this.changeUnitPrice(index)}
                        >
                          {item.name}
                        </div>
                      )
                    })
                  }
                </div>
              </div>
            }
          </div> : null
        }

        {this.state.isMore ?
          <div className="index-position">
            <div style={{ color: "#333333", fontSize: "46px", fontWeight: "600", marginBottom: "40px", marginTop: "10px" }}>装修</div>
            <div style={{ overflow: "hidden" }}>
              {
                this.state.decorationArr.map((item, index) => {
                  return (
                    <div key={index}
                      style={{
                        float: "left", backgroundColor: this.state.decorationIndex === index ? "#0B8BF0" : "#F2F2F2", color: this.state.decorationIndex === index ? "#FFFFFF" : "#6C6C6C", width: "200px", height: "70px", textAlign: "center", lineHeight: "70px",
                        fontSize: "40px", borderRadius: "5px", margin: "0 30px 30px 0"
                      }}
                      onClick={e=>this.changeDecorationIndex(index)}
                    >
                      {item}
                    </div>  
                  )
                })
              }
            </div>

            <div style={{ color: "#333333", fontSize: "46px", fontWeight: "600", marginBottom: "40px", marginTop: "30px" }}>类型</div>
            <div style={{ overflow: "hidden" }}>
              {
                this.state.typeArr.map((item, index) => {
                  return (
                    <div key={index}
                      style={{
                        float: "left", backgroundColor: this.state.typeIndex === index ? "#0B8BF0" : "#F2F2F2", color: this.state.typeIndex === index ? "#FFFFFF" : "#6C6C6C", width: "200px", height: "70px", textAlign: "center", lineHeight: "70px",
                        fontSize: "40px", borderRadius: "5px", margin: "0 30px 30px 0"
                      }}
                      onClick={e=>this.changeTypeIndex(index)}
                    >
                      {item}
                    </div>
                  )
                })
              }
            </div>
            <div style={{ overflow: "hidden", position: "absolute", bottom: "100px", width: "90%" }}>
              <div style={{ float: "left", width: "400px", height: "110px", color: "#707589", backgroundColor: "#F2F2F2", borderRadius: "5px", textAlign: "center", lineHeight: "110px", marginLeft: "20px"  }}>重置</div>
              <div style={{ float: "right", width: "400px", height: "110px", color: "#ffffff", backgroundColor: "#0B8BF0", borderRadius: "5px", textAlign: "center", lineHeight: "120px", marginRight: "20px"  }}>确定</div>
            </div>
          </div> : null
        }

        {this.state.isMask ?
          <div className="mask" onClick={this.clickMask.bind(this)}></div> : null
        }
        <div className="index-park">
          {this.state.parkArr.map((item, index) => {
            return (
              <Link to="/home">
                <div className="index-child-park" key={index} onClick={this.initPark.bind(this, item.id)}>
                  <div className="index-child-park-left"><img src={this.state.type ? "./park_m/image/a.jpg" : "./park_m/image/b.jpg"} className="park-img" /></div>
                  <div className="index-child-park-right">
                    <div className="index-park-name">{item.name}</div>
                    <div className="index-tag">
                      {this.state.tagArr.map((item, index) => {
                        return (
                          index < 3 ?
                            <div key={index} className="index-tag-child">{item}</div>
                            : null
                        )
                      })
                      }
                      {this.state.tagArr.length > 3 ? <div className="index-tag-child-add">...</div> : null}
                    </div>
                    <div style={{ color: "#949494", fontSize: "36px", margin: "20px 0 0 25px" }}>{item.address}</div>
                  </div>
                  <div className="index-child-park-end">
                    <div className="index-distance">{(item.distance * 0.001).toFixed(1)}km</div>
                  </div>
                </div>
              </Link>
            )
          })
          }
          <div style={{ width: "100%", height: "60px", textAlign: "center", fontSize: "40px", lineHeight: "60px", marginLeft: "-25px" }}>到底啦~</div>
        </div>
        <div className="index-bottom-logo">
          <img src="./park_m/image/bottomLogo.png" className="index-bottom-logo-img" />
        </div>
        {this.props.children}
        <BottomBtn history={this.props.history}></BottomBtn>
      </div>
    )
  }

  //供外部调用 -- 传入企业id，刷新树企业信息数据；
  public refreshCompanyinfo(id) {
    this.props.history.push('/parkCompany');
    ParkCompany.getCompanyinfo(id);
  }

  // 激活招租显示
  public refreshLeaseinfo(id) {
    this.props.history.push('/findLease');
    FindLease.getLeaseinfoByroomid(id);
  }

  // 添加摆点信息
  public addapplyPut(data) {
    this.props.history.push('/applyPut');
    ApplyPut.addapplyPut(data);
  }

  //添加违规点
  public addillegal(x, y) {
    this.props.history.push('/photograph');
    // ApplyPut.addapplyPut(x, y);
    Photograph.getXY(x, y);
  }

  //添加报修点
  public addReqairs(data) {
    this.props.history.push('/repairsOnline');
    RepairsOnline.getReqairstpostion(data);
  }

  //添加场地预约
  public refreshBooksite(id) {
    this.props.history.push('/bookSite');
    BookSite.getSiteinfo(id);
  }

  //添加地下车库
  public refreshParking(data) {
    this.props.history.push('/parking');
    Parking.inParkingList(data);
  }

      //自动登录
  public selfLogin(style) {
    console.log("selflogin", style);
    if (style == "park") {
      LoginTest.parkLogin();
    } else if (style == "company") {
      LoginTest.companyLogin();
    } else if (style == "normal") {
      LoginTest.ptLogin();
    } else {

    }
  }

}

//显示企业列表
class IsCompanys extends React.Component {
  public constructor(props) {
    super(props);

    IsCompanys.getCompanyArr = this.getCompanyArr.bind(this);
    this.setCompanyArr = this.setCompanyArr.bind(this);
  }

  public componentDidMount() {
    console.log(444, this.state)
  }


  // 获取企业列表
  static getCompanyArr(data) { }
  public getCompanyArr(data) {
    this.setCompanyArr(data);
  }

  //
  public setCompanyArr(data) {
    console.log(99, data)
    this.setState({
      companyArr: data
    })
    console.log(888, this.state.companyArr)
  }

  // 显示选择的企业,并隐藏列表 
  public companyActive(index, id, name) {
    console.log("active", index,id, name );
    this.setState({
      indexOf: index,
    });
    sessionStorage.setItem("enterprise", name);
    sessionStorage.setItem("enterpriseId", id);
    let userInfos = JSON.parse(sessionStorage.getItem("userInfos"))
    userInfos.enterprise = name;
    userInfos.enterpriseId = id;
   setTimeout(function (){ Index.hideCompanyArr()},1000);

  }

 
  public render() {
    return (
      <div className="isCompanyBox">
        <ul className="isCompanyBox_ul">
          {this.state.companyArr.map((i, index) => {
            return (
              <li onClick={this.companyActive.bind(this, index, i.id, i.name)} className={this.state.indexOf == index ? "companyIn" : "companyUn"}>{i.name}</li>
            )
          })}
        </ul>
      </div>
    )

  }

  public state = {
    companyArr: [ ],
    indexOf: 100,
  };
}

//显示登录框
class LoginTest extends React.Component {
  public constructor(props) {
    super(props);

    LoginTest.parkLogin = this.parkLogin.bind(this);
    LoginTest.companyLogin = this.companyLogin.bind(this);
    LoginTest.ptLogin = this.ptLogin.bind(this);
  }

    public dataService: DataService = new DataService();
  public globalAction: GlobalAction = new GlobalAction();

  public componentDidMount() {
    console.log(44333334, this.state);
  }

  //正常登录
  public doLogin() {
    console.log(this.state.username,this.state.password)
    this.dataService.login(this.state.username, this.state.password, this.hideLogin);


  }
  //admin 登录
  public adminLogin() {
    console.log(this.state.username,this.state.password)
      this.dataService.login("admin","admin",this.hideLogin);
  }
  //园区管理员登录
    static parkLogin() { };
  public parkLogin() {
   // console.log(this.state.username,this.state.password)
      this.dataService.login("twl01","123456",this.hideLogin);
  }
  // 企业管理员登录
    static companyLogin() { };
  public companyLogin() {
    console.log(this.state.username,this.state.password)
      this.dataService.login("twl02","123456",this.hideLogin);
  }
  // 普通用户登录
    static ptLogin() {}
  public ptLogin() {
    console.log(this.state.username,this.state.password)
      this.dataService.login("twl03","123456",this.hideLogin);
  }


  public hideLogin() {
    setTimeout(function () { Index.hideLoginBox() }, 1000);
    
  }

  public usernameChange(event) {
      this.setState({
      username: event.target.value,
    })
  }

  public passwordChange(event) {
      this.setState({
      password: event.target.value,
    })
  }

 
  public render() {
    return (
      <div className="userBox">
        <ul className="userBox_ul">
          <li>用户名：<input type="text" value={this.state.username} onChange={this.usernameChange.bind(this)} /></li>
          <li>密码：<input type="text" value={this.state.password}  onChange={this.passwordChange.bind(this)}/></li>
          <li><button onClick={this.doLogin.bind(this)} >登录</button></li>
          <li>  // admin admin (超级管理员)<button onClick={this.adminLogin.bind(this)} >admin登录</button></li>
          <li>  // twl01    123456(园区管理员)<button onClick={this.parkLogin.bind(this)} >园区管理员</button> </li>
          <li>  // twl02    123456(企业管理员)<button onClick={this.companyLogin.bind(this)} >企业管理员</button> </li>
          <li>  // twl03    123456(普通用户)<button onClick={this.ptLogin.bind(this)} >普通用户</button> </li>
        </ul>
      </div>
    )
  }

  public state = {
    username: "",
    password:"",
  };
}

export default Index;

ReactDOM.render(
  <Router />
  , document.getElementById('viewContainer'));



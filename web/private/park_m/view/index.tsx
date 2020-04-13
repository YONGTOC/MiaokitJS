import * as React from "react";
import * as ReactDOM from "react-dom";
import "css!./styles/index.css"
import { Link } from 'react-router-dom';
import Router from 'router';
import ParkCompany from "parkCompany";
import FindLease from "findLease";
import ApplyPut from "applyPut";
import Photograph from "photograph";
import BookSite from "bookSite";
import Parking from "parking";
import Home from "home";
import RepairsOnline from "repairsOnline";
import DataService from "dataService";
import GlobalAction from "compat";


interface IProps {
  history: any
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
}

class Index extends React.Component {
  constructor(props) {
    super(props);

    Index.g_pIns = this;
    this.setParks = this.setParks.bind(this);
  }
  public static g_pIns: Index = null;

  public dataService: DataService = new DataService();
  public globalAction: GlobalAction = new GlobalAction();

  public readonly state: Readonly<IState> = {
    inputValue: "请输入园区名称", // 输入框默认值
    city: "", // 城市
    parkArr: [{ distance: 0 }], // 园区
    tagArr: ["电子信息", "高新技术", "电商服务"], // 标签
    longitude: "",
    latitude: "",
    longitudeLocal: "",
    latitudeLocal: "",
  }

  public readonly props: Readonly<IProps> = {
    history: this.props.history
  }

  componentWillMount() {
    this.dataService.login();
    this.dataService.getParks(this.setParks);

    let _this = this
    //if (!sessionStorage.getItem("city")) {
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
    //}
  }

  // 登录

  // 聚焦
  foucus() {
    if (this.state.inputValue === "请输入园区名称") {
      this.setState({ inputValue: "" })
    }
  }

  // 失焦
  blur() {
    if (this.state.inputValue === "") {
      this.setState({ inputValue: "请输入园区名称" })
    }
  }

  //  输入
  change(event) {
    this.setState({ inputValue: event.target.value })
  }

  // 加载园区地图
  public initPark(park_id) {
    this.globalAction.web_call_webgl_initPark(park_id);
    localStorage.setItem("park_id", park_id);
  }

  //加载园区信息列表
  public setParks(data) {
    this.setState({
      parkArr: data
    })
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

  render() {
    return (
      <div className="index">
        <div className="index-input-div">
          <div className="index-child-left">
            <input className="index-input" value={this.state.inputValue} onFocus={this.foucus.bind(this)} onBlur={this.blur.bind(this)} onChange={this.change.bind(this)} />
            <img src="./park_m/image/search.png" className="index-search-img" />
          </div>
          <div className="index-child-right">
            <span >{sessionStorage.getItem("city")}</span>
            <img src="./park_m/image/bottom.png" width="50px" height="50px" style={{ marginTop: "-10px" }} />
          </div>
        </div>
        <div className="index-number">
          <img src="./park_m/image/tower.png" className="tower-img" />已有<span style={{ color: "#0B8BF0", margin: "0 15px 0 15px" }}>{this.state.parkArr.length}</span>家园区上线
        </div>
        <div className="index-park">
          {this.state.parkArr.map((item, index) => {
            if (item.headimageurl == null) {
              return (<Link to="/home"><div className="index-child-park" key={index} onClick={this.initPark.bind(this, 1001)}>
                <div className="index-child-park-left"><img src="./park_m/image/a.jpg" className="park-img" /></div>
                <div className="index-child-park-right">
                  <div className="index-park-name">{item.name}</div>
                  <div className="index-park-position">
                    <img src="./park_m/image/position.png" width="45px" height="40px" style={{ marginTop: "-18px" }} />
                    <span className="index-park-position-name">{item.address}</span>
                  </div>
                  <div className="index-tag">
                    {this.state.tagArr.map((item, index) => {
                      return <div key={index} className="index-tag-child">{item}</div>
                    })
                    }
                  </div>
                </div>
                <div className="index-child-park-end">
                  <div className="index-distance">{(item.distance * 0.001).toFixed(1)}km</div>
                </div>
              </div></Link>)
            } else {
              return (<Link to="/home"><div className="index-child-park" key={index} onClick={this.initPark.bind(this, 1001)}>
                <div className="index-child-park-left"><img src="./park_m/image/a.jpg" className="park-img" /></div>
                <div className="index-child-park-right">
                  <div className="index-park-name">{item.name}</div>
                  <div className="index-park-position"><img src={item.headimageurl} width="45px" height="40px" style={{ marginTop: "-18px" }} />
                    <span className="index-park-position-name">{item.address}</span>
                  </div>
                  <div className="index-tag">
                    {this.state.tagArr.map((item, index) => {
                      return <div key={index} className="index-tag-child">{item}</div>
                    })
                    }
                  </div>
                </div>
                <div className="index-child-park-end">
                  <div className="index-distance">{(item.distance * 0.001).toFixed(1)}km</div>
                </div>
              </div></Link>)
            }
           
          })
          }
          <div style={{ width: "100%", height: "60px", textAlign: "center", fontSize: "40px", lineHeight: "60px", marginLeft: "-25px" }}>到底啦~</div>
        </div>
        <div className="index-bottom-logo">
          <img src="./park_m/image/bottomLogo.png" className="index-bottom-logo-img" />
        </div>
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

}



export default Index;

ReactDOM.render(
  <Router />
  , document.getElementById('viewContainer'));



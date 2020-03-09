import * as React from "react";
import * as ReactDOM from "react-dom";
import Home from "home";
import ParkCompany from "parkCompany";
import Photograph from "photograph";
import InfoArea from "infoArea";
import Message from "message";
import AboutMe from "aboutMe";
import FindLease from "findLease";
import ApplyPut from "applyPut";
import BookSite from "bookSite";
import RepairsOnline from "repairsOnline";
import Parking from "parking";
import Narrate from "narrate";
import "css!./styles/index.css"
import { HashRouter, Route, Switch, Link } from 'react-router-dom';

interface IProps {
}

interface IState {
  inputValue: string,
  city: string,
  parkArr: Array<any>,
  tagArr: Array<any>
}


class Index extends React.Component {
  public readonly state: Readonly<IState> = {
    inputValue: "请输入园区名称", // 输入框默认值
    city: "", // 城市
    parkArr: [1, 2, 3, 4, 5, 6, 7, 8, 9], // 园区
    tagArr: ["电子信息", "高新技术", "电商服务"] // 标签
  }

  componentDidMount() {
    //let _this = this
    //var geolocation = new BMap.Geolocation();
    //geolocation.getCurrentPosition(function (r) {
    //  if (this.getStatus() == BMAP_STATUS_SUCCESS) {
    //    console.log(r.address.city)
    //    _this.setState({city: r.address.city})
    //  }
    //  else {
    //    if (this.getStatus() === 6) {
    //      alert("没有权限")
    //    }
    //    if (this.getStatus() === 8) {
    //      alert("连接超时")
    //    }
    //  }
    //});
  }

  // 聚焦
  foucus() {
    if (this.state.inputValue === "请输入园区名称") {
      this.setState({inputValue: ""})
    }
  }

  // 失焦
  blur() {
    if (this.state.inputValue === "") {
      this.setState({ inputValue: "请输入园区名称" })
    }
  }

  // 输入
  change(event) {
    this.setState({inputValue: event.target.value})
  }

  render() {
    return (
      <div className="index">
        <div className="index-top">数字园区</div>
        <div className="index-input-div">
          <div className="index-child-left">
            <input className="index-input" value={this.state.inputValue} onFocus={this.foucus.bind(this)} onBlur={this.blur.bind(this)} onChange={this.change.bind(this)}/>
            <img src="./mpark/image/search.png" className="index-search-img" />
          </div>
          <div className="index-child-right">
            <span >{this.state.city}</span>
            <img src="./mpark/image/bottom.png" width="50px" height="50px" style={{marginTop: "-10px"}} />
          </div>
        </div>
        <div className="index-number">
          <img src="./mpark/image/tower.png" className="tower-img" />已有<span style={{color: "#0B8BF0", margin: "0 15px 0 15px"}}>15</span>家园区上线
        </div>
        <div className="index-park">
          {this.state.parkArr.map((item, index) => {
            return <Link to="/home"><div className="index-child-park" key={index}>
              <div className="index-child-park-left"><img src="./mpark/image/a.jpg" className="park-img" /></div>
              <div className="index-child-park-right">
                <div className="index-park-name">桂林国家高新区信息产业园</div>
                <div className="index-park-position"><img src="./mpark/image/position.png" width="45px" height="40px" style={{ marginTop: "-18px" }} />
                  <span className="index-park-position-name">桂林高新区朝阳路D-12号</span>
                </div>
                <div className="index-tag">
                  {this.state.tagArr.map((item, index) => {
                    return <div key={index} className="index-tag-child">{item}</div>
                  })
                  }
                </div>
              </div>
              <div className="index-child-park-end">
                <div className="index-distance">10.5km</div>
              </div>
            </div></Link>
            })
          }
        </div>
      </div>
      )
  }
}

export default Index;

//园区企业--parkCompany; 随手拍 -- photograph；招租查询--findLease； 摆点申请-- applyPut； 
//场地预定-- bookSite；在线报修-- repairsOnline；停车服务-- parking
//Index，3d沙盘； 微圈 --infoArea； 资讯--message；我的 --aboutMe；

ReactDOM.render(
  <HashRouter>
    <Switch>
      <Route exact path="/" component={Index} />
      <Route exact path="/home" component={Home} />
      <Route exact path="/parkCompany" component={ParkCompany} />
      <Route exact path="/photograph" component={Photograph} />
      <Route exact path="/findLease" component={FindLease} />
      <Route exact path="/applyPut" component={ApplyPut} />
      <Route exact path="/bookSite" component={BookSite} />
      <Route exact path="/repairsOnline" component={RepairsOnline} />
      <Route exact path="/parking" component={Parking} />
      <Route exact path="/infoArea" component={InfoArea} />
      <Route exact path="/message" component={Message} />
      <Route exact path="/aboutMe" component={AboutMe} />
      <Route exact path="/narrate" component={Narrate} />


    </Switch>
  </HashRouter>
  , document.getElementById('viewContainer'));



import * as React from "react";
import * as ReactDOM from "react-dom";
import "css!./styles/index.css"
import { Link } from 'react-router-dom';
import Router from 'router';
import ParkCompany from "parkCompany";
import FindLease from "findLease";

interface IProps {
  history: any
}

interface IState {
  inputValue: string,
  city: string,
  parkArr: Array<any>,
  tagArr: Array<any>
}


class Index extends React.Component {
  constructor(props) {
    super(props);

    Index.g_pIns = this;
  }
  public static g_pIns: Index = null;

  public readonly state: Readonly<IState> = {
    inputValue: "请输入园区名称", // 输入框默认值
    city: "", // 城市
    parkArr: [1, 2, 3, 4, 5, 6, 7, 8, 9], // 园区
    tagArr: ["电子信息", "高新技术", "电商服务"] // 标签
  }

  public readonly props: Readonly<IProps> = {
    history: this.props.history
  }


  componentWillMount() {
    let _this = this
    if (!sessionStorage.getItem("city")) {
      var geolocation = new BMap.Geolocation();
      geolocation.getCurrentPosition(function (r) {
        if (this.getStatus() == BMAP_STATUS_SUCCESS) {
          sessionStorage.setItem("city", r.address.city)
          _this.setState({ city: r.address.city })
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
        <div className="index-input-div">
          <div className="index-child-left">
            <input className="index-input" value={this.state.inputValue} onFocus={this.foucus.bind(this)} onBlur={this.blur.bind(this)} onChange={this.change.bind(this)}/>
            <img src="./mpark/image/search.png" className="index-search-img" />
          </div>
          <div className="index-child-right">
            <span >{sessionStorage.getItem("city")}</span>
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
          <div style={{width: "100%", height: "60px", textAlign: "center", fontSize: "40px", lineHeight: "60px", marginLeft: "-25px"}}>到底啦~</div>
        </div>
        <div className="index-bottom-logo">
          <img src="./mpark/image/bottomLogo.png" className="index-bottom-logo-img" />
        </div>
      </div>
      )
  }

  //供外部调用 -- 传入企业id，刷新树企业信息数据；
  public refreshCompanyinfo(id) {
    this.props.history.push('/parkCompany');
    ParkCompany.getCompanyinfo(id);
  }

  public refreshLeaseinfo(id) {
    this.props.history.push('/findLease');
    FindLease.getLeaseinfoByroomid(id);
  }

  public addapplyPut(a) {
    this.props.history.push('/applyPut');
    ApplyPut.addapplyPut(a);
  }
}



export default Index;

ReactDOM.render(
  <Router/>
  , document.getElementById('viewContainer'));



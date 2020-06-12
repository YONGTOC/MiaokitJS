import * as React from "react";
import * as ReactDOM from "react-dom";
import "css!./style/index.css";
import Router from 'router';
import AllBottom from "allBottom"
import "css!./style/view.css";
import { Link } from 'react-router-dom';


declare var viewDraw: any;

class Index extends React.Component {
  constructor(props) {
    super(props);

    Index.g_pIns = this;

  }
  public static g_pIns: Index = null;

  public state = {
    clientWidth: "",
    searchValue: "请输入园区名/区域名/商圈名",
    districtArray: [
      { name: "全广州" }, { name: "越秀" }, { name: "海珠" }, { name: "荔湾" }, { name: "天河" }, { name: "白云" }, { name: "黄埔" }, { name: "番禺" }, { name: "南沙" },
      { name: "南沙" }, { name: "花都" }, { name: "增城" }, { name: "从化" }
    ],
    areaArray: [
      { name: "0-100m²" }, { name: "100-300m²" }, { name: "300-500m²" }, { name: "500-1000m²" }, { name: "1000m²以上" }
    ],
    priceArray: [
      { name: "0-0.5万元/月" }, { name: "0.5-1.5万元/月" }, { name: "1.5-3万元/月" }, { name: "3-5万元/月" }, { name: "5-10万元/月" }, { name: "10万元/月以上" }
    ],
    decorationArray: [
      { name: "毛坯" }, { name: "简装" }, { name: "精装" }, { name: "豪华" }
    ],
    iphoneValue: "输入您的手机号码",
    parkArray: [
      { name: "桂林信息产业园", address: "七星-朝阳路D-12号", price: "6.5" }, { name: "桂林信息产业园", address: "七星-朝阳路D-12号", price: "6.5" }, { name: "桂林信息产业园", address: "七星-朝阳路D-12号", price: "6.5" },
      { name: "桂林信息产业园", address: "七星-朝阳路D-12号", price: "6.5" }, { name: "桂林信息产业园", address: "七星-朝阳路D-12号", price: "6.5" }, { name: "桂林信息产业园", address: "七星-朝阳路D-12号", price: "6.5" },
      { name: "桂林信息产业园", address: "七星-朝阳路D-12号", price: "6.5" }, { name: "桂林信息产业园", address: "七星-朝阳路D-12号", price: "6.5" }
    ],
    backgroundArr: ["./fangliangbao/image/index_bg.png", "./fangliangbao/image/banner1.jpg", "./fangliangbao/image/banner2.jpg"], // 背景图
    backgroundIndex: 0,
    timer: 0, // 定时器
    timer1: 0, // 定时器
    opacity: 1,
  }



  public componentDidMount() {
    this.setState({ clientWidth: (document.body.clientWidth - 1210) / 2 })
    window.onresize = () => {
      this.setState({ clientWidth: (document.body.clientWidth - 1210) / 2 })
    }

    this.setTimer()
   
  }

  setTimer() {
    clearTimeout(this.state.timer)
    clearTimeout(this.state.timer1)
    let timer = setTimeout(() => {
      this.setState({ backgroundIndex: this.state.backgroundIndex + 1 === this.state.backgroundArr.length ? 0 : this.state.backgroundIndex + 1, opacity: 1 })
      clearTimeout(this.state.timer)
      this.setTimer()
    }, 5000)
    let timer1 = setTimeout(() => {
      this.setState({ opacity: 0.5 })
      clearTimeout(this.state.timer1)
    }, 4500)
    this.setState({ timer: timer, timer1: timer1 })
  }


  public render() {
    return (
      <div className="index">
        <div style={{ width: "100%", height: "440px", background: "url(" + this.state.backgroundArr[this.state.backgroundIndex] + ") no-repeat center top", opacity: this.state.opacity }} className="index-bg">
          <div className="index-title" style={{ left: this.state.clientWidth }}>
            <div className="index-t1">
              <img src="./fangliangbao/image/logo.png" style={{ margin: "20px 0 0 0", float: "left"  }} />
              <div style={{ color: "#ffffff", fontSize: "14px", float: "left", margin: "35px 0 0 0" }}>桂林</div>
              <img src="./fangliangbao/image/down.png" style={{ margin: "39px 0 0 3px" }} width="16px" height="16px" />
            </div>

            <div className="index-label" >
              <Link to="/parkList"><div>品牌园区</div></Link>
              <Link to="/roomList"><div>出租房源</div></Link>
              <Link to="/sellList"><div>出售房源</div></Link>
              <Link to="/baoList"><div>宝哥推荐</div></Link>
              <Link to="/hotList"><div>热点资讯</div></Link>
              <Link to="/contact">
                <div>
                  <img src="./fangliangbao/image/phone.png" width="14px" height="14px" style={{ margin: "0 5px 3px 0" }} />
                  <span>400-808-3066</span>
                </div>
              </Link>
              <Link to="/personalCenter"><div>登录/注册</div></Link>
            </div>
          </div>

          <div style={{ width: "100%", height: "14px", position: "absolute", top: "360px" }}>
            <div style={{ overflow: "hidden", width: this.state.backgroundArr.length * 14 + this.state.backgroundArr.length * 16, margin: "auto" }}>
              {this.state.backgroundArr.map((item, index) => {
                return (
                  <div key={index} className="dot" style={{ backgroundColor: this.state.backgroundIndex === index ? "#ffffff" : "rgba(255,255,255,.5)" }}
                    onClick={() => {
                      this.setState({ backgroundIndex: index }, () => {
                        this.setTimer()
                      })
                    }}>
                    <div className="in-dot"></div>
                  </div>
                ) 
              })
              }
            </div>
          </div>
        </div>

        <div className="warp">
          <div className="index-search">
            <div className="searchCon">
              <div style={{ width: "680px", overflow: "hidden", marginLeft: "-16px" }}>
                <div style={{ float: "left", overflow: "hidden" }}>
                  <img src="./fangliangbao/image/search.png" width="16px" height="16px" style={{ position: "relative", bottom: "2px", left: "35px" }} />
                  <input className="index-input" value={this.state.searchValue} />
                </div>
                <div className="index-search-name">搜索</div>
              </div>
              <div className="seltion-cont">
                <div className="cont-div">
                  <div className="index-tag-name">区域</div>
                  {this.state.districtArray.map((item, index) => {
                    return (
                      <div key={index} className="index-tag">{item.name}</div>
                      )
                  })
                  }
                </div>
                <div className="cont-div">
                  <div className="index-tag-name">面积</div>
                  {this.state.areaArray.map((item, index) => {
                    return (
                      <div key={index} className="index-tag">{item.name}</div>
                    )
                  })
                  }
                </div>
                <div className="cont-div">
                  <div className="index-tag-name">价格</div>
                  {this.state.priceArray.map((item, index) => {
                    return (
                      <div key={index} className="index-tag">{item.name}</div>
                    )
                  })
                  }
                </div>
                <div className="cont-div">
                  <div className="index-tag-name">装修</div>
                  {this.state.decorationArray.map((item, index) => {
                    return (
                      <div key={index} className="index-tag">{item.name}</div>
                    )
                  })
                  }
                </div>
              </div>
            </div>

            <div className="searchCont">
              <input className="index-iphone" value={this.state.iphoneValue} />
              <img src="./fangliangbao/image/iphone.png" width="18px" height="18px" style={{ position: "relative", bottom: "31px", left: "10px" }} />

              <div className="index-require">
                <div className="you-require">您的需求</div>
                <div className="you-talk ">靠近地铁，靠近大海，有花园。</div>
              </div>
              <div className="find-room">宝哥帮找房</div>
            </div>
          </div>

          <div className="index-park-title">
            <div className="index-park-a">品牌园区</div>
            <div className="index-park-b">已有 <span style={{ color: "#17A1E6" }}>12</span> 家园区上线</div>
            <Link to="/parkList"><div className="index-park-c" style={{ float: "right" }}>更多广州园区</div></Link>
          </div>

          <div style={{ overflow: "hidden" }}>
            {this.state.parkArray.map((item, index) => {
              return (
                <div key={index} className="index-park-child">
                  <div className="index-img-a"
                    style={{ marginRight: (index + 1) % 4 === 0 ? "0px" : "20px", marginTop: index > 3 ? "28px" : "10px" }}>
                    <img src="./fangliangbao/image/build.png" height="100%" width="100%" className="index-img-t1" />
                  </div>
                  <div style={{ fontSize: "16px", fontWeight: "bold", marginTop: "10px" }}>{item.name}</div>
                  <div style={{ overflow: "hidden", paddingTop: "10px" }}>
                    <img src="./fangliangbao/image/position.png" width="12px" height="12px" style={{ float: "left", margin: "4px 5px 0 0" }} /> <div className="index-address">{item.address}</div>
                    <div className="index-price" style={{ margin: (index + 1) % 4 === 0 ? "-15px 0 0 0" : "-15px 20px 0 0" }}><span style={{ color: "#DC1A3F", fontSize: "24px", marginRight: "5px" }}>{item.price}</span>元/m²·天</div>
                  </div>
                </div>
                )
            })
            }
          </div>

          <div className="index-park-title">
            <div className="index-park-a">推荐房源</div>
            <div className="index-park-b">今日新上 <span style={{ color: "#17A1E6" }}>60</span> 套房源</div>
            <div className="index-park-c" style={{ float: "right" }}>更多广州房源</div>
          </div>

          <div>
            {[1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12].map((item, index) => {
              return (
                <div key={index} style={{ marginTop: index === 0 ? "18px" : "30px", overflow: "hidden", cursor: "pointer", width: "895px" }}>
                  <div style={{ width: "240px", height: "180px", borderRadius: "5px", float: "left", overflow: "hidden" }}>
                    <img src="./fangliangbao/image/build1.png" width="100%" height="100%" className="index-img-t1" />
                  </div>
                  <div style={{float: "left", marginLeft: "30px", width: "500px"}}>
                    <div className="index-c-a">出租！高新区信息产业园豪华装修单元</div>
                    <div style={{ marginTop: "22px", fontSize: "14px", overflow: "hidden" }}>
                      <div style={{ float: "left" }}>桂林信息产业园</div>
                      <div style={{ color: "#DDDDDD", float: "left", margin: "0 10px 0 10px" }}> / </div>
                      <div style={{ float: "left" }}>100.5m²</div>
                      <div style={{ color: "#DDDDDD", float: "left", margin: "0 10px 0 10px" }}> / </div>
                      <div style={{ float: "left" }}> 豪华装修 </div>
                    </div>
                    <div style={{ marginTop: "14px", fontSize: "14px", overflow: "hidden" }}>
                      <div style={{ float: "left" }}>七星-东二环路</div>
                      <div style={{ color: "#DDDDDD", float: "left", margin: "0 10px 0 10px" }}> / </div>
                      <div style={{ float: "left" }}>朝阳路D-12号</div>
                    </div>
                    <div style={{ marginTop: "14px", fontSize: "14px", color: "#989FA8" }}>有5位用户正在浏览该房源</div>
                    <div style={{ marginTop: "12px", fontSize: "12px", overflow: "hidden", color: "#849AAE" }}>
                      <div style={{ backgroundColor: "#F3F5F7", width: "77px", height: "24px", borderRadius: "2px", float: "left", textAlign: "center", lineHeight: "24px", marginRight: "10px" }}>
                        带办公家具
                      </div>
                      <div style={{ backgroundColor: "#F3F5F7", width: "77px", height: "24px", borderRadius: "2px", float: "left", textAlign: "center", lineHeight: "24px", marginRight: "10px" }}>
                        户型方正
                      </div>
                      <div style={{ backgroundColor: "#F3F5F7", width: "77px", height: "24px", borderRadius: "2px", float: "left", textAlign: "center", lineHeight: "24px", marginRight: "10px" }}>
                        可注册
                      </div>
                    </div>
                  </div>
                  <div style={{ float: "right", color: "#989FA8", fontSize: "14px", paddingTop: "70px", overflow: "hidden" }}>
                    <div style={{float: "right"}}>
                      <span style={{ color: "rgba(220, 26, 63, 1)", fontSize: "26px", fontWeight: 600, marginRight: "5px" }}>1.8</span>
                      <span>万元/月</span>
                    </div>
                    <div style={{clear: "both"}}>单价：120元/m²⋅月</div>
                  </div>
                </div>
                )
            })
            }
          </div>

          <div className="index-more">查看更多广州房源</div>
        </div>
        <div style={{ position: "relative" }}>
          <AllBottom />
        </div>
      </div>
    )
  }

}

export default Index;

viewDraw = function () {
  ReactDOM.render(
  <Router />
  , document.getElementById('viewContainer'));
}

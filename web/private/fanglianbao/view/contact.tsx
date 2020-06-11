import * as React from "react";
import * as ReactDOM from "react-dom";
import { Link } from 'react-router-dom';
import HomeTop from 'homeTop';
import AllBottom from 'allBottom';

class Contact extends React.Component<{ index: any }> {
  constructor(props) {
    super(props);
  }

  public state = {
    tagList: [
      { name: "联系我们" },
      { name: "友情链接" },
      { name: "网站地图" }
    ],
    tagIndex: 0,
  }

  public componentDidMount() {
  }


  public render() {
    return (
      <div className="index">
        <HomeTop />

        <div className="warp">
          <img src="./fangliangbao/image/blueLogo.png" style={{ margin: "61px 0 21px 0" }} />
          <div className="p-br"></div>
          <div className="p-content">
            {this.state.tagList.map((item, index) => {
              return (
                <div key={index} className="p-child-content" style={{ backgroundColor: this.state.tagIndex === index ? "#17A1E6" : "#F2F2F2", color: this.state.tagIndex === index ? "#fff" : "#2E2E2E" }}
                  onClick={() => this.setState({ tagIndex: index })} >
                  <div style={{ float: "left" }}>{item.name}</div>
                </div>
              )
            })
            }
          </div>

          {this.state.tagIndex === 0 ?
            <div className="user-info">
              <div style={{ overflow: "hidden", float: "left" }}>
                <div style={{ marginBottom: "20px" }}>客服电话：400-808-3066</div>
                <div style={{ marginBottom: "20px" }}>服务邮箱：service@3dflb.com</div>
                <div style={{ marginBottom: "20px" }}>公司地址：广东省广州市番禺区南村镇兴业大道北侧清华坊商业楼2号楼109室</div>
              </div>
              <div style={{ float: "left", marginLeft: "115px" }}>
                <div className="wx-title" style={{ margin: "0 0 8px 10px" }}>房良宝小程序端</div>
                <img src="./fangliangbao/image/wx.png" />
                <div style={{ fontSize: "12px", marginLeft: "10px" }}>打开微信扫一扫随时手机体验</div>
              </div>
            </div> : null
          }

          {this.state.tagIndex === 1 ?
            <div className="user-info">
              <div style={{ overflow: "hidden", float: "left" }}>
                <div style={{ marginBottom: "20px" }}>申请友情链接QQ：2106682312</div>
                <div style={{ marginBottom: "20px", color: "#17A1E6" }}><span>永拓科技</span><span style={{ marginLeft: "50px" }}>3DSVE CLOUD</span></div>
              </div>
            </div> : null
          }

          {this.state.tagIndex === 2 ?
            <div className="user-info">
              <div style={{ overflow: "hidden", float: "left" }}>
                <div style={{ marginBottom: "20px" }}>办公城市</div>
                <div style={{ marginBottom: "20px", color: "#17A1E6", fontSize: "14px" }}><span>广州</span><span style={{ marginLeft: "32px" }}>桂林</span></div>
                <div style={{ overflow: "hidden", marginBottom: "20px" }}>
                  <div style={{ marginBottom: "8px", color: "#333333", fontSize: "14px", fontWeight: 600 }}>广州行政区园区/写字楼</div>
                  <div className="f1">天河园区/办公楼</div>
                  <div className="f1">白云园区/办公楼</div>
                  <div className="f1">番禺园区/办公楼</div>
                  <div className="f1">南沙园区/办公楼</div>
                  <div className="f1">珠海园区/办公楼</div>
                </div>
                <div style={{ overflow: "hidden", marginBottom: "20px" }}>
                  <div style={{ marginBottom: "8px", color: "#333333", fontSize: "14px", fontWeight: 600 }}>广州商圈园区/写字楼</div>
                  <div className="f1">天河北园区/办公楼</div>
                  <div className="f1">天元园区/办公楼</div>
                  <div className="f1">新塘园区/办公楼</div>
                  <div className="f1">天河公园园区/办公楼</div>
                  <div className="f1">五山园区/办公楼</div>
                </div>
                <div style={{ overflow: "hidden", marginBottom: "20px" }}>
                  <div style={{ marginBottom: "8px", color: "#333333", fontSize: "14px", fontWeight: 600 }}>广州地铁线办公园区</div>
                  <div className="f1">1号线沿线办公园区</div>
                  <div className="f1">2号线沿线办公园区</div>
                  <div className="f1">3号线沿线办公园区</div>
                </div>
                <div style={{ overflow: "hidden", marginBottom: "20px" }}>
                  <div style={{ marginBottom: "8px", color: "#333333", fontSize: "14px", fontWeight: 600 }}>广州地铁站办公园区</div>
                  <div className="f1">广州东站附近办公园区</div>
                  <div className="f1">烈士陵园附近办公园区</div>
                  <div className="f1">烈士陵园附近办公园区</div>
                </div>
              </div>
            </div> : null
          }

        </div>

        <AllBottom />
      </div>
    )
  }

}

export default Contact;
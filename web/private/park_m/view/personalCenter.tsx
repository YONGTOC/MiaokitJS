import * as React from "react";
import "css!./styles/personalCenter.css"
import { Link } from 'react-router-dom';
import DataService from "dataService";


interface IProps {
  history: any
}

interface IState {
  parkList: Array<any>,
  isSpread: boolean, // 是否展开
  userInfo: string,
  pathname: string
}

class PersonalCenter extends React.Component {
  public readonly props: Readonly<IProps> = {
    history: this.props.history
  }
  public readonly state: Readonly<IState> = {
    parkList: [
      { name: "统计报表", imgUrl: "./park_m/image/statistics.png", url: "/statisticalStatement" }, { name: "房间管理", imgUrl: "./park_m/image/room.png", url: "/room" },
      { name: "工单派发管理", imgUrl: "./park_m/image/distribute.png", url: "/distribute" }, { name: "客服电话", imgUrl: "./park_m/image/service.png", url: "/serviceTel" },
      { name: "招商管理", imgUrl: "./park_m/image/attractInvestment.png", url: "/attractInvestment" }
    ],
    isSpread: false,
    userInfo: "园区成员",
    pathname: ""
  }

  public dataService: DataService = new DataService()

  componentDidMount() {
    console.log("aaaaa", this.props.history)
    this.dataService.getRoleType(this.callBackGetRoleType.bind(this))
    if (!sessionStorage.getItem("userInfo")) {
      sessionStorage.setItem("userInfo", "园区成员")
    }
    this.setState({ userInfo: sessionStorage.getItem("userInfo"), pathname: this.props.history.location.pathname })
  }

  callBackGetRoleType(data) {
    console.log(data)
  }

  // 展开
  spread() {
    this.setState({ isSpread: !this.state.isSpread })
  }

  // 切换成员
  switchMember() {
    switch (this.state.userInfo) {
      case "园区成员":
        this.setState({ userInfo: "企业管理员" })
        sessionStorage.setItem("userInfo", "企业管理员")
        break;
      case "企业管理员":
        this.setState({ userInfo: "园区管理员" })
        sessionStorage.setItem("userInfo", "园区管理员")
        break;
      default:
        this.setState({ userInfo: "园区成员" })
        sessionStorage.setItem("userInfo", "园区成员")
    } 
  }

  render() {
    return (
      <div className="personal-center">
        <div className="personal-center-top">
          <div className="personal-center-info">
            <div className="personal-center-tx">
              <img src="./park_m/image/tx.jpg" className="personal-center-tx-img" />
            </div>
            <div style={{ float: "left", color: "#FFFFFF", fontSize: "42px", margin: "10px 0 0 36px"}}>
              <div>用户名字</div>
              <div style={{
                color: "#83d5ff", fontSize: "27px", backgroundColor: "#2e9cf3", width: "160px",
                height: "50px", textAlign: "center", lineHeight: "50px", borderRadius: "30px", marginTop: "20px"
              }} onClick={this.switchMember.bind(this)}>{this.state.userInfo}</div>
            </div>
            <Link to="/modificationAuthentication">
              <div className="personal-center-right">
                <img src="./park_m/image/w-right.png" />
              </div>
            </Link>
          </div>
        </div>
        {this.state.pathname === "/personalCenter" ? 
          <div>
            <div className="personal-center-tag" style={{ margin: "0 50px 0 50px", fontWeight: "600" }}>
              我的收藏 <img src="./park_m/image/right.png" style={{ marginTop: "40px", float: "right" }} />
            </div>
            <div className="personal-center-tag" style={{ margin: "0 50px 0 50px", fontWeight: "600" }}>
              浏览记录 <img src="./park_m/image/right.png" style={{ marginTop: "40px", float: "right" }} />
            </div>
            <div className="personal-center-tag" style={{ margin: "0 50px 0 50px", fontWeight: "600" }}>
              客服电话 <span style={{ float: "right" }}>400-808-3066</span>
            </div> 
          </div>: null
        }
        {this.state.pathname !== "/personalCenter" ?
          <div>
            <div className="personal-center-tag">
              <span style={{ margin: "0 50px 0 50px" }}>手机号码</span><span>15578383040</span><span style={{ float: "right", marginRight: "50px", color: "#0B8BF0" }}>修改</span>
            </div>
            <div className="personal-center-tag">
              <span style={{ margin: "0 50px 0 50px" }}>关联企业</span><span>浙江永拓信息科技有限公司</span><span style={{ float: "right", marginRight: "50px", color: "#0B8BF0" }}>修改</span>
            </div>
            <div className="personal-center-tag">
              <span style={{ margin: "0 50px 0 50px" }}>客服电话</span><span>0773-123456</span>
            </div>
            <div className="personal-center-my">
              <Link to={sessionStorage.getItem("userInfo") === "园区管理员" ? "/parkWorkOrder" : "/workOrder"}>
                <div className="personal-center-my-left">
                  <div style={{ fontSize: "40px", marginTop: "30px", color: "#333333" }}>5</div>
                  <div style={{ fontSize: "40px", marginTop: "5px", color: "#6C6C6C" }}>我的工单</div>
                </div>
              </Link>
              <div className="personal-center-my-middle">
              </div>
              <Link to="/message">
                <div className="personal-center-my-right">
                  <div style={{ fontSize: "40px", marginTop: "30px", color: "#333333" }}>6</div>
                  <div style={{ fontSize: "40px", marginTop: "5px", color: "#6C6C6C" }}>我的消息</div>
                </div>
              </Link>
            </div>
          </div>
          : null
        }
 
    
        {sessionStorage.getItem("userInfo") === "企业管理员" && this.state.pathname !== "/personalCenter" ?
          <div className="personal-center-enterprise">
            <Link to="/enterpriseInformation">
              <div className="personal-center-enterprise-child">
                <img src="./park_m/image/enterprise.png" width="70px" height="70px" style={{marginBottom: "10px"}} />
                <span style={{ fontSize: "40px", color: "#333333", marginLeft: "30px" }}>企业信息管理</span>
                <div style={{ float: "right", height: "100%", width: "120px", textAlign: "center" }}>
                  <img src="./park_m/image/right.png" />
                </div>
              </div>
            </Link>
            <Link to="/rentRoom">
              <div className="personal-center-enterprise-child">
                <img src="./park_m/image/let.png" width="70px" height="70px" style={{ marginBottom: "10px" }} />
                <span style={{ fontSize: "40px", color: "#333333", marginLeft: "30px" }}>租用房间管理</span>
                <div style={{ float: "right", height: "100%", width: "120px", textAlign: "center" }}>
                  <img src="./park_m/image/right.png" />
                </div>
              </div>
            </Link>
          </div> : null
        }

        {sessionStorage.getItem("userInfo") === "园区管理员" && this.state.pathname !== "/personalCenter" ?
          <div className="personal-center-park">
            <div className="personal-center-enterprise-child" onClick={this.spread.bind(this)}>
              <img src="./park_m/image/park.png" width="60px" height="60px" style={{ marginBottom: "10px" }}/>
              <span style={{ fontSize: "40px", color: "#333333", marginLeft: "30px" }}>园区管理</span>
              <div style={{ float: "right", height: "100%", width: "120px", textAlign: "center" }}>
                <img src="./park_m/image/right.png" className={this.state.isSpread ? "personal-center-bottom-img" : ""} />
              </div>
            </div>
            {this.state.isSpread ?
              <div style={{ backgroundColor: "#ffffff", overflow: "hidden", paddingTop: "30px" }}>
                {
                  this.state.parkList.map((item, index) => {
                    return (
                      <Link to={item.url}>
                        <div key={index} className="personal-center-park-child">
                          <img src={item.imgUrl} width="110px" height="110px" />
                          <div style={{ marginTop: "10px" }}>{item.name}</div>
                        </div>
                      </Link>
                    )
                  })
                }
              </div> : null
            }
          </div> : null
        }

      </div>
    )
  }
}

export default PersonalCenter;
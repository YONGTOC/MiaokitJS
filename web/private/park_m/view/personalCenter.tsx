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
  userInfo: {
    name: string, avatar: string, phone: string, enterprise: string, roles: { role_id: string, role_name: string }
  },
  pathname: string,
  enterprise: string,
  enterpriseId: string,
  messagelength: number
  workOrderLength: number
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
    userInfo: { name: "", avatar: "", phone: "", enterprise: "", roles: { role_id: "", role_name: "" } },
    pathname: "",
    messagelength: 0,
    workOrderLength: 0,
    enterprise:"",
    enterpriseId:"",
  }

  public dataService: DataService = new DataService()

  componentDidMount() {
    //this.dataService.getRoleType(this.callBackGetRoleType.bind(this))
    let obj = {
      id: JSON.parse(sessionStorage.getItem("userInfos")).userId,
      work_type: "",
      state_type: "",
    }
    this.dataService.getMyMsgInfo(this.callBackGetMyMsgInfo.bind(this), "")
    this.dataService.getMyWork(this.callBackGetMyWork.bind(this), obj)

    this.setState({
      userInfo: JSON.parse(sessionStorage.getItem("userInfos")),
      pathname: this.props.history.location.pathname,
      enterprise: sessionStorage.getItem("enterprise"),
      enterpriseId: sessionStorage.getItem("enterpriseId"),
    })
  }

  callBackGetMyMsgInfo(data) {
    this.setState({ messagelength: data.response.length })
  }

  callBackGetMyWork(data) {
    this.setState({ workOrderLength: data.response ? data.response.length : 0 })
  }

  callBackGetUserInfo(data) {
    console.log("userInfoss", data)
    this.setState({ userInfo: JSON.parse(data) })
    sessionStorage.setItem("userInfo", this.state.userInfo.roles.role_name)
  }

  callBackGetRoleType(data) {
    console.log(data)
  }

  // 展开 
  spread() {
    this.setState({ isSpread: !this.state.isSpread })
  }


  public phoneChange() {
   let reg01 = /^1[3456789]\d{9}$/;
    var phone = prompt("请输入新的手机号", "")
    if (phone != null && phone != "" && reg01.test(phone) ) {
      console.log("phoneNew", phone)
      // 提交手机号修改
    this.dataService.modifyUserName(this.callBackUserName.bind(this),
      this.state.userInfo.name, this.state.userInfo.phone, this.state.enterpriseId )

    } else {
      alert("手机号码不正确，固话请添加区号")
      return;
    }
  }

  public callBackUserName(data) {
        alert(data.err_msg)
  }

  //关联企业
  public showCompanyList() {
    console.log("show公司列表")
    this.setState({
      companyBox: "rollSelectCauseBox",
    })
  }

    // 隐藏公司列表框
  public hideCompanyBox() {
    this.setState({
      companyBox: "hide",
    })
  }

    //确认公司列表选择
  public getCompanyBox() {
    this.setState({
      companyBox: "hide",
      //company_id: this.state.company_id_in,
      //company: this.state.company_name_in,
    })
  }

  render() {
    return (
      <div className="personal-center">
        <div className="personal-center-top">
          <div className="personal-center-info">
            <div className="personal-center-tx">
              <img src={this.state.userInfo.avatar == null ? "./park_m/image/tx.jpg" : this.state.userInfo.avatar} className="personal-center-tx-img" />
            </div>
            <div style={{ float: "left", color: "#FFFFFF", fontSize: "42px", margin: "10px 0 0 36px" }}>
              <div>{this.state.userInfo.name}</div>
              <div style={{
                color: "#83d5ff", fontSize: "27px", backgroundColor: "#2e9cf3", width: "160px",
                height: "50px", textAlign: "center", lineHeight: "50px", borderRadius: "30px", marginTop: "20px"
              }}>{this.state.userInfo.roles.role_name}</div>
            </div>
            <Link to={{pathname: "/modificationAuthentication", state: {name: this.state.userInfo.name}}}>
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
          </div> : null
        }
        {this.state.pathname !== "/personalCenter" ?
          <div>
            <div className="personal-center-tag">
              <span style={{ margin: "0 50px 0 50px" }}>手机号码</span><span>{this.state.userInfo.phone}</span>
                <span style={{ float: "right", marginRight: "50px", color: "#0B8BF0" }} onClick={this.phoneChange.bind(this)}>
                  修改
                </span>  
            </div>
            <div className="personal-center-tag">
              <span style={{ margin: "0 50px 0 50px" }}>关联企业</span><span>{this.state.enterprise}</span>
              {this.state.userInfo.roles.role_name !== "园区管理员" && this.state.userInfo.roles.role_name !== "企业管理员" ?
                <span style={{ float: "right", marginRight: "50px", color: "#0B8BF0" }} onClick={this.showCompanyList.bind(this)}>
                  修改
                </span> : null
              }
            </div>
            <div className="personal-center-tag">
              <span style={{ margin: "0 50px 0 50px" }}>客服电话</span><span>0773-123456</span>
            </div>
            <div className="personal-center-my">
              <Link to={this.state.userInfo.roles.role_name === "园区管理员" ? "/parkWorkOrder" : "/workOrder"}>
                <div className="personal-center-my-left">
                  <div style={{ fontSize: "40px", marginTop: "30px", color: "#333333" }}>{this.state.workOrderLength}</div>
                  <div style={{ fontSize: "40px", marginTop: "5px", color: "#6C6C6C" }}>我的工单</div>
                </div>
              </Link>
              <div className="personal-center-my-middle">
              </div>
              <Link to="/message">
                <div className="personal-center-my-right">
                  <div style={{ fontSize: "40px", marginTop: "30px", color: "#333333" }}>{this.state.messagelength}</div>
                  <div style={{ fontSize: "40px", marginTop: "5px", color: "#6C6C6C" }}>我的消息</div>
                </div>
              </Link>
            </div>
          </div>
          : null
        }


        {this.state.userInfo.roles.role_name === "企业管理员" && this.state.pathname !== "/personalCenter" ?
          <div className="personal-center-enterprise">
            <Link to="/enterpriseInformation">
              <div className="personal-center-enterprise-child">
                <img src="./park_m/image/enterprise.png" width="70px" height="70px" style={{ marginBottom: "10px" }} />
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

        {this.state.userInfo.roles.role_name === "园区管理员" && this.state.pathname !== "/personalCenter" ?
          <div className="personal-center-park">
            <div className="personal-center-enterprise-child" onClick={this.spread.bind(this)}>
              <img src="./park_m/image/park.png" width="60px" height="60px" style={{ marginBottom: "10px" }} />
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
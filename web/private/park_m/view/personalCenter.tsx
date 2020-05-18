import * as React from "react";
import "css!./styles/personalCenter.css"
import { Link } from 'react-router-dom';
import { Toast  } from 'antd-mobile';
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
  workOrderLength: number,
      // 公司选择
  companyBox: string,
  companyUL:  Array<any>,
  companyIndexof: number,
  company_id_in: string,
  company_name_in: string,
  company_id: string,
  company_name: string,
  inputValueRelate: string,
  companyNull: string,
}

class PersonalCenter extends React.Component {
  public readonly props: Readonly<IProps> = {
    history: this.props.history
  }
  public readonly state: Readonly<IState> = {
    parkList: [
      { name: "统计报表", imgUrl: "./park_m/image/statistics.png", url: "/statisticalStatement" }, { name: "房间管理", imgUrl: "./park_m/image/room.png", url: "/room" },
      { name: "客服电话", imgUrl: "./park_m/image/service.png", url: "/serviceTel" }, { name: "租用到期", imgUrl: "./park_m/image/rent_expire.png", url: "/roomRent" }
    ],
    isSpread: true,
    userInfo: { name: "", avatar: "", phone: "", enterprise: "", roles: { role_id: "", role_name: "" } },
    pathname: "",
    messagelength: 0,
    workOrderLength: 0,
    enterprise:"kkfckfc",
    enterpriseId: "",
        // 公司选择
    companyBox: "hide",
    companyUL: [],
    companyIndexof: -1,
    company_id_in: "",
    company_name_in: "",
    company_id: "",
    company_name: "",
    inputValueRelate: "",
    companyNull: "hide",
  }

  public dataService: DataService = new DataService()

  componentDidMount() {
    console.log("enterprise", sessionStorage.getItem("enterprise"))
    let obj = {
      id: JSON.parse(sessionStorage.getItem("userInfos")).userId,
      work_type: "",
      state_type: "",
    }
    this.dataService.getMyMsgInfo(this.callBackGetMyMsgInfo.bind(this), "")
    this.dataService.getMyWork(this.callBackGetMyWork.bind(this), obj)

       let data = sessionStorage.getItem("userInfos");
    let dataObj = JSON.parse(data)
    this.setState({
      userInfo: JSON.parse(sessionStorage.getItem("userInfos")),
      pathname: this.props.history.location.pathname,
     // enterprise:dataObj.enterprise,
     // enterpriseId: dataObj.enterpriseId,
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

  callBackGetRoleType(data) {
    console.log(data)
  }

  // 展开 
  spread() {
    this.setState({ isSpread: !this.state.isSpread })
  }

  // 修改手机号码
  public phoneChange() {
   let reg01 = /^1[3456789]\d{9}$/;
    var phoneNew = prompt("请输入新的手机号", "")
    if (phoneNew != null && phoneNew != "") {
      //&& reg01.test(phoneNew)
      if (reg01.test(phoneNew)) {
        console.log("phoneNew", phoneNew)
        // 提交手机号修改
        this.dataService.modifyUserInfo(this.callBackPhoneNew.bind(this),
          this.state.userInfo.name, phoneNew, this.state.enterpriseId )
      } else {
         Toast.info('手机号码不正确', 2);
      }
    }
  }


  public callBackPhoneNew(data) {
     let userInfos = JSON.parse(sessionStorage.getItem("userInfos"))
    userInfos.phone = data.response.phone
    sessionStorage.setItem("userInfos", JSON.stringify(userInfos));
    //setstate phone
      this.setState({
      userInfo: JSON.parse(sessionStorage.getItem("userInfos")),
    })
  }

  //显示 关联企业列表
  public showCompanyList() {
    console.log("show公司列表")
    this.setState({
      companyBox: "rollSelectCauseBox2",
    })
    //ajax 获取使用企业列表
    this.dataService.findCompany(this.setCompanyList.bind(this),"","")
  }

  //获取到的 企业列表
  public setCompanyList(data) {
    console.log("mmmmmmmmmmmmm", data.response);
    if (data.response.length == 0) {
      this.setState({
        companyNull: "show",
         companyUL:data.response
    })
    } else {
      this.setState({
        companyNull: "hide",
      companyUL:data.response
    })
    }
 
  }

    // 隐藏公司列表框
  public hideCompanyBox() {
    this.setState({
      companyBox: "hide",
    }, () => {
        console.log("hide",this.state.company_id, this.state.company_name);
      })
  }

    //确认公司列表选择
  public getCompanyBox() {
    this.setState({
      companyBox: "hide",
      company_id: this.state.company_id_in,
      company_name: this.state.company_name_in,
    }, () => {
          this.dataService.modifyUserInfo(this.callBackModifyCompanyName.bind(this),
      this.state.userInfo.name, this.state.userInfo.phone, this.state.company_id)
      })
  
  }

  public callBackModifyCompanyName(data) {
    Toast.info(data.err_msg, 2);
    this.setState({
      enterprise: data.response.name,
      company_id: data.response.company_id

    })

    sessionStorage.setItem("enterprise", data.response.name);
    sessionStorage.setItem("enterpriseId", data.response.company_id);
    let userInfos = JSON.parse(sessionStorage.getItem("userInfos"))

    //console.log(userInfos.enterprises[0].name)
    userInfos.enterprise = data.response.name;
    userInfos.enterpriseId = data.response.company_id;
    userInfos.enterprises[0].name = data.response.name;
    userInfos.enterprises[0].id= data.response.company_id;
    sessionStorage.setItem("userInfos", JSON.stringify(userInfos));
  }

  // 选中公司
  public inCompanyeList(i, id, name) {
     //console.log("选中的公司", i, id, name);
    this.setState({
      companyIndexof: i,
      company_id_in: id,
      company_name_in: name,
    }, () => {
       console.log("选中的公司",this.state.company_id_in, this.state.company_name_in);
      })
  }

    // 聚焦
  public foucusRelate() {
    if (this.state.inputValueRelate == " ") {
      this.setState({ inputValueRelate: "" })
    }
  }

  // 失焦
  public blurRelate(event) {
    if (this.state.inputValueRelate == "") {
      this.setState({ inputValueRelate: " " })
    }
  }

  // 输入
  public changeRelate(event) {
    this.setState({ inputValueRelate: event.target.value });
  }

    // 软键盘 搜索
  public queryKeyDownHandlerRelate(e) {
    switch (e.keyCode) {
      case 13://回车事件
        this.searchCompany();
        break
    }
  }

    //软键盘搜索 
  public searchCompany() {
    if (this.state.inputValueRelate == "请输入企业名称"  ) {
      this.setState({ inputValueRelate: "" })
    };
    console.log("searchBtn", this.state.inputValueRelate);
    this.dataService.findCompany(this.setCompanyList.bind(this),"", this.state.inputValueRelate);
  }

    onErrorHeadimageurl(this) {
    let userInfo = JSON.parse(sessionStorage.getItem("userInfos"));
      this.setState({
        userInfo: {
          name: userInfo.name ,
          avatar: "./park_m/image/noImg.png",
          phone: userInfo.phone ,
          enterprise: "" ,
          roles: {
            role_id: userInfo.roles.role_id ,
            role_name: userInfo.roles.role_name ,
          }
        },
      })
  }


  render() {
    return (
      <div className="personal-center">
        <div className="personal-center-top">
          <div className="personal-center-info">
            <div className="personal-center-tx">
              <img src={this.state.userInfo.avatar == null ? "./park_m/image/noImg.png" : this.state.userInfo.avatar}  onError={this.onErrorHeadimageurl.bind(this)} className="personal-center-tx-img"  />
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
              {this.state.enterprise && this.state.enterprise !== "请先关联企业"?
                <span style={{ float: "right", marginRight: "50px", color: "#0B8BF0" }} onClick={this.phoneChange.bind(this)}>
                  修改
                </span> : null
              }
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

        <div className={this.state.companyBox}>
               <div className="searchBox">
              <span className="searchBox-text">
                <i className="iconfont" style={{ "fontSize": "2.3rem" }}>&#xe810;</i>
                <input className="companySearch" type="search" placeholder="请输入企业名称"
                  value={this.state.inputValueRelate} onFocus={this.foucusRelate.bind(this)}
                  onBlur={this.blurRelate.bind(this)} onChange={this.changeRelate.bind(this)} onKeyDown={this.queryKeyDownHandlerRelate.bind(this)} />
            </span>
            </div>
          <ul className="rollSelectCauseULcss2">
             <p className={this.state.companyNull} style={{ "text-align": "center" }} >没有符合搜索条件的结果···</p>
            {this.state.companyUL.map((i, index) => {
              return (
                <li className={this.state.companyIndexof == index ? "rollSelectCauseli-active" : "rollSelectCauseli"}
                  onClick={this.inCompanyeList.bind(this, index, i.id, i.name)}
                >{i.name}</li>
              )
            })}
          </ul>
          <div className="rollSelectCuasedBtn">
            <span className="rollSelectCancel" onClick={this.hideCompanyBox.bind(this)} >取消</span>
            <span className="rollSelectConfirm" onClick={this.getCompanyBox.bind(this)}>确认</span>
          </div>
        </div>

      </div>
    )

  }
}

export default PersonalCenter;
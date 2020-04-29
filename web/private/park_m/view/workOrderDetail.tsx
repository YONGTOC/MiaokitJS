import * as React from "react";
import "css!./styles/workOrderDetail.css"
import DataService from "dataService";

interface IProps {

}

interface IState {
  stateName: string,
  datas: {
    applicant: string, phone: string, company: string, content: string, time: string, id: number,
    positions: { name: string, start_date: string, end_date: string },
    examine: { checker: string, checker_date: string, reply: string },
  },
  tagArray: Array<any>,
  reply: string
}

class workOrderDetail extends React.Component<{ history: any }>{
  public readonly state: Readonly<IState> = {
    stateName: JSON.parse(sessionStorage.getItem("workOrder")).stateName,
    datas: {
      applicant: "", phone: "", company: "", content: "", time: "", id: 0,
      positions: { name: "", start_date: "", end_date: "" },
      examine: { checker: "", checker_date: "", reply: "" }
    },
    tagArray: [
      [
        { name: "申请人", type: "text", content: "" }, { name: "联系号码", type: "text", content: "" }, { name: "企业名称", type: "text", content: "" },
        { name: "角色类型", type: "text", content: "" }, { name: "认证材料", type: "image", content: "" }
      ],
      [
        { name: "申请人", type: "text", content: "" }, { name: "手机号码", type: "text", content: "" }, { name: "申请企业", type: "text", content: "" },
        { name: "使用场地", type: "text", content: "" }, { name: "开始日期", type: "text", content: "" }, { name: "开始时间", type: "text", content: "" },
        { name: "结束日期", type: "text", content: "" }, { name: "结束时间", type: "text", content: "" }, { name: "会议主题", type: "text", content: "" },
        { name: "具体需求", type: "text", content: "" }
      ],
      [
        { name: "申请人", type: "text", content: "" }, { name: "手机号码", type: "text", content: "" }, { name: "申请单位", type: "text", content: "" },
        { name: "具体内容", type: "text", content: "" }, { name: "广告位置", type: "text", content: "" }, { name: "开始时间", type: "text", content: "" },
        { name: "结束时间", type: "text", content: "" }
      ],
      [
        { name: "联系人", type: "text", content: "" }, { name: "电话号码", type: "text", content: "" }, { name: "保修描述", type: "text", content: "" }
      ]
    ],
    reply: "200字内"
  }

  public dataService: DataService = new DataService()

  componentDidMount() {
    if (JSON.parse(sessionStorage.getItem("workOrder")).workType == 1) {
      this.dataService.getRoleAuthenticationInfo(this.callBackGetRoleAuthenticationInfo.bind(this), JSON.parse(sessionStorage.getItem("workOrder")).id)
    } else if (JSON.parse(sessionStorage.getItem("workOrder")).workType == 2) {
      this.dataService.getBookingRoomInfo(this.callBackGetBookingRoomInfo.bind(this), JSON.parse(sessionStorage.getItem("workOrder")).id)
    } else if (JSON.parse(sessionStorage.getItem("workOrder")).workType == 3) {
      this.dataService.getAdvertisementPointInfo(this.callBackGetAdvertisementPointInfo.bind(this), JSON.parse(sessionStorage.getItem("workOrder")).id)
    } else {
      this.dataService.getRepairInfo(this.callBackGetRepairInfo.bind(this), JSON.parse(sessionStorage.getItem("workOrder")).id)
    }
  }

  callBackGetRoleAuthenticationInfo(data) {
    console.log('aaaaaaaa', data)
    let tagArray = this.state.tagArray
    tagArray[0][0].content = data.response.name
    tagArray[0][1].content = data.response.phone
    tagArray[0][2].content = data.response.company_name[0].company_name
    tagArray[0][3].content = data.response.role_name
    tagArray[0][4].content = data.response.pic_url
    console.log('bbbbbbb', tagArray)
    this.setState({ tagArray: tagArray, datas: data.response })
  }

  callBackGetBookingRoomInfo(data) {
    console.log('bbbbbbbbb', data)
    let tagArray = this.state.tagArray
    tagArray[1][0].content = data.response.applicant
    tagArray[1][1].content = data.response.phone
    tagArray[1][2].content = data.response.company
    tagArray[1][3].content = data.response.publicplace
    tagArray[1][4].content = data.response.start_date.substring(0, 10)
    tagArray[1][5].content = data.response.start_date.substring(10)
    tagArray[1][6].content = data.response.end_date.substring(0, 10)
    tagArray[1][7].content = data.response.end_date.substring(10)
    tagArray[1][8].content = data.response.theme
    tagArray[1][9].content = data.response.content
    console.log('xxxxxx', tagArray)
    this.setState({ tagArray: tagArray, datas: data.response })
  }

  callBackGetAdvertisementPointInfo(data) {
    console.log("摆点", data)
    let tagArray = this.state.tagArray
    tagArray[2][0].content = data.response.applicant
    tagArray[2][1].content = data.response.phone
    tagArray[2][2].content = data.response.company
    tagArray[2][3].content = data.response.content
    tagArray[2][4].content = data.response.positions.name
    tagArray[2][5].content = data.response.positions.start_date
    tagArray[2][6].content = data.response.positions.end_date
    this.setState({ tagArray: tagArray, datas: data.response })
  }

  callBackGetRepairInfo(data) {
    console.log("保修", data)
    let tagArray = this.state.tagArray
    tagArray[3][0].content = data.response.linkman
    tagArray[3][1].content = data.response.phone
    tagArray[3][2].content = data.response.descript
    this.setState({ tagArray: tagArray, datas: data.response })
  }

  // 返回
  goBack() {
    this.props.history.goBack()
  }

  // 输入
  inputChange(event) {
    this.setState({ reply: event.target.value })
  }

  // 聚焦
  textareaFoucus() {
    if (this.state.reply === "200字内") {
      this.setState({ reply: "" })
    }
  }

  // 失焦
  textareaBlur() {
    if (this.state.reply === "") {
      this.setState({ reply: "200字内" })
    }
  }

  // 提交
  submit(index) {
    if (index === 0) {
      this.props.history.push("/searchUser")
    }
    let obj = {
      uid: JSON.parse(sessionStorage.getItem("userInfos")).userId,
      id: JSON.parse(sessionStorage.getItem("workOrder")).id,
      state: index,
      reply: this.state.reply
    }
    if (JSON.parse(sessionStorage.getItem("workOrder")).workType == 1) {
      this.dataService.changeRoleAuthenticationInfo(this.callBack.bind(this), obj)
    } else if (JSON.parse(sessionStorage.getItem("workOrder")).workType == 2) {
      this.dataService.changeBookingRoomInfo(this.callBack.bind(this), obj)
    } else if (JSON.parse(sessionStorage.getItem("workOrder")).workType == 3) {
      this.dataService.changeAdvertisementPointInfo(this.callBack.bind(this), obj)
    } else {
      this.dataService.changeRepairInfo(this.callBack.bind(this), obj)
    }
  }

  callBack(data) {
    if (data.return_code == 100) {
      this.props.history.goBack()
    }
  }

  render() {
    return (
      <div className="work-order-detail">
        <div className="work-order-detail-back" onClick={this.goBack.bind(this)}>
          <img src="./park_m/image/back.png" style={{ margin: "-10px 10px 0 0" }} />
          <span>我的工单</span>
        </div>
        <div style={{ padding: "40px 0 0 50px", borderBottom: "4px solid #F2F2F2", width: "100%", height: "140px" }}>
          <span style={{ fontSize: "40px", fontWeight: "600" }}>{JSON.parse(sessionStorage.getItem("workOrder")).name}</span>
          <span style={{
            float: "right", color: "#ffffff", width: "130px", height: "55px", borderRadius: "50px",
            marginRight: "40px", fontSize: "32px", textAlign: "center", lineHeight: "55px"
          }} className={this.state.stateName == "审核中" ? "bluebg" : this.state.stateName == "已通过" ? "greenbg" : "redbg"}>{this.state.stateName}</span>
        </div>

        { this.state.tagArray[JSON.parse(sessionStorage.getItem("workOrder")).workType - 1].map((item, index) => {
            return (
              <div style={{ margin: "30px 0 0 50px", overflow: "hidden" }} key={index}>
                <div style={{ color: "#949494", fontSize: "40px", float: "left", width: "25%" }}>{item.name}</div>
                {item.type === "text" ?
                  <div style={{ color: "#333333", fontSize: "40px", float: "left", width: "70%" }}>{item.content}</div> :
                  <div><img src={item.content} /></div>
                }
              </div>
            )
          })
        }
      
        <div style={{ fontSize: "40px", color: "#949494", float: "right", margin: "30px 50px 0 0" }}>工单申请时间：{this.state.datas.time}</div>
        <div style={{ width: "100%", overflow: "hidden", textAlign: "center" }}>
          <div style={{ border: "2px solid #F2F2F2", width: "90%", margin: "30px 0 0 5%"}}></div>
        </div>
       
        {this.state.datas.examine.reply ?
          <div>
            <div style={{ margin: "30px 0 0 50px" }}>
              <span style={{ color: "#949494", fontSize: "40px" }}>由</span>
              <span style={{ color: "#333333", fontSize: "40px", marginLeft: "25px", fontWeight: "600" }}>{this.state.datas.examine.checker}</span>
              <span style={{ color: "#949494", fontSize: "40px", marginLeft: "25px" }}>审核于</span>
              <span style={{ color: "#333333", fontSize: "40px", marginLeft: "25px" }}>{this.state.datas.examine.checker_date}</span>
            </div>
            <div style={{ margin: "20px 0 0 50px" }}>
              <span style={{ color: "#949494", fontSize: "40px" }}>审核回复:</span>
            </div>
            <div style={{ margin: "20px 0 0 50px", color: "#333333", fontSize: "40px", wordBreak: "break-all", width: "90%" }}>
              {this.state.datas.examine.reply}
            </div>
          </div> : null
        }

        {this.state.stateName === "审核中" && JSON.parse(sessionStorage.getItem("userInfos")).roles.role_name === "园区管理员" ?
          <div>
            <div style={{ padding: "30px 0 0 50px" }}>
              <div className="isay-star"></div><div style={{ marginLeft: "30px", fontSize: "40px", color: "#333333" }}>审核回复：</div>
              <textarea style={{ height: "200px", width: "90%", backgroundColor: "#F2F2F2", marginTop: "30px", fontSize: "40px", color: "#949494" }}
                value={this.state.reply} onFocus={this.textareaFoucus.bind(this)} onBlur={this.textareaBlur.bind(this)} onChange={this.inputChange.bind(this)}></textarea>
            </div>
            <div style={{ height: "150px", width: "100%", position: "fixed", bottom: 0, fontSize: "45px" }}>
              <div style={{ float: "left", height: "100%", width: "33.3%", lineHeight: "150px", textAlign: "center", backgroundColor: "#F2F2F2", color: "#6C6C6C" }} onClick={e => this.submit(0)}>转单</div>
              <div style={{ float: "left", height: "100%", width: "33.3%", lineHeight: "150px", textAlign: "center", backgroundColor: "#FE4E4E", color: "#FFFFFF" }} onClick={e => this.submit(3)}>不通过</div>
              <div style={{ float: "left", height: "100%", width: "33.4%", lineHeight: "150px", textAlign: "center", backgroundColor: "#0B8BF0", color: "#FFFFFF" }} onClick={e => this.submit(1)}>通过</div>
            </div>
          </div> : null
         }
        
      </div>
    )
  }
}

export default workOrderDetail;
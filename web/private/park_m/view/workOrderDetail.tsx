import * as React from "react";
import "css!./styles/workOrderDetail.css"
import DataService from "dataService";

interface IProps {

}

interface IState {
  stateName: string,
  datas: {
    applicant: string, phone: string, company: string, content: string, time: string,
    positions: { name: string, start_date: string, end_date: string },
    examine: { checker: string, checker_date: string, reply: string },
  },
  tagArray: Array<any>
}

class workOrderDetail extends React.Component<{ history: any }>{
  public readonly state: Readonly<IState> = {
    stateName: JSON.parse(sessionStorage.getItem("workOrder")).stateName,
    datas: {
      applicant: "", phone: "", company: "", content: "", time: "",
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
    ]
  }

  public dataService: DataService = new DataService()

  componentDidMount() {
    console.log(JSON.parse(sessionStorage.getItem("workOrder")))
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
    let tagArray = this.state.tagArray
    tagArray[0][0].content = data.response.name
    tagArray[0][1].content = data.response.phone
    tagArray[0][2].content = data.response.company_name
    tagArray[0][3].content = data.response.role_name
    tagArray[0][4].content = data.response.photo
    console.log('aaaaaaaa', tagArray)
    this.setState({ tagArray: tagArray, datas: data.response })
  }

  callBackGetBookingRoomInfo(data) {
    let tagArray = this.state.tagArray
    tagArray[1][0].content = data.response.applicant
    tagArray[1][1].content = data.response.phone
    tagArray[1][2].content = data.response.company_name
    tagArray[1][3].content = data.response.role_name
    tagArray[1][4].content = data.response.photo
    console.log('aaaaaaaa', tagArray)
    this.setState({ tagArray: tagArray, datas: data.response })
    console.log("222", data)
  }

  callBackGetAdvertisementPointInfo(data) {
    this.setState({ datas: data.response})
    console.log("333", data)
  }

  callBackGetRepairInfo(data) {
    this.setState({ datas: data.response })
    console.log("444", data)
  }

  // 返回
  goBack() {
    this.props.history.goBack()
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
      
        <div style={{ fontSize: "40px", color: "#949494", float: "right", margin: "30px 50px 0 0" }}>工单申请时间：{this.state.datas.time}</div>
        <div style={{ width: "100%", overflow: "hidden", textAlign: "center" }}>
          <div style={{ border: "2px solid #F2F2F2", width: "90%", margin: "30px 0 0 5%"}}></div>
        </div>

        <div style={{ margin: "30px 0 0 50px" }}>
          <span style={{ color: "#949494", fontSize: "40px" }}>由</span>
          <span style={{ color: "#333333", fontSize: "40px", marginLeft: "25px", fontWeight: "600" }}>{this.state.datas.examine.checker}</span>
          <span style={{ color: "#949494", fontSize: "40px", marginLeft: "25px" }}>审核于</span>
          <span style={{ color: "#333333", fontSize: "40px", marginLeft: "25px" }}>{this.state.datas.examine.checker_date}</span>
        </div>
        <div style={{ margin: "20px 0 0 50px" }}>
          <span style={{ color: "#949494", fontSize: "40px" }}>审核回复:</span>
        </div>
        <div style={{ margin: "20px 0 0 50px" }}>
          <span style={{ color: "#333333", fontSize: "40px" }}>{this.state.datas.examine.reply}</span>
        </div>
      </div>
    )
  }
}

export default workOrderDetail;
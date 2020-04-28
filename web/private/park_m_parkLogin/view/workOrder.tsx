import * as React from "react";
import "css!./styles/workOrder.css"
import { Link } from 'react-router-dom';
import DataService from "dataService";

interface IProps {

}

interface IState {
  tagList: Array<any>,
  tagIndex: number,
  workOrderArray: Array<any>
}

class WorkOrder extends React.Component<{ history: any }>{
  public readonly state: Readonly<IState> = {
    tagList: [
      { id: 0, name: "全部" }
    ],
    tagIndex: 0,
    workOrderArray: [
      { id: "", applicant: [{Name: ""}], state_name: "", time: ""}
    ]
  }

  public dataService: DataService = new DataService()

  componentDidMount() {
    this.dataService.getMyAuthorityWorkType(this.callBackGetMyAuthorityWorkType.bind(this), 8)
    this.dataService.getMyAuthorityStateType(this.callBackGetMyAuthorityStateType.bind(this), 1)
    this.getMyWork()
  }

  callBackGetMyAuthorityWorkType(data) {
    let tagList = this.state.tagList
    data.response.forEach(item => {
      tagList.push(item)
    })
    this.setState({ tagList: tagList })
  }

  callBackGetMyAuthorityStateType(data) {
    console.log(data)
  }

  callBackGetMyWork(data) {
    if (data.response) {
      this.setState({ workOrderArray: data.response })
    } else {
      this.setState({ workOrderArray: [] })
    }
  }

  getMyWork() {
    let obj = {
      id: JSON.parse(sessionStorage.getItem("userInfos")).userId,
      work_type: this.state.tagIndex,
      state_type: 1
    }
    this.dataService.getMyWork(this.callBackGetMyWork.bind(this), obj)
  }


  changeTag(index) {
    this.setState({ tagIndex: index }, () => {
      this.getMyWork()
    })
  }

  // 返回
  goBack() {
    this.props.history.goBack()
  }

  goWorkOrderDetail(index) {
    let obj = {
      id: this.state.workOrderArray[index].id,
      workType: this.state.workOrderArray[index].work_type,
      name: this.state.workOrderArray[index].work_type == 1 ? "身份认证工单" : this.state.workOrderArray[index].work_type == 2 ?
      "场地预定工单" : this.state.workOrderArray[index].work_type == 3 ? "摆点申请工单" : "在线保修工单",
      stateName: this.state.workOrderArray[index].state_name
    }
    sessionStorage.setItem("workOrder", JSON.stringify(obj))
    this.props.history.push("/workOrderDetail")
  }

  render() {
    return (
      <div className="work-order">
        <div className="work-order-back" onClick={this.goBack.bind(this)}>
          <img src="./park_m/image/back.png" style={{ margin: "-10px 10px 0 0" }}/>
          <span>我的工单</span>
        </div>
        <div className="work-order-tag">
          {
            this.state.tagList.map((item, index) => {
              return <div key={index} className={index === this.state.tagIndex ? "work-order-tag-child-add" : "work-order-tag-child"} onClick={e=>this.changeTag(index)}>
                {item.name}
              </div>
            })
          }
        </div>
        <div className="work-order-list">
          {
            this.state.workOrderArray.map((item, index) => {
              return (
                <div key={index} className="work-order-list-child" onClick={e=> this.goWorkOrderDetail(index)}>
                  <div style={{ overflow: "hidden", margin: "30px 0 0 40px" }}>
                    <div style={{ float: "left", fontSize: "40px", color: "#333333", fontWeight: "600" }}>
                      {item.work_type == 1 ? "身份认证工单" : item.work_type == 2 ? "场地预定工单" : item.work_type == 3 ? "摆点申请工单" : "在线保修工单" }
                    </div>
                    <img style={{ float: "right", marginRight: "40px"}} src="./park_m/image/right.png"/>
                  </div>
                  <div style={{ fontSize: "38px", color: "#949494", margin: "30px 0 0 40px" }}>
                    申请人：{item.applicant[0].Name}
                  </div>
                  <div style={{ fontSize: "38px", color: "#949494", margin: "10px 0 0 40px", overflow: "hidden" }}>
                    <div style={{ float: "left" }}>申请时间：{item.time}</div>
                    <div style={{
                      float: "right", color: "#ffffff", width: "130px", height: "55px", borderRadius: "50px",
                      marginRight: "40px", fontSize: "32px", textAlign: "center", lineHeight: "55px"
                    }} className={item.state_name == "审核中" ? "bluebg" : item.state_name == "已通过" ? "greenbg" : item.state_name == "已通过" ? "redbg" : "whitebg"} >{item.state_name}</div>
                  </div>
                </div>
              )
            })
          }
          <div style={{ width: "100%", height: "60px", textAlign: "center", fontSize: "40px", lineHeight: "60px", marginTop: "30px" }}>到底啦~</div>
        </div>
      </div>
    )
  }
}

export default WorkOrder;
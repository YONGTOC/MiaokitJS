import * as React from "react";
import "css!./styles/workOrderDetail.css"

interface IProps {

}

interface IState {
}

class workOrderDetail extends React.Component<{ history:any}> {
  public readonly state: Readonly<IState> = {

  }

  // 返回
  goBack() {
    this.props.history.goBack()
  }


  render() {
    return (
      <div className="work-order-detail">
        <div className="work-order-detail-top">
          <div className="work-order-detail-title">数字园区</div>
        </div>
        <div className="work-order-detail-back" onClick={this.goBack.bind(this)}>
          <img src="./mpark/image/back.png" style={{ margin: "-10px 10px 0 0" }} />
          <span>我的工单</span>
        </div>
        <div style={{ padding: "40px 0 0 50px", borderBottom: "4px solid #F2F2F2", width: "100%", height: "140px" }}>
          <span style={{ fontSize: "40px", fontWeight: "600"}}>场地预定工单</span>
          <span style={{
            float: "right", backgroundColor: "#D50202", color: "#ffffff", width: "130px", height: "55px", borderRadius: "50px",
            marginRight: "40px", fontSize: "32px", textAlign: "center", lineHeight: "55px"
          }}>未通过</span>
        </div>
        <div style={{ margin: "30px 0 0 50px"}}>
          <span style={{ color: "#949494", fontSize: "40px" }}>申请人</span>
          <span style={{ color: "#333333", fontSize: "40px", marginLeft: "60px"}}>小明</span>
        </div>
        <div style={{ margin: "30px 0 0 50px" }}>
          <span style={{ color: "#949494", fontSize: "40px" }}>手机号码</span>
          <span style={{ color: "#333333", fontSize: "40px", marginLeft: "60px" }}>15578383040</span>
        </div>
        <div style={{ margin: "30px 0 0 50px" }}>
          <span style={{ color: "#949494", fontSize: "40px" }}>申请企业</span>
          <span style={{ color: "#333333", fontSize: "40px", marginLeft: "60px" }}>浙江永拓信息科技有限公司</span>
        </div>
        <div style={{ margin: "30px 0 0 50px" }}>
          <span style={{ color: "#949494", fontSize: "40px" }}>使用场地</span>
          <span style={{ color: "#333333", fontSize: "40px", marginLeft: "60px" }}>A座二楼217会议室</span>
        </div>
        <div style={{ margin: "30px 0 0 50px" }}>
          <span style={{ color: "#949494", fontSize: "40px" }}>开始日期</span>
          <span style={{ color: "#333333", fontSize: "40px", marginLeft: "60px" }}>2020-2-20</span>
        </div>
        <div style={{ margin: "30px 0 0 50px" }}>
          <span style={{ color: "#949494", fontSize: "40px" }}>开始时间</span>
          <span style={{ color: "#333333", fontSize: "40px", marginLeft: "60px" }}>9:30</span>
        </div>
        <div style={{ margin: "30px 0 0 50px" }}>
          <span style={{ color: "#949494", fontSize: "40px" }}>结束日期</span>
          <span style={{ color: "#333333", fontSize: "40px", marginLeft: "60px" }}>2020-2-20</span>
        </div>
        <div style={{ margin: "30px 0 0 50px" }}>
          <span style={{ color: "#949494", fontSize: "40px" }}>结束时间</span>
          <span style={{ color: "#333333", fontSize: "40px", marginLeft: "60px" }}>17:30</span>
        </div>
        <div style={{ margin: "30px 0 0 50px" }}>
          <span style={{ color: "#949494", fontSize: "40px" }}>会议主题</span>
          <span style={{ color: "#333333", fontSize: "40px", marginLeft: "60px" }}>公司培训会议</span>
        </div>
        <div style={{ margin: "30px 0 0 50px", overflow: "hidden" }}>
          <div style={{ color: "#949494", fontSize: "40px", float: "left" }}>具体需求</div>
          <div style={{ color: "#333333", fontSize: "40px", marginLeft: "60px", float: "left", width: "70%" }}>2020公司员工培训会议公司员工培训会议公司员工培训会议公司员</div>
        </div>
        <div style={{ fontSize: "40px", color: "#949494", float: "right", margin: "30px 50px 0 0" }}>工单申请时间：2020-02-28 14:38:15</div>
        <div style={{ width: "100%", overflow: "hidden", textAlign: "center" }}>
          <div style={{ border: "2px solid #F2F2F2", width: "90%", margin: "30px 0 0 5%"}}></div>
        </div>
        <div style={{ margin: "30px 0 0 50px" }}>
          <span style={{ color: "#949494", fontSize: "40px" }}>由</span>
          <span style={{ color: "#333333", fontSize: "40px", marginLeft: "25px", fontWeight: "600" }}>小王</span>
          <span style={{ color: "#949494", fontSize: "40px", marginLeft: "25px" }}>审核于</span>
          <span style={{ color: "#333333", fontSize: "40px", marginLeft: "25px" }}>2020-02-28 17:38:15</span>
        </div>
        <div style={{ margin: "20px 0 0 50px" }}>
          <span style={{ color: "#949494", fontSize: "40px" }}>审核回复:</span>
        </div>
        <div style={{ margin: "20px 0 0 50px" }}>
          <span style={{ color: "#333333", fontSize: "40px" }}>场地当天需要维修施工，无法使用</span>
        </div>
      </div>
    )
  }
}

export default workOrderDetail;
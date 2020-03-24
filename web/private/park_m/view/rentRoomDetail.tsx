import * as React from "react";
import "css!./styles/rentRoomDetail.css"

interface IProps {
}

interface IState {
  
}

class RentRoomDetail extends React.Component<{ history: any }>{
  public readonly state: Readonly<IState> = {
   
  }

  // 返回
  goBack() {
    this.props.history.goBack()
  }

  render() {
    return (
      <div className="rent-room-detail">
        <div className="rent-room-back">
          <div style={{ float: "left" }} onClick={this.goBack.bind(this)}>
            <img src="./park_m/image/back.png" style={{ margin: "-10px 10px 0 0" }} />
            <span>租用房间管理</span>
          </div>
        </div>
        <div className="rent-room-detail-content">
          <div style={{ overflow: "hidden", marginBottom: "20px" }}>
            <div style={{ float: "left", width: "22%" }}>房间名称</div><div style={{ color: "#333333", marginLeft: "30px", float: "left", width: "60%" }}>A座-1F-201室</div>
          </div>
          <div style={{ overflow: "hidden", marginBottom: "20px" }}>
            <div style={{ float: "left", width: "22%" }}>使用状态</div><div style={{ color: "#333333", marginLeft: "30px", float: "left", width: "60%" }}>租用中</div>
          </div>
          <div style={{ overflow: "hidden", marginBottom: "20px" }}>
            <div style={{ float: "left", width: "22%" }}>租用单位</div><div style={{ color: "#333333", marginLeft: "30px", float: "left", width: "60%" }}>浙江永拓信息科技有限公司</div>
          </div>
          <div style={{ overflow: "hidden", marginBottom: "20px" }}>
            <div style={{ float: "left", width: "22%" }}>租用人</div><div style={{ color: "#333333", marginLeft: "30px", float: "left", width: "60%" }}>小明</div>
          </div>
          <div style={{ overflow: "hidden", marginBottom: "20px" }}>
            <div style={{ float: "left", width: "22%" }}>联系电话</div><div style={{ color: "#333333", marginLeft: "30px", float: "left", width: "60%" }}>123456789</div>
          </div>
          <div style={{ overflow: "hidden", marginBottom: "20px" }}>
            <div style={{ float: "left", width: "22%" }}>租用日期</div><div style={{ color: "#F53636", marginLeft: "30px", float: "left", width: "60%" }}>2020-03-20 ~ 2021-03-20</div>
          </div>
        </div>
      </div>
    )
  }
}

export default RentRoomDetail;
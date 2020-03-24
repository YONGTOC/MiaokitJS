import * as React from "react";
import "css!./styles/workOrder.css"
import { Link } from 'react-router-dom';

interface IProps {

}

interface IState {
  tagList: Array<any>,
  tagIndex: number,
  workOrderArray: Array<any>
}

class ParkWorkOrder extends React.Component<{ history: any }>{
  public readonly state: Readonly<IState> = {
    tagList: ["全部", "审核中", "已通过", "未通过", "已转单"],
    tagIndex: 0,
    workOrderArray: [1, 2, 3, 4, 5, 6, 7, 8, 9]
  }

  changeTag(index) {
    this.setState({ tagIndex: index })
  }

  // 返回
  goBack() {
    this.props.history.goBack()
  }

  render() {
    return (
      <div className="work-order">
        <div className="work-order-top">
          <div className="work-order-title">数字园区</div>
        </div>
        <div className="work-order-back" onClick={this.goBack.bind(this)}>
          <img src="./park_m/image/back.png" style={{ margin: "-10px 10px 0 0" }} />
          <span>我的工单</span>
        </div>
        <div className="work-order-tag">
          {
            this.state.tagList.map((item, index) => {
              return <div key={index} className={index === this.state.tagIndex ? "work-order-tag-child-add" : "work-order-tag-child"} onClick={e => this.changeTag(index)}>
                {item}
              </div>
            })
          }
        </div>
        <div className="work-order-list">
          {
            this.state.workOrderArray.map((item, index) => {
              return <Link to="/workOrderDetail">
                <div key={index} className="work-order-list-child">
                  <div style={{ overflow: "hidden", margin: "30px 0 0 40px" }}>
                    <div style={{ float: "left", fontSize: "40px", color: "#333333", fontWeight: "600" }}>企业认证工单1</div>
                    <img style={{ float: "right", marginRight: "40px" }} src="./park_m/image/right.png" />
                  </div>
                  <div style={{ fontSize: "38px", color: "#949494", margin: "30px 0 0 40px" }}>
                    申请人：莫XX
                  </div>
                  <div style={{ fontSize: "38px", color: "#949494", margin: "10px 0 0 40px", overflow: "hidden" }}>
                    <div style={{ float: "left" }}>申请时间：2020-02-28 14:38:15</div>
                    <div style={{
                      float: "right", backgroundColor: "#0BC491", color: "#ffffff", width: "130px", height: "55px", borderRadius: "50px",
                      marginRight: "40px", fontSize: "32px", textAlign: "center", lineHeight: "55px"
                    }}>已通过</div>
                  </div>
                </div>
              </Link>
            })
          }
          <div style={{ width: "100%", height: "60px", textAlign: "center", fontSize: "40px", lineHeight: "60px", marginTop: "30px" }}>到底啦~</div>
        </div>
      </div>
    )
  }
}

export default ParkWorkOrder;
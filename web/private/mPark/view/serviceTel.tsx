import * as React from "react";
import "css!./styles/serviceTel.css"

interface IProps {
}

interface IState {
}

class ServiceTel extends React.Component {
  public readonly state: Readonly<IState> = {
  }

  // 返回
  goBack() {
    this.props.history.goBack()
  }

  render() {
    return (
      <div className="rent-room">
        <div className="rent-room-top">
          <div className="rent-room-title">
            数字园区
          </div>
        </div>
        <div className="rent-room-back">
          <div style={{ float: "left" }} onClick={this.goBack.bind(this)}>
            <img src="./mpark/image/back.png" style={{ margin: "-10px 10px 0 0" }} />
            <span>客服电话</span>
          </div>
        </div>
        <div className="service-tel">
          <span>客服电话</span><span style={{marginLeft: "90px"}}>0773-123456</span><span style={{ float: "right", color: "#0B8BF0", marginRight: "50px" }}>修改</span>
        </div>
      </div>
    )
  }
}

export default ServiceTel;
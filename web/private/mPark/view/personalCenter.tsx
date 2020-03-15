import * as React from "react";
import "css!./styles/personalCenter.css"

interface IProps {
}

interface IState {
}

class PersonalCenter extends React.Component {
  public readonly state: Readonly<IState> = {
  }

  render() {
    return (
      <div className="personal-center">
        <div className="personal-center-top">
          <div className="personal-center-title">数字园区</div>
          <div className="personal-center-info">
            <div className="personal-center-tx">
              <img src="./mpark/image/tx.jpg" className="personal-center-tx-img" />
            </div>
            <div style={{ float: "left", color: "#FFFFFF", fontSize: "42px", margin: "10px 0 0 36px"}}>
              <div>用户名字</div>
              <div style={{
                color: "#83d5ff", fontSize: "27px", backgroundColor: "#2e9cf3", width: "160px",
                height: "50px", textAlign: "center", lineHeight: "50px", borderRadius: "30px", marginTop: "20px"
              }}>园区成员</div>
            </div>
            <div>
              <img src="./mpark/image/w-right.png" style={{float: "right", margin: "50px 30px 0 0"}} />
            </div>
          </div>
        </div>
        <div className="personal-center-tag">
          <span style={{ margin: "0 50px 0 50px" }}>手机号码</span><span>15578383040</span><span style={{ float: "right", marginRight: "50px", color: "#0B8BF0"}}>修改</span>
        </div>
        <div className="personal-center-tag">
          <span style={{ margin: "0 50px 0 50px" }}>关联企业</span><span>浙江永拓信息科技有限公司</span><span style={{ float: "right", marginRight: "50px", color: "#0B8BF0" }}>修改</span>
        </div>
        <div className="personal-center-tag">
          <span style={{ margin: "0 50px 0 50px" }}>客服电话</span><span>0773-123456</span>
        </div>
        <div className="personal-center-my">
          <div className="personal-center-my-left">
            <div style={{ fontSize: "40px", marginTop: "30px", color: "#333333" }}>5</div>
            <div style={{ fontSize: "40px", marginTop: "5px", color: "#6C6C6C" }}>我的工单</div>
          </div>
          <div className="personal-center-my-middle">
          </div>
          <div className="personal-center-my-right">
            <div style={{ fontSize: "40px", marginTop: "30px", color: "#333333"}}>6</div>
            <div style={{ fontSize: "40px", marginTop: "5px", color: "#6C6C6C" }}>我的消息</div>
          </div>
        </div>
      </div>
    )
  }
}

export default PersonalCenter;
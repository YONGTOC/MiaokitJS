import * as React from "react";
import "css!./styles/distribute.css"
import { Link } from 'react-router-dom';

interface IProps {
}

interface IState {
  distributeList: Array<any>
}

class Distribute extends React.Component {
  public readonly state: Readonly<IState> = {
    distributeList: [
      { title: "身份认证工单管理", userName: "小明" }, { title: "场地预定工单管理", userName: "小明" }, { title: "摆点申请工单管理", userName: "小明" }, 
      { title: "在线报修工单管理", userName: "小明" }, { title: "停车业务工单管理", userName: "小明" }, { title: "投诉建议工单管理", userName: "小明" },
      { title: "随手拍工单管理", userName: "小明" }, { title: "身份认证工单管理", userName: "小明" }, { title: "身份认证工单管理", userName: "小明" }
    ]
  }

  // 返回
  goBack() {
    this.props.history.goBack()
  }

  render() {
    return (
      <div className="rent-room">
        <div className="rent-room-back">
          <div style={{ float: "left" }} onClick={this.goBack.bind(this)}>
            <img src="./mpark/image/back.png" style={{ margin: "-10px 10px 0 0" }} />
            <span>工单派发管理</span>
          </div>
        </div>
        <div className="distribute-list">
          {this.state.distributeList.map((item, index) => {
            return (
              <div key={index} className="distribute-list-child">
                <div style={{ padding: "30px 0 0 45px", fontWeight: "600" }}>
                  {item.title}
                </div>
                <div style={{ padding: "30px 0 0 45px", overflow: "hidden" }}>
                  <div style={{ float: "left" }}>工单负责人：</div>
                  <div style={{
                    float: "left", height: "70px", backgroundColor: "#E8F5FE", borderRadius: "5px", border: "3px solid #C3E3FA", overflow: "hidden", lineHright: "70px", textAlign: "center",
                    minWidth: "150px"}}>
                    <div style={{ height: "100%", width: "60px", float: "left", lineHeight: "52px" }}>
                      <img src="./mpark/image/user.png" width="40px" height="40px"/>
                    </div>
                    <div style={{ float: "left", lineHeight: "61px", height: "100%", minWidth: "90px", padding: "0 20px 0 15px" }}>小明</div>
                  </div>
                  <Link to="/searchUser"><div style={{ float: "right", color: "#0B8BF0", marginRight: "50px", textAlign: "center" }}>修改</div></Link>
                </div>
              </div>  
            )
          })
          }
          <div style={{ width: "100%", height: "100px", textAlign: "center", fontSize: "40px", lineHeight: "100px" }}>到底啦~</div>
        </div>
      </div>
    )
  }
}

export default Distribute;
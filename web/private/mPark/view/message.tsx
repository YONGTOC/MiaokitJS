import * as React from "react";
import "css!./styles/message.css"

interface IProps {
}

interface IState {
  tagList: Array<any>,
  tagIndex: number,
  workOrderArray: Array<any>
}

class Message extends React.Component {
  public readonly state: Readonly<IState> = {
    tagList: ["全部", "房屋租赁到期", "车位到期", "参与活动"],
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
          <img src="./mpark/image/back.png" style={{ margin: "-10px 10px 0 0" }} />
          <span>我的消息</span>
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
              return  <div key={index} className="work-order-list-child">
                <div style={{ overflow: "hidden", margin: "30px 0 0 40px" }}>
                  <div style={{ float: "left", fontSize: "40px", color: "#333333", fontWeight: "600" }}>房屋租赁即将到期</div>
                </div>
                <div style={{ fontSize: "38px", color: "#DB0A0A", margin: "30px 0 0 40px" }}>
                  房间位置：信息产业园A座215室
                </div>
                <div style={{ fontSize: "38px", color: "#DB0A0A", margin: "10px 0 0 40px" }}>
                  到期时间：2020-03-28 14:38:15
                </div>
              </div>
            })
          }
          <div style={{ width: "100%", height: "60px", textAlign: "center", fontSize: "40px", lineHeight: "60px", marginTop: "30px" }}>到底啦~</div>
        </div>
      </div>
    )
  }
}

export default Message;
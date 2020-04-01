import * as React from "react";
import "css!./styles/message.css"
import DataService from "dataService";

interface IProps {
}

interface IState {
  tagList: Array<any>,
  tagIndex: number,
  workOrderArray: Array<any>
}

class Message extends React.Component<{ history: any }>{
  public readonly state: Readonly<IState> = {
    tagList: ["全部", "房屋租赁到期", "车位到期", "参与活动"],
    tagIndex: 0,
    workOrderArray: []
  }

  public dataService: DataService = new DataService()

  componentDidMount() {
    this.dataService.getMyMsgType(this.callBackGetMyMsgType.bind(this))
    this.dataService.getMyMsgInfo(this.callBackGetMyMsgInfo.bind(this), "")
  }

  callBackGetMyMsgType(data) {
    if (data.return_code == 100) {
      let tagList = [{id: 0, name: "全部"}]
      data.response.forEach(item => {
        tagList.push(item)
      })
      this.setState({
        tagList: tagList
      })
    }
  }

  callBackGetMyMsgInfo(data) {
    console.log(data)
    if (data.return_code == 100) {
      this.setState({ workOrderArray: data.response })
    }
  }

  changeTag(index) {
    this.setState({ tagIndex: index }, ()=> {
      this.dataService.getMyMsgInfo(this.callBackGetMyMsgInfo.bind(this), this.state.tagIndex)
    })

  }
  
  // 返回
  goBack() {
    this.props.history.goBack()
  }

  render() {
    return (
      <div className="work-order">
        <div className="work-order-back" onClick={this.goBack.bind(this)}>
          <img src="./park_m/image/back.png" style={{ margin: "-10px 10px 0 0" }} />
          <span>我的消息</span>
        </div>
        <div className="work-order-tag">
          {
            this.state.tagList.map((item, index) => {
              return <div key={index} className={index === this.state.tagIndex ? "work-order-tag-child-add" : "work-order-tag-child"} onClick={e => this.changeTag(index)}>
                {item.name}
              </div>
            })
          }
        </div>
        <div className="work-order-list">
          {
            this.state.workOrderArray.map((item, index) => {
              return  <div key={index} className="work-order-list-child">
                <div style={{ overflow: "hidden", margin: "30px 0 0 40px" }}>
                  <div style={{ float: "left", fontSize: "40px", color: "#333333", fontWeight: "600" }}>{item.name}</div>
                </div>
                <div style={{ fontSize: "38px", color: "#DB0A0A", margin: "30px 0 0 40px" }}>
                  {item.info}
                </div>
                <div style={{ fontSize: "38px", color: "#DB0A0A", margin: "10px 0 0 40px" }}>
                  {item.time}
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
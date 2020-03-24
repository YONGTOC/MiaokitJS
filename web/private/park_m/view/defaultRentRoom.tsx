import * as React from "react";
import "css!./styles/defaultRentRoom.css"

interface IProps {
}

interface IState {
  workOrderArray: Array<any>,
  defaultIndex: number
}

class DetaultRentRoom extends React.Component {
  public readonly state: Readonly<IState> = {
    workOrderArray: ["A座-1F-201室", "A座-1F-202室", "A座-1F-203室"],
    defaultIndex: 0
  }

  // 返回
  goBack() {
    this.props.history.goBack()
  }

  changeDefaultIndex(index) {
    this.setState({ defaultIndex: index })
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
        <div className="rent-room-list">
          {
            this.state.workOrderArray.map((item, index) => {
              return (
                <div key={index} className="rent-room-list-child" onClick={e => this.changeDefaultIndex(index)}>
                  <div style={{ float: "left", height: "100%", width: "13%", lineHeight: "286px", textAlign: "center" }}>
                    {this.state.defaultIndex === index ?
                      <img src="./park_m/image/checked.png" /> : 
                      <img src="./park_m/image/unchecked.png" />
                    }
                  </div>
                  <div style={{ float: "left", height: "100%", width: "87%" }}>
                    <div style={{ overflow: "hidden", margin: "30px 0 0 0" }}>
                      <div style={{ float: "left", fontSize: "40px", color: "#333333", fontWeight: "600" }}>{item}</div>
                      <img style={{ float: "right", marginRight: "40px" }} src="./park_m/image/right.png" />
                    </div>
                    <div style={{ fontSize: "38px", color: "#949494", margin: "30px 0 0 0" }}>
                      使用状态：<span style={{ marginLeft: "30px", color: "#333333" }}>租用中</span>
                    </div>
                    <div style={{ fontSize: "38px", color: "#949494", margin: "10px 0 0 0", overflow: "hidden" }}>
                      <div style={{ float: "left" }}>租用日期：<span style={{ color: "#F53636" }}>2020-03-20 ~ 2021-03-20</span></div>
                    </div>
                  </div>
                </div>
              )
            })
          }
        </div>
        <div className="rent-room-detail-bottom">
          <div style={{ float: "left", width: "50%", height: "100%", textAlign: "center", lineHeight: "130px", color: "#6C6C6C" }}>取消</div>
          <div style={{ float: "left", width: "50%", height: "100%", textAlign: "center", lineHeight: "130px", backgroundColor: "#0B8BF0", color: "#ffffff" }}>提交</div>
        </div>
      </div>
    )
  }
}

export default DetaultRentRoom;
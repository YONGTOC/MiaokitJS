import * as React from "react";
import "css!./styles/statisticalStatement.css"
import Ring from "ring"

interface IProps {
  history: any
}

interface IState {
  ringList: Array<any>,
  ringRadius: number,
  ringWidth: number,
  fontSize: number,
  ringName: string,
  ringNumber: number
}

class StatisticalStatement extends React.Component {
  public readonly props: Readonly<IProps> = {
    history: this.props.history
  }

  public readonly state: Readonly<IState> = {
    ringList: [
      { color: "#55D8FE", percentage: 0.5, name: "厂房", number: 200 }, { color: "#FF8373", percentage: 0.1, name: "套间", number: 1000 }, { color: "#FFDA83", percentage: 0.25, name: "单间", number: 500 },
      { color: "#A3A0FB", percentage: 0.15, name: "房间", number: 300 }
    ], // 数据
    ringRadius: 250, // 环半径
    ringWidth: 100, // 环宽度
    fontSize: 50, // 字体大小
    ringName: "总数", // 名字
    ringNumber: 2000 // 数量
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
            <img src="./park_m/image/back.png" style={{ margin: "-10px 10px 0 0" }} />
            <span>客服电话</span>
          </div>
        </div>
        {["房屋面积统计", "出租统计", "入驻分类统计"].map((item, index) => {
          return (
            <div className="statistical-statementl-child" key={index}>
              <div className="statistical-statement-sign">
                <div style={{ height: "100%", width: "12px", backgroundColor: "#0B8BF0", float: "left", marginRight: "25px" }}></div>
                <div style={{ float: "left" }}>{item}</div>
              </div>
              <div style={{ width: "100%", padding: "90px 20px 20px 80px" }}>
                <Ring ringList={this.state.ringList} ringRadius={this.state.ringRadius} ringWidth={this.state.ringWidth} fontSize={this.state.fontSize}
                  ringName={this.state.ringName} ringNumber={this.state.ringNumber} label={true} />
              </div>
            </div>
            )
          })
        }
      </div>
    )
  }
}

export default StatisticalStatement;
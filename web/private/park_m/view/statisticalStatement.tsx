import * as React from "react";
import "css!./styles/statisticalStatement.css"
import Ring from "ring"
import DataService from "dataService";

interface IProps {
  history: any
}

interface IState {
  squre: Array<any>,
  rent: Array<any>,
  into: Array<any>,
  ringRadius: number,
  ringWidth: number,
  fontSize: number,
  ringName: string,
  colorArr: Array<any> 
  ringList: Array<any>
}

class StatisticalStatement extends React.Component {
  public readonly props: Readonly<IProps> = {
    history: this.props.history
  }

  public readonly state: Readonly<IState> = {
    squre: [], // 数据
    rent: [],
    into: [],
    ringRadius: 250, // 环半径
    ringWidth: 100, // 环宽度
    fontSize: 50, // 字体大小
    ringName: "总数", // 名字
    colorArr: [{ color: "#55D8FE" }, { color: "#FF8373" }, { color: "#FFDA83" }, { color: "#A3A0FB" }],
    ringList: [
      { array: [], name: "房屋面积统计", sum: 0 },
      { array: [], name: "出租统计", sum: 0 },
      { array: [], name: "入驻分类统计", sum: 0 }
    ]
  }

  public dataService: DataService = new DataService()

  componentDidMount() {
    this.dataService.getMyStatistic(this.callBackGetMyStatistic.bind(this))
  }

  callBackGetMyStatistic(data) {
    console.log(data)
    if (data.return_code == 100) {
      this.adjustment(data.response.squre, 0)
      this.adjustment(data.response.rent, 1)
      this.adjustment(data.response.into, 2)
      this.setState({
        squre: data.response.squre,
        rent: data.response.rent,
        into: data.response.into
      })
    }
  }

  adjustment(arr, index) {
    let sum = 0
    let ringList = this.state.ringList
    arr.forEach(item => {
      sum = parseInt(item.amount) + sum
    })
    arr.forEach((item, index) => {
      item.color = this.state.colorArr[index].color,
      item.percentage = item.amount / sum
    })
    ringList[index].sum = sum
    ringList[index].array = arr
    this.setState({ ringList: ringList })
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
        {this.state.squre.length > 0 ?
          this.state.ringList.map((item, index) => {
            return (
              <div className="statistical-statementl-child" key={index}>
                <div className="statistical-statement-sign">
                  <div style={{ height: "100%", width: "12px", backgroundColor: "#0B8BF0", float: "left", marginRight: "25px" }}></div>
                  <div style={{ float: "left" }}>{item.name}</div>
                </div>
                <div style={{ width: "100%", padding: "90px 20px 20px 80px" }}>
                  <Ring ringList={item.array} ringRadius={this.state.ringRadius} ringWidth={this.state.ringWidth} fontSize={this.state.fontSize}
                    ringName={this.state.ringName} ringNumber={item.sum} label={true} />
                </div>
              </div>
            )
          })
         : null
        }
      </div>
    )
  }
}

export default StatisticalStatement;
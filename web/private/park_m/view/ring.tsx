import * as React from "react";
import "css!./styles/ring.css"

interface IProps {
  ringList: Array<any>,
  ringRadius: number,
  ringWidth: number,
  fontSize: number,
  ringName: string,
  ringNumber: number,
  label: boolean,
  labelType: number
}

interface IState {
  ringList: Array<any>,
  innerRingRadius: number,
  fontTop: number,
  label: boolean,
  ringName: string,
  ringNumber: number,
}

export default class Ring extends React.Component {
  public readonly props: Readonly<IProps> = {
    ringList: this.props.ringList,
    ringRadius: 0,
    ringWidth: 0,
    fontSize: this.props.fontSize,
    ringName: this.props.ringName,
    ringNumber: this.props.ringNumber,
    label: true,
    labelType: 0
  }

  public readonly state: Readonly<IState> = {
    ringList: [],
    innerRingRadius: 0,
    fontTop: 0, // 字体顶部padding
    label: false,
    ringName: "",
    ringNumber: 0,
  }

  componentDidMount() {
    this.init()
    this.calculatePercentage()
  }

  // 初始化
  init() {
    let innerRingRadius = this.props.ringRadius - this.props.ringWidth
    this.setState({ innerRingRadius: innerRingRadius, fontTop: innerRingRadius - this.props.fontSize * 1.5 })
  }

  // 计算百分比
  calculatePercentage() {
    let ringList = []
    let position = 0
    let percentageFloat = 0
    this.props.ringList.map(item => {
      if (item.percentage / 0.25 > 1) {
        for (let i = 1; i <= item.percentage / 0.25; i++) {
          ringList.push({ color: item.color, percentage: 0.25, position: position, length: 91, name: item.name, number: item.amount })
          position = position + 90
        }
        if (item.percentage % 0.25 !== 0) {
          percentageFloat = parseFloat("0." + (item.percentage / 0.25).toString().replace(/\d+\.(\d*)/, "$1"))
          ringList.push({ color: item.color, percentage: percentageFloat * 0.25, position: position, length: percentageFloat * 0.25 * 360, name: item.name, number: item.amount })
          position = position + percentageFloat * 90
        }
      } else {
        ringList.push({ color: item.color, percentage: item.percentage, position: position, length: item.percentage * 360, name: item.name, number: item.amount })
        position = position + item.percentage * 360
      }
    })
    console.log("ringList", ringList)
    this.setState({ ringList: ringList, label: this.props.label ? true : this.props.label, ringName: this.props.ringName, ringNumber: this.props.ringNumber })
  }

  // 选择类型
  choiceType(index) {
    this.setState({ ringName: this.state.ringList[index].name, ringNumber: this.state.ringList[index].number }, () => {
      console.log("ringNumber", this.state.ringList[index])
    })
  }


  render() {
    return (
      <div className="ring">
        <div className="ring-a" style={{ width: this.props.ringRadius * 2, height: this.props.ringRadius * 2 }}>
          <div className="inner-ring"
            style={{ width: this.state.innerRingRadius * 2, height: this.state.innerRingRadius * 2, margin: this.props.ringRadius - this.state.innerRingRadius, fontSize: this.props.fontSize }}>
            <div style={{ width: "100%", height: "50%", paddingTop: this.state.fontTop }}>
              <div>{this.state.ringName}</div>
            </div>
            <div style={{ width: "100%", height: "50%" }}>
              <div>{this.state.ringNumber}</div>
            </div>
          </div>
          {this.state.ringList.map((item, index) => {
            return (
              <div key={index} className="ring-common" style={{ backgroundColor: item.color, transform: "rotate(" + item.position + "deg)" + " " + "skewY(" + (item.length - 90) + "deg)" }}
                onClick={e => this.choiceType(index)}>
              </div>
            )
          })
          }
        </div>
        {this.state.label ?
          <div style={{ width: this.props.labelType === 2 ? "100%" : null, overflow: "hidden" }}>
            {
              this.props.labelType === 1 ?
              <div style={{ float: "left", height: this.props.ringRadius * 2, paddingTop: (this.props.ringRadius * 2 - this.props.ringRadius * 2 / 1.5 + (this.props.ringRadius * 2 / 1.5 / 4)) / 2 }}>
                {this.props.ringList.map((item, index) => {
                  return (
                    <div style={{ width: "100%", height: this.props.ringRadius * 2 / this.state.ringList.length / 1.5, overflow: "hidden", marginLeft: "60px" }} key={index}>
                      <div style={{ height: "30px", width: "30px", border: "5px solid " + item.color, borderRadius: "50%", float: "left", marginTop: "10px" }}></div>
                      <div style={{ float: "left", color: "#333333", fontSize: "32px", marginLeft: "30px" }}>{item.name}</div>
                    </div>
                  )
                })
                }
              </div> 
                :
              <div style={{ height: this.props.ringRadius * 2, paddingTop: "40px" }}>
                {this.props.ringList.map((item, index) => {
                  return (
                    <div style={{ float: "left", width: "20%", height: this.props.ringRadius * 2 / this.state.ringList.length / 1.5, overflow: "hidden", marginLeft: "30px" }} key={index}>
                      <div style={{ height: "30px", width: "30px", backgroundColor: item.color, float: "left", marginTop: "10px" }}></div>
                      <div style={{ float: "left", color: "#333333", fontSize: "32px", marginLeft: "30px" }}>{item.name}</div>
                    </div>
                  )
                })
                }
              </div>
            }
          </div>
          : null
        }
      </div>
    )
  }
}

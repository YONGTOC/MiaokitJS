import * as React from "react";
import "css!./styles/ring.css"

interface IProps {
  ringList: Array<any>,
  ringRadius: number,
  ringWidth: number,
  fontSize: number,
  RingName: string,
  RingNumber: number
}

interface IState {
  ringList: Array<any>,
  innerRingRadius: number,
  fontTop: number
}

export default class Ring extends React.Component {
  public readonly props: Readonly<IProps> = {
    ringList: this.props.ringList,
    ringRadius: this.props.ringRadius,
    ringWidth: this.props.ringWidth,
    fontSize: this.props.fontSize,
    RingName: this.props.RingName,
    RingNumber: this.props.RingNumber
  }

  public readonly state: Readonly<IState> = {
    ringList: [],
    innerRingRadius: 0,
    fontTop: 0 // 字体顶部padding
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
          ringList.push({ color: item.color, percentage: 0.25, position: position, length: 91 })
          position = position + 90
        }
        if (item.percentage % 0.25 !== 0) {
          percentageFloat = parseFloat("0." + (item.percentage / 0.25).toString().replace(/\d+\.(\d*)/, "$1"))
          ringList.push({ color: item.color, percentage: percentageFloat * 0.25, position: position, length: percentageFloat * 0.25 * 360 })
          position = position + percentageFloat * 90
        }
      } else {
        ringList.push({ color: item.color, percentage: item.percentage, position: position, length: item.percentage * 360 })
        position = position + item.percentage * 360
      }
    })
    this.setState({ ringList: ringList })
  }


  render() {
    return (
      <div className="ring">
        <div className="ring-a" style={{ width: this.props.ringRadius * 2, height: this.props.ringRadius * 2 }}>
          <div className="inner-ring"
            style={{ width: this.state.innerRingRadius * 2, height: this.state.innerRingRadius * 2, margin: this.props.ringRadius - this.state.innerRingRadius, fontSize: this.props.fontSize }}>
            <div style={{ width: "100%", height: "50%", paddingTop: this.state.fontTop }}>
              <div>{this.props.RingName}</div>
            </div>
            <div style={{ width: "100%", height: "50%" }}>
              <div>{this.props.RingNumber}</div>
            </div>
          </div>
          {this.state.ringList.map((item, index) => {
            return (
              <div key={index} className="ring-common" style={{ backgroundColor: item.color, transform: "rotate(" + item.position + "deg)" + " " + "skewY(" + (item.length - 90) + "deg)" }}>
              </div>
            )
          })
          }
        </div>
      </div>
    )
  }
}

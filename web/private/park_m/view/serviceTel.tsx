import * as React from "react";
import "css!./styles/serviceTel.css"
import DataService from "dataService";

interface IProps {
}

interface IState {
  inputValue: string
}

class ServiceTel extends React.Component<{ history: any }>{
  public readonly state: Readonly<IState> = {
    inputValue: "0773-123456"
  }

  public dataService: DataService = new DataService()

  componentDidMount() {
  }

  modification() {
    this.dataService.postParkPhone(this.callBackPostParkPhone.bind(this), this.state.inputValue)
  }

  callBackPostParkPhone(data) {
    if (data.return_code == 100) {
      alert("修改成功")
    } else {
      alert("修改失败")
    }
  }

  // 返回
  goBack() {
    this.props.history.goBack()
  }

  // 聚焦
  focus() {
    if (this.state.inputValue === "0773-123456") {
      this.setState({ inputValue: "" })
    }
  }

  // 失焦
  blur() {
    if (this.state.inputValue === "") {
      this.setState({ inputValue: "0773-123456" })
    }
  }

  // 输入
  change(event) {
    this.setState({ inputValue: event.target.value })
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
        <div className="service-tel">
          <span>客服电话</span>
          <input onFocus={this.focus.bind(this)} onBlur={this.blur.bind(this)} onChange={this.change.bind(this)} value={this.state.inputValue} style={{ marginLeft: "90px", border: "none", outline: "none" }} />
          <span style={{ float: "right", color: "#0B8BF0", marginRight: "50px" }} onClick={this.modification.bind(this)}>修改</span>
        </div>
      </div>
    )
  }
}

export default ServiceTel;
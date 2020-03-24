import * as React from "react";
import "css!./styles/modificationAuthentication.css"

interface IProps {
}

interface IState {
  inputValue: string
}

class ModificationAuthentication extends React.Component<{ history: any }> {
  public readonly state: Readonly<IState> = {
    inputValue: "用户昵称XXX"
  }

  // 聚焦
  focus() {
    if (this.state.inputValue === "用户昵称XXX") {
      this.setState({ inputValue: "" })
    }
  }

  // 失焦
  blur() {
    if (this.state.inputValue === "") {
      this.setState({ inputValue: "用户昵称XXX" })
    }
  }

  // 输入
  change(event) {
    this.setState({ inputValue: event.target.value })
  }

  // 返回
  goBack() {
    this.props.history.goBack()
  }

  render() {
    return (
      <div className="modification-authentication">
        <div className="personal-center-tag">
          <div style={{ paddingLeft: "30px", float: "left" }} onClick={this.goBack.bind(this)}>
            <img src="./park_m/image/right.png" style={{ transform: "rotate(180deg)", marginBottom: "10px" }} />
            <span style={{ color: "#6C6C6C" }}>修改认证</span>
          </div>
        </div>
        <div className="modification-authentication-tag" style={{marginTop: "15px"}}>
          <div style={{ paddingLeft: "40px", float: "left" }}>
            <span style={{ color: "#333333", fontSize: "42px" }}>用户昵称</span>
            <input value={this.state.inputValue} className="modification-authentication-input"
              onFocus={this.focus.bind(this)} onBlur={this.blur.bind(this)} onChange={this.change.bind(this)} />
          </div>
          <div style={{ float: "right", marginRight: "50px", color: "#0B8BF0" }}>修改</div>
        </div>
        <div className="modification-authentication-tag">
          <div style={{ paddingLeft: "40px", float: "left" }}>
            <span style={{ color: "#333333", fontSize: "42px" }}>身份认证</span>
            <span style={{ color: "#949494", fontSize: "42px", marginLeft: "50px" }}>认证成为管理员</span>
          </div>
          <div style={{ float: "right", marginRight: "50px", color: "#0B8BF0" }}>认证</div>
        </div>
      </div>
    )
  }
}

export default ModificationAuthentication;
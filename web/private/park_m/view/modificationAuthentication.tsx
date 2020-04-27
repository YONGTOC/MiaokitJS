import * as React from "react";
import "css!./styles/modificationAuthentication.css"
import { Link } from 'react-router-dom';
import DataService from "dataService";

interface IProps {
  location: any,
  history: any
}

interface IState {
  userName: string
}

class ModificationAuthentication extends React.Component<{ history: any }> {
  public readonly state: Readonly<IState> = {
    userName: "用户昵称XXX"
  }
  
  public readonly props: Readonly<IProps> = {
    location: this.props.location,
    history: this.props.history
  }

  public dataService: DataService = new DataService()

  componentDidMount() {
    this.setState({
      userName: this.props.location.state.name
    })

  }

  // 修改用户名字
  modifyUserName() {
    this.dataService.modifyUserName(this.callBackModifyUserName.bind(this), this.state.userName)
  }

  callBackModifyUserName(data) {
    let userInfos = JSON.parse(sessionStorage.getItem("userInfos"))
    userInfos.name = data.response
    sessionStorage.setItem("userInfos", JSON.stringify(userInfos))
    this.props.history.goBack()
  }

  // 聚焦
  focus() {
    if (this.state.userName === "用户昵称XXX") {
      this.setState({ userName: "" })
    }
  }

  // 失焦
  blur() {
    if (this.state.userName === "") {
      this.setState({ userName: "用户昵称XXX" })
    }
  }

  // 输入
  change(event) {
    this.setState({ userName: event.target.value })
  }

  // 返回
  goBack() {
    this.props.history.goBack()
  }

  render() {
    return (
      <div className="modification-authentication">
        <div className="personal-center-tag-c">
          <div style={{ paddingLeft: "30px", float: "left" }} onClick={this.goBack.bind(this)}>
            <img src="./park_m/image/right.png" style={{ transform: "rotate(180deg)", marginBottom: "10px" }} />
            <span style={{ color: "#6C6C6C" }}>修改认证</span>
          </div>
        </div>
        <div className="modification-authentication-tag" style={{marginTop: "15px"}}>
          <div style={{ paddingLeft: "40px", float: "left" }}>
            <span style={{ color: "#333333", fontSize: "42px" }}>用户昵称</span>
            <input value={this.state.userName} className="modification-authentication-input"
              onFocus={this.focus.bind(this)} onBlur={this.blur.bind(this)} onChange={this.change.bind(this)} />
          </div>
          <div style={{ float: "right", marginRight: "50px", color: "#0B8BF0" }} onClick={this.modifyUserName.bind(this)}>修改</div>
        </div>
        <div className="modification-authentication-tag">
          <div style={{ paddingLeft: "40px", float: "left" }}>
            <span style={{ color: "#333333", fontSize: "42px" }}>身份认证</span>
            <span style={{ color: "#949494", fontSize: "42px", marginLeft: "50px" }}>认证成为企业管理员</span>
          </div>
          <Link to="/identityAuthentication"><div style={{ float: "right", marginRight: "50px", color: "#0B8BF0" }}>认证</div></Link>
        </div>
      </div>
    )
  }
}

export default ModificationAuthentication;
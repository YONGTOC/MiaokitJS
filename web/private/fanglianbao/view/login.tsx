import * as React from "react";
import * as ReactDOM from "react-dom";

import Router from 'router';
import HomeTop from 'homeTop';


class Login extends React.Component {
  constructor(props) {
    super(props);


  }

  public componentDidMount() {
  }

    public closeLogin() {
    //this.setState({
    //  fullViewState: false
    //});
      $(document.body).attr('style', 'height: 100%; margin: 0; padding: 0; overflow: visible;');

   //   ParkInfo.closeSendNeed();
     // ParkInfoThreeRight.closeSendNeed(); 
      HomeTop.hideLogin();
  }

  public changeBox(state) {
    this.setState({
      boxState:state
    })
  }

  public render() {
    return (
      <div className="fullView">
         
        <div className="loginBox ">
 
            <i className="iconfont " style={{ "font-size": "14px" }} onClick={this.closeLogin.bind(this)}>&#xe803;</i>

          <p className="loginBoxTit">
            <span className="activeLogin" onClick={this.changeBox.bind(this, 1)}>手机登录</span>
            <div style={{"width":"1px","height":"16px","background":"rgba(204,204,204,1)","display": "inline-block","margin":" 0 20px","opacity": "0.8" }}></div>
            <span onClick={this.changeBox.bind(this, 2)}>微信登录</span>
          </p>
          {
            this.state.boxState == 1 ?
              <div className="phoneLogin">
                <p>
                  <input type="text" value="手机号" />
                </p>
                <p>
                  <input type="text" value="短信验证码" />
                  <span>发送验证码</span>
                </p>
                <p>登  录</p> 
              </div>
              :
              <div className="codeLogin">
                <img src="./fangliangbao/image/demo.png" />
                <p>请使用微信扫描二维码登录</p>
              </div>
          }
    

        </div>
      </div>
    )
  }

  public state = {
    boxState: 1,

  }
}
 
export default Login;
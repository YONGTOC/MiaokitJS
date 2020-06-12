import * as React from "react";
import * as ReactDOM from "react-dom";

import Router from 'router';
import HomeTop from 'homeTop';


class Login extends React.Component {
  constructor(props) {
    super(props);

    this.callCodeSuc = this.callCodeSuc.bind(this);
 
  }

  public componentDidMount() {
    console.log(this.state)
  }


  public closeLogin() {
    $(document.body).attr('style', 'height: 100%; margin: 0; padding: 0; overflow: visible;');
    HomeTop.hideLogin();
  }

  public changeBox(state) {
    this.setState({
      boxState: state
    })
  }

  //手机验证
  public phonefoucus(event) {
    if (this.state.phone == "手机号") {
      this.setState({
        phone: "",
        phoneWrong: "",
        phonef:true,
      })
    }
  }

  public phoneblur(event) {
    if (this.state.phone == "") {
      this.setState({
        phone: "手机号",
        phonef: false,
      })
    } else {
      this.setState({
        phonef: false,
      })
    }
  }

  public phoneChange(event) {
    let phone = event.target.value.replace(/[, ]/g, '');
    this.setState({
      phone: phone,
    })
  }

    //code验证
  public codefoucus(event) {
    if (this.state.code == "短信验证码") {
      this.setState({
        code: "",
        codeWrong: "",
        codef: true,
      })
    }
  }

  public codeblur(event) {
    if (this.state.code == "") {
      this.setState({
        code: "短信验证码",
        codef: false,
      })
    } else {
      this.setState({
          codef: false,
      })
    }
  }

  public codeChange(event) {
    let code = event.target.value.replace(/[, ]/g, '');
    this.setState({
      code: code,

    })
  }

  // 短信验证
  public callCode() {
    this.setState({
      sendTime: 5, 
    })
    console.log(this.state)
    var reg01 = /^1[3456789]\d{9}$/;
    if (reg01.test(this.state.phone)) {
      console.log("ok")
      this.setState({
        sendCodeState: true,
        phoneWrong: "",
      }, () => {
        this.callCodeSuc();
      })
    } else if (this.state.phone == "手机号") {
      this.setState({
        sendCodeState: false,
        phoneWrong: "手机号不能为空"
      })
      return;
    } else {
      this.setState({
        sendCodeState: false,
        phoneWrong: "请正确填写手机号码"
      })
      return;
    }


    //over
  }

  //call验证码成功(计时)
  public callCodeSuc() {
    console.log("getCode", this.state)
    this.count();
  }

  count = () => {
    let A = setInterval(() => {
      this.setState({
        timer: (this.state.sendTime--)
      }, () => {
        if (this.state.sendTime == 0) {
          clearInterval(A);
          this.setState({
            sendCodeState: false,
            sendTime: 5
          })
        }
      })
    }, 1000
    )
  }

  public doLogin() {
    console.log("doLogin",this.state);
    if (this.state.code == "短信验证码") {
      this.setState({
        codeWrong: "验证码不能为空"
      })
    } else if (this.state.phone == "手机号") {
      this.setState({
        phoneWrong: "手机号不能为空"
      })
    } else {
      alert("sendCodeSuccess");
      this.setState({
        firstLogin: true,
        phone: "手机号",
        code: "短信验证码",
      })
    }
  }

  //登录请求
  public ajaxLogin() {
    console.log("ajaxLogin")
  }

  public doBind() {
    console.log("doBind",this.state);
   if (this.state.code == "短信验证码") {
      this.setState({
        codeWrong: "验证码不能为空"
      })
    } else if (this.state.phone == "手机号") {
      this.setState({
        phoneWrong: "手机号不能为空"
      })
    } else {
     alert("bindSuccess");
      this.setState({
        phone: "手机号",
        code: "短信验证码",
      })
    }
  }

  public render() {
    return (
      <div className="fullView">
        {
          this.state.firstLogin == true ?
            <div className="firstLogin">
              <h2>微信登录成功</h2>
              <h3>您的手机号还未绑定手机，请您绑定手机号</h3>
              <p className={this.state.phonef == true ? "pf" : null}>
                <input type="text" value={this.state.phone} style={{"width":"100%"}}
                  onFocus={this.phonefoucus.bind(this)} onBlur={this.phoneblur.bind(this)}
                  onChange={this.phoneChange.bind(this)}
                />
              </p>
              <span>{this.state.phoneWrong}</span>
                  <p className={this.state.codef == true? "pf" : null}>
                <input type="text" value={this.state.code}
                 onFocus={this.codefoucus.bind(this)} onBlur={this.codeblur.bind(this)}
                 onChange={this.codeChange.bind(this)}
                />
                {this.state.sendCodeState == false ?
                  <span onClick={this.callCode.bind(this)}>发送验证码</span>
                  :
                  <span>{this.state.sendTime} 秒</span>
                }
              </p>
               <span>{this.state.codeWrong}</span>
              <p onClick={this.doBind.bind(this)}>绑  定</p>
            </div>
            :
            <div className="loginBox ">
              <i className="iconfont " style={{ "font-size": "14px" }} onClick={this.closeLogin.bind(this)}>&#xe803;</i>
              <p className="loginBoxTit">
                <span className={this.state.boxState == 1 ? "activeLogin" : null} onClick={this.changeBox.bind(this, 1)}>手机登录</span>
                <div style={{ "width": "1px", "height": "16px", "background": "rgba(204,204,204,1)", "display": "inline-block", "margin": " 0 20px", "opacity": "0.8" }}></div>
                <span className={this.state.boxState == 2 ? "activeLogin" : null} onClick={this.changeBox.bind(this, 2)}>微信登录</span>
              </p>
              {
                this.state.boxState == 1 ?
                  <div className="phoneLogin">
                    <p className={this.state.phonef == true? "pf" : null}>
                      <input type="text" value={this.state.phone} style={{"width":"100%"}}
                        onFocus={this.phonefoucus.bind(this)} onBlur={this.phoneblur.bind(this)}
                        onChange={this.phoneChange.bind(this)}
                      />
                    </p>
                    <span>{this.state.phoneWrong}</span>
                    <p className={this.state.codef == true? "pf" : null}>
                      <input type="text" value={this.state.code}
                          onFocus={this.codefoucus.bind(this)} onBlur={this.codeblur.bind(this)}
                        onChange={this.codeChange.bind(this)}
                      />
                      {this.state.sendCodeState == false ?
                        <span onClick={this.callCode.bind(this)}>发送验证码</span>
                        :
                        <span>{this.state.sendTime} 秒</span>
                      }
                    </p>

                    <span>{this.state.codeWrong}</span>
                    <p onClick={this.doLogin.bind(this)}>登  录</p>
                  </div>
                  :
                  <div className="codeLogin">
                    <img src="./fangliangbao/image/demo.png" />
                    <p>请使用微信扫描二维码登录</p>
                  </div>
              }
            </div>
        }
      </div>
    )
  }

  public state = {
    boxState: 1,
    phone: "手机号",
    code: "短信验证码",
    firstLogin: false,
    sendCodeState: false,
    sendTime: 5,
    phoneWrong: "",
    codeWrong: "",
    phonef: false,
    codef: false,
  }
}




export default Login;
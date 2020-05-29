import * as React from "react";
import * as RouterDOM from 'react-router-dom';

import HomeBottom from "homeBottom";

import DataService from "dataService";
import GlobalAction from "compat";
import "css!./styles/iconfont.css";
import "css!./styles/view.css";

interface IProps {
  history: any,
  children: any
}

class Home extends React.Component {
  public constructor(props) {
    super(props)

    this.setToken = this.setToken.bind(this);
  }

  public readonly props: Readonly<IProps> = {
    history: this.props.history,
    children: this.props.children
  }

  public globalAction: GlobalAction = new GlobalAction();
  public dataService: DataService = new DataService();

  public componentDidMount() {
    //2  登录获取 token
    //this.dataService.login();

  }


  //set token
  public setToken(data) {
    console.log("setToken", data);
    localStorage.setItem("token", data.token);
  }

  //backParklist;通知3d暂停加载模型 ；
  public backParklist() {
    this.globalAction.web_call_webgl_pauseloadModuler();
  }

  public render() {
    return (
      <div >
        <div className="backParklist" onClick={this.backParklist.bind(this)}>
          <RouterDOM.Link to="/"><i className="iconfont" style={{ "fontSize": "4rem", "color": "#6C6C6C" }}>&#xe83b;</i></RouterDOM.Link >
        </div>
        <TopBtn />
        <FoldBtn />
        {this.props.children}
        <HomeBottom history={this.props.history} />
      </div>
    )
  }

  //  over
}




// 顶部按钮区
class TopBtn extends React.Component {
  public constructor(props) {
    super(props)

    this.switchMark = this.switchMark.bind(this);
    this.logIcon = this.logIcon.bind(this);

  }

  public componentDidMount() {


    var iconStated = JSON.parse(sessionStorage.getItem("iconstate"))
    console.log(JSON.parse(sessionStorage.getItem("iconstate")));

    console.log(iconStated);
    this.topClose('10');
    if (iconStated) {
      if (iconStated.haveIcon == true) {
        this.setState({
          topIcon1: iconStated.topIcon1,
          topIcon2: iconStated.topIcon2,
          topIcon3: iconStated.topIcon3,
          topIcon4: iconStated.topIcon4,
          topIcon5: iconStated.topIcon5,
          topIcon: iconStated.topIcon,
          playIcon: iconStated.playIcon,
          moreIcon: iconStated.moreIcon,
          topClose: iconStated.topClose,
          topViewBack: iconStated.topViewBack,
          topIcon3info: iconStated.topIcon3info,
          topIcon4info: iconStated.topIcon4info,
          topIcon5info: iconStated.topIcon5info,
          mapIcon: iconStated.mapIcon,
        })
      }
    }
  }

  public state = {
    topView: "topView",
    topIcon1: "iconBox",
    topIcon2: "iconBox",
    topIcon3: "iconBox",
    topIcon4: "iconBox",
    topIcon5: "iconBox",
    topIcon: "iconBox",
    playIcon: "iconBox",
    moreIcon: "iconBox",
    topClose: "hide",
    topViewBack: "",
    topIcon3info: 0,
    topIcon4info: 0,
    topIcon5info: 0,
    haveIcon: false,
    mapIcon: [
      { name: "交通" },
      { name: "商圈" },
      { name: "公交站" },
      { name: "全景" },
      { name: "停车场" },
      { name: "交通" },
    ]
  }


  //显示更多标识
  public moreIcon(a) {
    console.log('toggleIconbox', a);
    this.setState({
      topView: "topView-big",
      moreIcon: "hide",
      topClose: "topClose",
      topIcon1: "iconBox-big",
      topIcon2: "iconBox-big",
      topIcon3: "iconBox-big",
      topIcon4: "iconBox-big",
      topIcon5: "iconBox-big",
      topViewBack: "topViewBack",
    })
    if (this.state.topIcon1 == "iconBoxIn" && this.state.topIcon2 == "iconBoxIn") {
      this.setState({
        topIcon1: "iconBox-bigIn",
        topIcon2: "iconBox-bigIn",
      })
    } else if (this.state.topIcon1 == "iconBoxIn") {
      console.log(this.state.topIcon1)
      this.setState({
        topIcon1: "iconBox-bigIn",
      })
    } else if (this.state.topIcon2 == "iconBoxIn") {
      console.log(this.state.topIcon1)
      this.setState({
        topIcon2: "iconBox-bigIn",
      })
    };
    if (this.state.topIcon3info == 1) {
      this.setState({
        topIcon3: "iconBox-bigIn",
      })
    } if (this.state.topIcon4info == 1) {
      this.setState({
        topIcon4: "iconBox-bigIn",
      })
    } if (this.state.topIcon5info == 1) {
      this.setState({
        topIcon5: "iconBox-bigIn",
      })
    };

  }

  // 关闭更多icon
  public topClose(a) {
    console.log('topClose', a);
    this.setState({
      topView: "topView",
      moreIcon: "iconBox",
      topClose: "hide",
      topViewBack: " ",
    }, () => {
      this.logIcon();
    })
    if (this.state.topIcon1 == "iconBox-bigIn" && this.state.topIcon2 == "iconBox-bigIn") {
      this.setState({
        topIcon1: "iconBoxIn",
        topIcon2: "iconBoxIn",
      }, () => {
        this.logIcon();
      })
    } else if (this.state.topIcon1 == "iconBox-bigIn") {
      this.setState({
        topIcon1: "iconBoxIn",
        topIcon2: "iconBox",
      }, () => {
        this.logIcon();
      })
    } else if (this.state.topIcon2 == "iconBox-bigIn") {
      this.setState({
        topIcon1: "iconBox",
        topIcon2: "iconBoxIn",
      }, () => {
        this.logIcon();
      })
    } else {
      this.setState({
        topIcon1: "iconBox",
        topIcon2: "iconBox",
        topIcon3: "iconBox",
        topIcon4: "iconBox",
        topIcon5: "iconBox",
      }, () => {
        this.logIcon();
      })
    }
    console.log('topClose2222', this.state);

  }


  public globalAction: GlobalAction = new GlobalAction();
  public dataService: DataService = new DataService();

  // 点亮icon
  public callMark(type, name) {
    this.dataService.getParkPointList(this.markBack.bind(this), type, name);


  }

  // 通知3d 数据
  public markBack(data, name) {
    console.log('mark', data.response, name);
    this.globalAction.web_call_webgl_switchMark(name, 'true', data.response);
  }

  // 关闭icon
  public markClose(name) {
    this.globalAction.web_call_webgl_switchMark(name, 'false', null);
  }

  // 切换地图标识;0--隐藏标识； 1--显示标识
  public switchMark(a, bInfo) {
    console.log('switchMark', a);
    if (a == "全景") {
      // 判断当前是否为选中状态
      if (this.state.topIcon1 == "iconBoxIn" || this.state.topIcon1 == "iconBox-bigIn") {
        if (this.state.topView == "topView-big") {
          this.setState({
            topIcon1: "iconBox-big",
            //  haveIcon: false
          }, () => {
            this.logIcon();
          })
        } else {
          this.setState({
            topIcon1: "iconBox",
            // haveIcon: false
          }, () => {
            this.logIcon();
          })
        }
        this.markClose(a)
      } else {
        if (this.state.topView == "topView-big") {
          this.setState({
            topIcon1: "iconBox-bigIn",
          }, () => {
            this.logIcon();
          })
        } else {
          this.setState({
            topIcon1: "iconBoxIn",
          }, () => {
            this.logIcon();
          })
        }
        this.callMark(4, a)
      }

    } else if (a == "商圈") {
      // 判断当前是否为选中状态
      if (this.state.topIcon2 == "iconBoxIn" || this.state.topIcon2 == "iconBox-bigIn") {
        if (this.state.topView == "topView-big") {
          this.setState({
            topIcon2: "iconBox-big",
            // haveIcon: false
          }, () => {
            this.logIcon();
          })
        } else {
          this.setState({
            topIcon2: "iconBox",
            //  haveIcon: false
          }, () => {
            this.logIcon();
          })
        }
        this.markClose(a)
      } else {
        if (this.state.topView == "topView-big") {
          this.setState({
            topIcon2: "iconBox-bigIn",
            // haveIcon: true
          }, () => {
            this.logIcon();
          })
        } else {
          this.setState({
            topIcon2: "iconBoxIn",
            //  haveIcon: true
          }, () => {
            this.logIcon();
          })
        }
        this.callMark(2, a)
      }

    } else if (a == "公交车") {
      if (this.state.topIcon3 == "iconBox-big") {
        this.setState({
          topIcon3: "iconBox-bigIn",
          topIcon3info: 1,
          haveIcon: true,
        }, () => {
          this.logIcon();
        })
        this.callMark(3, a)
      } else {
        this.setState({
          topIcon3: "iconBox-big",
          topIcon3info: 0,
          // haveIcon: false,
        }, () => {
          this.logIcon();
        })
        this.markClose(a)
      }
    } else if (a == "交通") {
      if (this.state.topIcon4 == "iconBox-big") {
        this.setState({
          topIcon4: "iconBox-bigIn",
          topIcon4info: 1,
          // haveIcon: true,
        }, () => {
          this.logIcon();
        })
        this.callMark(1, a)
      } else {
        this.setState({
          topIcon4: "iconBox-big",
          topIcon4info: 0,
          // haveIcon: false,
        }, () => {
          this.logIcon();
        })
        this.markClose(a)
      }
    } else if (a == "停车场") {
      if (this.state.topIcon5 == "iconBox-big") {
        this.setState({
          topIcon5: "iconBox-bigIn",
          topIcon5info: 1,
          // haveIcon: true
        }, () => {
          this.logIcon();
        })
        this.callMark(5, a)
      } else {
        this.setState({
          topIcon5: "iconBox-big",
          topIcon5info: 0,
          //haveIcon: false
        }, () => {
          this.logIcon();
        })
        this.markClose(a)
      }
    }


    //sessionStorage.setItem("iconstate", JSON.stringify(this.state));


  }

  public logIcon() {
    console.log(this.state)

    if (this.state.topIcon1 == "iconBoxIn" || this.state.topIcon1 == "iconBox-bigIn" ||
      this.state.topIcon2 == "iconBoxIn" || this.state.topIcon2 == "iconBox-bigIn" ||
      this.state.topIcon3 == "iconBox-bigIn" ||
      this.state.topIcon4 == "iconBox-bigIn" ||
      this.state.topIcon5 == "iconBox-bigIn"
    ) {
      this.setState({
        haveIcon: true
      }, () => {
        sessionStorage.setItem("iconstate", JSON.stringify(this.state));
      })
    } else {
      this.setState({
        haveIcon: false
      }, () => {
        sessionStorage.setItem("iconstate", JSON.stringify(this.state));
      })
    }


  }

  public render() {

    return (
      <div className={this.state.topViewBack}>
        <div className={this.state.topView}>
          <div className={this.state.topIcon1} onClick={this.switchMark.bind(this, "全景")} style={{ "border-top": "0rem solid #646464" }}>
            <i className="iconfont" style={{ "fontSize": "5rem" }}>&#xe818;</i>
            <p>全景</p>
          </div>
          <div className={this.state.topIcon2} onClick={this.switchMark.bind(this, "商圈")}>
            <i className="iconfont" style={{ "fontSize": "5rem" }}>&#xe81a;</i>
            <p>商圈</p>
          </div>
          <div className={this.state.moreIcon} onClick={this.moreIcon.bind(this, 10)} >
            <i className="iconfont" style={{ "fontSize": "5rem" }}>&#xe819;</i>
            <p>更多</p>
          </div>
          <div className={this.state.topIcon3} onClick={this.switchMark.bind(this, "公交车")} style={{ "border-top": "0rem solid #646464" }}>
            <i className="iconfont" style={{ "fontSize": "5rem" }}>&#xe817;</i>
            <p>公交车</p>
          </div>
          <div className={this.state.topIcon4} onClick={this.switchMark.bind(this, "交通")}>
            <i className="iconfont" style={{ "fontSize": "5rem" }}>&#xe816;</i>
            <p>交通</p>
          </div>
          <div className={this.state.topIcon5} onClick={this.switchMark.bind(this, "停车场")}>
            <i className="iconfont" style={{ "fontSize": "5rem" }}>&#xe81b;</i>
            <p>停车场</p>
          </div>
          <div className={this.state.topClose} onClick={this.topClose.bind(this, 10)}>
            <i className="iconfont" style={{ "fontSize": "3rem" }}>&#xe81c;</i>
          </div>
        </div>

        <RouterDOM.Link to="/narrate" >
          <div className="playIconbox hide" style={{ "color": "#707070" }} >
            <div className={this.state.playIcon} style={{ "border-top": "0rem solid #646464" }}>
              <i className="iconfont" style={{ "fontSize": "5rem" }} >&#xe81d;</i>
              <p>讲解</p>
            </div>
          </div>
        </RouterDOM.Link>

      </div>

    )

  }


}

// 折叠按钮区
class FoldBtn extends React.Component {
  public constructor(props) {
    super(props)

  }

  public toggleFold() {
    if (this.state.foldView == "foldView") {
      this.setState({
        foldView: " foldView-part"
      })
      //3dBut-down
      window.move3dBut("down");

    } else {
      this.setState({
        foldView: "foldView"
      })
      //3dBut-up
      window.move3dBut("up");
    }
    if (this.state.iconfont == "iconfont iconfont-unturn") {
      this.setState({
        iconfont: "iconfont iconfont-turn",
      })
    } else {
      this.setState({
        iconfont: "iconfont iconfont-unturn",
      })
    }
    console.log(this.state.foldView)
  }

  public render() {
    //  onClick={this.toggleFold.bind(this)}   &#xe849;
    // 2期功能
    //<RouterDOM.Link to="/photograph" >
    //      <div className={this.state.foleIcon} >
    //        <i className="iconfont" style={{ "fontSize": "5rem", "color": "#F0594C", "height": "6rem" }}>&#xe821;</i>
    //        <p>随手拍</p>
    //      </div>
    //    </RouterDOM.Link>
    //<RouterDOM.Link to="/parking" >
    //  <div className={this.state.foleIcon} >
    //    <i className="iconfont" style={{ "fontSize": "5rem", "color": "#208FE6", "height": "6rem" }}>&#xe823;</i>
    //    <p>停车业务</p>
    //  </div>
    //</RouterDOM.Link>
    return (
      <div className={this.state.foldView}>
        <div className={"foleBtn"} style={{ "height": "4rem" }}>
          <i className={this.state.iconfont} style={{ "fontSize": "4.5rem", "color": "#C0C0C0" ,"display":"none" }}>&#xe849;</i>
        </div>

        <div className={"foleIconbox"}>
          <RouterDOM.Link to="/parkInfo" >
            <div className={this.state.foleIcon} >
              <i className="iconfont" style={{ "fontSize": "6rem", "color": "#1C90E2", "height": "6rem" }}>&#xe80e;</i>
              <p>园区介绍</p>
            </div>
          </RouterDOM.Link>
          <RouterDOM.Link to="/findLease" >
            <div className={this.state.foleIcon} >
              <i className="iconfont" style={{ "fontSize": "6rem", "color": "#866FF1", "height": "6rem" }}>&#xe824;</i>
              <p>办公出租</p>
            </div>
          </RouterDOM.Link>

          <RouterDOM.Link to="/findSell" >
            <div className={this.state.foleIcon} >
              <i className="iconfont" style={{ "fontSize": "6rem", "color": "#F0594C", "height": "6rem" }}>&#xe854;</i>
              <p>办公出售</p>
            </div>
          </RouterDOM.Link>

          <RouterDOM.Link to="/parkCompany" >
            <div className={this.state.foleIcon} >
              <i className="iconfont" style={{ "fontSize": "6rem", "color": "#1C90E2", "height": "6rem" }}>&#xe81e;</i>
              <p>园区企业</p>
            </div>
          </RouterDOM.Link>


        </div>
      </div>
    )

    //
    //              <RouterDOM.Link to="/photograph" >
    //           <div className={this.state.foleIcon} >
    //             <i className="iconfont" style={{ "fontSize": "6rem", "color": "#F0594C", "height": "6rem" }}>&#xe821;</i>
    //             <p>随手拍</p>
    //           </div>
    //         </RouterDOM.Link>    
    //<RouterDOM.Link to="/parking" >
    //           <div className={this.state.foleIcon} >
    //             <i className="iconfont" style={{ "fontSize": "6rem", "color": "#208FE6", "height": "6rem" }}>&#xe823;</i>
    //             <p>停车业务</p>
    //           </div>
    //         </RouterDOM.Link>

    //  <RouterDOM.Link to="/applyPut" >
    //  <div className={this.state.foleIcon} >
    //    <i className="iconfont" style={{ "fontSize": "6rem", "color": "#208FE6", "height": "6rem" }}>&#xe81f;</i>
    //    <p>摆点申请</p>
    //  </div>
    //</RouterDOM.Link>
    //<RouterDOM.Link to="/bookSite" >
    //  <div className={this.state.foleIcon} >
    //    <i className="iconfont" style={{ "fontSize": "6rem", "color": "#26AC8F", "height": "6rem" }}>&#xe820;</i>
    //    <p>场地预定</p>
    //  </div>
    //</RouterDOM.Link>
    //<RouterDOM.Link to="/repairsOnline" >
    //  <div className={this.state.foleIcon} >
    //    <i className="iconfont" style={{ "fontSize": "6rem", "color": "#208FE6", "height": "6rem" }}>&#xe822;</i>
    //    <p>在线报修</p>
    //  </div>
    //</RouterDOM.Link>
  }

  public state = {
    // 按钮
    foleIcon: "foleIcon",
    // 折叠框样式
    foldView: "foldView-part",
    // 折叠按钮
    iconfont: "iconfont iconfont-unturn",
  }
}



export default Home;
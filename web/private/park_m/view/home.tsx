import * as React from "react";
import * as RouterDOM from 'react-router-dom';

import BottomBtn from "bottomBtn";

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
    this.dataService.login(this.setToken);
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
          <RouterDOM.Link to="/"><i className="iconfont" style={{ "fontSize": "4rem", "color":"#6C6C6C"}}>&#xe83b;</i></RouterDOM.Link >
        </div>
        <TopBtn />
        <FoldBtn />
        {this.props.children}
        <BottomBtn history={this.props.history} />
      </div>
    )
  }

  //  over
}




// 顶部按钮区
class TopBtn extends React.Component {
  public constructor(props) {
    super(props)

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
    }
  }

  // 关闭更多icon
  public topClose(a) {
    console.log('topClose', a);
    this.setState({
      topView: "topView",
      moreIcon: "iconBox",
      topClose: "hide",
      topViewBack: " ",
    })
    if (this.state.topIcon1 == "iconBox-bigIn" && this.state.topIcon2 == "iconBox-bigIn") {
      this.setState({
        topIcon1: "iconBoxIn",
        topIcon2: "iconBoxIn",
      })
    } else if (this.state.topIcon1 == "iconBox-bigIn") {
      this.setState({
        topIcon1: "iconBoxIn",
        topIcon2: "iconBox",
      })
    } else if (this.state.topIcon1 == "iconBox-bigIn") {
      this.setState({
        topIcon1: "iconBox",
        topIcon2: "iconBoxIn",
      })
    } else {
      this.setState({
        topIcon1: "iconBox",
        topIcon2: "iconBox",
        topIcon3: "iconBox",
        topIcon4: "iconBox",
        topIcon5: "iconBox",
      })
    }

  }

  public globalAction: GlobalAction = new GlobalAction();

  // 切换地图标识;0--隐藏标识； 1--显示标识
  public switchMark(a, bInfo) {
    console.log('switchMark', a);
    if (a == "交通") {
      // 判断当前是否为选中状态
      if (this.state.topIcon1 == "iconBoxIn" || this.state.topIcon1 == "iconBox-bigIn") {
        if (this.state.topView == "topView-big") {
          this.setState({
            topIcon1: "iconBox-big",
          })
        } else {
          this.setState({
            topIcon1: "iconBox",
          })
        }
        this.globalAction.web_call_webgl_switchMark(a, 0);
      } else {
        if (this.state.topView == "topView-big") {
          this.setState({
            topIcon1: "iconBox-bigIn",
          })
        } else {
          this.setState({
            topIcon1: "iconBoxIn",
          })
        }
        this.globalAction.web_call_webgl_switchMark(a, 1);
      }
    } else if (a == "商圈") {
      // 判断当前是否为选中状态
      if (this.state.topIcon2 == "iconBoxIn" || this.state.topIcon2 == "iconBox-bigIn") {
        if (this.state.topView == "topView-big") {
          this.setState({
            topIcon2: "iconBox-big",
          })
        } else {
          this.setState({
            topIcon2: "iconBox",
          })
        }
        this.globalAction.web_call_webgl_switchMark(a, 0);
      } else {
        if (this.state.topView == "topView-big") {
          this.setState({
            topIcon2: "iconBox-bigIn",
          })
        } else {
          this.setState({
            topIcon2: "iconBoxIn",
          })
        }
        this.globalAction.web_call_webgl_switchMark(a, 1);
      }
    } else if (a == "公交车") {
      if (this.state.topIcon3 == "iconBox-big") {
        this.setState({
          topIcon3: "iconBox-bigIn",
          topIcon3info: 1,
        })
        this.globalAction.web_call_webgl_switchMark(a, 1);
      } else {
        this.setState({
          topIcon3: "iconBox-big",
          topIcon3info: 0,
        })
        this.globalAction.web_call_webgl_switchMark(a, 0);
      }
    } else if (a == "全景") {
      if (this.state.topIcon4 == "iconBox-big") {
        this.setState({
          topIcon4: "iconBox-bigIn",
          topIcon4info: 1,
        })
        this.globalAction.web_call_webgl_switchMark(a, 1);
      } else {
        this.setState({
          topIcon4: "iconBox-big",
          topIcon4info: 0,
        })
        this.globalAction.web_call_webgl_switchMark(a, 0);
      }
    } else if (a == "停车场") {
      if (this.state.topIcon5 == "iconBox-big") {
        this.setState({
          topIcon5: "iconBox-bigIn",
          topIcon5info: 1,
        })
        this.globalAction.web_call_webgl_switchMark(a, 1);
      } else {
        this.setState({
          topIcon5: "iconBox-big",
          topIcon5info: 0,
        })
        this.globalAction.web_call_webgl_switchMark(a, 0);
      }
    }

  }

  public render() {
    return (
      <div className={this.state.topViewBack}>
        <div className={this.state.topView}>
          <div className={this.state.topIcon1} onClick={this.switchMark.bind(this, "交通")} style={{ "border-top": "0rem solid #646464" }}>
            <i className="iconfont" style={{ "fontSize": "5rem" }}>&#xe816;</i>
            <p>交通</p>
          </div>
          <div className={this.state.topIcon2} onClick={this.switchMark.bind(this, "商圈")}>
            <i className="iconfont" style={{ "fontSize": "5rem" }}>&#xe81a;</i>
            <p>商圈</p>
          </div>
          <div className={this.state.moreIcon} onClick={this.moreIcon.bind(this, 10)} >
            <i className="iconfont" style={{ "fontSize": "5rem" }}>&#xe819;</i>
            <p>更多</p>
          </div>
          <div className={this.state.topIcon3} onClick={this.switchMark.bind(this, "公交车")} style={{ "border-top":"0rem solid #646464"}}>
            <i className="iconfont" style={{ "fontSize": "5rem" }}>&#xe817;</i>
            <p>公交车</p>
          </div>
          <div className={this.state.topIcon4} onClick={this.switchMark.bind(this, "全景")}>
            <i className="iconfont" style={{ "fontSize": "5rem" }}>&#xe818;</i>
            <p>全景</p>
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
          <div className="playIconbox" style={{ "color": "#707070" }} >
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
    } else {
      this.setState({
        foldView: "foldView"
      })
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

  }

  public render() {
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
        <div className={"foleBtn"} onClick={this.toggleFold.bind(this)}>
          <i className={this.state.iconfont} style={{ "fontSize": "4.5rem" }}>&#xe849;</i>
        </div>

        <div className={"foleIconbox"}>
          <RouterDOM.Link to="/parkCompany" >
            <div className={this.state.foleIcon} >
              <i className="iconfont" style={{ "fontSize": "6rem", "color": "#1C90E2", "height": "6rem" }}>&#xe81e;</i>
              <p>园区企业</p>
            </div>

          </RouterDOM.Link>
          <RouterDOM.Link to="/findLease" >
            <div className={this.state.foleIcon} >
              <i className="iconfont" style={{ "fontSize": "6rem", "color": "#866FF1", "height": "6rem" }}>&#xe824;</i>
              <p>招租查询</p>
            </div>
          </RouterDOM.Link>
        
          <RouterDOM.Link to="/applyPut" >
            <div className={this.state.foleIcon} >
              <i className="iconfont" style={{ "fontSize": "6rem", "color": "#208FE6", "height": "6rem" }}>&#xe81f;</i>
              <p>摆点申请</p>
            </div>
          </RouterDOM.Link>
          <RouterDOM.Link to="/bookSite" >
            <div className={this.state.foleIcon} >
              <i className="iconfont" style={{ "fontSize": "6rem", "color": "#208FE6", "height": "6rem" }}>&#xe820;</i>
              <p>场地预定</p>
            </div>
          </RouterDOM.Link>
          <RouterDOM.Link to="/repairsOnline" >
            <div className={this.state.foleIcon} >
              <i className="iconfont" style={{ "fontSize": "6rem", "color": "#26AC8F", "height": "6rem" }}>&#xe822;</i>
              <p>在线报修</p>
            </div>

          </RouterDOM.Link>
               <RouterDOM.Link to="/photograph" >
            <div className={this.state.foleIcon} >
              <i className="iconfont" style={{ "fontSize": "6rem", "color": "#F0594C", "height": "6rem" }}>&#xe821;</i>
              <p>随手拍</p>
            </div>
          </RouterDOM.Link>
          <RouterDOM.Link to="/parking" >
            <div className={this.state.foleIcon} >
              <i className="iconfont" style={{ "fontSize": "6rem", "color": "#208FE6", "height": "6rem" }}>&#xe823;</i>
              <p>停车业务</p>
            </div>
          </RouterDOM.Link>
        </div>
      </div>
    )
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
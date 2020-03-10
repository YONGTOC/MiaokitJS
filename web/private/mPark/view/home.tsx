import * as React from "react";
import * as RouterDOM from 'react-router-dom';

import BottomBtn from "bottomBtn";

import GlobalAction from "compat";
import "css!./styles/view.css";

class Home extends React.Component {
  public constructor(props) {
    super(props)
  }

  public componentDidMount() {
    BottomBtn.toggleIcon(1);
  }

  public render() {
    return (
      <div >
        <TopBtn />
        <FoldBtn />
        <BottomBtn />
      </div>
    )
  }


  public state = {

  }

  //over
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
      topViewBack:"topViewBack",
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
    } if (this.state.topIcon5info == 1){
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
        this.globalAction.switchMark(a, 0);
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
        this.globalAction.switchMark(a, 1);
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
        this.globalAction.switchMark(a, 0);
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
        this.globalAction.switchMark(a, 1);
      }
    } else if (a == "公交车") {
      if (this.state.topIcon3 == "iconBox-big") {
        this.setState({
          topIcon3: "iconBox-bigIn",
          topIcon3info:1,
        })
        this.globalAction.switchMark(a, 1);
      } else {
        this.setState({
          topIcon3: "iconBox-big",
          topIcon3info: 0,
        })
        this.globalAction.switchMark(a, 0);
      }
    } else if (a == "全景") {
      if (this.state.topIcon4 == "iconBox-big") {
        this.setState({
          topIcon4: "iconBox-bigIn",
          topIcon4info: 1,
        })
        this.globalAction.switchMark(a, 1);
      } else {
        this.setState({
          topIcon4: "iconBox-big",
          topIcon4info: 0,
        })
        this.globalAction.switchMark(a, 0);
      }
    } else if (a == "停车场") {
      if (this.state.topIcon5 == "iconBox-big") {
        this.setState({
          topIcon5: "iconBox-bigIn",
          topIcon5info: 1,
        })
        this.globalAction.switchMark(a, 1);
      } else {
        this.setState({
          topIcon5: "iconBox-big",
          topIcon5info: 0,
        })
        this.globalAction.switchMark(a, 0);
      }
    }

  }

  public render() {
    return (
      <div className={this.state.topViewBack}>
        <div className={this.state.topView}>
          <div className={this.state.topIcon1} onClick={this.switchMark.bind(this, "交通")}>
            <span className="iconfont" style={{ "fontSize": "5rem" }}>&#xe7fa;</span>
            <p>交通</p>
          </div>
          <div className={this.state.topIcon2} onClick={this.switchMark.bind(this, "商圈")}>
            <span className="iconfont" style={{ "fontSize": "5rem" }}>&#xe7fa;</span>
            <p>商圈</p>
          </div>
          <div className={this.state.moreIcon} onClick={this.moreIcon.bind(this, 10)}>
            <span className="iconfont" style={{ "fontSize": "5rem" }}>&#xe7fa;</span>
            <p>更多</p>
          </div>
          <div className={this.state.topIcon3} onClick={this.switchMark.bind(this, "公交车")}>
            <span className="iconfont" style={{ "fontSize": "5rem" }}>&#xe7fa;</span>
            <p>公交车</p>
          </div>
          <div className={this.state.topIcon4} onClick={this.switchMark.bind(this, "全景")}>
            <span className="iconfont" style={{ "fontSize": "5rem" }}>&#xe7fa;</span>
            <p>全景</p>
          </div>
          <div className={this.state.topIcon5} onClick={this.switchMark.bind(this, "停车场")}>
            <span className="iconfont" style={{ "fontSize": "5rem" }}>&#xe7fa;</span>
            <p>停车场</p>
          </div>
          <div className={this.state.topClose} onClick={this.topClose.bind(this, 10)}>
            <span className="iconfont" style={{ "fontSize": "3rem" }}>&#xe7fa;</span>
          </div>
        </div>

        <RouterDOM.Link to="/narrate" >
          <div className="playIconbox">
            <div className={this.state.playIcon}>
              <span className="iconfont" style={{ "fontSize": "5rem" }}>&#xe7fa;</span>
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

  public state = {
    foleIcon: "foleIcon",
    foldView: "foldView-part"
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


  }

  public render() {
    return (
      <div className={this.state.foldView}>
        <div className={"foleBtn"} onClick={this.toggleFold.bind(this)}>
          <span style={{ "fontSize": "5rem" }}>--</span>
        </div>

        <div className={"foleIconbox"}>

          <RouterDOM.Link to="/parkCompany" >
            <div className={this.state.foleIcon} >
              <span className="iconfont" style={{ "fontSize": "5rem" }}>&#xe7fa;</span>
              <p>园区企业</p>
            </div>
          </RouterDOM.Link>
          <RouterDOM.Link to="/findLease" >
            <div className={this.state.foleIcon} >
              <span className="iconfont" style={{ "fontSize": "5rem" }}>&#xe7fa;</span>
              <p>招租查询</p>
            </div>
          </RouterDOM.Link>
          <RouterDOM.Link to="/photograph" >
            <div className={this.state.foleIcon} >
              <span className="iconfont" style={{ "fontSize": "5rem" }}>&#xe7fa;</span>
              <p>随手拍</p>
            </div>
          </RouterDOM.Link>
         
          <RouterDOM.Link to="/applyPut" >
            <div className={this.state.foleIcon} >
              <span className="iconfont" style={{ "fontSize": "5rem" }}>&#xe7fa;</span>
              <p>摆点申请</p>
            </div>
          </RouterDOM.Link>
          <RouterDOM.Link to="/bookSite" >
            <div className={this.state.foleIcon} >
              <span className="iconfont" style={{ "fontSize": "5rem" }}>&#xe7fa;</span>
              <p>场地预定</p>
            </div>
          </RouterDOM.Link>
          <RouterDOM.Link to="/repairsOnline" >
            <div className={this.state.foleIcon} >
              <span className="iconfont" style={{ "fontSize": "5rem" }}>&#xe7fa;</span>
              <p>在线报修</p>
            </div>
          </RouterDOM.Link>
          <RouterDOM.Link to="/parking" >
            <div className={this.state.foleIcon} >
              <span className="iconfont" style={{ "fontSize": "5rem" }}>&#xe7fa;</span>
              <p>停车业务</p>
            </div>
          </RouterDOM.Link>
        </div>
      </div>
    )
  }
}



export default Home;
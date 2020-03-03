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
  }

  //显示更多标识
  public moreIcon(a) {
    console.log('toggleIconbox', a);
    this.setState({
      topView: "topView-big",
      topIcon1: "iconBox-big",
      topIcon2: "iconBox-big",
      topIcon3: "iconBox-big",
      topIcon4: "iconBox-big",
      topIcon5: "iconBox-big",
      moreIcon: "hide",
      topClose: "topClose",
    });


  }

  // 关闭更多icon
  public topClose(a) {
    console.log('topClose', a);
    this.setState({
      topView: "topView",
      topIcon1: "iconBox",
      topIcon2: "iconBox",
      topIcon3: "iconBox",
      topIcon4: "iconBox",
      topIcon5: "iconBox",
      moreIcon: "iconBox",
      topClose: "hide",
    })
  }

  public globalAction: GlobalAction = new GlobalAction();

  // 切换地图标识
  public switchMark(a) {
    // console.log('switchMark', a);
    this.globalAction.switchMark(a);
    if (a == "交通") {
      if (this.state.topClose == "topClose") {
        this.setState({
          topIcon1: "iconBox-bigIn",
          topIcon2: "iconBox-big",
          topIcon3: "iconBox-big",
          topIcon4: "iconBox-big",
          topIcon5: "iconBox-big",
          topIcon: "iconBox-big",
        })
      } else {
        this.setState({
          topIcon1: "iconBoxIn",
          topIcon2: "iconBox",
          topIcon3: "iconBox",
          topIcon4: "iconBox",
          topIcon5: "iconBox",
          topIcon: "iconBox",
        })
      }

    } else if (a == "商圈") {
      if (this.state.topClose == "topClose") {
        this.setState({
          topIcon1: "iconBox-big",
          topIcon2: "iconBox-bigIn",
          topIcon3: "iconBox-big",
          topIcon4: "iconBox-big",
          topIcon5: "iconBox-big",
          topIcon: "iconBox-big",
        })
      } else {
        this.setState({
          topIcon1: "iconBox",
          topIcon2: "iconBoxIn",
          topIcon3: "iconBox",
          topIcon4: "iconBox",
          topIcon5: "iconBox",
          topIcon: "iconBox",
        })
      }
    } else if (a == "公交车") {
      this.setState({
        topIcon1: "iconBox-big",
        topIcon2: "iconBox-big",
        topIcon3: "iconBox-bigIn",
        topIcon4: "iconBox-big",
        topIcon5: "iconBox-big",
        topIcon: "iconBox",
      })
    } else if (a == "全景") {
      this.setState({
        topIcon1: "iconBox-big",
        topIcon2: "iconBox-big",
        topIcon3: "iconBox-big",
        topIcon4: "iconBox-bigIn",
        topIcon5: "iconBox-big",
        topIcon: "iconBox",
      })
    } else if (a == "停车场") {
      this.setState({
        topIcon1: "iconBox-big",
        topIcon2: "iconBox-big",
        topIcon3: "iconBox-big",
        topIcon4: "iconBox-big",
        topIcon5: "iconBox-bigIn",
        topIcon: "iconBox",
      })
    }

  }

  public render() {
    return (
      <div>
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
    foldView:"foldView-part"
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
          <RouterDOM.Link to="/photograph" >
            <div className={this.state.foleIcon} >
              <span className="iconfont" style={{ "fontSize": "5rem" }}>&#xe7fa;</span>
              <p>随手拍</p>
            </div>
          </RouterDOM.Link>
          <RouterDOM.Link to="/findLease" >
            <div className={this.state.foleIcon} >
              <span className="iconfont" style={{ "fontSize": "5rem" }}>&#xe7fa;</span>
              <p>招租查询</p>
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
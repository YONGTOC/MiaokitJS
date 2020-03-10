import * as React from "react";
import * as RouterDOM from 'react-router-dom';

import "css!./styles/view.css";
//底部按钮区
class BottomBtn extends React.Component {
  public constructor(props) {
    super(props)

    BottomBtn.toggleIcon = this.toggleIcon.bind(this);
  }

  static toggleIcon(a) { }
  public toggleIcon(data) {
    console.log(data);
    if (data == 1) {
      this.setState({
        iconBottom1: "iconBox-bottomIn",
        iconBottom2: "iconBox-bottom",
        iconBottom3: "iconBox-bottom",
        iconBottom4: "iconBox-bottom",
      })
    } else if (data == 2) {
      this.setState({
        iconBottom1: "iconBox-bottom",
        iconBottom2: "iconBox-bottomIn",
        iconBottom3: "iconBox-bottom",
        iconBottom4: "iconBox-bottom",
      })
    } else if (data == 3) {
      this.setState({
        iconBottom1: "iconBox-bottom",
        iconBottom2: "iconBox-bottom",
        iconBottom3: "iconBox-bottomIn",
        iconBottom4: "iconBox-bottom",
      })
    } else if (data == 4) {
      this.setState({
        iconBottom1: "iconBox-bottom",
        iconBottom2: "iconBox-bottom",
        iconBottom3: "iconBox-bottom",
        iconBottom4: "iconBox-bottomIn",
      })
    }

    //  console.log(this.state);
  }



  public render() {
    return (
      <div className={"bottomView"}>
        <RouterDOM.Link to="/home" >
          <div className={this.state.iconBottom1}>
            <span className="iconfont" style={{ "fontSize": "5rem" }}>&#xe7fa;</span>
            <p>3D沙盘</p>
          </div>
        </RouterDOM.Link  >
        <RouterDOM.Link to="/infoArea" >
          <div className={this.state.iconBottom2}>
            <span className="iconfont iconActice" style={{ "fontSize": "5rem" }}> &#xe7fa; </span>
            <p>微圈</p>
          </div>
        </RouterDOM.Link>
        <RouterDOM.Link to="/message" >
          <div className={this.state.iconBottom3}>
            <span className="iconfont" style={{ "fontSize": "5rem" }}>&#xe7fa;</span>
            <p>资讯</p>
          </div>
        </RouterDOM.Link>
        <RouterDOM.Link to="/aboutMe" >
          <div className={this.state.iconBottom4}>
            <span className="iconfont" style={{ "fontSize": "5rem" }}>&#xe7fa;</span>
            <p>我的</p>
          </div>
        </RouterDOM.Link>
      </div>
    )
  };

  public state = {
    iconBottom1: "iconBox-bottomIn",
    iconBottom2: "iconBox-bottom",
    iconBottom3: "iconBox-bottom",
    iconBottom4: "iconBox-bottom"
  }
  //over
}

export default BottomBtn;
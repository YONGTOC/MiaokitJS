import * as React from "react";
import * as RouterDOM from 'react-router-dom';

import "css!./styles/view.css";
//底部按钮区
class BottomBtn extends React.Component {
  public constructor(props) {
    super(props)

    BottomBtn.toggleIcon = this.toggleIcon.bind(this);
  }

  static toggleIcon(data) { }
  public toggleIcon(data) {
    console.log(data);
    this.setState({
      index:data
    })
  }



  public render() {
    return (
      <div className={"bottomView"}>
        <RouterDOM.Link to="/home" >
          <div className={this.state.index == 1 ? "iconBox-bottomIn" : "iconBox-bottom" } onClick={this.toggleIcon.bind(this, 1)}>
            <img src={this.state.index == 1 ? this.state.iconImg1In : this.state.iconImg1Un } />
            <p>3D沙盘</p>
          </div>
        </RouterDOM.Link  >
        <RouterDOM.Link to="/infoArea" >
          <div className={this.state.index == 2 ? "iconBox-bottomIn" : "iconBox-bottom"} onClick={this.toggleIcon.bind(this, 2)}>
            <img src={this.state.index == 2 ? this.state.iconImg2In : this.state.iconImg2Un} />
            <p>微圈</p>
          </div>
        </RouterDOM.Link> 
        <RouterDOM.Link to="/message" >
          <div className={this.state.index == 3 ? "iconBox-bottomIn" : "iconBox-bottom"} onClick={this.toggleIcon.bind(this, 3)}>
            <img src={this.state.index == 3 ? this.state.iconImg3In : this.state.iconImg3Un} />
            <p>资讯</p>
          </div>
        </RouterDOM.Link>
        <RouterDOM.Link to="/aboutMe" >
          <div className={this.state.index == 4 ? "iconBox-bottomIn" : "iconBox-bottom"} onClick={this.toggleIcon.bind(this, 4)}>
            <img src={this.state.index == 4 ? this.state.iconImg4In : this.state.iconImg4Un } />
            <p>我的</p>
          </div>
        </RouterDOM.Link>
      </div>
    )
  };

  public state = {
    index: 1,
    iconImg1In: "./mPark/image/bottomBtn/3d-in.png",
    iconImg1Un: "./mPark/image/bottomBtn/3d-un.png",
    iconImg2In: "./mPark/image/bottomBtn/wq-in.png",
    iconImg2Un: "./mPark/image/bottomBtn/wq-un.png",
    iconImg3In: "./mPark/image/bottomBtn/zx-in.png",
    iconImg3Un: "./mPark/image/bottomBtn/zx-un.png",
    iconImg4In: "./mPark/image/bottomBtn/my-in.png",
    iconImg4Un: "./mPark/image/bottomBtn/my-un.png",
  }
  //over
}

export default BottomBtn;
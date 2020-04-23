import * as React from "react";
import * as RouterDOM from 'react-router-dom';
import GlobalAction from "compat";
import "css!./styles/view.css";

interface IProps {
  history: any
}

//底部按钮区
class BottomBtn extends React.Component {
  public constructor(props) {
    super(props)
    this.toggleIcon = this.toggleIcon.bind(this);
  }

  public readonly props: Readonly<IProps> = {
    history: this.props.history
  }

  public globalAction: GlobalAction = new GlobalAction();

  componentDidMount() {
    console.log(this.props.history.location.pathname)
    if (this.props.history.location.pathname === "/home" || this.props.history.location.pathname === "/") {
      this.setState({ index: 1 }, () => {
        this.toggleIcon(this.state.index)
      });
    } else if (this.props.history.location.pathname === "/home/informationChild") {
      this.setState({ index: 3 }, () => {
        this.toggleIcon(this.state.index)
      })

    } else {
      this.setState({ index: 4 }, () => {
        this.toggleIcon(this.state.index)
      })
    }
  }
  toggleIcon(data) {
    this.setState({
      index: data
    });
    if (data == 1) {
      //通知3d，继续加载模型  
      this.globalAction.web_call_webgl_continueloadModuler();
    } else {
      //通知3d，暂停加载模型
      this.globalAction.web_call_webgl_pauseloadModuler();
    }
  }

  public render() {
    return (
      <div className={"bottomView"}>
        <RouterDOM.Link to="/" >
          <div className={this.state.index == 1 ? "iconBox-bottomIn" : "iconBox-bottom"} onClick={this.toggleIcon.bind(this, 1)}>
            <img src={this.state.index == 1 ? this.state.iconImg1In : this.state.iconImg1Un} />
            <p>首页</p>
          </div>
        </RouterDOM.Link  >
        <RouterDOM.Link to="/home/informationChild" >
          <div className={this.state.index == 3 ? "iconBox-bottomIn" : "iconBox-bottom"} onClick={this.toggleIcon.bind(this, 3)}>
            <img src={this.state.index == 3 ? this.state.iconImg3In : this.state.iconImg3Un} />
            <p>政策</p>
          </div>
        </RouterDOM.Link>
        <RouterDOM.Link to="/home/personalCenter" >
          <div className={this.state.index == 4 ? "iconBox-bottomIn" : "iconBox-bottom"} onClick={this.toggleIcon.bind(this, 4)}>
            <img src={this.state.index == 4 ? this.state.iconImg4In : this.state.iconImg4Un} />
            <p>我的</p>
          </div>
        </RouterDOM.Link>
      </div>
    )
  };

  public state = {
    index: 1,
    iconImg1In: "./park_m/image/bottomBtn/3d-in.png",
    iconImg1Un: "./park_m/image/bottomBtn/3d-un.png",
    iconImg3In: "./park_m/image/bottomBtn/zx-in.png",
    iconImg3Un: "./park_m/image/bottomBtn/zx-un.png",
    iconImg4In: "./park_m/image/bottomBtn/my-in.png",
    iconImg4Un: "./park_m/image/bottomBtn/my-un.png",
  }
  //over
}

export default BottomBtn;
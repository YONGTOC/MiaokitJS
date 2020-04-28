import * as React from "react";


class FullView extends React.Component<{ history: any }>{
  public constructor(props) {
    super(props);


    FullView.isShow = this.isShow.bind(this);
  }

  static isShow() { };
  public isShow() {
    console.log(2222)
    this.setState({
      isShow: true,
    })
  }

  public isHide() {
    this.setState({
      isShow: false,
    });
    this.props.history.goBack();
    show3dBut();
  }

  render() {
    return (
      <div className={this.state.isShow == true ? "show" : "hide"}>
          <i className={this.state.fullViewHide} onClick={this.isHide.bind(this)} >&#xe83b;</i>
      </div>
    )
  }

  public state = {
    isShow: false,
    fullViewHide: "iconfont fullViewHide",
  }
}

export default FullView;
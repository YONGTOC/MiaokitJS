import * as React from "react";
import * as RouterDOM from 'react-router-dom';

import DataService from "dataService";
import GlobalAction from "compat";


class ModelBtn extends React.Component {
  public constructor(props) {
    super(props)

  }

  public componentDidMount() {
  }

  public globalAction: GlobalAction = new GlobalAction();
  public dataService: DataService = new DataService();


  public nearGap() {
    this.globalAction.web_call_webgl_nearGap();
  }
  public farGap() {
    this.globalAction.web_call_webgl_farGap();
  }

  // 2/3D 按钮切换
  public changeD() {
    if (this.state.d == 0) {
      this.setState({
        d: 1,
        dText: "3D"
      })
       this.globalAction.web_call_webgl_switchCameraMode(2);
    } else {
      this.setState({
        d: 0,
        dText: "2D"
      })
      this.globalAction.web_call_webgl_switchCameraMode(3);
    }
  }
   
  //回复当前最佳视角
  public reset() {
   this.globalAction.web_call_webgl_reset();
    console.log("3D回复当前最佳视角");
  }


  public render() {
    return (
        <div className="modelBtn">
          <div className="nearGap" onClick={this.nearGap.bind(this)}>+</div>
          <div className="farGap" onClick={this.farGap.bind(this)} >-</div>
          <div className="changeD" onClick={this.changeD.bind(this)}>{this.state.dText}</div>
          <div className="reset" onClick={this.reset.bind(this)} >复位</div>
        </div>
    )
  }

  public state = {
    d: 0,
    dText: "3D"
  }

}


export default ModelBtn;
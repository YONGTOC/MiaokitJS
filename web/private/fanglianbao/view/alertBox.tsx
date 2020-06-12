import * as React from "react";
import * as ReactDOM from "react-dom";

import Router from 'router';
import ParkInfo from 'ParkInfo';

class AlertBox extends React.Component {
  constructor(props) {
    super(props);

    AlertBox.showAlert = this.showAlert.bind(this);
  }

  public componentDidMount() {
  }

  static showAlert(text) { };
  public showAlert(text) {
    console.log(text);
    this.setState({
      text: text
    })
  }

  public closeAlert() {
    $(document.body).attr('style', 'height: 100%; margin: 0; padding: 0; overflow: visible;');
    ParkInfo.closeDefeat();
  }


  public render() {
    return (
      <div className="fullView">
        <div className="alertBox">
          < img src="./fangliangbao/image/blueLogo.png" />
          <p>{this.state.text}</p>
          <p className="" onClick={this.closeAlert.bind(this)}> 知道了 </p>
        </div>
      </div>
    )
  }

  public state = {
    text: "",
  }
}

export default AlertBox;
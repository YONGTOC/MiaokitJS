import * as React from "react";
import * as ReactDOM from "react-dom";

import Router from 'router';
import ParkInfo from 'ParkInfo';

class SendSuccess extends React.Component {
  constructor(props) {
    super(props);


  }

  public componentDidMount() {
  }

    public closeFull() {
    //this.setState({
    //  fullViewState: false
    //});
      $(document.body).attr('style', 'height: 100%; margin: 0; padding: 0; overflow: visible;');

      ParkInfo.closeSendNeed();
     // ParkInfoThreeRight.closeSendNeed();
  }


  public render() {
    return (
      <div className="fullView">
         
        <div className="successBox">
          < img src="./fangliangbao/image/sendSuccess.png" />
          <p>提交成功</p>
          <p>宝哥将会在一个工作日内与您电话联系，请您电话畅通，谢谢！</p>
          <p className="" onClick={this.closeFull.bind(this)}> 好的 </p>
        </div>
      </div>
    )
  }

  public state = {

  }
}
 
export default SendSuccess;
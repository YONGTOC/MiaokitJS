import * as React from "react";
import * as ReactDOM from "react-dom";

import Router from 'router';

class InfoTitleBao extends React.Component<{index:any}>{
  constructor(props) {
    super(props);

     
  }

  public componentDidMount() {
  }


  public render() {
    return (
      <div className="ParkInfoOne">
        <div className="ParkInfoOne_title">
          <img src="./fangliangbao/image/blueLogo.png" />
          <ul>
            <li style={{ "color": " rgb(23, 161, 230)", "font-weight": "bold" }}>
              宝哥推荐</li>
            <li>热点资讯</li>
          </ul>
        </div>
      </div>
    )
  }

  public state = {

  }
}

export default InfoTitleBao;
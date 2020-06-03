import * as React from "react";
import * as ReactDOM from "react-dom";

import Router from 'router';

class InfoTitle extends React.Component {
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
              品牌园区</li>
            <li>出租房源</li>
            <li>房源园区</li>
          </ul>
        </div>
      </div>
    )
  }

  public state = {

  }
}

export default InfoTitle;
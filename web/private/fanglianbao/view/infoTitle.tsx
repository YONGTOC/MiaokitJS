import * as React from "react";
import * as ReactDOM from "react-dom";
import { Link } from 'react-router-dom';

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
            {[{ name: "品牌园区", url: "/parkList" }, { name: "出租房源", url: "/roomList" }, { name: "房源园区", url: "" }].map((item, index) => {
              return (
                <Link to={item.url} key={index}>
                  <li style={{ "color": index === this.props.index ? "rgb(23, 161, 230)" : "", "font-weight": index === this.props.index ? "bold" : "" }}>{item.name}</li>
                </Link>
              )
            })
            }
          </ul>
        </div>
      </div>
    )
  }

  public state = {

  }
}

export default InfoTitle;
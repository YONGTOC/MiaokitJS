import * as React from "react";
import * as ReactDOM from "react-dom";
import Router from 'router';
import { Link } from 'react-router-dom';

class InfoTitleRecom extends React.Component<{ index: any }>{
  constructor(props) {
    super(props);

    InfoTitleRecom.changRecomTitle = this.changRecomTitle.bind(this);
  } 

  public componentDidMount() {
  }

  static changRecomTitle(index) { }
  public changRecomTitle(this, index) {
    console.log(index);
    this.setState({
      rtIndex: index
    })
  }

  public render() {
    return (
      <div className="ParkInfoOne">
        <div className="ParkInfoOne_title">
          <img src="./fangliangbao/image/blueLogo.png" />
          <ul>
            <Link to="/baoList">
              <li className={this.state.rtIndex == 0 ? "recomTitle_active" : null}
                onClick={this.changRecomTitle.bind(this, 0)}>宝哥推荐</li>
            </Link>
            <Link to="/hotList">
              <li className={this.state.rtIndex == 1 ? "recomTitle_active" : null}
                onClick={this.changRecomTitle.bind(this, 1)}>热点资讯</li>
            </Link>

          </ul>
        </div>
      </div>
    )
  }

  public state = {
    rtIndex: null,
  }
}

export default InfoTitleRecom;
import * as React from "react";
import * as ReactDOM from "react-dom";

import Router from 'router';

import HomeTop from "HomeTop";
import AllBottom from "AllBottom";

class ParkInfo extends React.Component {
  constructor(props) {
    super(props);

  }


  public render() {
    return (
      <div>
        <HomeTop />
        <div className="parkInfo">
          <div className="parkInfoBox_title">
            <ParkInfoOne />
          </div>
          <div className="parkInfoBox_list">
            <ParkInfoTwo />
          </div>
          <div className="parkInfoBox_text">
            <ParkInfoThree />
          </div>
        </div>
        <AllBottom />
      </div>
    )
  }

  public state = {

  }
}

class ParkInfoOne extends React.Component {

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
            <li style={{ "color": " rgb(23, 161, 230)", "font-weight": "bold" }}>品牌园区</li>
            <li>出租房源</li>
            <li>房源园区</li>
          </ul>
        </div>
        <div className="ParkInfoOne_html">
          <p>
            <span>广州</span> <span>品牌园区</span>
            <i className="jiange"> > </i>
              <span>越秀</span>
           <i className="jiange"> > </i>
              <span>北京路</span>
          </p>
        </div>
        <div className="ParkInfoOne_info">
          <p>信息产业园</p>
          <ul>
            <li><i className="iconfont " >&#xe83c;</i>收藏</li>
            <li><i className="iconfont " >&#xe83c;</i>分享</li>
          </ul>
        </div>
      </div>


    )
  }

  public state = {

  }
}

class ParkInfoTwo extends React.Component {

  constructor(props) {
    super(props);


  }

  public componentDidMount() {
   // console.log(($(window).width())
     // $('.parkInfoBox_list').attr("margin", 'auto calc(' + $(window).width() / 95 + '%)')
      $(".parkInfoBox_list").css("margin","auto calc("  + $(window).width() / 95 + ")");
  }


  public render() {
    return (
      <div className="ParkInfoTwo">
        ParkInfoTwo
      </div>
    )
  }

  public state = {

  }
}

class ParkInfoThree extends React.Component {

  constructor(props) {
    super(props);


  }

  public componentDidMount() {
  }


  public render() {
    return (
      <div className="ParkInfoThree">
        ParkInfoThree
      </div>
    )
  }

  public state = {

  }
}

export default ParkInfo;
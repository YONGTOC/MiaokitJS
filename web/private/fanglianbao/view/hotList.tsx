﻿import * as React from "react";
import * as ReactDOM from "react-dom";
import { Link } from 'react-router-dom';
import { Pagination } from 'antd';

import Router from 'router';
import HomeTop from "homeTop";
import InfoTitleRecom from "infoTitleRecom";
import AllBottom from "AllBottom";

class HotList extends React.Component<{ history: any }> {
  constructor(props) {
    super(props);

    HotList.toParkInfo = this.toParkInfo.bind(this);
  }

  public componentDidMount() {
    HomeTop.changHomeTop(6);
    InfoTitleRecom.changRecomTitle(1);
  }

  static toParkInfo(from, park, room) { };
  public toParkInfo(from, park, room) {
    this.props.history.push({ pathname: "/parkInfo", parkId: park, from: from, roomId: room })
  }

  public render() {
    return (
      <div className="index">
        <HomeTop />
        <div style={{ width: "1200px", margin: "auto", paddingTop: "61px" }}>
          <InfoTitleRecom index={2} />
        </div>
        <div className="warp">
          < HotLeft />
          < HotRight />
        </div>
        <div className="parkInfo_bottom">
          <AllBottom />
        </div>
      </div>
    )
  }

  public state = {

  }
}

class HotLeft extends React.Component {
  constructor(props) {
    super(props);


  }

  public componentDidMount() {
    let baoListLength = this.state.baoList.length;
    console.log(baoListLength)
    if (baoListLength < 4) {
      //height: 850px;  .listBox
      $(".listBox").attr("style", "height: 850px");
      console.log($(".listBox"))
    }

  }

  public onChangePage(data) {
    console.log('page', data);
  }

  public render() {
    return (
      <div className="listBox ">
        <div className="listBox_List">
          <ul>
            {this.state.baoList.map((i, index) => {
              return (
                <li>
                  <a href="./hotText.html" target="_blank">
                    <div className="listBox_Li">
                      <img src={i.img} />
                      <div className="listBox_Li_r">
                        <p>{i.title}</p>
                        <p>{i.date}</p>
                        <p>{i.context}</p>
                        <p>了解详情></p>
                      </div>
                    </div>
                  </a>
                </li>
              )
            })}
          </ul>
        </div>
        <div className="listBox_page">
          <p className="companyBox_left_box_one_page">
            <Pagination
              pageSize="5"
              defaultPageSize="5"
              total={50}
              onChange={this.onChangePage.bind(this)} />
          </p>
        </div>
      </div>
    )
    //  total = {Number(this.state.total)*5} 
  }
  public state = {
    baoList: [
      {
        img: "./fangliangbao/image/demo.png",
        title: "优客工场五周年战略转型 由“重”转“轻” 进化共赢",
        date: "2020/05/19 14:03:45",
        context: "2020年4月18日下午14:00，优客工场进行了一场名为“起源——优客工场进化论”线上合办公独角兽企业优客工场创立于2015年，以“给你每一个快乐的工作日”为使命，五年来坚持赋能中国创新者."
      }, {
        img: "./fangliangbao/image/demo.png",
        title: "优客工场五周年战略转型 由“重”转“轻” 进化共赢",
        date: "2020/05/19 14:03:45",
        context: "2020年4月18日下午14:00，优客工场进行了一场名为“起源——优客工场进化论”线上合办公独角兽企业优客工场创立于2015年，以“给你每一个快乐的工作日”为使命，五年来坚持赋能中国创新者."
      }
    ]
  }
}


class HotRight extends React.Component {
  constructor(props) {
    super(props);


  }

  public componentDidMount() {
  }

  public toParkInfo(from, park, room) {
    console.log(park);
    console.log(room);

    HotList.toParkInfo(from, park, room)
  }


  public render() {
    return (
      <div className="listRight">
        <div className="listRight_one">
          <Link to="/parkList" >
            <p className="listRight_one_p">新上线园区 >></p>
          </Link>
          <div className="leaseRoomList leaseRoomList2">
            <ul>
              <li>
                <div className="leaseRooms leaseRooms2"
                  onClick={this.toParkInfo.bind(this, "park", 102, "")}>
                  <img src="./fangliangbao/image/demo.png" />
                  <div className="leaseRoomsRight">
                    <p className="leaseName2">桂林信息产业园区</p>
                    <p><span className="leasePrice">80.3</span> 元/m²⋅月</p>
                    <p className="leaseArea2">七星-朝阳路D-12号</p>
                  </div>
                </div>
              </li>
              <li>
                <div className="leaseRooms leaseRooms2">
                  <img src="./fangliangbao/image/demo.png" />
                  <div className="leaseRoomsRight">
                    <p className="leaseName2">桂林信息产业园区</p>
                    <p><span className="leasePrice">80.3</span> 元/m²⋅月</p>
                    <p className="leaseArea2">七星-朝阳路D-12号</p>
                  </div>
                </div>
              </li>
              <li>
                <div className="leaseRooms leaseRooms2">
                  <img src="./fangliangbao/image/demo.png" />
                  <div className="leaseRoomsRight">
                    <p className="leaseName2">桂林信息产业园区</p>
                    <p><span className="leasePrice">80.3</span> 元/m²⋅月</p>
                    <p className="leaseArea2">七星-朝阳路D-12号</p>
                  </div>
                </div>
              </li>
              <li>
                <div className="leaseRooms leaseRooms2">
                  <img src="./fangliangbao/image/demo.png" />
                  <div className="leaseRoomsRight">
                    <p className="leaseName2">桂林信息产业园区</p>
                    <p><span className="leasePrice">80.3</span> 元/m²⋅月</p>
                    <p className="leaseArea2">七星-朝阳路D-12号</p>
                  </div>
                </div>
              </li>
            </ul>
          </div>
        </div>
        <div className="listRight_two">
          <Link to="/roomList" >
            <p className="listRight_one_p">热门房源  >></p>
          </Link>
          <div className="leaseRoomList leaseRoomList2">
            <ul>
              <li>
                <div className="leaseRooms leaseRooms2"
                  onClick={this.toParkInfo.bind(this, "room", 102, 1021)}>
                  <img src="./fangliangbao/image/demo.png" />
                  <div className="leaseRoomsRight">
                    <p className="leaseName2">出租高新区信息产业桂林信息产业园区</p>
                    <p><span className="leasePrice">80.3</span> 元/m²⋅月</p>
                    <p className="leaseArea">189m²</p>
                  </div>
                </div>
              </li>
              <li>
                <div className="leaseRooms leaseRooms2" >
                  <img src="./fangliangbao/image/demo.png" />
                  <div className="leaseRoomsRight">
                    <p className="leaseName2">出租高新区信息产业桂林信息产业园区</p>
                    <p><span className="leasePrice">80.3</span> 元/m²⋅月</p>
                    <p className="leaseArea">189m²</p>
                  </div>
                </div>
              </li>
              <li>
                <div className="leaseRooms leaseRooms2">
                  <img src="./fangliangbao/image/demo.png" />
                  <div className="leaseRoomsRight">
                    <p className="leaseName2">出租高新区信息产业桂林信息产业园区</p>
                    <p><span className="leasePrice">80.3</span> 元/m²⋅月</p>
                    <p className="leaseArea">189m²</p>
                  </div>
                </div>
              </li>
              <li>
                <div className="leaseRooms leaseRooms2">
                  <img src="./fangliangbao/image/demo.png" />
                  <div className="leaseRoomsRight">
                    <p className="leaseName">出租高新区信息产业桂林信息产业园区</p>
                    <p><span className="leasePrice">80.3</span> 元/m²⋅月</p>
                    <p className="leaseArea">189m²</p>
                  </div>
                </div>
              </li>
            </ul>
          </div>
        </div>
        <div className="listRight_three">
          <p>房良宝小程序端</p>
          <img src="./fangliangbao/image/demo.png" />
          <p style={{ "font-size": "12px" }}>打开微信扫一扫随时手机体验 </p>
        </div>
      </div>
    )
  }
  public state = {

  }
}

export default HotList;
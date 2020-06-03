import * as React from "react";
import * as ReactDOM from "react-dom";
import Router from 'router';

import HomeTop from "HomeTop";
import AllBottom from "AllBottom";
import InfoTitle from "InfoTitle";

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
            < InfoTitle />
            <ParkInfoOne />
          </div>
          <div className="parkInfoBox_list">
            <ParkInfoTwo />
          </div>
          <div className="parkInfoBox_text">
            <ParkInfoThree />
          </div>
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

class ParkInfoOne extends React.Component {

  constructor(props) {
    super(props);


  }

  public componentDidMount() {
  }


  public render() {
    return (
      <div className="ParkInfoOne">
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

  }

  public changeTitle(this, index) {
    this.setState({
      index: index
    })
  }
  public overTitle() {
    if (this.state.ParkInfoTwoState == "ParkInfoTwoAll") {
      this.setState({
        ParkInfoTwoState: "ParkInfoTwoOver",
        ParkInfoTwoListState: "hide",
        listTrun: "ParkInfoTwoListTrunUp",
        listTrun_text: "展开列表",
      })
    } else {
      this.setState({
        ParkInfoTwoState: "ParkInfoTwoAll",
        ParkInfoTwoListState: "ParkInfoTwoList",
        listTrun: "ParkInfoTwoListTrun",
        listTrun_text: "收起列表"
      })
    }
  }

  public render() {
    return (
      <div className={this.state.ParkInfoTwoState}>
        <div className="ParkInfoTwoTitle">
          <ul>
            <li className={this.state.index == 0 ? "ParkInfoTwoTitleActive" : null}
              onClick={this.changeTitle.bind(this, 0)}>出租房源</li>
            <li className={this.state.index == 1 ? "ParkInfoTwoTitleActive" : null}
              onClick={this.changeTitle.bind(this, 1)}>出售房源</li>
            <li className={this.state.index == 2 ? "ParkInfoTwoTitleActive" : null}
              onClick={this.changeTitle.bind(this, 2)}>入驻企业</li>
          </ul>
        </div>
        <div className={this.state.ParkInfoTwoListState}>
          {this.state.index == 0 ?
            < LeaseList />
            : null
          }
          {this.state.index == 1 ?
            < SellList />
            : null
          }
          {this.state.index == 2 ?
            < CompanyList />
            : null
          }

        </div>
        <div className={this.state.listTrun} onClick={this.overTitle.bind(this)}>
          {this.state.listTrun_text}
        </div>
      </div>
    )
  }

  public state = {
    index: 0,
    ParkInfoTwoState: "ParkInfoTwoAll",
    ParkInfoTwoListState: "ParkInfoTwoList",
    listTrun: "ParkInfoTwoListTrun",
    listTrun_text: "收起列表"
  }
}


//ParkInfoTwoList
class LeaseList extends React.Component {

  constructor(props) {
    super(props);

  }

  public componentDidMount() {

  }

  public onLeaseRoom(index) {
    ParkInfoThree.showRoomInfo();
    this.setState({
      leaseRoomsState: index
    })
  }

  public leasetypeIndex(index) {
    this.setState({
      typeIndex: index,
    })
  }

  public render() {
    return (
      <div className="leaseListBox" >
        <div className="leasetype">
          <ul>
            <li onClick={this.leasetypeIndex.bind(this, 0)}>
              <div className={this.state.typeIndex == 0 ? "leasetype_li_on" : "leasetype_li"} >
                <p style={{ "padding-top": "6px" }} >全部户型</p>
                <p><span>XX</span>套</p>
              </div>
            </li>
            <li onClick={this.leasetypeIndex.bind(this, 1)}>
              <div className={this.state.typeIndex == 1 ? "leasetype_li_on" : "leasetype_li"} >
                <p style={{ "padding-top": "6px" }}>100m²以下</p>
                <p><span>XX</span>套</p>
              </div>
            </li>
            <li onClick={this.leasetypeIndex.bind(this, 2)}>
              <div className={this.state.typeIndex == 2 ? "leasetype_li_on" : "leasetype_li"} >
                <p style={{ "padding-top": "6px" }}>100-200m²</p>
                <p><span>XX</span>套</p>
              </div>
            </li>
            <li onClick={this.leasetypeIndex.bind(this, 3)}>
              <div className={this.state.typeIndex == 3 ? "leasetype_li_on" : "leasetype_li"} >
                <p style={{ "padding-top": "6px" }}>300-500m²</p>
                <p><span>XX</span>套</p>
              </div>
            </li>
          </ul>
        </div>
        <div className="leaseRoomList">
          <ul>
            <li onClick={this.onLeaseRoom.bind(this, 0)}>
              <div className={this.state.leaseRoomsState == 0 ? "leaseRooms_on" : "leaseRooms"} >
                <img src="./fangliangbao/image/demo.png" />
                <div className="leaseRoomsRight">
                  <p className="leaseName">出租高新区信息产业园福建师范</p>
                  <p><span className="leasePrice">80.3</span> 元/m²⋅月</p>
                  <p className="leaseArea">187m²</p>
                </div>
              </div>
            </li>
            <li onClick={this.onLeaseRoom.bind(this, 1)}>
              <div className={this.state.leaseRoomsState == 1 ? "leaseRooms_on" : "leaseRooms"} >
                <img src="./fangliangbao/image/demo.png" />
                <div className="leaseRoomsRight">
                  <p className="leaseName">出租高新区信息产业园福建师范</p>
                  <p><span className="leasePrice">80.3</span> 元/m²⋅月</p>
                  <p className="leaseArea">187m²</p>
                </div>
              </div>
            </li>
            <li onClick={this.onLeaseRoom.bind(this, 2)}>
              <div className={this.state.leaseRoomsState == 2 ? "leaseRooms_on" : "leaseRooms"} >
                <img src="./fangliangbao/image/demo.png" />
                <div className="leaseRoomsRight">
                  <p className="leaseName">出租高新区信息产业园福建师范</p>
                  <p><span className="leasePrice">80.3</span> 元/m²⋅月</p>
                  <p className="leaseArea">187m²</p>
                </div>
              </div>
            </li>
          </ul>
        </div>
      </div>
    )
  }

  public state = {
    typeIndex: 0,
    leaseRoomsState: -1,
  }
}

class SellList extends React.Component {

  constructor(props) {
    super(props);

  }

  public componentDidMount() {

  }

  public onSellRoom(index) {
    ParkInfoThree.showRoomInfo();
    this.setState({
      sellRoomsState: index
    })
  }

  public selltypeIndex(index) {
    this.setState({
      typeIndex: index,
    })
  }

  public render() {
    return (
      <div className="leaseListBox" >
        <div className="leasetype">
          <ul>
            <li onClick={this.selltypeIndex.bind(this, 0)}>
              <div className={this.state.typeIndex == 0 ? "leasetype_li_on" : "leasetype_li"} >
                <p style={{ "padding-top": "6px" }} >全部户型</p>
                <p><span>XX</span>套</p>
              </div>
            </li>
            <li onClick={this.selltypeIndex.bind(this, 1)}>
              <div className={this.state.typeIndex == 1 ? "leasetype_li_on" : "leasetype_li"} >
                <p style={{ "padding-top": "6px" }}>100m²以下</p>
                <p><span>XX</span>套</p>
              </div>
            </li>
            <li onClick={this.selltypeIndex.bind(this, 2)}>
              <div className={this.state.typeIndex == 2 ? "leasetype_li_on" : "leasetype_li"} >
                <p style={{ "padding-top": "6px" }}>100-200m²</p>
                <p><span>XX</span>套</p>
              </div>
            </li>
            <li onClick={this.selltypeIndex.bind(this, 3)}>
              <div className={this.state.typeIndex == 3 ? "leasetype_li_on" : "leasetype_li"} >
                <p style={{ "padding-top": "6px" }}>300-500m²</p>
                <p><span>XX</span>套</p>
              </div>
            </li>
          </ul>
        </div>
        <div className="leaseRoomList">
          <ul>
            <li onClick={this.onSellRoom.bind(this, 0)}>
              <div className={this.state.sellRoomsState == 0 ? "leaseRooms_on" : "leaseRooms"} >
                <img src="./fangliangbao/image/demo.png" />
                <div className="leaseRoomsRight">
                  <p className="leaseName">出租高新区信息产业园福建师范</p>
                  <p><span className="leasePrice">80.3</span> 元/m²⋅月</p>
                  <p className="leaseArea">187m²</p>
                </div>
              </div>
            </li>
            <li onClick={this.onSellRoom.bind(this, 1)}>
              <div className={this.state.sellRoomsState == 1 ? "leaseRooms_on" : "leaseRooms"} >
                <img src="./fangliangbao/image/demo.png" />
                <div className="leaseRoomsRight">
                  <p className="leaseName">出租高新区信息产业园福建师范</p>
                  <p><span className="leasePrice">80.3</span> 元/m²⋅月</p>
                  <p className="leaseArea">187m²</p>
                </div>
              </div>
            </li>
            <li onClick={this.onSellRoom.bind(this, 2)}>
              <div className={this.state.sellRoomsState == 2 ? "leaseRooms_on" : "leaseRooms"} >
                <img src="./fangliangbao/image/demo.png" />
                <div className="leaseRoomsRight">
                  <p className="leaseName">出租高新区信息产业园福建师范</p>
                  <p><span className="leasePrice">80.3</span> 元/m²⋅月</p>
                  <p className="leaseArea">187m²</p>
                </div>
              </div>
            </li>
          </ul>
        </div>
      </div>
    )
  }

  public state = {
    typeIndex: 0,
    sellRoomsState: -1,
  }
}

class CompanyList extends React.Component {

  constructor(props) {
    super(props);

  }

  public componentDidMount() {

  }


  public onCompany(index) {
    ParkInfoThree.showCompanyInfo();
    this.setState({
      companyState: index
    })
  }

  public companytypeIndex(index) {
    this.setState({
      typeIndex: index,
    })
  }

  public render() {
    return (
      <div className="leaseListBox" >
        <div className="leasetype">
          <ul>
            <li onClick={this.companytypeIndex.bind(this, 0)}
              className={this.state.typeIndex == 0 ? "companytype_li_on" : "companytype_li"}>
              全部
            </li>
            <li onClick={this.companytypeIndex.bind(this, 1)}
              className={this.state.typeIndex == 1 ? "companytype_li_on" : "companytype_li"}>
              高新技术
            </li>
            <li onClick={this.companytypeIndex.bind(this, 2)}
              className={this.state.typeIndex == 2 ? "companytype_li_on" : "companytype_li"}>
              科技服务
            </li>
            <li onClick={this.companytypeIndex.bind(this, 3)}
              className={this.state.typeIndex == 3 ? "companytype_li_on" : "companytype_li"}>
              金融保险
            </li>
          </ul>
        </div>
        <div className="leaseRoomList">
          <ul>
            <li onClick={this.onCompany.bind(this, 0)}>
              <div className={this.state.companyState == 0 ? "leaseRooms_on" : "leaseRooms"} >
                <img src="./fangliangbao/image/demo.png" />
                <div className="leaseRoomsRight">
                  <p className="leaseName">浙江永拓信息科技有限公伏见司播放结束的</p>
                  <p className="leaseArea" style={{ "margin": "3px 0" }}>
                    <i className="iconfont " style={{ "font-size": "12px", "color": "rgba(207, 209, 210, 1)" }}>&#xe83c;</i>
                    E座B区-3F-301</p>
                  <p className="leaseArea">
                    <i className="iconfont " style={{ "font-size": "12px", "color": "rgba(207, 209, 210, 1)" }}>&#xe83c;</i>
                    科技服务</p>
                </div>
              </div>
            </li>
            <li onClick={this.onCompany.bind(this, 1)}>
              <div className={this.state.companyState == 1 ? "leaseRooms_on" : "leaseRooms"} >
                <img src="./fangliangbao/image/demo.png" />
                <div className="leaseRoomsRight">
                  <p className="leaseName">浙江永拓信息科技有限公伏见司播放结束的</p>
                  <p className="leaseArea" style={{ "margin": "3px 0" }}>
                    <i className="iconfont " style={{ "font-size": "12px", "color": "rgba(207, 209, 210, 1)" }}>&#xe83c;</i>
                    E座B区-3F-301</p>
                  <p className="leaseArea">
                    <i className="iconfont " style={{ "font-size": "12px", "color": "rgba(207, 209, 210, 1)" }}>&#xe83c;</i>
                    科技服务</p>
                </div>
              </div>
            </li>
            <li onClick={this.onCompany.bind(this, 2)}>
              <div className={this.state.companyState == 2 ? "leaseRooms_on" : "leaseRooms"} >
                <img src="./fangliangbao/image/demo.png" />
                <div className="leaseRoomsRight">
                  <p className="leaseName">浙江永拓信息科技有限公伏见司播放结束的</p>
                  <p className="leaseArea" style={{ "margin": "3px 0" }}>
                    <i className="iconfont " style={{ "font-size": "12px", "color": "rgba(207, 209, 210, 1)" }}>&#xe83c;</i>
                    E座B区-3F-301</p>
                  <p className="leaseArea">
                    <i className="iconfont " style={{ "font-size": "12px", "color": "rgba(207, 209, 210, 1)" }} >&#xe83c;</i>
                    科技服务</p>
                </div>
              </div>
            </li>
          </ul>
        </div>
      </div>
    )
  }


  public state = {
    typeIndex: 0,
    companyState: -1,
  }
}

class ParkInfoThree extends React.Component {

  constructor(props) {
    super(props);

    ParkInfoThree.showRoomInfo = this.showRoomInfo.bind(this);
    ParkInfoThree.showCompanyInfo = this.showCompanyInfo.bind(this);
    //ParkInfoThree.rightBox_up = this.rightBox_up.bind(this);
    //ParkInfoThree.rightBox_up2 = this.rightBox_up2.bind(this);
    //ParkInfoThree.rightBox_up3 = this.rightBox_up3.bind(this);

  }

  public componentDidMount() {

  }
  //RoomInfoState

  static showRoomInfo() { };
  public showRoomInfo() {
    this.setState({
      RoomInfoState: "RoomInfoShow",
     // rightBox: "ParkInfoThree_rightBox_up"
    })
  }

  static showCompanyInfo() { };
  public showCompanyInfo() {
    this.setState({
      RoomInfoState: "CompanyInfoShow",
    //  rightBox: "ParkInfoThree_rightBox_up"
    })
  }

  //  static rightBox_up() { };
  //public rightBox_up() {
  //  this.setState({
  //    rightBox: "ParkInfoThree_rightBox_up"
  //  })
  //}

//  static rightBox_up2() { };
//  public rightBox_up2() {
//    this.setState({
//      rightBox: "ParkInfoThree_rightBox_up2"
//    })
//  }

//  static rightBox_up3() { };
//  public rightBox_up3(){
//     this.setState({
//      rightBox: "ParkInfoThree_rightBox_up3"
//    })
//}

  public render() {
    return (
      <div className="ParkInfoThree">

        <div className="ParkInfoThree_leftBox">
          {this.state.RoomInfoState == "RoomInfoShow" ?
            < RoomInfoThreeLeft />
            :
            null
          }
          {this.state.RoomInfoState == "CompanyInfoShow" ?
            < CompanyInfoThreeLeft />
            :
            null
          }
          < ParkInfoThreeLeft />

        </div>
        <div className="ParkInfoThree_rightBox">
          < ParkInfoThreeRight />
        </div>
      </div>
    )
  }

  public state = {
    RoomInfoState: "hide",
   // rightBox: "ParkInfoThree_rightBox"
  }
}

class ParkInfoThreeLeft extends React.Component {

  constructor(props) {
    super(props);

  }

  public componentDidMount() {

  }
  public ParkInfoOn(index) {
    this.setState({
      ParkInfoIndex: index
    })
  }

  public render() {
    return (
      <div className="ParkInfoThree_left" >
        <div className="ParkInfoThree_left_title">
          <ul>
            <li className={this.state.ParkInfoIndex == 0 ? "ParkInfoIndex_in" : null}
              onClick={this.ParkInfoOn.bind(this, 0)} >
              园区介绍</li>
            <li className={this.state.ParkInfoIndex == 1 ? "ParkInfoIndex_in" : null}
              onClick={this.ParkInfoOn.bind(this, 1)} >
              区位优势</li>
            <li className={this.state.ParkInfoIndex == 2 ? "ParkInfoIndex_in" : null}
              onClick={this.ParkInfoOn.bind(this, 2)} >
              优惠政策</li>
            <li className={this.state.ParkInfoIndex == 3 ? "ParkInfoIndex_in" : null}
              onClick={this.ParkInfoOn.bind(this, 3)} >
              园区风采</li>
          </ul>
        </div>
        <div className="ParkInfoThree_left_text">
          {this.state.ParkInfoIndex == 0 ?
            <div className="ParkInfo_text parkIntroduced" id="parkIntroduced">
              <p>地处广州、顺德、中山、东莞、珠海、深圳等地之枢纽，占踞番禺的核心位置。前身是永隆制衣厂，2010年经改造，成为了青瓦白墙，诗情画意的创意园区。 产业园取名花城，集合了绿色花城、历史花</p>
              <p>地处广州、顺德、中山、东莞、珠海、深圳等地之枢纽，占踞番禺的核心位置。前身是永隆制衣厂，2010年经改造，成为了青瓦白墙，诗情画意的创意园区。 产业园取名花城，集合了绿色花城、历史花，地处广州、顺德、中山、东莞、珠海、深圳等地之枢纽，占踞番禺的核心位置。前身是永隆制衣厂，2010年经改造，成为了青瓦白墙，诗情画意的创意园区。 产业园取名花城，集合了绿色花城、历史花</p>
              <p>地处广州、顺德、中山、东莞、珠海、深圳等地之枢纽，占踞番禺的核心位置。前身是永隆制衣厂，2010年经改造，成为了青瓦白墙，诗情画意的创意园区。 产业园取名花城，集合了绿色花城、历史花</p>
            </div>
            : null
          }
          {this.state.ParkInfoIndex == 1 ?
            <div className="ParkInfo_text advantage" id="advantage">
              <p>地处广州、顺德、中山、东莞、珠海、深圳等地之枢纽，占踞番禺的核心位置。前身是永隆制衣厂，2010年经改造，成为了青瓦白墙，诗情画意的创意园区。 产业园取名花城，集合了绿色花城、历史花</p>
              <p>地处广州、顺德、中山、东莞、珠海、深圳等地之枢纽，占踞番禺的核心位置。前身是永隆制衣厂，2010年经改造，成为了青瓦白墙，诗情画意的创意园区。 产业园取名花城，集合了绿色花城、历史花</p>
            </div>
            : null
          }
          {this.state.ParkInfoIndex == 2 ?
            <div className="ParkInfo_text discounts" id="discounts">
              <p>地处广州、顺德、中山、东莞、珠海、深圳等地之枢纽，占踞番禺的核心位置。前身是永隆制衣厂，2010年经改造，成为了青瓦白墙，诗情画意的创意园区。 产业园取名花城，集合了绿色花城、历史花</p>
            </div>
            : null
          }
          {this.state.ParkInfoIndex == 3 ?
            <div className="ParkInfo_text parkElegant" id="parkElegant">
              <div className="infoImg">
                <div className="infoImg_left">
                  <i className="iconfont " >&#xe83c;</i>
                </div>
                <div className="infoImg_ul">
                  <ul>
                    <li> <img src="./fangliangbao/image/demo.png" /></li>
                    <li> <img src="./fangliangbao/image/demo.png" /></li>
                    <li> <img src="./fangliangbao/image/demo.png" /></li>
                  </ul>
                </div>
                <p className="infoImg_num">
                  <span>2</span> / <span>8</span>
                </p>
                <div className="infoImg_right">
                  <i className="iconfont " >&#xe83c;</i>
                </div>
              </div>
            </div>
            : null
          }
        </div>
      </div>
    )
  }

  public state = {
    ParkInfoIndex: 0
  }
}

class RoomInfoThreeLeft extends React.Component {

  constructor(props) {
    super(props);

  }

  public componentDidMount() {

  }

  public roomInfoOn(index) {
    console.log('roomInfoOn',index)
    if (index == 1 ) {
      this.setState({
        RoomInfoThreeLeft: "RoomInfoThreeLeft_all",
        RoomInfoIndex: index,
      });
    } else if (index == 2 ) {
      this.setState({
        RoomInfoThreeLeft: "RoomInfoThreeLeft_all",
        RoomInfoIndex: index,
      });
    }else {
         console.log('roomInfoOn0000',index)
      this.setState({
      RoomInfoThreeLeft: "RoomInfoThreeLeft_part",
      RoomInfoIndex: index,
      });
    }
  }

  public render() {
    //<div  className="ParkInfoThree_left_title"> 
    //   <ul>
    //     <li className={this.state.ParkInfoIndex == 0 ? "ParkInfoIndex_in" : null}
    return (
      <div className={this.state.RoomInfoThreeLeft} >
        <div className="ParkInfoThree_left_title">
          <ul>
            <li className={this.state.RoomInfoIndex == 0 ? "ParkInfoIndex_in" : null}
              onClick={this.roomInfoOn.bind(this, 0)} >
              房源概况</li>
            <li className={this.state.RoomInfoIndex == 1 ? "ParkInfoIndex_in" : null}
              onClick={this.roomInfoOn.bind(this, 1)} >
              实拍照片</li>
            <li className={this.state.RoomInfoIndex == 2 ? "ParkInfoIndex_in" : null}
              onClick={this.roomInfoOn.bind(this, 2)} >
              实拍视频</li>
          </ul>
        </div>
        {this.state.RoomInfoIndex == 0 ?
          <div className="roomInfoBox">
            <ul className="roomInfoBox_one">
              <li><span style={{"font-size":"46px","font-weight":"bold","color":"rgba(220,26,63,1)"}}>98</span> 元/m²⋅月</li>
              <li>总价：<span>19,600‬</span> 元/m²⋅月</li>
              <li style={{"margin": "0px 24px"}}>
                <p>建筑面积</p>
                <p className="ribo_bold"><span>200</span>m²</p>
              </li>
              <li style={{"margin": "0px 24px"}}>
                <p>可容纳工位</p>
                <p className="ribo_bold"><span>29~58</span>个工位</p>
              </li>
                <li style={{ "margin": "0px 24px" }}>
                  <p>装修程度</p>
                <p className="ribo_bold">中等装修</p>
              </li>
            </ul>
            <ul className="roomInfoBox_two">
              <li>免租时间 <span>面议</span></li>
              <li>总共楼层 <span>12层</span></li>
              <li>所在楼层 <span>6层</span></li>
              <li>电<span style={{"margin-left":"28px","color":"rgba(152,159,168,1)"}}>梯</span><span>有电梯</span></li>
              <li>看房时间 <span>联系顾问，随时可看</span></li>
              <li>更新时间 <span>14小时前</span></li>
            </ul>
          </div>
          : null
        }
        {this.state.RoomInfoIndex == 1 ?
          <div className="infoImg">
            <div className="infoImg_left">
              <i className="iconfont " >&#xe83c;</i>
            </div>
            <div className="infoImg_ul">
              <ul>
                <li> <img src="./fangliangbao/image/build.png" /></li>
                <li> <img src="./fangliangbao/image/build.png" /></li>
                <li> <img src="./fangliangbao/image/build.png" /></li>
              </ul>
            </div>
            <p className="infoImg_num">
              <span>2</span> / <span>8</span>
            </p>
            <div className="infoImg_right">
              <i className="iconfont " >&#xe83c;</i>
            </div>
          </div>
          : null
        }
        {this.state.RoomInfoIndex == 2 ?
          <div className="infoImg">
            <div className="infoImg_left">
              <i className="iconfont " >&#xe83c;</i>
            </div>
            <div className="infoImg_ul">
              <ul>
                <li> <img src="./fangliangbao/image/build.png" /></li>
                <li> <img src="./fangliangbao/image/build.png" /></li>
                <li> <img src="./fangliangbao/image/build.png" /></li>
              </ul>
            </div>
            <p className="infoImg_num">
              <span>2</span> / <span>8</span>
            </p>
            <div className="infoImg_right">
              <i className="iconfont " >&#xe83c;</i>
            </div>
          </div>
          : null
        }
      </div>
    )
  }

  public state = {
    RoomInfoIndex: 0,
    RoomInfoThreeLeft:"RoomInfoThreeLeft_part"
  }
}

class CompanyInfoThreeLeft extends React.Component {

  constructor(props) {
    super(props);

  }

  public componentDidMount() {

  }

  public roomInfoOn(index) {
    this.setState({
      RoomInfoIndex: index,
    })
  }

  public onChange(a, b, c) {
  console.log(a, b, c);
}


  public render() {
    //<div  className="ParkInfoThree_left_title">
    //   <ul>
    //     <li className={this.state.ParkInfoIndex == 0 ? "ParkInfoIndex_in" : null}
    return (
      <div className="RoomInfoThreeLeft" >
        <div className="ParkInfoThree_left_title">
          <ul>
            <li className={this.state.RoomInfoIndex == 0 ? "ParkInfoIndex_in" : null}
              onClick={this.roomInfoOn.bind(this, 0)} >
              企业信息</li>
            <li className={this.state.RoomInfoIndex == 1 ? "ParkInfoIndex_in" : null}
              onClick={this.roomInfoOn.bind(this, 1)} >
              企业风采</li>
            <li className={this.state.RoomInfoIndex == 2 ? "ParkInfoIndex_in" : null}
              onClick={this.roomInfoOn.bind(this, 2)} >
              企业详情</li>
            <li className={this.state.RoomInfoIndex == 3 ? "ParkInfoIndex_in" : null}
              onClick={this.roomInfoOn.bind(this, 3)} >
              产品展示</li>
          </ul>
        </div>
        {this.state.RoomInfoIndex == 0 ?
          <div>"000000000"</div>
          : null
        }
        {this.state.RoomInfoIndex == 1 ?
          <div className="infoImg">
            <div className="infoImg_left">
              <i className="iconfont " >&#xe83c;</i>
            </div>
            <div className="infoImg_ul">
              <ul>
                <li> <img src="./fangliangbao/image/demo.png" /></li>
                <li> <img src="./fangliangbao/image/demo.png" /></li>
                <li> <img src="./fangliangbao/image/demo.png" /></li>
              </ul>
            </div>
            <p className="infoImg_num">
              <span>2</span> / <span>8</span>
            </p>
            <div className="infoImg_rightt">
              <i className="iconfont " >&#xe83c;</i>
            </div>
          </div>
          : null
        }
        {this.state.RoomInfoIndex == 2 ?
          <div className="infoImg">
            <div className="infoImg_left">
              <i className="iconfont " >&#xe83c;</i>
            </div>
            <div className="infoImg_ul">
              <ul>
                <li> <img src="./fangliangbao/image/demo.png" /></li>
                <li> <img src="./fangliangbao/image/demo.png" /></li>
                <li> <img src="./fangliangbao/image/demo.png" /></li>
              </ul>
            </div>
            <p className="infoImg_num">
              <span>2</span> / <span>8</span>
            </p>
            <div className="infoImg_rightt">
              <i className="iconfont " >&#xe83c;</i>
            </div>
          </div>
          : null
        }
        {this.state.RoomInfoIndex == 3 ?
          <div className="infoImg">
            <div className="infoImg_left">
              <i className="iconfont " >&#xe83c;</i>
            </div>
            <div className="infoImg_ul">
              <ul>
                <li> <img src="./fangliangbao/image/demo.png" /></li>
                <li> <img src="./fangliangbao/image/demo.png" /></li>
                <li> <img src="./fangliangbao/image/demo.png" /></li>
              </ul>
            </div>
            <p className="infoImg_num">
              <span>2</span> / <span>8</span>
            </p>
            <div className="infoImg_rightt">
              <i className="iconfont " >&#xe83c;</i>
            </div>
          </div>
          : null
        }
      </div>
    )
  }

  public state = {
    RoomInfoIndex: 0,
    RoomInfoThreeLeft:"RoomInfoThreeLeft_part"
  }
}

class ParkInfoThreeRight extends React.Component {

  constructor(props) {
    super(props);
      

  }

  public componentDidMount() {

  }  

  public getNeed() {
    console.log(this.state) 
  }

  public render() {
    return (
      <div className="ParkInfoThree_right" >
        <p className="pitr_title" >咨询顾问</p>
        <div className="ParkInfoThree_right_one" >
          <img src="./fangliangbao/image/demo.png" />
          <div className="pitro_rb">
              <p className="pitro_name">张三三</p>
            <div className="pitro_text1">该园区与房源由我维护，熟知园区政策与周边环境</div>
            <p className="pitro_text2">免费咨询   <span style={{ "font-size":"16px","font-weight":"bold","margin-left": "5px" }}>15578380203</span></p>
          </div>
        </div>
        <div className="ParkInfoThree_right_two" >
          <p  className="pitr_title">宝哥帮找房</p>
          <p  className="pitrt_inp">
            <i className="iconfont " style={{ "margin-right": "5px", "font-size": "14px" }}>&#xe83c;</i>
            <input type="text" value={this.state.phone}/>
          </p>
        </div>
        <div className="ParkInfoThree_right_three" >
          <p  className="pitrth_text1">您的需求：</p>
          <textarea value={this.state.needText}></textarea>
          <input type="button" />
        </div>
        <input type="button" value="立即委托" className="pitr_btn" onClick={this.getNeed.bind(this)} />
      </div>
    )
  }

  public state = {
    needText: "如：在广州白云区寻找200m2左右的办公室，租金在80元/m2·天，临近地铁站。",
    phone:"输入您的手机号码",
  }
}

export default ParkInfo;
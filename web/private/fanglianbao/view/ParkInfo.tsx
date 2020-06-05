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
      <div className="infoPage">
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
                  <p className="leaseName"><span>187</span>m²</p>
                  <p><span className="leasePrice">80.3</span> 元/m²⋅月</p>
                  <p className="leaseArea">简装</p>
                </div>
              </div>
            </li>
            <li onClick={this.onLeaseRoom.bind(this, 1)}>
              <div className={this.state.leaseRoomsState == 1 ? "leaseRooms_on" : "leaseRooms"} >
                <img src="./fangliangbao/image/demo.png" />
                <div className="leaseRoomsRight">
                  <p className="leaseName"><span>187</span>m²</p>
                  <p><span className="leasePrice">80.3</span> 元/m²⋅月</p>
                  <p className="leaseArea">简装</p>
                </div>
              </div>
            </li>
            <li onClick={this.onLeaseRoom.bind(this, 2)}>
              <div className={this.state.leaseRoomsState == 2 ? "leaseRooms_on" : "leaseRooms"} >
                <img src="./fangliangbao/image/demo.png" />
                <div className="leaseRoomsRight">
                  <p className="leaseName"><span>187</span>m²</p>
                  <p><span className="leasePrice">80.3</span> 元/m²⋅月</p>
                  <p className="leaseArea">简装</p>
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
                  <p className="leaseName"><span>187</span>m²</p>
                  <p><span className="leasePrice">80.3</span> 元/m²⋅月</p>
                  <p className="leaseArea">简装</p>
                </div>
              </div>
            </li>
            <li onClick={this.onSellRoom.bind(this, 1)}>
              <div className={this.state.sellRoomsState == 1 ? "leaseRooms_on" : "leaseRooms"} >
                <img src="./fangliangbao/image/demo.png" />
                <div className="leaseRoomsRight">
                  <p className="leaseName"><span>187</span>m²</p>
                  <p><span className="leasePrice">80.3</span> 元/m²⋅月</p>
                  <p className="leaseArea">简装</p>
                </div>
              </div>
            </li>
            <li onClick={this.onSellRoom.bind(this, 2)}>
              <div className={this.state.sellRoomsState == 2 ? "leaseRooms_on" : "leaseRooms"} >
                <img src="./fangliangbao/image/demo.png" />
                <div className="leaseRoomsRight">
                  <p className="leaseName"><span>187</span>m²</p>
                  <p><span className="leasePrice">80.3</span> 元/m²⋅月</p>
                  <p className="leaseArea">简装</p>
                </div>
              </div>
            </li>
          </ul>
        </div>
      </div>
    )
  }

  public state = {

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
            <li>
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
            <li>
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
            <li>
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


  }

  public componentDidMount() {
  }


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
  //count1  left:"";
  public componentDidMount() {
    
  }

  public roomInfoOn(index) {
    console.log('roomInfoOn',index)
    if (index == 1 ) {
      this.setState({
        RoomInfoThreeLeft: "RoomInfoThreeLeft_all",
        RoomInfoIndex: index,
        imgUrl: this.state.imgUrlList[0].url,
        imgIndex: 0,
        imgNum: 1,
      });
    } else if (index == 2 ) {
      this.setState({
        RoomInfoThreeLeft: "RoomInfoThreeLeft_all",
        RoomInfoIndex: index,
        vidUrl: this.state.vidUrlList[0].url,
        vidgIndex: 0,
        vidNum: 1,
      });
    }else {
      this.setState({
      RoomInfoThreeLeft: "RoomInfoThreeLeft_part",
      RoomInfoIndex: index,
      });
    }
     //over
  }

  public upImg() {
    if (this.state.imgIndex > 0) {

      let imgIndexN = this.state.imgIndex;
      imgIndexN = imgIndexN - 1;
      let imgNumN = this.state.imgIndex+1;
      imgNumN = imgNumN - 1;

    this.setState({
      imgIndex: imgIndexN,
      imgUrl: this.state.imgUrlList[this.state.imgIndex - 1].url,
      imgNum:imgNumN
    }, () => {
      console.log(this.state)
      })
    }
 
  }

  public nextImg() {
    if (this.state.imgNum !== this.state.imgMax) {

    let imgIndexN = this.state.imgIndex;
    imgIndexN = imgIndexN + 1;

    let imgNumN = this.state.imgIndex + 1;
    imgNumN = imgNumN + 1;

    this.setState({
      imgIndex: imgIndexN,
      imgUrl: this.state.imgUrlList[this.state.imgIndex + 1].url,
      imgNum: imgNumN
    }, () => {
      console.log(this.state)
    })

  }
  }
  
  public upVid() {
    if (this.state.vidIndex > 0) {

      let vidIndexN = this.state.vidIndex;
      vidIndexN = vidIndexN - 1;
      let vidNumN = this.state.vidIndex+1;
      vidNumN = vidNumN - 1;

    this.setState({
      vidIndex: vidIndexN,
      vidUrl: this.state.vidUrlList[this.state.vidIndex - 1].url,
      vidNum:vidNumN
    }, () => {
      console.log(this.state)
      })
    }
 
  }

  public nextVid() {
    if (this.state.vidNum !== this.state.vidMax) {

    let vidIndexN = this.state.vidIndex;
    vidIndexN = vidIndexN + 1;

    let vidNumN = this.state.vidIndex + 1;
    vidNumN = vidNumN + 1;

    this.setState({
      vidIndex: vidIndexN,
      vidUrl: this.state.vidUrlList[this.state.vidIndex + 1].url,
      vidNum: vidNumN
    }, () => {
      console.log(this.state)
    })

  }
  }

  public fullView() {
    this.setState({
      fullViewState: true
    });
     $(document.body).attr('style','height: 100%; margin: 0; padding: 0; overflow: hidden;')
  }

  public closeFull() {
        this.setState({
      fullViewState: false
    });
     $(document.body).attr('style','height: 100%; margin: 0; padding: 0; overflow: visible;')
  }

  public render() {
    //<div  className="ParkInfoThree_left_title"> 
    //   <ul>
    //     <li className={this.state.ParkInfoIndex == 0 ? "ParkInfoIndex_in" : null}
    return (
      <div className={this.state.RoomInfoThreeLeft} >
        <p className="roomInfo_tit">出租！高新区信息产业园豪华装修单元</p>
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
            <span className="stylesgoleft" onClick={this.upImg.bind(this)}>-</span>
            <img src={this.state.imgUrl} onClick={this.fullView.bind(this)} />
            <span className="stylesgoright" onClick={this.nextImg.bind(this)}>+</span>
             <p className="infoImg_num">
              <span>{this.state.imgNum}</span> / <span>{this.state.imgMax}</span>
            </p>
          </div>
          : null
        }
        {this.state.RoomInfoIndex == 2 ?
          <div className="infoImg">
            <span className="stylesgoleft" onClick={this.upVid.bind(this)}>-</span>
                <img src={this.state.vidUrl} />
            <span className="stylesgoright" onClick={this.nextVid.bind(this)}>+</span>
             <p className="infoImg_num">
              <span>{this.state.vidNum}</span> / <span>{this.state.vidMax}</span>
            </p>
          </div>
          : null
        }

        {this.state.fullViewState == true ?
          <div className="fullView">
            <div onClick={this.closeFull.bind(this)}>X</div>
        </div>
          :
        null
        }
  

      </div>
    )
  }

  public state = {
    RoomInfoIndex: 0,
    RoomInfoThreeLeft: "RoomInfoThreeLeft_part",
    fullViewState:false,
    imgIndex: 0,
    imgMax: 3,
    imgNum: 1,
    imgUrl: "",
    imgUrlList: [
      {url:"./fangliangbao/image/build.png"},
      { url: "./fangliangbao/image/build1.png" },
       {url:"./fangliangbao/image/demo.png"},
    ],
    vidIndex: 0,
    vidMax: 3,
    vidNum: 1,
    vidUrl: "",
    vidUrlList: [
      {url:"./fangliangbao/image/build.png"},
      { url: "./fangliangbao/image/build1.png" },
       {url:"./fangliangbao/image/demo.png"},
    ]
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

  }
}

export default ParkInfo;
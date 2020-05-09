import * as React from "react";
import * as RouterDOM from 'react-router-dom';

import GlobalAction from "compat";
import DataService from "dataService";
import { Carousel, WingBlank } from 'antd-mobile';

class FindLease extends React.Component {
  public constructor(props) {
    super(props);

    FindLease.toggleView = this.toggleView.bind(this);
    FindLease.getLeaseinfoByroomid = this.getLeaseinfoByroomid.bind(this);
  }

  public componentDidMount() {
    //3dBut-up
    move3dBut("up");
  }

  public globalAction: GlobalAction = new GlobalAction();

  // 外部传入的企业id，传给企业详情组件，刷新企业详情数据；  
  //(招租查询模块-查询)通过roomid获取招租的场地列表接口
  static getLeaseinfoByroomid(id) { }
  public getLeaseinfoByroomid(id) {
    console.log("getCompanyinfo", id);
    this.toggleView("Info", id);
    LeaseInfo.getLeaseInfo(id);
  }

  static toggleView(a, id) { };
  public toggleView(a, id) {
    console.log("fl", a);
    console.log("fl", id);
    // console.log("fl", n);
    //roomid
    if (a == "Info") {
      this.setState({
        showList: false,
        showInfo: true,
        companyInfotit: "hide"
      })
    } else {
      this.setState({
        showList: true,
        showInfo: false,
        companyInfotit: "companyInfotit"
      })
    }
  }

  public render() {
    return (
      <div className={this.state.FindLeasecss}>
        <p className={this.state.companyInfotit}>
          <span>招租查询</span>
        </p>
        <div className={this.state.showList == true ? "show" : "hide"}>
          <LeaseList />
        </div>

        <div className={this.state.showInfo == true ? "show" : "hide"}>
          <LeaseInfo />
        </div>
      </div>
    )
  }

  public state = {
    FindLeasecss: "findLease",
    // 招租列表
    showList: true,
    // 招租信息
    showInfo: false,
    companyInfotit: "companyInfotit",
  }

  //over
}

export default FindLease;

// 招租列表页 -- LeaseList
class LeaseList extends React.Component {
  public constructor(props) {
    super(props);

    this.showInfo = this.showInfo.bind(this);
    this.getRoomRentSquareType = this.getRoomRentSquareType.bind(this);
    this.setRoomRent = this.setRoomRent.bind(this);
    this.searchRoomRent = this.searchRoomRent.bind(this);
    this.change = this.change.bind(this);
  }

  public componentDidMount() {
    //(招租查询模块-查询-面积分类)-获取招租查询面积分类列表
    this.dataService.getRoomRentSquareType(this.getRoomRentSquareType, this.state.park_id);
    //(招租查询模块-查询)通过园区id获取招租的场地列表接口
    this.dataService.findRoomRentByparkid(this.setRoomRent, this.state.park_id, "");
  }

  public dataService: DataService = new DataService();
  public globalAction: GlobalAction = new GlobalAction();

  //set 招租查询面积分类列表
  public getRoomRentSquareType(data) {
    console.log("getRoomRentSquareType", data);
    this.setState({
      areaType: data.response,
    })
  }

  //set 招租查询招租的场地列表
  public setRoomRent(data) {
    console.log("setRoomRent", data);
    if (data.response.length == 0) {
      this.setState({
        roomData: data.response,
        roomNull: "show",
      })
    } else {
      this.setState({
        roomData: data.response,
        roomNull: "hide",
      })
    }

  }

  // 点击更多，显示info;隐藏list；这里需要调用FindLease 的方法；
  public showInfo(a, id, name, e) {
    FindLease.toggleView(a, id);
    LeaseInfo.getLeaseInfo(id);
    console.log("more", a, id, name, e);
  }

  public toggleFold() {
    console.log("tftft")
    if (this.state.leaseListcss == "leaseList-all") {
      this.setState({
        leaseListcss: "leaseList-part",
        leaseul: "leaseul"
      })
      //通知3d，继续加载模型  
      this.globalAction.web_call_webgl_continueloadModuler();
    } else {
      this.setState({
        leaseListcss: "leaseList-all",
        leaseul: "leaseul-all"
      })
      // 通知3d，暂停加载模型
      this.globalAction.web_call_webgl_pauseloadModuler();
    }
    if (this.state.iconfont == "iconfont iconfont-unturn") {
      this.setState({
        iconfont: "iconfont iconfont-turn",
      })
    } else {
      this.setState({
        iconfont: "iconfont iconfont-unturn",
      })
    }
  }

  public foldBtn() {
    console.log("foldBtn");
    if (this.state.leaseBtn == "leaseBtn-part") {
      this.setState({
        leaseBtn: "leaseBtn-all",
        searchBoxIcon: "iconfont iconfont-turn",
      })
    } else {
      this.setState({
        leaseBtn: "leaseBtn-part",
        searchBoxIcon: "iconfont iconfont-unturn",
      })
    }
  }


  //选中某个房间
  public leaseActive(index, id,title,building, floor, room) {
    console.log("active", index, id);
    console.log("active2", building, floor,room);
    this.setState({
      indexOf: index,
      roomId: id
    });
    console.log("leaseActive", this.state);
      let roomData = {
      m_pTile: title,
      m_pBuilding: building,
      m_pLayer: floor,
      m_pRoom: room,
    }
    //// 通知3d，切换房间定位（web获取的是 房间data）
    this.globalAction.web_call_webgl_switchRoom(roomData);
  }

  //切换 目标面积，搜索房间
  public typeActive(indexof, name) {
    console.log("typeActive-1", indexof);
    console.log("typeActive-2", name);
    //console.log("typeActive-3", id);
    this.setState({
      typeIndexof: indexof,
      square: name,
      inputValue: name,
    }, () => {
      this.searchRoomRent();
    })
  }

  // 聚焦
  public foucus() {
    if (this.state.inputValue == "搜索") {
      this.setState({ inputValue: "" })
    }
  }

  // 失焦
  public blur(event) {
    if (this.state.inputValue == "") {
      this.setState({ inputValue: "搜索" })
    }
  }

  // 输入
  public change(event) {
    this.setState({
      inputValue: event.target.value,
      square: event.target.value,
    });
  }

  //软键盘搜索，获取数据，呈现列表效果；（3.5-未写）；1提交搜索条件。；2-css； 
  public searchRoomRent() {
    if (this.state.square == "全部") {
      this.dataService.findRoomRentByparkid(this.setRoomRent, this.state.park_id, " ");
    } else {
      this.dataService.findRoomRentByparkid(this.setRoomRent, this.state.park_id, this.state.square);
    }
    console.log("searchBtn", this.state.inputValue, this.state.square);
  }

  //返回园区map
  public mapReturnpark() {
    //通知3d，返回园区视角
    this.globalAction.web_call_webgl_mapReturnpark();
        //3dBut-down
    move3dBut("down")
  }

  
  onErrorHeadimageurl(this, index) {
    var items = this.state.companyData;
    items[index].headimageurl ="./park_m/image/noImg.png";
    this.setState({
          companyData: items
    });
  }

  public render() {
    return (
      <div className={this.state.leaseListcss}>
        <div className={"foleBtn"} >
          <p className="companyGoHomeLeft" onClick={this.mapReturnpark.bind(this)}>
            <RouterDOM.Link to="/home" style={{ color: "#949494" }}>
              <i className="iconfont companyInfoicon">&#xe83b;</i>
              <span>返回</span>
            </RouterDOM.Link>
          </p>
          <p className="companyGoHomeRight">
            <i className={this.state.iconfont} style={{ "fontSize": "5rem", "color": "#C0C0C0" }} onClick={this.toggleFold.bind(this)} >&#xe849;</i>
          </p>
        </div>
        <ul className={this.state.leaseul}>
          <p className={this.state.roomNull}>没有符合搜索条件的结果···</p>
          {this.state.roomData.map((i, index) => {
              return (
                <li onClick={this.leaseActive.bind(this, index, i.id, i.project_title, i.building_code, i.floor_code, i.room_code)} className={this.state.indexOf == index ? "leaseli-active" : "leaseli"} >
                  <div className={this.state.indexOf == index ? "leaseImgback-active" : "leaseImgback"} >
                    <img  src={i.headimageurl == null ? this.state.imgurlNull : i.headimageurl}   onError={this.onErrorHeadimageurl.bind(this, index)} />
                  </div>
                  <div className="leaseul-middle">
                    <p className={this.state.indexOf == index ? "leaseName-active" : "leaseName"} style={{ "font-size": "2.4rem", "font-weight": "bold"  }}>{i.building_name}-{i.floor_name}-{i.room_name}</p>
                    <p style={{ "font-size": "2.5rem" }}><span className="iconfont" style={{ "fontSize": "2.5rem", "margin-right": "1rem" }}>&#xe82a;</span>{i.square}m²</p>
                    <p style={{ "font-size": "2.5rem" }}><span className="iconfont" style={{ "fontSize": "2.5rem", "margin-right": "1rem" }}>&#xe829;</span>{i.date}</p>
                  </div>
                  <div className="leaseul-right">
                    <p onClick={this.showInfo.bind(this, "Info", i.id, i.name)} className={this.state.indexOf == index ? "show" : "hide"}>更多
                              <i className="iconfont" style={{ "fontSize": "2rem" }}>&#xe827;</i>
                    </p>
                    <p className={this.state.indexOf == index ? "leaseType-active" : "leaseType"} >
                      <span className={this.state.indexOf == index ? "leasePrice-active" : "leasePrice"}>{i.price}</span>元/m²/天</p>
                  </div>
                </li>
              )
          })}
        </ul>
        <form action='' target="rfFrame">
          <div className={this.state.leaseBtn}>
            <div className="searchBox" onClick={this.foldBtn.bind(this)}>
              <span className="searchBox-text">
                <span className="iconfont" style={{ "fontSize": "2.3rem" }}>&#xe810;</span>
                <span style={{ "color": "#333333", "margin-left": "1rem" }}>
                  {this.state.square == "全部" ? "全部" : this.state.square + "m²"}
                </span>
              </span>
              <span className="searchBox-type">
                <i className={this.state.searchBoxIcon} style={{ "fontSize": "3rem", position: "relative", top: "0.3rem" }}>&#xe828; </i>
              </span>
            </div>
            <ul className="areaTypeul">
              <li className={this.state.typeIndexof == 100 ? "areaTypeli-active" : "areaTypeli"}
                onClick={this.typeActive.bind(this, 100, "全部", "id-全部")} >全部</li>
              {this.state.areaType.map((i, index) => {
                return (
                  <li onClick={this.typeActive.bind(this, index, i)} className={this.state.typeIndexof == index ? "areaTypeli-active" : "areaTypeli"}>{i}m²</li>
                )
              })}
            </ul>
          </div>
        </form>
        <iframe id="rfFrame" name="rfFrame" src={this.state.src} style={{ display: "none" }}>   </iframe>
      </div>
    )
    //<span className="searchBtn" onClick={this.searchRoomRent.bind(this)}>搜索</span>
  }

  public state = {
    roomNull: "hide",
    // 园区id
    park_id: "1001",
    // 房间id
    roomId: "",
    // 搜索框内容
    inputValue: "搜索",
    //面积区间
    square: "全部",
    leaseListcss: "leaseList-part",
    foleBtn: "lease-foleBtn",
    indexOf:-1,
    leaseBtn: "leaseBtn-part",
    leaseul: "leaseul",
    roomData: [],
    areaType: [],
    typeIndexof: 100,
    // typeName: ""
    iconfont: "iconfont iconfont-unturn",
    searchBoxIcon: "iconfont iconfont-unturn",
    //设置 点击软键盘搜索，页面不刷新
    src: "about:'blank'",
    imgurlNull: "./park_m/image/noImg.png",
  }
}

// 更多-》招租信息页 -- LeaseInfo
class LeaseInfo extends React.Component {
  public constructor(props) {
    super(props);

    this.showList = this.showList.bind(this);
    LeaseInfo.getLeaseInfo = this.getLeaseInfo.bind(this);
    this.setLeaseInfo = this.setLeaseInfo.bind(this);
  }

  public dataService: DataService = new DataService();
  static getLeaseInfo(id) { }
  public getLeaseInfo(id) {
    // 通过roomid，set招租信息；
    this.dataService.findRoomRentByroomid(this.setLeaseInfo, id);
  }

  // 获取企业详情，给子组件显示；
  public setLeaseInfo(data) {
    console.log("setLeaseInfo", data);
    //  set房间name
    this.setState({
      building_name: data.response.building_name,
      floor_name: data.response.floor_name,
      room_name: data.response.room_name,
    });

    LeaseInfos.setLeaseInfos(data);
    Picshow.setPicshow(data);
    Videoshow.setVideoshow(data);
  }

  public componentDidMount() {
  }

  public showList(a, id) {
    FindLease.toggleView(a, id);
  }

  public toggleFold() {
    if (this.state.leaseInfocss == "leaseInfo") {
      this.setState({
        leaseInfocss: "leaseInfo-part",
      })
    } else {
      this.setState({
        leaseInfocss: "leaseInfo",
      })
    }
    if (this.state.iconfont == "iconfont iconfont-unturn") {
      this.setState({
        iconfont: "iconfont iconfont-turn",
      })
    } else {
      this.setState({
        iconfont: "iconfont iconfont-unturn",
      })
    }
  }

  public infoClick(indexof) {
    console.log("infoClick", indexof);
    this.setState({
      infoli: indexof,
    })
  }

  public render() {
    //          <span className="iconfont companyInfoicon" >&#xe83b;</span>
    return (
      <div>
        <p className="companyInfotit">
          <span>{this.state.building_name}-{this.state.floor_name}-{this.state.room_name}</span>
        </p>
        <div className={this.state.leaseInfocss}>
          <div className={"foleBtn"} >
            <p className="companyGoHomeLeft" style={{ color: "#949494" }} onClick={this.showList.bind(this, "List", "id-01")}>
              <i className="iconfont companyInfoicon">&#xe83b;</i>
              <span>返回</span>
            </p>
            <p className="companyGoHomeRight">
              <i className={this.state.iconfont} style={{ "fontSize": "5rem", "color": "#C0C0C0" }} onClick={this.toggleFold.bind(this)} >&#xe849;</i>
            </p>
          </div>
          <div className="leaseInfoul_br">
            <ul className={"leaseInfoul"}>
              <li className={this.state.infoli == 0 ? "leaseInfoli-active" : "leaseInfoli"} onClick={this.infoClick.bind(this, 0)} >租房信息</li>
              
              <li className={this.state.infoli == 1 ? "leaseInfoli-active" : "leaseInfoli"} onClick={this.infoClick.bind(this, 1)} >房间展示</li>
            </ul>
          </div>
          <div className="leaseContain">
            <div className={this.state.infoli == 0 ? "show" : "hide"}>
              <LeaseInfos />
            </div>
            <div className={this.state.infoli == 1 ? "show" : "hide"}>
              <Picshow />
            </div>
            <div className={this.state.infoli == 2 ? "show" : "hide"}>
              <Videoshow />
            </div>
          </div>
        </div>
      </div>
    )
    //<li className={this.state.infoli == 2 ? "leaseInfoli-active" : "leaseInfoli"} onClick={this.infoClick.bind(this, 2)}>视频讲解</li>
  }

  public state = {
    leaseInfocss: "leaseInfo",
    roomName: "",
    building: "",
    floor: "",
    room: "",
    building_name: "",
    floor_name: "",
    room_name: "",
    infoli: 0,
    iconfont: "iconfont iconfont-turn",
  }
}

//左-》租房详细信息 -- LeaseInfos
class LeaseInfos extends React.Component {
  public constructor(props) {
    super(props);

    LeaseInfos.setLeaseInfos = this.setLeaseInfos.bind(this);
  }

  public componentDidMount() { }

  // 显示获取的企业详情
  static setLeaseInfos(data) { }
  public setLeaseInfos(data) {
    console.log("setLeaseInfosIIII", data);
    if (data.response.lift == 1) {
      this.setState({
        area: data.response.squre,
        time: data.response.inspection_time,
        floor_name: data.response.floor_name,
        limit: data.response.require,
        elevator: "有",
        price: data.response.price,
        man: data.response.contact,
        tel: data.response.phone
      })
    } else {
      this.setState({
        area: data.response.squre,
        time: data.response.inspection_time,
        floor_name: data.response.floor_name,
        limit: data.response.require,
        elevator: "无",
        price: data.response.price,
        man: data.response.contact,
        tel: data.response.phone
      })
    }
     document.getElementById("telurl").href = 'tel:' + this.state.tel;
  }

  public render() {
    return (
      <div className={"leaseInfos"}>
        <ul className={"leaseInfosul"}>
          <div className={"leaseInfosliLeft"}>
            <li>
              <span style={{ "padding-right": "2rem" }}>建筑面积</span>
              <span style={{ "font-weight": "600" }} >{this.state.area}平米</span>
            </li>
            <li>
              <span style={{ "padding-right": "2rem" }}>所在楼层</span>
              <span style={{ "font-weight": "600" }} >{this.state.floor_name}</span>
            </li>
            <li className="jj">
            <span style={{ "padding-right": "7rem" }} >租金</span>
            <span  style={{ "color": "#F53636" }}>2800元/月（2.8元/m²/月）</span>
          </li>
            <li>
              <span style={{ "padding-right": "7rem" }}>免租</span>
              <span style={{ "font-weight": "600" }}>可面谈</span>
            </li>
            <li>
              <span style={{ "padding-right": "2rem" }}>容纳工位</span>
              <span style={{ "font-weight": "600" }}>20位</span>
            </li>
          </div>
          <div className={"leaseInfosliRight"}>
            <li>总共楼层
              <span style={{ "font-weight": "600", "font-size": "2.3rem","marginLeft": "2rem" }}>七层</span>
            </li>
            <li>电梯
              <span style={{ "font-weight": "600", "font-size": "2.3rem","marginLeft": "7rem" }}>{this.state.elevator}</span>
            </li>
            <li className="kk">
              <p></p>
            </li>
             <li>装修
              <span style={{ "font-weight": "600", "font-size": "2.3rem","marginLeft": "7rem" }}>毛胚</span>
            </li>
           
          </div>

          <li className="room2">
              <span style={{ "padding-right": "2rem" }}>看房时间</span>
            <span style={{ "font-weight": "600" }}>{this.state.time}</span>
          </li>
          <li className="room2">
              <span style={{ "padding-right": "2rem" }}>可租时间</span>
              <span style={{ "font-weight": "600" }}>20XX年X月X日开始起租</span>
            </li>
        </ul>
        <div className="botTel">
          <p className="botTelMan">联系人 <span style={{ "font-weight": "600" }}>李先生</span></p>
          <div className="telBut"> 
           <a  href="#" id="telurl" > 免费咨询</a>
            </div>
        </div>
      </div>
    )
  }

  public state = {
    area: "",
    time: "",
    floor_name: "",
    limit: "",
    elevator: "",
    price: "",
    man: "",
    tel: ""
  }
  //   <a  href="'tel:'+{this.state.tel}" > 免费咨询</a>
  //     <a href="tel:18010862041" > 免费咨询</a>

}


//右-》照片展示 --picshow
class Picshow extends React.Component {
  public constructor(props) {
    super(props);

    Picshow.setPicshow = this.setPicshow.bind(this);
  }

  public componentDidMount() {
    // simulate img loading
    setTimeout(() => {
      this.setState({
        data: ['1', '2', '3', '4', '5', '6', '7'],
      });
    }, 100);
  }

  // 显示获取的企业详情
  static setPicshow(data) { }
  public setPicshow(data) {
    let picurl = [];
    console.log("setPicshowPPPPPP", data);
    $.each(data.response.pic, function (index, item) {
      picurl.push(item.url)
    });
    if (data.response.pic.length == 0) {
      this.setState({
        roomImg: data.response.pic,
        urlNull: "show",
        //data: picurl;
        //data: [
        //  'https://zos.alipayobjects.com/rmsportal/AiyWuByWklrrUDlFignR.png',
        //  'https://zos.alipayobjects.com/rmsportal/TekJlZRVCjLFexlOCuWn.png',
        //  'https://zos.alipayobjects.com/rmsportal/IJOtIlfsYdTyaDTRVrLI.png'
        //],
      })
    } else {
      this.setState({
        roomImg: data.response.pic,
        urlNull: "hide",
        data: picurl,
        //data: [
        //  'https://zos.alipayobjects.com/rmsportal/AiyWuByWklrrUDlFignR.png',
        //  'https://zos.alipayobjects.com/rmsportal/TekJlZRVCjLFexlOCuWn.png',
        //  'https://zos.alipayobjects.com/rmsportal/IJOtIlfsYdTyaDTRVrLI.png'
        //],
      })
    }
  }

  public render() {

    return (
      <div className={"picshow"}>
        <ul>
          <p className={this.state.urlNull} style={{ "margin": "1rem 0", "text-align": "center", "font-size": "3rem", "color": "#797979" }}>暂无图片···</p>
          <WingBlank>
            <Carousel className="space-carousel"
              frameOverflow="visible"
              cellSpacing={10}
              slideWidth={0.8}
              autoplay
              infinite
              afterChange={index => this.setState({ slideIndex: index })}
            >
              {this.state.data.map((val, index) => (
                <img
                  src={val}
                  alt=""
                  style={{ width: '100%', verticalAlign: 'top' }}
                  onLoad={() => {
                    // fire window resize event to change height
                    window.dispatchEvent(new Event('resize'));
                    this.setState({ imgHeight: 'auto' });
                  }}
                />
              ))}
            </Carousel>
          </WingBlank>
        </ul>
        <div className="picBtn">
          <div className="picBtnA">图片</div>
          <div className="picBtnB">视频</div>
        </div>
      </div>
    )
  }

  public state = {
    roomImg: [],
    urlNull: "hide",
    data: ['1', '2', '3', '4', '5', '6', '7'],
    imgHeight: 176,
    slideIndex: 0,
  }
}

// 中-》视频讲解 --Videoshow
class Videoshow extends React.Component {
  public constructor(props) {
    super(props);

    Videoshow.setVideoshow = this.setVideoshow.bind(this);
  }

  public componentDidMount() { }

  // 显示获取的企业视频
  static setVideoshow(data) { }
  public setVideoshow(data) {
    if (data.response.video.length == 0) {
      this.setState({
        roomVideo: [],
        urlNull: "show",
      })
    } else if ( !data.response.video[0].url) {
       this.setState({
         roomVideo: [],
         urlNull: "show",
      })
    } else {
      this.setState({
        roomVideo: data.response.video,
        urlNull: "hide",
      })
    }
    console.log("66666666666666", this.state)
  }

  public render() {
    return (
      <div className={"picshow"}>
        <ul>
          <p className={this.state.urlNull} style={{ "margin": "1rem 0", "text-align": "center", "font-size": "3rem", "color": "#797979" }}>暂无视频···</p>
          {this.state.roomVideo.map((i, index) => {
            return (
              <li style={{ "width": "56rem", " height": "36rem" }}>
                <video src={i.url} style={{ "width": "100%", "height": "100%" }} controls >
                  当前浏览器不支持video播放
                  </video>
              </li>
            )
          })}
        </ul>
      </div>
    )

  }

  public state = {
    urlNull: "hide",
    roomVideo: [
      //{ url: "https://www.yongtoc.com/themes/ytyc.mp4" },
    ],
  }
}

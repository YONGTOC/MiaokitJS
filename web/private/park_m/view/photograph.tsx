import * as React from "react";
import * as RouterDOM from 'react-router-dom';
import DataService from "dataService";
import "css!./styles/resetAntdMobile.css"
import { ImagePicker, WingBlank, SegmentedControl } from 'antd-mobile';
import { DatePicker, List } from 'antd-mobile';

class Photograph extends React.Component {
  public constructor(props) {
    super(props);

    Photograph.toggleView = this.toggleView.bind(this);
    Photograph.getXY = this.getXY.bind(this);
  }


  static toggleView(a, e, n) { };
  public toggleView(a, e, n) {
    console.log("fp", a);
    console.log("fp", e);
    console.log("fp", n);

    if (a == "Info") {
      console.log("INFO")
      this.setState({
        showList: false,
        showInfo: true,
        showLoad: false,
      })
    } else if (a == "Load") {
      console.log("LOAD")
      this.setState({
        showList: false,
        showInfo: false,
        showLoad: true,
      })
    } else {
      console.log("other")
      this.setState({
        showList: true,
        showInfo: false,
        showLoad: false,
      })
    }

  }

  static getXY(x, y) { };
  public getXY(x, y) {
    IllegalUpload.getXY(x, y);
  }

  public render() {
    return (
      <div className={this.state.Photographcss}>
        <p className="companyInfotit">
          <RouterDOM.Link to="/home" >
            <span className="iconfont companyInfoicon">&#xe83b;</span>
          </RouterDOM.Link>
          <span>随手拍</span>
        </p>
        <div className={this.state.showList == true ? "show" : "hide"}>
          <IllegalList />
        </div>
        <div className={this.state.showInfo == true ? "show" : "hide"}>
          <IllegalInfo />
        </div>
        <div className={this.state.showLoad == true ? "show" : "hide"}>
          <IllegalUpload />
        </div>
      </div>
    )
  }

  public state = {
    Photographcss: "photograph",
    showList: true,
    showInfo: false,
    showLoad: false,
  }
}

export default Photograph;

// illegalList  违章列表页
class IllegalList extends React.Component {
  public constructor(props) {
    super(props);

    //initlist
    this.setillList = this.setillList.bind(this);
  }

  public componentDidMount() {

    //12 通过园区id获取随手拍列表 
    this.dataService.getTakingPhotos(this.setillList, this.state.park_id, "");


  }

  public dataService: DataService = new DataService();

  public setillList(data) {
    this.setState({
      illegalList: data.response,
    })
  }

  // 获取搜索框输入值
  public changeList(event) {
    this.setState({
      inputValue: event.target.value,
    });
  }

  // 软键盘 搜索
  public queryKeyDownHandler(e) {
    switch (e.keyCode) {
      case 13://回车事件
        //alert(this.state.inputValue);
        break
    }
  }

  // 添加搜索添加 
  public searchList() {
    this.dataService.getTakingPhotos(this.setillList, this.state.park_id, this.state.inputValue);
  }

  // 点击更多，显示info;隐藏list；
  public showPart(a, id, name, e) {
    Photograph.toggleView(a, id, name);
    console.log("more", a, id, name);
    IllegalInfo.getillInfo(id, name);
  }

  public toggleFold() {
    console.log("tftft", this.state.illegalListcss);

    if (this.state.illegalListcss == "illegalList-part") {
      this.setState({
        illegalListcss: "illegalList-all",
        illegalul: "illegalul-all"
      })
    } else {
      this.setState({
        illegalListcss: "illegalList-part",
        illegalul: "illegalul"
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

  public illegalActive(indexof, name, id) {
    this.setState({
      indexOf: indexof,
    })
  }



  public render() {
    //<div className="illAdd" onClick={this.showPart.bind(this, "Load")} > + </div>
    //onClick = { this.searchList.bind(this) }
    return (
        <div className={this.state.illegalListcss}>
          <div className={"foleBtn"} onClick={this.toggleFold.bind(this)}>
            <i className={this.state.iconfont} style={{ "fontSize": "5rem" }}>&#xe849;</i>
          </div>
          <ul className={this.state.illegalul} >
            {this.state.illegalList.map((i, index) => {
              return (
                <li onClick={this.illegalActive.bind(this, index)} className={this.state.indexOf == index ? "illegalli-active" : "illegalli"} >
                  <div className="illegamgback">
                    <img src={i.photo} />
                  </div>
                  <div className="illegalul-middle ">
                    <p className={this.state.indexOf == index ? "illegalType-active" : "illegalType"} style={{ "font-size": "2.4rem" }}>{i.type}</p>
                    <p style={{ "font-size": "2.3rem" }}>{i.time}</p>
                    <p style={{ "font-size": "2.3rem" }}><i className="iconfont" style={{ "fontSize": "3rem", "margin-right": "1rem" }}>&#xe82b;</i>{i.car_license}</p>
                    <p style={{ "font-size": "2.3rem" }}><i className="iconfont" style={{ "fontSize": "3rem", "margin-right": "1rem" }}>&#xe82c;</i>{i.position}</p>
                    <p onClick={this.showPart.bind(this, "Info", i.id, i.car_license)} style={{ "font-size": "2.3rem", "float": "right", "color": "#fff" }}>更多
                         <i className="iconfont" style={{ "fontSize": "2rem" }}>&#xe827;</i>
                    </p>
                  </div>
                </li>
              )
            })}
          </ul>

          <div className="illBottombox">
            <div className="searchBox">
              <span className="searchBox-text">
                <i className="iconfont" style={{ "fontSize": "3rem" }}>&#xe810;</i>
                <input className="companySearch" type="search" placeholder="请输入车牌号"
                  onChange={this.changeList.bind(this)} onKeyDown={this.queryKeyDownHandler.bind(this)}/>
              </span>
        
            </div>
          </div>
          <span className="illegalLoadBtn" onClick={this.showPart.bind(this, "Load")} >随手拍</span>
        </div>
    )
  }


  public state = {
    park_id: "1009",
    iconfont: "iconfont iconfont-unturn",
    illegalListcss: "illegalList-part",
    indexOf: 0,
    illegalul: "illegalul",
    inputValue: "",
    illegalList: [],
  }

  //over
}

//“随手拍”按钮-》 illegalUpload 违规上传页
class IllegalUpload extends React.Component {
  public constructor(props) {
    super(props);

    IllegalUpload.getXY = this.getXY.bind(this);
    this.setillcauseUL = this.setillcauseUL.bind(this);
    this.showList = this.showList.bind(this);
    this.sumbitIllsuccess = this.sumbitIllsuccess.bind(this);
    
  }

  public componentDidMount() {
    //12.(随手拍模块-列表)通过园区id获取随手拍列表 
    this.dataService.getTakingPhotosType(this.setillcauseUL, this.state.park_id);

    // 获取当前经纬度
    //var geolocation = new BMap.Geolocation();
    //geolocation.getCurrentPosition(function (r) {
    //  if (this.getStatus() == BMAP_STATUS_SUCCESS) {
    //    var mk = new BMap.Marker(r.point);
    //   // alert('您的位置：' + r.point.lng + ',' + r.point.lat);  //success
    //    this.setState({
    //      longitude: r.point.lng,
    //      latitude: r.point.lat,
    //    })
    //  }
    //  else {
    //   // alert('failed' + this.getStatus());
    //  }
    //});


  }

  public dataService: DataService = new DataService();
  public setillcauseUL(data) {
    this.setState({
      illcauseUL: data.response,
    })
  }

  public showList(a, e, n) {
    Photograph.toggleView(a, e, n);
  }

  public toggleFold() {
    console.log("tftft")
    if (this.state.illegalLoadcss == "illegalLoad-all") {
      this.setState({
        illegalLoadcss: "illegalLoad-part ",
        illfromcss: "illfrom-part illfrom"
      })
    } else {
      this.setState({
        illegalLoadcss: "illegalLoad-all",
        illfromcss: "illfrom-all illfrom"
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

  // 选择提交照片
  public illimgClick() {
    this.illimginputClick();
  }

  // 获取提交的照片
  public illimginputClick(this) {
    console.log("2323", this);
  }

  //显示选择曝光类型
  public showillcauseUL() {
    this.setState({
      illcauseBox: "rollSelectCauseBox",
      type_id_in: this.state.illcauseUL[this.state.indexOf].id,
      type_name_in: this.state.illcauseUL[this.state.indexOf].name,
    })
  }

  // 选中，列表选择违规原因
  public illCuased(i, id, name) {
    this.setState({
      type_id_in: id,
      type_name_in: name,
      indexOf: i,
    })
  }

  //违规原因列表 -- “确认”
  public getillcause() {
    this.setState({
      illcauseBox: "hide",
      type_id: this.state.type_id_in,
      type_name: this.state.type_name_in,
    })
  }

  // 违规原因列表 -- “取消”
  public hideillcauseUL() {
    this.setState({
      illcauseBox: "hide",
    })
  }

  //填写违规地点
  public illposition(event) {
    this.setState({
      position: event.target.value
    })
  }

  //外部传入map经纬度
  static getXY(x, y) { };
  public getXY(x, y) {
    console.log("外部传入经纬度", x, y);
    this.setState({
      longitude: x,
      latitude: y,
      position: "请输入位置点名称"
    });
  }

  //填写违规车辆车牌
  public illcarLicense(event) {
    this.setState({
      car_license: event.target.value
    })
  }

  //填写违规描述
  public illdescript(event) {
    this.setState({
      descript: event.target.value
    })
  }

  //获取照片
  onChange = (files, type, index) => {
    console.log(files, type, index);
    this.setState({
      files,
      // photo: files[0].url,
    });


  }
  onSegChange = (e) => {
    const index = e.nativeEvent.selectedSegmentIndex;
    this.setState({
      multiple: index === 1,
    });
  }

  //计算时间，个位数填0；
  public p(s) {
    return s < 10 ? '0' + s : s
  }

  // 获取时间
  public getTime(date) {
    const d = new Date(date)
    const resDate = d.getFullYear() + '-' + this.p((d.getMonth() + 1)) + '-' + this.p(d.getDate())
    const resTime = this.p(d.getHours()) + ':' + this.p(d.getMinutes()) + ':' + this.p(d.getSeconds())
    const timeD = resDate + " " + resTime
    console.log("start输入index656", timeD);
    this.setState({
      timeShow: date,
      time: timeD,
    });
  }


  //提交违规单
  public sumbitIllfrom() {
    console.log("sumbit", this.state);
    if (this.state.files.length == 0) {
      alert("请提交违规照片")
    }else if (this.state.type_id == "") {
      alert("请选择曝光类型")
    } else if (this.state.position == "") {
      alert("请输入曝光位置")
    } else if (this.state.car_license == "") {
      alert("请输入违规车牌号")
    } else if (this.state.time == "") {
      alert("请填写曝光时间")
    } else if (this.state.descript == "") {
      alert("请描述违规问题")
    } else {
      this.dataService.postTakingPhotoInfo(this.sumbitIllsuccess, this.state);
    }

  }

  ///提交违规单--成功
  public sumbitIllsuccess(data) {
    alert(data);
    this.setState({
      car_license: "",
      time: "",
      position: "",
      longitude: "",
      latitude: "",
      type_id: "",
      type_name: "",
      descript: "",
      photo: "",
      files: [],
      timeShow:"",
    })
   // Photograph.toggleView(0, "List", 0);
  }




  public render() {
    //<div className="illTxt">
    //<div className="getillImg">
    //<input type="file" accept="image/*" className="getillImg" value="" onClick={this.illimginputClick.bind(this)} style={{ "opacity": "0", "position": "absolute", "right": "-16rem" }} />
    //  <img src={this.state.illImg} onClick={this.illimgClick.bind(this)} />
    //  曝光时间
    //  <input type="datetime" className="getillTime" value={this.state.time} placeholder="请输入违规时间" />
    return (
      <div>
        <p className="companyInfotit">
          <span className="iconfont companyInfoicon" onClick={this.showList.bind(this, "List", "i.id")}>&#xe83b;</span>
          <span>随手拍</span>
        </p>

        <div className={this.state.illegalLoadcss}>
          <div className={"foleBtn"} onClick={this.toggleFold.bind(this)}>
            <i className={this.state.iconfont} style={{ "fontSize": "5rem" }}>&#xe849;</i>
          </div>
          <form >
            <ul className={this.state.illfromcss}>
              <li>
                <span className="redStar">*</span> 违规照片
                <div className="imgCom">
                  <WingBlank>
                    <ImagePicker
                      files={this.state.files}
                      onChange={this.onChange}
                      onImageClick={(index, fs) => console.log(index, fs)}
                      selectable={this.state.files.length < 1}
                      multiple={this.state.multiple}
                    />
                  </WingBlank>
                </div>
              </li>
              <li>
                <span className="redStar">*</span> 曝光类型
                <span onClick={this.showillcauseUL.bind(this)}>
                  <input type="text" className="getillType" value={this.state.type_name} placeholder="请选择曝光类型" />
                    <span className="iconfont" style={{ "fontSize": "3rem", "float": "right", " padding": " 0 0 0 3rem", "padding": " 0 0 0 4rem" }}
                       >&#xe827;</span>
                </span>
              </li>
              <li>
                <span className="redStar">*</span>  地址
               <input type="text" value={this.state.position} className="getillAdd" placeholder="请输入曝光位置"
                  onChange={this.illposition.bind(this)} />
                <i className="iconfont" style={{ "fontSize": "3rem", "color": "#0B8BF0", "float": "right", "padding": " 0 0 0 4rem" }}>&#xe82c;</i>
              </li>
              <li>
                <span className="redStar">*</span> 车牌
                <input type="text" value={this.state.car_license} className="getillNum" placeholder="请输入违规车牌号"
                  onChange={this.illcarLicense.bind(this)} />
              </li>
              <li>
                <span className="redStar">*</span> 
                <div style={{ "fonSize": "2.5rem", "float": "right", "position": "relative", "top": "-0.5rem", "left": "-0.5rem" }} className={"mDate"}>
                  <DatePicker
                    value={this.state.timeShow}
                    onChange={this.getTime.bind(this)} >
                    <List.Item arrow="horizontal">曝光时间</List.Item>
                  </DatePicker>
                </div>
              </li>
              <li>
                <span className="redStar">*</span> 违规描述
             </li>
              <li>
                <textarea className="getilltextarea" value={this.state.descript} placeholder="请将违规问题描述出来。（120字内）"
                  onChange={this.illdescript.bind(this)} ></textarea>
              </li>
              <div className="illSumbit" onClick={this.sumbitIllfrom.bind(this)}>提交</div>
            </ul>
          </form>
        </div>

        <div className={this.state.illcauseBox}>
          <ul className="rollSelectCauseULcss">
            {this.state.illcauseUL.map((i, index) => {
              return (
                <li className={this.state.indexOf == index ? "rollSelectCauseli-active" : "rollSelectCauseli"}
                  onClick={this.illCuased.bind(this, index, i.id, i.name)}
                >{i.name}</li>
              )
            })}
          </ul>
          <div className="rollSelectCuasedBtn">
            <span className="rollSelectCancel" onClick={this.hideillcauseUL.bind(this)} >取消</span>
            <span className="rollSelectConfirm" onClick={this.getillcause.bind(this)}>确认</span>
          </div>
        </div>

      </div>
    )
  }


  public state = {
    timeShow:"",
    //照片
    files: [],
    multiple: false,
    illcauseBox: "hide",
    illegalLoadcss: "illegalLoad-part",
    illfromcss: "illfrom-part illfrom",
    illTime: "",
    illImg: "./park_m/image/photo.png",
    illcauseUL: [],
    indexOf: 0,
    illcauseInname: "",
    illcauseInid: "",
    iconfont: "iconfont iconfont-unturn",
    //园区id
    park_id: "1001",
    //车牌
    car_license: "",
    //申请时间
    time: "",
    //位置
    position: "",
    //经度
    longitude: "",
    //纬度
    latitude: "",
    //类型id (非停车位侧停车等对应的id)
    type_id: "",
    //违规类型
    type_name: "",
    //类型id (非停车位侧停车等对应的id)
    type_id_in: "",
    //违规类型
    type_name_in: "",
    //描述
    descript: "",
    //违规照片
    photo: "",
  }

  //over
}

//更多-》 illegalInfo 违规信息页
class IllegalInfo extends React.Component {
  public constructor(props) {
    super(props);

    IllegalInfo.getillInfo = this.getillInfo.bind(this);
  }

  static getillInfo(id, name) { };
  public getillInfo(id, name) {
    //通过 违规id，set信息；
    console.log(" 违规信息页", id, name);
    this.dataService.getTakingPhotoInfo(this.setillInfo, id);
    this.setState({
      name: name,
    })
  }
  public dataService: DataService = new DataService();

  // 获取企业详情，给子组件显示；
  public setillInfo(data) {
    console.log("setillInfo", data);
    IllegalInfos.setIllinofs(data);
    IllegalImg.setIllimg(data);
  }

  public showList(a, e, n) {
    Photograph.toggleView(a, e, n);

  }

  public infoClick(indexof) {
    console.log("infoClick", indexof);
    this.setState({
      infoli: indexof,
    })
  }

  public toggleFold() {
    console.log("tptp")
    if (this.state.illegalInfocss == "illegalInfo-part") {
      this.setState({
        illegalInfocss: "illegalInfo-bottom",
      })
    } else {
      this.setState({
        illegalInfocss: "illegalInfo-part",
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

  public render() {
    return (
      <div>
        <p className="companyInfotit">
          <span className="iconfont companyInfoicon" onClick={this.showList.bind(this, "List", "id-01")}>&#xe83b;</span>
          <span>{this.state.name}违规</span>
        </p>
        <div className={this.state.illegalInfocss}>
          <div className={"foleBtn"} onClick={this.toggleFold.bind(this)}>
            <i className={this.state.iconfont} style={{ "fontSize": "5rem" }}>&#xe849;</i>
          </div>
          <div className="leaseInfoul_br">
            <ul className={"leaseInfoul"} style={{ "width": "44rem" }}>
              <li className={this.state.infoli == 0 ? "leaseInfoli-active" : "leaseInfoli"}
                onClick={this.infoClick.bind(this, 0)}
              >违规信息</li>
              <li className={this.state.infoli == 1 ? "leaseInfoli-active" : "leaseInfoli"}
                onClick={this.infoClick.bind(this, 1)} >违规照片</li>
            </ul>
          </div>
          <div className="leaseContain">
            <div className={this.state.infoli == 0 ? "show" : "hide"}>
              <IllegalInfos />
            </div>
            <div className={this.state.infoli == 1 ? "show" : "hide"}>
              <IllegalImg />
            </div>
          </div>

        </div>
      </div>
    )
  }


  public state = {
    iconfont: "iconfont iconfont-unturn",
    illegalInfocss: "illegalInfo-part",
    name: "",
    infoli: 0,
  }

  //over
}

//违规信息
class IllegalInfos extends React.Component {
  public constructor(props) {
    super(props);

    IllegalInfos.setIllinofs = this.setIllinofs.bind(this);
  }

  public componentDidMount() { }

  static setIllinofs(data) { };
  public setIllinofs(data) {
    this.setState({
      type_name: data.response.type_name,
      time: data.response.time,
      car_license: data.response.car_license,
      position: data.response.position,
      descript: data.response.descript,
    })
  }

  public showList(a, e, n) {
    Photograph.toggleView(a, e, n);
    this.setState({
      IllegalLoadcss: "illegalLoad-part",
    })
  }

  public showLoad(a, e, n) {
    console.log("tftft")
    if (this.state.IllegalLoadcss == "illegalLoad") {
      this.setState({
        IllegalLoadcss: "illegalLoad-part",
      })
    } else {
      this.setState({
        IllegalLoadcss: "illegalLoad",
      })
    }
    Photograph.toggleView(a, e, n);
  }


  public render() {
    return (
      <div className="illegalInfos">
        <p>{this.state.type_name}</p>
        <p>{this.state.time}</p>
        <p>
          <span className="iconfont" style={{ "fontSize": "3rem", "margin-right": "1rem" }}>&#xe82b;</span>
          车牌：<span>{this.state.car_license}</span></p>
        <p>
          <span className="iconfont" style={{ "fontSize": "3rem", "margin-right": "1rem" }}>&#xe815;</span>
          位置：<span>{this.state.position}</span></p>
        <p>{this.state.descript}</p>
      </div>
    )
  }


  public state = {
    IllegalLoadcss: "illegalLoad-part",
    //类型名称
    type_name: "",
    //申请时间
    time: "",
    //车牌
    car_license: "",
    //位置
    position: "",
    //描述
    descript: "",
  }

  //over
}

// 违规照片
class IllegalImg extends React.Component {
  public constructor(props) {
    super(props);
    IllegalImg.setIllimg = this.setIllimg.bind(this);
  }

  public componentDidMount() { }

  static setIllimg(data) { };
  public setIllimg(data) {
    this.setState({
      illegalImg: data.response.photo
    })
  }

  public showList(a, e, n) {
    Photograph.toggleView(a, e, n);
    this.setState({
      IllegalLoadcss: "illegalLoad-part",
    })
  }

  public showLoad(a, e, n) {
    console.log("tftft")
    Photograph.toggleView(a, e, n);
  }

  public render() {
    return (
      <div className="illegalImg">
        <img src={this.state.illegalImg} />
      </div>
    )
  }


  public state = {
    illegalImg: "",
  }

  //over
}

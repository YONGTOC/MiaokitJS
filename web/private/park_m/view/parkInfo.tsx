import * as React from "react";
import * as RouterDOM from 'react-router-dom';
import DataService from "dataService";
import GlobalAction from "compat";


class ParkInfo extends React.Component {
  public constructor(props) {
    super(props);

  }

  public dataService: DataService = new DataService();
  public globalAction: GlobalAction = new GlobalAction();

  public componentDidMount() {
    let park_id = sessionStorage.getItem("park_id");
    this.dataService.getParkShowInfo(this.setParkInfo, park_id);
    //this.setParkInfo("data");

        move3dBut("up");
  }

  static setParkInfo(data) { }
  public setParkInfo(data) {
    if (data) {
      Intro.getNotes(data);
      Advantage.getNotes(data);
      Sale.getNotes(data);
      Elegant.getNotes(data);
    }
  }

  public mapReturnpark() {
    //通知3d，返回园区视角
    this.globalAction.web_call_webgl_mapReturnpark();
    move3dBut("down")
  }

  public toggleFold() {
    console.log("tftft")
    if (this.state.applyPutcss == "applyPut-all") {
      this.setState({
        applyPutcss: "applyPut-part",
        applyPutul: " applyPutul-part applyPutul",
      })
      //通知3d，继续加载模型  
      this.globalAction.web_call_webgl_continueloadModuler();
      //通知子组件，压缩
      Intro.textCss("part");
      Advantage.textCss("part");
      Sale.textCss("part");
      Elegant.textCss("part");
    } else {
      this.setState({
        applyPutcss: "applyPut-all",
        applyPutul: " applyPutul-all applyPutul",
      })
      // 通知3d，暂停加载模型
      this.globalAction.web_call_webgl_pauseloadModuler();
      //通知子组件，展开
      Intro.textCss("all");
      Advantage.textCss("all");
      Sale.textCss("all");
      Elegant.textCss("all");
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
    });

  }

  public render() {
    return (
      <div>
        <p className="companyInfotit">
          <span>园区介绍</span>
        </p>

        <div className={this.state.applyPutcss}>
          <div className={"foleBtn"}>
            <RouterDOM.Link to="/home" >
              <p className="companyGoHomeLeft" style={{ color: "#949494" }} onClick={this.mapReturnpark.bind(this)}>
                <i className="iconfont companyInfoicon">&#xe83b;</i>
                <span>返回</span>
              </p>
            </RouterDOM.Link>
            <p className="companyGoHomeRight">
              <i className={this.state.iconfont} style={{ "fontSize": "5rem", "color": "#C0C0C0" }} onClick={this.toggleFold.bind(this)} >&#xe849;</i>
            </p>
          </div>
          <ul className={this.state.companyInfoul}>
            <li className={this.state.infoli == 0 ? "companyInfoli-active" : "companyInfoli"}
              onClick={this.infoClick.bind(this, 0)} >园区简介</li>
            <li className={this.state.infoli == 1 ? "companyInfoli-active" : "companyInfoli"}
              onClick={this.infoClick.bind(this, 1)} >区位优势</li>
            <li className={this.state.infoli == 2 ? "companyInfoli-active" : "companyInfoli"}
              onClick={this.infoClick.bind(this, 2)} >优惠政策</li>
            <li className={this.state.infoli == 3 ? "companyInfoli-active" : "companyInfoli"}
              onClick={this.infoClick.bind(this, 3)} >园区风采</li>
          </ul>

          <div className="infoContain">
            <div className={this.state.infoli == 0 ? "show" : "hide"}>
              <Intro />
            </div>
            <div className={this.state.infoli == 1 ? "show" : "hide"}>
              <Advantage />
            </div>
            <div className={this.state.infoli == 2 ? "show" : "hide"}>
              <Sale />
            </div>
            <div className={this.state.infoli == 3 ? "show" : "hide"}>
              <Elegant />
            </div>

          </div>

        </div>
      </div>
    )
  }

  public state = {
    applyPutcss: "applyPut-part ",
    // 折叠按钮状态
    iconfont: "iconfont iconfont-unturn",
    // 企业信息ul样式
    companyInfoul: "companyInfoul",
    // 当前选中li
    infoli: 0,
  }

}

// 园区简介
class Intro extends React.Component {
  public constructor(props) {
    super(props);
    Intro.textCss = this.textCss.bind(this);
    Intro.getNotes = this.getNotes.bind(this);
  }

  static textCss(css) { }
  public textCss(css) {
    if (css == "part") {
      this.setState({
        intro: "intro intro-part"
      })
    } else {
      this.setState({
        intro: "intro intro-all"
      })
    }
  }

  static getNotes(data) { };
  public getNotes(data) {
    let datas = data.response[0];
   // console.log("NotesNotes", datas);
   // console.log("NotesNotes", datas.introduction);
    this.setState({
      square: datas.square,
      floorage: datas.floorage,
      construction_time: datas.construction_time,
    })
    if (datas.introduction) {
    //  console.log(" 233232222222222", datas.introduction);
      document.getElementById("introText").innerHTML = datas.introduction;
    }

  }

  public componentWillMount() { }

  public render() {
    return (
      <div className={this.state.intro}>
        <p>占地面积<span className="introT" >{this.state.square}</span></p>
        <p>建筑面积<span className="introT" >{this.state.floorage}</span></p>
        <p>建园时间<span className="introT" >{this.state.construction_time}</span></p>
        <p> </p>
        <div id="introText" className="parkInfoText">
        </div>
      </div>
    )
  }

  public state = {
    intro: "intro intro-part",
    square: "",
    floorage: "",
    construction_time: "",
  }

}

// 园区优势
class Advantage extends React.Component {
  public constructor(props) {
    super(props);
    Advantage.textCss = this.textCss.bind(this);
    Advantage.getNotes = this.getNotes.bind(this);
  }

  public componentWillMount() { }

  static textCss(css) { }
  public textCss(css) {
    if (css == "part") {
      this.setState({
        intro: "intro intro-part"
      })
    } else {
      this.setState({
        intro: "intro intro-all"
      })
    }
  }

  static getNotes(data) { };
  public getNotes(data) {
    console.log("NotesNotes", data);
    let datas = data.response[0];
    document.getElementById("advantageText").innerHTML = datas.location_advantage;

    this.setState({
      location: datas.location,
    })
  }

  public render() {
    return (
      <div className={this.state.intro}>
        <p>地理位置<span className="introT_dlwz" >{this.state.location}</span></p>
        <div id="advantageText" className="parkInfoText">
        </div>
      </div>
    )
  }

  public state = {
    intro: "intro intro-part",
    location: "",
  }

}

// 优惠政策
class Sale extends React.Component {
  public constructor(props) {
    super(props);
    Sale.textCss = this.textCss.bind(this);
    Sale.getNotes = this.getNotes.bind(this);
  }

  public componentWillMount() { }

  static textCss(css) { }
  public textCss(css) {
    if (css == "part") {
      this.setState({
        intro: "intro intro-part"
      })
    } else {
      this.setState({
        intro: "intro intro-all"
      })
    }
  }

  static getNotes(data) { };
  public getNotes(data) {
    console.log("NotesNotes", data);
    let datas = data.response[0];
    document.getElementById("saleText").innerHTML = datas.preferential_policy;

  }

  public render() {
    return (
      <div className={this.state.intro}>
        <div id="saleText" className="parkInfoText">
        </div>
      </div>
    )
  }

  public state = {
    intro: "intro intro-part",

  }

}

// 园区风采
class Elegant extends React.Component {
  public constructor(props) {
    super(props);
    Elegant.textCss = this.textCss.bind(this);
    Elegant.getNotes = this.getNotes.bind(this);
  }

  public componentWillMount() { }
  static textCss(css) { }
  public textCss(css) {
    if (css == "part") {
      this.setState({
        intro: "intro intro-part"
      })
    } else {
      this.setState({
        intro: "intro intro-all"
      })
    }
  }

  static getNotes(data) { };
  public getNotes(data) {
    console.log("NotesNotes", data);
    let datas = data.response[0];
    document.getElementById("elegantText").innerHTML = datas.elegant;
  }

  public render() {
    return (
      <div className={this.state.intro}>
        <div id="elegantText" className="parkInfoText">
        </div>
      </div>
    )
  }

  public state = {
    intro: "intro intro-part",

  }

}

export default ParkInfo;
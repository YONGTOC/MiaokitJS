import * as React from "react";
import * as RouterDOM from 'react-router-dom';


class Photograph extends React.Component {
  public constructor(props) {
    super(props);

    Photograph.toggleView = this.toggleView.bind(this);
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
  }

  public componentDidMount() {
  }


  // 点击更多，显示info;隐藏list；这里需要调用FindLease 的方法；
  public showPart(a, e, n) {
    Photograph.toggleView(a, e, n);
    //  CompanyInfo.companyInfo(e);
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
        //fdsfsdfd
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
    console.log("illegalActive", indexof);
    console.log("illegalActive", name);
    console.log("illegalActive", id);

    this.setState({
      indexOf: indexof,
      //typeName: name,
    })
  }

  public render() {
    return (
      <div >
        <div className={this.state.illegalListcss}>
          <div className={"foleBtn"} onClick={this.toggleFold.bind(this)}>
            <i className={this.state.iconfont} style={{ "fontSize": "5rem" }}>&#xe849;</i>
          </div>
          <ul className={this.state.illegalul} >
            {this.state.illegalList.map((i, index) => {
              return (
                <li onClick={this.illegalActive.bind(this, index)} className={this.state.indexOf == index ? "illegalli-active" : "illegalli"} >
                  <div className="illegamgback">
                    <img src={i.url} />
                  </div>
                  <div className="illegalul-middle ">
                    <p className={this.state.indexOf == index ? "illegalType-active" : "illegalType"} style={{ "font-size": "2.4rem" }}>{i.type}</p>
                    <p style={{ "font-size": "2.3rem" }}>{i.time}</p>
                    <p style={{ "font-size": "2.3rem" }}><i className="iconfont" style={{ "fontSize": "3rem", "margin-right": "1rem" }}>&#xe82b;</i>{i.name}</p>
                    <p style={{ "font-size": "2.3rem" }}><i className="iconfont" style={{ "fontSize": "3rem", "margin-right": "1rem" }}>&#xe82c;</i>{i.address}</p>
                    <p onClick={this.showPart.bind(this, "Info", "i.id")} style={{ "font-size": "2.3rem", "float": "right", "color": "#fff" }}>更多
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
                <input className="companySearch" type="text" placeholder="请输入车牌号" />
              </span>
            </div>
          </div>
          <span className="illegalLoadBtn" onClick={this.showPart.bind(this, "Load")} >随手拍</span>
        </div>

      </div>
    )
  }


  public state = {
    iconfont: "iconfont iconfont-unturn",
    illegalListcss: "illegalList-part",
    indexOf: 0,
    illegalul: "illegalul",
    illegalList: [
      {
        url: "./park_m/image/i.png",
        type: "非停车位路侧停车1",
        name: "桂C123456",
        time: "2020-01-21 10:59:15",
        address: "A座大门旁",
      },
      {
        url: "./park_m/image/i.png",
        type: "非停车位路侧停车2",
        name: "桂C123456",
        time: "2020-01-21 10:59:15",
        address: "A座大门旁",
      },
      {
        url: "./park_m/image/i.png",
        type: "非停车位路侧停车3",
        name: "桂C123456",
        time: "2020-01-21 10:59:15",
        address: "A座大门旁",
      },
      {
        url: "./park_m/image/i.png",
        type: "非停车位路侧停车4",
        name: "桂C123456",
        time: "2020-01-21 10:59:15",
        address: "A座大门旁",
      }, {
        url: "./park_m/image/i.png",
        type: "非停车位路侧停车1",
        name: "桂C123456",
        time: "2020-01-21 10:59:15",
        address: "A座大门旁",
      }, {
        url: "./park_m/image/i.png",
        type: "非停车位路侧停车1",
        name: "桂C123456",
        time: "2020-01-21 10:59:15",
        address: "A座大门旁",
      }, {
        url: "./park_m/image/i.png",
        type: "非停车位路侧停车1",
        name: "桂C123456",
        time: "2020-01-21 10:59:15",
        address: "A座大门旁",
      }, {
        url: "./park_m/image/i.png",
        type: "非停车位路侧停车1",
        name: "桂C123456",
        time: "2020-01-21 10:59:15",
        address: "A座大门旁",
      }, {
        url: "./park_m/image/i.png",
        type: "非停车位路侧停车1",
        name: "桂C123456",
        time: "2020-01-21 10:59:15",
        address: "A座大门旁",
      },

    ],
  }

  //over
}




//“随手拍”按钮-》 illegalUpload 违规上传页
class IllegalUpload extends React.Component {
  public constructor(props) {
    super(props);
  }

  public componentDidMount() {

  }

  public showList(a, e, n) {
    Photograph.toggleView(a, e, n);

    this.setState({
      // IllegalLoadcss: "illegalLoad-part",
      // companyul: "companyul"
    })
  }

  public toggleFold() {
    console.log("tftft")
    if (this.state.illegalLoadcss == "illegalLoad-all") {
      this.setState({
        illegalLoadcss: "illegalLoad-part",
        illfrom: "illfrom-part illfrom"
      })
    } else {
      this.setState({
        illegalLoadcss: "illegalLoad-all",
        illfrom: "illfrom-all illfrom"
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

  public illimginputClick(this) {
    console.log("2323", this);
  }

  public illimgClick() {
    this.illimginputClick();
  }

  public hideillcauseUL() {
    console.log("showloadUL");
    this.setState({
      illcauseBox: "hide",
      illcauseInname: "",
      illcauseInid: "",
    })
  }

  public illCuased(i,d, n) {
    this.setState({
      illcauseInname: n,
      illcauseInid: d,
      indexOf:i,
    })
  //  console.log("getillCuase", this.state);

  }
  public getillcause() {
    this.setState({
      illcauseBox: "hide"
    })
  //  console.log("getillCuase", this.state);


  }

  public showillcauseUL() {
    this.setState({
      illcauseBox:"illcauseBox"
    })
  }

  public sumbitIllfrom() {
    console.log("from", this.state);
  }

  public render() {
    //<div className="illTxt">
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
          <form className={this.state.illfrom}>
            <p><span className="redStar">*</span> 违规照片
              <input type="file" accept="image/*" className="getillImg" value="" onClick={this.illimginputClick.bind(this)} style={{ "opacity": "0", "position": "absolute", "right": "-16rem" }} />
              <img src={this.state.illImg} onClick={this.illimgClick.bind(this)} />
            </p>
            <p><span className="redStar">*</span> 曝光类型
              <input type="text" className="getillType" value={this.state.illcauseInname} placeholder="请选择曝光类型" />
              <span className="iconfont" style={{ "fontSize": "3rem", "float": "right", " padding": " 0 0 0 3rem", "padding": " 0 0 0 4rem" }}
                onClick={this.showillcauseUL.bind(this)}>&#xe827;</span>
            </p>
            <p><span className="redStar">*</span>  地址
               <input type="text" value="" className="getillAdd" placeholder="请点击地图选择违章点" />
              <span className="iconfont" style={{ "fontSize": "3rem", "color": "#0B8BF0", "float": "right", "padding": " 0 0 0 4rem" }}>&#xe82c;</span>
            </p>
            <p><span className="redStar">*</span> 车牌
                <input type="text" value="" className="getillNum" placeholder="请输入违规车牌号" />
            </p>
            <p><span className="redStar">*</span> 曝光时间
              <input type="datetime" className="getillTime" value="" placeholder="请输入违规时间" />
            </p>
           
            <p><span className="redStar">*</span> 违规描述</p>
            <div>
              <textarea className="getilltextarea" value="" placeholder="请将违规问题描述出来。（120字内）"></textarea>
            </div>
            <div className="illSumbit" onClick={this.sumbitIllfrom.bind(this)}>提交</div>
          </form>
        </div>

        <div className={this.state.illcauseBox}>
          <ul className="illcauseULcss">
            {this.state.illcauseUL.map((i, index) => {
              return (
                <li className={this.state.indexOf == index ? "illcauseli-active" : "illcauseli"}
                  onClick={this.illCuased.bind(this, index, i.id, i.name)}
                >{i.name}</li>
                )
            })}
          </ul>
          <div className="illCuasedBtn">
            <span className="illCancel" onClick={this.hideillcauseUL.bind(this)} >取消</span>
            <span className="illConfirm" onClick={this.getillcause.bind(this)}>确认</span>
          </div>
        </div>
        
      </div>
    )
  }


  public state = {
    illcauseBox:"hide",
    illegalLoadcss: "illegalLoad-part",
    illfrom: "illfrom-part illfrom",
    illTime: "",
    illImg: "./park_m/image/i.png",
    illcauseUL:[
      {name:"非停车位路侧停车",id:"原因01"},
      { name: "阻挡正常车位出入", id: "原因02" },
      { name: "阻塞主要出入口", id: "原因03" },
      { name: "占用多个车位", id: "原因04" },
      { name: "非地库占用地库", id: "原因05" },
      { name: "非地库占用地库2", id: "原因05" },
      { name: "非地库占用地库3", id: "原因05" },
      { name: "非地库占用地库4", id: "原因05" },
    ],
    indexOf: 0,
    illcauseInname: "",
    illcauseInid: "",
    iconfont: "iconfont iconfont-unturn",
  }

  //over
}

//违规信息
class IllegalInfos extends React.Component {
  public constructor(props) {
    super(props);
  }

  public componentDidMount() {
  }

  public showList(a, e, n) {
    Photograph.toggleView(a, e, n);

    this.setState({
      IllegalLoadcss: "illegalLoad-part",
      // companyul: "companyul"
    })
  }

  public showLoad(a, e, n) {
    console.log("tftft")
    if (this.state.IllegalLoadcss == "illegalLoad") {
      this.setState({
        IllegalLoadcss: "illegalLoad-part",
        // companyul: "companyul"
      })
    } else {
      this.setState({
        IllegalLoadcss: "illegalLoad",
        // companyul: "companyul-all"
        //fdsfsdfd
      })
    }
    Photograph.toggleView(a, e, n);
  }


  public render() {
    return (
      <div className="illegalInfos">
        <p>非停车位路侧停车</p>
        <p>2020-01-21 10:59:15</p>
        <p>
          <span className="iconfont" style={{ "fontSize": "3rem", "margin-right": "1rem" }}>&#xe82b;</span>
          车牌：<span>桂C123456</span></p>
        <p>
          <span className="iconfont" style={{ "fontSize": "3rem", "margin-right": "1rem" }}>&#xe815;</span>
          位置：<span>A座大门旁</span></p>
        <p>横跨斑马线上</p>
      </div>
    )
  }


  public state = {
    IllegalLoadcss: "illegalLoad-part"
  }

  //over
}


// 违规照片
class IllegalImg extends React.Component {
  public constructor(props) {
    super(props);
  }

  public componentDidMount() {
  }

  public showList(a, e, n) {
    Photograph.toggleView(a, e, n);

    this.setState({
      IllegalLoadcss: "illegalLoad-part",
      // companyul: "companyul"
    })
  }

  public showLoad(a, e, n) {
    console.log("tftft")
    //if (this.state.IllegalLoadcss == "illegalLoad") {
    //  this.setState({
    //    IllegalLoadcss: "illegalLoad-part",
    //    // companyul: "companyul"
    //  })
    //} else {
    //  this.setState({
    //    IllegalLoadcss: "illegalLoad",
    //    // companyul: "companyul-all"
    //    //fdsfsdfd
    //  })
    //}
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
    illegalImg: "./park_m/image/i.png",
  }

  //over
}



//更多-》 illegalInfo 违规信息页
class IllegalInfo extends React.Component {
  public constructor(props) {
    super(props);
  }

  public componentDidMount() {
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
            <span style={{ "fontSize": "5rem" }}>--</span>
          </div>
          <div className="leaseInfoul_br">
            <ul className={"leaseInfoul"} style={{"width":"44rem"}}>
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
    illegalInfocss: "illegalInfo-part",
    name: "桂C123456",
    infoli: 0,
  }

  //over
}

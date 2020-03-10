import * as React from "react";
import * as RouterDOM from 'react-router-dom';

import "css!./styles/view.css"

class FindLease extends React.Component {
  public constructor(props) {
    super(props);

    FindLease.toggleView = this.toggleView.bind(this);
  }

  public componentDidMount() {
    
  }

  static toggleView(a, e, n) { };
  public toggleView(a, e, n) {
    console.log("fl", a);
    console.log("fl", e);
    console.log("fl", n);

    if (a == "Info") {
      this.setState({
        showList: false,
        showInfo: true,
      })
    } else {
      this.setState({
        showList: true,
        showInfo: false,
      })
    }

  }

  public render() {
    return (
      <div>
        <div className={this.state.FindLeasecss}>
          <p className="companyInfotit">
            <RouterDOM.Link to="/home" >
              <span className="iconfont companyInfoicon">&#xe7fa;</span>
            </RouterDOM.Link>
            <span>招租查询</span>
          </p>
            <div className={this.state.showList == true ? "show" : "hide"}>
            <LeaseList />
          </div>

          <div className={this.state.showInfo == true ? "show" : "hide"}>
            <LeaseInfo />
          </div>
        </div>
      </div>
    )
  }

  public state = {
    FindLeasecss: "findLease",
    showList: true,
    showInfo: false,
  }

  //over
}

export default FindLease;

// 招租列表页 -- LeaseList
class LeaseList extends React.Component {
  public constructor(props) {
    super(props);

    this.showInfo = this.showInfo.bind(this);
  }

  public componentDidMount() {

  }

  // 点击更多，显示info;隐藏list；这里需要调用FindLease 的方法；
  public showInfo(a, e, n) {
    FindLease.toggleView(a, e, n);
  //  CompanyInfo.companyInfo(e);
  }

  public toggleFold() {
    console.log("tftft")
    if (this.state.leaseListcss == "leaseList-all") {
      this.setState({
        leaseListcss: "leaseList-part",
        leaseul: "leaseul"
      })
    } else {
      this.setState({
        leaseListcss: "leaseList-all",
        leaseul: "leaseul-all"
      })
    }
  }

  public foldBtn() {
    console.log("foldBtn");
    if (this.state.leaseBtn == "leaseBtn-part") {
      this.setState({
        leaseBtn: "leaseBtn-all"
      })
    } else {
      this.setState({
        leaseBtn: "leaseBtn-part"
      })
    }
  }

  public leaseActive(data) {
    console.log("active", data);
    this.setState({
      indexOf: data,
    })
  }

  public typeActive(indexof, name, id) {
    console.log("typeActive", indexof);
    console.log("typeActive", name);
    console.log("typeActive", id);

    this.setState({
      typeIndexof: indexof,
      typeName: name,
    })
  }

  public render() {
    return (
      <div>
        <div className={this.state.leaseListcss}>
          <div className={"foleBtn"} onClick={this.toggleFold.bind(this)}>
            <span style={{ "fontSize": "5rem" }}>--</span>
          </div>
          <ul className={this.state.leaseul}>
            {this.state.roomData.map((i, index) => {
              return (
                <li onClick={this.leaseActive.bind(this, index)} className={this.state.indexOf == index ? "leaseli-active" : "leaseli"} >
                  <div className="leaseImgback">
                    <img src={i.url} />
                  </div>
                  <div className="leaseul-middle">
                    <p className={this.state.indexOf == index ? "leaseName-active" : "leaseName"} style={{ "font-size": "2.4rem", "font-weight": "bold" }}>{i.name}</p>
                    <p style={{ "font-size": "2.5rem" }}><span className="iconfont" style={{ "fontSize": "3rem", "margin-right": "1rem" }}>&#xe7fa;</span>{i.area}m²</p>
                    <p style={{ "font-size": "2.5rem" }}><span className="iconfont" style={{ "fontSize": "3rem", "margin-right": "1rem" }}>&#xe7fa;</span>{i.time}</p>
                  </div>
                  <div className="leaseul-right">
                    <p onClick={this.showInfo.bind(this, "Info", i.id)}>更多 ></p>
                    <p className={this.state.indexOf == index ? "leaseType-active" : "leaseType"} >
                      <span className={this.state.indexOf == index ? "leasePrice-active" : "leasePrice"}>{i.price}</span>元/m²/天</p>
                  </div>
                </li>
              )
            })}
          </ul>
          <form>
            <div className={this.state.leaseBtn}>
              <div className="searchBox">
                <span className="searchBox-text">
                  <span className="iconfont" style={{ "fontSize": "3rem" }}>&#xe7fa;</span>
                  <input className="leaseSearch" type="text" placeholder="搜索" />
                </span>
                <span onClick={this.foldBtn.bind(this)} className="searchBox-type">
                  {this.state.typeName} <span className="iconfont" style={{ "fontSize": "3rem" }}>&#xe7fa;</span>
                </span>
              </div>
              <ul className="areaTypeul">
                <li className={this.state.typeIndexof == 100 ? "areaTypeli-active" : "areaTypeli"}
                  onClick={this.typeActive.bind(this, 100, "全部", "id-全部")} style={{ "width": "12rem" }}>全部</li>
                {this.state.areaType.map((i, index) => {
                  return (
                    <li onClick={this.typeActive.bind(this, index, i.area, i.id)} className={this.state.typeIndexof == index ? "areaTypeli-active" : "areaTypeli"}>{i.area}</li>
                  )
                })}
              </ul>
              <span className="searchBtn">搜索</span>
            </div>
          </form>
        </div>
      </div>
    )
  }

  public state = {
    leaseListcss: "leaseList-part",
    foleBtn: "lease-foleBtn",
    indexOf: 0,
    leaseBtn: "leaseBtn-part",
    leaseul: "leaseul",
    roomData: [
      {
        name: "A座-4F-B412室1", area:"45", time: "2019-7-15",
        id: "id-01", url: "./mPark/image/i.png", price: "2.89"
      },
      {
        name: "A座-4F-B412室2", area: "45", time: "2019-7-15",
        id: "id-02", url: "./mPark/image/i.png", price: "2.8"
      },
      {
        name: "A座-4F-B412室3", area: "45", time: "2019-7-15",
        id: "id-03", url: "./mPark/image/i.png", price: "2.8"
      },
      {
        name: "A座-4F-B412室1", area: "45m²", time: "2019-7-15",
        id: "id-01", url: "./mPark/image/i.png", price: "2.8"
      },
      {
        name: "A座-4F-B412室1", area: "45m²", time: "2019-7-15",
        id: "id-01", url: "./mPark/image/i.png", price: "2.8"
      },
      {
        name: "A座-4F-B412室1", area: "45m²", time: "2019-7-15",
        id: "id-01", url: "./mPark/image/i.png", price: "2.8"
      },
      {
        name: "A座-4F-B412室1", area: "45m²", time: "2019-7-15",
        id: "id-01", url: "./mPark/image/i.png", price: "2.8"
      },
      {
        name: "A座-4F-B412室1", area: "45m²", time: "2019-7-15",
        id: "id-01", url: "./mPark/image/i.png", price: "2.8"
      },
      {
        name: "A座-4F-B412室1", area: "45m²", time: "2019-7-15",
        id: "id-01", url: "./mPark/image/i.png", price: "2.8"
      },

    ],
    areaType: [
      { area: "100m²以下", id: "id-100m²以下" },
      { area: "100-200m²", id: "id-100-200m²" },
      { area: "200-300m²", id: "id-200-300m²" },
      { area: "300-500m²", id: "id-300-500m²" },
      { area: "500-800m²", id: "id-500-800m²" },
      { area: "800m²以上", id: "id-800m²以上" },
    ],
    typeIndexof: 100,
    typeName: "全部"
  }
}

// 更多-》招租信息页 -- LeaseInfo
class LeaseInfo extends React.Component {
  public constructor(props) {
    super(props);

    this.showList = this.showList.bind(this);

  }

  public componentDidMount() {

  }

  public showList(a, e, n) {
    FindLease.toggleView(a, e, n);
  }

  public toggleFold() {
    console.log("tftft")
    if (this.state.leaseInfocss == "leaseInfo") {
      this.setState({
        leaseInfocss: "leaseInfo-part",
        // companyul: "companyul"
      })
    } else {
      this.setState({
        leaseInfocss: "leaseInfo",
        // companyul: "companyul-all"
        //fdsfsdfd
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
    return (
      <div>
        <p className="companyInfotit">
          <span className="iconfont companyInfoicon" onClick={this.showList.bind(this, "List", "id-01")}>&#xe7fa;</span>
          <span>{this.state.roomName}</span>
        </p>
        <div className={this.state.leaseInfocss}>
          <div className={"foleBtn"} onClick={this.toggleFold.bind(this)}>
            <span style={{ "fontSize": "5rem" }}>--</span>
          </div>
          <div className="leaseInfoul_br">
            <ul className={"leaseInfoul"}>
              <li className={this.state.infoli == 0 ? "leaseInfoli-active" : "leaseInfoli"}
                onClick={this.infoClick.bind(this, 0)}
              >租房信息</li>
              <li className={this.state.infoli == 1 ? "leaseInfoli-active" : "leaseInfoli"}
                onClick={this.infoClick.bind(this, 1)} >照片展示</li>
             </ul>
          </div>
          <div className="leaseContain">
            <div className={this.state.infoli == 0 ? "show" : "hide"}>
              <LeaseInfos />
            </div>
            <div className={this.state.infoli == 1 ? "show" : "hide"}>
              <Picshow />
            </div>
          </div>
        </div>
      </div>
    )
  }

  public state = {
    leaseInfocss: "leaseInfo",
    roomName: "A座-4F-B412室",
    infoli: 0,
  }
}

//左-》租房详细信息 -- LeaseInfos
class LeaseInfos extends React.Component {
  public constructor(props) {
    super(props);

  }

  public componentDidMount() {

  }

  public render() {
    return (
      <div className={"leaseInfos"}>
        <ul className={"leaseInfosul"}>
          <li>基本信息</li>
          <li>看房须知</li>
          <li>建筑面积<span>{this.state.area}平米</span></li>
          <li>看房时间<span>{this.state.time}</span></li>
          <li>所在楼层<span>{this.state.floor}楼</span></li>
          <li>租房要求<span>{this.state.limit}起租</span></li>
          <li>
            <span style={{ "padding-right": "7rem"}}>电梯</span>
            <span style={{ "font-weight": "600" }}>{this.state.elevator}</span></li>
          <li>
            <span style={{ "padding-right": "7rem" }}>租金</span>
            <span style={{ "color": "#F53636" }}>{this.state.price}元/m²/天</span></li>
          <li>
            <span style={{ "padding-right": "5rem" }}>联系人</span>
            <span style={{ "font-weight": "600" }}>{this.state.man}</span></li>
          <li>
            <span style={{ "padding-right": "2rem" }}>联系电话</span>
            <span style={{ "font-weight": "600" }}>{this.state.tel}</span></li>
        </ul>
      </div>
    )
  }

  public state = {
    area: "156",
    time: "8:30-17:30",
    floor: "4",
    limit: "一年",
    elevator: "有",
    price: "2.8",
    man: "莫先生",
    tel:"0773123456"
  }
}


//右-》照片展示 --picshow
class Picshow extends React.Component {
  public constructor(props) {
    super(props);

  }

  public componentDidMount() {

  }

  public render() {
    return (
      <div className={"picshow"}>
        <ul>
          {this.state.roomImg.map((i, index) => {
            return (
              <li>
                <img src={i.url} />
              </li>
            )
          })}
        </ul>
      </div>
    )
  }

  public state = {
    roomImg: [
      { url: "./mPark/image/i.png" },
      { url: "./mPark/image/i.png" },
      { url: "./mPark/image/i.png" },
      { url: "./mPark/image/i.png" },
      { url: "./mPark/image/i.png" },
      { url: "./mPark/image/i.png" },
    ]
  }
}
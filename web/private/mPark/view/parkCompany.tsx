import * as React from "react";
import * as RouterDOM from 'react-router-dom';

import GlobalAction from "compat";

class ParkCompany extends React.Component {
  public constructor(props) {
    super(props);

    ParkCompany.toggleView = this.toggleView.bind(this);
  }

  static toggleView(a, e, n) { };
  public toggleView(a, e, n) {
    console.log("ff", a);
    console.log("ff", e);
    console.log("ff", n);

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
      <div className={this.state.parkCompanycss}>
        <p className="companyInfotit">
          <RouterDOM.Link to="/home" >
            <span className="iconfont companyInfoicon">&#xe7fa;</span>
          </RouterDOM.Link>
          <span>园区企业</span>
        </p>
          <div className={this.state.showList == true ? "show" : "hide"}>
          <CompanyList />
        </div>

        <div className={this.state.showInfo == true ? "show" : "hide"}>
          <CompanyInfo />
        </div>

      </div>
    )
  }

  public state = {
    parkCompanycss: "parkCompany",
    showList: true,
    showInfo: false,

  }


  //over
}

// 公司列表页
class CompanyList extends React.Component {
  public constructor(props) {
    super(props);

    this.showInfo = this.showInfo.bind(this);
  }


  // 点击更多，显示info;隐藏list；这里需要调用ParkCompany 的方法；
  public showInfo(a, e, n) {
    ParkCompany.toggleView(a, e, n);
    CompanyInfo.companyInfo(e);
  }

  public toggleFold() {
    console.log("tftft")
    if (this.state.companyListcss == "companyList-all") {
      this.setState({
        companyListcss: "companyList-part",
        companyul:"companyul"
      })
    } else {
      this.setState({
        companyListcss: "companyList-all",
        companyul:"companyul-all"
      })
    }
  }

  public foldBtn() {
    console.log("foldBtn");
    if (this.state.companyBtn == "companyBtn-part") {
      this.setState({
        companyBtn: "companyBtn-all"
      })
    } else {
      this.setState({
        companyBtn: "companyBtn-part"
      })
    }
  }

  public globalAction: GlobalAction = new GlobalAction();

  public companyActive(data, id) {
    console.log("active", data);
    this.setState({
      indexOf: data,
    });
    this.globalAction.switchRoom(id);
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

  //软键盘搜索，获取数据，呈现列表效果；（3.5-未写）；1提交搜索条件。；2-css； 

  public render() {
    return (
      <div className={this.state.companyListcss}>
        <div className={"foleBtn"} onClick={this.toggleFold.bind(this)}>
          <span style={{ "fontSize": "5rem" }}>--</span>
        </div>
        <ul className={this.state.companyul}>
          {this.state.companyData.map((i, index) => {
            return (
              <li onClick={this.companyActive.bind(this, index, i.id)} className={this.state.indexOf == index ? "companyli-active" : "companyli"} >
                <div className="companyImgback">
                  <img src={i.url} />
                </div>
                <div className="companyul-middle">
                  <p className={this.state.indexOf == index ? "companyName-active" : "companyName"} style={{ "font-size": "2.4rem", "font-weight": "bold" }}>{i.name}</p>
                  <p style={{ "font-size": "2.5rem" }}><span className="iconfont" style={{ "fontSize": "3rem" }}>&#xe7fa;</span>{i.address}</p>
                </div>
                <div className="companyul-right">
                  <p  onClick={this.showInfo.bind(this, "Info", i.id)}>更多 ></p>
                  <p className={this.state.indexOf == index ? "companyType-active" : "companyType"} >{i.type}</p>
                </div>
              </li>
            )
          })}
        </ul>
        <form>
        <div className={this.state.companyBtn}>
          <div className="searchBox">
            <span className="searchBox-text">
              <span className="iconfont" style={{ "fontSize": "3rem" }}>&#xe7fa;</span>
              <input className="companySearch" type="text" placeholder="请输入企业名称" />
            </span>
            <span onClick={this.foldBtn.bind(this)} className="searchBox-type">
              {this.state.typeName} <span className="iconfont" style={{ "fontSize": "3rem" }}>&#xe7fa;</span>
            </span>
          </div>
          <ul className="companyTypeul">
            <li className={this.state.typeIndexof == 100 ? "companyTypeli-active" : "companyTypeli"}
              onClick={this.typeActive.bind(this, 100, "全部", "id-全部")} style={{ "width":"12rem"}}>全部</li>
            {this.state.companyType.map((i, index) => { 
              return (
                <li onClick={this.typeActive.bind(this, index, i.name, i.id)} className={this.state.typeIndexof == index ? "companyTypeli-active" : "companyTypeli"}>{i.name}</li>
                )
            })}
            </ul>

            <span className="searchBtn">搜索</span>
        </div>
        </form>
      </div>
    )
  }

  public state = {
    companyListcss: "companyList-part",
    foleBtn: "foleBtn",
    indexOf: 0,
    companyBtn: "companyBtn-part",
    companyul:"companyul",
    companyData: [
      {
        name: "浙江永拓信息科技有限公司1", address: "E座B区-3F-301",
        id: "id-01",  url: "./mPark/image/pin-blue.png", type: "科技服务"
      },
      {
        name: "浙江永拓信息科技有限公司2", address: "E座B区-3F-302",
        id: "id-02", url: "./mPark/image/pin-blue.png", type: "科技服务"
      },
      {
        name: "浙江永拓信息科技有限公司3", address: "E座B区-3F-303",
        id: "id-03", url: "./mPark/image/pin-blue.png",  type: "科技服务"
      },
      {
        name: "浙江永拓信息科技有限公司1", address: "E座B区-3F-301",
        id: "id-01", url: "./mPark/image/pin-blue.png", type: "科技服务"
      },
      {
        name: "浙江永拓信息科技有限公司1", address: "E座B区-3F-301",
        id: "id-01",  url: "./mPark/image/pin-blue.png",  type: "科技服务"
      }, ,
      {
        name: "浙江永拓信息科技有限公司1", address: "E座B区-3F-301",
        id: "id-01", url: "./mPark/image/pin-blue.png", type: "科技服务"
      }, ,
      {
        name: "浙江永拓信息科技有限公司1", address: "E座B区-3F-301",
        id: "id-01", url: "./mPark/image/pin-blue.png", type: "科技服务"
      }, ,
      {
        name: "浙江永拓信息科技有限公司1", address: "E座B区-3F-301",
        id: "id-01", url: "./mPark/image/pin-blue.png", type: "科技服务"
      }, ,
      {
        name: "浙江永拓信息科技有限公司1", address: "E座B区-3F-301",
        id: "id-01", url: "./mPark/image/pin-blue.png", type: "科技服务"
      },

    ],
    companyType: [
      { name: "高新技术", id: "id-高新技术" },
      { name: "科技服务", id: "id-科技服务" },
      { name: "文化创意", id: "id-文化创意" },
      { name: "金融保险", id: "id-金融保险" },
      { name: "电子商务", id: "id-电子商务" },
      { name: "贸易销售", id: "id-贸易销售" },
      { name: "机械设备", id: "id-机械设备" },
      { name: "休闲娱乐", id: "id-休闲娱乐" },
      { name: "生物医药", id: "id-生物医药" },
    ],
    typeIndexof: 100,
    typeName:"全部"
  }


  //over
}

// 公司详情页
class CompanyInfo extends React.Component {
  public constructor(props) {
    super(props);

    this.showList = this.showList.bind(this);
    CompanyInfo.companyInfo = this.companyInfo.bind(this);
  }

  static companyInfo(data) { }
  public companyInfo(data) {
    this.setState({
      companyId: data
    });
  }

  public showList(a, e, n) {
    ParkCompany.toggleView(a, e, n);
  }

  public toggleFold() {
    console.log("tftft")
    if (this.state.companyInfocss == "companyInfo") {
      this.setState({
        companyInfocss: "companyInfo-part",
       // companyul: "companyul"
      })
    } else {
      this.setState({
        companyInfocss: "companyInfo",
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
    //companyInfo
    //  < p > { this.state.companyId }</p >
    //    <p onClick={this.showList.bind(this, "List", "id-01")}>返回 list</p>
    return (
      <div>
        <p className="companyInfotit">
          <span className="iconfont companyInfoicon" onClick={this.showList.bind(this, "List", "id-01")}>&#xe7fa;</span>
          <span>{this.state.companyName}</span>
        </p>
        <div className={this.state.companyInfocss}>
          <div className={"foleBtn"} onClick={this.toggleFold.bind(this)}>
            <span style={{ "fontSize": "5rem" }}>--</span>
          </div>
          <ul className={this.state.companyInfoul}>
            <li className={this.state.infoli == 0 ? "companyInfoli-active" : "companyInfoli"}
              onClick={this.infoClick.bind(this,0)} 
            >企业信息</li>
            <li className={this.state.infoli == 1 ? "companyInfoli-active" : "companyInfoli"}
              onClick={this.infoClick.bind(this, 1)} >企业风采</li>
            <li className={this.state.infoli == 2 ? "companyInfoli-active" : "companyInfoli"}
              onClick={this.infoClick.bind(this, 2)} >企业详情</li>
            <li className={this.state.infoli == 3 ? "companyInfoli-active" : "companyInfoli"}
              onClick={this.infoClick.bind(this, 3)} >产品展示</li>
          </ul>
          <div className="infoContain">
            <div className={this.state.infoli == 0 ? "show" : "hide"}>
              <CompanyInfos />
            </div>
            <div className={this.state.infoli == 1 ? "show" : "hide"}>
              <Mien />
            </div>
            <div className={this.state.infoli == 2 ? "show" : "hide"}>
              <Details />
            </div>
            <div className={this.state.infoli == 3 ? "show" : "hide"}>
              <Product />
            </div>
          
          </div>
        </div>
      </div>
     
    )
  }

  public state = {
    companyInfocss: "companyInfo",
   // companyId: null,
    companyName:"浙江永拓信息科技有限公司",
    companyInfoul: "companyInfoul",
    infoli:0,
  }

  //over
}

//企业信息;
class CompanyInfos extends React.Component {
  public constructor(props) {
    super(props);

  }

  public componentDidMount() {
    
  }

  public render() {
    return (
      <div className={"infos"}>
        <img src={this.state.imgurl} />
        <div className={"ifosRight"}>
          <h4 className={"infos-1"}>{this.state.name} </h4>
          <h5 className={"infos-2"}>
            <span className="iconfont" style={{ "fontSize": "3rem" }}>&#xe7fa;</span>
            {this.state.address}
          </h5>
          <p className={"infos-3"} >{this.state.type}</p>
          <p className={"infos-4"} >
            <span>联系人</span>
            <span>{this.state.man}</span>
          </p>
          <p className={"infos-5"} >
            <span>联系电话</span>
            <span>{this.state.tel}</span>
          </p>
          <p className={"infos-6"} >
            <span>企业官网</span>
            <span >{this.state.http}</span>
          </p>
        </div>
        </div>
    )
  }

  public state = {
    imgurl: "./mPark/image/pin-blue.png",
    name:"浙江永拓信息科技有限公司",
    address: "桂林市信息产业园E座B区3F",
    type: "科技服务",
    man: "XXX",
    tel: "155578383040",
    http:"www.yongtoc.com"
  }

  //over
}

//企业风采;
class Mien extends React.Component {
  public constructor(props) {
    super(props);

  }

  public componentDidMount() {
   
  }

  public render() {
    return (
      <div className={"mien"}>
        <ul>
          {this.state.mienImg.map((i, index) => {
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
    mienImg: [
      { url: "./mPark/image/i.png" },
      { url: "./mPark/image/i.png" },
      { url: "./mPark/image/i.png" },
      { url: "./mPark/image/i.png" },
      { url: "./mPark/image/i.png" },
      { url: "./mPark/image/i.png" },
    ]
  }

  //over
}

//企业详情
class Details extends React.Component {
  public constructor(props) {
    super(props);

  }

  public componentDidMount() {
     
  }

  public render() {
    return (
      <div className={"details"}>
        <p> 
          {this.state.text}
        </p> 
      </div>
    )
  }

  public state = {
    text: "浙江永拓信息科技有限公司是浙江永拓实业有限公司旗下的控股子公司。    公司由计算机图形学、计算机应用学、物联网技术等三方面专家组成，是一家专注于以3D为展现方式， 解决物理空间关系的技术提供商，致力于成为全球领先3D可视化企业，为客户和合作伙伴全面提供3D可视化技术的服务，实现其业务的差异化竞争优势。   "
  }

  //over
}

//产品展示
class Product extends React.Component {
  public constructor(props) {
    super(props);


// ffdssdfds
  }

  public componentDidMount() {
    
  }

  public render() {
    return (
      <div className={"product"}>
        <ul>
          {this.state.productImg.map((i, index) => {
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
    productImg: [
      { url: "./mPark/image/i.png" },
      { url: "./mPark/image/i.png" },
      { url: "./mPark/image/i.png" },
      { url: "./mPark/image/i.png" },
      { url: "./mPark/image/i.png" },
      { url: "./mPark/image/i.png" },
    ]
  }
  //over
}



export default ParkCompany;
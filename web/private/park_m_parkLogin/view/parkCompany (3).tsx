import * as React from "react";
import * as RouterDOM from 'react-router-dom';
import GlobalAction from "compat";
import DataService from "dataService";
import BottomBtn from "./324/bottomBtn";
import { Carousel, WingBlank } from 'antd-mobile';


class ParkCompany extends React.Component {
  public constructor(props) {
    super(props);

    ParkCompany.toggleView = this.toggleView.bind(this);
    ParkCompany.getCompanyinfo = this.getCompanyinfo.bind(this);
  }

  public componentDidMount() {
    console.log("ParkCompany");

  }

  // 定义静态类，需要绑定到this的方法上，供外部调用;
  // 外部传入的企业id，传给企业详情组件，刷新企业详情数据；
  static getCompanyinfo(id) { }
  public getCompanyinfo(id) {
    console.log("getCompanyinfo", id);

    this.toggleView("Info", id);
    CompanyInfo.getCompanyinfo(id);
  }

  static toggleView(a, id) { };
  public toggleView(a, id) {
    console.log("ff", a);
    // 企业id
    console.log("ff", id);
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
    //over
  }

  public globalAction: GlobalAction = new GlobalAction();

  public render() {
    return (
      <div className={this.state.parkCompanycss}>
        <p className="companyInfotit">
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
    token: "",
  }


  //over
}

// 公司列表页
class CompanyList extends React.Component {
  public constructor(props) {
    super(props);

    this.showInfo = this.showInfo.bind(this);
    this.setCompany = this.setCompany.bind(this);
    this.setCompanyType = this.setCompanyType.bind(this);
    this.change = this.change.bind(this);
    this.typeActive = this.typeActive.bind(this);
  }

  public componentWillMount() {
    //const token = localStorage.getItem('token');
    //this.setState({
    //  token: token,
    //});
    //console.log("token",this.state)
  }

  public dataService: DataService = new DataService();

  public componentDidMount() {
    //获取园区下面企业类型列表
    this.dataService.getCompanyType(this.setCompanyType, this.state.park_id);
    //通过园区id搜索园区下面企业列表
    this.dataService.findCompany(this.setCompany, this.state.park_id, this.state.company_type_id, this.state.typeName);
  }


  // set企业类型列表
  public setCompanyType(data) {
    console.log("set企业类型列表", data.response);
    this.setState({
      companyType: data.response,
    });
  }

  // set企业列表
  public setCompany(data) {
    console.log("set企业列表", data.response)
    //  console.log("setCompany", data.response[0].name)

    if (data.response.length == 0) {
      console.log(22222222);
      this.setState({
        companyData: data.response,
        companyNull: "show",
      })
    } else {
      this.setState({
        companyData: data.response,
        companyNull: "hide",
      })
    }
  }

  onErrorHeadimageurl() {
    this.setState({
      headimageurl: "./park_m/image/tx.jpg"
    })
  }

  // 点击更多，显示info;隐藏list；这里需要调用ParkCompany 的方法；
  // 通过 公司id，获取详情内容
  public showInfo(a, id, name, e) {
    ParkCompany.toggleView(a, id);
    CompanyInfo.getCompanyinfo(id);
    console.log("more", a, id, name, e);
  }

  public toggleFold() {
    console.log("tftft")
    if (this.state.companyListcss == "companyList-all") {
      this.setState({
        companyListcss: "companyList-part",
        companyul: "companyul"
      })
      //通知3d，继续加载模型  
      this.globalAction.web_call_webgl_continueloadModuler();
    } else {
      this.setState({
        companyListcss: "companyList-all",
        companyul: "companyul-all"
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
        iconfont: "iconfont iconfont-turn",
      })
    }
  }

  public foldBtn() {
    console.log("foldBtn");
    if (this.state.companyBtn == "companyBtn-part") {
      this.setState({
        companyBtn: "companyBtn-all",
        searchBoxTypeIcon: "iconfont iconfont-turn",
      })
    } else {
      this.setState({
        companyBtn: "companyBtn-part",
        searchBoxTypeIcon: "iconfont iconfont-unturn",
      })
    }

  }

  public globalAction: GlobalAction = new GlobalAction();
  // 选中某企业
  public companyActive(data, id) {
    console.log("active", data);
    this.setState({
      indexOf: data,
    });
    // 通知3d，切换公司定位（web获取的是 公司id）
    this.globalAction.web_call_webgl_switchCompany(id);
  }

  // 选中企业类型；
  public typeActive(indexof, name, id) {
    console.log("typeActive", indexof);
    console.log("typeActive", name);
    console.log("typeActive", id);
    this.setState({
      typeIndexof: indexof,
      typeName: name,
      company_type_id: id,
    }, () => {
      // 提交企业类型id；
      this.searchCompany();
    });

  }

  // 聚焦
  public foucus() {
    if (this.state.inputValue == " ") {
      this.setState({ inputValue: "" })
    }
  }

  // 失焦
  public blur(event) {
    if (this.state.inputValue == "") {
      this.setState({ inputValue: " " })
    }
  }

  // 输入
  public change(event) {
    this.setState({ inputValue: event.target.value });
  }

  // 软键盘 搜索
  public queryKeyDownHandler(e) {
    switch (e.keyCode) {
      case 13://回车事件
        this.searchCompany();
        break
    }
  }

  //软键盘搜索 
  public searchCompany() {
    if (this.state.inputValue == "请输入企业名称" || this.state.typeName == "全部 ") {
      this.setState({ inputValue: "" })
    };
    console.log("searchBtn", this.state.inputValue, this.state.company_type_id);
    this.dataService.findCompany(this.setCompany, this.state.park_id, this.state.company_type_id, this.state.inputValue);
  }

  //返回园区map
  public mapReturnpark() {
    //通知3d，返回园区视角
    this.globalAction.web_call_webgl_mapReturnpark();
  }

  public render() {
    return (
      <div className={this.state.companyListcss}>
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
        <ul className={this.state.companyul}>
          <p className={this.state.companyNull}>没有符合搜索条件的结果···</p>
          {this.state.companyData.map((i, index) => {
            if (i.headimageurl == null) {
              return (
                <li onClick={this.companyActive.bind(this, index, i.id)} className={this.state.indexOf == index ? "companyli-active" : "companyli"} >
                  <div className={this.state.indexOf == index ? "companyImgback-active" : "companyImgback"}>
                    <img src={"./park_m/image/i.png"} />
                  </div>
                  <div className="companyul-middle">
                    <p className={this.state.indexOf == index ? "companyName-active" : "companyName"} style={{ "font-size": "2.4rem", "font-weight": "bold" }}>{i.name}</p>
                    <p style={{ "font-size": "2.5rem", "overflow": "hidden", "text-overflow": "ellipsis", "white-space": "nowrap" }}>
                      <i className="iconfont" style={{ "fontSize": "2.5rem" }}>&#xe815;</i>
                      {i.address}</p>
                  </div>
                  <div className="companyul-right">
                    <p onClick={this.showInfo.bind(this, "Info", i.id, i.name)} className={this.state.indexOf == index ? "show" : "hide"} >更多
                    <i className="iconfont" style={{ "fontSize": "2rem" }}>&#xe827;</i>
                    </p>
                    <p className={this.state.indexOf == index ? "companyType-active" : "companyType"} >{i.company_type}</p>
                  </div>
                </li>
              )
            } else {
              return (
                <li onClick={this.companyActive.bind(this, index, i.id)} className={this.state.indexOf == index ? "companyli-active" : "companyli"} >
                  <div className={this.state.indexOf == index ? "companyImgback-active" : "companyImgback"}>
                    <img src={i.headimageurl} onError={this.onErrorHeadimageurl.bind(this)} />
                  </div>
                  <div className="companyul-middle">
                    <p className={this.state.indexOf == index ? "companyName-active" : "companyName"} style={{ "font-size": "2.4rem", "font-weight": "bold" }}>{i.name}</p>
                    <p style={{ "font-size": "2.5rem", "overflow": "hidden", "text-overflow": "ellipsis", "white-space": "nowrap" }}>
                      <i className="iconfont" style={{ "fontSize": "2.5rem" }}>&#xe815;</i>
                      {i.address}</p>
                  </div>
                  <div className="companyul-right">
                    <p onClick={this.showInfo.bind(this, "Info", i.id, i.name)} className={this.state.indexOf == index ? "show" : "hide"} >更多
                    <i className="iconfont" style={{ "fontSize": "2rem" }}>&#xe827;</i>
                    </p>
                    <p className={this.state.indexOf == index ? "companyType-active" : "companyType"} >{i.company_type}</p>
                  </div>
                </li>
              )
            }
          })}
        </ul>
        <form action='' target="rfFrame">
          <div className={this.state.companyBtn}>
            <div className="searchBox">
              <span className="searchBox-text">
                <i className="iconfont" style={{ "fontSize": "2.3rem" }}>&#xe810;</i>
                <input className="companySearch" type="search" placeholder="请输入企业名称"
                  value={this.state.inputValue} onFocus={this.foucus.bind(this)}
                  onBlur={this.blur.bind(this)} onChange={this.change.bind(this)} onKeyDown={this.queryKeyDownHandler.bind(this)} />
              </span>
              <span onClick={this.foldBtn.bind(this)} className="searchBox-type">
                {this.state.typeName} <i className={this.state.searchBoxTypeIcon} style={{ "fontSize": "3rem", position: "relative", top: "0.3rem" }}>&#xe828;</i>
              </span>
            </div>
            <ul className="companyTypeul">
              <li className={this.state.typeIndexof == 100 ? "companyTypeli-active" : "companyTypeli"}
                onClick={this.typeActive.bind(this, 100, "全部", "")} style={{ "width": "12rem" }}>全部</li>
              {this.state.companyType.map((i, index) => {
                return (
                  <li onClick={this.typeActive.bind(this, index, i.name, i.id)} className={this.state.typeIndexof == index ? "companyTypeli-active" : "companyTypeli"}>{i.name}</li>
                )
              })}
            </ul>
          </div>
        </form>
        <iframe id="rfFrame" name="rfFrame" src={this.state.src} style={{ display: "none" }}>   </iframe>
      </div>
    )
    //<span className="searchBtn" onClick={this.searchCompany.bind(this)} >搜索</span>
    //onKeyDown={this.searchCompany.bind(this)}
  }

  public state = {
    companyNull: "hide",
    // 园区id
    park_id: 1001,
    companyListcss: "companyList-part",
    foleBtn: "foleBtn",
    companyBtn: "companyBtn-part",
    companyul: "companyul",
    searchBoxTypeIcon: "iconfont iconfont-unturn",
    //企业列表
    companyData: [],
    // 企业类型
    companyType: [],
    // 当前选中企业li的序列号
    indexOf: 0,
    //当前选中类型序列号
    typeIndexof: 100,
    //搜索关键词
    typeName: " ",
    //搜索企业类型id
    company_type_id: "",
    // 输入框默认值
    inputValue: "",
    iconfont: "iconfont iconfont-unturn",
    token: "",
    //设置 点击软键盘搜索，页面不刷新
    src: "about:'blank'",
  }


  //over
}

// 公司详情页
class CompanyInfo extends React.Component {
  public constructor(props) {
    super(props);

    this.showList = this.showList.bind(this);
    CompanyInfo.getCompanyinfo = this.getCompanyinfo.bind(this);
    this.setCompanyinfo = this.setCompanyinfo.bind(this);
  }

  public dataService: DataService = new DataService();
  static getCompanyinfo(id) { }
  public getCompanyinfo(id) {
    // 通过企业id，set企业详情； 7#
    this.dataService.getCompanyInfo(this.setCompanyinfo, id);
  }

  // 获取企业详情，给子组件显示；
  //  传递企业详情，到 CompanyInfos(企业信息) 、Mien（企业风采）、Details（企业简介）、 Product(产品展示)组件中
  public setCompanyinfo(data) {
    console.log("getCompanyinfo", data);
    // set公司name
    this.setState({
      companyName: data.response.name,
    });
    CompanyInfos.setCompanyinfos(data);
    Mien.setCompanymien(data);
    Details.setCompanydetails(data);
    Product.setCompanyproduct(data);
  }

  public showList(a, id) {
    ParkCompany.toggleView(a, id);
  }

  public toggleFold() {
    console.log("tftft")
    if (this.state.companyInfocss == "companyInfo") {
      this.setState({
        companyInfocss: "companyInfo-part",
      })
    } else {
      this.setState({
        companyInfocss: "companyInfo",
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
    return (
      <div>
        <p className="companyInfotit">
          <i className="iconfont companyInfoicon" onClick={this.showList.bind(this, "List", "id-01")}>&#xe83b;</i>
          <span>{this.state.companyName}</span>
        </p>
        <div className={this.state.companyInfocss}>
          <div className={"foleBtn"} onClick={this.toggleFold.bind(this)}>
            <i className={this.state.iconfont} style={{ "fontSize": "5rem" }}>&#xe849;</i>
          </div>
          <ul className={this.state.companyInfoul}>
            <li className={this.state.infoli == 0 ? "companyInfoli-active" : "companyInfoli"}
              onClick={this.infoClick.bind(this, 0)}
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
    // 企业信息样式
    companyInfocss: "companyInfo",
    //  companyId:"",
    companyName: "浙江永拓信息科技有限公司",
    // 企业信息ul样式
    companyInfoul: "companyInfoul",
    // 当前选中li
    infoli: 0,
    // 折叠按钮
    iconfont: "iconfont iconfont-unturn",
  }

  //over
}

//企业信息;
class CompanyInfos extends React.Component {
  public constructor(props) {
    super(props);


    CompanyInfos.setCompanyinfos = this.setCompanyinfos.bind(this);
  }

  public componentDidMount() { }

  // 显示获取的企业详情
  static setCompanyinfos(data) { }
  public setCompanyinfos(data) {
    console.log("setCompanyinfoCCCCCCCCCCC", data);
    this.setState({
      imgurl: data.response.headimageurl,
      name: data.response.name,
      address: data.response.address,
      // type: data.response.service[0].name,
      type: data.response.company_type,
      man: data.response.contact,
      tel: data.response.phone,
      http: data.response.website,
    })
  }

  public render() {
    if (!this.state.imgurl) {
      return (
        <div className={"infos"}>
          <img src={"./park_m/image/i.png"} />
          <div className={"ifosRight"}>
            <h4 className={"infos-1"}>{this.state.name} </h4>
            <h5 className={"infos-2"}>
              <i className="iconfont" style={{ "fontSize": "3rem" }}>&#xe815;</i>
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
    } else {
      return (
        <div className={"infos"}>
          <img src={this.state.imgurl} />
          <div className={"ifosRight"}>
            <h4 className={"infos-1"}>{this.state.name} </h4>
            <h5 className={"infos-2"}>
              <i className="iconfont" style={{ "fontSize": "3rem", "margin-right": "1rem" }}>&#xe815;</i>
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

  }

  public state = {
    imgurl: "",
    // 企业名称
    name: "",
    address: "",
    // 企业类型
    type: "",
    // 联系人
    man: "",
    tel: "",
    http: ""
  }

  //over
}



//企业风采;
class Mien extends React.Component{

  public constructor(props) {
    super(props);

    Mien.setCompanymien = this.setCompanymien.bind(this);
  }

  public componentDidMount() { }

  // 显示获取的企业详情
  static setCompanymien(data) { }
  public setCompanymien(data) {
    let picurl = [];
    console.log("setCompanyMienMMMMM", data);
    $.each(data.response.elegant, function (index, item) {
      picurl.push(item.pic_url)
    });
    this.setState({
      mienImg: data.response.elegant,
      mienImgLength: data.response.elegant.length,
      data: picurl,
    })
  }

  public render() {
    // beforeChange={(from, to) => console.log(`slide from ${from} to ${to}`)}
    return (
        <div className={"mien"} >
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
      </div>
    )
  }

  public state = {
    mienImg: [],
    typeIndexof: 0,
    mienImgLength: 0,
    mienImgCss: "left: 0%",
    data: ['1', '2', '3','4','5','6','7'],
    imgHeight: 176,
    slideIndex:0,
  }

  //over
}

//企业详情
class Details extends React.Component {
  public constructor(props) {
    super(props);

    Details.setCompanydetails = this.setCompanydetails.bind(this);
  }

  public componentDidMount() { }

  // 显示获取的企业详情
  static setCompanydetails(data) { }
  public setCompanydetails(data) {
    console.log("setCompanyDetailsDDDDD", data);
    this.setState({
      text: data.response.descript,
    })
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

  public state = { text: "" }
  //over
}

//产品展示
class Product extends React.Component {
  public constructor(props) {
    super(props);

    Product.setCompanyproduct = this.setCompanyproduct.bind(this);
  }

  public componentDidMount() { }

  // 显示获取的企业详情
  static setCompanyproduct(data) { }
  public setCompanyproduct(data) {
    console.log("setCompanyproductPPPP", data);
    //this.setState({
    //  productImg: data.response.product,
    //})


    if (data.response.product == 0) {
      this.setState({
        productImg: data.response.product,
        urlNull: "show",
      })
    } else {
      this.setState({
        productImg: data.response.product,
        urlNull: "hide",
      })
    }
  }


  public render() {
    return (
      <div className={"product"}>
        <ul>
          <p className={this.state.urlNull} style={{ "color": "#333333" }}>暂无图片···</p>
          {this.state.productImg.map((i, index) => {
            if (!i.pic_url) {
              return (
                <li>
                  <p className={this.state.urlNull} style={{ "color": "#6C6C6C" }}>暂无图片···</p>
                </li>
              )
            } else {
              return (
                <li>
                  <img src={i.pic_url} />
                </li>
              )
            }
          })}
        </ul>
      </div>

    )
  }

  public state = {
    productImg: [],
    urlNull: "hide",
  }
  //over
}



export default ParkCompany;
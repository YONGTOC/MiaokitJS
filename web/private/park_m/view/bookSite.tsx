import * as React from "react";
import * as RouterDOM from 'react-router-dom';
import { DatePicker, List , Toast} from 'antd-mobile';
import DataService from "dataService";
import GlobalAction from "compat";
import "css!./styles/antd-mobile.css";
import "css!./styles/resetAntdMobile.css"

class BookSite extends React.Component {
  public constructor(props) {
    super(props);
    BookSite.toggleView = this.toggleView.bind(this);
    BookSite.getSiteinfo = this.getSiteinfo.bind(this);
  }

  public globalAction: GlobalAction = new GlobalAction();

  static getSiteinfo(id) { }
  public getSiteinfo(id) {
    console.log("getCompanyinfo", id);

    this.toggleView("Info", id);
    BookInfo.getRoomdata(id);
  }

  static toggleView(a, id) { };
  public toggleView(a, id) {
    console.log("fl", a);
    console.log("fl", id);
    if (a == "Info") {
      this.setState({
        showList: false,
        showInfo: true,
        companyInfotit: "hide",
      })
    } else {
      this.setState({
        showList: true,
        showInfo: false,
        companyInfotit: "companyInfotit",
      })
    }
  }

  public mapReturnpark() {
    //通知3d，返回园区视角  
    this.globalAction.web_call_webgl_mapReturnpark();
  }


  public render() {
    return (
      <div className={this.state.BookSitecss}>
        <p className={this.state.companyInfotit}>
          <span>场地预约</span>
        </p>
        <div className={this.state.showList == true ? "show" : "hide"}>
          <BookList />
        </div>
        <div className={this.state.showInfo == true ? "show" : "hide"}>
          <BookInfo />
        </div>
      </div >
    )
  }

  public state = {
    BookSitecss: "bookSite",
    // 场地列表页
    showList: true,
    // 场地内容页
    showInfo: false,
    // 场地预约页
    showBook: false,
    companyInfotit: "companyInfotit",
  }
}


export default BookSite;

// 场地列表
class BookList extends React.Component {
  public constructor(props) {
    super(props);

    this.getRoomBook = this.getRoomBook.bind(this);
  }

  public componentDidMount() {
    //##16.(场地预定模块-搜索)通过园区id获取园区内可以预定的场地列表接口 ###
    this.dataService.getRoomBook(this.getRoomBook, this.state.park_id, name);
  }

  public dataService: DataService = new DataService();
  public globalAction: GlobalAction = new GlobalAction();

  //获取园区内可以预定的场地列表
  public getRoomBook(data) {
    // console.log("returnRoomBook", typeof data);
    console.log("returnRoomBook222", data);
    if (data.response) {
      this.setState({
        nullBookData: "hide",
        bookData: data.response,
      })
    } else {
      this.setState({
        bookData: [],
        nullBookData: "show"
      })
      console.log("没有符合条件的结果");
    }

  }

  public toggleFold() {
    console.log("tftft")
    if (this.state.bookListcss == "bookList-all") {
      this.setState({
        bookListcss: "bookList-part",
        bookul: "bookul"
      })
      //通知3d，继续加载模型  
      this.globalAction.web_call_webgl_continueloadModuler();
    } else {
      this.setState({
        bookListcss: "bookList-all",
        bookul: "bookul-all"
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

  // 点击更多，显示info;隐藏list；这里需要调用FindLease 的方法；
  public showInfo(a, id, name, e) {
    BookSite.toggleView(a, id);
    console.log("more", a, id, name, e);
    // 把ID传给info组件；
    BookInfo.getRoomdata(id);
  }

  public bookActive(index, id,title,building, floor, room) {
    console.log("active", index, id);
    this.setState({
      indexOf: index,
      roomId: id
    });
    console.log("bookActive", this.state);
    //通知webgl 跳转到 选中房间；
    let roomData = {
       m_pTile: title,
      m_pBuilding: building,
      m_pLayer: floor,
      m_pRoom: room,
    }
    this.globalAction.web_call_webgl_switchRoom(roomData);
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
    });
  }

  // 软键盘 搜索
  public queryKeyDownHandler(e) {
    switch (e.keyCode) {
      case 13://回车事件
        this.searchRoomBook();
        break
    }
  }

  public searchRoomBook() {
    console.log("搜索", this.state);
    // 关键词筛选 name
    this.dataService.getRoomBook(this.getRoomBook, this.state.park_id, this.state.inputValue);
  }

  // 图片地址存在，图片文件丢失
  public onError() {
    this.setState({
      imageUrl: "https://yongtoc-digitalcity.oss-cn-shenzhen.aliyuncs.com/images/9982b35c62bd7376bc29c5e1ef12ae6b.jpg"
    })
  }

  //返回园区map
  public mapReturnpark() {
    //通知3d，返回园区视角
    this.globalAction.web_call_webgl_mapReturnpark();
  }

  public render() {
    //<p onClick={this.showInfo.bind(this, "Info", "id", "name")} >更多 </p>
    return (
      <div className={this.state.bookListcss}>
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
        <ul className={this.state.bookul}>
          <li className={this.state.nullBookData}><p>没有符合条件的结果</p></li>
          {this.state.bookData.map((i, index) => {
              return (
                <li onClick={this.bookActive.bind(this, index, i.id, i.project_title, i.building_code, i.floor_code, i.room_code)} className={this.state.indexOf == index ? "bookli-active" : "bookli"}>
                  <div className={this.state.indexOf == index ? "bookImgback-active" : "bookImgback"}>
                    <img  src={i.headimgurl ==  null ?  this.state.imgurlNull:  i.headimgurl }   />
                  </div>
                  <div className="bookul-middle">
                    <p style={{ "font-size": "2.4rem", "font-weight": "bold" }}>{i.name}</p>
                    {i.price.map((it, index) => {
                      return (
                        <p style={{ "font-size": "2.5rem" }}>{it.content}：<span className={"bookPrice"}>{it.price}</span> <span className="priceYuan">元</span></p>
                      )
                    })}
                  </div>
                  <div className="bookul-right">
                    <p onClick={this.showInfo.bind(this, "Info", i.id, "name")} className={this.state.indexOf == index ? "show" : "hide"}>更多
                  <i className="iconfont" style={{ "fontSize": "2rem" }}>&#xe827;</i>
                    </p>
                  </div>
                </li>
              )
            

          })}
        </ul>
        <form action='' target="rfFrame">
          <div className={"bookBtn"}>
            <div className="searchBox">
              <span className="searchBox-text">
                <span className="iconfont" style={{ "fontSize": "2.3rem" }}>&#xe810;</span>
                <input className="leaseSearch" type="search" placeholder="搜索"
                  value={this.state.inputValue} onFocus={this.foucus.bind(this)}
                  onBlur={this.blur.bind(this)} onChange={this.change.bind(this)} onKeyDown={this.queryKeyDownHandler.bind(this)} />
              </span>
            </div>

          </div>
        </form>
        <iframe id="rfFrame" name="rfFrame" src={this.state.src} style={{ display: "none" }}>   </iframe>
      </div>
    )
    // <span className="searchBtn" onClick={this.searchRoomBook.bind(this)}>搜索</span>
  }

  public state = {
    imgurlNull: "https://yongtoc-digitalcity.oss-cn-shenzhen.aliyuncs.com/images/9982b35c62bd7376bc29c5e1ef12ae6b.jpg",
    // 场地列表页样式
    bookListcss: "bookList-part",
    iconfont: "iconfont iconfont-unturn",
    // 场地列表样式
    bookul: "bookul",
    // 当前序列号
    indexOf: -1,
    park_id: 1,
    // 搜索框内容
    inputValue: "搜索",
    // 场地列表数据
    bookData: [],
    nullBookData: "hide",
    //设置 点击软键盘搜索，页面不刷新
    src: "about:'blank'",
    bookImgback: "bookImgback",
  }
}


// 更多-》场地信息页 -- Bookinfo
class BookInfo extends React.Component {
  public constructor(props) {
    super(props);

    BookInfo.showList = this.showList.bind(this);
    this.toggleFold = this.toggleFold.bind(this);
    BookInfo.getRoomdata = this.getRoomdata.bind(this);
    BookInfo.hideBookFa = this.hideBookFa.bind(this);
    this.setBookdata = this.setBookdata.bind(this);

  }

  public dataService: DataService = new DataService();
  static getRoomdata(id) { }
  public getRoomdata(id) {
    // 通过id，获取场地信息 -- 17#；
    this.dataService.getRoomBookInfo(this.setBookdata, id);
  }

  // 获取场地详情，给子组件显示；
  static setBookdata(data) { }
  public setBookdata(data) {
    console.log("setBookdata,setBookdata", data);
    this.setState({
     // building_name: data.response.building_name,
     // floor_name: data.response.floor_name,
      name: data.response.name,
      id:data.response.id,
    })
    SiteInfos.getInfos(data);
    Notes.getNotes(data);
    BookRoom.getRoomdata(data);
  }

  static showList(a, id) { };
  public showList(a, id) {
    console.log("showList", a);
    BookSite.toggleView(a, id);
    this.setState({
      infoli: 0,
      bookInfocss: "bookInfos",
    })
  }

  // 切换内容框css
  public toggleFold() {
    console.log("tftft", this.state.infoli)
    if (this.state.infoli == 2) {
      if (this.state.bookInfocss == "bookInfos") {
        this.setState({
          bookInfocss: "bookInfos-all",
          //leaseul: "leaseul"
             bookSumbit:"hide",
        })
      } else {
        this.setState({
          bookInfocss: "bookInfos",
          // leaseul: "leaseul-all"
               bookSumbit:"hide",
        })
      }
    } else {
      if (this.state.bookInfocss == "bookInfos") {
        this.setState({
          bookInfocss: "bookInfos-part",
          //leaseul: "leaseul";  bookSumbit :hide;
          bookSumbit:"hide"
        })

      } else {
        this.setState({
          bookInfocss: "bookInfos",
          bookSumbit:"bookSumbit",
          // leaseul: "leaseul-all";   bookSumbit :bookSumbit;
        })
      }
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

  // 切换显示子组件
  public infoClick(indexof) {
    console.log("infoClick", indexof);
    if (indexof == 2) {
      this.setState({
        infoli: indexof,
        bookSumbit: "hide",
      });
    } else {
      this.setState({
        infoli: indexof,
        bookSumbit: "bookSumbit",
      });
    }
 
    
  }

  //供预定页面调用的显示隐藏
  static hideBookFa() {}
  public hideBookFa() {
    this.setState({
      infoli: 0,
      bookSumbit:"bookSumbit",
    })
  }

  public render() {
    // <span className="iconfont companyInfoicon" onClick={this.showList.bind(this, "List", "id-01")}>&#xe83b;</span>
    return (
      <div className={this.state.bookInfocss}>
        <p className="companyInfotit">
          <span className={this.state.infoli !== 2 ? "show" : "hide"}>{this.state.name}</span>
          <span className={this.state.infoli == 2 ? "show" : "hide"}>预定申请</span>
        </p>
        <div className={"foleBtn"} >
          <p className="companyGoHomeLeft" onClick={this.showList.bind(this, "List", "id-01")}>
            <i className="iconfont companyInfoicon">&#xe83b;</i>
            <span>返回</span>
          </p>
          <p className="companyGoHomeRight">
            <i className={this.state.iconfont} style={{ "fontSize": "5rem", "color": "#C0C0C0" }} onClick={this.toggleFold.bind(this)} >&#xe849;</i>
          </p>
        </div>
        <div className={this.state.infoli !== 2 ? "leaseInfoul" : "hide"}>
          <ul className={this.state.bookInfoul}>
            <li className={this.state.infoli == 0 ? "bookInfoli-active" : "bookInfoli"} onClick={this.infoClick.bind(this, 0)} >场地信息</li>
            <li className={this.state.infoli == 1 ? "bookInfoli-active" : "bookInfoli"} onClick={this.infoClick.bind(this, 1)} >使用须知</li>
          </ul>
        </div>
        <div className="infoContain">
          <div className={this.state.infoli == 0 ? "show" : "hide"}>
            <SiteInfos />
          </div>
          <div className={this.state.infoli == 1 ? "show" : "hide"}>
            <Notes />
          </div>
          <div className={this.state.infoli == 2 ? "show" : "hide"}>
            <BookRoom />
          </div>
          <div className={this.state.bookSumbit} onClick={this.infoClick.bind(this, 2)}>预定</div>
        </div>
      </div>
    )
    //   <div className={this.state.infoli !== 2  ? "bookSumbit" : "hide"} onClick={this.infoClick.bind(this, 2)}>预定</div>

  }

  public state = {
    // 场地信息页样式
    bookInfocss: "bookInfos",
    // 折叠按钮样式
    iconfont: "iconfont iconfont-turn",
    // 楼宇
    building_name: "",
    // 楼层
    floor_name: "",
    // 房间
    room_name: "",
    // 当前序列
    infoli: 0,
    // 场地信息ul样式
    bookInfoul: "bookInfoul",
    leaseInfoul: "leaseInfoul_br",
    //场地名称
    name: "",
    bookSumbit:"bookSumbit",
  }
}

//预定申请-》BookingRoom
class BookRoom extends React.Component {
  public constructor(props) {
    super(props);

    BookRoom.getRoomdata = this.getRoomdata.bind(this);
  }

  public componentDidMount() {
    //获取：
    //let enterprises = JSON.parse(localStorage.getItem("enterprises"));
    //console.log("enterprises--------", enterprises)
    //let applicant = localStorage.getItem("userName");
    //let phone = localStorage.getItem("phone");
    //let staff_id = localStorage.getItem("userid");
    //console.log("--------", applicant, phone, staff_id)
    let data = sessionStorage.getItem("userInfos");
    let dataObj = JSON.parse(data)
    this.setState({
      applicant: dataObj.name,
      phone: dataObj.phone,
      staff_id: dataObj.userId,
      //companyUL: dataObj.enterprises,
      //company: dataObj.enterprises[0].name,
      //company_id: dataObj.enterprises[0].id,
  
    })
  

    if (dataObj.enterprises.length == 0) {
      this.setState({
        companyUL: [],
        company: "请先关联企业",
        company_id: "请先关联企业",
      })
    } else {
      this.setState({
        companyUL:[],
        company: sessionStorage.getItem("enterprise") ,
        company_id:sessionStorage.getItem("enterpriseId") ,
      })
    }
  }

  public globalAction: GlobalAction = new GlobalAction();

  static getRoomdata(data) { };
  public getRoomdata(data) {
    console.log("getBook", data);
    this.setState({
      id: data.response.id,
      building_id: data.response.building_id,
      floor_id: data.response.floor_id,
      room_id: data.response.id,
      building_name: data.response.building_name,
      floor_name: data.response.floor_name,
      room_name: data.response.name,
      times_list:data.response.times,
    })
  }

  public toggleFold() {
    if (this.state.iconfont == "iconfont iconfont-unturn") {
      this.setState({
        iconfont: "iconfont iconfont-turn",
      })
    } else {
      this.setState({
        iconfont: "iconfont iconfont-unturn",
      })
    }

    if (this.state.bookRoom == "bookRoom-part") {
      this.setState({
        bookRoom: "bookRoom-all",
        bookformcss: "bookform-all ",
      })
      //
      // 通知3d，暂停加载模型
      this.globalAction.web_call_webgl_pauseloadModuler();
    } else {
      this.setState({
        bookRoom: "bookRoom-part",
        bookformcss: "bookform-part"
      })
      //通知3d，继续加载模型  
      this.globalAction.web_call_webgl_continueloadModuler();
    }
  }

  // 聚焦具体需求
  focusBookContent() {
    if (this.state.content === "请将具体需求描述出来。（200字内）") {
      this.setState({ content: "" })
    }
  }

  // 失焦具体需求
  blurBookContent() {
    if (this.state.content === "") {
      this.setState({ content: "请将具体需求描述出来。（200字内）" })
    }
  }


  // 输入具体需求
  public changebookContent(event) {
    event.target.value = event.target.value.replace(/[, ]/g,'')
    this.setState({
      content: event.target.value,
    });
  }

  //输入主题
  public changebookTheme(event) {
    event.target.value = event.target.value.replace(/[, ]/g,'')
    this.setState({
      theme: event.target.value,
    });
  }

  // 聚焦主题
  public foucusbookTheme() {
    if (this.state.theme === "50字内") {
      this.setState({ theme: "" })
    }
  }

  //计算时间，个位数填0；
  public p(s) {
    return s < 10 ? '0' + s : s
  }

  public setStartTime(date) {
    console.log('开始时间', date);

    // 判断date 晚于当前时间；
    const d = new Date(date)
    var now = new Date();
   // console.log('当前时间', now);
    if (now > d) {    
        Toast.info('开始时间，不能早于当前时间');
    } else {
      //console.log('当前时间2222222');
    const resDate = d.getFullYear() + '-' + this.p((d.getMonth() + 1)) + '-' + this.p(d.getDate())
    const resTime = this.p(d.getHours()) + ':' + this.p(d.getMinutes()) + ':' + this.p(d.getSeconds())
    const startDate = resDate + " " + resTime
    console.log("start输入index656", startDate);
    this.setState({
      startTime: date,
      start_date: startDate,
      // start_time: resTime
    });
    }
  // console.log("start输入index2", this.state.startTime);
    //over
  }

  public setEndTime(date) {
    console.log('结束时间', date);
    const d = new Date(date)
    var now = new Date();

    if (now > d) {
      Toast.info('结束时间，不能早于当前时间');
    } else {
    const resDate = d.getFullYear() + '-' + this.p((d.getMonth() + 1)) + '-' + this.p(d.getDate())
    const resTime = this.p(d.getHours()) + ':' + this.p(d.getMinutes()) + ':' + this.p(d.getSeconds())
    const endDate = resDate + " " + resTime
    // console.log("end输入index656", endDate);
    this.setState({
      endTime: date,
      end_date: endDate,
      // end_time: resTime
    });
    }
    // console.log("end输入index2", this.state.endTime);
     //over
  }

  // 显示公司列表
  public showCompanyBox() {
    this.setState({
      companyBox: "rollSelectCauseBox",
      company_id_in: this.state.companyUL[this.state.companyIndexof].id,
      company_name_in: this.state.companyUL[this.state.companyIndexof].name,
    })
  }

  // 选中公司
  public inCompanyeList(i, id, name) {
    // console.log("选中的公司", i, id, name);
    this.setState({
      companyIndexof: i,
      company_id_in: id,
      company_name_in: name,
    })
  }

  // 隐藏公司列表框
  public hideCompanyBox() {
    this.setState({
      companyBox: "hide",
    })
  }

  //确认公司列表选择
  public getCompanyBox() {
    this.setState({
      companyBox: "hide",
      company_id: this.state.company_id_in,
      company: this.state.company_name_in,
    })
  }

  public dataService: DataService = new DataService();
  // 提交预约申请 
  public bookSumbit() {

    console.log('endTime--',this.state.endTime)
    console.log('startTime--', this.state.startTime);
 
    var s=new Date(this.state.start_date).getTime();
    var d = new Date(this.state.end_date).getTime();

    if (s > d) {   // 开始时间 晚于 结束时间
      Toast.info('开始时间，不能晚于结束时间');
    } else if ( d-s < 3600000  )  {   //    结束时间 - 开始时间 < 一分钟
       Toast.info('最短使用时间：一小时');
    }else if (this.state.start_date == "") {
       Toast.info('请选择开始时间', 2);
    } else if (this.state.end_date == "") {
       Toast.info('请选择结束时间', 2);
    } else if (this.state.theme == "") {
      Toast.info('请输入会议主题', 2);
    } else if (this.state.content == "") {
      Toast.info('请输入会议具体需求', 2);
    }else if (this.state.company == "请先关联企业" ) {
      Toast.info('请先前往关联企业', 2);
    }else if (this.state.phone == "") {
      Toast.info('请先绑定手机号码', 2);
    } else {
      this.dataService.bookingRoom(this.bookSumbitOK, this.state);
    }

  }

  showInfos() {
    BookInfo.hideBookFa();

  }

  //提交成功
  public bookSumbitOK(data) {
    Toast.info(data, 2);
    BookInfo.showList("List", "");
  }

  public render() {
    return (
      <div className={this.state.bookRoom}>
        <div className={"foleBtn"} >
          <p className="companyGoHomeLeft" onClick={this.showInfos.bind(this, "List", "id-01")}>
            <i className="iconfont companyInfoicon">&#xe83b;</i>
            <span>返回</span>
          </p>
          <p className="companyGoHomeRight">
            <i className={this.state.iconfont} style={{ "fontSize": "5rem", "color": "#C0C0C0" }} onClick={this.toggleFold.bind(this)} >&#xe849;</i>
          </p>
        </div>
        <form className={this.state.bookformcss}>
          <ul className={"bookfromul"}>
            <li>
              <span className={"applySpanleft"}><span className="redStar">*</span>申请人</span>
              <p className={"bookRight"} style={{ "padding-left": "1rem", "padding-top": "0.5rem" }} >{this.state.applicant}</p>
            </li>
            <li>
              <span className="redStar">*</span>手机号码
               <input type="text" value={this.state.phone} placeholder="请先绑定手机号码  " style={{ "margin-left": "2rem", "border": "0" }}  readOnly />
            </li>
            <li>
              <span className="redStar">*</span>申请企业
              <p className={"bookfromliRight"} style={{ "line-height": " 4rem" }}>{this.state.company}</p>
            </li>
            <li className={"bookActive"}>
              <span className={"bookformLeft"}><span style={{ "color": "#F2F2F2", "margin-right": "1rem" }}>*</span>使用场地</span>
              <p className={"bookfromliRight"} style={{ "line-height": "3.5rem" }}>
                {this.state.room_name}
              </p>
            </li>

            <li>
              <p >
                <span className="redStar" style={{ "float": "left", "margin-top": "0.8rem", "margin-right":"0rem" }}>*</span>
                <div style={{ "fonSize": "2.5rem" }} className={"mDate"}>
                  <DatePicker style={{ "fonSize": "2.5rem" }}
                    value={this.state.startTime}
                    onChange={this.setStartTime.bind(this)} >
                    <List.Item arrow="horizontal">开始时间</List.Item>
                  </DatePicker>
                </div>
              </p>
            </li>

            <li>
              <p>
                <span className="redStar" style={{ "float": "left", "margin-top": "0.8rem" , "margin-right":"0rem" }}>*</span>
                <div style={{ "fonSize": "2.5rem" }} className={"mDate"}>
                  <DatePicker style={{ "fonSize": "2.5rem" }}
                    value={this.state.endTime}
                    onChange={this.setEndTime.bind(this)} >
                    <List.Item arrow="horizontal">结束时间</List.Item>
                  </DatePicker>
                </div>
              </p>
            </li>
            <li style={{ "border": "0", "padding": "1rem 0 0 0" }}>
              <p><span className="redStar">*</span><span style={{ "font-size": "2.3rem", "margin-top": "1rem" }}>会议主题：</span></p>
              <textarea className="bookTheme" value={this.state.theme}
                onChange={this.changebookTheme.bind(this)} onFocus={this.foucusbookTheme.bind(this)} ></textarea>
            </li>
            <li>
              <p><span className="redStar">*</span><span style={{ "font-size": "2.3rem" }}>具体需求：</span></p>
              <textarea className="bookContent" value={this.state.content} style={{ "margin-bottom": "0rem" }}
                onFocus={this.focusBookContent.bind(this)} onBlur={this.blurBookContent.bind(this)}
                onChange={this.changebookContent.bind(this)} ></textarea>
            </li>
          </ul>
          <p>已被预定时段</p>
          <table className="bookTable" style={{ "margin-bottom": "15rem" }}>
            <tr >
              <th>序号</th>
              <th>开始时间</th>
              <th>结束时间</th>
            </tr>
              {this.state.times_list.map((i,index) => {
              return (
                <tr >
                  <th>{index + 1}</th>
                  <th>{i.starttime.substring(0,16)}</th>
                  <th>{i.endtime}</th>
                </tr>
                )
          })}
          </table>

          <div className="bookSumbit" onClick={this.bookSumbit.bind(this)}>提交</div>
        </form>

        <div className={this.state.companyBox}>
          <ul className="rollSelectCauseULcss">
            {this.state.companyUL.map((i, index) => {
              return (
                <li className={this.state.companyIndexof == index ? "rollSelectCauseli-active" : "rollSelectCauseli"}
                  onClick={this.inCompanyeList.bind(this, index, i.id, i.name)}
                >{i.name}</li>
              )
            })}
          </ul>
          <div className="rollSelectCuasedBtn">
            <span className="rollSelectCancel" onClick={this.hideCompanyBox.bind(this)} >取消</span>
            <span className="rollSelectConfirm" onClick={this.getCompanyBox.bind(this)}>确认</span>
          </div>
        </div>

      </div>
    )
  }

  public state = {
    startTime: "",
    endTime: "",
    iconfont: "iconfont iconfont-unturn",
    bookRoom: "bookRoom-part",
    bookformcss: "bookform-part",
    // 公司选择
    companyBox: "show",
    companyUL: [],
    companyIndexof: 0,
    company_id_in: "",
    company_name_in: "",
    //id
    id: "",
    //申请人
    applicant: "",
    //手机号码
    phone: "",
    //申请企业
    company: "",
    //使用场地
    name: "",
    //使用场地对应大楼id，模型编号(用于匹配对应3d大楼)
    building_id: "",
    //使用场地对应大楼id，模型编号(用于匹配对应3d大楼)
    floor_id: "",
    //使用场地，模型编号(用于匹配对应3d房间)
    room_id: "",
    building_name: "",
    floor_name: "",
    room_name: "",
    //开始日期
    start_date: "",
    //开始时间
    start_time: "",
    //结束日期
    end_date: "",
    //结束时间
    end_time: "",
    //主题
    theme: "50字内",
    //具体需求
    content: "请将具体需求描述出来。（200字内）",
    times_list:[],
  }

}


//左-》场地信息 siteInfos
class SiteInfos extends React.Component {
  public constructor(props) {
    super(props);

    SiteInfos.getInfos = this.getInfos.bind(this);
  }

  public componentDidMount() {
    console.log("场地信息,场地信息");
  }

  static getInfos(data) { };
  public getInfos(data) {
    console.log("getinfo", typeof data.response.descript);
    console.log("getinfo",  data.response.descript);
    document.getElementById("siteInfosbox").innerHTML = data.response.descript;
  }

  public render() {
    return (
      <div className={"siteInfosbox"} id="siteInfosbox">
      </div>
    )

  }

  public state = {
    descript: [],
    descriptS: "",
  }

}


//右-》使用须知
class Notes extends React.Component {
  public constructor(props) {
    super(props);

    // Picshow.setPicshow = this.setPicshow.bind(this);
    Notes.getNotes = this.getNotes.bind(this);

  }

  public componentDidMount() {
    console.log("使用须知,使用须知")
  }

  static getNotes(data) { };
  public getNotes(data) {
    console.log("NotesNotes", data);
    
    document.getElementById("notesBox").innerHTML = data.response.guide;

    //this.setState({
    //  guide: data.response.guide,
    //})
  }

  public render() {
    return (
      <div className={"notesBox"} id="notesBox">
       
      </div>
    )
  }

  public state = {
    guide: "",
  }

}
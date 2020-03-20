import * as React from "react";
import * as RouterDOM from 'react-router-dom';
import DataService from "dataService";
import GlobalAction from "compat";

class BookSite extends React.Component {
  public constructor(props) {
    super(props);
    BookSite.toggleView = this.toggleView.bind(this);
  }

  public globalAction: GlobalAction = new GlobalAction();

  static toggleView(a, id) { };
  public toggleView(a, id) {
    console.log("fl", a);
    console.log("fl", id);
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

  public mapReturnpark() {
    //通知3d，返回园区视角  
    this.globalAction.web_call_webgl_mapReturnpark();
  }


  public render() {
    return (
      <div className={this.state.BookSitecss}>
        <p className="companyInfotit">
          <RouterDOM.Link to="/home" onClick={this.mapReturnpark.bind(this)}>
            <i className="iconfont companyInfoicon">&#xe83b;</i>
          </RouterDOM.Link>
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
    showList: true,
    showInfo: false,
    showBook: false,
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
    console.log("returnRoomBook", data);
    this.setState({
      bookData: data.response,
    })
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

  public bookActive(index, id) {
    console.log("active", index, id);
    this.setState({
      indexOf: index,
      roomId: id
    });
    console.log("bookActive", this.state)
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


  public searchRoomBook() {
    console.log("搜索", this.state);
    // 关键词筛选 name
    this.dataService.getRoomBook(this.getRoomBook, this.state.park_id, this.state.inputValue);
  }

  public render() {
    //<p onClick={this.showInfo.bind(this, "Info", "id", "name")} >更多 </p>
    return (
      <div className={this.state.bookListcss}>
        <div className={"foleBtn"} onClick={this.toggleFold.bind(this)}>
          <i className={this.state.iconfont} style={{ "fontSize": "5rem" }}>&#xe849;</i>
        </div>
        <ul className={this.state.bookul}>
          {this.state.bookData.map((i, index) => {
            return (
              <li onClick={this.bookActive.bind(this, index, i.id)} className={this.state.indexOf == index ? "bookli-active" : "bookli"}>
                <div className="bookImgback">
                  <img src={i.headimgurl} />
                </div>
                <div className="bookul-middle">
                  <p style={{ "font-size": "2.4rem", "font-weight": "bold" }}>{i.building_id}-{i.floor_id}-{i.room_id}</p>
                  {i.price.map((it, index) => {
                    return (
                      <p style={{ "font-size": "2.5rem" }}>{it.content}：<span className={"bookPrice"}>{it.price}</span> </p>
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
        <div className={"bookBtn"}>
          <div className="searchBox">
            <span className="searchBox-text">
              <span className="iconfont" style={{ "fontSize": "3rem" }}>&#xe810;</span>
              <input className="leaseSearch" type="text" placeholder="搜索"
                value={this.state.inputValue} onFocus={this.foucus.bind(this)}
                onBlur={this.blur.bind(this)} onChange={this.change.bind(this)} />
            </span>
          </div>
          <span className="searchBtn" onClick={this.searchRoomBook.bind(this)}>搜索</span>
        </div>
      </div>
    )

  }

  public state = {
    bookListcss: "bookList-part",
    iconfont: "iconfont iconfont-unturn",
    bookul: "bookul",
    indexOf: 0,
    park_id: 1,
    // 搜索框内容
    inputValue: "搜索",
    bookData: []
  }
}


// 更多-》场地信息页 -- Bookinfo
class BookInfo extends React.Component {
  public constructor(props) {
    super(props);

    BookInfo.showList = this.showList.bind(this);
    this.toggleFold = this.toggleFold.bind(this);
    BookInfo.getRoomdata = this.getRoomdata.bind(this);
    this.setBookdata = this.setBookdata.bind(this);
  }

  public dataService: DataService = new DataService();
  static getRoomdata(id) { }
  public getRoomdata(id) {
    // 通过id，获取场地信息；
    this.dataService.getRoomBookInfo(this.setBookdata, id);
  }

  // 获取场地详情，给子组件显示；
  static setBookdata(data) { }
  public setBookdata(data) {
    console.log("setBookdata,setBookdata", data);
    this.setState({
      building: data.response.building_id,
      floor: data.response.floor_id,
      room: data.response.room_id,
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
        })
      } else {
        this.setState({
          bookInfocss: "bookInfos",
          // leaseul: "leaseul-all"
        })
      }
    } else {
      if (this.state.bookInfocss == "bookInfos") {
        this.setState({
          bookInfocss: "bookInfos-part",
          //leaseul: "leaseul"
        })
      } else {
        this.setState({
          bookInfocss: "bookInfos",
          // leaseul: "leaseul-all"
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
    this.setState({
      infoli: indexof,
    });
  }

  public render() {
    return (
      <div className={this.state.bookInfocss}>
        <p className="companyInfotit">
          <span className="iconfont companyInfoicon" onClick={this.showList.bind(this, "List", "id-01")}>&#xe83b;</span>
          <span className={this.state.infoli !== 2 ? "show" : "hide"}>{this.state.building}-{this.state.floor}-{this.state.room}</span>
          <span className={this.state.infoli == 2 ? "show" : "hide"}>预定申请</span>
        </p>
        <div className={"foleBtn"} onClick={this.toggleFold.bind(this)}>
          <i className={this.state.iconfont} style={{ "fontSize": "5rem" }}>&#xe849;</i>
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
          <div className={this.state.infoli !== 2 ? "bookSumbit" : "hide"} onClick={this.infoClick.bind(this, 2)}>预定</div>
        </div>
      </div>
    )

  }

  public state = {
    bookInfocss: "bookInfos",
    iconfont: "iconfont iconfont-unturn",
    building: "A",
    floor: "1F",
    room: "206",
    infoli: 0,
    bookInfoul: "bookInfoul",
    leaseInfoul: "leaseInfoul_br",
  }
}

//预定申请-》BookingRoom
class BookRoom extends React.Component {
  public constructor(props) {
    super(props);

    BookRoom.getRoomdata = this.getRoomdata.bind(this);
  }

  public componentDidMount() {
    console.log("NotesNotesNotes")
  }

  public globalAction: GlobalAction = new GlobalAction();

  static getRoomdata(data) { };
  public getRoomdata(data) {
    console.log("getBook", data);
    this.setState({
      id: data.response.id ,
      building_id: data.response.building_id ,
      floor_id: data.response.floor_id ,
      room_id: data.response.room_id ,
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
        bookformcss:"bookform-all "
      })
      // 通知3d，暂停加载模型
      this.globalAction.web_call_webgl_pauseloadModuler();
    } else {
      this.setState({
        bookRoom: "bookRoom-part",
        bookformcss:"bookform-part"
      })
      //通知3d，继续加载模型  
      this.globalAction.web_call_webgl_continueloadModuler();
    }
  }

  // 输入具体需求
  public changebookContent(event) {
    this.setState({
      content: event.target.value,
    });
  }

  //输入主题
  public changebookTheme(event) {
    this.setState({
      theme: event.target.value,
    });
  }


  public dataService: DataService = new DataService();
  // 提交预约申请 
  public bookSumbit() {
    console.log("bookSumbit",this.state);
    this.dataService.bookingRoom(this.bookSumbitOK, this.state);
  }

  //提交成功
  public bookSumbitOK(data) {
    alert(data);
   //BookInfo.showList("List", "id-01");
  }


  public render() {
    return (
      <div className={this.state.bookRoom}>
        <div className={"foleBtn"} onClick={this.toggleFold.bind(this)}>
          <i className={this.state.iconfont} style={{ "fontSize": "5rem" }}>&#xe849;</i>
        </div>
        <form className={this.state.bookformcss}>
          <ul className={"bookfromul"}>
          <li>
              <span className={"bookformLeft"}><span className="redStar">*</span>申请人</span>
              <p className={"bookfromliRight"}>
                <input type="text" value={this.state.applicant} placeholder="请输入联系人姓名" />
              </p>
          </li>
          <li>
              <span className={"bookformLeft"}> <span className="redStar">*</span>手机号码</span>
              <p className={"bookfromliRight"}>
                <input type="number" value={this.state.phone} placeholder="请输入联系人姓名" />
              </p>
          </li>
          <li>
              <span className={"bookformLeft"}><span className="redStar">*</span>申请企业</span>
              <p className={"bookfromliRight"}>
                <input type="text" value={this.state.company} placeholder="请输入企业名称" />
              </p>
          </li>
            <li className={"bookActive"}>
              <span className={"bookformLeft"}><span style={{ "color": "#F2F2F2", "margin-right": "1rem" }}>*</span>使用场地</span>
              <p className={"bookfromliRight"}>
                {this.state.building_id}-{this.state.floor_id}-{this.state.room_id}  
              </p>
          </li>
          <li>
              <span className={"bookformLeft"}><span className="redStar">*</span>开始日期</span>
              <p className={"bookfromliRight"}>
                <input type="text" value={this.state.start_date} placeholder="请选择开始日期" />
                <i className="iconfont" style={{ "color":" #158CE8","float": "right","font-size": "3rem"}}>&#xe82d;</i>
              </p>
          </li>
          <li>
              <span className={"bookformLeft"}><span className="redStar">*</span>开始时间</span>
              <p className={"bookfromliRight"}>
                <input type="text" value={this.state.start_time} placeholder="请选择开始时间" />
                <i className="iconfont" style={{ "color": " #949494", "float": "right", "font-size": "3rem" }}>&#xe827;</i>
              </p>
          </li>
          <li>
              <span className={"bookformLeft"}><span className="redStar">*</span>结束日期</span>
              <p className={"bookfromliRight"}>
                <input type="text" value={this.state.end_date} placeholder="请选择结束日期" />
                <i className="iconfont" style={{ "color": " #158CE8", "float": "right", "font-size": "3rem" }}>&#xe82d;</i>
              </p>
          </li>
          <li>
              <span className={"bookformLeft"}><span className="redStar">*</span>结束时间</span>
              <p className={"bookfromliRight"}>
                <input type="text" value={this.state.end_time} placeholder="请选择结束时间" />
                <i className="iconfont" style={{ "color": " #949494", "float": "right", "font-size": "3rem" }}>&#xe827;</i>
              </p>
          </li>
          <li>
            <p><span className="redStar">*</span>会议主题：</p>
              <textarea className="bookTheme" value={this.state.theme} placeholder="50字内"
                onChange={this.changebookTheme.bind(this)}></textarea>
          </li>
          <li>
            <p><span className="redStar">*</span>具体需求：</p>
              <textarea className="bookContent" value={this.state.content}
                placeholder="50请将具体需求描述出来。（200字内）"
                onChange={this.changebookContent.bind(this)}></textarea>
            </li>
          </ul>
          <div className="bookSumbit" onClick={this.bookSumbit.bind(this)}>提交</div>
        </form>
      </div>
    )
  }

  public state = {
    iconfont: "iconfont iconfont-unturn",
    bookRoom: "bookRoom-part",
    bookformcss: "bookform-part",
      //id
      id: "",
      //申请人
      applicant: "赵xxx",
      //手机号码
      phone: "15211111111",
      //申请企业
      company: "永拓信息科技",
      //使用场地
      room: "",
      //使用场地对应大楼id，模型编号(用于匹配对应3d大楼)
      building_id: "",
      //使用场地对应大楼id，模型编号(用于匹配对应3d大楼)
      floor_id: "",
      //使用场地，模型编号(用于匹配对应3d房间)
      room_id: "",
      //开始日期
      start_date: "2020-02-28",
      //开始时间
      start_time: "19:30:00",
      //结束日期
      end_date: "2020-02-28",
      //结束时间
      end_time: "19:30:00",
      //主题
      theme: "",
      //具体需求
      content: "", 
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
    console.log("getinfo", data);
    this.setState({
      descript: data.response.descript,
    })
  }

  public render() {
    return (
      <div className={"siteInfosbox"}>
        <ul>
          {this.state.descript.map((i, index) => {
            return (
              <li>{index + 1}、{i.content} </li>
            )
          })}
        </ul>
      </div>
    )
  }

  public state = {
    descript: [],
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
    this.setState({
      guide: data.response.guide,
    })
  }

  public render() {
    return (
      <div className={"notesBox"}>
        <p>尊敬的企业： 您好，<span>{this.state.guide}</span></p>
      </div>
    )
  }

  public state = {
    guide: "",
  }

}
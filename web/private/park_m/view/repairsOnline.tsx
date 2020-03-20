import * as React from "react";
import * as RouterDOM from 'react-router-dom';
import DataService from "dataService";
import GlobalAction from "compat";

class RepairsOnline extends React.Component<{ history: any }>{
  public constructor(props) {
    super(props);

    this.setTypeUL = this.setTypeUL.bind(this);
    RepairsOnline.getReqairstpostion = this.getReqairstpostion.bind(this);
  }

  public componentDidMount() {
    // 19.(在线报修模块-报修类型)通过园区id获取在线报修类型
    this.dataService.getRepairType(this.setTypeUL);
  }

  public dataService: DataService = new DataService();
  public globalAction: GlobalAction = new GlobalAction();

  public setTypeUL(data) {
    console.log("getRepairType", data);
    this.setState({
      typeUL: data.response,
    })
  }

  public toggleFold() {
    console.log("reqairsOn");
    if (this.state.reqairscss == "reqairs-all") {
      this.setState({
        reqairscss: "reqairs-part",
        reqairscssul: "reqairsul-part reqairsul"
      })
      // 通知3d，继续加载模型  
      this.globalAction.web_call_webgl_continueloadModuler();
    } else {
      this.setState({
        reqairscss: "reqairs-all",
        reqairsul: "reqairsul-all reqairsul"
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

  public mapReturnpark() {
    //通知3d，返回园区视角
    this.globalAction.web_call_webgl_mapReturnpark();
  }

  static getReqairstpostion(x, y, building_id, floor_id, room_id) { };
  public getReqairstpostion(x, y, building_id, floor_id, room_id) {
    console.log("getReqairstpostion", x, y, building_id, floor_id, room_id)
    this.setState({
      building_id: building_id,
      floor_id: floor_id,
      room_id: room_id,
      position: "请输入报修位置",
      longitude: x,
      latitude: y,
    })
  }

  // input选择照片
  public reqairsImginput() {

  }

  // 显示图片
  public reqairsImgshow() {

  }

  //显示报修类型列表
  public showTypeUL() {
    this.setState({
      typeULBox: "typeULBox"
    })
  }

  //选中报修类型
  public reqairsType(i, id, name) {
    this.setState({
      type_id: id,
      type_name: name,
      indexOf: i,
    })
  }

  // 报修类型列表  -- “确认”
  public gettypeUL() {
    this.setState({
      typeULBox: "hide"
    })
  }

  // 报修类型列表  -- “取消”
  public hidetypeUL() {
    this.setState({
      typeULBox: "hide",
      type_name: "",
      type_id: "",
    })
  }

  //报修位置  
  public getPosition(event) {
    this.setState({
      position: event.target.value
    })
  }

  //报修企业
  public reqairsCompany(event) {
    this.setState({
      company: event.target.value,
    })
  }

  //报修联系人
  public reqairsContacts(event) {
    this.setState({
      contact: event.target.value,
    })
  }

  //报修联系人电话
  public reqairsPhone(event) {
    this.setState({
      phone: event.target.value,
    })
  }

  //报修问题描述   
  public changeDescript(event) {
    this.setState({
      descript: event.target.value,
    })
  }

  //提交报修单
  public sumbitReqairs() {
    console.log("提交报修", this.state);
    this.dataService.saveRepairInfo(this.sumbitReqairssucceed, this.state);
  }

  //提交报修单 -- 成功
  public sumbitReqairssucceed(data) {
    alert(data);
    window.history.back();
  }

  public render() {
    return (
      <div className="repairsOnline">
        <p className="companyInfotit">
          <RouterDOM.Link to="/home" onClick={this.mapReturnpark.bind(this)}>
            <span className="iconfont companyInfoicon">&#xe83b;</span>
          </RouterDOM.Link>
          <span>在线报修</span>
        </p>

        <div className={this.state.reqairscss}>
          <div className={"foleBtn"} onClick={this.toggleFold.bind(this)}>
            <i className={this.state.iconfont} style={{ "fontSize": "5rem" }}>&#xe849;</i>
          </div>
          <form >
            <ul className={this.state.reqairsul} >
              <li>
                <span className="redStar">*</span>报修照片
                  <input type="file" accept="image/*" className="getillImg" value="" onClick={this.reqairsImginput.bind(this)} style={{ "opacity": "0", "position": "absolute", "right": "-16rem" }} />
                <img src={this.state.photo} onClick={this.reqairsImgshow.bind(this)} />
              </li>
              <li>
                <span className="redStar">*</span>报修类型
                 <input type="text" className="getillType" value={this.state.type_name} placeholder="请选择报修类型" />
                <span className="iconfont" style={{ "fontSize": "3rem", "float": "right", " padding": " 0 0 0 3rem", "padding": " 0 0 0 4rem" }}
                  onClick={this.showTypeUL.bind(this)}>&#xe827;</span>
              </li>
              <li>
                <span className="redStar">*</span>报修位置
                  <input type="text" value={this.state.position} placeholder="请输入报修位置" style={{ "margin-left": "4rem", "border": "0" }}
                  onChange={this.getPosition.bind(this)} />
                <i className="iconfont" style={{ "fontSize": "3rem", "color": "#0B8BF0", "float": "right", "padding": " 0 0 0 4rem" }}>&#xe82c;</i>
              </li>
              <li>
                <span className="redStar">*</span>报修企业
                <input type="text" value={this.state.company} placeholder="请填写报修企业" style={{ "margin-left": "4rem", "border": "0" }}
                  onChange={this.reqairsCompany.bind(this)} />
              </li>
              <li>
                <span className="redStar">*</span>联系人
                <input type="text" value={this.state.contact} placeholder="请填写联系人" style={{ "margin-left": "6rem", "border": "0" }}
                  onChange={this.reqairsContacts.bind(this)} />
              </li>
              <li>
                <span className="redStar">*</span>电话号码
                <input type="text" value={this.state.phone} placeholder="请填写联系电话号码 " style={{ "margin-left": "4rem", "border": "0" }}
                  onChange={this.reqairsPhone.bind(this)} />
              </li>
              <li>
                <p><span className="redStar">*</span>报修描述：</p>
                <textarea className="bookContent" value={this.state.descript} placeholder="请将报修问题描述出来。（120字内）"
                  onChange={this.changeDescript.bind(this)}></textarea>
              </li>
            </ul>
            <div className="reqairsSumbit" onClick={this.sumbitReqairs.bind(this)}>提交</div>
          </form>
        </div>

        <div className={this.state.typeULBox}>
          <ul className="illcauseULcss">
            {this.state.typeUL.map((i, index) => {
              return (
                <li className={this.state.indexOf == index ? "illcauseli-active" : "illcauseli"}
                  onClick={this.reqairsType.bind(this, index, i.id, i.name)}>{i.name}</li>
              )
            })}
          </ul>
          <div className="illCuasedBtn">
            <span className="illCancel" onClick={this.hidetypeUL.bind(this)} >取消</span>
            <span className="illConfirm" onClick={this.gettypeUL.bind(this)}>确认</span>
          </div>
        </div>

      </div>
    )
  }

  public state = {
    reqairscss: "reqairs-part",
    iconfont: "iconfont iconfont-unturn",
    reqairsul: "reqairsul-part reqairsul",
    typeULBox: "hide",
    typeUL: [
      //{ id: "1009",  name: "水管报修"},
      //{ id: "1009",  name: "磁砖报修" }
    ],
    indexOf: 0,
    //园区id
    park_id: 1001,
    //类型id (水管报修等对应的id)
    type_id: 1,
    type_name: "", 
    //位置
    position: "",
    //经度
    longitude: "",
    //纬度
    latitude: "",
    //使用场地对应大楼id，模型编号(用于匹配对应3d大楼)
    building_id: "f",
    //使用场地对应大楼id，模型编号(用于匹配对应3d大楼)
    floor_id: "5",
    //使用场地id，模型编号(用于匹配对应3d房间)
    room_id: "6",
    //报修企业
    company: "",
    //联系人
    contact: "",
    phone: "",
    //描述
    descript: "",
    //照片
    photo: "./park_m/image/photo.png",

  }
}

export default RepairsOnline;
import * as React from "react";
import * as RouterDOM from 'react-router-dom';
import GlobalAction from "compat";
import DataService from "dataService";
import { func } from "prop-types";
import { DatePicker, List } from 'antd-mobile';

class Parking extends React.Component {
  public constructor(props) {
    super(props);

    Parking.infoClick = this.infoClick.bind(this);
    Parking.inParkingList = this.inParkingList.bind(this);
  }

  public globalAction: GlobalAction = new GlobalAction();

  public toggleFold() {
    console.log("parkingcss");
    if (this.state.parkingcss == "parking") {
      this.setState({
        parkingcss: "parking-part",
      })
    } else {
      this.setState({
        parkingcss: "parking",
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

  // 切换显示子组件
  static infoClick(indexof) { };
  public infoClick(indexof) {
    console.log("infoClick", indexof);
    this.setState({
      infoli: indexof,
    });
    // indexof = 1；申请地下车库
    if (indexof == 1) {
      Apply.undergroundState(1);
      this.globalAction.web_call_webgl_showParkingList(1);
    } else {
      Apply.undergroundState(0);
    }
  }

  //
  static inParkingList(data) { }
  public inParkingList(data) {
    var i = data.i;
    var id = data.id;
    var name = data.name

    if (this.state.infoli == 1) {
      Apply.inParkingList(i, id, name);
    } else if (this.state.infoli == 3) {
      Visitor.inParkingList(i, id, name);
    }
  }

  public render() {
    return (
      <div className="parkingBox">
        <p className="companyInfotit">
          <RouterDOM.Link to="/home" >
            <span className="iconfont companyInfoicon">&#xe83b;</span>
          </RouterDOM.Link>
          <span>停车业务</span>
        </p>

        <div className={this.state.parkingcss}>
          <div className={"foleBtn"} onClick={this.toggleFold.bind(this)}>
            <i className={this.state.iconfont} style={{ "fontSize": "5rem" }}>&#xe849;</i>
          </div>
          <ul className="parkingul">
            <li onClick={this.infoClick.bind(this, 0)}>
              <i className="iconfont" style={{ "fontSize": "5rem", "color": "#00A447" }}>&#xe832;</i>
              <p>车位申请
                 <i className="iconfont" style={{ "fontSize": "3rem", "color": "#949494", "float": "right" }}>&#xe83c;</i>
              </p>
            </li>
            <li onClick={this.infoClick.bind(this, 1)}>
              <i className="iconfont" style={{ "fontSize": "5rem", "color": "#118EEA" }}>&#xe830;</i>
              <p>地库车位预约
                  <i className="iconfont" style={{ "fontSize": "3rem", "color": "#949494", "float": "right" }}>&#xe83c;</i>
              </p>
            </li>
            <li onClick={this.infoClick.bind(this, 2)}>
              <i className="iconfont" style={{ "fontSize": "5rem", "color": "#E7551C" }}>&#xe82f;</i>
              <p>停车位变更
                  <i className="iconfont" style={{ "fontSize": "3rem", "color": "#949494", "float": "right" }}>&#xe83c;</i>
              </p>

            </li>
            <li onClick={this.infoClick.bind(this, 3)}>
              <i className="iconfont" style={{ "fontSize": "5rem", "color": "#F49C2E" }}>&#xe831;</i>
              <p>来访车辆预约
                  <i className="iconfont" style={{ "fontSize": "3rem", "color": "#949494", "float": "right" }}>&#xe83c;</i>
              </p>
            </li>
          </ul>


          <div className={this.state.infoli == 0 ? "show" : "hide"}>
            <Apply />
          </div>
          <div className={this.state.infoli == 1 ? "show" : "hide"}>
            <Apply />
          </div>
          <div className={this.state.infoli == 2 ? "show" : "hide"}>
            <Alteration />
          </div>
          <div className={this.state.infoli == 3 ? "show" : "hide"}>
            <Visitor />
          </div>

        </div>
      </div>
    )
  }

  public state = {
    parkingcss: "parking",
    iconfont: "iconfont iconfont-unturn",
    infoli: 99,
  }
}

export default Parking;

//车位申请 -- apply
class Apply extends React.Component {
  public constructor(props) {
    super(props);

    this.showParking = this.showParking.bind(this);
    this.setCarType = this.setCarType.bind(this);
    Apply.undergroundState = this.undergroundState.bind(this);
    this.setParkingList = this.setParkingList.bind(this);
    Apply.inParkingList = this.inParkingList.bind(this);
  }

  public componentDidMount() {

    //获取：
    let enterprises = JSON.parse(localStorage.getItem("enterprises"));
    console.log("enterprises--------", enterprises)
    let applicant = localStorage.getItem("userName");
    let phone = localStorage.getItem("phone");
    let staff_id = localStorage.getItem("userid");
    console.log("--------", applicant, phone, staff_id)
    this.setState({
      applicant: applicant,
      phone: phone,
      staff_id: staff_id,
      companyUL: enterprises,
      company: enterprises[0].name,
      company_id: enterprises[0].id,
    })

    this.dataService.getCarType(this.setCarType, 101);
    this.dataService.getParkingList(this.setParkingList, 101);
  }


  public dataService: DataService = new DataService();
  public globalAction: GlobalAction = new GlobalAction();


  static undergroundState(data) { }
  public undergroundState(data) {
    if (data == 1) {
      this.setState({
        undergroundState: true
      })
    } else {
      undergroundState: false
    }

  }

  public toggleFold() {
    console.log("reqairsOn");
    if (this.state.contentBox == "contentBox-all") {
      this.setState({
        contentBox: "contentBox-part",
        contentULcss: "contentUL-part contentUL"
      })
      //通知3d，继续加载模型  
      this.globalAction.web_call_webgl_continueloadModuler();
    } else {
      this.setState({
        contentBox: "contentBox-all",
        contentULcss: "contentUL-all contentUL"
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


  // 显示总表
  public showParking() {
    Parking.infoClick(99);
  }

  // 车牌颜色
  public carLicensecolor(event) {
    this.setState({
      car_license_color: event.target.value,
    })
  }

  // 车牌号
  public carLicense(event) {
    this.setState({
      car_license: event.target.value,
    })
  }

  // 申请人
  public applicant(event) {
    this.setState({
      applicant: event.target.value,
    })
  }

  // 手机号码
  public phone(event) {
    this.setState({
      phone: event.target.value,
    })
  }

  // 公司名称
  //public company(event) {
  //  this.setState({
  //    company: event.target.value,
  //  })
  //}

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

  // 公司地址
  public companyAddress(event) {
    this.setState({
      company_address: event.target.value,
    })
  }

  // 车主
  public carOwner(event) {
    this.setState({
      car_owner: event.target.value,
    })
  }

  // 品牌
  public carBrand(event) {
    this.setState({
      car_brand: event.target.value,
    })
  }

  // 型号
  public carModel(event) {
    this.setState({
      car_model: event.target.value,
    })
  }

  // 车身颜色
  public carColor(event) {
    this.setState({
      car_color: event.target.value,
    })
  }

  // 显示车辆类型列表
  public showCartypeBox() {
    this.setState({
      carTypeBox: "rollSelectCauseBox",
      car_type_in: this.state.carTypeUL[this.state.carTypeIndexof].id,
      car_type_name_in: this.state.carTypeUL[this.state.carTypeIndexof].name,
    })
  }

  //获取车辆类型列表
  public setCarType(data) {
    this.setState({
      carTypeUL: data.response
    })
  }

  // 选中车辆类型
  public inCartype(i, id, name) {
    console.log("选中车辆类型", i, id, name);
    this.setState({
      car_type_in: id,
      //车辆类型name
      car_type_name_in: name,
      carTypeIndexof: i,
    })
  }

  //隐藏车辆类型列表
  public hideCartypeBox() {
    console.log("隐藏车辆类型列表");
    this.setState({
      carTypeBox: "hide",
    })
  }

  //确认车辆类型列表
  public getCarTypeBox() {
    console.log("隐藏车辆类型列表");
    this.setState({
      carTypeBox: "hide",
      car_type: this.state.car_type_in,
      car_type_name: this.state.car_type_name_in,
    })
  }

  //显示地下车位list
  public showParkingList() {
    this.setState({
      parkingListBox: "rollSelectCauseBox",
      underground_parking_id_in: this.state.parkingListUL[this.state.parkingListIndexof].id,
      underground_parking_name_in: this.state.parkingListUL[this.state.parkingListIndexof].name,
    })
  }

  // 获取地库list
  public setParkingList(data) {
    this.setState({
      parkingListUL: data.response
    })
  }

  //选中地下车库.
  static inParkingList(i, id, name) { }
  public inParkingList(i, id, name) {
    console.log("选中地下车库--申请", i, id, name);
    this.setState({
      underground_parking_id_in: id,
      underground_parking_name_in: name,
      parkingListIndexof: i,
    })
    // 通知webgl点亮对应停车场标识
    this.globalAction.web_call_webgl_onParking(i);
  }


  //隐藏地下车位  hideParkingListBox
  public hideParkingListBox() {
    this.setState({
      parkingListBox: "hide",
    })
  }

  //确认地库选择
  public getParkingListBox() {
    this.setState({
      parkingListBox: "hide",
      underground_parking_id: this.state.underground_parking_id_in,
      underground_parking_name: this.state.underground_parking_name_in,
    })
  }

  //  提交车位申请
  public parkingSumbit() {
    //console.log("parkingSumbit", this.state);
    if (this.state.car_license_color == "") {
      alert("请填写车牌颜色")
    } else if (this.state.car_license == "") {
      alert("请填写车牌号")
    } else if (this.state.company_address == "") {
      alert("请填写公司地址")
    } else if (this.state.car_owner == "") {
      alert("请填写车主")
    } else if (this.state.car_brand == "") {
      alert("请填写车辆品牌")
    } else if (this.state.car_model == "") {
      alert("请填写车辆型号")
    } else if (this.state.car_color == "") {
      alert("请填写车辆颜色")
    } else if (this.state.car_type == "") {
      alert("请选择车辆类型")
    } else {
      this.dataService.saveParkingApply(this.paringSumbitSuccess, this.state);
    }

  }

  // 提交车位申请成功
  public paringSumbitSuccess(data) {
    alert(data);
  }

  // 提交地库申请
  public undergroundSumbit() {
    if (this.state.car_license_color == "") {
      alert("请填写车牌颜色")
    } else if (this.state.car_license == "") {
      alert("请填写车牌号")
    } else if (this.state.company_address == "") {
      alert("请填写公司地址")
    } else if (this.state.car_owner == "") {
      alert("请填写车主")
    } else if (this.state.car_brand == "") {
      alert("请填写车辆品牌")
    } else if (this.state.car_model == "") {
      alert("请填写车辆型号")
    } else if (this.state.car_color == "") {
      alert("请填写车辆颜色")
    } else if (this.state.car_type == "") {
      alert("请选择车辆类型")
    } else if (this.state.underground_parking_name == "") {
      alert("请选择停车场")
    } else {
      this.dataService.saveParkingAppointment(this.undergroundSumbitSuccess, this.state);
    }
  }

  // 提交车位申请成功
  public undergroundSumbitSuccess(data) {
    alert(data);

  }

  public render() {
    return (
      <div className={this.state.componentBox}>
        <p className="companyInfotit">
          <span className="iconfont companyInfoicon" onClick={this.showParking}>&#xe83b;</span>
          <span>车位申请{this.state.undergroundState}</span>
        </p>

        <div className={this.state.contentBox}>
          <div className={"foleBtn"} onClick={this.toggleFold.bind(this)}>
            <i className={this.state.iconfont} style={{ "fontSize": "5rem" }}>&#xe849;</i>
          </div>
          <form>
            <ul className={this.state.contentULcss}>
              <li>
                <span className={"bookformLeft"}><span className="redStar">*</span>车牌颜色</span>
                <p className={"bookfromliRight"}>
                  <input type="text" value={this.state.car_license_color} placeholder="请填写车牌颜色"
                    onChange={this.carLicensecolor.bind(this)} />
                </p>
              </li>
              <li>
                <span className={"bookformLeft"}><span className="redStar">*</span>车牌号码</span>
                <p className={"bookfromliRight"}>
                  <input type="text" value={this.state.car_license} placeholder="请填写车牌号码"
                    onChange={this.carLicense.bind(this)} />
                </p>
              </li>
              <li>
                <span className={"bookformLeft"}><span className="redStar">*</span>申请人</span>
                <p className={"bookfromliRight"}>
                  <input type="text" value={this.state.applicant} placeholder="请输入申请人姓名"
                    onChange={this.applicant.bind(this)} />
                </p>
              </li>
              <li>
                <span className={"bookformLeft"}><span className="redStar">*</span>电话号码</span>
                <p className={"bookfromliRight"}>
                  <input type="number" value={this.state.phone} placeholder="请输入电话号码"
                    onChange={this.phone.bind(this)} />
                </p>
              </li>
              <li>
                <span className={"bookformLeft"}><span className="redStar">*</span>公司名称</span>
                <p className={"bookfromliRight"} onClick={this.showCompanyBox.bind(this)}>{this.state.company}</p>
              </li>
              <li>
                <span className={"bookformLeft"}><span className="redStar">*</span>公司地址</span>
                <p className={"bookfromliRight"}>
                  <input type="text" value={this.state.company_address} placeholder="如**座**区**楼**号"
                    onChange={this.companyAddress.bind(this)} />
                </p>
              </li>

              <li className={this.state.undergroundState == false ? "show" : "hide"} >
                <span className={"bookformLeft"}><span className="redStar">*</span>申请类型</span>
                <p className={"bookfromliRight"}>申请地面车位</p>
              </li>
              <li className={this.state.undergroundState == true ? "show" : "hide"}>
                <span className={"bookformLeft"}><span className="redStar">*</span>申请类型</span>
                <p className={"bookfromliRight"} onClick={this.showParkingList.bind(this)} >
                  <input type="text" value={this.state.underground_parking_name} placeholder="请选择停车场" />
                  <span className="iconfont" style={{ "fontSize": "3rem", "float": "right", " padding": " 0 0 0 3rem", "padding": " 0 0 0 4rem" }}
                    >&#xe827;</span>
                </p>
              </li>
              <li>
                <span className={"bookformLeft"}><span className="redStar">*</span>车主</span>
                <p className={"bookfromliRight"}>
                  <input type="text" value={this.state.car_owner} placeholder="请输入车主"
                    onChange={this.carOwner.bind(this)} />
                </p>
              </li>
              <li>
                <span className={"bookformLeft"}><span className="redStar">*</span>车辆品牌</span>
                <p className={"bookfromliRight"}>
                  <input type="text" value={this.state.car_brand} placeholder="请输入车辆品牌，如：大众"
                    onChange={this.carBrand.bind(this)} />
                </p>
              </li>
              <li>
                <span className={"bookformLeft"}><span className="redStar">*</span>车辆型号</span>
                <p className={"bookfromliRight"}>
                  <input type="text" value={this.state.car_model} placeholder="请输入车辆型号，如：高尔夫"
                    onChange={this.carModel.bind(this)} />
                </p>
              </li>
              <li>
                <span className={"bookformLeft"}><span className="redStar">*</span>车身颜色</span>
                <p className={"bookfromliRight"}>
                  <input type="text" value={this.state.car_color} placeholder="请输入车身颜色，如：白色"
                    onChange={this.carColor.bind(this)} />
                </p>
              </li>
              <li>
                <span className={"bookformLeft"}><span className="redStar">*</span>车辆类型</span>
                <p className={"bookfromliRight"} onClick={this.showCartypeBox.bind(this)}>
                  <input type="text" value={this.state.car_type_name} placeholder="请选择车辆类型" />
                  <span className="iconfont" style={{ "fontSize": "3rem", "float": "right", " padding": " 0 0 0 3rem", "padding": " 0 0 0 4rem" }}
                    >&#xe827;</span>
                </p>
              </li>
            </ul>

            <li className={this.state.undergroundState == false ? "show" : "hide"}>
              <div className="bookSumbit" onClick={this.parkingSumbit.bind(this)}>提交</div>
            </li>
            <li className={this.state.undergroundState == true ? "show" : "hide"}>
              <div className="bookSumbit" onClick={this.undergroundSumbit.bind(this)}>提交</div>
            </li>
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

          <div className={this.state.carTypeBox}>
            <ul className="rollSelectCauseULcss">
              {this.state.carTypeUL.map((i, index) => {
                return (
                  <li className={this.state.carTypeIndexof == index ? "rollSelectCauseli-active" : "rollSelectCauseli"}
                    onClick={this.inCartype.bind(this, index, i.id, i.name)}
                  >{i.name}</li>
                )
              })}
            </ul>
            <div className="rollSelectCuasedBtn">
              <span className="rollSelectCancel" onClick={this.hideCartypeBox.bind(this)} >取消</span>
              <span className="rollSelectConfirm" onClick={this.getCarTypeBox.bind(this)}>确认</span>
            </div>
          </div>

          <div className={this.state.parkingListBox}>
            <ul className="rollSelectCauseULcss">
              {this.state.parkingListUL.map((i, index) => {
                return (
                  <li className={this.state.parkingListIndexof == index ? "rollSelectCauseli-active" : "rollSelectCauseli"}
                    onClick={this.inParkingList.bind(this, index, i.id, i.name)}
                  >{i.name}</li>
                )
              })}
            </ul>
            <div className="rollSelectCuasedBtn">
              <span className="rollSelectCancel" onClick={this.hideParkingListBox.bind(this)} >取消</span>
              <span className="rollSelectConfirm" onClick={this.getParkingListBox.bind(this)}>确认</span>
            </div>
          </div>


        </div>
      </div>
    )
  }

  public state = {
    contentULcss: "contentUL-part contentUL",
    carTypeBox: "hide",
    carTypeUL: [],
    carTypeIndexof: 0,
    componentBox: "componentBox-part",
    contentBox: "contentBox-part",
    iconfont: "iconfont iconfont-unturn",
    // 申请地下车库
    undergroundState: false,
    parkingListBox: "hide",
    parkingListIndexof: 0,
    parkingListUL: [],
    // 公司选择
    companyBox: "hide",
    companyUL: [],
    companyIndexof: 0,
    company_id_in: "",
    company_name_in: "",
    //园区id
    park_id: "",
    //车牌颜色
    car_license_color: "",
    //车牌号
    car_license: "",
    //申请人
    applicant: "",
    //手机号码
    phone: "",
    //公司名称
    company: "",
    //公司地址
    company_address: "",
    //车主
    car_owner: "",
    //品牌
    car_brand: "",
    //型号
    car_model: "",
    //颜色
    car_color: "",
    //车辆类型id
    car_type: "",
    car_type_in: "",
    //车辆类型name
    car_type_name: "",
    car_type_name_in: "",
    //停车场id
    underground_parking_id: "",
    underground_parking_id_in: "",
    //停车场名
    underground_parking_name: "",
    underground_parking_name_in: "",
  }

}


//停车位变更 --alteration
class Alteration extends React.Component {
  public constructor(props) {
    super(props);

    this.showParking = this.showParking.bind(this);
  }

  public componentDidMount() { }

  public globalAction: GlobalAction = new GlobalAction();
  public dataService: DataService = new DataService();


  public toggleFold() {
    console.log("reqairsOn");
    if (this.state.contentBox == "contentBox-all") {
      this.setState({
        contentBox: "contentBox-part",
        contentULcss: "contentUL-part contentUL"
      })
    } else {
      this.setState({
        contentBox: "contentBox-all",
        contentULcss: "contentUL-all contentUL"
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

  // 原车牌颜色
  public orginCarLicenseColor(event) {
    this.setState({
      orgin_car_license_color: event.target.value
    })
  }

  // 原车牌号
  public orginCarLicense(event) {
    this.setState({
      orgin_car_license: event.target.value
    })
  }

  // 原车主
  public orginCarOwner(event) {
    this.setState({
      orgin_car_owner: event.target.value
    })
  }

  // 原车主手机号码
  public orginPhone(event) {
    this.setState({
      orgin_phone: event.target.value
    })
  }


  // 车牌颜色
  public carLicenseColor(event) {
    this.setState({
      car_license_color: event.target.value
    })
  }

  // 车牌号
  public carLicense(event) {
    this.setState({
      car_license: event.target.value
    })
  }

  // 申请人
  public applicant(event) {
    this.setState({
      applicant: event.target.value
    })
  }

  // 手机号码
  public phone(event) {
    this.setState({
      phone: event.target.value
    })
  }

  //公司名称
  public company(event) {
    this.setState({
      company: event.target.value
    })
  }
  //公司地址
  public companyAddress(event) {
    this.setState({
      company_address: event.target.value
    })
  }
  //车主
  public carOwner(event) {
    this.setState({
      car_owner: event.target.value
    })
  }

  //品牌
  public carBrand(event) {
    this.setState({
      car_brand: event.target.value
    })
  }
  //型号
  public carModel(event) {
    this.setState({
      car_model: event.target.value
    })
  }
  //颜色
  public carColor(event) {
    this.setState({
      car_color: event.target.value
    })
  }
  //车辆类型
  public carType(event) {
    this.setState({
      car_type: event.target.value
    })
  }

  //提交变更
  public alterationSumbit() {
    if (this.state.orgin_car_license_color == "") {
      alert(" 请填写原车牌颜色")
    } else if (this.state.orgin_car_license == "") {
      alert(" 请填写原车牌号")
    } else if (this.state.orgin_car_owner == "") {
      alert(" 请填写原车主")
    } else if (this.state.orgin_phone == "") {
      alert("请填写原车主手机号码 ")
    }else if (this.state.car_license_color == "") {
      alert("请填写车牌颜色")
    } else if (this.state.car_license == "") {
      alert("请填写车牌号")
    } else if (this.state.applicant == "") {
      alert("请填写申请人 ")
    } else if (this.state.phone == "") {
      alert(" 请填写更改后手机号码")
    } else if (this.state.company_address == "") {
      alert("请填写公司地址")
    } else if (this.state.car_owner == "") {
      alert("请填写车主")
    } else if (this.state.car_brand == "") {
      alert("请填写车辆品牌")
    } else if (this.state.car_model == "") {
      alert("请填写车辆型号")
    } else if (this.state.car_color == "") {
      alert("请填写车辆颜色")
    } else if (this.state.car_type == "") {
      alert("请选择车辆类型")
    }   else {
      this.dataService.changeParkingCarInfo(this.alterationSumbitSuccess, this.state);
    }
  }

  //
  public alterationSumbitSuccess(data) {
    alert(data);
  }

  //显示总表
  public showParking() {
    Parking.infoClick(99);
  }

  public render() {
    return (
      <div className={this.state.componentBox}>
        <p className="companyInfotit">
          <span className="iconfont companyInfoicon" onClick={this.showParking}>&#xe83b;</span>
          <span>停车位变更</span>
        </p>

        <div className={this.state.contentBox}>
          <div className={"foleBtn"} onClick={this.toggleFold.bind(this)}>
            <i className={this.state.iconfont} style={{ "fontSize": "5rem" }}>&#xe849;</i>
          </div>
          <form>
            <ul className={this.state.contentULcss}>
              <p className="alterationTitle">变更前</p>
              <li>
                <span className={"bookformLeft"}><span className="redStar">*</span>车牌颜色</span>
                <p className={"bookfromliRight"}>
                  <input type="text" value={this.state.orgin_car_license_color} placeholder="请填写车牌颜色"
                    onChange={this.orginCarLicenseColor.bind(this)} />
                </p>
              </li>
              <li>
                <span className={"bookformLeft"}><span className="redStar">*</span>车牌号码</span>
                <p className={"bookfromliRight"}>
                  <input type="text" value={this.state.orgin_car_license} placeholder="请填写车牌颜色"
                    onChange={this.orginCarLicense.bind(this)} />
                </p>
              </li>
              <li>
                <span className={"bookformLeft"}><span className="redStar">*</span>车主</span>
                <p className={"bookfromliRight"}>
                  <input type="text" value={this.state.orgin_car_owner} placeholder="请填写车主姓名"
                    onChange={this.orginCarOwner.bind(this)} />
                </p>
              </li>
              <li>
                <span className={"bookformLeft"}><span className="redStar">*</span>电话号码</span>
                <p className={"bookfromliRight"}>
                  <input type="text" value={this.state.orgin_phone} placeholder="请填写电话号码"
                    onChange={this.orginPhone.bind(this)} />
                </p>
              </li>
              <p className="alterationTitle">变更后</p>
              <li>
                <span className={"bookformLeft"}><span className="redStar">*</span>车牌颜色</span>
                <p className={"bookfromliRight"}>
                  <input type="text" value={this.state.car_license_color} placeholder="请填写车牌颜色"
                    onChange={this.carLicenseColor.bind(this)} />
                </p>
              </li>
              <li>
                <span className={"bookformLeft"}><span className="redStar">*</span>车牌号码</span>
                <p className={"bookfromliRight"}>
                  <input type="text" value={this.state.car_license} placeholder="请填写车牌号码"
                    onChange={this.carLicense.bind(this)} />
                </p>
              </li>
              <li>
                <span className={"bookformLeft"}><span className="redStar">*</span>申请人</span>
                <p className={"bookfromliRight"}>
                  <input type="text" value={this.state.applicant} placeholder="请填写申请人姓名"
                    onChange={this.applicant.bind(this)} />
                </p>
              </li>
              <li>
                <span className={"bookformLeft"}><span className="redStar">*</span>电话号码</span>
                <p className={"bookfromliRight"}>
                  <input type="text" value={this.state.phone} placeholder="请填写电话号码"
                    onChange={this.phone.bind(this)} />
                </p>
              </li>
              <li>
                <span className={"bookformLeft"}><span className="redStar">*</span>公司名称</span>
                <p className={"bookfromliRight"}>
                  <input type="text" value={this.state.company} placeholder="请填写公司名称"
                    onChange={this.company.bind(this)} />
                </p>
              </li>
              <li>
                <span className={"bookformLeft"}><span className="redStar">*</span>公司地址</span>
                <p className={"bookfromliRight"}>
                  <input type="text" value={this.state.company_address} placeholder="请填写公司地址"
                    onChange={this.companyAddress.bind(this)} />
                </p>
              </li>
              <li>
                <span className={"bookformLeft"}><span className="redStar">*</span>车主</span>
                <p className={"bookfromliRight"}>
                  <input type="text" value={this.state.car_owner} placeholder="请填写车主姓名"
                    onChange={this.carOwner.bind(this)} />
                </p>
              </li>
              <li>
                <span className={"bookformLeft"}><span className="redStar">*</span>品牌</span>
                <p className={"bookfromliRight"}>
                  <input type="text" value={this.state.car_brand} placeholder="请填写车辆品牌"
                    onChange={this.carBrand.bind(this)} />
                </p>
              </li>
              <li>
                <span className={"bookformLeft"}><span className="redStar">*</span>车辆型号</span>
                <p className={"bookfromliRight"}>
                  <input type="text" value={this.state.car_model} placeholder="请填写车辆型号"
                    onChange={this.carModel.bind(this)} />
                </p>
              </li>
              <li>
                <span className={"bookformLeft"}><span className="redStar">*</span>车辆颜色</span>
                <p className={"bookfromliRight"}>
                  <input type="text" value={this.state.car_color} placeholder="请填写车辆颜色"
                    onChange={this.carColor.bind(this)} />
                </p>
              </li>
              <li>
                <span className={"bookformLeft"}><span className="redStar">*</span>车辆类型</span>
                <p className={"bookfromliRight"}>
                  <input type="text" value={this.state.car_type} placeholder="请填写车辆类型"
                    onChange={this.carType.bind(this)} />
                </p>
              </li>
            </ul>

            <div className="bookSumbit" onClick={this.alterationSumbit.bind(this)}>提交</div>
          </form>
        </div>
      </div>
    )
  }

  public state = {
    componentBox: "componentBox-part",
    contentBox: "contentBox-part",
    iconfont: "iconfont iconfont-unturn",
    contentULcss: "contentUL-part contentUL",

    //园区id
    "park_id": "",
    //原车牌颜色
    "orgin_car_license_color": "",
    //原车牌号
    "orgin_car_license": "",
    //原车主
    "orgin_car_owner": "",
    //原车主手机号码
    "orgin_phone": "",
    //车牌颜色
    "car_license_color": "",
    //车牌号
    "car_license": "",
    //申请人
    "applicant": "",
    //手机号码
    "phone": "",
    //公司名称
    "company": "",
    //公司地址
    "company_address": "",
    //车主
    "car_owner": "",
    //品牌
    "car_brand": "",
    //型号
    "car_model": "",
    //颜色
    "car_color": "",
    //车辆类型
    "car_type": "",
  }
}


//来访车辆预约 -- visitor
class Visitor extends React.Component {
  public constructor(props) {
    super(props);

    this.showParking = this.showParking.bind(this);
    this.setParkingList = this.setParkingList.bind(this);
    Visitor.inParkingList = this.inParkingList.bind(this);

  }

  public componentDidMount() {
    //获取地下停车位列表
    this.dataService.getParkingList(this.setParkingList, 101);
  }

  public dataService: DataService = new DataService();
  public globalAction: GlobalAction = new GlobalAction();

  public toggleFold() {
    console.log("reqairsOn");
    if (this.state.contentBox == "contentBox-all") {
      this.setState({
        contentBox: "contentBox-part",
        contentULcss: "contentUL-part contentUL",
      })
    } else {
      this.setState({
        contentBox: "contentBox-all",
        contentULcss: "contentUL-all contentUL",
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

  // 显示总表
  public showParking() {
    Parking.infoClick(99);
  }

  // 车牌颜色
  public carLicenseColor(event) {
    this.setState({
      car_license_color: event.target.value
    })
  }

  // 车牌号 "car_license": "10.55",
  public carLicense(event) {
    this.setState({
      car_license: event.target.value
    })
  }
  // 预约人"applicant": "赵xxx",
  public applicant(event) {
    this.setState({
      applicant: event.target.value
    })
  }
  // 电话号码"phone": "15211111111",
  public phone(event) {
    this.setState({
      phone: event.target.value
    })
  }
  // 拜访企业 "company": "永拓信息科技",
  public company(event) {
    this.setState({
      company: event.target.value
    })
  }

  // 开始日期"start_date": "2020-02-28",
  public startDate(event) {
    this.setState({
      start_date: event.target.value
    })
  }

  // 开始时间 "start_time": "19:30:00",
  public startTime(event) {
    this.setState({
      start_time: event.target.value
    })
  }
  // 结束日期 "end_date": "2020-02-28",
  public endDate(event) {
    this.setState({
      end_date: event.target.value
    })
  }
  // 结束时间 "end_time": "19:30:00",
  public endTime(event) {
    this.setState({
      end_time: event.target.value
    })
  }

  //计算时间，个位数填0；
  public p(s) {
    return s < 10 ? '0' + s : s
  }

  public setStartTime(date) {
    const d = new Date(date)
    const resDate = d.getFullYear() + '-' + this.p((d.getMonth() + 1)) + '-' + this.p(d.getDate())
    const resTime = this.p(d.getHours()) + ':' + this.p(d.getMinutes()) + ':' + this.p(d.getSeconds())
    const startDate = resDate + " " + resTime
    console.log("start输入index656", startDate);
    this.setState({
      startTime: date,
      start_time: startDate,
      // start_time: resTime
    });
   // console.log("start输入index2", this.state.startTime);
  }

  public setEndTime(date) {
    const d = new Date(date)
    const resDate = d.getFullYear() + '-' + this.p((d.getMonth() + 1)) + '-' + this.p(d.getDate())
    const resTime = this.p(d.getHours()) + ':' + this.p(d.getMinutes()) + ':' + this.p(d.getSeconds())
    const endDate = resDate + " " + resTime
    // console.log("end输入index656", endDate);
    this.setState({
      endTime: date,
      end_time: endDate,
      // end_time: resTime
    });
    // console.log("end输入index2", this.state.endTime);
  }

  // 显示地下车位list
  public showParkingList() {
    this.setState({
      parkingListBox: "rollSelectCauseBox",
      underground_parking_id_in: this.state.parkingListUL[this.state.parkingListIndexof].id,
      underground_parking_name_in: this.state.parkingListUL[this.state.parkingListIndexof].name,
    });
  }

  // 获取地库list
  public setParkingList(data) {
    this.setState({
      parkingListUL: data.response
    })
  }

  // 选中停车场
  static inParkingList(i, id, name) { };
  public inParkingList(i, id, name) {
    console.log("选中地下车库--预约", i, id, name);
    this.setState({
      underground_parking_id_in: id,
      underground_parking_name_in: name,
      parkingListIndexof: i,
    })
    // 通知webgl点亮对应停车场标识
    this.globalAction.web_call_webgl_onParking(i);
  }

  // 取消 隐藏地下车位  hideParkingListBox
  public hideParkingListBox() {
    this.setState({
      parkingListBox: "hide",
    })
  }

  // 确认地库选择
  public getParkingListBox() {
    this.setState({
      parkingListBox: "hide",
      underground_parking_id: this.state.underground_parking_id_in,
      underground_parking_name: this.state.underground_parking_name_in,
    })
  }

  // 提交来访车辆预约
  public visitorSumbit() {
    //console.log("提交来访车辆预约", this.state);
    if (this.state.car_license_color == "") {
      alert(" 请填写车牌颜色")
    } else if (this.state.car_license == "") {
      alert(" 请填写车牌号")
    }else if (this.state.applicant == "") {
      alert("请填写预约人 ")
    } else if (this.state.phone == "") {
      alert(" 请填写预约手机号码")
    } else if (this.state.company == "") {
      alert("请填写拜访企业")
    } else if (this.state.underground_parking_id == "") {
      alert("请选择停车场")
    } else if (this.state.start_time == "") {
      alert("请选择开始时间")
    } else if (this.state.end_time == "") {
      alert("请选择结束时间")
    }  else {
      this.dataService.saveVisitorParkingAppointment(this.visitorSumbitSuccess, this.state);
    }
  }

  // 提交来访车辆预约,成功
  public visitorSumbitSuccess(data) {
    alert(data)
  }

  public render() {
    //<li>
    //  <span className={"bookformLeft"}><span className="redStar">*</span>开始日期</span>
    //  <p className={"bookfromliRight"}>
    //    <input type="text" value={this.state.start_date} placeholder="请输入开始日期"
    //      onChange={this.startDate.bind(this)} />
    //  </p>
    //</li>
    //<li>
    //  <span className={"bookformLeft"}><span className="redStar">*</span>结束日期</span>
    //  <p className={"bookfromliRight"}>
    //    <input type="text" value={this.state.end_date} placeholder="请输入结束日期"
    //      onChange={this.endDate.bind(this)} />
    //  </p>
    //</li>
    return (
      <div className={this.state.componentBox}>
        <p className="companyInfotit">
          <span className="iconfont companyInfoicon" onClick={this.showParking}>&#xe83b;</span>
          <span>来访车辆预约</span>
        </p>

        <div className={this.state.contentBox}>
          <div className={"foleBtn"} onClick={this.toggleFold.bind(this)}>
            <i className={this.state.iconfont} style={{ "fontSize": "5rem" }}>&#xe849;</i>
          </div>
          <form>
            <ul className={this.state.contentULcss}>
              <li>
                <span className={"bookformLeft"}><span className="redStar" style={{ "margin-right": "2rem" }}>*</span>车牌颜色</span>
                <p className={"bookfromliRight"}>
                  <input type="text" value={this.state.car_license_color} placeholder="请输入车牌颜色"
                    onChange={this.carLicenseColor.bind(this)} />
                </p>
              </li>
              <li>
                <span className={"bookformLeft"}><span className="redStar" style={{ "margin-right": "2rem" }}>*</span>车牌号</span>
                <p className={"bookfromliRight"}>
                  <input type="text" value={this.state.car_license} placeholder="请输入车牌号"
                    onChange={this.carLicense.bind(this)} />
                </p>
              </li>
              <li>
                <span className={"bookformLeft"}><span className="redStar" style={{ "margin-right": "2rem" }}>*</span>预约人</span>
                <p className={"bookfromliRight"}>
                  <input type="text" value={this.state.applicant} placeholder="请输入预约人"
                    onChange={this.applicant.bind(this)} />
                </p>
              </li>
              <li>
                <span className={"bookformLeft"}><span className="redStar" style={{ "margin-right": "2rem" }}>*</span>电话号码</span>
                <p className={"bookfromliRight"}>
                  <input type="text" value={this.state.phone} placeholder="请输入电话号码"
                    onChange={this.phone.bind(this)} />
                </p>
              </li>
              <li>
                <span className={"bookformLeft"}><span className="redStar" style={{ "margin-right": "2rem" }}>*</span>拜访企业</span>
                <p className={"bookfromliRight"}>
                  <input type="text" value={this.state.company} placeholder="请输入拜访企业"
                    onChange={this.company.bind(this)} />
                </p>
              </li>
              <li>
                <span className={"bookformLeft"}><span className="redStar" style={{ "margin-right": "2rem" }}>*</span>停车场</span>
                <p className={"bookfromliRight"} onClick={this.showParkingList.bind(this)}>
                  <input type="text" value={this.state.underground_parking_name} placeholder="请选择停车场" />
                  <span className="iconfont" style={{ "fontSize": "3rem", "float": "right", " padding": " 0 0 0 3rem", "padding": " 0 0 0 4rem" }}
                   >&#xe827;</span>
                </p>
              </li>
              <li style={{ "padding": "1.5rem 0rem" }}>
                <p >
                  <span className="redStar" style={{ "float": "left", "margin-top": "-1.2rem" }}>*</span>
                  <div style={{ "fonSize": "2.5rem" }} className={"mDate"}>
                    <DatePicker style={{ "fonSize": "2.5rem" }}
                      value={this.state.startTime}
                      onChange={this.setStartTime.bind(this)} >
                      <List.Item arrow="horizontal">开始时间</List.Item>
                    </DatePicker>
                  </div>
                </p>
              </li>
              <li style={{ "padding": "1.5rem 0rem"}}>
                <p>
                  <span className="redStar" style={{ "float": "left", "margin-top": "-1.2rem" }}>*</span>
                  <div style={{ "fonSize": "2.5rem" }} className={"mDate"}>
                    <DatePicker style={{ "fonSize": "2.5rem" }}
                      value={this.state.endTime}
                      onChange={this.setEndTime.bind(this)} >
                      <List.Item arrow="horizontal">结束时间</List.Item>
                    </DatePicker>
                  </div>
                </p>
              </li>
              <div className="bookSumbit" onClick={this.visitorSumbit.bind(this)}>提交</div>
            </ul>
          </form>

          <div className={this.state.parkingListBox}>
            <ul className="rollSelectCauseULcss">
              {this.state.parkingListUL.map((i, index) => {
                return (
                  <li className={this.state.parkingListIndexof == index ? "rollSelectCauseli-active" : "rollSelectCauseli"}
                    onClick={this.inParkingList.bind(this, index, i.id, i.name)}
                  >{i.name}</li>
                )
              })}
            </ul>
            <div className="rollSelectCuasedBtn">
              <span className="rollSelectCancel" onClick={this.hideParkingListBox.bind(this)} >取消</span>
              <span className="rollSelectConfirm" onClick={this.getParkingListBox.bind(this)}>确认</span>
            </div>
          </div>

        </div>
      </div>
    )
  }

  public state = {
    componentBox: "componentBox-part",
    contentBox: "contentBox-part",
    iconfont: "iconfont iconfont-unturn",
    contentULcss: "contentUL-part contentUL",
    parkingListBox: "hide",
    parkingListUL: [],
    parkingListIndexof: 0,

    //园区id
    "park_id": "",
    //车牌颜色
    "car_license_color": "",
    //车牌号
    "car_license": "",
    //预约人
    "applicant": "",
    //电话号码
    "phone": "",
    //拜访企业
    "company": "",
    //停车场id
    "underground_parking_id": "",
    "underground_parking_id_in": "",
    //停车场名
    "underground_parking_name": "",
    "underground_parking_name_in": "",
    //开始日期
    "start_date": "",
    //开始时间
    "start_time": "",
    "startTime":"",
    //结束日期
    "end_date": "",
    //结束时间
    "end_time": "",
    "endTime":"",
  }
}

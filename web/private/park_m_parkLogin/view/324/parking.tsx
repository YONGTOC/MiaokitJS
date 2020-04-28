import * as React from "react";
import * as RouterDOM from 'react-router-dom';
import GlobalAction from "compat";
import DataService from "dataService";

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
  static inParkingList(data) {}
  public inParkingList(data) {
    var i = data.i;
    var id = data.id;
    var name = data.name
  
    Apply.inParkingList(i, id ,name);
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

  //获取车辆类型列表
  public setCarType(data) {
    this.setState({
      carTypeUL: data.response
    })
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
  public company(event) {
    this.setState({
      company: event.target.value,
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
    console.log("显示车辆类型列表");
    this.setState({
      carTypeBox: "illcauseBox"
    })
  }

  // 选中车辆类型
  public inCartype(i, id, name) {
    console.log("选中车辆类型", i, id, name);
    this.setState({
      car_type: id,
      //车辆类型name
      car_type_name: name,
      carTypeIndexof: i,
    })
  }

  //隐藏车辆类型列表
  public hideCartypeBox() {
    console.log("隐藏车辆类型列表");
    this.setState({
      carTypeBox: "hide",
      car_type: "",
      car_type_name: "",
    })
  }

  //确认车辆类型列表
  public getCarTypeBox() {
    console.log("隐藏车辆类型列表");
    this.setState({
      carTypeBox: "hide"
    })
  }


  // 获取地库list
  public setParkingList(data) {
    this.setState({
      parkingListUL: data.response
    })
  }

  //显示地下车位list
  public showParkingList() {
    this.setState({
      parkingListBox: "illcauseBox"
    })
  }

  //选中地下车库.
  static inParkingList(i, id, name) {}
  public inParkingList(i, id, name) {
    console.log("选中地下车库", i, id, name);
    this.setState({
      //停车场id
      underground_parking_id: id,
      //停车场名
      underground_parking_name: name,
      parkingListIndexof: i,
    })
    // 通知webgl点亮对应停车场标识
    this.globalAction.web_call_webgl_onParking(i);
  }


//隐藏地下车位  hideParkingListBox
  public hideParkingListBox() {
    console.log("隐藏地下车库列表");
    this.setState({
      parkingListBox: "hide",
      //停车场id
      underground_parking_id: "",
      //停车场名
      underground_parking_name: "",
    })
  }

  //确认地库选择
  public getParkingListBox() {
    console.log("隐藏车辆类型列表");
    this.setState({
      parkingListBox: "hide",
    })
  }

  //  提交车位申请
  public parkingSumbit() {
    console.log("parkingSumbit", this.state);
    this.dataService.saveParkingApply(this.paringSumbitSuccess, this.state);
  }

  // 提交车位申请成功
  public paringSumbitSuccess(data) {
    alert(data);

  }

  // 提交地库申请
  public undergroundSumbit() {
    this.dataService.saveParkingAppointment(this.undergroundSumbitSuccess, this.state);
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
                <p className={"bookfromliRight"}>
                  <input type="text" value={this.state.company} placeholder="请输入公司名称"
                    onChange={this.company.bind(this)} />
                </p>
              </li>
              <li>
                <span className={"bookformLeft"}><span className="redStar">*</span>公司地址</span>
                <p className={"bookfromliRight"}>
                  <input type="text" value={this.state.company_address} placeholder="如**座**区**楼**号"
                    onChange={this.companyAddress.bind(this)} />
                </p>
              </li>

              <li className={this.state.undergroundState == false ? "show" : "hide"}>
                <span className={"bookformLeft"}><span className="redStar">*</span>申请类型</span>
                <p className={"bookfromliRight"}>申请地面车位</p>
              </li>
              <li className={this.state.undergroundState == true ? "show" : "hide"}>
                <span className={"bookformLeft"}><span className="redStar">*</span>申请类型</span>
                <p className={"bookfromliRight"}>
                  <input type="text" value={this.state.underground_parking_name} placeholder="请选择停车场" />
                  <span className="iconfont" style={{ "fontSize": "3rem", "float": "right", " padding": " 0 0 0 3rem", "padding": " 0 0 0 4rem" }}
                    onClick={this.showParkingList.bind(this)}>&#xe827;</span>
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
                <p className={"bookfromliRight"}>
                  <input type="text" value={this.state.car_type_name} placeholder="请选择车辆类型" />
                  <span className="iconfont" style={{ "fontSize": "3rem", "float": "right", " padding": " 0 0 0 3rem", "padding": " 0 0 0 4rem" }}
                    onClick={this.showCartypeBox.bind(this)}>&#xe827;</span>
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

          <div className={this.state.carTypeBox}>
            <ul className="illcauseULcss">
              {this.state.carTypeUL.map((i, index) => {
                return (
                  <li className={this.state.carTypeIndexof == index ? "illcauseli-active" : "illcauseli"}
                    onClick={this.inCartype.bind(this, index, i.id, i.name)}
                  >{i.name}</li>
                )
              })}
            </ul>
            <div className="illCuasedBtn">
              <span className="illCancel" onClick={this.hideCartypeBox.bind(this)} >取消</span>
              <span className="illConfirm" onClick={this.getCarTypeBox.bind(this)}>确认</span>
            </div>
          </div>

          <div className={this.state.parkingListBox}>
            <ul className="illcauseULcss">
              {this.state.parkingListUL.map((i, index) => {
                return (
                  <li className={this.state.parkingListIndexof == index ? "illcauseli-active" : "illcauseli"}
                    onClick={this.inParkingList.bind(this, index, i.id, i.name)}
                  >{i.name}</li>
                )
              })}
            </ul>
            <div className="illCuasedBtn">
              <span className="illCancel" onClick={this.hideParkingListBox.bind(this)} >取消</span>
              <span className="illConfirm" onClick={this.getParkingListBox.bind(this)}>确认</span>
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
    parkingListIndexof:0,
    parkingListUL: [ ],

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
    //车辆类型name
    car_type_name: "",
    //停车场id
    underground_parking_id: "",
    //停车场名
    underground_parking_name: "",
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
    //console.log("提交变更", this.state);
    this.dataService.changeParkingCarInfo(this.alterationSumbitSuccess, this.state);
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
  }

  public componentDidMount() { }

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

  //显示总表
  public showParking() {
    Parking.infoClick(99);
  }

  public render() {
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
                <span className={"bookformLeft"}><span className="redStar">*</span>车牌颜色</span>
                <p className={"bookfromliRight"}>
                  <input type="text" value={this.state.car_license_color} placeholder="请输入车牌颜色" />
                </p>
              </li>
              <li>
                <span className={"bookformLeft"}><span className="redStar">*</span>车牌号</span>
                <p className={"bookfromliRight"}>
                  <input type="text" value={this.state.car_license} placeholder="请输入车牌号" />
                </p>
              </li>
              <li>
                <span className={"bookformLeft"}><span className="redStar">*</span>预约人</span>
                <p className={"bookfromliRight"}>
                  <input type="text" value={this.state.applicant} placeholder="请输入预约人" />
                </p>
              </li>
              <li>
                <span className={"bookformLeft"}><span className="redStar">*</span>车牌颜色</span>
                <p className={"bookfromliRight"}>
                  <input type="text" value={this.state.car_license_color} placeholder="请输入车牌颜色" />
                </p>
              </li>
              <li>
                <span className={"bookformLeft"}><span className="redStar">*</span>车牌颜色</span>
                <p className={"bookfromliRight"}>
                  <input type="text" value={this.state.car_license_color} placeholder="请输入车牌颜色" />
                </p>
              </li>
              <li>
                <span className={"bookformLeft"}><span className="redStar">*</span>车牌颜色</span>
                <p className={"bookfromliRight"}>
                  <input type="text" value={this.state.car_license_color} placeholder="请输入车牌颜色" />
                </p>
              </li>
              <li>
                <span className={"bookformLeft"}><span className="redStar">*</span>车牌颜色</span>
                <p className={"bookfromliRight"}>
                  <input type="text" value={this.state.car_license_color} placeholder="请输入车牌颜色" />
                </p>
              </li>
              <li>
                <span className={"bookformLeft"}><span className="redStar">*</span>车牌颜色</span>
                <p className={"bookfromliRight"}>
                  <input type="text" value={this.state.car_license_color} placeholder="请输入车牌颜色" />
                </p>
              </li>
              <li>
                <span className={"bookformLeft"}><span className="redStar">*</span>车牌颜色</span>
                <p className={"bookfromliRight"}>
                  <input type="text" value={this.state.car_license_color} placeholder="请输入车牌颜色" />
                </p>
              </li>
              <li>
                <span className={"bookformLeft"}><span className="redStar">*</span>车牌颜色</span>
                <p className={"bookfromliRight"}>
                  <input type="text" value={this.state.car_license_color} placeholder="请输入车牌颜色" />
                </p>
              </li>
            </ul>
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
    "park_id": "1001",
    //车牌颜色
    "car_license_color": "蓝",
    //车牌号
    "car_license": "10.55",
    //预约人
    "applicant": "赵xxx",
    //电话号码
    "phone": "15211111111",
    //拜访企业
    "company": "永拓信息科技",
    //停车场id
    "underground_parking_id": "100001",
    //停车场名
    "underground_parking_name": "100001",
    //开始日期
    "start_date": "2020-02-28",
    //开始时间
    "start_time": "19:30:00",
    //结束日期
    "end_date": "2020-02-28",
    //结束时间
    "end_time": "19:30:00",
  }
}

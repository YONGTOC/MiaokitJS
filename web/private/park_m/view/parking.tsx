import * as React from "react";
import * as RouterDOM from 'react-router-dom';

import DataService from "dataService";

class Parking extends React.Component {
  public constructor(props) {
    super(props);

    Parking.infoClick = this.infoClick.bind(this);
  }

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
                  <i className="iconfont" style={{ "fontSize": "3rem", "color": "#949494", "float": "right"}}>&#xe83c;</i>
              </p>
            </li>
            <li onClick={this.infoClick.bind(this, 2)}>
              <i className="iconfont" style={{ "fontSize": "5rem", "color": "#E7551C" }}>&#xe82f;</i>
              <p>停车位变更
                  <i className="iconfont" style={{ "fontSize": "3rem", "color": "#949494", "float": "right"}}>&#xe83c;</i>
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
              <Appointment />
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
  }

  public componentDidMount() {}

  public toggleFold() {
    console.log("reqairsOn");
    if (this.state.contentBox == "contentBox-all") {
      this.setState({
        contentBox: "contentBox-part",
       // reqairscssul: "reqairsul-part reqairsul"
      })
    } else {
      this.setState({
        contentBox: "contentBox-all",
       // reqairsul: "reqairsul-all reqairsul"
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

  // 显示车位类型列表
  public showParkingtype() {

  }

  // 显示车辆类型列表
  public showCartype() {

  }

  //applySumbit 提交车位申请
  public applySumbit() {
    console.log("applySumbit");
  }

  public render() {
    return (
      <div className={this.state.componentBox}>
        <p className="companyInfotit">
          <span className="iconfont companyInfoicon" onClick={this.showParking}>&#xe83b;</span>
          <span>车位申请</span>
        </p>

        <div className={this.state.contentBox}>
          <div className={"foleBtn"} onClick={this.toggleFold.bind(this)}>
            <i className={this.state.iconfont} style={{ "fontSize": "5rem" }}>&#xe849;</i>
          </div>
          <form>
            <ul className={this.state.contentUL}>
              <li>
                <span className={"bookformLeft"}><span className="redStar">*</span>车牌颜色</span>
                <p className={"bookfromliRight"}>
                  <input type="text" value={this.state.car_license_color} placeholder="请填写车牌颜色" />
                </p>
              </li>
              <li>
                <span className={"bookformLeft"}><span className="redStar">*</span>车牌号码</span>
                <p className={"bookfromliRight"}>
                  <input type="text" value={this.state.car_license_color} placeholder="请填写车牌号码" />
                </p>
              </li>
              <li>
                <span className={"bookformLeft"}><span className="redStar">*</span>申请人</span>
                <p className={"bookfromliRight"}>
                  <input type="text" value={this.state.car_license_color} placeholder="请输入申请人姓名" />
                </p>
              </li>
              <li>
                <span className={"bookformLeft"}><span className="redStar">*</span>电话号码</span>
                <p className={"bookfromliRight"}>
                  <input type="text" value={this.state.car_license_color} placeholder="请输入电话号码" />
                </p>
              </li>
              <li>
                <span className={"bookformLeft"}><span className="redStar">*</span>公司名称</span>
                <p className={"bookfromliRight"}>
                  <input type="text" value={this.state.car_license_color} placeholder="请输入公司名称" />
                </p>
              </li>
              <li>
                <span className={"bookformLeft"}><span className="redStar">*</span>公司地址</span>
                <p className={"bookfromliRight"}>
                  <input type="text" value={this.state.car_license_color} placeholder="如**座**区**楼**号" />
                </p>
              </li>
              <li>
                <span className={"bookformLeft"}><span className="redStar">*</span>申请类型</span>
                <p className={"bookfromliRight"}>申请地面车位</p>
              </li>
              <li>
                <span className={"bookformLeft"}><span className="redStar">*</span>车主</span>
                <p className={"bookfromliRight"}>
                  <input type="text" value={this.state.car_license_color} placeholder="请输入车主" />
                </p>
              </li>
              <li>
                <span className={"bookformLeft"}><span className="redStar">*</span>车辆品牌</span>
                <p className={"bookfromliRight"}>
                  <input type="text" value={this.state.car_license_color} placeholder="请输入车辆品牌，如：大众" />
                </p>
              </li>
              <li>
                <span className={"bookformLeft"}><span className="redStar">*</span>车辆型号</span>
                <p className={"bookfromliRight"}>
                  <input type="text" value={this.state.car_license_color} placeholder="请输入车辆型号，如：高尔夫" />
                </p>
              </li>
              <li>
                <span className={"bookformLeft"}><span className="redStar">*</span>车身颜色</span>
                <p className={"bookfromliRight"}>
                  <input type="text" value={this.state.car_license_color} placeholder="请输入车身颜色，如：白色" />
                </p>
              </li>
              <li>
                <span className={"bookformLeft"}><span className="redStar">*</span>车辆类型</span>
                <p className={"bookfromliRight"}>
                  <input type="text" value={this.state.car_license_color} placeholder="请选择车辆类型" />
                  <span className="iconfont" style={{ "fontSize": "3rem", "float": "right", " padding": " 0 0 0 3rem", "padding": " 0 0 0 4rem" }}
                    onClick={this.showCartype.bind(this)}>&#xe827;</span>
                </p>
              </li>
            </ul>
            <div className="bookSumbit" onClick={this.applySumbit.bind(this)}>提交</div>
          </form>
        </div>
      </div>
    )
  }

  public state = {
    componentBox: "componentBox-part",
    contentBox: "contentBox-part",
    iconfont: "iconfont iconfont-unturn",
    contentUL: "contentUL-part contentUL",
    //园区id
    park_id: "1001",
    //车牌颜色
    car_license_color: "",
    //车牌号
    car_license: "桂C10000",
    //申请人
    applicant: "赵xxx",
    //手机号码
    phone: "15211111111",
    //公司名称
    company: "永拓信息科技",
    //公司地址
    company_address: "a座b区三楼",
    //停车场id
    underground_parking_id: "100001",
    //地下停车场名
    underground_parking_name: "地面A库",
    //车主
    car_owner: "赵xxx",
    //品牌
    car_brand: "丰田",
    //型号
    car_model: "卡罗拉",
    //颜色
    car_color: "",
    //车辆类型id
    car_type: "",
  }

}


//地库车位预约 -- appointment 
class Appointment extends React.Component {
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
        // reqairscssul: "reqairsul-part reqairsul"
      })
    } else {
      this.setState({
        contentBox: "contentBox-all",
        // reqairsul: "reqairsul-all reqairsul"
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
          <span>地库车位预约</span>
        </p>

        <div className={this.state.contentBox}>
          <div className={"foleBtn"} onClick={this.toggleFold.bind(this)}>
            <i className={this.state.iconfont} style={{ "fontSize": "5rem" }}>&#xe849;</i>
          </div>
          <form>
            <ul className={this.state.contentUL}>
              <li>地库车位预约111111</li>
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
    contentUL: "contentUL-part contentUL",
  }
}

//停车位变更 --alteration
class Alteration extends React.Component {
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
        // reqairscssul: "reqairsul-part reqairsul"
      })
    } else {
      this.setState({
        contentBox: "contentBox-all",
        // reqairsul: "reqairsul-all reqairsul"
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
          <span>停车位变更</span>
        </p>

        <div className={this.state.contentBox}>
          <div className={"foleBtn"} onClick={this.toggleFold.bind(this)}>
            <i className={this.state.iconfont} style={{ "fontSize": "5rem" }}>&#xe849;</i>
          </div>
          <form>
            <ul className={this.state.contentUL}>
              <li>停车位变更111111</li>
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
    contentUL: "contentUL-part contentUL",
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
        // reqairscssul: "reqairsul-part reqairsul"
      })
    } else {
      this.setState({
        contentBox: "contentBox-all",
        // reqairsul: "reqairsul-all reqairsul"
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
            <ul className={this.state.contentUL}>
              <li>来访车辆预约111111</li>
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
    contentUL: "contentUL-part contentUL",
  }
}

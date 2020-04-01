import * as React from "react";
import DataService from "dataService";

interface IProps {
  location: any,
  history: any
}

interface IState {
  squre: number,
  price: number,
  contact: string,
  phone: string,
  inspectionTime: string,
  require: string,
  lift: number
}

export default class RoomBase extends React.Component<{ history: any }>{
  public readonly props: Readonly<IProps> = {
    location: this.props.location,
    history: this.props.history
  }

  public readonly state: Readonly<IState> = {
    squre: JSON.parse(sessionStorage.getItem("roomInfo"))[0].squre, // 建筑面积
    price: JSON.parse(sessionStorage.getItem("roomInfo"))[0].price, // 租金
    contact: JSON.parse(sessionStorage.getItem("roomInfo"))[0].contact, // 联系人
    phone: JSON.parse(sessionStorage.getItem("roomInfo"))[0].phone, // 联系电话
    inspectionTime: JSON.parse(sessionStorage.getItem("roomInfo"))[0].inspection_time, // 看房时间
    require: JSON.parse(sessionStorage.getItem("roomInfo"))[0].require, // 租房要求
    lift: 1 // 电梯
  }

  public dataService: DataService = new DataService()

  componentDidMount() {
    if (this.props.location.state) {
      sessionStorage.setItem("roomInfo", JSON.stringify(this.props.location.state.roomInfo))
    }
    console.log(JSON.parse(sessionStorage.getItem("roomInfo")))
  }

  // 输入
  changea(event) {
    this.setState({ squre: event.target.value })
  }

  // 输入
  changeb(event) {
    this.setState({ price: event.target.value })
  }

  // 输入
  changec(event) {
    this.setState({ contact: event.target.value })
  }

  // 输入
  changed(event) {
    this.setState({ phone: event.target.value })
  }

  // 输入
  changee(event) {
    this.setState({ inspectionTime: event.target.value })
  }

  // 输入
  changef(event) {
    this.setState({ require: event.target.value })
  }

  // 返回
  goBack() {
    this.props.history.goBack()
  }

  submit() {
    let obj = {
      squre: this.state.squre,
      price: this.state.price,
      contact: this.state.contact,
      phone: this.state.phone,
      inspectionTime: this.state.inspectionTime,
      require: this.state.require,
      lift: this.state.lift,
      square: JSON.parse(sessionStorage.getItem("roomInfo"))[0].square,
      pic: JSON.parse(sessionStorage.getItem("roomInfo"))[0].pic,
      video: JSON.parse(sessionStorage.getItem("roomInfo"))[0].video
    }
    this.dataService.saveRoomBaseInfo(this.callBackSaveRoomBaseInfo.bind(this), obj)
  }

  callBackSaveRoomBaseInfo(data) {
    console.log(data)
    if (data.return_code == 100) {
      alert("提交成功")
    }
  }

  render() {
    return (
      <div className="rent-room" style={{ backgroundColor: "#ffffff" }}>
        <div className="rent-room-back">
          <div style={{ float: "left", width: "100%" }} onClick={this.goBack.bind(this)}>
            <img src="./park_m/image/back.png" style={{ margin: "-10px 10px 0 0" }} />
            <span>房间基本信息编辑-</span><span>{sessionStorage.getItem("roomName")}</span>
          </div>
        </div>
        <div style={{ width: "100%", height: "15px", backgroundColor: "#F2F2F2" }}></div>
        <div style={{ fontSize: "40px", color: "#333333", fontWeight: "600", height: "50px", lineHeight: "50px", overflow: "hidden", margin: "30px 0 0 50px" }}>
          <div style={{ width: "10px", height: "100%", backgroundColor: "#0B8BF0", float: "left", marginRight: "30px" }} ></div>
          <div style={{ float: "left", fontSize: "40px" }}>基本信息</div>
        </div>
        <div className="service-tel" style={{ fontSize: "40px", color: "#333333", borderBottom: "2px solid #F2F2F2" }}>
          <div className="enterprise-information-star"></div>
          <div style={{ color: "#949494", height: "80px", float: "left", width: "20%" }}>建筑面积</div>
          <input onChange={this.changea.bind(this)} value={this.state.squre}
            style={{ float: "left", width: "70%", height: "120px", border: "none", outline: "none", marginTop: "-1px", paddingLeft: "30px", color: "#6C6C6C" }}
          />
        </div>
        <div className="service-tel" style={{ fontSize: "40px", color: "#333333", borderBottom: "2px solid #F2F2F2" }}>
          <div className="enterprise-information-star"></div>
          <div style={{ color: "#949494", height: "80px", float: "left", width: "20%", marginRight: "30px" }}>所在楼层</div>
          <div style={{ float: "left" }}>{JSON.parse(sessionStorage.getItem("roomInfo"))[0].floor_code}</div>
        </div>
        <div className="service-tel" style={{ fontSize: "40px", color: "#333333", borderBottom: "2px solid #F2F2F2" }}>
          <div className="enterprise-information-star"></div>
          <div style={{ color: "#949494", height: "80px", float: "left", width: "20%", marginRight: "30px" }}>电梯</div>
          <div style={{ color: "#6C6C6C", float: "left" }}>{JSON.parse(sessionStorage.getItem("roomInfo"))[0].lift == 1 ? "有" : "没有"}</div>
          <div style={{ height: "100%", float: "right" }}>
            <img src="./park_m/image/right.png" style={{ margin: "-10px 40px 0 0"}} />
          </div>
        </div>
        <div className="service-tel" style={{ fontSize: "40px", color: "#333333", borderBottom: "2px solid #F2F2F2" }}>
          <div className="enterprise-information-star"></div>
          <div style={{ color: "#949494", height: "80px", float: "left", width: "20%" }}>租金</div>
          <input onChange={this.changeb.bind(this)} value={this.state.price}
            style={{ float: "left", width: "70%", height: "120px", border: "none", outline: "none", marginTop: "-1px", paddingLeft: "30px", color: "#6C6C6C" }}
          />
        </div>
        <div className="service-tel" style={{ fontSize: "40px", color: "#333333", borderBottom: "2px solid #F2F2F2" }}>
          <div className="enterprise-information-star"></div>
          <div style={{ color: "#949494", height: "80px", float: "left", width: "20%" }}>联系人</div>
          <input onChange={this.changec.bind(this)} value={this.state.contact}
            style={{ float: "left", width: "65%", height: "120px", border: "none", outline: "none", marginTop: "-1px", paddingLeft: "30px", color: "#6C6C6C" }}
          />
        </div>
        <div className="service-tel" style={{ fontSize: "40px", color: "#333333", borderBottom: "2px solid #F2F2F2" }}>
          <div className="enterprise-information-star"></div>
          <div style={{ color: "#949494", height: "80px", float: "left", width: "20%" }}>联系电话</div>
          <input onChange={this.changed.bind(this)} value={this.state.phone}
            style={{ float: "left", width: "65%", height: "120px", border: "none", outline: "none", marginTop: "-1px", paddingLeft: "30px", color: "#6C6C6C" }}
          />
        </div>
        <div className="service-tel" style={{ fontSize: "40px", color: "#333333", borderBottom: "2px solid #F2F2F2", height: "360px" }}>
          <div className="enterprise-information-star"></div>
          <div style={{ color: "#949494", height: "80px", width: "20%" }}>图库</div>
          <div style={{ width: "220px", height: "220px", backgroundColor: "#F2F2F2", textAlign: "center", overflow: "hidden", marginTop: "30px" }}>
            <img src="./park_m/image/addPicture.png" style={{ height: "60px", width: "60px" }} />
            <div style={{ color: "#949494", marginTop: "-30px" }}>添加</div>
          </div>
        </div>
        <div className="service-tel" style={{ fontSize: "40px", color: "#333333", borderBottom: "2px solid #F2F2F2", height: "360px", marginLeft: "30px" }}>
          <div style={{ color: "#949494", height: "80px", width: "20%" }}>房间视频</div>
          <div style={{ width: "220px", height: "220px", backgroundColor: "#F2F2F2", textAlign: "center", overflow: "hidden", marginTop: "30px" }}>
            <img src="./park_m/image/addPicture.png" style={{ height: "60px", width: "60px" }} />
            <div style={{ color: "#949494", marginTop: "-30px" }}>添加</div>
          </div>
        </div>
        <div style={{ fontSize: "40px", color: "#333333", fontWeight: "600", height: "50px", lineHeight: "50px", overflow: "hidden", margin: "30px 0 0 50px" }}>
          <div style={{ width: "10px", height: "100%", backgroundColor: "#0B8BF0", float: "left", marginRight: "30px" }} ></div>
          <div style={{ float: "left", fontSize: "40px" }}>基本信息</div>
        </div>
        <div className="service-tel" style={{ fontSize: "40px", color: "#333333", borderBottom: "2px solid #F2F2F2", marginLeft: "30px" }}>
          <div style={{ color: "#949494", height: "80px", float: "left", width: "20%" }}>看房时间</div>
          <input onChange={this.changed.bind(this)} value={this.state.inspectionTime}
            style={{ float: "left", width: "65%", height: "120px", border: "none", outline: "none", marginTop: "-1px", paddingLeft: "30px", color: "#6C6C6C" }}
          />
        </div>
        <div className="service-tel" style={{ fontSize: "40px", color: "#333333", borderBottom: "2px solid #F2F2F2", marginLeft: "30px" }}>
          <div style={{ color: "#949494", height: "80px", float: "left", width: "20%" }}>租房要求</div>
          <input onChange={this.changed.bind(this)} value={this.state.require}
            style={{ float: "left", width: "65%", height: "120px", border: "none", outline: "none", marginTop: "-1px", paddingLeft: "30px", color: "#6C6C6C" }}
          />
        </div>
        <div style={{ height: "300px" }}></div>
        <div onClick={this.submit.bind(this)}
          style={{ width: "100%", height: "150px", textAlign: "center", lineHeight: "150px", color: "#ffffff", backgroundColor: "#0B8BF0", position: "fixed", bottom: 0, fontSize: "50px" }}>提交</div>
      </div>
    )
  }
}
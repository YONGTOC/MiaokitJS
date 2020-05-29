
import * as React from "react";
import DataService from "dataService";

interface IProps {
  location: any,
  history: any
}

interface IState {
  isElevator: boolean,
  lift: number,
  square: string,
  floorList: Array<any>,
  floorIndex: number,
  isFloor: boolean,
  isFloorRight: boolean
}

export default class RoomBaseUpdate extends React.Component<{ history: any }>{
  public readonly props: Readonly<IProps> = {
    location: this.props.location,
    history: this.props.history
  }

  public readonly state: Readonly<IState> = {
    isElevator: false,
    lift: JSON.parse(sessionStorage.getItem("roomInfo"))[0].lift, // 电梯
    square: JSON.parse(sessionStorage.getItem("roomInfo"))[0].square, // 建筑面积
    floorList: [],
    floorIndex: -1,
    isFloor: false,
    isFloorRight: false
  }

  public dataService: DataService = new DataService()

  componentDidMount() {
    console.log(this.props.location.state.state)
    this.dataService.getParkBuildingInfo(this.callBackGetParkBuildingInfo.bind(this))
  }

  callBackGetParkBuildingInfo(data) {
    console.log("1112", data)
    this.setState({ floorList: data.response[parseInt(sessionStorage.getItem("floorId"))].child })
  }


  // 返回
  goBack() {
    this.props.history.goBack()
  }

  changeElevator() {
    this.setState({ isElevator: !this.state.isElevator })
  }

  closeElevator(flag) {
    this.setState({ isElevator: false, lift: flag ? 1 : 0 })
  }

  // 输入
  changea(event) {
    this.setState({ square: event.target.value })
  }

  // 提交
  submit() {
    let obj = {
      square: this.state.square,
      lift: this.state.lift,
      title: this.props.location.state.state.title,
      price: this.props.location.state.state.price,
      freeRent: this.props.location.state.state.freeRent,
      decorateName: this.props.location.state.state.decorateName,
      decorateId: this.props.location.state.state.decorateId,
      stationAmount: this.props.location.state.state.stationAmount,
      inspectionTime: this.props.location.state.state.inspectionTime,
      enableRentTime: this.props.location.state.state.enableRentTime,
      headimageurl: this.props.location.state.state.headimageurl,
      pic: this.props.location.state.state.pic,
      video: this.props.location.state.state.video,
      contact: this.props.location.state.state.contact,
      phone: this.props.location.state.state.phone,
      sellPrice: this.props.location.state.state.sellPrice,
      require: this.props.location.state.state.require,
      floorId: this.state.floorList[this.state.floorIndex].id
    }
    let roomInfo = JSON.parse(sessionStorage.getItem("roomInfo"))
    roomInfo[0].lift = this.state.lift
    roomInfo[0].square = this.state.square
    roomInfo[0].floor = this.state.floorList[this.state.floorIndex].name
    sessionStorage.setItem("roomInfo", JSON.stringify(roomInfo))
    this.dataService.saveRoomBaseInfo(this.callBackSaveRoomBaseInfo.bind(this), obj)
  }

  callBackSaveRoomBaseInfo(data) {
    if (data.return_code == 100) {
      this.props.history.goBack()
    }
  }

  changeFloor() {
    this.setState({ isFloor: !this.state.isFloor, isFloorRight: !this.state.isFloorRight })
  }

  choiceFloor(index) {
    this.setState({ isFloor: false, floorIndex: index, isFloorRight: false })
  }



  render() {
    return (
      <div className="rent-room" style={{ backgroundColor: "#ffffff" }}>
        <div className="rent-room-back">
          <div style={{ float: "left", width: "100%" }} onClick={this.goBack.bind(this)}>
            <img src="./park_m/image/back.png" style={{ margin: "-10px 10px 0 0" }} />
            <span>房间基本信息编辑-</span><span>{sessionStorage.getItem("roomName")}</span><span>-基本信息修改</span>
          </div>
        </div>
        <div style={{ width: "100%", height: "15px", backgroundColor: "#F2F2F2" }}></div>
        <div className="service-tel" style={{ fontSize: "40px", color: "#333333", borderBottom: "2px solid #F2F2F2" }}>
          <div className="enterprise-information-star"></div>
          <div style={{ color: "#949494", height: "80px", float: "left", width: "30%" }}>建筑面积</div>
          <input onChange={this.changea.bind(this)} value={this.state.square}
            style={{ float: "left", width: "65%", height: "120px", border: "none", outline: "none", marginTop: "-1px", paddingLeft: "30px", color: "#6C6C6C" }}
          />
        </div>
        <div className="service-tel" style={{ fontSize: "40px", color: "#333333", borderBottom: "2px solid #F2F2F2" }}>
          <div className="enterprise-information-star"></div>
          <div style={{ color: "#949494", height: "80px", float: "left", width: "30%" }}>总共楼层</div>
          <input value={this.props.location.state.state.floorSum + "层"}
            style={{ float: "left", width: "65%", height: "120px", border: "none", outline: "none", marginTop: "-1px", paddingLeft: "30px", color: "#6C6C6C" }}
          />
        </div>
        <div className="service-tel" style={{ fontSize: "40px", color: "#333333", borderBottom: "2px solid #F2F2F2" }}>
          <div className="enterprise-information-star"></div>
          <div style={{ color: "#949494", height: "80px", float: "left", width: "30%" }}>所在楼层</div>
          <div onClick={this.changeFloor.bind(this)}
            style={{ float: "left", width: "65%", height: "120px", paddingLeft: "30px", color: "#6C6C6C" }}
          >
            {this.state.floorIndex === -1 ? this.props.location.state.state.floor : this.state.floorList[this.state.floorIndex].name}
            <div style={{ height: "100%", float: "right" }}>
              <img src="./park_m/image/right.png" style={{ margin: "-10px 25px 0 0", transform: this.state.isFloorRight ? "rotate(90deg)" : "" }} />
            </div>
          </div>
        </div>
        {this.state.isFloor ?
          <div style={{ position: "relative", width: "99.9%", backgroundColor: "#ffffff", border: "1px solid #797272", fontSize: "40px", textAlign: "center" }}>
            {this.state.floorList.map((item, index) => {
              return (
                <div style={{ width: "500px", height: "100px", lineHeight: "100px", margin: "auto" }} onClick={e => this.choiceFloor(index)}>{item.name}</div>
              )
            })
            }
          </div> : null
        }
        <div className="service-tel" style={{ fontSize: "40px", color: "#333333", borderBottom: "2px solid #F2F2F2" }} onClick={this.changeElevator.bind(this)}>
          <div className="enterprise-information-star"></div>
          <div style={{ color: "#949494", height: "80px", float: "left", width: "30%", marginRight: "30px" }}>电梯</div>
          <div style={{ color: "#6C6C6C", float: "left" }}>{this.state.lift == 1 ? "有" : "没有"}</div>
          <div style={{ height: "100%", float: "right" }}>
            <img src="./park_m/image/right.png" style={{ margin: "-10px 40px 0 0", transform: this.state.isElevator ? "rotate(90deg)" : "" }} />
          </div>
          {this.state.isElevator ?
            <div style={{ position: "relative", top: "120px", width: "97%", height: "200px", backgroundColor: "#ffffff", border: "1px solid #797272" }}>
              <div style={{ width: "500px", height: "100px", margin: "auto", paddingRight: "100px" }} onClick={e => this.closeElevator(true)}>有</div>
              <div style={{ width: "500px", height: "100px", margin: "auto", paddingRight: "100px" }} onClick={e => this.closeElevator(false)}>没有</div>
            </div> : null
          }
        </div>
        <div onClick={this.submit.bind(this)}
          style={{ width: "100%", height: "150px", textAlign: "center", lineHeight: "150px", color: "#ffffff", backgroundColor: "#0B8BF0", position: "fixed", bottom: 0, fontSize: "50px" }}>
          提交
        </div>
      </div>
    )
  }
}
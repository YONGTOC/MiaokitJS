import * as React from "react";
import DataService from "dataService";

interface IProps {
  location: any,
  history: any
}

interface IState {
  companyName: string,
  user: string,
  phone: string,
  rentDate: string,
  state: number,
}

export default class RoomUse extends React.Component<{ history: any }>{
  public readonly props: Readonly<IProps> = {
    location: this.props.location,
    history: this.props.history
  }

  public dataService: DataService = new DataService()

  componentDidMount() {
    if (this.props.location.state) {
      sessionStorage.setItem("roomInfo", JSON.stringify(this.props.location.state.roomInfo))
    }
    console.log(JSON.parse(sessionStorage.getItem("roomInfo")))
  }

  public readonly state: Readonly<IState> = {
    companyName: JSON.parse(sessionStorage.getItem("roomInfo"))[0].use_info.company_name,
    user: JSON.parse(sessionStorage.getItem("roomInfo"))[0].use_info.user,
    phone: JSON.parse(sessionStorage.getItem("roomInfo"))[0].use_info.phone,
    rentDate: JSON.parse(sessionStorage.getItem("roomInfo"))[0].use_info.rent_date,
    state: JSON.parse(sessionStorage.getItem("roomInfo"))[0].use_info.state
  }

  // 输入
  changea(event) {
    this.setState({ companyName: event.target.value })
  }

  // 输入
  changeb(event) {
    this.setState({ user: event.target.value })
  }

  // 输入
  changec(event) {
    this.setState({ phone: event.target.value })
  }

  // 输入
  changed(event) {
    this.setState({ rentDate: event.target.value })
  }

  // 返回
  goBack() {
    this.props.history.goBack()
  }

  // 提交
  submit() {
    let obj = {
      state: this.state.state,
      companyId: JSON.parse(sessionStorage.getItem("roomInfo"))[0].use_info.company_id,
      companyName: this.state.companyName,
      user: this.state.user,
      phone: this.state.phone,
      rentDate: this.state.rentDate,
      rentEndDate: JSON.parse(sessionStorage.getItem("roomInfo"))[0].use_info.rent_end_date,
      defaultRoom: JSON.parse(sessionStorage.getItem("roomInfo"))[0].use_info.default_room
    }
    this.dataService.saveRoomRentInfo(this.callBackSaveRoomRentInfo.bind(this), obj)
  }

  callBackSaveRoomRentInfo(data) {
    if (data.return_code == 100) {
      this.props.history.goBack()
    }
  }

  changeState(index) {
    this.setState({ state: index })
  }

  render() {
    return (
      <div className="rent-room" style={{ backgroundColor: "#ffffff" }}>
        <div className="rent-room-back">
          <div style={{ float: "left", width: "100%" }} onClick={this.goBack.bind(this)}>
            <img src="./park_m/image/back.png" style={{ margin: "-10px 10px 0 0" }} />
            <span>房间使用信息编辑-</span><span>{sessionStorage.getItem("roomName")}</span>
          </div>
        </div>
        <div style={{ width: "100%", height: "15px", backgroundColor: "#F2F2F2" }}></div>
        <div className="service-tel" style={{ fontSize: "40px", color: "#333333", borderBottom: "2px solid #F2F2F2", height: "220px" }}>
          <div className="enterprise-information-star"></div>
          <div style={{ color: "#949494", height: "80px" }}>房间状态</div>
          <div>
            {["租用中", "招租中", "不出租"].map((item, index) => {
              return (
                <div style={{ float: "left" }} onClick={e=> this.changeState(index)}>
                  <img key={index} style={{ margin: "0 20px 10px 0" }}
                    src={index == this.state.state ? "./park_m/image/checked.png" : "./park_m/image/unchecked.png"} />
                  <span style={{ marginRight: "50px" }}>{item}</span>
                </div>
              )
            })
            }
          </div>
        </div>
        <div className="service-tel" style={{ fontSize: "40px", color: "#333333", borderBottom: "2px solid #F2F2F2" }}>
          <div className="enterprise-information-star"></div>
          <div style={{ color: "#949494", height: "80px", float: "left", width: "20%" }}>租用单位</div>
          <input onChange={this.changea.bind(this)} value={this.state.companyName}
            style={{ float: "left", width: "70%", height: "120px", border: "none", outline: "none", marginTop: "-1px", paddingLeft: "30px", color: "#6C6C6C" }}
          />
        </div>
        <div className="service-tel" style={{ fontSize: "40px", color: "#333333", borderBottom: "2px solid #F2F2F2" }}>
          <div className="enterprise-information-star"></div>
          <div style={{ color: "#949494", height: "80px", float: "left", width: "20%" }}>租用人</div>
          <input onChange={this.changeb.bind(this)} value={this.state.user}
            style={{ float: "left", width: "70%", height: "120px", border: "none", outline: "none", marginTop: "-1px", paddingLeft: "30px", color: "#6C6C6C" }}
          />
        </div>
        <div className="service-tel" style={{ fontSize: "40px", color: "#333333", borderBottom: "2px solid #F2F2F2" }}>
          <div className="enterprise-information-star"></div>
          <div style={{ color: "#949494", height: "80px", float: "left", width: "20%" }}>联系电话</div>
          <input onChange={this.changec.bind(this)} value={this.state.phone}
            style={{ float: "left", width: "70%", height: "120px", border: "none", outline: "none", marginTop: "-1px", paddingLeft: "30px", color: "#6C6C6C" }}
          />
        </div>
        <div className="service-tel" style={{ fontSize: "40px", color: "#333333", borderBottom: "2px solid #F2F2F2" }}>
          <div className="enterprise-information-star"></div>
          <div style={{ color: "#949494", height: "80px", float: "left", width: "20%" }}>租用日期</div>
          <input onChange={this.changed.bind(this)} value={this.state.rentDate}
            style={{ float: "left", width: "65%", height: "120px", border: "none", outline: "none", marginTop: "-1px", paddingLeft: "30px", color: "#6C6C6C" }}
          />
          <img src="./park_m/image/calendar.png" />
        </div>
        <div onClick={this.submit.bind(this)} 
          style={{ width: "100%", height: "150px", textAlign: "center", lineHeight: "150px", color: "#ffffff", backgroundColor: "#0B8BF0", position: "fixed", bottom: 0, fontSize: "50px" }}>
          提交
        </div>
      </div>
    )
  }
}
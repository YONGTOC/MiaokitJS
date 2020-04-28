import * as React from "react";
import { Link } from 'react-router-dom';
import DataService from "dataService";

interface IProps {
  location: any,
  history: any
}

interface IState {
  roomName: string,
  roomInfo: Array<any>
}

export default class RoomDetail extends React.Component<{ history: any }>{
  public readonly props: Readonly<IProps> = {
    location: this.props.location,
    history: this.props.history
  }

  public dataService: DataService = new DataService()


  public readonly state: Readonly<IState> = {
    roomName: "",
    roomInfo: [{ use_info: { state: 1, company_name: "", user: "", phone: "", rent_date: "" } }]
  }

  componentDidMount() {
    if (this.props.location.state) {
      sessionStorage.setItem("roomName", this.props.location.state.name)
      sessionStorage.setItem("roomId", this.props.location.state.id)
    }
    this.setState({ roomName: sessionStorage.getItem("roomName") })
    this.dataService.getRoomInfo(this.callBackGetRoomInfo.bind(this), sessionStorage.getItem("roomId"))
  }

  callBackGetRoomInfo(data) {
    this.setState({ roomInfo: data.response })
    sessionStorage.setItem("roomInfo", JSON.stringify(data.response))
  }

  // 返回
  goBack() {
    this.props.history.goBack()
  }

  render() {
    return (
      <div className="rent-room" style={{ backgroundColor: "#ffffff" }}>
        <div className="rent-room-back">
          <div style={{ float: "left", width: "100%" }} onClick={this.goBack.bind(this)}>
            <img src="./park_m/image/back.png" style={{ margin: "-10px 10px 0 0" }} />
            <span>房间管理-</span><span>{this.state.roomName}</span>
          </div>
        </div>
        <div style={{ width: "100%", height: "15px", backgroundColor: "#F2F2F2" }}></div>
        <Link to={{ pathname: "/roomBase", state: { roomInfo: this.state.roomInfo } }}>
          <div className="service-tel" style={{ fontSize: "40px", color: "#333333", borderBottom: "2px solid #F2F2F2" }}>
            <img src="./park_m/image/room_base.png" style={{ margin: "0 20px 15px 10px" }} />
            <span>房间基本信息</span>
            <span style={{ color: "#0B8BF0", float: "right", marginRight: "50px" }}>修改</span>
          </div>
        </Link>
        <Link to="/roomPattern">
          <div className="service-tel" style={{ fontSize: "40px", color: "#333333", borderBottom: "2px solid #F2F2F2" }}>
            <img src="./park_m/image/pattern.png" style={{ margin: "0 20px 15px 10px" }} />
            <span>房间格局信息</span>
            <span style={{ color: "#0B8BF0", float: "right", marginRight: "50px" }}>修改</span>
          </div>
        </Link>
        <Link to={{ pathname: "/roomUse", state: { roomInfo: this.state.roomInfo } }}>
          <div className="service-tel" style={{ fontSize: "40px", color: "#333333", borderBottom: "2px solid #F2F2F2" }}>
            <img src="./park_m/image/room_rent.png" style={{ margin: "0 20px 15px 10px" }} />
            <span>房间使用信息</span>
            <span style={{ color: "#0B8BF0", float: "right", marginRight: "50px" }}>修改</span>
          </div>
        </Link>
        <div style={{ fontSize: "38px", color: "#949494" }}>
          <div style={{ width: "100%", overflow: "hidden" }}>
            <div style={{ float: "left", width: "300px", margin: "30px 0 0 120px" }}>使用状态</div>
            <div style={{ float: "left", color: "#333333", marginTop: "30px" }}>
              {this.state.roomInfo[0].use_info.state == 0 ? "租用中" : this.state.roomInfo[0].use_info.state == 1 ? "招租中" : "不出租"}
            </div>
          </div>
          {this.state.roomInfo[0].use_info.state == 0 ?
            <div>
              <div style={{ width: "100%", overflow: "hidden" }}>
                <div style={{ float: "left", width: "300px", margin: "30px 0 0 120px" }}>租用单位</div>
                <div style={{ float: "left", color: "#333333", marginTop: "30px" }}>{this.state.roomInfo[0].use_info.company_name}</div>
              </div>
              <div style={{ width: "100%", overflow: "hidden" }}>
                <div style={{ float: "left", width: "300px", margin: "30px 0 0 120px" }}>租用人</div>
                <div style={{ float: "left", color: "#333333", marginTop: "30px" }}>{this.state.roomInfo[0].use_info.user}</div>
              </div>
              <div style={{ width: "100%", overflow: "hidden" }}>
                <div style={{ float: "left", width: "300px", margin: "30px 0 0 120px" }}>联系电话</div>
                <div style={{ float: "left", color: "#333333", marginTop: "30px" }}>{this.state.roomInfo[0].use_info.phone}</div>
              </div>
              <div style={{ width: "100%", overflow: "hidden" }}>
                <div style={{ float: "left", width: "300px", margin: "30px 0 0 120px" }}>租用日期</div>
                <div style={{ float: "left", marginTop: "30px", color: "#F53636" }}>{this.state.roomInfo[0].use_info.rent_date}</div>
              </div>
            </div> : null
          }
        </div>
      </div>
    )
  }
}
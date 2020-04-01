import * as React from "react";
import "css!./styles/roomPattern.css"
import { Link } from 'react-router-dom';
import DataService from "dataService";

interface IProps {
  history: any
}

interface IState {
  file: string,
  roomInfo: Array<any>
}

export default class RoomPattern extends React.Component<{ history: any }>{
  public readonly props: Readonly<IProps> = {
    history: this.props.history,
  }

  public readonly state: Readonly<IState> = {
    file: "",
    roomInfo: [{ part: [] }]
  }

  componentDidMount() {
    this.dataService.getRoomInfo(this.callBackGetRoomInfo.bind(this), sessionStorage.getItem("roomId"))
  }

  callBackGetRoomInfo(data) {
    console.log(data)
    this.setState({ roomInfo: data.response })
    sessionStorage.setItem("roomInfo", JSON.stringify(data.response))
  }

  public dataService: DataService = new DataService()

  upload() {
    this.dataService.upload(this.callBackUpload.bind(this), this.state.file)
  }

  callBackUpload(data) {
    console.log(data)
  }

  // 返回
  goBack() {
    this.props.history.goBack()
  }

  render() {
    return (
      <div className="rent-room" style={{ backgroundColor: "#F2F2F2" }}>
        <div className="rent-room-back">
          <div style={{ float: "left", width: "100%" }} onClick={this.goBack.bind(this)}>
            <img src="./park_m/image/back.png" style={{ margin: "-10px 10px 0 0" }} />
            <span>房间格局信息</span>
          </div>
        </div>
        <div className="room-pattern-content">
          {this.state.roomInfo[0].part.map((item, index) => {
            return (
              <div key={index} style={{ width: "100%", height: "400px", backgroundColor: "#ffffff", marginBottom: "10px" }}>
                <div style={{ overflow: "hidden", padding: "30px 0 0 50px" }}>
                  <div style={{ fontSize: "42px", color: "#333333", fontWeight: "600", float: "left" }}>{item.name}</div>
                  <Link to={{ pathname: "/roomPatternUpdate", state: {index: index} }}>
                    <div style={{ float: "right", fontSize: "40px", color: "#0B8BF0", marginRight: "50px" }}>修改</div>
                  </Link>
                </div>
                <div style={{ width: "100%", height: "300px", lineHeight: "300px", paddingLeft: "50px" }}>
                  <div style={{ fontSize: "40px", color: "#6C6C6C", float: "left", marginRight: "20px" }}>缩略图：</div>
                  <div style={{ float: "left", width: "200px", height: "200px" }}>
                    <img src={item.headimageurl} style={{ width: "100%", height: "100%" }} />
                  </div>
                  <div style={{ fontSize: "40px", color: "#6C6C6C", float: "left", margin: "0 20px 0 50px" }}>全景图：</div>
                  <div style={{ float: "left", width: "200px", height: "200px" }}>
                    <img src={item.panoramaurl} style={{ width: "100%", height: "100%" }} />
                  </div>
                </div>
              </div>  
            )
          })

          }
        </div>
      </div>
    )
  }
}
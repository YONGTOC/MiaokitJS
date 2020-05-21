import * as React from "react";
import "css!./styles/roomPatternUpdate.css"
import DataService from "dataService";

interface IProps {
  history: any,
  location: any
}

interface IState {
  fileIndex: number,
  fileArr: Array<any>,
  name: string
}

export default class roomPatternUpdate extends React.Component<{ history: any }>{
  public readonly props: Readonly<IProps> = {
    history: this.props.history,
    location: this.props.location
  }

  public readonly state: Readonly<IState> = {
    fileIndex: 0,
    fileArr: [],
    name: JSON.parse(sessionStorage.getItem("roomInfo"))[0].part[this.props.location.state.index].name
  }

  componentDidMount() {
    sessionStorage.setItem("part", JSON.stringify(JSON.parse(sessionStorage.getItem("roomInfo"))[0].part[this.props.location.state.index]))
    let fileArr = this.state.fileArr
    fileArr[0] = JSON.parse(sessionStorage.getItem("part")).headimageurl
    fileArr[1] = JSON.parse(sessionStorage.getItem("part")).panoramaurl
    this.setState({ fileArr: fileArr })
  }

  public dataService: DataService = new DataService()

  upload(file) {
    this.dataService.upload(this.callBackUpload.bind(this), file)
  }

  callBackUpload(data) {
    console.log("callBackUpload", data)
    if (data.return_code == 100) {
      let fileArr = this.state.fileArr
      fileArr[this.state.fileIndex] = data.response
      this.setState({ fileArr: fileArr }, () => {
        console.log(this.state.fileArr)
      })
    } else {
      alert("上传失败")
    }
  }

  change(event) {
    this.setState({ name: event.target.value })
  }

  // 返回
  goBack() {
    this.props.history.goBack()
  }

  updateA(event) {
    let formData = new FormData();
    formData.append("file", event.target.files[0]);
    this.upload(formData)
    this.setState({fileIndex : 0})
  }

  updateB(event) {
    let formData = new FormData();
    formData.append("file", event.target.files[0]);
    this.upload(formData)
    this.setState({ fileIndex: 1 })
  }

  // 提交
  submit() {
    let obj = JSON.parse(sessionStorage.getItem("roomInfo"))[0].part
    obj[this.props.location.state.index] = {
      id: JSON.parse(sessionStorage.getItem("part")).id,
      name: this.state.name,
      position: JSON.parse(sessionStorage.getItem("part")).position,
      headimageurl: this.state.fileArr[0],
      panoramaurl: this.state.fileArr[1]
    }
    this.dataService.saveRoomPartBaseInfo(this.callBackSaveRoomPartBaseInfo.bind(this), obj)
  }

  callBackSaveRoomPartBaseInfo(data) {
    if (data.return_code == 100) {
      this.props.history.goBack()
    } else {
      alert("提交失败")
    }
  }

  // 清除图片
  close(index) {
    let fileArr = this.state.fileArr
    fileArr[index] = ""
    this.setState({ fileArr: fileArr })
  }

  render() {
    return (
      <div className="rent-room" style={{ backgroundColor: "#F2F2F2" }}>
        <div className="rent-room-back">
          <div style={{ float: "left", width: "100%" }} onClick={this.goBack.bind(this)}>
            <img src="./park_m/image/back.png" style={{ margin: "-10px 10px 0 0" }} />
            <span>房间格局修改</span>
          </div>
        </div>
        <div style={{ backgroundColor: "#ffffff", width: "100%", height: "90%", marginTop: "15px" }}>
          <div style={{ width: "100%", height: "160px", lineHeight: "160px", fontSize: "40px", paddingLeft: "50px" }}>
            <div className="enterprise-information-star"></div>
            <div style={{ color: "#949494", height: "80px", float: "left", marginRight: "30px", marginTop: "-16px" }}>格局名称：</div>
          </div>
          <div style={{ height: "120px", margin: "0 50px 0 50px", fontSize: "40px" }} >
            <input value={this.state.name} onChange={this.change.bind(this)}
              style={{ backgroundColor: "#F2F2F2", width: "100%", margin: "auto", height: "120px", lineHeight: "120px", border: "none", outline: "none", color: "#333333", paddingLeft: "50px" }} />
          </div>
          <div style={{ fontSize: "40px", color: "#6C6C6C", margin: "100px 50px 0 50px", height: "500px" }}>
            <div style={{ float: "left", width: "50%" }}>
              <div>缩略图:</div>
              <div style={{ width: "250px", height: "250px", marginTop: "50px" }} className={this.state.fileArr[0] !== "" ? "" : "room-add-a"} >

                <img src={this.state.fileArr[0] !== "" ? this.state.fileArr[0] : "./park_m/image/addPicture.png"} width="100%" height="100%" id="a-img"
                  className={this.state.fileArr[0] !== "" ? "" : "room-add-img"}/>
              </div>
            </div>
            <div style={{ float: "left", width: "50%" }}>
              <div>全景图:</div>
              <div style={{ width: "250px", height: "250px", marginTop: "50px" }} className={this.state.fileArr[1] !== "" ? "" : "room-add-a"}>
            
                <img src={this.state.fileArr[1] !== "" ? this.state.fileArr[1] : "./park_m/image/addPicture.png"} width="100%" height="100%" id="b-img"
                  className={this.state.fileArr[1] !== "" ? "" : "room-add-img" } />
              </div>
            </div>
          </div>
        </div>
        <div className="rent-room-detail-bottom">
          <div style={{ float: "left", width: "50%", height: "100%", textAlign: "center", lineHeight: "130px", color: "#6C6C6C", backgroundColor: "#F2F2F2" }} onClick={this.goBack.bind(this)}>取消</div>
          <div style={{ float: "left", width: "50%", height: "100%", textAlign: "center", lineHeight: "130px", backgroundColor: "#0B8BF0", color: "#ffffff" }} onClick={this.submit.bind(this)}>提交</div>
        </div>
      </div>
    )
  }
}
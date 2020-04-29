import * as React from "react";
import DataService from "dataService";

interface IProps {
  location: any,
  history: any
}

interface IState {
  square: number,
  price: number,
  contact: string,
  phone: string,
  inspectionTime: string,
  require: string,
  lift: number,
  isElevator: boolean,
  pic: Array<any>,
  video: Array<any>,
  headimageurl: string
}

export default class RoomBase extends React.Component<{ history: any }>{
  public readonly props: Readonly<IProps> = {
    location: this.props.location,
    history: this.props.history
  }

  public readonly state: Readonly<IState> = {
    square: JSON.parse(sessionStorage.getItem("roomInfo"))[0].square, // 建筑面积
    price: JSON.parse(sessionStorage.getItem("roomInfo"))[0].price, // 租金
    contact: JSON.parse(sessionStorage.getItem("roomInfo"))[0].contact, // 联系人
    phone: JSON.parse(sessionStorage.getItem("roomInfo"))[0].phone, // 联系电话
    inspectionTime: JSON.parse(sessionStorage.getItem("roomInfo"))[0].inspection_time, // 看房时间
    require: JSON.parse(sessionStorage.getItem("roomInfo"))[0].require, // 租房要求
    pic: JSON.parse(sessionStorage.getItem("roomInfo"))[0].pic ? JSON.parse(sessionStorage.getItem("roomInfo"))[0].pic : [], // 图库
    video: JSON.parse(sessionStorage.getItem("roomInfo"))[0].video ? JSON.parse(sessionStorage.getItem("roomInfo"))[0].video : [] , // 视频
    lift: JSON.parse(sessionStorage.getItem("roomInfo"))[0].lift, // 电梯
    headimageurl: JSON.parse(sessionStorage.getItem("roomInfo"))[0].headimageurl,
    isElevator: false
  }

  public dataService: DataService = new DataService()

  componentDidMount() {
    $('#a-img').click(() => {
      $('#a-input').click()
    })
    $('#b-img').click(() => {
      $('#b-input').click()
    })
    $('#h-img').click(() => {
      $('#h-input').click()
    })
    if (this.props.location.state) {
      sessionStorage.setItem("roomInfo", JSON.stringify(this.props.location.state.roomInfo))
    }
    console.log(JSON.parse(sessionStorage.getItem("roomInfo")))
    console.log("pic", this.state.pic)
  }

  // 输入
  changea(event) {
    this.setState({ square: event.target.value })
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
      square: this.state.square,
      price: this.state.price,
      contact: this.state.contact,
      phone: this.state.phone,
      inspectionTime: this.state.inspectionTime,
      require: this.state.require,
      lift: this.state.lift,
      headimageurl: this.state.headimageurl,
      pic: this.state.pic,
      video: this.state.video
    }
    this.dataService.saveRoomBaseInfo(this.callBackSaveRoomBaseInfo.bind(this), obj)
  }

  callBackSaveRoomBaseInfo(data) {
    if (data.return_code == 100) {
      this.props.history.goBack()
    }
  }

  changeElevator() {
    this.setState({ isElevator: !this.state.isElevator })
  }

  closeElevator(flag) {
    this.setState({ isElevator: false, lift: flag ? 1 : 0 })
  }

  // 清除图片
  closePic(index) {
    let pic = this.state.pic
    pic.splice(index, 1)
    this.setState({ pic: pic })
  }

  // 清除视频
  closeVideo(index) {
    let video = this.state.video
    video.splice(index, 1)
    this.setState({ video: video })
  }

  // 清空缩略图
  closeHeadimageurl() {
    this.setState({ headimageurl: "" })
  }

  uploadPic(file) {
    this.dataService.upload(this.callBackUploadPic.bind(this), file)
  }

  callBackUploadPic(data) {
    console.log("callBackUpload", data)
    if (data.return_code == 100) {
      let pic = this.state.pic
      pic.push({ url: data.response, name: "" })
      this.setState({ pic: pic })
    } else {
      alert("上传失败")
    }
  }

  updatePic(event) {
    let formData = new FormData();
    formData.append("file", event.target.files[0]);
    this.uploadPic(formData)
  }

  updateVideo(event) {
    let formData = new FormData();
    formData.append("file", event.target.files[0]);
    this.uploadVideo(formData)
  }

  updateHeadimage(event) {
    let formData = new FormData();
    formData.append("file", event.target.files[0]);
    this.uploadHeadimage(formData)
  }

  uploadVideo(file) {
    this.dataService.upload(this.callBackUploadVideo.bind(this), file)
  }

  uploadHeadimage(file) {
    this.dataService.upload(this.callBackUploadHeadimage.bind(this), file)
  }

  callBackUploadVideo(data) {
    console.log("callBackUpload", data)
    if (data.return_code == 100) {
      let video = this.state.video
      video.push({ url: data.response, name: "" })
      this.setState({ video: video })
    } else {
      alert("上传失败")
    }
  }

  callBackUploadHeadimage(data) {
    console.log("headimageUrl", data)
    if (data.return_code == 100) {
      this.setState({ headimageurl: data.response })
    } else {
      alert("上传失败")
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
          <input onChange={this.changea.bind(this)} value={this.state.square}
            style={{ float: "left", width: "70%", height: "120px", border: "none", outline: "none", marginTop: "-1px", paddingLeft: "30px", color: "#6C6C6C" }}
          />
        </div>
        <div className="service-tel" style={{ fontSize: "40px", color: "#333333", borderBottom: "2px solid #F2F2F2" }}>
          <div className="enterprise-information-star"></div>
          <div style={{ color: "#949494", height: "80px", float: "left", width: "20%", marginRight: "30px" }}>所在楼层</div>
          <div style={{ float: "left" }}>{JSON.parse(sessionStorage.getItem("roomInfo"))[0].floor_code}</div>
        </div>
        <div className="service-tel" style={{ fontSize: "40px", color: "#333333", borderBottom: "2px solid #F2F2F2" }} onClick={this.changeElevator.bind(this)}>
          <div className="enterprise-information-star"></div>
          <div style={{ color: "#949494", height: "80px", float: "left", width: "20%", marginRight: "30px" }}>电梯</div>
          <div style={{ color: "#6C6C6C", float: "left" }}>{this.state.lift == 1 ? "有" : "没有"}</div>
          <div style={{ height: "100%", float: "right" }}>
            <img src="./park_m/image/right.png" style={{ margin: "-10px 40px 0 0", transform: this.state.isElevator ? "rotate(90deg)" : "" }} />
          </div>
          {this.state.isElevator ? 
            <div style={{ position: "relative", top: "120px", width: "97%", height: "200px", backgroundColor: "#ffffff", border: "1px solid #797272" }}>
              <div style={{ width: "500px", height: "100px", margin: "auto", paddingRight: "100px", textAlign: "center" }} onClick={e => this.closeElevator(true)}>有</div>
              <div style={{ width: "500px", height: "100px", margin: "auto", paddingRight: "100px", textAlign: "center" }} onClick={e => this.closeElevator(false)}>没有</div>
            </div> : null
          }
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

        <div className="service-tel" style={{ fontSize: "40px", color: "#333333", borderBottom: "2px solid #F2F2F2", height: 360 + Math.floor(this.state.pic.length / 3) * 250 }}>
          <div className="enterprise-information-star"></div>
          <div style={{ color: "#949494", height: "80px", width: "20%" }}>缩略图</div>

          {this.state.headimageurl ? 
            <div style={{ width: "220px", height: "220px", backgroundColor: "#F2F2F2", textAlign: "center", overflow: "hidden", margin: "30px 30px 0 0", float: "left" }}>
              <img src="./park_m/image/close.png" style={{ position: "absolute", left: "250px" }} onClick={e => this.closeHeadimageurl()} />
              <img src={this.state.headimageurl} style={{ height: "100%", width: "100%" }} />
            </div> :

            <div style={{ width: "220px", height: "220px", backgroundColor: "#F2F2F2", textAlign: "center", overflow: "hidden", marginTop: "30px", float: "left" }} id="h-img">
              <img src="./park_m/image/addPicture.png" style={{ height: "60px", width: "60px" }} />
              <div style={{ color: "#949494", marginTop: "-30px" }}>添加</div>
            </div>
           }

          <input type="file" onChange={this.updateHeadimage.bind(this)} id="h-input" style={{ display: "none" }} />
        </div>

        <div className="service-tel" style={{ fontSize: "40px", color: "#333333", borderBottom: "2px solid #F2F2F2", height: 360 + Math.floor(this.state.pic.length / 3) * 250 }}>
          <div className="enterprise-information-star"></div>
          <div style={{ color: "#949494", height: "80px", width: "20%" }}>图库</div>
          {this.state.pic.map((item, index) => {
            return (
              <div style={{ width: "220px", height: "220px", backgroundColor: "#F2F2F2", textAlign: "center", overflow: "hidden", margin: "30px 30px 0 0", float: "left" }} key={index}>
                <img src="./park_m/image/close.png" style={{ position: "absolute", left: (index % 3 + 1) * 250 }} onClick={e => this.closePic(index)} />
                <img src={item.url} style={{ height: "100%", width: "100%" }} />
                </div>
              )
            })
          }
          <input type="file" onChange={this.updatePic.bind(this)} id="a-input" style={{ display: "none" }} />
          <div style={{ width: "220px", height: "220px", backgroundColor: "#F2F2F2", textAlign: "center", overflow: "hidden", marginTop: "30px", float: "left" }} id="a-img">
            <img src="./park_m/image/addPicture.png" style={{ height: "60px", width: "60px" }} />
            <div style={{ color: "#949494", marginTop: "-30px" }}>添加</div>
          </div>
        </div>
        <div className="service-tel" style={{ fontSize: "40px", color: "#333333", borderBottom: "2px solid #F2F2F2", height: 360 + Math.floor(this.state.video.length / 3) * 250, marginLeft: "30px" }}>
          <div style={{ color: "#949494", height: "80px", width: "20%" }}>房间视频</div>
          {this.state.video.map((item, index) => {
            return (
              <div style={{ width: "220px", height: "220px", backgroundColor: "#F2F2F2", textAlign: "center", overflow: "hidden", margin: "30px 30px 0 0", float: "left" }} key={index}>
                <img src="./park_m/image/close.png" style={{ position: "absolute", left: (index % 3 + 1) * 250 }} onClick={e => this.closeVideo(index)} />
                <img src={item.url} style={{ height: "100%", width: "100%" }} />
              </div>
            )
          })
          }
          <input type="file" onChange={this.updateVideo.bind(this)} id="b-input" style={{ display: "none" }} />
          <div style={{ width: "220px", height: "220px", backgroundColor: "#F2F2F2", textAlign: "center", overflow: "hidden", marginTop: "30px", float: "left" }} id="b-img">
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
          <input onChange={this.changee.bind(this)} value={this.state.inspectionTime}
            style={{ float: "left", width: "65%", height: "120px", border: "none", outline: "none", marginTop: "-1px", paddingLeft: "30px", color: "#6C6C6C" }}
          />
        </div>
        <div className="service-tel" style={{ fontSize: "40px", color: "#333333", borderBottom: "2px solid #F2F2F2", marginLeft: "30px" }}>
          <div style={{ color: "#949494", height: "80px", float: "left", width: "20%" }}>租房要求</div>
          <input onChange={this.changef.bind(this)} value={this.state.require}
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
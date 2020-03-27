import * as React from "react";

interface IProps {
  location: any,
  history: any
}

interface IState {
  inputValuea: string,
  inputValueb: string,
  inputValuec: string,
  inputValued: string
}

export default class RoomBase extends React.Component<{ history: any }>{
  public readonly props: Readonly<IProps> = {
    location: this.props.location,
    history: this.props.history
  }

  public readonly state: Readonly<IState> = {
    inputValuea: "请输入建筑面积",
    inputValueb: "请输入使用人姓名",
    inputValuec: "输入联系电话",
    inputValued: "请选择使用日期"
  }

  // 聚焦
  foucusa() {
    if (this.state.inputValuea === "请输入建筑面积") {
      this.setState({ inputValuea: "" })
    }
  }

  // 失焦
  blura() {
    if (this.state.inputValuea === "") {
      this.setState({ inputValuea: "请输入建筑面积" })
    }
  }

  // 输入
  changea(event) {
    this.setState({ inputValuea: event.target.value })
  }

  // 聚焦
  foucusb() {
    if (this.state.inputValueb === "请输入使用人姓名") {
      this.setState({ inputValueb: "" })
    }
  }

  // 失焦
  blurb() {
    if (this.state.inputValueb === "") {
      this.setState({ inputValueb: "请输入使用人姓名" })
    }
  }

  // 输入
  changeb(event) {
    this.setState({ inputValueb: event.target.value })
  }

  // 聚焦
  foucusc() {
    if (this.state.inputValuec === "输入联系电话") {
      this.setState({ inputValuec: "" })
    }
  }

  // 失焦
  blurc() {
    if (this.state.inputValuec === "") {
      this.setState({ inputValuec: "输入联系电话" })
    }
  }

  // 输入
  changec(event) {
    this.setState({ inputValuec: event.target.value })
  }

  // 聚焦
  foucusd() {
    if (this.state.inputValued === "请选择使用日期") {
      this.setState({ inputValued: "" })
    }
  }

  // 失焦
  blurd() {
    if (this.state.inputValued === "") {
      this.setState({ inputValued: "请选择使用日期" })
    }
  }

  // 输入
  changed(event) {
    this.setState({ inputValued: event.target.value })
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
          <input onBlur={this.blura.bind(this)} onFocus={this.foucusa.bind(this)} onChange={this.changea.bind(this)} value={this.state.inputValuea}
            style={{ float: "left", width: "70%", height: "120px", border: "none", outline: "none", marginTop: "-1px", paddingLeft: "30px", color: "#6C6C6C" }}
          />
        </div>
        <div className="service-tel" style={{ fontSize: "40px", color: "#333333", borderBottom: "2px solid #F2F2F2" }}>
          <div className="enterprise-information-star"></div>
          <div style={{ color: "#949494", height: "80px", float: "left", width: "20%", marginRight: "30px" }}>所在楼层</div>
          <div style={{ float: "left" }}>3F</div>
        </div>
        <div className="service-tel" style={{ fontSize: "40px", color: "#333333", borderBottom: "2px solid #F2F2F2" }}>
          <div className="enterprise-information-star"></div>
          <div style={{ color: "#949494", height: "80px", float: "left", width: "20%", marginRight: "30px" }}>电梯</div>
          <div style={{ color: "#6C6C6C", float: "left" }}>是否有电梯</div>
          <div style={{ height: "100%", float: "right" }}>
            <img src="./park_m/image/right.png" style={{ margin: "-10px 40px 0 0"}} />
          </div>
        </div>
        <div className="service-tel" style={{ fontSize: "40px", color: "#333333", borderBottom: "2px solid #F2F2F2" }}>
          <div className="enterprise-information-star"></div>
          <div style={{ color: "#949494", height: "80px", float: "left", width: "20%" }}>租金</div>
          <input onBlur={this.blurc.bind(this)} onFocus={this.foucusc.bind(this)} onChange={this.changec.bind(this)} value={this.state.inputValuec}
            style={{ float: "left", width: "70%", height: "120px", border: "none", outline: "none", marginTop: "-1px", paddingLeft: "30px", color: "#6C6C6C" }}
          />
        </div>
        <div className="service-tel" style={{ fontSize: "40px", color: "#333333", borderBottom: "2px solid #F2F2F2" }}>
          <div className="enterprise-information-star"></div>
          <div style={{ color: "#949494", height: "80px", float: "left", width: "20%" }}>联系人</div>
          <input onBlur={this.blurd.bind(this)} onFocus={this.foucusd.bind(this)} onChange={this.changed.bind(this)} value={this.state.inputValued}
            style={{ float: "left", width: "65%", height: "120px", border: "none", outline: "none", marginTop: "-1px", paddingLeft: "30px", color: "#6C6C6C" }}
          />
        </div>
        <div className="service-tel" style={{ fontSize: "40px", color: "#333333", borderBottom: "2px solid #F2F2F2" }}>
          <div className="enterprise-information-star"></div>
          <div style={{ color: "#949494", height: "80px", float: "left", width: "20%" }}>联系电话</div>
          <input onBlur={this.blurd.bind(this)} onFocus={this.foucusd.bind(this)} onChange={this.changed.bind(this)} value={this.state.inputValued}
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
          <input onBlur={this.blurd.bind(this)} onFocus={this.foucusd.bind(this)} onChange={this.changed.bind(this)} value={this.state.inputValued}
            style={{ float: "left", width: "65%", height: "120px", border: "none", outline: "none", marginTop: "-1px", paddingLeft: "30px", color: "#6C6C6C" }}
          />
        </div>
        <div className="service-tel" style={{ fontSize: "40px", color: "#333333", borderBottom: "2px solid #F2F2F2", marginLeft: "30px" }}>
          <div style={{ color: "#949494", height: "80px", float: "left", width: "20%" }}>租房要求</div>
          <input onBlur={this.blurd.bind(this)} onFocus={this.foucusd.bind(this)} onChange={this.changed.bind(this)} value={this.state.inputValued}
            style={{ float: "left", width: "65%", height: "120px", border: "none", outline: "none", marginTop: "-1px", paddingLeft: "30px", color: "#6C6C6C" }}
          />
        </div>
        <div style={{height: "300px"}}></div>
        <div style={{ width: "100%", height: "150px", textAlign: "center", lineHeight: "150px", color: "#ffffff", backgroundColor: "#0B8BF0", position: "fixed", bottom: 0, fontSize: "50px" }}>提交</div>
      </div>
    )
  }
}
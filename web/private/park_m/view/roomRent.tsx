import * as React from "react";
import "css!./styles/room.css"
import DataService from "dataService";

interface IProps {
}

interface IState {
  inputValue: string,
  tagArray: Array<any>,
  roomArray: Array<any>,
  spreadIndex: number,
  isMask: boolean,
  datas: any
  tagList: Array<any>,
  isModal: boolean,
  modalIndex: number,
  timeId: number
}

export default class RoomRent extends React.Component<{ history: any }>{
  public readonly state: Readonly<IState> = {
    inputValue: "搜索房间",
    tagArray: [
      { name: "选择日期", isSpread: false }, { name: "选择楼宇", isSpread: false }, { name: "选择楼层", isSpread: false }
    ],
    roomArray: [
      { name: "100室" }, { name: "200室" }, { name: "300室" }, { name: "400室" }, { name: "500室" }, { name: "600室" }, { name: "700室" }, { name: "800室" }
    ],
    spreadIndex: 3,
    isMask: false,
    datas: [
      [
        { name: "不限" }, { name: "2020-6" }, { name: "2020-7" }, { name: "2020-8" }, { name: "2020-9" }, { name: "2020-10" }, { name: "2020-11" }, { name: "2020-12" },
        { name: "2021-1" }, { name: "2021-2" }, { name: "2021-3" }, { name: "2021-4" }, { name: "2021-5" }, { name: "2021-6" }, { name: "2021-7" }
      ],
      [{ name: "不限" }],
      [{ name: "不限" }]
    ],
    tagList: ["", "", ""],
    isModal: false,
    modalIndex: 0,
    timeId: 0
  }

  public dataService: DataService = new DataService()

  componentDidMount() {
    this.getExpiredRoomInfo()
    this.dataService.getParkBuildingAndFloorLevel(this.callBackGetParkBuildingAndFloorLevel.bind(this))
  }

  getExpiredRoomInfo() {
    let obj = {
      id: JSON.parse(sessionStorage.getItem("userInfos")).userId,
      parkId: sessionStorage.getItem("park_id"),
      roomName: this.state.inputValue === "搜索房间" ? "" : this.state.inputValue,
      date: this.state.datas[0][this.state.tagList[0]] ? this.state.datas[0][this.state.tagList[0]].name !== "不限" ? this.state.datas[0][this.state.tagList[0]].name : "" : "",
      buildingId: this.state.datas[1][this.state.tagList[1]] ? this.state.datas[1][this.state.tagList[1]].id : "",
      floorId: this.state.datas[2][this.state.tagList[2]] ? this.state.datas[2][this.state.tagList[2]].id : ""
    }
    this.dataService.getExpiredRoomInfo(this.callBackGetExpiredRoomInfo.bind(this), obj)
  }

  callBackGetExpiredRoomInfo(data) {
    let datas = this.state.datas
    this.setState({ roomArray: data.response }, () => {
      if (this.state.tagList[1] !== "") {
        if (this.state.tagList[1] === 0) {
          datas[2] = [{ name: "不限" }]
        } else {
          datas[2] = [...[{ name: "不限" }], ...datas[1][this.state.tagList[1]].child]
        }
        this.setState({ datas: datas })
      }
    })
  }

  callBackGetParkBuildingAndFloorLevel(data) {
    let datas = this.state.datas
    datas[1] = [...[{ name: "不限" }], ...data.response]
    this.setState({ datas: datas })
  }

  // 聚焦
  foucus() {
    if (this.state.inputValue === "搜索房间") {
      this.setState({ inputValue: "" })
    }
  }

  // 失焦
  blur() {
    if (this.state.inputValue === "") {
      this.setState({ inputValue: "搜索房间" })
    }
  }

  // 输入
  change(event) {
    this.setState({ inputValue: event.target.value })
    this.debounce()
  }


  // 返回
  goBack() {
    this.props.history.goBack()
  }

  // 展开
  spread(index) {
    this.setState({
      spreadIndex: this.state.spreadIndex === index ? 3 : index,
      isMask: this.state.spreadIndex === index ? false : true
    })
  }

  clickMask() {
    this.setState({ isMask: false, spreadIndex: 3 })
  }

  changeTagList(index) {
    let tagList = this.state.tagList
    let tagArray = this.state.tagArray
    tagList[this.state.spreadIndex] = index
    tagArray[this.state.spreadIndex].name = this.state.datas[this.state.spreadIndex][index].name
    this.setState({ tagList: tagList, tagArray: tagArray, })
    this.clickMask()
    this.getExpiredRoomInfo()
  }

  openModal(index) {
    this.setState({ isModal: true, modalIndex: index })
  }

  closeModal() {
    this.setState({ isModal: false })
  }

  debounce() {
    let timeId
    clearTimeout(this.state.timeId)
    timeId = setTimeout(() => {
      this.getExpiredRoomInfo()
    }, 500)
    this.setState({ timeId: timeId })
  }
  render() {
    return (
      <div className="rent-room" style={{ backgroundColor: "#ffffff" }}>
        <div className="infoarea-top">
          <div className="infoarea-child-top">
            <img src="./park_m/image/whiteBack.png" style={{ margin: "0 10px 30px -15px", padding: "15px 15px 15px 15px" }} onClick={this.goBack.bind(this)} />
            <input className="infoarea-input" value={this.state.inputValue} onFocus={this.foucus.bind(this)} onBlur={this.blur.bind(this)} onChange={this.change.bind(this)} />
            <img src="./park_m/image/search.png" className="infoarea-search-img" />
            <span className="search-user-bt">搜索</span>
          </div>
        </div>
        <div style={{ fontSize: "38px", color: "#333333", margin: "0 50px 0 50px" }}>
          <div style={{ height: "50px", width: "100%", overflow: "hidden", marginTop: "50px" }}>
            <div style={{ backgroundColor: "#0B8BF0", height: "50px", width: "10px", float: "left" }}></div>
            <div style={{ fontWeight: 600, float: "left", lineHeight: "50px", marginLeft: "20px" }}>租用到期查询</div>
          </div>
          <div style={{ overflow: "hidden", marginTop: "40px" }}>
            {
              this.state.tagArray.map((item, index) => {
                return (
                  <div key={index} style={{ float: "left", width: "33.3%", textAlign: "center", color: this.state.spreadIndex === index ? "#0B8BF0" : null }} onClick={e => this.spread(index)}>
                    {item.name}
                    <img src={this.state.spreadIndex === index ? "./park_m/image/up.png" : "./park_m/image/down.png"} width="25px" height="20px" style={{ margin: "0 0 5px 10px" }} />
                  </div>
                )
              })
            }
          </div>
          {this.state.isMask ?
            <div style={{ width: "100%", height: "900px", backgroundColor: "#ffffff", position: "absolute", top: "23%", marginLeft: "-50px", zIndex: 10, padding: "20px 0 0 50px", overflowY: "auto" }}>
              {
                this.state.datas[this.state.spreadIndex].map((item, index) => {
                  return (
                    <div key={index} style={{ fontSize: "36px", height: "120px", lineHeight: "120px", color: this.state.tagList[this.state.spreadIndex] === index ? "#0B8BF0" : null }} onClick={e => this.changeTagList(index)}>
                      {item.name}
                    </div>
                  )
                })
              }
            </div> : null
          }
          <div style={{ color: "#F53636", margin: "20px 0 20px 0" }}>租用到期查询  ({this.state.roomArray.length} 间)</div>
          {
            this.state.roomArray.map((item, index) => {
              return (
                <div key={index} onClick={e => this.openModal(index)} style={{
                  backgroundColor: "#FF7E7E", float: "left", minWidth: "180px", height: "80px", lineHeight: "80px", borderRadius: "5px", textAlign: "center", margin: "20px", padding: "0 20px",
                  color: "#ffffff"
                }}>
                  {item.room_name}
                </div>
              )
            })
          }
        </div>
        {this.state.isModal ?
          <div style={{ position: "fixed", width: "80%", height: "720px", marginLeft: "10%", backgroundColor: "#ffffff", fontSize: "38px", overflow: "hidden", borderRadius: "5px", boxShadow: "0px 3px 10px rgba(0,0,0,0.2)" }}>
            <div style={{ height: "50px", width: "100%", overflow: "hidden", margin: "30px 0 0 40px" }}>
              <div style={{ backgroundColor: "#0B8BF0", height: "50px", width: "10px", float: "left" }}></div>
              <div style={{ fontWeight: 600, float: "left", lineHeight: "50px", marginLeft: "20px" }}>房间租用详情</div>
              <img src="./park_m/image/close_h.png" style={{ float: "right", marginRight: "80px" }} onClick={this.closeModal.bind(this)} />
            </div>
            <div style={{ overflow: "hidden", margin: "30px 0 0 30px" }}>
              <div style={{ float: "left", width: "30%", color: "#949494" }}>
                房间名称
            </div>
              <div style={{ float: "left", width: "70%", color: "#333333" }}>
                {this.state.roomArray[this.state.modalIndex].room_name}
              </div>
            </div>
            <div style={{ overflow: "hidden", margin: "30px 0 0 30px" }}>
              <div style={{ float: "left", width: "30%", color: "#949494" }}>
                使用状态
            </div>
              <div style={{ float: "left", width: "70%", color: "#333333" }}>
                租用中
            </div>
            </div>
            <div style={{ overflow: "hidden", margin: "30px 0 0 30px" }}>
              <div style={{ float: "left", width: "30%", color: "#949494" }}>
                租用单位
            </div>
              <div style={{ float: "left", width: "70%", color: "#333333" }}>
                {this.state.roomArray[this.state.modalIndex].company_name}
              </div>
            </div>
            <div style={{ overflow: "hidden", margin: "30px 0 0 30px" }}>
              <div style={{ float: "left", width: "30%", color: "#949494" }}>
                租用人
              </div>
              <div style={{ float: "left", width: "70%", color: "#333333" }}>
                {this.state.roomArray[this.state.modalIndex].user}
              </div>
            </div>
            <div style={{ overflow: "hidden", margin: "30px 0 0 30px" }}>
              <div style={{ float: "left", width: "30%", color: "#949494" }}>
                联系电话
              </div>
              <div style={{ float: "left", width: "70%", color: "#333333" }}>
                {this.state.roomArray[this.state.modalIndex].phone}
              </div>
            </div>
            <div style={{ overflow: "hidden", margin: "30px 0 0 30px" }}>
              <div style={{ float: "left", width: "30%", color: "#949494" }}>
                租用日期
              </div>
              <div style={{ float: "left", width: "70%", color: "#333333" }}>
                {this.state.roomArray[this.state.modalIndex].rent_date}
              </div>
            </div>
            <div style={{ overflow: "hidden", margin: "30px 0 0 30px" }}>
              <div style={{ float: "left", width: "30%", color: "#949494" }}>
                到期日期
              </div>
              <div style={{ float: "left", width: "70%", color: "#333333" }}>
                {this.state.roomArray[this.state.modalIndex].rent_end_date}
              </div>
            </div>
          </div> : null
        }

        {this.state.isMask ?
          <div className="mask" onClick={this.clickMask.bind(this)} style={{ position: "absolute", top: "50%", height: "50%" }}></div> : null
        }
      </div>
    )
  }
}

import * as React from "react";
import "css!./styles/room.css"
import { Link } from 'react-router-dom';
import DataService from "dataService";

interface IProps {
}

interface IState {
  inputValue: string,
  tagArray: Array<any>,
  roomArray: Array<any>,
  spreadIndex: number,
  isMask: boolean,
  datas: Array<any>,
  tagList: Array<any>,
  isModal: boolean
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
      ["不限", "2020年6月", "2020年7月", "2020年8月", "2020年9月", "2020年10月", "2020年11月", "2020年12月", "2021年1月", "2021年2月", "2021年3月", "2021年4月", "2021年5月", "2021年6月", "2021年7月"],
      ["不限", "楼宇A", "楼宇B", "楼宇C", "楼宇D", "楼宇E", "楼宇F"],
      ["不限", "楼层1", "楼层2", "楼层3", "楼层4", "楼层5", "楼层6"]
    ],
    tagList: ["", "", ""],
    isModal: false
  }

  public dataService: DataService = new DataService()

  componentDidMount() {
    this.dataService.getParkBuildingInfo(this.callBackParkBuildingInfo.bind(this))
  }

  callBackParkBuildingInfo(data) {
    data.response.forEach(item => {
      item.child.forEach(it => {
        it.isSpread = false
      })
    })
    this.setState({ buildingArr: data.response })
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
    tagArray[this.state.spreadIndex].name = this.state.datas[this.state.spreadIndex][index]
    this.setState({ tagList: tagList, tagArray: tagArray })
    this.clickMask()
  }

  openModal() {
    this.setState({ isModal: true })
  }

  closeModal() {
    this.setState({ isModal: false })
  }

  render() {
    return (
      <div className="rent-room" style={{backgroundColor: "#ffffff"}}>
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
                  <img src={this.state.spreadIndex === index ? "./park_m/image/up.png" : "./park_m/image/down.png"} width="25px" height="20px" style={{margin: "0 0 5px 10px"}} />
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
                    <div key={index} style={{ fontSize: "36px", height: "120px", lineHeight: "120px", color: this.state.tagList[this.state.spreadIndex] === index ? "#0B8BF0" : null }} onClick={e=> this.changeTagList(index)}>
                      {item}
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
                <div key={index} onClick={this.openModal.bind(this)} style={{
                  backgroundColor: "#FF7E7E", float: "left", minWidth: "180px", height: "80px", lineHeight: "80px", borderRadius: "5px", textAlign: "center", margin: "20px", padding: "0 20px",
                  color: "#ffffff"
                }}>
                  {item.name}
                </div>  
              )
            })
          }
        </div>
        {this.state.isModal ?
          <div style={{ position: "relative", width: "80%", height: "720px", margin: "auto", backgroundColor: "#ffffff", fontSize: "38px", overflow: "hidden", borderRadius: "5px", boxShadow: "0px 3px 10px rgba(0,0,0,0.2)" }}>
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
                A座-1F-201室
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
                浙江永拓信息科技有限公司
            </div>
            </div>
            <div style={{ overflow: "hidden", margin: "30px 0 0 30px" }}>
              <div style={{ float: "left", width: "30%", color: "#949494" }}>
                租用人
            </div>
              <div style={{ float: "left", width: "70%", color: "#333333" }}>
                小明
            </div>
            </div>
            <div style={{ overflow: "hidden", margin: "30px 0 0 30px" }}>
              <div style={{ float: "left", width: "30%", color: "#949494" }}>
                联系电话
            </div>
              <div style={{ float: "left", width: "70%", color: "#333333" }}>
                123456789
            </div>
            </div>
            <div style={{ overflow: "hidden", margin: "30px 0 0 30px" }}>
              <div style={{ float: "left", width: "30%", color: "#949494" }}>
                租用日期
            </div>
              <div style={{ float: "left", width: "70%", color: "#333333" }}>
                2020-03-02
            </div>
            </div>
            <div style={{ overflow: "hidden", margin: "30px 0 0 30px" }}>
              <div style={{ float: "left", width: "30%", color: "#949494" }}>
                到期日期
            </div>
              <div style={{ float: "left", width: "70%", color: "#333333" }}>
                2021-03-02
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

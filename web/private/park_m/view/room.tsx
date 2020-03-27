import * as React from "react";
import "css!./styles/room.css"
import { Link } from 'react-router-dom';
import DataService from "dataService";

interface IProps {
}

interface IState {
  inputValue: string,
  buildingArr: Array<any>,
  buildingIndex: any,
  floorIndex: any
}

export default class Room extends React.Component<{ history: any }>{
  public readonly state: Readonly<IState> = {
    inputValue: "搜索房间", // 输入框默认值
    buildingArr: [], // 楼座
    buildingIndex: "",
    floorIndex: ""
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
    console.log("zzzzzzz", data)
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

  // 去楼层
  goFloor(index) {
    this.setState({ buildingIndex: index })
  }

  // 返回建筑
  backBuilding() {
    this.setState({ buildingIndex: "" })
  }

  // 展开
  spread(index) {
    let buildingArr = this.state.buildingArr
    buildingArr[this.state.buildingIndex].child[index].isSpread = !buildingArr[this.state.buildingIndex].child[index].isSpread
    console.log(buildingArr)
    this.setState({ buildingArr: buildingArr, floorIndex: index })
  }

  render() {
    return (
      <div className="rent-room">
        <div className="infoarea-top">
          <div className="infoarea-child-top">
            <img src="./park_m/image/whiteBack.png" style={{ margin: "0 10px 30px -15px", padding: "15px 15px 15px 15px" }} onClick={this.goBack.bind(this)} />
            <input className="infoarea-input" value={this.state.inputValue} onFocus={this.foucus.bind(this)} onBlur={this.blur.bind(this)} onChange={this.change.bind(this)} />
            <img src="./park_m/image/search.png" className="infoarea-search-img" />
            <span className="search-user-bt">搜索</span>
          </div>
        </div>
        <div className="room-content">
          {this.state.buildingIndex === "" ?
            <div style={{ fontSize: "40px", color: "#333333", fontWeight: "600", width: "100%", padding: "30px 0 0 50px" }}>园区楼宇</div> :
            <div style={{ fontSize: "40px", color: "#0B8BF0", fontWeight: "600", width: "100%", padding: "30px 0 0 50px" }}>
              <span onClick={this.backBuilding.bind(this)}>园区楼宇</span>
              <img src="./park_m/image/blue_right.png" width="30px" height="30px" style={{ margin: "0 10px 5px 10px" }} />
              <span style={{ color: "#333333", fontWeight: "600" }}>{this.state.buildingArr[this.state.buildingIndex].name}</span>
            </div>
          }
          {
            this.state.buildingIndex === "" ?
            this.state.buildingArr.map((item, index) => {
              return (
                <div key={index} className="room-content-child" onClick={e => this.goFloor(index)}>
                  <img src="./park_m/image/building.png" style={{margin: "0 30px 30px 0"}} />
                  <span style={{ fontSize: "40px", color: "#333333" }}>{item.name}</span>
                  <div style={{ float: "right", lineHeight: "180px" }}>
                    <img src="./park_m/image/right.png" />
                  </div>
                </div>  
              )
            }) :
              this.state.buildingArr[this.state.buildingIndex].child.map((item, index) => {
              return (
                <div key={index}>
                  <div className="room-content-child" onClick={e => this.spread(index)}>
                    <img src="./park_m/image/floor.png" style={{ margin: "10px 30px 30px 0" }} width="40px" height="40px" />
                    <span style={{ fontSize: "42px", color: "#333333" }}>{item.name}</span>
                    <div style={{ float: "right", lineHeight: "180px" }}>
                      <img src="./park_m/image/right.png" className={item.isSpread ? "room-spread-right" : null} />
                    </div>
                  </div>
                  {this.state.floorIndex === index ?
                    <div style={{ width: "90%", margin: "10px auto", minHeight: "200px", overflow: "hidden" }}>
                      {this.state.buildingArr[this.state.buildingIndex].child[this.state.floorIndex].child.map((it, ind) => {
                        return (
                          <Link to={{ pathname: "/roomDetail", state: { name: it.name } }}>
                            <div key={ind} className={ind === 1 ? "room-single-add" : "room-single"}>
                              {it.name}
                            </div>
                          </Link>
                        )
                      })
                      }
                    </div> : null
                  }
                </div>
              )
            })
          }
        </div>
      </div>
    )
  }
}

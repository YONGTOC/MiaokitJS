import * as React from "react";
import DataService from "dataService";
import { DatePicker, List } from 'antd-mobile';

interface IProps {
  location: any,
  history: any
}

interface IState {
  companyName: string,
  user: string,
  phone: string,
  rentDate: string,
  rentEndDate: string,
  sellState: number,
  state: number,
  isSpread: boolean,
  companyNameList: Array<any>,
  companyId: number,
}

export default class RoomUse extends React.Component<{ history: any }>{
  public readonly props: Readonly<IProps> = {
    location: this.props.location,
    history: this.props.history
  }

  public dataService: DataService = new DataService()

  componentDidMount() {
    $('#startDate').click(() => {
      $('#startDatePicker').click()
    })
    $('#endDate').click(() => {
      $('#endDatePicker').click()
    })
    $('#workoffDate').click(() => {
      $('#workoffDatePicker').click()
    })
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
    rentEndDate: JSON.parse(sessionStorage.getItem("roomInfo"))[0].use_info.rent_end_date,
    state: JSON.parse(sessionStorage.getItem("roomInfo"))[0].use_info.state,
    sellState: JSON.parse(sessionStorage.getItem("roomInfo"))[0].use_info.sell_state,
    isSpread: false,
    companyNameList: [],
    companyId: JSON.parse(sessionStorage.getItem("roomInfo"))[0].use_info.company_id,
  }

  // 输入
  changea(event) {
    this.setState({ companyName: event.target.value })
    this.dataService.findCompany(this.callBackFindCompany.bind(this), "", event.target.value);
  }

  callBackFindCompany(data) {
    console.log("callBackFindCompany", data)
    this.setState({ companyNameList: data.response, isSpread: data.response.length > 0 ? true : false })
  }

  clickCompanyName(index) {
    let companyNameList = this.state.companyNameList[index]
    this.setState({
      companyId: companyNameList.id, companyName: companyNameList.name,
      user: companyNameList.contact, phone: companyNameList.phone, isSpread: false
    })
  }

  // 返回
  goBack() {
    this.props.history.goBack()
  }

  // 提交
  submit() {
    let obj = {
      state: this.state.sellState === 1 ? 2 : this.state.state,
      companyId: this.state.companyId,
      companyName: this.state.companyName,
      user: this.state.user,
      phone: this.state.phone,
      rentDate: this.state.rentDate,
      rentEndDate: this.state.rentEndDate,
      sellState: this.state.state === 0 ? 2 : this.state.sellState,
      defaultRoom: JSON.parse(sessionStorage.getItem("roomInfo"))[0].use_info.default_room
    }
    if (obj.state === 0) {
      for (var key in obj) {
        if (!obj[key] && obj[key] !== 0) {
          return alert("请把资料填完整！")
        }
      }
    }
    this.dataService.saveRoomRentInfo(this.callBackSaveRoomRentInfo.bind(this), obj)
  }

  callBackSaveRoomRentInfo(data) {
    if (data.return_code == 100) {
      this.props.history.goBack()
    }
  }

  changeState(index) {
    this.setState({ state: index }, () => {
      $('#startDate').click(() => {
        $('#startDatePicker').click()
      })
      $('#endDate').click(() => {
        $('#endDatePicker').click()
      })
    })
  }

  changeSellState(index) {
    this.setState({ sellState: index }, () => {
      $('#workoffDate').click(() => {
        $('#workoffDatePicker').click()
      })
    })
  }

  // 组件获取开始时间
  setStartDate(date) {
    let dateStr = JSON.stringify(date);
    let dateN = dateStr.slice(1, 11);
    this.setState({ rentDate: dateN })
  }

  // 组件获取开始时间
  setEndDate(date) {
    let dateStr = JSON.stringify(date);
    let dateN = dateStr.slice(1, 11);
    this.setState({ rentEndDate: dateN })
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

        {this.state.sellState !== 1 ?
          <div className="service-tel" style={{ fontSize: "40px", color: "#333333", borderBottom: "2px solid #F2F2F2", height: "220px" }}>
            <div className="enterprise-information-star"></div>
            <div style={{ color: "#949494", height: "80px" }}>出租状态</div>
            <div>
              {["租用中", "招租中", "不出租"].map((item, index) => {
                return (
                  <div style={{ float: "left" }} onClick={e => this.changeState(index)}>
                    <img key={index} style={{ margin: "0 20px 10px 0" }}
                      src={index == this.state.state ? "./park_m/image/checked.png" : "./park_m/image/unchecked.png"} />
                    <span style={{ marginRight: "50px" }}>{item}</span>
                  </div>
                )
              })
              }
            </div>
          </div> : null
        }

        {this.state.state !== 0 ?
          <div className="service-tel" style={{ fontSize: "40px", color: "#333333", borderBottom: "2px solid #F2F2F2", height: "220px" }}>
            <div className="enterprise-information-star"></div>
            <div style={{ color: "#949494", height: "80px" }}>出售状态</div>
            <div>
              {["出售中", "已出售", "不出售"].map((item, index) => {
                return (
                  <div style={{ float: "left" }} onClick={e => this.changeSellState(index)}>
                    <img key={index} style={{ margin: "0 20px 10px 0" }}
                      src={index == this.state.sellState ? "./park_m/image/checked.png" : "./park_m/image/unchecked.png"} />
                    <span style={{ marginRight: "50px" }}>{item}</span>
                  </div>
                )
              })
              }
            </div>
          </div> : null
        }
        {this.state.state === 0 ?
          <div>
            <div className="service-tel" style={{ fontSize: "40px", color: "#333333", borderBottom: "2px solid #F2F2F2" }}>
              <div className="enterprise-information-star"></div>
              <div style={{ color: "#949494", height: "80px", float: "left", width: "20%" }}>租用单位</div>
              <input onChange={this.changea.bind(this)} value={this.state.companyName}
                style={{ float: "left", width: "70%", height: "120px", border: "none", outline: "none", marginTop: "-1px", paddingLeft: "30px", color: "#6C6C6C" }}
              />
            </div>
            {this.state.isSpread ?
              <div style={{ width: "70%", backgroundColor: "#ffffff", position: "absolute", left: "28%", border: "1px solid #797272" }}>
                {this.state.companyNameList.map((item, index) => {
                  return (
                    <div key={index} style={{ height: "100px", fontSize: "40px", lineHeight: "100px" }} onClick={e => this.clickCompanyName(index)}>{item.name}</div>
                  )
                })
                }
              </div> : null
            }
            <div className="service-tel" style={{ fontSize: "40px", color: "#333333", borderBottom: "2px solid #F2F2F2" }}>
              <div className="enterprise-information-star"></div>
              <div style={{ color: "#949494", height: "80px", float: "left", width: "20%" }}>租用人</div>
              <div style={{ float: "left", width: "70%", height: "120px", border: "none", outline: "none", marginTop: "-1px", paddingLeft: "30px", color: "#6C6C6C" }}>
                {this.state.user}
              </div>
            </div>
            <div className="service-tel" style={{ fontSize: "40px", color: "#333333", borderBottom: "2px solid #F2F2F2" }}>
              <div className="enterprise-information-star"></div>
              <div style={{ color: "#949494", height: "80px", float: "left", width: "20%" }}>联系电话</div>
              <div style={{ float: "left", width: "70%", height: "120px", border: "none", outline: "none", marginTop: "-1px", paddingLeft: "30px", color: "#6C6C6C" }}>
                {this.state.phone}
              </div>
            </div>
            <div className="service-tel" id="startDate" style={{ fontSize: "40px", color: "#333333", borderBottom: "2px solid #F2F2F2" }}>
              <div className="enterprise-information-star"></div>
              <div style={{ color: "#949494", height: "80px", float: "left", width: "20%" }}>租用日期</div>
              <div style={{ float: "left", width: "65%", height: "120px", border: "none", outline: "none", marginTop: "-1px", paddingLeft: "30px", color: "#6C6C6C" }} >
                {this.state.rentDate}
              </div>
              <img src="./park_m/image/calendar.png" />
            </div>

            <div className="service-tel" id="endDate" style={{ fontSize: "40px", color: "#333333", borderBottom: "2px solid #F2F2F2" }}>
              <div className="enterprise-information-star"></div>
              <div style={{ color: "#949494", height: "80px", float: "left", width: "20%" }}>到期日期</div>
              <div style={{ float: "left", width: "65%", height: "120px", border: "none", outline: "none", marginTop: "-1px", paddingLeft: "30px", color: "#6C6C6C" }} >
                {this.state.rentEndDate}
              </div>
              <img src="./park_m/image/calendar.png" />
            </div>

          </div> : null
        }

        {false ?
          <div>
            <div className="service-tel" style={{ fontSize: "40px", color: "#333333", borderBottom: "2px solid #F2F2F2" }}>
              <div className="enterprise-information-star"></div>
              <div style={{ color: "#949494", height: "80px", float: "left", width: "20%" }}>联系人</div>
              <input onChange={this.changea.bind(this)} value={this.state.companyName}
                style={{ float: "left", width: "70%", height: "120px", border: "none", outline: "none", marginTop: "-1px", paddingLeft: "30px", color: "#6C6C6C" }}
              />
            </div>

            <div className="service-tel" style={{ fontSize: "40px", color: "#333333", borderBottom: "2px solid #F2F2F2" }}>
              <div className="enterprise-information-star"></div>
              <div style={{ color: "#949494", height: "80px", float: "left", width: "20%" }}>联系电话</div>
              <input onChange={this.changea.bind(this)} value={this.state.companyName}
                style={{ float: "left", width: "70%", height: "120px", border: "none", outline: "none", marginTop: "-1px", paddingLeft: "30px", color: "#6C6C6C" }}
              />
            </div>
         
            <div className="service-tel" id="workoffDate" style={{ fontSize: "40px", color: "#333333", borderBottom: "2px solid #F2F2F2" }}>
              <div className="enterprise-information-star"></div>
              <div style={{ color: "#949494", height: "80px", float: "left", width: "20%" }}>售出日期</div>
              <div style={{ float: "left", width: "65%", height: "120px", border: "none", outline: "none", marginTop: "-1px", paddingLeft: "30px", color: "#6C6C6C" }} >
                {this.state.rentDate}
              </div>
              <img src="./park_m/image/calendar.png" />
            </div>

          </div> : null
        }
        <DatePicker
          mode="date"
          extra=" "
          onChange={this.setStartDate.bind(this)}
        >
          <List.Item arrow="horizontal" style={{ position: "absolute", top: "-100px" }} id="startDatePicker"></List.Item>
        </DatePicker>

        <DatePicker
          mode="date"
          extra=" "
          onChange={this.setEndDate.bind(this)}
        >
          <List.Item arrow="horizontal" style={{ position: "absolute", top: "-100px" }} id="endDatePicker"></List.Item>
        </DatePicker>

        <DatePicker
          mode="date"
          extra=" "
          onChange={this.setEndDate.bind(this)}
        >
          <List.Item arrow="horizontal" style={{ position: "absolute", top: "-100px" }} id="workoffDatePicker"></List.Item>
        </DatePicker>

        <div onClick={this.submit.bind(this)}
          style={{ width: "100%", height: "150px", textAlign: "center", lineHeight: "150px", color: "#ffffff", backgroundColor: "#0B8BF0", position: "fixed", bottom: 0, fontSize: "50px" }}>
          提交
        </div>
      </div>
    )
  }
}
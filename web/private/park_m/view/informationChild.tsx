import * as React from "react";
import "css!./styles/informationChild.css"
import DataService from "dataService";

interface IProps {
  history: any,
  location: any
}

interface IState {
  inputValue: string,
  listArr: Array<any>,
  tagIndex: number,
  tagArr: Array<any>,
}

export default class InformationChild extends React.Component {
  public readonly state: Readonly<IState> = {
    inputValue: "搜索政策信息", //  输入框默认值
    listArr: [],
    tagIndex: 0, // 选中的标签
    tagArr: []
  }

  public readonly props: Readonly<IProps> = {
    history: this.props.history,
    location: this.props.location
  }
  public dataService: DataService = new DataService()

  componentWillMount() {
    sessionStorage.setItem("informationId", "0")
    this.getTag()
  }

  getTag() {
    if (parseInt(sessionStorage.getItem("informationId")) === 0) {
      this.dataService.getPreferentialPolicyType(this.callBackTag.bind(this), 1)
    } else if (parseInt(sessionStorage.getItem("informationId")) === 1) {
      this.dataService.getParkInformationType(this.callBackTag.bind(this), 1)
    } else if (parseInt(sessionStorage.getItem("informationId")) === 2) {
      this.dataService.getActivityType(this.callBackTag.bind(this), 1)
    } else {
      this.dataService.getThirdServiceType(this.callBackTag.bind(this), 1)
    }
  }

  getTagContent() {
    let obj = {
      park_id: sessionStorage.getItem("park_id"),
      type_id: this.state.tagArr[this.state.tagIndex].id
    }
    if (parseInt(sessionStorage.getItem("informationId")) === 0) {
      this.dataService.getPreferentialPolicies(this.callBackTagContent.bind(this), obj)
    } else if (parseInt(sessionStorage.getItem("informationId")) === 1) {
      this.dataService.getParkInformationList(this.callBackTagContent.bind(this), obj)
    } else if (parseInt(sessionStorage.getItem("informationId")) === 2) {
      this.dataService.getActivities(this.callBackTagContent.bind(this), obj)
    } else {
      this.dataService.getThirdServices(this.callBackTagContent.bind(this), obj)
    }
  }

  callBackTag(data) {
    this.setState({ tagArr: JSON.parse(data).response }, () => {
      this.getTagContent()
    })
  }

  callBackTagContent(data) {
    let listArr = []
    if (parseInt(sessionStorage.getItem("informationId")) === 2) {
      JSON.parse(data).response.forEach(item => {
        let obj = { title: "", visitAmount: "", time: "", headimgurl: "", taga: "", tagb: "", contenta: "", contentb: "" }
        obj.title = item.name
        obj.visitAmount = item.visit_amount
        obj.time = item.time
        obj.headimgurl = item.headimgurl
        obj.taga = "活动时间"
        obj.tagb = "活动位置"
        obj.contenta = item.start_time
        obj.contentb = item.position
        listArr.push(obj)
      })
      this.setState({ listArr: listArr })
    } else if (parseInt(sessionStorage.getItem("informationId")) === 3) {
      JSON.parse(data).response.forEach(item => {
        let obj = { title: "", visitAmount: "", time: "", headimgurl: "", taga: "", tagb: "", contenta: "", contentb: "" }
        obj.title = item.title
        obj.visitAmount = item.visit_amount
        obj.time = item.time
        obj.headimgurl = item.headimgurl
        obj.taga = "服务内容"
        obj.tagb = "联系方式"
        obj.contenta = item.content
        obj.contentb = item.mobile
        listArr.push(obj)
      })
      this.setState({ listArr: listArr })
    } else {
      console.log("aaaaa", JSON.parse(data).response[0].content.split("<p>"))

      this.setState({ listArr: JSON.parse(data).response ? JSON.parse(data).response : [] })
    }
  }

  // 聚焦
  foucus() {
    if (this.state.inputValue === "搜索政策信息") {
      this.setState({ inputValue: "" })
    }
  }

  // 失焦
  blur() {
    if (this.state.inputValue === "") {
      this.setState({ inputValue: "搜索政策信息" })
    }
  }

  // 输入
  change(event) {
    this.setState({ inputValue: event.target.value })
  }

  // 选中标签
  clickTag(index) {
    this.setState({ tagIndex: index }, () => {
      this.getTagContent()
    })
  }

  // 返回
  goBack() {
    this.props.history.goBack()
  }

  // 详情
  goDetail(index) {
    this.props.history.push({ pathname: "/informationDetail", state: { index: index } })
  }

  render() {
    return (
      <div className="information-child">
        <div className="information-child-top">
          <div style={{width: "90%", margin: "auto"}}>
            <input className="information-child-input" value={this.state.inputValue} onFocus={this.foucus.bind(this)} onBlur={this.blur.bind(this)} onChange={this.change.bind(this)}/>
            <img src="./park_m/image/search.png" className="information-childa-search-img" />
          </div>
        </div>
        <div className="information-child-tag">
          {this.state.tagArr.map((item, index) => {
            return (
              <div key={index} className={index !== this.state.tagIndex ? "information-child-c" : "information-child-add-c"}
                onClick={e => this.clickTag(index)} style={{ width: 100 / this.state.tagArr.length + "%"}}>{item.name}</div>
            )
          })
          }
        </div>
        <div className="information-child-List">
          {this.state.listArr.map((item, index) => {
            return (
              parseInt(sessionStorage.getItem("informationId")) < 2 ?
              <div key={index} className="information-child-List-child" onClick={e => this.goDetail(item.id)} >
                <div style={{ fontSize: "42px", color: "#333333", width: "90%", margin: "auto", paddingTop: "30px" }}>
                  {item.name}
                </div>
                <div style={{
                  color: "#949494", fontSize: "36px", margin: "10px 0 0 50px", width: "90%", display: "-webkit-box", webkitLineClamp: "3", overflow: "hidden",
                  webkitBoxOrient: "vertical",  minHeight: "210px" }}>
                  {item.content}
                </div>
                <div style={{ color: "#949494", fontSize: "34px", margin: "30px 0 0 50px" }}>
                  <div style={{ float: "left" }}>{item.visit_amount}次浏览</div>
                  <div style={{ float: "right", marginRight: "50px" }}>{item.time} 发布</div>
                </div>
              </div> :
              <div key={index} className="information-child-List-child" onClick={e => this.goDetail(item.id)} >
                <div style={{ overflow: "hidden"}}>
                  <div style={{ width: "250px", height: "260px", float: "left", margin: "30px 0 0 50px", borderRadius: "10px" }}>
                    <img src={item.headimgurl} style={{ width: "100%", height: "100%" }} />
                  </div>
                  <div style={{ float: "left", fontSize: "45px", margin: "25px 0 0 50px", fontWeight: "600", color: "#333333", width: "60%" }}>
                    <div>{item.title}</div>
                    <div style={{ color: "#949494", fontSize: "40px", fontWeight: "400", marginTop: "85px", display: "-webkit-box", webkitBoxOrient: "vertical", webkitLineClamp: "1", overflow: "hidden" }}>{item.taga}：{item.contenta}</div>
                    <div style={{ color: "#949494", fontSize: "40px", fontWeight: "400", display: "-webkit-box", webkitBoxOrient: "vertical", webkitLineClamp: "1", overflow: "hidden" }}>{item.tagb}：{item.contentb}</div>
                  </div>
                </div>
                <div style={{ color: "#949494", fontSize: "34px", margin: "30px 0 0 50px", overflow: "hidden" }}>
                  <div style={{ float: "left" }}>{item.visitAmount}次浏览</div>
                  <div style={{ float: "right", marginRight: "50px" }}>{item.time} 发布</div>
                </div>
              </div>
            )
          })
          }
          < div style={{ width: "100%", height: "100px", textAlign: "center", fontSize: "40px", lineHeight: "100px" }}>到底啦~</div>
        </div>
      </div>
    )
  }
}
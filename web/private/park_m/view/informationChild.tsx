import * as React from "react";
import "css!./styles/informationChild.css"
import { Link } from 'react-router-dom';

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
    inputValue: "搜索人员", // 输入框默认值
    listArr: [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13],
    tagIndex: 0, // 选中的标签
    tagArr: [
      { tagList: ["国家级", "省级", "市级", "区级"] }, { tagList: ["通知公告", "园区动态", "办事指南", "其他"] }, { tagList: ["全部", "户外活动", "行业会议", "交友聚会", "促销活动"] },
      { tagList: ["全部", "宽带服务", "绿植服务", "企业采购", "其他"]}
    ],
  }

  public readonly props: Readonly<IProps> = {
    history: this.props.history,
    location: this.props.location
  }

  componentWillMount() {
    if (this.props.location.state) {
      sessionStorage.setItem("informationId", this.props.location.state.index)
    }
  }

  // 聚焦
  foucus() {
    if (this.state.inputValue === "搜索人员") {
      this.setState({ inputValue: "" })
    }
  }

  // 失焦
  blur() {
    if (this.state.inputValue === "") {
      this.setState({ inputValue: "搜索人员" })
    }
  }

  // 输入
  change(event) {
    this.setState({ inputValue: event.target.value })
  }

  // 选中标签
  clickTag(index) {
    this.setState({ tagIndex: index })
  }

  // 返回
  goBack() {
    this.props.history.goBack()
  }

  // 详情
  goDetail(index) {
    this.props.history.push({ pathname: "informationDetail", state: { index: index } })
  }

  render() {
    return (
      <div className="information-child">
        <div className="infoarea-top">
          <div className="infoarea-child-top">
            <img src="./park_m/image/whiteBack.png" style={{ margin: "0 10px 30px -15px", padding: "15px 15px 15px 15px" }} onClick={this.goBack.bind(this)} />
            <input className="infoarea-input" value={this.state.inputValue} onFocus={this.foucus.bind(this)} onBlur={this.blur.bind(this)} onChange={this.change.bind(this)} />
            <img src="./park_m/image/search.png" className="infoarea-search-img" />
            <span className="search-user-bt">搜索</span>
          </div>
        </div>
        <div className="information-child-tag">
          {this.state.tagArr[sessionStorage.getItem("informationId")].tagList.map((item, index) => {
            return (
              <div key={index} className={index !== this.state.tagIndex ? "information-child-c" : "information-child-add-c"}
                onClick={e => this.clickTag(index)} style={{ width: 100 / this.state.tagArr[sessionStorage.getItem("informationId")].tagList.length + "%"}}>{item}</div>
            )
          })
          }
        </div>
        <div className="information-child-List">
          {[1, 2, 3, 4, 5, 6, 7, 8].map((item, index) => {
            return (
              <div key={index} className="information-child-List-child" onClick={e => this.goDetail(index)} >
                <div style={{ fontSize: "42px", color: "#333333", width: "90%", margin: "auto", paddingTop: "30px" }}>
                  桂林市科技局关于 2020年度国家外国专家项目申报的通知
                </div>
                <div style={{
                  color: "#949494", fontSize: "36px", margin: "10px 0 0 50px", width: "90%", display: "-webkit-box", webkitLineClamp: "3", overflow: "hidden",
                  webkitBoxOrient: "vertical" }}>
                              各相关单位：根据什么什么根据什么什么根据什么什么根据什么什么根据什么什么根据什么什么根据什么什么根据什么什么根据什么什么
                              根据什么什么根据什么什么根据什么什么根据什么什么根据什么什么根据什么什么根据什么什么根据什么什么根据什么什么根据什么什么根据什么什么
                              根据什么什么根据什么什么根据什么什么根据什么什么根据什么什么根据什么什么根据什么什么根据什么什么根据什么什么根据什么什么根据什么什么根据什么什么根据什么什么
                </div>
                <div style={{ color: "#949494", fontSize: "34px", margin: "30px 0 0 50px" }}>
                  <div style={{ float: "left" }}>200次浏览</div>
                  <div style={{ float: "right", marginRight: "50px" }}>2020-02-28 14:38:15 发布</div>
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
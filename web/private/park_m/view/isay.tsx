import * as React from "react";
import "css!./styles/isay.css"

interface IProps {
}

interface IState {
  inputValue: string,
  tagArray: Array<any>,
  tagIndex: 0,
  textareaValue: string
}

class Isay extends React.Component<{ history: any }>{
  public readonly state: Readonly<IState> = {
    tagArray: [{ name: "咨询" }, { name: "建议" }, { name: "投诉" }, { name: "其它" }],
    tagIndex: 0,
    inputValue: "不能少于3个字且不能大于33个字", // 主题默认值
    textareaValue: "请将留言内容描述出来（200字内）"
  }


  // 聚焦
  inputFoucus() {
    if (this.state.inputValue === "不能少于3个字且不能大于33个字") {
      this.setState({ inputValue: "" })
    }
  }

  // 失焦
  inputBlur() {
    if (this.state.inputValue === "") {
      this.setState({ inputValue: "不能少于3个字且不能大于33个字" })
    }
  }

  // 输入
  inputChange(event) {
    this.setState({ inputValue: event.target.value })
  }

  // 聚焦
  textareaFoucus() {
    if (this.state.textareaValue === "请将留言内容描述出来（200字内）") {
      this.setState({ textareaValue: "" })
    }
  }

  // 失焦
  textareaBlur() {
    if (this.state.textareaValue === "") {
      this.setState({ textareaValue: "请将留言内容描述出来（200字内）" })
    }
  }

  // 输入
  textareaChange(event) {
    this.setState({ textareaValue: event.target.value })
  }

  // 返回
  goBack() {
    this.props.history.goBack()
  }

  render() {
    return (
      <div className="isay">
        <div className="isay-back">
          <img src="./park_m/image/back.png" style={{ marginBottom: "25px" }} onClick={this.goBack.bind(this)} />
          <span style={{ color: "#6C6C6C", fontSize: "40px", marginLeft: "15px"}}>我有话说</span>
        </div>
        <div style={{ fontSize: "40px", color: "#949494", margin: "20px 0 0 35px", overflow: "hidden" }}>
          <div className="isay-star"></div><div style={{ float: "left", marginLeft: "15px" }}>留言类别:</div>
        </div>
        <div className="isay-tag">
          {this.state.tagArray.map((item, index) => {
            return <div className="isay-tag-child" key={index}>
              <img src="./park_m/image/checked.png" style={{ margin: "-22px 20px 0 0" }} />
              <span style={{ fontSize: "40px", color: "#6C6C6C" }}>{item.name}</span>
            </div>
            })
          }
        </div>
        <div style={{ borderTop: "3px solid #F2F2F2", marginTop: "30px", margin: "0 30px 0 30px" }}></div>
        <div style={{ fontSize: "40px", color: "#949494", margin: "20px 0 0 35px", overflow: "hidden" }}>
          <div className="isay-star"></div><div style={{ float: "left", marginLeft: "15px" }}>留言主题:</div>
        </div>
        <div className="isay-theme">
          <input className="isay-theme-input" value={this.state.inputValue} onFocus={this.inputFoucus.bind(this)} onBlur={this.inputBlur.bind(this)} onChange={this.inputChange.bind(this)} />
        </div>
        <div style={{ fontSize: "40px", color: "#949494", margin: "30px 0 0 35px", overflow: "hidden" }}>
          <div className="isay-star"></div><div style={{ float: "left", marginLeft: "15px" }}>留言内容:</div>
        </div>
        <div className="isay-content">
          <textarea className="isay-content-textarea" value={this.state.textareaValue} onFocus={this.textareaFoucus.bind(this)} onBlur={this.textareaBlur.bind(this)} onChange={this.textareaChange.bind(this)} />
        </div>
        <div className="isay-submit">提交</div>
      </div>
    )
  }
}

export default Isay;
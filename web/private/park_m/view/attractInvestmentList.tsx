import * as React from "react";
import "css!./styles/attractInvestmentList.css"

interface IProps {
}

interface IState {
  inputValue: string,
  listArr: Array<any>,
  deleteState: boolean,
  deleteNumber: number
}

export default class AttractInvestmentList extends React.Component<{ history: any }>{
  public readonly state: Readonly<IState> = {
    inputValue: "搜索企业", // 输入框默认值
    listArr: [
      { deleteState: false }, { deleteState: false }, { deleteState: false }, { deleteState: false }, { deleteState: false }, { deleteState: false }, { deleteState: false },
      { deleteState: false }, { deleteState: false }, { deleteState: false }, { deleteState: false }, { deleteState: false }, { deleteState: false }, { deleteState: false }
    ],
    deleteState: true, // 删除状态
    deleteNumber: 0
  }

  // 聚焦
  foucus() {
    if (this.state.inputValue === "搜索企业") {
      this.setState({ inputValue: "" })
    }
  }

  // 失焦
  blur() {
    if (this.state.inputValue === "") {
      this.setState({ inputValue: "搜索企业" })
    }
  }

  // 输入
  change(event) {
    this.setState({ inputValue: event.target.value })
  }

  // 选中标签
  clickTag(index) {
    let listArr = this.state.listArr
    let deleteNumber = 0
    listArr[index].deleteState = !listArr[index].deleteState
    listArr.forEach(item => {
      if (item.deleteState) {
        deleteNumber++
      }
    })
    this.setState({ listArr: listArr, deleteNumber: deleteNumber })
  }

  // 返回
  goBack() {
    this.props.history.goBack()
  }

  // 删除
  delete() {
    this.setState({ deleteState: !this.state.deleteState })
  }

  render() {
    return (
      <div className="infoarea">
        <div className="infoarea-top">
          <div className="infoarea-child-top">
            <img src="./park_m/image/whiteBack.png" style={{ margin: "0 10px 30px -15px", padding: "15px 15px 15px 15px" }} onClick={this.goBack.bind(this)} />
            <input className="infoarea-input" value={this.state.inputValue} onFocus={this.foucus.bind(this)} onBlur={this.blur.bind(this)} onChange={this.change.bind(this)}
              style={{ width: "82%" }} />
            <img src="./park_m/image/search.png" className="infoarea-search-img" style={{ left: "-78%" }} />
            <img src="./park_m/image/bottom.png" style={{ position: "relative", left: "-13%", bottom: "10px" }} />
            <span style={{ position: "absolute", fontSize: "40px", left: "73%", top: "68px", fontWeight: "600" }}>全部</span>
          </div>
        </div>
        <div className="search-user-list">
          {this.state.listArr.map((item, index) => {
            return (
              <div key={index} className="attract-investment-list-child" onClick={e => this.clickTag(index)}>
                <div style={{ float: "left" }}>
                  <img src={item.deleteState ? "./park_m/image/delete_checked.png" : "./park_m/image/unchecked.png"} width="50px" height="50px" />
                </div>
                <div style={{ float: "left", width: "200px", height: "200px", marginLeft: "-40px" }}>
                  <img src="./park_m/image/logo.png" />
                </div>
                <div style={{ float: "left", height: "100%" }}>
                  <div style={{ height: "25%", margin: "-30px 0 25px 0" }}>浙江永拓信息科技有限公司</div>
                  <img src="./park_m/image/position.png" style={{ width: "50px", height: "50px", marginBottom: "12px" }} />
                  <span style={{ color: "#949494", fontSize: "36px", marginLeft: "10px" }}>E座B区-3F-301</span>
                </div>
                <div style={{ float: "right", height: "100%", lineHeight: "100px" }} >
                  <div>
                    <img src="./park_m/image/right.png" style={{ margin: "30px 0 0 110px" }} />
                  </div>
                  <div style={{fontSize: "32px", backgroundColor: "#F5F5F5", height: "50px", width: "150px", textAlign: "center", lineHeight: "50px", margin: "22px 10px 0 0" }}>科技服务</div>
                </div>
              </div>
            )
          })
          }
          <div style={{ width: "100%", height: "350px", textAlign: "center", fontSize: "40px", lineHeight: "100px" }}>到底啦~</div>
        </div>
        {!this.state.deleteState ?
          <div className="rent-room-detail-bottom">
            <div style={{ float: "left", width: "50%", height: "100%", textAlign: "center", lineHeight: "130px", color: "#6C6C6C", backgroundColor: "#F2F2F2" }} onClick={this.delete.bind(this)}>删除</div>
            <div style={{ float: "left", width: "50%", height: "100%", textAlign: "center", lineHeight: "130px", backgroundColor: "#0B8BF0", color: "#ffffff" }}>新增</div>
          </div> :
          <div className="attract-investment-list-bottom">
            删除({this.state.deleteNumber})
          </div>
        }
      </div>
    )
  }
}
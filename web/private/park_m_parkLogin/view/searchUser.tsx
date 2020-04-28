import * as React from "react";
import "css!./styles/searchUser.css"

interface IProps {
}

interface IState {
  inputValue: string,
  listArr: Array<any>,
  tagIndex: number,
}

class SearchUser extends React.Component<{ history: any }>{
  public readonly state: Readonly<IState> = {
    inputValue: "搜索人员", // 输入框默认值
    listArr: [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13],
    tagIndex: 0, // 选中的标签
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

  render() {
    return (
      <div className="infoarea">
        <div className="infoarea-top">
          <div className="infoarea-child-top">
            <img src="./park_m/image/whiteBack.png" style={{ margin: "0 10px 30px -15px", padding: "15px 15px 15px 15px" }} onClick={this.goBack.bind(this)} />
            <input className="infoarea-input" value={this.state.inputValue} onFocus={this.foucus.bind(this)} onBlur={this.blur.bind(this)} onChange={this.change.bind(this)} />
            <img src="./park_m/image/search.png" className="infoarea-search-img" />
            <span className="search-user-bt">搜索</span>
          </div>
        </div>
        <div className="search-user-list">
          {this.state.listArr.map((item, index) => {
            return (
              <div key={index} className="search-user-list-child" onClick={e => this.clickTag(index)}>
                <span style={{ float: "left" }}>小明</span>
                <div style={{ float: "right" }} >
                  <img src={this.state.tagIndex === index ? "./park_m/image/checked.png" : "./park_m/image/unchecked.png"} />
                </div>
              </div>
            )
          })
          }
          <div style={{ width: "100%", height: "350px", textAlign: "center", fontSize: "40px", lineHeight: "100px" }}>到底啦~</div>
        </div>
        <div className="rent-room-detail-bottom">
          <div style={{ float: "left", width: "50%", height: "100%", textAlign: "center", lineHeight: "130px", color: "#6C6C6C", backgroundColor: "#F2F2F2" }}>取消</div>
          <div style={{ float: "left", width: "50%", height: "100%", textAlign: "center", lineHeight: "130px", backgroundColor: "#0B8BF0", color: "#ffffff" }}>提交</div>
        </div>
      </div>
    )
  }
}

export default SearchUser;
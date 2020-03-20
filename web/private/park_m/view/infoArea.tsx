import * as React from "react";
import "css!./styles/infoArea.css"
import { Link } from 'react-router-dom';

interface IProps {
}

interface IState {
  inputValue: string,
  tagArr: Array<any>,
  listArr: Array<any>,
  tagIndex: number,
}

class InfoArea extends React.Component {
  public readonly state: Readonly<IState> = {
    inputValue: "请输入主题", // 输入框默认值
    tagArr: ["咨询", "建议", "投诉", "其他"],
    listArr: [{ spread: true }, { spread: false }, { spread: false }, { spread: false }, { spread: false }, { spread: false }, { spread: false }, { spread: false }, { spread: false }],
    tagIndex: 0, // 选中的标签
  }

  // 聚焦
  foucus() {
    if (this.state.inputValue === "请输入主题") {
      this.setState({ inputValue: "" })
    }
  }

  // 失焦
  blur() {
    if (this.state.inputValue === "") {
      this.setState({ inputValue: "请输入主题" })
    }
  }

  // 输入
  change(event) {
    this.setState({ inputValue: event.target.value })
  }

  // 选中标签
  clickTag(index) {
    this.setState({tagIndex: index})
  }

  // 展开
  spread(index) {
    let listArr = this.state.listArr
    listArr[index].spread = !listArr[index].spread
    this.setState({ listArr: listArr})
  }

  render() {
    return (
      <div className="infoarea">
        <div className="infoarea-top">
          <div className="infoarea-title">数字园区</div>
          <div className="infoarea-child-top">
            <input className="infoarea-input" value={this.state.inputValue} onFocus={this.foucus.bind(this)} onBlur={this.blur.bind(this)} onChange={this.change.bind(this)} />
            <img src="./mpark/image/search.png" className="infoarea-search-img" />
            <span className="infoarea-sreach-bt">搜索</span>
          </div>
        </div>
        <div className="infoarea-tag">
          {this.state.tagArr.map((item, index) => {
            return <div key={index} className={index !== this.state.tagIndex ? "infoarea-tag-child" : "infoarea-tag-child-add"} onClick={e=>this.clickTag(index)}>{item}</div>
            })
          }
        </div>
        <div className="infoarea-content">
          {this.state.listArr.map((item, index) => {
            return <div className={item.spread ? "infoarea-content-child-bottom" : "infoarea-content-child"} key={index}>
              {item.spread ?
                <div style={{width: "100%", height: "100%"}}>
                  <div style={{ height: "50%", width: "100%" }}>
                    <div className="infoarea-content-name">关于新的凭租公寓排队规则</div>
                    <div className="infoarea-content-bottom" onClick={e=>this.spread(index)}>
                      <img src="./mpark/image/right.png" className="infoarea-content-right-img" />
                    </div>
                  </div>
                  <div className="infoarea-br">
                    {index !== 2 ?
                      <div className="infoarea-br-bt">已解决</div> :
                      <div className="infoarea-br-bt-add">受理中</div>
                    }
                    <div className="infoarea-br-data">2020-03-06 14:38:15</div>
                  </div>
                  <div style={{ borderTop: "3px solid #F2F2F2", marginTop: "30px", marginRight: "50px" }}></div>
                  <div style={{ fontSize: "40px", color: "#949494", marginTop: "20px" }}>留言内容:</div>
                  <div style={{ fontSize: "40px", color: "#333333", marginTop: "20px" }}>
                    关于新的凭租公寓排队规则，关于新的凭租公寓排队规则，关于新的凭租公寓排队规则，关于新的凭租公寓排队规则，关于新的凭租公寓排队规则。
                  </div>
                  <div style={{ fontSize: "40px", color: "#949494", marginTop: "30px" }}>留言回复:</div>
                  <div style={{ fontSize: "40px", marginTop: "20px" }}>
                    <span style={{ color: "#949494" }}>由</span><span style={{ fontWeight: "600", margin: "0 25px 0 25px" }}>xxx</span>
                    <span style={{ color: "#949494" }}>受理于</span><span style={{ color: "#333333", marginLeft: "25px"}}>2020-02-28 17:38:15</span>
                  </div>
                  <div style={{ fontSize: "40px", color: "#949494", marginTop: "20px" }}>回复内容:</div>
                  <div style={{ fontSize: "40px", color: "#333333", marginTop: "20px", marginBottom: "150px" }}>
                    关于新的凭租公寓排队规则，关于新的凭租公寓排队规则，关于新的凭租公寓排队规则，关于新的凭租公寓排队规则，关于新的凭租公寓排队规则。
                  </div>
                </div> :
                <div style={{ width: "100%", height: "100%" }}>
                  <div style={{ height: "50%", width: "100%" }}>
                    <div className="infoarea-content-name">关于新的凭租公寓排队规则</div>
                    <div className="infoarea-content-right" onClick={e => this.spread(index)}>
                      <img src="./mpark/image/right.png" className="infoarea-content-right-img" />
                    </div>
                  </div>
                  <div className="infoarea-br">
                    {index !== 2 ?
                      <div className="infoarea-br-bt">已解决</div> :
                      <div className="infoarea-br-bt-add">受理中</div>
                    }
                    <div className="infoarea-br-data">2020-03-06 14:38:15</div>
                  </div>
                </div>
              }
              </div>
          })
          }
          <div style={{ width: "100%", height: "30%", textAlign: "center", fontSize: "40px", lineHeight: "60px", margin: "20px 0 0 -25px" }}>到底啦~</div>
        </div>
        <Link to="/isay">
          <div className="infoarea-add-c">
            <img src="./mpark/image/add.png" width="60px" height="60px" />
          </div>
        </Link>
      </div>
    )
  }
}

export default InfoArea;
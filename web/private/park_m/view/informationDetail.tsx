import * as React from "react";
import "css!./styles/informationDetail.css"

interface IProps {
  history: any
}

interface IState {

}

export default class informationDetail extends React.Component {
  public readonly state: Readonly<IState> = {
  }

  public readonly props: Readonly<IProps> = {
    history: this.props.history
  }

  componentWillMount() {
  }

  // 返回
  goBack() {
    this.props.history.goBack()
  }


  render() {
    return (
      <div className="isay">
        {parseInt(sessionStorage.getItem("informationId")) === 0 ?
          <div>
            <div className="isay-back">
              <img src="./park_m/image/back.png" style={{ marginBottom: "25px" }} onClick={this.goBack.bind(this)} />
              <span style={{ color: "#6C6C6C", fontSize: "40px", marginLeft: "15px" }}>详情内容</span>
            </div>
            <div style={{ fontSize: "40px", width: "90%", color: "#333333", margin: "20px auto" }}>
              桂林市科技局关于 2020年度国家外国专家项目申报的通知
            </div>
            <div style={{ color: "#949494", fontSize: "34px", margin: "30px 0 0 50px", overflow: "hidden" }}>
              <div style={{ float: "left" }}>200次浏览</div>
              <div style={{ float: "right", marginRight: "50px" }}>2020-02-28 14:38:15 发布</div>
            </div>
            <div style={{ border: "2px solid #F2F2F2", marginTop: "25px" }}></div>
            <div style={{ fontSize: "40px", color: "#333333", width: "90%", margin: "30px auto" }}>
              <p style={{ fontSize: "40px" }}>各相关单位：</p>
              内容详情内容详情内容详情内容详情内容详情内容详情内容详情内容详情内
                  容详情内容详情内容详情内容详情内容详情内容详情内容详情内容详情内容详情内容详情内
                  容详情内容详情内容详情内容详情内容详情内容详情内容详情内容详情内容详情内容详情内容详情内容详情内容详情
            </div>
          </div> :
          <div style={{ fontSize: "30px", color: "#333333" }}>
            <div style={{ width: "100%", height: "600px" }}>
              <img src="./park_m/image/discounts_bg.png" style={{ width: "100%", height: "100%" }} />
              <div style={{
                position: "absolute", left: "50px", top: "30px", backgroundColor: "#000000", background: "rgba(0, 0, 0, 0.3)",
                borderRadius: "50px", width: "260px", height: "75px", lineHeight: "75px", textAlign: "center", opacity: "0.8" }}>
                <img src="./park_m/image/w-right.png" style={{ transform: "rotate(180deg)", margin: "0px 18px 22px 0px" }} />
                <span style={{ fontSize: "40px", color: "#ffffff", marginRight: "15px" }}>详情内容</span>
              </div>
            </div>
            <div style={{ width: "100%", height: "120px", fontSize: "42px", color: "#333333", fontWeight: "600", borderBottom: "5px solid #F2F2F2", lineHeight: "120px", textAlign: "center" }}>
              信息产业园惠企政策宣讲会
            </div>
            <div style={{ width: "100%", height: "120px", borderBottom: "2px solid #F2F2F2" }}>
              <div style={{ height: "60px", width: "12px", backgroundColor: "#0B8BF0", float: "left", margin: "30px 30px 0 50px" }}></div>
              <div style={{ color: "#333333", fontSize: "42px", fontWeight: "600", lineHeight: "120px"}}>活动信息</div>
            </div>
            <div style={{ width: "100%", height: "120px", borderBottom: "2px solid #F2F2F2" }}>
              <span>活动时间</span>
              <span>2020-3-15 13:00~2020-3-15 15:00</span>
            </div>
          </div>
        }
      </div>
    )
  }
}

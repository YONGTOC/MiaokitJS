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

  // 返回
  goBack() {
    this.props.history.goBack()
  }


  render() {
    return (
      <div className="information-detail">
        {parseInt(sessionStorage.getItem("informationId")) === 0 || parseInt(sessionStorage.getItem("informationId")) === 1 ?
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
          </div> : parseInt(sessionStorage.getItem("informationId")) === 2 ?
          <div style={{ fontSize: "36px", color: "#333333" }}>
            <div style={{ width: "100%", height: "600px" }}>
              <img src="./park_m/image/discounts_bg.png" style={{ width: "100%", height: "100%" }} />
              <div style={{
                position: "absolute", left: "50px", top: "30px", backgroundColor: "#000000", background: "rgba(0, 0, 0, 0.3)",
                borderRadius: "50px", width: "260px", height: "75px", lineHeight: "75px", textAlign: "center", opacity: "0.8"
              }} onClick={this.goBack.bind(this)}>
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
            <div style={{ width: "100%", height: "120px", borderBottom: "2px solid #F2F2F2", lineHeight: "120px" }}>
              <div style={{ float: "left", height: "100%", width: "30%", marginLeft: "50px" }}>活动时间</div>
              <div style={{ float: "left" }}>2020-3-15 13:00~2020-3-15 15:00</div>
            </div>
            <div style={{ width: "100%", height: "120px", borderBottom: "2px solid #F2F2F2", lineHeight: "120px" }}>
              <div style={{ float: "left", height: "100%", width: "30%", marginLeft: "50px" }}>活动地点</div>
              <div style={{ float: "left" }}>桂林市信息产业园A座2楼215会议室</div>
            </div>
            <div style={{ width: "100%", height: "120px", borderBottom: "2px solid #F2F2F2", lineHeight: "120px" }}>
              <div style={{ float: "left", height: "100%", width: "30%", marginLeft: "50px" }}>活动费用</div>
              <div style={{ float: "left" }}>免费</div>
            </div>
            <div style={{ width: "100%", height: "120px", borderBottom: "2px solid #F2F2F2", lineHeight: "120px" }}>
              <div style={{ float: "left", height: "100%", width: "30%", marginLeft: "50px" }}>报名截至时间</div>
              <div style={{ float: "left" }}>2020-3-14 16:00</div>
            </div>
            <div style={{ width: "100%", height: "120px", borderBottom: "2px solid #F2F2F2", lineHeight: "120px" }}>
              <div style={{ float: "left", height: "100%", width: "30%", marginLeft: "50px" }}>联系人</div>
              <div style={{ float: "left" }}>王小姐</div>
            </div>
            <div style={{ width: "100%", height: "120px", borderBottom: "5px solid #F2F2F2", lineHeight: "120px" }}>
              <div style={{ float: "left", height: "100%", width: "30%", marginLeft: "50px" }}>联系电话</div>
              <div style={{ float: "left" }}>15578383040</div>
            </div>
            <div style={{ width: "100%", height: "120px", borderBottom: "2px solid #F2F2F2" }}>
              <div style={{ height: "60px", width: "12px", backgroundColor: "#0B8BF0", float: "left", margin: "30px 30px 0 50px" }}></div>
              <div style={{ color: "#333333", fontSize: "42px", fontWeight: "600", lineHeight: "120px" }}>活动详情</div>
            </div>
            <div style={{ width: "90%", margin: "auto", padding: "30px 0 200px 0" }}>
              内容详情内容详情内容详情内容详情内容详情内容详情内容详情内容详情内容详情内容详情内容详情内容详情
              内容详情内容详情内容详情内容详情内容详情内容详情内容详情
              内容详情内容详情内容详情内容详情内容详情内容详情内容详情内容详情内容详情内容详情内容详情内容详情
            </div>
            <div style={{
              backgroundColor: "#0B8BF0", width: "100%", height: "150px", fontSize: "50px", color: "#ffffff", lineHeight: "150px",
              textAlign: "center", position: "fixed", bottom: "0px"
            }}>
              我要报名
            </div>
          </div> :
          <div style={{ fontSize: "36px", color: "#333333" }}>
            <div style={{ width: "100%", height: "600px" }}>
              <img src="./park_m/image/thirdParty_bg.png" style={{ width: "100%", height: "100%" }} />
              <div style={{
                position: "absolute", left: "50px", top: "30px", backgroundColor: "#000000", background: "rgba(0, 0, 0, 0.3)",
                borderRadius: "50px", width: "260px", height: "75px", lineHeight: "75px", textAlign: "center", opacity: "0.8"
              }} onClick={this.goBack.bind(this)}>
                <img src="./park_m/image/w-right.png" style={{ transform: "rotate(180deg)", margin: "0px 18px 22px 0px" }} />
                <span style={{ fontSize: "40px", color: "#ffffff", marginRight: "15px" }}>详情内容</span>
              </div>
            </div>
            <div style={{ width: "100%", height: "120px", fontSize: "42px", color: "#333333", fontWeight: "600", borderBottom: "5px solid #F2F2F2", lineHeight: "120px", textAlign: "center" }}>
                企业桶装水采购，量大从优，准时送达
            </div>
            <div style={{ width: "100%", height: "120px", borderBottom: "2px solid #F2F2F2" }}>
              <div style={{ height: "60px", width: "12px", backgroundColor: "#0B8BF0", float: "left", margin: "30px 30px 0 50px" }}></div>
              <div style={{ color: "#333333", fontSize: "42px", fontWeight: "600", lineHeight: "120px" }}>服务信息</div>
            </div>
            <div style={{ width: "100%", height: "120px", borderBottom: "2px solid #F2F2F2", overflow: "hidden" }}>
              <div style={{ float: "left", height: "100%", width: "30%", marginLeft: "50px", lineHeight: "120px" }}>服务内容</div>
              <div style={{ float: "left", height: "100%", width: "60%" }}>1. 品牌桶装水 2. 快速送达 3. 品质可靠 欢迎各大企业订购</div>
            </div>
            <div style={{ width: "100%", height: "120px", borderBottom: "5px solid #F2F2F2", lineHeight: "120px" }}>
              <div style={{ float: "left", height: "100%", width: "30%", marginLeft: "50px" }}>联系电话</div>
              <div style={{ float: "left" }}>15578383040</div>
            </div>
            <div style={{ width: "100%", height: "120px", borderBottom: "2px solid #F2F2F2", lineHeight: "120px" }}>
              <div style={{ float: "left", height: "100%", width: "30%", marginLeft: "50px" }}>收费标准</div>
              <div style={{ float: "left" }}>按桶装水品牌价格</div>
            </div>
          </div>
        }
      </div>
    )
  }
}

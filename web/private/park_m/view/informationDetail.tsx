import * as React from "react";
import "css!./styles/informationDetail.css"
import DataService from "dataService";

interface IProps {
  history: any
}

interface IState {
  data: { name: string, start_time: string, end_time: string, position: string, sign_end_time: string, contact: string, contact_tel: string, content: string, fee: string, headimgurl: string, visit_amount: string, time: string }
}

export default class informationDetail extends React.Component {
  public readonly state: Readonly<IState> = {
    data: { name: "", start_time: "", end_time: "", position: "", sign_end_time: "", contact: "", contact_tel: "", content: "", fee: "", headimgurl: "", visit_amount: "", time: "" }
  }

  public readonly props: Readonly<IProps> = {
    history: this.props.history
  }

  public dataService: DataService = new DataService()

  componentDidMount() {
    if (parseInt(sessionStorage.getItem("informationId")) < 2) {
      this.dataService.getInformation(this.callBack.bind(this), 2)
    } else if (parseInt(sessionStorage.getItem("informationId")) === 2){
      this.dataService.getActivitiyInfo(this.callBack.bind(this), 1)
    }
  }
  callBack(data) {
    this.setState({ data: JSON.parse(data).response })
  }


  // 返回
  goBack() {
    this.props.history.goBack()
  }

  submit() {
    let obj = {
      user_id: 2,
      activity_id: 1
    }
    this.dataService.postActivitySign(this.callBackPostActivitySign.bind(this), obj)
  }

  callBackPostActivitySign() {

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
              {this.state.data.name}
            </div>
            <div style={{ color: "#949494", fontSize: "34px", margin: "30px 0 0 50px", overflow: "hidden" }}>
              <div style={{ float: "left" }}>{this.state.data.visit_amount}次浏览</div>
              <div style={{ float: "right", marginRight: "50px" }}>{this.state.data.time} 发布</div>
            </div>
            <div style={{ border: "2px solid #F2F2F2", marginTop: "25px" }}></div>
            <div style={{ fontSize: "40px", color: "#333333", width: "90%", margin: "30px auto" }}>
              <p style={{ fontSize: "40px" }}>各相关单位：</p>
              {this.state.data.content}
            </div>
          </div> : parseInt(sessionStorage.getItem("informationId")) === 2 ?
          <div style={{ fontSize: "36px", color: "#333333" }}>
            <div style={{ width: "100%", height: "600px" }}>
              <img src={this.state.data.headimgurl} style={{ width: "100%", height: "100%" }} />
              <div style={{
                position: "absolute", left: "50px", top: "30px", backgroundColor: "#000000", background: "rgba(0, 0, 0, 0.3)",
                borderRadius: "50px", width: "260px", height: "75px", lineHeight: "75px", textAlign: "center", opacity: "0.8"
              }} onClick={this.goBack.bind(this)}>
                <img src="./park_m/image/w-right.png" style={{ transform: "rotate(180deg)", margin: "0px 18px 22px 0px" }} />
                <span style={{ fontSize: "40px", color: "#ffffff", marginRight: "15px" }}>详情内容</span>
              </div>
            </div>
            <div style={{ width: "100%", height: "120px", fontSize: "42px", color: "#333333", fontWeight: "600", borderBottom: "5px solid #F2F2F2", lineHeight: "120px", textAlign: "center" }}>
              {this.state.data.name}
            </div>
            <div style={{ width: "100%", height: "120px", borderBottom: "2px solid #F2F2F2" }}>
              <div style={{ height: "60px", width: "12px", backgroundColor: "#0B8BF0", float: "left", margin: "30px 30px 0 50px" }}></div>
              <div style={{ color: "#333333", fontSize: "42px", fontWeight: "600", lineHeight: "120px"}}>活动信息</div>
            </div>
            <div style={{ width: "100%", height: "120px", borderBottom: "2px solid #F2F2F2", lineHeight: "120px" }}>
              <div style={{ float: "left", height: "100%", width: "30%", marginLeft: "50px" }}>活动时间</div>
              <div style={{ float: "left", width: "60%" }}>{this.state.data.start_time.substring(0, 16)}~{this.state.data.end_time.substring(0, 16)}</div>
            </div>
            <div style={{ width: "100%", height: "120px", borderBottom: "2px solid #F2F2F2", lineHeight: "120px" }}>
              <div style={{ float: "left", height: "100%", width: "30%", marginLeft: "50px" }}>活动地点</div>
              <div style={{ float: "left" }}>{this.state.data.position}</div>
            </div>
            <div style={{ width: "100%", height: "120px", borderBottom: "2px solid #F2F2F2", lineHeight: "120px" }}>
              <div style={{ float: "left", height: "100%", width: "30%", marginLeft: "50px" }}>活动费用</div>
              <div style={{ float: "left" }}>{this.state.data.fee}</div>
            </div>
            <div style={{ width: "100%", height: "120px", borderBottom: "2px solid #F2F2F2", lineHeight: "120px" }}>
              <div style={{ float: "left", height: "100%", width: "30%", marginLeft: "50px" }}>报名截至时间</div>
              <div style={{ float: "left" }}>{this.state.data.sign_end_time}</div>
            </div>
            <div style={{ width: "100%", height: "120px", borderBottom: "2px solid #F2F2F2", lineHeight: "120px" }}>
              <div style={{ float: "left", height: "100%", width: "30%", marginLeft: "50px" }}>联系人</div>
              <div style={{ float: "left" }}>{this.state.data.contact}</div>
            </div>
            <div style={{ width: "100%", height: "120px", borderBottom: "5px solid #F2F2F2", lineHeight: "120px" }}>
              <div style={{ float: "left", height: "100%", width: "30%", marginLeft: "50px" }}>联系电话</div>
              <div style={{ float: "left" }}>{this.state.data.contact_tel}</div>
            </div>
            <div style={{ width: "100%", height: "120px", borderBottom: "2px solid #F2F2F2" }}>
              <div style={{ height: "60px", width: "12px", backgroundColor: "#0B8BF0", float: "left", margin: "30px 30px 0 50px" }}></div>
              <div style={{ color: "#333333", fontSize: "42px", fontWeight: "600", lineHeight: "120px" }}>活动详情</div>
            </div>
            <div style={{ width: "90%", margin: "auto", padding: "30px 0 200px 0" }}>
              {this.state.data.content}
            </div>
            <div style={{
              backgroundColor: "#0B8BF0", width: "100%", height: "150px", fontSize: "50px", color: "#ffffff", lineHeight: "150px",
              textAlign: "center", position: "fixed", bottom: "0px"
            }} onClick={this.submit.bind(this)}>
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

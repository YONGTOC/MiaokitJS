import * as React from "react";
import "css!./styles/attractInvestment.css"
import { Link } from 'react-router-dom';

interface IProps {
}

interface IState {
  tagArr: Array<any>
}

export default class AttractInvestment extends React.Component<{ history: any }>{
  public readonly state: Readonly<IState> = {
    tagArr: [
      { name: "园区企业", imgUrl: "./park_m/image/business_administration.png", url: "/attractInvestmentList" },
      { name: "园区人员", imgUrl: "./park_m/image/park_staff.png", url: "" },
      { name: "意向用户", imgUrl: "./park_m/image/intended_users.png", url: "" }
    ]
  }

  // 返回
  goBack() {
    this.props.history.goBack()
  }

  render() {
    return (
      <div className="rent-room">
        <div className="rent-room-back">
          <div style={{ float: "left" }} onClick={this.goBack.bind(this)}>
            <img src="./park_m/image/back.png" style={{ margin: "-10px 10px 0 0" }} />
            <span>客服电话</span>
          </div>
        </div>
        <div style={{backgroundColor: "#ffffff", width: "100%", height: "100%", marginTop: "15px"}}>
          { this.state.tagArr.map((item, index) => {
            return (
              <Link to={item.url}>
                <div key={index} style={{ width: "33%", height: "300px", float: "left", textAlign: "center", marginTop: "150px"}}>
                  <img src={item.imgUrl} style={{ width: "120px", height: "120px" }} />
                  <div style={{ fontSize: "40px", color: "#333333" }}>
                    {item.name}
                  </div>
                </div>
              </Link>
              )
            })
          }
        </div>
      </div>
    )
  }
}
import * as React from "react";
import "css!./styles/information.css"

interface IProps {
}

interface IState {
  informationList: Array<any>
}

class Information extends React.Component {
  public readonly state: Readonly<IState> = {
    informationList: [
      { name: "优惠政策", imgUrl: "./park_m/image/preferentialPolicy.png" }, { name: "园区咨询", imgUrl: "./park_m/image/information.png" },
      { name: "园区活动", imgUrl: "./park_m/image/activity.png" }, { name: "第三方服务", imgUrl: "./park_m/image/thirdParty.png" }
    ]
  }

  render() {
    return (
      <div className="information">
        <div className="information-top">
          <div className="information-title">数字园区</div>
        </div>
        <div className="information-headline">
          <div style={{ float: "left", width: "25%", height: "100%" }}><img src="./park_m/image/headline.png" style={{marginBottom: "14px"}} /></div>
          <div style={{ float: "left", width: "75%", height: "100%", textOverflow: "ellipsis", whiteSpace: "nowrap", overflow: "hidden" }}>关于桂林信息产业园园区企业复工的重要通知你你你你你</div>
        </div>
        <div className="information-content">
          {this.state.informationList.map((item, index) => {
            return <div className="information-content-child" key={index}>
              <img src={item.imgUrl} width="130px" height="130px" />
              <div style={{ marginTop: "20px" }}>{item.name}</div>
            </div>
            })
          }
        </div>
      </div>
    )
  }
}

export default Information;
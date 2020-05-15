import * as React from "react";
import "css!./styles/information.css"
import DataService from "dataService";

interface IProps {
  history: any

}

interface IState {
  informationList: Array<any>,
  headline: Array<any>
}

class Information extends React.Component {
  public readonly state: Readonly<IState> = {
    headline: [{name: ""}],
    informationList: [
      { name: "优惠政策", imgUrl: "./park_m/image/preferentialPolicy.png" }, { name: "园区咨询", imgUrl: "./park_m/image/information.png" },
      { name: "园区活动", imgUrl: "./park_m/image/activity.png" }, { name: "第三方服务", imgUrl: "./park_m/image/thirdParty.png" },
      { name: "第三方服务", imgUrl: "./park_m/image/thirdParty.png" }, { name: "第三方服务", imgUrl: "./park_m/image/thirdParty.png" }
      , { name: "第三方服务", imgUrl: "./park_m/image/thirdParty.png" }, { name: "第三方服务", imgUrl: "./park_m/image/thirdParty.png" }, { name: "第三方服务", imgUrl: "./park_m/image/thirdParty.png" }
      , { name: "第三方服务", imgUrl: "./park_m/image/thirdParty.png" }, { name: "第三方服务", imgUrl: "./park_m/image/thirdParty.png" }, { name: "第三方服务", imgUrl: "./park_m/image/thirdParty.png" }
      , { name: "第三方服务", imgUrl: "./park_m/image/thirdParty.png" }, { name: "第三方服务", imgUrl: "./park_m/image/thirdParty.png" }, { name: "第三方服务", imgUrl: "./park_m/image/thirdParty.png" }, { name: "第三方服务", imgUrl: "./park_m/image/thirdParty.png" },
      { name: "第三方服务", imgUrl: "./park_m/image/thirdParty.png" }, { name: "第三方服务", imgUrl: "./park_m/image/thirdParty.png" }, { name: "第三方服务", imgUrl: "./park_m/image/thirdParty.png" }
    ]
  }

  public readonly props: Readonly<IProps> = {
    history: this.props.history
  }

  public dataService: DataService = new DataService()

  componentDidMount() {
    this.dataService.getHeadlines(this.callBackGetHeadlines.bind(this), 1)
  }

  callBackGetHeadlines(data) {
    this.setState({ headline: JSON.parse(data).response })
  }

  goChild(index) {
    this.props.history.push({ pathname: "/home/informationChilds",  state: { index: index } })
  }

  render() {
    return (
      <div className="information">
        <div className="information-headline">
          <div style={{ float: "left", width: "25%", height: "100%" }}><img src="./park_m/image/headline.png" style={{ marginBottom: "14px" }} /></div>
          <div style={{ float: "left", width: "75%", height: "100%", textOverflow: "ellipsis", whiteSpace: "nowrap", overflow: "hidden" }}>{this.state.headline[0].name}</div>
        </div>
        <div className="information-content">
          {this.state.informationList.map((item, index) => {
            return (
              <div className="information-content-child" key={index} onClick={e => this.goChild(index)}>
                <img src={item.imgUrl} width="130px" height="130px" />
                <div style={{ marginTop: "20px" }}>{item.name}</div>
              </div>
            )
          })
          }
        </div>
      </div>
    )
  }
}

export default Information;
import * as React from "react";

export default class Cascaders extends React.Component {
  constructor(props) {
    super(props);


  }

  public state = {
    cityArr: ["广州", "深圳", "长沙"],
    currentIndex: 0,
    focusIndex: -1,
  }

  public componentDidMount() {
    let _this = this
    var geolocation = new BMap.Geolocation();
    geolocation.getCurrentPosition(function (r) {
      if (this.getStatus() == BMAP_STATUS_SUCCESS) {
        _this.setState({
          city: r.address.city
        })
      }
      else {
        console.log('failed' + this.getStatus());
      }
    }, { enableHighAccuracy: true })
  }


  public render() {
    return (
      <div className={this.props.isCascaders ? "showCascaders" : "hideCascaders"}>
        <div>
          <div className="current-position" onClick={() => this.props.cascadersFalse(this.state.currentIndex)}>
            <span>{this.state.cityArr[this.state.currentIndex]}</span><img src="./fangliangbao/image/down_s.png" width="10px" height="10px" style={{ margin: "0 0px 2px 3px" }} />
          </div>
          <div className="other-position">
            <div className="tips">其它城市</div>
            <div className="c-city">
              {
                this.state.cityArr.map((item, index) => {
                  return (
                    <div style={{
                      margin: index + 1 !== this.state.cityArr.length ? "10px 10px 0 0" : "10px 0 0 0", color: this.state.focusIndex === index ? "rgb(23, 161, 230)" : "",
                      display: index === this.state.currentIndex ? "none" : ""
                    }} key={index}
                      onMouseMove={() => { this.setState({ focusIndex: index }) }}
                      onClick={() => {
                        this.setState({ currentIndex: index }, () => {
                          this.props.cascadersFalse(this.state.currentIndex)
                        })
                      }} >
                      {item}
                    </div>
                  )
                })
              }
            </div>
          </div> 
        </div>
      </div>
    )
  }

}

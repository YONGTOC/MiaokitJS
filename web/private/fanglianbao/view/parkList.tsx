import * as React from "react";
import * as ReactDOM from "react-dom";
import Router from 'router';
import InfoTitle from "infoTitle"
import HomeTop from "homeTop"
import AllBottom from "allBottom"

class ParkList extends React.Component {
  constructor(props) {
    super(props);
    this.cRef = ref => { this.refDom = ref };

  }

  public state = {
    searchValue: "请输入园区名/区域名/商圈名",
    districtArray: [
      { name: "全部" }, { name: "全广州" }, { name: "越秀" }, { name: "海珠" }, { name: "荔湾" }, { name: "天河" }, { name: "白云" }, { name: "黄埔" }, { name: "番禺" }, { name: "南沙" },
      { name: "南沙" }, { name: "花都" }, { name: "增城" }, { name: "从化" }
    ],
    districtChildArray: [
      { name: "全部" }, { name: "环市东/区庄" }, { name: "中山路" }, { name: "北京路" }, { name: "东风路" }, { name: "烈士陵园周边" }, { name: "淘金" }, { name: "五羊新城" }, { name: "小北" }, { name: "沿江路" }
    ],
    unitPriceArray: [
      { name: "不限" }, { name: "1-0.5元/m²·月" }, { name: "1.5-3元/m²·月" }, { name: "3-5元/m²·月" }, { name: "5-10元/m²·月" }, { name: "10元/m²·月" }
    ],
    totalPriceArray: [
      { name: "全部" }, { name: "0-0.5万元/月" }, { name: "0.5-1.5万元/月" }, { name: "1.5-3万元/月" }, { name: "3-5万元/月" }, { name: "5-10万元/月" }, { name: "10万元/月以上" }
    ],
    parkArray: [
      { name: "桂林信息产业园", address: "七星-朝阳路D-12号", price: "6.5" }, { name: "桂林信息产业园", address: "七星-朝阳路D-12号", price: "6.5" }, { name: "桂林信息产业园", address: "七星-朝阳路D-12号", price: "6.5" },
      { name: "桂林信息产业园", address: "七星-朝阳路D-12号", price: "6.5" }, { name: "桂林信息产业园", address: "七星-朝阳路D-12号", price: "6.5" }, { name: "桂林信息产业园", address: "七星-朝阳路D-12号", price: "6.5" },
      { name: "桂林信息产业园", address: "七星-朝阳路D-12号", price: "6.5" }, { name: "桂林信息产业园", address: "七星-朝阳路D-12号", price: "6.5" }
    ],
    decorationArr: [],
    move: "", // 三角形移动位置
    isDistrict: true, // 区域和地铁切换
    districtIndex: 0, // 当前区域下标
    focusDistrictIndex: 0, // 聚焦当前区域下标
    districtChildIndex: 0,
    focusDistrictChildIndex: 0, // 聚焦当前区域子集下标
    selectedArr: [{}, {}], // 已选
    iphoneValue: "输入您的手机号码",
    isUnitPrice: true, // 单价和总价切换
    priceIndex: 0, // 价格下标
    focusPriceIndex: 0, // 价格下标
    minPrice: "", // 最低价格
    maxPrice: "", // 最高价格
  }

  public componentDidMount() {
    const { clientWidth, clientHeight, children } = this.refDom;
    this.setState({ move: children[0].clientWidth / 2 - 7 })
  }

  clickDistrict(index) {
    let move = 0
    let selectedArr = this.state.selectedArr
    selectedArr[0] = {}
    const { children } = this.refDom;
    this.setState({ districtIndex: index, districtChildIndex: 0, selectedArr: selectedArr }, () => {
      for (let i = 0; i < this.state.districtIndex; i++) {
        move = move + children[i].clientWidth
      }
      this.setState({ move: move + this.state.districtIndex * 24 + (children[this.state.districtIndex].clientWidth / 2 - 7) })
    })
  }


  public render() {
    return (
      <div className="index">
        <HomeTop />
        <div style={{ width: "1200px", margin: "auto", paddingTop: "61px" }}><InfoTitle index={0} /></div>

        <div className="warp" style={{marginTop: "26px", marginBottom: "65px", overflow: "hidden"}}>

          <div style={{overflow: "hidden"}}>
            <div style={{ float: "left", width: "816px", overflow: "hidden" }}>
              <div style={{ width: "680px", overflow: "hidden", marginLeft: "-16px" }}>
                <div style={{ float: "left", overflow: "hidden" }}>
                  <img src="./fangliangbao/image/search.png" width="16px" height="16px" style={{ position: "relative", bottom: "2px", left: "35px" }} />
                  <input className="index-input" value={this.state.searchValue} />
                </div>
                <div className="index-search-name">搜索</div>
              </div>
              <div style={{ fontSize: "12px", color: "#333333", paddingTop: "30px", overflow: "hidden" }}>
                <div style={{ float: "left", color: "#989FA8" }}>位置：</div>
                <div style={{ float: "left", overflow: "hidden", marginLeft: "20px" }}>
                  <div style={{ float: "left", color: this.state.isDistrict ? "#17A1E6" : null, cursor: "pointer" }}
                    onClick={() => this.setState({ isDistrict: true })} >
                    区域<img src={this.state.isDistrict ? "./fangliangbao/image/blue_down.png" : "./fangliangbao/image/black_down.png"} width="10px" height="10px" style={{ margin: "0 24px 2px 5px" }} />
                  </div>
                  <div style={{ float: "left", cursor: "pointer", color: !this.state.isDistrict ? "#17A1E6" : null }}
                    onClick={() => this.setState({ isDistrict: false })} >
                    地铁<img src={!this.state.isDistrict ? "./fangliangbao/image/blue_down.png" : "./fangliangbao/image/black_down.png"} width="10px" height="10px" style={{ margin: "0 0 2px 5px" }} />
                  </div>
                </div>
                <div style={{ clear: "both" }}></div>
                <div style={{ overflow: "hidden", margin: "10px 0 0 56px", height: "16px" }} ref={this.cRef}>
                  {this.state.districtArray.map((item, index) => {
                    return (
                      <div key={index} style={{ float: "left", marginRight: "24px", color: index === this.state.districtIndex || index === this.state.focusDistrictIndex ? "#17A1E6" : "", cursor: "pointer" }}
                        onClick={e => this.clickDistrict(index)} onMouseMove={() => this.setState({ focusDistrictIndex: index })} onMouseLeave={() => this.setState({ focusDistrictIndex: -1 })} >
                        {item.name}
                      </div>
                    )
                  })
                  }
                </div>

                {this.state.districtIndex !== 0 ?
                  <div>
                    <div className="triangle" style={{ marginLeft: 56 + this.state.move }}></div>
                    <div className="in_triangle" style={{ marginLeft: 56 + this.state.move }}></div>
                    <div className="park-list-br"></div>
                    <div style={{ margin: "10px 0 0 56px" }}>
                      {this.state.districtChildArray.map((item, index) => {
                        return (
                          <div key={index} style={{ float: "left", height: "16px", marginRight: "24px", cursor: "pointer", color: index === this.state.districtChildIndex || index === this.state.focusDistrictChildIndex ? "#17A1E6" : "" }}
                            onClick={() => {
                              let selectedArr = this.state.selectedArr
                              if (index !== 0) {
                                selectedArr[0] = item
                              } else {
                                selectedArr[0] = {}
                              }
                              this.setState({ districtChildIndex: index, selectedArr: selectedArr })
                            }}
                            onMouseMove={() => this.setState({ focusDistrictChildIndex: index })} onMouseLeave={() => this.setState({ focusDistrictChildIndex: -1 })} >
                            {item.name}
                          </div>
                        )
                      })
                      }
                    </div>
                  </div> : null
                }

                <div style={{ clear: "both" }}></div>
                <div style={{ marginTop: "27px", overflow: "hidden" }}>
                  <div style={{ float: "left", color: "#989FA8" }}>价格：</div>
                  <div className="park-list-price" onClick={() => {
                    let selectedArr = this.state.selectedArr
                    selectedArr[1] = {}
                    this.setState({ isUnitPrice: true, priceIndex: 0, selectedArr: selectedArr, minPrice: "", maxPrice: "" })
                  }}
                    style={{ color: this.state.isUnitPrice ? "#17A1E6" : "#989FA8", border: this.state.isUnitPrice ? "1px solid #17A1E6" : "1px solid #CCCCCC", marginLeft: "20px", cursor: "pointer", backgroundColor: "#fff" }} >单价</div>
                  <div className="park-list-price" onClick={() => {
                    let selectedArr = this.state.selectedArr
                    selectedArr[1] = {}
                    this.setState({ isUnitPrice: false, priceIndex: 0, selectedArr: selectedArr, minPrice: "", maxPrice: "" })
                  }}
                    style={{ color: !this.state.isUnitPrice ? "#17A1E6" : "#989FA8", border: !this.state.isUnitPrice ? "1px solid #17A1E6" : "1px solid #CCCCCC", cursor: "pointer", backgroundColor: "#fff" }}>总价</div>
                  <div className="park-list-price-q">
                    <input style={{ width: "46px", float: "left", border: "none", outline: "none", padding: "0 10px 0 10px", lineHeight: "20px" }} value={this.state.minPrice}
                      onChange={event => {
                        const value = event.target.value
                        const reg = /^\d*?$/
                        if ((reg.test(value) && value.length < 5) || value === "") {
                          this.setState({ minPrice: event.target.value.substring(0, 4) }, () => {
                            if (this.state.minPrice.length === 4 && this.state.maxPrice.length === 4) {
                              let selectedArr = this.state.selectedArr
                              let name = this.state.isUnitPrice ? "元/m²·月" : "万元/月"
                              selectedArr[1] = { id: "", name: this.state.minPrice + "-" + this.state.maxPrice + name }
                              this.setState({ selectedArr: selectedArr, priceIndex: -1 })
                            }
                          })
                        }
                      }} />
                      <div style={{ height: "1px", width: "5px", backgroundColor: "#CCCCCC", float: "left", margin: "10px 0 0 3px" }}></div>
                      <div style={{ height: "1px", width: "5px", backgroundColor: "#CCCCCC", float: "left", margin: "10px 0 0 1px" }}></div>
                    <input style={{ width: "46px", float: "right", border: "none", outline: "none", padding: "0 10px 0 10px", lineHeight: "20px" }} value={this.state.maxPrice}
                      onChange={event => {
                        const value = event.target.value
                        const reg = /^\d*?$/
                        if ((reg.test(value) && value.length < 5) || value === "") {
                          this.setState({ maxPrice: event.target.value.substring(0, 4) }, () => {
                            if (this.state.minPrice.length === 4 && this.state.maxPrice.length === 4) {
                              let selectedArr = this.state.selectedArr
                              let name = this.state.isUnitPrice ? "元/m²·月" : "万元/月"
                              selectedArr[1] = { id: "", name: this.state.minPrice + "-" + this.state.maxPrice + name }
                              this.setState({ selectedArr: selectedArr, priceIndex: -1 })
                            }
                          })
                        }
                      }} />
                  </div>
                  <div style={{ float: "left", marginLeft: "8px", height: "22px", lineHeight: "22px" }}>{this.state.isUnitPrice ? "元/m²·月" : "万元/月"}</div>
                </div>
                <div style={{ margin: "10px 0 0 56px", clear: "both", overflow: "hidden" }}>
                  {this.state.isUnitPrice ?
                    this.state.unitPriceArray.map((item, index) => {
                      return (
                        <div key={index} onMouseMove={() => this.setState({ focusPriceIndex: index })} onMouseLeave={() => this.setState({ focusPriceIndex: -1 })}
                          onClick={() => {
                            let selectedArr = this.state.selectedArr
                            if (index !== 0) {
                              selectedArr[1] = item
                            } else {
                              selectedArr[1] = {}
                            }
                            this.setState({ priceIndex: index, selectedArr: selectedArr, minPrice: "", maxPrice: "" })
                          }}
                          style={{ float: "left", marginRight: "24px", cursor: "pointer", color: this.state.priceIndex === index || this.state.focusPriceIndex === index ? "#17A1E6" : "" }}>{item.name}</div>
                      )
                    }) :
                    this.state.totalPriceArray.map((item, index) => {
                      return (
                        <div key={index} onMouseMove={() => this.setState({ focusPriceIndex: index })} onMouseLeave={() => this.setState({ focusPriceIndex: -1 })}
                          onClick={() => {
                            let selectedArr = this.state.selectedArr
                            if (index !== 0) {
                              selectedArr[1] = item
                            } else {
                              selectedArr[1] = {}
                            }
                            this.setState({ priceIndex: index, selectedArr: selectedArr, minPrice: "", maxPrice: "" })
                          }}
                          style={{ float: "left", marginRight: "24px", cursor: "pointer", color: this.state.priceIndex === index || this.state.focusPriceIndex === index ? "#17A1E6" : "" }}>{item.name}</div>
                      )
                    })
                  }
                </div>
              </div>
            </div>

            <div className="searchCont">
              <input className="index-iphone" value={this.state.iphoneValue} />
              <img src="./fangliangbao/image/iphone.png" width="18px" height="18px" style={{ position: "relative", bottom: "31px", left: "10px" }} />

              <div className="index-require">
                <div className="you-require">您的需求</div>
                <div className="you-talk ">靠近地铁，靠近大海，有花园。</div>
              </div>
              <div className="find-room">宝哥帮找房</div>
            </div>
          </div>

          <div style={{ backgroundColor: "#E6E6E6", height: "1px", clear: "both", marginTop: "30px" }}></div>

          <div style={{ color: "#989FA8", marginTop: "20px", fontSize: "12px", lineHeight: "28px", overflow: "hidden" }}>
            <div style={{ float: "left" }}>已选：</div>

            {this.state.selectedArr.map((item, index) => {
              return (
                <div className="park-list-x" key={index} style={{ display: JSON.stringify(item) === "{}" ? "none" : "" }}>
                  <span>{item.name}</span>
                  <img src="./fangliangbao/image/close.png" width="15px" height="15px" style={{ margin: "0 0 3px 5px" }}
                    onClick={() => {
                      let selectedArr = this.state.selectedArr
                      selectedArr[index] = {}
                      index ?
                      this.setState({ selectedArr: selectedArr, priceIndex: 0, minPrice: "", maxPrice: "" }) :
                      this.setState({ selectedArr: selectedArr, districtIndex: 0, districtChildIndex: 0 })
                }
                }
              />
                </div>
              )
            })
            }

            <div style={{ float: "left", marginLeft: "20px", height: "28px", lineHeight: "28px", cursor: "pointer" }}
              onClick={() => {
                this.setState({ selectedArr: [{}, {}], districtIndex: 0, districtChildIndex: 0, priceIndex: 0, minPrice: "", maxPrice: "" })
              }} >
              <img src="./fangliangbao/image/clear.png" width="14px" height="14px" style={{float: "left", marginTop: "7px"}} />
              <div style={{ float: "left", color: "#333333", marginLeft: "5px", height: "28px", lineHeight: "28px" }}>清空条件</div>
            </div>
          </div>

          <div style={{marginTop: "34px", overflow: "hidden"}}>
            <div className="park-list-all-t">全部园区</div>
            <div style={{ float: "right", height: "40px", lineHeight: "52px" }}>共有<span style={{ fontSize: "16px", color: "#17A1E6", margin: "0 5px 0 5px" }}>12</span>个园区满足您的需求</div>
          </div>
          <div style={{ backgroundColor: "#17A1E6", height: "1px" }}></div>

          <div style={{ overflow: "hidden", marginTop: "2px" }}>
            {this.state.parkArray.map((item, index) => {
              return (
                <div key={index} className="index-park-child" onClick={() => { this.props.history.push({ pathname: "/parkInfo", parkId: 1, from: "park" ) }}>
                  <div className="index-img-a" style={{ marginRight: (index + 1) % 4 === 0 ? "0px" : "20px", marginTop: "28px" }}>
                    <img src="./fangliangbao/image/build.png" className="index-img-t1" height="100%" width="100%" />
                  </div>
                  <div style={{ fontSize: "16px", fontWeight: "bold", marginTop: "10px" }}>{item.name}</div>
                  <div style={{ overflow: "hidden", paddingTop: "10px" }}>
                    <img src="./fangliangbao/image/position.png" width="12px" height="12px" style={{ float: "left", margin: "4px 5px 0 0" }} /> <div className="index-address">{item.address}</div>
                    <div className="index-price" style={{ margin: (index + 1) % 4 === 0 ? "-15px 0 0 0" : "-15px 20px 0 0" }}><span style={{ color: "#DC1A3F", fontSize: "24px", marginRight: "5px" }}>{item.price}</span>元/m²·天</div>
                  </div>
                </div>
              )
            })
            }
          </div>

        </div>

        <div className="paging">
          {["<", 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, ">"].map((item, index) => {
            return (
              <div key={index} className="paging-child" style={{ marginRight: index !== 11 ? "6px" : 0 }}>
                { index === 0 ?
                  <img src="./fangliangbao/image/left_j.png" width="14px" height="14px" /> :
                  index === 11 ?
                  <img src="./fangliangbao/image/left_j.png" width="14px" height="14px" style={{transform: "rotate(180deg)"}} /> :
                  item
                }
              </div>
              )
          })
          }
        </div>

        <div style={{ position: "relative" }}>
          <AllBottom />
        </div>

      </div>
    )
  }

  
}

export default ParkList;
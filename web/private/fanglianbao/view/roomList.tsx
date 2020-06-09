import * as React from "react";
import * as ReactDOM from "react-dom";
import InfoTitle from "infoTitle"
import HomeTop from "homeTop"
import AllBottom from "allBottom"

class RoomList extends React.Component {
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
    priceArray: [
      { name: "全部" }, { name: "0-0.5万元/月" }, { name: "0.5-1.5万元/月" }, { name: "1.5-3万元/月" }, { name: "3-5万元/月" }, { name: "5-10万元/月" }, { name: "10万元/月以上" }
    ],
    parkArray: [
      { name: "桂林信息产业园", address: "七星-朝阳路D-12号", price: "6.5" }, { name: "桂林信息产业园", address: "七星-朝阳路D-12号", price: "6.5" }, { name: "桂林信息产业园", address: "七星-朝阳路D-12号", price: "6.5" },
      { name: "桂林信息产业园", address: "七星-朝阳路D-12号", price: "6.5" }, { name: "桂林信息产业园", address: "七星-朝阳路D-12号", price: "6.5" }, { name: "桂林信息产业园", address: "七星-朝阳路D-12号", price: "6.5" },
      { name: "桂林信息产业园", address: "七星-朝阳路D-12号", price: "6.5" }, { name: "桂林信息产业园", address: "七星-朝阳路D-12号", price: "6.5" }
    ],
    areaArray: [
      { name: "全部" }, { name: "0-100m²" }, { name: "100-300m²" }, { name: "300-500m²" }, { name: "500-1000m²" }, { name: "1000m²以上" }
    ],
    decorationArray: [
      { name: "全部" }, { name: "毛坯" }, { name: "简装" }, { name: "精装" }, { name: "豪华" }
    ],
    move: "", // 三角形移动位置
    districtIndex: 0, // 当前区域下标
    focusDistrictIndex: 0, // 聚焦当前区域下标
    iphoneValue: "输入您的手机号码",
    hotPark: [
      { name: "桂林信息产业园", price: "90.5", address: "七星-朝阳路D-12号" }, { name: "桂林信息产业园", price: "90.5", address: "七星-朝阳路D-12号" }, { name: "桂林信息产业园", price: "90.5", address: "七星-朝阳路D-12号" },
      { name: "桂林信息产业园", price: "90.5", address: "七星-朝阳路D-12号" }, { name: "桂林信息产业园", price: "90.5", address: "七星-朝阳路D-12号" }
    ]
  }

  public componentDidMount() {
    const { clientWidth, clientHeight, children } = this.refDom;
    console.log(clientWidth, clientHeight, children[0].clientWidth, this.refDom);
    this.setState({ move: children[0].clientWidth / 2 - 7 })
  }

  clickDistrict(index) {
    let move = 0
    const { children } = this.refDom;
    this.setState({ districtIndex: index }, () => {
      for (let i = 0; i < this.state.districtIndex; i++) {
        move = move + children[i].clientWidth
      }
      console.log(move, this.state.districtIndex * 24, children[this.state.districtIndex].clientWidth / 2 - 7)
      this.setState({ move: move + this.state.districtIndex * 24 + (children[this.state.districtIndex].clientWidth / 2 - 7) })
    })
  }


  public render() {
    return (
      <div className="index">
        <HomeTop />
        <div style={{ width: "1200px", margin: "auto", paddingTop: "61px" }}><InfoTitle index={1} /></div>

        <div className="warp" style={{ marginTop: "26px", marginBottom: "10px", overflow: "hidden" }}>

          <div style={{ overflow: "hidden" }}>
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
                  <div style={{ float: "left", color: "#17A1E6", cursor: "pointer" }}>区域<img src="./fangliangbao/image/blue_down.png" width="10px" height="10px" style={{ margin: "0 24px 2px 5px" }} /></div>
                  <div style={{ float: "left", cursor: "pointer" }}>地铁<img src="./fangliangbao/image/black_down.png" width="10px" height="10px" style={{ margin: "0 0 2px 5px" }} /></div>
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
                <div className="triangle" style={{ marginLeft: 56 + this.state.move }}></div>
                <div className="in_triangle" style={{ marginLeft: 56 + this.state.move }}></div>
                <div className="park-list-br"></div>
                <div style={{ margin: "10px 0 0 56px" }}>
                  {this.state.districtChildArray.map((item, index) => {
                    return (
                      <div key={index} style={{ float: "left", height: "16px", marginRight: "24px", cursor: "pointer" }}>
                        {item.name}
                      </div>
                    )
                  })
                  }
                </div>

                <div style={{ clear: "both" }}></div>
                <div style={{ marginTop: "27px", overflow: "hidden", clear: "both" }}>
                  <div style={{ float: "left", color: "#989FA8" }}>面积：</div>
                  <div style={{ marginLeft: "56px" }}>
                  {this.state.areaArray.map((item, index) => {
                    return (
                      <div key={index} style={{ float: "left", height: "16px", marginRight: "24px", cursor: "pointer" }}>{item.name}</div>  
                    )
                  })
                  }
                  </div>
                  <div className="park-list-price-q" style={{marginLeft: 0}}>
                    <div style={{ width: "11px", height: "16px", margin: "auto", marginTop: "3px", paddingTop: "7.5px" }}>
                      <div style={{ height: "1px", width: "5px", backgroundColor: "#CCCCCC", float: "left" }}></div>
                      <div style={{ height: "1px", width: "5px", backgroundColor: "#CCCCCC", float: "left", marginLeft: "1px" }}></div>
                    </div>
                  </div>
                  <div style={{ float: "left", height: "22px", lineHeight: "22px", marginLeft: "5px" }}>m²</div>
                </div>

                <div style={{ clear: "both" }}></div>
                <div style={{ marginTop: "27px", overflow: "hidden" }}>
                  <div style={{ float: "left", color: "#989FA8" }}>价格：</div>
                  <div className="park-list-price" style={{ color: "#989FA8", marginLeft: "20px", border: "1px solid #CCCCCC" }}>单价</div>
                  <div className="park-list-price" style={{ color: "#17A1E6", border: "1px solid #17A1E6", marginLeft: "-1px" }}>总价</div>
                  <div className="park-list-price-q">
                    <div style={{ width: "11px", height: "16px", margin: "auto", marginTop: "3px", paddingTop: "7.5px" }}>
                      <div style={{ height: "1px", width: "5px", backgroundColor: "#CCCCCC", float: "left" }}></div>
                      <div style={{ height: "1px", width: "5px", backgroundColor: "#CCCCCC", float: "left", marginLeft: "1px" }}></div>
                    </div>
                  </div>
                  <div style={{ float: "left", marginLeft: "8px", height: "22px", lineHeight: "22px" }}>万元/月</div>
                </div>
                <div style={{ margin: "10px 0 0 56px", clear: "both", overflow: "hidden" }}>
                  {this.state.priceArray.map((item, index) => {
                    return (
                      <div key={index} style={{ float: "left", marginRight: "24px" }}>{item.name}</div>
                    )
                  })
                  }
                </div>

                <div style={{ clear: "both" }}></div>
                <div style={{ marginTop: "27px", overflow: "hidden", clear: "both" }}>
                  <div style={{ float: "left", color: "#989FA8" }}>装修：</div>
                  <div style={{ marginLeft: "56px" }}>
                    {this.state.decorationArray.map((item, index) => {
                      return (
                        <div key={index} style={{ float: "left", height: "16px", marginRight: "24px", cursor: "pointer" }}>{item.name}</div>
                      )
                    })
                    }
                  </div>
                </div>

                <div style={{ clear: "both" }}></div>
                <div style={{ marginTop: "27px", overflow: "hidden", clear: "both" }}>
                  <div style={{ float: "left", color: "#989FA8" }}>类型：</div>
                  <div style={{ marginLeft: "56px" }}>
                    {[{ name: "全部" }, { name: "共享办公" }, { name: "独立办公" }].map((item, index) => {
                      return (
                        <div key={index} style={{ float: "left", height: "16px", marginRight: "24px", cursor: "pointer" }}>{item.name}</div>
                      )
                    })
                    }
                  </div>
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

          <div style={{ clear: "both" }}></div>
          <div style={{ marginTop: "34px", overflow: "hidden" }}>
            <div style={{ overflow: "hidden", width: "895px", float: "left" }}>
              <div style={{ overflow: "hidden" }}>
                <div className="park-list-all-t">全部房源</div>
                <div style={{ float: "right", height: "40px", lineHeight: "52px" }}>共有<span style={{ fontSize: "16px", color: "#17A1E6", margin: "0 5px 0 5px" }}>60</span>条房源满足您的需求</div>
              </div>
              <div style={{ backgroundColor: "#17A1E6", height: "1px", width: "895px" }}></div>
            </div>
            <div className="room-list-hot-room">热门园区推荐</div>
          </div>

          <div style={{overflow: "hidden"}}>
            <div style={{width: "895px", float: "left"}}>
              {[1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12].map((item, index) => {
                return (
                  <div key={index} style={{ marginTop: index === 0 ? "18px" : "30px", overflow: "hidden", cursor: "pointer", width: "895px" }}>
                    <div style={{ width: "240px", height: "180px", borderRadius: "5px", float: "left", overflow: "hidden" }} >
                      <img src="./fangliangbao/image/build1.png" className="index-img-t1" width="100%" height="100%" />
                    </div>
                    <div style={{ float: "left", marginLeft: "30px", width: "500px" }}>
                      <div className="index-c-a">出租！高新区信息产业园豪华装修单元</div>
                      <div style={{ marginTop: "22px", fontSize: "14px", overflow: "hidden" }}>
                        <div style={{ float: "left" }}>桂林信息产业园</div>
                        <div style={{ color: "#DDDDDD", float: "left", margin: "0 10px 0 10px" }}> / </div>
                        <div style={{ float: "left" }}>100.5m²</div>
                        <div style={{ color: "#DDDDDD", float: "left", margin: "0 10px 0 10px" }}> / </div>
                        <div style={{ float: "left" }}> 豪华装修 </div>
                      </div>
                      <div style={{ marginTop: "14px", fontSize: "14px", overflow: "hidden" }}>
                        <div style={{ float: "left" }}>七星-东二环路</div>
                        <div style={{ color: "#DDDDDD", float: "left", margin: "0 10px 0 10px" }}> / </div>
                        <div style={{ float: "left" }}>朝阳路D-12号</div>
                      </div>
                      <div style={{ marginTop: "14px", fontSize: "14px", color: "#989FA8" }}>有5位用户正在浏览该房源</div>
                      <div style={{ marginTop: "12px", fontSize: "12px", overflow: "hidden", color: "#849AAE" }}>
                        <div style={{ backgroundColor: "#F3F5F7", width: "77px", height: "24px", borderRadius: "2px", float: "left", textAlign: "center", lineHeight: "24px", marginRight: "10px" }}>
                          带办公家具
                        </div>
                        <div style={{ backgroundColor: "#F3F5F7", width: "77px", height: "24px", borderRadius: "2px", float: "left", textAlign: "center", lineHeight: "24px", marginRight: "10px" }}>
                          户型方正
                        </div>
                        <div style={{ backgroundColor: "#F3F5F7", width: "77px", height: "24px", borderRadius: "2px", float: "left", textAlign: "center", lineHeight: "24px", marginRight: "10px" }}>
                          可注册
                        </div>
                      </div>
                    </div>
                    <div className="index-collect">
                      <img src="./fangliangbao/image/collect.png" width="11px" height="11px" style={{ margin: "0 3px 2px 0"}} />
                      <span style={{ color: "#B9B9B9", fontSize: "12px" }}>收藏</span>
                    </div>
                    <div style={{ float: "left", color: "#989FA8", fontSize: "14px", paddingTop: "47px", overflow: "hidden" }}>
                      <div style={{float: "right"}}>
                        <span style={{ color: "rgba(220, 26, 63, 1)", fontSize: "26px", fontWeight: 600, marginRight: "5px" }}>1.8</span>
                        <span>万元/月</span>
                      </div>
                      <div style={{clear: "both"}}>单价：120元/m²⋅月</div>
                    </div>
                  </div>
                )
              })
              }

              <div className="paging" style={{marginTop: "80px"}}>
                {["<", 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, ">"].map((item, index) => {
                  return (
                    <div key={index} className="paging-child" style={{ marginRight: index !== 11 ? "6px" : 0 }}>
                      {index === 0 ?
                        <img src="./fangliangbao/image/left_j.png" width="14px" height="14px" /> :
                        index === 11 ?
                          <img src="./fangliangbao/image/left_j.png" width="14px" height="14px" style={{ transform: "rotate(180deg)" }} /> :
                          item
                      }
                    </div>
                  )
                })
                }
              </div>
            </div>
            <div style={{ float: "left", overflow: "hidden", margin: "0 0 0 60px" }}>
              {this.state.hotPark.map((item, index) => {
                return (
                  <div style={{ overflow: "hidden", marginTop: "20px" }} key={index}>
                    <img src="./fangliangbao/image/build1.png" width="88px" height="66px" style={{ borderRadius: "2px", float: "left" }} />
                    <div style={{ float: "left", margin: "-1px 0 0 16px" }}>
                      <div style={{ color: "#333333", fontSize: "14px" }}>{item.name}</div>
                      <div style={{ marginTop: "2px" }}>
                        <span style={{ color: "#DC1A3F", fontSize: "16px", marginRight: "5px", fontWeight: 600 }}>{item.price}</span>
                        <span style={{ color: "#989FA8", fontSize: "12px" }}>元/m²⋅月</span>
                      </div>
                      <div style={{ color: "#989FA8", fontSize: "12px", marginTop: "2px" }}>{item.address}</div>
                    </div>
                  </div>
                  )
                })
              }

              <div className="wx-title">房良宝小程序端</div>
              <img src="./fangliangbao/image/wx.png" />
              <div style={{fontSize: "12px", marginLeft: "10px"}}>打开微信扫一扫随时手机体验</div>
            </div>
          </div>



        </div>
        <AllBottom />
      </div>
    )
  }

  
}

export default RoomList;
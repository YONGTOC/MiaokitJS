import * as React from "react";
import * as ReactDOM from "react-dom";
import { Link } from 'react-router-dom';
import HomeTop from 'homeTop';
import AllBottom from 'allBottom';

class personalCenter extends React.Component<{ index: any }> {
  constructor(props) {
    super(props);


  }

  public state = {
    tagList: [
      { name: "个人中心", count: "" },
      { name: "我的收藏", count: "15" },
      { name: "浏览记录", count: "200" }
    ],
    tagIndex: 0,
    isRoom: true, // 房源和园区切换
    parkArray: [
      { name: "桂林信息产业园", address: "七星-朝阳路D-12号", price: "6.5" }, { name: "桂林信息产业园", address: "七星-朝阳路D-12号", price: "6.5" }, { name: "桂林信息产业园", address: "七星-朝阳路D-12号", price: "6.5" },
      { name: "桂林信息产业园", address: "七星-朝阳路D-12号", price: "6.5" }, { name: "桂林信息产业园", address: "七星-朝阳路D-12号", price: "6.5" }, { name: "桂林信息产业园", address: "七星-朝阳路D-12号", price: "6.5" },
      { name: "桂林信息产业园", address: "七星-朝阳路D-12号", price: "6.5" }, { name: "桂林信息产业园", address: "七星-朝阳路D-12号", price: "6.5" }
    ],
  }

  public componentDidMount() {
  }


  public render() {
    return (
      <div className="index">
        <HomeTop />
        <div className="warp">
          <img src="./fangliangbao/image/blueLogo.png" style={{ margin: "61px 0 21px 0" }} />
          <div className="p-br"></div>

          <div style={{ overflow: "hidden" }}>
            <div className="p-content">
              {this.state.tagList.map((item, index) => {
                return (
                  <div key={index} className="p-child-content" style={{ backgroundColor: this.state.tagIndex === index ? "#17A1E6" : "#F2F2F2", color: this.state.tagIndex === index ? "#fff" : "#2E2E2E" }}
                    onClick={() => this.setState({ tagIndex: index })} >
                    <div style={{ float: "left" }}>{item.name}</div>
                    {
                      item.count ? <div style={{ float: "left", marginLeft: "10px" }}>({item.count})</div> : null
                    }
                  </div>
                )
              })
              }
            </div>


            {this.state.tagIndex === 0 ?
              <div className="user-info">
                <div style={{ overflow: "hidden", width: "350px" }}>
                  <div style={{ float: "left" }}>用户昵称</div>
                  <div style={{ marginLeft: "50px", float: "left", width: "130px" }}>小明</div>
                  <div style={{ marginLeft: "20px", float: "left", color: "#17A1E6", cursor: "pointer" }}>修改</div>
                </div>
                <div style={{ overflow: "hidden", marginTop: "20px", width: "350px" }}>
                  <div style={{ float: "left" }}>绑定手机</div>
                  <div style={{ marginLeft: "50px", float: "left", width: "130px" }}>123456789</div>
                  <div style={{ marginLeft: "20px", float: "left", color: "#17A1E6", cursor: "pointer" }}>修改</div>
                </div>
                <div style={{ overflow: "hidden", marginTop: "20px", width: "350px" }}>
                  <div style={{ float: "left" }}>绑定微信</div>
                  <div style={{ marginLeft: "50px", float: "left", width: "130px" }}>微信昵称</div>
                  <div style={{ marginLeft: "20px", float: "left", color: "#17A1E6", cursor: "pointer" }}>解除绑定</div>
                </div>
                <div style={{ overflow: "hidden", marginTop: "20px", width: "350px" }}>
                  <div style={{ float: "left" }}>用户头像</div>
                  <img src="./fangliangbao/image/a1.jpg" style={{ marginLeft: "50px" }} width="60px" height="60px" />
                </div>
              </div> : null
            }

            {this.state.tagIndex === 1 ?
              <div className="user-info">
                <div style={{ overflow: "hidden" }}>
                  <div className="user-a"
                    style={{ backgroundColor: this.state.isRoom ? "#17A1E6" : "#fff", color: this.state.isRoom ? "#fff" : "#333333" }}
                    onClick={() => { this.setState({ isRoom: true }) }}
                  >
                    房源收藏 <span style={{ marginLeft: "5px" }}>(10)</span>
                  </div>
                  <div className="user-a"
                    style={{ backgroundColor: !this.state.isRoom ? "#17A1E6" : "#fff", color: !this.state.isRoom ? "#fff" : "#333333" }}
                    onClick={() => { this.setState({ isRoom: false }) }}
                  >
                    园区收藏 <span style={{ marginLeft: "5px" }}>(5)</span>
                  </div>
                </div>
                <div className="p-br-a"></div>

                {this.state.isRoom ?
                  [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12].map((item, index) => {
                    return (
                      <div key={index} style={{ marginTop: "30px", overflow: "hidden", cursor: "pointer", width: "895px" }}>
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
                        <div className="index-collect" style={{ border: "1px solid rgba(204,204,204,1)" }}>
                          <div style={{ float: "left", height: "12px", width: "12px", overflow: "hidden", margin: "5px 5px 0 8px" }}>
                            <img src="./fangliangbao/image/delete.png" width="100%" height="100%"  style={{ display: "block" }} />
                          </div>
                          <div style={{ color: "#B9B9B9", fontSize: "12px", float: "left" }} >取消</div>
                        </div>
                        <div style={{ float: "left", color: "#989FA8", fontSize: "14px", paddingTop: "47px", overflow: "hidden" }}>
                          <div style={{ float: "right" }}>
                            <span style={{ color: "rgba(220, 26, 63, 1)", fontSize: "26px", fontWeight: 600, marginRight: "5px" }}>1.8</span>
                            <span>万元/月</span>
                          </div>
                          <div style={{ clear: "both" }}>单价：120元/m²⋅月</div>
                        </div>
                      </div>
                    )
                  }) :
                  <div style={{ overflow: "hidden", width: "896px" }}>
                    {
                      this.state.parkArray.map((item, index) => {
                        return (
                          <div key={index} className="index-park-child">
                            <div className="index-img-a"
                              style={{ marginRight: (index + 1) % 3 === 0 ? "0px" : "20px", marginTop: "30px" }}>
                              <div className="p-black">
                                <img src="./fangliangbao/image/white_clear.png" width="12px" height="12px" />
                              </div>
                              <img src="./fangliangbao/image/build.png" height="100%" width="100%" className="index-img-t1" />
                            </div>
                            <div style={{ fontSize: "16px", fontWeight: "bold", marginTop: "10px" }}>{item.name}</div>
                            <div style={{ overflow: "hidden", paddingTop: "10px" }}>
                              <img src="./fangliangbao/image/position.png" width="12px" height="12px" style={{ float: "left", margin: "4px 5px 0 0" }} /> <div className="index-address">{item.address}</div>
                              <div className="index-price" style={{ margin: (index + 1) % 3 === 0 ? "-15px 0 0 0" : "-15px 20px 0 0" }}><span style={{ color: "#DC1A3F", fontSize: "24px", marginRight: "5px" }}>{item.price}</span>元/m²·天</div>
                            </div>
                          </div>
                        )
                      })
                    }
                  </div>
                }
              </div> : null
            }

            {this.state.tagIndex === 2 ?
              <div className="user-info">
                <div className="all-clear">全部清除</div>
                {
                  [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12].map((item, index) => {
                    return (
                      <div key={index} style={{ marginTop: "30px", overflow: "hidden", cursor: "pointer", width: "895px", clear: "both" }}>
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
                        <div className="index-collect" style={{ border: "1px solid rgba(204,204,204,1)" }}>
                          <div style={{ float: "left", height: "12px", width: "12px", overflow: "hidden", margin: "5px 5px 0 8px" }}>
                            <img src="./fangliangbao/image/delete.png" width="100%" height="100%" style={{ display: "block" }} />
                          </div>
                          <div style={{ color: "#B9B9B9", fontSize: "12px", float: "left" }} >清除</div>
                        </div>
                        <div style={{ float: "left", color: "#989FA8", fontSize: "14px", paddingTop: "47px", overflow: "hidden" }}>
                          <div style={{ float: "right" }}>
                            <span style={{ color: "rgba(220, 26, 63, 1)", fontSize: "26px", fontWeight: 600, marginRight: "5px" }}>1.8</span>
                            <span>万元/月</span>
                          </div>
                          <div style={{ clear: "both" }}>单价：120元/m²⋅月</div>
                        </div>
                      </div>
                    )
                  })
                }
              </div> : null
            }



          </div>

        </div>
        <AllBottom />
      </div>
    )
  }

  
}

export default personalCenter;
import * as React from "react";
import * as RouterDOM from 'react-router-dom';

import DataService from "dataService";
import GlobalAction from "compat";


class IconBox extends React.Component {
  public constructor(props) {
    super(props)

    this.switchMark = this.switchMark.bind(this);
    this.logIcon = this.logIcon.bind(this);
     
  }

  public componentDidMount() {
    var iconStated = JSON.parse(sessionStorage.getItem("iconstate"))
   // console.log(JSON.parse(sessionStorage.getItem("iconstate")));

  //  console.log(iconStated);
    this.topClose('10');
    if (iconStated) {
      if (iconStated.haveIcon == true) {
        this.setState({
          topIcon1: iconStated.topIcon1,
          topIcon2: iconStated.topIcon2,
          topIcon3: iconStated.topIcon3,
          topIcon4: iconStated.topIcon4,
          topIcon5: iconStated.topIcon5,
          topIcon: iconStated.topIcon,
          playIcon: iconStated.playIcon,
          moreIcon: iconStated.moreIcon,
          topClose: iconStated.topClose,
          topViewBack: iconStated.topViewBack,
          topIcon3info: iconStated.topIcon3info,
          topIcon4info: iconStated.topIcon4info,
          topIcon5info: iconStated.topIcon5info,
          mapIcon: iconStated.mapIcon,
        })
      }
    }
  }

  public state = {
    topView: "topView",
    topIcon1: "iconBox",
    topIcon2: "iconBox",
    topIcon3: "iconBox",
    topIcon4: "iconBox",
    topIcon5: "iconBox",
    topIcon: "iconBox",
    playIcon: "iconBox",
    moreIcon: "iconBox",
    topClose: "hide",
    topViewBack: "",
    topIcon3info: 0,
    topIcon4info: 0,
    topIcon5info: 0,
    haveIcon: false,
    mapIcon: [
      { name: "交通" },
      { name: "商圈" },
      { name: "公交站" },
      { name: "全景" },
      { name: "停车场" },
      { name: "交通" },
    ]
  }


  //显示更多标识
  public moreIcon(a) {
    console.log('toggleIconbox', a);
    this.setState({
      topView: "topView-big",
      moreIcon: "hide",
      topClose: "topClose",
      topIcon1: "iconBox-big",
      topIcon2: "iconBox-big",
      topIcon3: "iconBox-big",
      topIcon4: "iconBox-big",
      topIcon5: "iconBox-big",
      topViewBack: "topViewBack",
    })
    if (this.state.topIcon1 == "iconBoxIn" && this.state.topIcon2 == "iconBoxIn") {
      this.setState({
        topIcon1: "iconBox-bigIn",
        topIcon2: "iconBox-bigIn",
      })
    } else if (this.state.topIcon1 == "iconBoxIn") {
    //  console.log(this.state.topIcon1)
      this.setState({
        topIcon1: "iconBox-bigIn",
      })
    } else if (this.state.topIcon2 == "iconBoxIn") {
     // console.log(this.state.topIcon1)
      this.setState({
        topIcon2: "iconBox-bigIn",
      })
    };
    if (this.state.topIcon3info == 1) {
      this.setState({
        topIcon3: "iconBox-bigIn",
      })
    } if (this.state.topIcon4info == 1) {
      this.setState({
        topIcon4: "iconBox-bigIn",
      })
    } if (this.state.topIcon5info == 1) {
      this.setState({
        topIcon5: "iconBox-bigIn",
      })
    };

  }

  // 关闭更多icon
  public topClose(a) {
    console.log('topClose', a);
    this.setState({
      topView: "topView",
      moreIcon: "iconBox",
      topClose: "hide",
      topViewBack: " ",
    }, () => {
      this.logIcon();
    })
    if (this.state.topIcon1 == "iconBox-bigIn" && this.state.topIcon2 == "iconBox-bigIn") {
      this.setState({
        topIcon1: "iconBoxIn",
        topIcon2: "iconBoxIn",
      }, () => {
        this.logIcon();
      })
    } else if (this.state.topIcon1 == "iconBox-bigIn") {
      this.setState({
        topIcon1: "iconBoxIn",
        topIcon2: "iconBox",
      }, () => {
        this.logIcon();
      })
    } else if (this.state.topIcon2 == "iconBox-bigIn") {
      this.setState({
        topIcon1: "iconBox",
        topIcon2: "iconBoxIn",
      }, () => {
        this.logIcon();
      })
    } else {
      this.setState({
        topIcon1: "iconBox",
        topIcon2: "iconBox",
        topIcon3: "iconBox",
        topIcon4: "iconBox",
        topIcon5: "iconBox",
      }, () => {
        this.logIcon();
      })
    }
   // console.log('topClose2222', this.state);

  }


  public globalAction: GlobalAction = new GlobalAction();
  public dataService: DataService = new DataService();

  // 点亮icon
  public callMark(type, name) {
    //  this.dataService.getParkPointList(this.markBack.bind(this), type, name);


  }

  // 通知3d 数据
  public markBack(data, name) {
    console.log('mark', data.response, name);
    // this.globalAction.web_call_webgl_switchMark(name, 'true', data.response);
  }

  // 关闭icon
  public markClose(name) {
    //  this.globalAction.web_call_webgl_switchMark(name, 'false', null);
  }

  // 切换地图标识;0--隐藏标识； 1--显示标识
  public switchMark(a, bInfo) {
    console.log('switchMark', a);
    if (a == "全景") {
      // 判断当前是否为选中状态
      if (this.state.topIcon1 == "iconBoxIn" || this.state.topIcon1 == "iconBox-bigIn") {
        if (this.state.topView == "topView-big") {
          this.setState({
            topIcon1: "iconBox-big",
            //  haveIcon: false
          }, () => {
            this.logIcon();
          })
        } else {
          this.setState({
            topIcon1: "iconBox",
            // haveIcon: false
          }, () => {
            this.logIcon();
          })
        }
        this.markClose(a)
      } else {
        if (this.state.topView == "topView-big") {
          this.setState({
            topIcon1: "iconBox-bigIn",
          }, () => {
            this.logIcon();
          })
        } else {
          this.setState({
            topIcon1: "iconBoxIn",
          }, () => {
            this.logIcon();
          })
        }
        this.callMark(4, a)
      }

    } else if (a == "商圈") {
      // 判断当前是否为选中状态
      if (this.state.topIcon2 == "iconBoxIn" || this.state.topIcon2 == "iconBox-bigIn") {
        if (this.state.topView == "topView-big") {
          this.setState({
            topIcon2: "iconBox-big",
            // haveIcon: false
          }, () => {
            this.logIcon();
          })
        } else {
          this.setState({
            topIcon2: "iconBox",
            //  haveIcon: false
          }, () => {
            this.logIcon();
          })
        }
        this.markClose(a)
      } else {
        if (this.state.topView == "topView-big") {
          this.setState({
            topIcon2: "iconBox-bigIn",
            // haveIcon: true
          }, () => {
            this.logIcon();
          })
        } else {
          this.setState({
            topIcon2: "iconBoxIn",
            //  haveIcon: true
          }, () => {
            this.logIcon();
          })
        }
        this.callMark(2, a)
      }

    } else if (a == "公交车") {
      if (this.state.topIcon3 == "iconBox-big") {
        this.setState({
          topIcon3: "iconBox-bigIn",
          topIcon3info: 1,
          haveIcon: true,
        }, () => {
          this.logIcon();
        })
        this.callMark(3, a)
      } else {
        this.setState({
          topIcon3: "iconBox-big",
          topIcon3info: 0,
          // haveIcon: false,
        }, () => {
          this.logIcon();
        })
        this.markClose(a)
      }
    } else if (a == "交通") {
      if (this.state.topIcon4 == "iconBox-big") {
        this.setState({
          topIcon4: "iconBox-bigIn",
          topIcon4info: 1,
          // haveIcon: true,
        }, () => {
          this.logIcon();
        })
        this.callMark(1, a)
      } else {
        this.setState({
          topIcon4: "iconBox-big",
          topIcon4info: 0,
          // haveIcon: false,
        }, () => {
          this.logIcon();
        })
        this.markClose(a)
      }
    } else if (a == "停车场") {
      if (this.state.topIcon5 == "iconBox-big") {
        this.setState({
          topIcon5: "iconBox-bigIn",
          topIcon5info: 1,
          // haveIcon: true
        }, () => {
          this.logIcon();
        })
        this.callMark(5, a)
      } else {
        this.setState({
          topIcon5: "iconBox-big",
          topIcon5info: 0,
          //haveIcon: false
        }, () => {
          this.logIcon();
        })
        this.markClose(a)
      }
    }


    //sessionStorage.setItem("iconstate", JSON.stringify(this.state));


  }

  public logIcon() {
  //  console.log(this.state)

    if (this.state.topIcon1 == "iconBoxIn" || this.state.topIcon1 == "iconBox-bigIn" ||
      this.state.topIcon2 == "iconBoxIn" || this.state.topIcon2 == "iconBox-bigIn" ||
      this.state.topIcon3 == "iconBox-bigIn" ||
      this.state.topIcon4 == "iconBox-bigIn" ||
      this.state.topIcon5 == "iconBox-bigIn"
    ) {
      this.setState({
        haveIcon: true
      }, () => {
        sessionStorage.setItem("iconstate", JSON.stringify(this.state));
      })
    } else {
      this.setState({
        haveIcon: false
      }, () => {
        sessionStorage.setItem("iconstate", JSON.stringify(this.state));
      })
    }

  }

  public render() {
    return (
      <div className="btnBox">
        <div className={this.state.topView}>
          <div className={this.state.topIcon1} onClick={this.switchMark.bind(this, "全景")} style={{ "border-top": "0rem solid #646464" }}>
            <i className="iconfont" style={{ "fontSize": "40px" }}>&#xe818;</i>
            <p>全景</p>
          </div>
          <div className={this.state.topIcon2} onClick={this.switchMark.bind(this, "商圈")}>
            <i className="iconfont" style={{ "fontSize": "40px" }}>&#xe81a;</i>
            <p>商圈</p>
          </div>
          <div className={this.state.moreIcon} onClick={this.moreIcon.bind(this, 10)} >
            <i className="iconfont" style={{ "fontSize": "40px" }}>&#xe819;</i>
            <p>更多</p>
          </div>
          <div className={this.state.topIcon3} onClick={this.switchMark.bind(this, "公交车")} style={{ "border-top": "0rem solid #646464" }}>
            <i className="iconfont" style={{ "fontSize": "40px" }}>&#xe817;</i>
            <p>公交车</p>
          </div>
          <div className={this.state.topIcon4} onClick={this.switchMark.bind(this, "交通")}>
            <i className="iconfont" style={{ "fontSize": "40px" }}>&#xe816;</i>
            <p>交通</p>
          </div>
          <div className={this.state.topIcon5} onClick={this.switchMark.bind(this, "停车场")}>
            <i className="iconfont" style={{ "fontSize": "40px" }}>&#xe81b;</i>
            <p>停车场</p>
          </div>
          <div className={this.state.topClose} onClick={this.topClose.bind(this, 10)}>
            <i className="iconfont" style={{ "fontSize": "28px" }}>&#xe81c;</i>
          </div>
        </div>
      </div>
    )
  }


}


export default IconBox;
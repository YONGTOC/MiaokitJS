import * as React from "react";
import * as RouterDOM from 'react-router-dom';

import DataService from "dataService";
import GlobalAction from "compat";


class FloorList extends React.Component {
  constructor(props) {
    super(props)

    FloorList.getFloor = this.getFloor.bind(this);
  }

  public componentDidMount() {
    console.log(this.state.floorList.length);
    this.setState({
      floorMax: this.state.floorList.length,
      floorIndex: 1,
    })
  }

  public globalAction: GlobalAction = new GlobalAction();
  public dataService: DataService = new DataService();

  static getFloor(data) { };
  public getFloor(data) {
    console.log("fdfs", this.state)
    console.log("fdfs2", data)
    this.setState({
      floorList:data
    })
  }

  public floorUp() {
    if (this.state.floorIndex > 1) {
      this.setState({
        floorIndex: this.state.floorIndex - 1,
        floorId: this.state.floorList[this.state.floorIndex-2].id,
        floorCode: this.state.floorList[this.state.floorIndex-2].code,
      }, () => {
        let x;
        var i = this.state.floorIndex - 1;
        x = 30 * i + 10;
        $(".floor_box ul").css("top", "-" + x + "px");
        console.log(this.state.floorCode)
        this.globalAction.web_call_webgl_active_floor(this.state.floorIndex - 1);
      })

    } else {
      console.log("top")
    }
  }

  public floorDown() {
    if (this.state.floorIndex === this.state.floorMax) {
      console.log("down")
    } else {
      this.setState({
        floorIndex: this.state.floorIndex + 1,
        floorId: this.state.floorList[this.state.floorIndex].id,
        floorCode: this.state.floorList[this.state.floorIndex].code,
      }, () => {
        let x;
        let i = this.state.floorIndex - 1;
        x = 30 * i + 10;
        $(".floor_box ul").css("top", "-" + x + "px");
        console.log(this.state.floorCode)
        this.globalAction.web_call_webgl_active_floor(this.state.floorIndex - 1);
      })
    }

  }

  public activeList(index, id, code) {
    console.log(index, id, code);
    this.setState({
      floorIndex: index,
      floorId: id,
      floorCode: code,
    }, () => {
      if (index > 1) {
        let x;
        let i = this.state.floorIndex - 1;
        x = 30 * i + 10;
        $(".floor_box ul").css("top", "-" + x + "px");
      };
      if (index == 1) {
        $(".floor_box ul").css("top", "-10px");
      }

      console.log(this.state.floorCode);
      console.log(this.state.floorIndex);
      this.globalAction.web_call_webgl_active_floor(this.state.floorIndex-1);
    });

       
  }

  public render() {
    return (
          <div className="floor_box ">
            <p className="floor_box_up">
              <i className="iconfont " style={{ "transform": "rotate(180deg)", "position": "relative", "left": "0.5px" }}
                onClick={this.floorUp.bind(this)}>&#xe835;</i>
            </p>
            <div className="floor_box_ul">
              <ul>
                {this.state.floorList.map((i, index) => {
                  return (
                    <li className={this.state.floorIndex == index + 1 ? "floorIn" : null}
                      onClick={this.activeList.bind(this, index + 1, i.id, i.code)}>
                      {i.name}
                    </li>
                  )
                })}
              </ul>
            </div>
            <div className="activeBoxLeft">
              <div className="trangleLeft"></div>
            </div>
            <div className="activeBoxRight">
              <div className="trangleRight"></div>
            </div>
            <p className="floor_box_down" >
              <i className="iconfont " style={{ "position": "relative", "left": "-1.5px" }}
                onClick={this.floorDown.bind(this)}>&#xe835;</i>
            </p>
          </div>
    )

  }

  public state = {
    floorIndex: null,
    floorList: [
      //{ id: "id-1f", name: "1F", code: "code-1f" },
      //{ id: "id-2f", name: "2F", code: "code-2f" },
      //{ id: "id-3f", name: "3F", code: "code-3f" },
      //{ id: "id-4f", name: "4F", code: "code-4f" },
      //{ id: "id-5f", name: "5F", code: "code-5f" },
      //{ id: "id-6f", name: "6F", code: "code-6f" },
      //{ id: "id-7f", name: "7F", code: "code-7f" },
    ],
    floorMax: null,
    floorId: null,
    floorCode: null,
  }

}


export default FloorList;
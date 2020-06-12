import * as React from "react";
import * as ReactDOM from "react-dom";
import { Link } from 'react-router-dom';

import Router from 'router';

class AllBottom extends React.Component {
  constructor(props) {
    super(props);


  }

  public componentDidMount() {
  }


  public render() {
    return (
      <div className="homeBottom">
        <div className="homeBottomBox">
          <div className="homeBottomBox_one">
            <div className="hbLeft">
              <ul>
                <li><img src="./fangliangbao/image/whiteLogo.png" /> </li>
                <Link to="/contact">
                  <li style={{ cursor: "pointer", color: "#CCCCCC" }}>联系我们</li>
                  <li style={{ cursor: "pointer", color: "#CCCCCC" }}>网站地图</li>
                  <li style={{ cursor: "pointer", color: "#CCCCCC" }}>友情链接</li>
                </Link>
              </ul>
            </div>
            <div className="hbMiddle">
              <ul>
                <li> <img src="./fangliangbao/image/bottomMa.png"/> </li>
                <li>官方微信小程序</li>
              </ul>
            </div>
            <div className="hbRight">
              <ul>
                <li>客服服务：（工作日 早8:30-晚18:00）</li>
                <li style={{"font-size":"30px","position": "relative","left":"-36px","font-family": "Microsoft YaHei" }}>400-808-3066</li>
              </ul>
            </div>
          </div> 
          <hr style={{"opacity":"0.5"}} />
          <div className="homeBottomBox_two">
            <p>Copyright © 2019 - 2020 yongtoc.com. All Rights Reserved. 浙江永拓信息科技有限公司 版权所有 浙ICP备15025359号</p>
            <p><img src="./fangliangbao/image/police_haozu.png" style={{"margin-right": "10px"}} />浙公网安备 33010502005316号</p>
          </div>
        </div>
      </div>
    )
  }

  public state = {

  }
}

export default AllBottom;
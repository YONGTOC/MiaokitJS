import React, { Component } from 'react'
import topcss from '../style/topNav.css'
import logoURL from '../../src/image/logo.png';


export default class TopNav extends Component {
  constructor(props) {
    super(props)
    this.state = {
    }
  }


  render() {
    return (
      <div className={topcss.topNav} >
        <div className={topcss.topLogo} >
          <img src={logoURL} />
        </div>
        <div className={topcss.topM}>
          <ul>
            <li>首页</li>
            <li>园区</li>
            <li>土地</li>
            <li>厂房</li>
            <li>写字楼</li>
            <li>商业</li>
            <li>其他
            <span className="iconfont" style={{ "fontSize": "10px" }}>&#xe804;</span>
            </li>
          </ul>
        </div>
        <div className={topcss.topRight}>
          <span>登录 </span> | <span> 注册</span>
        </div>
        <div className={topcss.bottomNav}></div>
      </div>
    )
  }
}

import * as React from "react";
import * as ReactDOM from "react-dom";
import "css!./styles/topnav.css"

class TopNav extends React.Component {
    constructor(props) {
        super(props);
    }

    public render() {
        return (
            <div className={"topNav"} >
                <div className={"topLogo"} >
                    <img src={"./park/image/logo.png"} />
                </div>
                <div className={"topM"}>
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
                <div className={"topRight"}>
                    <span>登录 </span> | <span> 注册</span>
                </div>
                <div className={"bottomNav"}></div>
            </div>
        )
    }

    public state = {
    };
}

export default TopNav;

import * as React from "react";
import * as ReactDOM from "react-dom";
import "css!./styles/view.css"

import GlobalAction from "compat";

class TopNav extends React.Component {
    constructor(props) {
        super(props);

        TopNav.getValuefromChild = this.getValuefromChild.bind(this);
    }

    public componentDidMount() {}

    //供其他组件调用
    static getValuefromChild(a){ }
    public getValuefromChild(a) {
        console.log("topnav", a);
    };

    public globalAction: GlobalAction = new GlobalAction();

    //切换地图标识
    public switchMark(a) {
        this.globalAction.switchMark(a);
    }

    public render() {
        return (
            <div className={"topNav"} >
                <div className={"topLogo"} >
                    <img src={"./park/image/logo.png"} />
                </div>
                <div className={"topM"}>
                    <ul>
                        <li onClick={this.switchMark.bind(this, "首页")}>调用3d方法</li>
                        <li onClick={this.switchMark.bind(this, "园区")}>园区</li>
                        <li onClick={this.switchMark.bind(this, "土地")}>土地</li>
                        <li onClick={this.switchMark.bind(this, "厂房")}>厂房</li>
                        <li onClick={this.switchMark.bind(this, "写字楼")}>写字楼</li>
                        <li onClick={this.switchMark.bind(this, "商业")}>商业</li>
                        <li>其他
                            <span className="iconfont" style={{ "fontSize": "10px" }}>&#xe804;</span>
                        </li>
                    </ul>
                </div>
                <div className={"topRight"}>
                    <span style={{ "marginRight": "5px" }}>浙江永拓信息科技</span>
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



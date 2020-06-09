define("allBottom", ["require", "exports", "react"], function (require, exports, React) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    class AllBottom extends React.Component {
        constructor(props) {
            super(props);
            this.state = {};
        }
        componentDidMount() {
        }
        render() {
            return (React.createElement("div", { className: "homeBottom" },
                React.createElement("div", { className: "homeBottomBox" },
                    React.createElement("div", { className: "homeBottomBox_one" },
                        React.createElement("div", { className: "hbLeft" },
                            React.createElement("ul", null,
                                React.createElement("li", null,
                                    React.createElement("img", { src: "./fangliangbao/image/whiteLogo.png" }),
                                    " "),
                                React.createElement("li", null, "\u8054\u7CFB\u6211\u4EEC"),
                                React.createElement("li", null, "\u7F51\u7AD9\u5730\u56FE"),
                                React.createElement("li", null, "\u53CB\u60C5\u94FE\u63A5"))),
                        React.createElement("div", { className: "hbMiddle" },
                            React.createElement("ul", null,
                                React.createElement("li", null,
                                    " ",
                                    React.createElement("img", { src: "./fangliangbao/image/bottomMa.png" }),
                                    " "),
                                React.createElement("li", null, "\u5B98\u65B9\u5FAE\u4FE1\u5C0F\u7A0B\u5E8F"))),
                        React.createElement("div", { className: "hbRight" },
                            React.createElement("ul", null,
                                React.createElement("li", null, "\u5BA2\u670D\u670D\u52A1\uFF1A\uFF08\u5DE5\u4F5C\u65E5 \u65E98:30-\u665A18:00\uFF09"),
                                React.createElement("li", { style: { "font-size": "30px", "position": "relative", "left": "-36px", "font-family": "Microsoft YaHei" } }, "400-808-3066")))),
                    React.createElement("hr", { style: { "opacity": "0.5" } }),
                    React.createElement("div", { className: "homeBottomBox_two" },
                        React.createElement("p", null, "Copyright \u00A9 2019 - 2020 yongtoc.com. All Rights Reserved. \u6D59\u6C5F\u6C38\u62D3\u4FE1\u606F\u79D1\u6280\u6709\u9650\u516C\u53F8 \u7248\u6743\u6240\u6709 \u6D59ICP\u590715025359\u53F7"),
                        React.createElement("p", null,
                            React.createElement("img", { src: "./fangliangbao/image/police_haozu.png", style: { "margin-right": "10px" } }),
                            "\u6D59\u516C\u7F51\u5B89\u5907 33010502005316\u53F7")))));
        }
    }
    exports.default = AllBottom;
});
define("index", ["require", "exports", "react", "react-dom", "router", "allBottom", "css!./style/index.css", "css!./style/view.css"], function (require, exports, React, ReactDOM, router_1, allBottom_1) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    class Index extends React.Component {
        constructor(props) {
            super(props);
            this.state = {
                clientWidth: "",
                searchValue: "请输入园区名/区域名/商圈名",
                districtArray: [
                    { name: "全广州" }, { name: "越秀" }, { name: "海珠" }, { name: "荔湾" }, { name: "天河" }, { name: "白云" }, { name: "黄埔" }, { name: "番禺" }, { name: "南沙" },
                    { name: "南沙" }, { name: "花都" }, { name: "增城" }, { name: "从化" }
                ],
                areaArray: [
                    { name: "0-100m²" }, { name: "100-300m²" }, { name: "300-500m²" }, { name: "500-1000m²" }, { name: "1000m²以上" }
                ],
                priceArray: [
                    { name: "0-0.5万元/月" }, { name: "0.5-1.5万元/月" }, { name: "1.5-3万元/月" }, { name: "3-5万元/月" }, { name: "5-10万元/月" }, { name: "10万元/月以上" }
                ],
                decorationArray: [
                    { name: "毛坯" }, { name: "简装" }, { name: "精装" }, { name: "豪华" }
                ],
                iphoneValue: "输入您的手机号码",
                parkArray: [
                    { name: "桂林信息产业园", address: "七星-朝阳路D-12号", price: "6.5" }, { name: "桂林信息产业园", address: "七星-朝阳路D-12号", price: "6.5" }, { name: "桂林信息产业园", address: "七星-朝阳路D-12号", price: "6.5" },
                    { name: "桂林信息产业园", address: "七星-朝阳路D-12号", price: "6.5" }, { name: "桂林信息产业园", address: "七星-朝阳路D-12号", price: "6.5" }, { name: "桂林信息产业园", address: "七星-朝阳路D-12号", price: "6.5" },
                    { name: "桂林信息产业园", address: "七星-朝阳路D-12号", price: "6.5" }, { name: "桂林信息产业园", address: "七星-朝阳路D-12号", price: "6.5" }
                ]
            };
            Index.g_pIns = this;
        }
        componentDidMount() {
            this.setState({ clientWidth: (document.body.clientWidth - 1210) / 2 });
            window.onresize = () => {
                this.setState({ clientWidth: (document.body.clientWidth - 1210) / 2 });
            };
        }
        render() {
            return (React.createElement("div", { className: "index" },
                React.createElement("div", { style: { width: "100%", height: "440px", background: "url(./fangliangbao/image/index_bg.png) no-repeat center top" } },
                    React.createElement("div", { className: "index-title", style: { left: this.state.clientWidth } },
                        React.createElement("div", { className: "index-t1" },
                            React.createElement("img", { src: "./fangliangbao/image/logo.png", style: { margin: "20px 0 0 0", float: "left" } }),
                            React.createElement("div", { style: { color: "#ffffff", fontSize: "14px", float: "left", margin: "35px 0 0 0" } }, "\u6842\u6797"),
                            React.createElement("img", { src: "./fangliangbao/image/down.png", style: { margin: "39px 0 0 3px" }, width: "16px", height: "16px" })),
                        React.createElement("div", { className: "index-label" },
                            React.createElement("div", null, "\u54C1\u724C\u56ED\u533A"),
                            React.createElement("div", null, "\u51FA\u79DF\u623F\u6E90"),
                            React.createElement("div", null, "\u51FA\u552E\u623F\u6E90"),
                            React.createElement("div", null, "\u5B9D\u54E5\u63A8\u8350"),
                            React.createElement("div", null, "\u70ED\u70B9\u8D44\u8BAF"),
                            React.createElement("div", null,
                                React.createElement("img", { src: "./fangliangbao/image/phone.png", width: "14px", height: "14px", style: { margin: "0 5px 3px 0" } }),
                                React.createElement("span", null, "400-808-3066")),
                            React.createElement("div", null, "\u767B\u5F55/\u6CE8\u518C")))),
                React.createElement("div", { className: "warp" },
                    React.createElement("div", { className: "index-search" },
                        React.createElement("div", { className: "searchCon" },
                            React.createElement("div", { style: { width: "680px", overflow: "hidden", marginLeft: "-16px" } },
                                React.createElement("div", { style: { float: "left", overflow: "hidden" } },
                                    React.createElement("img", { src: "./fangliangbao/image/search.png", width: "16px", height: "16px", style: { position: "relative", bottom: "2px", left: "35px" } }),
                                    React.createElement("input", { className: "index-input", value: this.state.searchValue })),
                                React.createElement("div", { className: "index-search-name" }, "\u641C\u7D22")),
                            React.createElement("div", { className: "seltion-cont" },
                                React.createElement("div", { className: "cont-div" },
                                    React.createElement("div", { className: "index-tag-name" }, "\u533A\u57DF"),
                                    this.state.districtArray.map((item, index) => {
                                        return (React.createElement("div", { key: index, className: "index-tag" }, item.name));
                                    })),
                                React.createElement("div", { className: "cont-div" },
                                    React.createElement("div", { className: "index-tag-name" }, "\u9762\u79EF"),
                                    this.state.areaArray.map((item, index) => {
                                        return (React.createElement("div", { key: index, className: "index-tag" }, item.name));
                                    })),
                                React.createElement("div", { className: "cont-div" },
                                    React.createElement("div", { className: "index-tag-name" }, "\u4EF7\u683C"),
                                    this.state.priceArray.map((item, index) => {
                                        return (React.createElement("div", { key: index, className: "index-tag" }, item.name));
                                    })),
                                React.createElement("div", { className: "cont-div" },
                                    React.createElement("div", { className: "index-tag-name" }, "\u88C5\u4FEE"),
                                    this.state.decorationArray.map((item, index) => {
                                        return (React.createElement("div", { key: index, className: "index-tag" }, item.name));
                                    })))),
                        React.createElement("div", { className: "searchCont" },
                            React.createElement("input", { className: "index-iphone", value: this.state.iphoneValue }),
                            React.createElement("img", { src: "./fangliangbao/image/iphone.png", width: "18px", height: "18px", style: { position: "relative", bottom: "31px", left: "10px" } }),
                            React.createElement("div", { className: "index-require" },
                                React.createElement("div", { className: "you-require" }, "\u60A8\u7684\u9700\u6C42"),
                                React.createElement("div", { className: "you-talk " }, "\u9760\u8FD1\u5730\u94C1\uFF0C\u9760\u8FD1\u5927\u6D77\uFF0C\u6709\u82B1\u56ED\u3002")),
                            React.createElement("div", { className: "find-room" }, "\u5B9D\u54E5\u5E2E\u627E\u623F"))),
                    React.createElement("div", { className: "index-park-title" },
                        React.createElement("div", { className: "index-park-a" }, "\u54C1\u724C\u56ED\u533A"),
                        React.createElement("div", { className: "index-park-b" },
                            "\u5DF2\u6709 ",
                            React.createElement("span", { style: { color: "#17A1E6" } }, "12"),
                            " \u5BB6\u56ED\u533A\u4E0A\u7EBF"),
                        React.createElement("div", { className: "index-park-c", style: { float: "right" } }, "\u66F4\u591A\u5E7F\u5DDE\u56ED\u533A")),
                    React.createElement("div", { style: { overflow: "hidden" } }, this.state.parkArray.map((item, index) => {
                        return (React.createElement("div", { key: index, className: "index-park-child" },
                            React.createElement("div", { className: "index-img-a", style: { margin: (index + 1) % 4 === 0 ? "10px 0 0 0" : "10px 20px 0 0", background: "url(./fangliangbao/image/build.png)" } }),
                            React.createElement("div", { style: { fontSize: "16px", fontWeight: "bold", marginTop: "10px" } }, item.name),
                            React.createElement("div", { style: { overflow: "hidden", paddingTop: "10px" } },
                                React.createElement("img", { src: "./fangliangbao/image/position.png", width: "12px", height: "12px", style: { float: "left", margin: "4px 5px 0 0" } }),
                                " ",
                                React.createElement("div", { className: "index-address" }, item.address),
                                React.createElement("div", { className: "index-price" },
                                    React.createElement("span", { style: { color: "#DC1A3F", fontSize: "24px", marginRight: "5px" } }, item.price),
                                    "\u5143/m\u00B2\u00B7\u5929"))));
                    })),
                    React.createElement("div", { className: "index-park-title" },
                        React.createElement("div", { className: "index-park-a" }, "\u63A8\u8350\u623F\u6E90"),
                        React.createElement("div", { className: "index-park-b" },
                            "\u4ECA\u65E5\u65B0\u4E0A ",
                            React.createElement("span", { style: { color: "#17A1E6" } }, "60"),
                            " \u5957\u623F\u6E90"),
                        React.createElement("div", { className: "index-park-c", style: { float: "right" } }, "\u66F4\u591A\u5E7F\u5DDE\u623F\u6E90")),
                    React.createElement("div", null, [1, 2, 3, 4, 5, 6, 7].map((item, index) => {
                        return (React.createElement("div", { key: index, style: { marginTop: index === 0 ? "18px" : "30px", overflow: "hidden" } },
                            React.createElement("div", { style: { background: "url(./fangliangbao/image/build1.png)", width: "240px", height: "180px", borderRadius: "5px", float: "left" } }),
                            React.createElement("div", { style: { float: "left", marginLeft: "30px", width: "500px" } },
                                React.createElement("div", { className: "index-c-a" }, "\u51FA\u79DF\uFF01\u9AD8\u65B0\u533A\u4FE1\u606F\u4EA7\u4E1A\u56ED\u8C6A\u534E\u88C5\u4FEE\u5355\u5143"),
                                React.createElement("div", { style: { marginTop: "22px", fontSize: "14px", overflow: "hidden" } },
                                    React.createElement("div", { style: { float: "left" } }, "\u6842\u6797\u4FE1\u606F\u4EA7\u4E1A\u56ED"),
                                    React.createElement("div", { style: { color: "#DDDDDD", float: "left", margin: "0 10px 0 10px" } }, " / "),
                                    React.createElement("div", { style: { float: "left" } }, "100.5m\u00B2"),
                                    React.createElement("div", { style: { color: "#DDDDDD", float: "left", margin: "0 10px 0 10px" } }, " / "),
                                    React.createElement("div", { style: { float: "left" } }, " \u8C6A\u534E\u88C5\u4FEE ")),
                                React.createElement("div", { style: { marginTop: "14px", fontSize: "14px", overflow: "hidden" } },
                                    React.createElement("div", { style: { float: "left" } }, "\u4E03\u661F-\u4E1C\u4E8C\u73AF\u8DEF"),
                                    React.createElement("div", { style: { color: "#DDDDDD", float: "left", margin: "0 10px 0 10px" } }, " / "),
                                    React.createElement("div", { style: { float: "left" } }, "\u671D\u9633\u8DEFD-12\u53F7")),
                                React.createElement("div", { style: { marginTop: "14px", fontSize: "14px", color: "#989FA8" } }, "\u67095\u4F4D\u7528\u6237\u6B63\u5728\u6D4F\u89C8\u8BE5\u623F\u6E90"),
                                React.createElement("div", { style: { marginTop: "12px", fontSize: "12px", overflow: "hidden", color: "#849AAE" } },
                                    React.createElement("div", { style: { backgroundColor: "#F3F5F7", width: "77px", height: "24px", borderRadius: "2px", float: "left", textAlign: "center", lineHeight: "24px", marginRight: "10px" } }, "\u5E26\u529E\u516C\u5BB6\u5177"),
                                    React.createElement("div", { style: { backgroundColor: "#F3F5F7", width: "77px", height: "24px", borderRadius: "2px", float: "left", textAlign: "center", lineHeight: "24px", marginRight: "10px" } }, "\u6237\u578B\u65B9\u6B63"),
                                    React.createElement("div", { style: { backgroundColor: "#F3F5F7", width: "77px", height: "24px", borderRadius: "2px", float: "left", textAlign: "center", lineHeight: "24px", marginRight: "10px" } }, "\u53EF\u6CE8\u518C"))),
                            React.createElement("div", { style: { float: "left", color: "#989FA8", fontSize: "14px", padding: "70px 0 0 90px" } },
                                React.createElement("div", null,
                                    React.createElement("span", { style: { color: "rgba(220, 26, 63, 1)", fontSize: "26px", fontWeight: 600 } }, "1.8"),
                                    React.createElement("span", null, "\u4E07\u5143/\u6708")),
                                React.createElement("div", null, "\u5355\u4EF7\uFF1A120\u5143/m\u00B2\u22C5\u6708"))));
                    })),
                    React.createElement("div", { className: "index-more" }, "\u67E5\u770B\u66F4\u591A\u5E7F\u5DDE\u623F\u6E90")),
                React.createElement("div", { style: { position: "relative" } },
                    React.createElement(allBottom_1.default, null))));
        }
    }
    Index.g_pIns = null;
    exports.default = Index;
    viewDraw = function () {
        ReactDOM.render(React.createElement(router_1.default, null), document.getElementById('viewContainer'));
    };
});
define("login", ["require", "exports", "react", "HomeTop"], function (require, exports, React, homeTop_1) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    class Login extends React.Component {
        constructor(props) {
            super(props);
            this.state = {
                boxState: 1,
            };
        }
        componentDidMount() {
        }
        closeLogin() {
            $(document.body).attr('style', 'height: 100%; margin: 0; padding: 0; overflow: visible;');
            homeTop_1.default.hideLogin();
        }
        changeBox(state) {
            this.setState({
                boxState: state
            });
        }
        render() {
            return (React.createElement("div", { className: "fullView" },
                React.createElement("div", { className: "loginBox " },
                    React.createElement("i", { className: "iconfont ", style: { "font-size": "14px" }, onClick: this.closeLogin.bind(this) }, "\uE803"),
                    React.createElement("p", { className: "loginBoxTit" },
                        React.createElement("span", { className: "activeLogin", onClick: this.changeBox.bind(this, 1) }, "\u624B\u673A\u767B\u5F55"),
                        React.createElement("div", { style: { "width": "1px", "height": "16px", "background": "rgba(204,204,204,1)", "display": "inline-block", "margin": " 0 20px", "opacity": "0.8" } }),
                        React.createElement("span", { onClick: this.changeBox.bind(this, 2) }, "\u5FAE\u4FE1\u767B\u5F55")),
                    this.state.boxState == 1 ?
                        React.createElement("div", { className: "phoneLogin" },
                            React.createElement("p", null,
                                React.createElement("input", { type: "text", value: "\u624B\u673A\u53F7" })),
                            React.createElement("p", null,
                                React.createElement("input", { type: "text", value: "\u77ED\u4FE1\u9A8C\u8BC1\u7801" }),
                                React.createElement("span", null, "\u53D1\u9001\u9A8C\u8BC1\u7801")),
                            React.createElement("p", null, "\u767B  \u5F55"))
                        :
                            React.createElement("div", { className: "codeLogin" },
                                React.createElement("img", { src: "./fangliangbao/image/demo.png" }),
                                React.createElement("p", null, "\u8BF7\u4F7F\u7528\u5FAE\u4FE1\u626B\u63CF\u4E8C\u7EF4\u7801\u767B\u5F55")))));
        }
    }
    exports.default = Login;
});
define("HomeTop", ["require", "exports", "react", "login", "css!./style/iconfont.css"], function (require, exports, React, login_1) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    class HomeTop extends React.Component {
        constructor(props) {
            super(props);
            this.state = {
                htIndex: 10,
                loginState: false,
            };
            HomeTop.changHomeTop = this.changHomeTop.bind(this);
            HomeTop.hideLogin = this.hideLogin.bind(this);
        }
        componentDidMount() {
        }
        static changHomeTop(index) { }
        changHomeTop(index) {
            console.log(index);
            this.setState({
                htIndex: index
            });
        }
        showLogin() {
            this.setState({
                loginState: true
            });
        }
        static hideLogin() { }
        ;
        hideLogin() {
            this.setState({
                loginState: false
            });
        }
        render() {
            return (React.createElement("div", { className: "homeTop" },
                React.createElement("div", { className: "homeTopBox" },
                    React.createElement("div", { className: "htLeft" },
                        React.createElement("ul", null,
                            React.createElement("li", { style: { "margin": "0 40px 0 0" } },
                                React.createElement("i", { className: "iconfont ", style: { "margin-right": "5px", "font-size": "14px" } }, "\uE83C"),
                                React.createElement("span", null, "\u5E7F\u5DDE")),
                            React.createElement("li", { className: this.state.htIndex == 1 ? "homtop_active" : null, onClick: this.changHomeTop.bind(this, 1) }, "\u9996\u9875"),
                            React.createElement("li", { className: this.state.htIndex == 2 ? "homtop_active" : null, onClick: this.changHomeTop.bind(this, 2) }, "\u56ED\u533A"),
                            React.createElement("li", { className: this.state.htIndex == 3 ? "homtop_active" : null, onClick: this.changHomeTop.bind(this, 3) }, "\u51FA\u79DF"),
                            React.createElement("li", { className: this.state.htIndex == 4 ? "homtop_active" : null, onClick: this.changHomeTop.bind(this, 4) }, "\u5B9D\u54E5\u63A8\u8350"),
                            React.createElement("li", { className: this.state.htIndex == 5 ? "homtop_active" : null, onClick: this.changHomeTop.bind(this, 5) }, "\u70ED\u70B9\u8D44\u8BAF"))),
                    React.createElement("div", { className: "htRight" },
                        React.createElement("ul", null,
                            React.createElement("li", null,
                                React.createElement("i", { className: "iconfont " }, "\uE838"),
                                "  400-808-3066"),
                            React.createElement("li", null,
                                " ",
                                React.createElement("span", { onClick: this.showLogin.bind(this) }, "\u767B\u5F55"),
                                " / \u6CE8\u518C")))),
                this.state.loginState == true ?
                    React.createElement(login_1.default, null)
                    : null));
        }
    }
    exports.default = HomeTop;
});
define("InfoTitle", ["require", "exports", "react"], function (require, exports, React) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    class InfoTitle extends React.Component {
        constructor(props) {
            super(props);
            this.state = {};
        }
        componentDidMount() {
        }
        render() {
            return (React.createElement("div", { className: "ParkInfoOne" },
                React.createElement("div", { className: "ParkInfoOne_title" },
                    React.createElement("img", { src: "./fangliangbao/image/blueLogo.png" }),
                    React.createElement("ul", null,
                        React.createElement("li", { style: { "color": " rgb(23, 161, 230)", "font-weight": "bold" } }, "\u54C1\u724C\u56ED\u533A"),
                        React.createElement("li", null, "\u51FA\u79DF\u623F\u6E90"),
                        React.createElement("li", null, "\u51FA\u552E\u623F\u6E90")))));
        }
    }
    exports.default = InfoTitle;
});
define("SendSuccess", ["require", "exports", "react", "parkInfo"], function (require, exports, React, ParkInfo_1) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    class SendSuccess extends React.Component {
        constructor(props) {
            super(props);
            this.state = {};
        }
        componentDidMount() {
        }
        closeFull() {
            $(document.body).attr('style', 'height: 100%; margin: 0; padding: 0; overflow: visible;');
            ParkInfo_1.default.closeSendNeed();
        }
        render() {
            return (React.createElement("div", { className: "fullView" },
                React.createElement("div", { className: "successBox" },
                    React.createElement("img", { src: "./fangliangbao/image/sendSuccess.png" }),
                    React.createElement("p", null, "\u63D0\u4EA4\u6210\u529F"),
                    React.createElement("p", null, "\u5B9D\u54E5\u5C06\u4F1A\u5728\u4E00\u4E2A\u5DE5\u4F5C\u65E5\u5185\u4E0E\u60A8\u7535\u8BDD\u8054\u7CFB\uFF0C\u8BF7\u60A8\u7535\u8BDD\u7545\u901A\uFF0C\u8C22\u8C22\uFF01"),
                    React.createElement("p", { className: "", onClick: this.closeFull.bind(this) }, " \u597D\u7684 "))));
        }
    }
    exports.default = SendSuccess;
});
define("parkInfo", ["require", "exports", "react", "HomeTop", "allBottom", "InfoTitle", "SendSuccess"], function (require, exports, React, HomeTop_1, AllBottom_1, InfoTitle_1, SendSuccess_1) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    class ParkInfo extends React.Component {
        constructor(props) {
            super(props);
            this.state = {};
            this.handleScroll = this.handleScroll.bind(this);
            ParkInfo.closeSendNeed = this.closeSendNeed.bind(this);
        }
        componentDidMount() {
            HomeTop_1.default.changHomeTop(2);
            window.addEventListener('scroll', this.handleScroll);
        }
        _handleScroll(scrollTop) {
            console.log(scrollTop);
        }
        handleScroll(event) {
            let scrollTop = event.srcElement.body.scrollTop;
            this._handleScroll(scrollTop);
        }
        static closeSendNeed() { }
        ;
        closeSendNeed() {
            ParkInfoThreeRight.closeSendNeed();
        }
        render() {
            return (React.createElement("div", { className: "infoPage" },
                React.createElement(HomeTop_1.default, null),
                React.createElement("div", { className: "parkInfo" },
                    React.createElement("div", { className: "parkInfoBox_title" },
                        React.createElement(InfoTitle_1.default, { index: 0 }),
                        React.createElement(ParkInfoOne, null)),
                    React.createElement("div", { className: "parkInfoBox_list" },
                        React.createElement(ParkInfoTwo, null)),
                    React.createElement("div", { className: "parkInfoBox_text" },
                        React.createElement(ParkInfoThree, null)),
                    React.createElement("div", { className: "nearParkListBox" },
                        React.createElement(NearParkList, null))),
                React.createElement("div", { className: "parkInfo_bottom" },
                    React.createElement(AllBottom_1.default, null))));
        }
    }
    class ParkInfoOne extends React.Component {
        constructor(props) {
            super(props);
            this.state = {
                collectState: true,
                shareState: false,
            };
        }
        componentDidMount() {
        }
        collect() {
        }
        render() {
            return (React.createElement("div", { className: "ParkInfoOne" },
                React.createElement("div", { className: "ParkInfoOne_html" },
                    React.createElement("p", null,
                        React.createElement("span", null, "\u5E7F\u5DDE \u54C1\u724C\u56ED\u533A"),
                        React.createElement("i", { className: "jiange" }, " > "),
                        React.createElement("span", null, "\u8D8A\u79C0"),
                        React.createElement("i", { className: "jiange" }, " > "),
                        React.createElement("span", null, "\u5317\u4EAC\u8DEF"))),
                React.createElement("div", { className: "ParkInfoOne_info" },
                    React.createElement("p", null, "\u4FE1\u606F\u4EA7\u4E1A\u56ED"),
                    React.createElement("ul", null,
                        React.createElement("li", { className: this.state.collectState == true ? "ParkInfoOne_info_li_On" : "ParkInfoOne_info_li" },
                            React.createElement("i", { className: "iconfont ", onClick: this.collect.bind(this) }, "\uE839"),
                            this.state.collectState == true ? "已收藏" : "收藏"),
                        React.createElement("li", { className: this.state.shareState == true ? "ParkInfoOne_info_li_On" : "ParkInfoOne_info_li" },
                            React.createElement("i", { className: "iconfont " }, "\uE836"),
                            "\u5206\u4EAB")))));
        }
    }
    class ParkInfoTwo extends React.Component {
        constructor(props) {
            super(props);
            this.state = {
                index: 0,
                ParkInfoTwoState: "ParkInfoTwoAll",
                ParkInfoTwoListState: "ParkInfoTwoList",
                listTrun: "ParkInfoTwoListTrun",
                listTrun_text: "收起列表"
            };
        }
        componentDidMount() {
        }
        changeTitle(index) {
            if (index == 2) {
                this.setState({
                    index: index
                });
                ParkInfoThree.hideRoomInfo();
            }
            else {
                this.setState({
                    index: index
                });
            }
        }
        overTitle() {
            if (this.state.ParkInfoTwoState == "ParkInfoTwoAll") {
                this.setState({
                    ParkInfoTwoState: "ParkInfoTwoOver",
                    ParkInfoTwoListState: "hide",
                    listTrun: "ParkInfoTwoListTrunUp",
                    listTrun_text: "展开列表",
                });
            }
            else {
                this.setState({
                    ParkInfoTwoState: "ParkInfoTwoAll",
                    ParkInfoTwoListState: "ParkInfoTwoList",
                    listTrun: "ParkInfoTwoListTrun",
                    listTrun_text: "收起列表"
                });
            }
        }
        render() {
            return (React.createElement("div", { className: this.state.ParkInfoTwoState },
                React.createElement("div", { className: "ParkInfoTwoTitle" },
                    React.createElement("ul", null,
                        React.createElement("li", { className: this.state.index == 0 ? "ParkInfoTwoTitleActive" : null, onClick: this.changeTitle.bind(this, 0) }, "\u51FA\u79DF\u623F\u6E90"),
                        React.createElement("li", { className: this.state.index == 1 ? "ParkInfoTwoTitleActive" : null, onClick: this.changeTitle.bind(this, 1) }, "\u51FA\u552E\u623F\u6E90"),
                        React.createElement("li", { className: this.state.index == 2 ? "ParkInfoTwoTitleActive" : null, onClick: this.changeTitle.bind(this, 2) }, "\u5165\u9A7B\u4F01\u4E1A"))),
                React.createElement("div", { className: this.state.ParkInfoTwoListState },
                    this.state.index == 0 ?
                        React.createElement(LeaseList, null)
                        : null,
                    this.state.index == 1 ?
                        React.createElement(SellList, null)
                        : null,
                    this.state.index == 2 ?
                        React.createElement(CompanyList, null)
                        : null),
                React.createElement("div", { className: this.state.listTrun, onClick: this.overTitle.bind(this) },
                    React.createElement("i", { className: "iconfont " }, "\uE83B"),
                    this.state.listTrun_text)));
        }
    }
    class LeaseList extends React.Component {
        constructor(props) {
            super(props);
            this.state = {
                typeIndex: 0,
                leaseRoomsState: -1,
            };
        }
        componentDidMount() {
        }
        onLeaseRoom(index) {
            ParkInfoThree.showRoomInfo();
            this.setState({
                leaseRoomsState: index
            });
        }
        leasetypeIndex(index) {
            this.setState({
                typeIndex: index,
            });
        }
        render() {
            return (React.createElement("div", { className: "leaseListBox" },
                React.createElement("div", { className: "leasetype" },
                    React.createElement("ul", null,
                        React.createElement("li", { onClick: this.leasetypeIndex.bind(this, 0) },
                            React.createElement("div", { className: this.state.typeIndex == 0 ? "leasetype_li_on" : "leasetype_li" },
                                React.createElement("p", { style: { "padding-top": "6px" } }, "\u5168\u90E8\u6237\u578B"),
                                React.createElement("p", null,
                                    React.createElement("span", null, "XX"),
                                    "\u5957"))),
                        React.createElement("li", { onClick: this.leasetypeIndex.bind(this, 1) },
                            React.createElement("div", { className: this.state.typeIndex == 1 ? "leasetype_li_on" : "leasetype_li" },
                                React.createElement("p", { style: { "padding-top": "6px" } }, "100m\u00B2\u4EE5\u4E0B"),
                                React.createElement("p", null,
                                    React.createElement("span", null, "XX"),
                                    "\u5957"))),
                        React.createElement("li", { onClick: this.leasetypeIndex.bind(this, 2) },
                            React.createElement("div", { className: this.state.typeIndex == 2 ? "leasetype_li_on" : "leasetype_li" },
                                React.createElement("p", { style: { "padding-top": "6px" } }, "100-200m\u00B2"),
                                React.createElement("p", null,
                                    React.createElement("span", null, "XX"),
                                    "\u5957"))),
                        React.createElement("li", { onClick: this.leasetypeIndex.bind(this, 3) },
                            React.createElement("div", { className: this.state.typeIndex == 3 ? "leasetype_li_on" : "leasetype_li" },
                                React.createElement("p", { style: { "padding-top": "6px" } }, "300-500m\u00B2"),
                                React.createElement("p", null,
                                    React.createElement("span", null, "XX"),
                                    "\u5957"))))),
                React.createElement("div", { className: "leaseRoomList" },
                    React.createElement("ul", null,
                        React.createElement("li", { onClick: this.onLeaseRoom.bind(this, 0) },
                            React.createElement("div", { className: this.state.leaseRoomsState == 0 ? "leaseRooms_on" : "leaseRooms" },
                                React.createElement("img", { src: "./fangliangbao/image/demo.png" }),
                                React.createElement("div", { className: "leaseRoomsRight" },
                                    React.createElement("p", { className: "leaseName" },
                                        React.createElement("span", null, "187"),
                                        "m\u00B2"),
                                    React.createElement("p", null,
                                        React.createElement("span", { className: "leasePrice" }, "80.3"),
                                        " \u5143/m\u00B2\u22C5\u6708"),
                                    React.createElement("p", { className: "leaseArea" }, "\u7B80\u88C5")))),
                        React.createElement("li", { onClick: this.onLeaseRoom.bind(this, 1) },
                            React.createElement("div", { className: this.state.leaseRoomsState == 1 ? "leaseRooms_on" : "leaseRooms" },
                                React.createElement("img", { src: "./fangliangbao/image/demo.png" }),
                                React.createElement("div", { className: "leaseRoomsRight" },
                                    React.createElement("p", { className: "leaseName" },
                                        React.createElement("span", null, "187"),
                                        "m\u00B2"),
                                    React.createElement("p", null,
                                        React.createElement("span", { className: "leasePrice" }, "80.3"),
                                        " \u5143/m\u00B2\u22C5\u6708"),
                                    React.createElement("p", { className: "leaseArea" }, "\u7B80\u88C5")))),
                        React.createElement("li", { onClick: this.onLeaseRoom.bind(this, 2) },
                            React.createElement("div", { className: this.state.leaseRoomsState == 2 ? "leaseRooms_on" : "leaseRooms" },
                                React.createElement("img", { src: "./fangliangbao/image/demo.png" }),
                                React.createElement("div", { className: "leaseRoomsRight" },
                                    React.createElement("p", { className: "leaseName" },
                                        React.createElement("span", null, "187"),
                                        "m\u00B2"),
                                    React.createElement("p", null,
                                        React.createElement("span", { className: "leasePrice" }, "80.3"),
                                        " \u5143/m\u00B2\u22C5\u6708"),
                                    React.createElement("p", { className: "leaseArea" }, "\u7B80\u88C5"))))),
                    React.createElement("p", { className: "listOver" }, "\u5230\u5E95\u5566~"))));
        }
    }
    class SellList extends React.Component {
        constructor(props) {
            super(props);
            this.state = {
                typeIndex: 0,
                sellRoomsState: -1,
            };
        }
        componentDidMount() {
        }
        onSellRoom(index) {
            ParkInfoThree.showRoomInfo();
            this.setState({
                sellRoomsState: index
            });
        }
        selltypeIndex(index) {
            this.setState({
                typeIndex: index,
            });
        }
        render() {
            return (React.createElement("div", { className: "leaseListBox" },
                React.createElement("div", { className: "leasetype" },
                    React.createElement("ul", null,
                        React.createElement("li", { onClick: this.selltypeIndex.bind(this, 0) },
                            React.createElement("div", { className: this.state.typeIndex == 0 ? "leasetype_li_on" : "leasetype_li" },
                                React.createElement("p", { style: { "padding-top": "6px" } }, "\u5168\u90E8\u6237\u578B"),
                                React.createElement("p", null,
                                    React.createElement("span", null, "XX"),
                                    "\u5957"))),
                        React.createElement("li", { onClick: this.selltypeIndex.bind(this, 1) },
                            React.createElement("div", { className: this.state.typeIndex == 1 ? "leasetype_li_on" : "leasetype_li" },
                                React.createElement("p", { style: { "padding-top": "6px" } }, "100m\u00B2\u4EE5\u4E0B"),
                                React.createElement("p", null,
                                    React.createElement("span", null, "XX"),
                                    "\u5957"))),
                        React.createElement("li", { onClick: this.selltypeIndex.bind(this, 2) },
                            React.createElement("div", { className: this.state.typeIndex == 2 ? "leasetype_li_on" : "leasetype_li" },
                                React.createElement("p", { style: { "padding-top": "6px" } }, "100-200m\u00B2"),
                                React.createElement("p", null,
                                    React.createElement("span", null, "XX"),
                                    "\u5957"))),
                        React.createElement("li", { onClick: this.selltypeIndex.bind(this, 3) },
                            React.createElement("div", { className: this.state.typeIndex == 3 ? "leasetype_li_on" : "leasetype_li" },
                                React.createElement("p", { style: { "padding-top": "6px" } }, "300-500m\u00B2"),
                                React.createElement("p", null,
                                    React.createElement("span", null, "XX"),
                                    "\u5957"))))),
                React.createElement("div", { className: "leaseRoomList" },
                    React.createElement("ul", null,
                        React.createElement("li", { onClick: this.onSellRoom.bind(this, 0) },
                            React.createElement("div", { className: this.state.sellRoomsState == 0 ? "leaseRooms_on" : "leaseRooms" },
                                React.createElement("img", { src: "./fangliangbao/image/demo.png" }),
                                React.createElement("div", { className: "leaseRoomsRight" },
                                    React.createElement("p", { className: "leaseName" },
                                        React.createElement("span", null, "187"),
                                        "m\u00B2"),
                                    React.createElement("p", null,
                                        React.createElement("span", { className: "leasePrice" }, "80.3"),
                                        " \u5143/m\u00B2\u22C5\u6708"),
                                    React.createElement("p", { className: "leaseArea" }, "\u7B80\u88C5")))),
                        React.createElement("li", { onClick: this.onSellRoom.bind(this, 1) },
                            React.createElement("div", { className: this.state.sellRoomsState == 1 ? "leaseRooms_on" : "leaseRooms" },
                                React.createElement("img", { src: "./fangliangbao/image/demo.png" }),
                                React.createElement("div", { className: "leaseRoomsRight" },
                                    React.createElement("p", { className: "leaseName" },
                                        React.createElement("span", null, "187"),
                                        "m\u00B2"),
                                    React.createElement("p", null,
                                        React.createElement("span", { className: "leasePrice" }, "80.3"),
                                        " \u5143/m\u00B2\u22C5\u6708"),
                                    React.createElement("p", { className: "leaseArea" }, "\u7B80\u88C5")))),
                        React.createElement("li", { onClick: this.onSellRoom.bind(this, 2) },
                            React.createElement("div", { className: this.state.sellRoomsState == 2 ? "leaseRooms_on" : "leaseRooms" },
                                React.createElement("img", { src: "./fangliangbao/image/demo.png" }),
                                React.createElement("div", { className: "leaseRoomsRight" },
                                    React.createElement("p", { className: "leaseName" },
                                        React.createElement("span", null, "187"),
                                        "m\u00B2"),
                                    React.createElement("p", null,
                                        React.createElement("span", { className: "leasePrice" }, "80.3"),
                                        " \u5143/m\u00B2\u22C5\u6708"),
                                    React.createElement("p", { className: "leaseArea" }, "\u7B80\u88C5"))))),
                    React.createElement("p", { className: "listOver" }, "\u5230\u5E95\u5566~"))));
        }
    }
    class CompanyList extends React.Component {
        constructor(props) {
            super(props);
            this.state = {
                typeIndex: 0,
                companyState: -1,
            };
        }
        componentDidMount() {
        }
        onCompany(index) {
            ParkInfoThree.showCompanyInfo();
            this.setState({
                companyState: index
            });
        }
        companytypeIndex(index) {
            this.setState({
                typeIndex: index,
            });
        }
        render() {
            return (React.createElement("div", { className: "leaseListBox" },
                React.createElement("div", { className: "leasetype" },
                    React.createElement("ul", null,
                        React.createElement("li", { onClick: this.companytypeIndex.bind(this, 0), className: this.state.typeIndex == 0 ? "companytype_li_on" : "companytype_li" }, "\u5168\u90E8"),
                        React.createElement("li", { onClick: this.companytypeIndex.bind(this, 1), className: this.state.typeIndex == 1 ? "companytype_li_on" : "companytype_li" }, "\u9AD8\u65B0\u6280\u672F"),
                        React.createElement("li", { onClick: this.companytypeIndex.bind(this, 2), className: this.state.typeIndex == 2 ? "companytype_li_on" : "companytype_li" }, "\u79D1\u6280\u670D\u52A1"),
                        React.createElement("li", { onClick: this.companytypeIndex.bind(this, 3), className: this.state.typeIndex == 3 ? "companytype_li_on" : "companytype_li" }, "\u91D1\u878D\u4FDD\u9669"))),
                React.createElement("div", { className: "leaseRoomList" },
                    React.createElement("ul", null,
                        React.createElement("li", null,
                            React.createElement("div", { className: this.state.companyState == 0 ? "leaseRooms_on" : "leaseRooms" },
                                React.createElement("img", { src: "./fangliangbao/image/demo.png" }),
                                React.createElement("div", { className: "leaseRoomsRight" },
                                    React.createElement("p", { className: "leaseName" }, "\u6D59\u6C5F\u6C38\u62D3\u4FE1\u606F\u79D1\u6280\u6709\u9650\u516C\u4F0F\u89C1\u53F8\u64AD\u653E\u7ED3\u675F\u7684"),
                                    React.createElement("p", { className: "leaseArea", style: { "margin": "3px 0" } },
                                        React.createElement("i", { className: "iconfont " }, "\uE83A"),
                                        "E\u5EA7B\u533A-3F-301"),
                                    React.createElement("p", { className: "leaseArea" },
                                        React.createElement("i", { className: "iconfont " }, "\uE83F"),
                                        "\u79D1\u6280\u670D\u52A1")))),
                        React.createElement("li", null,
                            React.createElement("div", { className: this.state.companyState == 1 ? "leaseRooms_on" : "leaseRooms" },
                                React.createElement("img", { src: "./fangliangbao/image/demo.png" }),
                                React.createElement("div", { className: "leaseRoomsRight" },
                                    React.createElement("p", { className: "leaseName" }, "\u6D59\u6C5F\u6C38\u62D3\u4FE1\u606F\u79D1\u6280\u6709\u9650\u516C\u4F0F\u89C1\u53F8\u64AD\u653E\u7ED3\u675F\u7684"),
                                    React.createElement("p", { className: "leaseArea", style: { "margin": "3px 0" } },
                                        React.createElement("i", { className: "iconfont " }, "\uE83A"),
                                        "E\u5EA7B\u533A-3F-301"),
                                    React.createElement("p", { className: "leaseArea" },
                                        React.createElement("i", { className: "iconfont " }, "\uE83F"),
                                        "\u79D1\u6280\u670D\u52A1")))),
                        React.createElement("li", null,
                            React.createElement("div", { className: this.state.companyState == 2 ? "leaseRooms_on" : "leaseRooms" },
                                React.createElement("img", { src: "./fangliangbao/image/demo.png" }),
                                React.createElement("div", { className: "leaseRoomsRight" },
                                    React.createElement("p", { className: "leaseName" }, "\u6D59\u6C5F\u6C38\u62D3\u4FE1\u606F\u79D1\u6280\u6709\u9650\u516C\u4F0F\u89C1\u53F8\u64AD\u653E\u7ED3\u675F\u7684"),
                                    React.createElement("p", { className: "leaseArea", style: { "margin": "3px 0" } },
                                        React.createElement("i", { className: "iconfont " }, "\uE83A"),
                                        "E\u5EA7B\u533A-3F-301"),
                                    React.createElement("p", { className: "leaseArea" },
                                        React.createElement("i", { className: "iconfont " }, "\uE83F"),
                                        "\u79D1\u6280\u670D\u52A1"))))),
                    React.createElement("p", { className: "listOver" }, "\u5230\u5E95\u5566~"))));
        }
    }
    class ParkInfoThree extends React.Component {
        constructor(props) {
            super(props);
            this.state = {
                RoomInfoState: "hide",
            };
            ParkInfoThree.showRoomInfo = this.showRoomInfo.bind(this);
            ParkInfoThree.showCompanyInfo = this.showCompanyInfo.bind(this);
            ParkInfoThree.hideRoomInfo = this.hideRoomInfo.bind(this);
        }
        componentDidMount() {
        }
        static showRoomInfo() { }
        ;
        showRoomInfo() {
            this.setState({
                RoomInfoState: "RoomInfoShow",
            });
        }
        static hideRoomInfo() { }
        ;
        hideRoomInfo() {
            this.setState({
                RoomInfoState: "hide",
            });
        }
        static showCompanyInfo() { }
        ;
        showCompanyInfo() {
            this.setState({
                RoomInfoState: "CompanyInfoShow",
            });
        }
        render() {
            return (React.createElement("div", { className: "ParkInfoThree" },
                React.createElement("div", { className: "ParkInfoThree_leftBox" },
                    this.state.RoomInfoState == "RoomInfoShow" ?
                        React.createElement(RoomInfoThreeLeft, null)
                        :
                            null,
                    this.state.RoomInfoState == "CompanyInfoShow" ?
                        React.createElement(CompanyInfoThreeLeft, null)
                        :
                            null,
                    React.createElement(ParkInfoThreeLeft, null)),
                React.createElement("div", { className: "ParkInfoThree_rightBox" },
                    React.createElement(ParkInfoThreeRight, null))));
        }
    }
    class ParkInfoThreeLeft extends React.Component {
        constructor(props) {
            super(props);
            this.state = {
                ParkInfoIndex: 0,
                parkInfoThreeLeft: "RoomInfoThreeLeft_part",
                fullViewState: false,
                imgIndex: 0,
                imgMax: 3,
                imgNum: 1,
                imgUrl: "",
                imgUrlList: [
                    { url: "./fangliangbao/image/build.png" },
                    { url: "./fangliangbao/image/build1.png" },
                    { url: "./fangliangbao/image/demo.png" },
                ],
            };
        }
        componentDidMount() {
            this.setState({
                imgUrl: this.state.imgUrlList[0].url,
            });
        }
        ParkInfoOn(index) {
            if (index == 4) {
                this.setState({
                    ParkInfoThreeLeft: "RoomInfoThreeLeft_all",
                    ParkInfoIndex: index,
                    imgUrl: this.state.imgUrlList[0].url,
                    imgIndex: 0,
                    imgNum: 1,
                });
            }
            else {
                this.setState({
                    RoomInfoThreeLeft: "RoomInfoThreeLeft_part",
                    ParkInfoIndex: index,
                });
            }
        }
        upImg() {
            if (this.state.imgIndex > 0) {
                let imgIndexN = this.state.imgIndex;
                imgIndexN = imgIndexN - 1;
                let imgNumN = this.state.imgIndex + 1;
                imgNumN = imgNumN - 1;
                this.setState({
                    imgIndex: imgIndexN,
                    imgUrl: this.state.imgUrlList[this.state.imgIndex - 1].url,
                    imgNum: imgNumN
                }, () => {
                    console.log(this.state);
                });
            }
        }
        nextImg() {
            if (this.state.imgNum !== this.state.imgMax) {
                let imgIndexN = this.state.imgIndex;
                imgIndexN = imgIndexN + 1;
                let imgNumN = this.state.imgIndex + 1;
                imgNumN = imgNumN + 1;
                this.setState({
                    imgIndex: imgIndexN,
                    imgUrl: this.state.imgUrlList[this.state.imgIndex + 1].url,
                    imgNum: imgNumN
                }, () => {
                    console.log(this.state);
                });
            }
        }
        fullView() {
            this.setState({
                fullViewState: true
            });
            $(document.body).attr('style', 'height: 100%; margin: 0; padding: 0; overflow: hidden;');
        }
        closeFull() {
            this.setState({
                fullViewState: false
            });
            $(document.body).attr('style', 'height: 100%; margin: 0; padding: 0; overflow: visible;');
        }
        upImgFull() {
            this.upImg();
        }
        nextImgFull() {
            this.nextImg();
        }
        imgOn(index) {
            this.setState({
                imgIndex: index,
                imgUrl: this.state.imgUrlList[index].url,
                imgNum: index + 1
            });
        }
        render() {
            return (React.createElement("div", { className: "ParkInfoThree_left" },
                React.createElement("div", { className: "ParkInfoThree_left_title" },
                    React.createElement("ul", null,
                        React.createElement("li", { className: this.state.ParkInfoIndex == 0 ? "ParkInfoIndex_in" : null, onClick: this.ParkInfoOn.bind(this, 0) }, "\u56ED\u533A\u4ECB\u7ECD"),
                        React.createElement("li", { className: this.state.ParkInfoIndex == 1 ? "ParkInfoIndex_in" : null, onClick: this.ParkInfoOn.bind(this, 1) }, "\u533A\u4F4D\u4F18\u52BF"),
                        React.createElement("li", { className: this.state.ParkInfoIndex == 2 ? "ParkInfoIndex_in" : null, onClick: this.ParkInfoOn.bind(this, 2) }, "\u4F18\u60E0\u653F\u7B56"),
                        React.createElement("li", { className: this.state.ParkInfoIndex == 3 ? "ParkInfoIndex_in" : null, onClick: this.ParkInfoOn.bind(this, 3) }, "\u56ED\u533A\u98CE\u91C7"))),
                React.createElement("div", { className: "ParkInfoThree_left_text" },
                    this.state.ParkInfoIndex == 0 ?
                        React.createElement("div", { className: "ParkInfo_text parkIntroduced", id: "parkIntroduced" },
                            React.createElement("p", null, "\u5730\u5904\u5E7F\u5DDE\u3001\u987A\u5FB7\u3001\u4E2D\u5C71\u3001\u4E1C\u839E\u3001\u73E0\u6D77\u3001\u6DF1\u5733\u7B49\u5730\u4E4B\u67A2\u7EBD\uFF0C\u5360\u8E1E\u756A\u79BA\u7684\u6838\u5FC3\u4F4D\u7F6E\u3002\u524D\u8EAB\u662F\u6C38\u9686\u5236\u8863\u5382\uFF0C2010\u5E74\u7ECF\u6539\u9020\uFF0C\u6210\u4E3A\u4E86\u9752\u74E6\u767D\u5899\uFF0C\u8BD7\u60C5\u753B\u610F\u7684\u521B\u610F\u56ED\u533A\u3002 \u4EA7\u4E1A\u56ED\u53D6\u540D\u82B1\u57CE\uFF0C\u96C6\u5408\u4E86\u7EFF\u8272\u82B1\u57CE\u3001\u5386\u53F2\u82B1"),
                            React.createElement("p", null, "\u5730\u5904\u5E7F\u5DDE\u3001\u987A\u5FB7\u3001\u4E2D\u5C71\u3001\u4E1C\u839E\u3001\u73E0\u6D77\u3001\u6DF1\u5733\u7B49\u5730\u4E4B\u67A2\u7EBD\uFF0C\u5360\u8E1E\u756A\u79BA\u7684\u6838\u5FC3\u4F4D\u7F6E\u3002\u524D\u8EAB\u662F\u6C38\u9686\u5236\u8863\u5382\uFF0C2010\u5E74\u7ECF\u6539\u9020\uFF0C\u6210\u4E3A\u4E86\u9752\u74E6\u767D\u5899\uFF0C\u8BD7\u60C5\u753B\u610F\u7684\u521B\u610F\u56ED\u533A\u3002 \u4EA7\u4E1A\u56ED\u53D6\u540D\u82B1\u57CE\uFF0C\u96C6\u5408\u4E86\u7EFF\u8272\u82B1\u57CE\u3001\u5386\u53F2\u82B1\uFF0C\u5730\u5904\u5E7F\u5DDE\u3001\u987A\u5FB7\u3001\u4E2D\u5C71\u3001\u4E1C\u839E\u3001\u73E0\u6D77\u3001\u6DF1\u5733\u7B49\u5730\u4E4B\u67A2\u7EBD\uFF0C\u5360\u8E1E\u756A\u79BA\u7684\u6838\u5FC3\u4F4D\u7F6E\u3002\u524D\u8EAB\u662F\u6C38\u9686\u5236\u8863\u5382\uFF0C2010\u5E74\u7ECF\u6539\u9020\uFF0C\u6210\u4E3A\u4E86\u9752\u74E6\u767D\u5899\uFF0C\u8BD7\u60C5\u753B\u610F\u7684\u521B\u610F\u56ED\u533A\u3002 \u4EA7\u4E1A\u56ED\u53D6\u540D\u82B1\u57CE\uFF0C\u96C6\u5408\u4E86\u7EFF\u8272\u82B1\u57CE\u3001\u5386\u53F2\u82B1"),
                            React.createElement("p", null, "\u5730\u5904\u5E7F\u5DDE\u3001\u987A\u5FB7\u3001\u4E2D\u5C71\u3001\u4E1C\u839E\u3001\u73E0\u6D77\u3001\u6DF1\u5733\u7B49\u5730\u4E4B\u67A2\u7EBD\uFF0C\u5360\u8E1E\u756A\u79BA\u7684\u6838\u5FC3\u4F4D\u7F6E\u3002\u524D\u8EAB\u662F\u6C38\u9686\u5236\u8863\u5382\uFF0C2010\u5E74\u7ECF\u6539\u9020\uFF0C\u6210\u4E3A\u4E86\u9752\u74E6\u767D\u5899\uFF0C\u8BD7\u60C5\u753B\u610F\u7684\u521B\u610F\u56ED\u533A\u3002 \u4EA7\u4E1A\u56ED\u53D6\u540D\u82B1\u57CE\uFF0C\u96C6\u5408\u4E86\u7EFF\u8272\u82B1\u57CE\u3001\u5386\u53F2\u82B1"))
                        : null,
                    this.state.ParkInfoIndex == 1 ?
                        React.createElement("div", { className: "ParkInfo_text advantage", id: "advantage" },
                            React.createElement("p", null, "\u5730\u5904\u5E7F\u5DDE\u3001\u987A\u5FB7\u3001\u4E2D\u5C71\u3001\u4E1C\u839E\u3001\u73E0\u6D77\u3001\u6DF1\u5733\u7B49\u5730\u4E4B\u67A2\u7EBD\uFF0C\u5360\u8E1E\u756A\u79BA\u7684\u6838\u5FC3\u4F4D\u7F6E\u3002\u524D\u8EAB\u662F\u6C38\u9686\u5236\u8863\u5382\uFF0C2010\u5E74\u7ECF\u6539\u9020\uFF0C\u6210\u4E3A\u4E86\u9752\u74E6\u767D\u5899\uFF0C\u8BD7\u60C5\u753B\u610F\u7684\u521B\u610F\u56ED\u533A\u3002 \u4EA7\u4E1A\u56ED\u53D6\u540D\u82B1\u57CE\uFF0C\u96C6\u5408\u4E86\u7EFF\u8272\u82B1\u57CE\u3001\u5386\u53F2\u82B1"),
                            React.createElement("p", null, "\u5730\u5904\u5E7F\u5DDE\u3001\u987A\u5FB7\u3001\u4E2D\u5C71\u3001\u4E1C\u839E\u3001\u73E0\u6D77\u3001\u6DF1\u5733\u7B49\u5730\u4E4B\u67A2\u7EBD\uFF0C\u5360\u8E1E\u756A\u79BA\u7684\u6838\u5FC3\u4F4D\u7F6E\u3002\u524D\u8EAB\u662F\u6C38\u9686\u5236\u8863\u5382\uFF0C2010\u5E74\u7ECF\u6539\u9020\uFF0C\u6210\u4E3A\u4E86\u9752\u74E6\u767D\u5899\uFF0C\u8BD7\u60C5\u753B\u610F\u7684\u521B\u610F\u56ED\u533A\u3002 \u4EA7\u4E1A\u56ED\u53D6\u540D\u82B1\u57CE\uFF0C\u96C6\u5408\u4E86\u7EFF\u8272\u82B1\u57CE\u3001\u5386\u53F2\u82B1"))
                        : null,
                    this.state.ParkInfoIndex == 2 ?
                        React.createElement("div", { className: "ParkInfo_text discounts", id: "discounts" },
                            React.createElement("p", null, "\u5730\u5904\u5E7F\u5DDE\u3001\u987A\u5FB7\u3001\u4E2D\u5C71\u3001\u4E1C\u839E\u3001\u73E0\u6D77\u3001\u6DF1\u5733\u7B49\u5730\u4E4B\u67A2\u7EBD\uFF0C\u5360\u8E1E\u756A\u79BA\u7684\u6838\u5FC3\u4F4D\u7F6E\u3002\u524D\u8EAB\u662F\u6C38\u9686\u5236\u8863\u5382\uFF0C2010\u5E74\u7ECF\u6539\u9020\uFF0C\u6210\u4E3A\u4E86\u9752\u74E6\u767D\u5899\uFF0C\u8BD7\u60C5\u753B\u610F\u7684\u521B\u610F\u56ED\u533A\u3002 \u4EA7\u4E1A\u56ED\u53D6\u540D\u82B1\u57CE\uFF0C\u96C6\u5408\u4E86\u7EFF\u8272\u82B1\u57CE\u3001\u5386\u53F2\u82B1"))
                        : null,
                    this.state.ParkInfoIndex == 3 ?
                        React.createElement("div", { className: "ParkInfo_text parkElegant", id: "parkElegant" },
                            React.createElement("div", { className: "infoImg parkImg" },
                                React.createElement("span", { className: "stylesgoleft pleft", onClick: this.upImg.bind(this) },
                                    React.createElement("i", { className: "iconfont " }, "\uE835")),
                                React.createElement("img", { src: this.state.imgUrl, onClick: this.fullView.bind(this) }),
                                React.createElement("span", { className: "stylesgoright pright", onClick: this.nextImg.bind(this) },
                                    React.createElement("i", { className: "iconfont " }, "\uE835")),
                                React.createElement("p", { className: "infoImg_num parkImg_num" },
                                    React.createElement("span", null,
                                        this.state.imgNum,
                                        " / ",
                                        this.state.imgMax))))
                        : null),
                this.state.fullViewState == true ?
                    React.createElement("div", { className: "fullView" },
                        React.createElement("div", { className: "closeFull", onClick: this.closeFull.bind(this) },
                            React.createElement("i", { className: "iconfont ", style: { "font-size": "22px" } }, "\uE803")),
                        React.createElement("div", { className: "infoImgFull" },
                            React.createElement("span", { className: "stylesgoleft stylesgoleft_full", onClick: this.upImgFull.bind(this) },
                                React.createElement("i", { className: "iconfont " }, "\uE835")),
                            React.createElement("img", { src: this.state.imgUrl }),
                            React.createElement("span", { className: "stylesgoright stylesgoright_full", onClick: this.nextImgFull.bind(this) },
                                React.createElement("i", { className: "iconfont " }, "\uE835")),
                            React.createElement("p", { className: "imgFull_p" },
                                React.createElement("span", null, this.state.imgNum),
                                " / ",
                                React.createElement("span", null, this.state.imgMax))),
                        React.createElement("div", { className: "botImgUl" },
                            React.createElement("ul", null, this.state.imgUrlList.map((i, index) => {
                                return (React.createElement("li", { className: this.state.imgIndex == index ? "botImg_li_on" : "botImg_li", onClick: this.imgOn.bind(this, index) },
                                    React.createElement("img", { src: i.url })));
                            }))))
                    :
                        null));
        }
    }
    class RoomInfoThreeLeft extends React.Component {
        constructor(props) {
            super(props);
            this.state = {
                RoomInfoIndex: 0,
                RoomInfoThreeLeft: "RoomInfoThreeLeft_part",
                fullViewState: false,
                imgIndex: 0,
                imgMax: 3,
                imgNum: 1,
                imgUrl: "",
                imgUrlList: [
                    { url: "./fangliangbao/image/build.png" },
                    { url: "./fangliangbao/image/build1.png" },
                    { url: "./fangliangbao/image/demo.png" },
                ],
                vidIndex: 0,
                vidMax: 3,
                vidNum: 1,
                vidUrl: "",
                vidUrlList: [
                    { url: "https://v-cdn.zjol.com.cn/280443.mp4" },
                    { url: "https://v-cdn.zjol.com.cn/276982.mp4" },
                    { url: "https://v-cdn.zjol.com.cn/276984.mp4" },
                ]
            };
        }
        componentDidMount() {
        }
        roomInfoOn(index) {
            console.log('roomInfoOn', index);
            if (index == 1) {
                this.setState({
                    RoomInfoThreeLeft: "RoomInfoThreeLeft_all",
                    RoomInfoIndex: index,
                    imgUrl: this.state.imgUrlList[0].url,
                    imgIndex: 0,
                    imgNum: 1,
                });
            }
            else if (index == 2) {
                this.setState({
                    RoomInfoThreeLeft: "RoomInfoThreeLeft_all",
                    RoomInfoIndex: index,
                    vidUrl: this.state.vidUrlList[0].url,
                    vidgIndex: 0,
                    vidNum: 1,
                });
            }
            else {
                this.setState({
                    RoomInfoThreeLeft: "RoomInfoThreeLeft_part",
                    RoomInfoIndex: index,
                });
            }
        }
        upImg() {
            if (this.state.imgIndex > 0) {
                let imgIndexN = this.state.imgIndex;
                imgIndexN = imgIndexN - 1;
                let imgNumN = this.state.imgIndex + 1;
                imgNumN = imgNumN - 1;
                this.setState({
                    imgIndex: imgIndexN,
                    imgUrl: this.state.imgUrlList[this.state.imgIndex - 1].url,
                    imgNum: imgNumN
                }, () => {
                    console.log(this.state);
                });
            }
        }
        nextImg() {
            if (this.state.imgNum !== this.state.imgMax) {
                let imgIndexN = this.state.imgIndex;
                imgIndexN = imgIndexN + 1;
                let imgNumN = this.state.imgIndex + 1;
                imgNumN = imgNumN + 1;
                this.setState({
                    imgIndex: imgIndexN,
                    imgUrl: this.state.imgUrlList[this.state.imgIndex + 1].url,
                    imgNum: imgNumN
                }, () => {
                    console.log(this.state);
                });
            }
        }
        upVid() {
            if (this.state.vidIndex > 0) {
                let vidIndexN = this.state.vidIndex;
                vidIndexN = vidIndexN - 1;
                let vidNumN = this.state.vidIndex + 1;
                vidNumN = vidNumN - 1;
                this.setState({
                    vidIndex: vidIndexN,
                    vidUrl: this.state.vidUrlList[this.state.vidIndex - 1].url,
                    vidNum: vidNumN
                }, () => {
                    console.log(this.state);
                });
            }
        }
        nextVid() {
            if (this.state.vidNum !== this.state.vidMax) {
                let vidIndexN = this.state.vidIndex;
                vidIndexN = vidIndexN + 1;
                let vidNumN = this.state.vidIndex + 1;
                vidNumN = vidNumN + 1;
                this.setState({
                    vidIndex: vidIndexN,
                    vidUrl: this.state.vidUrlList[this.state.vidIndex + 1].url,
                    vidNum: vidNumN
                }, () => {
                    console.log(this.state);
                });
            }
        }
        fullView() {
            this.setState({
                fullViewState: true
            });
            $(document.body).attr('style', 'height: 100%; margin: 0; padding: 0; overflow: hidden;');
        }
        closeFull() {
            this.setState({
                fullViewState: false
            });
            $(document.body).attr('style', 'height: 100%; margin: 0; padding: 0; overflow: visible;');
        }
        upImgFull() {
            this.upImg();
        }
        nextImgFull() {
            this.nextImg();
        }
        imgOn(index) {
            this.setState({
                imgIndex: index,
                imgUrl: this.state.imgUrlList[index].url,
                imgNum: index + 1
            });
        }
        render() {
            return (React.createElement("div", { className: this.state.RoomInfoThreeLeft },
                React.createElement("p", { className: "roomInfo_tit" }, "\u51FA\u79DF\uFF01\u9AD8\u65B0\u533A\u4FE1\u606F\u4EA7\u4E1A\u56ED\u8C6A\u534E\u88C5\u4FEE\u5355\u5143"),
                React.createElement("div", { className: "ParkInfoThree_left_title" },
                    React.createElement("ul", null,
                        React.createElement("li", { className: this.state.RoomInfoIndex == 0 ? "ParkInfoIndex_in" : null, onClick: this.roomInfoOn.bind(this, 0) }, "\u623F\u6E90\u6982\u51B5"),
                        React.createElement("li", { className: this.state.RoomInfoIndex == 1 ? "ParkInfoIndex_in" : null, onClick: this.roomInfoOn.bind(this, 1) }, "\u5B9E\u62CD\u7167\u7247"),
                        React.createElement("li", { className: this.state.RoomInfoIndex == 2 ? "ParkInfoIndex_in" : null, onClick: this.roomInfoOn.bind(this, 2) }, "\u5B9E\u62CD\u89C6\u9891"))),
                this.state.RoomInfoIndex == 0 ?
                    React.createElement("div", { className: "roomInfoBox" },
                        React.createElement("ul", { className: "roomInfoBox_one" },
                            React.createElement("li", null,
                                React.createElement("span", { style: { "font-size": "46px", "font-weight": "bold", "color": "rgba(220,26,63,1)" } }, "98"),
                                " \u5143/m\u00B2\u22C5\u6708"),
                            React.createElement("li", null,
                                "\u603B\u4EF7\uFF1A",
                                React.createElement("span", null, "19,600\u202C"),
                                " \u5143/m\u00B2\u22C5\u6708"),
                            React.createElement("li", { style: { "margin": "0px 24px" } },
                                React.createElement("p", null, "\u5EFA\u7B51\u9762\u79EF"),
                                React.createElement("p", { className: "ribo_bold" },
                                    React.createElement("span", null, "200"),
                                    "m\u00B2")),
                            React.createElement("li", { style: { "margin": "0px 24px" } },
                                React.createElement("p", null, "\u53EF\u5BB9\u7EB3\u5DE5\u4F4D"),
                                React.createElement("p", { className: "ribo_bold" },
                                    React.createElement("span", null, "29~58"),
                                    "\u4E2A\u5DE5\u4F4D")),
                            React.createElement("li", { style: { "margin": "0px 24px" } },
                                React.createElement("p", null, "\u88C5\u4FEE\u7A0B\u5EA6"),
                                React.createElement("p", { className: "ribo_bold" }, "\u4E2D\u7B49\u88C5\u4FEE"))),
                        React.createElement("ul", { className: "roomInfoBox_two" },
                            React.createElement("li", null,
                                "\u514D\u79DF\u65F6\u95F4 ",
                                React.createElement("span", null, "\u9762\u8BAE")),
                            React.createElement("li", null,
                                "\u603B\u5171\u697C\u5C42 ",
                                React.createElement("span", null, "12\u5C42")),
                            React.createElement("li", null,
                                "\u6240\u5728\u697C\u5C42 ",
                                React.createElement("span", null, "6\u5C42")),
                            React.createElement("li", null,
                                "\u7535",
                                React.createElement("span", { style: { "margin-left": "28px", "color": "rgba(152,159,168,1)" } }, "\u68AF"),
                                React.createElement("span", null, "\u6709\u7535\u68AF")),
                            React.createElement("li", null,
                                "\u770B\u623F\u65F6\u95F4 ",
                                React.createElement("span", { className: "lookTime" }, "\u8054\u7CFB\u987E\u95EE\uFF0C\u968F\u65F6\u53EF\u770B")),
                            React.createElement("li", null,
                                "\u66F4\u65B0\u65F6\u95F4 ",
                                React.createElement("span", null, "14\u5C0F\u65F6\u524D"))))
                    : null,
                this.state.RoomInfoIndex == 1 ?
                    React.createElement("div", { className: "infoImg" },
                        React.createElement("span", { className: "stylesgoleft", onClick: this.upImg.bind(this) },
                            React.createElement("i", { className: "iconfont " }, "\uE835")),
                        React.createElement("img", { src: this.state.imgUrl, onClick: this.fullView.bind(this) }),
                        React.createElement("span", { className: "stylesgoright", onClick: this.nextImg.bind(this) },
                            React.createElement("i", { className: "iconfont " }, "\uE835")),
                        React.createElement("p", { className: "infoImg_num" },
                            React.createElement("span", null, this.state.imgNum),
                            " / ",
                            React.createElement("span", null, this.state.imgMax)))
                    : null,
                this.state.RoomInfoIndex == 2 ?
                    React.createElement("div", { className: "infoImg" },
                        React.createElement("span", { className: "stylesgoleft", onClick: this.upVid.bind(this) },
                            React.createElement("i", { className: "iconfont " }, "\uE835")),
                        React.createElement("video", { src: this.state.vidUrl, controls: true }, "\u5F53\u524D\u6D4F\u89C8\u5668\u4E0D\u652F\u6301video\u64AD\u653E"),
                        React.createElement("span", { className: "stylesgoright", onClick: this.nextVid.bind(this) },
                            React.createElement("i", { className: "iconfont " }, "\uE835")),
                        React.createElement("p", { className: "infoImg_num" },
                            React.createElement("span", null, this.state.vidNum),
                            " / ",
                            React.createElement("span", null, this.state.vidMax)))
                    : null,
                this.state.fullViewState == true ?
                    React.createElement("div", { className: "fullView" },
                        React.createElement("div", { className: "closeFull", onClick: this.closeFull.bind(this) },
                            React.createElement("i", { className: "iconfont ", style: { "font-size": "22px" } }, "\uE803")),
                        React.createElement("div", { className: "infoImgFull" },
                            React.createElement("span", { className: "stylesgoleft stylesgoleft_full", onClick: this.upImgFull.bind(this) },
                                React.createElement("i", { className: "iconfont ", style: { "transform": "rotate(90deg)" } }, "\uE835")),
                            React.createElement("img", { src: this.state.imgUrl }),
                            React.createElement("span", { className: "stylesgoright stylesgoright_full", onClick: this.nextImgFull.bind(this) },
                                React.createElement("i", { className: "iconfont ", style: { "transform": "rotate(-90deg)" } }, "\uE835")),
                            React.createElement("p", { className: "imgFull_p" },
                                React.createElement("span", null, this.state.imgNum),
                                " / ",
                                React.createElement("span", null, this.state.imgMax))),
                        React.createElement("div", { className: "botImgUl" },
                            React.createElement("ul", null, this.state.imgUrlList.map((i, index) => {
                                return (React.createElement("li", { className: this.state.imgIndex == index ? "botImg_li_on" : "botImg_li", onClick: this.imgOn.bind(this, index) },
                                    React.createElement("img", { src: i.url })));
                            }))))
                    :
                        null));
        }
    }
    class CompanyInfoThreeLeft extends React.Component {
        constructor(props) {
            super(props);
            this.state = {
                RoomInfoIndex: 0,
                RoomInfoThreeLeft: "RoomInfoThreeLeft_part"
            };
        }
        componentDidMount() {
        }
        roomInfoOn(index) {
            this.setState({
                RoomInfoIndex: index,
            });
        }
        onChange(a, b, c) {
            console.log(a, b, c);
        }
        render() {
            return (React.createElement("div", { className: "RoomInfoThreeLeft" },
                React.createElement("div", { className: "ParkInfoThree_left_title" },
                    React.createElement("ul", null,
                        React.createElement("li", { className: this.state.RoomInfoIndex == 0 ? "ParkInfoIndex_in" : null, onClick: this.roomInfoOn.bind(this, 0) }, "\u4F01\u4E1A\u4FE1\u606F"),
                        React.createElement("li", { className: this.state.RoomInfoIndex == 1 ? "ParkInfoIndex_in" : null, onClick: this.roomInfoOn.bind(this, 1) }, "\u4F01\u4E1A\u98CE\u91C7"),
                        React.createElement("li", { className: this.state.RoomInfoIndex == 2 ? "ParkInfoIndex_in" : null, onClick: this.roomInfoOn.bind(this, 2) }, "\u4F01\u4E1A\u8BE6\u60C5"),
                        React.createElement("li", { className: this.state.RoomInfoIndex == 3 ? "ParkInfoIndex_in" : null, onClick: this.roomInfoOn.bind(this, 3) }, "\u4EA7\u54C1\u5C55\u793A"))),
                this.state.RoomInfoIndex == 0 ?
                    React.createElement("div", null, "\"000000000\"")
                    : null,
                this.state.RoomInfoIndex == 1 ?
                    React.createElement("div", { className: "infoImg" },
                        React.createElement("div", { className: "infoImg_left" },
                            React.createElement("i", { className: "iconfont " }, "\uE83C")),
                        React.createElement("div", { className: "infoImg_ul" },
                            React.createElement("ul", null,
                                React.createElement("li", null,
                                    " ",
                                    React.createElement("img", { src: "./fangliangbao/image/demo.png" })),
                                React.createElement("li", null,
                                    " ",
                                    React.createElement("img", { src: "./fangliangbao/image/demo.png" })),
                                React.createElement("li", null,
                                    " ",
                                    React.createElement("img", { src: "./fangliangbao/image/demo.png" })))),
                        React.createElement("p", { className: "infoImg_num" },
                            React.createElement("span", null, "2"),
                            " / ",
                            React.createElement("span", null, "8")),
                        React.createElement("div", { className: "infoImg_rightt" },
                            React.createElement("i", { className: "iconfont " }, "\uE83C")))
                    : null,
                this.state.RoomInfoIndex == 2 ?
                    React.createElement("div", { className: "infoImg" },
                        React.createElement("div", { className: "infoImg_left" },
                            React.createElement("i", { className: "iconfont " }, "\uE83C")),
                        React.createElement("div", { className: "infoImg_ul" },
                            React.createElement("ul", null,
                                React.createElement("li", null,
                                    " ",
                                    React.createElement("img", { src: "./fangliangbao/image/demo.png" })),
                                React.createElement("li", null,
                                    " ",
                                    React.createElement("img", { src: "./fangliangbao/image/demo.png" })),
                                React.createElement("li", null,
                                    " ",
                                    React.createElement("img", { src: "./fangliangbao/image/demo.png" })))),
                        React.createElement("p", { className: "infoImg_num" },
                            React.createElement("span", null, "2"),
                            " / ",
                            React.createElement("span", null, "8")),
                        React.createElement("div", { className: "infoImg_rightt" },
                            React.createElement("i", { className: "iconfont " }, "\uE83C")))
                    : null,
                this.state.RoomInfoIndex == 3 ?
                    React.createElement("div", { className: "infoImg" },
                        React.createElement("div", { className: "infoImg_left" },
                            React.createElement("i", { className: "iconfont " }, "\uE83C")),
                        React.createElement("div", { className: "infoImg_ul" },
                            React.createElement("ul", null,
                                React.createElement("li", null,
                                    " ",
                                    React.createElement("img", { src: "./fangliangbao/image/demo.png" })),
                                React.createElement("li", null,
                                    " ",
                                    React.createElement("img", { src: "./fangliangbao/image/demo.png" })),
                                React.createElement("li", null,
                                    " ",
                                    React.createElement("img", { src: "./fangliangbao/image/demo.png" })))),
                        React.createElement("p", { className: "infoImg_num" },
                            React.createElement("span", null, "2"),
                            " / ",
                            React.createElement("span", null, "8")),
                        React.createElement("div", { className: "infoImg_rightt" },
                            React.createElement("i", { className: "iconfont " }, "\uE83C")))
                    : null));
        }
    }
    class ParkInfoThreeRight extends React.Component {
        constructor(props) {
            super(props);
            this.state = {
                needText: "如：在广州白云区寻找200m2左右的办公室，租金在80元/m2·天，临近地铁站。",
                phone: "输入您的手机号码",
                sendSuccessState: false,
            };
            ParkInfoThreeRight.closeSendNeed = this.closeSendNeed.bind(this);
        }
        componentDidMount() {
        }
        sendNeed() {
            console.log(this.state);
            this.setState({
                sendSuccessState: true,
            });
            $(document.body).attr('style', 'height: 100%; margin: 0; padding: 0; overflow: hidden;');
        }
        static closeSendNeed() { }
        ;
        closeSendNeed() {
            this.setState({
                sendSuccessState: false,
            });
        }
        render() {
            return (React.createElement("div", { className: "ParkInfoThree_right" },
                React.createElement("p", { className: "pitr_title" }, "\u54A8\u8BE2\u987E\u95EE"),
                React.createElement("div", { className: "ParkInfoThree_right_one" },
                    React.createElement("img", { src: "./fangliangbao/image/demo.png" }),
                    React.createElement("div", { className: "pitro_rb" },
                        React.createElement("p", { className: "pitro_name" }, "\u5F20\u4E09\u4E09"),
                        React.createElement("div", { className: "pitro_text1" }, "\u8BE5\u56ED\u533A\u4E0E\u623F\u6E90\u7531\u6211\u7EF4\u62A4\uFF0C\u719F\u77E5\u56ED\u533A\u653F\u7B56\u4E0E\u5468\u8FB9\u73AF\u5883"),
                        React.createElement("p", { className: "pitro_text2" },
                            "\u514D\u8D39\u54A8\u8BE2   ",
                            React.createElement("span", { style: { "font-size": "16px", "font-weight": "bold", "margin-left": "5px" } }, "15578380203")))),
                React.createElement("div", { className: "ParkInfoThree_right_two" },
                    React.createElement("p", { className: "pitr_title" }, "\u5B9D\u54E5\u5E2E\u627E\u623F"),
                    React.createElement("p", { className: "pitrt_inp" },
                        React.createElement("i", { className: "iconfont ", style: { "margin-right": "5px", "font-size": "14px" } }, "\uE83D"),
                        React.createElement("input", { type: "text", value: this.state.phone }))),
                React.createElement("div", { className: "ParkInfoThree_right_three" },
                    React.createElement("p", { className: "pitrth_text1" }, "\u60A8\u7684\u9700\u6C42\uFF1A"),
                    React.createElement("textarea", { value: this.state.needText }),
                    React.createElement("input", { type: "button" })),
                React.createElement("input", { type: "button", value: "\u7ACB\u5373\u59D4\u6258", className: "pitr_btn", onClick: this.sendNeed.bind(this) }),
                this.state.sendSuccessState == true ?
                    React.createElement(SendSuccess_1.default, null)
                    : null));
        }
    }
    class NearParkList extends React.Component {
        constructor(props) {
            super(props);
            this.state = {
                index: 0,
                left: -40,
                max: 5,
                nearToRightState: "nearToRight",
                nearToLeftState: "nearToLeftHide",
            };
        }
        componentDidMount() {
        }
        getNeed() {
            console.log(this.state);
        }
        nearToLeft() {
            let index = this.state.index;
            console.log("nearToLeft", index);
            if (index !== 0) {
                this.setState({
                    index: this.state.index - 1,
                    nearToRightState: "nearToRight",
                }, () => {
                    let nearParkList = $('.nearParkList ul');
                    let N = this.state.index * -305;
                    let X = N - 40;
                    nearParkList.css({ "left": X + "px" });
                    if (this.state.index == 0) {
                        this.setState({
                            nearToLeftState: "nearToLeftHide",
                            nearToRightState: "nearToRight",
                        });
                    }
                });
            }
        }
        nearToRight() {
            console.log("nearToRight");
            let index = this.state.index;
            let max = this.state.max;
            if (max - index > 3) {
                this.setState({
                    index: this.state.index + 1,
                    nearToLeftState: "nearToLeft",
                    nearToRightState: "nearToRight",
                }, () => {
                    let nearParkList = $('.nearParkList ul');
                    let N = this.state.index * -305;
                    let X = N - 40;
                    nearParkList.css({ "left": X + "px" });
                });
                if (max - index == 4) {
                    this.setState({
                        nearToRightState: "nearToRightHide",
                    });
                }
            }
        }
        render() {
            return (React.createElement("div", { className: "nearParkList" },
                React.createElement("p", { className: "nearParkList_title" }, "\u5468\u8FB9\u529E\u516C\u697C\u76D8"),
                React.createElement("span", { className: this.state.nearToLeftState, onClick: this.nearToLeft.bind(this) },
                    React.createElement("i", { className: "iconfont " }, "\uE835")),
                React.createElement("ul", null,
                    React.createElement("li", null,
                        React.createElement("img", { src: "./fangliangbao/image/demo.png" }),
                        React.createElement("p", null, "\u5546\u52A1\u5927\u53A60"),
                        React.createElement("p", null,
                            React.createElement("span", null, "\u8DDD\u79BB205\u7C73"),
                            React.createElement("span", null,
                                React.createElement("span", { style: { "color": "rgba(220,26,63,1)", "font-size": "24px" } }, " 5.5 "),
                                "\u5143 /m\u00B2\u22C5\u6708"))),
                    React.createElement("li", null,
                        React.createElement("img", { src: "./fangliangbao/image/demo.png" }),
                        React.createElement("p", null, "\u5546\u52A1\u5927\u53A61"),
                        React.createElement("p", null,
                            React.createElement("span", null, "\u8DDD\u79BB205\u7C73"),
                            React.createElement("span", null,
                                React.createElement("span", { style: { "color": "rgba(220,26,63,1)", "font-size": "24px" } }, " 5.5 "),
                                "\u5143 /m\u00B2\u22C5\u6708"))),
                    React.createElement("li", null,
                        React.createElement("img", { src: "./fangliangbao/image/demo.png" }),
                        React.createElement("p", null, "\u5546\u52A1\u5927\u53A62"),
                        React.createElement("p", null,
                            React.createElement("span", null, "\u8DDD\u79BB205\u7C73"),
                            React.createElement("span", null,
                                React.createElement("span", { style: { "color": "rgba(220,26,63,1)", "font-size": "24px" } }, " 5.5 "),
                                "\u5143 /m\u00B2\u22C5\u6708"))),
                    React.createElement("li", null,
                        React.createElement("img", { src: "./fangliangbao/image/demo.png" }),
                        React.createElement("p", null, "\u5546\u52A1\u5927\u53A63"),
                        React.createElement("p", null,
                            React.createElement("span", null, "\u8DDD\u79BB205\u7C73"),
                            React.createElement("span", null,
                                React.createElement("span", { style: { "color": "rgba(220,26,63,1)", "font-size": "24px" } }, " 5.5 "),
                                "\u5143 /m\u00B2\u22C5\u6708"))),
                    React.createElement("li", null,
                        React.createElement("img", { src: "./fangliangbao/image/demo.png" }),
                        React.createElement("p", null, "\u5546\u52A1\u5927\u53A64"),
                        React.createElement("p", null,
                            React.createElement("span", null, "\u8DDD\u79BB205\u7C73"),
                            React.createElement("span", null,
                                React.createElement("span", { style: { "color": "rgba(220,26,63,1)", "font-size": "24px" } }, " 5.5 "),
                                "\u5143 /m\u00B2\u22C5\u6708"))),
                    React.createElement("li", null,
                        React.createElement("img", { src: "./fangliangbao/image/demo.png" }),
                        React.createElement("p", null, "\u5546\u52A1\u5927\u53A65"),
                        React.createElement("p", null,
                            React.createElement("span", null, "\u8DDD\u79BB205\u7C73"),
                            React.createElement("span", null,
                                React.createElement("span", { style: { "color": "rgba(220,26,63,1)", "font-size": "24px" } }, " 5.5 "),
                                "\u5143 /m\u00B2\u22C5\u6708")))),
                React.createElement("span", { className: this.state.nearToRightState, onClick: this.nearToRight.bind(this) },
                    React.createElement("i", { className: "iconfont " }, "\uE835"))));
        }
    }
    exports.default = ParkInfo;
});
define("router", ["require", "exports", "react-router-dom", "react", "index", "parkInfo"], function (require, exports, react_router_dom_1, React, index_1, parkInfo_1) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    class Router extends React.Component {
        constructor(props) {
            super(props);
        }
        render() {
            return (React.createElement(react_router_dom_1.HashRouter, null,
                React.createElement(react_router_dom_1.Switch, null,
                    React.createElement(react_router_dom_1.Route, { exact: true, path: "/", component: index_1.default }),
                    React.createElement(react_router_dom_1.Route, { exact: true, path: "/pi", component: parkInfo_1.default }))));
        }
    }
    exports.default = Router;
});
define("ParkInfo (2)", ["require", "exports", "react", "HomeTop", "allBottom"], function (require, exports, React, HomeTop_2, AllBottom_2) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    class ParkInfo extends React.Component {
        constructor(props) {
            super(props);
            this.state = {};
        }
        render() {
            return (React.createElement("div", null,
                React.createElement(HomeTop_2.default, null),
                React.createElement("div", { className: "parkInfo" },
                    React.createElement("div", { className: "parkInfoBox_title" },
                        React.createElement(ParkInfoOne, null)),
                    React.createElement("div", { className: "parkInfoBox_list" },
                        React.createElement(ParkInfoTwo, null)),
                    React.createElement("div", { className: "parkInfoBox_text" },
                        React.createElement(ParkInfoThree, null))),
                React.createElement(AllBottom_2.default, null)));
        }
    }
    class ParkInfoOne extends React.Component {
        constructor(props) {
            super(props);
            this.state = {};
        }
        componentDidMount() {
        }
        render() {
            return (React.createElement("div", { className: "ParkInfoOne" },
                React.createElement("div", { className: "ParkInfoOne_title" },
                    React.createElement("img", { src: "./fangliangbao/image/blueLogo.png" }),
                    React.createElement("ul", null,
                        React.createElement("li", { style: { "color": " rgb(23, 161, 230)", "font-weight": "bold" } }, "\u54C1\u724C\u56ED\u533A"),
                        React.createElement("li", null, "\u51FA\u79DF\u623F\u6E90"),
                        React.createElement("li", null, "\u623F\u6E90\u56ED\u533A"))),
                React.createElement("div", { className: "ParkInfoOne_html" },
                    React.createElement("p", null,
                        React.createElement("span", null, "\u5E7F\u5DDE"),
                        " ",
                        React.createElement("span", null, "\u54C1\u724C\u56ED\u533A"),
                        React.createElement("i", { className: "jiange" }, " > "),
                        React.createElement("span", null, "\u8D8A\u79C0"),
                        React.createElement("i", { className: "jiange" }, " > "),
                        React.createElement("span", null, "\u5317\u4EAC\u8DEF"))),
                React.createElement("div", { className: "ParkInfoOne_info" },
                    React.createElement("p", null, "\u4FE1\u606F\u4EA7\u4E1A\u56ED"),
                    React.createElement("ul", null,
                        React.createElement("li", null,
                            React.createElement("i", { className: "iconfont " }, "\uE83C"),
                            "\u6536\u85CF"),
                        React.createElement("li", null,
                            React.createElement("i", { className: "iconfont " }, "\uE83C"),
                            "\u5206\u4EAB")))));
        }
    }
    class ParkInfoTwo extends React.Component {
        constructor(props) {
            super(props);
            this.state = {
                index: 0,
                ParkInfoTwoState: "ParkInfoTwoAll",
                ParkInfoTwoListState: "ParkInfoTwoList",
                listTrun: "ParkInfoTwoListTrun",
                listTrun_text: "收起列表"
            };
        }
        componentDidMount() {
        }
        changeTitle(index) {
            this.setState({
                index: index
            });
        }
        overTitle() {
            if (this.state.ParkInfoTwoState == "ParkInfoTwoAll") {
                this.setState({
                    ParkInfoTwoState: "ParkInfoTwoOver",
                    ParkInfoTwoListState: "hide",
                    listTrun: "ParkInfoTwoListTrunUp",
                    listTrun_text: "展开列表",
                });
            }
            else {
                this.setState({
                    ParkInfoTwoState: "ParkInfoTwoAll",
                    ParkInfoTwoListState: "ParkInfoTwoList",
                    listTrun: "ParkInfoTwoListTrun",
                    listTrun_text: "收起列表",
                });
            }
        }
        render() {
            return (React.createElement("div", { className: this.state.ParkInfoTwoState },
                React.createElement("div", { className: "ParkInfoTwoTitle" },
                    React.createElement("ul", null,
                        React.createElement("li", { className: this.state.index == 0 ? "ParkInfoTwoTitleActive" : null, onClick: this.changeTitle.bind(this, 0) }, "\u51FA\u79DF\u623F\u6E90"),
                        React.createElement("li", { className: this.state.index == 1 ? "ParkInfoTwoTitleActive" : null, onClick: this.changeTitle.bind(this, 1) }, "\u51FA\u552E\u623F\u6E90"),
                        React.createElement("li", { className: this.state.index == 2 ? "ParkInfoTwoTitleActive" : null, onClick: this.changeTitle.bind(this, 2) }, "\u5165\u9A7B\u4F01\u4E1A"))),
                React.createElement("div", { className: this.state.ParkInfoTwoListState },
                    this.state.index == 0 ?
                        React.createElement(LeaseList, null)
                        : null,
                    this.state.index == 1 ?
                        React.createElement(SellList, null)
                        : null,
                    this.state.index == 2 ?
                        React.createElement(CompanyList, null)
                        : null),
                React.createElement("div", { className: this.state.listTrun, onClick: this.overTitle.bind(this) }, this.state.listTrun_text)));
        }
    }
    class LeaseList extends React.Component {
        constructor(props) {
            super(props);
            this.state = {
                typeIndex: 0,
                leaseRoomsState: -1,
            };
        }
        componentDidMount() {
        }
        onLeaseRoom(index) {
            ParkInfoThree.showRoomInfo();
            this.setState({
                leaseRoomsState: index
            });
        }
        leasetypeIndex(index) {
            this.setState({
                typeIndex: index,
            });
        }
        render() {
            return (React.createElement("div", { className: "leaseListBox" },
                React.createElement("div", { className: "leasetype" },
                    React.createElement("ul", null,
                        React.createElement("li", { onClick: this.leasetypeIndex.bind(this, 0) },
                            React.createElement("div", { className: this.state.typeIndex == 0 ? "leasetype_li_on" : "leasetype_li" },
                                React.createElement("p", { style: { "padding-top": "6px" } }, "\u5168\u90E8\u6237\u578B"),
                                React.createElement("p", null,
                                    React.createElement("span", null, "XX"),
                                    "\u5957"))),
                        React.createElement("li", { onClick: this.leasetypeIndex.bind(this, 1) },
                            React.createElement("div", { className: this.state.typeIndex == 1 ? "leasetype_li_on" : "leasetype_li" },
                                React.createElement("p", { style: { "padding-top": "6px" } }, "100m\u00B2\u4EE5\u4E0B"),
                                React.createElement("p", null,
                                    React.createElement("span", null, "XX"),
                                    "\u5957"))),
                        React.createElement("li", { onClick: this.leasetypeIndex.bind(this, 2) },
                            React.createElement("div", { className: this.state.typeIndex == 2 ? "leasetype_li_on" : "leasetype_li" },
                                React.createElement("p", { style: { "padding-top": "6px" } }, "100-200m\u00B2"),
                                React.createElement("p", null,
                                    React.createElement("span", null, "XX"),
                                    "\u5957"))),
                        React.createElement("li", { onClick: this.leasetypeIndex.bind(this, 3) },
                            React.createElement("div", { className: this.state.typeIndex == 3 ? "leasetype_li_on" : "leasetype_li" },
                                React.createElement("p", { style: { "padding-top": "6px" } }, "300-500m\u00B2"),
                                React.createElement("p", null,
                                    React.createElement("span", null, "XX"),
                                    "\u5957"))))),
                React.createElement("div", { className: "leaseRoomList" },
                    React.createElement("ul", null,
                        React.createElement("li", { onClick: this.onLeaseRoom.bind(this, 0) },
                            React.createElement("div", { className: this.state.leaseRoomsState == 0 ? "leaseRooms_on" : "leaseRooms" },
                                React.createElement("img", { src: "./fangliangbao/image/demo.png" }),
                                React.createElement("div", { className: "leaseRoomsRight" },
                                    React.createElement("p", { className: "leaseName" }, "\u51FA\u79DF\u9AD8\u65B0\u533A\u4FE1\u606F\u4EA7\u4E1A\u56ED\u798F\u5EFA\u5E08\u8303"),
                                    React.createElement("p", null,
                                        React.createElement("span", { className: "leasePrice" }, "80.3"),
                                        " \u5143/m\u00B2\u22C5\u6708"),
                                    React.createElement("p", { className: "leaseArea" }, "187m\u00B2")))),
                        React.createElement("li", { onClick: this.onLeaseRoom.bind(this, 1) },
                            React.createElement("div", { className: this.state.leaseRoomsState == 1 ? "leaseRooms_on" : "leaseRooms" },
                                React.createElement("img", { src: "./fangliangbao/image/demo.png" }),
                                React.createElement("div", { className: "leaseRoomsRight" },
                                    React.createElement("p", { className: "leaseName" }, "\u51FA\u79DF\u9AD8\u65B0\u533A\u4FE1\u606F\u4EA7\u4E1A\u56ED\u798F\u5EFA\u5E08\u8303"),
                                    React.createElement("p", null,
                                        React.createElement("span", { className: "leasePrice" }, "80.3"),
                                        " \u5143/m\u00B2\u22C5\u6708"),
                                    React.createElement("p", { className: "leaseArea" }, "187m\u00B2")))),
                        React.createElement("li", { onClick: this.onLeaseRoom.bind(this, 2) },
                            React.createElement("div", { className: this.state.leaseRoomsState == 2 ? "leaseRooms_on" : "leaseRooms" },
                                React.createElement("img", { src: "./fangliangbao/image/demo.png" }),
                                React.createElement("div", { className: "leaseRoomsRight" },
                                    React.createElement("p", { className: "leaseName" }, "\u51FA\u79DF\u9AD8\u65B0\u533A\u4FE1\u606F\u4EA7\u4E1A\u56ED\u798F\u5EFA\u5E08\u8303"),
                                    React.createElement("p", null,
                                        React.createElement("span", { className: "leasePrice" }, "80.3"),
                                        " \u5143/m\u00B2\u22C5\u6708"),
                                    React.createElement("p", { className: "leaseArea" }, "187m\u00B2"))))))));
        }
    }
    class SellList extends React.Component {
        constructor(props) {
            super(props);
            this.state = {};
        }
        componentDidMount() {
        }
        render() {
            return (React.createElement("div", { className: "sellListBox" },
                React.createElement("ul", null,
                    React.createElement("li", null,
                        React.createElement("div", { className: "sellRoom" }, "SellList")))));
        }
    }
    class CompanyList extends React.Component {
        constructor(props) {
            super(props);
            this.state = {};
        }
        componentDidMount() {
        }
        render() {
            return (React.createElement("div", { className: "companyListBox" },
                React.createElement("ul", null,
                    React.createElement("li", null,
                        React.createElement("div", { className: "companys" }, "CompanyList")))));
        }
    }
    class ParkInfoThree extends React.Component {
        constructor(props) {
            super(props);
            this.state = {
                RoomInfoState: "hide",
                rightBox: "ParkInfoThree_rightBox"
            };
            ParkInfoThree.showRoomInfo = this.showRoomInfo.bind(this);
        }
        componentDidMount() {
        }
        static showRoomInfo() { }
        ;
        showRoomInfo() {
            this.setState({
                RoomInfoState: "RoomInfoShow",
                rightBox: "ParkInfoThree_rightBox_up"
            });
        }
        render() {
            return (React.createElement("div", { className: "ParkInfoThree" },
                React.createElement("div", { className: "ParkInfoThree_leftBox" },
                    this.state.RoomInfoState == "RoomInfoShow" ?
                        React.createElement(RoomInfoThreeLeft, null)
                        : null,
                    React.createElement(ParkInfoThreeLeft, null)),
                React.createElement("div", { className: this.state.rightBox },
                    React.createElement(ParkInfoThreeRight, null))));
        }
    }
    class ParkInfoThreeLeft extends React.Component {
        constructor(props) {
            super(props);
            this.state = {};
        }
        componentDidMount() {
        }
        render() {
            return (React.createElement("div", { className: "ParkInfoThree_right" }, "ParkInfoThreeLeft"));
        }
    }
    class RoomInfoThreeLeft extends React.Component {
        constructor(props) {
            super(props);
            this.state = {};
        }
        componentDidMount() {
        }
        render() {
            return (React.createElement("div", { className: "ParkInfoThree_left" }, "RoomInfoThreeLeft"));
        }
    }
    class ParkInfoThreeRight extends React.Component {
        constructor(props) {
            super(props);
            this.state = {};
        }
        componentDidMount() {
        }
        render() {
            return (React.createElement("div", { className: "ParkInfoThree_right" },
                React.createElement("p", null, "\u54A8\u8BE2\u987E\u95EE"),
                React.createElement("div", { className: "ParkInfoThree_right_one" },
                    React.createElement("img", { src: "" }),
                    React.createElement("p", null, "name"),
                    React.createElement("div", null, "\u8BE5\u56ED\u533A\u4E0E\u623F\u6E90\u7531\u6211\u7EF4\u62A4\uFF0C\u719F\u77E5\u56ED\u533A\u653F\u7B56\u4E0E\u5468\u8FB9\u73AF\u5883"),
                    React.createElement("p", null,
                        "\u514D\u8D39\u54A8\u8BE2 ",
                        React.createElement("span", null, "15578380203"))),
                React.createElement("div", { className: "ParkInfoThree_right_two" },
                    React.createElement("p", null, "\u5B9D\u54E5\u5E2E\u627E\u623F"),
                    React.createElement("p", null,
                        React.createElement("i", { className: "iconfont ", style: { "margin-right": "5px", "font-size": "14px" } }, "\uE83C"),
                        React.createElement("input", { type: "text", value: "\u8F93\u5165\u60A8\u7684\u624B\u673A\u53F7\u7801" }))),
                React.createElement("div", { className: "ParkInfoThree_right_three" },
                    React.createElement("textarea", { value: "\u5982\uFF1A\u5728\u5E7F\u5DDE\u767D\u4E91\u533A\u5BFB\u627E200m2\u5DE6\u53F3\u7684\u529E\u516C\u5BA4\uFF0C\u79DF\u91D1\u572880\u5143/m2\u00B7\u5929\uFF0C\u4E34\u8FD1\u5730\u94C1\u7AD9\u3002" }),
                    React.createElement("input", { type: "button" }))));
        }
    }
    exports.default = ParkInfo;
});
define("ParkInfo (3)", ["require", "exports", "react", "HomeTop", "allBottom", "InfoTitle"], function (require, exports, React, HomeTop_3, AllBottom_3, InfoTitle_2) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    class ParkInfo extends React.Component {
        constructor(props) {
            super(props);
            this.state = {};
        }
        render() {
            return (React.createElement("div", null,
                React.createElement(HomeTop_3.default, null),
                React.createElement("div", { className: "parkInfo" },
                    React.createElement("div", { className: "parkInfoBox_title" },
                        React.createElement(InfoTitle_2.default, null),
                        React.createElement(ParkInfoOne, null)),
                    React.createElement("div", { className: "parkInfoBox_list" },
                        React.createElement(ParkInfoTwo, null)),
                    React.createElement("div", { className: "parkInfoBox_text" },
                        React.createElement(ParkInfoThree, null))),
                React.createElement(AllBottom_3.default, null)));
        }
    }
    class ParkInfoOne extends React.Component {
        constructor(props) {
            super(props);
            this.state = {};
        }
        componentDidMount() {
        }
        render() {
            return (React.createElement("div", { className: "ParkInfoOne" },
                React.createElement("div", { className: "ParkInfoOne_html" },
                    React.createElement("p", null,
                        React.createElement("span", null, "\u5E7F\u5DDE"),
                        " ",
                        React.createElement("span", null, "\u54C1\u724C\u56ED\u533A"),
                        React.createElement("i", { className: "jiange" }, " > "),
                        React.createElement("span", null, "\u8D8A\u79C0"),
                        React.createElement("i", { className: "jiange" }, " > "),
                        React.createElement("span", null, "\u5317\u4EAC\u8DEF"))),
                React.createElement("div", { className: "ParkInfoOne_info" },
                    React.createElement("p", null, "\u4FE1\u606F\u4EA7\u4E1A\u56ED"),
                    React.createElement("ul", null,
                        React.createElement("li", null,
                            React.createElement("i", { className: "iconfont " }, "\uE83C"),
                            "\u6536\u85CF"),
                        React.createElement("li", null,
                            React.createElement("i", { className: "iconfont " }, "\uE83C"),
                            "\u5206\u4EAB")))));
        }
    }
    class ParkInfoTwo extends React.Component {
        constructor(props) {
            super(props);
            this.state = {
                index: 0,
                ParkInfoTwoState: "ParkInfoTwoAll",
                ParkInfoTwoListState: "ParkInfoTwoList",
                listTrun: "ParkInfoTwoListTrun",
                listTrun_text: "收起列表"
            };
        }
        componentDidMount() {
        }
        changeTitle(index) {
            this.setState({
                index: index
            });
        }
        overTitle() {
            if (this.state.ParkInfoTwoState == "ParkInfoTwoAll") {
                this.setState({
                    ParkInfoTwoState: "ParkInfoTwoOver",
                    ParkInfoTwoListState: "hide",
                    listTrun: "ParkInfoTwoListTrunUp",
                    listTrun_text: "展开列表",
                });
            }
            else {
                this.setState({
                    ParkInfoTwoState: "ParkInfoTwoAll",
                    ParkInfoTwoListState: "ParkInfoTwoList",
                    listTrun: "ParkInfoTwoListTrun",
                    listTrun_text: "收起列表"
                });
            }
        }
        render() {
            return (React.createElement("div", { className: this.state.ParkInfoTwoState },
                React.createElement("div", { className: "ParkInfoTwoTitle" },
                    React.createElement("ul", null,
                        React.createElement("li", { className: this.state.index == 0 ? "ParkInfoTwoTitleActive" : null, onClick: this.changeTitle.bind(this, 0) }, "\u51FA\u79DF\u623F\u6E90"),
                        React.createElement("li", { className: this.state.index == 1 ? "ParkInfoTwoTitleActive" : null, onClick: this.changeTitle.bind(this, 1) }, "\u51FA\u552E\u623F\u6E90"),
                        React.createElement("li", { className: this.state.index == 2 ? "ParkInfoTwoTitleActive" : null, onClick: this.changeTitle.bind(this, 2) }, "\u5165\u9A7B\u4F01\u4E1A"))),
                React.createElement("div", { className: this.state.ParkInfoTwoListState },
                    this.state.index == 0 ?
                        React.createElement(LeaseList, null)
                        : null,
                    this.state.index == 1 ?
                        React.createElement(SellList, null)
                        : null,
                    this.state.index == 2 ?
                        React.createElement(CompanyList, null)
                        : null),
                React.createElement("div", { className: this.state.listTrun, onClick: this.overTitle.bind(this) }, this.state.listTrun_text)));
        }
    }
    class LeaseList extends React.Component {
        constructor(props) {
            super(props);
            this.state = {
                typeIndex: 0,
                leaseRoomsState: -1,
            };
        }
        componentDidMount() {
        }
        onLeaseRoom(index) {
            ParkInfoThree.showRoomInfo();
            this.setState({
                leaseRoomsState: index
            });
        }
        leasetypeIndex(index) {
            this.setState({
                typeIndex: index,
            });
        }
        render() {
            return (React.createElement("div", { className: "leaseListBox" },
                React.createElement("div", { className: "leasetype" },
                    React.createElement("ul", null,
                        React.createElement("li", { onClick: this.leasetypeIndex.bind(this, 0) },
                            React.createElement("div", { className: this.state.typeIndex == 0 ? "leasetype_li_on" : "leasetype_li" },
                                React.createElement("p", { style: { "padding-top": "6px" } }, "\u5168\u90E8\u6237\u578B"),
                                React.createElement("p", null,
                                    React.createElement("span", null, "XX"),
                                    "\u5957"))),
                        React.createElement("li", { onClick: this.leasetypeIndex.bind(this, 1) },
                            React.createElement("div", { className: this.state.typeIndex == 1 ? "leasetype_li_on" : "leasetype_li" },
                                React.createElement("p", { style: { "padding-top": "6px" } }, "100m\u00B2\u4EE5\u4E0B"),
                                React.createElement("p", null,
                                    React.createElement("span", null, "XX"),
                                    "\u5957"))),
                        React.createElement("li", { onClick: this.leasetypeIndex.bind(this, 2) },
                            React.createElement("div", { className: this.state.typeIndex == 2 ? "leasetype_li_on" : "leasetype_li" },
                                React.createElement("p", { style: { "padding-top": "6px" } }, "100-200m\u00B2"),
                                React.createElement("p", null,
                                    React.createElement("span", null, "XX"),
                                    "\u5957"))),
                        React.createElement("li", { onClick: this.leasetypeIndex.bind(this, 3) },
                            React.createElement("div", { className: this.state.typeIndex == 3 ? "leasetype_li_on" : "leasetype_li" },
                                React.createElement("p", { style: { "padding-top": "6px" } }, "300-500m\u00B2"),
                                React.createElement("p", null,
                                    React.createElement("span", null, "XX"),
                                    "\u5957"))))),
                React.createElement("div", { className: "leaseRoomList" },
                    React.createElement("ul", null,
                        React.createElement("li", { onClick: this.onLeaseRoom.bind(this, 0) },
                            React.createElement("div", { className: this.state.leaseRoomsState == 0 ? "leaseRooms_on" : "leaseRooms" },
                                React.createElement("img", { src: "./fangliangbao/image/demo.png" }),
                                React.createElement("div", { className: "leaseRoomsRight" },
                                    React.createElement("p", { className: "leaseName" }, "\u51FA\u79DF\u9AD8\u65B0\u533A\u4FE1\u606F\u4EA7\u4E1A\u56ED\u798F\u5EFA\u5E08\u8303"),
                                    React.createElement("p", null,
                                        React.createElement("span", { className: "leasePrice" }, "80.3"),
                                        " \u5143/m\u00B2\u22C5\u6708"),
                                    React.createElement("p", { className: "leaseArea" }, "187m\u00B2")))),
                        React.createElement("li", { onClick: this.onLeaseRoom.bind(this, 1) },
                            React.createElement("div", { className: this.state.leaseRoomsState == 1 ? "leaseRooms_on" : "leaseRooms" },
                                React.createElement("img", { src: "./fangliangbao/image/demo.png" }),
                                React.createElement("div", { className: "leaseRoomsRight" },
                                    React.createElement("p", { className: "leaseName" }, "\u51FA\u79DF\u9AD8\u65B0\u533A\u4FE1\u606F\u4EA7\u4E1A\u56ED\u798F\u5EFA\u5E08\u8303"),
                                    React.createElement("p", null,
                                        React.createElement("span", { className: "leasePrice" }, "80.3"),
                                        " \u5143/m\u00B2\u22C5\u6708"),
                                    React.createElement("p", { className: "leaseArea" }, "187m\u00B2")))),
                        React.createElement("li", { onClick: this.onLeaseRoom.bind(this, 2) },
                            React.createElement("div", { className: this.state.leaseRoomsState == 2 ? "leaseRooms_on" : "leaseRooms" },
                                React.createElement("img", { src: "./fangliangbao/image/demo.png" }),
                                React.createElement("div", { className: "leaseRoomsRight" },
                                    React.createElement("p", { className: "leaseName" }, "\u51FA\u79DF\u9AD8\u65B0\u533A\u4FE1\u606F\u4EA7\u4E1A\u56ED\u798F\u5EFA\u5E08\u8303"),
                                    React.createElement("p", null,
                                        React.createElement("span", { className: "leasePrice" }, "80.3"),
                                        " \u5143/m\u00B2\u22C5\u6708"),
                                    React.createElement("p", { className: "leaseArea" }, "187m\u00B2"))))))));
        }
    }
    class SellList extends React.Component {
        constructor(props) {
            super(props);
            this.state = {
                typeIndex: 0,
                sellRoomsState: -1,
            };
        }
        componentDidMount() {
        }
        onSellRoom(index) {
            ParkInfoThree.showRoomInfo();
            this.setState({
                sellRoomsState: index
            });
        }
        selltypeIndex(index) {
            this.setState({
                typeIndex: index,
            });
        }
        render() {
            return (React.createElement("div", { className: "leaseListBox" },
                React.createElement("div", { className: "leasetype" },
                    React.createElement("ul", null,
                        React.createElement("li", { onClick: this.selltypeIndex.bind(this, 0) },
                            React.createElement("div", { className: this.state.typeIndex == 0 ? "leasetype_li_on" : "leasetype_li" },
                                React.createElement("p", { style: { "padding-top": "6px" } }, "\u5168\u90E8\u6237\u578B"),
                                React.createElement("p", null,
                                    React.createElement("span", null, "XX"),
                                    "\u5957"))),
                        React.createElement("li", { onClick: this.selltypeIndex.bind(this, 1) },
                            React.createElement("div", { className: this.state.typeIndex == 1 ? "leasetype_li_on" : "leasetype_li" },
                                React.createElement("p", { style: { "padding-top": "6px" } }, "100m\u00B2\u4EE5\u4E0B"),
                                React.createElement("p", null,
                                    React.createElement("span", null, "XX"),
                                    "\u5957"))),
                        React.createElement("li", { onClick: this.selltypeIndex.bind(this, 2) },
                            React.createElement("div", { className: this.state.typeIndex == 2 ? "leasetype_li_on" : "leasetype_li" },
                                React.createElement("p", { style: { "padding-top": "6px" } }, "100-200m\u00B2"),
                                React.createElement("p", null,
                                    React.createElement("span", null, "XX"),
                                    "\u5957"))),
                        React.createElement("li", { onClick: this.selltypeIndex.bind(this, 3) },
                            React.createElement("div", { className: this.state.typeIndex == 3 ? "leasetype_li_on" : "leasetype_li" },
                                React.createElement("p", { style: { "padding-top": "6px" } }, "300-500m\u00B2"),
                                React.createElement("p", null,
                                    React.createElement("span", null, "XX"),
                                    "\u5957"))))),
                React.createElement("div", { className: "leaseRoomList" },
                    React.createElement("ul", null,
                        React.createElement("li", { onClick: this.onSellRoom.bind(this, 0) },
                            React.createElement("div", { className: this.state.sellRoomsState == 0 ? "leaseRooms_on" : "leaseRooms" },
                                React.createElement("img", { src: "./fangliangbao/image/demo.png" }),
                                React.createElement("div", { className: "leaseRoomsRight" },
                                    React.createElement("p", { className: "leaseName" }, "\u51FA\u79DF\u9AD8\u65B0\u533A\u4FE1\u606F\u4EA7\u4E1A\u56ED\u798F\u5EFA\u5E08\u8303"),
                                    React.createElement("p", null,
                                        React.createElement("span", { className: "leasePrice" }, "80.3"),
                                        " \u5143/m\u00B2\u22C5\u6708"),
                                    React.createElement("p", { className: "leaseArea" }, "187m\u00B2")))),
                        React.createElement("li", { onClick: this.onSellRoom.bind(this, 1) },
                            React.createElement("div", { className: this.state.sellRoomsState == 1 ? "leaseRooms_on" : "leaseRooms" },
                                React.createElement("img", { src: "./fangliangbao/image/demo.png" }),
                                React.createElement("div", { className: "leaseRoomsRight" },
                                    React.createElement("p", { className: "leaseName" }, "\u51FA\u79DF\u9AD8\u65B0\u533A\u4FE1\u606F\u4EA7\u4E1A\u56ED\u798F\u5EFA\u5E08\u8303"),
                                    React.createElement("p", null,
                                        React.createElement("span", { className: "leasePrice" }, "80.3"),
                                        " \u5143/m\u00B2\u22C5\u6708"),
                                    React.createElement("p", { className: "leaseArea" }, "187m\u00B2")))),
                        React.createElement("li", { onClick: this.onSellRoom.bind(this, 2) },
                            React.createElement("div", { className: this.state.sellRoomsState == 2 ? "leaseRooms_on" : "leaseRooms" },
                                React.createElement("img", { src: "./fangliangbao/image/demo.png" }),
                                React.createElement("div", { className: "leaseRoomsRight" },
                                    React.createElement("p", { className: "leaseName" }, "\u51FA\u79DF\u9AD8\u65B0\u533A\u4FE1\u606F\u4EA7\u4E1A\u56ED\u798F\u5EFA\u5E08\u8303"),
                                    React.createElement("p", null,
                                        React.createElement("span", { className: "leasePrice" }, "80.3"),
                                        " \u5143/m\u00B2\u22C5\u6708"),
                                    React.createElement("p", { className: "leaseArea" }, "187m\u00B2"))))))));
        }
    }
    class CompanyList extends React.Component {
        constructor(props) {
            super(props);
            this.state = {
                typeIndex: 0,
                companyState: -1,
            };
        }
        componentDidMount() {
        }
        onCompany(index) {
            ParkInfoThree.showCompanyInfo();
            this.setState({
                companyState: index
            });
        }
        companytypeIndex(index) {
            this.setState({
                typeIndex: index,
            });
        }
        render() {
            return (React.createElement("div", { className: "leaseListBox" },
                React.createElement("div", { className: "leasetype" },
                    React.createElement("ul", null,
                        React.createElement("li", { onClick: this.companytypeIndex.bind(this, 0), className: this.state.typeIndex == 0 ? "companytype_li_on" : "companytype_li" }, "\u5168\u90E8"),
                        React.createElement("li", { onClick: this.companytypeIndex.bind(this, 1), className: this.state.typeIndex == 1 ? "companytype_li_on" : "companytype_li" }, "\u9AD8\u65B0\u6280\u672F"),
                        React.createElement("li", { onClick: this.companytypeIndex.bind(this, 2), className: this.state.typeIndex == 2 ? "companytype_li_on" : "companytype_li" }, "\u79D1\u6280\u670D\u52A1"),
                        React.createElement("li", { onClick: this.companytypeIndex.bind(this, 3), className: this.state.typeIndex == 3 ? "companytype_li_on" : "companytype_li" }, "\u91D1\u878D\u4FDD\u9669"))),
                React.createElement("div", { className: "leaseRoomList" },
                    React.createElement("ul", null,
                        React.createElement("li", { onClick: this.onCompany.bind(this, 0) },
                            React.createElement("div", { className: this.state.companyState == 0 ? "leaseRooms_on" : "leaseRooms" },
                                React.createElement("img", { src: "./fangliangbao/image/demo.png" }),
                                React.createElement("div", { className: "leaseRoomsRight" },
                                    React.createElement("p", { className: "leaseName" }, "\u6D59\u6C5F\u6C38\u62D3\u4FE1\u606F\u79D1\u6280\u6709\u9650\u516C\u4F0F\u89C1\u53F8\u64AD\u653E\u7ED3\u675F\u7684"),
                                    React.createElement("p", { className: "leaseArea", style: { "margin": "3px 0" } },
                                        React.createElement("i", { className: "iconfont ", style: { "font-size": "12px", "color": "rgba(207, 209, 210, 1)" } }, "\uE83C"),
                                        "E\u5EA7B\u533A-3F-301"),
                                    React.createElement("p", { className: "leaseArea" },
                                        React.createElement("i", { className: "iconfont ", style: { "font-size": "12px", "color": "rgba(207, 209, 210, 1)" } }, "\uE83C"),
                                        "\u79D1\u6280\u670D\u52A1")))),
                        React.createElement("li", { onClick: this.onCompany.bind(this, 1) },
                            React.createElement("div", { className: this.state.companyState == 1 ? "leaseRooms_on" : "leaseRooms" },
                                React.createElement("img", { src: "./fangliangbao/image/demo.png" }),
                                React.createElement("div", { className: "leaseRoomsRight" },
                                    React.createElement("p", { className: "leaseName" }, "\u6D59\u6C5F\u6C38\u62D3\u4FE1\u606F\u79D1\u6280\u6709\u9650\u516C\u4F0F\u89C1\u53F8\u64AD\u653E\u7ED3\u675F\u7684"),
                                    React.createElement("p", { className: "leaseArea", style: { "margin": "3px 0" } },
                                        React.createElement("i", { className: "iconfont ", style: { "font-size": "12px", "color": "rgba(207, 209, 210, 1)" } }, "\uE83C"),
                                        "E\u5EA7B\u533A-3F-301"),
                                    React.createElement("p", { className: "leaseArea" },
                                        React.createElement("i", { className: "iconfont ", style: { "font-size": "12px", "color": "rgba(207, 209, 210, 1)" } }, "\uE83C"),
                                        "\u79D1\u6280\u670D\u52A1")))),
                        React.createElement("li", { onClick: this.onCompany.bind(this, 2) },
                            React.createElement("div", { className: this.state.companyState == 2 ? "leaseRooms_on" : "leaseRooms" },
                                React.createElement("img", { src: "./fangliangbao/image/demo.png" }),
                                React.createElement("div", { className: "leaseRoomsRight" },
                                    React.createElement("p", { className: "leaseName" }, "\u6D59\u6C5F\u6C38\u62D3\u4FE1\u606F\u79D1\u6280\u6709\u9650\u516C\u4F0F\u89C1\u53F8\u64AD\u653E\u7ED3\u675F\u7684"),
                                    React.createElement("p", { className: "leaseArea", style: { "margin": "3px 0" } },
                                        React.createElement("i", { className: "iconfont ", style: { "font-size": "12px", "color": "rgba(207, 209, 210, 1)" } }, "\uE83C"),
                                        "E\u5EA7B\u533A-3F-301"),
                                    React.createElement("p", { className: "leaseArea" },
                                        React.createElement("i", { className: "iconfont ", style: { "font-size": "12px", "color": "rgba(207, 209, 210, 1)" } }, "\uE83C"),
                                        "\u79D1\u6280\u670D\u52A1"))))))));
        }
    }
    class ParkInfoThree extends React.Component {
        constructor(props) {
            super(props);
            this.state = {
                RoomInfoState: "hide",
                rightBox: "ParkInfoThree_rightBox"
            };
            ParkInfoThree.showRoomInfo = this.showRoomInfo.bind(this);
            ParkInfoThree.showCompanyInfo = this.showCompanyInfo.bind(this);
            ParkInfoThree.rightBox_up = this.rightBox_up.bind(this);
            ParkInfoThree.rightBox_up2 = this.rightBox_up2.bind(this);
            ParkInfoThree.rightBox_up3 = this.rightBox_up3.bind(this);
        }
        componentDidMount() {
        }
        static showRoomInfo() { }
        ;
        showRoomInfo() {
            this.setState({
                RoomInfoState: "RoomInfoShow",
                rightBox: "ParkInfoThree_rightBox_up"
            });
        }
        static showCompanyInfo() { }
        ;
        showCompanyInfo() {
            this.setState({
                RoomInfoState: "CompanyInfoShow",
                rightBox: "ParkInfoThree_rightBox_up"
            });
        }
        static rightBox_up() { }
        ;
        rightBox_up() {
            this.setState({
                rightBox: "ParkInfoThree_rightBox_up"
            });
        }
        static rightBox_up2() { }
        ;
        rightBox_up2() {
            this.setState({
                rightBox: "ParkInfoThree_rightBox_up2"
            });
        }
        static rightBox_up3() { }
        ;
        rightBox_up3() {
            this.setState({
                rightBox: "ParkInfoThree_rightBox_up3"
            });
        }
        render() {
            return (React.createElement("div", { className: "ParkInfoThree" },
                React.createElement("div", { className: "ParkInfoThree_leftBox" },
                    this.state.RoomInfoState == "RoomInfoShow" ?
                        React.createElement(RoomInfoThreeLeft, null)
                        :
                            null,
                    this.state.RoomInfoState == "CompanyInfoShow" ?
                        React.createElement(CompanyInfoThreeLeft, null)
                        :
                            null,
                    React.createElement(ParkInfoThreeLeft, null)),
                React.createElement("div", { className: this.state.rightBox },
                    React.createElement(ParkInfoThreeRight, null))));
        }
    }
    class ParkInfoThreeLeft extends React.Component {
        constructor(props) {
            super(props);
            this.state = {
                ParkInfoIndex: 0
            };
        }
        componentDidMount() {
        }
        ParkInfoOn(index) {
            this.setState({
                ParkInfoIndex: index
            });
        }
        render() {
            return (React.createElement("div", { className: "ParkInfoThree_left" },
                React.createElement("div", { className: "ParkInfoThree_left_title" },
                    React.createElement("ul", null,
                        React.createElement("li", { className: this.state.ParkInfoIndex == 0 ? "ParkInfoIndex_in" : null, onClick: this.ParkInfoOn.bind(this, 0) }, "\u56ED\u533A\u4ECB\u7ECD"),
                        React.createElement("li", { className: this.state.ParkInfoIndex == 1 ? "ParkInfoIndex_in" : null, onClick: this.ParkInfoOn.bind(this, 1) }, "\u533A\u4F4D\u4F18\u52BF"),
                        React.createElement("li", { className: this.state.ParkInfoIndex == 2 ? "ParkInfoIndex_in" : null, onClick: this.ParkInfoOn.bind(this, 2) }, "\u4F18\u60E0\u653F\u7B56"),
                        React.createElement("li", { className: this.state.ParkInfoIndex == 3 ? "ParkInfoIndex_in" : null, onClick: this.ParkInfoOn.bind(this, 3) }, "\u56ED\u533A\u98CE\u91C7"))),
                React.createElement("div", { className: "ParkInfoThree_left_text" },
                    this.state.ParkInfoIndex == 0 ?
                        React.createElement("div", { className: "ParkInfo_text parkIntroduced", id: "parkIntroduced" },
                            React.createElement("p", null, "\u5730\u5904\u5E7F\u5DDE\u3001\u987A\u5FB7\u3001\u4E2D\u5C71\u3001\u4E1C\u839E\u3001\u73E0\u6D77\u3001\u6DF1\u5733\u7B49\u5730\u4E4B\u67A2\u7EBD\uFF0C\u5360\u8E1E\u756A\u79BA\u7684\u6838\u5FC3\u4F4D\u7F6E\u3002\u524D\u8EAB\u662F\u6C38\u9686\u5236\u8863\u5382\uFF0C2010\u5E74\u7ECF\u6539\u9020\uFF0C\u6210\u4E3A\u4E86\u9752\u74E6\u767D\u5899\uFF0C\u8BD7\u60C5\u753B\u610F\u7684\u521B\u610F\u56ED\u533A\u3002 \u4EA7\u4E1A\u56ED\u53D6\u540D\u82B1\u57CE\uFF0C\u96C6\u5408\u4E86\u7EFF\u8272\u82B1\u57CE\u3001\u5386\u53F2\u82B1"),
                            React.createElement("p", null, "\u5730\u5904\u5E7F\u5DDE\u3001\u987A\u5FB7\u3001\u4E2D\u5C71\u3001\u4E1C\u839E\u3001\u73E0\u6D77\u3001\u6DF1\u5733\u7B49\u5730\u4E4B\u67A2\u7EBD\uFF0C\u5360\u8E1E\u756A\u79BA\u7684\u6838\u5FC3\u4F4D\u7F6E\u3002\u524D\u8EAB\u662F\u6C38\u9686\u5236\u8863\u5382\uFF0C2010\u5E74\u7ECF\u6539\u9020\uFF0C\u6210\u4E3A\u4E86\u9752\u74E6\u767D\u5899\uFF0C\u8BD7\u60C5\u753B\u610F\u7684\u521B\u610F\u56ED\u533A\u3002 \u4EA7\u4E1A\u56ED\u53D6\u540D\u82B1\u57CE\uFF0C\u96C6\u5408\u4E86\u7EFF\u8272\u82B1\u57CE\u3001\u5386\u53F2\u82B1\uFF0C\u5730\u5904\u5E7F\u5DDE\u3001\u987A\u5FB7\u3001\u4E2D\u5C71\u3001\u4E1C\u839E\u3001\u73E0\u6D77\u3001\u6DF1\u5733\u7B49\u5730\u4E4B\u67A2\u7EBD\uFF0C\u5360\u8E1E\u756A\u79BA\u7684\u6838\u5FC3\u4F4D\u7F6E\u3002\u524D\u8EAB\u662F\u6C38\u9686\u5236\u8863\u5382\uFF0C2010\u5E74\u7ECF\u6539\u9020\uFF0C\u6210\u4E3A\u4E86\u9752\u74E6\u767D\u5899\uFF0C\u8BD7\u60C5\u753B\u610F\u7684\u521B\u610F\u56ED\u533A\u3002 \u4EA7\u4E1A\u56ED\u53D6\u540D\u82B1\u57CE\uFF0C\u96C6\u5408\u4E86\u7EFF\u8272\u82B1\u57CE\u3001\u5386\u53F2\u82B1"),
                            React.createElement("p", null, "\u5730\u5904\u5E7F\u5DDE\u3001\u987A\u5FB7\u3001\u4E2D\u5C71\u3001\u4E1C\u839E\u3001\u73E0\u6D77\u3001\u6DF1\u5733\u7B49\u5730\u4E4B\u67A2\u7EBD\uFF0C\u5360\u8E1E\u756A\u79BA\u7684\u6838\u5FC3\u4F4D\u7F6E\u3002\u524D\u8EAB\u662F\u6C38\u9686\u5236\u8863\u5382\uFF0C2010\u5E74\u7ECF\u6539\u9020\uFF0C\u6210\u4E3A\u4E86\u9752\u74E6\u767D\u5899\uFF0C\u8BD7\u60C5\u753B\u610F\u7684\u521B\u610F\u56ED\u533A\u3002 \u4EA7\u4E1A\u56ED\u53D6\u540D\u82B1\u57CE\uFF0C\u96C6\u5408\u4E86\u7EFF\u8272\u82B1\u57CE\u3001\u5386\u53F2\u82B1"))
                        : null,
                    this.state.ParkInfoIndex == 1 ?
                        React.createElement("div", { className: "ParkInfo_text advantage", id: "advantage" },
                            React.createElement("p", null, "\u5730\u5904\u5E7F\u5DDE\u3001\u987A\u5FB7\u3001\u4E2D\u5C71\u3001\u4E1C\u839E\u3001\u73E0\u6D77\u3001\u6DF1\u5733\u7B49\u5730\u4E4B\u67A2\u7EBD\uFF0C\u5360\u8E1E\u756A\u79BA\u7684\u6838\u5FC3\u4F4D\u7F6E\u3002\u524D\u8EAB\u662F\u6C38\u9686\u5236\u8863\u5382\uFF0C2010\u5E74\u7ECF\u6539\u9020\uFF0C\u6210\u4E3A\u4E86\u9752\u74E6\u767D\u5899\uFF0C\u8BD7\u60C5\u753B\u610F\u7684\u521B\u610F\u56ED\u533A\u3002 \u4EA7\u4E1A\u56ED\u53D6\u540D\u82B1\u57CE\uFF0C\u96C6\u5408\u4E86\u7EFF\u8272\u82B1\u57CE\u3001\u5386\u53F2\u82B1"),
                            React.createElement("p", null, "\u5730\u5904\u5E7F\u5DDE\u3001\u987A\u5FB7\u3001\u4E2D\u5C71\u3001\u4E1C\u839E\u3001\u73E0\u6D77\u3001\u6DF1\u5733\u7B49\u5730\u4E4B\u67A2\u7EBD\uFF0C\u5360\u8E1E\u756A\u79BA\u7684\u6838\u5FC3\u4F4D\u7F6E\u3002\u524D\u8EAB\u662F\u6C38\u9686\u5236\u8863\u5382\uFF0C2010\u5E74\u7ECF\u6539\u9020\uFF0C\u6210\u4E3A\u4E86\u9752\u74E6\u767D\u5899\uFF0C\u8BD7\u60C5\u753B\u610F\u7684\u521B\u610F\u56ED\u533A\u3002 \u4EA7\u4E1A\u56ED\u53D6\u540D\u82B1\u57CE\uFF0C\u96C6\u5408\u4E86\u7EFF\u8272\u82B1\u57CE\u3001\u5386\u53F2\u82B1"))
                        : null,
                    this.state.ParkInfoIndex == 2 ?
                        React.createElement("div", { className: "ParkInfo_text discounts", id: "discounts" },
                            React.createElement("p", null, "\u5730\u5904\u5E7F\u5DDE\u3001\u987A\u5FB7\u3001\u4E2D\u5C71\u3001\u4E1C\u839E\u3001\u73E0\u6D77\u3001\u6DF1\u5733\u7B49\u5730\u4E4B\u67A2\u7EBD\uFF0C\u5360\u8E1E\u756A\u79BA\u7684\u6838\u5FC3\u4F4D\u7F6E\u3002\u524D\u8EAB\u662F\u6C38\u9686\u5236\u8863\u5382\uFF0C2010\u5E74\u7ECF\u6539\u9020\uFF0C\u6210\u4E3A\u4E86\u9752\u74E6\u767D\u5899\uFF0C\u8BD7\u60C5\u753B\u610F\u7684\u521B\u610F\u56ED\u533A\u3002 \u4EA7\u4E1A\u56ED\u53D6\u540D\u82B1\u57CE\uFF0C\u96C6\u5408\u4E86\u7EFF\u8272\u82B1\u57CE\u3001\u5386\u53F2\u82B1"))
                        : null,
                    this.state.ParkInfoIndex == 3 ?
                        React.createElement("div", { className: "ParkInfo_text parkElegant", id: "parkElegant" },
                            React.createElement("div", { className: "infoImg" },
                                React.createElement("div", { className: "infoImg_left" },
                                    React.createElement("i", { className: "iconfont " }, "\uE83C")),
                                React.createElement("div", { className: "infoImg_ul" },
                                    React.createElement("ul", null,
                                        React.createElement("li", null,
                                            " ",
                                            React.createElement("img", { src: "./fangliangbao/image/demo.png" })),
                                        React.createElement("li", null,
                                            " ",
                                            React.createElement("img", { src: "./fangliangbao/image/demo.png" })),
                                        React.createElement("li", null,
                                            " ",
                                            React.createElement("img", { src: "./fangliangbao/image/demo.png" })))),
                                React.createElement("p", { className: "infoImg_num" },
                                    React.createElement("span", null, "2"),
                                    " / ",
                                    React.createElement("span", null, "8")),
                                React.createElement("div", { className: "infoImg_right" },
                                    React.createElement("i", { className: "iconfont " }, "\uE83C"))))
                        : null)));
        }
    }
    class RoomInfoThreeLeft extends React.Component {
        constructor(props) {
            super(props);
            this.state = {
                RoomInfoIndex: 0,
                RoomInfoThreeLeft: "RoomInfoThreeLeft_part"
            };
        }
        componentDidMount() {
        }
        roomInfoOn(index) {
            console.log('roomInfoOn', index);
            if (index == 1) {
                this.setState({
                    RoomInfoThreeLeft: "RoomInfoThreeLeft_all",
                    RoomInfoIndex: index,
                });
            }
            else if (index == 2) {
                this.setState({
                    RoomInfoThreeLeft: "RoomInfoThreeLeft_all",
                    RoomInfoIndex: index,
                });
            }
            else {
                console.log('roomInfoOn0000', index);
                this.setState({
                    RoomInfoThreeLeft: "RoomInfoThreeLeft_part",
                    RoomInfoIndex: index,
                });
            }
        }
        render() {
            return (React.createElement("div", { className: this.state.RoomInfoThreeLeft },
                React.createElement("div", { className: "ParkInfoThree_left_title" },
                    React.createElement("ul", null,
                        React.createElement("li", { className: this.state.RoomInfoIndex == 0 ? "ParkInfoIndex_in" : null, onClick: this.roomInfoOn.bind(this, 0) }, "\u623F\u6E90\u6982\u51B5"),
                        React.createElement("li", { className: this.state.RoomInfoIndex == 1 ? "ParkInfoIndex_in" : null, onClick: this.roomInfoOn.bind(this, 1) }, "\u5B9E\u62CD\u7167\u7247"),
                        React.createElement("li", { className: this.state.RoomInfoIndex == 2 ? "ParkInfoIndex_in" : null, onClick: this.roomInfoOn.bind(this, 2) }, "\u5B9E\u62CD\u89C6\u9891"))),
                this.state.RoomInfoIndex == 0 ?
                    React.createElement("div", { className: "roomInfoBox" },
                        React.createElement("ul", { className: "roomInfoBox_one" },
                            React.createElement("li", null,
                                React.createElement("span", null, "98"),
                                " \u5143/m\u00B2\u22C5\u6708"),
                            React.createElement("li", null,
                                "\u603B\u4EF7\uFF1A",
                                React.createElement("span", null, "19,600\u202C"),
                                " \u5143/m\u00B2\u22C5\u6708"),
                            React.createElement("li", null,
                                React.createElement("p", null, "\u5EFA\u7B51\u9762\u79EF"),
                                React.createElement("p", null,
                                    React.createElement("span", null, "200"),
                                    "m\u00B2")),
                            React.createElement("li", null,
                                React.createElement("p", null, "\u53EF\u5BB9\u7EB3\u5DE5\u4F4D"),
                                React.createElement("p", null,
                                    React.createElement("span", null, "29~58"),
                                    "\u4E2A\u5DE5\u4F4D")),
                            React.createElement("li", null,
                                React.createElement("p", null, "\u88C5\u4FEE\u7A0B\u5EA6"),
                                React.createElement("p", null, "\u4E2D\u7B49\u88C5\u4FEE"))),
                        React.createElement("ul", { className: "roomInfoBox_two" },
                            React.createElement("li", null,
                                "\u514D\u79DF\u65F6\u95F4 ",
                                React.createElement("span", null, "\u9762\u8BAE")),
                            React.createElement("li", null,
                                "\u603B\u5171\u697C\u5C42 ",
                                React.createElement("span", null, "12\u5C42")),
                            React.createElement("li", null,
                                "\u6240\u5728\u697C\u5C42 ",
                                React.createElement("span", null, "6\u5C42")),
                            React.createElement("li", null,
                                "\u7535\u68AF ",
                                React.createElement("span", null, "\u6709\u7535\u68AF")),
                            React.createElement("li", null,
                                "\u770B\u623F\u65F6\u95F4 ",
                                React.createElement("span", null, "\u8054\u7CFB\u987E\u95EE\uFF0C\u968F\u65F6\u53EF\u770B")),
                            React.createElement("li", null,
                                "\u66F4\u65B0\u65F6\u95F4 ",
                                React.createElement("span", null, "14\u5C0F\u65F6\u524D"))))
                    : null,
                this.state.RoomInfoIndex == 1 ?
                    React.createElement("div", { className: "infoImg" },
                        React.createElement("div", { className: "infoImg_left" },
                            React.createElement("i", { className: "iconfont " }, "\uE83C")),
                        React.createElement("div", { className: "infoImg_ul" },
                            React.createElement("ul", null,
                                React.createElement("li", null,
                                    " ",
                                    React.createElement("img", { src: "./fangliangbao/image/demo.png" })),
                                React.createElement("li", null,
                                    " ",
                                    React.createElement("img", { src: "./fangliangbao/image/demo.png" })),
                                React.createElement("li", null,
                                    " ",
                                    React.createElement("img", { src: "./fangliangbao/image/demo.png" })))),
                        React.createElement("p", { className: "infoImg_num" },
                            React.createElement("span", null, "2"),
                            " / ",
                            React.createElement("span", null, "8")),
                        React.createElement("div", { className: "infoImg_rightt" },
                            React.createElement("i", { className: "iconfont " }, "\uE83C")))
                    : null,
                this.state.RoomInfoIndex == 2 ?
                    React.createElement("div", { className: "infoImg" },
                        React.createElement("div", { className: "infoImg_left" },
                            React.createElement("i", { className: "iconfont " }, "\uE83C")),
                        React.createElement("div", { className: "infoImg_ul" },
                            React.createElement("ul", null,
                                React.createElement("li", null,
                                    " ",
                                    React.createElement("img", { src: "./fangliangbao/image/demo.png" })),
                                React.createElement("li", null,
                                    " ",
                                    React.createElement("img", { src: "./fangliangbao/image/demo.png" })),
                                React.createElement("li", null,
                                    " ",
                                    React.createElement("img", { src: "./fangliangbao/image/demo.png" })))),
                        React.createElement("p", { className: "infoImg_num" },
                            React.createElement("span", null, "2"),
                            " / ",
                            React.createElement("span", null, "8")),
                        React.createElement("div", { className: "infoImg_rightt" },
                            React.createElement("i", { className: "iconfont " }, "\uE83C")))
                    : null));
        }
    }
    class CompanyInfoThreeLeft extends React.Component {
        constructor(props) {
            super(props);
            this.state = {
                RoomInfoIndex: 0,
                RoomInfoThreeLeft: "RoomInfoThreeLeft_part"
            };
        }
        componentDidMount() {
        }
        roomInfoOn(index) {
            this.setState({
                RoomInfoIndex: index,
            });
        }
        render() {
            return (React.createElement("div", { className: "RoomInfoThreeLeft" },
                React.createElement("div", { className: "ParkInfoThree_left_title" },
                    React.createElement("ul", null,
                        React.createElement("li", { className: this.state.RoomInfoIndex == 0 ? "ParkInfoIndex_in" : null, onClick: this.roomInfoOn.bind(this, 0) }, "\u4F01\u4E1A\u4FE1\u606F"),
                        React.createElement("li", { className: this.state.RoomInfoIndex == 1 ? "ParkInfoIndex_in" : null, onClick: this.roomInfoOn.bind(this, 1) }, "\u4F01\u4E1A\u98CE\u91C7"),
                        React.createElement("li", { className: this.state.RoomInfoIndex == 2 ? "ParkInfoIndex_in" : null, onClick: this.roomInfoOn.bind(this, 2) }, "\u4F01\u4E1A\u8BE6\u60C5"),
                        React.createElement("li", { className: this.state.RoomInfoIndex == 3 ? "ParkInfoIndex_in" : null, onClick: this.roomInfoOn.bind(this, 3) }, "\u4EA7\u54C1\u5C55\u793A"))),
                this.state.RoomInfoIndex == 0 ?
                    React.createElement("div", null, "\"000000000\"")
                    : null,
                this.state.RoomInfoIndex == 1 ?
                    React.createElement("div", { className: "infoImg" },
                        React.createElement("div", { className: "infoImg_left" },
                            React.createElement("i", { className: "iconfont " }, "\uE83C")),
                        React.createElement("div", { className: "infoImg_ul" },
                            React.createElement("ul", null,
                                React.createElement("li", null,
                                    " ",
                                    React.createElement("img", { src: "./fangliangbao/image/demo.png" })),
                                React.createElement("li", null,
                                    " ",
                                    React.createElement("img", { src: "./fangliangbao/image/demo.png" })),
                                React.createElement("li", null,
                                    " ",
                                    React.createElement("img", { src: "./fangliangbao/image/demo.png" })))),
                        React.createElement("p", { className: "infoImg_num" },
                            React.createElement("span", null, "2"),
                            " / ",
                            React.createElement("span", null, "8")),
                        React.createElement("div", { className: "infoImg_rightt" },
                            React.createElement("i", { className: "iconfont " }, "\uE83C")))
                    : null,
                this.state.RoomInfoIndex == 2 ?
                    React.createElement("div", { className: "infoImg" },
                        React.createElement("div", { className: "infoImg_left" },
                            React.createElement("i", { className: "iconfont " }, "\uE83C")),
                        React.createElement("div", { className: "infoImg_ul" },
                            React.createElement("ul", null,
                                React.createElement("li", null,
                                    " ",
                                    React.createElement("img", { src: "./fangliangbao/image/demo.png" })),
                                React.createElement("li", null,
                                    " ",
                                    React.createElement("img", { src: "./fangliangbao/image/demo.png" })),
                                React.createElement("li", null,
                                    " ",
                                    React.createElement("img", { src: "./fangliangbao/image/demo.png" })))),
                        React.createElement("p", { className: "infoImg_num" },
                            React.createElement("span", null, "2"),
                            " / ",
                            React.createElement("span", null, "8")),
                        React.createElement("div", { className: "infoImg_rightt" },
                            React.createElement("i", { className: "iconfont " }, "\uE83C")))
                    : null,
                this.state.RoomInfoIndex == 3 ?
                    React.createElement("div", { className: "infoImg" },
                        React.createElement("div", { className: "infoImg_left" },
                            React.createElement("i", { className: "iconfont " }, "\uE83C")),
                        React.createElement("div", { className: "infoImg_ul" },
                            React.createElement("ul", null,
                                React.createElement("li", null,
                                    " ",
                                    React.createElement("img", { src: "./fangliangbao/image/demo.png" })),
                                React.createElement("li", null,
                                    " ",
                                    React.createElement("img", { src: "./fangliangbao/image/demo.png" })),
                                React.createElement("li", null,
                                    " ",
                                    React.createElement("img", { src: "./fangliangbao/image/demo.png" })))),
                        React.createElement("p", { className: "infoImg_num" },
                            React.createElement("span", null, "2"),
                            " / ",
                            React.createElement("span", null, "8")),
                        React.createElement("div", { className: "infoImg_rightt" },
                            React.createElement("i", { className: "iconfont " }, "\uE83C")))
                    : null));
        }
    }
    class ParkInfoThreeRight extends React.Component {
        constructor(props) {
            super(props);
            this.state = {};
        }
        componentDidMount() {
        }
        render() {
            return (React.createElement("div", { className: "ParkInfoThree_right" },
                React.createElement("p", null, "\u54A8\u8BE2\u987E\u95EE"),
                React.createElement("div", { className: "ParkInfoThree_right_one" },
                    React.createElement("img", { src: "" }),
                    React.createElement("p", null, "name"),
                    React.createElement("div", null, "\u8BE5\u56ED\u533A\u4E0E\u623F\u6E90\u7531\u6211\u7EF4\u62A4\uFF0C\u719F\u77E5\u56ED\u533A\u653F\u7B56\u4E0E\u5468\u8FB9\u73AF\u5883"),
                    React.createElement("p", null,
                        "\u514D\u8D39\u54A8\u8BE2 ",
                        React.createElement("span", null, "15578380203"))),
                React.createElement("div", { className: "ParkInfoThree_right_two" },
                    React.createElement("p", null, "\u5B9D\u54E5\u5E2E\u627E\u623F"),
                    React.createElement("p", null,
                        React.createElement("i", { className: "iconfont ", style: { "margin-right": "5px", "font-size": "14px" } }, "\uE83C"),
                        React.createElement("input", { type: "text", value: "\u8F93\u5165\u60A8\u7684\u624B\u673A\u53F7\u7801" }))),
                React.createElement("div", { className: "ParkInfoThree_right_three" },
                    React.createElement("textarea", { value: "\u5982\uFF1A\u5728\u5E7F\u5DDE\u767D\u4E91\u533A\u5BFB\u627E200m2\u5DE6\u53F3\u7684\u529E\u516C\u5BA4\uFF0C\u79DF\u91D1\u572880\u5143/m2\u00B7\u5929\uFF0C\u4E34\u8FD1\u5730\u94C1\u7AD9\u3002" }),
                    React.createElement("input", { type: "button" }))));
        }
    }
    exports.default = ParkInfo;
});
define("ParkInfo (4)", ["require", "exports", "react", "HomeTop", "allBottom", "InfoTitle"], function (require, exports, React, HomeTop_4, AllBottom_4, InfoTitle_3) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    class ParkInfo extends React.Component {
        constructor(props) {
            super(props);
            this.state = {};
        }
        render() {
            return (React.createElement("div", null,
                React.createElement(HomeTop_4.default, null),
                React.createElement("div", { className: "parkInfo" },
                    React.createElement("div", { className: "parkInfoBox_title" },
                        React.createElement(InfoTitle_3.default, null),
                        React.createElement(ParkInfoOne, null)),
                    React.createElement("div", { className: "parkInfoBox_list" },
                        React.createElement(ParkInfoTwo, null)),
                    React.createElement("div", { className: "parkInfoBox_text" },
                        React.createElement(ParkInfoThree, null))),
                React.createElement("div", { className: "parkInfo_bottom" },
                    React.createElement(AllBottom_4.default, null))));
        }
    }
    class ParkInfoOne extends React.Component {
        constructor(props) {
            super(props);
            this.state = {};
        }
        componentDidMount() {
        }
        render() {
            return (React.createElement("div", { className: "ParkInfoOne" },
                React.createElement("div", { className: "ParkInfoOne_html" },
                    React.createElement("p", null,
                        React.createElement("span", null, "\u5E7F\u5DDE"),
                        " ",
                        React.createElement("span", null, "\u54C1\u724C\u56ED\u533A"),
                        React.createElement("i", { className: "jiange" }, " > "),
                        React.createElement("span", null, "\u8D8A\u79C0"),
                        React.createElement("i", { className: "jiange" }, " > "),
                        React.createElement("span", null, "\u5317\u4EAC\u8DEF"))),
                React.createElement("div", { className: "ParkInfoOne_info" },
                    React.createElement("p", null, "\u4FE1\u606F\u4EA7\u4E1A\u56ED"),
                    React.createElement("ul", null,
                        React.createElement("li", null,
                            React.createElement("i", { className: "iconfont " }, "\uE83C"),
                            "\u6536\u85CF"),
                        React.createElement("li", null,
                            React.createElement("i", { className: "iconfont " }, "\uE83C"),
                            "\u5206\u4EAB")))));
        }
    }
    class ParkInfoTwo extends React.Component {
        constructor(props) {
            super(props);
            this.state = {
                index: 0,
                ParkInfoTwoState: "ParkInfoTwoAll",
                ParkInfoTwoListState: "ParkInfoTwoList",
                listTrun: "ParkInfoTwoListTrun",
                listTrun_text: "收起列表"
            };
        }
        componentDidMount() {
        }
        changeTitle(index) {
            this.setState({
                index: index
            });
        }
        overTitle() {
            if (this.state.ParkInfoTwoState == "ParkInfoTwoAll") {
                this.setState({
                    ParkInfoTwoState: "ParkInfoTwoOver",
                    ParkInfoTwoListState: "hide",
                    listTrun: "ParkInfoTwoListTrunUp",
                    listTrun_text: "展开列表",
                });
            }
            else {
                this.setState({
                    ParkInfoTwoState: "ParkInfoTwoAll",
                    ParkInfoTwoListState: "ParkInfoTwoList",
                    listTrun: "ParkInfoTwoListTrun",
                    listTrun_text: "收起列表"
                });
            }
        }
        render() {
            return (React.createElement("div", { className: this.state.ParkInfoTwoState },
                React.createElement("div", { className: "ParkInfoTwoTitle" },
                    React.createElement("ul", null,
                        React.createElement("li", { className: this.state.index == 0 ? "ParkInfoTwoTitleActive" : null, onClick: this.changeTitle.bind(this, 0) }, "\u51FA\u79DF\u623F\u6E90"),
                        React.createElement("li", { className: this.state.index == 1 ? "ParkInfoTwoTitleActive" : null, onClick: this.changeTitle.bind(this, 1) }, "\u51FA\u552E\u623F\u6E90"),
                        React.createElement("li", { className: this.state.index == 2 ? "ParkInfoTwoTitleActive" : null, onClick: this.changeTitle.bind(this, 2) }, "\u5165\u9A7B\u4F01\u4E1A"))),
                React.createElement("div", { className: this.state.ParkInfoTwoListState },
                    this.state.index == 0 ?
                        React.createElement(LeaseList, null)
                        : null,
                    this.state.index == 1 ?
                        React.createElement(SellList, null)
                        : null,
                    this.state.index == 2 ?
                        React.createElement(CompanyList, null)
                        : null),
                React.createElement("div", { className: this.state.listTrun, onClick: this.overTitle.bind(this) }, this.state.listTrun_text)));
        }
    }
    class LeaseList extends React.Component {
        constructor(props) {
            super(props);
            this.state = {
                typeIndex: 0,
                leaseRoomsState: -1,
            };
        }
        componentDidMount() {
        }
        onLeaseRoom(index) {
            ParkInfoThree.showRoomInfo();
            this.setState({
                leaseRoomsState: index
            });
        }
        leasetypeIndex(index) {
            this.setState({
                typeIndex: index,
            });
        }
        render() {
            return (React.createElement("div", { className: "leaseListBox" },
                React.createElement("div", { className: "leasetype" },
                    React.createElement("ul", null,
                        React.createElement("li", { onClick: this.leasetypeIndex.bind(this, 0) },
                            React.createElement("div", { className: this.state.typeIndex == 0 ? "leasetype_li_on" : "leasetype_li" },
                                React.createElement("p", { style: { "padding-top": "6px" } }, "\u5168\u90E8\u6237\u578B"),
                                React.createElement("p", null,
                                    React.createElement("span", null, "XX"),
                                    "\u5957"))),
                        React.createElement("li", { onClick: this.leasetypeIndex.bind(this, 1) },
                            React.createElement("div", { className: this.state.typeIndex == 1 ? "leasetype_li_on" : "leasetype_li" },
                                React.createElement("p", { style: { "padding-top": "6px" } }, "100m\u00B2\u4EE5\u4E0B"),
                                React.createElement("p", null,
                                    React.createElement("span", null, "XX"),
                                    "\u5957"))),
                        React.createElement("li", { onClick: this.leasetypeIndex.bind(this, 2) },
                            React.createElement("div", { className: this.state.typeIndex == 2 ? "leasetype_li_on" : "leasetype_li" },
                                React.createElement("p", { style: { "padding-top": "6px" } }, "100-200m\u00B2"),
                                React.createElement("p", null,
                                    React.createElement("span", null, "XX"),
                                    "\u5957"))),
                        React.createElement("li", { onClick: this.leasetypeIndex.bind(this, 3) },
                            React.createElement("div", { className: this.state.typeIndex == 3 ? "leasetype_li_on" : "leasetype_li" },
                                React.createElement("p", { style: { "padding-top": "6px" } }, "300-500m\u00B2"),
                                React.createElement("p", null,
                                    React.createElement("span", null, "XX"),
                                    "\u5957"))))),
                React.createElement("div", { className: "leaseRoomList" },
                    React.createElement("ul", null,
                        React.createElement("li", { onClick: this.onLeaseRoom.bind(this, 0) },
                            React.createElement("div", { className: this.state.leaseRoomsState == 0 ? "leaseRooms_on" : "leaseRooms" },
                                React.createElement("img", { src: "./fangliangbao/image/demo.png" }),
                                React.createElement("div", { className: "leaseRoomsRight" },
                                    React.createElement("p", { className: "leaseName" }, "\u51FA\u79DF\u9AD8\u65B0\u533A\u4FE1\u606F\u4EA7\u4E1A\u56ED\u798F\u5EFA\u5E08\u8303"),
                                    React.createElement("p", null,
                                        React.createElement("span", { className: "leasePrice" }, "80.3"),
                                        " \u5143/m\u00B2\u22C5\u6708"),
                                    React.createElement("p", { className: "leaseArea" }, "187m\u00B2")))),
                        React.createElement("li", { onClick: this.onLeaseRoom.bind(this, 1) },
                            React.createElement("div", { className: this.state.leaseRoomsState == 1 ? "leaseRooms_on" : "leaseRooms" },
                                React.createElement("img", { src: "./fangliangbao/image/demo.png" }),
                                React.createElement("div", { className: "leaseRoomsRight" },
                                    React.createElement("p", { className: "leaseName" }, "\u51FA\u79DF\u9AD8\u65B0\u533A\u4FE1\u606F\u4EA7\u4E1A\u56ED\u798F\u5EFA\u5E08\u8303"),
                                    React.createElement("p", null,
                                        React.createElement("span", { className: "leasePrice" }, "80.3"),
                                        " \u5143/m\u00B2\u22C5\u6708"),
                                    React.createElement("p", { className: "leaseArea" }, "187m\u00B2")))),
                        React.createElement("li", { onClick: this.onLeaseRoom.bind(this, 2) },
                            React.createElement("div", { className: this.state.leaseRoomsState == 2 ? "leaseRooms_on" : "leaseRooms" },
                                React.createElement("img", { src: "./fangliangbao/image/demo.png" }),
                                React.createElement("div", { className: "leaseRoomsRight" },
                                    React.createElement("p", { className: "leaseName" }, "\u51FA\u79DF\u9AD8\u65B0\u533A\u4FE1\u606F\u4EA7\u4E1A\u56ED\u798F\u5EFA\u5E08\u8303"),
                                    React.createElement("p", null,
                                        React.createElement("span", { className: "leasePrice" }, "80.3"),
                                        " \u5143/m\u00B2\u22C5\u6708"),
                                    React.createElement("p", { className: "leaseArea" }, "187m\u00B2"))))))));
        }
    }
    class SellList extends React.Component {
        constructor(props) {
            super(props);
            this.state = {
                typeIndex: 0,
                sellRoomsState: -1,
            };
        }
        componentDidMount() {
        }
        onSellRoom(index) {
            ParkInfoThree.showRoomInfo();
            this.setState({
                sellRoomsState: index
            });
        }
        selltypeIndex(index) {
            this.setState({
                typeIndex: index,
            });
        }
        render() {
            return (React.createElement("div", { className: "leaseListBox" },
                React.createElement("div", { className: "leasetype" },
                    React.createElement("ul", null,
                        React.createElement("li", { onClick: this.selltypeIndex.bind(this, 0) },
                            React.createElement("div", { className: this.state.typeIndex == 0 ? "leasetype_li_on" : "leasetype_li" },
                                React.createElement("p", { style: { "padding-top": "6px" } }, "\u5168\u90E8\u6237\u578B"),
                                React.createElement("p", null,
                                    React.createElement("span", null, "XX"),
                                    "\u5957"))),
                        React.createElement("li", { onClick: this.selltypeIndex.bind(this, 1) },
                            React.createElement("div", { className: this.state.typeIndex == 1 ? "leasetype_li_on" : "leasetype_li" },
                                React.createElement("p", { style: { "padding-top": "6px" } }, "100m\u00B2\u4EE5\u4E0B"),
                                React.createElement("p", null,
                                    React.createElement("span", null, "XX"),
                                    "\u5957"))),
                        React.createElement("li", { onClick: this.selltypeIndex.bind(this, 2) },
                            React.createElement("div", { className: this.state.typeIndex == 2 ? "leasetype_li_on" : "leasetype_li" },
                                React.createElement("p", { style: { "padding-top": "6px" } }, "100-200m\u00B2"),
                                React.createElement("p", null,
                                    React.createElement("span", null, "XX"),
                                    "\u5957"))),
                        React.createElement("li", { onClick: this.selltypeIndex.bind(this, 3) },
                            React.createElement("div", { className: this.state.typeIndex == 3 ? "leasetype_li_on" : "leasetype_li" },
                                React.createElement("p", { style: { "padding-top": "6px" } }, "300-500m\u00B2"),
                                React.createElement("p", null,
                                    React.createElement("span", null, "XX"),
                                    "\u5957"))))),
                React.createElement("div", { className: "leaseRoomList" },
                    React.createElement("ul", null,
                        React.createElement("li", { onClick: this.onSellRoom.bind(this, 0) },
                            React.createElement("div", { className: this.state.sellRoomsState == 0 ? "leaseRooms_on" : "leaseRooms" },
                                React.createElement("img", { src: "./fangliangbao/image/demo.png" }),
                                React.createElement("div", { className: "leaseRoomsRight" },
                                    React.createElement("p", { className: "leaseName" }, "\u51FA\u79DF\u9AD8\u65B0\u533A\u4FE1\u606F\u4EA7\u4E1A\u56ED\u798F\u5EFA\u5E08\u8303"),
                                    React.createElement("p", null,
                                        React.createElement("span", { className: "leasePrice" }, "80.3"),
                                        " \u5143/m\u00B2\u22C5\u6708"),
                                    React.createElement("p", { className: "leaseArea" }, "187m\u00B2")))),
                        React.createElement("li", { onClick: this.onSellRoom.bind(this, 1) },
                            React.createElement("div", { className: this.state.sellRoomsState == 1 ? "leaseRooms_on" : "leaseRooms" },
                                React.createElement("img", { src: "./fangliangbao/image/demo.png" }),
                                React.createElement("div", { className: "leaseRoomsRight" },
                                    React.createElement("p", { className: "leaseName" }, "\u51FA\u79DF\u9AD8\u65B0\u533A\u4FE1\u606F\u4EA7\u4E1A\u56ED\u798F\u5EFA\u5E08\u8303"),
                                    React.createElement("p", null,
                                        React.createElement("span", { className: "leasePrice" }, "80.3"),
                                        " \u5143/m\u00B2\u22C5\u6708"),
                                    React.createElement("p", { className: "leaseArea" }, "187m\u00B2")))),
                        React.createElement("li", { onClick: this.onSellRoom.bind(this, 2) },
                            React.createElement("div", { className: this.state.sellRoomsState == 2 ? "leaseRooms_on" : "leaseRooms" },
                                React.createElement("img", { src: "./fangliangbao/image/demo.png" }),
                                React.createElement("div", { className: "leaseRoomsRight" },
                                    React.createElement("p", { className: "leaseName" }, "\u51FA\u79DF\u9AD8\u65B0\u533A\u4FE1\u606F\u4EA7\u4E1A\u56ED\u798F\u5EFA\u5E08\u8303"),
                                    React.createElement("p", null,
                                        React.createElement("span", { className: "leasePrice" }, "80.3"),
                                        " \u5143/m\u00B2\u22C5\u6708"),
                                    React.createElement("p", { className: "leaseArea" }, "187m\u00B2"))))))));
        }
    }
    class CompanyList extends React.Component {
        constructor(props) {
            super(props);
            this.state = {
                typeIndex: 0,
                companyState: -1,
            };
        }
        componentDidMount() {
        }
        onCompany(index) {
            ParkInfoThree.showCompanyInfo();
            this.setState({
                companyState: index
            });
        }
        companytypeIndex(index) {
            this.setState({
                typeIndex: index,
            });
        }
        render() {
            return (React.createElement("div", { className: "leaseListBox" },
                React.createElement("div", { className: "leasetype" },
                    React.createElement("ul", null,
                        React.createElement("li", { onClick: this.companytypeIndex.bind(this, 0), className: this.state.typeIndex == 0 ? "companytype_li_on" : "companytype_li" }, "\u5168\u90E8"),
                        React.createElement("li", { onClick: this.companytypeIndex.bind(this, 1), className: this.state.typeIndex == 1 ? "companytype_li_on" : "companytype_li" }, "\u9AD8\u65B0\u6280\u672F"),
                        React.createElement("li", { onClick: this.companytypeIndex.bind(this, 2), className: this.state.typeIndex == 2 ? "companytype_li_on" : "companytype_li" }, "\u79D1\u6280\u670D\u52A1"),
                        React.createElement("li", { onClick: this.companytypeIndex.bind(this, 3), className: this.state.typeIndex == 3 ? "companytype_li_on" : "companytype_li" }, "\u91D1\u878D\u4FDD\u9669"))),
                React.createElement("div", { className: "leaseRoomList" },
                    React.createElement("ul", null,
                        React.createElement("li", { onClick: this.onCompany.bind(this, 0) },
                            React.createElement("div", { className: this.state.companyState == 0 ? "leaseRooms_on" : "leaseRooms" },
                                React.createElement("img", { src: "./fangliangbao/image/demo.png" }),
                                React.createElement("div", { className: "leaseRoomsRight" },
                                    React.createElement("p", { className: "leaseName" }, "\u6D59\u6C5F\u6C38\u62D3\u4FE1\u606F\u79D1\u6280\u6709\u9650\u516C\u4F0F\u89C1\u53F8\u64AD\u653E\u7ED3\u675F\u7684"),
                                    React.createElement("p", { className: "leaseArea", style: { "margin": "3px 0" } },
                                        React.createElement("i", { className: "iconfont ", style: { "font-size": "12px", "color": "rgba(207, 209, 210, 1)" } }, "\uE83C"),
                                        "E\u5EA7B\u533A-3F-301"),
                                    React.createElement("p", { className: "leaseArea" },
                                        React.createElement("i", { className: "iconfont ", style: { "font-size": "12px", "color": "rgba(207, 209, 210, 1)" } }, "\uE83C"),
                                        "\u79D1\u6280\u670D\u52A1")))),
                        React.createElement("li", { onClick: this.onCompany.bind(this, 1) },
                            React.createElement("div", { className: this.state.companyState == 1 ? "leaseRooms_on" : "leaseRooms" },
                                React.createElement("img", { src: "./fangliangbao/image/demo.png" }),
                                React.createElement("div", { className: "leaseRoomsRight" },
                                    React.createElement("p", { className: "leaseName" }, "\u6D59\u6C5F\u6C38\u62D3\u4FE1\u606F\u79D1\u6280\u6709\u9650\u516C\u4F0F\u89C1\u53F8\u64AD\u653E\u7ED3\u675F\u7684"),
                                    React.createElement("p", { className: "leaseArea", style: { "margin": "3px 0" } },
                                        React.createElement("i", { className: "iconfont ", style: { "font-size": "12px", "color": "rgba(207, 209, 210, 1)" } }, "\uE83C"),
                                        "E\u5EA7B\u533A-3F-301"),
                                    React.createElement("p", { className: "leaseArea" },
                                        React.createElement("i", { className: "iconfont ", style: { "font-size": "12px", "color": "rgba(207, 209, 210, 1)" } }, "\uE83C"),
                                        "\u79D1\u6280\u670D\u52A1")))),
                        React.createElement("li", { onClick: this.onCompany.bind(this, 2) },
                            React.createElement("div", { className: this.state.companyState == 2 ? "leaseRooms_on" : "leaseRooms" },
                                React.createElement("img", { src: "./fangliangbao/image/demo.png" }),
                                React.createElement("div", { className: "leaseRoomsRight" },
                                    React.createElement("p", { className: "leaseName" }, "\u6D59\u6C5F\u6C38\u62D3\u4FE1\u606F\u79D1\u6280\u6709\u9650\u516C\u4F0F\u89C1\u53F8\u64AD\u653E\u7ED3\u675F\u7684"),
                                    React.createElement("p", { className: "leaseArea", style: { "margin": "3px 0" } },
                                        React.createElement("i", { className: "iconfont ", style: { "font-size": "12px", "color": "rgba(207, 209, 210, 1)" } }, "\uE83C"),
                                        "E\u5EA7B\u533A-3F-301"),
                                    React.createElement("p", { className: "leaseArea" },
                                        React.createElement("i", { className: "iconfont ", style: { "font-size": "12px", "color": "rgba(207, 209, 210, 1)" } }, "\uE83C"),
                                        "\u79D1\u6280\u670D\u52A1"))))))));
        }
    }
    class ParkInfoThree extends React.Component {
        constructor(props) {
            super(props);
            this.state = {
                RoomInfoState: "hide",
            };
            ParkInfoThree.showRoomInfo = this.showRoomInfo.bind(this);
            ParkInfoThree.showCompanyInfo = this.showCompanyInfo.bind(this);
        }
        componentDidMount() {
        }
        static showRoomInfo() { }
        ;
        showRoomInfo() {
            this.setState({
                RoomInfoState: "RoomInfoShow",
            });
        }
        static showCompanyInfo() { }
        ;
        showCompanyInfo() {
            this.setState({
                RoomInfoState: "CompanyInfoShow",
            });
        }
        render() {
            return (React.createElement("div", { className: "ParkInfoThree" },
                React.createElement("div", { className: "ParkInfoThree_leftBox" },
                    this.state.RoomInfoState == "RoomInfoShow" ?
                        React.createElement(RoomInfoThreeLeft, null)
                        :
                            null,
                    this.state.RoomInfoState == "CompanyInfoShow" ?
                        React.createElement(CompanyInfoThreeLeft, null)
                        :
                            null,
                    React.createElement(ParkInfoThreeLeft, null)),
                React.createElement("div", { className: "ParkInfoThree_rightBox" },
                    React.createElement(ParkInfoThreeRight, null))));
        }
    }
    class ParkInfoThreeLeft extends React.Component {
        constructor(props) {
            super(props);
            this.state = {
                ParkInfoIndex: 0
            };
        }
        componentDidMount() {
        }
        ParkInfoOn(index) {
            this.setState({
                ParkInfoIndex: index
            });
        }
        render() {
            return (React.createElement("div", { className: "ParkInfoThree_left" },
                React.createElement("div", { className: "ParkInfoThree_left_title" },
                    React.createElement("ul", null,
                        React.createElement("li", { className: this.state.ParkInfoIndex == 0 ? "ParkInfoIndex_in" : null, onClick: this.ParkInfoOn.bind(this, 0) }, "\u56ED\u533A\u4ECB\u7ECD"),
                        React.createElement("li", { className: this.state.ParkInfoIndex == 1 ? "ParkInfoIndex_in" : null, onClick: this.ParkInfoOn.bind(this, 1) }, "\u533A\u4F4D\u4F18\u52BF"),
                        React.createElement("li", { className: this.state.ParkInfoIndex == 2 ? "ParkInfoIndex_in" : null, onClick: this.ParkInfoOn.bind(this, 2) }, "\u4F18\u60E0\u653F\u7B56"),
                        React.createElement("li", { className: this.state.ParkInfoIndex == 3 ? "ParkInfoIndex_in" : null, onClick: this.ParkInfoOn.bind(this, 3) }, "\u56ED\u533A\u98CE\u91C7"))),
                React.createElement("div", { className: "ParkInfoThree_left_text" },
                    this.state.ParkInfoIndex == 0 ?
                        React.createElement("div", { className: "ParkInfo_text parkIntroduced", id: "parkIntroduced" },
                            React.createElement("p", null, "\u5730\u5904\u5E7F\u5DDE\u3001\u987A\u5FB7\u3001\u4E2D\u5C71\u3001\u4E1C\u839E\u3001\u73E0\u6D77\u3001\u6DF1\u5733\u7B49\u5730\u4E4B\u67A2\u7EBD\uFF0C\u5360\u8E1E\u756A\u79BA\u7684\u6838\u5FC3\u4F4D\u7F6E\u3002\u524D\u8EAB\u662F\u6C38\u9686\u5236\u8863\u5382\uFF0C2010\u5E74\u7ECF\u6539\u9020\uFF0C\u6210\u4E3A\u4E86\u9752\u74E6\u767D\u5899\uFF0C\u8BD7\u60C5\u753B\u610F\u7684\u521B\u610F\u56ED\u533A\u3002 \u4EA7\u4E1A\u56ED\u53D6\u540D\u82B1\u57CE\uFF0C\u96C6\u5408\u4E86\u7EFF\u8272\u82B1\u57CE\u3001\u5386\u53F2\u82B1"),
                            React.createElement("p", null, "\u5730\u5904\u5E7F\u5DDE\u3001\u987A\u5FB7\u3001\u4E2D\u5C71\u3001\u4E1C\u839E\u3001\u73E0\u6D77\u3001\u6DF1\u5733\u7B49\u5730\u4E4B\u67A2\u7EBD\uFF0C\u5360\u8E1E\u756A\u79BA\u7684\u6838\u5FC3\u4F4D\u7F6E\u3002\u524D\u8EAB\u662F\u6C38\u9686\u5236\u8863\u5382\uFF0C2010\u5E74\u7ECF\u6539\u9020\uFF0C\u6210\u4E3A\u4E86\u9752\u74E6\u767D\u5899\uFF0C\u8BD7\u60C5\u753B\u610F\u7684\u521B\u610F\u56ED\u533A\u3002 \u4EA7\u4E1A\u56ED\u53D6\u540D\u82B1\u57CE\uFF0C\u96C6\u5408\u4E86\u7EFF\u8272\u82B1\u57CE\u3001\u5386\u53F2\u82B1\uFF0C\u5730\u5904\u5E7F\u5DDE\u3001\u987A\u5FB7\u3001\u4E2D\u5C71\u3001\u4E1C\u839E\u3001\u73E0\u6D77\u3001\u6DF1\u5733\u7B49\u5730\u4E4B\u67A2\u7EBD\uFF0C\u5360\u8E1E\u756A\u79BA\u7684\u6838\u5FC3\u4F4D\u7F6E\u3002\u524D\u8EAB\u662F\u6C38\u9686\u5236\u8863\u5382\uFF0C2010\u5E74\u7ECF\u6539\u9020\uFF0C\u6210\u4E3A\u4E86\u9752\u74E6\u767D\u5899\uFF0C\u8BD7\u60C5\u753B\u610F\u7684\u521B\u610F\u56ED\u533A\u3002 \u4EA7\u4E1A\u56ED\u53D6\u540D\u82B1\u57CE\uFF0C\u96C6\u5408\u4E86\u7EFF\u8272\u82B1\u57CE\u3001\u5386\u53F2\u82B1"),
                            React.createElement("p", null, "\u5730\u5904\u5E7F\u5DDE\u3001\u987A\u5FB7\u3001\u4E2D\u5C71\u3001\u4E1C\u839E\u3001\u73E0\u6D77\u3001\u6DF1\u5733\u7B49\u5730\u4E4B\u67A2\u7EBD\uFF0C\u5360\u8E1E\u756A\u79BA\u7684\u6838\u5FC3\u4F4D\u7F6E\u3002\u524D\u8EAB\u662F\u6C38\u9686\u5236\u8863\u5382\uFF0C2010\u5E74\u7ECF\u6539\u9020\uFF0C\u6210\u4E3A\u4E86\u9752\u74E6\u767D\u5899\uFF0C\u8BD7\u60C5\u753B\u610F\u7684\u521B\u610F\u56ED\u533A\u3002 \u4EA7\u4E1A\u56ED\u53D6\u540D\u82B1\u57CE\uFF0C\u96C6\u5408\u4E86\u7EFF\u8272\u82B1\u57CE\u3001\u5386\u53F2\u82B1"))
                        : null,
                    this.state.ParkInfoIndex == 1 ?
                        React.createElement("div", { className: "ParkInfo_text advantage", id: "advantage" },
                            React.createElement("p", null, "\u5730\u5904\u5E7F\u5DDE\u3001\u987A\u5FB7\u3001\u4E2D\u5C71\u3001\u4E1C\u839E\u3001\u73E0\u6D77\u3001\u6DF1\u5733\u7B49\u5730\u4E4B\u67A2\u7EBD\uFF0C\u5360\u8E1E\u756A\u79BA\u7684\u6838\u5FC3\u4F4D\u7F6E\u3002\u524D\u8EAB\u662F\u6C38\u9686\u5236\u8863\u5382\uFF0C2010\u5E74\u7ECF\u6539\u9020\uFF0C\u6210\u4E3A\u4E86\u9752\u74E6\u767D\u5899\uFF0C\u8BD7\u60C5\u753B\u610F\u7684\u521B\u610F\u56ED\u533A\u3002 \u4EA7\u4E1A\u56ED\u53D6\u540D\u82B1\u57CE\uFF0C\u96C6\u5408\u4E86\u7EFF\u8272\u82B1\u57CE\u3001\u5386\u53F2\u82B1"),
                            React.createElement("p", null, "\u5730\u5904\u5E7F\u5DDE\u3001\u987A\u5FB7\u3001\u4E2D\u5C71\u3001\u4E1C\u839E\u3001\u73E0\u6D77\u3001\u6DF1\u5733\u7B49\u5730\u4E4B\u67A2\u7EBD\uFF0C\u5360\u8E1E\u756A\u79BA\u7684\u6838\u5FC3\u4F4D\u7F6E\u3002\u524D\u8EAB\u662F\u6C38\u9686\u5236\u8863\u5382\uFF0C2010\u5E74\u7ECF\u6539\u9020\uFF0C\u6210\u4E3A\u4E86\u9752\u74E6\u767D\u5899\uFF0C\u8BD7\u60C5\u753B\u610F\u7684\u521B\u610F\u56ED\u533A\u3002 \u4EA7\u4E1A\u56ED\u53D6\u540D\u82B1\u57CE\uFF0C\u96C6\u5408\u4E86\u7EFF\u8272\u82B1\u57CE\u3001\u5386\u53F2\u82B1"))
                        : null,
                    this.state.ParkInfoIndex == 2 ?
                        React.createElement("div", { className: "ParkInfo_text discounts", id: "discounts" },
                            React.createElement("p", null, "\u5730\u5904\u5E7F\u5DDE\u3001\u987A\u5FB7\u3001\u4E2D\u5C71\u3001\u4E1C\u839E\u3001\u73E0\u6D77\u3001\u6DF1\u5733\u7B49\u5730\u4E4B\u67A2\u7EBD\uFF0C\u5360\u8E1E\u756A\u79BA\u7684\u6838\u5FC3\u4F4D\u7F6E\u3002\u524D\u8EAB\u662F\u6C38\u9686\u5236\u8863\u5382\uFF0C2010\u5E74\u7ECF\u6539\u9020\uFF0C\u6210\u4E3A\u4E86\u9752\u74E6\u767D\u5899\uFF0C\u8BD7\u60C5\u753B\u610F\u7684\u521B\u610F\u56ED\u533A\u3002 \u4EA7\u4E1A\u56ED\u53D6\u540D\u82B1\u57CE\uFF0C\u96C6\u5408\u4E86\u7EFF\u8272\u82B1\u57CE\u3001\u5386\u53F2\u82B1"))
                        : null,
                    this.state.ParkInfoIndex == 3 ?
                        React.createElement("div", { className: "ParkInfo_text parkElegant", id: "parkElegant" },
                            React.createElement("div", { className: "infoImg" },
                                React.createElement("div", { className: "infoImg_left" },
                                    React.createElement("i", { className: "iconfont " }, "\uE83C")),
                                React.createElement("div", { className: "infoImg_ul" },
                                    React.createElement("ul", null,
                                        React.createElement("li", null,
                                            " ",
                                            React.createElement("img", { src: "./fangliangbao/image/demo.png" })),
                                        React.createElement("li", null,
                                            " ",
                                            React.createElement("img", { src: "./fangliangbao/image/demo.png" })),
                                        React.createElement("li", null,
                                            " ",
                                            React.createElement("img", { src: "./fangliangbao/image/demo.png" })))),
                                React.createElement("p", { className: "infoImg_num" },
                                    React.createElement("span", null, "2"),
                                    " / ",
                                    React.createElement("span", null, "8")),
                                React.createElement("div", { className: "infoImg_right" },
                                    React.createElement("i", { className: "iconfont " }, "\uE83C"))))
                        : null)));
        }
    }
    class RoomInfoThreeLeft extends React.Component {
        constructor(props) {
            super(props);
            this.state = {
                RoomInfoIndex: 0,
                RoomInfoThreeLeft: "RoomInfoThreeLeft_part"
            };
        }
        componentDidMount() {
        }
        roomInfoOn(index) {
            console.log('roomInfoOn', index);
            if (index == 1) {
                this.setState({
                    RoomInfoThreeLeft: "RoomInfoThreeLeft_all",
                    RoomInfoIndex: index,
                });
            }
            else if (index == 2) {
                this.setState({
                    RoomInfoThreeLeft: "RoomInfoThreeLeft_all",
                    RoomInfoIndex: index,
                });
            }
            else {
                console.log('roomInfoOn0000', index);
                this.setState({
                    RoomInfoThreeLeft: "RoomInfoThreeLeft_part",
                    RoomInfoIndex: index,
                });
            }
        }
        render() {
            return (React.createElement("div", { className: this.state.RoomInfoThreeLeft },
                React.createElement("div", { className: "ParkInfoThree_left_title" },
                    React.createElement("ul", null,
                        React.createElement("li", { className: this.state.RoomInfoIndex == 0 ? "ParkInfoIndex_in" : null, onClick: this.roomInfoOn.bind(this, 0) }, "\u623F\u6E90\u6982\u51B5"),
                        React.createElement("li", { className: this.state.RoomInfoIndex == 1 ? "ParkInfoIndex_in" : null, onClick: this.roomInfoOn.bind(this, 1) }, "\u5B9E\u62CD\u7167\u7247"),
                        React.createElement("li", { className: this.state.RoomInfoIndex == 2 ? "ParkInfoIndex_in" : null, onClick: this.roomInfoOn.bind(this, 2) }, "\u5B9E\u62CD\u89C6\u9891"))),
                this.state.RoomInfoIndex == 0 ?
                    React.createElement("div", { className: "roomInfoBox" },
                        React.createElement("ul", { className: "roomInfoBox_one" },
                            React.createElement("li", null,
                                React.createElement("span", { style: { "font-size": "46px", "font-weight": "bold", "color": "rgba(220,26,63,1)" } }, "98"),
                                " \u5143/m\u00B2\u22C5\u6708"),
                            React.createElement("li", null,
                                "\u603B\u4EF7\uFF1A",
                                React.createElement("span", null, "19,600\u202C"),
                                " \u5143/m\u00B2\u22C5\u6708"),
                            React.createElement("li", { style: { "margin": "0px 24px" } },
                                React.createElement("p", null, "\u5EFA\u7B51\u9762\u79EF"),
                                React.createElement("p", { className: "ribo_bold" },
                                    React.createElement("span", null, "200"),
                                    "m\u00B2")),
                            React.createElement("li", { style: { "margin": "0px 24px" } },
                                React.createElement("p", null, "\u53EF\u5BB9\u7EB3\u5DE5\u4F4D"),
                                React.createElement("p", { className: "ribo_bold" },
                                    React.createElement("span", null, "29~58"),
                                    "\u4E2A\u5DE5\u4F4D")),
                            React.createElement("li", { style: { "margin": "0px 24px" } },
                                React.createElement("p", null, "\u88C5\u4FEE\u7A0B\u5EA6"),
                                React.createElement("p", { className: "ribo_bold" }, "\u4E2D\u7B49\u88C5\u4FEE"))),
                        React.createElement("ul", { className: "roomInfoBox_two" },
                            React.createElement("li", null,
                                "\u514D\u79DF\u65F6\u95F4 ",
                                React.createElement("span", null, "\u9762\u8BAE")),
                            React.createElement("li", null,
                                "\u603B\u5171\u697C\u5C42 ",
                                React.createElement("span", null, "12\u5C42")),
                            React.createElement("li", null,
                                "\u6240\u5728\u697C\u5C42 ",
                                React.createElement("span", null, "6\u5C42")),
                            React.createElement("li", null,
                                "\u7535",
                                React.createElement("span", { style: { "margin-left": "28px", "color": "rgba(152,159,168,1)" } }, "\u68AF"),
                                React.createElement("span", null, "\u6709\u7535\u68AF")),
                            React.createElement("li", null,
                                "\u770B\u623F\u65F6\u95F4 ",
                                React.createElement("span", null, "\u8054\u7CFB\u987E\u95EE\uFF0C\u968F\u65F6\u53EF\u770B")),
                            React.createElement("li", null,
                                "\u66F4\u65B0\u65F6\u95F4 ",
                                React.createElement("span", null, "14\u5C0F\u65F6\u524D"))))
                    : null,
                this.state.RoomInfoIndex == 1 ?
                    React.createElement("div", { className: "infoImg" },
                        React.createElement("div", { className: "infoImg_left" },
                            React.createElement("i", { className: "iconfont " }, "\uE83C")),
                        React.createElement("div", { className: "infoImg_ul" },
                            React.createElement("ul", null,
                                React.createElement("li", null,
                                    " ",
                                    React.createElement("img", { src: "./fangliangbao/image/build.png" })),
                                React.createElement("li", null,
                                    " ",
                                    React.createElement("img", { src: "./fangliangbao/image/build.png" })),
                                React.createElement("li", null,
                                    " ",
                                    React.createElement("img", { src: "./fangliangbao/image/build.png" })))),
                        React.createElement("p", { className: "infoImg_num" },
                            React.createElement("span", null, "2"),
                            " / ",
                            React.createElement("span", null, "8")),
                        React.createElement("div", { className: "infoImg_right" },
                            React.createElement("i", { className: "iconfont " }, "\uE83C")))
                    : null,
                this.state.RoomInfoIndex == 2 ?
                    React.createElement("div", { className: "infoImg" },
                        React.createElement("div", { className: "infoImg_left" },
                            React.createElement("i", { className: "iconfont " }, "\uE83C")),
                        React.createElement("div", { className: "infoImg_ul" },
                            React.createElement("ul", null,
                                React.createElement("li", null,
                                    " ",
                                    React.createElement("img", { src: "./fangliangbao/image/build.png" })),
                                React.createElement("li", null,
                                    " ",
                                    React.createElement("img", { src: "./fangliangbao/image/build.png" })),
                                React.createElement("li", null,
                                    " ",
                                    React.createElement("img", { src: "./fangliangbao/image/build.png" })))),
                        React.createElement("p", { className: "infoImg_num" },
                            React.createElement("span", null, "2"),
                            " / ",
                            React.createElement("span", null, "8")),
                        React.createElement("div", { className: "infoImg_right" },
                            React.createElement("i", { className: "iconfont " }, "\uE83C")))
                    : null));
        }
    }
    class CompanyInfoThreeLeft extends React.Component {
        constructor(props) {
            super(props);
            this.state = {
                RoomInfoIndex: 0,
                RoomInfoThreeLeft: "RoomInfoThreeLeft_part"
            };
        }
        componentDidMount() {
        }
        roomInfoOn(index) {
            this.setState({
                RoomInfoIndex: index,
            });
        }
        onChange(a, b, c) {
            console.log(a, b, c);
        }
        render() {
            return (React.createElement("div", { className: "RoomInfoThreeLeft" },
                React.createElement("div", { className: "ParkInfoThree_left_title" },
                    React.createElement("ul", null,
                        React.createElement("li", { className: this.state.RoomInfoIndex == 0 ? "ParkInfoIndex_in" : null, onClick: this.roomInfoOn.bind(this, 0) }, "\u4F01\u4E1A\u4FE1\u606F"),
                        React.createElement("li", { className: this.state.RoomInfoIndex == 1 ? "ParkInfoIndex_in" : null, onClick: this.roomInfoOn.bind(this, 1) }, "\u4F01\u4E1A\u98CE\u91C7"),
                        React.createElement("li", { className: this.state.RoomInfoIndex == 2 ? "ParkInfoIndex_in" : null, onClick: this.roomInfoOn.bind(this, 2) }, "\u4F01\u4E1A\u8BE6\u60C5"),
                        React.createElement("li", { className: this.state.RoomInfoIndex == 3 ? "ParkInfoIndex_in" : null, onClick: this.roomInfoOn.bind(this, 3) }, "\u4EA7\u54C1\u5C55\u793A"))),
                this.state.RoomInfoIndex == 0 ?
                    React.createElement("div", null, "\"000000000\"")
                    : null,
                this.state.RoomInfoIndex == 1 ?
                    React.createElement("div", { className: "infoImg" },
                        React.createElement("div", { className: "infoImg_left" },
                            React.createElement("i", { className: "iconfont " }, "\uE83C")),
                        React.createElement("div", { className: "infoImg_ul" },
                            React.createElement("ul", null,
                                React.createElement("li", null,
                                    " ",
                                    React.createElement("img", { src: "./fangliangbao/image/demo.png" })),
                                React.createElement("li", null,
                                    " ",
                                    React.createElement("img", { src: "./fangliangbao/image/demo.png" })),
                                React.createElement("li", null,
                                    " ",
                                    React.createElement("img", { src: "./fangliangbao/image/demo.png" })))),
                        React.createElement("p", { className: "infoImg_num" },
                            React.createElement("span", null, "2"),
                            " / ",
                            React.createElement("span", null, "8")),
                        React.createElement("div", { className: "infoImg_rightt" },
                            React.createElement("i", { className: "iconfont " }, "\uE83C")))
                    : null,
                this.state.RoomInfoIndex == 2 ?
                    React.createElement("div", { className: "infoImg" },
                        React.createElement("div", { className: "infoImg_left" },
                            React.createElement("i", { className: "iconfont " }, "\uE83C")),
                        React.createElement("div", { className: "infoImg_ul" },
                            React.createElement("ul", null,
                                React.createElement("li", null,
                                    " ",
                                    React.createElement("img", { src: "./fangliangbao/image/demo.png" })),
                                React.createElement("li", null,
                                    " ",
                                    React.createElement("img", { src: "./fangliangbao/image/demo.png" })),
                                React.createElement("li", null,
                                    " ",
                                    React.createElement("img", { src: "./fangliangbao/image/demo.png" })))),
                        React.createElement("p", { className: "infoImg_num" },
                            React.createElement("span", null, "2"),
                            " / ",
                            React.createElement("span", null, "8")),
                        React.createElement("div", { className: "infoImg_rightt" },
                            React.createElement("i", { className: "iconfont " }, "\uE83C")))
                    : null,
                this.state.RoomInfoIndex == 3 ?
                    React.createElement("div", { className: "infoImg" },
                        React.createElement("div", { className: "infoImg_left" },
                            React.createElement("i", { className: "iconfont " }, "\uE83C")),
                        React.createElement("div", { className: "infoImg_ul" },
                            React.createElement("ul", null,
                                React.createElement("li", null,
                                    " ",
                                    React.createElement("img", { src: "./fangliangbao/image/demo.png" })),
                                React.createElement("li", null,
                                    " ",
                                    React.createElement("img", { src: "./fangliangbao/image/demo.png" })),
                                React.createElement("li", null,
                                    " ",
                                    React.createElement("img", { src: "./fangliangbao/image/demo.png" })))),
                        React.createElement("p", { className: "infoImg_num" },
                            React.createElement("span", null, "2"),
                            " / ",
                            React.createElement("span", null, "8")),
                        React.createElement("div", { className: "infoImg_rightt" },
                            React.createElement("i", { className: "iconfont " }, "\uE83C")))
                    : null));
        }
    }
    class ParkInfoThreeRight extends React.Component {
        constructor(props) {
            super(props);
            this.state = {
                needText: "如：在广州白云区寻找200m2左右的办公室，租金在80元/m2·天，临近地铁站。",
                phone: "输入您的手机号码",
            };
        }
        componentDidMount() {
        }
        getNeed() {
            console.log(this.state);
        }
        render() {
            return (React.createElement("div", { className: "ParkInfoThree_right" },
                React.createElement("p", { className: "pitr_title" }, "\u54A8\u8BE2\u987E\u95EE"),
                React.createElement("div", { className: "ParkInfoThree_right_one" },
                    React.createElement("img", { src: "./fangliangbao/image/demo.png" }),
                    React.createElement("div", { className: "pitro_rb" },
                        React.createElement("p", { className: "pitro_name" }, "\u5F20\u4E09\u4E09"),
                        React.createElement("div", { className: "pitro_text1" }, "\u8BE5\u56ED\u533A\u4E0E\u623F\u6E90\u7531\u6211\u7EF4\u62A4\uFF0C\u719F\u77E5\u56ED\u533A\u653F\u7B56\u4E0E\u5468\u8FB9\u73AF\u5883"),
                        React.createElement("p", { className: "pitro_text2" },
                            "\u514D\u8D39\u54A8\u8BE2   ",
                            React.createElement("span", { style: { "font-size": "16px", "font-weight": "bold", "margin-left": "5px" } }, "15578380203")))),
                React.createElement("div", { className: "ParkInfoThree_right_two" },
                    React.createElement("p", { className: "pitr_title" }, "\u5B9D\u54E5\u5E2E\u627E\u623F"),
                    React.createElement("p", { className: "pitrt_inp" },
                        React.createElement("i", { className: "iconfont ", style: { "margin-right": "5px", "font-size": "14px" } }, "\uE83C"),
                        React.createElement("input", { type: "text", value: this.state.phone }))),
                React.createElement("div", { className: "ParkInfoThree_right_three" },
                    React.createElement("p", { className: "pitrth_text1" }, "\u60A8\u7684\u9700\u6C42\uFF1A"),
                    React.createElement("textarea", { value: this.state.needText }),
                    React.createElement("input", { type: "button" })),
                React.createElement("input", { type: "button", value: "\u7ACB\u5373\u59D4\u6258", className: "pitr_btn", onClick: this.getNeed.bind(this) })));
        }
    }
    exports.default = ParkInfo;
});
define("ParkInfo (5)", ["require", "exports", "react", "HomeTop", "allBottom", "InfoTitle"], function (require, exports, React, HomeTop_5, AllBottom_5, InfoTitle_4) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    class ParkInfo extends React.Component {
        constructor(props) {
            super(props);
            this.state = {};
        }
        render() {
            return (React.createElement("div", { className: "infoPage" },
                React.createElement(HomeTop_5.default, null),
                React.createElement("div", { className: "parkInfo" },
                    React.createElement("div", { className: "parkInfoBox_title" },
                        React.createElement(InfoTitle_4.default, null),
                        React.createElement(ParkInfoOne, null)),
                    React.createElement("div", { className: "parkInfoBox_list" },
                        React.createElement(ParkInfoTwo, null)),
                    React.createElement("div", { className: "parkInfoBox_text" },
                        React.createElement(ParkInfoThree, null))),
                React.createElement("div", { className: "parkInfo_bottom" },
                    React.createElement(AllBottom_5.default, null))));
        }
    }
    class ParkInfoOne extends React.Component {
        constructor(props) {
            super(props);
            this.state = {};
        }
        componentDidMount() {
        }
        render() {
            return (React.createElement("div", { className: "ParkInfoOne" },
                React.createElement("div", { className: "ParkInfoOne_html" },
                    React.createElement("p", null,
                        React.createElement("span", null, "\u5E7F\u5DDE"),
                        " ",
                        React.createElement("span", null, "\u54C1\u724C\u56ED\u533A"),
                        React.createElement("i", { className: "jiange" }, " > "),
                        React.createElement("span", null, "\u8D8A\u79C0"),
                        React.createElement("i", { className: "jiange" }, " > "),
                        React.createElement("span", null, "\u5317\u4EAC\u8DEF"))),
                React.createElement("div", { className: "ParkInfoOne_info" },
                    React.createElement("p", null, "\u4FE1\u606F\u4EA7\u4E1A\u56ED"),
                    React.createElement("ul", null,
                        React.createElement("li", null,
                            React.createElement("i", { className: "iconfont " }, "\uE83C"),
                            "\u6536\u85CF"),
                        React.createElement("li", null,
                            React.createElement("i", { className: "iconfont " }, "\uE83C"),
                            "\u5206\u4EAB")))));
        }
    }
    class ParkInfoTwo extends React.Component {
        constructor(props) {
            super(props);
            this.state = {
                index: 0,
                ParkInfoTwoState: "ParkInfoTwoAll",
                ParkInfoTwoListState: "ParkInfoTwoList",
                listTrun: "ParkInfoTwoListTrun",
                listTrun_text: "收起列表"
            };
        }
        componentDidMount() {
        }
        changeTitle(index) {
            this.setState({
                index: index
            });
        }
        overTitle() {
            if (this.state.ParkInfoTwoState == "ParkInfoTwoAll") {
                this.setState({
                    ParkInfoTwoState: "ParkInfoTwoOver",
                    ParkInfoTwoListState: "hide",
                    listTrun: "ParkInfoTwoListTrunUp",
                    listTrun_text: "展开列表",
                });
            }
            else {
                this.setState({
                    ParkInfoTwoState: "ParkInfoTwoAll",
                    ParkInfoTwoListState: "ParkInfoTwoList",
                    listTrun: "ParkInfoTwoListTrun",
                    listTrun_text: "收起列表"
                });
            }
        }
        render() {
            return (React.createElement("div", { className: this.state.ParkInfoTwoState },
                React.createElement("div", { className: "ParkInfoTwoTitle" },
                    React.createElement("ul", null,
                        React.createElement("li", { className: this.state.index == 0 ? "ParkInfoTwoTitleActive" : null, onClick: this.changeTitle.bind(this, 0) }, "\u51FA\u79DF\u623F\u6E90"),
                        React.createElement("li", { className: this.state.index == 1 ? "ParkInfoTwoTitleActive" : null, onClick: this.changeTitle.bind(this, 1) }, "\u51FA\u552E\u623F\u6E90"),
                        React.createElement("li", { className: this.state.index == 2 ? "ParkInfoTwoTitleActive" : null, onClick: this.changeTitle.bind(this, 2) }, "\u5165\u9A7B\u4F01\u4E1A"))),
                React.createElement("div", { className: this.state.ParkInfoTwoListState },
                    this.state.index == 0 ?
                        React.createElement(LeaseList, null)
                        : null,
                    this.state.index == 1 ?
                        React.createElement(SellList, null)
                        : null,
                    this.state.index == 2 ?
                        React.createElement(CompanyList, null)
                        : null),
                React.createElement("div", { className: this.state.listTrun, onClick: this.overTitle.bind(this) }, this.state.listTrun_text)));
        }
    }
    class LeaseList extends React.Component {
        constructor(props) {
            super(props);
            this.state = {
                typeIndex: 0,
                leaseRoomsState: -1,
            };
        }
        componentDidMount() {
        }
        onLeaseRoom(index) {
            ParkInfoThree.showRoomInfo();
            this.setState({
                leaseRoomsState: index
            });
        }
        leasetypeIndex(index) {
            this.setState({
                typeIndex: index,
            });
        }
        render() {
            return (React.createElement("div", { className: "leaseListBox" },
                React.createElement("div", { className: "leasetype" },
                    React.createElement("ul", null,
                        React.createElement("li", { onClick: this.leasetypeIndex.bind(this, 0) },
                            React.createElement("div", { className: this.state.typeIndex == 0 ? "leasetype_li_on" : "leasetype_li" },
                                React.createElement("p", { style: { "padding-top": "6px" } }, "\u5168\u90E8\u6237\u578B"),
                                React.createElement("p", null,
                                    React.createElement("span", null, "XX"),
                                    "\u5957"))),
                        React.createElement("li", { onClick: this.leasetypeIndex.bind(this, 1) },
                            React.createElement("div", { className: this.state.typeIndex == 1 ? "leasetype_li_on" : "leasetype_li" },
                                React.createElement("p", { style: { "padding-top": "6px" } }, "100m\u00B2\u4EE5\u4E0B"),
                                React.createElement("p", null,
                                    React.createElement("span", null, "XX"),
                                    "\u5957"))),
                        React.createElement("li", { onClick: this.leasetypeIndex.bind(this, 2) },
                            React.createElement("div", { className: this.state.typeIndex == 2 ? "leasetype_li_on" : "leasetype_li" },
                                React.createElement("p", { style: { "padding-top": "6px" } }, "100-200m\u00B2"),
                                React.createElement("p", null,
                                    React.createElement("span", null, "XX"),
                                    "\u5957"))),
                        React.createElement("li", { onClick: this.leasetypeIndex.bind(this, 3) },
                            React.createElement("div", { className: this.state.typeIndex == 3 ? "leasetype_li_on" : "leasetype_li" },
                                React.createElement("p", { style: { "padding-top": "6px" } }, "300-500m\u00B2"),
                                React.createElement("p", null,
                                    React.createElement("span", null, "XX"),
                                    "\u5957"))))),
                React.createElement("div", { className: "leaseRoomList" },
                    React.createElement("ul", null,
                        React.createElement("li", { onClick: this.onLeaseRoom.bind(this, 0) },
                            React.createElement("div", { className: this.state.leaseRoomsState == 0 ? "leaseRooms_on" : "leaseRooms" },
                                React.createElement("img", { src: "./fangliangbao/image/demo.png" }),
                                React.createElement("div", { className: "leaseRoomsRight" },
                                    React.createElement("p", { className: "leaseName" },
                                        React.createElement("span", null, "187"),
                                        "m\u00B2"),
                                    React.createElement("p", null,
                                        React.createElement("span", { className: "leasePrice" }, "80.3"),
                                        " \u5143/m\u00B2\u22C5\u6708"),
                                    React.createElement("p", { className: "leaseArea" }, "\u7B80\u88C5")))),
                        React.createElement("li", { onClick: this.onLeaseRoom.bind(this, 1) },
                            React.createElement("div", { className: this.state.leaseRoomsState == 1 ? "leaseRooms_on" : "leaseRooms" },
                                React.createElement("img", { src: "./fangliangbao/image/demo.png" }),
                                React.createElement("div", { className: "leaseRoomsRight" },
                                    React.createElement("p", { className: "leaseName" },
                                        React.createElement("span", null, "187"),
                                        "m\u00B2"),
                                    React.createElement("p", null,
                                        React.createElement("span", { className: "leasePrice" }, "80.3"),
                                        " \u5143/m\u00B2\u22C5\u6708"),
                                    React.createElement("p", { className: "leaseArea" }, "\u7B80\u88C5")))),
                        React.createElement("li", { onClick: this.onLeaseRoom.bind(this, 2) },
                            React.createElement("div", { className: this.state.leaseRoomsState == 2 ? "leaseRooms_on" : "leaseRooms" },
                                React.createElement("img", { src: "./fangliangbao/image/demo.png" }),
                                React.createElement("div", { className: "leaseRoomsRight" },
                                    React.createElement("p", { className: "leaseName" },
                                        React.createElement("span", null, "187"),
                                        "m\u00B2"),
                                    React.createElement("p", null,
                                        React.createElement("span", { className: "leasePrice" }, "80.3"),
                                        " \u5143/m\u00B2\u22C5\u6708"),
                                    React.createElement("p", { className: "leaseArea" }, "\u7B80\u88C5"))))))));
        }
    }
    class SellList extends React.Component {
        constructor(props) {
            super(props);
            this.state = {
                typeIndex: 0,
                sellRoomsState: -1,
            };
        }
        componentDidMount() {
        }
        onSellRoom(index) {
            ParkInfoThree.showRoomInfo();
            this.setState({
                sellRoomsState: index
            });
        }
        selltypeIndex(index) {
            this.setState({
                typeIndex: index,
            });
        }
        render() {
            return (React.createElement("div", { className: "leaseListBox" },
                React.createElement("div", { className: "leasetype" },
                    React.createElement("ul", null,
                        React.createElement("li", { onClick: this.selltypeIndex.bind(this, 0) },
                            React.createElement("div", { className: this.state.typeIndex == 0 ? "leasetype_li_on" : "leasetype_li" },
                                React.createElement("p", { style: { "padding-top": "6px" } }, "\u5168\u90E8\u6237\u578B"),
                                React.createElement("p", null,
                                    React.createElement("span", null, "XX"),
                                    "\u5957"))),
                        React.createElement("li", { onClick: this.selltypeIndex.bind(this, 1) },
                            React.createElement("div", { className: this.state.typeIndex == 1 ? "leasetype_li_on" : "leasetype_li" },
                                React.createElement("p", { style: { "padding-top": "6px" } }, "100m\u00B2\u4EE5\u4E0B"),
                                React.createElement("p", null,
                                    React.createElement("span", null, "XX"),
                                    "\u5957"))),
                        React.createElement("li", { onClick: this.selltypeIndex.bind(this, 2) },
                            React.createElement("div", { className: this.state.typeIndex == 2 ? "leasetype_li_on" : "leasetype_li" },
                                React.createElement("p", { style: { "padding-top": "6px" } }, "100-200m\u00B2"),
                                React.createElement("p", null,
                                    React.createElement("span", null, "XX"),
                                    "\u5957"))),
                        React.createElement("li", { onClick: this.selltypeIndex.bind(this, 3) },
                            React.createElement("div", { className: this.state.typeIndex == 3 ? "leasetype_li_on" : "leasetype_li" },
                                React.createElement("p", { style: { "padding-top": "6px" } }, "300-500m\u00B2"),
                                React.createElement("p", null,
                                    React.createElement("span", null, "XX"),
                                    "\u5957"))))),
                React.createElement("div", { className: "leaseRoomList" },
                    React.createElement("ul", null,
                        React.createElement("li", { onClick: this.onSellRoom.bind(this, 0) },
                            React.createElement("div", { className: this.state.sellRoomsState == 0 ? "leaseRooms_on" : "leaseRooms" },
                                React.createElement("img", { src: "./fangliangbao/image/demo.png" }),
                                React.createElement("div", { className: "leaseRoomsRight" },
                                    React.createElement("p", { className: "leaseName" },
                                        React.createElement("span", null, "187"),
                                        "m\u00B2"),
                                    React.createElement("p", null,
                                        React.createElement("span", { className: "leasePrice" }, "80.3"),
                                        " \u5143/m\u00B2\u22C5\u6708"),
                                    React.createElement("p", { className: "leaseArea" }, "\u7B80\u88C5")))),
                        React.createElement("li", { onClick: this.onSellRoom.bind(this, 1) },
                            React.createElement("div", { className: this.state.sellRoomsState == 1 ? "leaseRooms_on" : "leaseRooms" },
                                React.createElement("img", { src: "./fangliangbao/image/demo.png" }),
                                React.createElement("div", { className: "leaseRoomsRight" },
                                    React.createElement("p", { className: "leaseName" },
                                        React.createElement("span", null, "187"),
                                        "m\u00B2"),
                                    React.createElement("p", null,
                                        React.createElement("span", { className: "leasePrice" }, "80.3"),
                                        " \u5143/m\u00B2\u22C5\u6708"),
                                    React.createElement("p", { className: "leaseArea" }, "\u7B80\u88C5")))),
                        React.createElement("li", { onClick: this.onSellRoom.bind(this, 2) },
                            React.createElement("div", { className: this.state.sellRoomsState == 2 ? "leaseRooms_on" : "leaseRooms" },
                                React.createElement("img", { src: "./fangliangbao/image/demo.png" }),
                                React.createElement("div", { className: "leaseRoomsRight" },
                                    React.createElement("p", { className: "leaseName" },
                                        React.createElement("span", null, "187"),
                                        "m\u00B2"),
                                    React.createElement("p", null,
                                        React.createElement("span", { className: "leasePrice" }, "80.3"),
                                        " \u5143/m\u00B2\u22C5\u6708"),
                                    React.createElement("p", { className: "leaseArea" }, "\u7B80\u88C5"))))))));
        }
    }
    class CompanyList extends React.Component {
        constructor(props) {
            super(props);
            this.state = {
                typeIndex: 0,
                companyState: -1,
            };
        }
        componentDidMount() {
        }
        onCompany(index) {
            ParkInfoThree.showCompanyInfo();
            this.setState({
                companyState: index
            });
        }
        companytypeIndex(index) {
            this.setState({
                typeIndex: index,
            });
        }
        render() {
            return (React.createElement("div", { className: "leaseListBox" },
                React.createElement("div", { className: "leasetype" },
                    React.createElement("ul", null,
                        React.createElement("li", { onClick: this.companytypeIndex.bind(this, 0), className: this.state.typeIndex == 0 ? "companytype_li_on" : "companytype_li" }, "\u5168\u90E8"),
                        React.createElement("li", { onClick: this.companytypeIndex.bind(this, 1), className: this.state.typeIndex == 1 ? "companytype_li_on" : "companytype_li" }, "\u9AD8\u65B0\u6280\u672F"),
                        React.createElement("li", { onClick: this.companytypeIndex.bind(this, 2), className: this.state.typeIndex == 2 ? "companytype_li_on" : "companytype_li" }, "\u79D1\u6280\u670D\u52A1"),
                        React.createElement("li", { onClick: this.companytypeIndex.bind(this, 3), className: this.state.typeIndex == 3 ? "companytype_li_on" : "companytype_li" }, "\u91D1\u878D\u4FDD\u9669"))),
                React.createElement("div", { className: "leaseRoomList" },
                    React.createElement("ul", null,
                        React.createElement("li", null,
                            React.createElement("div", { className: this.state.companyState == 0 ? "leaseRooms_on" : "leaseRooms" },
                                React.createElement("img", { src: "./fangliangbao/image/demo.png" }),
                                React.createElement("div", { className: "leaseRoomsRight" },
                                    React.createElement("p", { className: "leaseName" }, "\u6D59\u6C5F\u6C38\u62D3\u4FE1\u606F\u79D1\u6280\u6709\u9650\u516C\u4F0F\u89C1\u53F8\u64AD\u653E\u7ED3\u675F\u7684"),
                                    React.createElement("p", { className: "leaseArea", style: { "margin": "3px 0" } },
                                        React.createElement("i", { className: "iconfont ", style: { "font-size": "12px", "color": "rgba(207, 209, 210, 1)" } }, "\uE83C"),
                                        "E\u5EA7B\u533A-3F-301"),
                                    React.createElement("p", { className: "leaseArea" },
                                        React.createElement("i", { className: "iconfont ", style: { "font-size": "12px", "color": "rgba(207, 209, 210, 1)" } }, "\uE83C"),
                                        "\u79D1\u6280\u670D\u52A1")))),
                        React.createElement("li", null,
                            React.createElement("div", { className: this.state.companyState == 1 ? "leaseRooms_on" : "leaseRooms" },
                                React.createElement("img", { src: "./fangliangbao/image/demo.png" }),
                                React.createElement("div", { className: "leaseRoomsRight" },
                                    React.createElement("p", { className: "leaseName" }, "\u6D59\u6C5F\u6C38\u62D3\u4FE1\u606F\u79D1\u6280\u6709\u9650\u516C\u4F0F\u89C1\u53F8\u64AD\u653E\u7ED3\u675F\u7684"),
                                    React.createElement("p", { className: "leaseArea", style: { "margin": "3px 0" } },
                                        React.createElement("i", { className: "iconfont ", style: { "font-size": "12px", "color": "rgba(207, 209, 210, 1)" } }, "\uE83C"),
                                        "E\u5EA7B\u533A-3F-301"),
                                    React.createElement("p", { className: "leaseArea" },
                                        React.createElement("i", { className: "iconfont ", style: { "font-size": "12px", "color": "rgba(207, 209, 210, 1)" } }, "\uE83C"),
                                        "\u79D1\u6280\u670D\u52A1")))),
                        React.createElement("li", null,
                            React.createElement("div", { className: this.state.companyState == 2 ? "leaseRooms_on" : "leaseRooms" },
                                React.createElement("img", { src: "./fangliangbao/image/demo.png" }),
                                React.createElement("div", { className: "leaseRoomsRight" },
                                    React.createElement("p", { className: "leaseName" }, "\u6D59\u6C5F\u6C38\u62D3\u4FE1\u606F\u79D1\u6280\u6709\u9650\u516C\u4F0F\u89C1\u53F8\u64AD\u653E\u7ED3\u675F\u7684"),
                                    React.createElement("p", { className: "leaseArea", style: { "margin": "3px 0" } },
                                        React.createElement("i", { className: "iconfont ", style: { "font-size": "12px", "color": "rgba(207, 209, 210, 1)" } }, "\uE83C"),
                                        "E\u5EA7B\u533A-3F-301"),
                                    React.createElement("p", { className: "leaseArea" },
                                        React.createElement("i", { className: "iconfont ", style: { "font-size": "12px", "color": "rgba(207, 209, 210, 1)" } }, "\uE83C"),
                                        "\u79D1\u6280\u670D\u52A1"))))))));
        }
    }
    class ParkInfoThree extends React.Component {
        constructor(props) {
            super(props);
            this.state = {
                RoomInfoState: "hide",
            };
            ParkInfoThree.showRoomInfo = this.showRoomInfo.bind(this);
            ParkInfoThree.showCompanyInfo = this.showCompanyInfo.bind(this);
        }
        componentDidMount() {
        }
        static showRoomInfo() { }
        ;
        showRoomInfo() {
            this.setState({
                RoomInfoState: "RoomInfoShow",
            });
        }
        static showCompanyInfo() { }
        ;
        showCompanyInfo() {
            this.setState({
                RoomInfoState: "CompanyInfoShow",
            });
        }
        render() {
            return (React.createElement("div", { className: "ParkInfoThree" },
                React.createElement("div", { className: "ParkInfoThree_leftBox" },
                    this.state.RoomInfoState == "RoomInfoShow" ?
                        React.createElement(RoomInfoThreeLeft, null)
                        :
                            null,
                    this.state.RoomInfoState == "CompanyInfoShow" ?
                        React.createElement(CompanyInfoThreeLeft, null)
                        :
                            null,
                    React.createElement(ParkInfoThreeLeft, null)),
                React.createElement("div", { className: "ParkInfoThree_rightBox" },
                    React.createElement(ParkInfoThreeRight, null))));
        }
    }
    class ParkInfoThreeLeft extends React.Component {
        constructor(props) {
            super(props);
            this.state = {
                ParkInfoIndex: 0
            };
        }
        componentDidMount() {
        }
        ParkInfoOn(index) {
            this.setState({
                ParkInfoIndex: index
            });
        }
        render() {
            return (React.createElement("div", { className: "ParkInfoThree_left" },
                React.createElement("div", { className: "ParkInfoThree_left_title" },
                    React.createElement("ul", null,
                        React.createElement("li", { className: this.state.ParkInfoIndex == 0 ? "ParkInfoIndex_in" : null, onClick: this.ParkInfoOn.bind(this, 0) }, "\u56ED\u533A\u4ECB\u7ECD"),
                        React.createElement("li", { className: this.state.ParkInfoIndex == 1 ? "ParkInfoIndex_in" : null, onClick: this.ParkInfoOn.bind(this, 1) }, "\u533A\u4F4D\u4F18\u52BF"),
                        React.createElement("li", { className: this.state.ParkInfoIndex == 2 ? "ParkInfoIndex_in" : null, onClick: this.ParkInfoOn.bind(this, 2) }, "\u4F18\u60E0\u653F\u7B56"),
                        React.createElement("li", { className: this.state.ParkInfoIndex == 3 ? "ParkInfoIndex_in" : null, onClick: this.ParkInfoOn.bind(this, 3) }, "\u56ED\u533A\u98CE\u91C7"))),
                React.createElement("div", { className: "ParkInfoThree_left_text" },
                    this.state.ParkInfoIndex == 0 ?
                        React.createElement("div", { className: "ParkInfo_text parkIntroduced", id: "parkIntroduced" },
                            React.createElement("p", null, "\u5730\u5904\u5E7F\u5DDE\u3001\u987A\u5FB7\u3001\u4E2D\u5C71\u3001\u4E1C\u839E\u3001\u73E0\u6D77\u3001\u6DF1\u5733\u7B49\u5730\u4E4B\u67A2\u7EBD\uFF0C\u5360\u8E1E\u756A\u79BA\u7684\u6838\u5FC3\u4F4D\u7F6E\u3002\u524D\u8EAB\u662F\u6C38\u9686\u5236\u8863\u5382\uFF0C2010\u5E74\u7ECF\u6539\u9020\uFF0C\u6210\u4E3A\u4E86\u9752\u74E6\u767D\u5899\uFF0C\u8BD7\u60C5\u753B\u610F\u7684\u521B\u610F\u56ED\u533A\u3002 \u4EA7\u4E1A\u56ED\u53D6\u540D\u82B1\u57CE\uFF0C\u96C6\u5408\u4E86\u7EFF\u8272\u82B1\u57CE\u3001\u5386\u53F2\u82B1"),
                            React.createElement("p", null, "\u5730\u5904\u5E7F\u5DDE\u3001\u987A\u5FB7\u3001\u4E2D\u5C71\u3001\u4E1C\u839E\u3001\u73E0\u6D77\u3001\u6DF1\u5733\u7B49\u5730\u4E4B\u67A2\u7EBD\uFF0C\u5360\u8E1E\u756A\u79BA\u7684\u6838\u5FC3\u4F4D\u7F6E\u3002\u524D\u8EAB\u662F\u6C38\u9686\u5236\u8863\u5382\uFF0C2010\u5E74\u7ECF\u6539\u9020\uFF0C\u6210\u4E3A\u4E86\u9752\u74E6\u767D\u5899\uFF0C\u8BD7\u60C5\u753B\u610F\u7684\u521B\u610F\u56ED\u533A\u3002 \u4EA7\u4E1A\u56ED\u53D6\u540D\u82B1\u57CE\uFF0C\u96C6\u5408\u4E86\u7EFF\u8272\u82B1\u57CE\u3001\u5386\u53F2\u82B1\uFF0C\u5730\u5904\u5E7F\u5DDE\u3001\u987A\u5FB7\u3001\u4E2D\u5C71\u3001\u4E1C\u839E\u3001\u73E0\u6D77\u3001\u6DF1\u5733\u7B49\u5730\u4E4B\u67A2\u7EBD\uFF0C\u5360\u8E1E\u756A\u79BA\u7684\u6838\u5FC3\u4F4D\u7F6E\u3002\u524D\u8EAB\u662F\u6C38\u9686\u5236\u8863\u5382\uFF0C2010\u5E74\u7ECF\u6539\u9020\uFF0C\u6210\u4E3A\u4E86\u9752\u74E6\u767D\u5899\uFF0C\u8BD7\u60C5\u753B\u610F\u7684\u521B\u610F\u56ED\u533A\u3002 \u4EA7\u4E1A\u56ED\u53D6\u540D\u82B1\u57CE\uFF0C\u96C6\u5408\u4E86\u7EFF\u8272\u82B1\u57CE\u3001\u5386\u53F2\u82B1"),
                            React.createElement("p", null, "\u5730\u5904\u5E7F\u5DDE\u3001\u987A\u5FB7\u3001\u4E2D\u5C71\u3001\u4E1C\u839E\u3001\u73E0\u6D77\u3001\u6DF1\u5733\u7B49\u5730\u4E4B\u67A2\u7EBD\uFF0C\u5360\u8E1E\u756A\u79BA\u7684\u6838\u5FC3\u4F4D\u7F6E\u3002\u524D\u8EAB\u662F\u6C38\u9686\u5236\u8863\u5382\uFF0C2010\u5E74\u7ECF\u6539\u9020\uFF0C\u6210\u4E3A\u4E86\u9752\u74E6\u767D\u5899\uFF0C\u8BD7\u60C5\u753B\u610F\u7684\u521B\u610F\u56ED\u533A\u3002 \u4EA7\u4E1A\u56ED\u53D6\u540D\u82B1\u57CE\uFF0C\u96C6\u5408\u4E86\u7EFF\u8272\u82B1\u57CE\u3001\u5386\u53F2\u82B1"))
                        : null,
                    this.state.ParkInfoIndex == 1 ?
                        React.createElement("div", { className: "ParkInfo_text advantage", id: "advantage" },
                            React.createElement("p", null, "\u5730\u5904\u5E7F\u5DDE\u3001\u987A\u5FB7\u3001\u4E2D\u5C71\u3001\u4E1C\u839E\u3001\u73E0\u6D77\u3001\u6DF1\u5733\u7B49\u5730\u4E4B\u67A2\u7EBD\uFF0C\u5360\u8E1E\u756A\u79BA\u7684\u6838\u5FC3\u4F4D\u7F6E\u3002\u524D\u8EAB\u662F\u6C38\u9686\u5236\u8863\u5382\uFF0C2010\u5E74\u7ECF\u6539\u9020\uFF0C\u6210\u4E3A\u4E86\u9752\u74E6\u767D\u5899\uFF0C\u8BD7\u60C5\u753B\u610F\u7684\u521B\u610F\u56ED\u533A\u3002 \u4EA7\u4E1A\u56ED\u53D6\u540D\u82B1\u57CE\uFF0C\u96C6\u5408\u4E86\u7EFF\u8272\u82B1\u57CE\u3001\u5386\u53F2\u82B1"),
                            React.createElement("p", null, "\u5730\u5904\u5E7F\u5DDE\u3001\u987A\u5FB7\u3001\u4E2D\u5C71\u3001\u4E1C\u839E\u3001\u73E0\u6D77\u3001\u6DF1\u5733\u7B49\u5730\u4E4B\u67A2\u7EBD\uFF0C\u5360\u8E1E\u756A\u79BA\u7684\u6838\u5FC3\u4F4D\u7F6E\u3002\u524D\u8EAB\u662F\u6C38\u9686\u5236\u8863\u5382\uFF0C2010\u5E74\u7ECF\u6539\u9020\uFF0C\u6210\u4E3A\u4E86\u9752\u74E6\u767D\u5899\uFF0C\u8BD7\u60C5\u753B\u610F\u7684\u521B\u610F\u56ED\u533A\u3002 \u4EA7\u4E1A\u56ED\u53D6\u540D\u82B1\u57CE\uFF0C\u96C6\u5408\u4E86\u7EFF\u8272\u82B1\u57CE\u3001\u5386\u53F2\u82B1"))
                        : null,
                    this.state.ParkInfoIndex == 2 ?
                        React.createElement("div", { className: "ParkInfo_text discounts", id: "discounts" },
                            React.createElement("p", null, "\u5730\u5904\u5E7F\u5DDE\u3001\u987A\u5FB7\u3001\u4E2D\u5C71\u3001\u4E1C\u839E\u3001\u73E0\u6D77\u3001\u6DF1\u5733\u7B49\u5730\u4E4B\u67A2\u7EBD\uFF0C\u5360\u8E1E\u756A\u79BA\u7684\u6838\u5FC3\u4F4D\u7F6E\u3002\u524D\u8EAB\u662F\u6C38\u9686\u5236\u8863\u5382\uFF0C2010\u5E74\u7ECF\u6539\u9020\uFF0C\u6210\u4E3A\u4E86\u9752\u74E6\u767D\u5899\uFF0C\u8BD7\u60C5\u753B\u610F\u7684\u521B\u610F\u56ED\u533A\u3002 \u4EA7\u4E1A\u56ED\u53D6\u540D\u82B1\u57CE\uFF0C\u96C6\u5408\u4E86\u7EFF\u8272\u82B1\u57CE\u3001\u5386\u53F2\u82B1"))
                        : null,
                    this.state.ParkInfoIndex == 3 ?
                        React.createElement("div", { className: "ParkInfo_text parkElegant", id: "parkElegant" },
                            React.createElement("div", { className: "infoImg" },
                                React.createElement("div", { className: "infoImg_left" },
                                    React.createElement("i", { className: "iconfont " }, "\uE83C")),
                                React.createElement("div", { className: "infoImg_ul" },
                                    React.createElement("ul", null,
                                        React.createElement("li", null,
                                            " ",
                                            React.createElement("img", { src: "./fangliangbao/image/demo.png" })),
                                        React.createElement("li", null,
                                            " ",
                                            React.createElement("img", { src: "./fangliangbao/image/demo.png" })),
                                        React.createElement("li", null,
                                            " ",
                                            React.createElement("img", { src: "./fangliangbao/image/demo.png" })))),
                                React.createElement("p", { className: "infoImg_num" },
                                    React.createElement("span", null, "2"),
                                    " / ",
                                    React.createElement("span", null, "8")),
                                React.createElement("div", { className: "infoImg_right" },
                                    React.createElement("i", { className: "iconfont " }, "\uE83C"))))
                        : null)));
        }
    }
    class RoomInfoThreeLeft extends React.Component {
        constructor(props) {
            super(props);
            this.state = {
                RoomInfoIndex: 0,
                RoomInfoThreeLeft: "RoomInfoThreeLeft_part"
            };
        }
        componentDidMount() {
        }
        roomInfoOn(index) {
            console.log('roomInfoOn', index);
            if (index == 1) {
                this.setState({
                    RoomInfoThreeLeft: "RoomInfoThreeLeft_all",
                    RoomInfoIndex: index,
                });
            }
            else if (index == 2) {
                this.setState({
                    RoomInfoThreeLeft: "RoomInfoThreeLeft_all",
                    RoomInfoIndex: index,
                });
            }
            else {
                console.log('roomInfoOn0000', index);
                this.setState({
                    RoomInfoThreeLeft: "RoomInfoThreeLeft_part",
                    RoomInfoIndex: index,
                });
            }
        }
        render() {
            return (React.createElement("div", { className: this.state.RoomInfoThreeLeft },
                React.createElement("p", { className: "roomInfo_tit" }, "\u51FA\u79DF\uFF01\u9AD8\u65B0\u533A\u4FE1\u606F\u4EA7\u4E1A\u56ED\u8C6A\u534E\u88C5\u4FEE\u5355\u5143"),
                React.createElement("div", { className: "ParkInfoThree_left_title" },
                    React.createElement("ul", null,
                        React.createElement("li", { className: this.state.RoomInfoIndex == 0 ? "ParkInfoIndex_in" : null, onClick: this.roomInfoOn.bind(this, 0) }, "\u623F\u6E90\u6982\u51B5"),
                        React.createElement("li", { className: this.state.RoomInfoIndex == 1 ? "ParkInfoIndex_in" : null, onClick: this.roomInfoOn.bind(this, 1) }, "\u5B9E\u62CD\u7167\u7247"),
                        React.createElement("li", { className: this.state.RoomInfoIndex == 2 ? "ParkInfoIndex_in" : null, onClick: this.roomInfoOn.bind(this, 2) }, "\u5B9E\u62CD\u89C6\u9891"))),
                this.state.RoomInfoIndex == 0 ?
                    React.createElement("div", { className: "roomInfoBox" },
                        React.createElement("ul", { className: "roomInfoBox_one" },
                            React.createElement("li", null,
                                React.createElement("span", { style: { "font-size": "46px", "font-weight": "bold", "color": "rgba(220,26,63,1)" } }, "98"),
                                " \u5143/m\u00B2\u22C5\u6708"),
                            React.createElement("li", null,
                                "\u603B\u4EF7\uFF1A",
                                React.createElement("span", null, "19,600\u202C"),
                                " \u5143/m\u00B2\u22C5\u6708"),
                            React.createElement("li", { style: { "margin": "0px 24px" } },
                                React.createElement("p", null, "\u5EFA\u7B51\u9762\u79EF"),
                                React.createElement("p", { className: "ribo_bold" },
                                    React.createElement("span", null, "200"),
                                    "m\u00B2")),
                            React.createElement("li", { style: { "margin": "0px 24px" } },
                                React.createElement("p", null, "\u53EF\u5BB9\u7EB3\u5DE5\u4F4D"),
                                React.createElement("p", { className: "ribo_bold" },
                                    React.createElement("span", null, "29~58"),
                                    "\u4E2A\u5DE5\u4F4D")),
                            React.createElement("li", { style: { "margin": "0px 24px" } },
                                React.createElement("p", null, "\u88C5\u4FEE\u7A0B\u5EA6"),
                                React.createElement("p", { className: "ribo_bold" }, "\u4E2D\u7B49\u88C5\u4FEE"))),
                        React.createElement("ul", { className: "roomInfoBox_two" },
                            React.createElement("li", null,
                                "\u514D\u79DF\u65F6\u95F4 ",
                                React.createElement("span", null, "\u9762\u8BAE")),
                            React.createElement("li", null,
                                "\u603B\u5171\u697C\u5C42 ",
                                React.createElement("span", null, "12\u5C42")),
                            React.createElement("li", null,
                                "\u6240\u5728\u697C\u5C42 ",
                                React.createElement("span", null, "6\u5C42")),
                            React.createElement("li", null,
                                "\u7535",
                                React.createElement("span", { style: { "margin-left": "28px", "color": "rgba(152,159,168,1)" } }, "\u68AF"),
                                React.createElement("span", null, "\u6709\u7535\u68AF")),
                            React.createElement("li", null,
                                "\u770B\u623F\u65F6\u95F4 ",
                                React.createElement("span", null, "\u8054\u7CFB\u987E\u95EE\uFF0C\u968F\u65F6\u53EF\u770B")),
                            React.createElement("li", null,
                                "\u66F4\u65B0\u65F6\u95F4 ",
                                React.createElement("span", null, "14\u5C0F\u65F6\u524D"))))
                    : null,
                this.state.RoomInfoIndex == 1 ?
                    React.createElement("div", { className: "infoImg" },
                        React.createElement("div", { className: "infoImg_left" },
                            React.createElement("i", { className: "iconfont " }, "\uE83C")),
                        React.createElement("div", { className: "infoImg_ul" },
                            React.createElement("ul", null,
                                React.createElement("li", null,
                                    " ",
                                    React.createElement("img", { src: "./fangliangbao/image/build.png" })),
                                React.createElement("li", null,
                                    " ",
                                    React.createElement("img", { src: "./fangliangbao/image/build.png" })),
                                React.createElement("li", null,
                                    " ",
                                    React.createElement("img", { src: "./fangliangbao/image/build.png" })))),
                        React.createElement("p", { className: "infoImg_num" },
                            React.createElement("span", null, "2"),
                            " / ",
                            React.createElement("span", null, "8")),
                        React.createElement("div", { className: "infoImg_right" },
                            React.createElement("i", { className: "iconfont " }, "\uE83C")))
                    : null,
                this.state.RoomInfoIndex == 2 ?
                    React.createElement("div", { className: "infoImg" },
                        React.createElement("div", { className: "infoImg_left" },
                            React.createElement("i", { className: "iconfont " }, "\uE83C")),
                        React.createElement("div", { className: "infoImg_ul" },
                            React.createElement("ul", null,
                                React.createElement("li", null,
                                    " ",
                                    React.createElement("img", { src: "./fangliangbao/image/build.png" })),
                                React.createElement("li", null,
                                    " ",
                                    React.createElement("img", { src: "./fangliangbao/image/build.png" })),
                                React.createElement("li", null,
                                    " ",
                                    React.createElement("img", { src: "./fangliangbao/image/build.png" })))),
                        React.createElement("p", { className: "infoImg_num" },
                            React.createElement("span", null, "2"),
                            " / ",
                            React.createElement("span", null, "8")),
                        React.createElement("div", { className: "infoImg_right" },
                            React.createElement("i", { className: "iconfont " }, "\uE83C")))
                    : null));
        }
    }
    class CompanyInfoThreeLeft extends React.Component {
        constructor(props) {
            super(props);
            this.state = {
                RoomInfoIndex: 0,
                RoomInfoThreeLeft: "RoomInfoThreeLeft_part"
            };
        }
        componentDidMount() {
        }
        roomInfoOn(index) {
            this.setState({
                RoomInfoIndex: index,
            });
        }
        onChange(a, b, c) {
            console.log(a, b, c);
        }
        render() {
            return (React.createElement("div", { className: "RoomInfoThreeLeft" },
                React.createElement("div", { className: "ParkInfoThree_left_title" },
                    React.createElement("ul", null,
                        React.createElement("li", { className: this.state.RoomInfoIndex == 0 ? "ParkInfoIndex_in" : null, onClick: this.roomInfoOn.bind(this, 0) }, "\u4F01\u4E1A\u4FE1\u606F"),
                        React.createElement("li", { className: this.state.RoomInfoIndex == 1 ? "ParkInfoIndex_in" : null, onClick: this.roomInfoOn.bind(this, 1) }, "\u4F01\u4E1A\u98CE\u91C7"),
                        React.createElement("li", { className: this.state.RoomInfoIndex == 2 ? "ParkInfoIndex_in" : null, onClick: this.roomInfoOn.bind(this, 2) }, "\u4F01\u4E1A\u8BE6\u60C5"),
                        React.createElement("li", { className: this.state.RoomInfoIndex == 3 ? "ParkInfoIndex_in" : null, onClick: this.roomInfoOn.bind(this, 3) }, "\u4EA7\u54C1\u5C55\u793A"))),
                this.state.RoomInfoIndex == 0 ?
                    React.createElement("div", null, "\"000000000\"")
                    : null,
                this.state.RoomInfoIndex == 1 ?
                    React.createElement("div", { className: "infoImg" },
                        React.createElement("div", { className: "infoImg_left" },
                            React.createElement("i", { className: "iconfont " }, "\uE83C")),
                        React.createElement("div", { className: "infoImg_ul" },
                            React.createElement("ul", null,
                                React.createElement("li", null,
                                    " ",
                                    React.createElement("img", { src: "./fangliangbao/image/demo.png" })),
                                React.createElement("li", null,
                                    " ",
                                    React.createElement("img", { src: "./fangliangbao/image/demo.png" })),
                                React.createElement("li", null,
                                    " ",
                                    React.createElement("img", { src: "./fangliangbao/image/demo.png" })))),
                        React.createElement("p", { className: "infoImg_num" },
                            React.createElement("span", null, "2"),
                            " / ",
                            React.createElement("span", null, "8")),
                        React.createElement("div", { className: "infoImg_rightt" },
                            React.createElement("i", { className: "iconfont " }, "\uE83C")))
                    : null,
                this.state.RoomInfoIndex == 2 ?
                    React.createElement("div", { className: "infoImg" },
                        React.createElement("div", { className: "infoImg_left" },
                            React.createElement("i", { className: "iconfont " }, "\uE83C")),
                        React.createElement("div", { className: "infoImg_ul" },
                            React.createElement("ul", null,
                                React.createElement("li", null,
                                    " ",
                                    React.createElement("img", { src: "./fangliangbao/image/demo.png" })),
                                React.createElement("li", null,
                                    " ",
                                    React.createElement("img", { src: "./fangliangbao/image/demo.png" })),
                                React.createElement("li", null,
                                    " ",
                                    React.createElement("img", { src: "./fangliangbao/image/demo.png" })))),
                        React.createElement("p", { className: "infoImg_num" },
                            React.createElement("span", null, "2"),
                            " / ",
                            React.createElement("span", null, "8")),
                        React.createElement("div", { className: "infoImg_rightt" },
                            React.createElement("i", { className: "iconfont " }, "\uE83C")))
                    : null,
                this.state.RoomInfoIndex == 3 ?
                    React.createElement("div", { className: "infoImg" },
                        React.createElement("div", { className: "infoImg_left" },
                            React.createElement("i", { className: "iconfont " }, "\uE83C")),
                        React.createElement("div", { className: "infoImg_ul" },
                            React.createElement("ul", null,
                                React.createElement("li", null,
                                    " ",
                                    React.createElement("img", { src: "./fangliangbao/image/demo.png" })),
                                React.createElement("li", null,
                                    " ",
                                    React.createElement("img", { src: "./fangliangbao/image/demo.png" })),
                                React.createElement("li", null,
                                    " ",
                                    React.createElement("img", { src: "./fangliangbao/image/demo.png" })))),
                        React.createElement("p", { className: "infoImg_num" },
                            React.createElement("span", null, "2"),
                            " / ",
                            React.createElement("span", null, "8")),
                        React.createElement("div", { className: "infoImg_rightt" },
                            React.createElement("i", { className: "iconfont " }, "\uE83C")))
                    : null));
        }
    }
    class ParkInfoThreeRight extends React.Component {
        constructor(props) {
            super(props);
            this.state = {
                needText: "如：在广州白云区寻找200m2左右的办公室，租金在80元/m2·天，临近地铁站。",
                phone: "输入您的手机号码",
            };
        }
        componentDidMount() {
        }
        getNeed() {
            console.log(this.state);
        }
        render() {
            return (React.createElement("div", { className: "ParkInfoThree_right" },
                React.createElement("p", { className: "pitr_title" }, "\u54A8\u8BE2\u987E\u95EE"),
                React.createElement("div", { className: "ParkInfoThree_right_one" },
                    React.createElement("img", { src: "./fangliangbao/image/demo.png" }),
                    React.createElement("div", { className: "pitro_rb" },
                        React.createElement("p", { className: "pitro_name" }, "\u5F20\u4E09\u4E09"),
                        React.createElement("div", { className: "pitro_text1" }, "\u8BE5\u56ED\u533A\u4E0E\u623F\u6E90\u7531\u6211\u7EF4\u62A4\uFF0C\u719F\u77E5\u56ED\u533A\u653F\u7B56\u4E0E\u5468\u8FB9\u73AF\u5883"),
                        React.createElement("p", { className: "pitro_text2" },
                            "\u514D\u8D39\u54A8\u8BE2   ",
                            React.createElement("span", { style: { "font-size": "16px", "font-weight": "bold", "margin-left": "5px" } }, "15578380203")))),
                React.createElement("div", { className: "ParkInfoThree_right_two" },
                    React.createElement("p", { className: "pitr_title" }, "\u5B9D\u54E5\u5E2E\u627E\u623F"),
                    React.createElement("p", { className: "pitrt_inp" },
                        React.createElement("i", { className: "iconfont ", style: { "margin-right": "5px", "font-size": "14px" } }, "\uE83C"),
                        React.createElement("input", { type: "text", value: this.state.phone }))),
                React.createElement("div", { className: "ParkInfoThree_right_three" },
                    React.createElement("p", { className: "pitrth_text1" }, "\u60A8\u7684\u9700\u6C42\uFF1A"),
                    React.createElement("textarea", { value: this.state.needText }),
                    React.createElement("input", { type: "button" })),
                React.createElement("input", { type: "button", value: "\u7ACB\u5373\u59D4\u6258", className: "pitr_btn", onClick: this.getNeed.bind(this) })));
        }
    }
    exports.default = ParkInfo;
});
define("ParkInfo (6)", ["require", "exports", "react", "HomeTop", "allBottom", "InfoTitle"], function (require, exports, React, HomeTop_6, AllBottom_6, InfoTitle_5) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    class ParkInfo extends React.Component {
        constructor(props) {
            super(props);
            this.state = {};
        }
        render() {
            return (React.createElement("div", { className: "infoPage" },
                React.createElement(HomeTop_6.default, null),
                React.createElement("div", { className: "parkInfo" },
                    React.createElement("div", { className: "parkInfoBox_title" },
                        React.createElement(InfoTitle_5.default, null),
                        React.createElement(ParkInfoOne, null)),
                    React.createElement("div", { className: "parkInfoBox_list" },
                        React.createElement(ParkInfoTwo, null)),
                    React.createElement("div", { className: "parkInfoBox_text" },
                        React.createElement(ParkInfoThree, null))),
                React.createElement("div", { className: "parkInfo_bottom" },
                    React.createElement(AllBottom_6.default, null))));
        }
    }
    class ParkInfoOne extends React.Component {
        constructor(props) {
            super(props);
            this.state = {};
        }
        componentDidMount() {
        }
        render() {
            return (React.createElement("div", { className: "ParkInfoOne" },
                React.createElement("div", { className: "ParkInfoOne_html" },
                    React.createElement("p", null,
                        React.createElement("span", null, "\u5E7F\u5DDE"),
                        " ",
                        React.createElement("span", null, "\u54C1\u724C\u56ED\u533A"),
                        React.createElement("i", { className: "jiange" }, " > "),
                        React.createElement("span", null, "\u8D8A\u79C0"),
                        React.createElement("i", { className: "jiange" }, " > "),
                        React.createElement("span", null, "\u5317\u4EAC\u8DEF"))),
                React.createElement("div", { className: "ParkInfoOne_info" },
                    React.createElement("p", null, "\u4FE1\u606F\u4EA7\u4E1A\u56ED"),
                    React.createElement("ul", null,
                        React.createElement("li", null,
                            React.createElement("i", { className: "iconfont " }, "\uE83C"),
                            "\u6536\u85CF"),
                        React.createElement("li", null,
                            React.createElement("i", { className: "iconfont " }, "\uE83C"),
                            "\u5206\u4EAB")))));
        }
    }
    class ParkInfoTwo extends React.Component {
        constructor(props) {
            super(props);
            this.state = {
                index: 0,
                ParkInfoTwoState: "ParkInfoTwoAll",
                ParkInfoTwoListState: "ParkInfoTwoList",
                listTrun: "ParkInfoTwoListTrun",
                listTrun_text: "收起列表"
            };
        }
        componentDidMount() {
        }
        changeTitle(index) {
            this.setState({
                index: index
            });
        }
        overTitle() {
            if (this.state.ParkInfoTwoState == "ParkInfoTwoAll") {
                this.setState({
                    ParkInfoTwoState: "ParkInfoTwoOver",
                    ParkInfoTwoListState: "hide",
                    listTrun: "ParkInfoTwoListTrunUp",
                    listTrun_text: "展开列表",
                });
            }
            else {
                this.setState({
                    ParkInfoTwoState: "ParkInfoTwoAll",
                    ParkInfoTwoListState: "ParkInfoTwoList",
                    listTrun: "ParkInfoTwoListTrun",
                    listTrun_text: "收起列表"
                });
            }
        }
        render() {
            return (React.createElement("div", { className: this.state.ParkInfoTwoState },
                React.createElement("div", { className: "ParkInfoTwoTitle" },
                    React.createElement("ul", null,
                        React.createElement("li", { className: this.state.index == 0 ? "ParkInfoTwoTitleActive" : null, onClick: this.changeTitle.bind(this, 0) }, "\u51FA\u79DF\u623F\u6E90"),
                        React.createElement("li", { className: this.state.index == 1 ? "ParkInfoTwoTitleActive" : null, onClick: this.changeTitle.bind(this, 1) }, "\u51FA\u552E\u623F\u6E90"),
                        React.createElement("li", { className: this.state.index == 2 ? "ParkInfoTwoTitleActive" : null, onClick: this.changeTitle.bind(this, 2) }, "\u5165\u9A7B\u4F01\u4E1A"))),
                React.createElement("div", { className: this.state.ParkInfoTwoListState },
                    this.state.index == 0 ?
                        React.createElement(LeaseList, null)
                        : null,
                    this.state.index == 1 ?
                        React.createElement(SellList, null)
                        : null,
                    this.state.index == 2 ?
                        React.createElement(CompanyList, null)
                        : null),
                React.createElement("div", { className: this.state.listTrun, onClick: this.overTitle.bind(this) }, this.state.listTrun_text)));
        }
    }
    class LeaseList extends React.Component {
        constructor(props) {
            super(props);
            this.state = {
                typeIndex: 0,
                leaseRoomsState: -1,
            };
        }
        componentDidMount() {
        }
        onLeaseRoom(index) {
            ParkInfoThree.showRoomInfo();
            this.setState({
                leaseRoomsState: index
            });
        }
        leasetypeIndex(index) {
            this.setState({
                typeIndex: index,
            });
        }
        render() {
            return (React.createElement("div", { className: "leaseListBox" },
                React.createElement("div", { className: "leasetype" },
                    React.createElement("ul", null,
                        React.createElement("li", { onClick: this.leasetypeIndex.bind(this, 0) },
                            React.createElement("div", { className: this.state.typeIndex == 0 ? "leasetype_li_on" : "leasetype_li" },
                                React.createElement("p", { style: { "padding-top": "6px" } }, "\u5168\u90E8\u6237\u578B"),
                                React.createElement("p", null,
                                    React.createElement("span", null, "XX"),
                                    "\u5957"))),
                        React.createElement("li", { onClick: this.leasetypeIndex.bind(this, 1) },
                            React.createElement("div", { className: this.state.typeIndex == 1 ? "leasetype_li_on" : "leasetype_li" },
                                React.createElement("p", { style: { "padding-top": "6px" } }, "100m\u00B2\u4EE5\u4E0B"),
                                React.createElement("p", null,
                                    React.createElement("span", null, "XX"),
                                    "\u5957"))),
                        React.createElement("li", { onClick: this.leasetypeIndex.bind(this, 2) },
                            React.createElement("div", { className: this.state.typeIndex == 2 ? "leasetype_li_on" : "leasetype_li" },
                                React.createElement("p", { style: { "padding-top": "6px" } }, "100-200m\u00B2"),
                                React.createElement("p", null,
                                    React.createElement("span", null, "XX"),
                                    "\u5957"))),
                        React.createElement("li", { onClick: this.leasetypeIndex.bind(this, 3) },
                            React.createElement("div", { className: this.state.typeIndex == 3 ? "leasetype_li_on" : "leasetype_li" },
                                React.createElement("p", { style: { "padding-top": "6px" } }, "300-500m\u00B2"),
                                React.createElement("p", null,
                                    React.createElement("span", null, "XX"),
                                    "\u5957"))))),
                React.createElement("div", { className: "leaseRoomList" },
                    React.createElement("ul", null,
                        React.createElement("li", { onClick: this.onLeaseRoom.bind(this, 0) },
                            React.createElement("div", { className: this.state.leaseRoomsState == 0 ? "leaseRooms_on" : "leaseRooms" },
                                React.createElement("img", { src: "./fangliangbao/image/demo.png" }),
                                React.createElement("div", { className: "leaseRoomsRight" },
                                    React.createElement("p", { className: "leaseName" },
                                        React.createElement("span", null, "187"),
                                        "m\u00B2"),
                                    React.createElement("p", null,
                                        React.createElement("span", { className: "leasePrice" }, "80.3"),
                                        " \u5143/m\u00B2\u22C5\u6708"),
                                    React.createElement("p", { className: "leaseArea" }, "\u7B80\u88C5")))),
                        React.createElement("li", { onClick: this.onLeaseRoom.bind(this, 1) },
                            React.createElement("div", { className: this.state.leaseRoomsState == 1 ? "leaseRooms_on" : "leaseRooms" },
                                React.createElement("img", { src: "./fangliangbao/image/demo.png" }),
                                React.createElement("div", { className: "leaseRoomsRight" },
                                    React.createElement("p", { className: "leaseName" },
                                        React.createElement("span", null, "187"),
                                        "m\u00B2"),
                                    React.createElement("p", null,
                                        React.createElement("span", { className: "leasePrice" }, "80.3"),
                                        " \u5143/m\u00B2\u22C5\u6708"),
                                    React.createElement("p", { className: "leaseArea" }, "\u7B80\u88C5")))),
                        React.createElement("li", { onClick: this.onLeaseRoom.bind(this, 2) },
                            React.createElement("div", { className: this.state.leaseRoomsState == 2 ? "leaseRooms_on" : "leaseRooms" },
                                React.createElement("img", { src: "./fangliangbao/image/demo.png" }),
                                React.createElement("div", { className: "leaseRoomsRight" },
                                    React.createElement("p", { className: "leaseName" },
                                        React.createElement("span", null, "187"),
                                        "m\u00B2"),
                                    React.createElement("p", null,
                                        React.createElement("span", { className: "leasePrice" }, "80.3"),
                                        " \u5143/m\u00B2\u22C5\u6708"),
                                    React.createElement("p", { className: "leaseArea" }, "\u7B80\u88C5"))))))));
        }
    }
    class SellList extends React.Component {
        constructor(props) {
            super(props);
            this.state = {
                typeIndex: 0,
                sellRoomsState: -1,
            };
        }
        componentDidMount() {
        }
        onSellRoom(index) {
            ParkInfoThree.showRoomInfo();
            this.setState({
                sellRoomsState: index
            });
        }
        selltypeIndex(index) {
            this.setState({
                typeIndex: index,
            });
        }
        render() {
            return (React.createElement("div", { className: "leaseListBox" },
                React.createElement("div", { className: "leasetype" },
                    React.createElement("ul", null,
                        React.createElement("li", { onClick: this.selltypeIndex.bind(this, 0) },
                            React.createElement("div", { className: this.state.typeIndex == 0 ? "leasetype_li_on" : "leasetype_li" },
                                React.createElement("p", { style: { "padding-top": "6px" } }, "\u5168\u90E8\u6237\u578B"),
                                React.createElement("p", null,
                                    React.createElement("span", null, "XX"),
                                    "\u5957"))),
                        React.createElement("li", { onClick: this.selltypeIndex.bind(this, 1) },
                            React.createElement("div", { className: this.state.typeIndex == 1 ? "leasetype_li_on" : "leasetype_li" },
                                React.createElement("p", { style: { "padding-top": "6px" } }, "100m\u00B2\u4EE5\u4E0B"),
                                React.createElement("p", null,
                                    React.createElement("span", null, "XX"),
                                    "\u5957"))),
                        React.createElement("li", { onClick: this.selltypeIndex.bind(this, 2) },
                            React.createElement("div", { className: this.state.typeIndex == 2 ? "leasetype_li_on" : "leasetype_li" },
                                React.createElement("p", { style: { "padding-top": "6px" } }, "100-200m\u00B2"),
                                React.createElement("p", null,
                                    React.createElement("span", null, "XX"),
                                    "\u5957"))),
                        React.createElement("li", { onClick: this.selltypeIndex.bind(this, 3) },
                            React.createElement("div", { className: this.state.typeIndex == 3 ? "leasetype_li_on" : "leasetype_li" },
                                React.createElement("p", { style: { "padding-top": "6px" } }, "300-500m\u00B2"),
                                React.createElement("p", null,
                                    React.createElement("span", null, "XX"),
                                    "\u5957"))))),
                React.createElement("div", { className: "leaseRoomList" },
                    React.createElement("ul", null,
                        React.createElement("li", { onClick: this.onSellRoom.bind(this, 0) },
                            React.createElement("div", { className: this.state.sellRoomsState == 0 ? "leaseRooms_on" : "leaseRooms" },
                                React.createElement("img", { src: "./fangliangbao/image/demo.png" }),
                                React.createElement("div", { className: "leaseRoomsRight" },
                                    React.createElement("p", { className: "leaseName" },
                                        React.createElement("span", null, "187"),
                                        "m\u00B2"),
                                    React.createElement("p", null,
                                        React.createElement("span", { className: "leasePrice" }, "80.3"),
                                        " \u5143/m\u00B2\u22C5\u6708"),
                                    React.createElement("p", { className: "leaseArea" }, "\u7B80\u88C5")))),
                        React.createElement("li", { onClick: this.onSellRoom.bind(this, 1) },
                            React.createElement("div", { className: this.state.sellRoomsState == 1 ? "leaseRooms_on" : "leaseRooms" },
                                React.createElement("img", { src: "./fangliangbao/image/demo.png" }),
                                React.createElement("div", { className: "leaseRoomsRight" },
                                    React.createElement("p", { className: "leaseName" },
                                        React.createElement("span", null, "187"),
                                        "m\u00B2"),
                                    React.createElement("p", null,
                                        React.createElement("span", { className: "leasePrice" }, "80.3"),
                                        " \u5143/m\u00B2\u22C5\u6708"),
                                    React.createElement("p", { className: "leaseArea" }, "\u7B80\u88C5")))),
                        React.createElement("li", { onClick: this.onSellRoom.bind(this, 2) },
                            React.createElement("div", { className: this.state.sellRoomsState == 2 ? "leaseRooms_on" : "leaseRooms" },
                                React.createElement("img", { src: "./fangliangbao/image/demo.png" }),
                                React.createElement("div", { className: "leaseRoomsRight" },
                                    React.createElement("p", { className: "leaseName" },
                                        React.createElement("span", null, "187"),
                                        "m\u00B2"),
                                    React.createElement("p", null,
                                        React.createElement("span", { className: "leasePrice" }, "80.3"),
                                        " \u5143/m\u00B2\u22C5\u6708"),
                                    React.createElement("p", { className: "leaseArea" }, "\u7B80\u88C5"))))))));
        }
    }
    class CompanyList extends React.Component {
        constructor(props) {
            super(props);
            this.state = {
                typeIndex: 0,
                companyState: -1,
            };
        }
        componentDidMount() {
        }
        onCompany(index) {
            ParkInfoThree.showCompanyInfo();
            this.setState({
                companyState: index
            });
        }
        companytypeIndex(index) {
            this.setState({
                typeIndex: index,
            });
        }
        render() {
            return (React.createElement("div", { className: "leaseListBox" },
                React.createElement("div", { className: "leasetype" },
                    React.createElement("ul", null,
                        React.createElement("li", { onClick: this.companytypeIndex.bind(this, 0), className: this.state.typeIndex == 0 ? "companytype_li_on" : "companytype_li" }, "\u5168\u90E8"),
                        React.createElement("li", { onClick: this.companytypeIndex.bind(this, 1), className: this.state.typeIndex == 1 ? "companytype_li_on" : "companytype_li" }, "\u9AD8\u65B0\u6280\u672F"),
                        React.createElement("li", { onClick: this.companytypeIndex.bind(this, 2), className: this.state.typeIndex == 2 ? "companytype_li_on" : "companytype_li" }, "\u79D1\u6280\u670D\u52A1"),
                        React.createElement("li", { onClick: this.companytypeIndex.bind(this, 3), className: this.state.typeIndex == 3 ? "companytype_li_on" : "companytype_li" }, "\u91D1\u878D\u4FDD\u9669"))),
                React.createElement("div", { className: "leaseRoomList" },
                    React.createElement("ul", null,
                        React.createElement("li", null,
                            React.createElement("div", { className: this.state.companyState == 0 ? "leaseRooms_on" : "leaseRooms" },
                                React.createElement("img", { src: "./fangliangbao/image/demo.png" }),
                                React.createElement("div", { className: "leaseRoomsRight" },
                                    React.createElement("p", { className: "leaseName" }, "\u6D59\u6C5F\u6C38\u62D3\u4FE1\u606F\u79D1\u6280\u6709\u9650\u516C\u4F0F\u89C1\u53F8\u64AD\u653E\u7ED3\u675F\u7684"),
                                    React.createElement("p", { className: "leaseArea", style: { "margin": "3px 0" } },
                                        React.createElement("i", { className: "iconfont ", style: { "font-size": "12px", "color": "rgba(207, 209, 210, 1)" } }, "\uE83C"),
                                        "E\u5EA7B\u533A-3F-301"),
                                    React.createElement("p", { className: "leaseArea" },
                                        React.createElement("i", { className: "iconfont ", style: { "font-size": "12px", "color": "rgba(207, 209, 210, 1)" } }, "\uE83C"),
                                        "\u79D1\u6280\u670D\u52A1")))),
                        React.createElement("li", null,
                            React.createElement("div", { className: this.state.companyState == 1 ? "leaseRooms_on" : "leaseRooms" },
                                React.createElement("img", { src: "./fangliangbao/image/demo.png" }),
                                React.createElement("div", { className: "leaseRoomsRight" },
                                    React.createElement("p", { className: "leaseName" }, "\u6D59\u6C5F\u6C38\u62D3\u4FE1\u606F\u79D1\u6280\u6709\u9650\u516C\u4F0F\u89C1\u53F8\u64AD\u653E\u7ED3\u675F\u7684"),
                                    React.createElement("p", { className: "leaseArea", style: { "margin": "3px 0" } },
                                        React.createElement("i", { className: "iconfont ", style: { "font-size": "12px", "color": "rgba(207, 209, 210, 1)" } }, "\uE83C"),
                                        "E\u5EA7B\u533A-3F-301"),
                                    React.createElement("p", { className: "leaseArea" },
                                        React.createElement("i", { className: "iconfont ", style: { "font-size": "12px", "color": "rgba(207, 209, 210, 1)" } }, "\uE83C"),
                                        "\u79D1\u6280\u670D\u52A1")))),
                        React.createElement("li", null,
                            React.createElement("div", { className: this.state.companyState == 2 ? "leaseRooms_on" : "leaseRooms" },
                                React.createElement("img", { src: "./fangliangbao/image/demo.png" }),
                                React.createElement("div", { className: "leaseRoomsRight" },
                                    React.createElement("p", { className: "leaseName" }, "\u6D59\u6C5F\u6C38\u62D3\u4FE1\u606F\u79D1\u6280\u6709\u9650\u516C\u4F0F\u89C1\u53F8\u64AD\u653E\u7ED3\u675F\u7684"),
                                    React.createElement("p", { className: "leaseArea", style: { "margin": "3px 0" } },
                                        React.createElement("i", { className: "iconfont ", style: { "font-size": "12px", "color": "rgba(207, 209, 210, 1)" } }, "\uE83C"),
                                        "E\u5EA7B\u533A-3F-301"),
                                    React.createElement("p", { className: "leaseArea" },
                                        React.createElement("i", { className: "iconfont ", style: { "font-size": "12px", "color": "rgba(207, 209, 210, 1)" } }, "\uE83C"),
                                        "\u79D1\u6280\u670D\u52A1"))))))));
        }
    }
    class ParkInfoThree extends React.Component {
        constructor(props) {
            super(props);
            this.state = {
                RoomInfoState: "hide",
            };
            ParkInfoThree.showRoomInfo = this.showRoomInfo.bind(this);
            ParkInfoThree.showCompanyInfo = this.showCompanyInfo.bind(this);
        }
        componentDidMount() {
        }
        static showRoomInfo() { }
        ;
        showRoomInfo() {
            this.setState({
                RoomInfoState: "RoomInfoShow",
            });
        }
        static showCompanyInfo() { }
        ;
        showCompanyInfo() {
            this.setState({
                RoomInfoState: "CompanyInfoShow",
            });
        }
        render() {
            return (React.createElement("div", { className: "ParkInfoThree" },
                React.createElement("div", { className: "ParkInfoThree_leftBox" },
                    this.state.RoomInfoState == "RoomInfoShow" ?
                        React.createElement(RoomInfoThreeLeft, null)
                        :
                            null,
                    this.state.RoomInfoState == "CompanyInfoShow" ?
                        React.createElement(CompanyInfoThreeLeft, null)
                        :
                            null,
                    React.createElement(ParkInfoThreeLeft, null)),
                React.createElement("div", { className: "ParkInfoThree_rightBox" },
                    React.createElement(ParkInfoThreeRight, null))));
        }
    }
    class ParkInfoThreeLeft extends React.Component {
        constructor(props) {
            super(props);
            this.state = {
                ParkInfoIndex: 0
            };
        }
        componentDidMount() {
        }
        ParkInfoOn(index) {
            this.setState({
                ParkInfoIndex: index
            });
        }
        render() {
            return (React.createElement("div", { className: "ParkInfoThree_left" },
                React.createElement("div", { className: "ParkInfoThree_left_title" },
                    React.createElement("ul", null,
                        React.createElement("li", { className: this.state.ParkInfoIndex == 0 ? "ParkInfoIndex_in" : null, onClick: this.ParkInfoOn.bind(this, 0) }, "\u56ED\u533A\u4ECB\u7ECD"),
                        React.createElement("li", { className: this.state.ParkInfoIndex == 1 ? "ParkInfoIndex_in" : null, onClick: this.ParkInfoOn.bind(this, 1) }, "\u533A\u4F4D\u4F18\u52BF"),
                        React.createElement("li", { className: this.state.ParkInfoIndex == 2 ? "ParkInfoIndex_in" : null, onClick: this.ParkInfoOn.bind(this, 2) }, "\u4F18\u60E0\u653F\u7B56"),
                        React.createElement("li", { className: this.state.ParkInfoIndex == 3 ? "ParkInfoIndex_in" : null, onClick: this.ParkInfoOn.bind(this, 3) }, "\u56ED\u533A\u98CE\u91C7"))),
                React.createElement("div", { className: "ParkInfoThree_left_text" },
                    this.state.ParkInfoIndex == 0 ?
                        React.createElement("div", { className: "ParkInfo_text parkIntroduced", id: "parkIntroduced" },
                            React.createElement("p", null, "\u5730\u5904\u5E7F\u5DDE\u3001\u987A\u5FB7\u3001\u4E2D\u5C71\u3001\u4E1C\u839E\u3001\u73E0\u6D77\u3001\u6DF1\u5733\u7B49\u5730\u4E4B\u67A2\u7EBD\uFF0C\u5360\u8E1E\u756A\u79BA\u7684\u6838\u5FC3\u4F4D\u7F6E\u3002\u524D\u8EAB\u662F\u6C38\u9686\u5236\u8863\u5382\uFF0C2010\u5E74\u7ECF\u6539\u9020\uFF0C\u6210\u4E3A\u4E86\u9752\u74E6\u767D\u5899\uFF0C\u8BD7\u60C5\u753B\u610F\u7684\u521B\u610F\u56ED\u533A\u3002 \u4EA7\u4E1A\u56ED\u53D6\u540D\u82B1\u57CE\uFF0C\u96C6\u5408\u4E86\u7EFF\u8272\u82B1\u57CE\u3001\u5386\u53F2\u82B1"),
                            React.createElement("p", null, "\u5730\u5904\u5E7F\u5DDE\u3001\u987A\u5FB7\u3001\u4E2D\u5C71\u3001\u4E1C\u839E\u3001\u73E0\u6D77\u3001\u6DF1\u5733\u7B49\u5730\u4E4B\u67A2\u7EBD\uFF0C\u5360\u8E1E\u756A\u79BA\u7684\u6838\u5FC3\u4F4D\u7F6E\u3002\u524D\u8EAB\u662F\u6C38\u9686\u5236\u8863\u5382\uFF0C2010\u5E74\u7ECF\u6539\u9020\uFF0C\u6210\u4E3A\u4E86\u9752\u74E6\u767D\u5899\uFF0C\u8BD7\u60C5\u753B\u610F\u7684\u521B\u610F\u56ED\u533A\u3002 \u4EA7\u4E1A\u56ED\u53D6\u540D\u82B1\u57CE\uFF0C\u96C6\u5408\u4E86\u7EFF\u8272\u82B1\u57CE\u3001\u5386\u53F2\u82B1\uFF0C\u5730\u5904\u5E7F\u5DDE\u3001\u987A\u5FB7\u3001\u4E2D\u5C71\u3001\u4E1C\u839E\u3001\u73E0\u6D77\u3001\u6DF1\u5733\u7B49\u5730\u4E4B\u67A2\u7EBD\uFF0C\u5360\u8E1E\u756A\u79BA\u7684\u6838\u5FC3\u4F4D\u7F6E\u3002\u524D\u8EAB\u662F\u6C38\u9686\u5236\u8863\u5382\uFF0C2010\u5E74\u7ECF\u6539\u9020\uFF0C\u6210\u4E3A\u4E86\u9752\u74E6\u767D\u5899\uFF0C\u8BD7\u60C5\u753B\u610F\u7684\u521B\u610F\u56ED\u533A\u3002 \u4EA7\u4E1A\u56ED\u53D6\u540D\u82B1\u57CE\uFF0C\u96C6\u5408\u4E86\u7EFF\u8272\u82B1\u57CE\u3001\u5386\u53F2\u82B1"),
                            React.createElement("p", null, "\u5730\u5904\u5E7F\u5DDE\u3001\u987A\u5FB7\u3001\u4E2D\u5C71\u3001\u4E1C\u839E\u3001\u73E0\u6D77\u3001\u6DF1\u5733\u7B49\u5730\u4E4B\u67A2\u7EBD\uFF0C\u5360\u8E1E\u756A\u79BA\u7684\u6838\u5FC3\u4F4D\u7F6E\u3002\u524D\u8EAB\u662F\u6C38\u9686\u5236\u8863\u5382\uFF0C2010\u5E74\u7ECF\u6539\u9020\uFF0C\u6210\u4E3A\u4E86\u9752\u74E6\u767D\u5899\uFF0C\u8BD7\u60C5\u753B\u610F\u7684\u521B\u610F\u56ED\u533A\u3002 \u4EA7\u4E1A\u56ED\u53D6\u540D\u82B1\u57CE\uFF0C\u96C6\u5408\u4E86\u7EFF\u8272\u82B1\u57CE\u3001\u5386\u53F2\u82B1"))
                        : null,
                    this.state.ParkInfoIndex == 1 ?
                        React.createElement("div", { className: "ParkInfo_text advantage", id: "advantage" },
                            React.createElement("p", null, "\u5730\u5904\u5E7F\u5DDE\u3001\u987A\u5FB7\u3001\u4E2D\u5C71\u3001\u4E1C\u839E\u3001\u73E0\u6D77\u3001\u6DF1\u5733\u7B49\u5730\u4E4B\u67A2\u7EBD\uFF0C\u5360\u8E1E\u756A\u79BA\u7684\u6838\u5FC3\u4F4D\u7F6E\u3002\u524D\u8EAB\u662F\u6C38\u9686\u5236\u8863\u5382\uFF0C2010\u5E74\u7ECF\u6539\u9020\uFF0C\u6210\u4E3A\u4E86\u9752\u74E6\u767D\u5899\uFF0C\u8BD7\u60C5\u753B\u610F\u7684\u521B\u610F\u56ED\u533A\u3002 \u4EA7\u4E1A\u56ED\u53D6\u540D\u82B1\u57CE\uFF0C\u96C6\u5408\u4E86\u7EFF\u8272\u82B1\u57CE\u3001\u5386\u53F2\u82B1"),
                            React.createElement("p", null, "\u5730\u5904\u5E7F\u5DDE\u3001\u987A\u5FB7\u3001\u4E2D\u5C71\u3001\u4E1C\u839E\u3001\u73E0\u6D77\u3001\u6DF1\u5733\u7B49\u5730\u4E4B\u67A2\u7EBD\uFF0C\u5360\u8E1E\u756A\u79BA\u7684\u6838\u5FC3\u4F4D\u7F6E\u3002\u524D\u8EAB\u662F\u6C38\u9686\u5236\u8863\u5382\uFF0C2010\u5E74\u7ECF\u6539\u9020\uFF0C\u6210\u4E3A\u4E86\u9752\u74E6\u767D\u5899\uFF0C\u8BD7\u60C5\u753B\u610F\u7684\u521B\u610F\u56ED\u533A\u3002 \u4EA7\u4E1A\u56ED\u53D6\u540D\u82B1\u57CE\uFF0C\u96C6\u5408\u4E86\u7EFF\u8272\u82B1\u57CE\u3001\u5386\u53F2\u82B1"))
                        : null,
                    this.state.ParkInfoIndex == 2 ?
                        React.createElement("div", { className: "ParkInfo_text discounts", id: "discounts" },
                            React.createElement("p", null, "\u5730\u5904\u5E7F\u5DDE\u3001\u987A\u5FB7\u3001\u4E2D\u5C71\u3001\u4E1C\u839E\u3001\u73E0\u6D77\u3001\u6DF1\u5733\u7B49\u5730\u4E4B\u67A2\u7EBD\uFF0C\u5360\u8E1E\u756A\u79BA\u7684\u6838\u5FC3\u4F4D\u7F6E\u3002\u524D\u8EAB\u662F\u6C38\u9686\u5236\u8863\u5382\uFF0C2010\u5E74\u7ECF\u6539\u9020\uFF0C\u6210\u4E3A\u4E86\u9752\u74E6\u767D\u5899\uFF0C\u8BD7\u60C5\u753B\u610F\u7684\u521B\u610F\u56ED\u533A\u3002 \u4EA7\u4E1A\u56ED\u53D6\u540D\u82B1\u57CE\uFF0C\u96C6\u5408\u4E86\u7EFF\u8272\u82B1\u57CE\u3001\u5386\u53F2\u82B1"))
                        : null,
                    this.state.ParkInfoIndex == 3 ?
                        React.createElement("div", { className: "ParkInfo_text parkElegant", id: "parkElegant" },
                            React.createElement("div", { className: "infoImg" },
                                React.createElement("div", { className: "infoImg_left" },
                                    React.createElement("i", { className: "iconfont " }, "\uE83C")),
                                React.createElement("div", { className: "infoImg_ul" },
                                    React.createElement("ul", null,
                                        React.createElement("li", null,
                                            " ",
                                            React.createElement("img", { src: "./fangliangbao/image/demo.png" })),
                                        React.createElement("li", null,
                                            " ",
                                            React.createElement("img", { src: "./fangliangbao/image/demo.png" })),
                                        React.createElement("li", null,
                                            " ",
                                            React.createElement("img", { src: "./fangliangbao/image/demo.png" })))),
                                React.createElement("p", { className: "infoImg_num" },
                                    React.createElement("span", null, "2"),
                                    " / ",
                                    React.createElement("span", null, "8")),
                                React.createElement("div", { className: "infoImg_right" },
                                    React.createElement("i", { className: "iconfont " }, "\uE83C"))))
                        : null)));
        }
    }
    class RoomInfoThreeLeft extends React.Component {
        constructor(props) {
            super(props);
            this.state = {
                RoomInfoIndex: 0,
                RoomInfoThreeLeft: "RoomInfoThreeLeft_part",
                fullViewState: false,
                imgIndex: 0,
                imgMax: 3,
                imgNum: 1,
                imgUrl: "",
                imgUrlList: [
                    { url: "./fangliangbao/image/build.png" },
                    { url: "./fangliangbao/image/build1.png" },
                    { url: "./fangliangbao/image/demo.png" },
                ],
                vidIndex: 0,
                vidMax: 3,
                vidNum: 1,
                vidUrl: "",
                vidUrlList: [
                    { url: "./fangliangbao/image/build.png" },
                    { url: "./fangliangbao/image/build1.png" },
                    { url: "./fangliangbao/image/demo.png" },
                ]
            };
        }
        componentDidMount() {
        }
        roomInfoOn(index) {
            console.log('roomInfoOn', index);
            if (index == 1) {
                this.setState({
                    RoomInfoThreeLeft: "RoomInfoThreeLeft_all",
                    RoomInfoIndex: index,
                    imgUrl: this.state.imgUrlList[0].url,
                    imgIndex: 0,
                    imgNum: 1,
                });
            }
            else if (index == 2) {
                this.setState({
                    RoomInfoThreeLeft: "RoomInfoThreeLeft_all",
                    RoomInfoIndex: index,
                    vidUrl: this.state.vidUrlList[0].url,
                    vidgIndex: 0,
                    vidNum: 1,
                });
            }
            else {
                this.setState({
                    RoomInfoThreeLeft: "RoomInfoThreeLeft_part",
                    RoomInfoIndex: index,
                });
            }
        }
        upImg() {
            if (this.state.imgIndex > 0) {
                let imgIndexN = this.state.imgIndex;
                imgIndexN = imgIndexN - 1;
                let imgNumN = this.state.imgIndex + 1;
                imgNumN = imgNumN - 1;
                this.setState({
                    imgIndex: imgIndexN,
                    imgUrl: this.state.imgUrlList[this.state.imgIndex - 1].url,
                    imgNum: imgNumN
                }, () => {
                    console.log(this.state);
                });
            }
        }
        nextImg() {
            if (this.state.imgNum !== this.state.imgMax) {
                let imgIndexN = this.state.imgIndex;
                imgIndexN = imgIndexN + 1;
                let imgNumN = this.state.imgIndex + 1;
                imgNumN = imgNumN + 1;
                this.setState({
                    imgIndex: imgIndexN,
                    imgUrl: this.state.imgUrlList[this.state.imgIndex + 1].url,
                    imgNum: imgNumN
                }, () => {
                    console.log(this.state);
                });
            }
        }
        upVid() {
            if (this.state.vidIndex > 0) {
                let vidIndexN = this.state.vidIndex;
                vidIndexN = vidIndexN - 1;
                let vidNumN = this.state.vidIndex + 1;
                vidNumN = vidNumN - 1;
                this.setState({
                    vidIndex: vidIndexN,
                    vidUrl: this.state.vidUrlList[this.state.vidIndex - 1].url,
                    vidNum: vidNumN
                }, () => {
                    console.log(this.state);
                });
            }
        }
        nextVid() {
            if (this.state.vidNum !== this.state.vidMax) {
                let vidIndexN = this.state.vidIndex;
                vidIndexN = vidIndexN + 1;
                let vidNumN = this.state.vidIndex + 1;
                vidNumN = vidNumN + 1;
                this.setState({
                    vidIndex: vidIndexN,
                    vidUrl: this.state.vidUrlList[this.state.vidIndex + 1].url,
                    vidNum: vidNumN
                }, () => {
                    console.log(this.state);
                });
            }
        }
        fullView() {
            this.setState({
                fullViewState: true
            });
            $(document.body).attr('style', 'height: 100%; margin: 0; padding: 0; overflow: hidden;');
        }
        closeFull() {
            this.setState({
                fullViewState: false
            });
            $(document.body).attr('style', 'height: 100%; margin: 0; padding: 0; overflow: visible;');
        }
        render() {
            return (React.createElement("div", { className: this.state.RoomInfoThreeLeft },
                React.createElement("p", { className: "roomInfo_tit" }, "\u51FA\u79DF\uFF01\u9AD8\u65B0\u533A\u4FE1\u606F\u4EA7\u4E1A\u56ED\u8C6A\u534E\u88C5\u4FEE\u5355\u5143"),
                React.createElement("div", { className: "ParkInfoThree_left_title" },
                    React.createElement("ul", null,
                        React.createElement("li", { className: this.state.RoomInfoIndex == 0 ? "ParkInfoIndex_in" : null, onClick: this.roomInfoOn.bind(this, 0) }, "\u623F\u6E90\u6982\u51B5"),
                        React.createElement("li", { className: this.state.RoomInfoIndex == 1 ? "ParkInfoIndex_in" : null, onClick: this.roomInfoOn.bind(this, 1) }, "\u5B9E\u62CD\u7167\u7247"),
                        React.createElement("li", { className: this.state.RoomInfoIndex == 2 ? "ParkInfoIndex_in" : null, onClick: this.roomInfoOn.bind(this, 2) }, "\u5B9E\u62CD\u89C6\u9891"))),
                this.state.RoomInfoIndex == 0 ?
                    React.createElement("div", { className: "roomInfoBox" },
                        React.createElement("ul", { className: "roomInfoBox_one" },
                            React.createElement("li", null,
                                React.createElement("span", { style: { "font-size": "46px", "font-weight": "bold", "color": "rgba(220,26,63,1)" } }, "98"),
                                " \u5143/m\u00B2\u22C5\u6708"),
                            React.createElement("li", null,
                                "\u603B\u4EF7\uFF1A",
                                React.createElement("span", null, "19,600\u202C"),
                                " \u5143/m\u00B2\u22C5\u6708"),
                            React.createElement("li", { style: { "margin": "0px 24px" } },
                                React.createElement("p", null, "\u5EFA\u7B51\u9762\u79EF"),
                                React.createElement("p", { className: "ribo_bold" },
                                    React.createElement("span", null, "200"),
                                    "m\u00B2")),
                            React.createElement("li", { style: { "margin": "0px 24px" } },
                                React.createElement("p", null, "\u53EF\u5BB9\u7EB3\u5DE5\u4F4D"),
                                React.createElement("p", { className: "ribo_bold" },
                                    React.createElement("span", null, "29~58"),
                                    "\u4E2A\u5DE5\u4F4D")),
                            React.createElement("li", { style: { "margin": "0px 24px" } },
                                React.createElement("p", null, "\u88C5\u4FEE\u7A0B\u5EA6"),
                                React.createElement("p", { className: "ribo_bold" }, "\u4E2D\u7B49\u88C5\u4FEE"))),
                        React.createElement("ul", { className: "roomInfoBox_two" },
                            React.createElement("li", null,
                                "\u514D\u79DF\u65F6\u95F4 ",
                                React.createElement("span", null, "\u9762\u8BAE")),
                            React.createElement("li", null,
                                "\u603B\u5171\u697C\u5C42 ",
                                React.createElement("span", null, "12\u5C42")),
                            React.createElement("li", null,
                                "\u6240\u5728\u697C\u5C42 ",
                                React.createElement("span", null, "6\u5C42")),
                            React.createElement("li", null,
                                "\u7535",
                                React.createElement("span", { style: { "margin-left": "28px", "color": "rgba(152,159,168,1)" } }, "\u68AF"),
                                React.createElement("span", null, "\u6709\u7535\u68AF")),
                            React.createElement("li", null,
                                "\u770B\u623F\u65F6\u95F4 ",
                                React.createElement("span", null, "\u8054\u7CFB\u987E\u95EE\uFF0C\u968F\u65F6\u53EF\u770B")),
                            React.createElement("li", null,
                                "\u66F4\u65B0\u65F6\u95F4 ",
                                React.createElement("span", null, "14\u5C0F\u65F6\u524D"))))
                    : null,
                this.state.RoomInfoIndex == 1 ?
                    React.createElement("div", { className: "infoImg" },
                        React.createElement("span", { className: "stylesgoleft", onClick: this.upImg.bind(this) }, "-"),
                        React.createElement("img", { src: this.state.imgUrl, onClick: this.fullView.bind(this) }),
                        React.createElement("span", { className: "stylesgoright", onClick: this.nextImg.bind(this) }, "+"),
                        React.createElement("p", { className: "infoImg_num" },
                            React.createElement("span", null, this.state.imgNum),
                            " / ",
                            React.createElement("span", null, this.state.imgMax)))
                    : null,
                this.state.RoomInfoIndex == 2 ?
                    React.createElement("div", { className: "infoImg" },
                        React.createElement("span", { className: "stylesgoleft", onClick: this.upVid.bind(this) }, "-"),
                        React.createElement("img", { src: this.state.vidUrl }),
                        React.createElement("span", { className: "stylesgoright", onClick: this.nextVid.bind(this) }, "+"),
                        React.createElement("p", { className: "infoImg_num" },
                            React.createElement("span", null, this.state.vidNum),
                            " / ",
                            React.createElement("span", null, this.state.vidMax)))
                    : null,
                this.state.fullViewState == true ?
                    React.createElement("div", { className: "fullView" },
                        React.createElement("div", { onClick: this.closeFull.bind(this) }, "X"))
                    :
                        null));
        }
    }
    class CompanyInfoThreeLeft extends React.Component {
        constructor(props) {
            super(props);
            this.state = {
                RoomInfoIndex: 0,
                RoomInfoThreeLeft: "RoomInfoThreeLeft_part"
            };
        }
        componentDidMount() {
        }
        roomInfoOn(index) {
            this.setState({
                RoomInfoIndex: index,
            });
        }
        onChange(a, b, c) {
            console.log(a, b, c);
        }
        render() {
            return (React.createElement("div", { className: "RoomInfoThreeLeft" },
                React.createElement("div", { className: "ParkInfoThree_left_title" },
                    React.createElement("ul", null,
                        React.createElement("li", { className: this.state.RoomInfoIndex == 0 ? "ParkInfoIndex_in" : null, onClick: this.roomInfoOn.bind(this, 0) }, "\u4F01\u4E1A\u4FE1\u606F"),
                        React.createElement("li", { className: this.state.RoomInfoIndex == 1 ? "ParkInfoIndex_in" : null, onClick: this.roomInfoOn.bind(this, 1) }, "\u4F01\u4E1A\u98CE\u91C7"),
                        React.createElement("li", { className: this.state.RoomInfoIndex == 2 ? "ParkInfoIndex_in" : null, onClick: this.roomInfoOn.bind(this, 2) }, "\u4F01\u4E1A\u8BE6\u60C5"),
                        React.createElement("li", { className: this.state.RoomInfoIndex == 3 ? "ParkInfoIndex_in" : null, onClick: this.roomInfoOn.bind(this, 3) }, "\u4EA7\u54C1\u5C55\u793A"))),
                this.state.RoomInfoIndex == 0 ?
                    React.createElement("div", null, "\"000000000\"")
                    : null,
                this.state.RoomInfoIndex == 1 ?
                    React.createElement("div", { className: "infoImg" },
                        React.createElement("div", { className: "infoImg_left" },
                            React.createElement("i", { className: "iconfont " }, "\uE83C")),
                        React.createElement("div", { className: "infoImg_ul" },
                            React.createElement("ul", null,
                                React.createElement("li", null,
                                    " ",
                                    React.createElement("img", { src: "./fangliangbao/image/demo.png" })),
                                React.createElement("li", null,
                                    " ",
                                    React.createElement("img", { src: "./fangliangbao/image/demo.png" })),
                                React.createElement("li", null,
                                    " ",
                                    React.createElement("img", { src: "./fangliangbao/image/demo.png" })))),
                        React.createElement("p", { className: "infoImg_num" },
                            React.createElement("span", null, "2"),
                            " / ",
                            React.createElement("span", null, "8")),
                        React.createElement("div", { className: "infoImg_rightt" },
                            React.createElement("i", { className: "iconfont " }, "\uE83C")))
                    : null,
                this.state.RoomInfoIndex == 2 ?
                    React.createElement("div", { className: "infoImg" },
                        React.createElement("div", { className: "infoImg_left" },
                            React.createElement("i", { className: "iconfont " }, "\uE83C")),
                        React.createElement("div", { className: "infoImg_ul" },
                            React.createElement("ul", null,
                                React.createElement("li", null,
                                    " ",
                                    React.createElement("img", { src: "./fangliangbao/image/demo.png" })),
                                React.createElement("li", null,
                                    " ",
                                    React.createElement("img", { src: "./fangliangbao/image/demo.png" })),
                                React.createElement("li", null,
                                    " ",
                                    React.createElement("img", { src: "./fangliangbao/image/demo.png" })))),
                        React.createElement("p", { className: "infoImg_num" },
                            React.createElement("span", null, "2"),
                            " / ",
                            React.createElement("span", null, "8")),
                        React.createElement("div", { className: "infoImg_rightt" },
                            React.createElement("i", { className: "iconfont " }, "\uE83C")))
                    : null,
                this.state.RoomInfoIndex == 3 ?
                    React.createElement("div", { className: "infoImg" },
                        React.createElement("div", { className: "infoImg_left" },
                            React.createElement("i", { className: "iconfont " }, "\uE83C")),
                        React.createElement("div", { className: "infoImg_ul" },
                            React.createElement("ul", null,
                                React.createElement("li", null,
                                    " ",
                                    React.createElement("img", { src: "./fangliangbao/image/demo.png" })),
                                React.createElement("li", null,
                                    " ",
                                    React.createElement("img", { src: "./fangliangbao/image/demo.png" })),
                                React.createElement("li", null,
                                    " ",
                                    React.createElement("img", { src: "./fangliangbao/image/demo.png" })))),
                        React.createElement("p", { className: "infoImg_num" },
                            React.createElement("span", null, "2"),
                            " / ",
                            React.createElement("span", null, "8")),
                        React.createElement("div", { className: "infoImg_rightt" },
                            React.createElement("i", { className: "iconfont " }, "\uE83C")))
                    : null));
        }
    }
    class ParkInfoThreeRight extends React.Component {
        constructor(props) {
            super(props);
            this.state = {
                needText: "如：在广州白云区寻找200m2左右的办公室，租金在80元/m2·天，临近地铁站。",
                phone: "输入您的手机号码",
            };
        }
        componentDidMount() {
        }
        getNeed() {
            console.log(this.state);
        }
        render() {
            return (React.createElement("div", { className: "ParkInfoThree_right" },
                React.createElement("p", { className: "pitr_title" }, "\u54A8\u8BE2\u987E\u95EE"),
                React.createElement("div", { className: "ParkInfoThree_right_one" },
                    React.createElement("img", { src: "./fangliangbao/image/demo.png" }),
                    React.createElement("div", { className: "pitro_rb" },
                        React.createElement("p", { className: "pitro_name" }, "\u5F20\u4E09\u4E09"),
                        React.createElement("div", { className: "pitro_text1" }, "\u8BE5\u56ED\u533A\u4E0E\u623F\u6E90\u7531\u6211\u7EF4\u62A4\uFF0C\u719F\u77E5\u56ED\u533A\u653F\u7B56\u4E0E\u5468\u8FB9\u73AF\u5883"),
                        React.createElement("p", { className: "pitro_text2" },
                            "\u514D\u8D39\u54A8\u8BE2   ",
                            React.createElement("span", { style: { "font-size": "16px", "font-weight": "bold", "margin-left": "5px" } }, "15578380203")))),
                React.createElement("div", { className: "ParkInfoThree_right_two" },
                    React.createElement("p", { className: "pitr_title" }, "\u5B9D\u54E5\u5E2E\u627E\u623F"),
                    React.createElement("p", { className: "pitrt_inp" },
                        React.createElement("i", { className: "iconfont ", style: { "margin-right": "5px", "font-size": "14px" } }, "\uE83C"),
                        React.createElement("input", { type: "text", value: this.state.phone }))),
                React.createElement("div", { className: "ParkInfoThree_right_three" },
                    React.createElement("p", { className: "pitrth_text1" }, "\u60A8\u7684\u9700\u6C42\uFF1A"),
                    React.createElement("textarea", { value: this.state.needText }),
                    React.createElement("input", { type: "button" })),
                React.createElement("input", { type: "button", value: "\u7ACB\u5373\u59D4\u6258", className: "pitr_btn", onClick: this.getNeed.bind(this) })));
        }
    }
    exports.default = ParkInfo;
});
define("ParkInfo (7)", ["require", "exports", "react", "HomeTop", "allBottom", "InfoTitle"], function (require, exports, React, HomeTop_7, AllBottom_7, InfoTitle_6) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    class ParkInfo extends React.Component {
        constructor(props) {
            super(props);
            this.state = {};
        }
        render() {
            return (React.createElement("div", { className: "infoPage" },
                React.createElement(HomeTop_7.default, null),
                React.createElement("div", { className: "parkInfo" },
                    React.createElement("div", { className: "parkInfoBox_title" },
                        React.createElement(InfoTitle_6.default, null),
                        React.createElement(ParkInfoOne, null)),
                    React.createElement("div", { className: "parkInfoBox_list" },
                        React.createElement(ParkInfoTwo, null)),
                    React.createElement("div", { className: "parkInfoBox_text" },
                        React.createElement(ParkInfoThree, null))),
                React.createElement("div", { className: "parkInfo_bottom" },
                    React.createElement(AllBottom_7.default, null))));
        }
    }
    class ParkInfoOne extends React.Component {
        constructor(props) {
            super(props);
            this.state = {};
        }
        componentDidMount() {
        }
        render() {
            return (React.createElement("div", { className: "ParkInfoOne" },
                React.createElement("div", { className: "ParkInfoOne_html" },
                    React.createElement("p", null,
                        React.createElement("span", null, "\u5E7F\u5DDE"),
                        " ",
                        React.createElement("span", null, "\u54C1\u724C\u56ED\u533A"),
                        React.createElement("i", { className: "jiange" }, " > "),
                        React.createElement("span", null, "\u8D8A\u79C0"),
                        React.createElement("i", { className: "jiange" }, " > "),
                        React.createElement("span", null, "\u5317\u4EAC\u8DEF"))),
                React.createElement("div", { className: "ParkInfoOne_info" },
                    React.createElement("p", null, "\u4FE1\u606F\u4EA7\u4E1A\u56ED"),
                    React.createElement("ul", null,
                        React.createElement("li", null,
                            React.createElement("i", { className: "iconfont " }, "\uE83C"),
                            "\u6536\u85CF"),
                        React.createElement("li", null,
                            React.createElement("i", { className: "iconfont " }, "\uE83C"),
                            "\u5206\u4EAB")))));
        }
    }
    class ParkInfoTwo extends React.Component {
        constructor(props) {
            super(props);
            this.state = {
                index: 0,
                ParkInfoTwoState: "ParkInfoTwoAll",
                ParkInfoTwoListState: "ParkInfoTwoList",
                listTrun: "ParkInfoTwoListTrun",
                listTrun_text: "收起列表"
            };
        }
        componentDidMount() {
        }
        changeTitle(index) {
            this.setState({
                index: index
            });
        }
        overTitle() {
            if (this.state.ParkInfoTwoState == "ParkInfoTwoAll") {
                this.setState({
                    ParkInfoTwoState: "ParkInfoTwoOver",
                    ParkInfoTwoListState: "hide",
                    listTrun: "ParkInfoTwoListTrunUp",
                    listTrun_text: "展开列表",
                });
            }
            else {
                this.setState({
                    ParkInfoTwoState: "ParkInfoTwoAll",
                    ParkInfoTwoListState: "ParkInfoTwoList",
                    listTrun: "ParkInfoTwoListTrun",
                    listTrun_text: "收起列表"
                });
            }
        }
        render() {
            return (React.createElement("div", { className: this.state.ParkInfoTwoState },
                React.createElement("div", { className: "ParkInfoTwoTitle" },
                    React.createElement("ul", null,
                        React.createElement("li", { className: this.state.index == 0 ? "ParkInfoTwoTitleActive" : null, onClick: this.changeTitle.bind(this, 0) }, "\u51FA\u79DF\u623F\u6E90"),
                        React.createElement("li", { className: this.state.index == 1 ? "ParkInfoTwoTitleActive" : null, onClick: this.changeTitle.bind(this, 1) }, "\u51FA\u552E\u623F\u6E90"),
                        React.createElement("li", { className: this.state.index == 2 ? "ParkInfoTwoTitleActive" : null, onClick: this.changeTitle.bind(this, 2) }, "\u5165\u9A7B\u4F01\u4E1A"))),
                React.createElement("div", { className: this.state.ParkInfoTwoListState },
                    this.state.index == 0 ?
                        React.createElement(LeaseList, null)
                        : null,
                    this.state.index == 1 ?
                        React.createElement(SellList, null)
                        : null,
                    this.state.index == 2 ?
                        React.createElement(CompanyList, null)
                        : null),
                React.createElement("div", { className: this.state.listTrun, onClick: this.overTitle.bind(this) }, this.state.listTrun_text)));
        }
    }
    class LeaseList extends React.Component {
        constructor(props) {
            super(props);
            this.state = {
                typeIndex: 0,
                leaseRoomsState: -1,
            };
        }
        componentDidMount() {
        }
        onLeaseRoom(index) {
            ParkInfoThree.showRoomInfo();
            this.setState({
                leaseRoomsState: index
            });
        }
        leasetypeIndex(index) {
            this.setState({
                typeIndex: index,
            });
        }
        render() {
            return (React.createElement("div", { className: "leaseListBox" },
                React.createElement("div", { className: "leasetype" },
                    React.createElement("ul", null,
                        React.createElement("li", { onClick: this.leasetypeIndex.bind(this, 0) },
                            React.createElement("div", { className: this.state.typeIndex == 0 ? "leasetype_li_on" : "leasetype_li" },
                                React.createElement("p", { style: { "padding-top": "6px" } }, "\u5168\u90E8\u6237\u578B"),
                                React.createElement("p", null,
                                    React.createElement("span", null, "XX"),
                                    "\u5957"))),
                        React.createElement("li", { onClick: this.leasetypeIndex.bind(this, 1) },
                            React.createElement("div", { className: this.state.typeIndex == 1 ? "leasetype_li_on" : "leasetype_li" },
                                React.createElement("p", { style: { "padding-top": "6px" } }, "100m\u00B2\u4EE5\u4E0B"),
                                React.createElement("p", null,
                                    React.createElement("span", null, "XX"),
                                    "\u5957"))),
                        React.createElement("li", { onClick: this.leasetypeIndex.bind(this, 2) },
                            React.createElement("div", { className: this.state.typeIndex == 2 ? "leasetype_li_on" : "leasetype_li" },
                                React.createElement("p", { style: { "padding-top": "6px" } }, "100-200m\u00B2"),
                                React.createElement("p", null,
                                    React.createElement("span", null, "XX"),
                                    "\u5957"))),
                        React.createElement("li", { onClick: this.leasetypeIndex.bind(this, 3) },
                            React.createElement("div", { className: this.state.typeIndex == 3 ? "leasetype_li_on" : "leasetype_li" },
                                React.createElement("p", { style: { "padding-top": "6px" } }, "300-500m\u00B2"),
                                React.createElement("p", null,
                                    React.createElement("span", null, "XX"),
                                    "\u5957"))))),
                React.createElement("div", { className: "leaseRoomList" },
                    React.createElement("ul", null,
                        React.createElement("li", { onClick: this.onLeaseRoom.bind(this, 0) },
                            React.createElement("div", { className: this.state.leaseRoomsState == 0 ? "leaseRooms_on" : "leaseRooms" },
                                React.createElement("img", { src: "./fangliangbao/image/demo.png" }),
                                React.createElement("div", { className: "leaseRoomsRight" },
                                    React.createElement("p", { className: "leaseName" },
                                        React.createElement("span", null, "187"),
                                        "m\u00B2"),
                                    React.createElement("p", null,
                                        React.createElement("span", { className: "leasePrice" }, "80.3"),
                                        " \u5143/m\u00B2\u22C5\u6708"),
                                    React.createElement("p", { className: "leaseArea" }, "\u7B80\u88C5")))),
                        React.createElement("li", { onClick: this.onLeaseRoom.bind(this, 1) },
                            React.createElement("div", { className: this.state.leaseRoomsState == 1 ? "leaseRooms_on" : "leaseRooms" },
                                React.createElement("img", { src: "./fangliangbao/image/demo.png" }),
                                React.createElement("div", { className: "leaseRoomsRight" },
                                    React.createElement("p", { className: "leaseName" },
                                        React.createElement("span", null, "187"),
                                        "m\u00B2"),
                                    React.createElement("p", null,
                                        React.createElement("span", { className: "leasePrice" }, "80.3"),
                                        " \u5143/m\u00B2\u22C5\u6708"),
                                    React.createElement("p", { className: "leaseArea" }, "\u7B80\u88C5")))),
                        React.createElement("li", { onClick: this.onLeaseRoom.bind(this, 2) },
                            React.createElement("div", { className: this.state.leaseRoomsState == 2 ? "leaseRooms_on" : "leaseRooms" },
                                React.createElement("img", { src: "./fangliangbao/image/demo.png" }),
                                React.createElement("div", { className: "leaseRoomsRight" },
                                    React.createElement("p", { className: "leaseName" },
                                        React.createElement("span", null, "187"),
                                        "m\u00B2"),
                                    React.createElement("p", null,
                                        React.createElement("span", { className: "leasePrice" }, "80.3"),
                                        " \u5143/m\u00B2\u22C5\u6708"),
                                    React.createElement("p", { className: "leaseArea" }, "\u7B80\u88C5"))))))));
        }
    }
    class SellList extends React.Component {
        constructor(props) {
            super(props);
            this.state = {
                typeIndex: 0,
                sellRoomsState: -1,
            };
        }
        componentDidMount() {
        }
        onSellRoom(index) {
            ParkInfoThree.showRoomInfo();
            this.setState({
                sellRoomsState: index
            });
        }
        selltypeIndex(index) {
            this.setState({
                typeIndex: index,
            });
        }
        render() {
            return (React.createElement("div", { className: "leaseListBox" },
                React.createElement("div", { className: "leasetype" },
                    React.createElement("ul", null,
                        React.createElement("li", { onClick: this.selltypeIndex.bind(this, 0) },
                            React.createElement("div", { className: this.state.typeIndex == 0 ? "leasetype_li_on" : "leasetype_li" },
                                React.createElement("p", { style: { "padding-top": "6px" } }, "\u5168\u90E8\u6237\u578B"),
                                React.createElement("p", null,
                                    React.createElement("span", null, "XX"),
                                    "\u5957"))),
                        React.createElement("li", { onClick: this.selltypeIndex.bind(this, 1) },
                            React.createElement("div", { className: this.state.typeIndex == 1 ? "leasetype_li_on" : "leasetype_li" },
                                React.createElement("p", { style: { "padding-top": "6px" } }, "100m\u00B2\u4EE5\u4E0B"),
                                React.createElement("p", null,
                                    React.createElement("span", null, "XX"),
                                    "\u5957"))),
                        React.createElement("li", { onClick: this.selltypeIndex.bind(this, 2) },
                            React.createElement("div", { className: this.state.typeIndex == 2 ? "leasetype_li_on" : "leasetype_li" },
                                React.createElement("p", { style: { "padding-top": "6px" } }, "100-200m\u00B2"),
                                React.createElement("p", null,
                                    React.createElement("span", null, "XX"),
                                    "\u5957"))),
                        React.createElement("li", { onClick: this.selltypeIndex.bind(this, 3) },
                            React.createElement("div", { className: this.state.typeIndex == 3 ? "leasetype_li_on" : "leasetype_li" },
                                React.createElement("p", { style: { "padding-top": "6px" } }, "300-500m\u00B2"),
                                React.createElement("p", null,
                                    React.createElement("span", null, "XX"),
                                    "\u5957"))))),
                React.createElement("div", { className: "leaseRoomList" },
                    React.createElement("ul", null,
                        React.createElement("li", { onClick: this.onSellRoom.bind(this, 0) },
                            React.createElement("div", { className: this.state.sellRoomsState == 0 ? "leaseRooms_on" : "leaseRooms" },
                                React.createElement("img", { src: "./fangliangbao/image/demo.png" }),
                                React.createElement("div", { className: "leaseRoomsRight" },
                                    React.createElement("p", { className: "leaseName" },
                                        React.createElement("span", null, "187"),
                                        "m\u00B2"),
                                    React.createElement("p", null,
                                        React.createElement("span", { className: "leasePrice" }, "80.3"),
                                        " \u5143/m\u00B2\u22C5\u6708"),
                                    React.createElement("p", { className: "leaseArea" }, "\u7B80\u88C5")))),
                        React.createElement("li", { onClick: this.onSellRoom.bind(this, 1) },
                            React.createElement("div", { className: this.state.sellRoomsState == 1 ? "leaseRooms_on" : "leaseRooms" },
                                React.createElement("img", { src: "./fangliangbao/image/demo.png" }),
                                React.createElement("div", { className: "leaseRoomsRight" },
                                    React.createElement("p", { className: "leaseName" },
                                        React.createElement("span", null, "187"),
                                        "m\u00B2"),
                                    React.createElement("p", null,
                                        React.createElement("span", { className: "leasePrice" }, "80.3"),
                                        " \u5143/m\u00B2\u22C5\u6708"),
                                    React.createElement("p", { className: "leaseArea" }, "\u7B80\u88C5")))),
                        React.createElement("li", { onClick: this.onSellRoom.bind(this, 2) },
                            React.createElement("div", { className: this.state.sellRoomsState == 2 ? "leaseRooms_on" : "leaseRooms" },
                                React.createElement("img", { src: "./fangliangbao/image/demo.png" }),
                                React.createElement("div", { className: "leaseRoomsRight" },
                                    React.createElement("p", { className: "leaseName" },
                                        React.createElement("span", null, "187"),
                                        "m\u00B2"),
                                    React.createElement("p", null,
                                        React.createElement("span", { className: "leasePrice" }, "80.3"),
                                        " \u5143/m\u00B2\u22C5\u6708"),
                                    React.createElement("p", { className: "leaseArea" }, "\u7B80\u88C5"))))))));
        }
    }
    class CompanyList extends React.Component {
        constructor(props) {
            super(props);
            this.state = {
                typeIndex: 0,
                companyState: -1,
            };
        }
        componentDidMount() {
        }
        onCompany(index) {
            ParkInfoThree.showCompanyInfo();
            this.setState({
                companyState: index
            });
        }
        companytypeIndex(index) {
            this.setState({
                typeIndex: index,
            });
        }
        render() {
            return (React.createElement("div", { className: "leaseListBox" },
                React.createElement("div", { className: "leasetype" },
                    React.createElement("ul", null,
                        React.createElement("li", { onClick: this.companytypeIndex.bind(this, 0), className: this.state.typeIndex == 0 ? "companytype_li_on" : "companytype_li" }, "\u5168\u90E8"),
                        React.createElement("li", { onClick: this.companytypeIndex.bind(this, 1), className: this.state.typeIndex == 1 ? "companytype_li_on" : "companytype_li" }, "\u9AD8\u65B0\u6280\u672F"),
                        React.createElement("li", { onClick: this.companytypeIndex.bind(this, 2), className: this.state.typeIndex == 2 ? "companytype_li_on" : "companytype_li" }, "\u79D1\u6280\u670D\u52A1"),
                        React.createElement("li", { onClick: this.companytypeIndex.bind(this, 3), className: this.state.typeIndex == 3 ? "companytype_li_on" : "companytype_li" }, "\u91D1\u878D\u4FDD\u9669"))),
                React.createElement("div", { className: "leaseRoomList" },
                    React.createElement("ul", null,
                        React.createElement("li", null,
                            React.createElement("div", { className: this.state.companyState == 0 ? "leaseRooms_on" : "leaseRooms" },
                                React.createElement("img", { src: "./fangliangbao/image/demo.png" }),
                                React.createElement("div", { className: "leaseRoomsRight" },
                                    React.createElement("p", { className: "leaseName" }, "\u6D59\u6C5F\u6C38\u62D3\u4FE1\u606F\u79D1\u6280\u6709\u9650\u516C\u4F0F\u89C1\u53F8\u64AD\u653E\u7ED3\u675F\u7684"),
                                    React.createElement("p", { className: "leaseArea", style: { "margin": "3px 0" } },
                                        React.createElement("i", { className: "iconfont ", style: { "font-size": "12px", "color": "rgba(207, 209, 210, 1)" } }, "\uE83C"),
                                        "E\u5EA7B\u533A-3F-301"),
                                    React.createElement("p", { className: "leaseArea" },
                                        React.createElement("i", { className: "iconfont ", style: { "font-size": "12px", "color": "rgba(207, 209, 210, 1)" } }, "\uE83C"),
                                        "\u79D1\u6280\u670D\u52A1")))),
                        React.createElement("li", null,
                            React.createElement("div", { className: this.state.companyState == 1 ? "leaseRooms_on" : "leaseRooms" },
                                React.createElement("img", { src: "./fangliangbao/image/demo.png" }),
                                React.createElement("div", { className: "leaseRoomsRight" },
                                    React.createElement("p", { className: "leaseName" }, "\u6D59\u6C5F\u6C38\u62D3\u4FE1\u606F\u79D1\u6280\u6709\u9650\u516C\u4F0F\u89C1\u53F8\u64AD\u653E\u7ED3\u675F\u7684"),
                                    React.createElement("p", { className: "leaseArea", style: { "margin": "3px 0" } },
                                        React.createElement("i", { className: "iconfont ", style: { "font-size": "12px", "color": "rgba(207, 209, 210, 1)" } }, "\uE83C"),
                                        "E\u5EA7B\u533A-3F-301"),
                                    React.createElement("p", { className: "leaseArea" },
                                        React.createElement("i", { className: "iconfont ", style: { "font-size": "12px", "color": "rgba(207, 209, 210, 1)" } }, "\uE83C"),
                                        "\u79D1\u6280\u670D\u52A1")))),
                        React.createElement("li", null,
                            React.createElement("div", { className: this.state.companyState == 2 ? "leaseRooms_on" : "leaseRooms" },
                                React.createElement("img", { src: "./fangliangbao/image/demo.png" }),
                                React.createElement("div", { className: "leaseRoomsRight" },
                                    React.createElement("p", { className: "leaseName" }, "\u6D59\u6C5F\u6C38\u62D3\u4FE1\u606F\u79D1\u6280\u6709\u9650\u516C\u4F0F\u89C1\u53F8\u64AD\u653E\u7ED3\u675F\u7684"),
                                    React.createElement("p", { className: "leaseArea", style: { "margin": "3px 0" } },
                                        React.createElement("i", { className: "iconfont ", style: { "font-size": "12px", "color": "rgba(207, 209, 210, 1)" } }, "\uE83C"),
                                        "E\u5EA7B\u533A-3F-301"),
                                    React.createElement("p", { className: "leaseArea" },
                                        React.createElement("i", { className: "iconfont ", style: { "font-size": "12px", "color": "rgba(207, 209, 210, 1)" } }, "\uE83C"),
                                        "\u79D1\u6280\u670D\u52A1"))))))));
        }
    }
    class ParkInfoThree extends React.Component {
        constructor(props) {
            super(props);
            this.state = {
                RoomInfoState: "hide",
            };
            ParkInfoThree.showRoomInfo = this.showRoomInfo.bind(this);
            ParkInfoThree.showCompanyInfo = this.showCompanyInfo.bind(this);
        }
        componentDidMount() {
        }
        static showRoomInfo() { }
        ;
        showRoomInfo() {
            this.setState({
                RoomInfoState: "RoomInfoShow",
            });
        }
        static showCompanyInfo() { }
        ;
        showCompanyInfo() {
            this.setState({
                RoomInfoState: "CompanyInfoShow",
            });
        }
        render() {
            return (React.createElement("div", { className: "ParkInfoThree" },
                React.createElement("div", { className: "ParkInfoThree_leftBox" },
                    this.state.RoomInfoState == "RoomInfoShow" ?
                        React.createElement(RoomInfoThreeLeft, null)
                        :
                            null,
                    this.state.RoomInfoState == "CompanyInfoShow" ?
                        React.createElement(CompanyInfoThreeLeft, null)
                        :
                            null,
                    React.createElement(ParkInfoThreeLeft, null)),
                React.createElement("div", { className: "ParkInfoThree_rightBox" },
                    React.createElement(ParkInfoThreeRight, null))));
        }
    }
    class ParkInfoThreeLeft extends React.Component {
        constructor(props) {
            super(props);
            this.state = {
                ParkInfoIndex: 0,
                parkInfoThreeLeft: "RoomInfoThreeLeft_part",
                fullViewState: false,
                imgIndex: 0,
                imgMax: 3,
                imgNum: 1,
                imgUrl: "",
                imgUrlList: [
                    { url: "./fangliangbao/image/build.png" },
                    { url: "./fangliangbao/image/build1.png" },
                    { url: "./fangliangbao/image/demo.png" },
                ],
            };
        }
        componentDidMount() {
            this.setState({
                imgUrl: this.state.imgUrlList[0].url,
            });
        }
        ParkInfoOn(index) {
            if (index == 4) {
                this.setState({
                    ParkInfoThreeLeft: "RoomInfoThreeLeft_all",
                    ParkInfoIndex: index,
                    imgUrl: this.state.imgUrlList[0].url,
                    imgIndex: 0,
                    imgNum: 1,
                });
            }
            else {
                this.setState({
                    RoomInfoThreeLeft: "RoomInfoThreeLeft_part",
                    ParkInfoIndex: index,
                });
            }
        }
        upImg() {
            if (this.state.imgIndex > 0) {
                let imgIndexN = this.state.imgIndex;
                imgIndexN = imgIndexN - 1;
                let imgNumN = this.state.imgIndex + 1;
                imgNumN = imgNumN - 1;
                this.setState({
                    imgIndex: imgIndexN,
                    imgUrl: this.state.imgUrlList[this.state.imgIndex - 1].url,
                    imgNum: imgNumN
                }, () => {
                    console.log(this.state);
                });
            }
        }
        nextImg() {
            if (this.state.imgNum !== this.state.imgMax) {
                let imgIndexN = this.state.imgIndex;
                imgIndexN = imgIndexN + 1;
                let imgNumN = this.state.imgIndex + 1;
                imgNumN = imgNumN + 1;
                this.setState({
                    imgIndex: imgIndexN,
                    imgUrl: this.state.imgUrlList[this.state.imgIndex + 1].url,
                    imgNum: imgNumN
                }, () => {
                    console.log(this.state);
                });
            }
        }
        fullView() {
            this.setState({
                fullViewState: true
            });
            $(document.body).attr('style', 'height: 100%; margin: 0; padding: 0; overflow: hidden;');
        }
        closeFull() {
            this.setState({
                fullViewState: false
            });
            $(document.body).attr('style', 'height: 100%; margin: 0; padding: 0; overflow: visible;');
        }
        upImgFull() {
            this.upImg();
        }
        nextImgFull() {
            this.nextImg();
        }
        imgOn(index) {
            this.setState({
                imgIndex: index,
                imgUrl: this.state.imgUrlList[index].url,
                imgNum: index + 1
            });
        }
        render() {
            return (React.createElement("div", { className: "ParkInfoThree_left" },
                React.createElement("div", { className: "ParkInfoThree_left_title" },
                    React.createElement("ul", null,
                        React.createElement("li", { className: this.state.ParkInfoIndex == 0 ? "ParkInfoIndex_in" : null, onClick: this.ParkInfoOn.bind(this, 0) }, "\u56ED\u533A\u4ECB\u7ECD"),
                        React.createElement("li", { className: this.state.ParkInfoIndex == 1 ? "ParkInfoIndex_in" : null, onClick: this.ParkInfoOn.bind(this, 1) }, "\u533A\u4F4D\u4F18\u52BF"),
                        React.createElement("li", { className: this.state.ParkInfoIndex == 2 ? "ParkInfoIndex_in" : null, onClick: this.ParkInfoOn.bind(this, 2) }, "\u4F18\u60E0\u653F\u7B56"),
                        React.createElement("li", { className: this.state.ParkInfoIndex == 3 ? "ParkInfoIndex_in" : null, onClick: this.ParkInfoOn.bind(this, 3) }, "\u56ED\u533A\u98CE\u91C7"))),
                React.createElement("div", { className: "ParkInfoThree_left_text" },
                    this.state.ParkInfoIndex == 0 ?
                        React.createElement("div", { className: "ParkInfo_text parkIntroduced", id: "parkIntroduced" },
                            React.createElement("p", null, "\u5730\u5904\u5E7F\u5DDE\u3001\u987A\u5FB7\u3001\u4E2D\u5C71\u3001\u4E1C\u839E\u3001\u73E0\u6D77\u3001\u6DF1\u5733\u7B49\u5730\u4E4B\u67A2\u7EBD\uFF0C\u5360\u8E1E\u756A\u79BA\u7684\u6838\u5FC3\u4F4D\u7F6E\u3002\u524D\u8EAB\u662F\u6C38\u9686\u5236\u8863\u5382\uFF0C2010\u5E74\u7ECF\u6539\u9020\uFF0C\u6210\u4E3A\u4E86\u9752\u74E6\u767D\u5899\uFF0C\u8BD7\u60C5\u753B\u610F\u7684\u521B\u610F\u56ED\u533A\u3002 \u4EA7\u4E1A\u56ED\u53D6\u540D\u82B1\u57CE\uFF0C\u96C6\u5408\u4E86\u7EFF\u8272\u82B1\u57CE\u3001\u5386\u53F2\u82B1"),
                            React.createElement("p", null, "\u5730\u5904\u5E7F\u5DDE\u3001\u987A\u5FB7\u3001\u4E2D\u5C71\u3001\u4E1C\u839E\u3001\u73E0\u6D77\u3001\u6DF1\u5733\u7B49\u5730\u4E4B\u67A2\u7EBD\uFF0C\u5360\u8E1E\u756A\u79BA\u7684\u6838\u5FC3\u4F4D\u7F6E\u3002\u524D\u8EAB\u662F\u6C38\u9686\u5236\u8863\u5382\uFF0C2010\u5E74\u7ECF\u6539\u9020\uFF0C\u6210\u4E3A\u4E86\u9752\u74E6\u767D\u5899\uFF0C\u8BD7\u60C5\u753B\u610F\u7684\u521B\u610F\u56ED\u533A\u3002 \u4EA7\u4E1A\u56ED\u53D6\u540D\u82B1\u57CE\uFF0C\u96C6\u5408\u4E86\u7EFF\u8272\u82B1\u57CE\u3001\u5386\u53F2\u82B1\uFF0C\u5730\u5904\u5E7F\u5DDE\u3001\u987A\u5FB7\u3001\u4E2D\u5C71\u3001\u4E1C\u839E\u3001\u73E0\u6D77\u3001\u6DF1\u5733\u7B49\u5730\u4E4B\u67A2\u7EBD\uFF0C\u5360\u8E1E\u756A\u79BA\u7684\u6838\u5FC3\u4F4D\u7F6E\u3002\u524D\u8EAB\u662F\u6C38\u9686\u5236\u8863\u5382\uFF0C2010\u5E74\u7ECF\u6539\u9020\uFF0C\u6210\u4E3A\u4E86\u9752\u74E6\u767D\u5899\uFF0C\u8BD7\u60C5\u753B\u610F\u7684\u521B\u610F\u56ED\u533A\u3002 \u4EA7\u4E1A\u56ED\u53D6\u540D\u82B1\u57CE\uFF0C\u96C6\u5408\u4E86\u7EFF\u8272\u82B1\u57CE\u3001\u5386\u53F2\u82B1"),
                            React.createElement("p", null, "\u5730\u5904\u5E7F\u5DDE\u3001\u987A\u5FB7\u3001\u4E2D\u5C71\u3001\u4E1C\u839E\u3001\u73E0\u6D77\u3001\u6DF1\u5733\u7B49\u5730\u4E4B\u67A2\u7EBD\uFF0C\u5360\u8E1E\u756A\u79BA\u7684\u6838\u5FC3\u4F4D\u7F6E\u3002\u524D\u8EAB\u662F\u6C38\u9686\u5236\u8863\u5382\uFF0C2010\u5E74\u7ECF\u6539\u9020\uFF0C\u6210\u4E3A\u4E86\u9752\u74E6\u767D\u5899\uFF0C\u8BD7\u60C5\u753B\u610F\u7684\u521B\u610F\u56ED\u533A\u3002 \u4EA7\u4E1A\u56ED\u53D6\u540D\u82B1\u57CE\uFF0C\u96C6\u5408\u4E86\u7EFF\u8272\u82B1\u57CE\u3001\u5386\u53F2\u82B1"))
                        : null,
                    this.state.ParkInfoIndex == 1 ?
                        React.createElement("div", { className: "ParkInfo_text advantage", id: "advantage" },
                            React.createElement("p", null, "\u5730\u5904\u5E7F\u5DDE\u3001\u987A\u5FB7\u3001\u4E2D\u5C71\u3001\u4E1C\u839E\u3001\u73E0\u6D77\u3001\u6DF1\u5733\u7B49\u5730\u4E4B\u67A2\u7EBD\uFF0C\u5360\u8E1E\u756A\u79BA\u7684\u6838\u5FC3\u4F4D\u7F6E\u3002\u524D\u8EAB\u662F\u6C38\u9686\u5236\u8863\u5382\uFF0C2010\u5E74\u7ECF\u6539\u9020\uFF0C\u6210\u4E3A\u4E86\u9752\u74E6\u767D\u5899\uFF0C\u8BD7\u60C5\u753B\u610F\u7684\u521B\u610F\u56ED\u533A\u3002 \u4EA7\u4E1A\u56ED\u53D6\u540D\u82B1\u57CE\uFF0C\u96C6\u5408\u4E86\u7EFF\u8272\u82B1\u57CE\u3001\u5386\u53F2\u82B1"),
                            React.createElement("p", null, "\u5730\u5904\u5E7F\u5DDE\u3001\u987A\u5FB7\u3001\u4E2D\u5C71\u3001\u4E1C\u839E\u3001\u73E0\u6D77\u3001\u6DF1\u5733\u7B49\u5730\u4E4B\u67A2\u7EBD\uFF0C\u5360\u8E1E\u756A\u79BA\u7684\u6838\u5FC3\u4F4D\u7F6E\u3002\u524D\u8EAB\u662F\u6C38\u9686\u5236\u8863\u5382\uFF0C2010\u5E74\u7ECF\u6539\u9020\uFF0C\u6210\u4E3A\u4E86\u9752\u74E6\u767D\u5899\uFF0C\u8BD7\u60C5\u753B\u610F\u7684\u521B\u610F\u56ED\u533A\u3002 \u4EA7\u4E1A\u56ED\u53D6\u540D\u82B1\u57CE\uFF0C\u96C6\u5408\u4E86\u7EFF\u8272\u82B1\u57CE\u3001\u5386\u53F2\u82B1"))
                        : null,
                    this.state.ParkInfoIndex == 2 ?
                        React.createElement("div", { className: "ParkInfo_text discounts", id: "discounts" },
                            React.createElement("p", null, "\u5730\u5904\u5E7F\u5DDE\u3001\u987A\u5FB7\u3001\u4E2D\u5C71\u3001\u4E1C\u839E\u3001\u73E0\u6D77\u3001\u6DF1\u5733\u7B49\u5730\u4E4B\u67A2\u7EBD\uFF0C\u5360\u8E1E\u756A\u79BA\u7684\u6838\u5FC3\u4F4D\u7F6E\u3002\u524D\u8EAB\u662F\u6C38\u9686\u5236\u8863\u5382\uFF0C2010\u5E74\u7ECF\u6539\u9020\uFF0C\u6210\u4E3A\u4E86\u9752\u74E6\u767D\u5899\uFF0C\u8BD7\u60C5\u753B\u610F\u7684\u521B\u610F\u56ED\u533A\u3002 \u4EA7\u4E1A\u56ED\u53D6\u540D\u82B1\u57CE\uFF0C\u96C6\u5408\u4E86\u7EFF\u8272\u82B1\u57CE\u3001\u5386\u53F2\u82B1"))
                        : null,
                    this.state.ParkInfoIndex == 3 ?
                        React.createElement("div", { className: "ParkInfo_text parkElegant", id: "parkElegant" },
                            React.createElement("div", { className: "infoImg parkImg" },
                                React.createElement("span", { className: "stylesgoleft pleft", onClick: this.upImg.bind(this) },
                                    React.createElement("i", { className: "iconfont " }, "\uE83C")),
                                React.createElement("img", { src: this.state.imgUrl, onClick: this.fullView.bind(this) }),
                                React.createElement("span", { className: "stylesgoright pright", onClick: this.nextImg.bind(this) },
                                    React.createElement("i", { className: "iconfont " }, "\uE83C")),
                                React.createElement("p", { className: "infoImg_num parkImg_num" },
                                    React.createElement("span", null,
                                        this.state.imgNum,
                                        " / ",
                                        this.state.imgMax))))
                        : null),
                this.state.fullViewState == true ?
                    React.createElement("div", { className: "fullView" },
                        React.createElement("div", { className: "closeFull", onClick: this.closeFull.bind(this) },
                            React.createElement("i", { className: "iconfont ", style: { "font-size": "18px" } }, "\uE83C")),
                        React.createElement("div", { className: "infoImgFull" },
                            React.createElement("span", { className: "stylesgoleft stylesgoleft_full", onClick: this.upImgFull.bind(this) },
                                React.createElement("i", { className: "iconfont " }, "\uE83C")),
                            React.createElement("img", { src: this.state.imgUrl }),
                            React.createElement("span", { className: "stylesgoright stylesgoright_full", onClick: this.nextImgFull.bind(this) },
                                React.createElement("i", { className: "iconfont " }, "\uE83C")),
                            React.createElement("p", { className: "imgFull_p" },
                                React.createElement("span", null, this.state.imgNum),
                                " / ",
                                React.createElement("span", null, this.state.imgMax))),
                        React.createElement("div", { className: "botImgUl" },
                            React.createElement("ul", null, this.state.imgUrlList.map((i, index) => {
                                return (React.createElement("li", { className: this.state.imgIndex == index ? "botImg_li_on" : "botImg_li", onClick: this.imgOn.bind(this, index) },
                                    React.createElement("img", { src: i.url })));
                            }))))
                    :
                        null));
        }
    }
    class RoomInfoThreeLeft extends React.Component {
        constructor(props) {
            super(props);
            this.state = {
                RoomInfoIndex: 0,
                RoomInfoThreeLeft: "RoomInfoThreeLeft_part",
                fullViewState: false,
                imgIndex: 0,
                imgMax: 3,
                imgNum: 1,
                imgUrl: "",
                imgUrlList: [
                    { url: "./fangliangbao/image/build.png" },
                    { url: "./fangliangbao/image/build1.png" },
                    { url: "./fangliangbao/image/demo.png" },
                ],
                vidIndex: 0,
                vidMax: 3,
                vidNum: 1,
                vidUrl: "",
                vidUrlList: [
                    { url: "./fangliangbao/image/build.png" },
                    { url: "./fangliangbao/image/build1.png" },
                    { url: "./fangliangbao/image/demo.png" },
                ]
            };
        }
        componentDidMount() {
        }
        roomInfoOn(index) {
            console.log('roomInfoOn', index);
            if (index == 1) {
                this.setState({
                    RoomInfoThreeLeft: "RoomInfoThreeLeft_all",
                    RoomInfoIndex: index,
                    imgUrl: this.state.imgUrlList[0].url,
                    imgIndex: 0,
                    imgNum: 1,
                });
            }
            else if (index == 2) {
                this.setState({
                    RoomInfoThreeLeft: "RoomInfoThreeLeft_all",
                    RoomInfoIndex: index,
                    vidUrl: this.state.vidUrlList[0].url,
                    vidgIndex: 0,
                    vidNum: 1,
                });
            }
            else {
                this.setState({
                    RoomInfoThreeLeft: "RoomInfoThreeLeft_part",
                    RoomInfoIndex: index,
                });
            }
        }
        upImg() {
            if (this.state.imgIndex > 0) {
                let imgIndexN = this.state.imgIndex;
                imgIndexN = imgIndexN - 1;
                let imgNumN = this.state.imgIndex + 1;
                imgNumN = imgNumN - 1;
                this.setState({
                    imgIndex: imgIndexN,
                    imgUrl: this.state.imgUrlList[this.state.imgIndex - 1].url,
                    imgNum: imgNumN
                }, () => {
                    console.log(this.state);
                });
            }
        }
        nextImg() {
            if (this.state.imgNum !== this.state.imgMax) {
                let imgIndexN = this.state.imgIndex;
                imgIndexN = imgIndexN + 1;
                let imgNumN = this.state.imgIndex + 1;
                imgNumN = imgNumN + 1;
                this.setState({
                    imgIndex: imgIndexN,
                    imgUrl: this.state.imgUrlList[this.state.imgIndex + 1].url,
                    imgNum: imgNumN
                }, () => {
                    console.log(this.state);
                });
            }
        }
        upVid() {
            if (this.state.vidIndex > 0) {
                let vidIndexN = this.state.vidIndex;
                vidIndexN = vidIndexN - 1;
                let vidNumN = this.state.vidIndex + 1;
                vidNumN = vidNumN - 1;
                this.setState({
                    vidIndex: vidIndexN,
                    vidUrl: this.state.vidUrlList[this.state.vidIndex - 1].url,
                    vidNum: vidNumN
                }, () => {
                    console.log(this.state);
                });
            }
        }
        nextVid() {
            if (this.state.vidNum !== this.state.vidMax) {
                let vidIndexN = this.state.vidIndex;
                vidIndexN = vidIndexN + 1;
                let vidNumN = this.state.vidIndex + 1;
                vidNumN = vidNumN + 1;
                this.setState({
                    vidIndex: vidIndexN,
                    vidUrl: this.state.vidUrlList[this.state.vidIndex + 1].url,
                    vidNum: vidNumN
                }, () => {
                    console.log(this.state);
                });
            }
        }
        fullView() {
            this.setState({
                fullViewState: true
            });
            $(document.body).attr('style', 'height: 100%; margin: 0; padding: 0; overflow: hidden;');
        }
        closeFull() {
            this.setState({
                fullViewState: false
            });
            $(document.body).attr('style', 'height: 100%; margin: 0; padding: 0; overflow: visible;');
        }
        render() {
            return (React.createElement("div", { className: this.state.RoomInfoThreeLeft },
                React.createElement("p", { className: "roomInfo_tit" }, "\u51FA\u79DF\uFF01\u9AD8\u65B0\u533A\u4FE1\u606F\u4EA7\u4E1A\u56ED\u8C6A\u534E\u88C5\u4FEE\u5355\u5143"),
                React.createElement("div", { className: "ParkInfoThree_left_title" },
                    React.createElement("ul", null,
                        React.createElement("li", { className: this.state.RoomInfoIndex == 0 ? "ParkInfoIndex_in" : null, onClick: this.roomInfoOn.bind(this, 0) }, "\u623F\u6E90\u6982\u51B5"),
                        React.createElement("li", { className: this.state.RoomInfoIndex == 1 ? "ParkInfoIndex_in" : null, onClick: this.roomInfoOn.bind(this, 1) }, "\u5B9E\u62CD\u7167\u7247"),
                        React.createElement("li", { className: this.state.RoomInfoIndex == 2 ? "ParkInfoIndex_in" : null, onClick: this.roomInfoOn.bind(this, 2) }, "\u5B9E\u62CD\u89C6\u9891"))),
                this.state.RoomInfoIndex == 0 ?
                    React.createElement("div", { className: "roomInfoBox" },
                        React.createElement("ul", { className: "roomInfoBox_one" },
                            React.createElement("li", null,
                                React.createElement("span", { style: { "font-size": "46px", "font-weight": "bold", "color": "rgba(220,26,63,1)" } }, "98"),
                                " \u5143/m\u00B2\u22C5\u6708"),
                            React.createElement("li", null,
                                "\u603B\u4EF7\uFF1A",
                                React.createElement("span", null, "19,600\u202C"),
                                " \u5143/m\u00B2\u22C5\u6708"),
                            React.createElement("li", { style: { "margin": "0px 24px" } },
                                React.createElement("p", null, "\u5EFA\u7B51\u9762\u79EF"),
                                React.createElement("p", { className: "ribo_bold" },
                                    React.createElement("span", null, "200"),
                                    "m\u00B2")),
                            React.createElement("li", { style: { "margin": "0px 24px" } },
                                React.createElement("p", null, "\u53EF\u5BB9\u7EB3\u5DE5\u4F4D"),
                                React.createElement("p", { className: "ribo_bold" },
                                    React.createElement("span", null, "29~58"),
                                    "\u4E2A\u5DE5\u4F4D")),
                            React.createElement("li", { style: { "margin": "0px 24px" } },
                                React.createElement("p", null, "\u88C5\u4FEE\u7A0B\u5EA6"),
                                React.createElement("p", { className: "ribo_bold" }, "\u4E2D\u7B49\u88C5\u4FEE"))),
                        React.createElement("ul", { className: "roomInfoBox_two" },
                            React.createElement("li", null,
                                "\u514D\u79DF\u65F6\u95F4 ",
                                React.createElement("span", null, "\u9762\u8BAE")),
                            React.createElement("li", null,
                                "\u603B\u5171\u697C\u5C42 ",
                                React.createElement("span", null, "12\u5C42")),
                            React.createElement("li", null,
                                "\u6240\u5728\u697C\u5C42 ",
                                React.createElement("span", null, "6\u5C42")),
                            React.createElement("li", null,
                                "\u7535",
                                React.createElement("span", { style: { "margin-left": "28px", "color": "rgba(152,159,168,1)" } }, "\u68AF"),
                                React.createElement("span", null, "\u6709\u7535\u68AF")),
                            React.createElement("li", null,
                                "\u770B\u623F\u65F6\u95F4 ",
                                React.createElement("span", null, "\u8054\u7CFB\u987E\u95EE\uFF0C\u968F\u65F6\u53EF\u770B")),
                            React.createElement("li", null,
                                "\u66F4\u65B0\u65F6\u95F4 ",
                                React.createElement("span", null, "14\u5C0F\u65F6\u524D"))))
                    : null,
                this.state.RoomInfoIndex == 1 ?
                    React.createElement("div", { className: "infoImg" },
                        React.createElement("span", { className: "stylesgoleft", onClick: this.upImg.bind(this) }, "-"),
                        React.createElement("img", { src: this.state.imgUrl, onClick: this.fullView.bind(this) }),
                        React.createElement("span", { className: "stylesgoright", onClick: this.nextImg.bind(this) }, "+"),
                        React.createElement("p", { className: "infoImg_num" },
                            React.createElement("span", null, this.state.imgNum),
                            " / ",
                            React.createElement("span", null, this.state.imgMax)))
                    : null,
                this.state.RoomInfoIndex == 2 ?
                    React.createElement("div", { className: "infoImg" },
                        React.createElement("span", { className: "stylesgoleft", onClick: this.upVid.bind(this) }, "-"),
                        React.createElement("img", { src: this.state.vidUrl }),
                        React.createElement("span", { className: "stylesgoright", onClick: this.nextVid.bind(this) }, "+"),
                        React.createElement("p", { className: "infoImg_num" },
                            React.createElement("span", null, this.state.vidNum),
                            " / ",
                            React.createElement("span", null, this.state.vidMax)))
                    : null,
                this.state.fullViewState == true ?
                    React.createElement("div", { className: "fullView" },
                        React.createElement("div", { onClick: this.closeFull.bind(this) }, "X"))
                    :
                        null));
        }
    }
    class CompanyInfoThreeLeft extends React.Component {
        constructor(props) {
            super(props);
            this.state = {
                RoomInfoIndex: 0,
                RoomInfoThreeLeft: "RoomInfoThreeLeft_part"
            };
        }
        componentDidMount() {
        }
        roomInfoOn(index) {
            this.setState({
                RoomInfoIndex: index,
            });
        }
        onChange(a, b, c) {
            console.log(a, b, c);
        }
        render() {
            return (React.createElement("div", { className: "RoomInfoThreeLeft" },
                React.createElement("div", { className: "ParkInfoThree_left_title" },
                    React.createElement("ul", null,
                        React.createElement("li", { className: this.state.RoomInfoIndex == 0 ? "ParkInfoIndex_in" : null, onClick: this.roomInfoOn.bind(this, 0) }, "\u4F01\u4E1A\u4FE1\u606F"),
                        React.createElement("li", { className: this.state.RoomInfoIndex == 1 ? "ParkInfoIndex_in" : null, onClick: this.roomInfoOn.bind(this, 1) }, "\u4F01\u4E1A\u98CE\u91C7"),
                        React.createElement("li", { className: this.state.RoomInfoIndex == 2 ? "ParkInfoIndex_in" : null, onClick: this.roomInfoOn.bind(this, 2) }, "\u4F01\u4E1A\u8BE6\u60C5"),
                        React.createElement("li", { className: this.state.RoomInfoIndex == 3 ? "ParkInfoIndex_in" : null, onClick: this.roomInfoOn.bind(this, 3) }, "\u4EA7\u54C1\u5C55\u793A"))),
                this.state.RoomInfoIndex == 0 ?
                    React.createElement("div", null, "\"000000000\"")
                    : null,
                this.state.RoomInfoIndex == 1 ?
                    React.createElement("div", { className: "infoImg" },
                        React.createElement("div", { className: "infoImg_left" },
                            React.createElement("i", { className: "iconfont " }, "\uE83C")),
                        React.createElement("div", { className: "infoImg_ul" },
                            React.createElement("ul", null,
                                React.createElement("li", null,
                                    " ",
                                    React.createElement("img", { src: "./fangliangbao/image/demo.png" })),
                                React.createElement("li", null,
                                    " ",
                                    React.createElement("img", { src: "./fangliangbao/image/demo.png" })),
                                React.createElement("li", null,
                                    " ",
                                    React.createElement("img", { src: "./fangliangbao/image/demo.png" })))),
                        React.createElement("p", { className: "infoImg_num" },
                            React.createElement("span", null, "2"),
                            " / ",
                            React.createElement("span", null, "8")),
                        React.createElement("div", { className: "infoImg_rightt" },
                            React.createElement("i", { className: "iconfont " }, "\uE83C")))
                    : null,
                this.state.RoomInfoIndex == 2 ?
                    React.createElement("div", { className: "infoImg" },
                        React.createElement("div", { className: "infoImg_left" },
                            React.createElement("i", { className: "iconfont " }, "\uE83C")),
                        React.createElement("div", { className: "infoImg_ul" },
                            React.createElement("ul", null,
                                React.createElement("li", null,
                                    " ",
                                    React.createElement("img", { src: "./fangliangbao/image/demo.png" })),
                                React.createElement("li", null,
                                    " ",
                                    React.createElement("img", { src: "./fangliangbao/image/demo.png" })),
                                React.createElement("li", null,
                                    " ",
                                    React.createElement("img", { src: "./fangliangbao/image/demo.png" })))),
                        React.createElement("p", { className: "infoImg_num" },
                            React.createElement("span", null, "2"),
                            " / ",
                            React.createElement("span", null, "8")),
                        React.createElement("div", { className: "infoImg_rightt" },
                            React.createElement("i", { className: "iconfont " }, "\uE83C")))
                    : null,
                this.state.RoomInfoIndex == 3 ?
                    React.createElement("div", { className: "infoImg" },
                        React.createElement("div", { className: "infoImg_left" },
                            React.createElement("i", { className: "iconfont " }, "\uE83C")),
                        React.createElement("div", { className: "infoImg_ul" },
                            React.createElement("ul", null,
                                React.createElement("li", null,
                                    " ",
                                    React.createElement("img", { src: "./fangliangbao/image/demo.png" })),
                                React.createElement("li", null,
                                    " ",
                                    React.createElement("img", { src: "./fangliangbao/image/demo.png" })),
                                React.createElement("li", null,
                                    " ",
                                    React.createElement("img", { src: "./fangliangbao/image/demo.png" })))),
                        React.createElement("p", { className: "infoImg_num" },
                            React.createElement("span", null, "2"),
                            " / ",
                            React.createElement("span", null, "8")),
                        React.createElement("div", { className: "infoImg_rightt" },
                            React.createElement("i", { className: "iconfont " }, "\uE83C")))
                    : null));
        }
    }
    class ParkInfoThreeRight extends React.Component {
        constructor(props) {
            super(props);
            this.state = {
                needText: "如：在广州白云区寻找200m2左右的办公室，租金在80元/m2·天，临近地铁站。",
                phone: "输入您的手机号码",
            };
        }
        componentDidMount() {
        }
        getNeed() {
            console.log(this.state);
        }
        render() {
            return (React.createElement("div", { className: "ParkInfoThree_right" },
                React.createElement("p", { className: "pitr_title" }, "\u54A8\u8BE2\u987E\u95EE"),
                React.createElement("div", { className: "ParkInfoThree_right_one" },
                    React.createElement("img", { src: "./fangliangbao/image/demo.png" }),
                    React.createElement("div", { className: "pitro_rb" },
                        React.createElement("p", { className: "pitro_name" }, "\u5F20\u4E09\u4E09"),
                        React.createElement("div", { className: "pitro_text1" }, "\u8BE5\u56ED\u533A\u4E0E\u623F\u6E90\u7531\u6211\u7EF4\u62A4\uFF0C\u719F\u77E5\u56ED\u533A\u653F\u7B56\u4E0E\u5468\u8FB9\u73AF\u5883"),
                        React.createElement("p", { className: "pitro_text2" },
                            "\u514D\u8D39\u54A8\u8BE2   ",
                            React.createElement("span", { style: { "font-size": "16px", "font-weight": "bold", "margin-left": "5px" } }, "15578380203")))),
                React.createElement("div", { className: "ParkInfoThree_right_two" },
                    React.createElement("p", { className: "pitr_title" }, "\u5B9D\u54E5\u5E2E\u627E\u623F"),
                    React.createElement("p", { className: "pitrt_inp" },
                        React.createElement("i", { className: "iconfont ", style: { "margin-right": "5px", "font-size": "14px" } }, "\uE83C"),
                        React.createElement("input", { type: "text", value: this.state.phone }))),
                React.createElement("div", { className: "ParkInfoThree_right_three" },
                    React.createElement("p", { className: "pitrth_text1" }, "\u60A8\u7684\u9700\u6C42\uFF1A"),
                    React.createElement("textarea", { value: this.state.needText }),
                    React.createElement("input", { type: "button" })),
                React.createElement("input", { type: "button", value: "\u7ACB\u5373\u59D4\u6258", className: "pitr_btn", onClick: this.getNeed.bind(this) })));
        }
    }
    exports.default = ParkInfo;
});
define("ParkInfo6", ["require", "exports", "react", "HomeTop", "allBottom", "InfoTitle"], function (require, exports, React, HomeTop_8, AllBottom_8, InfoTitle_7) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    class ParkInfo extends React.Component {
        constructor(props) {
            super(props);
            this.state = {};
        }
        render() {
            return (React.createElement("div", { className: "infoPage" },
                React.createElement(HomeTop_8.default, null),
                React.createElement("div", { className: "parkInfo" },
                    React.createElement("div", { className: "parkInfoBox_title" },
                        React.createElement(InfoTitle_7.default, null),
                        React.createElement(ParkInfoOne, null)),
                    React.createElement("div", { className: "parkInfoBox_list" },
                        React.createElement(ParkInfoTwo, null)),
                    React.createElement("div", { className: "parkInfoBox_text" },
                        React.createElement(ParkInfoThree, null))),
                React.createElement("div", { className: "parkInfo_bottom" },
                    React.createElement(AllBottom_8.default, null))));
        }
    }
    class ParkInfoOne extends React.Component {
        constructor(props) {
            super(props);
            this.state = {};
        }
        componentDidMount() {
        }
        render() {
            return (React.createElement("div", { className: "ParkInfoOne" },
                React.createElement("div", { className: "ParkInfoOne_html" },
                    React.createElement("p", null,
                        React.createElement("span", null, "\u5E7F\u5DDE"),
                        " ",
                        React.createElement("span", null, "\u54C1\u724C\u56ED\u533A"),
                        React.createElement("i", { className: "jiange" }, " > "),
                        React.createElement("span", null, "\u8D8A\u79C0"),
                        React.createElement("i", { className: "jiange" }, " > "),
                        React.createElement("span", null, "\u5317\u4EAC\u8DEF"))),
                React.createElement("div", { className: "ParkInfoOne_info" },
                    React.createElement("p", null, "\u4FE1\u606F\u4EA7\u4E1A\u56ED"),
                    React.createElement("ul", null,
                        React.createElement("li", null,
                            React.createElement("i", { className: "iconfont " }, "\uE83C"),
                            "\u6536\u85CF"),
                        React.createElement("li", null,
                            React.createElement("i", { className: "iconfont " }, "\uE83C"),
                            "\u5206\u4EAB")))));
        }
    }
    class ParkInfoTwo extends React.Component {
        constructor(props) {
            super(props);
            this.state = {
                index: 0,
                ParkInfoTwoState: "ParkInfoTwoAll",
                ParkInfoTwoListState: "ParkInfoTwoList",
                listTrun: "ParkInfoTwoListTrun",
                listTrun_text: "收起列表"
            };
        }
        componentDidMount() {
        }
        changeTitle(index) {
            this.setState({
                index: index
            });
        }
        overTitle() {
            if (this.state.ParkInfoTwoState == "ParkInfoTwoAll") {
                this.setState({
                    ParkInfoTwoState: "ParkInfoTwoOver",
                    ParkInfoTwoListState: "hide",
                    listTrun: "ParkInfoTwoListTrunUp",
                    listTrun_text: "展开列表",
                });
            }
            else {
                this.setState({
                    ParkInfoTwoState: "ParkInfoTwoAll",
                    ParkInfoTwoListState: "ParkInfoTwoList",
                    listTrun: "ParkInfoTwoListTrun",
                    listTrun_text: "收起列表"
                });
            }
        }
        render() {
            return (React.createElement("div", { className: this.state.ParkInfoTwoState },
                React.createElement("div", { className: "ParkInfoTwoTitle" },
                    React.createElement("ul", null,
                        React.createElement("li", { className: this.state.index == 0 ? "ParkInfoTwoTitleActive" : null, onClick: this.changeTitle.bind(this, 0) }, "\u51FA\u79DF\u623F\u6E90"),
                        React.createElement("li", { className: this.state.index == 1 ? "ParkInfoTwoTitleActive" : null, onClick: this.changeTitle.bind(this, 1) }, "\u51FA\u552E\u623F\u6E90"),
                        React.createElement("li", { className: this.state.index == 2 ? "ParkInfoTwoTitleActive" : null, onClick: this.changeTitle.bind(this, 2) }, "\u5165\u9A7B\u4F01\u4E1A"))),
                React.createElement("div", { className: this.state.ParkInfoTwoListState },
                    this.state.index == 0 ?
                        React.createElement(LeaseList, null)
                        : null,
                    this.state.index == 1 ?
                        React.createElement(SellList, null)
                        : null,
                    this.state.index == 2 ?
                        React.createElement(CompanyList, null)
                        : null),
                React.createElement("div", { className: this.state.listTrun, onClick: this.overTitle.bind(this) }, this.state.listTrun_text)));
        }
    }
    class LeaseList extends React.Component {
        constructor(props) {
            super(props);
            this.state = {
                typeIndex: 0,
                leaseRoomsState: -1,
            };
        }
        componentDidMount() {
        }
        onLeaseRoom(index) {
            ParkInfoThree.showRoomInfo();
            this.setState({
                leaseRoomsState: index
            });
        }
        leasetypeIndex(index) {
            this.setState({
                typeIndex: index,
            });
        }
        render() {
            return (React.createElement("div", { className: "leaseListBox" },
                React.createElement("div", { className: "leasetype" },
                    React.createElement("ul", null,
                        React.createElement("li", { onClick: this.leasetypeIndex.bind(this, 0) },
                            React.createElement("div", { className: this.state.typeIndex == 0 ? "leasetype_li_on" : "leasetype_li" },
                                React.createElement("p", { style: { "padding-top": "6px" } }, "\u5168\u90E8\u6237\u578B"),
                                React.createElement("p", null,
                                    React.createElement("span", null, "XX"),
                                    "\u5957"))),
                        React.createElement("li", { onClick: this.leasetypeIndex.bind(this, 1) },
                            React.createElement("div", { className: this.state.typeIndex == 1 ? "leasetype_li_on" : "leasetype_li" },
                                React.createElement("p", { style: { "padding-top": "6px" } }, "100m\u00B2\u4EE5\u4E0B"),
                                React.createElement("p", null,
                                    React.createElement("span", null, "XX"),
                                    "\u5957"))),
                        React.createElement("li", { onClick: this.leasetypeIndex.bind(this, 2) },
                            React.createElement("div", { className: this.state.typeIndex == 2 ? "leasetype_li_on" : "leasetype_li" },
                                React.createElement("p", { style: { "padding-top": "6px" } }, "100-200m\u00B2"),
                                React.createElement("p", null,
                                    React.createElement("span", null, "XX"),
                                    "\u5957"))),
                        React.createElement("li", { onClick: this.leasetypeIndex.bind(this, 3) },
                            React.createElement("div", { className: this.state.typeIndex == 3 ? "leasetype_li_on" : "leasetype_li" },
                                React.createElement("p", { style: { "padding-top": "6px" } }, "300-500m\u00B2"),
                                React.createElement("p", null,
                                    React.createElement("span", null, "XX"),
                                    "\u5957"))))),
                React.createElement("div", { className: "leaseRoomList" },
                    React.createElement("ul", null,
                        React.createElement("li", { onClick: this.onLeaseRoom.bind(this, 0) },
                            React.createElement("div", { className: this.state.leaseRoomsState == 0 ? "leaseRooms_on" : "leaseRooms" },
                                React.createElement("img", { src: "./fangliangbao/image/demo.png" }),
                                React.createElement("div", { className: "leaseRoomsRight" },
                                    React.createElement("p", { className: "leaseName" },
                                        React.createElement("span", null, "187"),
                                        "m\u00B2"),
                                    React.createElement("p", null,
                                        React.createElement("span", { className: "leasePrice" }, "80.3"),
                                        " \u5143/m\u00B2\u22C5\u6708"),
                                    React.createElement("p", { className: "leaseArea" }, "\u7B80\u88C5")))),
                        React.createElement("li", { onClick: this.onLeaseRoom.bind(this, 1) },
                            React.createElement("div", { className: this.state.leaseRoomsState == 1 ? "leaseRooms_on" : "leaseRooms" },
                                React.createElement("img", { src: "./fangliangbao/image/demo.png" }),
                                React.createElement("div", { className: "leaseRoomsRight" },
                                    React.createElement("p", { className: "leaseName" },
                                        React.createElement("span", null, "187"),
                                        "m\u00B2"),
                                    React.createElement("p", null,
                                        React.createElement("span", { className: "leasePrice" }, "80.3"),
                                        " \u5143/m\u00B2\u22C5\u6708"),
                                    React.createElement("p", { className: "leaseArea" }, "\u7B80\u88C5")))),
                        React.createElement("li", { onClick: this.onLeaseRoom.bind(this, 2) },
                            React.createElement("div", { className: this.state.leaseRoomsState == 2 ? "leaseRooms_on" : "leaseRooms" },
                                React.createElement("img", { src: "./fangliangbao/image/demo.png" }),
                                React.createElement("div", { className: "leaseRoomsRight" },
                                    React.createElement("p", { className: "leaseName" },
                                        React.createElement("span", null, "187"),
                                        "m\u00B2"),
                                    React.createElement("p", null,
                                        React.createElement("span", { className: "leasePrice" }, "80.3"),
                                        " \u5143/m\u00B2\u22C5\u6708"),
                                    React.createElement("p", { className: "leaseArea" }, "\u7B80\u88C5"))))))));
        }
    }
    class SellList extends React.Component {
        constructor(props) {
            super(props);
            this.state = {
                typeIndex: 0,
                sellRoomsState: -1,
            };
        }
        componentDidMount() {
        }
        onSellRoom(index) {
            ParkInfoThree.showRoomInfo();
            this.setState({
                sellRoomsState: index
            });
        }
        selltypeIndex(index) {
            this.setState({
                typeIndex: index,
            });
        }
        render() {
            return (React.createElement("div", { className: "leaseListBox" },
                React.createElement("div", { className: "leasetype" },
                    React.createElement("ul", null,
                        React.createElement("li", { onClick: this.selltypeIndex.bind(this, 0) },
                            React.createElement("div", { className: this.state.typeIndex == 0 ? "leasetype_li_on" : "leasetype_li" },
                                React.createElement("p", { style: { "padding-top": "6px" } }, "\u5168\u90E8\u6237\u578B"),
                                React.createElement("p", null,
                                    React.createElement("span", null, "XX"),
                                    "\u5957"))),
                        React.createElement("li", { onClick: this.selltypeIndex.bind(this, 1) },
                            React.createElement("div", { className: this.state.typeIndex == 1 ? "leasetype_li_on" : "leasetype_li" },
                                React.createElement("p", { style: { "padding-top": "6px" } }, "100m\u00B2\u4EE5\u4E0B"),
                                React.createElement("p", null,
                                    React.createElement("span", null, "XX"),
                                    "\u5957"))),
                        React.createElement("li", { onClick: this.selltypeIndex.bind(this, 2) },
                            React.createElement("div", { className: this.state.typeIndex == 2 ? "leasetype_li_on" : "leasetype_li" },
                                React.createElement("p", { style: { "padding-top": "6px" } }, "100-200m\u00B2"),
                                React.createElement("p", null,
                                    React.createElement("span", null, "XX"),
                                    "\u5957"))),
                        React.createElement("li", { onClick: this.selltypeIndex.bind(this, 3) },
                            React.createElement("div", { className: this.state.typeIndex == 3 ? "leasetype_li_on" : "leasetype_li" },
                                React.createElement("p", { style: { "padding-top": "6px" } }, "300-500m\u00B2"),
                                React.createElement("p", null,
                                    React.createElement("span", null, "XX"),
                                    "\u5957"))))),
                React.createElement("div", { className: "leaseRoomList" },
                    React.createElement("ul", null,
                        React.createElement("li", { onClick: this.onSellRoom.bind(this, 0) },
                            React.createElement("div", { className: this.state.sellRoomsState == 0 ? "leaseRooms_on" : "leaseRooms" },
                                React.createElement("img", { src: "./fangliangbao/image/demo.png" }),
                                React.createElement("div", { className: "leaseRoomsRight" },
                                    React.createElement("p", { className: "leaseName" },
                                        React.createElement("span", null, "187"),
                                        "m\u00B2"),
                                    React.createElement("p", null,
                                        React.createElement("span", { className: "leasePrice" }, "80.3"),
                                        " \u5143/m\u00B2\u22C5\u6708"),
                                    React.createElement("p", { className: "leaseArea" }, "\u7B80\u88C5")))),
                        React.createElement("li", { onClick: this.onSellRoom.bind(this, 1) },
                            React.createElement("div", { className: this.state.sellRoomsState == 1 ? "leaseRooms_on" : "leaseRooms" },
                                React.createElement("img", { src: "./fangliangbao/image/demo.png" }),
                                React.createElement("div", { className: "leaseRoomsRight" },
                                    React.createElement("p", { className: "leaseName" },
                                        React.createElement("span", null, "187"),
                                        "m\u00B2"),
                                    React.createElement("p", null,
                                        React.createElement("span", { className: "leasePrice" }, "80.3"),
                                        " \u5143/m\u00B2\u22C5\u6708"),
                                    React.createElement("p", { className: "leaseArea" }, "\u7B80\u88C5")))),
                        React.createElement("li", { onClick: this.onSellRoom.bind(this, 2) },
                            React.createElement("div", { className: this.state.sellRoomsState == 2 ? "leaseRooms_on" : "leaseRooms" },
                                React.createElement("img", { src: "./fangliangbao/image/demo.png" }),
                                React.createElement("div", { className: "leaseRoomsRight" },
                                    React.createElement("p", { className: "leaseName" },
                                        React.createElement("span", null, "187"),
                                        "m\u00B2"),
                                    React.createElement("p", null,
                                        React.createElement("span", { className: "leasePrice" }, "80.3"),
                                        " \u5143/m\u00B2\u22C5\u6708"),
                                    React.createElement("p", { className: "leaseArea" }, "\u7B80\u88C5"))))))));
        }
    }
    class CompanyList extends React.Component {
        constructor(props) {
            super(props);
            this.state = {
                typeIndex: 0,
                companyState: -1,
            };
        }
        componentDidMount() {
        }
        onCompany(index) {
            ParkInfoThree.showCompanyInfo();
            this.setState({
                companyState: index
            });
        }
        companytypeIndex(index) {
            this.setState({
                typeIndex: index,
            });
        }
        render() {
            return (React.createElement("div", { className: "leaseListBox" },
                React.createElement("div", { className: "leasetype" },
                    React.createElement("ul", null,
                        React.createElement("li", { onClick: this.companytypeIndex.bind(this, 0), className: this.state.typeIndex == 0 ? "companytype_li_on" : "companytype_li" }, "\u5168\u90E8"),
                        React.createElement("li", { onClick: this.companytypeIndex.bind(this, 1), className: this.state.typeIndex == 1 ? "companytype_li_on" : "companytype_li" }, "\u9AD8\u65B0\u6280\u672F"),
                        React.createElement("li", { onClick: this.companytypeIndex.bind(this, 2), className: this.state.typeIndex == 2 ? "companytype_li_on" : "companytype_li" }, "\u79D1\u6280\u670D\u52A1"),
                        React.createElement("li", { onClick: this.companytypeIndex.bind(this, 3), className: this.state.typeIndex == 3 ? "companytype_li_on" : "companytype_li" }, "\u91D1\u878D\u4FDD\u9669"))),
                React.createElement("div", { className: "leaseRoomList" },
                    React.createElement("ul", null,
                        React.createElement("li", null,
                            React.createElement("div", { className: this.state.companyState == 0 ? "leaseRooms_on" : "leaseRooms" },
                                React.createElement("img", { src: "./fangliangbao/image/demo.png" }),
                                React.createElement("div", { className: "leaseRoomsRight" },
                                    React.createElement("p", { className: "leaseName" }, "\u6D59\u6C5F\u6C38\u62D3\u4FE1\u606F\u79D1\u6280\u6709\u9650\u516C\u4F0F\u89C1\u53F8\u64AD\u653E\u7ED3\u675F\u7684"),
                                    React.createElement("p", { className: "leaseArea", style: { "margin": "3px 0" } },
                                        React.createElement("i", { className: "iconfont ", style: { "font-size": "12px", "color": "rgba(207, 209, 210, 1)" } }, "\uE83C"),
                                        "E\u5EA7B\u533A-3F-301"),
                                    React.createElement("p", { className: "leaseArea" },
                                        React.createElement("i", { className: "iconfont ", style: { "font-size": "12px", "color": "rgba(207, 209, 210, 1)" } }, "\uE83C"),
                                        "\u79D1\u6280\u670D\u52A1")))),
                        React.createElement("li", null,
                            React.createElement("div", { className: this.state.companyState == 1 ? "leaseRooms_on" : "leaseRooms" },
                                React.createElement("img", { src: "./fangliangbao/image/demo.png" }),
                                React.createElement("div", { className: "leaseRoomsRight" },
                                    React.createElement("p", { className: "leaseName" }, "\u6D59\u6C5F\u6C38\u62D3\u4FE1\u606F\u79D1\u6280\u6709\u9650\u516C\u4F0F\u89C1\u53F8\u64AD\u653E\u7ED3\u675F\u7684"),
                                    React.createElement("p", { className: "leaseArea", style: { "margin": "3px 0" } },
                                        React.createElement("i", { className: "iconfont ", style: { "font-size": "12px", "color": "rgba(207, 209, 210, 1)" } }, "\uE83C"),
                                        "E\u5EA7B\u533A-3F-301"),
                                    React.createElement("p", { className: "leaseArea" },
                                        React.createElement("i", { className: "iconfont ", style: { "font-size": "12px", "color": "rgba(207, 209, 210, 1)" } }, "\uE83C"),
                                        "\u79D1\u6280\u670D\u52A1")))),
                        React.createElement("li", null,
                            React.createElement("div", { className: this.state.companyState == 2 ? "leaseRooms_on" : "leaseRooms" },
                                React.createElement("img", { src: "./fangliangbao/image/demo.png" }),
                                React.createElement("div", { className: "leaseRoomsRight" },
                                    React.createElement("p", { className: "leaseName" }, "\u6D59\u6C5F\u6C38\u62D3\u4FE1\u606F\u79D1\u6280\u6709\u9650\u516C\u4F0F\u89C1\u53F8\u64AD\u653E\u7ED3\u675F\u7684"),
                                    React.createElement("p", { className: "leaseArea", style: { "margin": "3px 0" } },
                                        React.createElement("i", { className: "iconfont ", style: { "font-size": "12px", "color": "rgba(207, 209, 210, 1)" } }, "\uE83C"),
                                        "E\u5EA7B\u533A-3F-301"),
                                    React.createElement("p", { className: "leaseArea" },
                                        React.createElement("i", { className: "iconfont ", style: { "font-size": "12px", "color": "rgba(207, 209, 210, 1)" } }, "\uE83C"),
                                        "\u79D1\u6280\u670D\u52A1"))))))));
        }
    }
    class ParkInfoThree extends React.Component {
        constructor(props) {
            super(props);
            this.state = {
                RoomInfoState: "hide",
            };
            ParkInfoThree.showRoomInfo = this.showRoomInfo.bind(this);
            ParkInfoThree.showCompanyInfo = this.showCompanyInfo.bind(this);
        }
        componentDidMount() {
        }
        static showRoomInfo() { }
        ;
        showRoomInfo() {
            this.setState({
                RoomInfoState: "RoomInfoShow",
            });
        }
        static showCompanyInfo() { }
        ;
        showCompanyInfo() {
            this.setState({
                RoomInfoState: "CompanyInfoShow",
            });
        }
        render() {
            return (React.createElement("div", { className: "ParkInfoThree" },
                React.createElement("div", { className: "ParkInfoThree_leftBox" },
                    this.state.RoomInfoState == "RoomInfoShow" ?
                        React.createElement(RoomInfoThreeLeft, null)
                        :
                            null,
                    this.state.RoomInfoState == "CompanyInfoShow" ?
                        React.createElement(CompanyInfoThreeLeft, null)
                        :
                            null,
                    React.createElement(ParkInfoThreeLeft, null)),
                React.createElement("div", { className: "ParkInfoThree_rightBox" },
                    React.createElement(ParkInfoThreeRight, null))));
        }
    }
    class ParkInfoThreeLeft extends React.Component {
        constructor(props) {
            super(props);
            this.state = {
                ParkInfoIndex: 0
            };
        }
        componentDidMount() {
        }
        ParkInfoOn(index) {
            this.setState({
                ParkInfoIndex: index
            });
        }
        render() {
            return (React.createElement("div", { className: "ParkInfoThree_left" },
                React.createElement("div", { className: "ParkInfoThree_left_title" },
                    React.createElement("ul", null,
                        React.createElement("li", { className: this.state.ParkInfoIndex == 0 ? "ParkInfoIndex_in" : null, onClick: this.ParkInfoOn.bind(this, 0) }, "\u56ED\u533A\u4ECB\u7ECD"),
                        React.createElement("li", { className: this.state.ParkInfoIndex == 1 ? "ParkInfoIndex_in" : null, onClick: this.ParkInfoOn.bind(this, 1) }, "\u533A\u4F4D\u4F18\u52BF"),
                        React.createElement("li", { className: this.state.ParkInfoIndex == 2 ? "ParkInfoIndex_in" : null, onClick: this.ParkInfoOn.bind(this, 2) }, "\u4F18\u60E0\u653F\u7B56"),
                        React.createElement("li", { className: this.state.ParkInfoIndex == 3 ? "ParkInfoIndex_in" : null, onClick: this.ParkInfoOn.bind(this, 3) }, "\u56ED\u533A\u98CE\u91C7"))),
                React.createElement("div", { className: "ParkInfoThree_left_text" },
                    this.state.ParkInfoIndex == 0 ?
                        React.createElement("div", { className: "ParkInfo_text parkIntroduced", id: "parkIntroduced" },
                            React.createElement("p", null, "\u5730\u5904\u5E7F\u5DDE\u3001\u987A\u5FB7\u3001\u4E2D\u5C71\u3001\u4E1C\u839E\u3001\u73E0\u6D77\u3001\u6DF1\u5733\u7B49\u5730\u4E4B\u67A2\u7EBD\uFF0C\u5360\u8E1E\u756A\u79BA\u7684\u6838\u5FC3\u4F4D\u7F6E\u3002\u524D\u8EAB\u662F\u6C38\u9686\u5236\u8863\u5382\uFF0C2010\u5E74\u7ECF\u6539\u9020\uFF0C\u6210\u4E3A\u4E86\u9752\u74E6\u767D\u5899\uFF0C\u8BD7\u60C5\u753B\u610F\u7684\u521B\u610F\u56ED\u533A\u3002 \u4EA7\u4E1A\u56ED\u53D6\u540D\u82B1\u57CE\uFF0C\u96C6\u5408\u4E86\u7EFF\u8272\u82B1\u57CE\u3001\u5386\u53F2\u82B1"),
                            React.createElement("p", null, "\u5730\u5904\u5E7F\u5DDE\u3001\u987A\u5FB7\u3001\u4E2D\u5C71\u3001\u4E1C\u839E\u3001\u73E0\u6D77\u3001\u6DF1\u5733\u7B49\u5730\u4E4B\u67A2\u7EBD\uFF0C\u5360\u8E1E\u756A\u79BA\u7684\u6838\u5FC3\u4F4D\u7F6E\u3002\u524D\u8EAB\u662F\u6C38\u9686\u5236\u8863\u5382\uFF0C2010\u5E74\u7ECF\u6539\u9020\uFF0C\u6210\u4E3A\u4E86\u9752\u74E6\u767D\u5899\uFF0C\u8BD7\u60C5\u753B\u610F\u7684\u521B\u610F\u56ED\u533A\u3002 \u4EA7\u4E1A\u56ED\u53D6\u540D\u82B1\u57CE\uFF0C\u96C6\u5408\u4E86\u7EFF\u8272\u82B1\u57CE\u3001\u5386\u53F2\u82B1\uFF0C\u5730\u5904\u5E7F\u5DDE\u3001\u987A\u5FB7\u3001\u4E2D\u5C71\u3001\u4E1C\u839E\u3001\u73E0\u6D77\u3001\u6DF1\u5733\u7B49\u5730\u4E4B\u67A2\u7EBD\uFF0C\u5360\u8E1E\u756A\u79BA\u7684\u6838\u5FC3\u4F4D\u7F6E\u3002\u524D\u8EAB\u662F\u6C38\u9686\u5236\u8863\u5382\uFF0C2010\u5E74\u7ECF\u6539\u9020\uFF0C\u6210\u4E3A\u4E86\u9752\u74E6\u767D\u5899\uFF0C\u8BD7\u60C5\u753B\u610F\u7684\u521B\u610F\u56ED\u533A\u3002 \u4EA7\u4E1A\u56ED\u53D6\u540D\u82B1\u57CE\uFF0C\u96C6\u5408\u4E86\u7EFF\u8272\u82B1\u57CE\u3001\u5386\u53F2\u82B1"),
                            React.createElement("p", null, "\u5730\u5904\u5E7F\u5DDE\u3001\u987A\u5FB7\u3001\u4E2D\u5C71\u3001\u4E1C\u839E\u3001\u73E0\u6D77\u3001\u6DF1\u5733\u7B49\u5730\u4E4B\u67A2\u7EBD\uFF0C\u5360\u8E1E\u756A\u79BA\u7684\u6838\u5FC3\u4F4D\u7F6E\u3002\u524D\u8EAB\u662F\u6C38\u9686\u5236\u8863\u5382\uFF0C2010\u5E74\u7ECF\u6539\u9020\uFF0C\u6210\u4E3A\u4E86\u9752\u74E6\u767D\u5899\uFF0C\u8BD7\u60C5\u753B\u610F\u7684\u521B\u610F\u56ED\u533A\u3002 \u4EA7\u4E1A\u56ED\u53D6\u540D\u82B1\u57CE\uFF0C\u96C6\u5408\u4E86\u7EFF\u8272\u82B1\u57CE\u3001\u5386\u53F2\u82B1"))
                        : null,
                    this.state.ParkInfoIndex == 1 ?
                        React.createElement("div", { className: "ParkInfo_text advantage", id: "advantage" },
                            React.createElement("p", null, "\u5730\u5904\u5E7F\u5DDE\u3001\u987A\u5FB7\u3001\u4E2D\u5C71\u3001\u4E1C\u839E\u3001\u73E0\u6D77\u3001\u6DF1\u5733\u7B49\u5730\u4E4B\u67A2\u7EBD\uFF0C\u5360\u8E1E\u756A\u79BA\u7684\u6838\u5FC3\u4F4D\u7F6E\u3002\u524D\u8EAB\u662F\u6C38\u9686\u5236\u8863\u5382\uFF0C2010\u5E74\u7ECF\u6539\u9020\uFF0C\u6210\u4E3A\u4E86\u9752\u74E6\u767D\u5899\uFF0C\u8BD7\u60C5\u753B\u610F\u7684\u521B\u610F\u56ED\u533A\u3002 \u4EA7\u4E1A\u56ED\u53D6\u540D\u82B1\u57CE\uFF0C\u96C6\u5408\u4E86\u7EFF\u8272\u82B1\u57CE\u3001\u5386\u53F2\u82B1"),
                            React.createElement("p", null, "\u5730\u5904\u5E7F\u5DDE\u3001\u987A\u5FB7\u3001\u4E2D\u5C71\u3001\u4E1C\u839E\u3001\u73E0\u6D77\u3001\u6DF1\u5733\u7B49\u5730\u4E4B\u67A2\u7EBD\uFF0C\u5360\u8E1E\u756A\u79BA\u7684\u6838\u5FC3\u4F4D\u7F6E\u3002\u524D\u8EAB\u662F\u6C38\u9686\u5236\u8863\u5382\uFF0C2010\u5E74\u7ECF\u6539\u9020\uFF0C\u6210\u4E3A\u4E86\u9752\u74E6\u767D\u5899\uFF0C\u8BD7\u60C5\u753B\u610F\u7684\u521B\u610F\u56ED\u533A\u3002 \u4EA7\u4E1A\u56ED\u53D6\u540D\u82B1\u57CE\uFF0C\u96C6\u5408\u4E86\u7EFF\u8272\u82B1\u57CE\u3001\u5386\u53F2\u82B1"))
                        : null,
                    this.state.ParkInfoIndex == 2 ?
                        React.createElement("div", { className: "ParkInfo_text discounts", id: "discounts" },
                            React.createElement("p", null, "\u5730\u5904\u5E7F\u5DDE\u3001\u987A\u5FB7\u3001\u4E2D\u5C71\u3001\u4E1C\u839E\u3001\u73E0\u6D77\u3001\u6DF1\u5733\u7B49\u5730\u4E4B\u67A2\u7EBD\uFF0C\u5360\u8E1E\u756A\u79BA\u7684\u6838\u5FC3\u4F4D\u7F6E\u3002\u524D\u8EAB\u662F\u6C38\u9686\u5236\u8863\u5382\uFF0C2010\u5E74\u7ECF\u6539\u9020\uFF0C\u6210\u4E3A\u4E86\u9752\u74E6\u767D\u5899\uFF0C\u8BD7\u60C5\u753B\u610F\u7684\u521B\u610F\u56ED\u533A\u3002 \u4EA7\u4E1A\u56ED\u53D6\u540D\u82B1\u57CE\uFF0C\u96C6\u5408\u4E86\u7EFF\u8272\u82B1\u57CE\u3001\u5386\u53F2\u82B1"))
                        : null,
                    this.state.ParkInfoIndex == 3 ?
                        React.createElement("div", { className: "ParkInfo_text parkElegant", id: "parkElegant" },
                            React.createElement("div", { className: "infoImg" },
                                React.createElement("div", { className: "infoImg_left" },
                                    React.createElement("i", { className: "iconfont " }, "\uE83C")),
                                React.createElement("div", { className: "infoImg_ul" },
                                    React.createElement("ul", null,
                                        React.createElement("li", null,
                                            " ",
                                            React.createElement("img", { src: "./fangliangbao/image/demo.png" })),
                                        React.createElement("li", null,
                                            " ",
                                            React.createElement("img", { src: "./fangliangbao/image/demo.png" })),
                                        React.createElement("li", null,
                                            " ",
                                            React.createElement("img", { src: "./fangliangbao/image/demo.png" })))),
                                React.createElement("p", { className: "infoImg_num" },
                                    React.createElement("span", null, "2"),
                                    " / ",
                                    React.createElement("span", null, "8")),
                                React.createElement("div", { className: "infoImg_right" },
                                    React.createElement("i", { className: "iconfont " }, "\uE83C"))))
                        : null)));
        }
    }
    class RoomInfoThreeLeft extends React.Component {
        constructor(props) {
            super(props);
            this.state = {
                RoomInfoIndex: 0,
                RoomInfoThreeLeft: "RoomInfoThreeLeft_part",
            };
        }
        componentDidMount() {
        }
        roomInfoOn(index) {
            console.log('roomInfoOn', index);
            if (index == 1) {
                this.setState({
                    RoomInfoThreeLeft: "RoomInfoThreeLeft_all",
                    RoomInfoIndex: index,
                });
            }
            else if (index == 2) {
                this.setState({
                    RoomInfoThreeLeft: "RoomInfoThreeLeft_all",
                    RoomInfoIndex: index,
                });
            }
            else {
                console.log('roomInfoOn0000', index);
                this.setState({
                    RoomInfoThreeLeft: "RoomInfoThreeLeft_part",
                    RoomInfoIndex: index,
                });
            }
        }
        render() {
            return (React.createElement("div", { className: this.state.RoomInfoThreeLeft },
                React.createElement("p", { className: "roomInfo_tit" }, "\u51FA\u79DF\uFF01\u9AD8\u65B0\u533A\u4FE1\u606F\u4EA7\u4E1A\u56ED\u8C6A\u534E\u88C5\u4FEE\u5355\u5143"),
                React.createElement("div", { className: "ParkInfoThree_left_title" },
                    React.createElement("ul", null,
                        React.createElement("li", { className: this.state.RoomInfoIndex == 0 ? "ParkInfoIndex_in" : null, onClick: this.roomInfoOn.bind(this, 0) }, "\u623F\u6E90\u6982\u51B5"),
                        React.createElement("li", { className: this.state.RoomInfoIndex == 1 ? "ParkInfoIndex_in" : null, onClick: this.roomInfoOn.bind(this, 1) }, "\u5B9E\u62CD\u7167\u7247"),
                        React.createElement("li", { className: this.state.RoomInfoIndex == 2 ? "ParkInfoIndex_in" : null, onClick: this.roomInfoOn.bind(this, 2) }, "\u5B9E\u62CD\u89C6\u9891"))),
                this.state.RoomInfoIndex == 0 ?
                    React.createElement("div", { className: "roomInfoBox" },
                        React.createElement("ul", { className: "roomInfoBox_one" },
                            React.createElement("li", null,
                                React.createElement("span", { style: { "font-size": "46px", "font-weight": "bold", "color": "rgba(220,26,63,1)" } }, "98"),
                                " \u5143/m\u00B2\u22C5\u6708"),
                            React.createElement("li", null,
                                "\u603B\u4EF7\uFF1A",
                                React.createElement("span", null, "19,600\u202C"),
                                " \u5143/m\u00B2\u22C5\u6708"),
                            React.createElement("li", { style: { "margin": "0px 24px" } },
                                React.createElement("p", null, "\u5EFA\u7B51\u9762\u79EF"),
                                React.createElement("p", { className: "ribo_bold" },
                                    React.createElement("span", null, "200"),
                                    "m\u00B2")),
                            React.createElement("li", { style: { "margin": "0px 24px" } },
                                React.createElement("p", null, "\u53EF\u5BB9\u7EB3\u5DE5\u4F4D"),
                                React.createElement("p", { className: "ribo_bold" },
                                    React.createElement("span", null, "29~58"),
                                    "\u4E2A\u5DE5\u4F4D")),
                            React.createElement("li", { style: { "margin": "0px 24px" } },
                                React.createElement("p", null, "\u88C5\u4FEE\u7A0B\u5EA6"),
                                React.createElement("p", { className: "ribo_bold" }, "\u4E2D\u7B49\u88C5\u4FEE"))),
                        React.createElement("ul", { className: "roomInfoBox_two" },
                            React.createElement("li", null,
                                "\u514D\u79DF\u65F6\u95F4 ",
                                React.createElement("span", null, "\u9762\u8BAE")),
                            React.createElement("li", null,
                                "\u603B\u5171\u697C\u5C42 ",
                                React.createElement("span", null, "12\u5C42")),
                            React.createElement("li", null,
                                "\u6240\u5728\u697C\u5C42 ",
                                React.createElement("span", null, "6\u5C42")),
                            React.createElement("li", null,
                                "\u7535",
                                React.createElement("span", { style: { "margin-left": "28px", "color": "rgba(152,159,168,1)" } }, "\u68AF"),
                                React.createElement("span", null, "\u6709\u7535\u68AF")),
                            React.createElement("li", null,
                                "\u770B\u623F\u65F6\u95F4 ",
                                React.createElement("span", null, "\u8054\u7CFB\u987E\u95EE\uFF0C\u968F\u65F6\u53EF\u770B")),
                            React.createElement("li", null,
                                "\u66F4\u65B0\u65F6\u95F4 ",
                                React.createElement("span", null, "14\u5C0F\u65F6\u524D"))))
                    : null,
                this.state.RoomInfoIndex == 1 ?
                    React.createElement("div", { className: "infoImg" },
                        React.createElement("div", { className: "stylesgoleft", id: "goleft" }, "AA"),
                        React.createElement("div", { className: "picshow" },
                            React.createElement("ul", null,
                                React.createElement("li", null,
                                    React.createElement("img", { src: "./fangliangbao/image/build.png" })),
                                React.createElement("li", null,
                                    React.createElement("img", { src: "./fangliangbao/image/build.png" })))),
                        React.createElement("div", { className: "stylesgoright", id: "goright" }, "BB"))
                    : null,
                this.state.RoomInfoIndex == 2 ?
                    React.createElement("div", { className: "infoImg" },
                        React.createElement("div", { className: "infoImg_left" },
                            React.createElement("i", { className: "iconfont " }, "\uE83C")),
                        React.createElement("div", { className: "infoImg_ul" },
                            React.createElement("ul", null,
                                React.createElement("li", null,
                                    " ",
                                    React.createElement("img", { src: "./fangliangbao/image/build.png" })),
                                React.createElement("li", null,
                                    " ",
                                    React.createElement("img", { src: "./fangliangbao/image/build.png" })),
                                React.createElement("li", null,
                                    " ",
                                    React.createElement("img", { src: "./fangliangbao/image/build.png" })))),
                        React.createElement("p", { className: "infoImg_num" },
                            React.createElement("span", null, "2"),
                            " / ",
                            React.createElement("span", null, "8")),
                        React.createElement("div", { className: "infoImg_right" },
                            React.createElement("i", { className: "iconfont " }, "\uE83C")))
                    : null));
        }
    }
    class CompanyInfoThreeLeft extends React.Component {
        constructor(props) {
            super(props);
            this.state = {
                RoomInfoIndex: 0,
                RoomInfoThreeLeft: "RoomInfoThreeLeft_part"
            };
        }
        componentDidMount() {
        }
        roomInfoOn(index) {
            this.setState({
                RoomInfoIndex: index,
            });
        }
        onChange(a, b, c) {
            console.log(a, b, c);
        }
        render() {
            return (React.createElement("div", { className: "RoomInfoThreeLeft" },
                React.createElement("div", { className: "ParkInfoThree_left_title" },
                    React.createElement("ul", null,
                        React.createElement("li", { className: this.state.RoomInfoIndex == 0 ? "ParkInfoIndex_in" : null, onClick: this.roomInfoOn.bind(this, 0) }, "\u4F01\u4E1A\u4FE1\u606F"),
                        React.createElement("li", { className: this.state.RoomInfoIndex == 1 ? "ParkInfoIndex_in" : null, onClick: this.roomInfoOn.bind(this, 1) }, "\u4F01\u4E1A\u98CE\u91C7"),
                        React.createElement("li", { className: this.state.RoomInfoIndex == 2 ? "ParkInfoIndex_in" : null, onClick: this.roomInfoOn.bind(this, 2) }, "\u4F01\u4E1A\u8BE6\u60C5"),
                        React.createElement("li", { className: this.state.RoomInfoIndex == 3 ? "ParkInfoIndex_in" : null, onClick: this.roomInfoOn.bind(this, 3) }, "\u4EA7\u54C1\u5C55\u793A"))),
                this.state.RoomInfoIndex == 0 ?
                    React.createElement("div", null, "\"000000000\"")
                    : null,
                this.state.RoomInfoIndex == 1 ?
                    React.createElement("div", { className: "infoImg" },
                        React.createElement("div", { className: "infoImg_left" },
                            React.createElement("i", { className: "iconfont " }, "\uE83C")),
                        React.createElement("div", { className: "infoImg_ul" },
                            React.createElement("ul", null,
                                React.createElement("li", null,
                                    " ",
                                    React.createElement("img", { src: "./fangliangbao/image/demo.png" })),
                                React.createElement("li", null,
                                    " ",
                                    React.createElement("img", { src: "./fangliangbao/image/demo.png" })),
                                React.createElement("li", null,
                                    " ",
                                    React.createElement("img", { src: "./fangliangbao/image/demo.png" })))),
                        React.createElement("p", { className: "infoImg_num" },
                            React.createElement("span", null, "2"),
                            " / ",
                            React.createElement("span", null, "8")),
                        React.createElement("div", { className: "infoImg_rightt" },
                            React.createElement("i", { className: "iconfont " }, "\uE83C")))
                    : null,
                this.state.RoomInfoIndex == 2 ?
                    React.createElement("div", { className: "infoImg" },
                        React.createElement("div", { className: "infoImg_left" },
                            React.createElement("i", { className: "iconfont " }, "\uE83C")),
                        React.createElement("div", { className: "infoImg_ul" },
                            React.createElement("ul", null,
                                React.createElement("li", null,
                                    " ",
                                    React.createElement("img", { src: "./fangliangbao/image/demo.png" })),
                                React.createElement("li", null,
                                    " ",
                                    React.createElement("img", { src: "./fangliangbao/image/demo.png" })),
                                React.createElement("li", null,
                                    " ",
                                    React.createElement("img", { src: "./fangliangbao/image/demo.png" })))),
                        React.createElement("p", { className: "infoImg_num" },
                            React.createElement("span", null, "2"),
                            " / ",
                            React.createElement("span", null, "8")),
                        React.createElement("div", { className: "infoImg_rightt" },
                            React.createElement("i", { className: "iconfont " }, "\uE83C")))
                    : null,
                this.state.RoomInfoIndex == 3 ?
                    React.createElement("div", { className: "infoImg" },
                        React.createElement("div", { className: "infoImg_left" },
                            React.createElement("i", { className: "iconfont " }, "\uE83C")),
                        React.createElement("div", { className: "infoImg_ul" },
                            React.createElement("ul", null,
                                React.createElement("li", null,
                                    " ",
                                    React.createElement("img", { src: "./fangliangbao/image/demo.png" })),
                                React.createElement("li", null,
                                    " ",
                                    React.createElement("img", { src: "./fangliangbao/image/demo.png" })),
                                React.createElement("li", null,
                                    " ",
                                    React.createElement("img", { src: "./fangliangbao/image/demo.png" })))),
                        React.createElement("p", { className: "infoImg_num" },
                            React.createElement("span", null, "2"),
                            " / ",
                            React.createElement("span", null, "8")),
                        React.createElement("div", { className: "infoImg_rightt" },
                            React.createElement("i", { className: "iconfont " }, "\uE83C")))
                    : null));
        }
    }
    class ParkInfoThreeRight extends React.Component {
        constructor(props) {
            super(props);
            this.state = {
                needText: "如：在广州白云区寻找200m2左右的办公室，租金在80元/m2·天，临近地铁站。",
                phone: "输入您的手机号码",
            };
        }
        componentDidMount() {
        }
        getNeed() {
            console.log(this.state);
        }
        render() {
            return (React.createElement("div", { className: "ParkInfoThree_right" },
                React.createElement("p", { className: "pitr_title" }, "\u54A8\u8BE2\u987E\u95EE"),
                React.createElement("div", { className: "ParkInfoThree_right_one" },
                    React.createElement("img", { src: "./fangliangbao/image/demo.png" }),
                    React.createElement("div", { className: "pitro_rb" },
                        React.createElement("p", { className: "pitro_name" }, "\u5F20\u4E09\u4E09"),
                        React.createElement("div", { className: "pitro_text1" }, "\u8BE5\u56ED\u533A\u4E0E\u623F\u6E90\u7531\u6211\u7EF4\u62A4\uFF0C\u719F\u77E5\u56ED\u533A\u653F\u7B56\u4E0E\u5468\u8FB9\u73AF\u5883"),
                        React.createElement("p", { className: "pitro_text2" },
                            "\u514D\u8D39\u54A8\u8BE2   ",
                            React.createElement("span", { style: { "font-size": "16px", "font-weight": "bold", "margin-left": "5px" } }, "15578380203")))),
                React.createElement("div", { className: "ParkInfoThree_right_two" },
                    React.createElement("p", { className: "pitr_title" }, "\u5B9D\u54E5\u5E2E\u627E\u623F"),
                    React.createElement("p", { className: "pitrt_inp" },
                        React.createElement("i", { className: "iconfont ", style: { "margin-right": "5px", "font-size": "14px" } }, "\uE83C"),
                        React.createElement("input", { type: "text", value: this.state.phone }))),
                React.createElement("div", { className: "ParkInfoThree_right_three" },
                    React.createElement("p", { className: "pitrth_text1" }, "\u60A8\u7684\u9700\u6C42\uFF1A"),
                    React.createElement("textarea", { value: this.state.needText }),
                    React.createElement("input", { type: "button" })),
                React.createElement("input", { type: "button", value: "\u7ACB\u5373\u59D4\u6258", className: "pitr_btn", onClick: this.getNeed.bind(this) })));
        }
    }
    exports.default = ParkInfo;
});
define("infoTitleRecom", ["require", "exports", "react"], function (require, exports, React) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    class InfoTitleBao extends React.Component {
        constructor(props) {
            super(props);
            this.state = {};
        }
        componentDidMount() {
        }
        render() {
            return (React.createElement("div", { className: "ParkInfoOne" },
                React.createElement("div", { className: "ParkInfoOne_title" },
                    React.createElement("img", { src: "./fangliangbao/image/blueLogo.png" }),
                    React.createElement("ul", null,
                        React.createElement("li", { style: { "color": " rgb(23, 161, 230)", "font-weight": "bold" } }, "\u5B9D\u54E5\u63A8\u8350"),
                        React.createElement("li", null, "\u70ED\u70B9\u8D44\u8BAF")))));
        }
    }
    exports.default = InfoTitleBao;
});

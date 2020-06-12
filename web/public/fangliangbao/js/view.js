define("allBottom", ["require", "exports", "react", "react-router-dom"], function (require, exports, React, react_router_dom_1) {
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
                                React.createElement(react_router_dom_1.Link, { to: "/contact" },
                                    React.createElement("li", { style: { cursor: "pointer" } }, "\u8054\u7CFB\u6211\u4EEC"),
                                    React.createElement("li", { style: { cursor: "pointer" } }, "\u7F51\u7AD9\u5730\u56FE"),
                                    React.createElement("li", { style: { cursor: "pointer" } }, "\u53CB\u60C5\u94FE\u63A5")))),
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
define("index", ["require", "exports", "react", "react-dom", "router", "allBottom", "react-router-dom", "css!./style/index.css", "css!./style/view.css"], function (require, exports, React, ReactDOM, router_1, allBottom_1, react_router_dom_2) {
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
                ],
                backgroundArr: ["./fangliangbao/image/index_bg.png", "./fangliangbao/image/banner1.jpg", "./fangliangbao/image/banner2.jpg"],
                backgroundIndex: 0,
                timer: 0,
                timer1: 0,
                opacity: 1,
            };
            Index.g_pIns = this;
        }
        componentDidMount() {
            this.setState({ clientWidth: (document.body.clientWidth - 1210) / 2 });
            window.onresize = () => {
                this.setState({ clientWidth: (document.body.clientWidth - 1210) / 2 });
            };
            this.setTimer();
        }
        setTimer() {
            clearTimeout(this.state.timer);
            clearTimeout(this.state.timer1);
            let timer = setTimeout(() => {
                this.setState({ backgroundIndex: this.state.backgroundIndex + 1 === this.state.backgroundArr.length ? 0 : this.state.backgroundIndex + 1, opacity: 1 });
                clearTimeout(this.state.timer);
                this.setTimer();
            }, 5000);
            let timer1 = setTimeout(() => {
                this.setState({ opacity: 0.5 });
                clearTimeout(this.state.timer1);
            }, 4500);
            this.setState({ timer: timer, timer1: timer1 });
        }
        render() {
            return (React.createElement("div", { className: "index" },
                React.createElement("div", { style: { width: "100%", height: "440px", background: "url(" + this.state.backgroundArr[this.state.backgroundIndex] + ") no-repeat center top", opacity: this.state.opacity }, className: "index-bg" },
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
                            React.createElement("div", null, "\u767B\u5F55/\u6CE8\u518C"))),
                    React.createElement("div", { style: { width: "100%", height: "14px", position: "absolute", top: "360px" } },
                        React.createElement("div", { style: { overflow: "hidden", width: this.state.backgroundArr.length * 14 + this.state.backgroundArr.length * 16, margin: "auto" } }, this.state.backgroundArr.map((item, index) => {
                            return (React.createElement("div", { key: index, className: "dot", style: { backgroundColor: this.state.backgroundIndex === index ? "#ffffff" : "rgba(255,255,255,.5)" }, onClick: () => {
                                    this.setState({ backgroundIndex: index }, () => {
                                        this.setTimer();
                                    });
                                } },
                                React.createElement("div", { className: "in-dot" })));
                        })))),
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
                        React.createElement(react_router_dom_2.Link, { to: "/parkList" },
                            React.createElement("div", { className: "index-park-c", style: { float: "right" } }, "\u66F4\u591A\u5E7F\u5DDE\u56ED\u533A"))),
                    React.createElement("div", { style: { overflow: "hidden" } }, this.state.parkArray.map((item, index) => {
                        return (React.createElement("div", { key: index, className: "index-park-child" },
                            React.createElement("div", { className: "index-img-a", style: { marginRight: (index + 1) % 4 === 0 ? "0px" : "20px", marginTop: index > 3 ? "28px" : "10px" } },
                                React.createElement("img", { src: "./fangliangbao/image/build.png", height: "100%", width: "100%", className: "index-img-t1" })),
                            React.createElement("div", { style: { fontSize: "16px", fontWeight: "bold", marginTop: "10px" } }, item.name),
                            React.createElement("div", { style: { overflow: "hidden", paddingTop: "10px" } },
                                React.createElement("img", { src: "./fangliangbao/image/position.png", width: "12px", height: "12px", style: { float: "left", margin: "4px 5px 0 0" } }),
                                " ",
                                React.createElement("div", { className: "index-address" }, item.address),
                                React.createElement("div", { className: "index-price", style: { margin: (index + 1) % 4 === 0 ? "-15px 0 0 0" : "-15px 20px 0 0" } },
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
                    React.createElement("div", null, [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12].map((item, index) => {
                        return (React.createElement("div", { key: index, style: { marginTop: index === 0 ? "18px" : "30px", overflow: "hidden", cursor: "pointer", width: "895px" } },
                            React.createElement("div", { style: { width: "240px", height: "180px", borderRadius: "5px", float: "left", overflow: "hidden" } },
                                React.createElement("img", { src: "./fangliangbao/image/build1.png", width: "100%", height: "100%", className: "index-img-t1" })),
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
                            React.createElement("div", { style: { float: "right", color: "#989FA8", fontSize: "14px", paddingTop: "70px", overflow: "hidden" } },
                                React.createElement("div", { style: { float: "right" } },
                                    React.createElement("span", { style: { color: "rgba(220, 26, 63, 1)", fontSize: "26px", fontWeight: 600, marginRight: "5px" } }, "1.8"),
                                    React.createElement("span", null, "\u4E07\u5143/\u6708")),
                                React.createElement("div", { style: { clear: "both" } }, "\u5355\u4EF7\uFF1A120\u5143/m\u00B2\u22C5\u6708"))));
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
define("infoTitle", ["require", "exports", "react", "react-router-dom"], function (require, exports, React, react_router_dom_3) {
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
                    React.createElement(react_router_dom_3.Link, { to: "/" },
                        React.createElement("img", { src: "./fangliangbao/image/blueLogo.png" })),
                    React.createElement("ul", null, [{ name: "品牌园区", url: "/parkList" }, { name: "出租房源", url: "/roomList" }, { name: "出售房源", url: "" }].map((item, index) => {
                        return (React.createElement(react_router_dom_3.Link, { to: item.url, key: index },
                            React.createElement("li", { style: { "color": index === this.props.index ? "rgb(23, 161, 230)" : "", "font-weight": index === this.props.index ? "bold" : "" } }, item.name)));
                    })))));
        }
    }
    exports.default = InfoTitle;
});
define("login", ["require", "exports", "react", "homeTop"], function (require, exports, React, homeTop_1) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    class Login extends React.Component {
        constructor(props) {
            super(props);
            this.count = () => {
                let A = setInterval(() => {
                    this.setState({
                        timer: (this.state.sendTime--)
                    }, () => {
                        if (this.state.sendTime == 0) {
                            clearInterval(A);
                            this.setState({
                                sendCodeState: false,
                                sendTime: 5
                            });
                        }
                    });
                }, 1000);
            };
            this.state = {
                boxState: 1,
                phone: "手机号",
                code: "短信验证码",
                firstLogin: false,
                sendCodeState: false,
                sendTime: 5,
                phoneWrong: "",
                codeWrong: "",
                phonef: false,
                codef: false,
            };
            this.callCodeSuc = this.callCodeSuc.bind(this);
        }
        componentDidMount() {
            console.log(this.state);
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
        phonefoucus(event) {
            if (this.state.phone == "手机号") {
                this.setState({
                    phone: "",
                    phoneWrong: "",
                    phonef: true,
                });
            }
        }
        phoneblur(event) {
            if (this.state.phone == "") {
                this.setState({
                    phone: "手机号",
                    phonef: false,
                });
            }
            else {
                this.setState({
                    phonef: false,
                });
            }
        }
        phoneChange(event) {
            let phone = event.target.value.replace(/[, ]/g, '');
            this.setState({
                phone: phone,
            });
        }
        codefoucus(event) {
            if (this.state.code == "短信验证码") {
                this.setState({
                    code: "",
                    codeWrong: "",
                    codef: true,
                });
            }
        }
        codeblur(event) {
            if (this.state.code == "") {
                this.setState({
                    code: "短信验证码",
                    codef: false,
                });
            }
            else {
                this.setState({
                    codef: false,
                });
            }
        }
        codeChange(event) {
            let code = event.target.value.replace(/[, ]/g, '');
            this.setState({
                code: code,
            });
        }
        callCode() {
            this.setState({
                sendTime: 5,
            });
            console.log(this.state);
            var reg01 = /^1[3456789]\d{9}$/;
            if (reg01.test(this.state.phone)) {
                console.log("ok");
                this.setState({
                    sendCodeState: true,
                    phoneWrong: "",
                }, () => {
                    this.callCodeSuc();
                });
            }
            else if (this.state.phone == "手机号") {
                this.setState({
                    sendCodeState: false,
                    phoneWrong: "手机号不能为空"
                });
                return;
            }
            else {
                this.setState({
                    sendCodeState: false,
                    phoneWrong: "请正确填写手机号码"
                });
                return;
            }
        }
        callCodeSuc() {
            console.log("getCode", this.state);
            this.count();
        }
        doLogin() {
            console.log("doLogin", this.state);
            if (this.state.code == "短信验证码") {
                this.setState({
                    codeWrong: "验证码不能为空"
                });
            }
            else if (this.state.phone == "手机号") {
                this.setState({
                    phoneWrong: "手机号不能为空"
                });
            }
            else {
                alert("sendCodeSuccess");
                this.setState({
                    firstLogin: true,
                    phone: "手机号",
                    code: "短信验证码",
                });
            }
        }
        ajaxLogin() {
            console.log("ajaxLogin");
        }
        doBind() {
            console.log("doBind", this.state);
            if (this.state.code == "短信验证码") {
                this.setState({
                    codeWrong: "验证码不能为空"
                });
            }
            else if (this.state.phone == "手机号") {
                this.setState({
                    phoneWrong: "手机号不能为空"
                });
            }
            else {
                alert("bindSuccess");
                this.setState({
                    phone: "手机号",
                    code: "短信验证码",
                });
            }
        }
        render() {
            return (React.createElement("div", { className: "fullView" }, this.state.firstLogin == true ?
                React.createElement("div", { className: "firstLogin" },
                    React.createElement("h2", null, "\u5FAE\u4FE1\u767B\u5F55\u6210\u529F"),
                    React.createElement("h3", null, "\u60A8\u7684\u624B\u673A\u53F7\u8FD8\u672A\u7ED1\u5B9A\u624B\u673A\uFF0C\u8BF7\u60A8\u7ED1\u5B9A\u624B\u673A\u53F7"),
                    React.createElement("p", { className: this.state.phonef == true ? "pf" : null },
                        React.createElement("input", { type: "text", value: this.state.phone, style: { "width": "100%" }, onFocus: this.phonefoucus.bind(this), onBlur: this.phoneblur.bind(this), onChange: this.phoneChange.bind(this) })),
                    React.createElement("span", null, this.state.phoneWrong),
                    React.createElement("p", { className: this.state.codef == true ? "pf" : null },
                        React.createElement("input", { type: "text", value: this.state.code, onFocus: this.codefoucus.bind(this), onBlur: this.codeblur.bind(this), onChange: this.codeChange.bind(this) }),
                        this.state.sendCodeState == false ?
                            React.createElement("span", { onClick: this.callCode.bind(this) }, "\u53D1\u9001\u9A8C\u8BC1\u7801")
                            :
                                React.createElement("span", null,
                                    this.state.sendTime,
                                    " \u79D2")),
                    React.createElement("span", null, this.state.codeWrong),
                    React.createElement("p", { onClick: this.doBind.bind(this) }, "\u7ED1  \u5B9A"))
                :
                    React.createElement("div", { className: "loginBox " },
                        React.createElement("i", { className: "iconfont ", style: { "font-size": "14px" }, onClick: this.closeLogin.bind(this) }, "\uE803"),
                        React.createElement("p", { className: "loginBoxTit" },
                            React.createElement("span", { className: this.state.boxState == 1 ? "activeLogin" : null, onClick: this.changeBox.bind(this, 1) }, "\u624B\u673A\u767B\u5F55"),
                            React.createElement("div", { style: { "width": "1px", "height": "16px", "background": "rgba(204,204,204,1)", "display": "inline-block", "margin": " 0 20px", "opacity": "0.8" } }),
                            React.createElement("span", { className: this.state.boxState == 2 ? "activeLogin" : null, onClick: this.changeBox.bind(this, 2) }, "\u5FAE\u4FE1\u767B\u5F55")),
                        this.state.boxState == 1 ?
                            React.createElement("div", { className: "phoneLogin" },
                                React.createElement("p", { className: this.state.phonef == true ? "pf" : null },
                                    React.createElement("input", { type: "text", value: this.state.phone, style: { "width": "100%" }, onFocus: this.phonefoucus.bind(this), onBlur: this.phoneblur.bind(this), onChange: this.phoneChange.bind(this) })),
                                React.createElement("span", null, this.state.phoneWrong),
                                React.createElement("p", { className: this.state.codef == true ? "pf" : null },
                                    React.createElement("input", { type: "text", value: this.state.code, onFocus: this.codefoucus.bind(this), onBlur: this.codeblur.bind(this), onChange: this.codeChange.bind(this) }),
                                    this.state.sendCodeState == false ?
                                        React.createElement("span", { onClick: this.callCode.bind(this) }, "\u53D1\u9001\u9A8C\u8BC1\u7801")
                                        :
                                            React.createElement("span", null,
                                                this.state.sendTime,
                                                " \u79D2")),
                                React.createElement("span", null, this.state.codeWrong),
                                React.createElement("p", { onClick: this.doLogin.bind(this) }, "\u767B  \u5F55"))
                            :
                                React.createElement("div", { className: "codeLogin" },
                                    React.createElement("img", { src: "./fangliangbao/image/demo.png" }),
                                    React.createElement("p", null, "\u8BF7\u4F7F\u7528\u5FAE\u4FE1\u626B\u63CF\u4E8C\u7EF4\u7801\u767B\u5F55")))));
        }
    }
    exports.default = Login;
});
define("homeTop", ["require", "exports", "react", "react-router-dom", "login", "css!./style/iconfont.css"], function (require, exports, React, react_router_dom_4, login_1) {
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
                            React.createElement(react_router_dom_4.Link, { to: "/" },
                                React.createElement("li", { className: this.state.htIndex == 1 ? "homtop_active" : null, onClick: this.changHomeTop.bind(this, 1) }, "\u9996\u9875")),
                            React.createElement(react_router_dom_4.Link, { to: "/parkList" },
                                React.createElement("li", { className: this.state.htIndex == 2 ? "homtop_active" : null, onClick: this.changHomeTop.bind(this, 2) }, "\u56ED\u533A")),
                            React.createElement(react_router_dom_4.Link, { to: "/roomList" },
                                React.createElement("li", { className: this.state.htIndex == 3 ? "homtop_active" : null, onClick: this.changHomeTop.bind(this, 3) }, "\u51FA\u79DF")),
                            React.createElement(react_router_dom_4.Link, { to: "/baoList" },
                                React.createElement("li", { className: this.state.htIndex == 4 ? "homtop_active" : null, onClick: this.changHomeTop.bind(this, 4) }, "\u5B9D\u54E5\u63A8\u8350")),
                            React.createElement(react_router_dom_4.Link, { to: "/hotList" },
                                React.createElement("li", { className: this.state.htIndex == 5 ? "homtop_active" : null, onClick: this.changHomeTop.bind(this, 5) }, "\u70ED\u70B9\u8D44\u8BAF")))),
                    React.createElement("div", { className: "htRight" },
                        React.createElement("ul", null,
                            React.createElement("li", null,
                                React.createElement("i", { className: "iconfont " }, "\uE838"),
                                "  400-808-3066"),
                            React.createElement("li", { onClick: this.showLogin.bind(this) },
                                " ",
                                React.createElement("span", null, "\u767B\u5F55"),
                                " / ",
                                React.createElement("span", null, "\u6CE8\u518C"))))),
                this.state.loginState == true ?
                    React.createElement(login_1.default, null)
                    : null));
        }
    }
    exports.default = HomeTop;
});
define("parkList", ["require", "exports", "react", "infoTitle", "homeTop", "allBottom"], function (require, exports, React, infoTitle_1, homeTop_2, allBottom_2) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    class ParkList extends React.Component {
        constructor(props) {
            super(props);
            this.state = {
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
                move: "",
                isDistrict: true,
                districtIndex: 0,
                focusDistrictIndex: 0,
                districtChildIndex: 0,
                focusDistrictChildIndex: 0,
                selectedArr: [{}, {}],
                iphoneValue: "输入您的手机号码",
                isUnitPrice: true,
                priceIndex: 0,
                focusPriceIndex: 0,
                minPrice: "",
                maxPrice: "",
            };
            this.cRef = ref => { this.refDom = ref; };
        }
        componentDidMount() {
            const { clientWidth, clientHeight, children } = this.refDom;
            this.setState({ move: children[0].clientWidth / 2 - 7 });
        }
        clickDistrict(index) {
            let move = 0;
            let selectedArr = this.state.selectedArr;
            selectedArr[0] = {};
            const { children } = this.refDom;
            this.setState({ districtIndex: index, districtChildIndex: 0, selectedArr: selectedArr }, () => {
                for (let i = 0; i < this.state.districtIndex; i++) {
                    move = move + children[i].clientWidth;
                }
                this.setState({ move: move + this.state.districtIndex * 24 + (children[this.state.districtIndex].clientWidth / 2 - 7) });
            });
        }
        render() {
            return (React.createElement("div", { className: "index" },
                React.createElement(homeTop_2.default, null),
                React.createElement("div", { style: { width: "1200px", margin: "auto", paddingTop: "61px" } },
                    React.createElement(infoTitle_1.default, { index: 0 })),
                React.createElement("div", { className: "warp", style: { marginTop: "26px", marginBottom: "65px", overflow: "hidden" } },
                    React.createElement("div", { style: { overflow: "hidden" } },
                        React.createElement("div", { style: { float: "left", width: "816px", overflow: "hidden" } },
                            React.createElement("div", { style: { width: "680px", overflow: "hidden", marginLeft: "-16px" } },
                                React.createElement("div", { style: { float: "left", overflow: "hidden" } },
                                    React.createElement("img", { src: "./fangliangbao/image/search.png", width: "16px", height: "16px", style: { position: "relative", bottom: "2px", left: "35px" } }),
                                    React.createElement("input", { className: "index-input", value: this.state.searchValue })),
                                React.createElement("div", { className: "index-search-name" }, "\u641C\u7D22")),
                            React.createElement("div", { style: { fontSize: "12px", color: "#333333", paddingTop: "30px", overflow: "hidden" } },
                                React.createElement("div", { style: { float: "left", color: "#989FA8" } }, "\u4F4D\u7F6E\uFF1A"),
                                React.createElement("div", { style: { float: "left", overflow: "hidden", marginLeft: "20px" } },
                                    React.createElement("div", { style: { float: "left", color: this.state.isDistrict ? "#17A1E6" : null, cursor: "pointer" }, onClick: () => this.setState({ isDistrict: true }) },
                                        "\u533A\u57DF",
                                        React.createElement("img", { src: this.state.isDistrict ? "./fangliangbao/image/blue_down.png" : "./fangliangbao/image/black_down.png", width: "10px", height: "10px", style: { margin: "0 24px 2px 5px" } })),
                                    React.createElement("div", { style: { float: "left", cursor: "pointer", color: !this.state.isDistrict ? "#17A1E6" : null }, onClick: () => this.setState({ isDistrict: false }) },
                                        "\u5730\u94C1",
                                        React.createElement("img", { src: !this.state.isDistrict ? "./fangliangbao/image/blue_down.png" : "./fangliangbao/image/black_down.png", width: "10px", height: "10px", style: { margin: "0 0 2px 5px" } }))),
                                React.createElement("div", { style: { clear: "both" } }),
                                React.createElement("div", { style: { overflow: "hidden", margin: "10px 0 0 56px", height: "16px" }, ref: this.cRef }, this.state.districtArray.map((item, index) => {
                                    return (React.createElement("div", { key: index, style: { float: "left", marginRight: "24px", color: index === this.state.districtIndex || index === this.state.focusDistrictIndex ? "#17A1E6" : "", cursor: "pointer" }, onClick: e => this.clickDistrict(index), onMouseMove: () => this.setState({ focusDistrictIndex: index }), onMouseLeave: () => this.setState({ focusDistrictIndex: -1 }) }, item.name));
                                })),
                                this.state.districtIndex !== 0 ?
                                    React.createElement("div", null,
                                        React.createElement("div", { className: "triangle", style: { marginLeft: 56 + this.state.move } }),
                                        React.createElement("div", { className: "in_triangle", style: { marginLeft: 56 + this.state.move } }),
                                        React.createElement("div", { className: "park-list-br" }),
                                        React.createElement("div", { style: { margin: "10px 0 0 56px" } }, this.state.districtChildArray.map((item, index) => {
                                            return (React.createElement("div", { key: index, style: { float: "left", height: "16px", marginRight: "24px", cursor: "pointer", color: index === this.state.districtChildIndex || index === this.state.focusDistrictChildIndex ? "#17A1E6" : "" }, onClick: () => {
                                                    let selectedArr = this.state.selectedArr;
                                                    if (index !== 0) {
                                                        selectedArr[0] = item;
                                                    }
                                                    else {
                                                        selectedArr[0] = {};
                                                    }
                                                    this.setState({ districtChildIndex: index, selectedArr: selectedArr });
                                                }, onMouseMove: () => this.setState({ focusDistrictChildIndex: index }), onMouseLeave: () => this.setState({ focusDistrictChildIndex: -1 }) }, item.name));
                                        }))) : null,
                                React.createElement("div", { style: { clear: "both" } }),
                                React.createElement("div", { style: { marginTop: "27px", overflow: "hidden" } },
                                    React.createElement("div", { style: { float: "left", color: "#989FA8" } }, "\u4EF7\u683C\uFF1A"),
                                    React.createElement("div", { className: "park-list-price", onClick: () => {
                                            let selectedArr = this.state.selectedArr;
                                            selectedArr[1] = {};
                                            this.setState({ isUnitPrice: true, priceIndex: 0, selectedArr: selectedArr, minPrice: "", maxPrice: "" });
                                        }, style: { color: this.state.isUnitPrice ? "#17A1E6" : "#989FA8", border: this.state.isUnitPrice ? "1px solid #17A1E6" : "1px solid #CCCCCC", marginLeft: "20px", cursor: "pointer", backgroundColor: "#fff" } }, "\u5355\u4EF7"),
                                    React.createElement("div", { className: "park-list-price", onClick: () => {
                                            let selectedArr = this.state.selectedArr;
                                            selectedArr[1] = {};
                                            this.setState({ isUnitPrice: false, priceIndex: 0, selectedArr: selectedArr, minPrice: "", maxPrice: "" });
                                        }, style: { color: !this.state.isUnitPrice ? "#17A1E6" : "#989FA8", border: !this.state.isUnitPrice ? "1px solid #17A1E6" : "1px solid #CCCCCC", cursor: "pointer", backgroundColor: "#fff" } }, "\u603B\u4EF7"),
                                    React.createElement("div", { className: "park-list-price-q" },
                                        React.createElement("input", { style: { width: "46px", float: "left", border: "none", outline: "none", padding: "0 10px 0 10px", lineHeight: "20px" }, value: this.state.minPrice, onChange: event => {
                                                const value = event.target.value;
                                                const reg = /^\d*?$/;
                                                if ((reg.test(value) && value.length < 5) || value === "") {
                                                    this.setState({ minPrice: event.target.value.substring(0, 4) }, () => {
                                                        if (this.state.minPrice.length === 4 && this.state.maxPrice.length === 4) {
                                                            let selectedArr = this.state.selectedArr;
                                                            let name = this.state.isUnitPrice ? "元/m²·月" : "万元/月";
                                                            selectedArr[1] = { id: "", name: this.state.minPrice + "-" + this.state.maxPrice + name };
                                                            this.setState({ selectedArr: selectedArr, priceIndex: -1 });
                                                        }
                                                    });
                                                }
                                            } }),
                                        React.createElement("div", { style: { height: "1px", width: "5px", backgroundColor: "#CCCCCC", float: "left", margin: "10px 0 0 3px" } }),
                                        React.createElement("div", { style: { height: "1px", width: "5px", backgroundColor: "#CCCCCC", float: "left", margin: "10px 0 0 1px" } }),
                                        React.createElement("input", { style: { width: "46px", float: "right", border: "none", outline: "none", padding: "0 10px 0 10px", lineHeight: "20px" }, value: this.state.maxPrice, onChange: event => {
                                                const value = event.target.value;
                                                const reg = /^\d*?$/;
                                                if ((reg.test(value) && value.length < 5) || value === "") {
                                                    this.setState({ maxPrice: event.target.value.substring(0, 4) }, () => {
                                                        if (this.state.minPrice.length === 4 && this.state.maxPrice.length === 4) {
                                                            let selectedArr = this.state.selectedArr;
                                                            let name = this.state.isUnitPrice ? "元/m²·月" : "万元/月";
                                                            selectedArr[1] = { id: "", name: this.state.minPrice + "-" + this.state.maxPrice + name };
                                                            this.setState({ selectedArr: selectedArr, priceIndex: -1 });
                                                        }
                                                    });
                                                }
                                            } })),
                                    React.createElement("div", { style: { float: "left", marginLeft: "8px", height: "22px", lineHeight: "22px" } }, this.state.isUnitPrice ? "元/m²·月" : "万元/月")),
                                React.createElement("div", { style: { margin: "10px 0 0 56px", clear: "both", overflow: "hidden" } }, this.state.isUnitPrice ?
                                    this.state.unitPriceArray.map((item, index) => {
                                        return (React.createElement("div", { key: index, onMouseMove: () => this.setState({ focusPriceIndex: index }), onMouseLeave: () => this.setState({ focusPriceIndex: -1 }), onClick: () => {
                                                let selectedArr = this.state.selectedArr;
                                                if (index !== 0) {
                                                    selectedArr[1] = item;
                                                }
                                                else {
                                                    selectedArr[1] = {};
                                                }
                                                this.setState({ priceIndex: index, selectedArr: selectedArr, minPrice: "", maxPrice: "" });
                                            }, style: { float: "left", marginRight: "24px", cursor: "pointer", color: this.state.priceIndex === index || this.state.focusPriceIndex === index ? "#17A1E6" : "" } }, item.name));
                                    }) :
                                    this.state.totalPriceArray.map((item, index) => {
                                        return (React.createElement("div", { key: index, onMouseMove: () => this.setState({ focusPriceIndex: index }), onMouseLeave: () => this.setState({ focusPriceIndex: -1 }), onClick: () => {
                                                let selectedArr = this.state.selectedArr;
                                                if (index !== 0) {
                                                    selectedArr[1] = item;
                                                }
                                                else {
                                                    selectedArr[1] = {};
                                                }
                                                this.setState({ priceIndex: index, selectedArr: selectedArr, minPrice: "", maxPrice: "" });
                                            }, style: { float: "left", marginRight: "24px", cursor: "pointer", color: this.state.priceIndex === index || this.state.focusPriceIndex === index ? "#17A1E6" : "" } }, item.name));
                                    })))),
                        React.createElement("div", { className: "searchCont" },
                            React.createElement("input", { className: "index-iphone", value: this.state.iphoneValue }),
                            React.createElement("img", { src: "./fangliangbao/image/iphone.png", width: "18px", height: "18px", style: { position: "relative", bottom: "31px", left: "10px" } }),
                            React.createElement("div", { className: "index-require" },
                                React.createElement("div", { className: "you-require" }, "\u60A8\u7684\u9700\u6C42"),
                                React.createElement("div", { className: "you-talk " }, "\u9760\u8FD1\u5730\u94C1\uFF0C\u9760\u8FD1\u5927\u6D77\uFF0C\u6709\u82B1\u56ED\u3002")),
                            React.createElement("div", { className: "find-room" }, "\u5B9D\u54E5\u5E2E\u627E\u623F"))),
                    React.createElement("div", { style: { backgroundColor: "#E6E6E6", height: "1px", clear: "both", marginTop: "30px" } }),
                    React.createElement("div", { style: { color: "#989FA8", marginTop: "20px", fontSize: "12px", lineHeight: "28px", overflow: "hidden" } },
                        React.createElement("div", { style: { float: "left" } }, "\u5DF2\u9009\uFF1A"),
                        this.state.selectedArr.map((item, index) => {
                            return (React.createElement("div", { className: "park-list-x", key: index, style: { display: JSON.stringify(item) === "{}" ? "none" : "" } },
                                React.createElement("span", null, item.name),
                                React.createElement("img", { src: "./fangliangbao/image/close.png", width: "15px", height: "15px", style: { margin: "0 0 3px 5px" }, onClick: () => {
                                        let selectedArr = this.state.selectedArr;
                                        selectedArr[index] = {};
                                        index ?
                                            this.setState({ selectedArr: selectedArr, priceIndex: 0, minPrice: "", maxPrice: "" }) :
                                            this.setState({ selectedArr: selectedArr, districtIndex: 0, districtChildIndex: 0 });
                                    } })));
                        }),
                        React.createElement("div", { style: { float: "left", marginLeft: "20px", height: "28px", lineHeight: "28px", cursor: "pointer" }, onClick: () => {
                                this.setState({ selectedArr: [{}, {}], districtIndex: 0, districtChildIndex: 0, priceIndex: 0, minPrice: "", maxPrice: "" });
                            } },
                            React.createElement("img", { src: "./fangliangbao/image/clear.png", width: "14px", height: "14px", style: { float: "left", marginTop: "7px" } }),
                            React.createElement("div", { style: { float: "left", color: "#333333", marginLeft: "5px", height: "28px", lineHeight: "28px" } }, "\u6E05\u7A7A\u6761\u4EF6"))),
                    React.createElement("div", { style: { marginTop: "34px", overflow: "hidden" } },
                        React.createElement("div", { className: "park-list-all-t" }, "\u5168\u90E8\u56ED\u533A"),
                        React.createElement("div", { style: { float: "right", height: "40px", lineHeight: "52px" } },
                            "\u5171\u6709",
                            React.createElement("span", { style: { fontSize: "16px", color: "#17A1E6", margin: "0 5px 0 5px" } }, "12"),
                            "\u4E2A\u56ED\u533A\u6EE1\u8DB3\u60A8\u7684\u9700\u6C42")),
                    React.createElement("div", { style: { backgroundColor: "#17A1E6", height: "1px" } }),
                    React.createElement("div", { style: { overflow: "hidden", marginTop: "2px" } }, this.state.parkArray.map((item, index) => {
                        return (React.createElement("div", { key: index, className: "index-park-child" },
                            React.createElement("div", { className: "index-img-a", style: { marginRight: (index + 1) % 4 === 0 ? "0px" : "20px", marginTop: "28px" } },
                                React.createElement("img", { src: "./fangliangbao/image/build.png", className: "index-img-t1", height: "100%", width: "100%" })),
                            React.createElement("div", { style: { fontSize: "16px", fontWeight: "bold", marginTop: "10px" } }, item.name),
                            React.createElement("div", { style: { overflow: "hidden", paddingTop: "10px" } },
                                React.createElement("img", { src: "./fangliangbao/image/position.png", width: "12px", height: "12px", style: { float: "left", margin: "4px 5px 0 0" } }),
                                " ",
                                React.createElement("div", { className: "index-address" }, item.address),
                                React.createElement("div", { className: "index-price", style: { margin: (index + 1) % 4 === 0 ? "-15px 0 0 0" : "-15px 20px 0 0" } },
                                    React.createElement("span", { style: { color: "#DC1A3F", fontSize: "24px", marginRight: "5px" } }, item.price),
                                    "\u5143/m\u00B2\u00B7\u5929"))));
                    }))),
                React.createElement("div", { className: "paging" }, ["<", 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, ">"].map((item, index) => {
                    return (React.createElement("div", { key: index, className: "paging-child", style: { marginRight: index !== 11 ? "6px" : 0 } }, index === 0 ?
                        React.createElement("img", { src: "./fangliangbao/image/left_j.png", width: "14px", height: "14px" }) :
                        index === 11 ?
                            React.createElement("img", { src: "./fangliangbao/image/left_j.png", width: "14px", height: "14px", style: { transform: "rotate(180deg)" } }) :
                            item));
                })),
                React.createElement("div", { style: { position: "relative" } },
                    React.createElement(allBottom_2.default, null))));
        }
    }
    exports.default = ParkList;
});
define("roomList", ["require", "exports", "react", "infoTitle", "homeTop", "allBottom"], function (require, exports, React, infoTitle_2, homeTop_3, allBottom_3) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    class RoomList extends React.Component {
        constructor(props) {
            super(props);
            this.state = {
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
                areaArray: [
                    { name: "全部" }, { name: "0-100m²" }, { name: "100-300m²" }, { name: "300-500m²" }, { name: "500-1000m²" }, { name: "1000m²以上" }
                ],
                decorationArray: [
                    { name: "全部" }, { name: "毛坯" }, { name: "简装" }, { name: "精装" }, { name: "豪华" }
                ],
                move: "",
                districtIndex: 0,
                focusDistrictIndex: 0,
                iphoneValue: "输入您的手机号码",
                hotPark: [
                    { name: "桂林信息产业园", price: "90.5", address: "七星-朝阳路D-12号" }, { name: "桂林信息产业园", price: "90.5", address: "七星-朝阳路D-12号" }, { name: "桂林信息产业园", price: "90.5", address: "七星-朝阳路D-12号" },
                    { name: "桂林信息产业园", price: "90.5", address: "七星-朝阳路D-12号" }, { name: "桂林信息产业园", price: "90.5", address: "七星-朝阳路D-12号" }
                ],
                selectedArr: [{}, {}, {}, {}],
                isDistrict: true,
                districtChildIndex: 0,
                focusDistrictChildIndex: 0,
                isUnitPrice: true,
                priceIndex: 0,
                focusPriceIndex: 0,
                minPrice: "",
                maxPrice: "",
                areaIndex: 0,
                minArea: "",
                maxArea: "",
                decorationIndex: 0
            };
            this.cRef = ref => { this.refDom = ref; };
        }
        componentDidMount() {
            const { clientWidth, clientHeight, children } = this.refDom;
            console.log(clientWidth, clientHeight, children[0].clientWidth, this.refDom);
            this.setState({ move: children[0].clientWidth / 2 - 7 });
        }
        clickDistrict(index) {
            let move = 0;
            let selectedArr = this.state.selectedArr;
            selectedArr[0] = {};
            const { children } = this.refDom;
            this.setState({ districtIndex: index, districtChildIndex: 0, selectedArr: selectedArr }, () => {
                for (let i = 0; i < this.state.districtIndex; i++) {
                    move = move + children[i].clientWidth;
                }
                console.log(move, this.state.districtIndex * 24, children[this.state.districtIndex].clientWidth / 2 - 7);
                this.setState({ move: move + this.state.districtIndex * 24 + (children[this.state.districtIndex].clientWidth / 2 - 7) });
            });
        }
        render() {
            return (React.createElement("div", { className: "index" },
                React.createElement(homeTop_3.default, null),
                React.createElement("div", { style: { width: "1200px", margin: "auto", paddingTop: "61px" } },
                    React.createElement(infoTitle_2.default, { index: 1 })),
                React.createElement("div", { className: "warp", style: { marginTop: "26px", marginBottom: "10px", overflow: "hidden" } },
                    React.createElement("div", { style: { overflow: "hidden" } },
                        React.createElement("div", { style: { float: "left", width: "816px", overflow: "hidden" } },
                            React.createElement("div", { style: { width: "680px", overflow: "hidden", marginLeft: "-16px" } },
                                React.createElement("div", { style: { float: "left", overflow: "hidden" } },
                                    React.createElement("img", { src: "./fangliangbao/image/search.png", width: "16px", height: "16px", style: { position: "relative", bottom: "2px", left: "35px" } }),
                                    React.createElement("input", { className: "index-input", value: this.state.searchValue })),
                                React.createElement("div", { className: "index-search-name" }, "\u641C\u7D22")),
                            React.createElement("div", { style: { fontSize: "12px", color: "#333333", paddingTop: "30px", overflow: "hidden" } },
                                React.createElement("div", { style: { float: "left", color: "#989FA8" } }, "\u4F4D\u7F6E\uFF1A"),
                                React.createElement("div", { style: { float: "left", overflow: "hidden", marginLeft: "20px" } },
                                    React.createElement("div", { style: { float: "left", color: this.state.isDistrict ? "#17A1E6" : null, cursor: "pointer" }, onClick: () => this.setState({ isDistrict: true }) },
                                        "\u533A\u57DF",
                                        React.createElement("img", { src: this.state.isDistrict ? "./fangliangbao/image/blue_down.png" : "./fangliangbao/image/black_down.png", width: "10px", height: "10px", style: { margin: "0 24px 2px 5px" } })),
                                    React.createElement("div", { style: { float: "left", cursor: "pointer", color: !this.state.isDistrict ? "#17A1E6" : null }, onClick: () => this.setState({ isDistrict: false }) },
                                        "\u5730\u94C1",
                                        React.createElement("img", { src: !this.state.isDistrict ? "./fangliangbao/image/blue_down.png" : "./fangliangbao/image/black_down.png", width: "10px", height: "10px", style: { margin: "0 0 2px 5px" } }))),
                                React.createElement("div", { style: { clear: "both" } }),
                                React.createElement("div", { style: { overflow: "hidden", margin: "10px 0 0 56px", height: "16px" }, ref: this.cRef }, this.state.districtArray.map((item, index) => {
                                    return (React.createElement("div", { key: index, style: { float: "left", marginRight: "24px", color: index === this.state.districtIndex || index === this.state.focusDistrictIndex ? "#17A1E6" : "", cursor: "pointer" }, onClick: e => this.clickDistrict(index), onMouseMove: () => this.setState({ focusDistrictIndex: index }), onMouseLeave: () => this.setState({ focusDistrictIndex: -1 }) }, item.name));
                                })),
                                React.createElement("div", { className: "triangle", style: { marginLeft: 56 + this.state.move } }),
                                React.createElement("div", { className: "in_triangle", style: { marginLeft: 56 + this.state.move } }),
                                React.createElement("div", { className: "park-list-br" }),
                                React.createElement("div", { style: { margin: "10px 0 0 56px" } }, this.state.districtChildArray.map((item, index) => {
                                    return (React.createElement("div", { key: index, style: { float: "left", height: "16px", marginRight: "24px", cursor: "pointer", color: index === this.state.districtChildIndex || index === this.state.focusDistrictChildIndex ? "#17A1E6" : "" }, onClick: () => {
                                            let selectedArr = this.state.selectedArr;
                                            if (index !== 0) {
                                                selectedArr[0] = item;
                                            }
                                            else {
                                                selectedArr[0] = {};
                                            }
                                            this.setState({ districtChildIndex: index, selectedArr: selectedArr });
                                        }, onMouseMove: () => this.setState({ focusDistrictChildIndex: index }), onMouseLeave: () => this.setState({ focusDistrictChildIndex: -1 }) }, item.name));
                                })),
                                React.createElement("div", { style: { clear: "both" } }),
                                React.createElement("div", { style: { marginTop: "27px", overflow: "hidden", clear: "both" } },
                                    React.createElement("div", { style: { float: "left", color: "#989FA8" } }, "\u9762\u79EF\uFF1A"),
                                    React.createElement("div", { style: { marginLeft: "56px" } }, this.state.areaArray.map((item, index) => {
                                        return (React.createElement("div", { key: index, style: { float: "left", height: "16px", marginRight: "24px", cursor: "pointer", color: this.state.areaIndex === index ? "#17A1E6" : "" }, onClick: () => {
                                                let selectedArr = this.state.selectedArr;
                                                if (index !== 0) {
                                                    selectedArr[1] = item;
                                                }
                                                else {
                                                    selectedArr[1] = {};
                                                }
                                                this.setState({ areaIndex: index, selectedArr: selectedArr, minArea: "", maxArea: "" });
                                            } }, item.name));
                                    })),
                                    React.createElement("div", { className: "park-list-price-q" },
                                        React.createElement("input", { style: { width: "46px", float: "left", border: "none", outline: "none", padding: "0 10px 0 10px", lineHeight: "20px" }, value: this.state.minArea, onChange: event => {
                                                const value = event.target.value;
                                                const reg = /^\d*?$/;
                                                if ((reg.test(value) && value.length < 5) || value === "") {
                                                    this.setState({ minArea: event.target.value.substring(0, 4) }, () => {
                                                        if (this.state.minArea.length === 4 && this.state.maxArea.length === 4) {
                                                            let selectedArr = this.state.selectedArr;
                                                            selectedArr[1] = { id: "", name: this.state.minArea + "-" + this.state.maxArea + "m²" };
                                                            this.setState({ selectedArr: selectedArr, areaIndex: -1 });
                                                        }
                                                    });
                                                }
                                            } }),
                                        React.createElement("div", { style: { height: "1px", width: "5px", backgroundColor: "#CCCCCC", float: "left", margin: "10px 0 0 3px" } }),
                                        React.createElement("div", { style: { height: "1px", width: "5px", backgroundColor: "#CCCCCC", float: "left", margin: "10px 0 0 1px" } }),
                                        React.createElement("input", { style: { width: "46px", float: "right", border: "none", outline: "none", padding: "0 10px 0 10px", lineHeight: "20px" }, value: this.state.maxArea, onChange: event => {
                                                const value = event.target.value;
                                                const reg = /^\d*?$/;
                                                if ((reg.test(value) && value.length < 5) || value === "") {
                                                    this.setState({ maxArea: event.target.value.substring(0, 4) }, () => {
                                                        if (this.state.minArea.length === 4 && this.state.maxArea.length === 4) {
                                                            let selectedArr = this.state.selectedArr;
                                                            selectedArr[1] = { id: "", name: this.state.minArea + "-" + this.state.maxArea + "m²" };
                                                            this.setState({ selectedArr: selectedArr, areaIndex: -1 });
                                                        }
                                                    });
                                                }
                                            } })),
                                    React.createElement("div", { style: { float: "left", height: "22px", lineHeight: "22px", marginLeft: "5px" } }, "m\u00B2")),
                                React.createElement("div", { style: { clear: "both" } }),
                                React.createElement("div", { style: { marginTop: "27px", overflow: "hidden" } },
                                    React.createElement("div", { style: { float: "left", color: "#989FA8" } }, "\u4EF7\u683C\uFF1A"),
                                    React.createElement("div", { className: "park-list-price", onClick: () => {
                                            let selectedArr = this.state.selectedArr;
                                            selectedArr[2] = {};
                                            this.setState({ isUnitPrice: true, priceIndex: 0, selectedArr: selectedArr, minPrice: "", maxPrice: "" });
                                        }, style: { color: this.state.isUnitPrice ? "#17A1E6" : "#989FA8", border: this.state.isUnitPrice ? "1px solid #17A1E6" : "1px solid #CCCCCC", marginLeft: "20px", cursor: "pointer", backgroundColor: "#fff" } }, "\u5355\u4EF7"),
                                    React.createElement("div", { className: "park-list-price", onClick: () => {
                                            let selectedArr = this.state.selectedArr;
                                            selectedArr[2] = {};
                                            this.setState({ isUnitPrice: false, priceIndex: 0, selectedArr: selectedArr, minPrice: "", maxPrice: "" });
                                        }, style: { color: !this.state.isUnitPrice ? "#17A1E6" : "#989FA8", border: !this.state.isUnitPrice ? "1px solid #17A1E6" : "1px solid #CCCCCC", cursor: "pointer", backgroundColor: "#fff" } }, "\u603B\u4EF7"),
                                    React.createElement("div", { className: "park-list-price-q" },
                                        React.createElement("input", { style: { width: "46px", float: "left", border: "none", outline: "none", padding: "0 10px 0 10px", lineHeight: "20px" }, value: this.state.minPrice, onChange: event => {
                                                const value = event.target.value;
                                                const reg = /^\d*?$/;
                                                if ((reg.test(value) && value.length < 5) || value === "") {
                                                    this.setState({ minPrice: event.target.value.substring(0, 4) }, () => {
                                                        if (this.state.minPrice.length === 4 && this.state.maxPrice.length === 4) {
                                                            let selectedArr = this.state.selectedArr;
                                                            let name = this.state.isUnitPrice ? "元/m²·月" : "万元/月";
                                                            selectedArr[2] = { id: "", name: this.state.minPrice + "-" + this.state.maxPrice + name };
                                                            this.setState({ selectedArr: selectedArr, priceIndex: -1 });
                                                        }
                                                    });
                                                }
                                            } }),
                                        React.createElement("div", { style: { height: "1px", width: "5px", backgroundColor: "#CCCCCC", float: "left", margin: "10px 0 0 3px" } }),
                                        React.createElement("div", { style: { height: "1px", width: "5px", backgroundColor: "#CCCCCC", float: "left", margin: "10px 0 0 1px" } }),
                                        React.createElement("input", { style: { width: "46px", float: "right", border: "none", outline: "none", padding: "0 10px 0 10px", lineHeight: "20px" }, value: this.state.maxPrice, onChange: event => {
                                                const value = event.target.value;
                                                const reg = /^\d*?$/;
                                                if ((reg.test(value) && value.length < 5) || value === "") {
                                                    this.setState({ maxPrice: event.target.value.substring(0, 4) }, () => {
                                                        if (this.state.minPrice.length === 4 && this.state.maxPrice.length === 4) {
                                                            let selectedArr = this.state.selectedArr;
                                                            let name = this.state.isUnitPrice ? "元/m²·月" : "万元/月";
                                                            selectedArr[2] = { id: "", name: this.state.minPrice + "-" + this.state.maxPrice + name };
                                                            this.setState({ selectedArr: selectedArr, priceIndex: -1 });
                                                        }
                                                    });
                                                }
                                            } })),
                                    React.createElement("div", { style: { float: "left", marginLeft: "8px", height: "22px", lineHeight: "22px" } }, this.state.isUnitPrice ? "元/m²·月" : "万元/月")),
                                React.createElement("div", { style: { margin: "10px 0 0 56px", clear: "both", overflow: "hidden" } }, this.state.isUnitPrice ?
                                    this.state.unitPriceArray.map((item, index) => {
                                        return (React.createElement("div", { key: index, onMouseMove: () => this.setState({ focusPriceIndex: index }), onMouseLeave: () => this.setState({ focusPriceIndex: -1 }), onClick: () => {
                                                let selectedArr = this.state.selectedArr;
                                                if (index !== 0) {
                                                    selectedArr[2] = item;
                                                }
                                                else {
                                                    selectedArr[2] = {};
                                                }
                                                this.setState({ priceIndex: index, selectedArr: selectedArr, minPrice: "", maxPrice: "" });
                                            }, style: { float: "left", marginRight: "24px", cursor: "pointer", color: this.state.priceIndex === index || this.state.focusPriceIndex === index ? "#17A1E6" : "" } }, item.name));
                                    }) :
                                    this.state.totalPriceArray.map((item, index) => {
                                        return (React.createElement("div", { key: index, onMouseMove: () => this.setState({ focusPriceIndex: index }), onMouseLeave: () => this.setState({ focusPriceIndex: -1 }), onClick: () => {
                                                let selectedArr = this.state.selectedArr;
                                                if (index !== 0) {
                                                    selectedArr[2] = item;
                                                }
                                                else {
                                                    selectedArr[2] = {};
                                                }
                                                this.setState({ priceIndex: index, selectedArr: selectedArr, minPrice: "", maxPrice: "" });
                                            }, style: { float: "left", marginRight: "24px", cursor: "pointer", color: this.state.priceIndex === index || this.state.focusPriceIndex === index ? "#17A1E6" : "" } }, item.name));
                                    })),
                                React.createElement("div", { style: { clear: "both" } }),
                                React.createElement("div", { style: { marginTop: "27px", overflow: "hidden", clear: "both" } },
                                    React.createElement("div", { style: { float: "left", color: "#989FA8" } }, "\u88C5\u4FEE\uFF1A"),
                                    React.createElement("div", { style: { marginLeft: "56px" } }, this.state.decorationArray.map((item, index) => {
                                        return (React.createElement("div", { key: index, style: { float: "left", height: "16px", marginRight: "24px", cursor: "pointer", color: this.state.decorationIndex === index ? "#17A1E6" : "" }, onClick: () => {
                                                let selectedArr = this.state.selectedArr;
                                                if (index !== 0) {
                                                    selectedArr[3] = item;
                                                }
                                                else {
                                                    selectedArr[3] = {};
                                                }
                                                this.setState({ selectedArr: selectedArr, decorationIndex: index });
                                            } }, item.name));
                                    }))))),
                        React.createElement("div", { className: "searchCont" },
                            React.createElement("input", { className: "index-iphone", value: this.state.iphoneValue }),
                            React.createElement("img", { src: "./fangliangbao/image/iphone.png", width: "18px", height: "18px", style: { position: "relative", bottom: "31px", left: "10px" } }),
                            React.createElement("div", { className: "index-require" },
                                React.createElement("div", { className: "you-require" }, "\u60A8\u7684\u9700\u6C42"),
                                React.createElement("div", { className: "you-talk " }, "\u9760\u8FD1\u5730\u94C1\uFF0C\u9760\u8FD1\u5927\u6D77\uFF0C\u6709\u82B1\u56ED\u3002")),
                            React.createElement("div", { className: "find-room" }, "\u5B9D\u54E5\u5E2E\u627E\u623F"))),
                    React.createElement("div", { style: { backgroundColor: "#E6E6E6", height: "1px", clear: "both", marginTop: "30px" } }),
                    React.createElement("div", { style: { color: "#989FA8", marginTop: "20px", fontSize: "12px", lineHeight: "28px", overflow: "hidden" } },
                        React.createElement("div", { style: { float: "left" } }, "\u5DF2\u9009\uFF1A"),
                        this.state.selectedArr.map((item, index) => {
                            return (React.createElement("div", { className: "park-list-x", key: index, style: { display: JSON.stringify(item) === "{}" ? "none" : "" } },
                                React.createElement("span", null, item.name),
                                React.createElement("img", { src: "./fangliangbao/image/close.png", width: "15px", height: "15px", style: { margin: "0 0 2px 5px" }, onClick: () => {
                                        let selectedArr = this.state.selectedArr;
                                        selectedArr[index] = {};
                                        switch (index) {
                                            case 0:
                                                this.setState({ selectedArr: selectedArr, districtIndex: 0, districtChildIndex: 0 });
                                                break;
                                            case 1:
                                                this.setState({ selectedArr: selectedArr, areaIndex: 0, minArea: "", maxArea: "" });
                                                break;
                                            case 2:
                                                this.setState({ selectedArr: selectedArr, priceIndex: 0, minPrice: "", maxPrice: "" });
                                                break;
                                            case 3:
                                                this.setState({ selectedArr: selectedArr, decorationIndex: 0 });
                                                break;
                                        }
                                    } })));
                        }),
                        React.createElement("div", { style: { float: "left", marginLeft: "20px", height: "28px", lineHeight: "28px", cursor: "pointer" }, onClick: () => {
                                this.setState({ selectedArr: [{}, {}, {}, {}], districtIndex: 0, districtChildIndex: 0, priceIndex: 0, minPrice: "", maxPrice: "", areaIndex: 0, minArea: "", maxArea: "", decorationIndex: 0 });
                            } },
                            React.createElement("img", { src: "./fangliangbao/image/clear.png", width: "14px", height: "14px", style: { float: "left", marginTop: "7px" } }),
                            React.createElement("div", { style: { float: "left", color: "#333333", marginLeft: "5px", height: "28px", lineHeight: "28px" } }, "\u6E05\u7A7A\u6761\u4EF6"))),
                    React.createElement("div", { style: { clear: "both" } }),
                    React.createElement("div", { style: { marginTop: "34px", overflow: "hidden" } },
                        React.createElement("div", { style: { overflow: "hidden", width: "895px", float: "left" } },
                            React.createElement("div", { style: { overflow: "hidden" } },
                                React.createElement("div", { className: "park-list-all-t" }, "\u5168\u90E8\u623F\u6E90"),
                                React.createElement("div", { style: { float: "right", height: "40px", lineHeight: "52px" } },
                                    "\u5171\u6709",
                                    React.createElement("span", { style: { fontSize: "16px", color: "#17A1E6", margin: "0 5px 0 5px" } }, "60"),
                                    "\u6761\u623F\u6E90\u6EE1\u8DB3\u60A8\u7684\u9700\u6C42")),
                            React.createElement("div", { style: { backgroundColor: "#17A1E6", height: "1px", width: "895px" } })),
                        React.createElement("div", { className: "room-list-hot-room" }, "\u70ED\u95E8\u56ED\u533A\u63A8\u8350")),
                    React.createElement("div", { style: { overflow: "hidden" } },
                        React.createElement("div", { style: { width: "895px", float: "left" } },
                            [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12].map((item, index) => {
                                return (React.createElement("div", { key: index, style: { marginTop: index === 0 ? "18px" : "30px", overflow: "hidden", cursor: "pointer", width: "895px" } },
                                    React.createElement("div", { style: { width: "240px", height: "180px", borderRadius: "5px", float: "left", overflow: "hidden" } },
                                        React.createElement("img", { src: "./fangliangbao/image/build1.png", className: "index-img-t1", width: "100%", height: "100%" })),
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
                                    React.createElement("div", { className: "index-collect", style: { border: index === 1 ? "1px solid #17A1E6" : "1px solid rgba(204,204,204,1)" } },
                                        React.createElement("div", { style: { float: "left", height: "11px", width: "11px", overflow: "hidden", margin: "5.5px 5px 0 8px" } },
                                            React.createElement("img", { src: index === 1 ? "./fangliangbao/image/collected.png" : "./fangliangbao/image/collect.png", width: "100%", height: "100%", style: { display: "block" } })),
                                        React.createElement("div", { style: { color: "#B9B9B9", fontSize: "12px", float: "left" } }, "\u6536\u85CF")),
                                    React.createElement("div", { style: { float: "left", color: "#989FA8", fontSize: "14px", paddingTop: "47px", overflow: "hidden" } },
                                        React.createElement("div", { style: { float: "right" } },
                                            React.createElement("span", { style: { color: "rgba(220, 26, 63, 1)", fontSize: "26px", fontWeight: 600, marginRight: "5px" } }, "1.8"),
                                            React.createElement("span", null, "\u4E07\u5143/\u6708")),
                                        React.createElement("div", { style: { clear: "both" } }, "\u5355\u4EF7\uFF1A120\u5143/m\u00B2\u22C5\u6708"))));
                            }),
                            React.createElement("div", { className: "paging", style: { marginTop: "80px" } }, ["<", 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, ">"].map((item, index) => {
                                return (React.createElement("div", { key: index, className: "paging-child", style: { marginRight: index !== 11 ? "6px" : 0 } }, index === 0 ?
                                    React.createElement("img", { src: "./fangliangbao/image/left_j.png", width: "14px", height: "14px" }) :
                                    index === 11 ?
                                        React.createElement("img", { src: "./fangliangbao/image/left_j.png", width: "14px", height: "14px", style: { transform: "rotate(180deg)" } }) :
                                        item));
                            }))),
                        React.createElement("div", { style: { float: "left", overflow: "hidden", margin: "0 0 0 60px" } },
                            this.state.hotPark.map((item, index) => {
                                return (React.createElement("div", { style: { overflow: "hidden", marginTop: "20px" }, key: index },
                                    React.createElement("img", { src: "./fangliangbao/image/build1.png", width: "88px", height: "66px", style: { borderRadius: "2px", float: "left" } }),
                                    React.createElement("div", { style: { float: "left", margin: "-1px 0 0 16px" } },
                                        React.createElement("div", { style: { color: "#333333", fontSize: "14px" } }, item.name),
                                        React.createElement("div", { style: { marginTop: "2px" } },
                                            React.createElement("span", { style: { color: "#DC1A3F", fontSize: "16px", marginRight: "5px", fontWeight: 600 } }, item.price),
                                            React.createElement("span", { style: { color: "#989FA8", fontSize: "12px" } }, "\u5143/m\u00B2\u22C5\u6708")),
                                        React.createElement("div", { style: { color: "#989FA8", fontSize: "12px", marginTop: "2px" } }, item.address))));
                            }),
                            React.createElement("div", { className: "wx-title" }, "\u623F\u826F\u5B9D\u5C0F\u7A0B\u5E8F\u7AEF"),
                            React.createElement("img", { src: "./fangliangbao/image/wx.png" }),
                            React.createElement("div", { style: { fontSize: "12px", marginLeft: "10px" } }, "\u6253\u5F00\u5FAE\u4FE1\u626B\u4E00\u626B\u968F\u65F6\u624B\u673A\u4F53\u9A8C")))),
                React.createElement(allBottom_3.default, null)));
        }
    }
    exports.default = RoomList;
});
define("sellList", ["require", "exports", "react", "infoTitle", "homeTop", "allBottom"], function (require, exports, React, infoTitle_3, homeTop_4, allBottom_4) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    class SellList extends React.Component {
        constructor(props) {
            super(props);
            this.state = {
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
                areaArray: [
                    { name: "全部" }, { name: "0-100m²" }, { name: "100-300m²" }, { name: "300-500m²" }, { name: "500-1000m²" }, { name: "1000m²以上" }
                ],
                decorationArray: [
                    { name: "全部" }, { name: "毛坯" }, { name: "简装" }, { name: "精装" }, { name: "豪华" }
                ],
                move: "",
                districtIndex: 0,
                focusDistrictIndex: 0,
                iphoneValue: "输入您的手机号码",
                hotPark: [
                    { name: "桂林信息产业园", price: "90.5", address: "七星-朝阳路D-12号" }, { name: "桂林信息产业园", price: "90.5", address: "七星-朝阳路D-12号" }, { name: "桂林信息产业园", price: "90.5", address: "七星-朝阳路D-12号" },
                    { name: "桂林信息产业园", price: "90.5", address: "七星-朝阳路D-12号" }, { name: "桂林信息产业园", price: "90.5", address: "七星-朝阳路D-12号" }
                ],
                selectedArr: [{}, {}, {}, {}],
                isDistrict: true,
                districtChildIndex: 0,
                focusDistrictChildIndex: 0,
                isUnitPrice: true,
                priceIndex: 0,
                focusPriceIndex: 0,
                minPrice: "",
                maxPrice: "",
                areaIndex: 0,
                minArea: "",
                maxArea: "",
                decorationIndex: 0
            };
            this.cRef = ref => { this.refDom = ref; };
        }
        componentDidMount() {
            const { clientWidth, clientHeight, children } = this.refDom;
            console.log(clientWidth, clientHeight, children[0].clientWidth, this.refDom);
            this.setState({ move: children[0].clientWidth / 2 - 7 });
        }
        clickDistrict(index) {
            let move = 0;
            let selectedArr = this.state.selectedArr;
            selectedArr[0] = {};
            const { children } = this.refDom;
            this.setState({ districtIndex: index, districtChildIndex: 0, selectedArr: selectedArr }, () => {
                for (let i = 0; i < this.state.districtIndex; i++) {
                    move = move + children[i].clientWidth;
                }
                console.log(move, this.state.districtIndex * 24, children[this.state.districtIndex].clientWidth / 2 - 7);
                this.setState({ move: move + this.state.districtIndex * 24 + (children[this.state.districtIndex].clientWidth / 2 - 7) });
            });
        }
        render() {
            return (React.createElement("div", { className: "index" },
                React.createElement(homeTop_4.default, null),
                React.createElement("div", { style: { width: "1200px", margin: "auto", paddingTop: "61px" } },
                    React.createElement(infoTitle_3.default, { index: 2 })),
                React.createElement("div", { className: "warp", style: { marginTop: "26px", marginBottom: "10px", overflow: "hidden" } },
                    React.createElement("div", { style: { overflow: "hidden" } },
                        React.createElement("div", { style: { float: "left", width: "816px", overflow: "hidden" } },
                            React.createElement("div", { style: { width: "680px", overflow: "hidden", marginLeft: "-16px" } },
                                React.createElement("div", { style: { float: "left", overflow: "hidden" } },
                                    React.createElement("img", { src: "./fangliangbao/image/search.png", width: "16px", height: "16px", style: { position: "relative", bottom: "2px", left: "35px" } }),
                                    React.createElement("input", { className: "index-input", value: this.state.searchValue })),
                                React.createElement("div", { className: "index-search-name" }, "\u641C\u7D22")),
                            React.createElement("div", { style: { fontSize: "12px", color: "#333333", paddingTop: "30px", overflow: "hidden" } },
                                React.createElement("div", { style: { float: "left", color: "#989FA8" } }, "\u4F4D\u7F6E\uFF1A"),
                                React.createElement("div", { style: { float: "left", overflow: "hidden", marginLeft: "20px" } },
                                    React.createElement("div", { style: { float: "left", color: this.state.isDistrict ? "#17A1E6" : null, cursor: "pointer" }, onClick: () => this.setState({ isDistrict: true }) },
                                        "\u533A\u57DF",
                                        React.createElement("img", { src: this.state.isDistrict ? "./fangliangbao/image/blue_down.png" : "./fangliangbao/image/black_down.png", width: "10px", height: "10px", style: { margin: "0 24px 2px 5px" } })),
                                    React.createElement("div", { style: { float: "left", cursor: "pointer", color: !this.state.isDistrict ? "#17A1E6" : null }, onClick: () => this.setState({ isDistrict: false }) },
                                        "\u5730\u94C1",
                                        React.createElement("img", { src: !this.state.isDistrict ? "./fangliangbao/image/blue_down.png" : "./fangliangbao/image/black_down.png", width: "10px", height: "10px", style: { margin: "0 0 2px 5px" } }))),
                                React.createElement("div", { style: { clear: "both" } }),
                                React.createElement("div", { style: { overflow: "hidden", margin: "10px 0 0 56px", height: "16px" }, ref: this.cRef }, this.state.districtArray.map((item, index) => {
                                    return (React.createElement("div", { key: index, style: { float: "left", marginRight: "24px", color: index === this.state.districtIndex || index === this.state.focusDistrictIndex ? "#17A1E6" : "", cursor: "pointer" }, onClick: e => this.clickDistrict(index), onMouseMove: () => this.setState({ focusDistrictIndex: index }), onMouseLeave: () => this.setState({ focusDistrictIndex: -1 }) }, item.name));
                                })),
                                React.createElement("div", { className: "triangle", style: { marginLeft: 56 + this.state.move } }),
                                React.createElement("div", { className: "in_triangle", style: { marginLeft: 56 + this.state.move } }),
                                React.createElement("div", { className: "park-list-br" }),
                                React.createElement("div", { style: { margin: "10px 0 0 56px" } }, this.state.districtChildArray.map((item, index) => {
                                    return (React.createElement("div", { key: index, style: { float: "left", height: "16px", marginRight: "24px", cursor: "pointer", color: index === this.state.districtChildIndex || index === this.state.focusDistrictChildIndex ? "#17A1E6" : "" }, onClick: () => {
                                            let selectedArr = this.state.selectedArr;
                                            if (index !== 0) {
                                                selectedArr[0] = item;
                                            }
                                            else {
                                                selectedArr[0] = {};
                                            }
                                            this.setState({ districtChildIndex: index, selectedArr: selectedArr });
                                        }, onMouseMove: () => this.setState({ focusDistrictChildIndex: index }), onMouseLeave: () => this.setState({ focusDistrictChildIndex: -1 }) }, item.name));
                                })),
                                React.createElement("div", { style: { clear: "both" } }),
                                React.createElement("div", { style: { marginTop: "27px", overflow: "hidden", clear: "both" } },
                                    React.createElement("div", { style: { float: "left", color: "#989FA8" } }, "\u9762\u79EF\uFF1A"),
                                    React.createElement("div", { style: { marginLeft: "56px" } }, this.state.areaArray.map((item, index) => {
                                        return (React.createElement("div", { key: index, style: { float: "left", height: "16px", marginRight: "24px", cursor: "pointer", color: this.state.areaIndex === index ? "#17A1E6" : "" }, onClick: () => {
                                                let selectedArr = this.state.selectedArr;
                                                if (index !== 0) {
                                                    selectedArr[1] = item;
                                                }
                                                else {
                                                    selectedArr[1] = {};
                                                }
                                                this.setState({ areaIndex: index, selectedArr: selectedArr, minArea: "", maxArea: "" });
                                            } }, item.name));
                                    })),
                                    React.createElement("div", { className: "park-list-price-q" },
                                        React.createElement("input", { style: { width: "46px", float: "left", border: "none", outline: "none", padding: "0 10px 0 10px", lineHeight: "20px" }, value: this.state.minArea, onChange: event => {
                                                const value = event.target.value;
                                                const reg = /^\d*?$/;
                                                if ((reg.test(value) && value.length < 5) || value === "") {
                                                    this.setState({ minArea: event.target.value.substring(0, 4) }, () => {
                                                        if (this.state.minArea.length === 4 && this.state.maxArea.length === 4) {
                                                            let selectedArr = this.state.selectedArr;
                                                            selectedArr[1] = { id: "", name: this.state.minArea + "-" + this.state.maxArea + "m²" };
                                                            this.setState({ selectedArr: selectedArr, areaIndex: -1 });
                                                        }
                                                    });
                                                }
                                            } }),
                                        React.createElement("div", { style: { height: "1px", width: "5px", backgroundColor: "#CCCCCC", float: "left", margin: "10px 0 0 3px" } }),
                                        React.createElement("div", { style: { height: "1px", width: "5px", backgroundColor: "#CCCCCC", float: "left", margin: "10px 0 0 1px" } }),
                                        React.createElement("input", { style: { width: "46px", float: "right", border: "none", outline: "none", padding: "0 10px 0 10px", lineHeight: "20px" }, value: this.state.maxArea, onChange: event => {
                                                const value = event.target.value;
                                                const reg = /^\d*?$/;
                                                if ((reg.test(value) && value.length < 5) || value === "") {
                                                    this.setState({ maxArea: event.target.value.substring(0, 4) }, () => {
                                                        if (this.state.minArea.length === 4 && this.state.maxArea.length === 4) {
                                                            let selectedArr = this.state.selectedArr;
                                                            selectedArr[1] = { id: "", name: this.state.minArea + "-" + this.state.maxArea + "m²" };
                                                            this.setState({ selectedArr: selectedArr, areaIndex: -1 });
                                                        }
                                                    });
                                                }
                                            } })),
                                    React.createElement("div", { style: { float: "left", height: "22px", lineHeight: "22px", marginLeft: "5px" } }, "m\u00B2")),
                                React.createElement("div", { style: { clear: "both" } }),
                                React.createElement("div", { style: { marginTop: "27px", overflow: "hidden" } },
                                    React.createElement("div", { style: { float: "left", color: "#989FA8" } }, "\u552E\u4EF7\uFF1A"),
                                    React.createElement("div", { className: "park-list-price", onClick: () => {
                                            let selectedArr = this.state.selectedArr;
                                            selectedArr[2] = {};
                                            this.setState({ isUnitPrice: true, priceIndex: 0, selectedArr: selectedArr, minPrice: "", maxPrice: "" });
                                        }, style: { color: this.state.isUnitPrice ? "#17A1E6" : "#989FA8", border: this.state.isUnitPrice ? "1px solid #17A1E6" : "1px solid #CCCCCC", marginLeft: "20px", cursor: "pointer", backgroundColor: "#fff" } }, "\u5355\u4EF7"),
                                    React.createElement("div", { className: "park-list-price", onClick: () => {
                                            let selectedArr = this.state.selectedArr;
                                            selectedArr[2] = {};
                                            this.setState({ isUnitPrice: false, priceIndex: 0, selectedArr: selectedArr, minPrice: "", maxPrice: "" });
                                        }, style: { color: !this.state.isUnitPrice ? "#17A1E6" : "#989FA8", border: !this.state.isUnitPrice ? "1px solid #17A1E6" : "1px solid #CCCCCC", cursor: "pointer", backgroundColor: "#fff" } }, "\u603B\u4EF7"),
                                    React.createElement("div", { className: "park-list-price-q" },
                                        React.createElement("input", { style: { width: "46px", float: "left", border: "none", outline: "none", padding: "0 10px 0 10px", lineHeight: "20px" }, value: this.state.minPrice, onChange: event => {
                                                const value = event.target.value;
                                                const reg = /^\d*?$/;
                                                if ((reg.test(value) && value.length < 5) || value === "") {
                                                    this.setState({ minPrice: event.target.value.substring(0, 4) }, () => {
                                                        if (this.state.minPrice.length === 4 && this.state.maxPrice.length === 4) {
                                                            let selectedArr = this.state.selectedArr;
                                                            let name = this.state.isUnitPrice ? "元/m²·月" : "万元/月";
                                                            selectedArr[2] = { id: "", name: this.state.minPrice + "-" + this.state.maxPrice + name };
                                                            this.setState({ selectedArr: selectedArr, priceIndex: -1 });
                                                        }
                                                    });
                                                }
                                            } }),
                                        React.createElement("div", { style: { height: "1px", width: "5px", backgroundColor: "#CCCCCC", float: "left", margin: "10px 0 0 3px" } }),
                                        React.createElement("div", { style: { height: "1px", width: "5px", backgroundColor: "#CCCCCC", float: "left", margin: "10px 0 0 1px" } }),
                                        React.createElement("input", { style: { width: "46px", float: "right", border: "none", outline: "none", padding: "0 10px 0 10px", lineHeight: "20px" }, value: this.state.maxPrice, onChange: event => {
                                                const value = event.target.value;
                                                const reg = /^\d*?$/;
                                                if ((reg.test(value) && value.length < 5) || value === "") {
                                                    this.setState({ maxPrice: event.target.value.substring(0, 4) }, () => {
                                                        if (this.state.minPrice.length === 4 && this.state.maxPrice.length === 4) {
                                                            let selectedArr = this.state.selectedArr;
                                                            let name = this.state.isUnitPrice ? "元/m²·月" : "万元/月";
                                                            selectedArr[2] = { id: "", name: this.state.minPrice + "-" + this.state.maxPrice + name };
                                                            this.setState({ selectedArr: selectedArr, priceIndex: -1 });
                                                        }
                                                    });
                                                }
                                            } })),
                                    React.createElement("div", { style: { float: "left", marginLeft: "8px", height: "22px", lineHeight: "22px" } }, this.state.isUnitPrice ? "元/m²·月" : "万元/月")),
                                React.createElement("div", { style: { margin: "10px 0 0 56px", clear: "both", overflow: "hidden" } }, this.state.isUnitPrice ?
                                    this.state.unitPriceArray.map((item, index) => {
                                        return (React.createElement("div", { key: index, onMouseMove: () => this.setState({ focusPriceIndex: index }), onMouseLeave: () => this.setState({ focusPriceIndex: -1 }), onClick: () => {
                                                let selectedArr = this.state.selectedArr;
                                                if (index !== 0) {
                                                    selectedArr[2] = item;
                                                }
                                                else {
                                                    selectedArr[2] = {};
                                                }
                                                this.setState({ priceIndex: index, selectedArr: selectedArr, minPrice: "", maxPrice: "" });
                                            }, style: { float: "left", marginRight: "24px", cursor: "pointer", color: this.state.priceIndex === index || this.state.focusPriceIndex === index ? "#17A1E6" : "" } }, item.name));
                                    }) :
                                    this.state.totalPriceArray.map((item, index) => {
                                        return (React.createElement("div", { key: index, onMouseMove: () => this.setState({ focusPriceIndex: index }), onMouseLeave: () => this.setState({ focusPriceIndex: -1 }), onClick: () => {
                                                let selectedArr = this.state.selectedArr;
                                                if (index !== 0) {
                                                    selectedArr[2] = item;
                                                }
                                                else {
                                                    selectedArr[2] = {};
                                                }
                                                this.setState({ priceIndex: index, selectedArr: selectedArr, minPrice: "", maxPrice: "" });
                                            }, style: { float: "left", marginRight: "24px", cursor: "pointer", color: this.state.priceIndex === index || this.state.focusPriceIndex === index ? "#17A1E6" : "" } }, item.name));
                                    })),
                                React.createElement("div", { style: { clear: "both" } }),
                                React.createElement("div", { style: { marginTop: "27px", overflow: "hidden", clear: "both" } },
                                    React.createElement("div", { style: { float: "left", color: "#989FA8" } }, "\u88C5\u4FEE\uFF1A"),
                                    React.createElement("div", { style: { marginLeft: "56px" } }, this.state.decorationArray.map((item, index) => {
                                        return (React.createElement("div", { key: index, style: { float: "left", height: "16px", marginRight: "24px", cursor: "pointer", color: this.state.decorationIndex === index ? "#17A1E6" : "" }, onClick: () => {
                                                let selectedArr = this.state.selectedArr;
                                                if (index !== 0) {
                                                    selectedArr[3] = item;
                                                }
                                                else {
                                                    selectedArr[3] = {};
                                                }
                                                this.setState({ selectedArr: selectedArr, decorationIndex: index });
                                            } }, item.name));
                                    }))))),
                        React.createElement("div", { className: "searchCont" },
                            React.createElement("input", { className: "index-iphone", value: this.state.iphoneValue }),
                            React.createElement("img", { src: "./fangliangbao/image/iphone.png", width: "18px", height: "18px", style: { position: "relative", bottom: "31px", left: "10px" } }),
                            React.createElement("div", { className: "index-require" },
                                React.createElement("div", { className: "you-require" }, "\u60A8\u7684\u9700\u6C42"),
                                React.createElement("div", { className: "you-talk " }, "\u9760\u8FD1\u5730\u94C1\uFF0C\u9760\u8FD1\u5927\u6D77\uFF0C\u6709\u82B1\u56ED\u3002")),
                            React.createElement("div", { className: "find-room" }, "\u5B9D\u54E5\u5E2E\u627E\u623F"))),
                    React.createElement("div", { style: { backgroundColor: "#E6E6E6", height: "1px", clear: "both", marginTop: "30px" } }),
                    React.createElement("div", { style: { color: "#989FA8", marginTop: "20px", fontSize: "12px", lineHeight: "28px", overflow: "hidden" } },
                        React.createElement("div", { style: { float: "left" } }, "\u5DF2\u9009\uFF1A"),
                        this.state.selectedArr.map((item, index) => {
                            return (React.createElement("div", { className: "park-list-x", key: index, style: { display: JSON.stringify(item) === "{}" ? "none" : "" } },
                                React.createElement("span", null, item.name),
                                React.createElement("img", { src: "./fangliangbao/image/close.png", width: "15px", height: "15px", style: { margin: "0 0 2px 5px" }, onClick: () => {
                                        let selectedArr = this.state.selectedArr;
                                        selectedArr[index] = {};
                                        switch (index) {
                                            case 0:
                                                this.setState({ selectedArr: selectedArr, districtIndex: 0, districtChildIndex: 0 });
                                                break;
                                            case 1:
                                                this.setState({ selectedArr: selectedArr, areaIndex: 0, minArea: "", maxArea: "" });
                                                break;
                                            case 2:
                                                this.setState({ selectedArr: selectedArr, priceIndex: 0, minPrice: "", maxPrice: "" });
                                                break;
                                            case 3:
                                                this.setState({ selectedArr: selectedArr, decorationIndex: 0 });
                                                break;
                                        }
                                    } })));
                        }),
                        React.createElement("div", { style: { float: "left", marginLeft: "20px", height: "28px", lineHeight: "28px", cursor: "pointer" }, onClick: () => {
                                this.setState({ selectedArr: [{}, {}, {}, {}], districtIndex: 0, districtChildIndex: 0, priceIndex: 0, minPrice: "", maxPrice: "", areaIndex: 0, minArea: "", maxArea: "", decorationIndex: 0 });
                            } },
                            React.createElement("img", { src: "./fangliangbao/image/clear.png", width: "14px", height: "14px", style: { float: "left", marginTop: "7px" } }),
                            React.createElement("div", { style: { float: "left", color: "#333333", marginLeft: "5px", height: "28px", lineHeight: "28px" } }, "\u6E05\u7A7A\u6761\u4EF6"))),
                    React.createElement("div", { style: { clear: "both" } }),
                    React.createElement("div", { style: { marginTop: "34px", overflow: "hidden" } },
                        React.createElement("div", { style: { overflow: "hidden", width: "895px", float: "left" } },
                            React.createElement("div", { style: { overflow: "hidden" } },
                                React.createElement("div", { className: "park-list-all-t" }, "\u5168\u90E8\u623F\u6E90"),
                                React.createElement("div", { style: { float: "right", height: "40px", lineHeight: "52px" } },
                                    "\u5171\u6709",
                                    React.createElement("span", { style: { fontSize: "16px", color: "#17A1E6", margin: "0 5px 0 5px" } }, "60"),
                                    "\u6761\u623F\u6E90\u6EE1\u8DB3\u60A8\u7684\u9700\u6C42")),
                            React.createElement("div", { style: { backgroundColor: "#17A1E6", height: "1px", width: "895px" } })),
                        React.createElement("div", { className: "room-list-hot-room" }, "\u70ED\u95E8\u56ED\u533A\u63A8\u8350")),
                    React.createElement("div", { style: { overflow: "hidden" } },
                        React.createElement("div", { style: { width: "895px", float: "left" } },
                            [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12].map((item, index) => {
                                return (React.createElement("div", { key: index, style: { marginTop: index === 0 ? "18px" : "30px", overflow: "hidden", cursor: "pointer", width: "895px" } },
                                    React.createElement("div", { style: { width: "240px", height: "180px", borderRadius: "5px", float: "left", overflow: "hidden" } },
                                        React.createElement("img", { src: "./fangliangbao/image/build1.png", className: "index-img-t1", width: "100%", height: "100%" })),
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
                                    React.createElement("div", { className: "index-collect", style: { border: index === 1 ? "1px solid #17A1E6" : "1px solid rgba(204,204,204,1)" } },
                                        React.createElement("div", { style: { float: "left", height: "11px", width: "11px", overflow: "hidden", margin: "5.5px 5px 0 8px" } },
                                            React.createElement("img", { src: index === 1 ? "./fangliangbao/image/collected.png" : "./fangliangbao/image/collect.png", width: "100%", height: "100%", style: { display: "block" } })),
                                        React.createElement("div", { style: { color: "#B9B9B9", fontSize: "12px", float: "left" } }, "\u6536\u85CF")),
                                    React.createElement("div", { style: { float: "left", color: "#989FA8", fontSize: "14px", paddingTop: "47px", overflow: "hidden" } },
                                        React.createElement("div", { style: { float: "right" } },
                                            React.createElement("span", { style: { color: "rgba(220, 26, 63, 1)", fontSize: "26px", fontWeight: 600, marginRight: "5px" } }, "1.8"),
                                            React.createElement("span", null, "\u4E07\u5143/\u6708")),
                                        React.createElement("div", { style: { clear: "both" } }, "\u5355\u4EF7\uFF1A120\u5143/m\u00B2\u22C5\u6708"))));
                            }),
                            React.createElement("div", { className: "paging", style: { marginTop: "80px" } }, ["<", 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, ">"].map((item, index) => {
                                return (React.createElement("div", { key: index, className: "paging-child", style: { marginRight: index !== 11 ? "6px" : 0 } }, index === 0 ?
                                    React.createElement("img", { src: "./fangliangbao/image/left_j.png", width: "14px", height: "14px" }) :
                                    index === 11 ?
                                        React.createElement("img", { src: "./fangliangbao/image/left_j.png", width: "14px", height: "14px", style: { transform: "rotate(180deg)" } }) :
                                        item));
                            }))),
                        React.createElement("div", { style: { float: "left", overflow: "hidden", margin: "0 0 0 60px" } },
                            this.state.hotPark.map((item, index) => {
                                return (React.createElement("div", { style: { overflow: "hidden", marginTop: "20px" }, key: index },
                                    React.createElement("img", { src: "./fangliangbao/image/build1.png", width: "88px", height: "66px", style: { borderRadius: "2px", float: "left" } }),
                                    React.createElement("div", { style: { float: "left", margin: "-1px 0 0 16px" } },
                                        React.createElement("div", { style: { color: "#333333", fontSize: "14px" } }, item.name),
                                        React.createElement("div", { style: { marginTop: "2px" } },
                                            React.createElement("span", { style: { color: "#DC1A3F", fontSize: "16px", marginRight: "5px", fontWeight: 600 } }, item.price),
                                            React.createElement("span", { style: { color: "#989FA8", fontSize: "12px" } }, "\u5143/m\u00B2\u22C5\u6708")),
                                        React.createElement("div", { style: { color: "#989FA8", fontSize: "12px", marginTop: "2px" } }, item.address))));
                            }),
                            React.createElement("div", { className: "wx-title" }, "\u623F\u826F\u5B9D\u5C0F\u7A0B\u5E8F\u7AEF"),
                            React.createElement("img", { src: "./fangliangbao/image/wx.png" }),
                            React.createElement("div", { style: { fontSize: "12px", marginLeft: "10px" } }, "\u6253\u5F00\u5FAE\u4FE1\u626B\u4E00\u626B\u968F\u65F6\u624B\u673A\u4F53\u9A8C")))),
                React.createElement(allBottom_4.default, null)));
        }
    }
    exports.default = SellList;
});
define("personalCenter", ["require", "exports", "react", "homeTop", "allBottom"], function (require, exports, React, homeTop_5, allBottom_5) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    class personalCenter extends React.Component {
        constructor(props) {
            super(props);
            this.state = {
                tagList: [
                    { name: "个人中心", count: "" },
                    { name: "我的收藏", count: "15" },
                    { name: "浏览记录", count: "200" }
                ],
                tagIndex: 0,
                isRoom: true,
                parkArray: [
                    { name: "桂林信息产业园", address: "七星-朝阳路D-12号", price: "6.5" }, { name: "桂林信息产业园", address: "七星-朝阳路D-12号", price: "6.5" }, { name: "桂林信息产业园", address: "七星-朝阳路D-12号", price: "6.5" },
                    { name: "桂林信息产业园", address: "七星-朝阳路D-12号", price: "6.5" }, { name: "桂林信息产业园", address: "七星-朝阳路D-12号", price: "6.5" }, { name: "桂林信息产业园", address: "七星-朝阳路D-12号", price: "6.5" },
                    { name: "桂林信息产业园", address: "七星-朝阳路D-12号", price: "6.5" }, { name: "桂林信息产业园", address: "七星-朝阳路D-12号", price: "6.5" }
                ],
            };
        }
        componentDidMount() {
        }
        render() {
            return (React.createElement("div", { className: "index" },
                React.createElement(homeTop_5.default, null),
                React.createElement("div", { className: "warp" },
                    React.createElement("img", { src: "./fangliangbao/image/blueLogo.png", style: { margin: "61px 0 21px 0" } }),
                    React.createElement("div", { className: "p-br" }),
                    React.createElement("div", { style: { overflow: "hidden" } },
                        React.createElement("div", { className: "p-content" }, this.state.tagList.map((item, index) => {
                            return (React.createElement("div", { key: index, className: "p-child-content", style: { backgroundColor: this.state.tagIndex === index ? "#17A1E6" : "#F2F2F2", color: this.state.tagIndex === index ? "#fff" : "#2E2E2E" }, onClick: () => this.setState({ tagIndex: index }) },
                                React.createElement("div", { style: { float: "left" } }, item.name),
                                item.count ? React.createElement("div", { style: { float: "left", marginLeft: "10px" } },
                                    "(",
                                    item.count,
                                    ")") : null));
                        })),
                        this.state.tagIndex === 0 ?
                            React.createElement("div", { className: "user-info" },
                                React.createElement("div", { style: { overflow: "hidden", width: "350px" } },
                                    React.createElement("div", { style: { float: "left" } }, "\u7528\u6237\u6635\u79F0"),
                                    React.createElement("div", { style: { marginLeft: "50px", float: "left", width: "130px" } }, "\u5C0F\u660E"),
                                    React.createElement("div", { style: { marginLeft: "20px", float: "left", color: "#17A1E6", cursor: "pointer" } }, "\u4FEE\u6539")),
                                React.createElement("div", { style: { overflow: "hidden", marginTop: "20px", width: "350px" } },
                                    React.createElement("div", { style: { float: "left" } }, "\u7ED1\u5B9A\u624B\u673A"),
                                    React.createElement("div", { style: { marginLeft: "50px", float: "left", width: "130px" } }, "123456789"),
                                    React.createElement("div", { style: { marginLeft: "20px", float: "left", color: "#17A1E6", cursor: "pointer" } }, "\u4FEE\u6539")),
                                React.createElement("div", { style: { overflow: "hidden", marginTop: "20px", width: "350px" } },
                                    React.createElement("div", { style: { float: "left" } }, "\u7ED1\u5B9A\u5FAE\u4FE1"),
                                    React.createElement("div", { style: { marginLeft: "50px", float: "left", width: "130px" } }, "\u5FAE\u4FE1\u6635\u79F0"),
                                    React.createElement("div", { style: { marginLeft: "20px", float: "left", color: "#17A1E6", cursor: "pointer" } }, "\u89E3\u9664\u7ED1\u5B9A")),
                                React.createElement("div", { style: { overflow: "hidden", marginTop: "20px", width: "350px" } },
                                    React.createElement("div", { style: { float: "left" } }, "\u7528\u6237\u5934\u50CF"),
                                    React.createElement("img", { src: "./fangliangbao/image/a1.jpg", style: { marginLeft: "50px" }, width: "60px", height: "60px" }))) : null,
                        this.state.tagIndex === 1 ?
                            React.createElement("div", { className: "user-info" },
                                React.createElement("div", { style: { overflow: "hidden" } },
                                    React.createElement("div", { className: "user-a", style: { backgroundColor: this.state.isRoom ? "#17A1E6" : "#fff", color: this.state.isRoom ? "#fff" : "#333333" }, onClick: () => { this.setState({ isRoom: true }); } },
                                        "\u623F\u6E90\u6536\u85CF ",
                                        React.createElement("span", { style: { marginLeft: "5px" } }, "(10)")),
                                    React.createElement("div", { className: "user-a", style: { backgroundColor: !this.state.isRoom ? "#17A1E6" : "#fff", color: !this.state.isRoom ? "#fff" : "#333333" }, onClick: () => { this.setState({ isRoom: false }); } },
                                        "\u56ED\u533A\u6536\u85CF ",
                                        React.createElement("span", { style: { marginLeft: "5px" } }, "(5)"))),
                                React.createElement("div", { className: "p-br-a" }),
                                this.state.isRoom ?
                                    [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12].map((item, index) => {
                                        return (React.createElement("div", { key: index, style: { marginTop: "30px", overflow: "hidden", cursor: "pointer", width: "895px" } },
                                            React.createElement("div", { style: { width: "240px", height: "180px", borderRadius: "5px", float: "left", overflow: "hidden" } },
                                                React.createElement("img", { src: "./fangliangbao/image/build1.png", className: "index-img-t1", width: "100%", height: "100%" })),
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
                                            React.createElement("div", { className: "index-collect", style: { border: "1px solid rgba(204,204,204,1)" } },
                                                React.createElement("div", { style: { float: "left", height: "12px", width: "12px", overflow: "hidden", margin: "5px 5px 0 8px" } },
                                                    React.createElement("img", { src: "./fangliangbao/image/delete.png", width: "100%", height: "100%", style: { display: "block" } })),
                                                React.createElement("div", { style: { color: "#B9B9B9", fontSize: "12px", float: "left" } }, "\u53D6\u6D88")),
                                            React.createElement("div", { style: { float: "left", color: "#989FA8", fontSize: "14px", paddingTop: "47px", overflow: "hidden" } },
                                                React.createElement("div", { style: { float: "right" } },
                                                    React.createElement("span", { style: { color: "rgba(220, 26, 63, 1)", fontSize: "26px", fontWeight: 600, marginRight: "5px" } }, "1.8"),
                                                    React.createElement("span", null, "\u4E07\u5143/\u6708")),
                                                React.createElement("div", { style: { clear: "both" } }, "\u5355\u4EF7\uFF1A120\u5143/m\u00B2\u22C5\u6708"))));
                                    }) :
                                    React.createElement("div", { style: { overflow: "hidden", width: "896px" } }, this.state.parkArray.map((item, index) => {
                                        return (React.createElement("div", { key: index, className: "index-park-child" },
                                            React.createElement("div", { className: "index-img-a", style: { marginRight: (index + 1) % 3 === 0 ? "0px" : "20px", marginTop: "30px" } },
                                                React.createElement("div", { className: "p-black" },
                                                    React.createElement("img", { src: "./fangliangbao/image/white_clear.png", width: "12px", height: "12px" })),
                                                React.createElement("img", { src: "./fangliangbao/image/build.png", height: "100%", width: "100%", className: "index-img-t1" })),
                                            React.createElement("div", { style: { fontSize: "16px", fontWeight: "bold", marginTop: "10px" } }, item.name),
                                            React.createElement("div", { style: { overflow: "hidden", paddingTop: "10px" } },
                                                React.createElement("img", { src: "./fangliangbao/image/position.png", width: "12px", height: "12px", style: { float: "left", margin: "4px 5px 0 0" } }),
                                                " ",
                                                React.createElement("div", { className: "index-address" }, item.address),
                                                React.createElement("div", { className: "index-price", style: { margin: (index + 1) % 3 === 0 ? "-15px 0 0 0" : "-15px 20px 0 0" } },
                                                    React.createElement("span", { style: { color: "#DC1A3F", fontSize: "24px", marginRight: "5px" } }, item.price),
                                                    "\u5143/m\u00B2\u00B7\u5929"))));
                                    }))) : null,
                        this.state.tagIndex === 2 ?
                            React.createElement("div", { className: "user-info" },
                                React.createElement("div", { className: "all-clear" }, "\u5168\u90E8\u6E05\u9664"),
                                [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12].map((item, index) => {
                                    return (React.createElement("div", { key: index, style: { marginTop: "30px", overflow: "hidden", cursor: "pointer", width: "895px", clear: "both" } },
                                        React.createElement("div", { style: { width: "240px", height: "180px", borderRadius: "5px", float: "left", overflow: "hidden" } },
                                            React.createElement("img", { src: "./fangliangbao/image/build1.png", className: "index-img-t1", width: "100%", height: "100%" })),
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
                                        React.createElement("div", { className: "index-collect", style: { border: "1px solid rgba(204,204,204,1)" } },
                                            React.createElement("div", { style: { float: "left", height: "12px", width: "12px", overflow: "hidden", margin: "5px 5px 0 8px" } },
                                                React.createElement("img", { src: "./fangliangbao/image/delete.png", width: "100%", height: "100%", style: { display: "block" } })),
                                            React.createElement("div", { style: { color: "#B9B9B9", fontSize: "12px", float: "left" } }, "\u6E05\u9664")),
                                        React.createElement("div", { style: { float: "left", color: "#989FA8", fontSize: "14px", paddingTop: "47px", overflow: "hidden" } },
                                            React.createElement("div", { style: { float: "right" } },
                                                React.createElement("span", { style: { color: "rgba(220, 26, 63, 1)", fontSize: "26px", fontWeight: 600, marginRight: "5px" } }, "1.8"),
                                                React.createElement("span", null, "\u4E07\u5143/\u6708")),
                                            React.createElement("div", { style: { clear: "both" } }, "\u5355\u4EF7\uFF1A120\u5143/m\u00B2\u22C5\u6708"))));
                                })) : null)),
                React.createElement(allBottom_5.default, null)));
        }
    }
    exports.default = personalCenter;
});
define("contact", ["require", "exports", "react", "homeTop", "allBottom"], function (require, exports, React, homeTop_6, allBottom_6) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    class Contact extends React.Component {
        constructor(props) {
            super(props);
            this.state = {
                tagList: [
                    { name: "��ϵ����" },
                    { name: "��������" },
                    { name: "��վ��ͼ" }
                ],
                tagIndex: 0,
            };
        }
        componentDidMount() {
        }
        render() {
            return (React.createElement("div", { className: "index" },
                React.createElement(homeTop_6.default, null),
                React.createElement("div", { className: "warp" },
                    React.createElement("img", { src: "./fangliangbao/image/blueLogo.png", style: { margin: "61px 0 21px 0" } }),
                    React.createElement("div", { className: "p-br" }),
                    React.createElement("div", { className: "p-content" }, this.state.tagList.map((item, index) => {
                        return (React.createElement("div", { key: index, className: "p-child-content", style: { backgroundColor: this.state.tagIndex === index ? "#17A1E6" : "#F2F2F2", color: this.state.tagIndex === index ? "#fff" : "#2E2E2E" }, onClick: () => this.setState({ tagIndex: index }) },
                            React.createElement("div", { style: { float: "left" } }, item.name)));
                    })),
                    this.state.tagIndex === 0 ?
                        React.createElement("div", { className: "user-info" },
                            React.createElement("div", { style: { overflow: "hidden", float: "left" } },
                                React.createElement("div", { style: { marginBottom: "20px" } }, "\uFFFD\u0377\uFFFD\uFFFD\u7EF0\uFFFD\uFFFD400-808-3066"),
                                React.createElement("div", { style: { marginBottom: "20px" } }, "\uFFFD\uFFFD\uFFFD\uFFFD\uFFFD\uFFFD\uFFFD\u48FAservice@3dflb.com"),
                                React.createElement("div", { style: { marginBottom: "20px" } }, "\uFFFD\uFFFD\u02FE\uFFFD\uFFFD\u05B7\uFFFD\uFFFD\uFFFD\u3DAB\u02A1\uFFFD\uFFFD\uFFFD\uFFFD\uFFFD\u0437\uFFFD\u062E\uFFFD\uFFFD\uFFFD\u03F4\uFFFD\uFFFD\uFFFD\uFFFD\uFFFD\u04B5\uFFFD\uFFFD\uFFFD\uFFFD\uFFFD\uFFFD\uFFFD\uFFFD\u5EEA\uFFFD\uFFFD\uFFFD\uFFFD\u04B5\u00A52\uFFFD\uFFFD\u00A5109\uFFFD\uFFFD")),
                            React.createElement("div", { style: { float: "left", marginLeft: "115px" } },
                                React.createElement("div", { className: "wx-title", style: { margin: "0 0 8px 10px" } }, "\uFFFD\uFFFD\uFFFD\uFFFD\uFFFD\uFFFD\u0421\uFFFD\uFFFD\uFFFD\uFFFD\uFFFD"),
                                React.createElement("img", { src: "./fangliangbao/image/wx.png" }),
                                React.createElement("div", { style: { fontSize: "12px", marginLeft: "10px" } }, "\uFFFD\uFFFD\u03A2\uFFFD\uFFFD\u0268\u04BB\u0268\uFFFD\uFFFD\u02B1\uFFFD\u05BB\uFFFD\uFFFD\uFFFD\uFFFD\uFFFD"))) : null,
                    this.state.tagIndex === 1 ?
                        React.createElement("div", { className: "user-info" },
                            React.createElement("div", { style: { overflow: "hidden", float: "left" } },
                                React.createElement("div", { style: { marginBottom: "20px" } }, "\uFFFD\uFFFD\uFFFD\uFFFD\uFFFD\uFFFD\uFFFD\uFFFD\uFFFD\uFFFD\uFFFD\uFFFDQQ\uFFFD\uFFFD2106682312"),
                                React.createElement("div", { style: { marginBottom: "20px", color: "#17A1E6" } },
                                    React.createElement("span", null, "\uFFFD\uFFFD\uFFFD\u063F\u01BC\uFFFD"),
                                    React.createElement("span", { style: { marginLeft: "50px" } }, "3DSVE CLOUD")))) : null,
                    this.state.tagIndex === 2 ?
                        React.createElement("div", { className: "user-info" },
                            React.createElement("div", { style: { overflow: "hidden", float: "left" } },
                                React.createElement("div", { style: { marginBottom: "20px" } }, "\uFFFD\uCE6B\uFFFD\uFFFD\uFFFD\uFFFD"),
                                React.createElement("div", { style: { marginBottom: "20px", color: "#17A1E6", fontSize: "14px" } },
                                    React.createElement("span", null, "\uFFFD\uFFFD\uFFFD\uFFFD"),
                                    React.createElement("span", { style: { marginLeft: "32px" } }, "\uFFFD\uFFFD\uFFFD\uFFFD")),
                                React.createElement("div", { style: { overflow: "hidden", marginBottom: "20px" } },
                                    React.createElement("div", { style: { marginBottom: "8px", color: "#333333", fontSize: "14px", fontWeight: 600 } }, "\uFFFD\uFFFD\uFFFD\uFFFD\uFFFD\uFFFD\uFFFD\uFFFD\uFFFD\uFFFD\u0530\uFFFD\uFFFD/\u0434\uFFFD\uFFFD\u00A5"),
                                    React.createElement("div", { className: "f1" }, "\uFFFD\uFFFD\uFFFD\u0530\uFFFD\uFFFD/\uFFFD\uCE6B\u00A5"),
                                    React.createElement("div", { className: "f1" }, "\uFFFD\uFFFD\uFFFD\uFFFD\u0530\uFFFD\uFFFD/\uFFFD\uCE6B\u00A5"),
                                    React.createElement("div", { className: "f1" }, "\uFFFD\uFFFD\u062E\u0530\uFFFD\uFFFD/\uFFFD\uCE6B\u00A5"),
                                    React.createElement("div", { className: "f1" }, "\uFFFD\uFFFD\u0273\u0530\uFFFD\uFFFD/\uFFFD\uCE6B\u00A5"),
                                    React.createElement("div", { className: "f1" }, "\uFFFD\u9EA3\u0530\uFFFD\uFFFD/\uFFFD\uCE6B\u00A5")),
                                React.createElement("div", { style: { overflow: "hidden", marginBottom: "20px" } },
                                    React.createElement("div", { style: { marginBottom: "8px", color: "#333333", fontSize: "14px", fontWeight: 600 } }, "\uFFFD\uFFFD\uFFFD\uFFFD\uFFFD\uFFFD\u0226\u0530\uFFFD\uFFFD/\u0434\uFFFD\uFFFD\u00A5"),
                                    React.createElement("div", { className: "f1" }, "\uFFFD\uFFFD\u04F1\uFFFD\u0530\uFFFD\uFFFD/\uFFFD\uCE6B\u00A5"),
                                    React.createElement("div", { className: "f1" }, "\uFFFD\uFFFD\u052A\u0530\uFFFD\uFFFD/\uFFFD\uCE6B\u00A5"),
                                    React.createElement("div", { className: "f1" }, "\uFFFD\uFFFD\uFFFD\uFFFD\u0530\uFFFD\uFFFD/\uFFFD\uCE6B\u00A5"),
                                    React.createElement("div", { className: "f1" }, "\uFFFD\uFFFD\u04F9\uFFFD\u0530\u0530\uFFFD\uFFFD/\uFFFD\uCE6B\u00A5"),
                                    React.createElement("div", { className: "f1" }, "\uFFFD\uFFFD\u027D\u0530\uFFFD\uFFFD/\uFFFD\uCE6B\u00A5")),
                                React.createElement("div", { style: { overflow: "hidden", marginBottom: "20px" } },
                                    React.createElement("div", { style: { marginBottom: "8px", color: "#333333", fontSize: "14px", fontWeight: 600 } }, "\uFFFD\uFFFD\uFFFD\u0775\uFFFD\uFFFD\uFFFD\uFFFD\u07F0\uCE6B\u0530\uFFFD\uFFFD"),
                                    React.createElement("div", { className: "f1" }, "1\uFFFD\uFFFD\uFFFD\uFFFD\uFFFD\uFFFD\uFFFD\u07F0\uCE6B\u0530\uFFFD\uFFFD"),
                                    React.createElement("div", { className: "f1" }, "2\uFFFD\uFFFD\uFFFD\uFFFD\uFFFD\uFFFD\uFFFD\u07F0\uCE6B\u0530\uFFFD\uFFFD"),
                                    React.createElement("div", { className: "f1" }, "3\uFFFD\uFFFD\uFFFD\uFFFD\uFFFD\uFFFD\uFFFD\u07F0\uCE6B\u0530\uFFFD\uFFFD")),
                                React.createElement("div", { style: { overflow: "hidden", marginBottom: "20px" } },
                                    React.createElement("div", { style: { marginBottom: "8px", color: "#333333", fontSize: "14px", fontWeight: 600 } }, "\uFFFD\uFFFD\uFFFD\u0775\uFFFD\uFFFD\uFFFD\u057E\uFFFD\uCE6B\u0530\uFFFD\uFFFD"),
                                    React.createElement("div", { className: "f1" }, "\uFFFD\uFFFD\uFFFD\u0776\uFFFD\u057E\uFFFD\uFFFD\uFFFD\uFFFD\uFFFD\uCE6B\u0530\uFFFD\uFFFD"),
                                    React.createElement("div", { className: "f1" }, "\uFFFD\uFFFD\u02BF\uFFFD\uFFFD\u0530\uFFFD\uFFFD\uFFFD\uFFFD\uFFFD\uCE6B\u0530\uFFFD\uFFFD"),
                                    React.createElement("div", { className: "f1" }, "\uFFFD\uFFFD\u02BF\uFFFD\uFFFD\u0530\uFFFD\uFFFD\uFFFD\uFFFD\uFFFD\uCE6B\u0530\uFFFD\uFFFD")))) : null),
                React.createElement(allBottom_6.default, null)));
        }
    }
    exports.default = Contact;
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
            ParkInfo_1.default.successClose();
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
define("parkInfo", ["require", "exports", "react", "homeTop", "allBottom", "infoTitle", "SendSuccess", "alertBox"], function (require, exports, React, HomeTop_1, AllBottom_1, InfoTitle_1, SendSuccess_1, AlertBox_1) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    class ParkInfo extends React.Component {
        constructor(props) {
            super(props);
            this.state = {};
            this.handleScroll = this.handleScroll.bind(this);
            ParkInfo.closeDefeat = this.closeDefeat.bind(this);
            ParkInfo.successClose = this.successClose.bind(this);
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
        static closeDefeat() { }
        ;
        closeDefeat() {
            ParkInfoThreeRight.closeDefeat();
        }
        static successClose() { }
        ;
        successClose() {
            ParkInfoThreeRight.successClose();
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
        static showCompanyInfo() { }
        ;
        showCompanyInfo() {
            this.setState({
                RoomInfoState: "CompanyInfoShow",
            });
        }
        static hideRoomInfo() { }
        ;
        hideRoomInfo() {
            this.setState({
                RoomInfoState: "hide",
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
                        React.createElement("li", { className: this.state.ParkInfoIndex == 1 ? "ParkInfoIndex_in" : null, onClick: this.ParkInfoOn.bind(this, 1) }, "\u5B9E\u62CD\u7167\u7247"),
                        React.createElement("li", { className: this.state.ParkInfoIndex == 2 ? "ParkInfoIndex_in" : null, onClick: this.ParkInfoOn.bind(this, 2) }, "\u4F18\u60E0\u653F\u7B56"))),
                React.createElement("div", { className: "ParkInfoThree_left_text" },
                    this.state.ParkInfoIndex == 0 ?
                        React.createElement("div", { className: "ParkInfo_text parkIntroduced", id: "parkIntroduced" },
                            React.createElement("p", null, "\u5730\u5904\u5E7F\u5DDE\u3001\u987A\u5FB7\u3001\u4E2D\u5C71\u3001\u4E1C\u839E\u3001\u73E0\u6D77\u3001\u6DF1\u5733\u7B49\u5730\u4E4B\u67A2\u7EBD\uFF0C\u5360\u8E1E\u756A\u79BA\u7684\u6838\u5FC3\u4F4D\u7F6E\u3002\u524D\u8EAB\u662F\u6C38\u9686\u5236\u8863\u5382\uFF0C2010\u5E74\u7ECF\u6539\u9020\uFF0C\u6210\u4E3A\u4E86\u9752\u74E6\u767D\u5899\uFF0C\u8BD7\u60C5\u753B\u610F\u7684\u521B\u610F\u56ED\u533A\u3002 \u4EA7\u4E1A\u56ED\u53D6\u540D\u82B1\u57CE\uFF0C\u96C6\u5408\u4E86\u7EFF\u8272\u82B1\u57CE\u3001\u5386\u53F2\u82B1"),
                            React.createElement("p", null, "\u5730\u5904\u5E7F\u5DDE\u3001\u987A\u5FB7\u3001\u4E2D\u5C71\u3001\u4E1C\u839E\u3001\u73E0\u6D77\u3001\u6DF1\u5733\u7B49\u5730\u4E4B\u67A2\u7EBD\uFF0C\u5360\u8E1E\u756A\u79BA\u7684\u6838\u5FC3\u4F4D\u7F6E\u3002\u524D\u8EAB\u662F\u6C38\u9686\u5236\u8863\u5382\uFF0C2010\u5E74\u7ECF\u6539\u9020\uFF0C\u6210\u4E3A\u4E86\u9752\u74E6\u767D\u5899\uFF0C\u8BD7\u60C5\u753B\u610F\u7684\u521B\u610F\u56ED\u533A\u3002 \u4EA7\u4E1A\u56ED\u53D6\u540D\u82B1\u57CE\uFF0C\u96C6\u5408\u4E86\u7EFF\u8272\u82B1\u57CE\u3001\u5386\u53F2\u82B1\uFF0C\u5730\u5904\u5E7F\u5DDE\u3001\u987A\u5FB7\u3001\u4E2D\u5C71\u3001\u4E1C\u839E\u3001\u73E0\u6D77\u3001\u6DF1\u5733\u7B49\u5730\u4E4B\u67A2\u7EBD\uFF0C\u5360\u8E1E\u756A\u79BA\u7684\u6838\u5FC3\u4F4D\u7F6E\u3002\u524D\u8EAB\u662F\u6C38\u9686\u5236\u8863\u5382\uFF0C2010\u5E74\u7ECF\u6539\u9020\uFF0C\u6210\u4E3A\u4E86\u9752\u74E6\u767D\u5899\uFF0C\u8BD7\u60C5\u753B\u610F\u7684\u521B\u610F\u56ED\u533A\u3002 \u4EA7\u4E1A\u56ED\u53D6\u540D\u82B1\u57CE\uFF0C\u96C6\u5408\u4E86\u7EFF\u8272\u82B1\u57CE\u3001\u5386\u53F2\u82B1"),
                            React.createElement("p", null, "\u5730\u5904\u5E7F\u5DDE\u3001\u987A\u5FB7\u3001\u4E2D\u5C71\u3001\u4E1C\u839E\u3001\u73E0\u6D77\u3001\u6DF1\u5733\u7B49\u5730\u4E4B\u67A2\u7EBD\uFF0C\u5360\u8E1E\u756A\u79BA\u7684\u6838\u5FC3\u4F4D\u7F6E\u3002\u524D\u8EAB\u662F\u6C38\u9686\u5236\u8863\u5382\uFF0C2010\u5E74\u7ECF\u6539\u9020\uFF0C\u6210\u4E3A\u4E86\u9752\u74E6\u767D\u5899\uFF0C\u8BD7\u60C5\u753B\u610F\u7684\u521B\u610F\u56ED\u533A\u3002 \u4EA7\u4E1A\u56ED\u53D6\u540D\u82B1\u57CE\uFF0C\u96C6\u5408\u4E86\u7EFF\u8272\u82B1\u57CE\u3001\u5386\u53F2\u82B1"))
                        : null,
                    this.state.ParkInfoIndex == 1 ?
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
                    { url: "https://v-cdn.zjol.com.cn/280443.mp4" }
                ]
            };
        }
        componentDidMount() {
            let ps2H = $('.ps2').height();
            console.log(ps2H);
            if (ps2H > 21) {
                let pst = ps2H - 21;
                let partH = ps2H + 412;
                $('.ps').attr("style", "top:-" + pst + "px");
                $('.RoomInfoThreeLeft_part').attr("style", "height:" + partH + "px");
            }
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
                            React.createElement("p", { className: "po" },
                                " ",
                                React.createElement("span", { className: "ps" }, "\u770B\u623F\u65F6\u95F4 "),
                                " ",
                                React.createElement("p", { className: "ps2" }, "\u8054\u7CFB\u987E\u95EE\uFF0C\u968F\u65F6\u53EF\u770B")),
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
                        React.createElement("span", { className: "stylesgoleft ", onClick: this.upVid.bind(this), style: { "opacity": "0" } },
                            React.createElement("i", { className: "iconfont " }, "\uE835")),
                        React.createElement("video", { src: this.state.vidUrl, controls: true }, "\u5F53\u524D\u6D4F\u89C8\u5668\u4E0D\u652F\u6301video\u64AD\u653E"),
                        React.createElement("span", { className: "stylesgoright ", onClick: this.nextVid.bind(this), style: { "opacity": "0" } },
                            React.createElement("i", { className: "iconfont " }, "\uE835")))
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
                needText: "输入您的需求，如：在广州白云区寻找200m2左右的办公室，租金在80元/m2·天，临近地铁站。",
                phone: "输入您的手机号码",
                sendSuccessState: false,
                sendDefeatState: false,
            };
            ParkInfoThreeRight.closeDefeat = this.closeDefeat.bind(this);
            ParkInfoThreeRight.successClose = this.successClose.bind(this);
        }
        componentDidMount() {
        }
        sendNeed() {
            console.log("sendNeedSuccess", this.state.phone);
            var reg01 = /^1[3456789]\d{9}$/;
            if (reg01.test(this.state.phone)) {
                console.log("手机号或座机号填写正确");
                var reg03 = /^[0-9]*$/;
                if (reg03.test(this.state.needText)) {
                    this.setState({
                        sendDefeatState: true,
                    }, () => {
                        AlertBox_1.default.showAlert("请正确输入您的需求");
                    });
                    return;
                }
                else if (this.state.needText == "输入您的需求，如：在广州白云区寻找200m2左右的办公室，租金在80元/m2·天，临近地铁站。") {
                    this.setState({
                        sendDefeatState: true,
                    }, () => {
                        AlertBox_1.default.showAlert("请输入您的需求");
                    });
                    return;
                }
                else {
                }
            }
            else if (this.state.phone == "输入您的手机号码") {
                this.setState({
                    sendDefeatState: true,
                }, () => {
                    AlertBox_1.default.showAlert("请输入您的手机号码");
                });
                return;
            }
            else {
                this.setState({
                    sendDefeatState: true,
                }, () => {
                    AlertBox_1.default.showAlert("请正确输入您的手机号码");
                });
                return;
            }
            this.setState({
                sendSuccessState: true,
            });
            $(document.body).attr('style', 'height: 100%; margin: 0; padding: 0; overflow: hidden;');
        }
        phonefoucus(event) {
            if (this.state.phone == "输入您的手机号码") {
                this.setState({
                    phone: ""
                });
            }
        }
        phoneblur(event) {
            if (this.state.phone == "") {
                this.setState({
                    phone: "输入您的手机号码"
                });
            }
        }
        phoneChange(event) {
            let phone = event.target.value.replace(/[, ]/g, '');
            this.setState({
                phone: phone
            });
        }
        needTextfoucus(event) {
            if (this.state.needText == "输入您的需求，如：在广州白云区寻找200m2左右的办公室，租金在80元/m2·天，临近地铁站。") {
                this.setState({
                    needText: ""
                });
            }
        }
        needTextblur(event) {
            if (this.state.needText == "") {
                this.setState({
                    needText: "输入您的需求，如：在广州白云区寻找200m2左右的办公室，租金在80元/m2·天，临近地铁站。"
                });
            }
        }
        needTextChange(event) {
            let needText = event.target.value.replace(/[, ]/g, '');
            this.setState({
                needText: needText
            });
        }
        static closeDefeat() { }
        ;
        closeDefeat() {
            this.setState({
                sendSuccessState: false,
                sendDefeatState: false,
            });
        }
        static successClose() { }
        ;
        successClose() {
            this.setState({
                sendSuccessState: false,
                sendDefeatState: false,
                needText: "输入您的需求，如：在广州白云区寻找200m2左右的办公室，租金在80元/m2·天，临近地铁站。",
                phone: "输入您的手机号码",
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
                        React.createElement("input", { type: "number", value: this.state.phone, onFocus: this.phonefoucus.bind(this), onBlur: this.phoneblur.bind(this), onChange: this.phoneChange.bind(this) }))),
                React.createElement("div", { className: "ParkInfoThree_right_three" },
                    React.createElement("p", { className: "pitrth_text1" }, "\u60A8\u7684\u9700\u6C42\uFF1A"),
                    React.createElement("textarea", { value: this.state.needText, onFocus: this.needTextfoucus.bind(this), onBlur: this.needTextblur.bind(this), onChange: this.needTextChange.bind(this) })),
                React.createElement("input", { type: "button", value: "\u7ACB\u5373\u59D4\u6258", className: "pitr_btn", onClick: this.sendNeed.bind(this) }),
                this.state.sendSuccessState == true ?
                    React.createElement(SendSuccess_1.default, null)
                    : null,
                this.state.sendDefeatState == true ?
                    React.createElement(AlertBox_1.default, null)
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
define("infoTitleRecom", ["require", "exports", "react", "react-router-dom"], function (require, exports, React, react_router_dom_5) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    class InfoTitleRecom extends React.Component {
        constructor(props) {
            super(props);
            this.state = {
                rtIndex: null,
            };
            InfoTitleRecom.changRecomTitle = this.changRecomTitle.bind(this);
        }
        componentDidMount() {
        }
        static changRecomTitle(index) { }
        changRecomTitle(index) {
            console.log(index);
            this.setState({
                rtIndex: index
            });
        }
        render() {
            return (React.createElement("div", { className: "ParkInfoOne" },
                React.createElement("div", { className: "ParkInfoOne_title" },
                    React.createElement("img", { src: "./fangliangbao/image/blueLogo.png" }),
                    React.createElement("ul", null,
                        React.createElement(react_router_dom_5.Link, { to: "/baoList" },
                            React.createElement("li", { className: this.state.rtIndex == 0 ? "recomTitle_active" : null, onClick: this.changRecomTitle.bind(this, 0) }, "\u5B9D\u54E5\u63A8\u8350")),
                        React.createElement(react_router_dom_5.Link, { to: "/hotList" },
                            React.createElement("li", { className: this.state.rtIndex == 1 ? "recomTitle_active" : null, onClick: this.changRecomTitle.bind(this, 1) }, "\u70ED\u70B9\u8D44\u8BAF"))))));
        }
    }
    exports.default = InfoTitleRecom;
});
define("baoList", ["require", "exports", "react", "antd", "homeTop", "infoTitleRecom", "allBottom"], function (require, exports, React, antd_1, homeTop_7, infoTitleRecom_1, AllBottom_2) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    class BaoList extends React.Component {
        constructor(props) {
            super(props);
            this.state = {};
        }
        componentDidMount() {
            homeTop_7.default.changHomeTop(4);
            infoTitleRecom_1.default.changRecomTitle(0);
        }
        render() {
            return (React.createElement("div", { className: "index" },
                React.createElement(homeTop_7.default, null),
                React.createElement("div", { style: { width: "1200px", margin: "auto", paddingTop: "61px" } },
                    React.createElement(infoTitleRecom_1.default, { index: 1 })),
                React.createElement("div", { className: "warp" },
                    React.createElement(BaoLeft, null),
                    React.createElement(BaoRight, null)),
                React.createElement("div", { className: "parkInfo_bottom" },
                    React.createElement(AllBottom_2.default, null))));
        }
    }
    class BaoLeft extends React.Component {
        constructor(props) {
            super(props);
            this.state = {
                baoList: [
                    {
                        img: "./fangliangbao/image/demo.png",
                        title: "优客工场五周年战略转型 由“重”转“轻” 进化共赢",
                        date: "2020/05/19 14:03:45",
                        context: "2020年4月18日下午14:00，优客工场进行了一场名为“起源——优客工场进化论”线上合办公独角兽企业优客工场创立于2015年，以“给你每一个快乐的工作日”为使命，五年来坚持赋能中国创新者."
                    }, {
                        img: "./fangliangbao/image/demo.png",
                        title: "优客工场五周年战略转型 由“重”转“轻” 进化共赢",
                        date: "2020/05/19 14:03:45",
                        context: "2020年4月18日下午14:00，优客工场进行了一场名为“起源——优客工场进化论”线上合办公独角兽企业优客工场创立于2015年，以“给你每一个快乐的工作日”为使命，五年来坚持赋能中国创新者."
                    }
                ]
            };
        }
        componentDidMount() {
            let baoListLength = this.state.baoList.length;
            console.log(baoListLength);
            if (baoListLength < 4) {
                $(".listBox").attr("style", "height: 850px");
                console.log($(".listBox"));
            }
        }
        onChangePage(data) {
            console.log('page', data);
        }
        render() {
            return (React.createElement("div", { className: "listBox " },
                React.createElement("div", { className: "listBox_List" },
                    React.createElement("ul", null, this.state.baoList.map((i, index) => {
                        return (React.createElement("li", null,
                            React.createElement("a", { href: "./baoText.html", target: "_blank" },
                                React.createElement("div", { className: "listBox_Li" },
                                    React.createElement("img", { src: i.img }),
                                    React.createElement("div", { className: "listBox_Li_r" },
                                        React.createElement("p", null, i.title),
                                        React.createElement("p", null, i.date),
                                        React.createElement("p", null, i.context),
                                        React.createElement("p", null, "\u4E86\u89E3\u8BE6\u60C5>"))))));
                    }))),
                React.createElement("div", { className: "listBox_page" },
                    React.createElement("p", { className: "companyBox_left_box_one_page" },
                        React.createElement(antd_1.Pagination, { pageSize: "5", defaultPageSize: "5", total: 50, onChange: this.onChangePage.bind(this) })))));
        }
    }
    class BaoRight extends React.Component {
        constructor(props) {
            super(props);
            this.state = {};
        }
        componentDidMount() {
        }
        render() {
            return (React.createElement("div", { className: "listRight" },
                React.createElement("div", { className: "listRight_one" },
                    React.createElement("p", { className: "listRight_one_p" }, "\u65B0\u4E0A\u7EBF\u56ED\u533A >>"),
                    React.createElement("div", { className: "leaseRoomList leaseRoomList2" },
                        React.createElement("ul", null,
                            React.createElement("li", null,
                                React.createElement("a", { href: "", target: "_blank" },
                                    React.createElement("div", { className: "leaseRooms leaseRooms2" },
                                        React.createElement("img", { src: "./fangliangbao/image/demo.png" }),
                                        React.createElement("div", { className: "leaseRoomsRight" },
                                            React.createElement("p", { className: "leaseName2" }, "\u6842\u6797\u4FE1\u606F\u4EA7\u4E1A\u56ED\u533A"),
                                            React.createElement("p", null,
                                                React.createElement("span", { className: "leasePrice" }, "80.3"),
                                                " \u5143/m\u00B2\u22C5\u6708"),
                                            React.createElement("p", { className: "leaseArea2" }, "\u4E03\u661F-\u671D\u9633\u8DEFD-12\u53F7"))))),
                            React.createElement("li", null,
                                React.createElement("a", { href: "", target: "_blank" },
                                    React.createElement("div", { className: "leaseRooms leaseRooms2" },
                                        React.createElement("img", { src: "./fangliangbao/image/demo.png" }),
                                        React.createElement("div", { className: "leaseRoomsRight" },
                                            React.createElement("p", { className: "leaseName2" }, "\u6842\u6797\u4FE1\u606F\u4EA7\u4E1A\u56ED\u533A"),
                                            React.createElement("p", null,
                                                React.createElement("span", { className: "leasePrice" }, "80.3"),
                                                " \u5143/m\u00B2\u22C5\u6708"),
                                            React.createElement("p", { className: "leaseArea2" }, "\u4E03\u661F-\u671D\u9633\u8DEFD-12\u53F7"))))),
                            React.createElement("li", null,
                                React.createElement("a", { href: "", target: "_blank" },
                                    React.createElement("div", { className: "leaseRooms leaseRooms2" },
                                        React.createElement("img", { src: "./fangliangbao/image/demo.png" }),
                                        React.createElement("div", { className: "leaseRoomsRight" },
                                            React.createElement("p", { className: "leaseName2" }, "\u6842\u6797\u4FE1\u606F\u4EA7\u4E1A\u56ED\u533A"),
                                            React.createElement("p", null,
                                                React.createElement("span", { className: "leasePrice" }, "80.3"),
                                                " \u5143/m\u00B2\u22C5\u6708"),
                                            React.createElement("p", { className: "leaseArea2" }, "\u4E03\u661F-\u671D\u9633\u8DEFD-12\u53F7"))))),
                            React.createElement("li", null,
                                React.createElement("a", { href: "", target: "_blank" },
                                    React.createElement("div", { className: "leaseRooms leaseRooms2" },
                                        React.createElement("img", { src: "./fangliangbao/image/demo.png" }),
                                        React.createElement("div", { className: "leaseRoomsRight" },
                                            React.createElement("p", { className: "leaseName2" }, "\u6842\u6797\u4FE1\u606F\u4EA7\u4E1A\u56ED\u533A"),
                                            React.createElement("p", null,
                                                React.createElement("span", { className: "leasePrice" }, "80.3"),
                                                " \u5143/m\u00B2\u22C5\u6708"),
                                            React.createElement("p", { className: "leaseArea2" }, "\u4E03\u661F-\u671D\u9633\u8DEFD-12\u53F7")))))))),
                React.createElement("div", { className: "listRight_two" },
                    React.createElement("p", { className: "listRight_one_p" }, "\u70ED\u95E8\u623F\u6E90  >>"),
                    React.createElement("div", { className: "leaseRoomList leaseRoomList2" },
                        React.createElement("ul", null,
                            React.createElement("li", null,
                                React.createElement("a", { href: "", target: "_blank" },
                                    React.createElement("div", { className: "leaseRooms leaseRooms2" },
                                        React.createElement("img", { src: "./fangliangbao/image/demo.png" }),
                                        React.createElement("div", { className: "leaseRoomsRight" },
                                            React.createElement("p", { className: "leaseName2" }, "\u51FA\u79DF\u9AD8\u65B0\u533A\u4FE1\u606F\u4EA7\u4E1A\u6842\u6797\u4FE1\u606F\u4EA7\u4E1A\u56ED\u533A"),
                                            React.createElement("p", null,
                                                React.createElement("span", { className: "leasePrice" }, "80.3"),
                                                " \u5143/m\u00B2\u22C5\u6708"),
                                            React.createElement("p", { className: "leaseArea" }, "189m\u00B2"))))),
                            React.createElement("li", null,
                                React.createElement("a", { href: "", target: "_blank" },
                                    React.createElement("div", { className: "leaseRooms leaseRooms2" },
                                        React.createElement("img", { src: "./fangliangbao/image/demo.png" }),
                                        React.createElement("div", { className: "leaseRoomsRight" },
                                            React.createElement("p", { className: "leaseName2" }, "\u51FA\u79DF\u9AD8\u65B0\u533A\u4FE1\u606F\u4EA7\u4E1A\u6842\u6797\u4FE1\u606F\u4EA7\u4E1A\u56ED\u533A"),
                                            React.createElement("p", null,
                                                React.createElement("span", { className: "leasePrice" }, "80.3"),
                                                " \u5143/m\u00B2\u22C5\u6708"),
                                            React.createElement("p", { className: "leaseArea" }, "189m\u00B2"))))),
                            React.createElement("li", null,
                                React.createElement("a", { href: "", target: "_blank" },
                                    React.createElement("div", { className: "leaseRooms leaseRooms2" },
                                        React.createElement("img", { src: "./fangliangbao/image/demo.png" }),
                                        React.createElement("div", { className: "leaseRoomsRight" },
                                            React.createElement("p", { className: "leaseName2" }, "\u51FA\u79DF\u9AD8\u65B0\u533A\u4FE1\u606F\u4EA7\u4E1A\u6842\u6797\u4FE1\u606F\u4EA7\u4E1A\u56ED\u533A"),
                                            React.createElement("p", null,
                                                React.createElement("span", { className: "leasePrice" }, "80.3"),
                                                " \u5143/m\u00B2\u22C5\u6708"),
                                            React.createElement("p", { className: "leaseArea" }, "189m\u00B2"))))),
                            React.createElement("li", null,
                                React.createElement("a", { href: "", target: "_blank" },
                                    React.createElement("div", { className: "leaseRooms leaseRooms2" },
                                        React.createElement("img", { src: "./fangliangbao/image/demo.png" }),
                                        React.createElement("div", { className: "leaseRoomsRight" },
                                            React.createElement("p", { className: "leaseName" }, "\u51FA\u79DF\u9AD8\u65B0\u533A\u4FE1\u606F\u4EA7\u4E1A\u6842\u6797\u4FE1\u606F\u4EA7\u4E1A\u56ED\u533A"),
                                            React.createElement("p", null,
                                                React.createElement("span", { className: "leasePrice" }, "80.3"),
                                                " \u5143/m\u00B2\u22C5\u6708"),
                                            React.createElement("p", { className: "leaseArea" }, "189m\u00B2")))))))),
                React.createElement("div", { className: "listRight_three" },
                    React.createElement("p", null, "\u623F\u826F\u5B9D\u5C0F\u7A0B\u5E8F\u7AEF"),
                    React.createElement("img", { src: "./fangliangbao/image/demo.png" }),
                    React.createElement("p", { style: { "font-size": "12px" } }, "\u6253\u5F00\u5FAE\u4FE1\u626B\u4E00\u626B\u968F\u65F6\u624B\u673A\u4F53\u9A8C "))));
        }
    }
    exports.default = BaoList;
});
define("hotList", ["require", "exports", "react", "antd", "homeTop", "infoTitleRecom", "allBottom"], function (require, exports, React, antd_2, homeTop_8, infoTitleRecom_2, AllBottom_3) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    class HotList extends React.Component {
        constructor(props) {
            super(props);
            this.state = {};
        }
        componentDidMount() {
            homeTop_8.default.changHomeTop(5);
            infoTitleRecom_2.default.changRecomTitle(1);
        }
        render() {
            return (React.createElement("div", { className: "index" },
                React.createElement(homeTop_8.default, null),
                React.createElement("div", { style: { width: "1200px", margin: "auto", paddingTop: "61px" } },
                    React.createElement(infoTitleRecom_2.default, { index: 2 })),
                React.createElement("div", { className: "warp" },
                    React.createElement(HotLeft, null),
                    React.createElement(HotRight, null)),
                React.createElement("div", { className: "parkInfo_bottom" },
                    React.createElement(AllBottom_3.default, null))));
        }
    }
    class HotLeft extends React.Component {
        constructor(props) {
            super(props);
            this.state = {
                baoList: [
                    {
                        img: "./fangliangbao/image/demo.png",
                        title: "优客工场五周年战略转型 由“重”转“轻” 进化共赢",
                        date: "2020/05/19 14:03:45",
                        context: "2020年4月18日下午14:00，优客工场进行了一场名为“起源——优客工场进化论”线上合办公独角兽企业优客工场创立于2015年，以“给你每一个快乐的工作日”为使命，五年来坚持赋能中国创新者."
                    }, {
                        img: "./fangliangbao/image/demo.png",
                        title: "优客工场五周年战略转型 由“重”转“轻” 进化共赢",
                        date: "2020/05/19 14:03:45",
                        context: "2020年4月18日下午14:00，优客工场进行了一场名为“起源——优客工场进化论”线上合办公独角兽企业优客工场创立于2015年，以“给你每一个快乐的工作日”为使命，五年来坚持赋能中国创新者."
                    }
                ]
            };
        }
        componentDidMount() {
            let baoListLength = this.state.baoList.length;
            console.log(baoListLength);
            if (baoListLength < 4) {
                $(".listBox").attr("style", "height: 850px");
                console.log($(".listBox"));
            }
        }
        onChangePage(data) {
            console.log('page', data);
        }
        render() {
            return (React.createElement("div", { className: "listBox " },
                React.createElement("div", { className: "listBox_List" },
                    React.createElement("ul", null, this.state.baoList.map((i, index) => {
                        return (React.createElement("li", null,
                            React.createElement("a", { href: "./hotText.html", target: "_blank" },
                                React.createElement("div", { className: "listBox_Li" },
                                    React.createElement("img", { src: i.img }),
                                    React.createElement("div", { className: "listBox_Li_r" },
                                        React.createElement("p", null, i.title),
                                        React.createElement("p", null, i.date),
                                        React.createElement("p", null, i.context),
                                        React.createElement("p", null, "\u4E86\u89E3\u8BE6\u60C5>"))))));
                    }))),
                React.createElement("div", { className: "listBox_page" },
                    React.createElement("p", { className: "companyBox_left_box_one_page" },
                        React.createElement(antd_2.Pagination, { pageSize: "5", defaultPageSize: "5", total: 50, onChange: this.onChangePage.bind(this) })))));
        }
    }
    class HotRight extends React.Component {
        constructor(props) {
            super(props);
            this.state = {};
        }
        componentDidMount() {
        }
        render() {
            return (React.createElement("div", { className: "listRight" },
                React.createElement("div", { className: "listRight_one" },
                    React.createElement("p", { className: "listRight_one_p" }, "\u65B0\u4E0A\u7EBF\u56ED\u533A >>"),
                    React.createElement("div", { className: "leaseRoomList leaseRoomList2" },
                        React.createElement("ul", null,
                            React.createElement("li", null,
                                React.createElement("a", { href: "", target: "_blank" },
                                    React.createElement("div", { className: "leaseRooms leaseRooms2" },
                                        React.createElement("img", { src: "./fangliangbao/image/demo.png" }),
                                        React.createElement("div", { className: "leaseRoomsRight" },
                                            React.createElement("p", { className: "leaseName2" }, "\u6842\u6797\u4FE1\u606F\u4EA7\u4E1A\u56ED\u533A"),
                                            React.createElement("p", null,
                                                React.createElement("span", { className: "leasePrice" }, "80.3"),
                                                " \u5143/m\u00B2\u22C5\u6708"),
                                            React.createElement("p", { className: "leaseArea2" }, "\u4E03\u661F-\u671D\u9633\u8DEFD-12\u53F7"))))),
                            React.createElement("li", null,
                                React.createElement("a", { href: "", target: "_blank" },
                                    React.createElement("div", { className: "leaseRooms leaseRooms2" },
                                        React.createElement("img", { src: "./fangliangbao/image/demo.png" }),
                                        React.createElement("div", { className: "leaseRoomsRight" },
                                            React.createElement("p", { className: "leaseName2" }, "\u6842\u6797\u4FE1\u606F\u4EA7\u4E1A\u56ED\u533A"),
                                            React.createElement("p", null,
                                                React.createElement("span", { className: "leasePrice" }, "80.3"),
                                                " \u5143/m\u00B2\u22C5\u6708"),
                                            React.createElement("p", { className: "leaseArea2" }, "\u4E03\u661F-\u671D\u9633\u8DEFD-12\u53F7"))))),
                            React.createElement("li", null,
                                React.createElement("a", { href: "", target: "_blank" },
                                    React.createElement("div", { className: "leaseRooms leaseRooms2" },
                                        React.createElement("img", { src: "./fangliangbao/image/demo.png" }),
                                        React.createElement("div", { className: "leaseRoomsRight" },
                                            React.createElement("p", { className: "leaseName2" }, "\u6842\u6797\u4FE1\u606F\u4EA7\u4E1A\u56ED\u533A"),
                                            React.createElement("p", null,
                                                React.createElement("span", { className: "leasePrice" }, "80.3"),
                                                " \u5143/m\u00B2\u22C5\u6708"),
                                            React.createElement("p", { className: "leaseArea2" }, "\u4E03\u661F-\u671D\u9633\u8DEFD-12\u53F7"))))),
                            React.createElement("li", null,
                                React.createElement("a", { href: "", target: "_blank" },
                                    React.createElement("div", { className: "leaseRooms leaseRooms2" },
                                        React.createElement("img", { src: "./fangliangbao/image/demo.png" }),
                                        React.createElement("div", { className: "leaseRoomsRight" },
                                            React.createElement("p", { className: "leaseName2" }, "\u6842\u6797\u4FE1\u606F\u4EA7\u4E1A\u56ED\u533A"),
                                            React.createElement("p", null,
                                                React.createElement("span", { className: "leasePrice" }, "80.3"),
                                                " \u5143/m\u00B2\u22C5\u6708"),
                                            React.createElement("p", { className: "leaseArea2" }, "\u4E03\u661F-\u671D\u9633\u8DEFD-12\u53F7")))))))),
                React.createElement("div", { className: "listRight_two" },
                    React.createElement("p", { className: "listRight_one_p" }, "\u70ED\u95E8\u623F\u6E90  >>"),
                    React.createElement("div", { className: "leaseRoomList leaseRoomList2" },
                        React.createElement("ul", null,
                            React.createElement("li", null,
                                React.createElement("a", { href: "", target: "_blank" },
                                    React.createElement("div", { className: "leaseRooms leaseRooms2" },
                                        React.createElement("img", { src: "./fangliangbao/image/demo.png" }),
                                        React.createElement("div", { className: "leaseRoomsRight" },
                                            React.createElement("p", { className: "leaseName2" }, "\u51FA\u79DF\u9AD8\u65B0\u533A\u4FE1\u606F\u4EA7\u4E1A\u6842\u6797\u4FE1\u606F\u4EA7\u4E1A\u56ED\u533A"),
                                            React.createElement("p", null,
                                                React.createElement("span", { className: "leasePrice" }, "80.3"),
                                                " \u5143/m\u00B2\u22C5\u6708"),
                                            React.createElement("p", { className: "leaseArea" }, "189m\u00B2"))))),
                            React.createElement("li", null,
                                React.createElement("a", { href: "", target: "_blank" },
                                    React.createElement("div", { className: "leaseRooms leaseRooms2" },
                                        React.createElement("img", { src: "./fangliangbao/image/demo.png" }),
                                        React.createElement("div", { className: "leaseRoomsRight" },
                                            React.createElement("p", { className: "leaseName2" }, "\u51FA\u79DF\u9AD8\u65B0\u533A\u4FE1\u606F\u4EA7\u4E1A\u6842\u6797\u4FE1\u606F\u4EA7\u4E1A\u56ED\u533A"),
                                            React.createElement("p", null,
                                                React.createElement("span", { className: "leasePrice" }, "80.3"),
                                                " \u5143/m\u00B2\u22C5\u6708"),
                                            React.createElement("p", { className: "leaseArea" }, "189m\u00B2"))))),
                            React.createElement("li", null,
                                React.createElement("a", { href: "", target: "_blank" },
                                    React.createElement("div", { className: "leaseRooms leaseRooms2" },
                                        React.createElement("img", { src: "./fangliangbao/image/demo.png" }),
                                        React.createElement("div", { className: "leaseRoomsRight" },
                                            React.createElement("p", { className: "leaseName2" }, "\u51FA\u79DF\u9AD8\u65B0\u533A\u4FE1\u606F\u4EA7\u4E1A\u6842\u6797\u4FE1\u606F\u4EA7\u4E1A\u56ED\u533A"),
                                            React.createElement("p", null,
                                                React.createElement("span", { className: "leasePrice" }, "80.3"),
                                                " \u5143/m\u00B2\u22C5\u6708"),
                                            React.createElement("p", { className: "leaseArea" }, "189m\u00B2"))))),
                            React.createElement("li", null,
                                React.createElement("a", { href: "", target: "_blank" },
                                    React.createElement("div", { className: "leaseRooms leaseRooms2" },
                                        React.createElement("img", { src: "./fangliangbao/image/demo.png" }),
                                        React.createElement("div", { className: "leaseRoomsRight" },
                                            React.createElement("p", { className: "leaseName" }, "\u51FA\u79DF\u9AD8\u65B0\u533A\u4FE1\u606F\u4EA7\u4E1A\u6842\u6797\u4FE1\u606F\u4EA7\u4E1A\u56ED\u533A"),
                                            React.createElement("p", null,
                                                React.createElement("span", { className: "leasePrice" }, "80.3"),
                                                " \u5143/m\u00B2\u22C5\u6708"),
                                            React.createElement("p", { className: "leaseArea" }, "189m\u00B2")))))))),
                React.createElement("div", { className: "listRight_three" },
                    React.createElement("p", null, "\u623F\u826F\u5B9D\u5C0F\u7A0B\u5E8F\u7AEF"),
                    React.createElement("img", { src: "./fangliangbao/image/demo.png" }),
                    React.createElement("p", { style: { "font-size": "12px" } }, "\u6253\u5F00\u5FAE\u4FE1\u626B\u4E00\u626B\u968F\u65F6\u624B\u673A\u4F53\u9A8C "))));
        }
    }
    exports.default = HotList;
});
define("router", ["require", "exports", "react-router-dom", "react", "index", "parkList", "roomList", "sellList", "personalCenter", "contact", "parkInfo", "baoList", "hotList"], function (require, exports, react_router_dom_6, React, index_1, parkList_1, roomList_1, sellList_1, personalCenter_1, contact_1, parkInfo_1, baoList_1, hotList_1) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    class Router extends React.Component {
        constructor(props) {
            super(props);
        }
        render() {
            return (React.createElement(react_router_dom_6.HashRouter, null,
                React.createElement(react_router_dom_6.Switch, null,
                    React.createElement(react_router_dom_6.Route, { exact: true, path: "/", component: index_1.default }),
                    React.createElement(react_router_dom_6.Route, { exact: true, path: "/parkList", component: parkList_1.default }),
                    React.createElement(react_router_dom_6.Route, { exact: true, path: "/roomList", component: roomList_1.default }),
                    React.createElement(react_router_dom_6.Route, { exact: true, path: "/sellList", component: sellList_1.default }),
                    React.createElement(react_router_dom_6.Route, { exact: true, path: "/personalCenter", component: personalCenter_1.default }),
                    React.createElement(react_router_dom_6.Route, { exact: true, path: "/contact", component: contact_1.default }),
                    React.createElement(react_router_dom_6.Route, { exact: true, path: "/parkInfo", component: parkInfo_1.default }),
                    React.createElement(react_router_dom_6.Route, { exact: true, path: "/baoList", component: baoList_1.default }),
                    React.createElement(react_router_dom_6.Route, { exact: true, path: "/hotList", component: hotList_1.default }))));
        }
    }
    exports.default = Router;
});
define("alertBox", ["require", "exports", "react", "parkInfo"], function (require, exports, React, ParkInfo_2) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    class AlertBox extends React.Component {
        constructor(props) {
            super(props);
            this.state = {
                text: "",
            };
            AlertBox.showAlert = this.showAlert.bind(this);
        }
        componentDidMount() {
        }
        static showAlert(text) { }
        ;
        showAlert(text) {
            console.log(text);
            this.setState({
                text: text
            });
        }
        closeAlert() {
            $(document.body).attr('style', 'height: 100%; margin: 0; padding: 0; overflow: visible;');
            ParkInfo_2.default.closeDefeat();
        }
        render() {
            return (React.createElement("div", { className: "fullView" },
                React.createElement("div", { className: "alertBox" },
                    React.createElement("img", { src: "./fangliangbao/image/blueLogo.png" }),
                    React.createElement("p", null, this.state.text),
                    React.createElement("p", { className: "", onClick: this.closeAlert.bind(this) }, " \u77E5\u9053\u4E86 "))));
        }
    }
    exports.default = AlertBox;
});

define("bottomBtn", ["require", "exports", "react", "react-router-dom", "css!./styles/view.css"], function (require, exports, React, RouterDOM) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    class BottomBtn extends React.Component {
        constructor(props) {
            super(props);
            this.state = {
                iconBottom1: "iconBox-bottomIn",
                iconBottom2: "iconBox-bottom",
                iconBottom3: "iconBox-bottom",
                iconBottom4: "iconBox-bottom"
            };
            BottomBtn.toggleIcon = this.toggleIcon.bind(this);
        }
        static toggleIcon(a) { }
        toggleIcon(data) {
            console.log(data);
            if (data == 1) {
                this.setState({
                    iconBottom1: "iconBox-bottomIn",
                    iconBottom2: "iconBox-bottom",
                    iconBottom3: "iconBox-bottom",
                    iconBottom4: "iconBox-bottom",
                });
            }
            else if (data == 2) {
                this.setState({
                    iconBottom1: "iconBox-bottom",
                    iconBottom2: "iconBox-bottomIn",
                    iconBottom3: "iconBox-bottom",
                    iconBottom4: "iconBox-bottom",
                });
            }
            else if (data == 3) {
                this.setState({
                    iconBottom1: "iconBox-bottom",
                    iconBottom2: "iconBox-bottom",
                    iconBottom3: "iconBox-bottomIn",
                    iconBottom4: "iconBox-bottom",
                });
            }
            else if (data == 4) {
                this.setState({
                    iconBottom1: "iconBox-bottom",
                    iconBottom2: "iconBox-bottom",
                    iconBottom3: "iconBox-bottom",
                    iconBottom4: "iconBox-bottomIn",
                });
            }
        }
        render() {
            return (React.createElement("div", { className: "bottomView" },
                React.createElement(RouterDOM.Link, { to: "/" },
                    React.createElement("div", { className: this.state.iconBottom1 },
                        React.createElement("span", { className: "iconfont", style: { "fontSize": "5rem" } }, "\uE7FA"),
                        React.createElement("p", null, "3D\u0273\uFFFD\uFFFD"))),
                React.createElement(RouterDOM.Link, { to: "/infoArea" },
                    React.createElement("div", { className: this.state.iconBottom2 },
                        React.createElement("span", { className: "iconfont iconActice", style: { "fontSize": "5rem" } }, " \uE7FA "),
                        React.createElement("p", null, "\u03A2\u0226"))),
                React.createElement(RouterDOM.Link, { to: "/message" },
                    React.createElement("div", { className: this.state.iconBottom3 },
                        React.createElement("span", { className: "iconfont", style: { "fontSize": "5rem" } }, "\uE7FA"),
                        React.createElement("p", null, "\uFFFD\uFFFD\u0476"))),
                React.createElement(RouterDOM.Link, { to: "/aboutMe" },
                    React.createElement("div", { className: this.state.iconBottom4 },
                        React.createElement("span", { className: "iconfont", style: { "fontSize": "5rem" } }, "\uE7FA"),
                        React.createElement("p", null, "\uFFFD\u04B5\uFFFD")))));
        }
        ;
    }
    exports.default = BottomBtn;
});
define("aboutMe", ["require", "exports", "react", "bottomBtn", "css!./styles/view.css"], function (require, exports, React, bottomBtn_1) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    class AboutMe extends React.Component {
        constructor(props) {
            super(props);
            this.state = {};
        }
        componentDidMount() {
            bottomBtn_1.default.toggleIcon(4);
        }
        render() {
            return (React.createElement("div", null,
                React.createElement("div", { className: "aboutMebox" }, "AboutMeAboutMe\uFFFD\u3F6D\uFFFD\uFFFD\uFFFD\uFFFD\uFFFD\uFFFD\u03E2\uFFFD\u01BC\uFFFD\uFFFD\uFFFD\uFFFD\u07B9\uFFFD\u02FE"),
                React.createElement(bottomBtn_1.default, null)));
        }
    }
    exports.default = AboutMe;
});
define("home", ["require", "exports", "react", "bottomBtn", "css!./styles/view.css"], function (require, exports, React, bottomBtn_2) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    class Home extends React.Component {
        constructor(props) {
            super(props);
            this.state = {};
        }
        componentDidMount() {
            bottomBtn_2.default.toggleIcon(1);
        }
        render() {
            return (React.createElement("div", null,
                React.createElement(TopBtn, null),
                React.createElement(bottomBtn_2.default, null)));
        }
    }
    class TopBtn extends React.Component {
        constructor(props) {
            super(props);
            this.state = {
                topView: "topView"
            };
        }
        toggleIconbox(a) {
            console.log('toggleIconbox', a);
            this.setState({
                topView: "topView-big"
            });
        }
        render() {
            return (React.createElement("div", { className: this.state.topView },
                React.createElement("div", { className: "iconBox" },
                    React.createElement("span", { className: "iconfont", style: { "fontSize": "5rem" } }, "\uE7FA"),
                    React.createElement("p", null, "\uFFFD\uFFFD\u02BE\uFFFD\uFFFD")),
                React.createElement("div", { className: "iconBox" },
                    React.createElement("span", { className: "iconfont", style: { "fontSize": "5rem" } }, "\uE7FA"),
                    React.createElement("p", null, "\uFFFD\uFFFD\u02BE\uFFFD\uFFFD")),
                React.createElement("div", { className: "iconBox", onClick: this.toggleIconbox.bind(this, 10) },
                    React.createElement("span", { className: "iconfont", style: { "fontSize": "5rem" } }, "\uE7FA"),
                    React.createElement("p", null, "\uFFFD\uFFFD\uFFFD\uFFFD"))));
        }
    }
    class FoldBtn extends React.Component {
        constructor(props) {
            super(props);
            this.state = {};
        }
        render() {
            return (React.createElement("div", null, "foldBtn"));
        }
    }
    exports.default = Home;
});
define("parkCompany", ["require", "exports", "react"], function (require, exports, React) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    class ParkCompany extends React.Component {
        constructor(props) {
            super(props);
        }
        render() {
            return (React.createElement("div", null, "ParkCompany"));
        }
    }
    exports.default = ParkCompany;
});
define("photograph", ["require", "exports", "react"], function (require, exports, React) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    class Photograph extends React.Component {
        constructor(props) {
            super(props);
        }
        render() {
            return (React.createElement("div", null, "Photograph"));
        }
    }
    exports.default = Photograph;
});
define("infoArea", ["require", "exports", "react", "bottomBtn"], function (require, exports, React, bottomBtn_3) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    class InfoArea extends React.Component {
        constructor(props) {
            super(props);
            this.state = {};
        }
        componentDidMount() {
            bottomBtn_3.default.toggleIcon(2);
        }
        render() {
            return (React.createElement("div", null,
                React.createElement("div", { className: "infoAreabox" }, "InfoArea"),
                React.createElement(bottomBtn_3.default, null)));
        }
    }
    exports.default = InfoArea;
});
define("message", ["require", "exports", "react", "bottomBtn"], function (require, exports, React, bottomBtn_4) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    class Message extends React.Component {
        constructor(props) {
            super(props);
            this.state = {};
        }
        componentDidMount() {
            bottomBtn_4.default.toggleIcon(3);
        }
        render() {
            return (React.createElement("div", null,
                React.createElement("div", { className: "messageBox" }, "message"),
                React.createElement(bottomBtn_4.default, null)));
        }
    }
    exports.default = Message;
});
define("index", ["require", "exports", "react", "react-dom", "parkCompany", "photograph", "infoArea", "message", "aboutMe", "react-router-dom", "css!./styles/index.css"], function (require, exports, React, ReactDOM, parkCompany_1, photograph_1, infoArea_1, message_1, aboutMe_1, react_router_dom_1) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    class Index extends React.Component {
        constructor() {
            super(...arguments);
            this.state = {
                inputValue: "请输入园区名称",
                city: "",
                parkArr: [1, 2, 3, 4, 5, 6, 7, 8, 9],
                tagArr: ["电子信息", "高新技术", "电商服务"]
            };
        }
        componentDidMount() {
            let _this = this;
            var geolocation = new BMap.Geolocation();
            geolocation.getCurrentPosition(function (r) {
                if (this.getStatus() == BMAP_STATUS_SUCCESS) {
                    console.log(r.address.city);
                    _this.setState({ city: r.address.city });
                }
                else {
                    if (this.getStatus() === 6) {
                        alert("没有权限");
                    }
                    if (this.getStatus() === 8) {
                        alert("连接超时");
                    }
                }
            });
        }
        foucus() {
            if (this.state.inputValue === "请输入园区名称") {
                this.setState({ inputValue: "" });
            }
        }
        blur() {
            if (this.state.inputValue === "") {
                this.setState({ inputValue: "请输入园区名称" });
            }
        }
        change(event) {
            this.setState({ inputValue: event.target.value });
        }
        render() {
            return (React.createElement("div", { className: "index" },
                React.createElement("div", { className: "index-top" }, "\u6570\u5B57\u56ED\u533A"),
                React.createElement("div", { className: "index-input-div" },
                    React.createElement("div", { className: "index-child-left" },
                        React.createElement("input", { className: "index-input", value: this.state.inputValue, onFocus: this.foucus.bind(this), onBlur: this.blur.bind(this), onChange: this.change.bind(this) }),
                        React.createElement("img", { src: "./mpark/image/search.png", className: "index-search-img" })),
                    React.createElement("div", { className: "index-child-right" },
                        React.createElement("span", null, this.state.city),
                        React.createElement("img", { src: "./mpark/image/bottom.png", width: "50px", height: "50px", style: { marginTop: "-10px" } }))),
                React.createElement("div", { className: "index-number" },
                    React.createElement("img", { src: "./mpark/image/tower.png", className: "tower-img" }),
                    "\u5DF2\u6709",
                    React.createElement("span", { style: { color: "#0B8BF0", margin: "0 15px 0 15px" } }, "15"),
                    "\u5BB6\u56ED\u533A\u4E0A\u7EBF"),
                React.createElement("div", { className: "index-park" }, this.state.parkArr.map((item, index) => {
                    return React.createElement("div", { className: "index-child-park", key: index },
                        React.createElement("div", { className: "index-child-park-left" },
                            React.createElement("img", { src: "./mpark/image/a.jpg", className: "park-img" })),
                        React.createElement("div", { className: "index-child-park-right" },
                            React.createElement("div", { className: "index-park-name" }, "\u6842\u6797\u56FD\u5BB6\u9AD8\u65B0\u533A\u4FE1\u606F\u4EA7\u4E1A\u56ED"),
                            React.createElement("div", { className: "index-park-position" },
                                React.createElement("img", { src: "./mpark/image/position.png", width: "45px", height: "40px", style: { marginTop: "-18px" } }),
                                React.createElement("span", { className: "index-park-position-name" }, "\u6842\u6797\u9AD8\u65B0\u533A\u671D\u9633\u8DEFD-12\u53F7")),
                            React.createElement("div", { className: "index-tag" }, this.state.tagArr.map((item, index) => {
                                return React.createElement("div", { key: index, className: "index-tag-child" }, item);
                            }))),
                        React.createElement("div", { className: "index-child-park-end" },
                            React.createElement("div", { className: "index-distance" }, "10.5km")));
                }))));
        }
    }
    exports.default = Index;
    ReactDOM.render(React.createElement(react_router_dom_1.HashRouter, null,
        React.createElement(react_router_dom_1.Switch, null,
            React.createElement(react_router_dom_1.Route, { exact: true, path: "/parkCompany", component: parkCompany_1.default }),
            React.createElement(react_router_dom_1.Route, { exact: true, path: "/photograph", component: photograph_1.default }),
            React.createElement(react_router_dom_1.Route, { exact: true, path: "/", component: Index }),
            React.createElement(react_router_dom_1.Route, { exact: true, path: "/infoArea", component: infoArea_1.default }),
            React.createElement(react_router_dom_1.Route, { exact: true, path: "/message", component: message_1.default }),
            React.createElement(react_router_dom_1.Route, { exact: true, path: "/aboutMe", component: aboutMe_1.default }))), document.getElementById('viewContainer'));
});

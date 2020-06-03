define("router", ["require", "exports", "react-router-dom", "react", "index"], function (require, exports, react_router_dom_1, React, index_1) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    class Router extends React.Component {
        constructor(props) {
            super(props);
        }
        render() {
            return (React.createElement(react_router_dom_1.HashRouter, null,
                React.createElement(react_router_dom_1.Switch, null,
                    React.createElement(react_router_dom_1.Route, { exact: true, path: "/", component: index_1.default }))));
        }
    }
    exports.default = Router;
});
define("index", ["require", "exports", "react", "react-dom", "router", "css!./style/index.css"], function (require, exports, React, ReactDOM, router_1) {
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
                    React.createElement("div", { className: "index-more" }, "\u67E5\u770B\u66F4\u591A\u5E7F\u5DDE\u623F\u6E90"))));
        }
    }
    Index.g_pIns = null;
    exports.default = Index;
    viewDraw = function () {
        ReactDOM.render(React.createElement(router_1.default, null), document.getElementById('viewContainer'));
    };
});

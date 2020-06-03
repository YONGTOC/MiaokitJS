define("index", ["require", "exports", "react", "react-dom", "router", "css!./style/index.css", "css!./style/view.css"], function (require, exports, React, ReactDOM, router_1) {
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
define("HomeTop", ["require", "exports", "react", "css!./style/iconfont.css"], function (require, exports, React) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    class HomeTop extends React.Component {
        constructor(props) {
            super(props);
            this.state = {
                htIndex: 10,
            };
            HomeTop.changHomeTop = this.changHomeTop.bind(this);
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
        render() {
            return (React.createElement("div", { className: "homeTop" },
                React.createElement("div", { className: "homeTopBox" },
                    React.createElement("div", { className: "htLeft" },
                        React.createElement("ul", null,
                            React.createElement("li", { style: { "margin-right": "40px" } },
                                React.createElement("i", { className: "iconfont ", style: { "margin-right": "5px", "font-size": "14px" } }, "\uE83C"),
                                React.createElement("span", null, "\u5E7F\u5DDE")),
                            React.createElement("li", { className: this.state.htIndex == 1 ? "homtop_active" : null }, "\u9996\u9875"),
                            React.createElement("li", { className: this.state.htIndex == 2 ? "homtop_active" : null }, "\u56ED\u533A"),
                            React.createElement("li", { className: this.state.htIndex == 3 ? "homtop_active" : null }, "\u51FA\u79DF"),
                            React.createElement("li", { className: this.state.htIndex == 4 ? "homtop_active" : null }, "\u5B9D\u54E5\u63A8\u8350"),
                            React.createElement("li", { className: this.state.htIndex == 5 ? "homtop_active" : null }, "\u70ED\u70B9\u8D44\u8BAF"))),
                    React.createElement("div", { className: "htRight" },
                        React.createElement("ul", null,
                            React.createElement("li", null, "400-808-3066"),
                            React.createElement("li", null, "\u767B\u5F55 / \u6CE8\u518C"))))));
        }
    }
    exports.default = HomeTop;
});
define("AllBottom", ["require", "exports", "react"], function (require, exports, React) {
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
                                React.createElement("li", { style: { "font-size": "30px", "position": "relative", "left": "-51px" } }, "400-808-3066")))),
                    React.createElement("hr", null),
                    React.createElement("div", { className: "homeBottomBox_two" },
                        React.createElement("p", null, "Copyright \u00A9 2019 - 2020 yongtoc.com. All Rights Reserved. \u6D59\u6C5F\u6C38\u62D3\u4FE1\u606F\u79D1\u6280\u6709\u9650\u516C\u53F8 \u7248\u6743\u6240\u6709 \u6D59ICP\u590715025359\u53F7"),
                        React.createElement("p", null,
                            React.createElement("img", { src: "./fangliangbao/image/police_haozu.png", style: { "margin-right": "10px" } }),
                            "\u6D59\u516C\u7F51\u5B89\u5907 33010502005316\u53F7")))));
        }
    }
    exports.default = AllBottom;
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
                        React.createElement("li", null, "\u623F\u6E90\u56ED\u533A")))));
        }
    }
    exports.default = InfoTitle;
});
define("parkInfo", ["require", "exports", "react", "HomeTop", "AllBottom", "InfoTitle"], function (require, exports, React, HomeTop_1, AllBottom_1, InfoTitle_1) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    class ParkInfo extends React.Component {
        constructor(props) {
            super(props);
            this.state = {};
        }
        render() {
            return (React.createElement("div", null,
                React.createElement(HomeTop_1.default, null),
                React.createElement("div", { className: "parkInfo" },
                    React.createElement("div", { className: "parkInfoBox_title" },
                        React.createElement(InfoTitle_1.default, null),
                        React.createElement(ParkInfoOne, null)),
                    React.createElement("div", { className: "parkInfoBox_list" },
                        React.createElement(ParkInfoTwo, null)),
                    React.createElement("div", { className: "parkInfoBox_text" },
                        React.createElement(ParkInfoThree, null))),
                React.createElement(AllBottom_1.default, null)));
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
define("ParkInfo (2)", ["require", "exports", "react", "HomeTop", "AllBottom"], function (require, exports, React, HomeTop_2, AllBottom_2) {
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
define("ParkInfo (3)", ["require", "exports", "react", "HomeTop", "AllBottom", "InfoTitle"], function (require, exports, React, HomeTop_3, AllBottom_3, InfoTitle_2) {
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

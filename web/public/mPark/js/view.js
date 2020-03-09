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
                React.createElement(RouterDOM.Link, { to: "/home" },
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
define("applyPut", ["require", "exports", "react"], function (require, exports, React) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    class ApplyPut extends React.Component {
        constructor(props) {
            super(props);
        }
        render() {
            return (React.createElement("div", null,
                React.createElement("div", { className: "aboutMebox" }, "ApplyPut")));
        }
    }
    exports.default = ApplyPut;
});
define("bookSite", ["require", "exports", "react"], function (require, exports, React) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    class BookSite extends React.Component {
        constructor(props) {
            super(props);
        }
        render() {
            return (React.createElement("div", null,
                React.createElement("div", { className: "aboutMebox" }, "BookSite")));
        }
    }
    exports.default = BookSite;
});
define("compat", ["require", "exports"], function (require, exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    class GlobalAction {
        switchRoom(pName) {
            console.log("SwitchRoom", pName);
        }
        switchMark(pName, pInfo) {
            console.log("switchMark", pName, pInfo);
        }
    }
    exports.default = GlobalAction;
});
define("dataService", ["require", "exports"], function (require, exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    class DataServices {
        callback(a, pBack) {
            console.log("callback1", a);
            pBack("callback");
        }
        areaType(pBackajax) {
            console.log("init-AllareaType");
            pBackajax(3333);
        }
        companyType(pBackajax) {
            console.log("init-companyType");
            pBackajax(4444);
        }
        getRoomdata(pBackajax) {
            console.log("initRoomdata");
            pBackajax(111);
        }
        getCompanydata(pBackajax) {
            console.log("initCompanydata");
            pBackajax(2222);
        }
    }
    exports.default = DataServices;
});
define("findLease", ["require", "exports", "react", "react-router-dom", "css!./styles/view.css"], function (require, exports, React, RouterDOM) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    class FindLease extends React.Component {
        constructor(props) {
            super(props);
            this.state = {
                FindLeasecss: "findLease",
                showList: true,
                showInfo: false,
            };
            FindLease.toggleView = this.toggleView.bind(this);
        }
        componentDidMount() {
        }
        static toggleView(a, e, n) { }
        ;
        toggleView(a, e, n) {
            console.log("fl", a);
            console.log("fl", e);
            console.log("fl", n);
            if (a == "Info") {
                this.setState({
                    showList: false,
                    showInfo: true,
                });
            }
            else {
                this.setState({
                    showList: true,
                    showInfo: false,
                });
            }
        }
        render() {
            return (React.createElement("div", null,
                React.createElement("div", { className: this.state.FindLeasecss },
                    React.createElement("p", { className: "companyInfotit" },
                        React.createElement(RouterDOM.Link, { to: "/home" },
                            React.createElement("span", { className: "iconfont companyInfoicon" }, "\uE7FA")),
                        React.createElement("span", null, "\u62DB\u79DF\u67E5\u8BE2")),
                    React.createElement("div", { className: this.state.showList == true ? "show" : "hide" },
                        React.createElement(LeaseList, null)),
                    React.createElement("div", { className: this.state.showInfo == true ? "show" : "hide" },
                        React.createElement(LeaseInfo, null)))));
        }
    }
    exports.default = FindLease;
    class LeaseList extends React.Component {
        constructor(props) {
            super(props);
            this.state = {
                leaseListcss: "leaseList-part",
                foleBtn: "lease-foleBtn",
                indexOf: 0,
                leaseBtn: "leaseBtn-part",
                leaseul: "leaseul",
                roomData: [
                    {
                        name: "A座-4F-B412室1", area: "45", time: "2019-7-15",
                        id: "id-01", url: "./mPark/image/i.png", price: "2.89"
                    },
                    {
                        name: "A座-4F-B412室2", area: "45", time: "2019-7-15",
                        id: "id-02", url: "./mPark/image/i.png", price: "2.8"
                    },
                    {
                        name: "A座-4F-B412室3", area: "45", time: "2019-7-15",
                        id: "id-03", url: "./mPark/image/i.png", price: "2.8"
                    },
                    {
                        name: "A座-4F-B412室1", area: "45m²", time: "2019-7-15",
                        id: "id-01", url: "./mPark/image/i.png", price: "2.8"
                    },
                    {
                        name: "A座-4F-B412室1", area: "45m²", time: "2019-7-15",
                        id: "id-01", url: "./mPark/image/i.png", price: "2.8"
                    },
                    {
                        name: "A座-4F-B412室1", area: "45m²", time: "2019-7-15",
                        id: "id-01", url: "./mPark/image/i.png", price: "2.8"
                    },
                    {
                        name: "A座-4F-B412室1", area: "45m²", time: "2019-7-15",
                        id: "id-01", url: "./mPark/image/i.png", price: "2.8"
                    },
                    {
                        name: "A座-4F-B412室1", area: "45m²", time: "2019-7-15",
                        id: "id-01", url: "./mPark/image/i.png", price: "2.8"
                    },
                    {
                        name: "A座-4F-B412室1", area: "45m²", time: "2019-7-15",
                        id: "id-01", url: "./mPark/image/i.png", price: "2.8"
                    },
                ],
                areaType: [
                    { area: "100m²以下", id: "id-100m²以下" },
                    { area: "100-200m²", id: "id-100-200m²" },
                    { area: "200-300m²", id: "id-200-300m²" },
                    { area: "300-500m²", id: "id-300-500m²" },
                    { area: "500-800m²", id: "id-500-800m²" },
                    { area: "800m²以上", id: "id-800m²以上" },
                ],
                typeIndexof: 100,
                typeName: "全部"
            };
            this.showInfo = this.showInfo.bind(this);
        }
        componentDidMount() {
        }
        showInfo(a, e, n) {
            FindLease.toggleView(a, e, n);
        }
        toggleFold() {
            console.log("tftft");
            if (this.state.leaseListcss == "leaseList-all") {
                this.setState({
                    leaseListcss: "leaseList-part",
                    leaseul: "leaseul"
                });
            }
            else {
                this.setState({
                    leaseListcss: "leaseList-all",
                    leaseul: "leaseul-all"
                });
            }
        }
        foldBtn() {
            console.log("foldBtn");
            if (this.state.leaseBtn == "leaseBtn-part") {
                this.setState({
                    leaseBtn: "leaseBtn-all"
                });
            }
            else {
                this.setState({
                    leaseBtn: "leaseBtn-part"
                });
            }
        }
        leaseActive(data) {
            console.log("active", data);
            this.setState({
                indexOf: data,
            });
        }
        typeActive(indexof, name, id) {
            console.log("typeActive", indexof);
            console.log("typeActive", name);
            console.log("typeActive", id);
            this.setState({
                typeIndexof: indexof,
                typeName: name,
            });
        }
        render() {
            return (React.createElement("div", null,
                React.createElement("div", { className: this.state.leaseListcss },
                    React.createElement("div", { className: "foleBtn", onClick: this.toggleFold.bind(this) },
                        React.createElement("span", { style: { "fontSize": "5rem" } }, "--")),
                    React.createElement("ul", { className: this.state.leaseul }, this.state.roomData.map((i, index) => {
                        return (React.createElement("li", { onClick: this.leaseActive.bind(this, index), className: this.state.indexOf == index ? "leaseli-active" : "leaseli" },
                            React.createElement("div", { className: "leaseImgback" },
                                React.createElement("img", { src: i.url })),
                            React.createElement("div", { className: "leaseul-middle" },
                                React.createElement("p", { className: this.state.indexOf == index ? "leaseName-active" : "leaseName", style: { "font-size": "2.4rem", "font-weight": "bold" } }, i.name),
                                React.createElement("p", { style: { "font-size": "2.5rem" } },
                                    React.createElement("span", { className: "iconfont", style: { "fontSize": "3rem", "margin-right": "1rem" } }, "\uE7FA"),
                                    i.area,
                                    "m\u00B2"),
                                React.createElement("p", { style: { "font-size": "2.5rem" } },
                                    React.createElement("span", { className: "iconfont", style: { "fontSize": "3rem", "margin-right": "1rem" } }, "\uE7FA"),
                                    i.time)),
                            React.createElement("div", { className: "leaseul-right" },
                                React.createElement("p", { onClick: this.showInfo.bind(this, "Info", i.id) }, "\u66F4\u591A >"),
                                React.createElement("p", { className: this.state.indexOf == index ? "leaseType-active" : "leaseType" },
                                    React.createElement("span", { className: this.state.indexOf == index ? "leasePrice-active" : "leasePrice" }, i.price),
                                    "\u5143/m\u00B2/\u5929"))));
                    })),
                    React.createElement("form", null,
                        React.createElement("div", { className: this.state.leaseBtn },
                            React.createElement("div", { className: "searchBox" },
                                React.createElement("span", { className: "searchBox-text" },
                                    React.createElement("span", { className: "iconfont", style: { "fontSize": "3rem" } }, "\uE7FA"),
                                    React.createElement("input", { className: "leaseSearch", type: "text", placeholder: "\u641C\u7D22" })),
                                React.createElement("span", { onClick: this.foldBtn.bind(this), className: "searchBox-type" },
                                    this.state.typeName,
                                    " ",
                                    React.createElement("span", { className: "iconfont", style: { "fontSize": "3rem" } }, "\uE7FA"))),
                            React.createElement("ul", { className: "areaTypeul" },
                                React.createElement("li", { className: this.state.typeIndexof == 100 ? "areaTypeli-active" : "areaTypeli", onClick: this.typeActive.bind(this, 100, "全部", "id-全部"), style: { "width": "12rem" } }, "\u5168\u90E8"),
                                this.state.areaType.map((i, index) => {
                                    return (React.createElement("li", { onClick: this.typeActive.bind(this, index, i.area, i.id), className: this.state.typeIndexof == index ? "areaTypeli-active" : "areaTypeli" }, i.area));
                                })),
                            React.createElement("span", { className: "searchBtn" }, "\u641C\u7D22"))))));
        }
    }
    class LeaseInfo extends React.Component {
        constructor(props) {
            super(props);
            this.state = {
                leaseInfocss: "leaseInfo",
                roomName: "A座-4F-B412室",
                infoli: 0,
            };
            this.showList = this.showList.bind(this);
        }
        componentDidMount() {
        }
        showList(a, e, n) {
            FindLease.toggleView(a, e, n);
        }
        toggleFold() {
            console.log("tftft");
            if (this.state.leaseInfocss == "leaseInfo") {
                this.setState({
                    leaseInfocss: "leaseInfo-part",
                });
            }
            else {
                this.setState({
                    leaseInfocss: "leaseInfo",
                });
            }
        }
        infoClick(indexof) {
            console.log("infoClick", indexof);
            this.setState({
                infoli: indexof,
            });
        }
        render() {
            return (React.createElement("div", null,
                React.createElement("p", { className: "companyInfotit" },
                    React.createElement("span", { className: "iconfont companyInfoicon", onClick: this.showList.bind(this, "List", "id-01") }, "\uE7FA"),
                    React.createElement("span", null, this.state.roomName)),
                React.createElement("div", { className: this.state.leaseInfocss },
                    React.createElement("div", { className: "foleBtn", onClick: this.toggleFold.bind(this) },
                        React.createElement("span", { style: { "fontSize": "5rem" } }, "--")),
                    React.createElement("div", { className: "leaseInfoul_br" },
                        React.createElement("ul", { className: "leaseInfoul" },
                            React.createElement("li", { className: this.state.infoli == 0 ? "leaseInfoli-active" : "leaseInfoli", onClick: this.infoClick.bind(this, 0) }, "\u79DF\u623F\u4FE1\u606F"),
                            React.createElement("li", { className: this.state.infoli == 1 ? "leaseInfoli-active" : "leaseInfoli", onClick: this.infoClick.bind(this, 1) }, "\u7167\u7247\u5C55\u793A"))),
                    React.createElement("div", { className: "leaseContain" },
                        React.createElement("div", { className: this.state.infoli == 0 ? "show" : "hide" },
                            React.createElement(LeaseInfos, null)),
                        React.createElement("div", { className: this.state.infoli == 1 ? "show" : "hide" },
                            React.createElement(Picshow, null))))));
        }
    }
    class LeaseInfos extends React.Component {
        constructor(props) {
            super(props);
            this.state = {
                area: "156",
                time: "8:30-17:30",
                floor: "4",
                limit: "一年",
                elevator: "有",
                price: "2.8",
                man: "莫先生",
                tel: "0773123456"
            };
        }
        componentDidMount() {
        }
        render() {
            return (React.createElement("div", { className: "leaseInfos" },
                React.createElement("ul", { className: "leaseInfosul" },
                    React.createElement("li", null, "\u57FA\u672C\u4FE1\u606F"),
                    React.createElement("li", null, "\u770B\u623F\u987B\u77E5"),
                    React.createElement("li", null,
                        "\u5EFA\u7B51\u9762\u79EF",
                        React.createElement("span", null,
                            this.state.area,
                            "\u5E73\u7C73")),
                    React.createElement("li", null,
                        "\u770B\u623F\u65F6\u95F4",
                        React.createElement("span", null, this.state.time)),
                    React.createElement("li", null,
                        "\u6240\u5728\u697C\u5C42",
                        React.createElement("span", null,
                            this.state.floor,
                            "\u697C")),
                    React.createElement("li", null,
                        "\u79DF\u623F\u8981\u6C42",
                        React.createElement("span", null,
                            this.state.limit,
                            "\u8D77\u79DF")),
                    React.createElement("li", null,
                        React.createElement("span", { style: { "padding-right": "7rem" } }, "\u7535\u68AF"),
                        React.createElement("span", { style: { "font-weight": "600" } }, this.state.elevator)),
                    React.createElement("li", null,
                        React.createElement("span", { style: { "padding-right": "7rem" } }, "\u79DF\u91D1"),
                        React.createElement("span", { style: { "color": "#F53636" } },
                            this.state.price,
                            "\u5143/m\u00B2/\u5929")),
                    React.createElement("li", null,
                        React.createElement("span", { style: { "padding-right": "5rem" } }, "\u8054\u7CFB\u4EBA"),
                        React.createElement("span", { style: { "font-weight": "600" } }, this.state.man)),
                    React.createElement("li", null,
                        React.createElement("span", { style: { "padding-right": "2rem" } }, "\u8054\u7CFB\u7535\u8BDD"),
                        React.createElement("span", { style: { "font-weight": "600" } }, this.state.tel)))));
        }
    }
    class Picshow extends React.Component {
        constructor(props) {
            super(props);
            this.state = {
                roomImg: [
                    { url: "./mPark/image/i.png" },
                    { url: "./mPark/image/i.png" },
                    { url: "./mPark/image/i.png" },
                    { url: "./mPark/image/i.png" },
                    { url: "./mPark/image/i.png" },
                    { url: "./mPark/image/i.png" },
                ]
            };
        }
        componentDidMount() {
        }
        render() {
            return (React.createElement("div", { className: "picshow" },
                React.createElement("ul", null, this.state.roomImg.map((i, index) => {
                    return (React.createElement("li", null,
                        React.createElement("img", { src: i.url })));
                }))));
        }
    }
});
define("home", ["require", "exports", "react", "react-router-dom", "bottomBtn", "compat", "css!./styles/view.css"], function (require, exports, React, RouterDOM, bottomBtn_2, compat_1) {
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
                React.createElement(FoldBtn, null),
                React.createElement(bottomBtn_2.default, null)));
        }
    }
    class TopBtn extends React.Component {
        constructor(props) {
            super(props);
            this.state = {
                topView: "topView",
                topIcon1: "iconBox",
                topIcon2: "iconBox",
                topIcon3: "iconBox",
                topIcon4: "iconBox",
                topIcon5: "iconBox",
                topIcon: "iconBox",
                playIcon: "iconBox",
                moreIcon: "iconBox",
                topClose: "hide",
                topViewBack: "",
                topIcon3info: 0,
                topIcon4info: 0,
                topIcon5info: 0,
                mapIcon: [
                    { name: "��ͨ" },
                    { name: "��Ȧ" },
                    { name: "����վ" },
                    { name: "ȫ��" },
                    { name: "ͣ����" },
                    { name: "��ͨ" },
                ]
            };
            this.globalAction = new compat_1.default();
        }
        moreIcon(a) {
            console.log('toggleIconbox', a);
            this.setState({
                topView: "topView-big",
                moreIcon: "hide",
                topClose: "topClose",
                topIcon1: "iconBox-big",
                topIcon2: "iconBox-big",
                topIcon3: "iconBox-big",
                topIcon4: "iconBox-big",
                topIcon5: "iconBox-big",
                topViewBack: "topViewBack",
            });
            if (this.state.topIcon1 == "iconBoxIn" && this.state.topIcon2 == "iconBoxIn") {
                this.setState({
                    topIcon1: "iconBox-bigIn",
                    topIcon2: "iconBox-bigIn",
                });
            }
            else if (this.state.topIcon1 == "iconBoxIn") {
                console.log(this.state.topIcon1);
                this.setState({
                    topIcon1: "iconBox-bigIn",
                });
            }
            else if (this.state.topIcon2 == "iconBoxIn") {
                console.log(this.state.topIcon1);
                this.setState({
                    topIcon2: "iconBox-bigIn",
                });
            }
            ;
            if (this.state.topIcon3info == 1) {
                this.setState({
                    topIcon3: "iconBox-bigIn",
                });
            }
            if (this.state.topIcon4info == 1) {
                this.setState({
                    topIcon4: "iconBox-bigIn",
                });
            }
            if (this.state.topIcon5info == 1) {
                this.setState({
                    topIcon5: "iconBox-bigIn",
                });
            }
        }
        topClose(a) {
            console.log('topClose', a);
            this.setState({
                topView: "topView",
                moreIcon: "iconBox",
                topClose: "hide",
                topViewBack: " ",
            });
            if (this.state.topIcon1 == "iconBox-bigIn" && this.state.topIcon2 == "iconBox-bigIn") {
                this.setState({
                    topIcon1: "iconBoxIn",
                    topIcon2: "iconBoxIn",
                });
            }
            else if (this.state.topIcon1 == "iconBox-bigIn") {
                this.setState({
                    topIcon1: "iconBoxIn",
                    topIcon2: "iconBox",
                });
            }
            else if (this.state.topIcon1 == "iconBox-bigIn") {
                this.setState({
                    topIcon1: "iconBox",
                    topIcon2: "iconBoxIn",
                });
            }
            else {
                this.setState({
                    topIcon1: "iconBox",
                    topIcon2: "iconBox",
                    topIcon3: "iconBox",
                    topIcon4: "iconBox",
                    topIcon5: "iconBox",
                });
            }
        }
        switchMark(a, bInfo) {
            console.log('switchMark', a);
            if (a == "��ͨ") {
                if (this.state.topIcon1 == "iconBoxIn" || this.state.topIcon1 == "iconBox-bigIn") {
                    if (this.state.topView == "topView-big") {
                        this.setState({
                            topIcon1: "iconBox-big",
                        });
                    }
                    else {
                        this.setState({
                            topIcon1: "iconBox",
                        });
                    }
                    this.globalAction.switchMark(a, 0);
                }
                else {
                    if (this.state.topView == "topView-big") {
                        this.setState({
                            topIcon1: "iconBox-bigIn",
                        });
                    }
                    else {
                        this.setState({
                            topIcon1: "iconBoxIn",
                        });
                    }
                    this.globalAction.switchMark(a, 1);
                }
            }
            else if (a == "��Ȧ") {
                if (this.state.topIcon2 == "iconBoxIn" || this.state.topIcon2 == "iconBox-bigIn") {
                    if (this.state.topView == "topView-big") {
                        this.setState({
                            topIcon2: "iconBox-big",
                        });
                    }
                    else {
                        this.setState({
                            topIcon2: "iconBox",
                        });
                    }
                    this.globalAction.switchMark(a, 0);
                }
                else {
                    if (this.state.topView == "topView-big") {
                        this.setState({
                            topIcon2: "iconBox-bigIn",
                        });
                    }
                    else {
                        this.setState({
                            topIcon2: "iconBoxIn",
                        });
                    }
                    this.globalAction.switchMark(a, 1);
                }
            }
            else if (a == "������") {
                if (this.state.topIcon3 == "iconBox-big") {
                    this.setState({
                        topIcon3: "iconBox-bigIn",
                        topIcon3info: 1,
                    });
                    this.globalAction.switchMark(a, 1);
                }
                else {
                    this.setState({
                        topIcon3: "iconBox-big",
                        topIcon3info: 0,
                    });
                    this.globalAction.switchMark(a, 0);
                }
            }
            else if (a == "ȫ��") {
                if (this.state.topIcon4 == "iconBox-big") {
                    this.setState({
                        topIcon4: "iconBox-bigIn",
                        topIcon4info: 1,
                    });
                    this.globalAction.switchMark(a, 1);
                }
                else {
                    this.setState({
                        topIcon4: "iconBox-big",
                        topIcon4info: 0,
                    });
                    this.globalAction.switchMark(a, 0);
                }
            }
            else if (a == "ͣ����") {
                if (this.state.topIcon5 == "iconBox-big") {
                    this.setState({
                        topIcon5: "iconBox-bigIn",
                        topIcon5info: 1,
                    });
                    this.globalAction.switchMark(a, 1);
                }
                else {
                    this.setState({
                        topIcon5: "iconBox-big",
                        topIcon5info: 0,
                    });
                    this.globalAction.switchMark(a, 0);
                }
            }
        }
        render() {
            return (React.createElement("div", { className: this.state.topViewBack },
                React.createElement("div", { className: this.state.topView },
                    React.createElement("div", { className: this.state.topIcon1, onClick: this.switchMark.bind(this, "��ͨ") },
                        React.createElement("span", { className: "iconfont", style: { "fontSize": "5rem" } }, "\uE7FA"),
                        React.createElement("p", null, "\uFFFD\uFFFD\u0368")),
                    React.createElement("div", { className: this.state.topIcon2, onClick: this.switchMark.bind(this, "��Ȧ") },
                        React.createElement("span", { className: "iconfont", style: { "fontSize": "5rem" } }, "\uE7FA"),
                        React.createElement("p", null, "\uFFFD\uFFFD\u0226")),
                    React.createElement("div", { className: this.state.moreIcon, onClick: this.moreIcon.bind(this, 10) },
                        React.createElement("span", { className: "iconfont", style: { "fontSize": "5rem" } }, "\uE7FA"),
                        React.createElement("p", null, "\uFFFD\uFFFD\uFFFD\uFFFD")),
                    React.createElement("div", { className: this.state.topIcon3, onClick: this.switchMark.bind(this, "������") },
                        React.createElement("span", { className: "iconfont", style: { "fontSize": "5rem" } }, "\uE7FA"),
                        React.createElement("p", null, "\uFFFD\uFFFD\uFFFD\uFFFD\uFFFD\uFFFD")),
                    React.createElement("div", { className: this.state.topIcon4, onClick: this.switchMark.bind(this, "ȫ��") },
                        React.createElement("span", { className: "iconfont", style: { "fontSize": "5rem" } }, "\uE7FA"),
                        React.createElement("p", null, "\u022B\uFFFD\uFFFD")),
                    React.createElement("div", { className: this.state.topIcon5, onClick: this.switchMark.bind(this, "ͣ����") },
                        React.createElement("span", { className: "iconfont", style: { "fontSize": "5rem" } }, "\uE7FA"),
                        React.createElement("p", null, "\u0363\uFFFD\uFFFD\uFFFD\uFFFD")),
                    React.createElement("div", { className: this.state.topClose, onClick: this.topClose.bind(this, 10) },
                        React.createElement("span", { className: "iconfont", style: { "fontSize": "3rem" } }, "\uE7FA"))),
                React.createElement(RouterDOM.Link, { to: "/narrate" },
                    React.createElement("div", { className: "playIconbox" },
                        React.createElement("div", { className: this.state.playIcon },
                            React.createElement("span", { className: "iconfont", style: { "fontSize": "5rem" } }, "\uE7FA"),
                            React.createElement("p", null, "\uFFFD\uFFFD\uFFFD\uFFFD"))))));
        }
    }
    class FoldBtn extends React.Component {
        constructor(props) {
            super(props);
            this.state = {
                foleIcon: "foleIcon",
                foldView: "foldView-part"
            };
        }
        toggleFold() {
            if (this.state.foldView == "foldView") {
                this.setState({
                    foldView: " foldView-part"
                });
            }
            else {
                this.setState({
                    foldView: "foldView"
                });
            }
        }
        render() {
            return (React.createElement("div", { className: this.state.foldView },
                React.createElement("div", { className: "foleBtn", onClick: this.toggleFold.bind(this) },
                    React.createElement("span", { style: { "fontSize": "5rem" } }, "--")),
                React.createElement("div", { className: "foleIconbox" },
                    React.createElement(RouterDOM.Link, { to: "/parkCompany" },
                        React.createElement("div", { className: this.state.foleIcon },
                            React.createElement("span", { className: "iconfont", style: { "fontSize": "5rem" } }, "\uE7FA"),
                            React.createElement("p", null, "\u0530\uFFFD\uFFFD\uFFFD\uFFFD\u04B5"))),
                    React.createElement(RouterDOM.Link, { to: "/findLease" },
                        React.createElement("div", { className: this.state.foleIcon },
                            React.createElement("span", { className: "iconfont", style: { "fontSize": "5rem" } }, "\uE7FA"),
                            React.createElement("p", null, "\uFFFD\uFFFD\uFFFD\uFFFD\uFFFD\u046F"))),
                    React.createElement(RouterDOM.Link, { to: "/photograph" },
                        React.createElement("div", { className: this.state.foleIcon },
                            React.createElement("span", { className: "iconfont", style: { "fontSize": "5rem" } }, "\uE7FA"),
                            React.createElement("p", null, "\uFFFD\uFFFD\uFFFD\uFFFD\uFFFD\uFFFD"))),
                    React.createElement(RouterDOM.Link, { to: "/applyPut" },
                        React.createElement("div", { className: this.state.foleIcon },
                            React.createElement("span", { className: "iconfont", style: { "fontSize": "5rem" } }, "\uE7FA"),
                            React.createElement("p", null, "\uFFFD\u06B5\uFFFD\uFFFD\uFFFD\uFFFD\uFFFD"))),
                    React.createElement(RouterDOM.Link, { to: "/bookSite" },
                        React.createElement("div", { className: this.state.foleIcon },
                            React.createElement("span", { className: "iconfont", style: { "fontSize": "5rem" } }, "\uE7FA"),
                            React.createElement("p", null, "\uFFFD\uFFFD\uFFFD\uFFFD\u0524\uFFFD\uFFFD"))),
                    React.createElement(RouterDOM.Link, { to: "/repairsOnline" },
                        React.createElement("div", { className: this.state.foleIcon },
                            React.createElement("span", { className: "iconfont", style: { "fontSize": "5rem" } }, "\uE7FA"),
                            React.createElement("p", null, "\uFFFD\uFFFD\uFFFD\u07F1\uFFFD\uFFFD\uFFFD"))),
                    React.createElement(RouterDOM.Link, { to: "/parking" },
                        React.createElement("div", { className: this.state.foleIcon },
                            React.createElement("span", { className: "iconfont", style: { "fontSize": "5rem" } }, "\uE7FA"),
                            React.createElement("p", null, "\u0363\uFFFD\uFFFD\u04B5\uFFFD\uFFFD"))))));
        }
    }
    exports.default = Home;
});
define("parkCompany", ["require", "exports", "react", "react-router-dom", "compat"], function (require, exports, React, RouterDOM, compat_2) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    class ParkCompany extends React.Component {
        constructor(props) {
            super(props);
            this.state = {
                parkCompanycss: "parkCompany",
                showList: true,
                showInfo: false,
            };
            ParkCompany.toggleView = this.toggleView.bind(this);
        }
        static toggleView(a, e, n) { }
        ;
        toggleView(a, e, n) {
            console.log("ff", a);
            console.log("ff", e);
            console.log("ff", n);
            if (a == "Info") {
                this.setState({
                    showList: false,
                    showInfo: true,
                });
            }
            else {
                this.setState({
                    showList: true,
                    showInfo: false,
                });
            }
        }
        render() {
            return (React.createElement("div", { className: this.state.parkCompanycss },
                React.createElement("p", { className: "companyInfotit" },
                    React.createElement(RouterDOM.Link, { to: "/home" },
                        React.createElement("span", { className: "iconfont companyInfoicon" }, "\uE7FA")),
                    React.createElement("span", null, "\u56ED\u533A\u4F01\u4E1A")),
                React.createElement("div", { className: this.state.showList == true ? "show" : "hide" },
                    React.createElement(CompanyList, null)),
                React.createElement("div", { className: this.state.showInfo == true ? "show" : "hide" },
                    React.createElement(CompanyInfo, null))));
        }
    }
    class CompanyList extends React.Component {
        constructor(props) {
            super(props);
            this.globalAction = new compat_2.default();
            this.state = {
                companyListcss: "companyList-part",
                foleBtn: "foleBtn",
                indexOf: 0,
                companyBtn: "companyBtn-part",
                companyul: "companyul",
                companyData: [
                    {
                        name: "浙江永拓信息科技有限公司1", address: "E座B区-3F-301",
                        id: "id-01", url: "./mPark/image/pin-blue.png", type: "科技服务"
                    },
                    {
                        name: "浙江永拓信息科技有限公司2", address: "E座B区-3F-302",
                        id: "id-02", url: "./mPark/image/pin-blue.png", type: "科技服务"
                    },
                    {
                        name: "浙江永拓信息科技有限公司3", address: "E座B区-3F-303",
                        id: "id-03", url: "./mPark/image/pin-blue.png", type: "科技服务"
                    },
                    {
                        name: "浙江永拓信息科技有限公司1", address: "E座B区-3F-301",
                        id: "id-01", url: "./mPark/image/pin-blue.png", type: "科技服务"
                    },
                    {
                        name: "浙江永拓信息科技有限公司1", address: "E座B区-3F-301",
                        id: "id-01", url: "./mPark/image/pin-blue.png", type: "科技服务"
                    }, ,
                    {
                        name: "浙江永拓信息科技有限公司1", address: "E座B区-3F-301",
                        id: "id-01", url: "./mPark/image/pin-blue.png", type: "科技服务"
                    }, ,
                    {
                        name: "浙江永拓信息科技有限公司1", address: "E座B区-3F-301",
                        id: "id-01", url: "./mPark/image/pin-blue.png", type: "科技服务"
                    }, ,
                    {
                        name: "浙江永拓信息科技有限公司1", address: "E座B区-3F-301",
                        id: "id-01", url: "./mPark/image/pin-blue.png", type: "科技服务"
                    }, ,
                    {
                        name: "浙江永拓信息科技有限公司1", address: "E座B区-3F-301",
                        id: "id-01", url: "./mPark/image/pin-blue.png", type: "科技服务"
                    },
                ],
                companyType: [
                    { name: "高新技术", id: "id-高新技术" },
                    { name: "科技服务", id: "id-科技服务" },
                    { name: "文化创意", id: "id-文化创意" },
                    { name: "金融保险", id: "id-金融保险" },
                    { name: "电子商务", id: "id-电子商务" },
                    { name: "贸易销售", id: "id-贸易销售" },
                    { name: "机械设备", id: "id-机械设备" },
                    { name: "休闲娱乐", id: "id-休闲娱乐" },
                    { name: "生物医药", id: "id-生物医药" },
                ],
                typeIndexof: 100,
                typeName: "全部"
            };
            this.showInfo = this.showInfo.bind(this);
        }
        showInfo(a, e, n) {
            ParkCompany.toggleView(a, e, n);
            CompanyInfo.companyInfo(e);
        }
        toggleFold() {
            console.log("tftft");
            if (this.state.companyListcss == "companyList-all") {
                this.setState({
                    companyListcss: "companyList-part",
                    companyul: "companyul"
                });
            }
            else {
                this.setState({
                    companyListcss: "companyList-all",
                    companyul: "companyul-all"
                });
            }
        }
        foldBtn() {
            console.log("foldBtn");
            if (this.state.companyBtn == "companyBtn-part") {
                this.setState({
                    companyBtn: "companyBtn-all"
                });
            }
            else {
                this.setState({
                    companyBtn: "companyBtn-part"
                });
            }
        }
        companyActive(data, id) {
            console.log("active", data);
            this.setState({
                indexOf: data,
            });
            this.globalAction.switchRoom(id);
        }
        typeActive(indexof, name, id) {
            console.log("typeActive", indexof);
            console.log("typeActive", name);
            console.log("typeActive", id);
            this.setState({
                typeIndexof: indexof,
                typeName: name,
            });
        }
        render() {
            return (React.createElement("div", { className: this.state.companyListcss },
                React.createElement("div", { className: "foleBtn", onClick: this.toggleFold.bind(this) },
                    React.createElement("span", { style: { "fontSize": "5rem" } }, "--")),
                React.createElement("ul", { className: this.state.companyul }, this.state.companyData.map((i, index) => {
                    return (React.createElement("li", { onClick: this.companyActive.bind(this, index, i.id), className: this.state.indexOf == index ? "companyli-active" : "companyli" },
                        React.createElement("div", { className: "companyImgback" },
                            React.createElement("img", { src: i.url })),
                        React.createElement("div", { className: "companyul-middle" },
                            React.createElement("p", { className: this.state.indexOf == index ? "companyName-active" : "companyName", style: { "font-size": "2.4rem", "font-weight": "bold" } }, i.name),
                            React.createElement("p", { style: { "font-size": "2.5rem" } },
                                React.createElement("span", { className: "iconfont", style: { "fontSize": "3rem" } }, "\uE7FA"),
                                i.address)),
                        React.createElement("div", { className: "companyul-right" },
                            React.createElement("p", { onClick: this.showInfo.bind(this, "Info", i.id) }, "\u66F4\u591A >"),
                            React.createElement("p", { className: this.state.indexOf == index ? "companyType-active" : "companyType" }, i.type))));
                })),
                React.createElement("form", null,
                    React.createElement("div", { className: this.state.companyBtn },
                        React.createElement("div", { className: "searchBox" },
                            React.createElement("span", { className: "searchBox-text" },
                                React.createElement("span", { className: "iconfont", style: { "fontSize": "3rem" } }, "\uE7FA"),
                                React.createElement("input", { className: "companySearch", type: "text", placeholder: "\u8BF7\u8F93\u5165\u4F01\u4E1A\u540D\u79F0" })),
                            React.createElement("span", { onClick: this.foldBtn.bind(this), className: "searchBox-type" },
                                this.state.typeName,
                                " ",
                                React.createElement("span", { className: "iconfont", style: { "fontSize": "3rem" } }, "\uE7FA"))),
                        React.createElement("ul", { className: "companyTypeul" },
                            React.createElement("li", { className: this.state.typeIndexof == 100 ? "companyTypeli-active" : "companyTypeli", onClick: this.typeActive.bind(this, 100, "全部", "id-全部"), style: { "width": "12rem" } }, "\u5168\u90E8"),
                            this.state.companyType.map((i, index) => {
                                return (React.createElement("li", { onClick: this.typeActive.bind(this, index, i.name, i.id), className: this.state.typeIndexof == index ? "companyTypeli-active" : "companyTypeli" }, i.name));
                            })),
                        React.createElement("span", { className: "searchBtn" }, "\u641C\u7D22")))));
        }
    }
    class CompanyInfo extends React.Component {
        constructor(props) {
            super(props);
            this.state = {
                companyInfocss: "companyInfo",
                companyName: "浙江永拓信息科技有限公司",
                companyInfoul: "companyInfoul",
                infoli: 0,
            };
            this.showList = this.showList.bind(this);
            CompanyInfo.companyInfo = this.companyInfo.bind(this);
        }
        static companyInfo(data) { }
        companyInfo(data) {
            this.setState({
                companyId: data
            });
        }
        showList(a, e, n) {
            ParkCompany.toggleView(a, e, n);
        }
        toggleFold() {
            console.log("tftft");
            if (this.state.companyInfocss == "companyInfo") {
                this.setState({
                    companyInfocss: "companyInfo-part",
                });
            }
            else {
                this.setState({
                    companyInfocss: "companyInfo",
                });
            }
        }
        infoClick(indexof) {
            console.log("infoClick", indexof);
            this.setState({
                infoli: indexof,
            });
        }
        render() {
            return (React.createElement("div", null,
                React.createElement("p", { className: "companyInfotit" },
                    React.createElement("span", { className: "iconfont companyInfoicon", onClick: this.showList.bind(this, "List", "id-01") }, "\uE7FA"),
                    React.createElement("span", null, this.state.companyName)),
                React.createElement("div", { className: this.state.companyInfocss },
                    React.createElement("div", { className: "foleBtn", onClick: this.toggleFold.bind(this) },
                        React.createElement("span", { style: { "fontSize": "5rem" } }, "--")),
                    React.createElement("ul", { className: this.state.companyInfoul },
                        React.createElement("li", { className: this.state.infoli == 0 ? "companyInfoli-active" : "companyInfoli", onClick: this.infoClick.bind(this, 0) }, "\u4F01\u4E1A\u4FE1\u606F"),
                        React.createElement("li", { className: this.state.infoli == 1 ? "companyInfoli-active" : "companyInfoli", onClick: this.infoClick.bind(this, 1) }, "\u4F01\u4E1A\u98CE\u91C7"),
                        React.createElement("li", { className: this.state.infoli == 2 ? "companyInfoli-active" : "companyInfoli", onClick: this.infoClick.bind(this, 2) }, "\u4F01\u4E1A\u8BE6\u60C5"),
                        React.createElement("li", { className: this.state.infoli == 3 ? "companyInfoli-active" : "companyInfoli", onClick: this.infoClick.bind(this, 3) }, "\u4EA7\u54C1\u5C55\u793A")),
                    React.createElement("div", { className: "infoContain" },
                        React.createElement("div", { className: this.state.infoli == 0 ? "show" : "hide" },
                            React.createElement(CompanyInfos, null)),
                        React.createElement("div", { className: this.state.infoli == 1 ? "show" : "hide" },
                            React.createElement(Mien, null)),
                        React.createElement("div", { className: this.state.infoli == 2 ? "show" : "hide" },
                            React.createElement(Details, null)),
                        React.createElement("div", { className: this.state.infoli == 3 ? "show" : "hide" },
                            React.createElement(Product, null))))));
        }
    }
    class CompanyInfos extends React.Component {
        constructor(props) {
            super(props);
            this.state = {
                imgurl: "./mPark/image/pin-blue.png",
                name: "浙江永拓信息科技有限公司",
                address: "桂林市信息产业园E座B区3F",
                type: "科技服务",
                man: "XXX",
                tel: "155578383040",
                http: "www.yongtoc.com"
            };
        }
        componentDidMount() {
        }
        render() {
            return (React.createElement("div", { className: "infos" },
                React.createElement("img", { src: this.state.imgurl }),
                React.createElement("div", { className: "ifosRight" },
                    React.createElement("h4", { className: "infos-1" },
                        this.state.name,
                        " "),
                    React.createElement("h5", { className: "infos-2" },
                        React.createElement("span", { className: "iconfont", style: { "fontSize": "3rem" } }, "\uE7FA"),
                        this.state.address),
                    React.createElement("p", { className: "infos-3" }, this.state.type),
                    React.createElement("p", { className: "infos-4" },
                        React.createElement("span", null, "\u8054\u7CFB\u4EBA"),
                        React.createElement("span", null, this.state.man)),
                    React.createElement("p", { className: "infos-5" },
                        React.createElement("span", null, "\u8054\u7CFB\u7535\u8BDD"),
                        React.createElement("span", null, this.state.tel)),
                    React.createElement("p", { className: "infos-6" },
                        React.createElement("span", null, "\u4F01\u4E1A\u5B98\u7F51"),
                        React.createElement("span", null, this.state.http)))));
        }
    }
    class Mien extends React.Component {
        constructor(props) {
            super(props);
            this.state = {
                mienImg: [
                    { url: "./mPark/image/i.png" },
                    { url: "./mPark/image/i.png" },
                    { url: "./mPark/image/i.png" },
                    { url: "./mPark/image/i.png" },
                    { url: "./mPark/image/i.png" },
                    { url: "./mPark/image/i.png" },
                ]
            };
        }
        componentDidMount() {
        }
        render() {
            return (React.createElement("div", { className: "mien" },
                React.createElement("ul", null, this.state.mienImg.map((i, index) => {
                    return (React.createElement("li", null,
                        React.createElement("img", { src: i.url })));
                }))));
        }
    }
    class Details extends React.Component {
        constructor(props) {
            super(props);
            this.state = {
                text: "浙江永拓信息科技有限公司是浙江永拓实业有限公司旗下的控股子公司。    公司由计算机图形学、计算机应用学、物联网技术等三方面专家组成，是一家专注于以3D为展现方式， 解决物理空间关系的技术提供商，致力于成为全球领先3D可视化企业，为客户和合作伙伴全面提供3D可视化技术的服务，实现其业务的差异化竞争优势。   "
            };
        }
        componentDidMount() {
        }
        render() {
            return (React.createElement("div", { className: "details" },
                React.createElement("p", null, this.state.text)));
        }
    }
    class Product extends React.Component {
        constructor(props) {
            super(props);
            this.state = {
                productImg: [
                    { url: "./mPark/image/i.png" },
                    { url: "./mPark/image/i.png" },
                    { url: "./mPark/image/i.png" },
                    { url: "./mPark/image/i.png" },
                    { url: "./mPark/image/i.png" },
                    { url: "./mPark/image/i.png" },
                ]
            };
        }
        componentDidMount() {
        }
        render() {
            return (React.createElement("div", { className: "product" },
                React.createElement("ul", null, this.state.productImg.map((i, index) => {
                    return (React.createElement("li", null,
                        React.createElement("img", { src: i.url })));
                }))));
        }
    }
    exports.default = ParkCompany;
});
define("photograph", ["require", "exports", "react", "react-router-dom"], function (require, exports, React, RouterDOM) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    class Photograph extends React.Component {
        constructor(props) {
            super(props);
            this.state = {
                Photographcss: "photograph",
                showList: true,
                showInfo: false,
                showLoad: false,
            };
            Photograph.toggleView = this.toggleView.bind(this);
        }
        static toggleView(a, e, n) { }
        ;
        toggleView(a, e, n) {
            console.log("fp", a);
            console.log("fp", e);
            console.log("fp", n);
            if (a == "Info") {
                console.log("INFO");
                this.setState({
                    showList: false,
                    showInfo: true,
                    showLoad: false,
                });
            }
            else if (a == "Load") {
                console.log("LOAD");
                this.setState({
                    showList: false,
                    showInfo: false,
                    showLoad: true,
                });
            }
            else {
                console.log("other");
                this.setState({
                    showList: true,
                    showInfo: false,
                    showLoad: false,
                });
            }
        }
        render() {
            return (React.createElement("div", { className: this.state.Photographcss },
                React.createElement("p", { className: "companyInfotit" },
                    React.createElement(RouterDOM.Link, { to: "/home" },
                        React.createElement("span", { className: "iconfont companyInfoicon" }, "\uE7FA")),
                    React.createElement("span", null, "\u968F\u624B\u62CD")),
                React.createElement("div", { className: this.state.showList == true ? "show" : "hide" },
                    React.createElement(IllegalList, null)),
                React.createElement("div", { className: this.state.showInfo == true ? "show" : "hide" },
                    React.createElement(IllegalInfo, null)),
                React.createElement("div", { className: this.state.showLoad == true ? "show" : "hide" },
                    React.createElement(IllegalUpload, null))));
        }
    }
    exports.default = Photograph;
    class IllegalList extends React.Component {
        constructor(props) {
            super(props);
            this.state = {
                illegalListcss: "illegalList-part",
                indexOf: 0,
                illegalul: "illegalul",
                illegalList: [
                    {
                        url: "./mPark/image/i.png",
                        type: "非停车位路侧停车1",
                        name: "桂C123456",
                        time: "2020-01-21 10:59:15",
                        address: "A座大门旁",
                    },
                    {
                        url: "./mPark/image/i.png",
                        type: "非停车位路侧停车2",
                        name: "桂C123456",
                        time: "2020-01-21 10:59:15",
                        address: "A座大门旁",
                    },
                    {
                        url: "./mPark/image/i.png",
                        type: "非停车位路侧停车3",
                        name: "桂C123456",
                        time: "2020-01-21 10:59:15",
                        address: "A座大门旁",
                    },
                    {
                        url: "./mPark/image/i.png",
                        type: "非停车位路侧停车4",
                        name: "桂C123456",
                        time: "2020-01-21 10:59:15",
                        address: "A座大门旁",
                    }, {
                        url: "./mPark/image/i.png",
                        type: "非停车位路侧停车1",
                        name: "桂C123456",
                        time: "2020-01-21 10:59:15",
                        address: "A座大门旁",
                    }, {
                        url: "./mPark/image/i.png",
                        type: "非停车位路侧停车1",
                        name: "桂C123456",
                        time: "2020-01-21 10:59:15",
                        address: "A座大门旁",
                    }, {
                        url: "./mPark/image/i.png",
                        type: "非停车位路侧停车1",
                        name: "桂C123456",
                        time: "2020-01-21 10:59:15",
                        address: "A座大门旁",
                    }, {
                        url: "./mPark/image/i.png",
                        type: "非停车位路侧停车1",
                        name: "桂C123456",
                        time: "2020-01-21 10:59:15",
                        address: "A座大门旁",
                    }, {
                        url: "./mPark/image/i.png",
                        type: "非停车位路侧停车1",
                        name: "桂C123456",
                        time: "2020-01-21 10:59:15",
                        address: "A座大门旁",
                    },
                ],
            };
        }
        componentDidMount() {
        }
        showPart(a, e, n) {
            Photograph.toggleView(a, e, n);
        }
        toggleFold() {
            console.log("tftft", this.state.illegalListcss);
            if (this.state.illegalListcss == "illegalList-part") {
                this.setState({
                    illegalListcss: "illegalList-all",
                    illegalul: "illegalul-all"
                });
            }
            else {
                this.setState({
                    illegalListcss: "illegalList-part",
                    illegalul: "illegalul"
                });
            }
        }
        illegalActive(indexof, name, id) {
            console.log("illegalActive", indexof);
            console.log("illegalActive", name);
            console.log("illegalActive", id);
            this.setState({
                indexOf: indexof,
            });
        }
        render() {
            return (React.createElement("div", null,
                React.createElement("div", { className: this.state.illegalListcss },
                    React.createElement("div", { className: "foleBtn", onClick: this.toggleFold.bind(this) },
                        React.createElement("span", { style: { "fontSize": "5rem" } }, "--")),
                    React.createElement("ul", { className: this.state.illegalul }, this.state.illegalList.map((i, index) => {
                        return (React.createElement("li", { onClick: this.illegalActive.bind(this, index), className: this.state.indexOf == index ? "illegalli-active" : "illegalli" },
                            React.createElement("div", { className: "illegamgback" },
                                React.createElement("img", { src: i.url })),
                            React.createElement("div", { className: "illegalul-middle " },
                                React.createElement("p", { className: this.state.indexOf == index ? "illegalType-active" : "illegalType", style: { "font-size": "2.4rem" } }, i.type),
                                React.createElement("p", { style: { "font-size": "2.3rem" } }, i.time),
                                React.createElement("p", { style: { "font-size": "2.3rem" } },
                                    React.createElement("span", { className: "iconfont", style: { "fontSize": "3rem", "margin-right": "1rem" } }, "\uE7FA"),
                                    i.name),
                                React.createElement("p", { style: { "font-size": "2.3rem" } },
                                    React.createElement("span", { className: "iconfont", style: { "fontSize": "3rem", "margin-right": "1rem" } }, "\uE7FA"),
                                    i.address),
                                React.createElement("p", { onClick: this.showPart.bind(this, "Info", "i.id"), style: { "font-size": "2.3rem", "float": "right", "color": "#fff" } }, "\u66F4\u591A >"))));
                    })),
                    React.createElement("div", { className: "illBottombox" },
                        React.createElement("div", { className: "illsearchBox" },
                            React.createElement("span", { className: "searchBox-text" },
                                React.createElement("span", { className: "iconfont", style: { "fontSize": "3rem" } }, "\uE7FA"),
                                React.createElement("input", { className: "companySearch", type: "text", placeholder: "\u8BF7\u8F93\u5165\u8F66\u724C\u53F7" })))),
                    React.createElement("span", { className: "illegalLoadBtn", onClick: this.showPart.bind(this, "Load") }, "\u968F\u624B\u62CD"))));
        }
    }
    class IllegalUpload extends React.Component {
        constructor(props) {
            super(props);
            this.state = {
                illcauseBox: "hide",
                illegalLoadcss: "illegalLoad-part",
                illfrom: "illfrom-part illfrom",
                illTime: "",
                illImg: "./mPark/image/i.png",
                illcauseUL: [
                    { name: "非停车位路侧停车", id: "原因01" },
                    { name: "阻挡正常车位出入", id: "原因02" },
                    { name: "阻塞主要出入口", id: "原因03" },
                    { name: "占用多个车位", id: "原因04" },
                    { name: "非地库占用地库", id: "原因05" },
                    { name: "非地库占用地库2", id: "原因05" },
                    { name: "非地库占用地库3", id: "原因05" },
                    { name: "非地库占用地库4", id: "原因05" },
                ],
                indexOf: 0,
                illcauseInname: "",
                illcauseInid: "",
            };
        }
        componentDidMount() {
        }
        showList(a, e, n) {
            Photograph.toggleView(a, e, n);
            this.setState({});
        }
        toggleFold() {
            console.log("tftft");
            if (this.state.illegalLoadcss == "illegalLoad-all") {
                this.setState({
                    illegalLoadcss: "illegalLoad-part",
                    illfrom: "illfrom-part illfrom"
                });
            }
            else {
                this.setState({
                    illegalLoadcss: "illegalLoad-all",
                    illfrom: "illfrom-all illfrom"
                });
            }
        }
        illimginputClick() {
            console.log("2323", this);
        }
        illimgClick() {
            this.illimginputClick();
        }
        hideillcauseUL() {
            console.log("showloadUL");
            this.setState({
                illcauseBox: "hide",
                illcauseInname: "",
                illcauseInid: "",
            });
        }
        illCuased(i, d, n) {
            this.setState({
                illcauseInname: n,
                illcauseInid: d,
                indexOf: i,
            });
        }
        getillcause() {
            this.setState({
                illcauseBox: "hide"
            });
        }
        showillcauseUL() {
            this.setState({
                illcauseBox: "illcauseBox"
            });
        }
        sumbitIllfrom() {
            console.log("from", this.state);
        }
        render() {
            return (React.createElement("div", null,
                React.createElement("p", { className: "companyInfotit" },
                    React.createElement("span", { className: "iconfont companyInfoicon", onClick: this.showList.bind(this, "List", "i.id") }, "\uE7FA"),
                    React.createElement("span", null, "\u968F\u624B\u62CD")),
                React.createElement("div", { className: this.state.illegalLoadcss },
                    React.createElement("div", { className: "foleBtn", onClick: this.toggleFold.bind(this) },
                        React.createElement("span", { style: { "fontSize": "5rem" } }, "--")),
                    React.createElement("form", { className: this.state.illfrom },
                        React.createElement("p", null,
                            React.createElement("span", { className: "redStar" }, "*"),
                            " \u8FDD\u89C4\u7167\u7247",
                            React.createElement("input", { type: "file", accept: "image/*", className: "getillImg", value: "", onClick: this.illimginputClick.bind(this), style: { "opacity": "0", "position": "absolute", "right": "-16rem" } }),
                            React.createElement("img", { src: this.state.illImg, onClick: this.illimgClick.bind(this) })),
                        React.createElement("p", null,
                            React.createElement("span", { className: "redStar" }, "*"),
                            " \u66DD\u5149\u7C7B\u578B",
                            React.createElement("input", { type: "text", className: "getillType", value: this.state.illcauseInname, placeholder: "\u8BF7\u9009\u62E9\u66DD\u5149\u7C7B\u578B" }),
                            React.createElement("span", { className: "iconfont", style: { "fontSize": "3rem", "float": "right", " padding": " 0 0 0 3rem", "padding": " 0 0 0 4rem" }, onClick: this.showillcauseUL.bind(this) }, "\uE7FA")),
                        React.createElement("p", null,
                            React.createElement("span", { className: "redStar" }, "*"),
                            "  \u5730\u5740",
                            React.createElement("input", { type: "text", value: "", className: "getillAdd", placeholder: "\u8BF7\u70B9\u51FB\u5730\u56FE\u9009\u62E9\u8FDD\u7AE0\u70B9" }),
                            React.createElement("span", { className: "iconfont", style: { "fontSize": "3rem", "color": "#0B8BF0", "float": "right", "padding": " 0 0 0 4rem" } }, "\uE7FA")),
                        React.createElement("p", null,
                            React.createElement("span", { className: "redStar" }, "*"),
                            " \u8F66\u724C",
                            React.createElement("input", { type: "text", value: "", className: "getillNum", placeholder: "\u8BF7\u8F93\u5165\u8FDD\u89C4\u8F66\u724C\u53F7" })),
                        React.createElement("p", null,
                            React.createElement("span", { className: "redStar" }, "*"),
                            " \u66DD\u5149\u65F6\u95F4",
                            React.createElement("input", { type: "datetime", className: "getillTime", value: "", placeholder: "\u8BF7\u8F93\u5165\u8FDD\u89C4\u65F6\u95F4" })),
                        React.createElement("div", { className: "illTxt" },
                            React.createElement("p", null,
                                React.createElement("span", { className: "redStar" }, "*"),
                                " \u8FDD\u89C4\u63CF\u8FF0"),
                            React.createElement("textarea", { className: "getilltextarea", value: "", placeholder: "\u8BF7\u5C06\u8FDD\u89C4\u95EE\u9898\u63CF\u8FF0\u51FA\u6765\u3002\uFF08120\u5B57\u5185\uFF09" })),
                        React.createElement("div", { className: "illSumbit", onClick: this.sumbitIllfrom.bind(this) }, "\u63D0\u4EA4"))),
                React.createElement("div", { className: this.state.illcauseBox },
                    React.createElement("ul", { className: "illcauseULcss" }, this.state.illcauseUL.map((i, index) => {
                        return (React.createElement("li", { className: this.state.indexOf == index ? "illcauseli-active" : "illcauseli", onClick: this.illCuased.bind(this, index, i.id, i.name) }, i.name));
                    })),
                    React.createElement("div", { className: "illCuasedBtn" },
                        React.createElement("span", { className: "illCancel", onClick: this.hideillcauseUL.bind(this) }, "\u53D6\u6D88"),
                        React.createElement("span", { className: "illConfirm", onClick: this.getillcause.bind(this) }, "\u786E\u8BA4")))));
        }
    }
    class IllegalInfos extends React.Component {
        constructor(props) {
            super(props);
            this.state = {
                IllegalLoadcss: "illegalLoad-part"
            };
        }
        componentDidMount() {
        }
        showList(a, e, n) {
            Photograph.toggleView(a, e, n);
            this.setState({
                IllegalLoadcss: "illegalLoad-part",
            });
        }
        showLoad(a, e, n) {
            console.log("tftft");
            if (this.state.IllegalLoadcss == "illegalLoad") {
                this.setState({
                    IllegalLoadcss: "illegalLoad-part",
                });
            }
            else {
                this.setState({
                    IllegalLoadcss: "illegalLoad",
                });
            }
            Photograph.toggleView(a, e, n);
        }
        render() {
            return (React.createElement("div", { className: "illegalInfos" },
                React.createElement("p", null, "\u975E\u505C\u8F66\u4F4D\u8DEF\u4FA7\u505C\u8F66"),
                React.createElement("p", null, "2020-01-21 10:59:15"),
                React.createElement("p", null,
                    React.createElement("span", { className: "iconfont", style: { "fontSize": "3rem" } }, "\uE7FA"),
                    "\u8F66\u724C\uFF1A",
                    React.createElement("span", null, "\u6842C123456")),
                React.createElement("p", null,
                    React.createElement("span", { className: "iconfont", style: { "fontSize": "3rem" } }, "\uE7FA"),
                    "\u4F4D\u7F6E\uFF1A",
                    React.createElement("span", null, "A\u5EA7\u5927\u95E8\u65C1")),
                React.createElement("p", null, "\u6A2A\u8DE8\u6591\u9A6C\u7EBF\u4E0A")));
        }
    }
    class IllegalImg extends React.Component {
        constructor(props) {
            super(props);
            this.state = {
                illegalImg: "./mPark/image/i.png",
            };
        }
        componentDidMount() {
        }
        showList(a, e, n) {
            Photograph.toggleView(a, e, n);
            this.setState({
                IllegalLoadcss: "illegalLoad-part",
            });
        }
        showLoad(a, e, n) {
            console.log("tftft");
            Photograph.toggleView(a, e, n);
        }
        render() {
            return (React.createElement("div", { className: "illegalImg" },
                React.createElement("img", { src: this.state.illegalImg })));
        }
    }
    class IllegalInfo extends React.Component {
        constructor(props) {
            super(props);
            this.state = {
                illegalInfocss: "illegalInfo-part",
                name: "桂C123456",
                infoli: 0,
            };
        }
        componentDidMount() {
        }
        showList(a, e, n) {
            Photograph.toggleView(a, e, n);
        }
        infoClick(indexof) {
            console.log("infoClick", indexof);
            this.setState({
                infoli: indexof,
            });
        }
        toggleFold() {
            console.log("tptp");
            if (this.state.illegalInfocss == "illegalInfo-part") {
                this.setState({
                    illegalInfocss: "illegalInfo-bottom",
                });
            }
            else {
                this.setState({
                    illegalInfocss: "illegalInfo-part",
                });
            }
        }
        render() {
            return (React.createElement("div", null,
                React.createElement("p", { className: "companyInfotit" },
                    React.createElement("span", { className: "iconfont companyInfoicon", onClick: this.showList.bind(this, "List", "id-01") }, "\uE7FA"),
                    React.createElement("span", null,
                        this.state.name,
                        "\u8FDD\u89C4")),
                React.createElement("div", { className: this.state.illegalInfocss },
                    React.createElement("div", { className: "foleBtn", onClick: this.toggleFold.bind(this) },
                        React.createElement("span", { style: { "fontSize": "5rem" } }, "--")),
                    React.createElement("div", { className: "leaseInfoul_br" },
                        React.createElement("ul", { className: "leaseInfoul" },
                            React.createElement("li", { className: this.state.infoli == 0 ? "leaseInfoli-active" : "leaseInfoli", onClick: this.infoClick.bind(this, 0) }, "\u8FDD\u89C4\u4FE1\u606F"),
                            React.createElement("li", { className: this.state.infoli == 1 ? "leaseInfoli-active" : "leaseInfoli", onClick: this.infoClick.bind(this, 1) }, "\u8FDD\u89C4\u7167\u7247"))),
                    React.createElement("div", { className: "leaseContain" },
                        React.createElement("div", { className: this.state.infoli == 0 ? "show" : "hide" },
                            React.createElement(IllegalInfos, null)),
                        React.createElement("div", { className: this.state.infoli == 1 ? "show" : "hide" },
                            React.createElement(IllegalImg, null))))));
        }
    }
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
define("repairsOnline", ["require", "exports", "react"], function (require, exports, React) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    class RepairsOnline extends React.Component {
        constructor(props) {
            super(props);
        }
        render() {
            return (React.createElement("div", null,
                React.createElement("div", { className: "aboutMebox" }, "RepairsOnline")));
        }
    }
    exports.default = RepairsOnline;
});
define("parking", ["require", "exports", "react"], function (require, exports, React) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    class Parking extends React.Component {
        constructor(props) {
            super(props);
        }
        render() {
            return (React.createElement("div", null,
                React.createElement("div", { className: "aboutMebox" }, "Parking")));
        }
    }
    exports.default = Parking;
});
define("narrate", ["require", "exports", "react", "react-router-dom", "css!./styles/view.css"], function (require, exports, React, RouterDOM) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    class Narrate extends React.Component {
        constructor(props) {
            super(props);
            this.state = {
                activeType: 0,
                parkAudio: [
                    { name: "԰����ͨ", url: "http://downsc.chinaz.net/Files/DownLoad/sound1/201906/11582.mp3" },
                    { name: "԰������", url: "http://downsc.chinaz.net/files/download/sound1/201206/1638.mp3" },
                    { name: "԰����ͨ", url: "http://downsc.chinaz.net/Files/DownLoad/sound1/201906/11582.mp3" },
                    { name: "԰������", url: "http://downsc.chinaz.net/files/download/sound1/201206/1638.mp3" },
                ],
                currentAudio: 0
            };
            Narrate.selfPlay = this.selfPlay.bind(this);
        }
        componentDidMount() {
            let audio = document.getElementById("audioTool");
            let audioN = 0;
            audio.onended = function () {
                console.log("��ǰ��Ƶ�����Ž���");
                audioN = audioN + 1;
                Narrate.selfPlay(audioN);
            };
            this.selfPlay(0);
        }
        static selfPlay(audioN) { }
        ;
        selfPlay(audioN) {
            console.log("selfPlay", audioN);
            let audio = document.getElementById("audioTool");
            if (audioN !== this.state.parkAudio.length) {
                let url = this.state.parkAudio[audioN].url;
                audio.src = url;
                audio.play();
            }
            else {
                audioN = 0;
                console.log("audioOver", audioN);
            }
            ;
        }
        audioClick(index, name, url) {
            console.log("handleSiblingsClick", index, name, url);
            this.setState({
                activeType: index
            });
            console.log("activeType", this.state.activeType);
            let audio = document.getElementById("audioTool");
            audio.src = url;
            audio.play();
        }
        togglePlay(a) {
            var audio = document.getElementById('audioTool');
            if (audio !== null) {
                console.log(audio.paused);
                if (audio.paused) {
                    audio.play();
                }
                else {
                    audio.pause();
                }
            }
        }
        render() {
            return (React.createElement("div", null,
                React.createElement("audio", { controls: true, id: "audioTool" },
                    React.createElement("source", { src: "" })),
                React.createElement(RouterDOM.Link, { to: "/home" },
                    React.createElement("div", { className: "narrareClose" },
                        React.createElement("span", { className: "iconfont", style: { "fontSize": "5rem", "color": "#fff" } }, "\uE7FA"))),
                React.createElement("div", { className: "narrareTitle" }, "\uFFFD\u0536\uFFFD\uFFFD\uFFFD\uFFFD\uFFFD"),
                React.createElement("div", { className: "audioBox" },
                    React.createElement("ul", { className: "flex-layout category-head" }, this.state.parkAudio.map((i, index) => {
                        return (React.createElement("li", { className: this.state.activeType == index ? "flex-active" : "flex", onClick: this.audioClick.bind(this, index, i.name, i.url), "data-index": index }, i.name));
                    })),
                    React.createElement("div", { className: "playBtn", onClick: this.togglePlay.bind(this) },
                        React.createElement("span", { className: "iconfont", style: { "fontSize": "5rem", "color": "#fff" } }, "\uE7FA")))));
        }
    }
    exports.default = Narrate;
});
define("index", ["require", "exports", "react", "react-dom", "home", "parkCompany", "photograph", "infoArea", "message", "aboutMe", "findLease", "applyPut", "bookSite", "repairsOnline", "parking", "narrate", "react-router-dom", "css!./styles/index.css"], function (require, exports, React, ReactDOM, home_1, parkCompany_1, photograph_1, infoArea_1, message_1, aboutMe_1, findLease_1, applyPut_1, bookSite_1, repairsOnline_1, parking_1, narrate_1, react_router_dom_1) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    class Index extends React.Component {
        constructor() {
            super(...arguments);
            this.state = {
                inputValue: "������԰������",
                city: "",
                parkArr: [1, 2, 3, 4, 5, 6, 7, 8, 9],
                tagArr: ["������Ϣ", "���¼���", "���̷���"]
            };
        }
        componentDidMount() {
        }
        foucus() {
            if (this.state.inputValue === "������԰������") {
                this.setState({ inputValue: "" });
            }
        }
        blur() {
            if (this.state.inputValue === "") {
                this.setState({ inputValue: "������԰������" });
            }
        }
        change(event) {
            this.setState({ inputValue: event.target.value });
        }
        render() {
            return (React.createElement("div", { className: "index" },
                React.createElement("div", { className: "index-top" }, "\uFFFD\uFFFD\uFFFD\uFFFD\u0530\uFFFD\uFFFD"),
                React.createElement("div", { className: "index-input-div" },
                    React.createElement("div", { className: "index-child-left" },
                        React.createElement("input", { className: "index-input", value: this.state.inputValue, onFocus: this.foucus.bind(this), onBlur: this.blur.bind(this), onChange: this.change.bind(this) }),
                        React.createElement("img", { src: "./mpark/image/search.png", className: "index-search-img" })),
                    React.createElement("div", { className: "index-child-right" },
                        React.createElement("span", null, this.state.city),
                        React.createElement("img", { src: "./mpark/image/bottom.png", width: "50px", height: "50px", style: { marginTop: "-10px" } }))),
                React.createElement("div", { className: "index-number" },
                    React.createElement("img", { src: "./mpark/image/tower.png", className: "tower-img" }),
                    "\uFFFD\uFFFD\uFFFD\uFFFD",
                    React.createElement("span", { style: { color: "#0B8BF0", margin: "0 15px 0 15px" } }, "15"),
                    "\uFFFD\uFFFD\u0530\uFFFD\uFFFD\uFFFD\uFFFD\uFFFD\uFFFD"),
                React.createElement("div", { className: "index-park" }, this.state.parkArr.map((item, index) => {
                    return React.createElement(react_router_dom_1.Link, { to: "/home" },
                        React.createElement("div", { className: "index-child-park", key: index },
                            React.createElement("div", { className: "index-child-park-left" },
                                React.createElement("img", { src: "./mpark/image/a.jpg", className: "park-img" })),
                            React.createElement("div", { className: "index-child-park-right" },
                                React.createElement("div", { className: "index-park-name" }, "\uFFFD\uFFFD\uFFFD\u05B9\uFFFD\uFFFD\u04B8\uFFFD\uFFFD\uFFFD\uFFFD\uFFFD\uFFFD\uFFFD\u03E2\uFFFD\uFFFD\u04B5\u0530"),
                                React.createElement("div", { className: "index-park-position" },
                                    React.createElement("img", { src: "./mpark/image/position.png", width: "45px", height: "40px", style: { marginTop: "-18px" } }),
                                    React.createElement("span", { className: "index-park-position-name" }, "\uFFFD\uFFFD\uFFFD\u05B8\uFFFD\uFFFD\uFFFD\uFFFD\uFFFD\uFFFD\uFFFD\uFFFD\uFFFD\u00B7D-12\uFFFD\uFFFD")),
                                React.createElement("div", { className: "index-tag" }, this.state.tagArr.map((item, index) => {
                                    return React.createElement("div", { key: index, className: "index-tag-child" }, item);
                                }))),
                            React.createElement("div", { className: "index-child-park-end" },
                                React.createElement("div", { className: "index-distance" }, "10.5km"))));
                }))));
        }
    }
    exports.default = Index;
    ReactDOM.render(React.createElement(react_router_dom_1.HashRouter, null,
        React.createElement(react_router_dom_1.Switch, null,
            React.createElement(react_router_dom_1.Route, { exact: true, path: "/", component: Index }),
            React.createElement(react_router_dom_1.Route, { exact: true, path: "/home", component: home_1.default }),
            React.createElement(react_router_dom_1.Route, { exact: true, path: "/parkCompany", component: parkCompany_1.default }),
            React.createElement(react_router_dom_1.Route, { exact: true, path: "/photograph", component: photograph_1.default }),
            React.createElement(react_router_dom_1.Route, { exact: true, path: "/findLease", component: findLease_1.default }),
            React.createElement(react_router_dom_1.Route, { exact: true, path: "/applyPut", component: applyPut_1.default }),
            React.createElement(react_router_dom_1.Route, { exact: true, path: "/bookSite", component: bookSite_1.default }),
            React.createElement(react_router_dom_1.Route, { exact: true, path: "/repairsOnline", component: repairsOnline_1.default }),
            React.createElement(react_router_dom_1.Route, { exact: true, path: "/parking", component: parking_1.default }),
            React.createElement(react_router_dom_1.Route, { exact: true, path: "/infoArea", component: infoArea_1.default }),
            React.createElement(react_router_dom_1.Route, { exact: true, path: "/message", component: message_1.default }),
            React.createElement(react_router_dom_1.Route, { exact: true, path: "/aboutMe", component: aboutMe_1.default }),
            React.createElement(react_router_dom_1.Route, { exact: true, path: "/narrate", component: narrate_1.default }))), document.getElementById('viewContainer'));
});

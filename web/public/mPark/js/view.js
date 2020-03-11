define("bottomBtn", ["require", "exports", "react", "react-router-dom", "css!./styles/view.css"], function (require, exports, React, RouterDOM) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    class BottomBtn extends React.Component {
        constructor(props) {
            super(props);
            this.state = {
                index: 1,
                iconImg1In: "./mPark/image/bottomBtn/3d-in.png",
                iconImg1Un: "./mPark/image/bottomBtn/3d-un.png",
                iconImg2In: "./mPark/image/bottomBtn/wq-in.png",
                iconImg2Un: "./mPark/image/bottomBtn/wq-un.png",
                iconImg3In: "./mPark/image/bottomBtn/zx-in.png",
                iconImg3Un: "./mPark/image/bottomBtn/zx-un.png",
                iconImg4In: "./mPark/image/bottomBtn/my-in.png",
                iconImg4Un: "./mPark/image/bottomBtn/my-un.png",
            };
            BottomBtn.toggleIcon = this.toggleIcon.bind(this);
        }
        static toggleIcon(data) { }
        toggleIcon(data) {
            console.log(data);
            this.setState({
                index: data
            });
        }
        render() {
            return (React.createElement("div", { className: "bottomView" },
                React.createElement(RouterDOM.Link, { to: "/home" },
                    React.createElement("div", { className: this.state.index == 1 ? "iconBox-bottomIn" : "iconBox-bottom", onClick: this.toggleIcon.bind(this, 1) },
                        React.createElement("img", { src: this.state.index == 1 ? this.state.iconImg1In : this.state.iconImg1Un }),
                        React.createElement("p", null, "3D\u6C99\u76D8"))),
                React.createElement(RouterDOM.Link, { to: "/infoArea" },
                    React.createElement("div", { className: this.state.index == 2 ? "iconBox-bottomIn" : "iconBox-bottom", onClick: this.toggleIcon.bind(this, 2) },
                        React.createElement("img", { src: this.state.index == 2 ? this.state.iconImg2In : this.state.iconImg2Un }),
                        React.createElement("p", null, "\u5FAE\u5708"))),
                React.createElement(RouterDOM.Link, { to: "/message" },
                    React.createElement("div", { className: this.state.index == 3 ? "iconBox-bottomIn" : "iconBox-bottom", onClick: this.toggleIcon.bind(this, 3) },
                        React.createElement("img", { src: this.state.index == 3 ? this.state.iconImg3In : this.state.iconImg3Un }),
                        React.createElement("p", null, "\u8D44\u8BAF"))),
                React.createElement(RouterDOM.Link, { to: "/aboutMe" },
                    React.createElement("div", { className: this.state.index == 4 ? "iconBox-bottomIn" : "iconBox-bottom", onClick: this.toggleIcon.bind(this, 4) },
                        React.createElement("img", { src: this.state.index == 4 ? this.state.iconImg4In : this.state.iconImg4Un }),
                        React.createElement("p", null, "\u6211\u7684")))));
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
        switchCompany(pName) {
            console.log("switchCompany", pName);
        }
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
    class DataService {
        constructor() {
            this.state = {
                rooturl: "http://192.168.1.15:86",
            };
        }
        callback(a, pBack) {
            console.log("callback1", a);
            pBack("callback");
        }
        getCompanys(pBackajax, park_id) {
            console.log("init-companyType", pBackajax, park_id);
            var data = {
                "return_code": "100",
                "response": [
                    {
                        "id": "1009",
                        "name": "科技服务",
                    },
                    {
                        "id": "1019",
                        "name": "文化创意",
                    }
                ],
                "err_msg": ""
            };
            pBackajax(data);
        }
        findCompany(pBackajax, park_id, company_type_id, name) {
            console.log("initCompanydata", pBackajax, park_id, company_type_id, name);
            var data = {
                "return_code": "100",
                "response": [
                    {
                        "id": "1009",
                        "name": "浙江永拓信息科技有限公司1s",
                        "headimgurl": "./mPark/image/pin-blue.png",
                        "building_id": "a座",
                        "floor_id": "3F",
                        "room_id": "201-2",
                        "address": "E座B区-3F-301",
                        "service": [
                            {
                                "id": "1009",
                                "name": "科技服务",
                            }
                        ]
                    },
                    {
                        "id": "1009-2",
                        "name": "浙江永拓信息科技有限公司2s",
                        "headimgurl": "./mPark/image/pin-blue.png",
                        "building_id": "a座",
                        "floor_id": "3F",
                        "room_id": "201-2",
                        "address": "E座B区-3F-302",
                        "service": [
                            {
                                "id": "1009",
                                "name": "科技服务",
                            }
                        ]
                    },
                ],
                "err_msg": ""
            };
            pBackajax(data);
        }
        getCompanyInfo(pBackajax, id) {
            console.log("getCompanyInfo", pBackajax, id);
            var data = {
                "return_code": "100",
                "response": {
                    "id": "1009",
                    "name": "桂林国家高新",
                    "headimgurl": "./mPark/image/i.png",
                    "building_id": "a座",
                    "floor_id": "1F",
                    "room_id": "201-2",
                    "address": "桂林市七星区信息产业园E座B区三楼",
                    "Contacts": "莫xxx",
                    "phone": "15266666666",
                    "website": "www.yongtoc.com",
                    "descript": "xxx公司是由计算机图形学，计算机应用学组方面专家成。",
                    "service": [
                        {
                            "id": "1009",
                            "name": "科技服务",
                        }
                    ],
                    "elegant": [
                        {
                            "id": "1009",
                            "name": "xxx图片",
                            "pic_url": "./mPark/image/i.png",
                        }, {
                            "id": "1009",
                            "name": "xxx图片",
                            "pic_url": "./mPark/image/i.png",
                        }
                    ],
                    "product": [
                        {
                            "id": "1009",
                            "name": "xxx图片",
                            "pic_url": "./mPark/image/i.png",
                        }, {
                            "id": "1009",
                            "name": "xxx图片",
                            "pic_url": "./mPark/image/i.png",
                        }
                    ],
                    "panorama": [
                        {
                            "id": "1009",
                            "name": "xxx图片",
                            "pic_url": "http://xxx.pic",
                            "position": "",
                        }
                    ]
                },
                "err_msg": ""
            };
            pBackajax(data);
        }
        getRoomRentSquareType(pBackajax, park_id) {
            console.log("init-AllareaType", pBackajax, park_id);
            var data = {
                "return_code": "100",
                "response": [
                    {
                        "Section": "0-100",
                    },
                    {
                        "Section": "100-200",
                    }
                ],
                "err_msg": ""
            };
            pBackajax(data);
        }
        findRoomRentByparkid(pBackajax, park_id, square) {
            console.log("findRoomRentByparkid", pBackajax, park_id, square);
            var data = {
                "return_code": "100",
                "response": [
                    {
                        "id": "10091",
                        "headimgurl": "./mPark/image/i.png",
                        "building_id": "a座",
                        "floor_id": "1F",
                        "room_id": "201-1",
                        "date": "2019-07-05",
                        "square": "45m²",
                        "price": "2.8元/m²/天"
                    }, {
                        "id": "10092",
                        "headimgurl": "./mPark/image/i.png",
                        "building_id": "a座",
                        "floor_id": "1F",
                        "room_id": "201-2",
                        "date": "2019-07-05",
                        "square": "45m²",
                        "price": "2.8元/m²/天"
                    }
                ],
                "err_msg": ""
            };
            pBackajax(data);
        }
        findRoomRentByroomid(pBackajax, id) {
            console.log("findRoomRentByroomid", pBackajax, id);
            var data = {
                "return_code": "100",
                "response": {
                    "id": "1009",
                    "headimgurl": "./mPark/image/i.png",
                    "building_id": "a座",
                    "floor_id": "1F",
                    "room_id": "201-2",
                    "date": "2019-07-05",
                    "square": "45m²",
                    "price": "2.8元/m²/天",
                    "squre": "150",
                    "floor": "4楼",
                    "lift": "有",
                    "Contacts": "莫xxx",
                    "phone": "135000000",
                    "inspection_time": "80:30-12:00",
                    "require": "一年起租",
                    "pic": [
                        {
                            "id": "1009",
                            "name": "xxx图片",
                            "url": "./mPark/image/i.png",
                        }
                    ],
                    "panorama": [
                        {
                            "id": "1009",
                            "name": "xxx图片",
                            "url": "http://xxx.pic",
                            "position": "",
                        }
                    ],
                    "video": [
                        {
                            "id": "1009",
                            "name": "xxx图片",
                            "url": "http://xxx.pic",
                            "position": "",
                        }
                    ]
                },
                "err_msg": ""
            };
            pBackajax(data);
        }
        getRoomdata(pBackajax) {
            console.log("initRoomdata");
            pBackajax(111);
        }
    }
    exports.default = DataService;
});
define("findLease", ["require", "exports", "react", "react-router-dom", "dataService"], function (require, exports, React, RouterDOM, dataService_1) {
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
            FindLease.getLeaseinfoByroomid = this.getLeaseinfoByroomid.bind(this);
        }
        componentDidMount() {
        }
        static getLeaseinfoByroomid(id) { }
        getLeaseinfoByroomid(id) {
            console.log("getCompanyinfo", id);
            this.toggleView("Info", id);
            LeaseInfo.getLeaseInfo(id);
        }
        static toggleView(a, id) { }
        ;
        toggleView(a, id) {
            console.log("fl", a);
            console.log("fl", id);
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
                            React.createElement("i", { className: "iconfont companyInfoicon" }, "\uE83B")),
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
            this.dataService = new dataService_1.default();
            this.state = {
                park_id: "1001",
                roomId: "",
                inputValue: "搜索",
                square: "全部",
                leaseListcss: "leaseList-part",
                foleBtn: "lease-foleBtn",
                indexOf: 0,
                leaseBtn: "leaseBtn-part",
                leaseul: "leaseul",
                roomData: [],
                areaType: [],
                typeIndexof: 100,
                iconfont: "iconfont iconfont-unturn",
            };
            this.showInfo = this.showInfo.bind(this);
            this.getRoomRentSquareType = this.getRoomRentSquareType.bind(this);
            this.setRoomRent = this.setRoomRent.bind(this);
            this.searchRoomRent = this.searchRoomRent.bind(this);
            this.change = this.change.bind(this);
        }
        componentDidMount() {
            this.dataService.getRoomRentSquareType(this.getRoomRentSquareType, this.state.park_id);
            this.dataService.findRoomRentByparkid(this.setRoomRent, this.state.park_id, this.state.square);
        }
        getRoomRentSquareType(data) {
            console.log("getRoomRentSquareType", data);
            this.setState({
                areaType: data.response,
            });
        }
        setRoomRent(data) {
            console.log("setRoomRent", data);
            this.setState({
                roomData: data.response,
            });
        }
        showInfo(a, id, name, e) {
            FindLease.toggleView(a, id);
            LeaseInfo.getLeaseInfo(id);
            console.log("more", a, id, name, e);
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
            if (this.state.iconfont == "iconfont iconfont-unturn") {
                this.setState({
                    iconfont: "iconfont iconfont-turn",
                });
            }
            else {
                this.setState({
                    iconfont: "iconfont iconfont-unturn",
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
        leaseActive(index, id) {
            console.log("active", index, id);
            this.setState({
                indexOf: index,
                roomId: id
            });
            console.log("leaseActive", this.state);
        }
        typeActive(indexof, name) {
            console.log("typeActive-1", indexof);
            console.log("typeActive-2", name);
            this.setState({
                typeIndexof: indexof,
                square: name,
                inputValue: name,
            });
        }
        foucus() {
            if (this.state.inputValue == "搜索") {
                this.setState({ inputValue: "" });
            }
        }
        blur(event) {
            if (this.state.inputValue == "") {
                this.setState({ inputValue: "搜索" });
            }
        }
        change(event) {
            this.setState({
                inputValue: event.target.value,
                square: event.target.value,
            });
        }
        searchRoomRent() {
            if (this.state.square == "全部") {
                this.dataService.findRoomRentByparkid(this.setRoomRent, this.state.park_id, "0");
            }
            else {
                this.dataService.findRoomRentByparkid(this.setRoomRent, this.state.park_id, this.state.inputValue);
            }
            console.log("searchBtn", this.state.inputValue, this.state.square);
        }
        render() {
            return (React.createElement("div", null,
                React.createElement("div", { className: this.state.leaseListcss },
                    React.createElement("div", { className: "foleBtn", onClick: this.toggleFold.bind(this) },
                        React.createElement("i", { className: this.state.iconfont, style: { "fontSize": "5rem" } }, "\uE849")),
                    React.createElement("ul", { className: this.state.leaseul }, this.state.roomData.map((i, index) => {
                        return (React.createElement("li", { onClick: this.leaseActive.bind(this, index, i.id), className: this.state.indexOf == index ? "leaseli-active" : "leaseli" },
                            React.createElement("div", { className: "leaseImgback" },
                                React.createElement("img", { src: i.headimgurl })),
                            React.createElement("div", { className: "leaseul-middle" },
                                React.createElement("p", { className: this.state.indexOf == index ? "leaseName-active" : "leaseName", style: { "font-size": "2.4rem", "font-weight": "bold" } },
                                    i.building_id,
                                    "-",
                                    i.floor_id,
                                    "-",
                                    i.room_id,
                                    "\u5BA4"),
                                React.createElement("p", { style: { "font-size": "2.5rem" } },
                                    React.createElement("span", { className: "iconfont", style: { "fontSize": "2.5rem", "margin-right": "1rem" } }, "\uE82A"),
                                    i.square),
                                React.createElement("p", { style: { "font-size": "2.5rem" } },
                                    React.createElement("span", { className: "iconfont", style: { "fontSize": "2.5rem", "margin-right": "1rem" } }, "\uE829"),
                                    i.date)),
                            React.createElement("div", { className: "leaseul-right" },
                                React.createElement("p", { onClick: this.showInfo.bind(this, "Info", i.id, i.name) },
                                    "\u66F4\u591A",
                                    React.createElement("i", { className: "iconfont", style: { "fontSize": "2rem" } }, "\uE827")),
                                React.createElement("p", { className: this.state.indexOf == index ? "leaseType-active" : "leaseType" },
                                    React.createElement("span", { className: this.state.indexOf == index ? "leasePrice-active" : "leasePrice" }, i.price)))));
                    })),
                    React.createElement("form", null,
                        React.createElement("div", { className: this.state.leaseBtn },
                            React.createElement("div", { className: "searchBox" },
                                React.createElement("span", { className: "searchBox-text" },
                                    React.createElement("span", { className: "iconfont", style: { "fontSize": "3rem" } }, "\uE810"),
                                    React.createElement("input", { className: "leaseSearch", type: "text", placeholder: "\u641C\u7D22", value: this.state.inputValue, onFocus: this.foucus.bind(this), onBlur: this.blur.bind(this), onChange: this.change.bind(this) })),
                                React.createElement("span", { onClick: this.foldBtn.bind(this), className: "searchBox-type" },
                                    this.state.square,
                                    " ",
                                    React.createElement("span", { className: "iconfont", style: { "fontSize": "3rem" } }, "\uE828"))),
                            React.createElement("ul", { className: "areaTypeul" },
                                React.createElement("li", { className: this.state.typeIndexof == 100 ? "areaTypeli-active" : "areaTypeli", onClick: this.typeActive.bind(this, 100, "全部", "id-全部"), style: { "width": "12rem" } }, "\u5168\u90E8"),
                                this.state.areaType.map((i, index) => {
                                    return (React.createElement("li", { onClick: this.typeActive.bind(this, index, i.Section), className: this.state.typeIndexof == index ? "areaTypeli-active" : "areaTypeli" }, i.Section));
                                })),
                            React.createElement("span", { className: "searchBtn", onClick: this.searchRoomRent.bind(this) }, "\u641C\u7D22"))))));
        }
    }
    class LeaseInfo extends React.Component {
        constructor(props) {
            super(props);
            this.dataService = new dataService_1.default();
            this.state = {
                leaseInfocss: "leaseInfo",
                roomName: "",
                building: "",
                floor: "",
                room: "",
                infoli: 0,
                iconfont: "iconfont iconfont-unturn",
            };
            this.showList = this.showList.bind(this);
            LeaseInfo.getLeaseInfo = this.getLeaseInfo.bind(this);
            this.setLeaseInfo = this.setLeaseInfo.bind(this);
        }
        static getLeaseInfo(id) { }
        getLeaseInfo(id) {
            this.dataService.findRoomRentByroomid(this.setLeaseInfo, id);
        }
        setLeaseInfo(data) {
            console.log("setLeaseInfo", data);
            this.setState({
                building: data.response.building_id,
                floor: data.response.floor_id,
                room: data.response.room_id
            });
            LeaseInfos.setLeaseInfos(data);
            Picshow.setPicshow(data);
        }
        componentDidMount() {
            console.log("MMMMM");
        }
        showList(a, id) {
            FindLease.toggleView(a, id);
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
            if (this.state.iconfont == "iconfont iconfont-unturn") {
                this.setState({
                    iconfont: "iconfont iconfont-turn",
                });
            }
            else {
                this.setState({
                    iconfont: "iconfont iconfont-unturn",
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
                    React.createElement("span", { className: "iconfont companyInfoicon", onClick: this.showList.bind(this, "List", "id-01") }, "\uE83B"),
                    React.createElement("span", null,
                        this.state.building,
                        "-",
                        this.state.floor,
                        "-",
                        this.state.room)),
                React.createElement("div", { className: this.state.leaseInfocss },
                    React.createElement("div", { className: "foleBtn", onClick: this.toggleFold.bind(this) },
                        React.createElement("i", { className: this.state.iconfont, style: { "fontSize": "5rem" } }, "\uE849")),
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
                area: "",
                time: "",
                floor: "",
                limit: "",
                elevator: "",
                price: "",
                man: "",
                tel: ""
            };
            LeaseInfos.setLeaseInfos = this.setLeaseInfos.bind(this);
        }
        componentDidMount() { }
        static setLeaseInfos(data) { }
        setLeaseInfos(data) {
            console.log("setLeaseInfosIIII", data);
            this.setState({
                area: data.response.squre,
                time: data.response.inspection_time,
                floor: data.response.floor_id,
                limit: data.response.require,
                elevator: data.response.lift,
                price: data.response.price,
                man: data.response.Contacts,
                tel: data.response.phone
            });
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
                        React.createElement("span", null, this.state.floor)),
                    React.createElement("li", null,
                        "\u79DF\u623F\u8981\u6C42",
                        React.createElement("span", null, this.state.limit)),
                    React.createElement("li", null,
                        React.createElement("span", { style: { "padding-right": "7rem" } }, "\u7535\u68AF"),
                        React.createElement("span", { style: { "font-weight": "600" } }, this.state.elevator)),
                    React.createElement("li", null,
                        React.createElement("span", { style: { "padding-right": "7rem" } }, "\u79DF\u91D1"),
                        React.createElement("span", { style: { "color": "#F53636" } }, this.state.price)),
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
                roomImg: []
            };
            Picshow.setPicshow = this.setPicshow.bind(this);
        }
        componentDidMount() { }
        static setPicshow(data) { }
        setPicshow(data) {
            console.log("setPicshowPPPPPP", data);
            this.setState({
                roomImg: data.response.pic,
            });
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
define("home", ["require", "exports", "react", "react-router-dom", "bottomBtn", "compat", "css!./styles/iconfont.css", "css!./styles/view.css"], function (require, exports, React, RouterDOM, bottomBtn_2, compat_1) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    class Home extends React.Component {
        constructor(props) {
            super(props);
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
                    { name: "交通" },
                    { name: "商圈" },
                    { name: "公交站" },
                    { name: "全景" },
                    { name: "停车场" },
                    { name: "交通" },
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
            if (a == "交通") {
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
            else if (a == "商圈") {
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
            else if (a == "公交车") {
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
            else if (a == "全景") {
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
            else if (a == "停车场") {
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
                    React.createElement("div", { className: this.state.topIcon1, onClick: this.switchMark.bind(this, "交通") },
                        React.createElement("i", { className: "iconfont", style: { "fontSize": "5rem" } }, "\uE816"),
                        React.createElement("p", null, "\u4EA4\u901A")),
                    React.createElement("div", { className: this.state.topIcon2, onClick: this.switchMark.bind(this, "商圈") },
                        React.createElement("i", { className: "iconfont", style: { "fontSize": "5rem" } }, "\uE81A"),
                        React.createElement("p", null, "\u5546\u5708")),
                    React.createElement("div", { className: this.state.moreIcon, onClick: this.moreIcon.bind(this, 10) },
                        React.createElement("i", { className: "iconfont", style: { "fontSize": "5rem" } }, "\uE819"),
                        React.createElement("p", null, "\u66F4\u591A")),
                    React.createElement("div", { className: this.state.topIcon3, onClick: this.switchMark.bind(this, "公交车") },
                        React.createElement("i", { className: "iconfont", style: { "fontSize": "5rem" } }, "\uE817"),
                        React.createElement("p", null, "\u516C\u4EA4\u8F66")),
                    React.createElement("div", { className: this.state.topIcon4, onClick: this.switchMark.bind(this, "全景") },
                        React.createElement("i", { className: "iconfont", style: { "fontSize": "5rem" } }, "\uE818"),
                        React.createElement("p", null, "\u5168\u666F")),
                    React.createElement("div", { className: this.state.topIcon5, onClick: this.switchMark.bind(this, "停车场") },
                        React.createElement("i", { className: "iconfont", style: { "fontSize": "5rem" } }, "\uE81B"),
                        React.createElement("p", null, "\u505C\u8F66\u573A")),
                    React.createElement("div", { className: this.state.topClose, onClick: this.topClose.bind(this, 10) },
                        React.createElement("i", { className: "iconfont", style: { "fontSize": "3rem" } }, "\uE81C"))),
                React.createElement(RouterDOM.Link, { to: "/narrate" },
                    React.createElement("div", { className: "playIconbox", style: { "color": "#707070" } },
                        React.createElement("div", { className: this.state.playIcon },
                            React.createElement("i", { className: "iconfont", style: { "fontSize": "5rem" } }, "\uE81D"),
                            React.createElement("p", null, "\u8BB2\u89E3"))))));
        }
    }
    class FoldBtn extends React.Component {
        constructor(props) {
            super(props);
            this.state = {
                foleIcon: "foleIcon",
                foldView: "foldView-part",
                iconfont: "iconfont iconfont-unturn",
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
            if (this.state.iconfont == "iconfont iconfont-unturn") {
                this.setState({
                    iconfont: "iconfont iconfont-turn",
                });
            }
            else {
                this.setState({
                    iconfont: "iconfont iconfont-unturn",
                });
            }
        }
        render() {
            return (React.createElement("div", { className: this.state.foldView },
                React.createElement("div", { className: "foleBtn", onClick: this.toggleFold.bind(this) },
                    React.createElement("i", { className: this.state.iconfont, style: { "fontSize": "5rem" } }, "\uE849")),
                React.createElement("div", { className: "foleIconbox" },
                    React.createElement(RouterDOM.Link, { to: "/parkCompany" },
                        React.createElement("div", { className: this.state.foleIcon },
                            React.createElement("i", { className: "iconfont", style: { "fontSize": "5rem", "color": "#1C90E2", "height": "6rem" } }, "\uE81E"),
                            React.createElement("p", null, "\u56ED\u533A\u4F01\u4E1A"))),
                    React.createElement(RouterDOM.Link, { to: "/findLease" },
                        React.createElement("div", { className: this.state.foleIcon },
                            React.createElement("i", { className: "iconfont", style: { "fontSize": "5rem", "color": "#866FF1", "height": "6rem" } }, "\uE824"),
                            React.createElement("p", null, "\u62DB\u79DF\u67E5\u8BE2"))),
                    React.createElement(RouterDOM.Link, { to: "/photograph" },
                        React.createElement("div", { className: this.state.foleIcon },
                            React.createElement("i", { className: "iconfont", style: { "fontSize": "5rem", "color": "#F0594C", "height": "6rem" } }, "\uE821"),
                            React.createElement("p", null, "\u968F\u624B\u62CD"))),
                    React.createElement(RouterDOM.Link, { to: "/applyPut" },
                        React.createElement("div", { className: this.state.foleIcon },
                            React.createElement("i", { className: "iconfont", style: { "fontSize": "5rem", "color": "#208FE6", "height": "6rem" } }, "\uE81F"),
                            React.createElement("p", null, "\u6446\u70B9\u7533\u8BF7"))),
                    React.createElement(RouterDOM.Link, { to: "/bookSite" },
                        React.createElement("div", { className: this.state.foleIcon },
                            React.createElement("i", { className: "iconfont", style: { "fontSize": "5rem", "color": "#208FE6", "height": "6rem" } }, "\uE820"),
                            React.createElement("p", null, "\u573A\u5730\u9884\u5B9A"))),
                    React.createElement(RouterDOM.Link, { to: "/repairsOnline" },
                        React.createElement("div", { className: this.state.foleIcon },
                            React.createElement("i", { className: "iconfont", style: { "fontSize": "5rem", "color": "#26AC8F", "height": "6rem" } }, "\uE822"),
                            React.createElement("p", null, "\u5728\u7EBF\u62A5\u4FEE"))),
                    React.createElement(RouterDOM.Link, { to: "/parking" },
                        React.createElement("div", { className: this.state.foleIcon },
                            React.createElement("i", { className: "iconfont", style: { "fontSize": "5rem", "color": "#208FE6", "height": "6rem" } }, "\uE823"),
                            React.createElement("p", null, "\u505C\u8F66\u4E1A\u52A1"))))));
        }
    }
    exports.default = Home;
});
define("parkCompany", ["require", "exports", "react", "react-router-dom", "compat", "dataService"], function (require, exports, React, RouterDOM, compat_2, dataService_2) {
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
            ParkCompany.getCompanyinfo = this.getCompanyinfo.bind(this);
        }
        componentDidMount() {
            console.log(12313123);
        }
        static getCompanyinfo(id) { }
        getCompanyinfo(id) {
            console.log("getCompanyinfo", id);
            this.toggleView("Info", id);
            CompanyInfo.getCompanyinfo(id);
        }
        static toggleView(a, id) { }
        ;
        toggleView(a, id) {
            console.log("ff", a);
            console.log("ff", id);
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
                        React.createElement("i", { className: "iconfont companyInfoicon" }, "\uE83B")),
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
            this.dataService = new dataService_2.default();
            this.globalAction = new compat_2.default();
            this.state = {
                park_id: 1001,
                companyListcss: "companyList-part",
                foleBtn: "foleBtn",
                companyBtn: "companyBtn-part",
                companyul: "companyul",
                companyData: [],
                companyType: [],
                indexOf: 0,
                typeIndexof: 100,
                typeName: "全部",
                company_type_id: "",
                inputValue: "",
                iconfont: "iconfont iconfont-unturn",
            };
            this.showInfo = this.showInfo.bind(this);
            this.setCompany = this.setCompany.bind(this);
            this.setCompanys = this.setCompanys.bind(this);
        }
        componentDidMount() {
            this.dataService.getCompanys(this.setCompanys, this.state.park_id);
            this.dataService.findCompany(this.setCompany, this.state.park_id, this.state.company_type_id, this.state.typeName);
        }
        setCompanys(data) {
            this.setState({
                companyType: data.response,
            });
        }
        setCompany(data) {
            console.log("setCompany", data);
            this.setState({
                companyData: data.response,
            });
        }
        showInfo(a, id, name, e) {
            ParkCompany.toggleView(a, id);
            CompanyInfo.getCompanyinfo(id);
            console.log("more", a, id, name, e);
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
            if (this.state.iconfont == "iconfont iconfont-unturn") {
                this.setState({
                    iconfont: "iconfont iconfont-turn",
                });
            }
            else {
                this.setState({
                    iconfont: "iconfont iconfont-unturn",
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
            this.globalAction.switchCompany(id);
        }
        typeActive(indexof, name, id) {
            console.log("typeActive", indexof);
            console.log("typeActive", name);
            console.log("typeActive", id);
            this.setState({
                typeIndexof: indexof,
                typeName: name,
                company_type_id: id,
            });
        }
        foucus() {
            if (this.state.inputValue == "请输入企业名称") {
                this.setState({ inputValue: "" });
            }
        }
        blur(event) {
            if (this.state.inputValue == "") {
                this.setState({ inputValue: "请输入企业名称" });
            }
        }
        change(event) {
            this.setState({ inputValue: event.target.value });
        }
        searchCompany() {
            if (this.state.inputValue == "请输入企业名称") {
                this.setState({ inputValue: "" });
            }
            ;
            console.log("searchBtn", this.state.inputValue, this.state.company_type_id);
            this.dataService.findCompany(this.setCompany, this.state.park_id, this.state.company_type_id, this.state.inputValue);
        }
        render() {
            return (React.createElement("div", { className: this.state.companyListcss },
                React.createElement("div", { className: "foleBtn", onClick: this.toggleFold.bind(this) },
                    React.createElement("i", { className: this.state.iconfont, style: { "fontSize": "5rem" } }, "\uE849")),
                React.createElement("ul", { className: this.state.companyul }, this.state.companyData.map((i, index) => {
                    return (React.createElement("li", { onClick: this.companyActive.bind(this, index, i.id), className: this.state.indexOf == index ? "companyli-active" : "companyli" },
                        React.createElement("div", { className: "companyImgback" },
                            React.createElement("img", { src: i.headimgurl })),
                        React.createElement("div", { className: "companyul-middle" },
                            React.createElement("p", { className: this.state.indexOf == index ? "companyName-active" : "companyName", style: { "font-size": "2.4rem", "font-weight": "bold" } }, i.name),
                            React.createElement("p", { style: { "font-size": "2.5rem" } },
                                React.createElement("i", { className: "iconfont", style: { "fontSize": "2.5rem" } }, "\uE815"),
                                i.address)),
                        React.createElement("div", { className: "companyul-right" },
                            React.createElement("p", { onClick: this.showInfo.bind(this, "Info", i.id, i.name) },
                                "\u66F4\u591A",
                                React.createElement("i", { className: "iconfont", style: { "fontSize": "2rem" } }, "\uE827")),
                            React.createElement("p", { className: this.state.indexOf == index ? "companyType-active" : "companyType" }, i.service[0].name))));
                })),
                React.createElement("form", null,
                    React.createElement("div", { className: this.state.companyBtn },
                        React.createElement("div", { className: "searchBox" },
                            React.createElement("span", { className: "searchBox-text" },
                                React.createElement("i", { className: "iconfont", style: { "fontSize": "3rem" } }, "\uE810"),
                                React.createElement("input", { className: "companySearch", type: "text", placeholder: "\u8BF7\u8F93\u5165\u4F01\u4E1A\u540D\u79F0", value: this.state.inputValue, onFocus: this.foucus.bind(this), onBlur: this.blur.bind(this), onChange: this.change.bind(this) })),
                            React.createElement("span", { onClick: this.foldBtn.bind(this), className: "searchBox-type" },
                                this.state.typeName,
                                " ",
                                React.createElement("i", { className: "iconfont", style: { "fontSize": "3rem" } }, "\uE828"))),
                        React.createElement("ul", { className: "companyTypeul" },
                            React.createElement("li", { className: this.state.typeIndexof == 100 ? "companyTypeli-active" : "companyTypeli", onClick: this.typeActive.bind(this, 100, "全部", ""), style: { "width": "12rem" } }, "\u5168\u90E8"),
                            this.state.companyType.map((i, index) => {
                                return (React.createElement("li", { onClick: this.typeActive.bind(this, index, i.name, i.id), className: this.state.typeIndexof == index ? "companyTypeli-active" : "companyTypeli" }, i.name));
                            })),
                        React.createElement("span", { className: "searchBtn", onClick: this.searchCompany.bind(this) }, "\u641C\u7D22")))));
        }
    }
    class CompanyInfo extends React.Component {
        constructor(props) {
            super(props);
            this.dataService = new dataService_2.default();
            this.state = {
                companyInfocss: "companyInfo",
                companyName: "浙江永拓信息科技有限公司",
                companyInfoul: "companyInfoul",
                infoli: 0,
                iconfont: "iconfont iconfont-unturn",
            };
            this.showList = this.showList.bind(this);
            CompanyInfo.getCompanyinfo = this.getCompanyinfo.bind(this);
            this.setCompanyinfo = this.setCompanyinfo.bind(this);
        }
        static getCompanyinfo(id) { }
        getCompanyinfo(id) {
            this.dataService.getCompanyInfo(this.setCompanyinfo, id);
        }
        setCompanyinfo(data) {
            console.log("getCompanyinfo", data);
            this.setState({
                companyName: data.response.name,
            });
            CompanyInfos.setCompanyinfos(data);
            Mien.setCompanymien(data);
            Details.setCompanydetails(data);
            Product.setCompanyproduct(data);
        }
        showList(a, id) {
            ParkCompany.toggleView(a, id);
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
            if (this.state.iconfont == "iconfont iconfont-unturn") {
                this.setState({
                    iconfont: "iconfont iconfont-turn",
                });
            }
            else {
                this.setState({
                    iconfont: "iconfont iconfont-unturn",
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
                    React.createElement("i", { className: "iconfont companyInfoicon", onClick: this.showList.bind(this, "List", "id-01") }, "\uE83B"),
                    React.createElement("span", null, this.state.companyName)),
                React.createElement("div", { className: this.state.companyInfocss },
                    React.createElement("div", { className: "foleBtn", onClick: this.toggleFold.bind(this) },
                        React.createElement("i", { className: this.state.iconfont, style: { "fontSize": "5rem" } }, "\uE849")),
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
                imgurl: "",
                name: "",
                address: "",
                type: "",
                man: "",
                tel: "",
                http: ""
            };
            CompanyInfos.setCompanyinfos = this.setCompanyinfos.bind(this);
        }
        componentDidMount() { }
        static setCompanyinfos(data) { }
        setCompanyinfos(data) {
            console.log("setCompanyinfoCCCCCCCCCCC", data);
            this.setState({
                imgurl: data.response.headimgurl,
                name: data.response.name,
                address: data.response.address,
                type: data.response.service[0].name,
                man: data.response.Contacts,
                tel: data.response.phone,
                http: data.response.website,
            });
        }
        render() {
            return (React.createElement("div", { className: "infos" },
                React.createElement("img", { src: this.state.imgurl }),
                React.createElement("div", { className: "ifosRight" },
                    React.createElement("h4", { className: "infos-1" },
                        this.state.name,
                        " "),
                    React.createElement("h5", { className: "infos-2" },
                        React.createElement("i", { className: "iconfont", style: { "fontSize": "3rem" } }, "\uE815"),
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
                mienImg: []
            };
            Mien.setCompanymien = this.setCompanymien.bind(this);
        }
        componentDidMount() { }
        static setCompanymien(data) { }
        setCompanymien(data) {
            console.log("setCompanyMienMMMMM", data);
            this.setState({
                mienImg: data.response.elegant,
            });
        }
        render() {
            return (React.createElement("div", { className: "mien" },
                React.createElement("ul", null, this.state.mienImg.map((i, index) => {
                    return (React.createElement("li", null,
                        React.createElement("img", { src: i.pic_url })));
                }))));
        }
    }
    class Details extends React.Component {
        constructor(props) {
            super(props);
            this.state = { text: "" };
            Details.setCompanydetails = this.setCompanydetails.bind(this);
        }
        componentDidMount() { }
        static setCompanydetails(data) { }
        setCompanydetails(data) {
            console.log("setCompanyDetailsDDDDD", data);
            this.setState({
                text: data.response.descript,
            });
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
                productImg: []
            };
            Product.setCompanyproduct = this.setCompanyproduct.bind(this);
        }
        componentDidMount() { }
        static setCompanyproduct(data) { }
        setCompanyproduct(data) {
            console.log("setCompanyproductPPPP", data);
            this.setState({
                productImg: data.response.product,
            });
        }
        render() {
            return (React.createElement("div", { className: "product" },
                React.createElement("ul", null, this.state.productImg.map((i, index) => {
                    return (React.createElement("li", null,
                        React.createElement("img", { src: i.pic_url })));
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
                        React.createElement("span", { className: "iconfont companyInfoicon" }, "\uE83B")),
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
                iconfont: "iconfont iconfont-unturn",
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
            if (this.state.iconfont == "iconfont iconfont-unturn") {
                this.setState({
                    iconfont: "iconfont iconfont-turn",
                });
            }
            else {
                this.setState({
                    iconfont: "iconfont iconfont-unturn",
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
                        React.createElement("i", { className: this.state.iconfont, style: { "fontSize": "5rem" } }, "\uE849")),
                    React.createElement("ul", { className: this.state.illegalul }, this.state.illegalList.map((i, index) => {
                        return (React.createElement("li", { onClick: this.illegalActive.bind(this, index), className: this.state.indexOf == index ? "illegalli-active" : "illegalli" },
                            React.createElement("div", { className: "illegamgback" },
                                React.createElement("img", { src: i.url })),
                            React.createElement("div", { className: "illegalul-middle " },
                                React.createElement("p", { className: this.state.indexOf == index ? "illegalType-active" : "illegalType", style: { "font-size": "2.4rem" } }, i.type),
                                React.createElement("p", { style: { "font-size": "2.3rem" } }, i.time),
                                React.createElement("p", { style: { "font-size": "2.3rem" } },
                                    React.createElement("i", { className: "iconfont", style: { "fontSize": "3rem", "margin-right": "1rem" } }, "\uE82B"),
                                    i.name),
                                React.createElement("p", { style: { "font-size": "2.3rem" } },
                                    React.createElement("i", { className: "iconfont", style: { "fontSize": "3rem", "margin-right": "1rem" } }, "\uE82C"),
                                    i.address),
                                React.createElement("p", { onClick: this.showPart.bind(this, "Info", "i.id"), style: { "font-size": "2.3rem", "float": "right", "color": "#fff" } },
                                    "\u66F4\u591A",
                                    React.createElement("i", { className: "iconfont", style: { "fontSize": "2rem" } }, "\uE827")))));
                    })),
                    React.createElement("div", { className: "illBottombox" },
                        React.createElement("div", { className: "searchBox" },
                            React.createElement("span", { className: "searchBox-text" },
                                React.createElement("i", { className: "iconfont", style: { "fontSize": "3rem" } }, "\uE810"),
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
define("infoArea", ["require", "exports", "react", "react-router-dom", "css!./styles/infoArea.css"], function (require, exports, React, react_router_dom_1) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    class InfoArea extends React.Component {
        constructor() {
            super(...arguments);
            this.state = {
                inputValue: "����������",
                tagArr: ["��ѯ", "����", "Ͷ��", "����"],
                listArr: [{ spread: true }, { spread: false }, { spread: false }, { spread: false }, { spread: false }, { spread: false }, { spread: false }, { spread: false }, { spread: false }],
                tagIndex: 0,
            };
        }
        foucus() {
            if (this.state.inputValue === "����������") {
                this.setState({ inputValue: "" });
            }
        }
        blur() {
            if (this.state.inputValue === "") {
                this.setState({ inputValue: "����������" });
            }
        }
        change(event) {
            this.setState({ inputValue: event.target.value });
        }
        clickTag(index) {
            this.setState({ tagIndex: index });
        }
        spread(index) {
            let listArr = this.state.listArr;
            listArr[index].spread = !listArr[index].spread;
            this.setState({ listArr: listArr });
        }
        render() {
            return (React.createElement("div", { className: "infoarea" },
                React.createElement("div", { className: "infoarea-top" },
                    React.createElement("div", { className: "infoarea-title" }, "\uFFFD\uFFFD\uFFFD\uFFFD\u0530\uFFFD\uFFFD"),
                    React.createElement("div", { className: "infoarea-child-top" },
                        React.createElement("input", { className: "infoarea-input", value: this.state.inputValue, onFocus: this.foucus.bind(this), onBlur: this.blur.bind(this), onChange: this.change.bind(this) }),
                        React.createElement("img", { src: "./mpark/image/search.png", className: "infoarea-search-img" }),
                        React.createElement("span", { className: "infoarea-sreach-bt" }, "\uFFFD\uFFFD\uFFFD\uFFFD"))),
                React.createElement("div", { className: "infoarea-tag" }, this.state.tagArr.map((item, index) => {
                    return React.createElement("div", { key: index, className: index !== this.state.tagIndex ? "infoarea-tag-child" : "infoarea-tag-child-add", onClick: e => this.clickTag(index) }, item);
                })),
                React.createElement("div", { className: "infoarea-content" },
                    this.state.listArr.map((item, index) => {
                        return React.createElement("div", { className: item.spread ? "infoarea-content-child-bottom" : "infoarea-content-child", key: index }, item.spread ?
                            React.createElement("div", { style: { width: "100%", height: "100%" } },
                                React.createElement("div", { style: { height: "50%", width: "100%" } },
                                    React.createElement("div", { className: "infoarea-content-name" }, "\uFFFD\uFFFD\uFFFD\uFFFD\uFFFD\u00B5\uFFFD\u01BE\uFFFD\u2E6B\u0522\uFFFD\u0176\u04F9\uFFFD\uFFFD\uFFFD"),
                                    React.createElement("div", { className: "infoarea-content-bottom", onClick: e => this.spread(index) },
                                        React.createElement("img", { src: "./mpark/image/right.png", className: "infoarea-content-right-img" }))),
                                React.createElement("div", { className: "infoarea-br" },
                                    index !== 2 ?
                                        React.createElement("div", { className: "infoarea-br-bt" }, "\uFFFD\u047D\uFFFD\uFFFD") :
                                        React.createElement("div", { className: "infoarea-br-bt-add" }, "\uFFFD\uFFFD\uFFFD\uFFFD\uFFFD\uFFFD"),
                                    React.createElement("div", { className: "infoarea-br-data" }, "2020-03-06 14:38:15")),
                                React.createElement("div", { style: { borderTop: "3px solid #F2F2F2", marginTop: "30px", marginRight: "50px" } }),
                                React.createElement("div", { style: { fontSize: "40px", color: "#949494", marginTop: "20px" } }, "\uFFFD\uFFFD\uFFFD\uFFFD\uFFFD\uFFFD\uFFFD\uFFFD:"),
                                React.createElement("div", { style: { fontSize: "40px", color: "#333333", marginTop: "20px" } }, "\uFFFD\uFFFD\uFFFD\uFFFD\uFFFD\u00B5\uFFFD\u01BE\uFFFD\u2E6B\u0522\uFFFD\u0176\u04F9\uFFFD\uFFFD\uDA4E\uDF39\uFFFD\uFFFD\uFFFD\uFFFD\u00B5\uFFFD\u01BE\uFFFD\u2E6B\u0522\uFFFD\u0176\u04F9\uFFFD\uFFFD\uDA4E\uDF39\uFFFD\uFFFD\uFFFD\uFFFD\u00B5\uFFFD\u01BE\uFFFD\u2E6B\u0522\uFFFD\u0176\u04F9\uFFFD\uFFFD\uDA4E\uDF39\uFFFD\uFFFD\uFFFD\uFFFD\u00B5\uFFFD\u01BE\uFFFD\u2E6B\u0522\uFFFD\u0176\u04F9\uFFFD\uFFFD\uDA4E\uDF39\uFFFD\uFFFD\uFFFD\uFFFD\u00B5\uFFFD\u01BE\uFFFD\u2E6B\u0522\uFFFD\u0176\u04F9\uFFFD\uFFFD\uFFFD"),
                                React.createElement("div", { style: { fontSize: "40px", color: "#949494", marginTop: "30px" } }, "\uFFFD\uFFFD\uFFFD\u053B\u0638\uFFFD:"),
                                React.createElement("div", { style: { fontSize: "40px", marginTop: "20px" } },
                                    React.createElement("span", { style: { color: "#949494" } }, "\uFFFD\uFFFD"),
                                    React.createElement("span", { style: { fontWeight: "600", margin: "0 25px 0 25px" } }, "xxx"),
                                    React.createElement("span", { style: { color: "#949494" } }, "\uFFFD\uFFFD\uFFFD\uFFFD\uFFFD\uFFFD"),
                                    React.createElement("span", { style: { color: "#333333", marginLeft: "25px" } }, "2020-02-28 17:38:15")),
                                React.createElement("div", { style: { fontSize: "40px", color: "#949494", marginTop: "20px" } }, "\uFFFD\u0638\uFFFD\uFFFD\uFFFD\uFFFD\uFFFD:"),
                                React.createElement("div", { style: { fontSize: "40px", color: "#333333", marginTop: "20px", marginBottom: "150px" } }, "\uFFFD\uFFFD\uFFFD\uFFFD\uFFFD\u00B5\uFFFD\u01BE\uFFFD\u2E6B\u0522\uFFFD\u0176\u04F9\uFFFD\uFFFD\uDA4E\uDF39\uFFFD\uFFFD\uFFFD\uFFFD\u00B5\uFFFD\u01BE\uFFFD\u2E6B\u0522\uFFFD\u0176\u04F9\uFFFD\uFFFD\uDA4E\uDF39\uFFFD\uFFFD\uFFFD\uFFFD\u00B5\uFFFD\u01BE\uFFFD\u2E6B\u0522\uFFFD\u0176\u04F9\uFFFD\uFFFD\uDA4E\uDF39\uFFFD\uFFFD\uFFFD\uFFFD\u00B5\uFFFD\u01BE\uFFFD\u2E6B\u0522\uFFFD\u0176\u04F9\uFFFD\uFFFD\uDA4E\uDF39\uFFFD\uFFFD\uFFFD\uFFFD\u00B5\uFFFD\u01BE\uFFFD\u2E6B\u0522\uFFFD\u0176\u04F9\uFFFD\uFFFD\uFFFD")) :
                            React.createElement("div", { style: { width: "100%", height: "100%" } },
                                React.createElement("div", { style: { height: "50%", width: "100%" } },
                                    React.createElement("div", { className: "infoarea-content-name" }, "\uFFFD\uFFFD\uFFFD\uFFFD\uFFFD\u00B5\uFFFD\u01BE\uFFFD\u2E6B\u0522\uFFFD\u0176\u04F9\uFFFD\uFFFD\uFFFD"),
                                    React.createElement("div", { className: "infoarea-content-right", onClick: e => this.spread(index) },
                                        React.createElement("img", { src: "./mpark/image/right.png", className: "infoarea-content-right-img" }))),
                                React.createElement("div", { className: "infoarea-br" },
                                    index !== 2 ?
                                        React.createElement("div", { className: "infoarea-br-bt" }, "\uFFFD\u047D\uFFFD\uFFFD") :
                                        React.createElement("div", { className: "infoarea-br-bt-add" }, "\uFFFD\uFFFD\uFFFD\uFFFD\uFFFD\uFFFD"),
                                    React.createElement("div", { className: "infoarea-br-data" }, "2020-03-06 14:38:15"))));
                    }),
                    React.createElement("div", { style: { width: "100%", height: "30%", textAlign: "center", fontSize: "40px", lineHeight: "60px", margin: "20px 0 0 -25px" } }, "\uFFFD\uFFFD\uFFFD\uFFFD\uFFFD\uFFFD~")),
                React.createElement(react_router_dom_1.Link, { to: "/isay" },
                    React.createElement("div", { className: "infoarea-add-c" },
                        React.createElement("img", { src: "./mpark/image/add.png", width: "60px", height: "60px" })))));
        }
    }
    exports.default = InfoArea;
});
define("message", ["require", "exports", "react", "bottomBtn"], function (require, exports, React, bottomBtn_3) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    class Message extends React.Component {
        constructor(props) {
            super(props);
            this.state = {};
        }
        componentDidMount() {
            bottomBtn_3.default.toggleIcon(3);
        }
        render() {
            return (React.createElement("div", null,
                React.createElement("div", { className: "messageBox" }, "message"),
                React.createElement(bottomBtn_3.default, null)));
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
                paused: true,
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
            this.playerOver = this.playerOver.bind(this);
        }
        componentDidMount() {
            let audio = document.getElementById("audioTool");
            let audioN = 0;
            audio.onended = function () {
                console.log("��ǰ��Ƶ�����Ž���", audio.paused);
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
                console.log("audioOver", audioN, audio.paused);
                this.playerOver(false);
            }
            ;
        }
        playerOver(a) {
            this.setState({
                paused: a,
            });
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
                    this.setState({
                        paused: true,
                    });
                }
                else {
                    audio.pause();
                    this.setState({
                        paused: false,
                    });
                }
            }
        }
        render() {
            return (React.createElement("div", null,
                React.createElement("audio", { controls: true, id: "audioTool" },
                    React.createElement("source", { src: "" })),
                React.createElement("p", { className: "companyInfotit" },
                    React.createElement(RouterDOM.Link, { to: "/home" },
                        React.createElement("i", { className: "iconfont companyInfoicon" }, "\uE83B")),
                    React.createElement("span", null, "\uFFFD\u0536\uFFFD\uFFFD\uFFFD\uFFFD\uFFFD")),
                React.createElement("div", { className: "audioBox" },
                    React.createElement("ul", { className: "flex-layout category-head" }, this.state.parkAudio.map((i, index) => {
                        return (React.createElement("li", { className: this.state.activeType == index ? "flex-active" : "flex", onClick: this.audioClick.bind(this, index, i.name, i.url), "data-index": index }, i.name));
                    })),
                    React.createElement("div", { className: "playBtn", onClick: this.togglePlay.bind(this) }, this.state.paused ?
                        React.createElement("span", { className: "iconfont", style: { "fontSize": "5rem", "color": "#fff" } }, "\uE84A")
                        :
                            React.createElement("span", { className: "iconfont", style: { "fontSize": "5rem", "color": "#fff" } }, "\uE84B")))));
        }
    }
    exports.default = Narrate;
});
define("index-y", ["require", "exports", "react", "react-dom", "home", "parkCompany", "photograph", "infoArea", "message", "aboutMe", "findLease", "applyPut", "bookSite", "repairsOnline", "parking", "narrate", "react-router-dom", "css!./styles/index.css"], function (require, exports, React, ReactDOM, home_1, parkCompany_1, photograph_1, infoArea_1, message_1, aboutMe_1, findLease_1, applyPut_1, bookSite_1, repairsOnline_1, parking_1, narrate_1, react_router_dom_2) {
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
                    return React.createElement(react_router_dom_2.Link, { to: "/home" },
                        React.createElement("div", { className: "index-child-park", key: index },
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
                                React.createElement("div", { className: "index-distance" }, "10.5km"))));
                }))));
        }
        refreshCompanyinfo(id) {
            this.props.history.push('/parkCompany');
            parkCompany_1.default.getCompanyinfo(id);
        }
        refreshLeaseinfo(id) {
            this.props.history.push('/findLease');
            findLease_1.default.getLeaseinfoByroomid(id);
        }
    }
    exports.default = Index;
    ReactDOM.render(React.createElement(react_router_dom_2.HashRouter, null,
        React.createElement(react_router_dom_2.Switch, null,
            React.createElement(react_router_dom_2.Route, { exact: true, path: "/", component: Index }),
            React.createElement(react_router_dom_2.Route, { exact: true, path: "/home", component: home_1.default }),
            React.createElement(react_router_dom_2.Route, { exact: true, path: "/parkCompany", component: parkCompany_1.default }),
            React.createElement(react_router_dom_2.Route, { exact: true, path: "/photograph", component: photograph_1.default }),
            React.createElement(react_router_dom_2.Route, { exact: true, path: "/findLease", component: findLease_1.default }),
            React.createElement(react_router_dom_2.Route, { exact: true, path: "/applyPut", component: applyPut_1.default }),
            React.createElement(react_router_dom_2.Route, { exact: true, path: "/bookSite", component: bookSite_1.default }),
            React.createElement(react_router_dom_2.Route, { exact: true, path: "/repairsOnline", component: repairsOnline_1.default }),
            React.createElement(react_router_dom_2.Route, { exact: true, path: "/parking", component: parking_1.default }),
            React.createElement(react_router_dom_2.Route, { exact: true, path: "/infoArea", component: infoArea_1.default }),
            React.createElement(react_router_dom_2.Route, { exact: true, path: "/message", component: message_1.default }),
            React.createElement(react_router_dom_2.Route, { exact: true, path: "/aboutMe", component: aboutMe_1.default }),
            React.createElement(react_router_dom_2.Route, { exact: true, path: "/narrate", component: narrate_1.default }))), document.getElementById('viewContainer'));
});
define("isay", ["require", "exports", "react", "css!./styles/isay.css"], function (require, exports, React) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    class Isay extends React.Component {
        constructor() {
            super(...arguments);
            this.state = {
                tagArray: [{ name: "��ѯ" }, { name: "����" }, { name: "Ͷ��" }, { name: "����" }],
                tagIndex: 0,
                inputValue: "��������3�����Ҳ��ܴ���33����",
                textareaValue: "�뽫������������������200���ڣ�"
            };
        }
        inputFoucus() {
            if (this.state.inputValue === "��������3�����Ҳ��ܴ���33����") {
                this.setState({ inputValue: "" });
            }
        }
        inputBlur() {
            if (this.state.inputValue === "") {
                this.setState({ inputValue: "��������3�����Ҳ��ܴ���33����" });
            }
        }
        inputChange(event) {
            this.setState({ inputValue: event.target.value });
        }
        textareaFoucus() {
            if (this.state.textareaValue === "�뽫������������������200���ڣ�") {
                this.setState({ textareaValue: "" });
            }
        }
        textareaBlur() {
            if (this.state.textareaValue === "") {
                this.setState({ textareaValue: "�뽫������������������200���ڣ�" });
            }
        }
        textareaChange(event) {
            this.setState({ textareaValue: event.target.value });
        }
        goBack() {
            this.props.history.goBack();
        }
        render() {
            return (React.createElement("div", { className: "isay" },
                React.createElement("div", { className: "isay-top" },
                    React.createElement("div", { className: "isay-title" }, "\uFFFD\uFFFD\uFFFD\uFFFD\u0530\uFFFD\uFFFD")),
                React.createElement("div", { className: "isay-back" },
                    React.createElement("img", { src: "./mpark/image/back.png", style: { marginBottom: "25px" }, onClick: this.goBack.bind(this) }),
                    React.createElement("span", { style: { color: "#6C6C6C", fontSize: "40px", marginLeft: "15px" } }, "\uFFFD\uFFFD\uFFFD\u043B\uFFFD\u02F5")),
                React.createElement("div", { style: { fontSize: "40px", color: "#949494", margin: "20px 0 0 35px", overflow: "hidden" } },
                    React.createElement("div", { className: "isay-star" }),
                    React.createElement("div", { style: { float: "left", marginLeft: "15px" } }, "\uFFFD\uFFFD\uFFFD\uFFFD\uFFFD\uFFFD\uFFFD:")),
                React.createElement("div", { className: "isay-tag" }, this.state.tagArray.map((item, index) => {
                    return React.createElement("div", { className: "isay-tag-child", key: index },
                        React.createElement("img", { src: "./mpark/image/checked.png", style: { margin: "-22px 20px 0 0" } }),
                        React.createElement("span", { style: { fontSize: "40px", color: "#6C6C6C" } }, item.name));
                })),
                React.createElement("div", { style: { borderTop: "3px solid #F2F2F2", marginTop: "30px", margin: "0 30px 0 30px" } }),
                React.createElement("div", { style: { fontSize: "40px", color: "#949494", margin: "20px 0 0 35px", overflow: "hidden" } },
                    React.createElement("div", { className: "isay-star" }),
                    React.createElement("div", { style: { float: "left", marginLeft: "15px" } }, "\uFFFD\uFFFD\uFFFD\uFFFD\uFFFD\uFFFD\uFFFD\uFFFD:")),
                React.createElement("div", { className: "isay-theme" },
                    React.createElement("input", { className: "isay-theme-input", value: this.state.inputValue, onFocus: this.inputFoucus.bind(this), onBlur: this.inputBlur.bind(this), onChange: this.inputChange.bind(this) })),
                React.createElement("div", { style: { fontSize: "40px", color: "#949494", margin: "30px 0 0 35px", overflow: "hidden" } },
                    React.createElement("div", { className: "isay-star" }),
                    React.createElement("div", { style: { float: "left", marginLeft: "15px" } }, "\uFFFD\uFFFD\uFFFD\uFFFD\uFFFD\uFFFD\uFFFD\uFFFD:")),
                React.createElement("div", { className: "isay-content" },
                    React.createElement("textarea", { className: "isay-content-textarea", value: this.state.textareaValue, onFocus: this.textareaFoucus.bind(this), onBlur: this.textareaBlur.bind(this), onChange: this.textareaChange.bind(this) })),
                React.createElement("div", { className: "isay-submit" }, "\uFFFD\u1F7B")));
        }
    }
    exports.default = Isay;
});
define("index", ["require", "exports", "react", "react-dom", "home", "parkCompany", "photograph", "infoArea", "message", "aboutMe", "findLease", "applyPut", "bookSite", "repairsOnline", "parking", "narrate", "isay", "react-router-dom", "css!./styles/index.css"], function (require, exports, React, ReactDOM, home_2, parkCompany_2, photograph_2, infoArea_2, message_2, aboutMe_2, findLease_2, applyPut_2, bookSite_2, repairsOnline_2, parking_2, narrate_2, isay_1, react_router_dom_3) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    class Index extends React.Component {
        constructor(props) {
            super(props);
            this.state = {
                inputValue: "请输入园区名称",
                city: "",
                parkArr: [1, 2, 3, 4, 5, 6, 7, 8, 9],
                tagArr: ["电子信息", "高新技术", "电商服务"]
            };
            Index.g_pIns = this;
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
                        console.log("没有权限");
                    }
                    if (this.getStatus() === 8) {
                        console.log("连接超时");
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
                React.createElement("div", { className: "index-park" },
                    this.state.parkArr.map((item, index) => {
                        return React.createElement(react_router_dom_3.Link, { to: "/home" },
                            React.createElement("div", { className: "index-child-park", key: index },
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
                                    React.createElement("div", { className: "index-distance" }, "10.5km"))));
                    }),
                    React.createElement("div", { style: { width: "100%", height: "60px", textAlign: "center", fontSize: "40px", lineHeight: "60px", marginLeft: "-25px" } }, "\u5230\u5E95\u5566~")),
                React.createElement("div", { className: "index-bottom-logo" },
                    React.createElement("img", { src: "./mpark/image/bottomLogo.png", className: "index-bottom-logo-img" }))));
        }
        refreshCompanyinfo(id) {
            this.props.history.push('/parkCompany');
            parkCompany_2.default.getCompanyinfo(id);
        }
        refreshLeaseinfo(id) {
            this.props.history.push('/findLease');
            findLease_2.default.getLeaseinfoByroomid(id);
        }
    }
    Index.g_pIns = null;
    exports.default = Index;
    ReactDOM.render(React.createElement(react_router_dom_3.HashRouter, null,
        React.createElement(react_router_dom_3.Switch, null,
            React.createElement(react_router_dom_3.Route, { exact: true, path: "/", component: Index }),
            React.createElement(react_router_dom_3.Route, { exact: true, path: "/home", component: home_2.default }),
            React.createElement(react_router_dom_3.Route, { exact: true, path: "/parkCompany", component: parkCompany_2.default }),
            React.createElement(react_router_dom_3.Route, { exact: true, path: "/photograph", component: photograph_2.default }),
            React.createElement(react_router_dom_3.Route, { exact: true, path: "/findLease", component: findLease_2.default }),
            React.createElement(react_router_dom_3.Route, { exact: true, path: "/applyPut", component: applyPut_2.default }),
            React.createElement(react_router_dom_3.Route, { exact: true, path: "/bookSite", component: bookSite_2.default }),
            React.createElement(react_router_dom_3.Route, { exact: true, path: "/repairsOnline", component: repairsOnline_2.default }),
            React.createElement(react_router_dom_3.Route, { exact: true, path: "/parking", component: parking_2.default }),
            React.createElement(react_router_dom_3.Route, { exact: true, path: "/infoArea", component: infoArea_2.default }),
            React.createElement(react_router_dom_3.Route, { exact: true, path: "/message", component: message_2.default }),
            React.createElement(react_router_dom_3.Route, { exact: true, path: "/aboutMe", component: aboutMe_2.default }),
            React.createElement(react_router_dom_3.Route, { exact: true, path: "/narrate", component: narrate_2.default }),
            React.createElement(react_router_dom_3.Route, { exact: true, path: "/isay", component: isay_1.default }))), document.getElementById('viewContainer'));
});

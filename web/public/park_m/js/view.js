define("compat", ["require", "exports"], function (require, exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    class GlobalAction {
        web_call_webgl_initPark(pInfo) {
            console.log("web_call_webgl_initPark", pInfo);
        }
        web_call_webgl_switchCompany(pName) {
            console.log("web_call_webgl_switchCompany", pName);
        }
        web_call_webgl_switchRoom(pName) {
            console.log("web_call_webgl_SwitchRoom", pName);
        }
        web_call_webgl_switchMark(pName, pInfo) {
            console.log("web_call_webgl_switchMark", pName, pInfo);
        }
        web_call_webgl_mapReturnpark() {
            console.log("web_call_webgl_mapReturnpark");
        }
        web_call_webgl_pauseloadModuler() {
            console.log("web_call_webgl_pauseloadModuler");
        }
        web_call_webgl_continueloadModuler() {
            console.log("web_call_webgl_continueloadModuler");
        }
    }
    exports.default = GlobalAction;
});
define("findLease", ["require", "exports", "react", "react-router-dom", "compat", "dataService"], function (require, exports, React, RouterDOM, compat_1, dataService_1) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    class FindLease extends React.Component {
        constructor(props) {
            super(props);
            this.globalAction = new compat_1.default();
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
        mapReturnpark() {
            this.globalAction.web_call_webgl_mapReturnpark();
        }
        render() {
            return (React.createElement("div", { className: this.state.FindLeasecss },
                React.createElement("p", { className: "companyInfotit" },
                    React.createElement(RouterDOM.Link, { to: "/home" },
                        React.createElement("i", { className: "iconfont companyInfoicon", onClick: this.mapReturnpark.bind(this) }, "\uE83B")),
                    React.createElement("span", null, "\u62DB\u79DF\u67E5\u8BE2")),
                React.createElement("div", { className: this.state.showList == true ? "show" : "hide" },
                    React.createElement(LeaseList, null)),
                React.createElement("div", { className: this.state.showInfo == true ? "show" : "hide" },
                    React.createElement(LeaseInfo, null))));
        }
    }
    exports.default = FindLease;
    class LeaseList extends React.Component {
        constructor(props) {
            super(props);
            this.dataService = new dataService_1.default();
            this.globalAction = new compat_1.default();
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
                this.globalAction.web_call_webgl_continueloadModuler();
            }
            else {
                this.setState({
                    leaseListcss: "leaseList-all",
                    leaseul: "leaseul-all"
                });
                this.globalAction.web_call_webgl_pauseloadModuler();
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
            this.globalAction.web_call_webgl_switchRoom(id);
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
            return (React.createElement("div", { className: this.state.leaseListcss },
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
                            React.createElement("p", { onClick: this.showInfo.bind(this, "Info", i.id, i.name), className: this.state.indexOf == index ? "show" : "hide" },
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
                                return (React.createElement("li", { onClick: this.typeActive.bind(this, index, i), className: this.state.typeIndexof == index ? "areaTypeli-active" : "areaTypeli" }, i));
                            })),
                        React.createElement("span", { className: "searchBtn", onClick: this.searchRoomRent.bind(this) }, "\u641C\u7D22")))));
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
            Videoshow.setVideoshow(data);
        }
        componentDidMount() {
        }
        showList(a, id) {
            FindLease.toggleView(a, id);
        }
        toggleFold() {
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
                            React.createElement("li", { className: this.state.infoli == 2 ? "leaseInfoli-active" : "leaseInfoli", onClick: this.infoClick.bind(this, 2) }, "\u89C6\u9891\u8BB2\u89E3"),
                            React.createElement("li", { className: this.state.infoli == 1 ? "leaseInfoli-active" : "leaseInfoli", onClick: this.infoClick.bind(this, 1) }, "\u7167\u7247\u5C55\u793A"))),
                    React.createElement("div", { className: "leaseContain" },
                        React.createElement("div", { className: this.state.infoli == 0 ? "show" : "hide" },
                            React.createElement(LeaseInfos, null)),
                        React.createElement("div", { className: this.state.infoli == 1 ? "show" : "hide" },
                            React.createElement(Picshow, null)),
                        React.createElement("div", { className: this.state.infoli == 2 ? "show" : "hide" },
                            React.createElement(Videoshow, null))))));
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
                man: data.response.contact,
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
            console.log("setPicshowSSSSSSSSSSS", this.state.roomImg);
        }
        render() {
            return (React.createElement("div", { className: "picshow" },
                React.createElement("ul", null, this.state.roomImg.map((i, index) => {
                    return (React.createElement("li", null,
                        React.createElement("img", { src: i.url })));
                }))));
        }
    }
    class Videoshow extends React.Component {
        constructor(props) {
            super(props);
            this.state = {
                roomVideo: []
            };
            Videoshow.setVideoshow = this.setVideoshow.bind(this);
        }
        componentDidMount() { }
        static setVideoshow(data) { }
        setVideoshow(data) {
            console.log("setsetVideoshowVVVVVVV", data);
            this.setState({
                roomVideo: data.response.video,
            });
        }
        render() {
            return (React.createElement("div", { className: "picshow" },
                React.createElement("ul", null, this.state.roomVideo.map((i, index) => {
                    return (React.createElement("li", { style: { "width": "56rem", " height": "36rem" } },
                        React.createElement("video", { src: i.url, style: { "width": "100%", "height": "100%" }, controls: true }, "\u5F53\u524D\u6D4F\u89C8\u5668\u4E0D\u652F\u6301video\u64AD\u653E")));
                }))));
        }
    }
});
define("dataService", ["require", "exports"], function (require, exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    class DataService {
        constructor() {
            this.state = {
                rooturl: "http://192.168.1.13:90",
                token: "",
            };
        }
        componentDidMount() {
            console.log(localStorage.getItem("token"));
        }
        callback(a, pBack) {
            console.log("callback1", a);
            pBack("callback");
        }
        login(pBack) {
            console.log("login");
            $.ajax({
                url: this.state.rooturl + '/api/login',
                data: {
                    "email": "test@test.com",
                    "password": 123456
                },
                type: "post",
                success: function (data) {
                    console.log("login-getToken", data);
                    localStorage.setItem("token", data.token);
                }
            });
        }
        refreshToken(ytoken) {
            $.ajax({
                url: this.state.rooturl + '/api/refresh',
                data: {
                    "token": ytoken,
                },
                type: "post",
                success: function (data) {
                    console.log("login-getToken", data);
                }
            });
        }
        getCompanyType(pBack, park_id) {
            let thetoken = localStorage.getItem("token");
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
            pBack(data);
        }
        findCompany(pBack, park_id, company_type_id, name) {
            console.log("findCompany", park_id, company_type_id, name);
            let thetoken = localStorage.getItem("token");
            let data = {
                "return_code": "100",
                "response": [
                    {
                        "id": "1009",
                        "name": "桂林国家高新",
                        "headimgurl": "./park_m/image/i.png",
                        "building_id": "a座",
                        "floor_id": "1F",
                        "room_id": "201-2",
                        "address": "桂林市七星区民华产业园E座B区三楼",
                        "company_type": "科技服务",
                    },
                    {
                        "id": "1010",
                        "name": "桂林国家高新",
                        "headimgurl": "./park_m/image/i.png",
                        "building_id": "a座",
                        "floor_id": "1F",
                        "room_id": "201-2",
                        "address": "桂林市七星区民华产业园E座B区三楼",
                        "company_type": "科技服务",
                    }
                ],
                "err_msg": ""
            };
            pBack(data);
        }
        getCompanyInfo(pBack, id) {
            console.log("getCompanyInfo", pBack, id);
            var data = {
                "return_code": "100",
                "response": {
                    "id": "1009",
                    "name": "桂林国家高新",
                    "headimgurl": "./park_m/image/i.png",
                    "building_id": "a座",
                    "floor_id": "1F",
                    "room_id": "201-2",
                    "address": "桂林市七星区信息产业园E座B区三楼",
                    "contact": "莫xxx",
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
                            "pic_url": "./park_m/image/i.png",
                        }, {
                            "id": "1009",
                            "name": "xxx图片",
                            "pic_url": "./park_m/image/i.png",
                        }
                    ],
                    "product": [
                        {
                            "id": "1009",
                            "name": "xxx图片",
                            "pic_url": "./park_m/image/i.png",
                        }, {
                            "id": "1009",
                            "name": "xxx图片",
                            "pic_url": "./park_m/image/i.png",
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
            pBack(data);
        }
        getRoomRentSquareType(pBack, park_id) {
            console.log("init-AllareaType", pBack, park_id);
            let thetoken = localStorage.getItem("token");
            $.ajax({
                url: this.state.rooturl + '/api/getRoomRentSquareType',
                data: {
                    "park_id": park_id,
                    "token": thetoken,
                },
                type: "get",
                success: function (data) {
                    console.log("getRoomRentSquareType", data);
                    if (data.status == 113) {
                    }
                    else {
                        pBack(data);
                        console.log("getRoomRentSquareType", data);
                    }
                }
            });
        }
        findRoomRentByparkid(pBack, park_id, square) {
            console.log("findRoomRentByparkid", pBack, park_id, square);
            let thetoken = localStorage.getItem("token");
            let data = {
                "return_code": "100",
                "response": [
                    {
                        "id": "1009",
                        "headimgurl": "./park_m/image/i.png",
                        "building_id": "a座",
                        "floor_id": "1F",
                        "room_id": "201-2",
                        "date": "2019-07-05",
                        "square": "45",
                        "price": "2.8"
                    }
                ],
                "err_msg": ""
            };
            pBack(data);
        }
        findRoomRentByroomid(pBack, id) {
            console.log("findRoomRentByroomid", pBack, id);
            var data = {
                "return_code": "100",
                "response": {
                    "id": "1009",
                    "headimgurl": "./park_m/image/i.png",
                    "building_id": "a座",
                    "floor_id": "1F",
                    "room_id": "201-2",
                    "date": "2019-07-05",
                    "square": "45m²",
                    "price": "2.8元/m²/天",
                    "squre": "150",
                    "floor": "4楼",
                    "lift": "有",
                    "contact": "莫xxx",
                    "phone": "135000000",
                    "inspection_time": "80:30-12:00",
                    "require": "一年起租",
                    "pic": [
                        {
                            "id": "1009",
                            "name": "xxx图片",
                            "url": "./park_m/image/i.png",
                        }, {
                            "id": "1009",
                            "name": "xxx图片",
                            "url": "./park_m/image/i.png",
                        }, {
                            "id": "1009",
                            "name": "xxx图片",
                            "url": "./park_m/image/i.png",
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
                            "url": "https://www.yongtoc.com/themes/ytyc.mp4",
                            "position": "",
                        }
                    ]
                },
                "err_msg": ""
            };
            pBack(data);
        }
        getTakingPhotosType(pBack, park_id) {
            console.log("getTakingPhotosType", pBack, park_id);
            var data = {
                "return_code": "100",
                "response": [
                    {
                        "id": "1009",
                        "name": "阻挡主要出入口",
                    },
                    {
                        "id": "1009",
                        "name": "非停车位侧停车",
                    }
                ],
                "err_msg": ""
            };
            pBack(data);
        }
        getTakingPhotos(pBack, park_id, name) {
            console.log("随手拍list", park_id, name);
            let data = {
                "return_code": "100",
                "response": [
                    {
                        "id": "1009",
                        "type": "非停车位侧停车",
                        "car_license": "桂C123456",
                        "time": "2020-02-28 14:38:15",
                        "position": "A座厦门旁",
                        "longitude": "10.55",
                        "latitude": "66.666",
                        "photo": "./park_m/image/i.png"
                    }, {
                        "id": "1009",
                        "type": "非停车位侧停车",
                        "car_license": "桂C120000",
                        "time": "2020-02-28 14:38:15",
                        "position": "A座厦门旁",
                        "longitude": "10.55",
                        "latitude": "66.666",
                        "photo": "./park_m/image/i.png"
                    }
                ],
                "err_msg": ""
            };
            pBack(data);
        }
        getTakingPhotoInfo(pBack, id) {
            console.log("随手拍list", id);
            let data = {
                "return_code": "100",
                "response": {
                    "id": "1009",
                    "type_name": "非停车位侧停车",
                    "car_license": "桂A5000",
                    "time": "2020-02-28 14:38:15",
                    "position": "A座厦门旁",
                    "longitude": "10.55",
                    "latitude": "66.666",
                    "descript": "横跨在斑马线上",
                    "photo": "./park_m/image/i.png",
                },
                "err_msg": ""
            };
            pBack(data);
        }
        postTakingPhotoInfo(pBack, data) {
            console.log("postTakingPhotoInfo", data);
            pBack("随手拍提交完成");
        }
        postAdvertisementPoint(pBack, data) {
            console.log("postAdvertisementPoint", data);
            pBack("摆点申请提交完成");
        }
        getRoomBook(pBack, park_id, name) {
            console.log("getRoomBook", pBack, park_id, name);
            var data = {
                "return_code": "100",
                "response": [
                    {
                        "id": "1009",
                        "building_id": "a座",
                        "floor_id": "1F",
                        "room_id": "201-1",
                        "headimgurl": "./park_m/image/i.png",
                        "price": [
                            {
                                "content": "4小时内",
                                "price": "1000元"
                            },
                            {
                                "content": "8小时内",
                                "price": "1600元"
                            }
                        ]
                    }, {
                        "id": "1009",
                        "building_id": "a座",
                        "floor_id": "1F",
                        "room_id": "201-2",
                        "headimgurl": "./park_m/image/i.png",
                        "price": [
                            {
                                "content": "4小时内",
                                "price": "1000元"
                            },
                            {
                                "content": "8小时内",
                                "price": "1600元"
                            }
                        ]
                    }
                ],
                "err_msg": ""
            };
            pBack(data);
        }
        getRoomBookInfo(pBack, id) {
            console.log("getRoomBookInfo", id);
            let data = {
                "return_code": "100",
                "response": {
                    "id": "1009",
                    "building_id": "a座",
                    "floor_id": "1F",
                    "room_id": "201-2",
                    "descript": [
                        {
                            "content": "地理位置:``````"
                        },
                        {
                            "content": "会议面积:``````"
                        }
                    ],
                    "guide": "为了加强会议室的管理。。。。。。",
                    "price": [
                        {
                            "content": "4小时内",
                            "price": "1000元"
                        },
                        {
                            "content": "8小时内",
                            "price": "1600元"
                        }
                    ]
                },
                "err_msg": ""
            };
            pBack(data);
        }
        bookingRoom(pBack, data) {
            console.log("bookingRoom", data);
            console.log("bookingRoom", data.room_id);
            pBack("提交成功！");
        }
        getRepairType(pBack) {
            console.log("getRepairType");
            let data = {
                "return_code": "100",
                "response": [
                    {
                        "id": "1009",
                        "name": "水管报修",
                    },
                    {
                        "id": "1009",
                        "name": "磁砖报修",
                    }
                ],
                "err_msg": ""
            };
            pBack(data);
        }
        saveRepairInfo(pBack, data) {
            console.log("saveRepairInfo", data);
            pBack("提交成功！");
        }
    }
    exports.default = DataService;
});
define("applyPut", ["require", "exports", "react", "react-router-dom", "dataService", "compat"], function (require, exports, React, RouterDOM, dataService_2, compat_2) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    class ApplyPut extends React.Component {
        constructor(props) {
            super(props);
            this.dataService = new dataService_2.default();
            this.globalAction = new compat_2.default();
            this.state = {
                inval: "",
                applicant: "莫光宇",
                phone: "13000000000",
                company: "永拓信息科技",
                applyPutcss: "applyPut-part ",
                iconfont: "iconfont iconfont-unturn",
                applyPutul: "applyPutul-part applyPutul",
                applyList: [],
                address: "",
                content: "ddd",
                inputValue: "",
                value: '2017-01-25',
            };
            ApplyPut.addapplyPut = this.addapplyPut.bind(this);
            this.delApply = this.delApply.bind(this);
        }
        toggleFold() {
            console.log("tftft");
            if (this.state.applyPutcss == "applyPut-all") {
                this.setState({
                    applyPutcss: "applyPut-part",
                    applyPutfrom: "applyPutfrom-part applyPutfrom"
                });
                this.globalAction.web_call_webgl_continueloadModuler();
            }
            else {
                this.setState({
                    applyPutcss: "applyPut-all",
                    applyPutfrom: "applyPutfrom-all applyPutfrom"
                });
                this.globalAction.web_call_webgl_pauseloadModuler();
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
        mapReturnpark() {
            this.globalAction.web_call_webgl_mapReturnpark();
        }
        static addapplyPut(x, y) { }
        ;
        addapplyPut(x, y) {
            let arr = this.state.applyList;
            arr.push({
                address: "请输入申请摆放地点", startTime: "2020-03-14", endTime: "2020-03-17", longitude: x, latitude: y
            });
            this.setState({
                applyList: arr
            });
            console.log(this.state);
        }
        foucus(event) {
            console.log("聚焦2", event.target.value);
            let index = event.target.getAttribute("data-index");
            console.log("address输入index", index);
        }
        blur(event) {
        }
        changeContent(event) {
            this.setState({
                content: event.target.value,
            });
        }
        changeAddress(event) {
            let index = event.target.getAttribute("data-index");
            let applyList = this.state.applyList;
            applyList[index].address = event.target.value;
            this.setState({
                applyList: applyList,
            });
        }
        delApply(event) {
            let index = event.target.getAttribute("data-index");
            let applyList = this.state.applyList;
            applyList.splice(index, 1);
            this.setState({ applyList: applyList });
            console.log("删除条目2", this.state.applyList);
            let longitude = event.target.getAttribute("data-longitude");
            let latitude = event.target.getAttribute("data-latitude");
        }
        sumbitApplyput() {
            console.log("提交摆点申请", this.state);
            this.dataService.postAdvertisementPoint(this.sumbitApplyputsucceed, this.state);
        }
        sumbitApplyputsucceed(data) {
            alert(data);
            window.history.back();
        }
        render() {
            return (React.createElement("div", null,
                React.createElement("p", { className: "companyInfotit" },
                    React.createElement(RouterDOM.Link, { to: "/home" },
                        React.createElement("span", { className: "iconfont companyInfoicon", onClick: this.mapReturnpark.bind(this) }, "\uE83B")),
                    React.createElement("span", null, "\u7533\u8BF7\u6446\u70B9")),
                React.createElement("div", { className: this.state.applyPutcss },
                    React.createElement("div", { className: "foleBtn", onClick: this.toggleFold.bind(this) },
                        React.createElement("i", { className: this.state.iconfont, style: { "fontSize": "5rem" } }, "\uE849")),
                    React.createElement("form", null,
                        React.createElement("ul", { className: this.state.applyPutul },
                            React.createElement("li", null,
                                React.createElement("span", { className: "applySpanleft" },
                                    React.createElement("span", { className: "redStar" }, "*"),
                                    "\u7533\u8BF7\u4EBA"),
                                React.createElement("p", { className: "applyRight" }, this.state.applicant)),
                            React.createElement("li", null,
                                React.createElement("span", { className: "redStar" }, "*"),
                                "\u624B\u673A\u53F7\u7801",
                                React.createElement("p", { className: "applyRight" }, this.state.phone)),
                            React.createElement("li", null,
                                React.createElement("span", { className: "redStar" }, "*"),
                                "\u7533\u8BF7\u5355\u4F4D",
                                React.createElement("p", { className: "applyRight" }, this.state.company)),
                            React.createElement("li", null,
                                React.createElement("p", null,
                                    React.createElement("span", { className: "redStar" }, "*"),
                                    "\u5177\u4F53\u5185\u5BB9\uFF1A"),
                                React.createElement("textarea", { className: "getapplyPuttextarea", value: this.state.content, placeholder: "\u8BF7\u5C06\u5177\u4F53\u5185\u5BB9\u63CF\u8FF0\u51FA\u6765\u3002\uFF08200\u5B57\u5185\uFF09", onChange: this.changeContent.bind(this) }))),
                        React.createElement("div", { className: "applyList" },
                            React.createElement("p", { className: "theapplyP" }, "\u8BF7\u5728\u6240\u9700\u6295\u653E\u5730\u70B9\u540E\u8BBE\u7F6E\u6295\u653E\u5F00\u59CB\u53CA\u7ED3\u675F\u65F6\u95F4"),
                            React.createElement("ul", { style: { "margin": "0" } },
                                React.createElement("li", null,
                                    React.createElement("div", { className: "applyAddress" }, "\u5E7F\u544A\u653E\u7F6E\u5730\u70B9"),
                                    React.createElement("div", { className: "applytime" }, "\u5F00\u59CB\u65F6\u95F4"),
                                    React.createElement("div", { className: "applytime" }, "\u7ED3\u675F\u65F6\u95F4"),
                                    React.createElement("div", { className: "applyicom" },
                                        " ",
                                        React.createElement("i", { className: "iconfont", style: { "color": "#fff" } }, "\uE82D"))),
                                this.state.applyList.map((i, index) => {
                                    return (React.createElement("li", { key: index },
                                        React.createElement("div", { className: "applyAddress" },
                                            React.createElement("span", { className: "applyIndexof" }, index + 1),
                                            React.createElement("input", { className: "", type: "text", placeholder: "\u641C\u7D22", style: { " width": "18rem", "border": 0 }, value: i.address, onFocus: this.foucus.bind(this), "data-longitude": i.longitude, "data-latitude": i.latitude, onBlur: this.blur.bind(this), onChange: this.changeAddress.bind(this), "data-index": index })),
                                        React.createElement("div", { className: "applytime", style: { "color": "#158CE8" } }, i.startTime),
                                        React.createElement("div", { className: "applytime", style: { "color": "#158CE8" } }, i.endTime),
                                        React.createElement("div", { className: "applyicom" },
                                            " ",
                                            React.createElement("i", { className: "iconfont", onClick: this.delApply, "data-longitude": i.longitude, "data-latitude": i.latitude, "data-index": index, style: { "color": "#158CE8" } }, "\uE81C"))));
                                }))),
                        React.createElement("div", { className: "applyPutSumbit", onClick: this.sumbitApplyput.bind(this) }, "\u63D0\u4EA4")))));
        }
    }
    exports.default = ApplyPut;
});
define("bookSite", ["require", "exports", "react", "react-router-dom", "dataService", "compat"], function (require, exports, React, RouterDOM, dataService_3, compat_3) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    class BookSite extends React.Component {
        constructor(props) {
            super(props);
            this.globalAction = new compat_3.default();
            this.state = {
                BookSitecss: "bookSite",
                showList: true,
                showInfo: false,
                showBook: false,
            };
            BookSite.toggleView = this.toggleView.bind(this);
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
        mapReturnpark() {
            this.globalAction.web_call_webgl_mapReturnpark();
        }
        render() {
            return (React.createElement("div", { className: this.state.BookSitecss },
                React.createElement("p", { className: "companyInfotit" },
                    React.createElement(RouterDOM.Link, { to: "/home", onClick: this.mapReturnpark.bind(this) },
                        React.createElement("i", { className: "iconfont companyInfoicon" }, "\uE83B")),
                    React.createElement("span", null, "\u573A\u5730\u9884\u7EA6")),
                React.createElement("div", { className: this.state.showList == true ? "show" : "hide" },
                    React.createElement(BookList, null)),
                React.createElement("div", { className: this.state.showInfo == true ? "show" : "hide" },
                    React.createElement(BookInfo, null))));
        }
    }
    exports.default = BookSite;
    class BookList extends React.Component {
        constructor(props) {
            super(props);
            this.dataService = new dataService_3.default();
            this.globalAction = new compat_3.default();
            this.state = {
                bookListcss: "bookList-part",
                iconfont: "iconfont iconfont-unturn",
                bookul: "bookul",
                indexOf: 0,
                park_id: 1,
                inputValue: "搜索",
                bookData: []
            };
            this.getRoomBook = this.getRoomBook.bind(this);
        }
        componentDidMount() {
            this.dataService.getRoomBook(this.getRoomBook, this.state.park_id, name);
        }
        getRoomBook(data) {
            console.log("returnRoomBook", data);
            this.setState({
                bookData: data.response,
            });
        }
        toggleFold() {
            console.log("tftft");
            if (this.state.bookListcss == "bookList-all") {
                this.setState({
                    bookListcss: "bookList-part",
                    bookul: "bookul"
                });
                this.globalAction.web_call_webgl_continueloadModuler();
            }
            else {
                this.setState({
                    bookListcss: "bookList-all",
                    bookul: "bookul-all"
                });
                this.globalAction.web_call_webgl_pauseloadModuler();
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
        showInfo(a, id, name, e) {
            BookSite.toggleView(a, id);
            console.log("more", a, id, name, e);
            BookInfo.getRoomdata(id);
        }
        bookActive(index, id) {
            console.log("active", index, id);
            this.setState({
                indexOf: index,
                roomId: id
            });
            console.log("bookActive", this.state);
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
            });
        }
        searchRoomBook() {
            console.log("搜索", this.state);
            this.dataService.getRoomBook(this.getRoomBook, this.state.park_id, this.state.inputValue);
        }
        render() {
            return (React.createElement("div", { className: this.state.bookListcss },
                React.createElement("div", { className: "foleBtn", onClick: this.toggleFold.bind(this) },
                    React.createElement("i", { className: this.state.iconfont, style: { "fontSize": "5rem" } }, "\uE849")),
                React.createElement("ul", { className: this.state.bookul }, this.state.bookData.map((i, index) => {
                    return (React.createElement("li", { onClick: this.bookActive.bind(this, index, i.id), className: this.state.indexOf == index ? "bookli-active" : "bookli" },
                        React.createElement("div", { className: "bookImgback" },
                            React.createElement("img", { src: i.headimgurl })),
                        React.createElement("div", { className: "bookul-middle" },
                            React.createElement("p", { style: { "font-size": "2.4rem", "font-weight": "bold" } },
                                i.building_id,
                                "-",
                                i.floor_id,
                                "-",
                                i.room_id),
                            i.price.map((it, index) => {
                                return (React.createElement("p", { style: { "font-size": "2.5rem" } },
                                    it.content,
                                    "\uFF1A",
                                    React.createElement("span", { className: "bookPrice" }, it.price),
                                    " "));
                            })),
                        React.createElement("div", { className: "bookul-right" },
                            React.createElement("p", { onClick: this.showInfo.bind(this, "Info", i.id, "name"), className: this.state.indexOf == index ? "show" : "hide" },
                                "\u66F4\u591A",
                                React.createElement("i", { className: "iconfont", style: { "fontSize": "2rem" } }, "\uE827")))));
                })),
                React.createElement("div", { className: "bookBtn" },
                    React.createElement("div", { className: "searchBox" },
                        React.createElement("span", { className: "searchBox-text" },
                            React.createElement("span", { className: "iconfont", style: { "fontSize": "3rem" } }, "\uE810"),
                            React.createElement("input", { className: "leaseSearch", type: "text", placeholder: "\u641C\u7D22", value: this.state.inputValue, onFocus: this.foucus.bind(this), onBlur: this.blur.bind(this), onChange: this.change.bind(this) }))),
                    React.createElement("span", { className: "searchBtn", onClick: this.searchRoomBook.bind(this) }, "\u641C\u7D22"))));
        }
    }
    class BookInfo extends React.Component {
        constructor(props) {
            super(props);
            this.dataService = new dataService_3.default();
            this.state = {
                bookInfocss: "bookInfos",
                iconfont: "iconfont iconfont-unturn",
                building: "A",
                floor: "1F",
                room: "206",
                infoli: 0,
                bookInfoul: "bookInfoul",
                leaseInfoul: "leaseInfoul_br",
            };
            BookInfo.showList = this.showList.bind(this);
            this.toggleFold = this.toggleFold.bind(this);
            BookInfo.getRoomdata = this.getRoomdata.bind(this);
            this.setBookdata = this.setBookdata.bind(this);
        }
        static getRoomdata(id) { }
        getRoomdata(id) {
            this.dataService.getRoomBookInfo(this.setBookdata, id);
        }
        static setBookdata(data) { }
        setBookdata(data) {
            console.log("setBookdata,setBookdata", data);
            this.setState({
                building: data.response.building_id,
                floor: data.response.floor_id,
                room: data.response.room_id,
            });
            SiteInfos.getInfos(data);
            Notes.getNotes(data);
            BookRoom.getRoomdata(data);
        }
        static showList(a, id) { }
        ;
        showList(a, id) {
            console.log("showList", a);
            BookSite.toggleView(a, id);
            this.setState({
                infoli: 0,
                bookInfocss: "bookInfos",
            });
        }
        toggleFold() {
            console.log("tftft", this.state.infoli);
            if (this.state.infoli == 2) {
                if (this.state.bookInfocss == "bookInfos") {
                    this.setState({
                        bookInfocss: "bookInfos-all",
                    });
                }
                else {
                    this.setState({
                        bookInfocss: "bookInfos",
                    });
                }
            }
            else {
                if (this.state.bookInfocss == "bookInfos") {
                    this.setState({
                        bookInfocss: "bookInfos-part",
                    });
                }
                else {
                    this.setState({
                        bookInfocss: "bookInfos",
                    });
                }
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
            return (React.createElement("div", { className: this.state.bookInfocss },
                React.createElement("p", { className: "companyInfotit" },
                    React.createElement("span", { className: "iconfont companyInfoicon", onClick: this.showList.bind(this, "List", "id-01") }, "\uE83B"),
                    React.createElement("span", { className: this.state.infoli !== 2 ? "show" : "hide" },
                        this.state.building,
                        "-",
                        this.state.floor,
                        "-",
                        this.state.room),
                    React.createElement("span", { className: this.state.infoli == 2 ? "show" : "hide" }, "\u9884\u5B9A\u7533\u8BF7")),
                React.createElement("div", { className: "foleBtn", onClick: this.toggleFold.bind(this) },
                    React.createElement("i", { className: this.state.iconfont, style: { "fontSize": "5rem" } }, "\uE849")),
                React.createElement("div", { className: this.state.infoli !== 2 ? "leaseInfoul" : "hide" },
                    React.createElement("ul", { className: this.state.bookInfoul },
                        React.createElement("li", { className: this.state.infoli == 0 ? "bookInfoli-active" : "bookInfoli", onClick: this.infoClick.bind(this, 0) }, "\u573A\u5730\u4FE1\u606F"),
                        React.createElement("li", { className: this.state.infoli == 1 ? "bookInfoli-active" : "bookInfoli", onClick: this.infoClick.bind(this, 1) }, "\u4F7F\u7528\u987B\u77E5"))),
                React.createElement("div", { className: "infoContain" },
                    React.createElement("div", { className: this.state.infoli == 0 ? "show" : "hide" },
                        React.createElement(SiteInfos, null)),
                    React.createElement("div", { className: this.state.infoli == 1 ? "show" : "hide" },
                        React.createElement(Notes, null)),
                    React.createElement("div", { className: this.state.infoli == 2 ? "show" : "hide" },
                        React.createElement(BookRoom, null)),
                    React.createElement("div", { className: this.state.infoli !== 2 ? "bookSumbit" : "hide", onClick: this.infoClick.bind(this, 2) }, "\u9884\u5B9A"))));
        }
    }
    class BookRoom extends React.Component {
        constructor(props) {
            super(props);
            this.globalAction = new compat_3.default();
            this.dataService = new dataService_3.default();
            this.state = {
                iconfont: "iconfont iconfont-unturn",
                bookRoom: "bookRoom-part",
                bookformcss: "bookform-part",
                id: "",
                applicant: "赵xxx",
                phone: "15211111111",
                company: "永拓信息科技",
                room: "",
                building_id: "",
                floor_id: "",
                room_id: "",
                start_date: "2020-02-28",
                start_time: "19:30:00",
                end_date: "2020-02-28",
                end_time: "19:30:00",
                theme: "",
                content: "",
            };
            BookRoom.getRoomdata = this.getRoomdata.bind(this);
        }
        componentDidMount() {
            console.log("NotesNotesNotes");
        }
        static getRoomdata(data) { }
        ;
        getRoomdata(data) {
            console.log("getBook", data);
            this.setState({
                id: data.response.id,
                building_id: data.response.building_id,
                floor_id: data.response.floor_id,
                room_id: data.response.room_id,
            });
        }
        toggleFold() {
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
            if (this.state.bookRoom == "bookRoom-part") {
                this.setState({
                    bookRoom: "bookRoom-all",
                    bookformcss: "bookform-all "
                });
                this.globalAction.web_call_webgl_pauseloadModuler();
            }
            else {
                this.setState({
                    bookRoom: "bookRoom-part",
                    bookformcss: "bookform-part"
                });
                this.globalAction.web_call_webgl_continueloadModuler();
            }
        }
        changebookContent(event) {
            this.setState({
                content: event.target.value,
            });
        }
        changebookTheme(event) {
            this.setState({
                theme: event.target.value,
            });
        }
        bookSumbit() {
            console.log("bookSumbit", this.state);
            this.dataService.bookingRoom(this.bookSumbitOK, this.state);
        }
        bookSumbitOK(data) {
            alert(data);
        }
        render() {
            return (React.createElement("div", { className: this.state.bookRoom },
                React.createElement("div", { className: "foleBtn", onClick: this.toggleFold.bind(this) },
                    React.createElement("i", { className: this.state.iconfont, style: { "fontSize": "5rem" } }, "\uE849")),
                React.createElement("form", { className: this.state.bookformcss },
                    React.createElement("ul", { className: "bookfromul" },
                        React.createElement("li", null,
                            React.createElement("span", { className: "bookformLeft" },
                                React.createElement("span", { className: "redStar" }, "*"),
                                "\u7533\u8BF7\u4EBA"),
                            React.createElement("p", { className: "bookfromliRight" },
                                React.createElement("input", { type: "text", value: this.state.applicant, placeholder: "\u8BF7\u8F93\u5165\u8054\u7CFB\u4EBA\u59D3\u540D" }))),
                        React.createElement("li", null,
                            React.createElement("span", { className: "bookformLeft" },
                                " ",
                                React.createElement("span", { className: "redStar" }, "*"),
                                "\u624B\u673A\u53F7\u7801"),
                            React.createElement("p", { className: "bookfromliRight" },
                                React.createElement("input", { type: "number", value: this.state.phone, placeholder: "\u8BF7\u8F93\u5165\u8054\u7CFB\u4EBA\u59D3\u540D" }))),
                        React.createElement("li", null,
                            React.createElement("span", { className: "bookformLeft" },
                                React.createElement("span", { className: "redStar" }, "*"),
                                "\u7533\u8BF7\u4F01\u4E1A"),
                            React.createElement("p", { className: "bookfromliRight" },
                                React.createElement("input", { type: "text", value: this.state.company, placeholder: "\u8BF7\u8F93\u5165\u4F01\u4E1A\u540D\u79F0" }))),
                        React.createElement("li", { className: "bookActive" },
                            React.createElement("span", { className: "bookformLeft" },
                                React.createElement("span", { style: { "color": "#F2F2F2", "margin-right": "1rem" } }, "*"),
                                "\u4F7F\u7528\u573A\u5730"),
                            React.createElement("p", { className: "bookfromliRight" },
                                this.state.building_id,
                                "-",
                                this.state.floor_id,
                                "-",
                                this.state.room_id)),
                        React.createElement("li", null,
                            React.createElement("span", { className: "bookformLeft" },
                                React.createElement("span", { className: "redStar" }, "*"),
                                "\u5F00\u59CB\u65E5\u671F"),
                            React.createElement("p", { className: "bookfromliRight" },
                                React.createElement("input", { type: "text", value: this.state.start_date, placeholder: "\u8BF7\u9009\u62E9\u5F00\u59CB\u65E5\u671F" }),
                                React.createElement("i", { className: "iconfont", style: { "color": " #158CE8", "float": "right", "font-size": "3rem" } }, "\uE82D"))),
                        React.createElement("li", null,
                            React.createElement("span", { className: "bookformLeft" },
                                React.createElement("span", { className: "redStar" }, "*"),
                                "\u5F00\u59CB\u65F6\u95F4"),
                            React.createElement("p", { className: "bookfromliRight" },
                                React.createElement("input", { type: "text", value: this.state.start_time, placeholder: "\u8BF7\u9009\u62E9\u5F00\u59CB\u65F6\u95F4" }),
                                React.createElement("i", { className: "iconfont", style: { "color": " #949494", "float": "right", "font-size": "3rem" } }, "\uE827"))),
                        React.createElement("li", null,
                            React.createElement("span", { className: "bookformLeft" },
                                React.createElement("span", { className: "redStar" }, "*"),
                                "\u7ED3\u675F\u65E5\u671F"),
                            React.createElement("p", { className: "bookfromliRight" },
                                React.createElement("input", { type: "text", value: this.state.end_date, placeholder: "\u8BF7\u9009\u62E9\u7ED3\u675F\u65E5\u671F" }),
                                React.createElement("i", { className: "iconfont", style: { "color": " #158CE8", "float": "right", "font-size": "3rem" } }, "\uE82D"))),
                        React.createElement("li", null,
                            React.createElement("span", { className: "bookformLeft" },
                                React.createElement("span", { className: "redStar" }, "*"),
                                "\u7ED3\u675F\u65F6\u95F4"),
                            React.createElement("p", { className: "bookfromliRight" },
                                React.createElement("input", { type: "text", value: this.state.end_time, placeholder: "\u8BF7\u9009\u62E9\u7ED3\u675F\u65F6\u95F4" }),
                                React.createElement("i", { className: "iconfont", style: { "color": " #949494", "float": "right", "font-size": "3rem" } }, "\uE827"))),
                        React.createElement("li", null,
                            React.createElement("p", null,
                                React.createElement("span", { className: "redStar" }, "*"),
                                "\u4F1A\u8BAE\u4E3B\u9898\uFF1A"),
                            React.createElement("textarea", { className: "bookTheme", value: this.state.theme, placeholder: "50\u5B57\u5185", onChange: this.changebookTheme.bind(this) })),
                        React.createElement("li", null,
                            React.createElement("p", null,
                                React.createElement("span", { className: "redStar" }, "*"),
                                "\u5177\u4F53\u9700\u6C42\uFF1A"),
                            React.createElement("textarea", { className: "bookContent", value: this.state.content, placeholder: "50\u8BF7\u5C06\u5177\u4F53\u9700\u6C42\u63CF\u8FF0\u51FA\u6765\u3002\uFF08200\u5B57\u5185\uFF09", onChange: this.changebookContent.bind(this) }))),
                    React.createElement("div", { className: "bookSumbit", onClick: this.bookSumbit.bind(this) }, "\u63D0\u4EA4"))));
        }
    }
    class SiteInfos extends React.Component {
        constructor(props) {
            super(props);
            this.state = {
                descript: [],
            };
            SiteInfos.getInfos = this.getInfos.bind(this);
        }
        componentDidMount() {
            console.log("场地信息,场地信息");
        }
        static getInfos(data) { }
        ;
        getInfos(data) {
            console.log("getinfo", data);
            this.setState({
                descript: data.response.descript,
            });
        }
        render() {
            return (React.createElement("div", { className: "siteInfosbox" },
                React.createElement("ul", null, this.state.descript.map((i, index) => {
                    return (React.createElement("li", null,
                        index + 1,
                        "\u3001",
                        i.content,
                        " "));
                }))));
        }
    }
    class Notes extends React.Component {
        constructor(props) {
            super(props);
            this.state = {
                guide: "",
            };
            Notes.getNotes = this.getNotes.bind(this);
        }
        componentDidMount() {
            console.log("使用须知,使用须知");
        }
        static getNotes(data) { }
        ;
        getNotes(data) {
            console.log("NotesNotes", data);
            this.setState({
                guide: data.response.guide,
            });
        }
        render() {
            return (React.createElement("div", { className: "notesBox" },
                React.createElement("p", null,
                    "\u5C0A\u656C\u7684\u4F01\u4E1A\uFF1A \u60A8\u597D\uFF0C",
                    React.createElement("span", null, this.state.guide))));
        }
    }
});
define("bottomBtn", ["require", "exports", "react", "react-router-dom", "compat", "css!./styles/view.css"], function (require, exports, React, RouterDOM, compat_4) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    class BottomBtn extends React.Component {
        constructor(props) {
            super(props);
            this.props = {
                history: this.props.history
            };
            this.globalAction = new compat_4.default();
            this.state = {
                index: 1,
                iconImg1In: "./park_m/image/bottomBtn/3d-in.png",
                iconImg1Un: "./park_m/image/bottomBtn/3d-un.png",
                iconImg2In: "./park_m/image/bottomBtn/wq-in.png",
                iconImg2Un: "./park_m/image/bottomBtn/wq-un.png",
                iconImg3In: "./park_m/image/bottomBtn/zx-in.png",
                iconImg3Un: "./park_m/image/bottomBtn/zx-un.png",
                iconImg4In: "./park_m/image/bottomBtn/my-in.png",
                iconImg4Un: "./park_m/image/bottomBtn/my-un.png",
            };
            this.toggleIcon = this.toggleIcon.bind(this);
        }
        componentDidMount() {
            if (this.props.history.location.pathname === "/home") {
                this.setState({ index: 1 }, () => {
                    this.toggleIcon(this.state.index);
                });
            }
            else if (this.props.history.location.pathname === "/home/infoArea") {
                this.setState({ index: 2 }, () => {
                    this.toggleIcon(this.state.index);
                });
            }
            else if (this.props.history.location.pathname === "/home/information") {
                this.setState({ index: 3 }, () => {
                    this.toggleIcon(this.state.index);
                });
            }
            else {
                this.setState({ index: 4 }, () => {
                    this.toggleIcon(this.state.index);
                });
            }
        }
        toggleIcon(data) {
            this.setState({
                index: data
            });
            if (data == 1) {
                this.globalAction.web_call_webgl_continueloadModuler();
            }
            else {
                this.globalAction.web_call_webgl_pauseloadModuler();
            }
        }
        render() {
            return (React.createElement("div", { className: "bottomView" },
                React.createElement(RouterDOM.Link, { to: "/home" },
                    React.createElement("div", { className: this.state.index == 1 ? "iconBox-bottomIn" : "iconBox-bottom", onClick: this.toggleIcon.bind(this, 1) },
                        React.createElement("img", { src: this.state.index == 1 ? this.state.iconImg1In : this.state.iconImg1Un }),
                        React.createElement("p", null, "3D\u6C99\u76D8"))),
                React.createElement(RouterDOM.Link, { to: "/home/infoArea" },
                    React.createElement("div", { className: this.state.index == 2 ? "iconBox-bottomIn" : "iconBox-bottom", onClick: this.toggleIcon.bind(this, 2) },
                        React.createElement("img", { src: this.state.index == 2 ? this.state.iconImg2In : this.state.iconImg2Un }),
                        React.createElement("p", null, "\u5FAE\u5708"))),
                React.createElement(RouterDOM.Link, { to: "/home/information" },
                    React.createElement("div", { className: this.state.index == 3 ? "iconBox-bottomIn" : "iconBox-bottom", onClick: this.toggleIcon.bind(this, 3) },
                        React.createElement("img", { src: this.state.index == 3 ? this.state.iconImg3In : this.state.iconImg3Un }),
                        React.createElement("p", null, "\u8D44\u8BAF"))),
                React.createElement(RouterDOM.Link, { to: "/home/personalCenter" },
                    React.createElement("div", { className: this.state.index == 4 ? "iconBox-bottomIn" : "iconBox-bottom", onClick: this.toggleIcon.bind(this, 4) },
                        React.createElement("img", { src: this.state.index == 4 ? this.state.iconImg4In : this.state.iconImg4Un }),
                        React.createElement("p", null, "\u6211\u7684")))));
        }
        ;
    }
    exports.default = BottomBtn;
});
define("home", ["require", "exports", "react", "react-router-dom", "bottomBtn", "dataService", "compat", "css!./styles/iconfont.css", "css!./styles/view.css"], function (require, exports, React, RouterDOM, bottomBtn_1, dataService_4, compat_5) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    class Home extends React.Component {
        constructor(props) {
            super(props);
            this.props = {
                history: this.props.history,
                children: this.props.children
            };
            this.globalAction = new compat_5.default();
            this.dataService = new dataService_4.default();
            this.setToken = this.setToken.bind(this);
        }
        componentDidMount() {
            this.dataService.login(this.setToken);
        }
        setToken(data) {
            console.log("setToken", data);
            localStorage.setItem("token", data.token);
        }
        backParklist() {
            this.globalAction.web_call_webgl_pauseloadModuler();
        }
        render() {
            return (React.createElement("div", null,
                React.createElement("div", { className: "backParklist", onClick: this.backParklist.bind(this) },
                    React.createElement(RouterDOM.Link, { to: "/" },
                        React.createElement("i", { className: "iconfont", style: { "fontSize": "4rem", "color": "#6C6C6C" } }, "\uE83B"))),
                React.createElement(TopBtn, null),
                React.createElement(FoldBtn, null),
                this.props.children,
                React.createElement(bottomBtn_1.default, { history: this.props.history })));
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
            this.globalAction = new compat_5.default();
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
                    this.globalAction.web_call_webgl_switchMark(a, 0);
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
                    this.globalAction.web_call_webgl_switchMark(a, 1);
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
                    this.globalAction.web_call_webgl_switchMark(a, 0);
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
                    this.globalAction.web_call_webgl_switchMark(a, 1);
                }
            }
            else if (a == "公交车") {
                if (this.state.topIcon3 == "iconBox-big") {
                    this.setState({
                        topIcon3: "iconBox-bigIn",
                        topIcon3info: 1,
                    });
                    this.globalAction.web_call_webgl_switchMark(a, 1);
                }
                else {
                    this.setState({
                        topIcon3: "iconBox-big",
                        topIcon3info: 0,
                    });
                    this.globalAction.web_call_webgl_switchMark(a, 0);
                }
            }
            else if (a == "全景") {
                if (this.state.topIcon4 == "iconBox-big") {
                    this.setState({
                        topIcon4: "iconBox-bigIn",
                        topIcon4info: 1,
                    });
                    this.globalAction.web_call_webgl_switchMark(a, 1);
                }
                else {
                    this.setState({
                        topIcon4: "iconBox-big",
                        topIcon4info: 0,
                    });
                    this.globalAction.web_call_webgl_switchMark(a, 0);
                }
            }
            else if (a == "停车场") {
                if (this.state.topIcon5 == "iconBox-big") {
                    this.setState({
                        topIcon5: "iconBox-bigIn",
                        topIcon5info: 1,
                    });
                    this.globalAction.web_call_webgl_switchMark(a, 1);
                }
                else {
                    this.setState({
                        topIcon5: "iconBox-big",
                        topIcon5info: 0,
                    });
                    this.globalAction.web_call_webgl_switchMark(a, 0);
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
                            React.createElement("p", null, "\u5728\u7EBF\u62A5\u4FEE"))))));
        }
    }
    exports.default = Home;
});
define("parkCompany", ["require", "exports", "react", "react-router-dom", "compat", "dataService"], function (require, exports, React, RouterDOM, compat_6, dataService_5) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    class ParkCompany extends React.Component {
        constructor(props) {
            super(props);
            this.globalAction = new compat_6.default();
            this.state = {
                parkCompanycss: "parkCompany",
                showList: true,
                showInfo: false,
                token: "",
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
        mapReturnpark() {
            this.globalAction.web_call_webgl_mapReturnpark();
        }
        render() {
            return (React.createElement("div", { className: this.state.parkCompanycss },
                React.createElement("p", { className: "companyInfotit" },
                    React.createElement(RouterDOM.Link, { to: "/home" },
                        React.createElement("i", { className: "iconfont companyInfoicon", onClick: this.mapReturnpark.bind(this) }, "\uE83B")),
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
            this.dataService = new dataService_5.default();
            this.globalAction = new compat_6.default();
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
                token: "",
            };
            this.showInfo = this.showInfo.bind(this);
            this.setCompany = this.setCompany.bind(this);
            this.setCompanyType = this.setCompanyType.bind(this);
        }
        componentWillMount() {
        }
        componentDidMount() {
            this.dataService.getCompanyType(this.setCompanyType, this.state.park_id);
            this.dataService.findCompany(this.setCompany, this.state.park_id, this.state.company_type_id, this.state.typeName);
        }
        setCompanyType(data) {
            console.log("set企业类型列表", data.response);
            this.setState({
                companyType: data.response,
            });
        }
        setCompany(data) {
            console.log("setCompany", data.response);
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
                this.globalAction.web_call_webgl_continueloadModuler();
            }
            else {
                this.setState({
                    companyListcss: "companyList-all",
                    companyul: "companyul-all"
                });
                this.globalAction.web_call_webgl_pauseloadModuler();
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
            this.globalAction.web_call_webgl_switchCompany(id);
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
                            React.createElement("p", { style: { "font-size": "2.5rem", "overflow": "hidden", "text-overflow": "ellipsis", "white-space": "nowrap" } },
                                React.createElement("i", { className: "iconfont", style: { "fontSize": "2.5rem" } }, "\uE815"),
                                i.address)),
                        React.createElement("div", { className: "companyul-right" },
                            React.createElement("p", { onClick: this.showInfo.bind(this, "Info", i.id, i.name), className: this.state.indexOf == index ? "show" : "hide" },
                                "\u66F4\u591A",
                                React.createElement("i", { className: "iconfont", style: { "fontSize": "2rem" } }, "\uE827")),
                            React.createElement("p", { className: this.state.indexOf == index ? "companyType-active" : "companyType" }, i.company_type))));
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
            this.dataService = new dataService_5.default();
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
                type: data.response.company_type,
                man: data.response.contact,
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
define("photograph", ["require", "exports", "react", "react-router-dom", "dataService"], function (require, exports, React, RouterDOM, dataService_6) {
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
            Photograph.getXY = this.getXY.bind(this);
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
        static getXY(x, y) { }
        ;
        getXY(x, y) {
            IllegalUpload.getXY(x, y);
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
            this.dataService = new dataService_6.default();
            this.state = {
                park_id: "1009",
                iconfont: "iconfont iconfont-unturn",
                illegalListcss: "illegalList-part",
                indexOf: 0,
                illegalul: "illegalul",
                inputValue: "",
                illegalList: [],
            };
            this.setillList = this.setillList.bind(this);
        }
        componentDidMount() {
            this.dataService.getTakingPhotos(this.setillList, this.state.park_id, "");
        }
        setillList(data) {
            this.setState({
                illegalList: data.response,
            });
        }
        changeList(event) {
            this.setState({
                inputValue: event.target.value,
            });
        }
        searchList() {
            this.dataService.getTakingPhotos(this.setillList, this.state.park_id, this.state.inputValue);
        }
        showPart(a, id, name, e) {
            Photograph.toggleView(a, id, name);
            console.log("more", a, id, name);
            IllegalInfo.getillInfo(id, name);
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
                                React.createElement("img", { src: i.photo })),
                            React.createElement("div", { className: "illegalul-middle " },
                                React.createElement("p", { className: this.state.indexOf == index ? "illegalType-active" : "illegalType", style: { "font-size": "2.4rem" } }, i.type),
                                React.createElement("p", { style: { "font-size": "2.3rem" } }, i.time),
                                React.createElement("p", { style: { "font-size": "2.3rem" } },
                                    React.createElement("i", { className: "iconfont", style: { "fontSize": "3rem", "margin-right": "1rem" } }, "\uE82B"),
                                    i.car_license),
                                React.createElement("p", { style: { "font-size": "2.3rem" } },
                                    React.createElement("i", { className: "iconfont", style: { "fontSize": "3rem", "margin-right": "1rem" } }, "\uE82C"),
                                    i.position),
                                React.createElement("p", { onClick: this.showPart.bind(this, "Info", i.id, i.car_license), style: { "font-size": "2.3rem", "float": "right", "color": "#fff" } },
                                    "\u66F4\u591A",
                                    React.createElement("i", { className: "iconfont", style: { "fontSize": "2rem" } }, "\uE827")))));
                    })),
                    React.createElement("div", { className: "illBottombox" },
                        React.createElement("div", { className: "searchBox" },
                            React.createElement("span", { className: "searchBox-text" },
                                React.createElement("i", { className: "iconfont", style: { "fontSize": "3rem" } }, "\uE810"),
                                React.createElement("input", { className: "companySearch", type: "text", placeholder: "\u8BF7\u8F93\u5165\u8F66\u724C\u53F7", onChange: this.changeList.bind(this) })))),
                    React.createElement("span", { className: "illegalLoadBtn", onClick: this.showPart.bind(this, "Load") }, "\u968F\u624B\u62CD"))));
        }
    }
    class IllegalUpload extends React.Component {
        constructor(props) {
            super(props);
            this.dataService = new dataService_6.default();
            this.state = {
                illcauseBox: "hide",
                illegalLoadcss: "illegalLoad-part",
                illfromcss: "illfrom-part illfrom",
                illTime: "",
                illImg: "./park_m/image/photo.png",
                illcauseUL: [],
                indexOf: 0,
                illcauseInname: "",
                illcauseInid: "",
                iconfont: "iconfont iconfont-unturn",
                park_id: "1001",
                car_license: "",
                time: "2020-02-28 14:38:15",
                position: "请点击地图选择违章点",
                longitude: 10.55,
                latitude: 66.666,
                type_id: 1,
                type_name: "",
                descript: "",
                photo: "byte文件",
            };
            IllegalUpload.getXY = this.getXY.bind(this);
            this.setillcauseUL = this.setillcauseUL.bind(this);
            this.showList = this.showList.bind(this);
        }
        componentDidMount() {
            this.dataService.getTakingPhotosType(this.setillcauseUL, this.state.park_id);
        }
        setillcauseUL(data) {
            this.setState({
                illcauseUL: data.response,
            });
        }
        showList(a, e, n) {
            Photograph.toggleView(a, e, n);
        }
        toggleFold() {
            console.log("tftft");
            if (this.state.illegalLoadcss == "illegalLoad-all") {
                this.setState({
                    illegalLoadcss: "illegalLoad-part ",
                    illfromcss: "illfrom-part illfrom"
                });
            }
            else {
                this.setState({
                    illegalLoadcss: "illegalLoad-all",
                    illfromcss: "illfrom-all illfrom"
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
        illimgClick() {
            this.illimginputClick();
        }
        illimginputClick() {
            console.log("2323", this);
        }
        showillcauseUL() {
            this.setState({
                illcauseBox: "illcauseBox"
            });
        }
        illCuased(i, id, name) {
            this.setState({
                type_id: id,
                type_name: name,
                indexOf: i,
            });
        }
        getillcause() {
            this.setState({
                illcauseBox: "hide"
            });
        }
        hideillcauseUL() {
            this.setState({
                illcauseBox: "hide",
                illcauseInname: "",
                illcauseInid: "",
            });
        }
        illposition(event) {
            this.setState({
                position: event.target.value
            });
        }
        static getXY(x, y) { }
        ;
        getXY(x, y) {
            console.log("外部传入经纬度", x, y);
            this.setState({
                longitude: x,
                latitude: y,
                position: "请输入位置点名称"
            });
        }
        illcarLicense(event) {
            this.setState({
                car_license: event.target.value
            });
        }
        illdescript(event) {
            this.setState({
                descript: event.target.value
            });
        }
        sumbitIllfrom() {
            console.log("sumbit", this.state);
            this.dataService.postTakingPhotoInfo(this.sumbitIllsuccess, this.state.park_id);
        }
        sumbitIllsuccess(data) {
            alert(data);
            this.setState({
                car_license: "",
                time: "",
                position: "请点击地图选择违章点",
                longitude: "",
                latitude: "",
                type_id: "",
                type_name: "",
                descript: "",
                photo: "",
            });
            Photograph.toggleView(0, "List", 0);
        }
        render() {
            return (React.createElement("div", null,
                React.createElement("p", { className: "companyInfotit" },
                    React.createElement("span", { className: "iconfont companyInfoicon", onClick: this.showList.bind(this, "List", "i.id") }, "\uE83B"),
                    React.createElement("span", null, "\u968F\u624B\u62CD")),
                React.createElement("div", { className: this.state.illegalLoadcss },
                    React.createElement("div", { className: "foleBtn", onClick: this.toggleFold.bind(this) },
                        React.createElement("i", { className: this.state.iconfont, style: { "fontSize": "5rem" } }, "\uE849")),
                    React.createElement("form", null,
                        React.createElement("ul", { className: this.state.illfromcss },
                            React.createElement("li", null,
                                React.createElement("span", { className: "redStar" }, "*"),
                                " \u8FDD\u89C4\u7167\u7247",
                                React.createElement("input", { type: "file", accept: "image/*", className: "getillImg", value: "", onClick: this.illimginputClick.bind(this), style: { "opacity": "0", "position": "absolute", "right": "-16rem" } }),
                                React.createElement("img", { src: this.state.illImg, onClick: this.illimgClick.bind(this) })),
                            React.createElement("li", null,
                                React.createElement("span", { className: "redStar" }, "*"),
                                " \u66DD\u5149\u7C7B\u578B",
                                React.createElement("input", { type: "text", className: "getillType", value: this.state.type_name, placeholder: "\u8BF7\u9009\u62E9\u66DD\u5149\u7C7B\u578B" }),
                                React.createElement("span", { className: "iconfont", style: { "fontSize": "3rem", "float": "right", " padding": " 0 0 0 3rem", "padding": " 0 0 0 4rem" }, onClick: this.showillcauseUL.bind(this) }, "\uE827")),
                            React.createElement("li", null,
                                React.createElement("span", { className: "redStar" }, "*"),
                                "  \u5730\u5740",
                                React.createElement("input", { type: "text", value: this.state.position, className: "getillAdd", placeholder: "", onChange: this.illposition.bind(this) }),
                                React.createElement("i", { className: "iconfont", style: { "fontSize": "3rem", "color": "#0B8BF0", "float": "right", "padding": " 0 0 0 4rem" } }, "\uE82C")),
                            React.createElement("li", null,
                                React.createElement("span", { className: "redStar" }, "*"),
                                " \u8F66\u724C",
                                React.createElement("input", { type: "text", value: this.state.car_license, className: "getillNum", placeholder: "\u8BF7\u8F93\u5165\u8FDD\u89C4\u8F66\u724C\u53F7", onChange: this.illcarLicense.bind(this) })),
                            React.createElement("li", null,
                                React.createElement("span", { className: "redStar" }, "*"),
                                " \u66DD\u5149\u65F6\u95F4",
                                React.createElement("input", { type: "datetime", className: "getillTime", value: this.state.time, placeholder: "\u8BF7\u8F93\u5165\u8FDD\u89C4\u65F6\u95F4" })),
                            React.createElement("li", null,
                                React.createElement("span", { className: "redStar" }, "*"),
                                " \u8FDD\u89C4\u63CF\u8FF0"),
                            React.createElement("li", null,
                                React.createElement("textarea", { className: "getilltextarea", value: this.state.descript, placeholder: "\u8BF7\u5C06\u8FDD\u89C4\u95EE\u9898\u63CF\u8FF0\u51FA\u6765\u3002\uFF08120\u5B57\u5185\uFF09", onChange: this.illdescript.bind(this) })),
                            React.createElement("div", { className: "illSumbit", onClick: this.sumbitIllfrom.bind(this) }, "\u63D0\u4EA4")))),
                React.createElement("div", { className: this.state.illcauseBox },
                    React.createElement("ul", { className: "illcauseULcss" }, this.state.illcauseUL.map((i, index) => {
                        return (React.createElement("li", { className: this.state.indexOf == index ? "illcauseli-active" : "illcauseli", onClick: this.illCuased.bind(this, index, i.id, i.name) }, i.name));
                    })),
                    React.createElement("div", { className: "illCuasedBtn" },
                        React.createElement("span", { className: "illCancel", onClick: this.hideillcauseUL.bind(this) }, "\u53D6\u6D88"),
                        React.createElement("span", { className: "illConfirm", onClick: this.getillcause.bind(this) }, "\u786E\u8BA4")))));
        }
    }
    class IllegalInfo extends React.Component {
        constructor(props) {
            super(props);
            this.dataService = new dataService_6.default();
            this.state = {
                iconfont: "iconfont iconfont-unturn",
                illegalInfocss: "illegalInfo-part",
                name: "",
                infoli: 0,
            };
            IllegalInfo.getillInfo = this.getillInfo.bind(this);
        }
        static getillInfo(id, name) { }
        ;
        getillInfo(id, name) {
            console.log(" 违规信息页", id, name);
            this.dataService.getTakingPhotoInfo(this.setillInfo, id);
            this.setState({
                name: name,
            });
        }
        setillInfo(data) {
            console.log("setillInfo", data);
            IllegalInfos.setIllinofs(data);
            IllegalImg.setIllimg(data);
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
            return (React.createElement("div", null,
                React.createElement("p", { className: "companyInfotit" },
                    React.createElement("span", { className: "iconfont companyInfoicon", onClick: this.showList.bind(this, "List", "id-01") }, "\uE83B"),
                    React.createElement("span", null,
                        this.state.name,
                        "\u8FDD\u89C4")),
                React.createElement("div", { className: this.state.illegalInfocss },
                    React.createElement("div", { className: "foleBtn", onClick: this.toggleFold.bind(this) },
                        React.createElement("i", { className: this.state.iconfont, style: { "fontSize": "5rem" } }, "\uE849")),
                    React.createElement("div", { className: "leaseInfoul_br" },
                        React.createElement("ul", { className: "leaseInfoul", style: { "width": "44rem" } },
                            React.createElement("li", { className: this.state.infoli == 0 ? "leaseInfoli-active" : "leaseInfoli", onClick: this.infoClick.bind(this, 0) }, "\u8FDD\u89C4\u4FE1\u606F"),
                            React.createElement("li", { className: this.state.infoli == 1 ? "leaseInfoli-active" : "leaseInfoli", onClick: this.infoClick.bind(this, 1) }, "\u8FDD\u89C4\u7167\u7247"))),
                    React.createElement("div", { className: "leaseContain" },
                        React.createElement("div", { className: this.state.infoli == 0 ? "show" : "hide" },
                            React.createElement(IllegalInfos, null)),
                        React.createElement("div", { className: this.state.infoli == 1 ? "show" : "hide" },
                            React.createElement(IllegalImg, null))))));
        }
    }
    class IllegalInfos extends React.Component {
        constructor(props) {
            super(props);
            this.state = {
                IllegalLoadcss: "illegalLoad-part",
                type_name: "",
                time: "",
                car_license: "",
                position: "",
                descript: "",
            };
            IllegalInfos.setIllinofs = this.setIllinofs.bind(this);
        }
        componentDidMount() { }
        static setIllinofs(data) { }
        ;
        setIllinofs(data) {
            this.setState({
                type_name: data.response.type_name,
                time: data.response.time,
                car_license: data.response.car_license,
                position: data.response.position,
                descript: data.response.descript,
            });
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
                React.createElement("p", null, this.state.type_name),
                React.createElement("p", null, this.state.time),
                React.createElement("p", null,
                    React.createElement("span", { className: "iconfont", style: { "fontSize": "3rem", "margin-right": "1rem" } }, "\uE82B"),
                    "\u8F66\u724C\uFF1A",
                    React.createElement("span", null, this.state.car_license)),
                React.createElement("p", null,
                    React.createElement("span", { className: "iconfont", style: { "fontSize": "3rem", "margin-right": "1rem" } }, "\uE815"),
                    "\u4F4D\u7F6E\uFF1A",
                    React.createElement("span", null, this.state.position)),
                React.createElement("p", null, this.state.descript)));
        }
    }
    class IllegalImg extends React.Component {
        constructor(props) {
            super(props);
            this.state = {
                illegalImg: "",
            };
            IllegalImg.setIllimg = this.setIllimg.bind(this);
        }
        componentDidMount() { }
        static setIllimg(data) { }
        ;
        setIllimg(data) {
            this.setState({
                illegalImg: data.response.photo
            });
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
});
define("infoArea", ["require", "exports", "react", "react-router-dom", "css!./styles/infoArea.css"], function (require, exports, React, react_router_dom_1) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    class InfoArea extends React.Component {
        constructor() {
            super(...arguments);
            this.state = {
                inputValue: "请输入主题",
                tagArr: ["咨询", "建议", "投诉", "其他"],
                listArr: [{ spread: true }, { spread: false }, { spread: false }, { spread: false }, { spread: false }, { spread: false }, { spread: false }, { spread: false }, { spread: false }],
                tagIndex: 0,
            };
        }
        foucus() {
            if (this.state.inputValue === "请输入主题") {
                this.setState({ inputValue: "" });
            }
        }
        blur() {
            if (this.state.inputValue === "") {
                this.setState({ inputValue: "请输入主题" });
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
                    React.createElement("div", { className: "infoarea-title" }, "\u6570\u5B57\u56ED\u533A"),
                    React.createElement("div", { className: "infoarea-child-top" },
                        React.createElement("input", { className: "infoarea-input", value: this.state.inputValue, onFocus: this.foucus.bind(this), onBlur: this.blur.bind(this), onChange: this.change.bind(this) }),
                        React.createElement("img", { src: "./park_m/image/search.png", className: "infoarea-search-img" }),
                        React.createElement("span", { className: "infoarea-sreach-bt" }, "\u641C\u7D22"))),
                React.createElement("div", { className: "infoarea-tag" }, this.state.tagArr.map((item, index) => {
                    return React.createElement("div", { key: index, className: index !== this.state.tagIndex ? "infoarea-tag-child" : "infoarea-tag-child-add", onClick: e => this.clickTag(index) }, item);
                })),
                React.createElement("div", { className: "infoarea-content" },
                    this.state.listArr.map((item, index) => {
                        return React.createElement("div", { className: item.spread ? "infoarea-content-child-bottom" : "infoarea-content-child", key: index }, item.spread ?
                            React.createElement("div", { style: { width: "100%", height: "100%" } },
                                React.createElement("div", { style: { height: "50%", width: "100%" } },
                                    React.createElement("div", { className: "infoarea-content-name" }, "\u5173\u4E8E\u65B0\u7684\u51ED\u79DF\u516C\u5BD3\u6392\u961F\u89C4\u5219"),
                                    React.createElement("div", { className: "infoarea-content-bottom", onClick: e => this.spread(index) },
                                        React.createElement("img", { src: "./park_m/image/right.png", className: "infoarea-content-right-img" }))),
                                React.createElement("div", { className: "infoarea-br" },
                                    index !== 2 ?
                                        React.createElement("div", { className: "infoarea-br-bt" }, "\u5DF2\u89E3\u51B3") :
                                        React.createElement("div", { className: "infoarea-br-bt-add" }, "\u53D7\u7406\u4E2D"),
                                    React.createElement("div", { className: "infoarea-br-data" }, "2020-03-06 14:38:15")),
                                React.createElement("div", { style: { borderTop: "3px solid #F2F2F2", marginTop: "30px", marginRight: "50px" } }),
                                React.createElement("div", { style: { fontSize: "40px", color: "#949494", marginTop: "20px" } }, "\u7559\u8A00\u5185\u5BB9:"),
                                React.createElement("div", { style: { fontSize: "40px", color: "#333333", marginTop: "20px" } }, "\u5173\u4E8E\u65B0\u7684\u51ED\u79DF\u516C\u5BD3\u6392\u961F\u89C4\u5219\uFF0C\u5173\u4E8E\u65B0\u7684\u51ED\u79DF\u516C\u5BD3\u6392\u961F\u89C4\u5219\uFF0C\u5173\u4E8E\u65B0\u7684\u51ED\u79DF\u516C\u5BD3\u6392\u961F\u89C4\u5219\uFF0C\u5173\u4E8E\u65B0\u7684\u51ED\u79DF\u516C\u5BD3\u6392\u961F\u89C4\u5219\uFF0C\u5173\u4E8E\u65B0\u7684\u51ED\u79DF\u516C\u5BD3\u6392\u961F\u89C4\u5219\u3002"),
                                React.createElement("div", { style: { fontSize: "40px", color: "#949494", marginTop: "30px" } }, "\u7559\u8A00\u56DE\u590D:"),
                                React.createElement("div", { style: { fontSize: "40px", marginTop: "20px" } },
                                    React.createElement("span", { style: { color: "#949494" } }, "\u7531"),
                                    React.createElement("span", { style: { fontWeight: "600", margin: "0 25px 0 25px" } }, "xxx"),
                                    React.createElement("span", { style: { color: "#949494" } }, "\u53D7\u7406\u4E8E"),
                                    React.createElement("span", { style: { color: "#333333", marginLeft: "25px" } }, "2020-02-28 17:38:15")),
                                React.createElement("div", { style: { fontSize: "40px", color: "#949494", marginTop: "20px" } }, "\u56DE\u590D\u5185\u5BB9:"),
                                React.createElement("div", { style: { fontSize: "40px", color: "#333333", marginTop: "20px", marginBottom: "150px" } }, "\u5173\u4E8E\u65B0\u7684\u51ED\u79DF\u516C\u5BD3\u6392\u961F\u89C4\u5219\uFF0C\u5173\u4E8E\u65B0\u7684\u51ED\u79DF\u516C\u5BD3\u6392\u961F\u89C4\u5219\uFF0C\u5173\u4E8E\u65B0\u7684\u51ED\u79DF\u516C\u5BD3\u6392\u961F\u89C4\u5219\uFF0C\u5173\u4E8E\u65B0\u7684\u51ED\u79DF\u516C\u5BD3\u6392\u961F\u89C4\u5219\uFF0C\u5173\u4E8E\u65B0\u7684\u51ED\u79DF\u516C\u5BD3\u6392\u961F\u89C4\u5219\u3002")) :
                            React.createElement("div", { style: { width: "100%", height: "100%" } },
                                React.createElement("div", { style: { height: "50%", width: "100%" } },
                                    React.createElement("div", { className: "infoarea-content-name" }, "\u5173\u4E8E\u65B0\u7684\u51ED\u79DF\u516C\u5BD3\u6392\u961F\u89C4\u5219"),
                                    React.createElement("div", { className: "infoarea-content-right", onClick: e => this.spread(index) },
                                        React.createElement("img", { src: "./park_m/image/right.png", className: "infoarea-content-right-img" }))),
                                React.createElement("div", { className: "infoarea-br" },
                                    index !== 2 ?
                                        React.createElement("div", { className: "infoarea-br-bt" }, "\u5DF2\u89E3\u51B3") :
                                        React.createElement("div", { className: "infoarea-br-bt-add" }, "\u53D7\u7406\u4E2D"),
                                    React.createElement("div", { className: "infoarea-br-data" }, "2020-03-06 14:38:15"))));
                    }),
                    React.createElement("div", { style: { width: "100%", height: "30%", textAlign: "center", fontSize: "40px", lineHeight: "60px", margin: "20px 0 0 -25px" } }, "\u5230\u5E95\u5566~")),
                React.createElement(react_router_dom_1.Link, { to: "/isay" },
                    React.createElement("div", { className: "infoarea-add-c" },
                        React.createElement("img", { src: "./park_m/image/add.png", width: "60px", height: "60px" })))));
        }
    }
    exports.default = InfoArea;
});
define("information", ["require", "exports", "react", "css!./styles/information.css"], function (require, exports, React) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    class Information extends React.Component {
        constructor() {
            super(...arguments);
            this.state = {
                informationList: [
                    { name: "优惠政策", imgUrl: "./park_m/image/preferentialPolicy.png" }, { name: "园区咨询", imgUrl: "./park_m/image/information.png" },
                    { name: "园区活动", imgUrl: "./park_m/image/activity.png" }, { name: "第三方服务", imgUrl: "./park_m/image/thirdParty.png" }
                ]
            };
        }
        render() {
            return (React.createElement("div", { className: "information" },
                React.createElement("div", { className: "information-top" },
                    React.createElement("div", { className: "information-title" }, "\u6570\u5B57\u56ED\u533A")),
                React.createElement("div", { className: "information-headline" },
                    React.createElement("div", { style: { float: "left", width: "25%", height: "100%" } },
                        React.createElement("img", { src: "./park_m/image/headline.png", style: { marginBottom: "14px" } })),
                    React.createElement("div", { style: { float: "left", width: "75%", height: "100%", textOverflow: "ellipsis", whiteSpace: "nowrap", overflow: "hidden" } }, "\u5173\u4E8E\u6842\u6797\u4FE1\u606F\u4EA7\u4E1A\u56ED\u56ED\u533A\u4F01\u4E1A\u590D\u5DE5\u7684\u91CD\u8981\u901A\u77E5\u4F60\u4F60\u4F60\u4F60\u4F60")),
                React.createElement("div", { className: "information-content" }, this.state.informationList.map((item, index) => {
                    return React.createElement("div", { className: "information-content-child", key: index },
                        React.createElement("img", { src: item.imgUrl, width: "130px", height: "130px" }),
                        React.createElement("div", { style: { marginTop: "20px" } }, item.name));
                }))));
        }
    }
    exports.default = Information;
});
define("personalCenter", ["require", "exports", "react", "react-router-dom", "css!./styles/personalCenter.css"], function (require, exports, React, react_router_dom_2) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    class PersonalCenter extends React.Component {
        constructor() {
            super(...arguments);
            this.state = {
                parkList: [
                    { name: "统计报表", imgUrl: "./park_m/image/statistics.png" }, { name: "房间管理", imgUrl: "./park_m/image/room.png" },
                    { name: "工单派发管理", imgUrl: "./park_m/image/distribute.png" }, { name: "客服电话", imgUrl: "./park_m/image/service.png" },
                    { name: "招商管理", imgUrl: "./park_m/image/attractInvestment.png" }
                ],
                isSpread: false,
                userInfo: "园区成员"
            };
        }
        componentDidMount() {
            sessionStorage.setItem("userInfo", "园区成员");
        }
        spread() {
            this.setState({ isSpread: !this.state.isSpread });
        }
        switchMember() {
            switch (this.state.userInfo) {
                case "园区成员":
                    this.setState({ userInfo: "企业管理员" });
                    sessionStorage.setItem("userInfo", "企业管理员");
                    break;
                case "企业管理员":
                    this.setState({ userInfo: "园区管理员" });
                    sessionStorage.setItem("userInfo", "园区管理员");
                    break;
                default:
                    this.setState({ userInfo: "园区成员" });
                    sessionStorage.setItem("userInfo", "园区成员");
            }
        }
        render() {
            return (React.createElement("div", { className: "personal-center" },
                React.createElement("div", { className: "personal-center-top" },
                    React.createElement("div", { className: "personal-center-title" }, "\u6570\u5B57\u56ED\u533A"),
                    React.createElement("div", { className: "personal-center-info" },
                        React.createElement("div", { className: "personal-center-tx" },
                            React.createElement("img", { src: "./park_m/image/tx.jpg", className: "personal-center-tx-img" })),
                        React.createElement("div", { style: { float: "left", color: "#FFFFFF", fontSize: "42px", margin: "10px 0 0 36px" } },
                            React.createElement("div", null, "\u7528\u6237\u540D\u5B57"),
                            React.createElement("div", { style: {
                                    color: "#83d5ff", fontSize: "27px", backgroundColor: "#2e9cf3", width: "160px",
                                    height: "50px", textAlign: "center", lineHeight: "50px", borderRadius: "30px", marginTop: "20px"
                                }, onClick: this.switchMember.bind(this) }, this.state.userInfo)),
                        React.createElement(react_router_dom_2.Link, { to: "/modificationAuthentication" },
                            React.createElement("div", { className: "personal-center-right" },
                                React.createElement("img", { src: "./park_m/image/w-right.png" }))))),
                React.createElement("div", { className: "personal-center-tag" },
                    React.createElement("span", { style: { margin: "0 50px 0 50px" } }, "\u624B\u673A\u53F7\u7801"),
                    React.createElement("span", null, "15578383040"),
                    React.createElement("span", { style: { float: "right", marginRight: "50px", color: "#0B8BF0" } }, "\u4FEE\u6539")),
                React.createElement("div", { className: "personal-center-tag" },
                    React.createElement("span", { style: { margin: "0 50px 0 50px" } }, "\u5173\u8054\u4F01\u4E1A"),
                    React.createElement("span", null, "\u6D59\u6C5F\u6C38\u62D3\u4FE1\u606F\u79D1\u6280\u6709\u9650\u516C\u53F8"),
                    React.createElement("span", { style: { float: "right", marginRight: "50px", color: "#0B8BF0" } }, "\u4FEE\u6539")),
                React.createElement("div", { className: "personal-center-tag" },
                    React.createElement("span", { style: { margin: "0 50px 0 50px" } }, "\u5BA2\u670D\u7535\u8BDD"),
                    React.createElement("span", null, "0773-123456")),
                React.createElement("div", { className: "personal-center-my" },
                    React.createElement(react_router_dom_2.Link, { to: "/workOrder" },
                        React.createElement("div", { className: "personal-center-my-left" },
                            React.createElement("div", { style: { fontSize: "40px", marginTop: "30px", color: "#333333" } }, "5"),
                            React.createElement("div", { style: { fontSize: "40px", marginTop: "5px", color: "#6C6C6C" } }, "\u6211\u7684\u5DE5\u5355"))),
                    React.createElement("div", { className: "personal-center-my-middle" }),
                    React.createElement(react_router_dom_2.Link, { to: "/message" },
                        React.createElement("div", { className: "personal-center-my-right" },
                            React.createElement("div", { style: { fontSize: "40px", marginTop: "30px", color: "#333333" } }, "6"),
                            React.createElement("div", { style: { fontSize: "40px", marginTop: "5px", color: "#6C6C6C" } }, "\u6211\u7684\u6D88\u606F")))),
                sessionStorage.getItem("userInfo") === "企业管理员" ?
                    React.createElement("div", { className: "personal-center-enterprise" },
                        React.createElement("div", { className: "personal-center-enterprise-child" },
                            React.createElement("img", { src: "./park_m/image/enterprise.png", width: "70px", height: "70px", style: { marginBottom: "10px" } }),
                            React.createElement("span", { style: { fontSize: "40px", color: "#333333", marginLeft: "30px" } }, "\u4F01\u4E1A\u4FE1\u606F\u7BA1\u7406"),
                            React.createElement("div", { style: { float: "right", height: "100%", width: "120px", textAlign: "center" } },
                                React.createElement("img", { src: "./park_m/image/right.png" }))),
                        React.createElement("div", { className: "personal-center-enterprise-child" },
                            React.createElement("img", { src: "./park_m/image/let.png", width: "70px", height: "70px", style: { marginBottom: "10px" } }),
                            React.createElement("span", { style: { fontSize: "40px", color: "#333333", marginLeft: "30px" } }, "\u79DF\u7528\u623F\u95F4\u7BA1\u7406"),
                            React.createElement("div", { style: { float: "right", height: "100%", width: "120px", textAlign: "center" } },
                                React.createElement("img", { src: "./park_m/image/right.png" })))) : null,
                sessionStorage.getItem("userInfo") === "园区管理员" ?
                    React.createElement("div", { className: "personal-center-park" },
                        React.createElement("div", { className: "personal-center-enterprise-child" },
                            React.createElement("img", { src: "./park_m/image/park.png", width: "60px", height: "60px", style: { marginBottom: "10px" } }),
                            React.createElement("span", { style: { fontSize: "40px", color: "#333333", marginLeft: "30px" } }, "\u56ED\u533A\u7BA1\u7406"),
                            React.createElement("div", { style: { float: "right", height: "100%", width: "120px", textAlign: "center" }, onClick: this.spread.bind(this) },
                                React.createElement("img", { src: "./park_m/image/right.png", className: this.state.isSpread ? "personal-center-bottom-img" : "" }))),
                        this.state.isSpread ?
                            React.createElement("div", { style: { backgroundColor: "#ffffff", overflow: "hidden", paddingTop: "30px" } }, this.state.parkList.map((item, index) => {
                                return React.createElement("div", { key: index, className: "personal-center-park-child" },
                                    React.createElement("img", { src: item.imgUrl, width: "110px", height: "110px" }),
                                    React.createElement("div", { style: { marginTop: "10px" } }, item.name));
                            })) : null) : null));
        }
    }
    exports.default = PersonalCenter;
});
define("repairsOnline", ["require", "exports", "react", "react-router-dom", "dataService", "compat"], function (require, exports, React, RouterDOM, dataService_7, compat_7) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    class RepairsOnline extends React.Component {
        constructor(props) {
            super(props);
            this.dataService = new dataService_7.default();
            this.globalAction = new compat_7.default();
            this.state = {
                reqairscss: "reqairs-part",
                iconfont: "iconfont iconfont-unturn",
                reqairsul: "reqairsul-part reqairsul",
                typeULBox: "hide",
                typeUL: [],
                indexOf: 0,
                park_id: 1001,
                type_id: 1,
                type_name: "",
                position: "",
                longitude: "",
                latitude: "",
                building_id: "f",
                floor_id: "5",
                room_id: "6",
                company: "",
                contact: "",
                phone: "",
                descript: "",
                photo: "./park_m/image/photo.png",
            };
            this.setTypeUL = this.setTypeUL.bind(this);
            RepairsOnline.getReqairstpostion = this.getReqairstpostion.bind(this);
        }
        componentDidMount() {
            this.dataService.getRepairType(this.setTypeUL);
        }
        setTypeUL(data) {
            console.log("getRepairType", data);
            this.setState({
                typeUL: data.response,
            });
        }
        toggleFold() {
            console.log("reqairsOn");
            if (this.state.reqairscss == "reqairs-all") {
                this.setState({
                    reqairscss: "reqairs-part",
                    reqairscssul: "reqairsul-part reqairsul"
                });
                this.globalAction.web_call_webgl_continueloadModuler();
            }
            else {
                this.setState({
                    reqairscss: "reqairs-all",
                    reqairsul: "reqairsul-all reqairsul"
                });
                this.globalAction.web_call_webgl_pauseloadModuler();
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
        mapReturnpark() {
            this.globalAction.web_call_webgl_mapReturnpark();
        }
        static getReqairstpostion(x, y, building_id, floor_id, room_id) { }
        ;
        getReqairstpostion(x, y, building_id, floor_id, room_id) {
            console.log("getReqairstpostion", x, y, building_id, floor_id, room_id);
            this.setState({
                building_id: building_id,
                floor_id: floor_id,
                room_id: room_id,
                position: "请输入报修位置",
                longitude: x,
                latitude: y,
            });
        }
        reqairsImginput() {
        }
        reqairsImgshow() {
        }
        showTypeUL() {
            this.setState({
                typeULBox: "typeULBox"
            });
        }
        reqairsType(i, id, name) {
            this.setState({
                type_id: id,
                type_name: name,
                indexOf: i,
            });
        }
        gettypeUL() {
            this.setState({
                typeULBox: "hide"
            });
        }
        hidetypeUL() {
            this.setState({
                typeULBox: "hide",
                type_name: "",
                type_id: "",
            });
        }
        getPosition(event) {
            this.setState({
                position: event.target.value
            });
        }
        reqairsCompany(event) {
            this.setState({
                company: event.target.value,
            });
        }
        reqairsContacts(event) {
            this.setState({
                contact: event.target.value,
            });
        }
        reqairsPhone(event) {
            this.setState({
                phone: event.target.value,
            });
        }
        changeDescript(event) {
            this.setState({
                descript: event.target.value,
            });
        }
        sumbitReqairs() {
            console.log("提交报修", this.state);
            this.dataService.saveRepairInfo(this.sumbitReqairssucceed, this.state);
        }
        sumbitReqairssucceed(data) {
            alert(data);
            window.history.back();
        }
        render() {
            return (React.createElement("div", { className: "repairsOnline" },
                React.createElement("p", { className: "companyInfotit" },
                    React.createElement(RouterDOM.Link, { to: "/home", onClick: this.mapReturnpark.bind(this) },
                        React.createElement("span", { className: "iconfont companyInfoicon" }, "\uE83B")),
                    React.createElement("span", null, "\u5728\u7EBF\u62A5\u4FEE")),
                React.createElement("div", { className: this.state.reqairscss },
                    React.createElement("div", { className: "foleBtn", onClick: this.toggleFold.bind(this) },
                        React.createElement("i", { className: this.state.iconfont, style: { "fontSize": "5rem" } }, "\uE849")),
                    React.createElement("form", null,
                        React.createElement("ul", { className: this.state.reqairsul },
                            React.createElement("li", null,
                                React.createElement("span", { className: "redStar" }, "*"),
                                "\u62A5\u4FEE\u7167\u7247",
                                React.createElement("input", { type: "file", accept: "image/*", className: "getillImg", value: "", onClick: this.reqairsImginput.bind(this), style: { "opacity": "0", "position": "absolute", "right": "-16rem" } }),
                                React.createElement("img", { src: this.state.photo, onClick: this.reqairsImgshow.bind(this) })),
                            React.createElement("li", null,
                                React.createElement("span", { className: "redStar" }, "*"),
                                "\u62A5\u4FEE\u7C7B\u578B",
                                React.createElement("input", { type: "text", className: "getillType", value: this.state.type_name, placeholder: "\u8BF7\u9009\u62E9\u62A5\u4FEE\u7C7B\u578B" }),
                                React.createElement("span", { className: "iconfont", style: { "fontSize": "3rem", "float": "right", " padding": " 0 0 0 3rem", "padding": " 0 0 0 4rem" }, onClick: this.showTypeUL.bind(this) }, "\uE827")),
                            React.createElement("li", null,
                                React.createElement("span", { className: "redStar" }, "*"),
                                "\u62A5\u4FEE\u4F4D\u7F6E",
                                React.createElement("input", { type: "text", value: this.state.position, placeholder: "\u8BF7\u8F93\u5165\u62A5\u4FEE\u4F4D\u7F6E", style: { "margin-left": "4rem", "border": "0" }, onChange: this.getPosition.bind(this) }),
                                React.createElement("i", { className: "iconfont", style: { "fontSize": "3rem", "color": "#0B8BF0", "float": "right", "padding": " 0 0 0 4rem" } }, "\uE82C")),
                            React.createElement("li", null,
                                React.createElement("span", { className: "redStar" }, "*"),
                                "\u62A5\u4FEE\u4F01\u4E1A",
                                React.createElement("input", { type: "text", value: this.state.company, placeholder: "\u8BF7\u586B\u5199\u62A5\u4FEE\u4F01\u4E1A", style: { "margin-left": "4rem", "border": "0" }, onChange: this.reqairsCompany.bind(this) })),
                            React.createElement("li", null,
                                React.createElement("span", { className: "redStar" }, "*"),
                                "\u8054\u7CFB\u4EBA",
                                React.createElement("input", { type: "text", value: this.state.contact, placeholder: "\u8BF7\u586B\u5199\u8054\u7CFB\u4EBA", style: { "margin-left": "6rem", "border": "0" }, onChange: this.reqairsContacts.bind(this) })),
                            React.createElement("li", null,
                                React.createElement("span", { className: "redStar" }, "*"),
                                "\u7535\u8BDD\u53F7\u7801",
                                React.createElement("input", { type: "text", value: this.state.phone, placeholder: "\u8BF7\u586B\u5199\u8054\u7CFB\u7535\u8BDD\u53F7\u7801 ", style: { "margin-left": "4rem", "border": "0" }, onChange: this.reqairsPhone.bind(this) })),
                            React.createElement("li", null,
                                React.createElement("p", null,
                                    React.createElement("span", { className: "redStar" }, "*"),
                                    "\u62A5\u4FEE\u63CF\u8FF0\uFF1A"),
                                React.createElement("textarea", { className: "bookContent", value: this.state.descript, placeholder: "\u8BF7\u5C06\u62A5\u4FEE\u95EE\u9898\u63CF\u8FF0\u51FA\u6765\u3002\uFF08120\u5B57\u5185\uFF09", onChange: this.changeDescript.bind(this) }))),
                        React.createElement("div", { className: "reqairsSumbit", onClick: this.sumbitReqairs.bind(this) }, "\u63D0\u4EA4"))),
                React.createElement("div", { className: this.state.typeULBox },
                    React.createElement("ul", { className: "illcauseULcss" }, this.state.typeUL.map((i, index) => {
                        return (React.createElement("li", { className: this.state.indexOf == index ? "illcauseli-active" : "illcauseli", onClick: this.reqairsType.bind(this, index, i.id, i.name) }, i.name));
                    })),
                    React.createElement("div", { className: "illCuasedBtn" },
                        React.createElement("span", { className: "illCancel", onClick: this.hidetypeUL.bind(this) }, "\u53D6\u6D88"),
                        React.createElement("span", { className: "illConfirm", onClick: this.gettypeUL.bind(this) }, "\u786E\u8BA4")))));
        }
    }
    exports.default = RepairsOnline;
});
define("parking", ["require", "exports", "react", "react-router-dom"], function (require, exports, React, RouterDOM) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    class Parking extends React.Component {
        constructor(props) {
            super(props);
            this.state = {
                parkingcss: "parking",
                iconfont: "iconfont iconfont-unturn",
                infoli: 99,
            };
            Parking.infoClick = this.infoClick.bind(this);
        }
        toggleFold() {
            console.log("parkingcss");
            if (this.state.parkingcss == "parking") {
                this.setState({
                    parkingcss: "parking-part",
                });
            }
            else {
                this.setState({
                    parkingcss: "parking",
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
        static infoClick(indexof) { }
        ;
        infoClick(indexof) {
            console.log("infoClick", indexof);
            this.setState({
                infoli: indexof,
            });
        }
        render() {
            return (React.createElement("div", { className: "parkingBox" },
                React.createElement("p", { className: "companyInfotit" },
                    React.createElement(RouterDOM.Link, { to: "/home" },
                        React.createElement("span", { className: "iconfont companyInfoicon" }, "\uE83B")),
                    React.createElement("span", null, "\u505C\u8F66\u4E1A\u52A1")),
                React.createElement("div", { className: this.state.parkingcss },
                    React.createElement("div", { className: "foleBtn", onClick: this.toggleFold.bind(this) },
                        React.createElement("i", { className: this.state.iconfont, style: { "fontSize": "5rem" } }, "\uE849")),
                    React.createElement("ul", { className: "parkingul" },
                        React.createElement("li", { onClick: this.infoClick.bind(this, 0) },
                            React.createElement("i", { className: "iconfont", style: { "fontSize": "5rem", "color": "#00A447" } }, "\uE832"),
                            React.createElement("p", null,
                                "\u8F66\u4F4D\u7533\u8BF7",
                                React.createElement("i", { className: "iconfont", style: { "fontSize": "3rem", "color": "#949494", "float": "right" } }, "\uE83C"))),
                        React.createElement("li", { onClick: this.infoClick.bind(this, 1) },
                            React.createElement("i", { className: "iconfont", style: { "fontSize": "5rem", "color": "#118EEA" } }, "\uE830"),
                            React.createElement("p", null,
                                "\u5730\u5E93\u8F66\u4F4D\u9884\u7EA6",
                                React.createElement("i", { className: "iconfont", style: { "fontSize": "3rem", "color": "#949494", "float": "right" } }, "\uE83C"))),
                        React.createElement("li", { onClick: this.infoClick.bind(this, 2) },
                            React.createElement("i", { className: "iconfont", style: { "fontSize": "5rem", "color": "#E7551C" } }, "\uE82F"),
                            React.createElement("p", null,
                                "\u505C\u8F66\u4F4D\u53D8\u66F4",
                                React.createElement("i", { className: "iconfont", style: { "fontSize": "3rem", "color": "#949494", "float": "right" } }, "\uE83C"))),
                        React.createElement("li", { onClick: this.infoClick.bind(this, 3) },
                            React.createElement("i", { className: "iconfont", style: { "fontSize": "5rem", "color": "#F49C2E" } }, "\uE831"),
                            React.createElement("p", null,
                                "\u6765\u8BBF\u8F66\u8F86\u9884\u7EA6",
                                React.createElement("i", { className: "iconfont", style: { "fontSize": "3rem", "color": "#949494", "float": "right" } }, "\uE83C")))),
                    React.createElement("div", { className: this.state.infoli == 0 ? "show" : "hide" },
                        React.createElement(Apply, null)),
                    React.createElement("div", { className: this.state.infoli == 1 ? "show" : "hide" },
                        React.createElement(Appointment, null)),
                    React.createElement("div", { className: this.state.infoli == 2 ? "show" : "hide" },
                        React.createElement(Alteration, null)),
                    React.createElement("div", { className: this.state.infoli == 3 ? "show" : "hide" },
                        React.createElement(Visitor, null)))));
        }
    }
    exports.default = Parking;
    class Apply extends React.Component {
        constructor(props) {
            super(props);
            this.state = {
                componentBox: "componentBox-part",
                contentBox: "contentBox-part",
                iconfont: "iconfont iconfont-unturn",
                contentUL: "contentUL-part contentUL",
                park_id: "1001",
                car_license_color: "",
                car_license: "桂C10000",
                applicant: "赵xxx",
                phone: "15211111111",
                company: "永拓信息科技",
                company_address: "a座b区三楼",
                underground_parking_id: "100001",
                underground_parking_name: "地面A库",
                car_owner: "赵xxx",
                car_brand: "丰田",
                car_model: "卡罗拉",
                car_color: "",
                car_type: "",
            };
            this.showParking = this.showParking.bind(this);
        }
        componentDidMount() { }
        toggleFold() {
            console.log("reqairsOn");
            if (this.state.contentBox == "contentBox-all") {
                this.setState({
                    contentBox: "contentBox-part",
                });
            }
            else {
                this.setState({
                    contentBox: "contentBox-all",
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
        showParking() {
            Parking.infoClick(99);
        }
        showParkingtype() {
        }
        showCartype() {
        }
        applySumbit() {
            console.log("applySumbit");
        }
        render() {
            return (React.createElement("div", { className: this.state.componentBox },
                React.createElement("p", { className: "companyInfotit" },
                    React.createElement("span", { className: "iconfont companyInfoicon", onClick: this.showParking }, "\uE83B"),
                    React.createElement("span", null, "\u8F66\u4F4D\u7533\u8BF7")),
                React.createElement("div", { className: this.state.contentBox },
                    React.createElement("div", { className: "foleBtn", onClick: this.toggleFold.bind(this) },
                        React.createElement("i", { className: this.state.iconfont, style: { "fontSize": "5rem" } }, "\uE849")),
                    React.createElement("form", null,
                        React.createElement("ul", { className: this.state.contentUL },
                            React.createElement("li", null,
                                React.createElement("span", { className: "bookformLeft" },
                                    React.createElement("span", { className: "redStar" }, "*"),
                                    "\u8F66\u724C\u989C\u8272"),
                                React.createElement("p", { className: "bookfromliRight" },
                                    React.createElement("input", { type: "text", value: this.state.car_license_color, placeholder: "\u8BF7\u586B\u5199\u8F66\u724C\u989C\u8272" }))),
                            React.createElement("li", null,
                                React.createElement("span", { className: "bookformLeft" },
                                    React.createElement("span", { className: "redStar" }, "*"),
                                    "\u8F66\u724C\u53F7\u7801"),
                                React.createElement("p", { className: "bookfromliRight" },
                                    React.createElement("input", { type: "text", value: this.state.car_license_color, placeholder: "\u8BF7\u586B\u5199\u8F66\u724C\u53F7\u7801" }))),
                            React.createElement("li", null,
                                React.createElement("span", { className: "bookformLeft" },
                                    React.createElement("span", { className: "redStar" }, "*"),
                                    "\u7533\u8BF7\u4EBA"),
                                React.createElement("p", { className: "bookfromliRight" },
                                    React.createElement("input", { type: "text", value: this.state.car_license_color, placeholder: "\u8BF7\u8F93\u5165\u7533\u8BF7\u4EBA\u59D3\u540D" }))),
                            React.createElement("li", null,
                                React.createElement("span", { className: "bookformLeft" },
                                    React.createElement("span", { className: "redStar" }, "*"),
                                    "\u7535\u8BDD\u53F7\u7801"),
                                React.createElement("p", { className: "bookfromliRight" },
                                    React.createElement("input", { type: "text", value: this.state.car_license_color, placeholder: "\u8BF7\u8F93\u5165\u7535\u8BDD\u53F7\u7801" }))),
                            React.createElement("li", null,
                                React.createElement("span", { className: "bookformLeft" },
                                    React.createElement("span", { className: "redStar" }, "*"),
                                    "\u516C\u53F8\u540D\u79F0"),
                                React.createElement("p", { className: "bookfromliRight" },
                                    React.createElement("input", { type: "text", value: this.state.car_license_color, placeholder: "\u8BF7\u8F93\u5165\u516C\u53F8\u540D\u79F0" }))),
                            React.createElement("li", null,
                                React.createElement("span", { className: "bookformLeft" },
                                    React.createElement("span", { className: "redStar" }, "*"),
                                    "\u516C\u53F8\u5730\u5740"),
                                React.createElement("p", { className: "bookfromliRight" },
                                    React.createElement("input", { type: "text", value: this.state.car_license_color, placeholder: "\u5982**\u5EA7**\u533A**\u697C**\u53F7" }))),
                            React.createElement("li", null,
                                React.createElement("span", { className: "bookformLeft" },
                                    React.createElement("span", { className: "redStar" }, "*"),
                                    "\u7533\u8BF7\u7C7B\u578B"),
                                React.createElement("p", { className: "bookfromliRight" }, "\u7533\u8BF7\u5730\u9762\u8F66\u4F4D")),
                            React.createElement("li", null,
                                React.createElement("span", { className: "bookformLeft" },
                                    React.createElement("span", { className: "redStar" }, "*"),
                                    "\u8F66\u4E3B"),
                                React.createElement("p", { className: "bookfromliRight" },
                                    React.createElement("input", { type: "text", value: this.state.car_license_color, placeholder: "\u8BF7\u8F93\u5165\u8F66\u4E3B" }))),
                            React.createElement("li", null,
                                React.createElement("span", { className: "bookformLeft" },
                                    React.createElement("span", { className: "redStar" }, "*"),
                                    "\u8F66\u8F86\u54C1\u724C"),
                                React.createElement("p", { className: "bookfromliRight" },
                                    React.createElement("input", { type: "text", value: this.state.car_license_color, placeholder: "\u8BF7\u8F93\u5165\u8F66\u8F86\u54C1\u724C\uFF0C\u5982\uFF1A\u5927\u4F17" }))),
                            React.createElement("li", null,
                                React.createElement("span", { className: "bookformLeft" },
                                    React.createElement("span", { className: "redStar" }, "*"),
                                    "\u8F66\u8F86\u578B\u53F7"),
                                React.createElement("p", { className: "bookfromliRight" },
                                    React.createElement("input", { type: "text", value: this.state.car_license_color, placeholder: "\u8BF7\u8F93\u5165\u8F66\u8F86\u578B\u53F7\uFF0C\u5982\uFF1A\u9AD8\u5C14\u592B" }))),
                            React.createElement("li", null,
                                React.createElement("span", { className: "bookformLeft" },
                                    React.createElement("span", { className: "redStar" }, "*"),
                                    "\u8F66\u8EAB\u989C\u8272"),
                                React.createElement("p", { className: "bookfromliRight" },
                                    React.createElement("input", { type: "text", value: this.state.car_license_color, placeholder: "\u8BF7\u8F93\u5165\u8F66\u8EAB\u989C\u8272\uFF0C\u5982\uFF1A\u767D\u8272" }))),
                            React.createElement("li", null,
                                React.createElement("span", { className: "bookformLeft" },
                                    React.createElement("span", { className: "redStar" }, "*"),
                                    "\u8F66\u8F86\u7C7B\u578B"),
                                React.createElement("p", { className: "bookfromliRight" },
                                    React.createElement("input", { type: "text", value: this.state.car_license_color, placeholder: "\u8BF7\u9009\u62E9\u8F66\u8F86\u7C7B\u578B" }),
                                    React.createElement("span", { className: "iconfont", style: { "fontSize": "3rem", "float": "right", " padding": " 0 0 0 3rem", "padding": " 0 0 0 4rem" }, onClick: this.showCartype.bind(this) }, "\uE827")))),
                        React.createElement("div", { className: "bookSumbit", onClick: this.applySumbit.bind(this) }, "\u63D0\u4EA4")))));
        }
    }
    class Appointment extends React.Component {
        constructor(props) {
            super(props);
            this.state = {
                componentBox: "componentBox-part",
                contentBox: "contentBox-part",
                iconfont: "iconfont iconfont-unturn",
                contentUL: "contentUL-part contentUL",
            };
            this.showParking = this.showParking.bind(this);
        }
        componentDidMount() { }
        toggleFold() {
            console.log("reqairsOn");
            if (this.state.contentBox == "contentBox-all") {
                this.setState({
                    contentBox: "contentBox-part",
                });
            }
            else {
                this.setState({
                    contentBox: "contentBox-all",
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
        showParking() {
            Parking.infoClick(99);
        }
        render() {
            return (React.createElement("div", { className: this.state.componentBox },
                React.createElement("p", { className: "companyInfotit" },
                    React.createElement("span", { className: "iconfont companyInfoicon", onClick: this.showParking }, "\uE83B"),
                    React.createElement("span", null, "\u5730\u5E93\u8F66\u4F4D\u9884\u7EA6")),
                React.createElement("div", { className: this.state.contentBox },
                    React.createElement("div", { className: "foleBtn", onClick: this.toggleFold.bind(this) },
                        React.createElement("i", { className: this.state.iconfont, style: { "fontSize": "5rem" } }, "\uE849")),
                    React.createElement("form", null,
                        React.createElement("ul", { className: this.state.contentUL },
                            React.createElement("li", null, "\u5730\u5E93\u8F66\u4F4D\u9884\u7EA6111111"))))));
        }
    }
    class Alteration extends React.Component {
        constructor(props) {
            super(props);
            this.state = {
                componentBox: "componentBox-part",
                contentBox: "contentBox-part",
                iconfont: "iconfont iconfont-unturn",
                contentUL: "contentUL-part contentUL",
            };
            this.showParking = this.showParking.bind(this);
        }
        componentDidMount() { }
        toggleFold() {
            console.log("reqairsOn");
            if (this.state.contentBox == "contentBox-all") {
                this.setState({
                    contentBox: "contentBox-part",
                });
            }
            else {
                this.setState({
                    contentBox: "contentBox-all",
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
        showParking() {
            Parking.infoClick(99);
        }
        render() {
            return (React.createElement("div", { className: this.state.componentBox },
                React.createElement("p", { className: "companyInfotit" },
                    React.createElement("span", { className: "iconfont companyInfoicon", onClick: this.showParking }, "\uE83B"),
                    React.createElement("span", null, "\u505C\u8F66\u4F4D\u53D8\u66F4")),
                React.createElement("div", { className: this.state.contentBox },
                    React.createElement("div", { className: "foleBtn", onClick: this.toggleFold.bind(this) },
                        React.createElement("i", { className: this.state.iconfont, style: { "fontSize": "5rem" } }, "\uE849")),
                    React.createElement("form", null,
                        React.createElement("ul", { className: this.state.contentUL },
                            React.createElement("li", null, "\u505C\u8F66\u4F4D\u53D8\u66F4111111"))))));
        }
    }
    class Visitor extends React.Component {
        constructor(props) {
            super(props);
            this.state = {
                componentBox: "componentBox-part",
                contentBox: "contentBox-part",
                iconfont: "iconfont iconfont-unturn",
                contentUL: "contentUL-part contentUL",
            };
            this.showParking = this.showParking.bind(this);
        }
        componentDidMount() { }
        toggleFold() {
            console.log("reqairsOn");
            if (this.state.contentBox == "contentBox-all") {
                this.setState({
                    contentBox: "contentBox-part",
                });
            }
            else {
                this.setState({
                    contentBox: "contentBox-all",
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
        showParking() {
            Parking.infoClick(99);
        }
        render() {
            return (React.createElement("div", { className: this.state.componentBox },
                React.createElement("p", { className: "companyInfotit" },
                    React.createElement("span", { className: "iconfont companyInfoicon", onClick: this.showParking }, "\uE83B"),
                    React.createElement("span", null, "\u6765\u8BBF\u8F66\u8F86\u9884\u7EA6")),
                React.createElement("div", { className: this.state.contentBox },
                    React.createElement("div", { className: "foleBtn", onClick: this.toggleFold.bind(this) },
                        React.createElement("i", { className: this.state.iconfont, style: { "fontSize": "5rem" } }, "\uE849")),
                    React.createElement("form", null,
                        React.createElement("ul", { className: this.state.contentUL },
                            React.createElement("li", null, "\u6765\u8BBF\u8F66\u8F86\u9884\u7EA6111111"))))));
        }
    }
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
                    { name: "园区交通", url: "http://downsc.chinaz.net/Files/DownLoad/sound1/201906/11582.mp3" },
                    { name: "园区配套", url: "http://downsc.chinaz.net/files/download/sound1/201206/1638.mp3" },
                    { name: "园区交通", url: "http://downsc.chinaz.net/Files/DownLoad/sound1/201906/11582.mp3" },
                    { name: "园区建筑", url: "http://downsc.chinaz.net/files/download/sound1/201206/1638.mp3" },
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
                console.log("当前音频，播放结束", audio.paused);
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
                    React.createElement("span", null, "\u81EA\u52A8\u8BB2\u89E3")),
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
define("isay", ["require", "exports", "react", "css!./styles/isay.css"], function (require, exports, React) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    class Isay extends React.Component {
        constructor() {
            super(...arguments);
            this.state = {
                tagArray: [{ name: "咨询" }, { name: "建议" }, { name: "投诉" }, { name: "其它" }],
                tagIndex: 0,
                inputValue: "不能少于3个字且不能大于33个字",
                textareaValue: "请将留言内容描述出来（200字内）"
            };
        }
        inputFoucus() {
            if (this.state.inputValue === "不能少于3个字且不能大于33个字") {
                this.setState({ inputValue: "" });
            }
        }
        inputBlur() {
            if (this.state.inputValue === "") {
                this.setState({ inputValue: "不能少于3个字且不能大于33个字" });
            }
        }
        inputChange(event) {
            this.setState({ inputValue: event.target.value });
        }
        textareaFoucus() {
            if (this.state.textareaValue === "请将留言内容描述出来（200字内）") {
                this.setState({ textareaValue: "" });
            }
        }
        textareaBlur() {
            if (this.state.textareaValue === "") {
                this.setState({ textareaValue: "请将留言内容描述出来（200字内）" });
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
                    React.createElement("div", { className: "isay-title" }, "\u6570\u5B57\u56ED\u533A")),
                React.createElement("div", { className: "isay-back" },
                    React.createElement("img", { src: "./park_m/image/back.png", style: { marginBottom: "25px" }, onClick: this.goBack.bind(this) }),
                    React.createElement("span", { style: { color: "#6C6C6C", fontSize: "40px", marginLeft: "15px" } }, "\u6211\u6709\u8BDD\u8BF4")),
                React.createElement("div", { style: { fontSize: "40px", color: "#949494", margin: "20px 0 0 35px", overflow: "hidden" } },
                    React.createElement("div", { className: "isay-star" }),
                    React.createElement("div", { style: { float: "left", marginLeft: "15px" } }, "\u7559\u8A00\u7C7B\u522B:")),
                React.createElement("div", { className: "isay-tag" }, this.state.tagArray.map((item, index) => {
                    return React.createElement("div", { className: "isay-tag-child", key: index },
                        React.createElement("img", { src: "./park_m/image/checked.png", style: { margin: "-22px 20px 0 0" } }),
                        React.createElement("span", { style: { fontSize: "40px", color: "#6C6C6C" } }, item.name));
                })),
                React.createElement("div", { style: { borderTop: "3px solid #F2F2F2", marginTop: "30px", margin: "0 30px 0 30px" } }),
                React.createElement("div", { style: { fontSize: "40px", color: "#949494", margin: "20px 0 0 35px", overflow: "hidden" } },
                    React.createElement("div", { className: "isay-star" }),
                    React.createElement("div", { style: { float: "left", marginLeft: "15px" } }, "\u7559\u8A00\u4E3B\u9898:")),
                React.createElement("div", { className: "isay-theme" },
                    React.createElement("input", { className: "isay-theme-input", value: this.state.inputValue, onFocus: this.inputFoucus.bind(this), onBlur: this.inputBlur.bind(this), onChange: this.inputChange.bind(this) })),
                React.createElement("div", { style: { fontSize: "40px", color: "#949494", margin: "30px 0 0 35px", overflow: "hidden" } },
                    React.createElement("div", { className: "isay-star" }),
                    React.createElement("div", { style: { float: "left", marginLeft: "15px" } }, "\u7559\u8A00\u5185\u5BB9:")),
                React.createElement("div", { className: "isay-content" },
                    React.createElement("textarea", { className: "isay-content-textarea", value: this.state.textareaValue, onFocus: this.textareaFoucus.bind(this), onBlur: this.textareaBlur.bind(this), onChange: this.textareaChange.bind(this) })),
                React.createElement("div", { className: "isay-submit" }, "\u63D0\u4EA4")));
        }
    }
    exports.default = Isay;
});
define("workOrder", ["require", "exports", "react", "react-router-dom", "css!./styles/workOrder.css"], function (require, exports, React, react_router_dom_3) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    class WorkOrder extends React.Component {
        constructor() {
            super(...arguments);
            this.state = {
                tagList: ["全部", "企业认证", "场地预定", "摆点申请", "在线保修"],
                tagIndex: 0,
                workOrderArray: [1, 2, 3, 4, 5, 6, 7, 8, 9]
            };
        }
        changeTag(index) {
            this.setState({ tagIndex: index });
        }
        goBack() {
            this.props.history.goBack();
        }
        render() {
            return (React.createElement("div", { className: "work-order" },
                React.createElement("div", { className: "work-order-top" },
                    React.createElement("div", { className: "work-order-title" }, "\u6570\u5B57\u56ED\u533A")),
                React.createElement("div", { className: "work-order-back", onClick: this.goBack.bind(this) },
                    React.createElement("img", { src: "./park_m/image/back.png", style: { margin: "-10px 10px 0 0" } }),
                    React.createElement("span", null, "\u6211\u7684\u5DE5\u5355")),
                React.createElement("div", { className: "work-order-tag" }, this.state.tagList.map((item, index) => {
                    return React.createElement("div", { key: index, className: index === this.state.tagIndex ? "work-order-tag-child-add" : "work-order-tag-child", onClick: e => this.changeTag(index) }, item);
                })),
                React.createElement("div", { className: "work-order-list" },
                    this.state.workOrderArray.map((item, index) => {
                        return React.createElement(react_router_dom_3.Link, { to: "/workOrderDetail" },
                            React.createElement("div", { key: index, className: "work-order-list-child" },
                                React.createElement("div", { style: { overflow: "hidden", margin: "30px 0 0 40px" } },
                                    React.createElement("div", { style: { float: "left", fontSize: "40px", color: "#333333", fontWeight: "600" } }, "\u4F01\u4E1A\u8BA4\u8BC1\u5DE5\u53551"),
                                    React.createElement("img", { style: { float: "right", marginRight: "40px" }, src: "./park_m/image/right.png" })),
                                React.createElement("div", { style: { fontSize: "38px", color: "#949494", margin: "30px 0 0 40px" } }, "\u7533\u8BF7\u4EBA\uFF1A\u83ABXX"),
                                React.createElement("div", { style: { fontSize: "38px", color: "#949494", margin: "10px 0 0 40px", overflow: "hidden" } },
                                    React.createElement("div", { style: { float: "left" } }, "\u7533\u8BF7\u65F6\u95F4\uFF1A2020-02-28 14:38:15"),
                                    React.createElement("div", { style: {
                                            float: "right", backgroundColor: "#0BC491", color: "#ffffff", width: "130px", height: "55px", borderRadius: "50px",
                                            marginRight: "40px", fontSize: "32px", textAlign: "center", lineHeight: "55px"
                                        } }, "\u5DF2\u901A\u8FC7"))));
                    }),
                    React.createElement("div", { style: { width: "100%", height: "60px", textAlign: "center", fontSize: "40px", lineHeight: "60px", marginTop: "30px" } }, "\u5230\u5E95\u5566~"))));
        }
    }
    exports.default = WorkOrder;
});
define("workOrderDetail", ["require", "exports", "react", "css!./styles/workOrderDetail.css"], function (require, exports, React) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    class workOrderDetail extends React.Component {
        constructor() {
            super(...arguments);
            this.state = {};
        }
        goBack() {
            this.props.history.goBack();
        }
        render() {
            return (React.createElement("div", { className: "work-order-detail" },
                React.createElement("div", { className: "work-order-detail-top" },
                    React.createElement("div", { className: "work-order-detail-title" }, "\u6570\u5B57\u56ED\u533A")),
                React.createElement("div", { className: "work-order-detail-back", onClick: this.goBack.bind(this) },
                    React.createElement("img", { src: "./park_m/image/back.png", style: { margin: "-10px 10px 0 0" } }),
                    React.createElement("span", null, "\u6211\u7684\u5DE5\u5355")),
                React.createElement("div", { style: { padding: "40px 0 0 50px", borderBottom: "4px solid #F2F2F2", width: "100%", height: "140px" } },
                    React.createElement("span", { style: { fontSize: "40px", fontWeight: "600" } }, "\u573A\u5730\u9884\u5B9A\u5DE5\u5355"),
                    React.createElement("span", { style: {
                            float: "right", backgroundColor: "#D50202", color: "#ffffff", width: "130px", height: "55px", borderRadius: "50px",
                            marginRight: "40px", fontSize: "32px", textAlign: "center", lineHeight: "55px"
                        } }, "\u672A\u901A\u8FC7")),
                React.createElement("div", { style: { margin: "30px 0 0 50px" } },
                    React.createElement("span", { style: { color: "#949494", fontSize: "40px" } }, "\u7533\u8BF7\u4EBA"),
                    React.createElement("span", { style: { color: "#333333", fontSize: "40px", marginLeft: "60px" } }, "\u5C0F\u660E")),
                React.createElement("div", { style: { margin: "30px 0 0 50px" } },
                    React.createElement("span", { style: { color: "#949494", fontSize: "40px" } }, "\u624B\u673A\u53F7\u7801"),
                    React.createElement("span", { style: { color: "#333333", fontSize: "40px", marginLeft: "60px" } }, "15578383040")),
                React.createElement("div", { style: { margin: "30px 0 0 50px" } },
                    React.createElement("span", { style: { color: "#949494", fontSize: "40px" } }, "\u7533\u8BF7\u4F01\u4E1A"),
                    React.createElement("span", { style: { color: "#333333", fontSize: "40px", marginLeft: "60px" } }, "\u6D59\u6C5F\u6C38\u62D3\u4FE1\u606F\u79D1\u6280\u6709\u9650\u516C\u53F8")),
                React.createElement("div", { style: { margin: "30px 0 0 50px" } },
                    React.createElement("span", { style: { color: "#949494", fontSize: "40px" } }, "\u4F7F\u7528\u573A\u5730"),
                    React.createElement("span", { style: { color: "#333333", fontSize: "40px", marginLeft: "60px" } }, "A\u5EA7\u4E8C\u697C217\u4F1A\u8BAE\u5BA4")),
                React.createElement("div", { style: { margin: "30px 0 0 50px" } },
                    React.createElement("span", { style: { color: "#949494", fontSize: "40px" } }, "\u5F00\u59CB\u65E5\u671F"),
                    React.createElement("span", { style: { color: "#333333", fontSize: "40px", marginLeft: "60px" } }, "2020-2-20")),
                React.createElement("div", { style: { margin: "30px 0 0 50px" } },
                    React.createElement("span", { style: { color: "#949494", fontSize: "40px" } }, "\u5F00\u59CB\u65F6\u95F4"),
                    React.createElement("span", { style: { color: "#333333", fontSize: "40px", marginLeft: "60px" } }, "9:30")),
                React.createElement("div", { style: { margin: "30px 0 0 50px" } },
                    React.createElement("span", { style: { color: "#949494", fontSize: "40px" } }, "\u7ED3\u675F\u65E5\u671F"),
                    React.createElement("span", { style: { color: "#333333", fontSize: "40px", marginLeft: "60px" } }, "2020-2-20")),
                React.createElement("div", { style: { margin: "30px 0 0 50px" } },
                    React.createElement("span", { style: { color: "#949494", fontSize: "40px" } }, "\u7ED3\u675F\u65F6\u95F4"),
                    React.createElement("span", { style: { color: "#333333", fontSize: "40px", marginLeft: "60px" } }, "17:30")),
                React.createElement("div", { style: { margin: "30px 0 0 50px" } },
                    React.createElement("span", { style: { color: "#949494", fontSize: "40px" } }, "\u4F1A\u8BAE\u4E3B\u9898"),
                    React.createElement("span", { style: { color: "#333333", fontSize: "40px", marginLeft: "60px" } }, "\u516C\u53F8\u57F9\u8BAD\u4F1A\u8BAE")),
                React.createElement("div", { style: { margin: "30px 0 0 50px", overflow: "hidden" } },
                    React.createElement("div", { style: { color: "#949494", fontSize: "40px", float: "left" } }, "\u5177\u4F53\u9700\u6C42"),
                    React.createElement("div", { style: { color: "#333333", fontSize: "40px", marginLeft: "60px", float: "left", width: "70%" } }, "2020\u516C\u53F8\u5458\u5DE5\u57F9\u8BAD\u4F1A\u8BAE\u516C\u53F8\u5458\u5DE5\u57F9\u8BAD\u4F1A\u8BAE\u516C\u53F8\u5458\u5DE5\u57F9\u8BAD\u4F1A\u8BAE\u516C\u53F8\u5458")),
                React.createElement("div", { style: { fontSize: "40px", color: "#949494", float: "right", margin: "30px 50px 0 0" } }, "\u5DE5\u5355\u7533\u8BF7\u65F6\u95F4\uFF1A2020-02-28 14:38:15"),
                React.createElement("div", { style: { width: "100%", overflow: "hidden", textAlign: "center" } },
                    React.createElement("div", { style: { border: "2px solid #F2F2F2", width: "90%", margin: "30px 0 0 5%" } })),
                React.createElement("div", { style: { margin: "30px 0 0 50px" } },
                    React.createElement("span", { style: { color: "#949494", fontSize: "40px" } }, "\u7531"),
                    React.createElement("span", { style: { color: "#333333", fontSize: "40px", marginLeft: "25px", fontWeight: "600" } }, "\u5C0F\u738B"),
                    React.createElement("span", { style: { color: "#949494", fontSize: "40px", marginLeft: "25px" } }, "\u5BA1\u6838\u4E8E"),
                    React.createElement("span", { style: { color: "#333333", fontSize: "40px", marginLeft: "25px" } }, "2020-02-28 17:38:15")),
                React.createElement("div", { style: { margin: "20px 0 0 50px" } },
                    React.createElement("span", { style: { color: "#949494", fontSize: "40px" } }, "\u5BA1\u6838\u56DE\u590D:")),
                React.createElement("div", { style: { margin: "20px 0 0 50px" } },
                    React.createElement("span", { style: { color: "#333333", fontSize: "40px" } }, "\u573A\u5730\u5F53\u5929\u9700\u8981\u7EF4\u4FEE\u65BD\u5DE5\uFF0C\u65E0\u6CD5\u4F7F\u7528"))));
        }
    }
    exports.default = workOrderDetail;
});
define("modificationAuthentication", ["require", "exports", "react", "css!./styles/modificationAuthentication.css"], function (require, exports, React) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    class ModificationAuthentication extends React.Component {
        constructor() {
            super(...arguments);
            this.state = {
                inputValue: "用户昵称XXX"
            };
        }
        focus() {
            if (this.state.inputValue === "用户昵称XXX") {
                this.setState({ inputValue: "" });
            }
        }
        blur() {
            if (this.state.inputValue === "") {
                this.setState({ inputValue: "用户昵称XXX" });
            }
        }
        change(event) {
            this.setState({ inputValue: event.target.value });
        }
        goBack() {
            this.props.history.goBack();
        }
        render() {
            return (React.createElement("div", { className: "modification-authentication" },
                React.createElement("div", { className: "modification-authentication-top" },
                    React.createElement("div", { className: "modification-authentication-title" }, "\u6570\u5B57\u56ED\u533A")),
                React.createElement("div", { className: "personal-center-tag" },
                    React.createElement("div", { style: { paddingLeft: "30px", float: "left" }, onClick: this.goBack.bind(this) },
                        React.createElement("img", { src: "./park_m/image/right.png", style: { transform: "rotate(180deg)", marginBottom: "10px" } }),
                        React.createElement("span", { style: { color: "#6C6C6C" } }, "\u4FEE\u6539\u8BA4\u8BC1"))),
                React.createElement("div", { className: "modification-authentication-tag", style: { marginTop: "15px" } },
                    React.createElement("div", { style: { paddingLeft: "40px", float: "left" } },
                        React.createElement("span", { style: { color: "#333333", fontSize: "42px" } }, "\u7528\u6237\u6635\u79F0"),
                        React.createElement("input", { value: this.state.inputValue, className: "modification-authentication-input", onFocus: this.focus.bind(this), onBlur: this.blur.bind(this), onChange: this.change.bind(this) })),
                    React.createElement("div", { style: { float: "right", marginRight: "50px", color: "#0B8BF0" } }, "\u4FEE\u6539")),
                React.createElement("div", { className: "modification-authentication-tag" },
                    React.createElement("div", { style: { paddingLeft: "40px", float: "left" } },
                        React.createElement("span", { style: { color: "#333333", fontSize: "42px" } }, "\u8EAB\u4EFD\u8BA4\u8BC1"),
                        React.createElement("span", { style: { color: "#949494", fontSize: "42px", marginLeft: "50px" } }, "\u8BA4\u8BC1\u6210\u4E3A\u7BA1\u7406\u5458")),
                    React.createElement("div", { style: { float: "right", marginRight: "50px", color: "#0B8BF0" } }, "\u8BA4\u8BC1"))));
        }
    }
    exports.default = ModificationAuthentication;
});
define("message", ["require", "exports", "react", "css!./styles/message.css"], function (require, exports, React) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    class Message extends React.Component {
        constructor() {
            super(...arguments);
            this.state = {
                tagList: ["全部", "房屋租赁到期", "车位到期", "参与活动"],
                tagIndex: 0,
                workOrderArray: [1, 2, 3, 4, 5, 6, 7, 8, 9]
            };
        }
        changeTag(index) {
            this.setState({ tagIndex: index });
        }
        goBack() {
            this.props.history.goBack();
        }
        render() {
            return (React.createElement("div", { className: "work-order" },
                React.createElement("div", { className: "work-order-top" },
                    React.createElement("div", { className: "work-order-title" }, "\u6570\u5B57\u56ED\u533A")),
                React.createElement("div", { className: "work-order-back", onClick: this.goBack.bind(this) },
                    React.createElement("img", { src: "./park_m/image/back.png", style: { margin: "-10px 10px 0 0" } }),
                    React.createElement("span", null, "\u6211\u7684\u6D88\u606F")),
                React.createElement("div", { className: "work-order-tag" }, this.state.tagList.map((item, index) => {
                    return React.createElement("div", { key: index, className: index === this.state.tagIndex ? "work-order-tag-child-add" : "work-order-tag-child", onClick: e => this.changeTag(index) }, item);
                })),
                React.createElement("div", { className: "work-order-list" },
                    this.state.workOrderArray.map((item, index) => {
                        return React.createElement("div", { key: index, className: "work-order-list-child" },
                            React.createElement("div", { style: { overflow: "hidden", margin: "30px 0 0 40px" } },
                                React.createElement("div", { style: { float: "left", fontSize: "40px", color: "#333333", fontWeight: "600" } }, "\u623F\u5C4B\u79DF\u8D41\u5373\u5C06\u5230\u671F")),
                            React.createElement("div", { style: { fontSize: "38px", color: "#DB0A0A", margin: "30px 0 0 40px" } }, "\u623F\u95F4\u4F4D\u7F6E\uFF1A\u4FE1\u606F\u4EA7\u4E1A\u56EDA\u5EA7215\u5BA4"),
                            React.createElement("div", { style: { fontSize: "38px", color: "#DB0A0A", margin: "10px 0 0 40px" } }, "\u5230\u671F\u65F6\u95F4\uFF1A2020-03-28 14:38:15"));
                    }),
                    React.createElement("div", { style: { width: "100%", height: "60px", textAlign: "center", fontSize: "40px", lineHeight: "60px", marginTop: "30px" } }, "\u5230\u5E95\u5566~"))));
        }
    }
    exports.default = Message;
});
define("router", ["require", "exports", "react-router-dom", "react", "index", "home", "parkCompany", "photograph", "infoArea", "information", "personalCenter", "findLease", "applyPut", "bookSite", "repairsOnline", "parking", "narrate", "isay", "workOrder", "workOrderDetail", "modificationAuthentication", "message"], function (require, exports, react_router_dom_4, React, index_1, home_1, parkCompany_1, photograph_1, infoArea_1, information_1, personalCenter_1, findLease_1, applyPut_1, bookSite_1, repairsOnline_1, parking_1, narrate_1, isay_1, workOrder_1, workOrderDetail_1, modificationAuthentication_1, message_1) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    class Router extends React.Component {
        render() {
            return (React.createElement(react_router_dom_4.HashRouter, null,
                React.createElement(react_router_dom_4.Switch, null,
                    React.createElement(react_router_dom_4.Route, { exact: true, path: "/", component: index_1.default }),
                    React.createElement(react_router_dom_4.Route, { path: "/parkCompany", component: parkCompany_1.default }),
                    React.createElement(react_router_dom_4.Route, { path: "/photograph", component: photograph_1.default }),
                    React.createElement(react_router_dom_4.Route, { path: "/findLease", component: findLease_1.default }),
                    React.createElement(react_router_dom_4.Route, { path: "/applyPut", component: applyPut_1.default }),
                    React.createElement(react_router_dom_4.Route, { path: "/bookSite", component: bookSite_1.default }),
                    React.createElement(react_router_dom_4.Route, { path: "/repairsOnline", component: repairsOnline_1.default }),
                    React.createElement(react_router_dom_4.Route, { path: "/parking", component: parking_1.default }),
                    React.createElement(react_router_dom_4.Route, { path: "/narrate", component: narrate_1.default }),
                    React.createElement(react_router_dom_4.Route, { path: "/isay", component: isay_1.default }),
                    React.createElement(react_router_dom_4.Route, { path: "/workOrder", component: workOrder_1.default }),
                    React.createElement(react_router_dom_4.Route, { path: "/workOrderDetail", component: workOrderDetail_1.default }),
                    React.createElement(react_router_dom_4.Route, { path: "/home", render: (props) => (React.createElement(home_1.default, Object.assign({}, props),
                            React.createElement(react_router_dom_4.Route, { path: "/home/infoArea", component: infoArea_1.default }),
                            React.createElement(react_router_dom_4.Route, { path: "/home/information", component: information_1.default }),
                            React.createElement(react_router_dom_4.Route, { path: "/home/personalCenter", component: personalCenter_1.default }))) }),
                    React.createElement(react_router_dom_4.Route, { path: "/modificationAuthentication", component: modificationAuthentication_1.default }),
                    React.createElement(react_router_dom_4.Route, { path: "/message", component: message_1.default }))));
        }
    }
    exports.default = Router;
});
define("index", ["require", "exports", "react", "react-dom", "react-router-dom", "router", "parkCompany", "findLease", "applyPut", "photograph", "repairsOnline", "dataService", "compat", "css!./styles/index.css"], function (require, exports, React, ReactDOM, react_router_dom_5, router_1, parkCompany_2, findLease_2, applyPut_2, photograph_2, repairsOnline_2, dataService_8, compat_8) {
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
            this.props = {
                history: this.props.history
            };
            this.dataService = new dataService_8.default();
            this.globalAction = new compat_8.default();
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
        initPark(park_id) {
            this.globalAction.web_call_webgl_initPark(park_id);
            console.log(park_id);
            localStorage.setItem("park_id", park_id);
        }
        render() {
            return (React.createElement("div", { className: "index" },
                React.createElement("div", { className: "index-top" }, "\u6570\u5B57\u56ED\u533A"),
                React.createElement("div", { className: "index-input-div" },
                    React.createElement("div", { className: "index-child-left" },
                        React.createElement("input", { className: "index-input", value: this.state.inputValue, onFocus: this.foucus.bind(this), onBlur: this.blur.bind(this), onChange: this.change.bind(this) }),
                        React.createElement("img", { src: "./park_m/image/search.png", className: "index-search-img" })),
                    React.createElement("div", { className: "index-child-right" },
                        React.createElement("span", null, this.state.city),
                        React.createElement("img", { src: "./park_m/image/bottom.png", width: "50px", height: "50px", style: { marginTop: "-10px" } }))),
                React.createElement("div", { className: "index-number" },
                    React.createElement("img", { src: "./park_m/image/tower.png", className: "tower-img" }),
                    "\u5DF2\u6709",
                    React.createElement("span", { style: { color: "#0B8BF0", margin: "0 15px 0 15px" } }, "15"),
                    "\u5BB6\u56ED\u533A\u4E0A\u7EBF"),
                React.createElement("div", { className: "index-park" },
                    this.state.parkArr.map((item, index) => {
                        return React.createElement(react_router_dom_5.Link, { to: "/home" },
                            React.createElement("div", { className: "index-child-park", key: index, onClick: this.initPark.bind(this, 1001) },
                                React.createElement("div", { className: "index-child-park-left" },
                                    React.createElement("img", { src: "./park_m/image/a.jpg", className: "park-img" })),
                                React.createElement("div", { className: "index-child-park-right" },
                                    React.createElement("div", { className: "index-park-name" }, "\u6842\u6797\u56FD\u5BB6\u9AD8\u65B0\u533A\u4FE1\u606F\u4EA7\u4E1A\u56ED"),
                                    React.createElement("div", { className: "index-park-position" },
                                        React.createElement("img", { src: "./park_m/image/position.png", width: "45px", height: "40px", style: { marginTop: "-18px" } }),
                                        React.createElement("span", { className: "index-park-position-name" }, "\u6842\u6797\u9AD8\u65B0\u533A\u671D\u9633\u8DEFD-12\u53F7")),
                                    React.createElement("div", { className: "index-tag" }, this.state.tagArr.map((item, index) => {
                                        return React.createElement("div", { key: index, className: "index-tag-child" }, item);
                                    }))),
                                React.createElement("div", { className: "index-child-park-end" },
                                    React.createElement("div", { className: "index-distance" }, "10.5km"))));
                    }),
                    React.createElement("div", { style: { width: "100%", height: "60px", textAlign: "center", fontSize: "40px", lineHeight: "60px", marginLeft: "-25px" } }, "\u5230\u5E95\u5566~")),
                React.createElement("div", { className: "index-bottom-logo" },
                    React.createElement("img", { src: "./park_m/image/bottomLogo.png", className: "index-bottom-logo-img" }))));
        }
        refreshCompanyinfo(id) {
            this.props.history.push('/parkCompany');
            parkCompany_2.default.getCompanyinfo(id);
        }
        refreshLeaseinfo(id) {
            this.props.history.push('/findLease');
            findLease_2.default.getLeaseinfoByroomid(id);
        }
        addapplyPut(x, y) {
            this.props.history.push('/applyPut');
            applyPut_2.default.addapplyPut(x, y);
        }
        addillegal(x, y) {
            this.props.history.push('/photograph');
            photograph_2.default.getXY(x, y);
        }
        addReqairs(x, y, building_id, floor_id, room_id) {
            this.props.history.push('/repairsOnline');
            repairsOnline_2.default.getReqairstpostion(x, y, building_id, floor_id, room_id);
        }
    }
    Index.g_pIns = null;
    exports.default = Index;
    ReactDOM.render(React.createElement(router_1.default, null), document.getElementById('viewContainer'));
});

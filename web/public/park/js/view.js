define("TopNav", ["require", "exports", "react", "css!./styles/topnav.css"], function (require, exports, React) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    class TopNav extends React.Component {
        constructor(props) {
            super(props);
            this.state = {};
        }
        render() {
            return (React.createElement("div", { className: "topNav" },
                React.createElement("div", { className: "topLogo" },
                    React.createElement("img", { src: "./park/image/logo.png" })),
                React.createElement("div", { className: "topM" },
                    React.createElement("ul", null,
                        React.createElement("li", null, "\u9996\u9875"),
                        React.createElement("li", null, "\u56ED\u533A"),
                        React.createElement("li", null, "\u571F\u5730"),
                        React.createElement("li", null, "\u5382\u623F"),
                        React.createElement("li", null, "\u5199\u5B57\u697C"),
                        React.createElement("li", null, "\u5546\u4E1A"),
                        React.createElement("li", null,
                            "\u5176\u4ED6",
                            React.createElement("span", { className: "iconfont", style: { "fontSize": "10px" } }, "\uE804")))),
                React.createElement("div", { className: "topRight" },
                    React.createElement("span", null, "\u767B\u5F55 "),
                    " | ",
                    React.createElement("span", null, " \u6CE8\u518C")),
                React.createElement("div", { className: "bottomNav" })));
        }
    }
    exports.default = TopNav;
});
define("LeftNav", ["require", "exports", "react", "antd", "css!./styles/listArea.css", "css!./styles/iconfont.css", "css!./styles/leftNav.css"], function (require, exports, React, antd_1) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    const { TreeNode } = antd_1.Tree;
    class IntroduceArea extends React.Component {
        constructor(props) {
            super(props);
        }
        render() {
            return (React.createElement("div", null));
        }
    }
    class SuperiorityArea extends React.Component {
        constructor(props) {
            super(props);
        }
        render() {
            return (React.createElement("div", null));
        }
    }
    class ListArea extends React.Component {
        constructor(props) {
            super(props);
            this.onSelect = (selectedKeys, info) => {
                console.log('selected', selectedKeys[0]);
            };
            this.onExpand = () => {
                console.log('Trigger Expand');
            };
            this.myindex = (index) => {
                if (index == 1) {
                    this.setState({
                        show: "three ",
                        introduce: 1,
                        superiority: null,
                        listArea: null,
                        showBusiness: 1,
                        showCompany: null,
                        treeList: null,
                    });
                }
                else if (index == 2) {
                    this.setState({
                        show: "two ",
                        introduce: null,
                        superiority: 1,
                        listArea: null,
                        showBusiness: 1,
                        showCompany: null,
                        treeList: null,
                    });
                }
                else if (index == 3) {
                    this.setState({
                        show: "three ",
                        introduce: null,
                        superiority: null,
                        listArea: 1,
                        showBusiness: 1,
                        showCompany: null,
                        treeList: null,
                    });
                }
                else if (index == 4) {
                    console.log(44444);
                    this.setState({
                        show: "four ",
                        introduce: null,
                        superiority: null,
                        listArea: 1,
                        showBusiness: null,
                        showCompany: 1,
                        treeList: null,
                    });
                }
                else if (index == 10) {
                    this.setState({
                        show: "four ",
                        introduce: null,
                        superiority: null,
                        listArea: null,
                        showBusiness: null,
                        showCompany: null,
                        treeList: 1,
                    });
                }
                else {
                    this.setState({
                        show: "no ",
                        introduce: null,
                        superiority: null,
                        listArea: null,
                        treeList: null,
                    });
                }
            };
            this.state = {
                index: 99,
                show: null,
                introduce: null,
                superiority: null,
                listArea: null,
                showBusiness: null,
                showCompany: null,
                treeList: null,
                roomList: "A座-4F-B412",
                companyList: "浙江永拓信息科技有限公司",
            };
            this.getRoom = this.getRoom.bind(this);
            this.getCompany = this.getCompany.bind(this);
        }
        componentDidupdate() {
        }
        componentDidMount() {
            this.props.onRef(this);
        }
        clickFun(a) {
            this.props.indexC(a);
            this.setState({
                index: 99,
                introduce: null,
                superiority: null,
                listArea: null,
                treeList: null,
            });
        }
        getRoom(event) {
            const id = event.target.getAttribute("data-id");
            console.log('getRoom', id);
        }
        getCompany(event) {
            const id = event.target.getAttribute("data-id");
            console.log('getCompany', id);
        }
        render() {
            return (React.createElement("div", null,
                React.createElement("div", { className: this.state.introduce == 1 ? "introduce" : "hide" },
                    React.createElement("div", { className: "topTit" },
                        React.createElement("img", { src: "./park/image/banner1.png", className: "banner1" }),
                        React.createElement("div", { className: "topSpan" },
                            React.createElement("p", { className: "introduceBG" }),
                            React.createElement("span", { className: "topTTW" }, "\u56ED\u533A\u4ECB\u7ECD"),
                            React.createElement("span", { className: "introduceClose", onClick: this.clickFun.bind(this, this.state.index) },
                                React.createElement("span", { className: "iconfont", style: { "fontSize": "12px" } }, "\uE803")))),
                    React.createElement(IntroduceArea, null)),
                React.createElement("div", { className: this.state.superiority == 1 ? "introduce" : "hide" },
                    React.createElement("div", { className: "topTit" },
                        React.createElement("img", { src: "./park/image/banner1.png", className: "banner1" }),
                        React.createElement("div", { className: "topSpan" },
                            React.createElement("p", { className: "introduceBG" }),
                            React.createElement("span", { className: "topTTW" }, "\u533A\u4F4D\u4F18\u52BF"),
                            React.createElement("span", { className: "introduceClose", onClick: this.clickFun.bind(this, this.state.index) },
                                React.createElement("span", { className: "iconfont", style: { "fontSize": "12px" } }, "\uE803")))),
                    React.createElement(SuperiorityArea, null)),
                React.createElement("div", { className: this.state.listArea == 1 ? "listArea" : "hide" },
                    React.createElement("div", { className: this.state.showBusiness == 1 ? "show" : "hide" },
                        React.createElement("div", { className: "topTit" },
                            React.createElement("span", { className: "topTT" }, "\u62DB\u5546\u5217\u8868"),
                            React.createElement("span", { className: "listAreaClose", onClick: this.clickFun.bind(this, this.state.index) },
                                React.createElement("span", { className: "iconfont", style: { "fontSize": "12px" } }, "\uE803"))),
                        React.createElement("div", { className: "areaScope" },
                            React.createElement("p", { className: "areaScopeP" }, "\u7B5B\u9009\uFF08\u9762\u79EF\uFF09"),
                            React.createElement("ul", null,
                                React.createElement("li", null, "\u5168\u90E8"),
                                React.createElement("li", null, "100m\u4EE5\u4E0B"),
                                React.createElement("li", null, "100-200m"),
                                React.createElement("li", null, "200-300m"),
                                React.createElement("li", null, "300-500m"),
                                React.createElement("li", null, "500-1000m"),
                                React.createElement("li", null, "1000-2000m"),
                                React.createElement("li", null, "2000m\u4EE5\u4E0B"))),
                        React.createElement("div", { className: "roomList" },
                            React.createElement("ul", null,
                                React.createElement("li", { className: "roomP", onClick: this.getRoom, "data-id": this.state.roomList },
                                    React.createElement("p", { className: "roomTit", onClick: this.getRoom, "data-id": this.state.roomList }, " A\u5EA7-4F-B412"),
                                    React.createElement("p", { onClick: this.getRoom, "data-id": this.state.roomList },
                                        React.createElement("span", { className: "icontop3" },
                                            React.createElement("span", { className: "iconfont" }, "\uE805")),
                                        "\u00A0 \u623F\u95F4\u9762\u79EF\uFF1A",
                                        React.createElement("span", null, "45m\u00B2")),
                                    React.createElement("p", { onClick: this.getRoom, "data-id": this.state.roomList },
                                        React.createElement("span", { className: "icontop3" },
                                            React.createElement("span", { className: "iconfont" }, "\uE806")),
                                        "\u00A0 \u53D1\u5E03\u65F6\u95F4\uFF1A",
                                        React.createElement("span", null, "2019-7-15"))),
                                React.createElement("li", { className: "roomP", onClick: this.getRoom, "data-id": this.state.roomList },
                                    React.createElement("p", { className: "roomTit", onClick: this.getRoom, "data-id": this.state.roomList }, " A\u5EA7-4F-B412"),
                                    React.createElement("p", { onClick: this.getRoom, "data-id": this.state.roomList },
                                        React.createElement("span", { className: "icontop3" },
                                            React.createElement("span", { className: "iconfont" }, "\uE805")),
                                        "\u00A0 \u623F\u95F4\u9762\u79EF\uFF1A",
                                        React.createElement("span", null, "45m\u00B2")),
                                    React.createElement("p", { onClick: this.getRoom, "data-id": this.state.roomList },
                                        React.createElement("span", { className: "icontop3" },
                                            React.createElement("span", { className: "iconfont" }, "\uE806")),
                                        "\u00A0 \u53D1\u5E03\u65F6\u95F4\uFF1A",
                                        React.createElement("span", null, "2019-7-15"))),
                                React.createElement("li", { className: "roomP", onClick: this.getRoom, "data-id": this.state.roomList },
                                    React.createElement("p", { className: "roomTit", onClick: this.getRoom, "data-id": this.state.roomList }, " A\u5EA7-4F-B412"),
                                    React.createElement("p", { onClick: this.getRoom, "data-id": this.state.roomList },
                                        React.createElement("span", { className: "icontop3" },
                                            React.createElement("span", { className: "iconfont" }, "\uE805")),
                                        "\u00A0 \u623F\u95F4\u9762\u79EF\uFF1A",
                                        React.createElement("span", null, "45m\u00B2")),
                                    React.createElement("p", { onClick: this.getRoom, "data-id": this.state.roomList },
                                        React.createElement("span", { className: "icontop3" },
                                            React.createElement("span", { className: "iconfont" }, "\uE806")),
                                        "\u00A0 \u53D1\u5E03\u65F6\u95F4\uFF1A",
                                        React.createElement("span", null, "2019-7-15")))))),
                    React.createElement("div", { className: this.state.showCompany == 1 ? "show" : "hide" },
                        React.createElement("div", { className: "topTit" },
                            React.createElement("span", { className: "topTT" }, "\u5165\u9A7B\u4F01\u4E1A"),
                            React.createElement("span", { className: "listAreaClose", onClick: this.clickFun.bind(this, this.state.index) },
                                React.createElement("span", { className: "iconfont", style: { "fontSize": "12px" } }, "\uE803"))),
                        React.createElement("div", { className: "areaScopeqy" },
                            React.createElement("p", { className: "areaScopeP" }, "\u4F01\u4E1A\u5206\u7C7B"),
                            React.createElement("ul", null,
                                React.createElement("li", null, "\u5168\u90E8"),
                                React.createElement("li", null, "\u6587\u5316\u521B\u610F"),
                                React.createElement("li", null, "\u91D1\u878D\u4FDD\u9669"),
                                React.createElement("li", null, "\u79D1\u6280\u670D\u52A1"),
                                React.createElement("li", null, "\u9AD8\u65B0\u6280\u672F"),
                                React.createElement("li", null, "\u7535\u5B50\u4EA7\u4E1A"),
                                React.createElement("li", null, "\u7535\u5B50\u5546\u52A1"))),
                        React.createElement("div", { className: "roomList" },
                            React.createElement("ul", null,
                                React.createElement("li", { className: "roomP", onClick: this.getCompany, "data-id": this.state.companyList },
                                    React.createElement("p", { className: "roomTit", onClick: this.getCompany, "data-id": this.state.companyList }, "\u6D59\u6C5F\u6C38\u62D3\u4FE1\u606F\u79D1\u6280\u6709\u9650\u516C\u53F8"),
                                    React.createElement("p", { onClick: this.getCompany, "data-id": this.state.companyList },
                                        React.createElement("span", { className: "icontop3" },
                                            React.createElement("span", { className: "iconfont" }, "\uE807")),
                                        "\u00A0\u516C\u53F8\u4F4D\u7F6E\uFF1A",
                                        React.createElement("span", null, "E\u5EA7B\u533A-3F-301")),
                                    React.createElement("p", { onClick: this.getCompany, "data-id": this.state.companyList },
                                        React.createElement("span", { className: "icontop3" },
                                            React.createElement("span", { className: "iconfont" }, "\uE808")),
                                        "\u00A0\u6240\u5C5E\u884C\u4E1A\uFF1A",
                                        React.createElement("span", null, "\u79D1\u6280\u670D\u52A1"))))))),
                React.createElement("div", { className: this.state.treeList == 1 ? "treeList" : "hide" },
                    React.createElement("div", { className: "topTittree" },
                        React.createElement("span", { className: "topTT" }, "\u6842\u6797\u4FE1\u606F\u4EA7\u4E1A\u56ED"),
                        React.createElement("span", { className: "treeClose", onClick: this.clickFun.bind(this, this.state.index) },
                            React.createElement("span", { className: "iconfont", style: { "fontSize": "12px" } }, "\uE803"))),
                    React.createElement("div", { className: "treenode" },
                        React.createElement(antd_1.Tree, { showLine: true, switcherIcon: React.createElement(antd_1.Icon, { type: "down" }), defaultExpandedKeys: ['0-0-0'], onSelect: this.onSelect },
                            React.createElement(TreeNode, { title: "IDC\u53EF\u89C6\u5316\u76D1\u63A7\u7CFB\u7EDF", key: "IDC\u53EF\u89C6\u5316\u76D1\u63A7\u7CFB\u7EDF" },
                                React.createElement(TreeNode, { title: "1F", key: "1F" },
                                    React.createElement(TreeNode, { title: "\u673A\u623F1", key: "\u673A\u623F1" },
                                        React.createElement(TreeNode, { title: "\u673A\u623F1-A\u7EC4\u5217\u5934\u67DC", key: "\u673A\u623F1-A\u7EC4\u5217\u5934\u67DC" }),
                                        React.createElement(TreeNode, { title: "\u673A\u623F1-B\u7EC4\u5217\u5934\u67DC", key: "\u673A\u623F1-B\u7EC4\u5217\u5934\u67DC" })),
                                    React.createElement(TreeNode, { title: "\u673A\u623F2", key: "\u673A\u623F2" }),
                                    React.createElement(TreeNode, { title: "\u673A\u623F3", key: "\u673A\u623F3" }),
                                    React.createElement(TreeNode, { title: "\u76D1\u63A7\u5BA4", key: "\u76D1\u63A7\u5BA4" }))))))));
        }
    }
    class LeftNav extends React.Component {
        constructor(props) {
            super(props);
            this.onRef = (ref) => {
                console.log(ref);
                this.child = ref;
            };
            this.treeRef = (ref) => {
                console.log(ref);
                this.child = ref;
            };
            this.child = null;
            this.state = {
                index: 99,
                iconone: null,
                icontwo: null,
                iconthree: null,
                iconfour: null,
            };
            this.indexC = this.indexC.bind(this);
        }
        showList(index) {
            console.log('father', index);
            if (index == 1) {
                this.setState({
                    index: index,
                    iconone: 1,
                    icontwo: null,
                    iconthree: null,
                    iconfour: null,
                });
                this.child.myindex(index);
            }
            else if (index == 2) {
                this.setState({
                    index: index,
                    iconone: null,
                    icontwo: 1,
                    iconthree: null,
                    iconfour: null,
                });
                this.child.myindex(index);
            }
            else if (index == 3) {
                this.setState({
                    index: index,
                    iconone: null,
                    icontwo: null,
                    iconthree: 1,
                    iconfour: null,
                });
                this.child.myindex(index);
            }
            else if (index == 4) {
                this.setState({
                    index: index,
                    iconone: null,
                    icontwo: null,
                    iconthree: null,
                    iconfour: 1,
                });
                this.child.myindex(index);
            }
            else if (index == 10) {
                this.setState({
                    index: index,
                    iconone: null,
                    icontwo: null,
                    iconthree: null,
                    iconfour: null,
                });
                this.child.myindex(index);
            }
        }
        indexC(index) {
            this.setState({
                index: index
            });
        }
        indexCh(a) {
            console.log(a);
            if (a == 99) {
                this.setState({
                    index: a,
                    iconone: null,
                    icontwo: null,
                    iconthree: null,
                    iconfour: null,
                });
            }
            else {
                this.setState({
                    index: a,
                });
            }
        }
        render() {
            console.log(this.state);
            return (React.createElement("div", null,
                React.createElement("div", { className: "tree", onClick: this.showList.bind(this, 10) },
                    React.createElement("div", { className: "stree" },
                        React.createElement("span", { className: "iconfont", style: { "fontSize": "14px" } }, "\uE809"),
                        "\u00A0 \u6842\u6797\u4FE1\u606F\u4EA7\u4E1A\u56ED")),
                React.createElement("div", { className: "leftNav" },
                    React.createElement("div", { className: "leftBG" }),
                    React.createElement("ul", { className: "leftul" },
                        React.createElement("li", { onClick: this.showList.bind(this, 1), className: this.state.iconone == 1 ? "iconit" : "iconun" },
                            React.createElement("span", { className: "iconfont", style: { "fontSize": "25px" } }, "\uE7FA"),
                            React.createElement("p", null, "\u56ED\u533A\u4ECB\u7ECD")),
                        React.createElement("li", { onClick: this.showList.bind(this, 2), className: this.state.icontwo == 1 ? "iconit" : "iconun" },
                            React.createElement("span", { className: "iconfont", style: { "fontSize": "25px" } }, "\uE7FB"),
                            React.createElement("p", null, "\u533A\u57DF\u4F18\u52BF")),
                        React.createElement("li", { onClick: this.showList.bind(this, 3), className: this.state.iconthree == 1 ? "iconit" : "iconun" },
                            React.createElement("span", { className: "iconfont", style: { "fontSize": "25px" } }, "\uE7FC"),
                            React.createElement("p", null, "\u62DB\u5546\u5217\u8868")),
                        React.createElement("li", { onClick: this.showList.bind(this, 4), className: this.state.iconfour == 1 ? "iconit" : "iconun" },
                            React.createElement("span", { className: "iconfont", style: { "fontSize": "25px" } }, "\uE7FD"),
                            React.createElement("p", null, "\u5165\u9A7B\u4F01\u4E1A")))),
                React.createElement(ListArea, { index: this.state.index, indexC: this.indexCh.bind(this), onRef: this.onRef })));
        }
    }
    exports.default = LeftNav;
});
define("Index", ["require", "exports", "react", "react-dom", "TopNav", "LeftNav", "css!./styles/index.css"], function (require, exports, React, ReactDOM, TopNav_1, LeftNav_1) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    class Index extends React.Component {
        constructor(props) {
            super(props);
            this.toggleShare = (e) => {
                this.setState({ isShare: !this.state.isShare });
            };
            this.fullScreen = (e) => {
                this.setState({ isFullScreen: !this.state.isFullScreen });
            };
            this.state = {
                isShare: false,
                isFullScreen: false,
            };
            this.toggleShare = this.toggleShare.bind(this);
        }
        render() {
            return (React.createElement("div", { className: "web" }, this.state.isFullScreen ? null :
                React.createElement("span", null,
                    React.createElement(TopNav_1.default, null),
                    React.createElement(LeftNav_1.default, null))));
        }
    }
    ReactDOM.render(React.createElement(Index, null), document.getElementById('viewContainer'));
    exports.default = Index;
});

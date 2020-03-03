define("view", ["require", "exports", "react", "react-dom", "antd"], function (require, exports, React, ReactDOM, antd_1) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    const { Header, Content, Footer, Sider } = antd_1.Layout;
    const { TreeNode } = antd_1.Tree;
    class App extends React.Component {
        constructor(props) {
            super(props);
            this.state = {
                tree_data: [{
                        key: "0",
                        title: "World",
                        children: [
                            {
                                key: "0-0",
                                title: "GO:0",
                            },
                            {
                                key: "0-1",
                                title: "GO:1",
                            },
                            {
                                key: "0-2",
                                title: "GO:2",
                                children: [
                                    {
                                        key: "0-2-0",
                                        title: "GO:0",
                                    },
                                    {
                                        key: "0-2-1",
                                        title: "GO:1",
                                    }
                                ]
                            }
                        ]
                    }],
                transform: {
                    localPosition: { x: 0, y: 0, z: 0 },
                    localEuler: { x: 0, y: 0, z: 0 },
                    localScale: { x: 1, y: 1, z: 1 }
                }
            };
            this.ctrl = new Ctrl();
            this.OnSelect = this.OnSelect.bind(this);
            App.g_pIns = this;
        }
        OnSelect(pInfo) {
            return;
            this.setState({
                tree_data: [{
                        key: "0",
                        title: "World",
                        children: [
                            {
                                key: "0-0",
                                title: "GOXX:0",
                            },
                            {
                                key: "0-1",
                                title: "GOXX:1",
                            }
                        ]
                    }]
            });
        }
        render() {
            return (React.createElement(antd_1.Layout, { style: { width: '100%', height: '100%', padding: 0 } },
                React.createElement(Sider, { breakpoint: "lg", collapsed: true, collapsedWidth: "64", style: { background: '#000000' } },
                    React.createElement(antd_1.Menu, { theme: "dark", mode: "vertical", defaultSelectedKeys: ['1'], style: { width: '100%', background: '#000000' } },
                        React.createElement(antd_1.Menu.Item, { key: "1", style: { width: '64px', height: '64px', lineHeight: '64px' } },
                            React.createElement(antd_1.Icon, { type: "solution", style: { fontSize: '40px', position: 'absolute', left: 12, top: 12 } }),
                            React.createElement("span", { className: "nav-text" }, "\u9879\u76EE")),
                        React.createElement(antd_1.Menu.Item, { key: "2", style: { width: '64px', height: '64px', lineHeight: '64px' } },
                            React.createElement(antd_1.Icon, { type: "play-circle", style: { fontSize: '40px', position: 'absolute', left: 12, top: 12 } }),
                            React.createElement("span", { className: "nav-text" }, "\u8FD0\u884C")),
                        React.createElement(antd_1.Menu.Item, { key: "3", style: { width: '64px', height: '64px', lineHeight: '64px' } },
                            React.createElement(antd_1.Icon, { type: "import", style: { fontSize: '40px', position: 'absolute', left: 12, top: 12 } }),
                            React.createElement("span", { className: "nav-text" }, "\u5BFC\u5165")),
                        React.createElement(antd_1.Menu.Item, { key: "4", style: { width: '64px', height: '64px', lineHeight: '64px' } },
                            React.createElement(antd_1.Icon, { type: "export", style: { fontSize: '40px', position: 'absolute', left: 12, top: 12 } }),
                            React.createElement("span", { className: "nav-text" }, "\u5BFC\u51FA")))),
                React.createElement(antd_1.Layout, null,
                    React.createElement(Header, { style: { height: '40px', lineHeight: '40px', paddingLeft: 25, background: '#2D2D30', borderBottomColor: '#505050', borderBottomWidth: '1px', borderBottomStyle: 'solid' } },
                        React.createElement(antd_1.Menu, { theme: "dark", mode: "horizontal", style: { lineHeight: '30px', marginTop: '5px', background: '#2D2D30' }, onSelect: this.OnSelect },
                            React.createElement(antd_1.Menu.Item, { key: "1" }, "\u6587\u4EF6111111"),
                            React.createElement(antd_1.Menu.Item, { key: "2" }, "\u7F16\u8F91"),
                            React.createElement(antd_1.Menu.Item, { key: "3" }, "\u8D44\u6E90"),
                            React.createElement(antd_1.Menu.Item, { key: "4" }, "\u7EC4\u4EF6"),
                            React.createElement(antd_1.Menu.Item, { key: "5" }, "\u5BF9\u8C61"),
                            React.createElement(antd_1.Menu.Item, { key: "6" }, "\u7A97\u53E3"),
                            React.createElement(antd_1.Menu.Item, { key: "7" }, "\u5E2E\u52A9"))),
                    React.createElement(Content, { style: { background: '#1E1E1E' } },
                        React.createElement(antd_1.Row, { style: { height: '100%' } },
                            React.createElement(antd_1.Col, { span: 15, style: { height: '100%' } },
                                React.createElement("div", { id: "unityContainer", style: { width: '100%', height: '100%', background: '#0000FF', margin: 'auto' } })),
                            React.createElement(antd_1.Col, { span: 9, style: { height: '100%' } },
                                React.createElement(antd_1.Row, { style: { height: '100%' } },
                                    React.createElement(antd_1.Col, { span: 10, style: { height: '100%', background: '#252526', borderColor: '#505050', borderWidth: '1px', borderStyle: 'solid' } },
                                        React.createElement(TreeView, { data: this.state.tree_data })),
                                    React.createElement(antd_1.Col, { span: 14, style: { height: '100%', borderColor: '#505050', borderWidth: '1px', borderStyle: 'solid' } },
                                        React.createElement(TransformView, { transform: this.state.transform })))))),
                    React.createElement(Footer, { style: { height: '24px', padding: 1, background: '#2D2D30', color: '#F1F1F1', textAlign: 'center', borderTopColor: '#505050', borderTopWidth: '1px', borderTopStyle: 'solid' } }, "MiaokitJS \u00A92020 \u6D59\u6C5F\u6C38\u62D3\u4FE1\u606F\u79D1\u6280\u6709\u9650\u516C\u53F8"))));
        }
        Update(pObject) {
            let pTree = this.ctrl.Update(pObject);
            if (pTree) {
                this.setState({
                    tree_data: pTree
                });
                console.log(pTree);
            }
        }
        set curTransform(transform_) {
            this.setState({
                transform: transform_
            });
        }
    }
    App.g_pIns = null;
    class TreeView extends React.Component {
        constructor(props) {
            super(props);
            this.OnDragEnter = this.OnDragEnter.bind(this);
            this.OnDrop = this.OnDrop.bind(this);
            this.OnSelect = this.OnSelect.bind(this);
        }
        OnDragEnter(pInfo) {
            console.log(pInfo);
        }
        OnDrop(pInfo) {
            console.log(pInfo);
        }
        OnSelect(pInfo) {
            let pObject = MiaokitJS["WASM"]["GetObject"](parseInt(pInfo[0]));
            App.g_pIns.curTransform = pObject.transform;
            console.log(pObject);
        }
        render() {
            const loop = data => data.map(item => {
                if (item.children && item.children.length) {
                    return (React.createElement(TreeNode, { key: item.key, title: React.createElement("span", { style: { color: '#F1F1F1' } }, item.title) }, loop(item.children)));
                }
                return React.createElement(TreeNode, { key: item.key, title: React.createElement("span", { style: { color: '#F1F1F1' } }, item.title) });
            });
            return (React.createElement(antd_1.Tree, { style: { width: '100%', height: '100%', padding: 0, overflow: 'auto', color: '#F1F1F1' }, className: "draggable-tree", draggable: true, blockNode: true, defaultExpandedKeys: ['0'], onDragEnter: this.OnDragEnter, onDrop: this.OnDrop, onSelect: this.OnSelect }, loop(this.props.data)));
        }
    }
    class TransformView extends React.Component {
        constructor(props) {
            super(props);
        }
        render() {
            return (React.createElement("div", { style: { padding: 16 } },
                React.createElement(antd_1.Row, { style: { padding: 2 } },
                    React.createElement(antd_1.Col, { span: 6 },
                        React.createElement("div", { style: { width: '100%', height: '100%', float: 'left', color: '#F1F1F1', textAlign: 'left' } }, "Position")),
                    React.createElement(antd_1.Col, { span: 6 },
                        React.createElement("div", { style: { width: '20%', height: '100%', float: 'left', color: '#F1F1F1', textAlign: 'center' } }, "X"),
                        React.createElement(antd_1.InputNumber, { theme: "dark", size: "small", defaultValue: 0, value: this.props.transform.localPosition.x, style: { width: '80%', float: 'left' } })),
                    React.createElement(antd_1.Col, { span: 6 },
                        React.createElement("div", { style: { width: '20%', height: '100%', float: 'left', color: '#F1F1F1', textAlign: 'center' } }, "Y"),
                        React.createElement(antd_1.InputNumber, { size: "small", defaultValue: 0, value: this.props.transform.localPosition.y, style: { width: '80%', float: 'left' } })),
                    React.createElement(antd_1.Col, { span: 6 },
                        React.createElement("div", { style: { width: '20%', height: '100%', float: 'left', color: '#F1F1F1', textAlign: 'center' } }, "Z"),
                        React.createElement(antd_1.InputNumber, { size: "small", defaultValue: 0, value: this.props.transform.localPosition.z, style: { width: '80%', float: 'left' } }))),
                React.createElement(antd_1.Row, { style: { padding: 2 } },
                    React.createElement(antd_1.Col, { span: 6 },
                        React.createElement("div", { style: { width: '100%', height: '100%', float: 'left', color: '#F1F1F1', textAlign: 'left' } }, "Rotation")),
                    React.createElement(antd_1.Col, { span: 6 },
                        React.createElement("div", { style: { width: '20%', height: '100%', float: 'left', color: '#F1F1F1', textAlign: 'center' } }, "X"),
                        React.createElement(antd_1.InputNumber, { theme: "dark", size: "small", defaultValue: 0, value: this.props.transform.localEuler.x, style: { width: '80%', float: 'left' } })),
                    React.createElement(antd_1.Col, { span: 6 },
                        React.createElement("div", { style: { width: '20%', height: '100%', float: 'left', color: '#F1F1F1', textAlign: 'center' } }, "Y"),
                        React.createElement(antd_1.InputNumber, { size: "small", defaultValue: 0, value: this.props.transform.localEuler.y, style: { width: '80%', float: 'left' } })),
                    React.createElement(antd_1.Col, { span: 6 },
                        React.createElement("div", { style: { width: '20%', height: '100%', float: 'left', color: '#F1F1F1', textAlign: 'center' } }, "Z"),
                        React.createElement(antd_1.InputNumber, { size: "small", defaultValue: 0, value: this.props.transform.localEuler.z, style: { width: '80%', float: 'left' } }))),
                React.createElement(antd_1.Row, { style: { padding: 2 } },
                    React.createElement(antd_1.Col, { span: 6 },
                        React.createElement("div", { style: { width: '100%', height: '100%', float: 'left', color: '#F1F1F1', textAlign: 'left' } }, "Scale")),
                    React.createElement(antd_1.Col, { span: 6 },
                        React.createElement("div", { style: { width: '20%', height: '100%', float: 'left', color: '#F1F1F1', textAlign: 'center' } }, "X"),
                        React.createElement(antd_1.InputNumber, { theme: "dark", size: "small", defaultValue: 1, value: this.props.transform.localScale.x, style: { width: '80%', float: 'left' } })),
                    React.createElement(antd_1.Col, { span: 6 },
                        React.createElement("div", { style: { width: '20%', height: '100%', float: 'left', color: '#F1F1F1', textAlign: 'center' } }, "Y"),
                        React.createElement(antd_1.InputNumber, { size: "small", defaultValue: 1, value: this.props.transform.localScale.y, style: { width: '80%', float: 'left' } })),
                    React.createElement(antd_1.Col, { span: 6 },
                        React.createElement("div", { style: { width: '20%', height: '100%', float: 'left', color: '#F1F1F1', textAlign: 'center' } }, "Z"),
                        React.createElement(antd_1.InputNumber, { size: "small", defaultValue: 1, value: this.props.transform.localScale.z, style: { width: '80%', float: 'left' } })))));
        }
    }
    class Ctrl {
        constructor() {
            this.m_bLoading = true;
        }
        Update(pObject) {
            if (this.m_bLoading) {
                if (0 === MiaokitJS.Miaokit.progress) {
                    this.m_bLoading = false;
                    if (pObject) {
                        return this.FlushWorld(pObject, null);
                    }
                    console.error("刷新场景");
                }
            }
            else {
                if (MiaokitJS.Miaokit.progress) {
                    this.m_bLoading = true;
                }
            }
            return null;
        }
        FlushWorld(pObject, aTree) {
            if (!aTree) {
                aTree = [];
            }
            let pNode = {
                key: pObject.m_nID,
                title: pObject.name,
                children: []
            };
            aTree.push(pNode);
            for (let pChild of pObject.children) {
                this.FlushWorld(pChild, pNode.children);
            }
            return aTree;
        }
    }
    ReactDOM.render(React.createElement(App, null), document.getElementById('viewContainer'));
    exports.default = App;
});

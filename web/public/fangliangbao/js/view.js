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
define("index", ["require", "exports", "react", "react-dom", "router"], function (require, exports, React, ReactDOM, router_1) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    class Index extends React.Component {
        constructor(props) {
            super(props);
            this.state = {};
            Index.g_pIns = this;
        }
        componentDidMount() {
        }
        render() {
            return (React.createElement("div", null, "fangliangbao"));
        }
    }
    Index.g_pIns = null;
    exports.default = Index;
    viewDraw = function () {
        ReactDOM.render(React.createElement(router_1.default, null), document.getElementById('viewContainer'));
    };
});

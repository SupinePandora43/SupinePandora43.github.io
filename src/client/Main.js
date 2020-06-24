"use strict";
var __extends = (this && this.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
        return extendStatics(d, b);
    };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
Object.defineProperty(exports, "__esModule", { value: true });
var React = require("react");
var react_router_dom_1 = require("react-router-dom");
var react_loadable_1 = require("react-loadable");
function loads() {
    return (React.createElement("div", null, "loader"));
}
var LoadableBar = react_loadable_1.default({
    loader: function () { return Promise.resolve().then(function () { return require('./subpages/Me'); }); },
    loading: loads,
});
var Main = /** @class */ (function (_super) {
    __extends(Main, _super);
    function Main(props) {
        return _super.call(this, props) || this;
    }
    Main.prototype.render = function () {
        return (React.createElement("div", { className: "Main", id: "Main" },
            React.createElement("div", null, "1"),
            React.createElement(react_router_dom_1.BrowserRouter, null,
                React.createElement("div", null,
                    React.createElement("nav", null,
                        React.createElement("ul", null,
                            React.createElement("li", null,
                                React.createElement(react_router_dom_1.Link, { to: "/" }, "Home")),
                            React.createElement("li", null,
                                React.createElement(react_router_dom_1.Link, { to: "/me" }, "About")),
                            React.createElement("li", null,
                                React.createElement(react_router_dom_1.Link, { to: "/users" }, "Users")))),
                    React.createElement(react_router_dom_1.Switch, null,
                        React.createElement(react_router_dom_1.Route, { path: "/me" },
                            React.createElement(LoadableBar, null)))))));
    };
    return Main;
}(React.Component));
exports.default = Main;
//# sourceMappingURL=Main.js.map
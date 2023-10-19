"use strict";
exports.__esModule = true;
var react_1 = require("react");
require("./App.css");
var material_1 = require("@mui/material");
var react_router_dom_1 = require("react-router-dom");
var Login_1 = require("./pages/Login");
var Register_1 = require("./pages/Register");
var Dashboard_1 = require("./pages/Dashboard");
var UploadImage_1 = require("./pages/UploadImage");
var AnalyzeImage_1 = require("./pages/AnalyzeImage");
var ViewProfile_1 = require("./pages/ViewProfile");
var App = function () {
    return (react_1["default"].createElement(material_1.Container, null,
        react_1["default"].createElement(react_router_dom_1.Routes, null,
            react_1["default"].createElement(react_router_dom_1.Route, { path: "/", element: react_1["default"].createElement(Register_1["default"], null) }),
            react_1["default"].createElement(react_router_dom_1.Route, { path: "/register", element: react_1["default"].createElement(Register_1["default"], null) }),
            react_1["default"].createElement(react_router_dom_1.Route, { path: "/login", element: react_1["default"].createElement(Login_1["default"], null) }),
            react_1["default"].createElement(react_router_dom_1.Route, { path: "/dashboard", element: react_1["default"].createElement(Dashboard_1["default"], null) }),
            react_1["default"].createElement(react_router_dom_1.Route, { path: "/uploadImage", element: react_1["default"].createElement(UploadImage_1["default"], null) }),
            react_1["default"].createElement(react_router_dom_1.Route, { path: "/analyzeImage", element: react_1["default"].createElement(AnalyzeImage_1["default"], null) }),
            react_1["default"].createElement(react_router_dom_1.Route, { path: "/viewProfile", element: react_1["default"].createElement(ViewProfile_1["default"], null) }))));
};
exports["default"] = App;

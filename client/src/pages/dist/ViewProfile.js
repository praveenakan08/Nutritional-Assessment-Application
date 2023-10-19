"use strict";
exports.__esModule = true;
var material_1 = require("@mui/material");
var CommonNavBar_1 = require("../Components/CommonNavBar");
var react_1 = require("react");
var axios_1 = require("axios");
var theme = material_1.createTheme({
    palette: {
        background: {
            paper: "#fff"
        },
        text: {
            primary: "#173A5E",
            secondary: "#46505A"
        },
        action: {
            active: "#001E3C"
        }
    },
    typography: {
        fontFamily: ["tinos"].join(",")
    }
});
var ViewProfile = function () {
    var _a = react_1.useState(), user = _a[0], setUser = _a[1];
    var email = 'abc@gmail.com';
    var userDetails = axios_1["default"]
        .get("http://localhost:3001/api/viewProfile", email)
        .then(function (res) { return setUser(res.data); })
        .then();
    return (React.createElement(material_1.ThemeProvider, { theme: theme },
        React.createElement(CommonNavBar_1["default"], null)));
};
exports["default"] = ViewProfile;

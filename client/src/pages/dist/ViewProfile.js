"use strict";
exports.__esModule = true;
var material_1 = require("@mui/material");
var CommonNavBar_1 = require("../Components/CommonNavBar");
var axios_1 = require("axios");
var react_1 = require("react");
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
    var email = localStorage.getItem("email");
    axios_1["default"].get("http://localhost:3001/register?email=" + email)
        .then(function (result) {
        if (!result) {
            setUser(result);
        }
        console.log("User!!!!", result);
    })["catch"](function (err) {
        console.log(err);
    });
    return (React.createElement(material_1.ThemeProvider, { theme: theme },
        React.createElement(CommonNavBar_1["default"], null),
        React.createElement(material_1.Grid, { alignItems: "center", spacing: 3 },
            React.createElement(material_1.Grid, { item: true },
                React.createElement(material_1.FormLabel, { id: "name" }, "Name"),
                React.createElement(material_1.TextField, { fullWidth: true, value: user === null || user === void 0 ? void 0 : user.name })),
            React.createElement(material_1.Grid, { item: true },
                React.createElement(material_1.FormLabel, { id: "email" }, "Email"),
                React.createElement(material_1.TextField, { fullWidth: true, 
                    // placeholder="Enter your Email"
                    value: "sdfaf" })),
            React.createElement(material_1.Grid, { item: true },
                React.createElement(material_1.FormLabel, { id: "age" }, "Age"),
                React.createElement(material_1.TextField, { fullWidth: true, 
                    // placeholder="Enter your age"
                    type: "number", value: "23" })),
            React.createElement(material_1.Grid, { item: true },
                React.createElement(material_1.FormLabel, { id: "height" }, "Height"),
                React.createElement(material_1.TextField, { fullWidth: true, placeholder: "Enter your height", id: "height", 
                    // required={true}
                    value: "23" })),
            React.createElement(material_1.Grid, { item: true },
                React.createElement(material_1.FormLabel, { id: "weight" }, "Weight"),
                React.createElement(material_1.TextField, { fullWidth: true, placeholder: "Enter your weight", id: "weight", 
                    // required={true}
                    value: "45" })),
            React.createElement(material_1.Grid, { item: true, style: { textAlign: 'center' } },
                React.createElement(material_1.Button, { variant: "contained", color: "success", size: "large", type: "submit" }, "Edit Profile")))));
};
exports["default"] = ViewProfile;

"use strict";
exports.__esModule = true;
var react_1 = require("react");
var material_1 = require("@mui/material");
var react_router_dom_1 = require("react-router-dom");
var react_hook_form_1 = require("react-hook-form");
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
        fontFamily: [
            'tinos',
        ].join(',')
    }
});
var Login = function () {
    var _a = react_1.useState(), email = _a[0], setEmail = _a[1];
    var _b = react_1.useState(), password = _b[0], setPassword = _b[1];
    var _c = react_hook_form_1.useForm(), register = _c.register, handleSubmit = _c.handleSubmit, errors = _c.formState.errors;
    var onSubmit = function (formInput) {
        formInput.preventDefault();
        axios_1["default"]
            .get("http://localhost:3001/register?email=" + email)
            .then(function (result) {
            localStorage.setItem("email", email || '');
            console.log("Login Result", result);
        })["catch"](function (err) {
            console.log(err);
        });
    };
    return (react_1["default"].createElement(material_1.ThemeProvider, { theme: theme },
        react_1["default"].createElement(material_1.Box, { sx: {
                bgcolor: "background.paper",
                boxShadow: 1,
                borderRadius: 2,
                p: 2,
                marginTop: 10,
                justifyItems: "center",
                width: 400
            } },
            react_1["default"].createElement("form", { onSubmit: handleSubmit(onSubmit) },
                react_1["default"].createElement(material_1.Grid, { container: true, alignItems: "center", spacing: 3 },
                    react_1["default"].createElement(material_1.Grid, { item: true, xs: 12 },
                        react_1["default"].createElement(material_1.Box, { sx: { bgcolor: "#1b5e20" } },
                            react_1["default"].createElement(material_1.Typography, { variant: "h3", component: "h3", color: "white", display: "flex", justifyContent: "center" },
                                react_1["default"].createElement("img", { src: "/nutrifit-logo.png", height: 60, width: 60, alt: "Logo" }),
                                react_1["default"].createElement(material_1.Box, { sx: { paddingLeft: "4px" } }, "NutriFit")))),
                    react_1["default"].createElement(material_1.Grid, { item: true, xs: 12 },
                        react_1["default"].createElement(material_1.FormLabel, { id: "email" }, "Email"),
                        react_1["default"].createElement(material_1.TextField, { fullWidth: true, placeholder: "Enter your Email", "aria-label": "email", value: email, required: true, onChange: function (e) { return setEmail(e.target.value); } })),
                    react_1["default"].createElement(material_1.Grid, { item: true, xs: 12 },
                        react_1["default"].createElement(material_1.FormLabel, { id: "password" }, "Password"),
                        react_1["default"].createElement(material_1.TextField, { fullWidth: true, "aria-label": "password", placeholder: "Enter your password", type: "password", required: true, value: password, onChange: function (e) { return setPassword(e.target.value); } })),
                    react_1["default"].createElement(material_1.Grid, { item: true, xs: 12, style: { textAlign: 'center' } },
                        react_1["default"].createElement(material_1.Button, { variant: "contained", color: "success", size: "large" }, "Login")),
                    react_1["default"].createElement(material_1.Grid, { item: true, xs: 12, style: { textAlign: 'center' } },
                        react_1["default"].createElement(react_router_dom_1.Link, { to: "/register" }, "New user? Sign up Here!")))))));
};
exports["default"] = Login;

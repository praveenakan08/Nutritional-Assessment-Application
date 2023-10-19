"use strict";
exports.__esModule = true;
exports.ViewProfile = void 0;
var react_1 = require("react");
var material_1 = require("@mui/material");
var CommonNavBar_1 = require("../Components/CommonNavBar");
var ViewProfile_1 = require("./ViewProfile");
exports.ViewProfile = function () {
    return (react_1["default"].createElement(material_1.ThemeProvider, { theme: ViewProfile_1.theme },
        react_1["default"].createElement(CommonNavBar_1["default"], null),
        react_1["default"].createElement(material_1.Grid, { container: true, alignItems: "center", spacing: 3 },
            react_1["default"].createElement(material_1.Grid, { item: true, xs: 12 },
                react_1["default"].createElement(material_1.Box, { sx: { bgcolor: "#1b5e20" } },
                    react_1["default"].createElement(material_1.Typography, { variant: "h3", component: "h3", color: "white", display: "flex", justifyContent: "center" },
                        react_1["default"].createElement("img", { src: "/nutrifit-logo.png", height: 60, width: 60, alt: "Logo" }),
                        react_1["default"].createElement(material_1.Box, { sx: { paddingLeft: "4px" } }, "NutriFit")))),
            react_1["default"].createElement(material_1.Grid, { item: true, xs: 12 },
                react_1["default"].createElement(material_1.FormLabel, { id: "name" }, "Name"),
                react_1["default"].createElement(material_1.TextField, { fullWidth: true, placeholder: "Enter your Name", value: name, required: true, error: !(name.length > 0), onChange: function (e) { return setName(e.target.value); } })),
            react_1["default"].createElement(material_1.Grid, { item: true, xs: 12 },
                react_1["default"].createElement(material_1.FormLabel, { id: "email" }, "Email"),
                react_1["default"].createElement(material_1.TextField, { fullWidth: true, placeholder: "Enter your Email", value: email, required: true, error: !email.includes("@gmail.com"), onChange: function (e) { return setEmail(e.target.value); } })),
            react_1["default"].createElement(material_1.Grid, { item: true, xs: 6 },
                react_1["default"].createElement(material_1.FormLabel, { id: "age" }, "Age"),
                react_1["default"].createElement(material_1.TextField, { fullWidth: true, placeholder: "Enter your age", type: "number", value: age, required: true, error: !(age > 0), onChange: function (e) { return setAge(parseInt(e.target.value)); } })),
            react_1["default"].createElement(material_1.Grid, { item: true, xs: 6 },
                react_1["default"].createElement(material_1.FormLabel, { id: "gender" }, "Gender"),
                react_1["default"].createElement(RadioGroup, { row: true, "aria-label": "gender", name: "gender" },
                    react_1["default"].createElement(FormControlLabel, { value: "female", control: react_1["default"].createElement(Radio, null), label: "Female", onChange: function (e) { return setGender("Female"); } }),
                    react_1["default"].createElement(FormControlLabel, { value: "male", control: react_1["default"].createElement(Radio, null), label: "Male", onChange: function (e) { return setGender("Male"); } }))),
            react_1["default"].createElement(material_1.Grid, { item: true, xs: 6 },
                react_1["default"].createElement(material_1.FormLabel, { id: "height" }, "Height"),
                react_1["default"].createElement(material_1.TextField, { fullWidth: true, placeholder: "Enter your height", id: "height", required: true, error: height == null, onChange: function (e) { return setHeight(e.target.value); } })),
            react_1["default"].createElement(material_1.Grid, { item: true, xs: 6 },
                react_1["default"].createElement(material_1.FormLabel, { id: "weight" }, "Weight"),
                react_1["default"].createElement(material_1.TextField, { fullWidth: true, placeholder: "Enter your weight", id: "weight", required: true, error: weight == null, onChange: function (e) { return setWeight(e.target.value); } })),
            react_1["default"].createElement(material_1.Grid, { item: true, xs: 12 },
                react_1["default"].createElement(material_1.FormLabel, { id: "password" }, "Password"),
                react_1["default"].createElement(material_1.TextField, { fullWidth: true, placeholder: "Create your password", type: "password", required: true, error: !(password.length > 6), onChange: function (e) { return setPassword(e.target.value); } })),
            react_1["default"].createElement(material_1.Grid, { item: true, xs: 12, style: { textAlign: 'center' } },
                react_1["default"].createElement(Button, { variant: "contained", color: "success", size: "large", type: "submit" }, "Register")))));
};

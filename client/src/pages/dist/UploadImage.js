"use strict";
var __spreadArrays = (this && this.__spreadArrays) || function () {
    for (var s = 0, i = 0, il = arguments.length; i < il; i++) s += arguments[i].length;
    for (var r = Array(s), k = 0, i = 0; i < il; i++)
        for (var a = arguments[i], j = 0, jl = a.length; j < jl; j++, k++)
            r[k] = a[j];
    return r;
};
exports.__esModule = true;
var react_1 = require("react");
var material_1 = require("@mui/material");
var axios_1 = require("axios");
var Dropzone_1 = require("../Components/Dropzone");
var CommonNavBar_1 = require("../Components/CommonNavBar");
var UploadImage = function () {
    var _a = react_1.useState([]), image = _a[0], setImage = _a[1];
    var handleChange = function (event) {
        if (!event.target.files)
            return;
        setImage(event.target.files[0]);
        console.log("Hello!!", event.target.files[0]);
    };
    var onDrop = react_1.useCallback(function (acceptedFiles, rejectedFiles) {
        acceptedFiles.forEach(function (file) {
            setImage(function (prevState) { return __spreadArrays(prevState, [file]); });
            console.log("Image", file);
        });
    }, []);
    var imageStyle = { width: "500px", height: "500px" };
    var AnalyzeImage = function () {
        axios_1["default"].post("/api/analyze", { image: image });
    };
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
            fontFamily: ["tinos"].join(","),
            fontSize: 15,
            button: {
                textTransform: 'none'
            }
        }
    });
    return (react_1["default"].createElement(material_1.ThemeProvider, { theme: theme },
        react_1["default"].createElement(CommonNavBar_1["default"], null),
        react_1["default"].createElement("div", null,
            image.length > 0 ? (image.map(function (image, index) { return (react_1["default"].createElement(material_1.Box, { sx: { marginTop: 10 } },
                react_1["default"].createElement("img", { style: imageStyle, src: "" + URL.createObjectURL(image), key: index, alt: "" }))); })) : (react_1["default"].createElement(material_1.Grid, { container: true, xs: 12, columnGap: 4 },
                react_1["default"].createElement(material_1.Box, { paddingLeft: 20, paddingTop: 4 },
                    react_1["default"].createElement(Dropzone_1["default"], { onDrop: onDrop, accept: "image/*" })),
                react_1["default"].createElement(material_1.Grid, { marginTop: 28 },
                    react_1["default"].createElement(material_1.Divider, { orientation: "vertical", style: { height: "100%", backgroundColor: "#26672D" } })),
                react_1["default"].createElement(material_1.Box, { paddingTop: 45 },
                    react_1["default"].createElement("label", { htmlFor: "upload-photo" },
                        react_1["default"].createElement("input", { style: { display: "none" }, id: "upload-photo", name: "upload-photo", type: "file", onChange: handleChange }),
                        react_1["default"].createElement(material_1.Button, { sx: { bgcolor: "#26672D" }, variant: "contained", component: "span", startIcon: react_1["default"].createElement(material_1.Avatar, { src: '/upload-file-white.png' }) },
                            react_1["default"].createElement(material_1.Typography, null, "Select from Computer")))))),
            react_1["default"].createElement("div", { style: { display: "flex", justifyContent: "center", marginTop: 10 } }, image.length > 0 && (react_1["default"].createElement(material_1.Button, { variant: "contained", color: "success", style: { borderRadius: "6px" }, size: "large", onClick: function () { return AnalyzeImage(); } },
                react_1["default"].createElement(material_1.Typography, null, "Analyze")))))));
};
exports["default"] = UploadImage;

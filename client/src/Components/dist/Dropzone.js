"use strict";
var __assign = (this && this.__assign) || function () {
    __assign = Object.assign || function(t) {
        for (var s, i = 1, n = arguments.length; i < n; i++) {
            s = arguments[i];
            for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
                t[p] = s[p];
        }
        return t;
    };
    return __assign.apply(this, arguments);
};
exports.__esModule = true;
var react_dropzone_1 = require("react-dropzone");
var material_1 = require("@mui/material");
var icons_material_1 = require("@mui/icons-material");
var DropZone = function (props) {
    var onDrop = props.onDrop;
    var _a = react_dropzone_1.useDropzone({
        multiple: false,
        accept: { "image/*": [".png", ".jpeg"] },
        onDrop: onDrop
    }), getRootProps = _a.getRootProps, getInputProps = _a.getInputProps, acceptedFiles = _a.acceptedFiles, isDragActive = _a.isDragActive;
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
            fontSize: 15
        }
    });
    return (React.createElement(material_1.ThemeProvider, { theme: theme },
        React.createElement(material_1.Box, { sx: {
                bgcolor: "background.paper",
                boxShadow: 1,
                border: "dashed",
                borderRadius: 2,
                borderColor: "gray",
                p: 2,
                marginTop: 23,
                justifyItems: "center",
                width: 500,
                height: 300
            } },
            React.createElement("div", __assign({}, getRootProps(), { style: {
                    display: "flex",
                    justifyContent: "center",
                    paddingTop: "100px"
                } }),
                React.createElement("input", __assign({}, getInputProps())),
                isDragActive ? (React.createElement(material_1.Typography, null, "Drop food Image here ...")) : (React.createElement("div", { style: { alignItems: "center" } },
                    React.createElement(material_1.Typography, { fontSize: "20" }, "Drag and drop food image here"),
                    React.createElement("div", { style: { justifyContent: "center", display: "flex" } },
                        React.createElement(icons_material_1.CloudUpload, { fontSize: "large" }))))))));
};
exports["default"] = DropZone;

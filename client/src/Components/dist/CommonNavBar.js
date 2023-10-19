"use strict";
exports.__esModule = true;
var react_1 = require("react");
var material_1 = require("@mui/material");
var drawerWidth = 240;
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
        button: {
            textTransform: 'none'
        }
    }
});
var CommonNavBar = function () {
    return (react_1["default"].createElement(material_1.ThemeProvider, { theme: theme },
        react_1["default"].createElement(material_1.AppBar, { position: "fixed", sx: {
                width: "calc(100% - " + drawerWidth + "px)",
                ml: drawerWidth + "px",
                bgcolor: "#26672D"
            } },
            react_1["default"].createElement(material_1.Toolbar, null,
                react_1["default"].createElement(material_1.Typography, { variant: "h3", noWrap: true, component: "div" }, "NutriFit"))),
        react_1["default"].createElement(material_1.Grid, { container: true, xs: 12 },
            react_1["default"].createElement(material_1.Box, null,
                react_1["default"].createElement(material_1.Drawer, { sx: {
                        width: drawerWidth,
                        flexShrink: 0,
                        "& .MuiDrawer-paper": {
                            width: drawerWidth,
                            boxSizing: "border-box"
                        }
                    }, PaperProps: {
                        sx: {
                            backgroundColor: "#26672D",
                            color: "#ffffff"
                        }
                    }, variant: "permanent", anchor: "left" },
                    react_1["default"].createElement(material_1.Toolbar, null),
                    react_1["default"].createElement(material_1.Grid, { container: true, justifyContent: "center", columnGap: 10 },
                        react_1["default"].createElement(material_1.Avatar, { alt: "Profile Image", src: "/profile-image.png", sx: { width: 75, height: 75 } }),
                        react_1["default"].createElement(material_1.Button, { variant: "text", sx: { color: "#ffffff" }, component: material_1.Link, href: "/viewProfile" },
                            react_1["default"].createElement(material_1.Typography, null, "Your Profile"))),
                    react_1["default"].createElement(material_1.List, null, [
                        { text: "Dashboard", url: "/dashboard" },
                        { text: "Upload Food Image", url: "/uploadImage" },
                        // { text: "Edit Profile", url: "/viewProfile" },
                        { text: "View Assessment History", url: "/" },
                    ].map(function (item, index) { return (react_1["default"].createElement(material_1.Link, { href: item.url, style: { color: "#FFF" } },
                        react_1["default"].createElement(material_1.ListItem, { key: item.text, disablePadding: true },
                            react_1["default"].createElement(material_1.ListItemButton, null,
                                react_1["default"].createElement(material_1.ListItemText, { primary: item.text, primaryTypographyProps: { fontSize: "21px" }, sx: { textAlign: "center" } }))))); })),
                    react_1["default"].createElement(material_1.Divider, null),
                    react_1["default"].createElement(material_1.List, null, ["Logout"].map(function (text, index) { return (react_1["default"].createElement(material_1.ListItem, { key: text, disablePadding: true },
                        react_1["default"].createElement(material_1.ListItemButton, null,
                            react_1["default"].createElement(material_1.ListItemText, { primary: text, primaryTypographyProps: { fontSize: "21px" }, sx: { textAlign: "center" } })))); })))))));
};
exports["default"] = CommonNavBar;

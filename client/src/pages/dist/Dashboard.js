"use strict";
exports.__esModule = true;
var material_1 = require("@mui/material");
var CommonNavBar_1 = require("../Components/CommonNavBar");
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
var Dashboard = function () {
    return (React.createElement(material_1.ThemeProvider, { theme: theme },
        React.createElement(CommonNavBar_1["default"], null),
        React.createElement(material_1.Grid, { container: true, paddingTop: 20, paddingLeft: 25, columnGap: 4 },
            React.createElement(material_1.Card, null,
                React.createElement(material_1.CardActionArea, { component: material_1.Link, href: "/uploadImage" },
                    React.createElement(material_1.CardMedia, { component: "img", image: "/upload-image.png", alt: "upload image" }),
                    React.createElement(material_1.CardContent, { sx: { display: "flex", justifyContent: "center" } },
                        React.createElement(material_1.Typography, { gutterBottom: true, variant: "h5", component: "div" }, "Upload Image")))),
            React.createElement(material_1.Card, null,
                React.createElement(material_1.CardActionArea, null,
                    React.createElement(material_1.CardMedia, { component: "img", image: "/view-assessment-history.png", alt: "view assessment history" }),
                    React.createElement(material_1.CardContent, { sx: { display: "flex", justifyContent: "center" } },
                        React.createElement(material_1.Typography, { gutterBottom: true, variant: "h5", component: "div" }, "View Assessment History")))))));
};
exports["default"] = Dashboard;

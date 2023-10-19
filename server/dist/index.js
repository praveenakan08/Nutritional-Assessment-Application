"use strict";
exports.__esModule = true;
var express_1 = require("express");
var mongoose_1 = require("mongoose");
var cors_1 = require("cors");
var Register_1 = require("./models/Register");
var path_1 = require("path");
var port = 3001;
var app = express_1["default"]();
var UI_BUILD = path_1.join(__dirname);
app.use(cors_1["default"]());
app.use(express_1["default"].json());
app.use(express_1["default"].static(path_1["default"].join(UI_BUILD, "public")));
mongoose_1["default"].connect("mongodb://127.0.0.1:27017/admin");
app.get("/api/login", function (req, res) {
    var email = req.query.email;
    var password = req.query.password;
    Register_1.RegisterModel.findOne({ email: email })
        .then(function (user) {
        if (user.password == password) {
            res.json({ status: 200, message: "User Authenticated!" });
        }
        else {
            res.json({ status: 403, message: "Wrong password!" });
        }
    })["catch"](function (err) {
        res.json({ status: 500, message: "Not registered!" });
    });
});
app.get("/api/viewProfile", function (req, res) {
    var email = req.query.email;
    var response = Register_1.RegisterModel.findOne({ email: email });
    return res.json(response);
});
app.post("/api/register", function (req, res) {
    var _a = req.body, name = _a.name, email = _a.email, gender = _a.gender, age = _a.age, height = _a.height, bmi = _a.bmi, password = _a.password;
    Register_1.RegisterModel.findOne({ email: email })
        .then(function (user) {
        if (user) {
            res.json({ status: 200, message: "Already have an account" });
        }
        else {
            Register_1.RegisterModel.create({
                email: email,
                name: name,
                age: age,
                gender: gender,
                height: height,
                bmi: bmi,
                password: password
            })
                .then(function (result) {
                res.json({ status: 200, message: "Account Created!" });
            })["catch"](function (err) {
                res.json({ status: 500, message: "Error in Creating Account", error: err });
            });
        }
    })["catch"](function (err) {
        res.json({ status: 500, message: "Error in Creating Account", error: err });
    });
});
app.listen(port, function () {
    console.log("Server is Running at 3001");
});

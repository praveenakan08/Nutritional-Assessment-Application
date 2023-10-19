import mongoose from "mongoose";

const RegisterSchema=new mongoose.Schema({
    name:String,
    email:String,
    age:Number,
    gender:String,
    height:String,
    weight:String,
    password:String,

})

const RegisterModel=mongoose.model("register",RegisterSchema);

// module.exports= RegisterModel;

export {RegisterModel};
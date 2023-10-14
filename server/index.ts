import express from 'express';
import mongoose from 'mongoose';
import cors from 'cors';
import {RegisterModel}  from './models/Register';


const app=express();
app.use(cors());
app.use(express.json());

mongoose.connect('mongodb://127.0.0.1:27017/admin');

app.post('/register',(req,resp)=>{
    const{name,email,gender,age,height,bmi,password}=req.body;
    RegisterModel.findOne({email:email}).then((user: any)=>{
        if(user){
            resp.json("Already have an account");
        }
        else{
            RegisterModel.create({email:email,name:name,age:age,gender:gender,height:height,bmi:bmi,password:password})
            .then((result:any)=>{
                resp.json("Account Created!")
            }).catch((err:any)=>{
                console.log(err);
                resp.json("Error in Creating Account");
            })
        }
    }).catch((err: any)=>{
        resp.json(err);
    })
})
app.listen(3001,()=>{
    console.log("Server is Running at 3001");
})
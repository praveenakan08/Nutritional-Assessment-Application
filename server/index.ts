import express from 'express';
import mongoose from 'mongoose';
import cors from 'cors';
import {RegisterModel}  from './models/Register';
import path from 'path';

const port=3001;
const app=express();
app.use(cors());
app.use(express.json());
app.use(express.static(path.join(__dirname, 'public')))

mongoose.connect('mongodb://127.0.0.1:27017/admin');

app.get(`/api/login`,(req,res)=>{
    const email=req.query.email;
    const password=req.query.password;
    RegisterModel.findOne({email:email}).then((user: any)=>{
        if(user){
            if(user.password==password){
                res.render('/dashboard');
            }
            else{
                res.json({ message:'Wrong password!'})
            }
        }
        else{
            res.json({message:'Not registered!'});
            res.render('http://localhost:3000/register');
        }
    }).catch((err: any)=>{
        res.json(err);
    })

})
app.post('/api/register',(req,resp)=>{
    const{name,email,gender,age,height,bmi,password}=req.body;
    RegisterModel.findOne({email:email}).then((user: any)=>{
        if(user){
            resp.json("Already have an account");
            resp.render('http://localhost:3000/login');
        }
        else{
            RegisterModel.create({email:email,name:name,age:age,gender:gender,height:height,bmi:bmi,password:password})
            .then((result:any)=>{
                resp.json("Account Created!")
                resp.render('http://localhost:3000/dashboard');
            }).catch((err:any)=>{
                console.log(err);
                resp.json("Error in Creating Account");
            })
        }
    }).catch((err: any)=>{
        resp.json(err);
    })
})
app.listen(port,()=>{
    console.log("Server is Running at 3001");
})
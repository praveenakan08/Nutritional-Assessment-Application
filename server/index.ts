import express from "express";
import mongoose from "mongoose";
import cors from "cors";
import { RegisterModel } from "./models/Register";
import path, { join } from "path";
import * as tf from '@tensorflow/tfjs';
import { ImageData, loadImage } from "canvas";
import * as tfn from '@tensorflow/tfjs-node';
import {loadGraphModel} from '@tensorflow/tfjs-converter';
import * as fs from 'fs';

const port = 3001;
const app = express();
const UI_BUILD = join(__dirname);

app.use(cors());
app.use(express.json());
app.use(express.static(path.join(UI_BUILD, "public")));

mongoose.connect("mongodb://127.0.0.1:27017/admin");


app.get(`/api/login`, (req, res) => {
  const email = req.query.email;
  const password = req.query.password;
  RegisterModel.findOne({ email: email })
    .then((user: any) => {
      if (user.password == password) {
        res.json({ status: 200, message: "User Authenticated!" });
      } else {
        res.json({ status: 403, message: "Wrong password!" });
      }
    })
    .catch((err: any) => {
      res.json({ status: 500, message: "Not registered!" });
    });
});

app.get(`/api/viewProfile`, async (req, res) => {
  try {
    const email = req.query.email;
    if (!email) {
      return res.status(400).json({ error: "Email is required" });
    }
    const user = await RegisterModel.findOne({ email });
    if (!user) {
      return res.status(404).json({ error: "User not found" });
    }
    res.json(user);
  } catch (error) {
    res.status(500).json({ error: "Internal server error" });
  }
});

app.post(`/api/register`, (req, res) => {
  const { name, email, gender, age, height, bmi, password } = req.body;
  RegisterModel.findOne({ email: email })
    .then((user: any) => {
      if (user) {
        res.json({ status: 200, message: "Already have an account" });
      } else {
        RegisterModel.create({
          email: email,
          name: name,
          age: age,
          gender: gender,
          height: height,
          bmi: bmi,
          password: password,
        })
          .then((result: any) => {
            res.json({ status: 200, message: "Account Created!" });
          })
          .catch((err: any) => {
            res.json({ status:500,message: "Error in Creating Account",error:err });
          });
      }
    })
    .catch((err: any) => {
      res.json({ status:500,message: "Error in Creating Account",error:err });
    });
});

app.post(`/api/analyze`,async (req,res)=>{
  const image=req.body;
  console.log("Image",image);
  const file=fs.createReadStream(image.path);
  console.log("File",file);
  const modelPath = './models/ML_Model/model.json';
  const handler = tfn.io.fileSystem(modelPath);
  const model = await loadGraphModel(handler as tf.io.IOHandler);
  const input = tf.browser.fromPixels(image);

  // .toFloat()
  // .expandDims();
console.log("Input", input);
const normalized = input.div(255);
const predictions = model.predict(normalized) as tf.Tensor;
console.log("Prdictions", predictions);
return res.json(predictions);
  
})
app.listen(port, () => {
  console.log("Server is Running at 3001");
});

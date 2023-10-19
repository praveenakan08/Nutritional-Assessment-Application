import express from "express";
import mongoose from "mongoose";
import cors from "cors";
import { RegisterModel } from "./models/Register";
import path, { join } from "path";
import * as tf from '@tensorflow/tfjs';
import { loadImage } from "canvas";
import * as tfn from '@tensorflow/tfjs-node';
//import {loadGraphModel} from '@tensorflow/tfjs-converter';

const port = 3001;
const app = express();
const UI_BUILD = join(__dirname);

app.use(cors());
app.use(express.json());
app.use(express.static(path.join(UI_BUILD, "public")));
// app.use((req,res)=>{
//     return res.sendFile(join(UI_BUILD, '/public/index.html'));
// })

mongoose.connect("mongodb://127.0.0.1:27017/admin");


app.get(`/api/login`, (req, res) => {
  const email = req.query.email;
  const password = req.query.password;
  RegisterModel.findOne({ email: email })
    .then((user: any) => {
    //   console.log("User", user);
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
  console.log("Image",image[0]);
  const imagePath=image[0].path;

  //const file=new File(image,'./models/model.json');
  //const blob =URL.createObjectURL(image[0]);
  const modelPath = './models/ML_Model/model.json';
  const handler = tfn.io.fileSystem(modelPath);
  const model = await tfn.loadLayersModel(handler);
  console.log("model",model);
  //const img=await loadImage(blob);
  
  //const input = tf.browser.fromPixels({data:new Uint8ClampedArray(img.dataMode),width:img.width,height:img.height,colorSpace:'srgb'}).toFloat().expandDims();

  //const normalized = input.div(255);
  //const predictions = model.predict(normalized) as tf.Tensor;

  // const topK = 5;
  // const topKIndices = tf.topk(predictions, topK).indices.dataSync();
  // console.log("Top", topK, "predictions:");
  
})
app.listen(port, () => {
  console.log("Server is Running at 3001");
});

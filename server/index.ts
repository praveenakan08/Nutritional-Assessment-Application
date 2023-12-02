import express from "express";
import mongoose from "mongoose";
import cors from "cors";
import { RegisterModel, MetricModel } from "./models";
import path, { join } from "path";
import * as tfn from "@tensorflow/tfjs-node";
import { Request, Response } from "express";
import fileUpload, { UploadedFile } from "express-fileupload";
import fs from "fs";
import nodemailer from "nodemailer";
require("dotenv").config();

const app = express();
const corsOptions = {
  origin: "*",
};

//process.env.FRONTEND_URL || "https://localhost:3000", // frontend URI (ReactJS)
app.use(fileUpload());
app.use(express.json());
app.use(cors(corsOptions));
app.use(express.urlencoded({ extended: true }));

app.get("/", (req, res) => {
  res.status(201).json({ message: "Connected to Backend!" });
});
mongoose
  .connect(process.env.MONGODB_URI || "mongodb://127.0.0.1:27017/admin")
  .then(() => {
    const PORT = process.env.PORT || 3001;
    app.listen(PORT, () => {
      console.log(`App is Listening on PORT ${PORT}`);
    });
  })
  .catch((err) => {
    console.log(err);
  });

function findKeyByValue(
  map: { [index: string]: number },
  value: number
): string | undefined {
  const keys = Object.keys(map);
  for (const key of keys) {
    if (map[key] === value) {
      return key;
    }
  }
  return undefined;
}

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

app.get("/api/userInfo", (req, res) => {
  const email = req.query.email;
  RegisterModel.findOne({ email: email })
    .then((result) => {
      res.json({
        status: 200,
        message: "User Info retrieved",
        payload: result,
      });
    })
    .catch((err) => {
      res.json({
        status: 500,
        message: "Error in fetching userInfo",
        error: err,
      });
    });
});

app.get(`/api/viewAssessmentHistory`, async (req, res) => {
  try {
    const email = req.query.email;
    console.log("EMAIL: ", email);
    MetricModel.find({ email })
      .then((result: any) => {
        res.json({
          metrics: result,
        });
      })
      .catch((err: any) => {
        res.json({
          error: err,
        });
      });
  } catch (error) {
    res.status(500).json({ error: "Internal server error" });
  }
});

app.post(`/api/register`, (req, res) => {
  const { name, email, gender, age, height, weight, password } = req.body;
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
          weight: weight,
          password: password,
        })
          .then((result: any) => {
            res.json({ status: 200, message: "Account Created!" });
          })
          .catch((err: any) => {
            res.json({
              status: 500,
              message: "Error in Creating Account",
              error: err,
            });
          });
      }
    })
    .catch((err: any) => {
      console.log("Error", err);
      res.json({
        status: 500,
        message: "Error in Creating Account",
        error: err,
      });
    });
});

app.get("/api/getMetrics", async (req, res) => {
  const email = req.query.email;
  const currentDate = new Date();
  const today = new Date();
  today.setHours(0, 0, 0, 0);

  MetricModel.find({
    email: email,
    date: {
      $gte: today,
      $lte: currentDate,
    },
  })
    .then((result) => {
      res.json({
        status: 200,
        message: "Metrics info retreived",
        payload: result,
      });
    })
    .catch((err) => {
      res.json({
        message: "Error in fetching metrics info",
        error: err,
        status: 500,
      });
    });
});

app.get("/api/getStdMetrics", async (req, res) => {
  const email = req.query.email;
  const age = parseInt(req.query.age as string);
  const gender = req.query.gender as string;
  fs.readFile("./metadata/standard_metrics.json", "utf8", (err, data) => {
    if (err) {
      console.error("Error reading JSON file:", err);
      return;
    }
    const std_metrics = JSON.parse(data);
    for (const [key, value] of Object.entries(std_metrics)) {
      const true_age = key.split("-");
      if (parseInt(true_age?.[0]) <= age && parseInt(true_age?.[1]) >= age) {
        res.json({
          status: 200,
          message: "Standard Metrics info retreived",
          payload: (value as any)[gender],
        });
      }
    }
  });
});

app.get("/api/getMetrics", async (req, res) => {
  const email = req.query.email;
  const currentDate = new Date();
  const today = new Date();
  today.setHours(0, 0, 0, 0);

  MetricModel.find({
    email: email,
    date: {
      $gte: today,
      $lte: currentDate,
    },
  })
    .then((result) => {
      res.json({
        status: 200,
        message: "Metrics info retreived",
        payload: result,
      });
    })
    .catch((err) => {
      res.json({
        message: "Error in fetching metrics info",
        error: err,
        status: 500,
      });
    });
});

app.get("/api/getStdMetrics", async (req, res) => {
  const email = req.query.email;
  const age = parseInt(req.query.age as string);
  const gender = req.query.gender as string;
  fs.readFile("./metadata/standard_metrics.json", "utf8", (err, data) => {
    if (err) {
      console.error("Error reading JSON file:", err);
      return;
    }
    const std_metrics = JSON.parse(data);
    for (const [key, value] of Object.entries(std_metrics)) {
      const true_age = key.split("-");
      if (parseInt(true_age?.[0]) <= age && parseInt(true_age?.[1]) >= age) {
        res.json({
          status: 200,
          message: "Standard Metrics info retreived",
          payload: (value as any)[gender],
        });
      }
    }
  });
});

app.post("/api/analyze", async (req: Request, res: Response) => {
  try {
    if (!req.files || !req.files.files) {
      return res.status(400).send("No file uploaded or incorrect field name.");
    }
    const image = req.files.files as UploadedFile;
    const email = req.body.email;
    const portion = parseInt(req.body.portion);
    console.log("Portion", portion);
    const handler = tfn.io.fileSystem("./ml_model/model.json");
    const model = await tfn.loadGraphModel(handler);

    const imgBuffer = Buffer.from(image.data);
    const imgTensor = tfn.node.decodeImage(imgBuffer);

    const resizedImgTensor = tfn.image.resizeBilinear(imgTensor, [224, 224]);

    const channels = 3;
    const processedInput = resizedImgTensor.reshape([-1, 224, 224, channels]);

    const predictions = model.predict(processedInput);
    const [
      cal_output,
      carbs_output,
      category_output,
      pro_output,
      ing_output,
      fat_output,
    ] = predictions as tfn.Tensor[];

    const categoryValues = category_output.arraySync() as number[];
    const ingValues = ing_output.arraySync() as number[];
    const calValue =
      Math.round((cal_output.arraySync() as number) * 100 * portion) / 100;
    const carbsValue =
      Math.round((carbs_output.arraySync() as number) * 100 * portion) / 100;
    const proValue =
      Math.round((pro_output.arraySync() as number) * 100 * portion) / 100;
    const fatValue =
      Math.round((fat_output.arraySync() as number) * 100 * portion) / 100;

    console.log("calories PREDICTION", calValue);
    console.log("CARBS PREDICTION", carbsValue);
    console.log("PROTEIN PREDICTION", proValue);
    console.log("FAT PREDICTION", fatValue);

    //Category Prediction
    const categoryFilePath = path.join(__dirname, "./metadata/cat.json");
    const categoryJsonData = fs.readFileSync(categoryFilePath, "utf-8");
    const flatCategoryValues = categoryValues.flat();
    const maxCategoryValue = Math.max(...flatCategoryValues);
    const cat_pred = flatCategoryValues.indexOf(maxCategoryValue);
    const categoryMap: { [index: string]: number } =
      JSON.parse(categoryJsonData);
    const category = findKeyByValue(categoryMap, cat_pred);
    console.log("CATEGORY PREDICTION", category);

    //Ingredients Prediction
    const filePath = path.join(__dirname, "./metadata/ing.json");
    const jsonData = fs.readFileSync(filePath, "utf-8");
    const flatIngValues = ingValues.flat();
    const ing_pred: number[] = [];
    flatIngValues.forEach((value, index) => {
      if (value >= 0.5) {
        ing_pred.push(index);
      }
    });

    console.log("INGREDIENTS PREDICTION");
    const ingredientMap: { [index: string]: number } = JSON.parse(jsonData);
    const ingredients: string[] = [];
    ing_pred.forEach((value, index) => {
      const key = findKeyByValue(ingredientMap, value);
      ingredients.push(key || "");
    });
    console.log(ingredients);

    //Inserting metrics info into DB
    MetricModel.insertMany([
      {
        email: email,
        dish: category,
        date: new Date(),
        calories: calValue,
        carbohydrates: carbsValue,
        protein: proValue,
        fat: fatValue,
      },
    ])
      .then((result: any) => {
        res.json({
          status: 200,
          message: "Metrics info inserted",
          payload: { metrics: result, ingredients: ingredients },
        });
      })
      .catch((err: any) => {
        res.json({
          status: 500,
          message: "Error in inserting Metrics",
          error: err,
        });
      });
  } catch (error) {
    console.error("Error in analyzing image:", error);
    res.status(500).json({ error: "Internal server error" });
  }
});

app.post("/api/sendEmail", async (req, res) => {
  const email = req.body.email;
  const base64Data = req.body.file;
  const buffer = Buffer.from(base64Data, "base64");
  try {
    const transporter = nodemailer.createTransport({
      service: "gmail",
      auth: {
        user: "mansi.rathi62@gmail.com",
        pass: "xkks jpst efsm efmc",
      },
    });

    const mailOptions = {
      from: "mansi.rathi62@gmail.com",
      to: email,
      subject: "Nutrifit Assessment Report",
      text: "Here is your Assessment History!",
      attachments: [
        {
          filename: `Nutrifit_Assessment_${new Date().getUTCDate()}.xlsx`,
          content: buffer,
        },
      ],
    };

    await transporter.sendMail(mailOptions);

    res.status(200).send("Email sent successfully");
  } catch (error) {
    console.error(error);
    res.status(500).send("Internal Server Error");
  }
});

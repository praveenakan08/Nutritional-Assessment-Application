import mongoose from "mongoose";

const MetricsSchema = new mongoose.Schema({
  email: String,
  dish: String,
  date: Date,
  calories: Number,
  carbohydrates: Number,
  protein: Number,
  fat: Number,
});

const MetricModel = mongoose.model("metrics", MetricsSchema);

export { MetricModel };

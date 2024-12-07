const mongoose = require("mongoose");

const challengeSchema = new mongoose.Schema({
  title: { type: String, required: true },
  description: { type: String, required: true },
  points: { type: Number, required: true },
  photo: { type: String }, // URL of the uploaded photo
  receipt: { type: String }, // URL of the uploaded receipt (if applicable)
});

module.exports = mongoose.model("Challenge", challengeSchema);

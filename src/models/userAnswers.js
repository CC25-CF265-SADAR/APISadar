const mongoose = require("mongoose");
const Joi = require("joi");

const userAnswerSchema = new mongoose.Schema({
  modId: { type: String, required: true },
  userId: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
  answers: [
    {
      questionId: { type: String, required: true },
      userAnswer: { type: [String], required: true },
    },
  ],
  score: { type: Number, default: 0 },
  totalQuestions: { type: Number, required: true },
  date: { type: Date, default: Date.now },
});

module.exports = mongoose.model("UserAnswers", userAnswerSchema);
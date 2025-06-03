const mongoose = require("mongoose");

const questionSchema = new mongoose.Schema({
  id: { type: String, required: true, unique: true },
  type: { type: String, required: true }, 
  question: { type: String, required: true },
  options: { type: [String], required: true }, 
  answer: { type: [String], required: true }, 
  multiple: { type: Boolean, default: false } 
});

const moduleQuestionsSchema = new mongoose.Schema({
  modId: { type: String, required: true, unique: true }, 
  questions: [questionSchema]
});

module.exports = mongoose.model("ModuleQuestions", moduleQuestionsSchema, "moduleQuestions");
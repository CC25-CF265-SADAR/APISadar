const mongoose = require("mongoose");

const questionSchema = new mongoose.Schema({
  id: { type: String, required: true, unique: true },
  type: { type: String, required: true }, // 'mcq' atau tipe lain
  question: { type: String, required: true },
  options: { type: [String], required: true }, // opsi jawaban
  answer: { type: [String], required: true }, // jawaban yang benar, array jika multiple
  multiple: { type: Boolean, default: false } // apakah memungkinkan memilih lebih dari satu jawaban
});

const moduleQuestionsSchema = new mongoose.Schema({
  modId: { type: String, required: true, unique: true }, // ID modul yang terkait
  questions: [questionSchema]
});

module.exports = mongoose.model("ModuleQuestions", moduleQuestionsSchema, "moduleQuestions");
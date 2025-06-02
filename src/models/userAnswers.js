const mongoose = require("mongoose");

const userAnswerSchema = new mongoose.Schema({
  modId: { type: String, required: true },
  userId: { type: String, required: true },
  answers: [
    {
      questionId: { type: String, required: true },
      userAnswer: { type: [String], required: true },  // array untuk menyimpan jawaban jika multiple choice
    },
  ],
  score: { type: Number, default: 0 },  // nilai akhir setelah kuis selesai
  totalQuestions: { type: Number, required: true },  // total soal yang dijawab
  date: { type: Date, default: Date.now },  // tanggal hasil
});

module.exports = mongoose.model("UserAnswers", userAnswerSchema);
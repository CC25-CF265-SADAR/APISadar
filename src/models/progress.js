const mongoose = require("mongoose");

const topicProgressSchema = new mongoose.Schema({
  topicId: String,
  checkpoint: Boolean,
});

const moduleProgressSchema = new mongoose.Schema({
  moduleId: String, // Modul yang sedang dipelajari
  topicsProgress: [topicProgressSchema], // Progress tiap topik dalam modul
  checkQuiz: { type: Boolean, default: false }, // Status apakah sudah mengerjakan quiz
});

const progressSchema = new mongoose.Schema({
  userId: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
  modulesProgress: [moduleProgressSchema], // Array berisi progress tiap modul
  updatedAt: { type: Date, default: Date.now }, // Terakhir diupdate
});

progressSchema.index({ userId: 1 }, { unique: true }); // Pastikan hanya ada satu entri untuk setiap user

module.exports = mongoose.model("Progress", progressSchema, "progress");
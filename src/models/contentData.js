const mongoose = require("mongoose");

const contentSchema = new mongoose.Schema({
  id: { type: String, required: true, unique: true },
  title: String,
  type: String, // 'text' or 'video'
  content: String, // untuk text content
  videoURL: String, // untuk video
  nextTopicId: String,
  prevTopicId: String
});

module.exports = mongoose.model("Content", contentSchema, "contents");

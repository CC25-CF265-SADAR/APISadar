const mongoose = require("mongoose");

const contentSchema = new mongoose.Schema({
  id: { type: String, required: true, unique: true },
  title: String,
  content: String, 
  videoURL: String,
  nextTopicId: String,
  prevTopicId: String
});

module.exports = mongoose.model("Content", contentSchema, "contents");

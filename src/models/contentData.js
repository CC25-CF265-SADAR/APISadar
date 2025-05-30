const mongoose = require("mongoose");

const pageSchema = new mongoose.Schema({
  text: { type: String, required: true },
  imageURL: { type: String, default: null },
  videoULR: { type: String, default: null }
});

const contentSchema = new mongoose.Schema({
  id: { type: String, required: true, unique: true },
  title: String,
  pages: [pageSchema],
  nextTopicId: String,
  prevTopicId: String
});

module.exports = mongoose.model("Content", contentSchema, "contents");

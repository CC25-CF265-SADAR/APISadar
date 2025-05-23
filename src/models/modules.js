const mongoose = require("mongoose");

const moduleSchema = new mongoose.Schema({
  id: { type: String, required: true, unique: true }, // mod-1
  title: { type: String, required: true },
  description: String,
  thumbnail: String,
  level: String,
  estimatedTime: String,
  totalTopics: Number,
  completedTopics: {
    type: Number,
    default: 0
  }
});

module.exports = mongoose.model("Module", moduleSchema, "modules");
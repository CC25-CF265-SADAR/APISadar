const mongoose = require("mongoose");

const topicSchema = new mongoose.Schema({
  id: String,
  title: String,
  type: String, // 'text' | 'video'
  contentId: String,
  checkpoint: {
    type: Boolean,
    default: false
  }
});

const moduleDetailSchema = new mongoose.Schema({
  modId: { type: String, required: true, unique: true },
  title: String,
  topics: [topicSchema]
});

module.exports = mongoose.model("ModuleDetail", moduleDetailSchema, "moduleDetails");

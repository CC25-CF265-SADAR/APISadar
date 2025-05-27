const mongoose = require("mongoose");

const topicProgressSchema = new mongoose.Schema({
  topicId: String,
  checkpoint: Boolean,
});

const progressSchema = new mongoose.Schema({
  userId: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
  moduleId: { type: String, required: true },
  topicsProgress: [topicProgressSchema],
  updatedAt: { type: Date, default: Date.now },
});

progressSchema.index({ userId: 1, moduleId: 1 }, { unique: true });

module.exports = mongoose.model("Progress", progressSchema, "progress");
const mongoose = require("mongoose");

const moduleSchema = new mongoose.Schema({
  id: { type: String, required: true, unique: true },
  title: { type: String, required: true },
  description: String,
  thumbnail: String,
  color: String,
});

module.exports = mongoose.model("Module", moduleSchema, "modules");

const mongoose = require('mongoose');

const linkSchema = new mongoose.Schema({
  url: String,
  count: { type: Number, default: 1 },
  createdAt: { type: Date, default: Date.now }
});

const keywordSchema = new mongoose.Schema({
  keyword: String,
  count: { type: Number, default: 1 },
  createdAt: { type: Date, default: Date.now }
});

const PhishingLink = mongoose.model('PhishingLink', linkSchema);
const SpamKeyword = mongoose.model('SpamKeyword', keywordSchema);

module.exports = { PhishingLink, SpamKeyword };
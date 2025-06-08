const { PhishingLink, SpamKeyword } = require('../models/leaderboards');

const savePhishingLink = async (request, h) => {
  const { url } = request.payload;
  const existing = await PhishingLink.findOne({ url });

  if (existing) {
    existing.count += 1;
    await existing.save();
  } else {
    await PhishingLink.create({ url });
  }

  return h.response({ message: 'Link saved' }).code(201);
};

const saveSpamKeywords = async (request, h) => {
  const { keywords } = request.payload; // expect array

  for (const keyword of keywords) {
    const existing = await SpamKeyword.findOne({ keyword });
    if (existing) {
      existing.count += 1;
      await existing.save();
    } else {
      await SpamKeyword.create({ keyword });
    }
  }

  return h.response({ message: 'Keywords saved' }).code(201);
};

const getTopPhishingLinks = async (request, h) => {
  const { monthOnly } = request.query;

  const filter = monthOnly
    ? { createdAt: { $gte: new Date(new Date().getFullYear(), new Date().getMonth(), 1) } }
    : {};

  const topLinks = await PhishingLink.find(filter)
    .sort({ count: -1 })
    .limit(5);

  return h.response(topLinks).code(200);
};

const getTopSpamKeywords = async (request, h) => {
  const { monthOnly } = request.query;

  const filter = monthOnly
    ? { createdAt: { $gte: new Date(new Date().getFullYear(), new Date().getMonth(), 1) } }
    : {};

  const topKeywords = await SpamKeyword.find(filter)
    .sort({ count: -1 })
    .limit(5);

  return h.response(topKeywords).code(200);
};

module.exports = {
  savePhishingLink,
  saveSpamKeywords,
  getTopPhishingLinks,
  getTopSpamKeywords,
};

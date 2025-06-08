const Joi = require('joi');
const {
  savePhishingLink,
  saveSpamKeywords,
  getTopPhishingLinks,
  getTopSpamKeywords,
} = require('../handlers/handlerLeaderboard');

module.exports = [
  {
    method: 'POST',
    path: '/leaderboard/phishing',
    handler: savePhishingLink,
    options: {
      validate: {
        payload: Joi.object({
          url: Joi.string().uri().required(),
        }),
      },
    },
  },
  {
    method: 'POST',
    path: '/leaderboard/spam',
    handler: saveSpamKeywords,
    options: {
      validate: {
        payload: Joi.object({
          keywords: Joi.array().items(Joi.string()).required(),
        }),
      },
    },
  },
  {
    method: 'GET',
    path: '/leaderboard/phishing',
    handler: getTopPhishingLinks,
    options: {
      validate: {
        query: Joi.object({
          monthOnly: Joi.boolean().optional(),
        }),
      },
    },
  },
  {
    method: 'GET',
    path: '/leaderboard/spam',
    handler: getTopSpamKeywords,
    options: {
      validate: {
        query: Joi.object({
          monthOnly: Joi.boolean().optional(),
        }),
      },
    },
  },
];
const Joi = require("joi");
const {
  saveProgressHandler,
  getProgressHandler,
} = require("../handlers/handlerProgress");

module.exports = [
  {
    method: "POST",
    path: "/progress",
    handler: saveProgressHandler,
    options: {
      validate: {
        payload: Joi.object({
          moduleId: Joi.string().required(),
          topicsProgress: Joi.array()
            .items(
              Joi.object({
                topicId: Joi.string().required(),
                checkpoint: Joi.boolean().required(),
              })
            )
            .required(),
        }),
      },
    },
  },
  {
    method: "GET",
    path: "/progress/{moduleId}",
    handler: getProgressHandler,
  },
];
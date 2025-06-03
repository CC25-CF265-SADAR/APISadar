const Joi = require("joi");
const {
  saveProgressHandler,
  getProgressHandler,
  updateCheckQuizHandler,
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
          checkQuiz: Joi.boolean().required(), // Tambahkan checkQuiz di payload
        }),
      },
    },
  },
  {
    method: "GET",
    path: "/progress",
    handler: getProgressHandler,
  },
  {
    method: "GET",
    path: "/progress/{userId}/{moduleId}/update-checkquiz",
    handler: updateCheckQuizHandler, // Tambahkan rute baru untuk update checkQuiz
  },
];
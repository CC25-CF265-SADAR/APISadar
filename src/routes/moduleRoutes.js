const {
  getAllModules,
  getModuleDetailById,
  createModuleDetail,
  getContentById,
  addContent,
  addModule,
  getQuestionsByModuleId,
  addQuestion,
  saveUserAnswers,
  getResultByUserId
} = require("../handlers/handlerModules");
const auth = require("./auth");
const Joi = require("joi");

module.exports = [
  {
    method: "POST",
    path: "/modules",
    handler: addModule,
    options: {
      auth: false,
      payload: {
        parse: true,
        allow: "application/json"
      }
    }
  },
  {
    method: "GET",
    path: "/modules",
    handler: getAllModules,
    options: {
      auth: false 
    }
  },

  {
    method: "POST",
    path: "/content",
    handler: addContent,
    options: {
      auth: false,
      payload: {
        parse: true,
        allow: "application/json"
      }
    }
  },

  {
    method: "GET",
    path: "/modules/{id}/details",
    handler: getModuleDetailById,
    options: {
      auth: false // disable auth here
    }
  },

  {
    method: "POST",
    path: "/modules/details",
    handler: createModuleDetail,
    options: {
      auth: false,
      payload: {
        parse: true,
        allow: "application/json"
      }
    }
  },

  {
    method: "GET",
    path: "/modules/{modId}/questions",
    handler: getQuestionsByModuleId,
    options: {
      auth: 'jwt'
    }
  },

  {
    method: "POST",
    path: "/modules/{modId}/questions",
    handler: addQuestion,
    options: {
      auth: false, 
      payload: {
        parse: true,
        allow: "application/json",
      },
    },
  },

  {
  method: "POST",
  path: "/modules/{modId}/questions/save",
  handler: saveUserAnswers,
  options: {
    auth: 'jwt',
    validate: {
      params: Joi.object({
        modId: Joi.string().required(),
      }),
      payload: Joi.object({
        answers: Joi.array().items(
          Joi.object({
            questionId: Joi.string().required(),
            userAnswer: Joi.array().items(Joi.string()).required(),
          })
        ).required(),
        score: Joi.number().required(),
        totalQuestions: Joi.number().required(),
      }),
    },
  },
},
  {
    method: "GET",
    path: "/modules/{modId}/results",
    handler: getResultByUserId,
    options: {
      auth: 'jwt',
      validate: {
        params: Joi.object({
          modId: Joi.string().required(),
        }),
      },
    },
  },

  {
    method: "GET",
    path: "/content/{id}",
    handler: getContentById,
    options: {
      auth: 'jwt'
      }
  }
];
const Joi = require("joi");
const { registerHandler, loginHandler } = require("../handlers/handlerUser");

module.exports = [
  {
    method: "POST",
    path: "/register",
    options: {
      validate: {
        payload: Joi.object({
          email: Joi.string().email().required(),
          password: Joi.string().min(6).required(),
        }),
      },
    },
    handler: registerHandler,
  },

  {
    method: "POST",
    path: "/login",
    options: {
      validate: {
        payload: Joi.object({
          email: Joi.string().email().required(),
          password: Joi.string().required(),
        }),
      },
    },
    handler: loginHandler,
  },
];

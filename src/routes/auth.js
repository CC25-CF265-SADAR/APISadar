const Joi = require("joi");
const { registerHandler, loginHandler, resetPasswordHandler, forgotPasswordHandler, googleAuthHandler } = require("../handlers/handlerUser");

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
  {
    method: "POST",
    path: "/forgot-password",
    options: {
      validate: {
        payload: Joi.object({
          email: Joi.string().email().required(),
        }),
      },
      cors: true,
    },
    handler: forgotPasswordHandler,
  },
  {
    method: "POST",
    path: "/reset-password",
    options: {
      validate: {
        payload: Joi.object({
          token: Joi.string().required(),
          newPassword: Joi.string().min(6).required(),
        }),
      },
      cors: true,
    },
    handler: resetPasswordHandler,
  },
  {
    method: "POST",
    path: "/auth/google",
    options: {
      auth: false,
      cors: {
        origin: ["http://localhost:9001"],
        credentials: true,
      },
      validate: {
        payload: Joi.object({
          id_token: Joi.string().required(),
        }),
      },
      handler: googleAuthHandler,
    },
  },
];

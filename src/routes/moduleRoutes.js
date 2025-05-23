// routes/moduleRoutes.js
const handlers = require("../handlers/handlerModules");

module.exports = [
  {
    method: "GET",
    path: "/modules",
    handler: handlers.getAllModules,
  },
  {
    method: "GET",
    path: "/modules/{id}/details",
    handler: handlers.getModuleDetailById,
  },
  {
    method: "GET",
    path: "/content/{id}",
    handler: handlers.getContentById,
  }
];

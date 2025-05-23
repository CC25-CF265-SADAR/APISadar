// routes/moduleRoutes.js
const {
  getAllModules,
  getModuleDetailById,
  createModuleDetail,
  getContentById,
  addContent
} = require("../handlers/handlerModules");

module.exports = [
  // Module list
  {
    method: "GET",
    path: "/modules",
    handler: getAllModules
  },

  {
  method: "POST",
  path: "/content",
  handler: addContent,
  options: {
    payload: {
      parse: true,
      allow: "application/json"
    }
  }
},


  // Module detail by ID
  {
    method: "GET",
    path: "/modules/{id}/details",
    handler: getModuleDetailById
  },

  // Create module detail
  {
    method: "POST",
    path: "/modules/details",
    handler: createModuleDetail,
    options: {
      payload: {
        parse: true,
        allow: "application/json"
      }
    }
  },

  // Get content by ID
  {
    method: "GET",
    path: "/content/{id}",
    handler: getContentById
  }
];
// routes/moduleRoutes.js
const {
  getAllModules,
  getModuleDetailById,
  createModuleDetail,
  getContentById,
  addContent,
  addModule
} = require("../handlers/handlerModules");
const auth = require("./auth");

module.exports = [
  // Module list
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
      auth: false,
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
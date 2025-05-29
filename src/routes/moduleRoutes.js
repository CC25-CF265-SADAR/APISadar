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
    path: "/content/{id}",
    handler: getContentById,
    options: {
      auth: 'jwt'
      }
  }
];

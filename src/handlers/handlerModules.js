const ModuleDetail = require("../models/moduleDetails");

const getAllModules = async (request, h) => {
  const modules = await require("../models/modules").find();
  return h.response(modules);
};

const getModuleDetailById = async (request, h) => {
  const modId = request.params.id;
  const detail = await ModuleDetail.findOne({ modId });
  if (!detail) return h.response({ message: "Not found" }).code(404);
  return h.response(detail);
};

const getContentById = async (request, h) => {
  const id = request.params.id;
  const content = await require("../models/contentData").findOne({ id });
  if (!content) return h.response({ message: "Content not found" }).code(404);
  return h.response(content);
};

module.exports = {
  getAllModules,
  getModuleDetailById,
  getContentById,
};

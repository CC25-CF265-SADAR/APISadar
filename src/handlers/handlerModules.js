const Module = require("../models/modules");
const ModuleDetail = require("../models/moduleDetails");
const Content = require("../models/contentData");
const ModuleQuestions = require('../models/moduleQuestions');

// ========== MODULE ==========
const addModule = async (request, h) => {
  const { id, title, description, thumbnail, totalTopics } = request.payload;

  const existing = await Module.findOne({ id });
  if (existing) {
    return h.response({ message: "Modul sudah ada" }).code(400);
  }

  const newModule = new Module({
    id,
    title,
    description,
    thumbnail,
    totalTopics
  });

  await newModule.save();
  return h.response({ message: "Modul berhasil ditambahkan" }).code(201);
};

const getAllModules = async (request, h) => {
  const modules = await Module.find();
  return h.response(modules).code(200);
};

// ========== MODULE DETAILS ==========
const getModuleDetailById = async (request, h) => {
  const modId = request.params.id;
  const detail = await ModuleDetail.findOne({ modId });
  if (!detail) {
    return h.response({ message: "Modul tidak ditemukan" }).code(404);
  }
  return h.response(detail).code(200);
};

const createModuleDetail = async (request, h) => {
  const { modId, title, topics } = request.payload;

  const existing = await ModuleDetail.findOne({ modId });
  if (existing) {
    return h.response({ message: "Detail modul sudah ada" }).code(400);
  }

  const newDetail = new ModuleDetail({ modId, title, topics });
  await newDetail.save();

  return h.response({ message: "Detail modul berhasil dibuat" }).code(201);
};

// ========== CONTENT ==========
const getContentById = async (request, h) => {
  const id = request.params.id;
  const content = await Content.findOne({ id });
  if (!content) {
    return h.response({ message: "Konten tidak ditemukan" }).code(404);
  }
  return h.response(content).code(200);
};

const addContent = async (request, h) => {
  const { id, title, pages, nextTopicId, prevTopicId } = request.payload;

  const existing = await Content.findOne({ id });
  if (existing) {
    return h.response({ message: "Konten sudah ada" }).code(400);
  }

  const newContent = new Content({
    id,
    title,
    pages,
    nextTopicId,
    prevTopicId
  });

  await newContent.save();
  return h.response({ message: "Konten berhasil ditambahkan" }).code(201);
};

const getQuestionsByModuleId = async (request, h) => {
  const { modId } = request.params; // Ambil ID modul dari URL

  const moduleQuestions = await ModuleQuestions.findOne({ modId });
  if (!moduleQuestions) {
    return h.response({ message: "Modul tidak ditemukan atau tidak ada pertanyaan" }).code(404);
  }

  return h.response(moduleQuestions).code(200);
};

const addQuestion = async (request, h) => {
  const { modId, id, type, question, options, answer, multiple } = request.payload;

  // Validasi: Memeriksa apakah modul dengan modId sudah ada
  const moduleQuestions = await ModuleQuestions.findOne({ modId });

  if (!moduleQuestions) {
    // Jika modul belum ada, buat modul baru
    const newModuleQuestions = new ModuleQuestions({
      modId,
      questions: [
        {
          id,
          type,
          question,
          options,
          answer,
          multiple,
        },
      ],
    });

    await newModuleQuestions.save();
    return h.response({ message: 'Pertanyaan berhasil ditambahkan ke modul baru' }).code(201);
  } else {
    // Jika modul sudah ada, tambahkan pertanyaan ke modul yang ada
    moduleQuestions.questions.push({
      id,
      type,
      question,
      options,
      answer,
      multiple,
    });

    await moduleQuestions.save();
    return h.response({ message: 'Pertanyaan berhasil ditambahkan ke modul yang ada' }).code(201);
  }
};

module.exports = {
  getAllModules,
  getModuleDetailById,
  createModuleDetail,
  getContentById, 
  addContent, 
  addModule,
  getQuestionsByModuleId, 
  addQuestion,
};

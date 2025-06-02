const Progress = require("../models/progress");

const saveProgressHandler = async (request, h) => {
  const { moduleId, topicsProgress } = request.payload;
  const userId = request.auth.credentials.id;

  const updated = await Progress.findOneAndUpdate(
    { userId, moduleId },
    { topicsProgress, updatedAt: new Date() },
    { upsert: true, new: true, setDefaultsOnInsert: true }
  );

  return h.response({ message: "Progress saved", data: updated }).code(200);
};

const getProgressHandler = async (request, h) => {
  try {
    const { moduleId } = request.params;
    const userId = request.auth.credentials.id;

    const progress = await Progress.findOne({ userId, moduleId });

    if (!progress) {
      progress = await Progress.create({userId, moduleId});
    }

    return h.response({ data: progress }).code(200);
  } catch (error){
    return h.response({message: error.message}).code(500);
  }
};

module.exports = {
  saveProgressHandler,
  getProgressHandler,
};
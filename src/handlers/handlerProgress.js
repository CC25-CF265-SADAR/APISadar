const Progress = require("../models/progress");
const UserAnswers = require("../models/userAnswers");

const checkAndUpdateQuizStatus = async (userId, moduleId) => {
  const userAnswers = await UserAnswers.findOne({ userId, moduleId });

  if (userAnswers) {
    // Update checkQuiz jika ada answers
    const userProgress = await Progress.findOne({ userId });

    if (userProgress) {
      let moduleProgress = userProgress.modulesProgress.find(
        (module) => module.moduleId === moduleId
      );

      if (moduleProgress) {
        moduleProgress.checkQuiz = true;
        await userProgress.save();
      }
    }
  }
};

// Handler untuk memeriksa dan memperbarui checkQuiz
const updateCheckQuizHandler = async (request, h) => {
  const { userId, moduleId } = request.params;

  try {
    // Cek dan update checkQuiz
    await checkAndUpdateQuizStatus(userId, moduleId);
    return h.response({ message: "checkQuiz updated successfully" }).code(200);
  } catch (error) {
    return h.response({ message: error.message }).code(500);
  }
};

const saveProgressHandler = async (request, h) => {
  const { moduleId, topicsProgress, checkQuiz } = request.payload;
  const userId = request.auth.credentials.id;

  let userProgress = await Progress.findOne({ userId });

  if (!userProgress) {
    // Hanya simpan modulesProgress dalam progress
    userProgress = new Progress({
      userId,
      modulesProgress: [{
        moduleId,
        topicsProgress,
        checkQuiz,
      }],
    });
  } else {
    // Cek apakah modul sudah ada
    const existingModuleIndex = userProgress.modulesProgress.findIndex(
      (module) => module.moduleId === moduleId
    );

    if (existingModuleIndex !== -1) {
      // Update module yang sudah ada
      userProgress.modulesProgress[existingModuleIndex].topicsProgress = topicsProgress;
      userProgress.modulesProgress[existingModuleIndex].checkQuiz = checkQuiz;
    } else {
      // Tambahkan modul baru
      userProgress.modulesProgress.push({
        moduleId,
        topicsProgress,
        checkQuiz,
      });
    }
  }

  userProgress.updatedAt = new Date();
  await userProgress.save();

  return h.response({ message: "Progress saved", data: userProgress }).code(200);
};

const getProgressHandler = async (request, h) => {
  try {
    const userId = request.auth.credentials.id;

    const progress = await Progress.findOne({ userId });

    if (!progress) {
      return h.response({ message: "Progress not found" }).code(404);
    }

    return h.response({ data: progress }).code(200);
  } catch (error) {
    return h.response({ message: error.message }).code(500);
  }
};

module.exports = {
  saveProgressHandler,
  getProgressHandler,
  checkAndUpdateQuizStatus,
  updateCheckQuizHandler,
};
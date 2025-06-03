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

  // Cari progress user
  let userProgress = await Progress.findOne({ userId });

  if (!userProgress) {
    // Jika user belum ada, buat progress baru untuk user tersebut
    userProgress = new Progress({ userId, modulesProgress: [] });
  }

  // Cari module progress yang sudah ada atau buat yang baru
  let moduleProgress = userProgress.modulesProgress.find(
    (module) => module.moduleId === moduleId
  );

  if (!moduleProgress) {
    moduleProgress = { moduleId, topicsProgress, checkQuiz };
    userProgress.modulesProgress.push(moduleProgress); // Tambahkan modul ke array modulesProgress
  } else {
    // Update progress yang ada
    moduleProgress.topicsProgress = topicsProgress;
    moduleProgress.checkQuiz = checkQuiz;
  }

  // Simpan progress yang sudah diperbarui
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
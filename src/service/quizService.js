// Mock Quiz Service (ExamHub Final Version)

const QUIZZES_KEY = "exam_quizzes";

const getQuizzes = () => {
  try {
    return JSON.parse(localStorage.getItem(QUIZZES_KEY)) || [];
  } catch {
    return [];
  }
};

const saveQuizzes = (list) => {
  localStorage.setItem(QUIZZES_KEY, JSON.stringify(list));
};

export const quizService = {
  async create(data, creatorId) {
    try {
      const quizzes = getQuizzes();

      const newQuiz = {
        id: `quiz_${Date.now()}`,
        creatorId,
        createdAt: new Date().toISOString(),

        // fields từ UI
        title: data.title,
        description: data.description,
        duration: data.duration,
        startTime: data.startTime || null,
        endTime: data.endTime || null,
        sendResultEmail: data.sendResultEmail || false,

        questionCount: 0,
        code: `QZ${Math.random().toString(36).substring(2, 8).toUpperCase()}`,
      };

      quizzes.push(newQuiz);
      saveQuizzes(quizzes);

      return { success: true, data: newQuiz };
    } catch {
      return { success: false, message: "Không thể tạo bài thi" };
    }
  },

  async list(creatorId) {
    try {
      const quizzes = getQuizzes();
      return { success: true, data: quizzes.filter(q => q.creatorId === creatorId) };
    } catch {
      return { success: false, data: [] };
    }
  },

  async getById(idOrCode) {
    try {
      const quizzes = getQuizzes();
      const quiz = quizzes.find(q => q.id === idOrCode || q.code === idOrCode);

      return { success: true, data: quiz || null };
    } catch {
      return { success: false, data: null };
    }
  },

  async update(id, data) {
    try {
      const quizzes = getQuizzes();
      const index = quizzes.findIndex(q => q.id === id);

      if (index === -1)
        return { success: false, message: "Quiz không tồn tại" };

      quizzes[index] = { ...quizzes[index], ...data };
      saveQuizzes(quizzes);

      return { success: true, data: quizzes[index] };
    } catch {
      return { success: false };
    }
  },

  async delete(id) {
    try {
      const quizzes = getQuizzes();
      saveQuizzes(quizzes.filter(q => q.id !== id));

      // xoá luôn câu hỏi thuộc quiz
      const questions = JSON.parse(localStorage.getItem("exam_questions") || "[]");
      localStorage.setItem(
        "exam_questions",
        JSON.stringify(questions.filter(q => q.quizId !== id))
      );

      return { success: true };
    } catch {
      return { success: false };
    }
  }
};

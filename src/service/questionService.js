// Mock Question Service (ExamHub Final Version)

const QUESTIONS_KEY = "exam_questions";

const getQuestions = () => {
  try {
    return JSON.parse(localStorage.getItem(QUESTIONS_KEY)) || [];
  } catch {
    return [];
  }
};

const saveQuestions = (list) => {
  localStorage.setItem(QUESTIONS_KEY, JSON.stringify(list));
};

const updateQuizCount = (quizId) => {
  const quizzes = JSON.parse(localStorage.getItem("exam_quizzes") || "[]");
  const count = getQuestions().filter(q => q.quizId === quizId).length;

  const i = quizzes.findIndex(q => q.id === quizId);
  if (i !== -1) {
    quizzes[i].questionCount = count;
    localStorage.setItem("exam_quizzes", JSON.stringify(quizzes));
  }
};

export const questionService = {
  async create(quizId, data) {
    try {
      const list = getQuestions();

      const q = {
        id: `question_${Date.now()}`,
        quizId,
        content: data.content,
        options: data.options,
        correctOption: data.correctOption,
        score: data.score,
        order: list.filter(q => q.quizId === quizId).length + 1
      };

      list.push(q);
      saveQuestions(list);
      updateQuizCount(quizId);

      return { success: true, data: q };
    } catch {
      return { success: false, message: "Không thể tạo câu hỏi" };
    }
  },

  async list(quizId) {
    try {
      const list = getQuestions().filter(q => q.quizId === quizId);
      return { success: true, data: list.sort((a, b) => a.order - b.order) };
    } catch {
      return { success: false, data: [] };
    }
  },

  async update(id, data) {
    try {
      const list = getQuestions();
      const i = list.findIndex(q => q.id === id);

      if (i === -1) return { success: false };

      list[i] = { ...list[i], ...data };
      saveQuestions(list);

      return { success: true, data: list[i] };
    } catch {
      return { success: false };
    }
  },

  async delete(id, quizId) {
    try {
      saveQuestions(getQuestions().filter(q => q.id !== id));
      updateQuizCount(quizId);

      return { success: true };
    } catch {
      return { success: false };
    }
  }
};

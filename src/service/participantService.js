// Participant Quiz Attempt Service (ExamHub Final Version)

const ATTEMPTS_KEY = "exam_attempts";

const getAttempts = () => JSON.parse(localStorage.getItem(ATTEMPTS_KEY) || "[]");
const saveAttempts = (v) => localStorage.setItem(ATTEMPTS_KEY, JSON.stringify(v));

export const participantService = {
  async start(quizId, participant) {
    try {
      const list = getAttempts();

      const attempt = {
        id: `attempt_${Date.now()}`,
        quizId,
        participant,
        answers: {},
        startedAt: new Date().toISOString()
      };

      list.push(attempt);
      saveAttempts(list);

      return { success: true, attemptId: attempt.id };
    } catch {
      return { success: false };
    }
  },

  async saveAnswer(attemptId, questionId, option) {
    try {
      const list = getAttempts();
      const i = list.findIndex(a => a.id === attemptId);

      if (i === -1) return { success: false };

      list[i].answers[questionId] = option;
      saveAttempts(list);

      return { success: true };
    } catch {
      return { success: false };
    }
  },

  async submit(attemptId) {
    try {
      const list = getAttempts();
      const i = list.findIndex(a => a.id === attemptId);

      if (i === -1) return { success: false };

      const attempt = list[i];

      const questions = JSON.parse(localStorage.getItem("exam_questions") || "[]");
      const quizQuestions = questions.filter(q => q.quizId === attempt.quizId);

      let score = 0;
      let correctCount = 0;

      quizQuestions.forEach(q => {
        if (attempt.answers[q.id] === q.correctOption) {
          correctCount++;
          score += q.score;
        }
      });

      attempt.score = score;
      attempt.correctCount = correctCount;
      attempt.submittedAt = new Date().toISOString();
      saveAttempts(list);

      return {
        success: true,
        score,
        correctCount,
        total: quizQuestions.length
      };
    } catch {
      return { success: false };
    }
  },

  async getHistory(email) {
    try {
      return {
        success: true,
        data: getAttempts().filter(a => a.participant.email === email && a.submittedAt)
      };
    } catch {
      return { success: false, data: [] };
    }
  },

  async getResults(quizId) {
    try {
      return {
        success: true,
        data: getAttempts().filter(a => a.quizId === quizId && a.submittedAt)
      };
    } catch {
      return { success: false, data: [] };
    }
  },

  async sendResultEmail(attemptId) {
    console.log("Mock send email:", attemptId);
    return { success: true };
  }
};

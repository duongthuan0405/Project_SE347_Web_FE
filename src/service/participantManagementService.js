// Participant Management Service (ExamHub Final Version)

const PARTICIPANTS_KEY = "exam_participants";
const QUIZ_PARTICIPANTS_KEY = "exam_quiz_participants";

const getParticipants = () => JSON.parse(localStorage.getItem(PARTICIPANTS_KEY) || "[]");
const saveParticipants = (v) => localStorage.setItem(PARTICIPANTS_KEY, JSON.stringify(v));

const getQP = () => JSON.parse(localStorage.getItem(QUIZ_PARTICIPANTS_KEY) || "[]");
const saveQP = (v) => localStorage.setItem(QUIZ_PARTICIPANTS_KEY, JSON.stringify(v));

export const participantManagementService = {
  async list(creatorId) {
    try {
      return {
        success: true,
        data: getParticipants().filter(p => p.creatorId === creatorId)
      };
    } catch {
      return { success: false, data: [] };
    }
  },

  async create(data, creatorId) {
    try {
      const list = getParticipants();

      if (list.some(p => p.email === data.email && p.creatorId === creatorId))
        return { success: false, message: "Email đã tồn tại" };

      const p = {
        id: `participant_${Date.now()}`,
        creatorId,
        name: data.name,
        email: data.email,
        studentId: data.studentId,
        createdAt: new Date().toISOString()
      };

      list.push(p);
      saveParticipants(list);

      return { success: true, data: p };
    } catch {
      return { success: false };
    }
  },

  async getQuizParticipants(quizId) {
    try {
      const qp = getQP().filter(x => x.quizId === quizId);
      const ids = qp.map(x => x.participantId);

      return {
        success: true,
        data: getParticipants().filter(p => ids.includes(p.id))
      };
    } catch {
      return { success: false, data: [] };
    }
  },

  async addToQuiz(quizId, participantIds) {
    try {
      const qp = getQP();

      participantIds.forEach(pid => {
        if (!qp.some(x => x.quizId === quizId && x.participantId === pid)) {
          qp.push({
            quizId,
            participantId: pid,
            invitedAt: new Date().toISOString(),
            status: "invited"
          });
        }
      });

      saveQP(qp);
      return { success: true };
    } catch {
      return { success: false };
    }
  },

  async updateStatus(quizId, email, status) {
    try {
      const participants = getParticipants();
      const participant = participants.find(p => p.email === email);

      if (!participant) return { success: false };

      const qp = getQP();
      const i = qp.findIndex(x => x.quizId === quizId && x.participantId === participant.id);

      if (i !== -1) {
        qp[i].status = status;
        saveQP(qp);
      }

      return { success: true };
    } catch {
      return { success: false };
    }
  }
};

import quizService from "../services/quizService";

const quizController = {
  async createQuiz(
    title,
    description,
    duration,
    maxTimeAttempts,
    startTime,
    endTime,
    showScoreAfterSubmit,
    sendResultEmail,
    shuffleQuestions,
    shuffleAnswers,
    showCorrectAfterSubmit
  ) {
    const request = {
      title: title,
      description: description,
      durationInMinutes: duration,
      maxTimesCanAttempt: maxTimeAttempts,
      startTime: new Date(startTime).toISOString(),
      dueTime: new Date(endTime).toISOString(),
      showScoreAfterSubmission: showScoreAfterSubmit,
      sendResultEmail: sendResultEmail,
      isShuffleQuestions: shuffleQuestions,
      isShuffleAnswers: shuffleAnswers,
      showCorrectAnswersMode: showCorrectAfterSubmit.id,
    };

    console.error(startTime);

    const response = await quizService.createQuiz(request);

    return response;
  },

  async getMyQuizzes() {
    const response = await quizService.getMyQuizzes();
    const result = response.map(function (quiz) {
      return {
        ...quiz,
        createAt: quiz.createAt,
        dueTime: quiz.dueTime,
        startTime: quiz.startTime,
      };
    });
    return result;
  },

  async getQuizById(quizId) {
    const response = await quizService.getQuizById(quizId);

    return {
      ...response,
      createAt: response.createAt,
      dueTime: response.dueTime,
      startTime: response.startTime,
    };
  },

  async removeQuizById(quizId) {
    const response = await quizService.removeQuizById(quizId);
    return response;
  },

  async updateQuizById(
    quizId,
    title,
    description,
    duration,
    maxTimeAttempts,
    startTime,
    endTime,
    showScoreAfterSubmit,
    sendResultEmail,
    shuffleQuestions,
    shuffleAnswers,
    showCorrectAfterSubmit
  ) {
    const request = {
      title: title,
      description: description,
      durationInMinutes: duration,
      maxTimesCanAttempt: maxTimeAttempts,
      startTime: new Date(startTime).toISOString(),
      dueTime: new Date(endTime).toISOString(),
      showScoreAfterSubmission: showScoreAfterSubmit,
      sendResultEmail: sendResultEmail,
      isShuffleQuestions: shuffleQuestions,
      isShuffleAnswers: shuffleAnswers,
      showCorrectAnswersMode: showCorrectAfterSubmit.id,
    };
    const response = await quizService.updateQuiz(quizId, request);

    return response;
  },

  async getQuizDetailById(id) {
    const response = await quizService.getQuizDetailById(id);

    const result = {
      quiz: {
        id: response.id ?? "0",
        title: response.title,
        description: response.description,
        code: response.accessCode,
        questionCount: response.questions.length ?? 0,
        duration: response.durationInMinutes,
        totalScore: -30,
        createAt: response.createAt,
        startTime: response.startTime,
        endTime: response.dueTime,
        maxTimeAttempts: response.maxTimesCanAttempt,
        isPublish: response.isPublish,
        isShuffleAnswers: response.isShuffleAnswers,
        isShuffleQuestions: response.isShuffleQuestions,
      },

      questions: response.questions,
    };

    return result;
  },

  async toggleQuestionInQuiz(quizId, newQuestion) {
    const request = {
      id: newQuestion.id,
      content: newQuestion.content,
      points: newQuestion.score,
      answers: newQuestion.answers,
    };

    const response = await quizService.toggleQuestionInQuiz(quizId, request);
    return response;
  },

  async removeQuestionFromQuiz(quizId, questionId) {
    const response = quizService.removeQuestionFromQuiz(quizId, questionId);
    return response;
  },
};

export default quizController;

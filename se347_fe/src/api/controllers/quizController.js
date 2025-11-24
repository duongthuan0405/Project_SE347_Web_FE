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
      showCorrectAnswerMode: showCorrectAfterSubmit.id,
    };

    const response = await quizService.createQuiz(request);
    console.log("Quiz created:", response);
    return response;
  },

  async getMyQuizzes() {
    const response = await quizService.getMyQuizzes();
    const result = response.map(function (quiz) {
      return {
        ...quiz,
        createAt: new Date(quiz.createAt).toLocaleString(),
        dueTime: new Date(quiz.dueTime).toLocaleString(),
        startTime: new Date(quiz.startTime).toLocaleString(),
      };
    });
    return result;
  },

  async getQuizById(quizId) {
    const response = await quizService.getQuizById(quizId);

    return {
      ...response,
      createAt: new Date(response.createAt).toLocaleString(),
      dueTime: new Date(response.dueTime).toLocaleString(),
      startTime: new Date(response.startTime).toLocaleString(),
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
      showCorrectAnswerMode: showCorrectAfterSubmit.id,
    };
    const response = await quizService.updateQuiz(quizId, request);
    return response;
  },
};

export default quizController;

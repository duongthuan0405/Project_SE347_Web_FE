import StaticClass from "@/static/StaticClass";
import axiosClient from "../axiosClient/axiosClient";

const quizQuestionService = {
  /**
   * Add multiple questions to a quiz
   * @param {string} quizId
   * @param {string[]} questionIds
   */
  addQuestionsToQuiz: async function (quizId, questionIds) {
    try {
      const request = {
        questionId: questionIds,
      };

      const response = await axiosClient.post(
        `/api/Quiz/${quizId}/add-question`,
        request
      );

      return response;
    } catch (error) {
      throw StaticClass.createError(error);
    }
  },
};

export default quizQuestionService;

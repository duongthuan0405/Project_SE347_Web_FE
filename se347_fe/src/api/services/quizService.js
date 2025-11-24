import StaticClass from "@/static/StaticClass";
import axiosClient from "../axiosClient/axiosClient";

const quizService = {
  async createQuiz(request) {
    try {
      const response = await axiosClient.post("/api/Quiz", request);
      return response;
    } catch (error) {
      throw StaticClass.createError(error);
    }
  },

  async getMyQuizzes() {
    try {
      const response = await axiosClient.get("/api/Quiz");

      return response;
    } catch (error) {
      throw StaticClass.createError(error);
    }
  },

  async getQuizById(quizId) {
    try {
      const response = await axiosClient.get(`/api/Quiz/${quizId}`);
      return response;
    } catch (error) {
      throw StaticClass.createError(error);
    }
  },

  async removeQuizById(quizId) {
    try {
      const response = await axiosClient.delete(`/api/Quiz/${quizId}`);
      return response;
    } catch (error) {
      throw StaticClass.createError(error);
    }
  },

  async updateQuiz(quizId, newQuiz) {
    try {
      const response = await axiosClient.put(`/api/Quiz/${quizId}`, newQuiz);
      return response;
    } catch (error) {
      throw StaticClass.createError(error);
    }
  },

  async getQuizDetailById(id) {
    try {
      const response = await axiosClient.get(`/api/Quiz/${id}`);
      return response;
    } catch (error) {
      console.error(error);
      throw StaticClass.createError(error);
    }
  },

  async toggleQuestionInQuiz(quizId, newQuestion) {
    try {
      const response = await axiosClient.put(
        `/api/Quiz/${quizId}/questions`,
        newQuestion
      );
      console.log(response);
    } catch (error) {
      throw StaticClass.createError(error);
    }
  },

  async removeQuestionFromQuiz(quizId, questionId) {
    try {
      const response = await axiosClient.delete(
        `/api/Quiz/${quizId}/remove-question/${questionId}`
      );
      return response;
    } catch (error) {
      throw StaticClass.createError(error);
    }
  },
};
export default quizService;

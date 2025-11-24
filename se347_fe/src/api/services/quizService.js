import StaticClass from "@/static/StaticClass";
import axiosClient from "../axiosClient/axiosClient";

const quizService = {
  async createQuiz(request) {
    try {
      const response = await axiosClient.post("/api/Quiz", request);
      return response.data;
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
};
export default quizService;

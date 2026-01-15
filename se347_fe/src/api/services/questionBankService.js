import StaticClass from "@/static/StaticClass";
import axiosClient from "../axiosClient/axiosClient";

const questionBankService = {
  async getMyQuestionBank(keyword, category) {
    const response = await axiosClient.get("/api/QuestionBank", {
      params: {
        search: keyword,
        category: category,
      },
    });
    return response;
  },

  async deleteQuestionFromBank(questionId) {
    try {
      const response = await axiosClient.delete(
        `/api/QuestionBank/${questionId}`
      );
      return response;
    } catch (error) {
      throw StaticClass.createError(error);
    }
  },
};

export default questionBankService;

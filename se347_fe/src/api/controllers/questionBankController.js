import questionBankService from "../services/questionBankService";

const questionBankController = {
  async getMyQuestionBank(keyword, category) {
    const response = await questionBankService.getMyQuestionBank(
      keyword,
      category
    );
    return response;
  },

  async deleteQuestionFromBank(questionId) {
    const response = await questionBankService.deleteQuestionFromBank(
      questionId
    );
    return response;
  },
};

export default questionBankController;

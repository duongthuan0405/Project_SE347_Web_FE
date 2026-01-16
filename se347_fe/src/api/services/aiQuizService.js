import StaticClass from "@/static/StaticClass";
import axiosClient from "../axiosClient/axiosClient";

const aiQuizService = {
  generateQuestions: async function ({
    file,
    numberOfQuestions = 10,
    category = "",
    additionalInstructions = "",
  }) {
    try {
      const formData = new FormData();

      // PHẢI trùng tên với DTO backend
      formData.append("file", file);
      formData.append("numberOfQuestions", numberOfQuestions);
      formData.append("category", category);

      if (additionalInstructions) {
        formData.append("additionalInstructions", additionalInstructions);
      }

      const response = await axiosClient.post(
        `/api/Quiz/AIQuiz/generate`,
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      );

      return response;
    } catch (error) {
      throw StaticClass.createError(error);
    }
  },
};

export default aiQuizService;

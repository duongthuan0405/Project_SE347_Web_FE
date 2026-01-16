import StaticClass from "@/static/StaticClass";
import axiosClient from "../axiosClient/axiosClient";

const participateService = {
  /**
   * Gửi lời mời bằng file Excel
   * @param {string} quizId - ID của bài thi
   * @param {File} file - File excel chọn từ input
   */
  sendInvitesByFile: async function (quizId, file) {
    try {
      const formData = new FormData();
      formData.append("file", file);

      const response = await axiosClient.post(
        `/api/Quiz/${quizId}/Invite`,
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      );

      return response.data;
    } catch (error) {
      throw StaticClass.createError(error);
    }
  },
};

export default participateService;

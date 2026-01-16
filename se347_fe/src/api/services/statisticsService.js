import StaticClass from "@/static/StaticClass";
import axiosClient from "../axiosClient/axiosClient";

const statisticsService = {
  // Lấy thống kê tổng quan của một kỳ thi
  async getQuizStatistics(quizId) {
    try {
      const response = await axiosClient.get(`/api/Statistics/quiz/${quizId}`);
      return response;
    } catch (error) {
      throw StaticClass.createError(error);
    }
  },

  // Lấy danh sách tất cả lượt tham gia của một kỳ thi
  async getParticipations(quizId) {
    try {
      const response = await axiosClient.get(
        `/api/Statistics/quiz/${quizId}/participations`
      );
      return response;
    } catch (error) {
      throw StaticClass.createError(error);
    }
  },

  // Lấy chi tiết bài làm của một lượt tham gia cụ thể dựa trên ID tham gia
  async getParticipationDetail(id) {
    try {
      const response = await axiosClient.get(
        `/api/Statistics/participation/${id}`
      );
      return response;
    } catch (error) {
      throw StaticClass.createError(error);
    }
  },

  async exportToExcel(quizId) {
    const res = await axiosClient.get(
      `/api/statistics/quiz/${quizId}/export/excel`,
      {
        responseType: "blob", //
      }
    );

    const blob = new Blob([res], {
      type: "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet",
    });

    const url = window.URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = `Quiz_Results_${quizId}.xlsx`;
    document.body.appendChild(a);
    a.click();

    a.remove();
    window.URL.revokeObjectURL(url);
  },
};

export default statisticsService;

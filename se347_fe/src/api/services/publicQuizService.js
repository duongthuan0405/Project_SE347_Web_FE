import StaticClass from "@/static/StaticClass";
import axiosClient from "../axiosClient/axiosClient";

const publicQuizService = {
  getQuizInfo: async function (id) {
    try {
      const res = await axiosClient.get(`/api/Public/Quiz/${id}/info`);
      return res;
    } catch (error) {
      throw StaticClass.createError(error);
    }
  },

  startQuiz: async function (
    id,
    { name, email, studentId, className, accessCode }
  ) {
    const body = {
      fullName: name,
      email: email,
      studentId: studentId,
      className: className,
      accessCode: accessCode,
    };

    try {
      const res = await axiosClient.post(`/api/Public/Quiz/${id}/start`, body);
      return res;
    } catch (error) {
      throw error;
    }
  },

  getQuizContent: async function (id) {
    try {
      const res = await axiosClient.get(
        `/api/Public/Quiz/participation/${id}/content`
      );
      return res;
    } catch (error) {
      throw StaticClass.createError(error);
    }
  },

  saveAnswer: async function (par_id, ques_id, ans_id) {
    try {
      const res = await axiosClient.post(
        `/api/Public/Quiz/participation/${par_id}/save-answer`,
        {
          questionId: ques_id,
          selectedAnswerId: ans_id,
        }
      );
      return res;
    } catch (error) {
      throw StaticClass.createError(error);
    }
  },

  submit: async function (par_id) {
    try {
      const res = await axiosClient.post(
        `/api/Public/Quiz/participation/${par_id}/submit`
      );
      return res;
    } catch (error) {
      throw StaticClass.createError(error);
    }
  },
};

export default publicQuizService;

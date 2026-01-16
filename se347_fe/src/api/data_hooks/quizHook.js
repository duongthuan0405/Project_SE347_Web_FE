import { useMutation, useQuery } from "@tanstack/react-query";
import quizController from "../controllers/quizController";

export function useCreateQuiz() {
  return useMutation({
    mutationFn: async function ({
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
      showCorrectAfterSubmit,
    }) {
      return await quizController.createQuiz(
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
      );
    },
  });
}

export function useGetMyQuiz(enable = true) {
  return useQuery({
    queryKey: ["my-quizzes"],
    queryFn: async function () {
      return await quizController.getMyQuizzes();
    },
    enabled: enable,
    refetchOnWindowFocus: false,
  });
}

export function useGetQuizById(quizId, enable = true) {
  return useQuery({
    queryKey: ["quiz", quizId],
    queryFn: async function (context) {
      return await quizController.getQuizById(context.queryKey[1]);
    },
    enabled: enable && !!quizId,
    refetchOnWindowFocus: false,
  });
}

export function removeQuizById() {
  return useMutation({
    mutationFn: async function ({ quizId }) {
      return await quizController.removeQuizById(quizId);
    },
  });
}

export function updateQuizById() {
  return useMutation({
    mutationFn: async function ({
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
      showCorrectAfterSubmit,
    }) {
      return await quizController.updateQuizById(
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
      );
    },
  });
}

export function useGetQuizDetailById(id) {
  return useQuery({
    queryKey: ["quiz-detail", id],
    queryFn: function (context) {
      return quizController.getQuizDetailById(context.queryKey[1]);
    },
    refetchOnWindowFocus: false,
    enabled: id && id != "",
  });
}

export function useToggleQuestionInQuiz() {
  return useMutation({
    mutationFn: function ({ quizId, newQuestion }) {
      return quizController.toggleQuestionInQuiz(quizId, newQuestion);
    },
  });
}

export function useRemoveQuestionFromQuiz() {
  return useMutation({
    mutationFn: function ({ quizId, questionId }) {
      return quizController.removeQuestionFromQuiz(quizId, questionId);
    },
  });
}

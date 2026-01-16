import { useQuery } from "@tanstack/react-query";
import questionBankController from "../controllers/questionBankController";
import { useMutation } from "@tanstack/react-query";

export function useGetMyQuestionBank(keyword, category, enable) {
  return useQuery({
    queryKey: ["quiz-bank", keyword, category, enable],
    queryFn: async function (context) {
      return await questionBankController.getMyQuestionBank(
        context.queryKey[1],
        context.queryKey[2]
      );
    },
    enabled: enable,
    refetchOnWindowFocus: false,
  });
}

export function useDeleteQuestionFromBank(questionId) {
  return useMutation({
    mutationFn: async function ({ questionId }) {
      return await questionBankController.deleteQuestionFromBank(questionId);
    },
  });
}

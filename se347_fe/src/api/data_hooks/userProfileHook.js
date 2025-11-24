import { useQuery } from "@tanstack/react-query";
import userProfileController from "../controllers/userProfileController";

export function useGetMyFullProfile(enable = false) {
  return useQuery({
    queryKey: ["full-me", enable],
    queryFn: async function () {
      return await userProfileController.getFullMe();
    },
    enabled: enable,
    refetchOnWindowFocus: false,
  });
}

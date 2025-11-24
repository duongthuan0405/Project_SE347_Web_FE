import StaticClass from "@/static/StaticClass";
import axiosClient from "../axiosClient/axiosClient";

const userProfileService = {
  getFullMe: async function () {
    try {
      const response = await axiosClient.get("/api/UserProfile/full");
      return response;
    } catch (error) {
      throw StaticClass.createError(error);
    }
  },
};
export default userProfileService;

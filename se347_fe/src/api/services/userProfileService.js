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

  updateProfile: async function (data) {
    try {
      const formData = new FormData();
      formData.append("firstName", data.firstName ?? "");
      formData.append("lastName", data.lastName ?? "");

      if (data.imageFile) {
        formData.append("imageFile", data.imageFile);
      }

      const response = await axiosClient.put("/api/UserProfile", formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });

      return response;
    } catch (error) {
      throw StaticClass.createError(error);
    }
  },
};
export default userProfileService;

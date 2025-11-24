import StaticClass from "@/static/StaticClass";
import axiosClient from "../axiosClient/axiosClient";
import VerifyOTP from "@/Pages/VerifyOTP";

const authService = {
  register: async function (email, password, lastName, firstName) {
    try {
      const request = { email, password, lastName, firstName };
      console.log(request);
      const response = await axiosClient.post(
        "/api/Authentication/sign-up",
        request
      );

      return response;
    } catch (error) {
      throw StaticClass.createError(error);
    }
  },

  verifyOTP: async function (email, otp) {
    try {
      const request = { email, otp };

      const response = await axiosClient.post(
        "/api/Authentication/verify",
        request
      );

      return response;
    } catch (error) {
      throw StaticClass.createError(error);
    }
  },

  login: async function (email, password) {
    try {
      const request = { email, password };

      const response = await axiosClient.post(
        "/api/Authentication/sign-in",
        request
      );

      return response;
    } catch (error) {
      throw StaticClass.createError(error);
    }
  },
};

export default authService;

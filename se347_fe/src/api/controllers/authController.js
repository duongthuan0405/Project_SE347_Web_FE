import VerifyOTP from "@/Pages/VerifyOTP";
import authService from "../services/authService";
import tokenHelper from "@/helper/tokenHelper";

const authController = {
  register: async function (email, password, firstName, lastName) {
    return await authService.register(email, password, lastName, firstName);
  },

  verifyOTP: async function (email, otp) {
    return await authService.verifyOTP(email, otp);
  },

  login: async function (email, password) {
    const result = await authService.login(email, password);
    tokenHelper.saveToken(result.token);

    return {
      id: result.userFullProfile.user.id,
      lastName: result.userFullProfile.userProfile.lastName,
      firstName: result.userFullProfile.userProfile.firstName,
      email: result.userFullProfile.user.email,
      avatar: result.userFullProfile.userProfile.avatar,
    };
  },

  logOut: async function () {
    tokenHelper.removeToken();
    return true;
  },
};

export default authController;

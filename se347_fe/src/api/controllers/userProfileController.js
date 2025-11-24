import userProfileService from "../services/userProfileService";

const userProfileController = {
  getFullMe: async function () {
    const result = await userProfileService.getFullMe();
    return {
      id: result.user.id,
      lastName: result.userProfile.lastName,
      firstName: result.userProfile.firstName,
      email: result.user.email,
      avatar: result.userProfile.avatar,
    };
  },
};

export default userProfileController;

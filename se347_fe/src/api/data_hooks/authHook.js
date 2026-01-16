import { useMutation } from "@tanstack/react-query";

import authController from "../controllers/authController";

export function useRegister() {
  return useMutation({
    mutationFn: function ({ email, password, firstName, lastName }) {
      return authController.register(email, password, firstName, lastName);
    },
  });
}

export function useVerifyOTP() {
  return useMutation({
    mutationFn: async function ({ email, otp }) {
      return await authController.verifyOTP(email, otp);
    },
  });
}

export function useLogin() {
  return useMutation({
    mutationFn: async function ({ email, password }) {
      return await authController.login(email, password);
    },
  });
}

export function useLogOut() {
  return useMutation({
    mutationFn: async function () {
      return await authController.logOut();
    },
  });
}

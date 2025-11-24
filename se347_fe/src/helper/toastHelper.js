import { toast } from "react-toastify";

const baseStyle = {
  position: "top-right",
  autoClose: 3000,
  hideProgressBar: false,
  newestOnTop: false,
  closeOnClick: true,
  pauseOnHover: true,
  theme: "light",
};

const toastHelper = {
  success: function (message) {
    toast.success(message, {
      ...baseStyle,
    });
  },

  error: function (message) {
    toast.error(message, {
      ...baseStyle,
    });
  },

  warning: function (message) {
    toast.warning(message, {
      ...baseStyle,
    });
  },

  info: function (message) {
    toast.info(message, {
      ...baseStyle,
    });
  },
};

export default toastHelper;

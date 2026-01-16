const StaticClass = {
  createError: function (error) {
    const newErr = new Error(
      error.data?.error ||
        error.data?.message ||
        error.data?.errors?.join("\n") ||
        `FE Error! Detail is that ${error.message}`
    );
    newErr.status = error.status || -1;

    return newErr;
  },

  isValidEmail: function (email) {
    const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return regex.test(email);
  },

  convertUtcToLocalInput(isoString) {
    if (!isoString) return "";

    const date = new Date(isoString);

    // Nếu date invalid → return empty để tránh crash
    if (isNaN(date.getTime())) return "";

    // Chuyển từ UTC sang Local bằng cách trừ timezone offset
    date.setMinutes(date.getMinutes() - date.getTimezoneOffset());

    // format "YYYY-MM-DDTHH:mm"
    return date.toISOString().slice(0, 16);
  },
};

export default StaticClass;

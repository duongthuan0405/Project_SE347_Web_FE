const StaticClass = {
  createError: function (error) {
    const newErr = new Error(
      error.data?.error ||
        error.data?.message ||
        `FE Error! Detail is that ${error.message}`
    );
    newErr.status = error.status || -1;

    return newErr;
  },

  isValidEmail: function (email) {
    const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return regex.test(email);
  },

  parseForDatePicker: function (date) {
    const [timePart, datePart] = date.split(" "); // ["00:00:00", "30/11/2025"]
    const [hours, minutes] = timePart.split(":");
    const [day, month, year] = datePart.split("/");

    // format chuẩn datetime-local
    return `${year}-${month.padStart(2, "0")}-${day.padStart(
      2,
      "0"
    )}T${hours.padStart(2, "0")}:${minutes.padStart(2, "0")}`;
  },
};

export default StaticClass;

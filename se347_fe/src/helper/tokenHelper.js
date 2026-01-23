const tokenHelper = {
  key: "token",
  saveToken: function (token) {
    localStorage.setItem(this.key, token);
  },

  getToken: function () {
    return localStorage.getItem(this.key);
  },

  removeToken: function () {
    localStorage.removeItem(this.key);
  },
};

export default tokenHelper;

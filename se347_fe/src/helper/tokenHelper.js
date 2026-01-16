const tokenHelper = {
  key: "token",
  saveToken: function (token) {
    sessionStorage.setItem(this.key, token);
  },

  getToken: function () {
    return sessionStorage.getItem(this.key);
  },

  removeToken: function () {
    sessionStorage.removeItem(this.key);
  },
};

export default tokenHelper;

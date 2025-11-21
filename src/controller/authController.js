// src/controller/authController.js
// Mock Authentication Controller - không dùng Supabase

const USERS_KEY = "exam_users";
const CURRENT_USER_KEY = "exam_current_user";

const getUsers = () => {
  const data = localStorage.getItem(USERS_KEY);
  return data ? JSON.parse(data) : [];
};

const saveUsers = (users) => {
  localStorage.setItem(USERS_KEY, JSON.stringify(users));
};

export const authController = {
  // Đăng ký user
  async handleRegister({ name, email, password }) {
    const users = getUsers();

    // Kiểm tra email đã tồn tại
    const exists = users.find((u) => u.email === email);
    if (exists) {
      return { success: false, message: "Email đã được sử dụng" };
    }

    const newUser = {
      id: `user_${Date.now()}`,
      name,
      email,
      password,
      createdAt: new Date().toISOString(),
    };

    users.push(newUser);
    saveUsers(users);

    // Tự đăng nhập
    localStorage.setItem(CURRENT_USER_KEY, JSON.stringify(newUser));

    return { success: true, user: newUser };
  },

  // Đăng nhập
  async handleLogin({ email, password }) {
    const users = getUsers();

    const user = users.find(
      (u) => u.email === email && u.password === password
    );

    if (!user) {
      return { success: false, message: "Email hoặc mật khẩu không đúng" };
    }

    localStorage.setItem(CURRENT_USER_KEY, JSON.stringify(user));

    return { success: true, user };
  },

  // Lấy user hiện tại
  getCurrentUser() {
    const data = localStorage.getItem(CURRENT_USER_KEY);
    return data ? JSON.parse(data) : null;
  },

  // Kiểm tra đã đăng nhập
  isAuthenticated() {
    return !!localStorage.getItem(CURRENT_USER_KEY);
  },

  // Đăng xuất
  handleLogout() {
    localStorage.removeItem(CURRENT_USER_KEY);
  },

  // Lấy user theo ID
  async getUserById(id) {
    const users = getUsers();
    const user = users.find((u) => u.id === id);

    if (!user) return { success: false, message: "User không tồn tại" };

    return { success: true, user };
  },
};

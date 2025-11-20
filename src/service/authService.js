import { supabase } from "@/lib/supabaseClient";

export const authService = {
  /* -----------------------------
   * 1. Đăng ký (Supabase)
   * ----------------------------- */
  async register({ name, email, password }) {
    try {
      // Tạo tài khoản trong Supabase Auth
      const { data: authData, error: authError } = await supabase.auth.signUp({
        email,
        password,
      });

      if (authError) {
        return { success: false, message: authError.message };
      }

      const userId = authData.user.id;

      // Lưu profile vào bảng "users"
      const { error: profileError } = await supabase
        .from("users")
        .insert([{ id: userId, name, email, role: "creator" }]);

      if (profileError) {
        return { success: false, message: profileError.message };
      }

      return {
        success: true,
        message: "Đăng ký thành công",
        user: { id: userId, name, email },
      };

    } catch (err) {
      return { success: false, message: err.message };
    }
  },

  /* -----------------------------
   * 2. Đăng nhập
   * ----------------------------- */
  async login({ email, password }) {
    try {
      const { data, error } = await supabase.auth.signInWithPassword({
        email,
        password,
      });

      if (error) {
        return { success: false, message: "Email hoặc mật khẩu không đúng" };
      }

      const user = data.user;

      // Lấy thông tin profile từ bảng users
      const { data: profile, error: profileError } = await supabase
        .from("users")
        .select("*")
        .eq("id", user.id)
        .single();

      if (profileError) {
        return { success: false, message: profileError.message };
      }

      return {
        success: true,
        message: "Đăng nhập thành công",
        user: profile,
        token: data.session.access_token,
      };

    } catch (err) {
      return { success: false, message: err.message };
    }
  },

  /* -----------------------------
   * 3. Lấy user hiện tại
   * ----------------------------- */
  async getProfile() {
    const { data } = await supabase.auth.getUser();
    return data?.user ?? null;
  },

  /* -----------------------------
   * 4. Đăng xuất
   * ----------------------------- */
  async logout() {
    await supabase.auth.signOut();
  },

  /* -----------------------------
   * 5. Kiểm tra đăng nhập
   * ----------------------------- */
  async isAuthenticated() {
    const { data } = await supabase.auth.getSession();
    return !!data.session;
  },
};

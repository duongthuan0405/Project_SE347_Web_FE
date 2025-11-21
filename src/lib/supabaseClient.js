export const supabase = {
  from() {
    console.warn("Supabase mock: .from() called");
    return {
      select() {
        return Promise.resolve({ data: [], error: null });
      },
      insert() {
        return Promise.resolve({ data: [], error: null });
      },
      update() {
        return Promise.resolve({ data: [], error: null });
      },
      delete() {
        return Promise.resolve({ data: [], error: null });
      }
    };
  },
  auth: {
    signUp() {
      return Promise.resolve({ data: null, error: null });
    },
    signInWithPassword() {
      return Promise.resolve({ data: null, error: null });
    },
    signOut() {
      return Promise.resolve({ error: null });
    }
  }
};

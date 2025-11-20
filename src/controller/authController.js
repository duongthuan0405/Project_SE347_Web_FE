import { supabase } from "@/lib/supabaseClient";

export async function createUser(name, email, password) {
  try {
    const { data: user, error } = await supabase
      .from("users")
      .insert([{ name, email, password }])
      .select()
      .single();

    if (error) throw error;
    return { user };
  } catch (error) {
    console.error("Error creating user:", error.message);
    return { error: error.message };
  }
}

export async function loginUser(email, password) {
  try {
    const { data: user, error } = await supabase
      .from("users")
      .select("*")
      .eq("email", email)
      .eq("password", password)
      .single();

    if (error) throw error;
    return { user };
  } catch (error) {
    console.error("Login failed:", error.message);
    return { error: error.message };
  }
}

export async function getUserById(userId) {
  try {
    const { data: user, error } = await supabase
      .from("users")
      .select("*")
      .eq("id", userId)
      .single();

    if (error) throw error;
    return { user };
  } catch (error) {
    console.error("Error fetching user:", error.message);
    return { error: error.message };
  }
}

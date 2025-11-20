import { supabase } from "@/lib/supabaseClient";

export async function createQuiz(quizData) {
  try {
    const { title, description, duration, totalPoints, isShowResult } = quizData;

    const { data: quiz, error } = await supabase
      .from("quizzes")
      .insert([
        { title, description, duration, totalPoints, isShowResult }
      ])
      .select()
      .single();

    if (error) throw error;
    return { quiz };
  } catch (error) {
    console.error("Error creating quiz:", error.message);
    return { error: error.message };
  }
}

export async function getQuizById(quizId) {
  try {
    const { data: quiz, error } = await supabase
      .from("quizzes")
      .select("*")
      .eq("id", quizId)
      .single();

    if (error) throw error;
    return { quiz };
  } catch (error) {
    console.error("Error fetching quiz:", error.message);
    return { error: error.message };
  }
}

export async function getAllQuizzes() {
  try {
    const { data: quizzes, error } = await supabase
      .from("quizzes")
      .select("*");

    if (error) throw error;
    return { quizzes };
  } catch (error) {
    console.error("Error fetching quizzes:", error.message);
    return { error: error.message };
  }
}

export async function deleteQuiz(quizId) {
  try {
    const { error } = await supabase
      .from("quizzes")
      .delete()
      .eq("id", quizId);

    if (error) throw error;
    return { success: true };
  } catch (error) {
    console.error("Error deleting quiz:", error.message);
    return { error: error.message };
  }
}

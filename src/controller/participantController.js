import { supabase } from "@/lib/supabaseClient";

export const participantController = {
  /* ----------------------------------------------------
   * 1. START QUIZ — tạo attempt mới
   * ---------------------------------------------------- */
  async start(quizId, participantInfo) {
    try {
      const { name, studentId, email } = participantInfo;

      // Insert participant attempt
      const { data, error } = await supabase
        .from("participants")
        .insert([
          {
            quizId,
            name,
            studentId,
            email,
            startTime: new Date().toISOString(),
            status: "doing",
          }
        ])
        .select()
        .single();

      if (error) throw error;

      return {
        success: true,
        attemptId: data.id,
      };

    } catch (err) {
      console.error("Start quiz error:", err.message);
      return { success: false };
    }
  },

  /* ----------------------------------------------------
   * 2. SAVE ANSWER — lưu câu trả lời từng câu
   * ---------------------------------------------------- */
  async saveAnswer(attemptId, questionId, selectedOption) {
    try {
      const { data: existing } = await supabase
        .from("answers")
        .select("*")
        .eq("attemptId", attemptId)
        .eq("questionId", questionId)
        .maybeSingle();

      let result;

      if (existing) {
        // Update
        result = await supabase
          .from("answers")
          .update({ selectedOption })
          .eq("id", existing.id);
      } else {
        // Insert
        result = await supabase
          .from("answers")
          .insert([
            {
              attemptId,
              questionId,
              selectedOption,
            }
          ]);
      }

      if (result.error) throw result.error;
      return { success: true };

    } catch (err) {
      console.error("Save answer error:", err.message);
      return { success: false };
    }
  },

  /* ----------------------------------------------------
   * 3. SUBMIT QUIZ — chấm điểm + lưu kết quả
   * ---------------------------------------------------- */
  async submit(attemptId) {
    try {
      // Load attempt info
      const { data: attempt, error: attemptErr } = await supabase
        .from("participants")
        .select("quizId")
        .eq("id", attemptId)
        .single();

      if (attemptErr || !attempt) throw attemptErr;

      const quizId = attempt.quizId;

      // Load all questions
      const { data: questions, error: qErr } = await supabase
        .from("questions")
        .select("*")
        .eq("quizId", quizId);

      if (qErr) throw qErr;

      // Load participant answers
      const { data: answers, error: aErr } = await supabase
        .from("answers")
        .select("*")
        .eq("attemptId", attemptId);

      if (aErr) throw aErr;

      let score = 0;
      let correctCount = 0;

      questions.forEach((q) => {
        const ans = answers.find((a) => a.questionId === q.id);
        if (ans && ans.selectedOption === q.correctOption) {
          score += q.score ?? 1;
          correctCount += 1;
        }
      });

      // Update participant status
      const { error: updateErr } = await supabase
        .from("participants")
        .update({
          status: "submitted",
          endTime: new Date().toISOString(),
          score,
          correctCount,
        })
        .eq("id", attemptId);

      if (updateErr) throw updateErr;

      return {
        success: true,
        score,
        correctCount,
        total: questions.length,
      };

    } catch (err) {
      console.error("Submit quiz error:", err.message);
      return { success: false };
    }
  },

  /* ----------------------------------------------------
   * 4. SEND RESULT EMAIL — nếu quiz cho phép gửi email
   * ---------------------------------------------------- */
  async sendResultEmail(attemptId) {
    try {
      const { data, error } = await supabase.functions.invoke(
        "send-result-email",
        { body: { attemptId } }
      );

      if (error) throw error;

      return { success: true };

    } catch (err) {
      console.error("Send result email error:", err.message);
      return { success: false };
    }
  },
};

import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { Clock, Send } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  CardDescription,
} from "@/components/ui/card";
import { RadioGroup, RadioItem } from "@/components/ui/radio-group";
import { Label } from "@/components/ui/label";
import publicQuizService from "@/api/services/publicQuizService";
import toastHelper from "@/helper/toastHelper";
import LoadingOverlay from "@/ui/LoadingOverlay";

export default function QuizAction() {
  const { id, participation_id } = useParams();

  const navigate = useNavigate();
  const [timeLeft, setTimeLeft] = useState(600); // 10 phút mặc định
  const [questions, setQuestions] = useState([]);
  const [answers, setAnswers] = useState({});
  const [isSubmitting, setIsSubmitting] = useState(false);

  useEffect(() => {
    // Fake questions
    const fetch = async function () {
      try {
        const res = await publicQuizService.getQuizContent(participation_id);
        console.log(res);
        setTimeLeft(Math.floor(res.leftTimeInSecond));
        setQuestions(function (prev) {
          return res?.questions?.map(function (q) {
            return {
              id: q.questionId,
              content: q.content,
              answers: q.answers.map(function (a) {
                return {
                  id: a.answerId,
                  content: a.content,
                };
              }),
            };
          });
        });
      } catch (error) {
        toastHelper.error(error.message);
      }
    };

    fetch();
  }, [id, navigate]);

  useEffect(() => {
    const timer = setInterval(() => {
      setTimeLeft((prev) => (prev <= 1 ? 0 : prev - 1));
    }, 1000);
    return () => clearInterval(timer);
  }, []);

  const handleSubmit = async () => {
    setIsSubmitting(true);
    try {
      await publicQuizService.submit(participation_id);
      toastHelper.success("Nộp bài thành công");
      navigate("/");
    } catch (error) {
      toastHelper.error(error.message);
    } finally {
      setIsSubmitting(false);
    }
  };

  const formatTime = (sec) => {
    const m = Math.floor(sec / 60);
    const s = sec % 60;
    return `${m.toString().padStart(2, "0")}:${s.toString().padStart(2, "0")}`;
  };

  const handleSelect = async function (ans_id, ques_id) {
    try {
      await publicQuizService.saveAnswer(participation_id, ques_id, ans_id);
    } catch (error) {}
  };

  return (
    <div className="min-h-screen bg-accent py-6">
      {isSubmitting && <LoadingOverlay />}
      <div className="max-w-4xl mx-auto px-4 space-y-6">
        <div className="sticky top-0 bg-primary p-4 rounded-lg flex justify-between items-center text-white z-10">
          <div>
            <h1 className="font-bold">Đang làm bài</h1>
            <p className="text-sm">
              Tiến độ: {Object.keys(answers).length}/{questions.length}
            </p>
          </div>
          <div className="flex items-center gap-4">
            <div className="flex items-center gap-2 font-mono text-xl">
              <Clock /> {formatTime(timeLeft)}
            </div>
            <Button variant="secondary" onClick={handleSubmit}>
              Nộp bài
            </Button>
          </div>
        </div>

        {questions.map((q, i) => (
          <Card key={q.id}>
            <CardHeader>
              <CardTitle>
                Câu {i + 1}: {q.content}
              </CardTitle>
            </CardHeader>

            <CardContent>
              <RadioGroup
                name={`question_${q.id}`} // ✅ FIXED: name cố định cho mỗi câu
                currentSelectedValue={answers[q.id]}
                onChange={(v) => {
                  setAnswers((prev) => ({
                    ...prev,
                    [q.id]: v,
                  }));

                  handleSelect(v, q.id);
                }}
                className="space-y-2"
              >
                {q.answers.map((ans) => (
                  <RadioItem
                    key={ans.id}
                    value={ans.id.toString()} // ✅ radio value phải là string
                    className="gap-x-2"
                  >
                    {ans.content}
                  </RadioItem>
                ))}
              </RadioGroup>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
}

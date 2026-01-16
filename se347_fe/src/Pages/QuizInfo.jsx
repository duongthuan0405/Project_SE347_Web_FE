import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { Calendar, Users } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import publicQuizService from "@/api/services/publicQuizService";

export default function QuizInfo() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [quiz, setQuiz] = useState(null);

  useEffect(() => {
    // Fake API call
    async function fetch() {
      const res = await publicQuizService.getQuizInfo(id);
      console.log(res);
      setQuiz({
        title: res.title,
        description: res.description,
        duration: res.durationInMinutes,
        maxAttempts: res.maxTimesCanAttempt ?? -1,
        startTime: res.startTime,
        endTime: res.dueTime,
      });
    }
    fetch();
  }, [id]);

  if (!quiz) return <div>Đang tải...</div>;

  return (
    <div className="min-h-screen flex justify-center bg-accent p-4">
      <Card className="w-full h-fit max-w-lg">
        <CardHeader className="flex flex-col">
          <CardTitle className="text-2xl">{quiz.title}</CardTitle>
          <CardDescription>{quiz.description}</CardDescription>
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="grid grid-cols-2 gap-4 p-4 bg-muted rounded-lg">
            <div>
              <p className="text-sm text-muted-foreground">Thời lượng</p>
              <p className="text-lg font-semibold">{quiz.duration} phút</p>
            </div>
            <div>
              <p className="text-sm text-muted-foreground">Số lần làm tối đa</p>
              <p className="text-lg font-semibold">{quiz.maxAttempts} lần</p>
            </div>
          </div>
          <div className="space-y-2 border-t pt-4">
            <p className="text-sm flex items-center gap-2">
              <Calendar className="w-4 h-4" /> Bắt đầu:{" "}
              {new Date(quiz.startTime).toLocaleString()}
            </p>
            <p className="text-sm flex items-center gap-2">
              <Calendar className="w-4 h-4" /> Kết thúc:{" "}
              {new Date(quiz.endTime).toLocaleString()}
            </p>
          </div>
          <Button className="w-full" onClick={() => navigate("input-info")}>
            Bắt đầu làm bài
          </Button>
        </CardContent>
      </Card>
    </div>
  );
}

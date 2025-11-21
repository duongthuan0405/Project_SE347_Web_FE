import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { ClipboardList, ArrowLeft, Calendar, Award } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";

export default function History() {
  const navigate = useNavigate();

  const [email, setEmail] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [attempts, setAttempts] = useState([]);
  const [quizTitles, setQuizTitles] = useState({});
  const [hasSearched, setHasSearched] = useState(false);

  const handleSearch = async (e) => {
    e.preventDefault();
    if (!email.trim()) return;

    setIsLoading(true);

    const history = await participantService.getHistory(email);

    const titles = {};
    for (const attempt of history) {
      if (!titles[attempt.quizId]) {
        const quiz = await quizService.getById(attempt.quizId);
        if (quiz) titles[attempt.quizId] = quiz.title;
      }
    }

    setAttempts(history);
    setQuizTitles(titles);
    setHasSearched(true);
    setIsLoading(false);
  };

  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleDateString("vi-VN", {
      year: "numeric",
      month: "long",
      day: "numeric",
      hour: "2-digit",
      minute: "2-digit",
    });
  };

  return (
    <div className="min-h-screen bg-accent py-8">
      <div className="max-w-4xl mx-auto px-4 space-y-6">
        <div className="flex items-center gap-4">
          <Button variant="ghost" onClick={() => navigate("/")}>
            <ArrowLeft className="w-4 h-4 mr-2" />
            Trang chủ
          </Button>
        </div>

        <Card>
          <CardHeader>
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 bg-primary/10 rounded-full flex items-center justify-center">
                <ClipboardList className="w-5 h-5 text-primary" />
              </div>
              <div>
                <CardTitle>Lịch sử làm bài</CardTitle>
                <CardDescription>
                  Tra cứu kết quả bài thi của bạn
                </CardDescription>
              </div>
            </div>
          </CardHeader>

          <CardContent>
            <form onSubmit={handleSearch} className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="email">Email *</Label>
                <Input
                  id="email"
                  type="email"
                  placeholder="Nhập email bạn đã sử dụng khi làm bài"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                  className="focus:outline-none focus:ring-accent-foreground focus:ring-2 bg-black/5 resize-none"
                />
              </div>

              <Button type="submit" disabled={isLoading || !email.trim()}>
                {isLoading ? "Đang tìm kiếm..." : "Tra cứu"}
              </Button>
            </form>
          </CardContent>
        </Card>

        {hasSearched && (
          <div className="space-y-4">
            <h2 className="text-lg font-semibold">
              Tìm thấy {attempts.length} kết quả
            </h2>

            {attempts.length === 0 ? (
              <Card>
                <CardContent className="py-8 text-center text-muted-foreground">
                  Không tìm thấy lịch sử làm bài nào với email này
                </CardContent>
              </Card>
            ) : (
              attempts.map((attempt) => (
                <Card
                  key={attempt.id}
                  className="hover:shadow-md transition-shadow"
                >
                  <CardContent className="p-6">
                    <div className="flex items-start justify-between gap-4">
                      <div className="flex-1 space-y-2">
                        <h3 className="font-semibold text-lg">
                          {quizTitles[attempt.quizId] || "Đang tải..."}
                        </h3>

                        <div className="flex items-center gap-4 text-sm text-muted-foreground">
                          <div className="flex items-center gap-1">
                            <Calendar className="w-4 h-4" />
                            {formatDate(attempt.submittedAt)}
                          </div>

                          <div className="flex items-center gap-1">
                            <Award className="w-4 h-4" />
                            Điểm: {attempt.score}
                          </div>
                        </div>
                      </div>

                      <Badge
                        variant="outline"
                        className="bg-success/10 text-success border-success"
                      >
                        Đã hoàn thành
                      </Badge>
                    </div>
                  </CardContent>
                </Card>
              ))
            )}
          </div>
        )}
      </div>
    </div>
  );
}

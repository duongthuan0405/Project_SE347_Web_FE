import { useState, useEffect } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";

import { BookOpen, ArrowRight, Home } from "lucide-react";

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

export default function TakeQuizEntry() {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();

  const [quizId, setQuizId] = useState("");

  // Auto-redirect when "?id=xxx"
  useEffect(() => {
    const idFromUrl = searchParams.get("id");
    if (idFromUrl) {
      navigate(`/take/${idFromUrl}`);
    }
  }, [searchParams, navigate]);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (quizId.trim()) {
      navigate(`/take/${quizId.trim()}`);
    }
  };

  return (
    <div className="min-h-screen flex justify-center bg-accent p-4">
      <Card className="w-full h-fit max-w-md flex flex-col items-stretch bg-black/5 mt-30">
        <CardHeader className="text-center flex flex-col self-center w-fit space-y-1">
          <div className="flex items-center justify-between w-full">
            <div className="w-12 h-12 bg-primary/10 rounded-full flex items-center justify-center">
              <BookOpen className="w-6 h-6 text-primary" />
            </div>
            <CardTitle className="text-2xl px-3">Tham gia bài thi</CardTitle>
          </div>
          <CardDescription>Nhập mã bài thi để bắt đầu làm bài</CardDescription>
        </CardHeader>

        <CardContent>
          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="quizId">Mã bài thi *</Label>
              <Input
                id="quizId"
                placeholder="Nhập ID hoặc mã bài thi (VD: QZ23ABC)"
                value={quizId}
                onChange={(e) => setQuizId(e.target.value)}
                required
                className="flex-1 focus:outline-none focus:ring-accent-foreground focus:ring-2 bg-white w-full"
              />
            </div>

            <Button type="submit" className="w-full" disabled={!quizId.trim()}>
              Tiếp tục
              <ArrowRight className="w-4 h-4 ml-2" />
            </Button>
          </form>
        </CardContent>
      </Card>
    </div>
  );
}

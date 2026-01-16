import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { ArrowLeft, Download } from "lucide-react";

import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import statisticsService from "@/api/services/statisticsService";
import toastHelper from "@/helper/toastHelper";

// Mock services

// Fake toast

export default function Reports() {
  const { id } = useParams();
  const navigate = useNavigate();

  const [quiz, setQuiz] = useState(null);
  const [attempts, setAttempts] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

  //   useEffect(() => {
  //     loadData();
  //   }, [id]);

  //   const loadData = async () => {
  //     if (!id) return;

  //     const quizData = await quizController.getQuizById(id);
  //     const attemptsData = await participantService.getResults(id);

  //     setIsLoading(false);
  //   };

  useEffect(() => {
    const fetch = async function () {
      const p = statisticsService.getParticipations(id);
      const q = statisticsService.getQuizStatistics(id);
      const pars = await p;
      const quiz = await q;

      setQuiz({
        id: quiz.quizId,
        title: quiz.title,
        totalScore: 10,
      });

      setAttempts(
        pars.map(function (par) {
          return {
            id: par.participationId,
            participant: {
              name: par.fullName,
              studentId: par.studentId,
              className: par.className,
              email: par.email ?? "no",
            },
            score: par.score,
            submittedAt: par.submitTime,
          };
        })
      );
    };

    fetch();
  }, []);

  const calculateStats = () => {
    if (attempts.length === 0) return { avg: 0, max: 0, min: 0, count: 0 };

    const scores = attempts.map((a) => a.score || 0);

    return {
      avg: Math.round(scores.reduce((sum, s) => sum + s, 0) / scores.length),
      max: Math.max(...scores),
      min: Math.min(...scores),
      count: attempts.length,
    };
  };

  const handleExport = async () => {
    try {
      const res = await statisticsService.exportToExcel(id);
      console.log(res);
    } catch (error) {
      toastHelper.error(error.message);
    }
  };

  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleString("vi-VN");
  };

  if (isLoading) {
    return <div className="text-center py-8">Đang tải...</div>;
  }

  if (!quiz) {
    return <div className="text-center py-8">Không tìm thấy bài thi</div>;
  }

  const stats = calculateStats();

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-4">
          <Button variant="ghost" onClick={() => navigate(`/quizzes/${id}`)}>
            <ArrowLeft className="w-4 h-4 mr-2" />
            Quay lại
          </Button>
          <div>
            <h1 className="text-3xl font-bold">Thống kê bài thi</h1>
          </div>
        </div>

        <div className="flex gap-2">
          <Button variant="outline" onClick={() => handleExport()}>
            <Download className="w-4 h-4 mr-2" />
            Xuất Excel
          </Button>
        </div>
      </div>

      <p className="text-black-foreground mt-1 text-4xl font-bold">
        {quiz.title}
      </p>

      {/* Stats */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <Card>
          <CardHeader className="pb-3">
            <CardTitle className="text-sm font-medium">Số người thi</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-3xl font-bold">{stats.count}</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="pb-3">
            <CardTitle className="text-sm font-medium">
              Điểm trung bình
            </CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-3xl font-bold text-primary">{stats.avg}</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="pb-3">
            <CardTitle className="text-sm font-medium">Điểm cao nhất</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-3xl font-bold text-success">{stats.max}</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="pb-3">
            <CardTitle className="text-sm font-medium">
              Điểm thấp nhất
            </CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-3xl font-bold text-destructive">{stats.min}</p>
          </CardContent>
        </Card>
      </div>

      {/* Results Table */}
      <Card>
        <CardHeader>
          <CardTitle>Danh sách kết quả</CardTitle>
          <CardDescription>Chi tiết điểm số của từng học sinh</CardDescription>
        </CardHeader>

        <CardContent>
          {attempts.length === 0 ? (
            <p className="text-center py-8 text-muted-foreground">
              Chưa có ai hoàn thành bài thi
            </p>
          ) : (
            <div className="rounded-xl overflow-hidden">
              <Table className="border-collapse border-spacing-y-2">
                <TableHeader className="bg-accent-foreground">
                  <TableRow className="border-b-4 border-white">
                    <TableHead className="text-white">Họ tên</TableHead>
                    <TableHead className="text-white">Mã học sinh</TableHead>
                    <TableHead className="text-white">Email</TableHead>
                    <TableHead className="text-white">Điểm</TableHead>
                    <TableHead className="text-white">Thời gian nộp</TableHead>
                  </TableRow>
                </TableHeader>

                <TableBody>
                  {attempts.map((attempt) => (
                    <TableRow
                      key={attempt.id}
                      onClick={() => {
                        navigate(`/report/detail-participation/${attempt.id}`);
                      }}
                      className="border-b-4 border-white bg-black/10 hover:bg-black/5"
                    >
                      <TableCell className="font-medium max-w-[220px] overflow-hidden whitespace-nowrap text-ellipsis">
                        {attempt.participant.name}
                      </TableCell>

                      <TableCell>{attempt.participant.studentId}</TableCell>

                      <TableCell className="max-w-[250px] overflow-hidden whitespace-nowrap text-ellipsis">
                        {attempt.participant.email}
                      </TableCell>

                      <TableCell>
                        <span className="font-semibold text-primary">
                          {attempt.score}
                        </span>
                        <span className="text-muted-foreground">
                          /{quiz.totalScore}
                        </span>
                      </TableCell>

                      <TableCell>
                        {attempt.submittedAt && formatDate(attempt.submittedAt)}
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
}

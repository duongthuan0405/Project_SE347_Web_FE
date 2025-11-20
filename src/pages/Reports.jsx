import { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { ArrowLeft, Download } from 'lucide-react';

import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';

import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow
} from '@/components/ui/table';

import { useToast } from '@/hooks/use-toast';
import { quizController } from '@/controller/quizController';
import { participantService } from '@/service/participantService';

export default function Reports() {
  const { id } = useParams();
  const navigate = useNavigate();
  const { toast } = useToast();

  const [quiz, setQuiz] = useState(null);
  const [attempts, setAttempts] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    loadData();
  }, [id]);

  const loadData = async () => {
    if (!id) return;

    const quizData = await quizController.getQuizById(id);
    const attemptsData = await participantService.getResults(id);

    setQuiz(quizData);
    setAttempts(attemptsData);
    setIsLoading(false);
  };

  const calculateStats = () => {
    if (attempts.length === 0) return { avg: 0, max: 0, min: 0, count: 0 };

    const scores = attempts.map((a) => a.score || 0);

    return {
      avg: Math.round(scores.reduce((sum, s) => sum + s, 0) / scores.length),
      max: Math.max(...scores),
      min: Math.min(...scores),
      count: attempts.length
    };
  };

  const handleExport = (type) => {
    toast({
      title: 'Đang xuất file',
      description: `File ${type.toUpperCase()} đang được tạo...`
    });
  };

  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleString('vi-VN');
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
            <p className="text-muted-foreground mt-1">{quiz.title}</p>
          </div>
        </div>

        <div className="flex gap-2">
          <Button variant="outline" onClick={() => handleExport('excel')}>
            <Download className="w-4 h-4 mr-2" />
            Xuất Excel
          </Button>
          <Button variant="outline" onClick={() => handleExport('pdf')}>
            <Download className="w-4 h-4 mr-2" />
            Xuất PDF
          </Button>
        </div>
      </div>

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
            <CardTitle className="text-sm font-medium">Điểm trung bình</CardTitle>
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
            <CardTitle className="text-sm font-medium">Điểm thấp nhất</CardTitle>
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
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Họ tên</TableHead>
                  <TableHead>Mã học sinh</TableHead>
                  <TableHead>Email</TableHead>
                  <TableHead>Điểm</TableHead>
                  <TableHead>Thời gian nộp</TableHead>
                </TableRow>
              </TableHeader>

              <TableBody>
                {attempts.map((attempt) => (
                  <TableRow key={attempt.id}>
                    <TableCell className="font-medium">
                      {attempt.participant.name}
                    </TableCell>

                    <TableCell>{attempt.participant.studentId}</TableCell>
                    <TableCell>{attempt.participant.email}</TableCell>

                    <TableCell>
                      <span className="font-semibold text-primary">{attempt.score}</span>
                      <span className="text-muted-foreground">/{quiz.totalScore}</span>
                    </TableCell>

                    <TableCell>
                      {attempt.submittedAt && formatDate(attempt.submittedAt)}
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          )}
        </CardContent>
      </Card>

    </div>
  );
}

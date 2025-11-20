import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Plus, Edit, Trash2, Eye } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import { useToast } from '@/hooks/use-toast';
import { quizController } from '@/controller/quizController';
import { authController } from '@/controller/authController';

export default function Dashboard() {
  const navigate = useNavigate();
  const { toast } = useToast();
  const [quizzes, setQuizzes] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  const loadQuizzes = async () => {
    const user = authController.getCurrentUser();
    if (!user) return;

    const data = await quizController.getQuizzes(user.id);
    setQuizzes(data);
    setIsLoading(false);
  };

  useEffect(() => {
    loadQuizzes();
  }, []);

  const handleDelete = async (id) => {
    if (!confirm('Bạn có chắc chắn muốn xóa bài thi này?')) return;

    const result = await quizController.deleteQuiz(id);
    if (result.success) {
      toast({
        title: 'Xóa thành công',
        description: 'Bài thi đã được xóa',
      });
      loadQuizzes();
    }
  };

  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleDateString('vi-VN');
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold">Bảng điều khiển</h1>
          <p className="text-muted-foreground mt-1">Quản lý tất cả bài thi của bạn</p>
        </div>
        <Button onClick={() => navigate('/quizzes/create')}>
          <Plus className="w-4 h-4 mr-2" />
          Tạo bài thi mới
        </Button>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Danh sách bài thi</CardTitle>
          <CardDescription>
            Tổng cộng {quizzes.length} bài thi
          </CardDescription>
        </CardHeader>

        <CardContent>
          {isLoading ? (
            <p className="text-center py-8 text-muted-foreground">Đang tải...</p>
          ) : quizzes.length === 0 ? (
            <div className="text-center py-12">
              <p className="text-muted-foreground mb-4">Chưa có bài thi nào</p>
              <Button onClick={() => navigate('/quizzes/create')}>
                <Plus className="w-4 h-4 mr-2" />
                Tạo bài thi đầu tiên
              </Button>
            </div>
          ) : (
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Tên bài thi</TableHead>
                  <TableHead>Số câu hỏi</TableHead>
                  <TableHead>Thời lượng</TableHead>
                  <TableHead>Ngày tạo</TableHead>
                  <TableHead className="text-right">Hành động</TableHead>
                </TableRow>
              </TableHeader>

              <TableBody>
                {quizzes.map((quiz) => (
                  <TableRow key={quiz.id}>
                    <TableCell className="font-medium">{quiz.title}</TableCell>
                    <TableCell>{quiz.questionCount} câu</TableCell>
                    <TableCell>{quiz.duration} phút</TableCell>
                    <TableCell>{formatDate(quiz.createdAt)}</TableCell>

                    <TableCell className="text-right">
                      <div className="flex items-center justify-end gap-2">

                        <Button
                          variant="ghost"
                          size="sm"
                          onClick={() => navigate(`/quizzes/${quiz.id}`)}
                        >
                          <Eye className="w-4 h-4" />
                        </Button>

                        <Button
                          variant="ghost"
                          size="sm"
                          onClick={() => navigate(`/quizzes/${quiz.id}/edit`)}
                        >
                          <Edit className="w-4 h-4" />
                        </Button>

                        <Button
                          variant="ghost"
                          size="sm"
                          onClick={() => handleDelete(quiz.id)}
                        >
                          <Trash2 className="w-4 h-4" />
                        </Button>

                      </div>
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

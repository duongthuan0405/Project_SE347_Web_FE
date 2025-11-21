import { Plus, Edit, Trash2, Eye } from "lucide-react";
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

const quizzes = [];
let isLoading = false;

export default function Dashboard() {
  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold">Bảng điều khiển</h1>
          <p className="text-muted-foreground mt-1">
            Quản lý tất cả bài thi của bạn
          </p>
        </div>
        <Button onClick={() => navigate("/quizzes/create")}>
          <Plus className="w-4 h-4 mr-2" />
          Tạo bài thi mới
        </Button>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Danh sách bài thi</CardTitle>
          <CardDescription>Tổng cộng {quizzes.length} bài thi</CardDescription>
        </CardHeader>

        <CardContent>
          {isLoading ? (
            <p className="text-center py-8 text-muted-foreground">
              Đang tải...
            </p>
          ) : quizzes.length === 0 ? (
            <div className="text-center py-12">
              <p className="text-muted-foreground mb-4">Chưa có bài thi nào</p>
              <Button onClick={() => navigate("/quizzes/create")}>
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

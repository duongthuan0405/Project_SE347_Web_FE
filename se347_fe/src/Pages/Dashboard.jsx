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
import { AppContext } from "@/App";
import { use, useContext, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { removeQuizById, useGetMyQuiz } from "@/api/data_hooks/quizHook";
import LoadingOverlay from "@/ui/LoadingOverlay";
import toastHelper from "@/helper/toastHelper";

const quizzes = [];

export default function Dashboard() {
  // context
  const appContext = useContext(AppContext);
  const user = appContext.currentUserProfile;

  // navigate
  const navigate = useNavigate();

  // get my quizzes
  const getMyQuizzes = useGetMyQuiz(!!user);
  useEffect(
    function () {
      if (getMyQuizzes.isSuccess) {
        console.log("Quizzes fetched:", getMyQuizzes.data);
      } else if (getMyQuizzes.isError) {
        toastHelper.error("Lỗi khi tải danh sách bài thi");
      }
    },
    [getMyQuizzes.data, getMyQuizzes.isError, getMyQuizzes.isSuccess]
  );

  // remove quiz
  const removeQuiz = removeQuizById();
  function handleDelete(quizId) {
    removeQuiz.mutate({ quizId });
  }
  useEffect(
    function () {
      if (removeQuiz.isSuccess) {
        toastHelper.success("Xóa bài thi thành công");
        getMyQuizzes.refetch();
      }
      if (removeQuiz.isError) {
        toastHelper.error(removeQuiz.error?.message);
      }
    },
    [removeQuiz.data, removeQuiz.isSuccess, removeQuiz.error]
  );

  return (
    <div className="space-y-6">
      {getMyQuizzes.isLoading && <LoadingOverlay />}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold">Bảng điều khiển</h1>
          <p className="text-muted-foreground mt-1">
            Quản lý tất cả bài thi của bạn
          </p>
        </div>
        {user && (
          <Button onClick={() => navigate("/quizzes/create")}>
            <Plus className="w-4 h-4 mr-2" />
            Tạo bài thi mới
          </Button>
        )}
      </div>

      {user ? (
        !getMyQuizzes.data ? (
          <div>Error</div>
        ) : (
          <Card>
            <CardHeader>
              <CardTitle>Danh sách bài thi</CardTitle>
              <CardDescription>
                Tổng cộng {getMyQuizzes.data.length} bài thi
              </CardDescription>
            </CardHeader>

            <CardContent>
              {getMyQuizzes.data.length === 0 ? (
                <div className="text-center py-12">
                  <p className="text-muted-foreground mb-4">
                    Chưa có bài thi nào
                  </p>
                  <Button onClick={() => navigate("/quizzes/create")}>
                    <Plus className="w-4 h-4 mr-2" />
                    Tạo bài thi đầu tiên
                  </Button>
                </div>
              ) : (
                <Table className="rounded-xl">
                  <TableHeader className="bg-accent-foreground ">
                    <TableRow>
                      <TableHead className="text-white">Tên bài thi</TableHead>
                      <TableHead className="text-white">Số câu hỏi</TableHead>
                      <TableHead className="text-white">Thời lượng</TableHead>
                      <TableHead className="text-white">Ngày tạo</TableHead>
                      <TableHead className="text-white">Bắt đầu</TableHead>
                      <TableHead className="text-white">Kết thúc</TableHead>
                      <TableHead className="text-white text-center">
                        Hành động
                      </TableHead>
                    </TableRow>
                  </TableHeader>

                  <TableBody>
                    {getMyQuizzes.data.map((quiz) => (
                      <TableRow key={quiz.id}>
                        <TableCell className="w-[250px] max-w-[250px] font-medium overflow-hidden whitespace-nowrap text-ellipsis">
                          {quiz.title}
                        </TableCell>
                        <TableCell>{quiz.totalQuestions} câu</TableCell>
                        <TableCell>{quiz.durationInMinutes} phút</TableCell>
                        <TableCell>{quiz.createAt}</TableCell>
                        <TableCell>{quiz.startTime}</TableCell>
                        <TableCell>{quiz.dueTime}</TableCell>

                        <TableCell className="text-right">
                          <div className="flex items-center justify-end gap-0">
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
                              onClick={() =>
                                navigate(`/quizzes/${quiz.id}/edit`)
                              }
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
        )
      ) : (
        <Card className="max-w-2xl mx-auto">
          <CardContent className="space-y-6">
            <div className="space-y-4">
              Vui lòng đăng nhập để sử dụng tính năng này.
            </div>

            <Button
              variant="destructive"
              onClick={() => navigate("/login")}
              className="w-full mt-2 bg-accent-foreground hover:bg-accent-foreground/70 text-white"
            >
              Đăng nhập
            </Button>
          </CardContent>
        </Card>
      )}
    </div>
  );
}

import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import {
  ArrowLeft,
  Plus,
  Edit,
  Trash2,
  Link as LinkIcon,
  BarChart,
  RefreshCw,
  Copy,
} from "lucide-react";

import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { QuestionForm } from "@/ui/QuestionForm";
import {
  useGetQuizDetailById,
  useRemoveQuestionFromQuiz,
  useToggleQuestionInQuiz,
} from "@/api/data_hooks/quizHook";
import LoadingOverlay from "@/ui/LoadingOverlay";
import toastHelper from "@/helper/toastHelper";

export default function QuizDetail() {
  // get param from route
  const { id } = useParams();

  // state hook
  const [quiz, setQuiz] = useState(null);
  const [questions, setQuestions] = useState([]);

  const [showQuestionForm, setShowQuestionForm] = useState(false);
  const [editingQuestion, setEditingQuestion] = useState(null);

  // get quiz detail hook
  const getQuizDetail = useGetQuizDetailById(id);
  useEffect(
    function () {
      if (getQuizDetail.isSuccess) {
        setQuiz(getQuizDetail.data.quiz);
        setQuestions(getQuizDetail.data.questions);
      }

      if (getQuizDetail.isError) {
      }
    },
    [getQuizDetail.data, getQuizDetail.isError, getQuizDetail.isSuccess]
  );
  const navigate = useNavigate();

  // add or update question
  const toggleQuestion = useToggleQuestionInQuiz();
  useEffect(
    function () {
      if (toggleQuestion.isSuccess) {
        toastHelper.success("Cập nhật câu hỏi thành công!");
        getQuizDetail.refetch();
      }
      if (toggleQuestion.isError) {
        toastHelper.error(toggleQuestion.error.message);
      }
    },
    [toggleQuestion.data, toggleQuestion.isError, toggleQuestion.isSuccess]
  );

  // delete question from quiz
  const deleteQuestionFromQuiz = useRemoveQuestionFromQuiz();
  useEffect(
    function () {
      if (deleteQuestionFromQuiz.isSuccess) {
        toastHelper.success("Xóa câu hỏi khỏi bài kiểm tra thành công!");
        getQuizDetail.refetch();
      }
      if (deleteQuestionFromQuiz.isError) {
        toastHelper.error(deleteQuestionFromQuiz.error.message);
      }
    },
    [
      deleteQuestionFromQuiz.data,
      deleteQuestionFromQuiz.isSuccess,
      deleteQuestionFromQuiz.isError,
    ]
  );

  // ---------- HANDLERS ----------
  const handleDeleteQuestion = (questionId) => {
    deleteQuestionFromQuiz.mutate({ quizId: id, questionId });
  };

  const handleCopyLink = () => {
    const link = `${window.location.origin}/take/${quiz?.code || id}`;
    navigator.clipboard.writeText(link);
    toast({
      title: "Đã sao chép",
      description: "Link tham gia bài thi đã được sao chép",
    });
  };

  const handleGenerateCode = () => {
    const newCode = `QZ${Math.random()
      .toString(36)
      .substring(2, 8)
      .toUpperCase()}`;
    setQuiz((prev) => (prev ? { ...prev, code: newCode } : null));
    toast({
      title: "Đã tạo mã mới",
      description: `Mã bài thi: ${newCode}`,
    });
  };

  const handleCopyCode = () => {
    if (quiz?.code) {
      navigator.clipboard.writeText(quiz.code);
      toast({
        title: "Đã sao chép",
        description: "Mã bài thi đã được sao chép",
      });
    }
  };

  function handleOnSuccessClickForQuestionForm(newQuestion) {
    toggleQuestion.mutate({ quizId: id, newQuestion });
  }

  // ---------- RENDER ----------

  if (!getQuizDetail.data || !quiz || !questions) {
    return <div className="text-center py-8">Không tìm thấy bài thi</div>;
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      {getQuizDetail.isLoading && <LoadingOverlay />}
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-4">
          <Button variant="ghost" onClick={() => navigate("/dashboard")}>
            <ArrowLeft className="w-4 h-4 mr-2" />
            Quay lại
          </Button>
          <div>
            <h1 className="text-3xl font-bold">{quiz.title}</h1>
            <p className="text-muted-foreground mt-1">{quiz.description}</p>
          </div>
        </div>

        <Button variant="outline" onClick={() => navigate(`/reports/${id}`)}>
          <BarChart className="w-4 h-4 mr-2" />
          Thống kê
        </Button>
      </div>

      {/* Mã bài thi + Link */}
      <Card>
        <CardHeader>
          <CardTitle>Truy cập bài thi</CardTitle>
          <CardDescription>Mã và đường link để chia sẻ bài thi</CardDescription>
        </CardHeader>

        <CardContent className="space-y-4">
          {/* Mã bài thi */}
          <div className="space-y-2">
            <Label className="text-sm font-medium">Mã bài thi</Label>
            <div className="flex gap-2">
              <Input
                value={quiz.code || ""}
                readOnly
                className="font-mono text-lg"
              />
              <Button variant="outline" onClick={handleCopyCode}>
                <Copy className="w-4 h-4" />
              </Button>
              <Button
                variant="outline"
                className="min-w-[200px]"
                onClick={handleGenerateCode}
              >
                <RefreshCw className="w-4 h-4 mr-2" />
                Tạo mã mới
              </Button>
            </div>
          </div>

          {/* Link */}
          <div className="space-y-2">
            <Label className="text-sm font-medium">Đường link tham gia</Label>
            <div className="flex gap-2">
              <Input
                value={`${window.location.origin}/take/${quiz.code || id}`}
                readOnly
                className="text-sm"
              />
              <Button
                variant="outline"
                className="min-w-[200px]"
                onClick={handleCopyLink}
              >
                <LinkIcon className="w-4 h-4 mr-2" />
                Sao chép
              </Button>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Statistics */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <Card>
          <CardHeader className="pb-3">
            <CardTitle className="text-sm font-medium">Số câu hỏi</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-2xl font-bold">{quiz.questionCount}</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="pb-3">
            <CardTitle className="text-sm font-medium">Thời lượng</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-2xl font-bold">{quiz.duration} phút</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="pb-3">
            <CardTitle className="text-sm font-medium">Tổng điểm</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-2xl font-bold">{quiz.totalScore}</p>
          </CardContent>
        </Card>
      </div>

      {/* Tabs */}
      <Tabs defaultValue="questions">
        <TabsList>
          <TabsTrigger value="questions">Câu hỏi</TabsTrigger>
          <TabsTrigger value="settings">Cài đặt</TabsTrigger>
        </TabsList>

        {/* Tab — Questions */}
        <TabsContent value="questions" className="space-y-4">
          <div className="flex justify-between items-center">
            <h2 className="text-xl font-semibold">Danh sách câu hỏi</h2>
            <div className="flex space-x-2">
              <Button
                onClick={() => setShowQuestionForm(true)}
                className=" bg-red-500 hover:bg-red-500/70"
              >
                <Plus className="w-4 h-4 mr-2" />
                Thêm câu hỏi thủ công
              </Button>

              <Button
                onClick={() => {}}
                className=" bg-primary hover:bg-primary/70"
              >
                <Plus className="w-4 h-4 mr-2" />
                Thêm câu hỏi từ ngân hàng
              </Button>
            </div>
          </div>

          {showQuestionForm && (
            <QuestionForm
              quizId={id}
              onSuccess={(newQuestion) => {
                setShowQuestionForm(false);
                setEditingQuestion(null);
                handleOnSuccessClickForQuestionForm(newQuestion);
              }}
              onCancel={() => {
                setShowQuestionForm(false);
                setEditingQuestion(null);
              }}
            />
          )}

          {questions.length === 0 ? (
            <Card className="bg-black/5">
              <CardContent className="py-12 text-center">
                <p className="text-muted-foreground mb-4">
                  Chưa có câu hỏi nào
                </p>
                <Button onClick={() => setShowQuestionForm(true)}>
                  <Plus className="w-4 h-4 mr-2" />
                  Thêm câu hỏi đầu tiên
                </Button>
              </CardContent>
            </Card>
          ) : (
            <div className="space-y-4">
              {questions.map(function (question, index) {
                if (
                  editingQuestion != null &&
                  question.id === editingQuestion.id
                ) {
                  return (
                    <QuestionForm
                      quizId={id}
                      question={editingQuestion}
                      onSuccess={(newQuestion) => {
                        setEditingQuestion(null);
                        handleOnSuccessClickForQuestionForm(newQuestion);
                      }}
                      onCancel={() => {
                        setEditingQuestion(null);
                      }}
                    />
                  );
                } else {
                  return (
                    <Card className="bg-black/5">
                      <CardHeader className="flex flex-col items-start">
                        <div className="flex items-center space-x-5 mb-5">
                          <div className="w-fit items-stretch">
                            <div className="flex items-center gap-2">
                              <Badge variant="outline" className="text-[16px]">
                                Câu {index + 1}
                              </Badge>
                              <Badge className="text-[16px]">
                                {question.score} điểm
                              </Badge>
                            </div>
                          </div>

                          <div className="flex gap-2 justify-center">
                            <Button
                              variant="ghost"
                              onClick={() => {
                                setEditingQuestion(question);
                              }}
                              className="py-1 px-0 h-full"
                            >
                              <Edit className="w-full h-full text-primary" />
                            </Button>

                            <Button
                              variant="ghost"
                              onClick={() => handleDeleteQuestion(question.id)}
                              className="py-1 px-0 h-full"
                            >
                              <Trash2 className="w-full h-full text-red-500" />
                            </Button>
                          </div>
                        </div>

                        <CardTitle className="text-lg">
                          {question.content}
                        </CardTitle>
                      </CardHeader>

                      <CardContent>
                        <div className="space-y-2">
                          {question.answers.map(function (option, optIndex) {
                            return (
                              <div
                                key={optIndex}
                                className={`p-3 rounded-lg ${
                                  option.isCorrectAnswer
                                    ? "bg-success/10 border-success"
                                    : "bg-white"
                                }`}
                              >
                                <span className="font-medium mr-2">
                                  {String.fromCharCode(65 + optIndex)}.
                                </span>
                                {option.content}

                                {option.isCorrectAnswer && (
                                  <Badge className="ml-2 bg-success text-white">
                                    Đáp án đúng
                                  </Badge>
                                )}
                              </div>
                            );
                          })}
                        </div>
                      </CardContent>
                    </Card>
                  );
                }
              })}
            </div>
          )}
        </TabsContent>

        {/* Tab — Settings */}
        <TabsContent value="settings">
          <Card>
            <CardHeader>
              <CardTitle>Cài đặt bài thi</CardTitle>
              <CardDescription>Chỉnh sửa thông tin cơ bản</CardDescription>
            </CardHeader>

            <CardContent>
              <Button onClick={() => navigate(`/quizzes/${id}/edit`)}>
                <Edit className="w-4 h-4 mr-2" />
                Chỉnh sửa bài thi
              </Button>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
}

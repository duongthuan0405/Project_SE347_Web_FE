import { useState, useEffect } from "react";
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
import { Input } from "@/components/ui/input";
import { QuestionForm } from "@/ui/QuestionForm";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

// ----- Fake Toast -----
function useToast() {
  return {
    toast: ({ title, description }) => alert(`${title}\n${description || ""}`),
  };
}

// ----- Fake Services -----
const fakeQuiz = {
  id: "1",
  title: "Bài thi Toán cơ bản",
  description: "Kiểm tra kiến thức Toán lớp 10",
  code: "QZ1234",
  questionCount: 3,
  duration: 60,
  totalScore: 10,
};

let fakeQuestions = [
  {
    id: "q1",
    content: "2 + 2 = ?",
    options: ["3", "4", "5", "6"],
    correctOption: 1,
    score: 1,
  },
  {
    id: "q2",
    content: "5 * 3 = ?",
    options: ["15", "10", "20", "25"],
    correctOption: 0,
    score: 2,
  },
];

const quizController = {
  getQuizWithQuestions: async (id) => {
    return new Promise((resolve) => {
      setTimeout(
        () => resolve({ quiz: fakeQuiz, questions: fakeQuestions }),
        500
      );
    });
  },
  updateQuiz: async (id, data) => {
    fakeQuiz.code = data.code || fakeQuiz.code;
    return { success: true };
  },
};

const questionService = {
  delete: async (questionId) => {
    fakeQuestions = fakeQuestions.filter((q) => q.id !== questionId);
    return { success: true };
  },
  create: async (quizId, data) => {
    const newQ = { id: "q" + (fakeQuestions.length + 1), ...data };
    fakeQuestions.push(newQ);
    return { success: true };
  },
  update: async (questionId, data) => {
    fakeQuestions = fakeQuestions.map((q) =>
      q.id === questionId ? { ...q, ...data } : q
    );
    return { success: true };
  },
};

// ----- Main Component -----
export default function QuizDetail() {
  const { id } = useParams();
  const navigate = useNavigate();
  const { toast } = useToast();

  const [quiz, setQuiz] = useState(null);
  const [questions, setQuestions] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  const [showQuestionForm, setShowQuestionForm] = useState(false);
  const [editingQuestion, setEditingQuestion] = useState(null);

  const loadData = async () => {
    if (!id) return;
    const data = await quizController.getQuizWithQuestions(id);
    if (data) {
      setQuiz(data.quiz);
      setQuestions(data.questions);
    }
    setIsLoading(false);
  };

  useEffect(() => {
    loadData();
  }, [id]);

  const handleDeleteQuestion = async (questionId) => {
    if (!confirm("Bạn có chắc chắn muốn xóa câu hỏi này?")) return;
    const result = await questionService.delete(questionId);
    if (result.success) {
      toast({ title: "Xóa thành công" });
      loadData();
    }
  };

  const handleCopyLink = () => {
    const link = `${window.location.origin}/take/${quiz?.code || id}`;
    navigator.clipboard.writeText(link);
    toast({ title: "Đã sao chép link" });
  };

  const handleGenerateCode = async () => {
    const newCode = `QZ${Math.random()
      .toString(36)
      .substring(2, 8)
      .toUpperCase()}`;
    await quizController.updateQuiz(id, { code: newCode });
    setQuiz((prev) => ({ ...prev, code: newCode }));
    toast({ title: "Đã tạo mã mới", description: newCode });
  };

  if (isLoading) return <div className="text-center py-8">Đang tải...</div>;
  if (!quiz)
    return <div className="text-center py-8">Không tìm thấy bài thi</div>;

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-4">
          <Button variant="ghost" onClick={() => navigate("/")}>
            <ArrowLeft className="w-4 h-4 mr-2" />
            Quay lại
          </Button>
          <div>
            <h1 className="text-3xl font-bold">{quiz.title}</h1>
            <p className="text-muted-foreground mt-1">{quiz.description}</p>
          </div>
        </div>
      </div>

      {/* Mã và link */}
      <Card>
        <CardHeader>
          <CardTitle>Truy cập bài thi</CardTitle>
          <CardDescription>Mã và đường link để chia sẻ bài thi</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="flex gap-2">
            <Input value={quiz.code} readOnly className="font-mono text-lg" />
            <Button onClick={handleCopyLink}>Sao chép link</Button>
            <Button onClick={handleGenerateCode}>Tạo mã mới</Button>
          </div>
        </CardContent>
      </Card>

      {/* Tabs */}
      <Tabs defaultValue="questions">
        <TabsList>
          <TabsTrigger value="questions">Câu hỏi</TabsTrigger>
          <TabsTrigger value="settings">Cài đặt</TabsTrigger>
        </TabsList>

        <TabsContent value="questions" className="space-y-4">
          <div className="flex justify-between items-center">
            <h2 className="text-xl font-semibold">Danh sách câu hỏi</h2>
            <Button onClick={() => setShowQuestionForm(true)}>
              <Plus className="w-4 h-4 mr-2" />
              Thêm câu hỏi
            </Button>
          </div>

          {showQuestionForm && (
            <QuestionForm
              quizId={id}
              question={editingQuestion}
              onSuccess={() => {
                setShowQuestionForm(false);
                setEditingQuestion(null);
                loadData();
              }}
              onCancel={() => {
                setShowQuestionForm(false);
                setEditingQuestion(null);
              }}
            />
          )}

          {questions.length === 0 ? (
            <Card>
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
            questions.map((question, index) => (
              <Card key={question.id}>
                <CardHeader>
                  <div className="flex items-start justify-between">
                    <div className="flex-1">
                      <div className="flex items-center gap-2 mb-2">
                        <Badge variant="outline">Câu {index + 1}</Badge>
                        <Badge>{question.score} điểm</Badge>
                      </div>
                      <CardTitle className="text-lg">
                        {question.content}
                      </CardTitle>
                    </div>
                    <div className="flex gap-2">
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={() => {
                          setEditingQuestion(question);
                          setShowQuestionForm(true);
                        }}
                      >
                        <Edit className="w-4 h-4" />
                      </Button>
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={() => handleDeleteQuestion(question.id)}
                      >
                        <Trash2 className="w-4 h-4" />
                      </Button>
                    </div>
                  </div>
                </CardHeader>

                <CardContent>
                  <div className="space-y-2">
                    {question.options.map((option, optIndex) => (
                      <div
                        key={optIndex}
                        className={`p-3 rounded-lg border ${
                          optIndex === question.correctOption
                            ? "bg-green-100 border-green-500"
                            : "bg-gray-50"
                        }`}
                      >
                        <span className="font-medium mr-2">
                          {String.fromCharCode(65 + optIndex)}.
                        </span>
                        {option}
                        {optIndex === question.correctOption && (
                          <Badge className="ml-2 bg-green-500 text-white">
                            Đáp án đúng
                          </Badge>
                        )}
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            ))
          )}
        </TabsContent>

        <TabsContent value="settings" className="space-y-4">
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

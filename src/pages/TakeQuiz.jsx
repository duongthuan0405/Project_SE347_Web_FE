import { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { Clock, Send, Home, Calendar, AlertCircle } from 'lucide-react';

import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { Alert, AlertDescription } from '@/components/ui/alert';

import { useToast } from '@/hooks/use-toast';
import { quizController } from "@/controller/quizController";
import { participantController } from "@/controller/participantController";

export default function TakeQuiz() {
  const { id } = useParams();
  const navigate = useNavigate();
  const { toast } = useToast();

  const [step, setStep] = useState('info');
  const [quiz, setQuiz] = useState(null);
  const [questions, setQuestions] = useState([]);

  const [attemptId, setAttemptId] = useState('');
  const [timeLeft, setTimeLeft] = useState(0);

  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const [participantInfo, setParticipantInfo] = useState({
    name: '',
    studentId: '',
    email: ''
  });

  const [answers, setAnswers] = useState({});

  useEffect(() => {
    loadQuiz();
  }, [id]);

  useEffect(() => {
    if (step === 'quiz' && timeLeft > 0) {
      const timer = setInterval(() => {
        setTimeLeft((prev) => {
          if (prev <= 1) {
            handleSubmit();
            return 0;
          }
          return prev - 1;
        });
      }, 1000);

      return () => clearInterval(timer);
    }
  }, [step, timeLeft]);

  const loadQuiz = async () => {
    if (!id) {
      setError('Không tìm thấy mã bài thi');
      setLoading(false);
      return;
    }

    try {
      setLoading(true);

      const quizData = await quizController.getQuizById(id);

      if (quizData) {
        const { questions: qs } = await quizController.getQuizWithQuestions(id);

        setQuiz(quizData);
        setQuestions(qs);
        setError(null);
      } else {
        setError('Không tìm thấy bài thi. Vui lòng kiểm tra mã bài thi.');
      }

    } catch (err) {
      setError('Lỗi khi tải bài thi. Vui lòng thử lại.');
    } finally {
      setLoading(false);
    }
  };

  const formatDateTime = (str) => {
    if (!str) return 'Không giới hạn';
    const d = new Date(str);
    return d.toLocaleString('vi-VN', {
      day: '2-digit',
      month: '2-digit',
      year: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    });
  };

  const handleStartQuiz = async () => {
    const result = await participantController.start(id, participantInfo);

    if (result.success && result.attemptId) {
      setAttemptId(result.attemptId);
      setTimeLeft(quiz.duration * 60);
      setStep('quiz');
    } else {
      toast({
        title: 'Lỗi',
        description: 'Không thể bắt đầu bài thi',
        variant: 'destructive'
      });
    }
  };

  const handleAnswerChange = async (questionId, optionIndex) => {
    setAnswers((prev) => ({ ...prev, [questionId]: optionIndex }));
    await participantController.saveAnswer(attemptId, questionId, optionIndex);
  };

  const handleSubmit = async () => {
    if (!confirm('Bạn có chắc chắn muốn nộp bài?')) return;

    const result = await participantController.submit(attemptId);

    if (result.success) {
      const resultData = {
        score: result.score,
        correctCount: result.correctCount,
        total: result.total
      };

      if (quiz.sendResultEmail) {
        await participantController.sendResultEmail(attemptId);
        toast({
          title: 'Đã gửi kết quả',
          description: 'Kết quả đã được gửi qua email'
        });
      }

      navigate('/quiz-completed', { state: { result: resultData } });
    }
  };

  const formatTime = (sec) => {
    const m = Math.floor(sec / 60);
    const s = sec % 60;
    return `${m.toString().padStart(2, '0')}:${s.toString().padStart(2, '0')}`;
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-accent">
        <Card className="w-full max-w-md">
          <CardContent className="pt-6">
            <div className="flex flex-col items-center gap-4">
              <div className="animate-spin h-12 w-12 rounded-full border-b-2 border-primary"></div>
              <p className="text-muted-foreground">Đang tải bài thi...</p>
            </div>
          </CardContent>
        </Card>
      </div>
    );
  }

  if (error || !quiz) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-accent p-4">
        <div className="absolute top-4 left-4">
          <Button variant="outline" onClick={() => navigate('/')}>
            <Home className="w-4 h-4 mr-2" />
            Trang chủ
          </Button>
        </div>

        <Card className="w-full max-w-md">
          <CardHeader>
            <CardTitle className="text-2xl text-center">Không tìm thấy bài thi</CardTitle>
          </CardHeader>

          <CardContent className="space-y-4">
            <Alert variant="destructive">
              <AlertCircle className="h-4 w-4" />
              <AlertDescription>
                {error || 'Bài thi không tồn tại hoặc đã bị xoá.'}
              </AlertDescription>
            </Alert>

            <Button className="w-full" onClick={() => navigate('/take-quiz')}>
              Thử lại
            </Button>
          </CardContent>
        </Card>
      </div>
    );
  }

  /* ------------ INFO SCREEN ------------- */
  if (step === 'info') {
    return (
      <div className="min-h-screen flex items-center justify-center bg-accent p-4">
        <div className="absolute top-4 left-4">
          <Button variant="outline" onClick={() => navigate('/')}>
            <Home className="w-4 h-4 mr-2" />
            Trang chủ
          </Button>
        </div>

        <Card className="w-full max-w-lg">
          <CardHeader>
            <CardTitle className="text-2xl">{quiz.title}</CardTitle>
            <CardDescription>{quiz.description}</CardDescription>
          </CardHeader>

          <CardContent className="space-y-6">

            {/* Basic quiz info */}
            <div className="space-y-4 p-4 bg-muted rounded-lg">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <p className="text-sm text-muted-foreground">Số câu hỏi</p>
                  <p className="text-lg font-semibold">{quiz.questionCount}</p>
                </div>
                <div>
                  <p className="text-sm text-muted-foreground">Thời lượng</p>
                  <p className="text-lg font-semibold">{quiz.duration} phút</p>
                </div>
              </div>

              {(quiz.startTime || quiz.endTime) && (
                <div className="pt-4 border-t">
                  <div className="flex items-start gap-2">
                    <Calendar className="w-4 h-4 mt-0.5 text-muted-foreground" />
                    <div className="space-y-1">
                      {quiz.startTime && (
                        <p className="text-sm">
                          <span className="text-muted-foreground">Bắt đầu: </span>
                          {formatDateTime(quiz.startTime)}
                        </p>
                      )}
                      {quiz.endTime && (
                        <p className="text-sm">
                          <span className="text-muted-foreground">Kết thúc: </span>
                          {formatDateTime(quiz.endTime)}
                        </p>
                      )}
                    </div>
                  </div>
                </div>
              )}
            </div>

            {/* Participant info */}
            <div className="space-y-4">

              <div className="space-y-2">
                <Label>Họ tên *</Label>
                <Input
                  value={participantInfo.name}
                  onChange={(e) =>
                    setParticipantInfo((p) => ({ ...p, name: e.target.value }))
                  }
                  required
                />
              </div>

              <div className="space-y-2">
                <Label>Mã học sinh *</Label>
                <Input
                  value={participantInfo.studentId}
                  onChange={(e) =>
                    setParticipantInfo((p) => ({ ...p, studentId: e.target.value }))
                  }
                  required
                />
              </div>

              <div className="space-y-2">
                <Label>Email *</Label>
                <Input
                  type="email"
                  value={participantInfo.email}
                  onChange={(e) =>
                    setParticipantInfo((p) => ({ ...p, email: e.target.value }))
                  }
                  required
                />
              </div>

            </div>

            <Button
              className="w-full"
              onClick={handleStartQuiz}
              disabled={
                !participantInfo.name ||
                !participantInfo.studentId ||
                !participantInfo.email
              }
            >
              Bắt đầu thi
            </Button>

          </CardContent>
        </Card>
      </div>
    );
  }

  /* ------------ QUIZ SCREEN ------------- */
  if (step === 'quiz') {
    return (
      <div className="min-h-screen bg-accent py-6">

        <div className="max-w-4xl mx-auto px-4 space-y-6">

          <Button variant="outline" onClick={() => navigate('/')}>
            <Home className="w-4 h-4 mr-2" />
            Trang chủ
          </Button>

          <div className="sticky top-0 bg-card border p-4 rounded-lg flex justify-between items-center z-10">

            <div>
              <h1 className="text-xl font-bold">{quiz.title}</h1>
              <p className="text-muted-foreground text-sm">
                Đã trả lời: {Object.keys(answers).length}/{questions.length} câu
              </p>
            </div>

            <div className="flex items-center gap-4">

              <div className="flex items-center gap-2 text-lg font-semibold">
                <Clock className="w-5 h-5" />
                {formatTime(timeLeft)}
              </div>

              <Button
                onClick={handleSubmit}
                disabled={Object.keys(answers).length < questions.length}
              >
                <Send className="w-4 h-4 mr-2" />
                Nộp bài
              </Button>
            </div>

          </div>

          {/* QUESTIONS */}
          <div className="space-y-6">
            {questions.map((q, i) => (
              <Card key={q.id}>
                <CardHeader>
                  <CardTitle className="text-lg">
                    Câu {i + 1}: {q.content}
                  </CardTitle>
                  <CardDescription>{q.score} điểm</CardDescription>
                </CardHeader>

                <CardContent>
                  <RadioGroup
                    value={answers[q.id]?.toString()}
                    onValueChange={(v) =>
                      handleAnswerChange(q.id, parseInt(v))
                    }
                  >
                    {q.options.map((op, idx) => (
                      <div key={idx} className="flex items-center space-x-3 p-3 rounded-lg hover:bg-muted">
                        <RadioGroupItem id={`q${q.id}-${idx}`} value={idx.toString()} />
                        <Label htmlFor={`q${q.id}-${idx}`} className="cursor-pointer flex-1">
                          <strong className="mr-2">{String.fromCharCode(65 + idx)}.</strong>
                          {op}
                        </Label>
                      </div>
                    ))}
                  </RadioGroup>
                </CardContent>

              </Card>
            ))}
          </div>

        </div>

      </div>
    );
  }

  return null;
}

import { useNavigate, useLocation } from 'react-router-dom';
import { CheckCircle2, Home, FileText } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';

export default function QuizCompleted() {
  const navigate = useNavigate();
  const location = useLocation();
  const result = location.state?.result;

  return (
    <div className="min-h-screen flex items-center justify-center bg-accent p-4">
      <Card className="w-full max-w-md text-center">
        <CardHeader>
          <div className="mx-auto w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mb-4">
            <CheckCircle2 className="w-10 h-10 text-primary" />
          </div>
          <CardTitle className="text-2xl">Hoàn thành bài thi!</CardTitle>
          <CardDescription>Bạn đã hoàn thành bài thi thành công</CardDescription>
        </CardHeader>

        <CardContent className="space-y-6">
          {result && (
            <div className="bg-primary/5 rounded-lg p-4 space-y-2">
              <div className="text-3xl font-bold text-primary">
                {result.score}/{result.total}
              </div>
              <p className="text-sm text-muted-foreground">
                Đúng: {result.correctCount} | Sai: {result.total - result.correctCount}
              </p>
            </div>
          )}

          <div className="space-y-3">
            <Button className="w-full" size="lg" onClick={() => navigate('/')}>
              <Home className="w-4 h-4 mr-2" />
              Về trang chủ
            </Button>

            <Button
              variant="outline"
              className="w-full"
              onClick={() => navigate('/history')}
            >
              <FileText className="w-4 h-4 mr-2" />
              Xem lịch sử làm bài
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}

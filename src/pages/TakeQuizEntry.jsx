import { useState, useEffect } from 'react';
import { useNavigate, useSearchParams } from 'react-router-dom';

import { BookOpen, ArrowRight, Home } from 'lucide-react';

import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';

import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle
} from '@/components/ui/card';

export default function TakeQuizEntry() {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();

  const [quizId, setQuizId] = useState('');

  // Auto-redirect when "?id=xxx"
  useEffect(() => {
    const idFromUrl = searchParams.get('id');
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
    <div className="min-h-screen flex items-center justify-center bg-accent p-4">

      <div className="absolute top-4 left-4">
        <Button variant="outline" onClick={() => navigate('/')}>
          <Home className="w-4 h-4 mr-2" />
          Trang chủ
        </Button>
      </div>

      <Card className="w-full max-w-md">

        <CardHeader className="text-center">
          <div className="mx-auto w-12 h-12 bg-primary/10 rounded-full flex items-center justify-center mb-4">
            <BookOpen className="w-6 h-6 text-primary" />
          </div>
          <CardTitle className="text-2xl">Tham gia bài thi</CardTitle>
          <CardDescription>
            Nhập mã bài thi để bắt đầu làm bài
          </CardDescription>
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

import { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { useToast } from '@/hooks/use-toast';
import { authController } from '@/controller/authController';
import { Home } from 'lucide-react';

export default function Login() {
  const navigate = useNavigate();
  const { toast } = useToast();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);

    const result = await authController.handleLogin({ email, password });

    if (result.success) {
      toast({
        title: 'Đăng nhập thành công',
        description: 'Chào mừng bạn trở lại!',
      });
      navigate('/dashboard');
    } else {
      toast({
        title: 'Đăng nhập thất bại',
        description: result.message,
        variant: 'destructive',
      });
    }

    setIsLoading(false);
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-accent p-4">
      <Card className="w-full max-w-md">

        <Button
          variant="ghost"
          onClick={() => navigate('/')}
          className="mt-2 ml-2"
        >
          <Home className="mr-2 h-4 w-4" />
          Trang chính
        </Button>

        <CardHeader className="space-y-1">
          <CardTitle className="text-3xl font-bold text-center">ExamHub</CardTitle>
          <CardDescription className="text-center">
            Đăng nhập để quản lý bài thi
          </CardDescription>
        </CardHeader>

        <CardContent>
          <form onSubmit={handleSubmit} className="space-y-4">

            <div className="space-y-2">
              <Label>Email</Label>
              <Input
                type="email"
                placeholder="exam@email.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
              />
            </div>

            <div className="space-y-2">
              <Label>Mật khẩu</Label>
              <Input
                type="password"
                placeholder="••••••••"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
              />
            </div>

            <Button type="submit" className="w-full" disabled={isLoading}>
              {isLoading ? 'Đang đăng nhập...' : 'Đăng nhập'}
            </Button>

          </form>
        </CardContent>

        <CardFooter className="flex justify-center">
          <p className="text-sm text-muted-foreground">
            Chưa có tài khoản?{' '}
            <Link to="/register" className="text-primary hover:underline font-medium">
              Đăng ký ngay
            </Link>
          </p>
        </CardFooter>

      </Card>
    </div>
  );
}

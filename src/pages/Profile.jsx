import { useNavigate } from 'react-router-dom';
import { User, Mail, LogOut } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Avatar, AvatarFallback } from '@/components/ui/avatar';
import { authController } from '@/controller/authController';

export default function Profile() {
  const navigate = useNavigate();
  const user = authController.getCurrentUser();

  const handleLogout = () => {
    authController.handleLogout();
    navigate('/login');
  };

  if (!user) return null;

  const initials = user.name
    .split(' ')
    .map((n) => n[0])
    .join('')
    .toUpperCase()
    .slice(0, 2);

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold">Hồ sơ của tôi</h1>
        <p className="text-muted-foreground mt-1">Thông tin tài khoản cá nhân</p>
      </div>

      <Card className="max-w-2xl">
        <CardHeader>
          <div className="flex items-center gap-4">
            <Avatar className="w-16 h-16">
              <AvatarFallback className="bg-primary text-primary-foreground text-xl">
                {initials}
              </AvatarFallback>
            </Avatar>

            <div>
              <CardTitle>{user.name}</CardTitle>
              <CardDescription>Giáo viên / Người tạo bài thi</CardDescription>
            </div>
          </div>
        </CardHeader>

        <CardContent className="space-y-6">

          <div className="space-y-4">
            <div className="flex items-center gap-3 p-4 bg-muted rounded-lg">
              <User className="w-5 h-5 text-muted-foreground" />
              <div>
                <p className="text-sm text-muted-foreground">Họ tên</p>
                <p className="font-medium">{user.name}</p>
              </div>
            </div>

            <div className="flex items-center gap-3 p-4 bg-muted rounded-lg">
              <Mail className="w-5 h-5 text-muted-foreground" />
              <div>
                <p className="text-sm text-muted-foreground">Email</p>
                <p className="font-medium">{user.email}</p>
              </div>
            </div>
          </div>

          <Button variant="destructive" onClick={handleLogout} className="w-full">
            <LogOut className="w-4 h-4 mr-2" />
            Đăng xuất
          </Button>

        </CardContent>
      </Card>
    </div>
  );
}

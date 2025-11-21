import { useNavigate } from "react-router-dom";
import { User, Mail, LogOut } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  CardDescription,
} from "@/components/ui/card";
import { useState } from "react";

export default function Profile() {
  const navigate = useNavigate();

  // Tạm tạo user giả lập
  const [user] = useState({
    name: "Nguyen Van A",
    email: "nguyenvana@example.com",
    avatar: "https://i.pravatar.cc/150?img=3", // tạm avatar
  });

  const handleLogout = () => {
    // tạm redirect về login
    navigate("/login");
  };

  if (!user) return null;

  const initials = user.name
    .split(" ")
    .map((n) => n[0])
    .join("")
    .toUpperCase()
    .slice(0, 2);

  return (
    <div className="space-y-6 p-4 max-w-3xl mx-auto">
      <div>
        <h1 className="text-3xl font-bold">Hồ sơ của tôi</h1>
        <p className="text-gray-500 mt-1">Thông tin tài khoản cá nhân</p>
      </div>

      <Card className="max-w-2xl">
        <CardHeader>
          <div className="flex items-center gap-4">
            <img
              src={user.avatar}
              alt="avatar"
              className="w-16 h-16 rounded-full object-cover"
            />
            <div>
              <CardTitle>{user.name}</CardTitle>
              <CardDescription>Giáo viên / Người tạo bài thi</CardDescription>
            </div>
          </div>
        </CardHeader>

        <CardContent className="space-y-6">
          <div className="space-y-4">
            <div className="flex items-center gap-3 p-4 bg-gray-100 rounded-lg">
              <User className="w-5 h-5 text-gray-400" />
              <div>
                <p className="text-sm text-gray-500">Họ tên</p>
                <p className="font-medium">{user.name}</p>
              </div>
            </div>

            <div className="flex items-center gap-3 p-4 bg-gray-100 rounded-lg">
              <Mail className="w-5 h-5 text-gray-400" />
              <div>
                <p className="text-sm text-gray-500">Email</p>
                <p className="font-medium">{user.email}</p>
              </div>
            </div>
          </div>

          <Button
            variant="destructive"
            onClick={handleLogout}
            className="w-full"
          >
            <LogOut className="w-4 h-4 mr-2" />
            Đăng xuất
          </Button>
        </CardContent>
      </Card>
    </div>
  );
}

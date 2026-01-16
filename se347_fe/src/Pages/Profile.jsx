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
import { useContext, useState } from "react";
import { AppContext } from "@/App";

export default function Profile() {
  const navigate = useNavigate();
  const appContext = useContext(AppContext);
  const user = appContext.currentUserProfile;

  const handleLogout = () => {
    // tạm redirect về login
    navigate("/login");
  };

  return (
    <div className="space-y-6 w-full">
      <div>
        <h1 className="text-3xl font-bold">Hồ sơ của tôi</h1>
        <p className="text-gray-500 mt-1">Thông tin tài khoản cá nhân</p>
      </div>

      {user ? (
        <Card className="max-w-2xl mx-auto">
          <CardHeader>
            <div className="flex items-center gap-4">
              <img
                src={user.avatar}
                alt="avatar"
                className="w-16 h-16 rounded-full object-cover"
              />
              <div>
                <CardTitle>
                  {(user.lastName ?? "No Last Name") +
                    " " +
                    (user.firstName ?? "No First Name")}
                </CardTitle>
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
                  <p className="font-medium">
                    {(user.lastName ?? "No Last Name") +
                      " " +
                      (user.firstName ?? "No First Name")}
                  </p>
                </div>
              </div>

              <div className="flex items-center gap-3 p-4 bg-gray-100 rounded-lg">
                <Mail className="w-5 h-5 text-gray-400" />
                <div>
                  <p className="text-sm text-gray-500">Email</p>
                  <p className="font-medium">{user.email ?? "No Email"}</p>
                </div>
              </div>
            </div>

            <Button
              variant="destructive"
              onClick={handleLogout}
              className="w-full bg-red-500 text-white hover:bg-red-500/50"
            >
              <LogOut className="w-4 h-4 mr-2" />
              Đăng xuất
            </Button>
          </CardContent>
        </Card>
      ) : (
        <Card className="max-w-2xl mx-auto">
          <CardContent className="space-y-6">
            <div className="space-y-4">
              Vui lòng đăng nhập để xem hồ sơ của bạn.
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

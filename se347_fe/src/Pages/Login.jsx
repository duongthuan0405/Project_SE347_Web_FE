import { useNavigate, Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

import { Home } from "lucide-react";
import { useState } from "react";

export default function Login() {
  const navigate = useNavigate();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  function handleSubmit(e) {
    e.preventDefault(); // ngăn reload trang
    setIsLoading(true);

    // giả lập call API
    setTimeout(() => {
      console.log("Email:", email);
      console.log("Password:", password);
      setIsLoading(false);

      // redirect sau khi login thành công
      navigate("/dashboard");
    }, 1000);
  }
  return (
    <div className="min-h-screen flex justify-center bg-accent p-4">
      <Card className="w-full h-fit max-w-md">
        <Button variant="ghost" onClick={() => navigate("/")} className="pl-0">
          <Home className="mr-2 h-4 w-4" />
          Trang chính
        </Button>

        <CardHeader className="space-y-1 flex flex-col">
          <CardTitle className="text-3xl font-bold text-center">
            <h1 className="text-5xl font-Poppins font-bold h-fit mb-4 bg-linear-to-r from-primary to-primary-hover bg-clip-text text-transparent text-bla">
              MyQuizz
            </h1>
          </CardTitle>
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
                className="focus:outline-none focus:ring-accent-foreground focus:ring-2 bg-black/5 resize-none"
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
                className="focus:outline-none focus:ring-accent-foreground focus:ring-2 bg-black/5 resize-none"
              />
            </div>

            <Button type="submit" className="w-full" disabled={isLoading}>
              {isLoading ? "Đang đăng nhập..." : "Đăng nhập"}
            </Button>
          </form>
        </CardContent>

        <CardFooter className="flex justify-center">
          <p className="text-sm text-muted-foreground">
            Chưa có tài khoản?{" "}
            <Link
              to="/register"
              className="text-primary hover:underline font-medium"
            >
              Đăng ký ngay
            </Link>
          </p>
        </CardFooter>
      </Card>
    </div>
  );
}

import { useEffect, useState } from "react";
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
import { useRegister } from "@/api/data_hooks/authHook";
import StaticClass from "@/static/StaticClass";
import LoadingOverlay from "@/ui/LoadingOverlay";
import toastHelper from "@/helper/toastHelper";

export default function Register() {
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    password: "",
    confirmPassword: "",
  });

  const [formDataError, setFormDataError] = useState({
    firstName: null,
    lastName: null,
    email: null,
    password: null,
    confirmPassword: null,
  });

  // navigate
  const navigate = useNavigate();

  // register hook
  const register = useRegister();
  useEffect(
    function () {
      if (register.isSuccess) {
        navigate("/verify-otp", {
          state: {
            email: formData.email,
          },
        });
      }

      if (register.isError) {
        toastHelper.error(register.error.message);
      }
    },
    [register.data, register.isSuccess, register.isError]
  );

  const handleChange = (e) => {
    setFormData((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));

    if (formDataError[e.target.name] != null) {
      setFormDataError(function (p) {
        return {
          ...p,
          [e.target.name]: null,
        };
      });
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    let isInputError = false;
    if (formData.firstName?.length < 1) {
      isInputError = true;
      setFormDataError(function (p) {
        return {
          ...p,
          firstName: "Tên không được để trống!",
        };
      });
    }

    if (formData.lastName?.length < 1) {
      isInputError = true;
      setFormDataError(function (p) {
        return {
          ...p,
          lastName: "Họ và tên lót không được để trống!",
        };
      });
    }

    if (formData.email?.length < 1) {
      setFormDataError(function (p) {
        isInputError = true;
        return {
          ...p,
          email: "Email không được để trống!",
        };
      });
    } else if (!StaticClass.isValidEmail(formData.email)) {
      isInputError = true;
      setFormDataError(function (p) {
        return {
          ...p,
          email: "Email không hợp lệ!",
        };
      });
    }

    if (formData.password?.length < 1) {
      isInputError = true;
      setFormDataError(function (p) {
        return {
          ...p,
          password: "Mật khẩu không được để trống!",
        };
      });
    } else if (formData.password?.length < 6) {
      setFormDataError(function (p) {
        isInputError = true;
        return {
          ...p,
          password: "Mật khẩu phải có ít nhất 6 ký tự!",
        };
      });
    }

    if (formData.confirmPassword?.length < 1) {
      isInputError = true;
      setFormDataError(function (p) {
        return {
          ...p,
          confirmPassword: "Vui lòng các nhận mật khẩu!",
        };
      });
    }

    if (isInputError) {
      return;
    }

    if (formData.confirmPassword !== formData.password) {
      setFormDataError(function (p) {
        return {
          ...p,
          confirmPassword: "Xác nhận mật khẩu không trùng khớp!",
        };
      });
      return;
    }

    register.mutate({ ...formData });
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-accent p-4">
      {register.isPending && <LoadingOverlay />}
      <Card className="w-full max-w-md">
        <Button variant="ghost" onClick={() => navigate("/")} className="pl-0">
          <Home className="mr-2 h-4 w-4" />
          Trang chính
        </Button>

        <CardHeader className="space-y-1 flex flex-col">
          <CardTitle className="text-3xl font-bold text-center">
            <div className="text-5xl font-Poppins font-bold h-fit mb-4 bg-linear-to-r from-primary to-primary-hover bg-clip-text text-transparent text-bla">
              MyQuizz
            </div>
          </CardTitle>
          <CardDescription className="text-center">
            Đăng ký để tạo bài thi
          </CardDescription>
        </CardHeader>

        <CardContent>
          <form onSubmit={handleSubmit} className="space-y-5">
            <div className="space-y-2">
              <Label htmlFor="lastName">Họ và tên lót</Label>
              <div className="space-y-0.5 relative">
                <Input
                  id="lastName"
                  name="lastName"
                  placeholder="Nguyễn Văn"
                  type="text"
                  value={formData.lastName}
                  onChange={handleChange}
                  className="focus:outline-none focus:ring-accent-foreground focus:ring-2 bg-black/5 resize-none"
                />
                {formDataError.lastName != null && (
                  <Label className="text-[12px] p-0 text-red-500 absolute">
                    {formDataError.lastName}
                  </Label>
                )}
              </div>
            </div>

            <div className="space-y-2">
              <Label htmlFor="name">Tên</Label>
              <div className="space-y-0.5 relative">
                <Input
                  id="firstName"
                  name="firstName"
                  placeholder="A"
                  type="text"
                  value={formData.firstName}
                  onChange={handleChange}
                  className="focus:outline-none focus:ring-accent-foreground focus:ring-2 bg-black/5 resize-none"
                />
                {formDataError.firstName != null && (
                  <Label className="text-[12px] p-0  text-red-500 absolute">
                    {formDataError.firstName}
                  </Label>
                )}
              </div>
            </div>

            <div className="space-y-2">
              <Label htmlFor="email">Email</Label>
              <div className="space-y-0.5 relative">
                <Input
                  id="email"
                  name="email"
                  placeholder="example@gmail.com"
                  value={formData.email}
                  onChange={handleChange}
                  className="focus:outline-none focus:ring-accent-foreground focus:ring-2 bg-black/5 resize-none"
                />
                {formDataError.email != null && (
                  <Label className="text-[12px] p-0  text-red-500 absolute">
                    {formDataError.email}
                  </Label>
                )}
              </div>
            </div>

            <div className="space-y-2">
              <Label htmlFor="password">Mật khẩu</Label>
              <div className="space-y-0.5 relative">
                <Input
                  id="password"
                  name="password"
                  type="password"
                  value={formData.password}
                  onChange={handleChange}
                  className="focus:outline-none focus:ring-accent-foreground focus:ring-2 bg-black/5 resize-none"
                />
                {formDataError.password != null && (
                  <Label className="text-[12px] p-0  text-red-500 absolute">
                    {formDataError.password}
                  </Label>
                )}
              </div>
            </div>

            <div className="space-y-2">
              <Label htmlFor="confirmPassword">Nhập lại mật khẩu</Label>
              <div className="space-y-0.5 relative">
                <Input
                  id="confirmPassword"
                  name="confirmPassword"
                  type="password"
                  value={formData.confirmPassword}
                  onChange={handleChange}
                  className="focus:outline-none focus:ring-accent-foreground focus:ring-2 bg-black/5 resize-none"
                />
                {formDataError.confirmPassword != null && (
                  <Label className="text-[12px] p-0  text-red-500 absolute">
                    {formDataError.confirmPassword}
                  </Label>
                )}
              </div>
            </div>

            <Button
              type="submit"
              className="w-full mt-2 bg-accent-foreground hover:bg-accent-foreground/70"
              disabled={register.isPending}
            >
              Đăng ký
            </Button>
          </form>
        </CardContent>

        <CardFooter className="flex justify-center">
          <p className="text-sm text-muted-foreground">
            Đã có tài khoản?{" "}
            <Link
              to="/login"
              className="text-primary hover:underline font-medium"
            >
              Đăng nhập
            </Link>
          </p>
        </CardFooter>
      </Card>
    </div>
  );
}

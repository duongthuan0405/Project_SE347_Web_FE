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
import { useContext, useEffect, useState } from "react";
import { useLogin } from "@/api/data_hooks/authHook";
import toastHelper from "@/helper/toastHelper";
import { AppContext } from "@/App";
import LoadingOverlay from "@/ui/LoadingOverlay";

export default function Login() {
  // navigate
  const navigate = useNavigate();

  // context
  const appContext = useContext(AppContext);

  // form data
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  const [formDataError, setFormDataError] = useState({
    email: null,
    password: null,
  });

  // onChange input for auth
  function handleOnChange(e) {
    setFormData(function (p) {
      return {
        ...p,
        [e.target.name]: e.target.value,
      };
    });

    if (formDataError[e.target.name] != null) {
      setFormDataError(function (p) {
        return {
          ...p,
          [e.target.name]: null,
        };
      });
    }
  }

  // login hook
  const login = useLogin();
  useEffect(
    function () {
      if (login.isSuccess) {
        toastHelper.success("Đăng nhập thành công!");
        appContext.setIsLogin(true);
        navigate("/");
      }

      if (login.isError) {
        appContext.setIsLogin(false);
        toastHelper.error(login.error.message);
      }
    },
    [login.data, login.isSuccess, login.isError]
  );

  // submit login
  function handleSubmit(e) {
    e.preventDefault();

    let isError = false;
    if (formData.email?.length < 1) {
      isError = true;
      setFormDataError(function (p) {
        return {
          ...p,
          email: "Vui lòng nhập email!",
        };
      });
    }

    if (formData.password?.length < 1) {
      isError = true;
      setFormDataError(function (p) {
        return {
          ...p,
          password: "Vui lòng nhập mật khẩu!",
        };
      });
    }

    if (isError) {
      return;
    }

    login.mutate(formData);
  }

  return (
    <div className="min-h-screen flex justify-center bg-accent p-4">
      {login.isPending && <LoadingOverlay />}
      <Card className="w-full h-fit max-w-md">
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
            Đăng nhập để quản lý bài thi
          </CardDescription>
        </CardHeader>

        <CardContent>
          <form onSubmit={handleSubmit} className="space-y-5">
            <div className="space-y-2">
              <Label>Email</Label>
              <div className="space-y-0.5 relative">
                <Input
                  type="email"
                  name="email"
                  placeholder="example@email.com"
                  value={formData.email}
                  onChange={(e) => handleOnChange(e)}
                  className="focus:outline-none focus:ring-accent-foreground focus:ring-2 bg-black/5 resize-none"
                />
                {formDataError.email != null && (
                  <Label className="text-[12px] p-0 text-red-500 absolute">
                    {formDataError.email}
                  </Label>
                )}
              </div>
            </div>

            <div className="space-y-2">
              <Label>Mật khẩu</Label>
              <div className="space-y-0.5 relative">
                <Input
                  type="password"
                  value={formData.password}
                  name="password"
                  onChange={(e) => handleOnChange(e)}
                  className="focus:outline-none focus:ring-accent-foreground focus:ring-2 bg-black/5 resize-none"
                />
                {formDataError.password != null && (
                  <Label className="text-[12px] p-0 text-red-500 absolute">
                    {formDataError.password}
                  </Label>
                )}
              </div>
            </div>

            <Button
              type="submit"
              className="w-full mt-2 bg-accent-foreground hover:bg-accent-foreground/70"
            >
              Đăng nhập
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

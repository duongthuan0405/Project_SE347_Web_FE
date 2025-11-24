import { useEffect, useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
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
import { useVerifyOTP } from "@/api/data_hooks/authHook";
import LoadingOverlay from "@/ui/LoadingOverlay";
import toastHelper from "@/helper/toastHelper";

export default function VerifyOTP() {
  // location
  const location = useLocation();
  const navigate = useNavigate();

  // verifyOTP hook
  const verifyOTP = useVerifyOTP();
  useEffect(
    function () {
      if (verifyOTP.isSuccess) {
        toastHelper.success("Đăng ký thành công!");
        navigate("/login");
      }
      if (verifyOTP.isError) {
        toastHelper.error(verifyOTP.error.message);
      }
    },
    [verifyOTP.data, verifyOTP.isSuccess, verifyOTP.isError]
  );

  const [formData, setFormData] = useState({
    email: location.state.email,
    otp: "",
  });

  const [formDataError, setFormDataError] = useState({
    otp: null,
  });

  const handleChange = function (e) {
    setFormData(function (prev) {
      return {
        ...prev,
        [e.target.name]: e.target.value,
      };
    });

    if (formDataError[e.target.name] != null) {
      setFormDataError(function (prev) {
        return {
          ...prev,
          [e.target.name]: null,
        };
      });
    }
  };

  const handleSubmit = function (e) {
    e.preventDefault();
    if (formData.otp?.length < 1) {
      setFormDataError(function (prev) {
        return {
          ...prev,
          otp: "Vui lòng nhập mã OTP!",
        };
      });
      return;
    }

    verifyOTP.mutate(formData);
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-accent p-4">
      {verifyOTP.isPending && <LoadingOverlay />}
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
            Vui lòng xác nhận email với mã OTP vừa được gửi
          </CardDescription>
        </CardHeader>

        <CardContent>
          <form
            onSubmit={(e) => {
              handleSubmit(e);
            }}
            className="space-y-5"
          >
            <div className="space-y-2">
              <Label htmlFor="email">Email</Label>
              <div className="space-y-0.5 relative">
                <Input
                  readOnly={true}
                  id="email"
                  name="email"
                  value={formData.email}
                  className="focus:outline-none focus:ring-accent-foreground focus:ring-2 bg-black/5 resize-none"
                />
              </div>
            </div>

            <div className="space-y-2">
              <Label htmlFor="otp">Nhập mã OTP</Label>
              <div className="space-y-0.5 relative">
                <Input
                  id="otp"
                  name="otp"
                  value={formData.confirmPassword}
                  onChange={handleChange}
                  className="focus:outline-none focus:ring-accent-foreground focus:ring-2 bg-black/5 resize-none"
                />
                {formDataError.otp != null && (
                  <Label className="text-[12px] p-0  text-red-500 absolute">
                    {formDataError.otp}
                  </Label>
                )}
              </div>
            </div>

            <Button type="submit" className="w-full mt-2" disabled={false}>
              Xác nhận
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

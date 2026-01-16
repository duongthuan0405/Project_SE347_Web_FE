import { useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { Loader2 } from "lucide-react"; // Import icon loading

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import publicQuizService from "@/api/services/publicQuizService";
import toastHelper from "@/helper/toastHelper";

export default function QuizInputInfo() {
  const { id } = useParams();
  const navigate = useNavigate();

  // 1. Thêm state loading
  const [isSubmitting, setIsSubmitting] = useState(false);

  const [info, setInfo] = useState({
    name: "",
    studentId: "",
    email: "",
    className: "",
    accessCode: "",
  });

  const handleNext = async () => {
    try {
      setIsSubmitting(true); // 2. Bắt đầu loading

      const res = await publicQuizService.startQuiz(id, info);

      navigate(`/take/${id}/${res.participationId}`);
    } catch (error) {
      const msg = error.data.errors
        ? Object.values(error.data.errors).flat().join("\n")
        : error.data.message;
      toastHelper.error(msg);
    } finally {
      setIsSubmitting(false); // 4. Tắt loading dù thành công hay thất bại
    }
  };

  return (
    <div className="min-h-screen flex justify-center bg-accent p-4">
      <Card className="w-full h-fit max-w-lg">
        <CardHeader>
          <CardTitle>Thông tin thí sinh</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          {/* Các trường Input giữ nguyên, chỉ thêm disabled khi đang load nếu muốn */}
          <div className="space-y-2">
            <Label>Họ và tên</Label>
            <Input
              disabled={isSubmitting}
              value={info.name}
              onChange={(e) => setInfo({ ...info, name: e.target.value })}
              className="bg-gray-200"
            />
          </div>

          <div className="space-y-2">
            <Label>Mã học sinh</Label>
            <Input
              disabled={isSubmitting}
              value={info.studentId}
              onChange={(e) => setInfo({ ...info, studentId: e.target.value })}
              className="bg-gray-200"
            />
          </div>

          <div className="space-y-2">
            <Label>Lớp</Label>
            <Input
              disabled={isSubmitting}
              value={info.className}
              onChange={(e) => setInfo({ ...info, className: e.target.value })}
              className="bg-gray-200"
            />
          </div>

          <div className="space-y-2">
            <Label>Email</Label>
            <Input
              disabled={isSubmitting}
              type="email"
              value={info.email}
              onChange={(e) => setInfo({ ...info, email: e.target.value })}
              className="bg-gray-200"
            />
          </div>

          <div className="space-y-2">
            <Label>Mật khẩu bài thi</Label>
            <Input
              disabled={isSubmitting}
              type="text"
              value={info.accessCode}
              onChange={(e) => setInfo({ ...info, accessCode: e.target.value })}
              className="bg-gray-200"
            />
          </div>

          <Button
            className="w-full"
            // 5. Disabled nút khi đang load hoặc thiếu thông tin
            disabled={
              isSubmitting ||
              !info.name ||
              !info.studentId ||
              !info.className ||
              !info.email ||
              !info.accessCode
            }
            onClick={handleNext}
          >
            {/* 6. Hiển thị icon spinner khi đang loading */}
            {isSubmitting ? (
              <>
                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                Đang xử lý...
              </>
            ) : (
              "Tiếp theo"
            )}
          </Button>
        </CardContent>
      </Card>
    </div>
  );
}

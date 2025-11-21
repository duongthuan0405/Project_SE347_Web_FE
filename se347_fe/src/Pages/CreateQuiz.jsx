import { ArrowLeft } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { useState } from "react";
import { Switch } from "@/components/ui/switch";

export default function CreateQuiz() {
  const [formData, setFormData] = useState({
    title: "",
    description: "",
    duration: 30, // mặc định 30 phút
    totalScore: 100, // mặc định 100 điểm
    startTime: "",
    endTime: "",
    showResultsAfterSubmit: true,
    sendResultEmail: false,
  });

  const isLoading = false;

  return (
    <div className="space-y-6">
      <div className="flex items-center gap-4">
        <Button variant="ghost" onClick={() => navigate("/dashboard")}>
          <ArrowLeft className="w-4 h-4 mr-2" />
          Quay lại
        </Button>
        <div>
          <h1 className="text-3xl font-bold">Tạo bài thi mới</h1>
          <p className="text-muted-foreground mt-1">
            Điền thông tin cho bài thi của bạn
          </p>
        </div>
      </div>

      <Card className="bg-black/20">
        <CardHeader>
          <CardTitle>Thông tin bài thi</CardTitle>
          <CardDescription>Các thông tin cơ bản về bài thi</CardDescription>
        </CardHeader>

        <CardContent>
          <form onSubmit={() => console.log("click")} className="space-y-6">
            <div className="space-y-2">
              <Label htmlFor="title">Tiêu đề bài thi *</Label>
              <Input
                id="title"
                name="title"
                placeholder="Ví dụ: Kiểm tra Toán học - Chương 1"
                value={formData.title}
                onChange={(e) =>
                  setFormData((prev) => ({ ...prev, title: e.target.value }))
                }
                required
                className="focus:outline-none focus:ring-accent-foreground focus:ring-2 bg-white"
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="description">Mô tả</Label>
              <Textarea
                id="description"
                name="description"
                placeholder="Mô tả ngắn gọn về nội dung bài thi"
                value={formData.description}
                onChange={(e) =>
                  setFormData((prev) => ({
                    ...prev,
                    description: e.target.value,
                  }))
                }
                rows={3}
                className="focus:outline-none focus:ring-accent-foreground focus:ring-2 bg-white resize-none"
              />
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="duration">Thời lượng (phút) *</Label>
                <Input
                  id="duration"
                  name="duration"
                  type="number"
                  min="1"
                  value={formData.duration}
                  onChange={(e) =>
                    setFormData((prev) => ({
                      ...prev,
                      duration: e.target.value,
                    }))
                  }
                  required
                  className="focus:outline-none focus:ring-accent-foreground focus:ring-2 bg-white"
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="totalScore">Tổng điểm *</Label>
                <Input
                  id="totalScore"
                  name="totalScore"
                  type="number"
                  min="1"
                  value={formData.totalScore}
                  onChange={(e) =>
                    setFormData((prev) => ({
                      ...prev,
                      totalScore: e.target.value,
                    }))
                  }
                  required
                  className="focus:outline-none focus:ring-accent-foreground focus:ring-2 bg-white"
                />
              </div>
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="startTime">Thời gian bắt đầu</Label>
                <Input
                  id="startTime"
                  name="startTime"
                  type="datetime-local"
                  value={formData.startTime}
                  onChange={(e) =>
                    setFormData((prev) => ({
                      ...prev,
                      startTime: e.target.value,
                    }))
                  }
                  className="focus:outline-none focus:ring-accent-foreground focus:ring-2 bg-white"
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="endTime">Thời gian kết thúc</Label>
                <Input
                  id="endTime"
                  name="endTime"
                  type="datetime-local"
                  value={formData.endTime}
                  onChange={(e) =>
                    setFormData((prev) => ({
                      ...prev,
                      endTime: e.target.value,
                    }))
                  }
                  className="focus:outline-none focus:ring-accent-foreground focus:ring-2 bg-white"
                />
              </div>
            </div>

            <div className="flex items-center justify-between">
              <div className="space-y-0.5">
                <Label>Hiển thị kết quả sau khi nộp</Label>
                <p className="text-sm text-muted-foreground">
                  Học sinh sẽ thấy điểm và đáp án ngay sau khi nộp bài
                </p>
              </div>
              <Switch
                checked={formData.showResultsAfterSubmit}
                onChanged={(checked) =>
                  setFormData((prev) => ({
                    ...prev,
                    showResultsAfterSubmit: checked,
                  }))
                }
              />
            </div>

            <div className="flex items-center justify-between">
              <div className="space-y-0.5">
                <Label>Gửi kết quả qua email</Label>
                <p className="text-sm text-muted-foreground">
                  Tự động gửi email thông báo kết quả cho học sinh
                </p>
              </div>
              <Switch
                checked={formData.sendResultEmail}
                onCheckedChange={(checked) =>
                  setFormData((prev) => ({ ...prev, sendResultEmail: checked }))
                }
              />
            </div>

            <div className="flex gap-4">
              <Button type="submit" disabled={isLoading}>
                {isLoading ? "Đang lưu..." : "Lưu bài thi"}
              </Button>
              <Button
                type="button"
                variant="outline"
                onClick={() => navigate("/dashboard")}
              >
                Hủy
              </Button>
            </div>
          </form>
        </CardContent>
      </Card>
    </div>
  );
}

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
import { use, useEffect, useState } from "react";
import { Switch } from "@/components/ui/switch";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { useCreateQuiz } from "@/api/data_hooks/quizHook";
import toastHelper from "@/helper/toastHelper";
import LoadingOverlay from "@/ui/LoadingOverlay";

export default function CreateQuiz() {
  // show correct answers mode options
  const showCorrectAnswersMode = {
    NEVER: {
      id: "Never",
      name: "Không bao giờ",
    },
    IMMEDIATELY: {
      id: "Immediately",
      name: "Sau khi nộp bài",
    },
    AFTER_DUE_TIME: {
      id: "AfterDueTime",
      name: "Sau khi kết thúc bài thi",
    },

    asArray() {
      return Object.values(this).filter((prop) => typeof prop !== "function");
    },
  };

  // isOpen state for SHOW CORRECT ANSWER dropdown menu
  const [
    isOpenDropdownShowCorrectAnswers,
    setIsOpenDropdownShowCorrectAnswers,
  ] = useState(false);

  // create quiz hook
  const createQuiz = useCreateQuiz();
  useEffect(
    function () {
      if (createQuiz.isSuccess) {
        toastHelper.success("Tạo bài thi thành công!");
      }

      if (createQuiz.isError) {
        toastHelper.error(createQuiz.error.message);
      }
    },
    [createQuiz.isSuccess, createQuiz.isError, createQuiz.data]
  );

  const [formData, setFormData] = useState({
    title: "",
    description: "",
    duration: 30, // mặc định 30 phút
    startTime: "",
    endTime: "",
    showScoreAfterSubmit: false,
    sendResultEmail: false,
    shuffleQuestions: false,
    shuffleAnswers: false,
    showCorrectAfterSubmit: showCorrectAnswersMode.NEVER,
    maxTimeAttempts: 1,
  });

  // submit add quiz
  function handleOnSubmit(e) {
    e.preventDefault();

    createQuiz.mutate(formData);
  }

  return (
    <div className="space-y-6">
      {createQuiz.isPending && <LoadingOverlay />}
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
          <form onSubmit={(e) => handleOnSubmit(e)} className="space-y-6">
            <div className="space-y-2">
              <Label htmlFor="title">
                Tiêu đề bài thi{" "}
                <span className="text-red-500 font-bold">*</span>
              </Label>
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
                <Label htmlFor="duration">
                  Thời lượng (phút){" "}
                  <span className="text-red-500 font-bold">*</span>
                </Label>
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
                <Label htmlFor="duration">
                  Số lần làm bài tối đa{" "}
                  <span className="text-red-500 font-bold">*</span>
                </Label>
                <Input
                  id="maxTimeAttempts"
                  name="maxTimeAttempts"
                  type="integer"
                  min="1"
                  value={formData.maxTimeAttempts}
                  onChange={(e) =>
                    setFormData((prev) => ({
                      ...prev,
                      maxTimeAttempts: e.target.value,
                    }))
                  }
                  required
                  className="focus:outline-none focus:ring-accent-foreground focus:ring-2 bg-white"
                />
              </div>

              {/* <div className="space-y-2">
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
              </div> */}
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="startTime">
                  Thời gian bắt đầu{" "}
                  <span className="text-red-500 font-bold">*</span>
                </Label>
                <Input
                  required
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
                <Label htmlFor="endTime">
                  Thời gian kết thúc{" "}
                  <span className="text-red-500 font-bold">*</span>
                </Label>
                <Input
                  id="endTime"
                  name="endTime"
                  required
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

            <div className="grid grid-cols-2 gap-4">
              <div className="flex items-center justify-between w-fit space-x-10">
                <div className="space-y-0.5">
                  <Label>Hiển thị điểm sau khi nộp</Label>
                  <p className="text-sm text-muted-foreground">
                    Học sinh sẽ thấy điểm ngay sau khi nộp bài
                  </p>
                </div>
                <Switch
                  checked={formData.showScoreAfterSubmit}
                  onChange={(checked) =>
                    setFormData((prev) => ({
                      ...prev,
                      showScoreAfterSubmit: checked,
                    }))
                  }
                />
              </div>

              <div className="flex items-center justify-between w-fit space-x-10">
                <div className="space-y-0.5">
                  <Label>Gửi kết quả qua email</Label>
                  <p className="text-sm text-muted-foreground">
                    Tự động gửi email thông báo kết quả cho học sinh
                  </p>
                </div>
                <Switch
                  checked={formData.sendResultEmail}
                  onChange={(checked) =>
                    setFormData((prev) => ({
                      ...prev,
                      sendResultEmail: checked,
                    }))
                  }
                />
              </div>
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div className="flex items-center justify-between w-fit space-x-10">
                <div className="space-y-0.5">
                  <Label>Xáo trộn câu hỏi</Label>
                  <p className="text-sm text-muted-foreground">
                    Câu hỏi sẽ được hiển thị theo thứ tự ngẫu nhiên cho mỗi học
                    sinh
                  </p>
                </div>
                <Switch
                  checked={formData.shuffleQuestions}
                  onChange={(checked) =>
                    setFormData((prev) => ({
                      ...prev,
                      shuffleQuestions: checked,
                    }))
                  }
                />
              </div>

              <div className="flex items-center justify-between w-fit space-x-10">
                <div className="space-y-0.5">
                  <Label>Xáo trộn đáp án ở mỗi câu hỏi</Label>
                  <p className="text-sm text-muted-foreground">
                    Đáp án trong mỗi câu hỏi sẽ được hiển thị theo thứ tự ngẫu
                    nhiên
                  </p>
                </div>
                <Switch
                  checked={formData.shuffleAnswers}
                  onChange={(checked) =>
                    setFormData((prev) => ({
                      ...prev,
                      shuffleAnswers: checked,
                    }))
                  }
                />
              </div>
            </div>

            <div className="flex items-center justify-between w-fit space-x-10">
              <div className="space-y-0.5">
                <Label>Xem đáp án sau khi nộp</Label>
                <p className="text-sm text-muted-foreground">
                  Học sinh sẽ thấy đáp án sau khi nộp bài
                </p>
              </div>
              <DropdownMenu>
                <DropdownMenuTrigger
                  onClick={() => setIsOpenDropdownShowCorrectAnswers(true)}
                >
                  <Input
                    readOnly
                    value={formData.showCorrectAfterSubmit.name}
                    className="w-[200px] text-center cursor-pointer focus:outline-none bg-white"
                  />
                </DropdownMenuTrigger>

                <DropdownMenuContent
                  className="border-accent-foreground border-2 rounded-md"
                  open={isOpenDropdownShowCorrectAnswers}
                  setOpen={setIsOpenDropdownShowCorrectAnswers}
                >
                  {showCorrectAnswersMode.asArray().map((mode) => (
                    <DropdownMenuItem
                      key={mode.id}
                      item={mode}
                      className="w-[200px] text-center cursor-pointer focus:outline-none  bg-white"
                      onSelect={function (option) {
                        setFormData(function (p) {
                          return {
                            ...p,
                            showCorrectAfterSubmit: option,
                          };
                        });
                        setIsOpenDropdownShowCorrectAnswers(false);
                      }}
                    >
                      {mode.name}
                    </DropdownMenuItem>
                  ))}
                </DropdownMenuContent>
              </DropdownMenu>
            </div>

            <div className="flex gap-4">
              <Button type="submit">Lưu bài thi</Button>
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

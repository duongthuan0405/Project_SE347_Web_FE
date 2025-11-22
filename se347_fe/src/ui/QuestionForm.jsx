import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { RadioGroup, RadioItem } from "@/components/ui/radio-group";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

// Fake services
const questionService = {
  create: async (quizId, data) => {
    console.log("Tạo câu hỏi mới:", quizId, data);
    return { success: true, data: { id: Math.random() } };
  },
  update: async (id, data) => {
    console.log("Cập nhật câu hỏi:", id, data);
    return { success: true };
  },
};

// Fake toast
const toast = ({ title, description, variant }) => {
  console.log("TOAST", { title, description, variant });
};

export function QuestionForm({
  quizId = "quiz-123",
  question = null,
  onSuccess = () => {},
  onCancel = () => {},
}) {
  const [isLoading, setIsLoading] = useState(false);
  const [formData, setFormData] = useState({
    content: "",
    options: ["", "", "", ""],
    correctOption: 0,
    score: 1,
  });

  useEffect(() => {
    if (question) {
      setFormData({
        content: question.content,
        options: question.options,
        correctOption: question.correctOption,
        score: question.score,
      });
    }
  }, [question]);

  const handleOptionChange = (index, value) => {
    const newOptions = [...formData.options];
    newOptions[index] = value;
    setFormData((prev) => ({ ...prev, options: newOptions }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);

    const result = question
      ? await questionService.update(question.id, formData)
      : await questionService.create(quizId, formData);

    if (result.success) {
      toast({
        title: question ? "Cập nhật thành công" : "Thêm câu hỏi thành công",
        description: "Câu hỏi đã được lưu",
      });
      onSuccess?.(formData);
    } else {
      toast({
        title: "Lỗi",
        description: "Không thể lưu câu hỏi",
        variant: "destructive",
      });
    }

    setIsLoading(false);
  };

  return (
    <Card className="bg-black/5">
      <CardHeader>
        <CardTitle>
          {question ? "Chỉnh sửa câu hỏi" : "Thêm câu hỏi mới"}
        </CardTitle>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="space-y-2">
            <Label>Nội dung câu hỏi *</Label>
            <Textarea
              id="content"
              value={formData.content}
              onChange={(e) =>
                setFormData((prev) => ({ ...prev, content: e.target.value }))
              }
              required
              rows={3}
              className="resize-none  focus:outline-none focus:ring-accent-foreground focus:ring-2 bg-white"
            />
          </div>

          <div className="flex flex-col space-y-2">
            <Label>Các đáp án *</Label>
            <RadioGroup
              name="f"
              className="w-[600px] flex flex-col space-y-5"
              currentSelectedValue={formData.correctOption}
              onChange={function (value) {
                setFormData(function (p) {
                  return {
                    ...p,
                    correctOption: Number(value),
                  };
                });
              }}
            >
              {formData.options.map((option, index) => (
                <RadioItem value={index} className="w-full">
                  <Input
                    value={option}
                    onChange={(e) => handleOptionChange(index, e.target.value)}
                    required
                    className="flex-1 focus:outline-none focus:ring-accent-foreground focus:ring-2 bg-white w-full"
                  />
                </RadioItem>
              ))}
            </RadioGroup>
          </div>

          <div className="space-y-2">
            <Label htmlFor="score">Điểm *</Label>
            <Input
              id="score"
              type="number"
              min="1"
              value={formData.score}
              onChange={(e) =>
                setFormData((prev) => ({
                  ...prev,
                  score: Number(e.target.value),
                }))
              }
              required
              className="flex-1 focus:outline-none focus:ring-accent-foreground focus:ring-2 bg-white w-32"
            />
          </div>

          <div className="flex gap-4">
            <Button type="submit" disabled={isLoading}>
              {isLoading ? "Đang lưu..." : "Lưu câu hỏi"}
            </Button>
            <Button type="button" variant="outline" onClick={onCancel}>
              Hủy
            </Button>
          </div>
        </form>
      </CardContent>
    </Card>
  );
}

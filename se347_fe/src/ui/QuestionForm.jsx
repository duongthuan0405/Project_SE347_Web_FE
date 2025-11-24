import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { RadioGroup, RadioItem } from "@/components/ui/radio-group";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

export function QuestionForm({
  question = null,
  onSuccess = () => {},
  onCancel = () => {},
}) {
  const [isLoading, setIsLoading] = useState(false);

  const [formData, setFormData] = useState(null);

  useEffect(
    function () {
      if (!question) {
        setFormData({
          id: null,
          content: "",

          answers: Array(4)
            .fill(null)
            .map(function (item, index) {
              return { id: null, content: "", isCorrectAnswer: index === 0 };
            }),

          score: 1,
        });
      } else {
        setFormData({
          id: question.id,
          content: question.content,
          answers: question.answers, // {id, content, isCorrectAnswer}
          score: question.score,
        });
      }
    },
    [question]
  );

  const handleOptionChange = (index, value) => {
    let newOptions = [...formData.answers];
    newOptions = newOptions.map(function (option, i) {
      if (index === i) {
        return {
          ...option,
          content: value,
        };
      } else return option;
    });
    setFormData((prev) => ({ ...prev, answers: newOptions }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    onSuccess?.(formData);
  };

  if (!formData) {
    return <></>;
  }

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
              value={formData?.content ?? ""}
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
              name={formData.id ?? "new_question"}
              className="w-[600px] flex flex-col space-y-5"
              currentSelectedValue={Math.max(
                0,
                formData.answers?.findIndex((answer) => answer.isCorrectAnswer)
              )}
              onChange={function (value) {
                setFormData(function (p) {
                  return {
                    ...p,
                    answers: p.answers.map(function (ans, index) {
                      if (index === Number(value)) {
                        return { ...ans, isCorrectAnswer: true };
                      } else {
                        return { ...ans, isCorrectAnswer: false };
                      }
                    }),
                  };
                });
              }}
            >
              {formData.answers?.map((option, index) => (
                <RadioItem key={index} value={index} className="w-full">
                  <Input
                    value={option.content}
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

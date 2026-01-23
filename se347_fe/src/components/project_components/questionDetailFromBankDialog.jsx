import { use, useEffect, useState } from "react";
import questionBankService from "@/api/services/questionBankService";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Badge } from "../ui/badge";
import { Button } from "../ui/button";
import { Edit } from "lucide-react";
import {
  Dialog,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogFooter,
} from "@/components/ui/dialog";
import { Label } from "../ui/label";
import { Textarea } from "../ui/textarea";
import { RadioGroup, RadioItem } from "../ui/radio-group";
import { Input } from "../ui/input";
import quizService from "@/api/services/quizService";
import toastHelper from "@/helper/toastHelper";

export default function QuestionDetailFromBankDialog({
  isOpen,
  onClose,
  setClose,
  questionId,
}) {
  const [currentQuestion, setCurrentQuestion] = useState(null);
  const [isEditing, setIsEditing] = useState(false);
  const [formData, setFormData] = useState(null);
  const [isLoading, setIsLoading] = useState(false);

  console.log(isOpen, questionId);
  useEffect(() => {
    if (questionId) {
      const fetch = async function () {
        try {
          const res =
            await questionBankService.getDetailQuestionFromBank(questionId);
          setCurrentQuestion(res);
        } catch (error) {}
      };

      fetch();
    }
  }, [questionId]);

  useEffect(
    function () {
      if (!currentQuestion) {
        setFormData({
          id: null,
          content: "",

          answers: Array(4)
            .fill(null)
            .map(function (item, index) {
              return { id: null, content: "", isCorrectAnswer: index === 0 };
            }),

          points: 1,
        });
      } else {
        setFormData({
          id: currentQuestion.id,
          content: currentQuestion.content,
          answers: currentQuestion.answers, // {id, content, isCorrectAnswer}
          points: currentQuestion.points,
        });
      }
    },
    [currentQuestion],
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

  const onCancel = function () {
    setIsEditing(false);
  };

  const handleOnSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    try {
      await questionBankService.updateQuestionInBank(questionId, formData);
      toastHelper.success("Cập nhật câu hỏi thành công!");
      setClose(true);
    } catch (error) {
      toastHelper.error(error.message);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <Dialog
      isOpen={isOpen}
      onClose={() => {
        setIsEditing(false);
        onClose();
      }}
      className="w-[70vw] max-w-3xl"
    >
      {!isEditing && (
        <div className="">
          <DialogHeader className="flex flex-col items-start">
            <div className="flex items-center space-x-5 mb-5">
              <div className="w-fit items-stretch">
                <div className="flex items-center gap-2">
                  <Badge className="text-[16px]">
                    {currentQuestion?.points} điểm
                  </Badge>
                </div>
              </div>

              <div className="flex gap-2 justify-center">
                <Button
                  variant="ghost"
                  onClick={() => {
                    setIsEditing(true);
                  }}
                  className="py-1 px-0 h-full"
                >
                  <Edit className="w-full h-full text-primary" />
                </Button>
              </div>
            </div>

            <DialogTitle className="text-lg">
              {currentQuestion?.content}
            </DialogTitle>

            <div className="space-y-2 w-full">
              {currentQuestion?.answers.map(function (option, optIndex) {
                return (
                  <div
                    key={optIndex}
                    className={`p-3 rounded-lg ${
                      option.isCorrectAnswer
                        ? "bg-success/10 border-success"
                        : "bg-white"
                    }`}
                  >
                    <span className="font-medium mr-2">
                      {String.fromCharCode(65 + optIndex)}.
                    </span>
                    {option.content}

                    {option.isCorrectAnswer && (
                      <Badge className="ml-2 bg-success text-white">
                        Đáp án đúng
                      </Badge>
                    )}
                  </div>
                );
              })}
            </div>
          </DialogHeader>
        </div>
      )}

      {isEditing && (
        <Card className="bg-black/5">
          <CardHeader>
            <CardTitle>Chỉnh sửa câu hỏi từ ngân hàng</CardTitle>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleOnSubmit} className="space-y-6">
              <div className="space-y-2">
                <Label htmlFor="content">Nội dung câu hỏi *</Label>
                <Textarea
                  id="content"
                  value={formData?.content ?? ""}
                  onChange={(e) =>
                    setFormData((prev) => ({
                      ...prev,
                      content: e.target.value,
                    }))
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
                    formData.answers?.findIndex(
                      (answer) => answer.isCorrectAnswer,
                    ),
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
                        onChange={(e) =>
                          handleOptionChange(index, e.target.value)
                        }
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
                  value={formData.points}
                  onChange={(e) =>
                    setFormData((prev) => ({
                      ...prev,
                      points: Number(e.target.value),
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
      )}
    </Dialog>
  );
}

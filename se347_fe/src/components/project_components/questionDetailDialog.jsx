import { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import { X, Edit, Save, Loader2 } from "lucide-react";
import questionBankService from "@/api/services/questionBankService";
import toastHelper from "@/helper/toastHelper";

export default function QuestionDetailDialog({
  isOpen,
  onClose,
  question,
  onUpdated,
}) {
  const [isEditing, setIsEditing] = useState(false);
  const [localQuestion, setLocalQuestion] = useState(null);
  const [isPending, setIsPending] = useState(false);

  useEffect(() => {
    if (isOpen && question) {
      setLocalQuestion({ ...question });
      setIsEditing(false);
    }
  }, [isOpen, question]);

  if (!isOpen || !localQuestion) return null;

  const handleSave = async () => {
    try {
      setIsPending(true);
      await questionBankService.updateQuestion(localQuestion.id, {
        content: localQuestion.content,
        points: localQuestion.score,
        category: localQuestion.category,
        answers: localQuestion.answers,
      });
      toastHelper.success("Cập nhật câu hỏi thành công");
      setIsEditing(false);
      onUpdated?.();
    } catch (err) {
      toastHelper.error(err.message);
    } finally {
      setIsPending(false);
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
      <div
        className="absolute inset-0 bg-black/60"
        onClick={!isPending ? onClose : undefined}
      />

      <div className="relative bg-[#f8fafc] w-full max-w-3xl rounded-2xl shadow-xl overflow-hidden flex flex-col">
        {/* Header */}
        <div className="p-6 bg-accent-foreground text-white flex justify-between items-center">
          <h2 className="text-xl font-bold">
            {isEditing ? "Chỉnh sửa câu hỏi" : "Chi tiết câu hỏi"}
          </h2>
          <Button
            variant="ghost"
            size="icon"
            onClick={onClose}
            disabled={isPending}
            className="text-white"
          >
            <X />
          </Button>
        </div>

        {/* Body */}
        <div className="p-6 overflow-y-auto">
          <InternalQuestionForm
            question={localQuestion}
            onUpdate={setLocalQuestion}
            isDisabled={!isEditing || isPending}
          />
        </div>

        {/* Footer */}
        <div className="p-6 border-t bg-white flex justify-end gap-3">
          {!isEditing ? (
            <Button onClick={() => setIsEditing(true)}>
              <Edit className="w-4 h-4 mr-2" />
              Chỉnh sửa
            </Button>
          ) : (
            <Button onClick={handleSave} disabled={isPending}>
              {isPending ? (
                <>
                  <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                  Đang lưu
                </>
              ) : (
                <>
                  <Save className="w-4 h-4 mr-2" />
                  Lưu thay đổi
                </>
              )}
            </Button>
          )}
        </div>
      </div>
    </div>
  );
}

function InternalQuestionForm({ question, onSubmit }) {
  const [content, setContent] = useState(question?.content ?? "");

  return (
    <form
      className="space-y-4"
      onSubmit={(e) => {
        e.preventDefault();
        onSubmit({ content });
      }}
    >
      <div>
        <label className="text-sm font-medium">Nội dung câu hỏi</label>
        <textarea
          className="w-full border rounded p-2"
          value={content}
          onChange={(e) => setContent(e.target.value)}
        />
      </div>

      <Button type="submit">Lưu</Button>
    </form>
  );
}

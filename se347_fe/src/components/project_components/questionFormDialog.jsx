import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { RadioGroup, RadioItem } from "@/components/ui/radio-group";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { X, Plus, Save, Trash2, Loader2 } from "lucide-react"; // Thêm Loader2 để làm icon loading
import questionBankService from "@/api/services/questionBankService";

// --- SUB-COMPONENT NỘI BỘ (InternalQuestionForm) ---
const InternalQuestionForm = ({ question, onUpdate, isDisabled }) => {
  const [localData, setLocalData] = useState(question);

  useEffect(() => {
    setLocalData(question);
  }, [question.id]);

  const handleChange = (updates) => {
    const newData = { ...localData, ...updates };
    setLocalData(newData);
    onUpdate(newData);
  };

  const handleOptionChange = (index, value) => {
    const newAnswers = localData.answers.map((option, i) =>
      i === index ? { ...option, content: value } : option,
    );
    handleChange({ answers: newAnswers });
  };

  return (
    <Card className="bg-white border border-slate-200 shadow-sm">
      <CardContent className="pt-6">
        <div
          className={`space-y-6 ${
            isDisabled ? "opacity-50 pointer-events-none" : ""
          }`}
        >
          <div className="space-y-2">
            <Label className="font-semibold text-slate-700">
              Nội dung câu hỏi *
            </Label>
            <Textarea
              value={localData.content || ""}
              onChange={(e) => handleChange({ content: e.target.value })}
              required
              rows={3}
              disabled={isDisabled}
              className="resize-none focus:ring-2 bg-gray-100 border-slate-200"
              placeholder="Nhập nội dung câu hỏi..."
            />
          </div>

          <div className="flex flex-col space-y-3">
            <Label className="font-semibold text-slate-700">Các đáp án *</Label>
            <RadioGroup
              name={`radio_${localData.id}`}
              className="w-full flex flex-col space-y-4"
              currentSelectedValue={localData.answers?.findIndex(
                (a) => a.isCorrectAnswer,
              )}
              onChange={(value) => {
                const newAnswers = localData.answers.map((ans, index) => ({
                  ...ans,
                  isCorrectAnswer: index === Number(value),
                }));
                handleChange({ answers: newAnswers });
              }}
            >
              {localData.answers?.map((option, index) => (
                <RadioItem
                  key={index}
                  value={index}
                  className="w-full flex items-center gap-2"
                >
                  <Input
                    value={option.content}
                    onChange={(e) => handleOptionChange(index, e.target.value)}
                    required
                    disabled={isDisabled}
                    placeholder={`Đáp án ${index + 1}`}
                    className="flex-1 bg-gray-100 border-slate-200"
                  />
                </RadioItem>
              ))}
            </RadioGroup>
          </div>

          <div className="space-y-2">
            <Label className="font-semibold text-slate-700">Điểm số *</Label>
            <Input
              type="number"
              min="1"
              value={localData.score}
              disabled={isDisabled}
              onChange={(e) => handleChange({ score: Number(e.target.value) })}
              className="w-28 bg-gray-100 font-bold border-slate-200"
            />
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

// --- COMPONENT CHÍNH (QuestionFormDialog) ---
export function QuestionFormDialog({
  isOpen,
  onClose,
  editingQuestion,
  setClose,
}) {
  const [category, setCategory] = useState("");
  const [formList, setFormList] = useState([]);
  const [isPending, setIsPending] = useState(false); // Thêm state quản lý loading

  const createBaseQuestion = (id = Date.now() + Math.random()) => ({
    id,
    content: "",
    answers: Array(4)
      .fill(null)
      .map((_, i) => ({ id: null, content: "", isCorrectAnswer: i === 0 })),
    score: 1,
  });

  useEffect(() => {
    if (isOpen) {
      if (editingQuestion) {
        setFormList([{ ...editingQuestion }]);
        setCategory(editingQuestion.category || "");
      } else {
        setFormList([createBaseQuestion()]);
        setCategory("");
      }
      setIsPending(false); // Reset pending khi mở modal
    }
  }, [isOpen, editingQuestion]);

  if (!isOpen) return null;

  const handleUpdateItem = (index, updatedData) => {
    setFormList((prevList) => {
      const newList = [...prevList];
      newList[index] = updatedData;
      return newList;
    });
  };

  const handleFinalSubmit = async () => {
    if (!category.trim()) {
      alert("Vui lòng nhập Danh mục chung!");
      return;
    }

    for (let i = 0; i < formList.length; i++) {
      const q = formList[i];
      if (!q.content || q.content.trim() === "") {
        alert(`Câu hỏi số ${i + 1} đang bị trống nội dung!`);
        return;
      }
      if (q.answers.some((ans) => !ans.content || ans.content.trim() === "")) {
        alert(`Câu hỏi số ${i + 1} có đáp án chưa nhập nội dung!`);
        return;
      }
    }

    const finalData = formList.map((item) => ({ ...item, category }));
    const questions = finalData.map((q) => ({
      content: q.content,
      points: q.score,
      category: category,
      answers: q.answers.map((a) => ({
        id: "",
        content: a.content,
        isCorrectAnswer: a.isCorrectAnswer,
      })),
    }));

    try {
      setIsPending(true); // Bắt đầu loading
      await questionBankService.createManyQuestions(questions);
      onClose();
    } catch (error) {
      console.error("Lỗi khi tạo câu hỏi:", error);
      alert("Có lỗi xảy ra, vui lòng thử lại.");
    } finally {
      setIsPending(false); // Kết thúc loading
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
      <div
        className="absolute inset-0 bg-black/60 backdrop-blur-sm"
        onClick={!isPending ? onClose : undefined}
      />

      <div className="relative bg-[#f8fafc] w-full max-w-4xl max-h-[95vh] overflow-hidden rounded-2xl shadow-2xl border flex flex-col">
        {/* Header */}
        <div className="p-6 flex justify-between items-center sticky top-0 z-20 shadow-sm bg-accent-foreground text-white font-bold">
          <h2 className="text-2xl font-bold">
            {editingQuestion ? "Chỉnh sửa câu hỏi" : "Thêm mới câu hỏi"}
          </h2>
          <Button
            variant="ghost"
            size="icon"
            onClick={onClose}
            disabled={isPending}
            className="rounded-full text-white hover:bg-white/20"
          >
            <X className="w-6 h-6" />
          </Button>
        </div>

        {/* Thân Modal */}
        <div className="p-8 overflow-y-auto flex-1 space-y-10 custom-scrollbar">
          <div
            className={`bg-white p-6 rounded-xl border border-slate-200 shadow-sm ${
              isPending ? "opacity-50 pointer-events-none" : ""
            }`}
          >
            <Label className="font-bold text-primary italic text-xs uppercase tracking-widest">
              Danh mục chung *
            </Label>
            <Input
              value={category}
              onChange={(e) => setCategory(e.target.value)}
              disabled={isPending}
              className="mt-2 bg-gray-100 h-12 border-slate-200 font-medium"
              placeholder="Ví dụ: Kiểm tra cuối kỳ, Tiếng Anh..."
            />
          </div>

          <div className="space-y-12">
            {formList.map((formData, index) => (
              <div key={formData.id}>
                <div className="flex justify-between items-center mb-4">
                  <span className="bg-slate-900 text-white px-3 py-1 rounded text-xs font-bold uppercase tracking-wider shadow-sm">
                    CÂU HỎI SỐ {index + 1}
                  </span>
                  {!editingQuestion && formList.length > 1 && (
                    <Button
                      variant="ghost"
                      disabled={isPending}
                      className="text-red-500 h-8 text-xs font-bold hover:bg-red-50"
                      onClick={() =>
                        setFormList(
                          formList.filter((f) => f.id !== formData.id),
                        )
                      }
                    >
                      <Trash2 className="w-4 h-4 mr-2" /> XÓA Ô NÀY
                    </Button>
                  )}
                </div>
                <InternalQuestionForm
                  question={formData}
                  onUpdate={(data) => handleUpdateItem(index, data)}
                  isDisabled={isPending} // Truyền prop disable vào form con
                />
              </div>
            ))}
          </div>

          {!editingQuestion && (
            <Button
              variant="outline"
              disabled={isPending}
              className="w-full border-dashed border-2 py-12 bg-white hover:bg-slate-50 transition-all rounded-xl shadow-sm"
              onClick={() => setFormList([...formList, createBaseQuestion()])}
            >
              <div className="flex items-center gap-2">
                <Plus className="w-6 h-6 text-primary" />
                <span className="font-bold text-slate-700 uppercase text-xs tracking-widest">
                  Thêm ô nhập câu hỏi tiếp theo
                </span>
              </div>
            </Button>
          )}
        </div>

        {/* Footer */}
        <div className="p-6 border-t bg-white flex justify-end gap-4 sticky bottom-0 z-20 shadow-inner">
          <Button
            variant="ghost"
            onClick={onClose}
            disabled={isPending}
            className="px-10 h-12 font-medium text-slate-600 hover:bg-slate-50"
          >
            Hủy bỏ
          </Button>
          <Button
            className="bg-primary px-12 font-bold h-12 min-w-[220px] text-white rounded-xl shadow-lg hover:opacity-90 active:scale-95 transition-all flex items-center justify-center"
            onClick={handleFinalSubmit}
            disabled={isPending}
          >
            {isPending ? (
              <>
                <Loader2 className="w-5 h-5 mr-3 animate-spin" />
                Đang xử lý...
              </>
            ) : (
              <>
                <Save className="w-5 h-5 mr-3" />
                {editingQuestion
                  ? "Cập nhật thay đổi"
                  : `Lưu tất cả (${formList.length} câu)`}
              </>
            )}
          </Button>
        </div>
      </div>
    </div>
  );
}

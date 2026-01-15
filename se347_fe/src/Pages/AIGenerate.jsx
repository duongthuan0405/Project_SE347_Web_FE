import { useState } from "react";
import { Upload, Sparkles, Loader2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import aiQuizService from "@/api/services/aiQuizService";
import toastHelper from "@/helper/toastHelper";

export default function AIGenerate() {
  const [isGenerating, setIsGenerating] = useState(false);

  // Quản lý thông tin nhập liệu
  const [formData, setFormData] = useState({
    file: null,
    numberOfQuestions: "",
    category: "",
    additionalInstructions: "",
  });

  const handleFileUpload = (e) => {
    const selectedFile = e.target.files?.[0];
    if (selectedFile) {
      setFormData((prev) => ({ ...prev, file: selectedFile }));
    }
  };

  const handleInputChange = (e) => {
    const { id, value } = e.target;
    setFormData((prev) => ({ ...prev, [id]: value }));
  };

  // Kiểm tra điều kiện tối thiểu để kích hoạt nút Gen
  const canGenerate =
    formData.file &&
    formData.category.trim() !== "" &&
    formData.numberOfQuestions > 0 &&
    !isGenerating;

  const handleOnGenerate = async () => {
    if (!canGenerate) return;

    setIsGenerating(true);

    try {
      await aiQuizService.generateQuestions({
        file: formData.file,
        numberOfQuestions: formData.numberOfQuestions,
        category: formData.category,
        additionalInstructions: formData.additionalInstructions,
      });
      toastHelper.success("AI tạo câu hỏi thành công");
    } catch (error) {
      toastHelper.error(error.message);
    } finally {
      setIsGenerating(false);
    }
  };

  return (
    <div className="space-y-6 max-w-4xl mx-auto p-4">
      <div>
        <h1 className="text-3xl font-bold tracking-tight">
          Tạo câu hỏi bằng AI
        </h1>
        <p className="text-muted-foreground mt-1">
          Tải lên tài liệu để hệ thống tự động phân tích và tạo bộ câu hỏi
        </p>
      </div>

      <Card className="overflow-hidden border-2">
        <CardHeader className="bg-slate-50/50">
          <CardTitle className="flex items-center gap-2">
            <Upload className="w-5 h-5 text-primary" />
            Thiết lập tài liệu nguồn
          </CardTitle>
          <CardDescription>
            Yêu cầu đầy đủ: File (PDF/DOCX), Danh mục và Số lượng câu hỏi
          </CardDescription>
        </CardHeader>
        <CardContent className="p-6">
          <div className="space-y-4">
            {/* Vùng chọn File */}
            <div
              className={`border-2 border-dashed rounded-xl p-8 text-center transition-colors ${
                formData.file
                  ? "border-green-500 bg-green-50/10"
                  : "border-muted hover:border-primary/50"
              }`}
            >
              <input
                id="file-upload"
                type="file"
                accept=".pdf,.docx"
                onChange={handleFileUpload}
                className="hidden"
              />
              <label htmlFor="file-upload" className="cursor-pointer">
                <Sparkles
                  className={`w-10 h-10 mx-auto mb-3 ${
                    formData.file ? "text-green-500" : "text-primary"
                  }`}
                />
                <p className="font-semibold text-sm italic">
                  {formData.file
                    ? `Đã chọn: ${formData.file.name}`
                    : "Nhấn để chọn hoặc kéo thả tài liệu"}
                </p>
                <p className="text-xs text-muted-foreground mt-1">
                  Hỗ trợ PDF, DOCX tối đa 10MB
                </p>
              </label>
            </div>

            {/* Các ô nhập liệu */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-6">
              <div className="space-y-2">
                <label className="text-sm font-medium">
                  Số câu hỏi <span className="text-red-500">*</span>
                </label>
                <input
                  id="numberOfQuestions"
                  type="number"
                  min="1"
                  max="50"
                  value={formData.numberOfQuestions}
                  onChange={handleInputChange}
                  placeholder="Ví dụ: 10"
                  className="w-full px-4 py-2 rounded-lg border bg-background focus:ring-2 focus:ring-primary outline-none transition-all"
                />
              </div>

              <div className="space-y-2">
                <label className="text-sm font-medium">
                  Danh mục <span className="text-red-500">*</span>
                </label>
                <input
                  id="category"
                  type="text"
                  value={formData.category}
                  onChange={handleInputChange}
                  placeholder="Ví dụ: Lịch sử, IT..."
                  className="w-full px-4 py-2 rounded-lg border bg-background focus:ring-2 focus:ring-primary outline-none transition-all"
                />
              </div>
            </div>

            <div className="space-y-2">
              <label className="text-sm font-medium">
                Chỉ dẫn thêm cho AI (Tùy chọn)
              </label>
              <textarea
                id="additionalInstructions"
                value={formData.additionalInstructions}
                onChange={handleInputChange}
                placeholder="Ví dụ: Tập trung vào chương 1, tạo câu hỏi khó..."
                rows={3}
                className="w-full px-4 py-2 rounded-lg border bg-background focus:ring-2 focus:ring-primary outline-none transition-all resize-none"
              />
            </div>

            <Button
              onClick={handleOnGenerate}
              disabled={!canGenerate}
              className="w-full h-12 text-lg font-bold shadow-lg"
            >
              {isGenerating ? (
                <>
                  <Loader2 className="mr-2 h-5 w-5 animate-spin" />
                  Đang phân tích dữ liệu...
                </>
              ) : (
                <>
                  <Sparkles className="mr-2 h-5 w-5" />
                  Tạo câu hỏi ngay
                </>
              )}
            </Button>
          </div>
        </CardContent>
      </Card>

      {/* Thông tin hỗ trợ */}
      <Card className="bg-muted/30">
        <CardContent className="p-4 flex items-start gap-3">
          <div className="bg-primary/10 p-2 rounded-full">
            <Sparkles className="w-4 h-4 text-primary" />
          </div>
          <div className="text-sm">
            <p className="font-semibold">Mẹo nhỏ:</p>
            <ul className="list-disc ml-4 mt-1 text-muted-foreground space-y-1">
              <li>
                Tài liệu càng rõ ràng, câu hỏi AI sinh ra càng chất lượng.
              </li>
              <li>
                Bạn có thể yêu cầu AI đặt câu hỏi theo phong cách cụ thể trong ô
                "Chỉ dẫn".
              </li>
            </ul>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}

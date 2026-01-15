import React, { useState, useMemo, useEffect } from "react";
import { Search, Folder, X, Check, Circle, Loader2 } from "lucide-react"; // Thêm Loader2
import { useGetMyQuestionBank } from "@/api/data_hooks/questionBankHook";
import quizQuestionService from "@/api/services/quizQuestionService";
import toastHelper from "@/helper/toastHelper";

const QuestionBankModal = ({ isOpen, onClose, currentQuizId }) => {
  const [searchTerm, setSearchTerm] = useState("");
  const [categorySearch, setCategorySearch] = useState("");
  const [selectedIds, setSelectedIds] = useState([]);
  const [isSubmitting, setIsSubmitting] = useState(false); // State quản lý loading khi nhấn Import

  const getQuestionsFromBank = useGetMyQuestionBank(searchTerm, categorySearch);

  // Logic chọn/bỏ chọn câu hỏi
  const toggleSelect = (id) => {
    setSelectedIds((prev) =>
      prev.includes(id) ? prev.filter((i) => i !== id) : [...prev, id]
    );
  };

  // Hàm xử lý Import với Loading
  const handleImport = async () => {
    if (selectedIds.length === 0) return;

    setIsSubmitting(true); // Bắt đầu loading
    try {
      await quizQuestionService.addQuestionsToQuiz(currentQuizId, selectedIds);
      toastHelper.success("Thêm câu hỏi thành công");

      // Reset state và đóng modal

      onClose();
    } catch (err) {
      toastHelper.error(err.message || "Có lỗi xảy ra khi thêm câu hỏi");
    } finally {
      setIsSubmitting(false); // Tắt loading dù thành công hay thất bại
      setSelectedIds([]);
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-[999] flex items-center justify-center bg-white/40 backdrop-blur-md transition-opacity">
      <div className="flex h-[600px] w-full max-w-2xl flex-col overflow-hidden rounded-2xl border border-gray-200 bg-white shadow-2xl">
        {/* HEADER */}
        <div className="flex items-center justify-between px-6 py-4 bg-accent-foreground text-white">
          <div>
            <h2 className="text-xl font-bold">Ngân hàng câu hỏi</h2>
            <p className="text-sm font-medium opacity-90">
              Chọn câu hỏi để thêm vào đề thi
            </p>
          </div>
          <button
            onClick={onClose}
            disabled={isSubmitting} // Không cho đóng khi đang submit
            className="rounded-full p-2 hover:bg-white/10 transition-colors text-white"
          >
            <X size={20} />
          </button>
        </div>

        {/* BỘ LỌC */}
        <div className="grid grid-cols-2 gap-4 border-b border-gray-200 bg-gray-50/50 p-4">
          <div className="relative text-gray-900">
            <Search
              className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400"
              size={18}
            />
            <input
              type="text"
              placeholder="Tìm nội dung câu hỏi..."
              className="w-full rounded-lg border border-gray-300 bg-white py-2 pl-10 pr-4 text-sm outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 transition-all"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>
          <div className="relative text-gray-900">
            <Folder
              className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400"
              size={18}
            />
            <input
              type="text"
              placeholder="Lọc danh mục..."
              className="w-full rounded-lg border border-gray-300 bg-white py-2 pl-10 pr-4 text-sm outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 transition-all"
              value={categorySearch}
              onChange={(e) => setCategorySearch(e.target.value)}
            />
          </div>
        </div>

        {/* DANH SÁCH CÂU HỎI */}
        <div className="flex-1 overflow-y-auto bg-white p-2 custom-scrollbar">
          {getQuestionsFromBank.isLoading ? (
            <div className="flex h-full items-center justify-center text-gray-400">
              <Loader2 size={32} className="animate-spin mb-2" />
              <span className="ml-2">Đang tải ngân hàng câu hỏi...</span>
            </div>
          ) : getQuestionsFromBank.data?.length > 0 ? (
            <div className="space-y-1">
              {getQuestionsFromBank.data.map((item) => {
                const isSelected = selectedIds.includes(item.id);
                return (
                  <div
                    key={item.id}
                    onClick={() => !isSubmitting && toggleSelect(item.id)}
                    className={`group flex items-center justify-between rounded-xl border p-4 cursor-pointer transition-all duration-200 ${
                      isSelected
                        ? "border-blue-500 bg-blue-50/50 shadow-sm"
                        : "border-transparent hover:bg-gray-50"
                    } ${isSubmitting ? "opacity-50 cursor-not-allowed" : ""}`}
                  >
                    <div className="flex items-start gap-4">
                      <div
                        className={`mt-0.5 flex h-5 w-5 shrink-0 items-center justify-center rounded-md border transition-all ${
                          isSelected
                            ? "bg-blue-600 border-blue-600"
                            : "border-gray-300 bg-white group-hover:border-blue-400"
                        }`}
                      >
                        {isSelected && (
                          <Check
                            size={14}
                            className="text-white"
                            strokeWidth={3}
                          />
                        )}
                      </div>
                      <div>
                        <p
                          className={`text-[15px] leading-relaxed ${
                            isSelected
                              ? "text-blue-900 font-medium"
                              : "text-gray-700"
                          }`}
                        >
                          {item.content}
                        </p>
                        <div className="mt-1 flex items-center gap-3">
                          <span className="text-xs font-mono text-gray-400 uppercase tracking-wider">
                            {item.id}
                          </span>
                          <span className="h-1 w-1 rounded-full bg-gray-300"></span>
                          <span className="text-xs text-gray-500 italic">
                            {item.category}
                          </span>
                        </div>
                      </div>
                    </div>
                    <div className="ml-4 flex-none text-right">
                      <span
                        className={`inline-block rounded-lg px-3 py-1 text-xs font-bold transition-colors ${
                          isSelected
                            ? "bg-blue-600 text-white"
                            : "bg-gray-100 text-gray-600 group-hover:bg-gray-200"
                        }`}
                      >
                        {item.points}đ
                      </span>
                    </div>
                  </div>
                );
              })}
            </div>
          ) : (
            <div className="flex h-full flex-col items-center justify-center text-gray-400 opacity-60">
              <Circle size={48} strokeWidth={1} className="mb-2" />
              <p>Không có dữ liệu phù hợp</p>
            </div>
          )}
        </div>

        {/* FOOTER */}
        <div className="flex items-center justify-between border-t border-gray-200 bg-gray-50 px-6 py-4">
          <span className="text-sm font-medium text-gray-500">
            Đã chọn:{" "}
            <span className="text-blue-600 font-bold">
              {selectedIds.length}
            </span>{" "}
            câu hỏi
          </span>
          <div className="flex gap-3">
            <button
              onClick={onClose}
              disabled={isSubmitting}
              className="px-5 py-2 text-sm font-bold text-gray-600 hover:text-gray-900 transition-colors disabled:opacity-50"
            >
              Hủy bỏ
            </button>
            <button
              disabled={selectedIds.length === 0 || isSubmitting}
              onClick={handleImport}
              className={`flex items-center justify-center min-w-[140px] rounded-lg px-6 py-2 text-sm font-bold text-white shadow-lg transition-all active:scale-95 ${
                selectedIds.length > 0 && !isSubmitting
                  ? "bg-blue-600 hover:bg-blue-700 shadow-blue-200"
                  : "bg-gray-300 cursor-not-allowed shadow-none"
              }`}
            >
              {isSubmitting ? (
                <>
                  <Loader2 size={16} className="animate-spin mr-2" />
                  Đang thêm...
                </>
              ) : (
                "Nhập vào Quiz"
              )}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default QuestionBankModal;

import { Dialog, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";

export default function QuizResultDialog({
  isOpen,
  onClose,
  result,
  onBackHome,
}) {
  if (!result) return null;

  return (
    <Dialog
      isOpen={isOpen}
      onClose={() => {
        onBackHome();
        onClose();
      }}
    >
      <div className="w-[420px] space-y-6 p-6 bg-white rounded-xl">
        <DialogHeader className="space-y-2">
          <DialogTitle className="text-xl text-center">
            Kết quả bài làm
          </DialogTitle>
        </DialogHeader>

        {/* Score */}
        {result.showScore && (
          <div className="flex justify-center">
            <Badge className="text-lg px-4 py-2">{result.message}</Badge>
          </div>
        )}

        {/* Details */}
        <div className="space-y-3 text-sm">
          <div className="flex justify-between">
            <span>Tổng số câu:</span>
            <span className="font-medium">{result.totalQuestions}</span>
          </div>

          <div className="flex justify-between">
            <span>Số câu đúng:</span>
            <span className="font-medium text-success">
              {result.correctAnswers}
            </span>
          </div>

          <div className="flex justify-between">
            <span>Điểm:</span>
            <span className="font-medium">{result.score}</span>
          </div>

          <div className="flex justify-between">
            <span>Thời gian nộp:</span>
            <span className="font-medium">
              {new Date(result.submitTime).toLocaleString("vi-VN")}
            </span>
          </div>
        </div>

        {/* Action */}
        <div className="pt-4">
          <Button className="w-full" onClick={onBackHome}>
            Quay về trang chủ
          </Button>
        </div>
      </div>
    </Dialog>
  );
}

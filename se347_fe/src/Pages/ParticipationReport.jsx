import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { ArrowLeft } from "lucide-react";

import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

import statisticsService from "@/api/services/statisticsService";
import LoadingOverlay from "@/ui/LoadingOverlay";

export default function ParticipationReport() {
  const { participation_id } = useParams();
  const navigate = useNavigate();

  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetch = async () => {
      try {
        const res = await statisticsService.getParticipationDetail(
          participation_id
        );
        setData(res);
      } finally {
        setLoading(false);
      }
    };

    fetch();
  }, [participation_id]);

  if (loading) return <LoadingOverlay />;

  if (!data) {
    return <div className="text-center py-8">Không có dữ liệu</div>;
  }

  return (
    <div className="space-y-6">
      {/* ===== Header ===== */}
      <div className="flex items-center gap-4">
        <Button variant="ghost" onClick={() => navigate(-1)}>
          <ArrowLeft className="w-4 h-4 mr-2" />
          Quay lại
        </Button>

        <div>
          <h1 className="text-3xl font-bold">Chi tiết bài làm</h1>
          <p className="text-muted-foreground mt-1">Báo cáo kết quả làm bài</p>
        </div>
      </div>

      {/* ===== Tổng quan ===== */}
      <div className="grid grid-cols-1 md:grid-cols-3 grid-rows-2 gap-4">
        {/* Tên + MSSV (chiếm 2 hàng) */}
        <Card className="row-span-2">
          <CardHeader>
            <CardTitle className="text-lg">Sinh viên</CardTitle>
          </CardHeader>

          <CardContent className="space-y-2">
            <p className="text-2xl font-bold">{data.fullName}</p>

            <p className="text-sm text-muted-foreground">
              MSSV: {data.studentId}
            </p>

            <p className="text-sm text-muted-foreground">
              Lớp: {data.className}
            </p>
          </CardContent>
        </Card>

        {/* Các ô còn lại */}
        <Stat title="Điểm" value={data.score} />
        <Stat title="Đúng" value={data.correctAnswers} />
        <Stat title="Số câu" value={data.totalQuestions} />
        <Stat
          title="Nộp lúc"
          value={
            data.submitTime
              ? new Date(data.submitTime).toLocaleString("vi-VN")
              : "Chưa nộp"
          }
        />
      </div>

      {/* ===== Chi tiết từng câu ===== */}
      <Card>
        <CardHeader>
          <CardTitle>Chi tiết câu hỏi</CardTitle>
        </CardHeader>

        <CardContent className="space-y-4">
          {data.details.map((d, idx) => (
            <div
              key={idx}
              className="border rounded-lg p-4 bg-black/5 space-y-2"
            >
              <p className="font-medium">
                {idx + 1}. {d.questionContent}
              </p>

              <p>
                <span className="font-semibold">Đáp án chọn: </span>
                <span className="text-muted-foreground">
                  {d.selectedAnswer ?? "Không chọn"}
                </span>
              </p>

              <p>
                <span className="font-semibold">Đáp án đúng: </span>
                <span className="text-green-700">{d.correctAnswer}</span>
              </p>

              <p
                className={`font-semibold ${
                  d.isCorrect ? "text-green-600" : "text-red-500"
                }`}
              >
                {d.isCorrect ? "Đúng" : "Sai"}
              </p>
            </div>
          ))}
        </CardContent>
      </Card>
    </div>
  );
}

/* ===== Stat nhỏ gọn ===== */
function Stat({ title, value }) {
  return (
    <Card>
      <CardContent className="py-4">
        <p className="text-sm text-muted-foreground">{title}</p>
        <p className="text-xl font-semibold mt-1">{value}</p>
      </CardContent>
    </Card>
  );
}

import { GraduationCap, BookOpen, BarChart3, Users } from "lucide-react";
import { Button } from "@/components/ui/button";

export default function Index() {
  return (
    <>
      <div className="min-h-screen bg-linear-to-br from-primary/10 via-accent to-primary/5">
        <div className="max-w-7xl mx-auto px-4 py-16">
          <div className="text-center mb-16">
            <h1 className="text-2xl font-Poppins font-bold mb-4 bg-linear-to-r from-primary to-primary-hover bg-clip-text text-transparent text-bla">
              MyQuizz
            </h1>

            <p className="text-xl text-muted-foreground mb-8">
              Hệ thống quản lý và thi trực tuyến trắc nghiệm
            </p>

            <div className="flex gap-4 justify-center">
              <Button
                size="lg"
                variant="outline"
                onClick={() => navigate("/take-quiz")}
                className="text-xl px-10 py-5 bg-accent-foreground text-white hover:bg-accent-foreground/70"
              >
                Tham gia bài thi
              </Button>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-16 ">
            <div className="bg-card p-6 rounded-xl shadow-sm hover:cursor-pointer hover:scale-105 transition-all duration-200 ease-linear">
              <GraduationCap className="w-12 h-12 text-primary mb-4" />
              <h3 className="text-lg font-semibold mb-2">Tạo bài thi</h3>
              <p className="text-sm text-muted-foreground">
                Tạo và quản lý bài thi dễ dàng với giao diện thân thiện.
              </p>
            </div>

            <div className="bg-card p-6 rounded-xl shadow-sm hover:cursor-pointer hover:scale-105 transition-all duration-200 ease-linear">
              <BookOpen className="w-12 h-12 text-primary mb-4" />
              <h3 className="text-lg font-semibold mb-2">Ngân hàng câu hỏi</h3>
              <p className="text-sm text-muted-foreground">
                Tổ chức câu hỏi theo từng bài thi một cách khoa học.
              </p>
            </div>

            <div className="bg-card p-6 rounded-xl shadow-sm hover:cursor-pointer hover:scale-105 transition-all duration-200 ease-linear">
              <BarChart3 className="w-12 h-12 text-primary mb-4" />
              <h3 className="text-lg font-semibold mb-2">Thống kê chi tiết</h3>
              <p className="text-sm text-muted-foreground">
                Xem báo cáo và phân tích kết quả trực quan.
              </p>
            </div>

            <div className="bg-card p-6 rounded-xl shadow-sm hover:cursor-pointer hover:scale-105 transition-all duration-200 ease-linear">
              <Users className="w-12 h-12 text-primary mb-4" />
              <h3 className="text-lg font-semibold mb-2">Mời tham gia</h3>
              <p className="text-sm text-muted-foreground">
                Chia sẻ link bài thi và mời học sinh dễ dàng.
              </p>
            </div>
          </div>

          <div className="bg-card p-12 rounded-xl shadow-sm text-center hover:cursor-pointer">
            <h2 className="text-3xl font-bold mb-4">Sẵn sàng bắt đầu?</h2>
            <p className="text-muted-foreground mb-6">
              Tạo tài khoản miễn phí và trải nghiệm hệ thống hiện đại.
            </p>
            <Button size="lg" onClick={() => navigate("/register")}>
              Đăng ký miễn phí
            </Button>
          </div>
        </div>
      </div>
    </>
  );
}

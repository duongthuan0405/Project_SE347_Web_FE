import { useState } from 'react';
import { Upload, Sparkles } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { useToast } from '@/hooks/use-toast';

export default function AIGenerate() {
  const { toast } = useToast();
  const [isGenerating, setIsGenerating] = useState(false);

  const handleFileUpload = (e) => {
    const file = e.target.files?.[0];
    if (!file) return;

    setIsGenerating(true);
    
    // Mock AI generation
    setTimeout(() => {
      toast({
        title: 'Tạo câu hỏi thành công',
        description: 'Đã tạo 10 câu hỏi từ tài liệu',
      });
      setIsGenerating(false);
    }, 2000);
  };

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold">Tạo câu hỏi bằng AI</h1>
        <p className="text-muted-foreground mt-1">
          Tải lên tài liệu để tự động tạo câu hỏi trắc nghiệm
        </p>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Tải lên tài liệu</CardTitle>
          <CardDescription>
            Hỗ trợ các định dạng: PDF, DOCX, TXT
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="border-2 border-dashed border-muted rounded-lg p-12 text-center">
            <Sparkles className="w-12 h-12 text-primary mx-auto mb-4" />
            <p className="text-lg font-medium mb-2">Tải lên tài liệu</p>
            <p className="text-sm text-muted-foreground mb-4">
              AI sẽ tự động phân tích và tạo câu hỏi từ nội dung
            </p>
            <label htmlFor="file-upload">
              <Button disabled={isGenerating} asChild>
                <span>
                  <Upload className="w-4 h-4 mr-2" />
                  {isGenerating ? 'Đang xử lý...' : 'Chọn file'}
                </span>
              </Button>
              <input
                id="file-upload"
                type="file"
                className="hidden"
                accept=".pdf,.docx,.txt"
                onChange={handleFileUpload}
                disabled={isGenerating}
              />
            </label>
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Tính năng AI</CardTitle>
        </CardHeader>
        <CardContent>
          <ul className="space-y-2 text-sm text-muted-foreground">
            <li>• Tự động tạo câu hỏi trắc nghiệm từ tài liệu</li>
            <li>• Phân tích nội dung và tạo đáp án hợp lý</li>
            <li>• Đề xuất độ khó phù hợp cho từng câu hỏi</li>
            <li>• Xem trước và chỉnh sửa trước khi thêm vào bài thi</li>
          </ul>
        </CardContent>
      </Card>
    </div>
  );
}

import { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { useToast } from '@/hooks/use-toast';
// CHƯA CÓ BACKEND: comment service
// import { questionService } from "@/service/questionService";

export function QuestionForm({ quizId, question, onSuccess, onCancel }) {
  const { toast } = useToast();
  const [isLoading, setIsLoading] = useState(false);
  const [formData, setFormData] = useState({
    content: '',
    options: ['', '', '', ''],
    correctOption: 0,
    score: 1,
  });

  useEffect(() => {
    if (question) {
      setFormData({
        content: question.content,
        options: question.options,
        correctOption: question.correctOption,
        score: question.score,
      });
    }
  }, [question]);

  const handleOptionChange = (index, value) => {
    const newOptions = [...formData.options];
    newOptions[index] = value;
    setFormData(prev => ({ ...prev, options: newOptions }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);

    const result = question
      ? await questionService.update(question.id, formData)
      : await questionService.create(quizId, formData);

    if (result.success) {
      toast({
        title: question ? 'Cập nhật thành công' : 'Thêm câu hỏi thành công',
        description: 'Câu hỏi đã được lưu',
      });
      onSuccess();
    } else {
      toast({
        title: 'Lỗi',
        description: 'Không thể lưu câu hỏi',
        variant: 'destructive',
      });
    }

    setIsLoading(false);
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle>{question ? 'Chỉnh sửa câu hỏi' : 'Thêm câu hỏi mới'}</CardTitle>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="space-y-2">
            <Label htmlFor="content">Nội dung câu hỏi *</Label>
            <Textarea
              id="content"
              value={formData.content}
              onChange={(e) => setFormData(prev => ({ ...prev, content: e.target.value }))}
              required
              rows={3}
            />
          </div>

          <div className="space-y-4">
            <Label>Các đáp án *</Label>
            <RadioGroup
              value={formData.correctOption.toString()}
              onValueChange={(value) => setFormData(prev => ({ ...prev, correctOption: parseInt(value) }))}
            >
              {formData.options.map((option, index) => (
                <div key={index} className="flex items-center gap-3">
                  <RadioGroupItem value={index.toString()} id={`opt-${index}`} />
                  <Input
                    value={option}
                    onChange={(e) => handleOptionChange(index, e.target.value)}
                    required
                    className="flex-1"
                  />
                </div>
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
              onChange={(e) => setFormData(prev => ({ ...prev, score: Number(e.target.value) }))}
              required
              className="w-32"
            />
          </div>

          <div className="flex gap-4">
            <Button type="submit" disabled={isLoading}>
              {isLoading ? 'Đang lưu...' : 'Lưu câu hỏi'}
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

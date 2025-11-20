import { useState } from 'react';
import { Upload, Mail, Link as LinkIcon } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { useToast } from '@/hooks/use-toast';

export default function Invite() {
  const { toast } = useToast();
  const [isSending, setIsSending] = useState(false);

  const handleFileUpload = (e) => {
    const file = e.target.files?.[0];
    if (!file) return;

    setIsSending(true);

    setTimeout(() => {
      toast({
        title: 'Nhập thành công',
        description: 'Đã nhập 25 học sinh từ file Excel',
      });
      setIsSending(false);
    }, 1500);
  };

  const handleSendInvites = () => {
    setIsSending(true);

    setTimeout(() => {
      toast({
        title: 'Gửi lời mời thành công',
        description: 'Đã gửi email đến 25 học sinh',
      });
      setIsSending(false);
    }, 2000);
  };

  return (
    <div className="space-y-6">

      <div>
        <h1 className="text-3xl font-bold">Mời tham gia bài thi</h1>
        <p className="text-muted-foreground mt-1">
          Chia sẻ link hoặc gửi email mời học sinh
        </p>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Link tham gia</CardTitle>
          <CardDescription>Chia sẻ link này cho học sinh</CardDescription>
        </CardHeader>

        <CardContent className="space-y-4">
          <Label>Link bài thi</Label>

          <div className="flex gap-2">
            <Input value="https://examhub.com/take/quiz123" readOnly className="flex-1" />

            <Button
              variant="outline"
              onClick={() => {
                navigator.clipboard.writeText('https://examhub.com/take/quiz123');
                toast({
                  title: 'Đã sao chép',
                  description: 'Link đã được sao chép',
                });
              }}
            >
              <LinkIcon className="w-4 h-4 mr-2" /> Sao chép
            </Button>
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Nhập danh sách học sinh</CardTitle>
          <CardDescription>Tải lên file Excel</CardDescription>
        </CardHeader>

        <CardContent>
          <div className="border-2 border-dashed border-muted rounded-lg p-8 text-center">
            <Upload className="w-10 h-10 text-primary mx-auto mb-3" />
            <p className="font-medium mb-2">Tải lên file Excel</p>
            <p className="text-sm text-muted-foreground mb-4">
              File phải có các cột: Họ tên, Mã học sinh, Email
            </p>

            <label htmlFor="excel-upload">
              <Button disabled={isSending} asChild>
                <span>
                  <Upload className="w-4 h-4 mr-2" />
                  {isSending ? 'Đang tải...' : 'Chọn file Excel'}
                </span>
              </Button>

              <input
                id="excel-upload"
                type="file"
                className="hidden"
                accept=".xlsx,.xls"
                onChange={handleFileUpload}
                disabled={isSending}
              />
            </label>
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Gửi lời mời qua email</CardTitle>
        </CardHeader>

        <CardContent>
          <Button onClick={handleSendInvites} disabled={isSending}>
            <Mail className="w-4 h-4 mr-2" />
            {isSending ? 'Đang gửi...' : 'Gửi lời mời thi'}
          </Button>
        </CardContent>
      </Card>

    </div>
  );
}

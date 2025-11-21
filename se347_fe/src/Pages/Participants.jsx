import { useEffect, useState } from "react";
import { Users, Plus, Mail, UserCheck, UserX } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import {
  Dialog,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";

export default function Participants() {
  const [participants, setParticipants] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [isOpen, setIsOpen] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
    studentId: "",
    email: "",
  });

  useEffect(() => {
    loadParticipants();
  }, []);

  const loadParticipants = async () => {
    const user = authController.getCurrentUser();
    if (!user) return;

    const data = await participantManagementService.list(user.id);
    setParticipants(data);
    setIsLoading(false);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const user = authController.getCurrentUser();
    if (!user) return;

    const result = await participantManagementService.create(
      { ...formData, status: "not-started", creatorId: user.id },
      user.id
    );

    if (result.success) {
      toast({
        title: "Thêm học viên thành công",
        description: `Đã thêm ${formData.name} vào danh sách`,
      });
      setIsOpen(false);
      setFormData({ name: "", studentId: "", email: "" });
      loadParticipants();
    } else {
      toast({
        title: "Thêm học viên thất bại",
        description: "Email này đã tồn tại trong danh sách",
        variant: "destructive",
      });
    }
  };

  const getStatusBadge = (status) => {
    switch (status) {
      case "completed":
        return (
          <Badge className="bg-success/10 text-success border-success">
            <UserCheck className="w-3 h-3 mr-1" /> Đã hoàn thành
          </Badge>
        );
      case "invited":
        return (
          <Badge variant="outline">
            <Mail className="w-3 h-3 mr-1" /> Đã mời
          </Badge>
        );
      default:
        return (
          <Badge variant="secondary">
            <UserX className="w-3 h-3 mr-1" /> Chưa bắt đầu
          </Badge>
        );
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold">Quản lý học viên</h1>
          <p className="text-muted-foreground mt-1">
            Danh sách học viên có thể tham gia bài thi
          </p>
        </div>

        <Button onClick={() => setIsOpen(true)}>
          <Plus className="w-4 h-4 mr-2" />
          Thêm học viên
        </Button>

        <Dialog isOpen={isOpen} onClose={() => setIsOpen(false)}>
          <DialogHeader>
            <DialogTitle>Thêm học viên mới</DialogTitle>
            <DialogDescription>
              Nhập thông tin học viên để thêm vào danh sách
            </DialogDescription>
          </DialogHeader>

          <form onSubmit={handleSubmit} className="space-y-4 mt-4">
            <div className="space-y-2">
              <Label>Họ tên *</Label>
              <Input
                value={formData.name}
                onChange={(e) =>
                  setFormData((prev) => ({ ...prev, name: e.target.value }))
                }
                required
                className="focus:outline-none focus:ring-accent-foreground focus:ring-2 bg-black/5 resize-none"
              />
            </div>

            <div className="space-y-2">
              <Label>Mã học sinh *</Label>
              <Input
                value={formData.studentId}
                onChange={(e) =>
                  setFormData((prev) => ({
                    ...prev,
                    studentId: e.target.value,
                  }))
                }
                required
                className="focus:outline-none focus:ring-accent-foreground focus:ring-2 bg-black/5 resize-none"
              />
            </div>

            <div className="space-y-2">
              <Label>Email *</Label>
              <Input
                type="email"
                value={formData.email}
                onChange={(e) =>
                  setFormData((prev) => ({ ...prev, email: e.target.value }))
                }
                required
                className="focus:outline-none focus:ring-accent-foreground focus:ring-2 bg-black/5 resize-none"
              />
            </div>

            <div className="flex gap-2 mt-4">
              <Button type="submit">Thêm học viên</Button>
              <Button
                type="button"
                variant="outline"
                onClick={() => setIsOpen(false)}
              >
                Hủy
              </Button>
            </div>
          </form>
        </Dialog>
      </div>

      <Card>
        <CardHeader>
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 bg-primary/10 rounded-full flex items-center justify-center">
              <Users className="w-5 h-5 text-primary" />
            </div>
            <div>
              <CardTitle>Danh sách học viên</CardTitle>
              <CardDescription>
                Tổng số: {participants.length} học viên
              </CardDescription>
            </div>
          </div>
        </CardHeader>

        <CardContent>
          {isLoading ? (
            <div className="text-center py-8 text-muted-foreground">
              Đang tải...
            </div>
          ) : participants.length === 0 ? (
            <div className="text-center py-8 text-muted-foreground">
              Chưa có học viên nào. Thêm học viên để bắt đầu.
            </div>
          ) : (
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Họ tên</TableHead>
                  <TableHead>Mã học sinh</TableHead>
                  <TableHead>Email</TableHead>
                  <TableHead>Trạng thái</TableHead>
                  <TableHead>Ngày thêm</TableHead>
                </TableRow>
              </TableHeader>

              <TableBody>
                {participants.map((p) => (
                  <TableRow key={p.id}>
                    <TableCell className="font-medium">{p.name}</TableCell>
                    <TableCell>{p.studentId}</TableCell>
                    <TableCell>{p.email}</TableCell>
                    <TableCell>{getStatusBadge(p.status)}</TableCell>
                    <TableCell>
                      {new Date(p.createdAt).toLocaleDateString("vi-VN")}
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          )}
        </CardContent>
      </Card>
    </div>
  );
}

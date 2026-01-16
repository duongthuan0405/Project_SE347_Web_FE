import React, { useEffect, useState, useRef } from "react";
import { createPortal } from "react-dom";
import {
  Users,
  Plus,
  Mail,
  UserCheck,
  UserX,
  FileSpreadsheet,
  Upload,
  Loader2,
} from "lucide-react";
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
import { cn } from "@/lib/utils";

// --- 1. CÁC COMPONENT DIALOG BẠN CUNG CẤP ---
function Dialog({ isOpen, onClose, children }) {
  if (!isOpen) return null;
  return createPortal(
    <div className="fixed inset-0 z-50 flex items-center justify-center">
      <div
        className="fixed inset-0 bg-black/50 backdrop-blur-sm"
        onClick={onClose}
      />
      <div className="relative z-10 w-full max-w-lg rounded-lg bg-white p-6 shadow-lg border">
        {children}
      </div>
    </div>,
    document.body
  );
}

function DialogHeader({ className, children, ...props }) {
  return (
    <div
      className={cn("flex flex-col space-y-1.5 text-left mb-4", className)}
      {...props}
    >
      {children}
    </div>
  );
}

function DialogTitle({ className, children, ...props }) {
  return (
    <h3
      className={cn(
        "text-lg font-semibold leading-none tracking-tight",
        className
      )}
      {...props}
    >
      {children}
    </h3>
  );
}

function DialogDescription({ className, children, ...props }) {
  return (
    <p className={cn("text-sm text-gray-500", className)} {...props}>
      {children}
    </p>
  );
}

// --- 2. TÁCH DIALOG THÊM THỦ CÔNG ---
const AddManualDialog = ({
  isOpen,
  onClose,
  onSubmit,
  formData,
  setFormData,
}) => (
  <Dialog isOpen={isOpen} onClose={onClose}>
    <DialogHeader>
      <DialogTitle>Thêm học viên mới</DialogTitle>
      <DialogDescription>
        Nhập thông tin học viên để thêm vào danh sách
      </DialogDescription>
    </DialogHeader>
    <form onSubmit={onSubmit} className="space-y-4">
      <div className="space-y-2">
        <Label>Họ tên *</Label>
        <Input
          value={formData.name}
          onChange={(e) => setFormData((p) => ({ ...p, name: e.target.value }))}
          required
        />
      </div>
      <div className="space-y-2">
        <Label>Mã học sinh *</Label>
        <Input
          value={formData.studentId}
          onChange={(e) =>
            setFormData((p) => ({ ...p, studentId: e.target.value }))
          }
          required
        />
      </div>
      <div className="space-y-2">
        <Label>Email *</Label>
        <Input
          type="email"
          value={formData.email}
          onChange={(e) =>
            setFormData((p) => ({ ...p, email: e.target.value }))
          }
          required
        />
      </div>
      <div className="flex gap-2 mt-6 justify-end">
        <Button type="button" variant="outline" onClick={onClose}>
          Hủy
        </Button>
        <Button type="submit">Xác nhận</Button>
      </div>
    </form>
  </Dialog>
);

// --- 3. TÁCH DIALOG IMPORT EXCEL ---

// --- 4. COMPONENT CHÍNH ---
export default function Participants() {
  const [participants, setParticipants] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [isImporting, setIsImporting] = useState(false);

  const [isManualOpen, setIsManualOpen] = useState(false);
  const [isExcelOpen, setIsExcelOpen] = useState(false);

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
    setParticipants(data || []);
    setIsLoading(false);
  };

  const handleManualSubmit = async (e) => {
    e.preventDefault();
    const user = authController.getCurrentUser();
    const result = await participantManagementService.create(
      { ...formData, status: "not-started", creatorId: user.id },
      user.id
    );
    if (result.success) {
      setIsManualOpen(false);
      setFormData({ name: "", studentId: "", email: "" });
      loadParticipants();
    } else {
      alert("Lỗi: " + (result.message || "Không thể thêm học viên"));
    }
  };

  const handleExcelUpload = async (file, shouldInvite) => {
    const user = authController.getCurrentUser();
    setIsImporting(true);

    const data = new FormData();
    data.append("file", file);
    data.append("shouldSendInvite", shouldInvite);

    try {
      const result = await participantManagementService.importExcel(
        data,
        user.id
      );
      if (result.success) {
        setIsExcelOpen(false);
        loadParticipants();
      } else {
        alert(result.message || "Lỗi khi xử lý file");
      }
    } catch (err) {
      alert("Lỗi kết nối server");
    } finally {
      setIsImporting(false);
    }
  };

  const getStatusBadge = (status) => {
    const map = {
      completed: {
        label: "Đã hoàn thành",
        class: "bg-green-100 text-green-700",
        icon: <UserCheck className="w-3 h-3 mr-1" />,
      },
      invited: {
        label: "Đã mời",
        class: "bg-blue-100 text-blue-700",
        icon: <Mail className="w-3 h-3 mr-1" />,
      },
      default: {
        label: "Chưa bắt đầu",
        class: "bg-gray-100 text-gray-700",
        icon: <UserX className="w-3 h-3 mr-1" />,
      },
    };
    const s = map[status] || map.default;
    return (
      <Badge
        className={cn(s.class, "border-none shadow-none font-normal px-2 py-1")}
      >
        {s.icon} {s.label}
      </Badge>
    );
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold">Quản lý học viên</h1>
          <p className="text-muted-foreground mt-1">
            Danh sách học viên tham gia hệ thống
          </p>
        </div>
        <div className="flex gap-2">
          <Button variant="outline" onClick={() => setIsExcelOpen(true)}>
            <FileSpreadsheet className="w-4 h-4 mr-2" /> Thêm từ .xlsx
          </Button>
          <Button onClick={() => setIsManualOpen(true)}>
            <Plus className="w-4 h-4 mr-2" /> Thêm học viên
          </Button>
        </div>
      </div>

      <AddManualDialog
        isOpen={isManualOpen}
        onClose={() => setIsManualOpen(false)}
        onSubmit={handleManualSubmit}
        formData={formData}
        setFormData={setFormData}
      />

      <ImportExcelDialog
        isOpen={isExcelOpen}
        onClose={() => setIsExcelOpen(false)}
        onUpload={handleExcelUpload}
        isImporting={isImporting}
      />

      <Card>
        <CardHeader>
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 bg-primary/10 rounded-full flex items-center justify-center text-primary">
              <Users className="w-5 h-5" />
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
            <div className="text-center py-10">Đang tải dữ liệu...</div>
          ) : (
            <div className="overflow-x-auto">
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
                  {participants.length === 0 && (
                    <TableRow>
                      <TableCell
                        colSpan={5}
                        className="text-center py-10 text-muted-foreground italic"
                      >
                        Chưa có học viên nào trong danh sách.
                      </TableCell>
                    </TableRow>
                  )}
                </TableBody>
              </Table>
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
}

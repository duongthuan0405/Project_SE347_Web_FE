import { useEffect, useState } from "react";
import {
  Dialog,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogFooter,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

export default function EditProfileDialog({
  open,
  onClose,
  user,
  onSubmit,
  loading = false,
}) {
  const [lastName, setLastName] = useState("");
  const [firstName, setFirstName] = useState("");
  const [avatarFile, setAvatarFile] = useState(null);
  const [avatarPreview, setAvatarPreview] = useState("");

  useEffect(() => {
    if (!open || !user) return;

    setLastName(user.lastName ?? "");
    setFirstName(user.firstName ?? "");
    setAvatarFile(null);
    setAvatarPreview(user.avatar ?? "");
  }, [open, user]);

  const handleAvatarChange = (e) => {
    const file = e.target.files?.[0];
    if (!file) return;

    setAvatarFile(file);
    setAvatarPreview(URL.createObjectURL(file));
  };

  const handleSubmit = () => {
    onSubmit?.({
      lastName,
      firstName,
      imageFile: avatarFile,
    });
  };

  return (
    <Dialog isOpen={open} onClose={onClose}>
      <div className="space-y-5">
        <DialogHeader>
          <DialogTitle>Chỉnh sửa hồ sơ</DialogTitle>
          <DialogDescription>
            Cập nhật thông tin cá nhân của bạn
          </DialogDescription>
        </DialogHeader>

        {/* Avatar */}
        <div className="flex items-center gap-4">
          <img
            src={avatarPreview || "/avatar-placeholder.png"}
            alt="avatar-preview"
            className="w-20 h-20 rounded-full object-cover border"
          />

          <Label
            htmlFor="avatar"
            className="cursor-pointer text-sm text-primary underline"
          >
            Chọn ảnh từ thiết bị
          </Label>

          <Input
            id="avatar"
            type="file"
            accept="image/*"
            className="hidden"
            onChange={handleAvatarChange}
          />
        </div>

        {/* Họ tên lót */}
        <div className="space-y-2">
          <Label>Họ tên lót</Label>
          <Input
            value={lastName}
            onChange={(e) => setLastName(e.target.value)}
            placeholder="Nhập họ tên lót"
          />
        </div>

        {/* Tên */}
        <div className="space-y-2">
          <Label>Tên</Label>
          <Input
            value={firstName}
            onChange={(e) => setFirstName(e.target.value)}
            placeholder="Nhập tên"
          />
        </div>

        <DialogFooter>
          <Button variant="outline" onClick={onClose}>
            Hủy
          </Button>
          <Button onClick={handleSubmit} disabled={loading}>
            {loading ? "Đang lưu..." : "Lưu thay đổi"}
          </Button>
        </DialogFooter>
      </div>
    </Dialog>
  );
}

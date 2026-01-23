import { useState } from "react";
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

export default function ChangePasswordDialog({
  open,
  onClose,
  onSubmit,
  loading = false,
}) {
  const [oldPassword, setOldPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [errors, setErrors] = useState({});

  const validate = () => {
    const err = {};

    if (!oldPassword) err.oldPassword = "Vui lòng nhập mật khẩu cũ";
    if (!newPassword) err.newPassword = "Vui lòng nhập mật khẩu mới";
    else if (newPassword.length < 6)
      err.newPassword = "Mật khẩu mới phải ít nhất 6 ký tự";

    if (!confirmPassword) err.confirmPassword = "Vui lòng xác nhận mật khẩu";
    else if (newPassword !== confirmPassword)
      err.confirmPassword = "Mật khẩu xác nhận không khớp";

    setErrors(err);
    return Object.keys(err).length === 0;
  };

  const handleSubmit = () => {
    if (!validate()) return;

    onSubmit?.({
      oldPassword,
      newPassword,
      confirmPassword,
    });
  };

  return (
    <Dialog isOpen={open} onClose={onClose}>
      <div className="space-y-5">
        <DialogHeader>
          <DialogTitle>Đổi mật khẩu</DialogTitle>
          <DialogDescription>
            Mật khẩu mới phải có ít nhất 6 ký tự
          </DialogDescription>
        </DialogHeader>

        {/* Old password */}
        <div className="space-y-1">
          <Label>Mật khẩu cũ</Label>
          <Input
            type="password"
            value={oldPassword}
            onChange={(e) => setOldPassword(e.target.value)}
          />
          {errors.oldPassword && (
            <p className="text-sm text-red-500">{errors.oldPassword}</p>
          )}
        </div>

        {/* New password */}
        <div className="space-y-1">
          <Label>Mật khẩu mới</Label>
          <Input
            type="password"
            value={newPassword}
            onChange={(e) => setNewPassword(e.target.value)}
          />
          {errors.newPassword && (
            <p className="text-sm text-red-500">{errors.newPassword}</p>
          )}
        </div>

        {/* Confirm password */}
        <div className="space-y-1">
          <Label>Xác nhận mật khẩu</Label>
          <Input
            type="password"
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
          />
          {errors.confirmPassword && (
            <p className="text-sm text-red-500">{errors.confirmPassword}</p>
          )}
        </div>

        <DialogFooter>
          <Button variant="outline" onClick={onClose}>
            Hủy
          </Button>
          <Button onClick={handleSubmit} disabled={loading}>
            {loading ? "Đang xử lý..." : "Đổi mật khẩu"}
          </Button>
        </DialogFooter>
      </div>
    </Dialog>
  );
}

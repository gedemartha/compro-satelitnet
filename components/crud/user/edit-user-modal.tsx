"use client";

import { useEffect, useRef, useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useActionState } from "react";
import { updateUser } from "@/lib/actions"; // Fungsi untuk update produk
import { cn } from "@/lib/utils"; // Untuk className
import { Checkbox } from "@/components/ui/checkbox";

interface EditUserModalProps {
  user: {
    id: string;
    name?: string | null;
    email?: string | null;
    username?: string | null;
    roles?: string[];
    password: string;
  };
  className?: string;
}

export const EditUserModal = ({ user, className }: EditUserModalProps) => {
  const [isOpen, setIsOpen] = useState(false);
  const [selectedRole, setSelectedRole] = useState(user.roles?.[0] || "user"); // Hanya satu role
  const [state, formAction] = useActionState(updateUser, {
    success: false,
    error: undefined,
  });
  const formRef = useRef<HTMLFormElement>(null);

  useEffect(() => {
    if (state.success) {
      setTimeout(() => {
        setIsOpen(false);
        formRef.current?.reset();
      }, 2000);
    }
  }, [state.success]);

  const handleRoleChange = (role: string) => {
    setSelectedRole((prev) => (prev === role ? "" : role)); // Uncheck jika sudah dipilih
  };

  const handleOpenChange = (open: boolean) => {
    setIsOpen(open);
    if (open) {
      state.success = false;
      state.error = {};
    }
  };

  return (
    <Dialog open={isOpen} onOpenChange={handleOpenChange}>
      <DialogTrigger asChild>
        <Button className={cn("p-6", className)}>Edit</Button>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Edit user</DialogTitle>
        </DialogHeader>
        <form
          ref={formRef}
          action={formAction}
          className="mt-4 flex flex-col gap-4"
        >
          <input type="hidden" name="id" value={user.id} />
          <input type="hidden" name="role" value={selectedRole} />
          <div>
            <label htmlFor="name" className="text-sm">
              Name
            </label>
            <Input name="name" defaultValue={user.name ?? ""} required />
          </div>
          <div>
            <label htmlFor="email" className="text-sm">
              Email
            </label>
            <Input
              name="email"
              placeholder="e.g. Sistem Laundry untuk kebutuhan manajemen Laundry"
              defaultValue={user.email ?? ""}
              required
              type="email"
            />
          </div>
          <div>
            <label htmlFor="username" className="text-sm">
              Username
            </label>
            <Input
              name="username"
              defaultValue={user.username ?? ""}
              required
            />
          </div>
          <div>
            <label className="text-sm">Roles</label>
            <div className="flex flex-row items-center gap-5">
              <label className="flex items-center gap-2">
                <Checkbox
                  checked={selectedRole === "admin"}
                  onCheckedChange={() => handleRoleChange("admin")}
                  disabled={selectedRole === "user"}
                />
                <span>Admin</span>
              </label>
              <label className="flex items-center gap-2">
                <Checkbox
                  checked={selectedRole === "user"}
                  onCheckedChange={() => handleRoleChange("user")}
                  disabled={selectedRole === "admin"}
                />
                <span>User</span>
              </label>
            </div>
          </div>

          <div>
            <label htmlFor="password" className="text-sm">
              Password
            </label>
            <Input name="password" required type="password" />
          </div>

          <Button type="submit">Update</Button>
        </form>
        {state.success && (
          <p className="text-green-500">User updated successfully!</p>
        )}
      </DialogContent>
    </Dialog>
  );
};

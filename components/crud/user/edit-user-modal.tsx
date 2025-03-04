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

interface EditUserModalProps {
  user: {
    id: string;
    name?: string | null;
    email?: string | null;
    username?: string | null;
    role: string;
    password: string;
  };
  className?: string;
}

export const EditUserModal = ({ user, className }: EditUserModalProps) => {
  const [isOpen, setIsOpen] = useState(false);
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

  const handleOpenChange = (open: boolean) => {
    setIsOpen(open);
    if (open) {
      state.success = false; // Reset pesan sukses
      state.error = ""; // Reset pesan error
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
            <label htmlFor="role" className="text-sm">
              Role
            </label>
            <Input name="role" defaultValue={user.role} required />
          </div>
          <div>
            <label htmlFor="password" className="text-sm">
              Password
            </label>
            <Input name="password" required />
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

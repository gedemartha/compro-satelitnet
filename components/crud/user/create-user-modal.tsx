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
import { createUser } from "@/lib/actions";
import { cn } from "@/lib/utils"; // Import fungsi cn dari utils.ts

interface CreateUserProps {
  className?: string; // Menambahkan props className
}

export const CreateUserModal = ({ className }: CreateUserProps) => {
  const [isOpen, setIsOpen] = useState(false);
  const [state, formAction] = useActionState(createUser, {
    success: false,
    error: undefined,
  });
  const formRef = useRef<HTMLFormElement>(null); // Untuk mereset form

  // Tutup modal & reset form ketika produk berhasil dibuat
  useEffect(() => {
    if (state.success) {
      setTimeout(() => {
        setIsOpen(false); // Tutup modal setelah 1.5 detik
        formRef.current?.reset(); // Reset form input
      }, 2000);
    }
  }, [state.success]);

  const handleOpenChange = (open: boolean) => {
    setIsOpen(open);
    if (open) {
      state.success = false; // Reset pesan sukses
      state.error = {}; // Reset pesan error
    }
  };

  return (
    <Dialog open={isOpen} onOpenChange={handleOpenChange}>
      <DialogTrigger asChild>
        <Button className={cn("mb-4", className)}>Add User</Button>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Create a New User</DialogTitle>
        </DialogHeader>
        <form
          ref={formRef}
          action={formAction}
          className="mt-4 flex flex-col gap-4"
        >
          <div className="flex flex-col gap-1">
            <label htmlFor="name" className="text-sm">
              Name
            </label>
            <Input name="name" placeholder="e.g. John Doe" required />
            {state.error?.name && (
              <p className="text-red-500 text-sm">{state.error.name}</p>
            )}
          </div>
          <div className="flex flex-col gap-1">
            <label htmlFor="email" className="text-sm">
              Email
            </label>
            <Input
              name="email"
              placeholder="e.g. johndoe@gmail.com"
              type="email"
              required
            />
            {state.error?.email && (
              <p className="text-red-500 text-sm">{state.error.email}</p>
            )}
          </div>
          <div className="flex flex-col gap-1">
            <label htmlFor="username" className="text-sm">
              Username
            </label>

            <Input name="username" placeholder="e.g John" required />
            {state.error?.username && (
              <p className="text-red-500 text-sm">{state.error.username}</p>
            )}
          </div>
          <div className="flex flex-col gap-1">
            <label htmlFor="password" className="text-sm">
              Password
            </label>
            <Input
              name="password"
              placeholder="(minimum 8 characters)"
              required
              className=""
              type="password"
            />
            {state.error?.password && (
              <p className="text-red-500 text-sm">{state.error.password}</p>
            )}
          </div>

          <Button type="submit">Create</Button>
        </form>
        {state.success && (
          <p className="text-green-500">User added successfully!</p>
        )}
      </DialogContent>
    </Dialog>
  );
};

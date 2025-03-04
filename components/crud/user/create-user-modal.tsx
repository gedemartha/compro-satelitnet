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
  className?: string;
}

export const CreateUserModal = ({ className }: CreateUserProps) => {
  const [isOpen, setIsOpen] = useState(false);
  const [state, formAction] = useActionState(createUser, {
    success: false,
    error: undefined,
  });

  // State untuk menyimpan input pengguna
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    username: "",
    password: "",
  });

  const formRef = useRef<HTMLFormElement>(null);

  // Tutup modal & reset form ketika sukses
  useEffect(() => {
    if (state.success) {
      setTimeout(() => {
        setIsOpen(false);
        setFormData({ name: "", email: "", username: "", password: "" }); // Reset input hanya saat sukses
      }, 2000);
    }
  }, [state.success]);

  const handleOpenChange = (open: boolean) => {
    setIsOpen(open);
    if (open) {
      state.success = false;
      state.error = {};
    }
  };

  // Handler untuk update state ketika user mengetik
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
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
            <Input
              name="name"
              placeholder="e.g. John Doe"
              value={formData.name}
              onChange={handleChange}
              required
            />
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
              value={formData.email}
              onChange={handleChange}
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
            <Input
              name="username"
              placeholder="e.g John"
              value={formData.username}
              onChange={handleChange}
              required
            />
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
              type="password"
              value={formData.password}
              onChange={handleChange}
              required
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

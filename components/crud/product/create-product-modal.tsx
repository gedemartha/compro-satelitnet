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
import { Textarea } from "@/components/ui/textarea";
import { useActionState } from "react";
import { createProduct } from "@/lib/actions";
import { cn } from "@/lib/utils"; // Import fungsi cn dari utils.ts

interface CreateProductModalProps {
  className?: string; // Menambahkan props className
}

export const CreateProductModal = ({ className }: CreateProductModalProps) => {
  const [isOpen, setIsOpen] = useState(false);
  const [state, formAction] = useActionState(createProduct, {
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
        <Button className={cn("mb-4", className)}>Add Product</Button>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Create a New Product</DialogTitle>
        </DialogHeader>
        <form
          ref={formRef}
          action={formAction}
          className="mt-4 flex flex-col gap-4"
        >
          <div className="flex flex-col gap-1">
            <label htmlFor="name" className="text-sm">
              Product Name
            </label>
            <Input name="name" placeholder="e.g. Laundry System" required />
            {state.error?.name && (
              <p className="text-red-500 text-sm">{state.error.name}</p>
            )}
          </div>
          <div className="flex flex-col gap-1">
            <label htmlFor="name" className="text-sm">
              Description
            </label>
            <Textarea
              name="description"
              placeholder="e.g. Sistem Laundry untuk kebutuhan manajemen Laundry"
              required
              className=""
            />
            {state.error?.description && (
              <p className="text-red-500 text-sm">{state.error.description}</p>
            )}
          </div>
          <div className="flex flex-col gap-1">
            <label htmlFor="Version" className="text-sm">
              Version
            </label>
            <Input name="version" placeholder="Version" required />
            {state.error?.version && (
              <p className="text-red-500 text-sm">{state.error.version}</p>
            )}
          </div>
          <div className="flex flex-col gap-1">
            <label htmlFor="image" className="text-sm">
              Upload Image
            </label>

            <Input name="image" placeholder="Image Path" required />
            {state.error?.image && (
              <p className="text-red-500 text-sm">{state.error.image}</p>
            )}
          </div>

          <Button type="submit">Create</Button>
        </form>
        {state.success && (
          <p className="text-green-500">Product added successfully!</p>
        )}
      </DialogContent>
    </Dialog>
  );
};

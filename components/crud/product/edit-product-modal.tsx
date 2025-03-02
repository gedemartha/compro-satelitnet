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
import { updateProduct } from "@/lib/actions"; // Fungsi untuk update produk
import { cn } from "@/lib/utils"; // Untuk className

interface EditProductModalProps {
  product: {
    id: string;
    name: string;
    description: string;
    version: string;
  };
  className?: string;
}

export const EditProductModal = ({
  product,
  className,
}: EditProductModalProps) => {
  const [isOpen, setIsOpen] = useState(false);
  const [state, formAction] = useActionState(updateProduct, {
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

  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogTrigger asChild>
        <Button className={cn("p-6", className)}>Edit</Button>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Edit Product</DialogTitle>
        </DialogHeader>
        <form
          ref={formRef}
          action={formAction}
          className="mt-4 flex flex-col gap-4"
        >
          <input type="hidden" name="id" value={product.id} />
          <div>
            <label htmlFor="name" className="text-sm">
              Product Name
            </label>
            <Input name="name" defaultValue={product.name} required />
          </div>
          <div>
            <label htmlFor="description" className="text-sm">
              Description
            </label>
            <Textarea
              name="description"
              placeholder="e.g. Sistem Laundry untuk kebutuhan manajemen Laundry"
              defaultValue={product.description}
              required
              className="h-40"
            />
          </div>
          <div>
            <label htmlFor="version" className="text-sm">
              Version
            </label>
            <Input name="version" defaultValue={product.version} required />
          </div>

          <Button type="submit">Update</Button>
        </form>
        {state.success && (
          <p className="text-green-500">Product updated successfully!</p>
        )}
      </DialogContent>
    </Dialog>
  );
};

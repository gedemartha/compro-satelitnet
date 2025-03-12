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
import Image from "next/image";

interface CreateProductModalProps {
  className?: string;
}

export const CreateProductModal = ({ className }: CreateProductModalProps) => {
  const [isOpen, setIsOpen] = useState(false);
  const [state, formAction] = useActionState(createProduct, {
    success: false,
    error: undefined,
  });

  const formRef = useRef<HTMLFormElement>(null);
  const [imagePreview, setImagePreview] = useState<string | null>(null);
  const [selectedFile, setSelectedFile] = useState<File | null>(null);

  useEffect(() => {
    if (state.success) {
      setTimeout(() => {
        setIsOpen(false);
        formRef.current?.reset();
        setImagePreview(null);
        setSelectedFile(null);
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

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setSelectedFile(file);
      setImagePreview(URL.createObjectURL(file));
    }
  };

  return (
    <Dialog open={isOpen} onOpenChange={handleOpenChange}>
      <DialogTrigger asChild>
        <Button className={cn("mb-4", className)}>Add Product</Button>
      </DialogTrigger>
      <DialogContent className="max-h-screen overflow-y-auto">
        <DialogHeader>
          <DialogTitle>Create a New Product</DialogTitle>
        </DialogHeader>
        <form
          ref={formRef}
          action={async (formData) => {
            if (selectedFile) {
              formData.append("image", selectedFile);
            }
            formAction(formData);
          }}
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
            <label htmlFor="description" className="text-sm">
              Description
            </label>
            <Textarea
              name="description"
              placeholder="Product details"
              required
            />
            {state.error?.description && (
              <p className="text-red-500 text-sm">{state.error.description}</p>
            )}
          </div>
          <div className="flex flex-col gap-1">
            <label htmlFor="version" className="text-sm">
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
            <Input
              type="file"
              accept="image/*"
              onChange={handleImageChange}
              required
            />
            {imagePreview && (
              <Image
                src={imagePreview}
                alt="Preview"
                className="object-contain rounded-md mx-auto"
                width={200}
                height={200}
              />
            )}
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

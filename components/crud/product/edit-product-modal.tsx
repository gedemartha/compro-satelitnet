"use client";

import { useEffect, useRef, useState, startTransition } from "react";
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
import { updateProduct } from "@/lib/actions";
import { cn } from "@/lib/utils";
import Image from "next/image";

interface EditProductModalProps {
  product: {
    id: string;
    name: string;
    description: string;
    version: string;
    image?: string | null;
  };
  className?: string;
}

export const EditProductModal = ({
  product,
  className,
}: EditProductModalProps) => {
  const [isOpen, setIsOpen] = useState(false);
  const formRef = useRef<HTMLFormElement>(null);
  const [formData, setFormData] = useState({
    name: product.name,
    description: product.description,
    version: product.version,
  });
  const [imagePreview, setImagePreview] = useState<string | null>(
    product.image || null
  );
  const [selectedFile, setSelectedFile] = useState<File | null>(null);

  // Reset form saat modal ditutup
  useEffect(() => {
    if (!isOpen) {
      setFormData({
        name: product.name,
        description: product.description,
        version: product.version,
      });
      setImagePreview(product.image || null);
      setSelectedFile(null);
    }
  }, [isOpen, product]);

  const handleOpenChange = (open: boolean) => {
    setIsOpen(open);
  };

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setSelectedFile(file);
      setImagePreview(URL.createObjectURL(file)); // Tampilkan preview gambar yang baru
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    startTransition(async () => {
      const newFormData = new FormData();
      newFormData.append("id", product.id);
      newFormData.append("name", formData.name);
      newFormData.append("description", formData.description);
      newFormData.append("version", formData.version);

      // Tambahkan gambar hanya jika ada file baru
      if (selectedFile) {
        newFormData.append("image", selectedFile);
      }

      const result = await updateProduct({}, newFormData);

      if (result.success) {
        setIsOpen(false); // Tutup modal setelah berhasil update
      }
    });
  };

  return (
    <Dialog open={isOpen} onOpenChange={handleOpenChange}>
      <DialogTrigger asChild>
        <Button className={cn("", className)}>Edit</Button>
      </DialogTrigger>
      <DialogContent className="max-h-[80vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle>Edit Product</DialogTitle>
        </DialogHeader>
        <form
          ref={formRef}
          onSubmit={handleSubmit}
          className="mt-4 flex flex-col gap-4"
        >
          <div className="flex flex-col gap-1">
            <label htmlFor="name" className="text-sm">
              Product Name
            </label>
            <Input
              name="name"
              value={formData.name}
              onChange={handleChange}
              required
            />
          </div>
          <div className="flex flex-col gap-1">
            <label htmlFor="description" className="text-sm">
              Description
            </label>
            <Textarea
              name="description"
              value={formData.description}
              onChange={handleChange}
              required
            />
          </div>
          <div className="flex flex-col gap-1">
            <label htmlFor="version" className="text-sm">
              Version
            </label>
            <Input
              name="version"
              value={formData.version}
              onChange={handleChange}
              required
            />
          </div>
          <div className="flex flex-col gap-1">
            <label htmlFor="image" className="text-sm">
              Upload Image
            </label>
            <Input type="file" accept="image/*" onChange={handleImageChange} />
            {imagePreview && (
              <>
                <Image
                  src={imagePreview}
                  alt="Preview"
                  className="object-cover rounded-md mx-auto mt-3"
                  width={200}
                  height={200}
                />
                <span className="text-xs mx-auto">{product.image}</span>
              </>
            )}
          </div>
          <Button type="submit">Update</Button>
        </form>
      </DialogContent>
    </Dialog>
  );
};

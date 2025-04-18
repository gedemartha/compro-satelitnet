"use client";

import { useState, useTransition } from "react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { cn } from "@/lib/utils";
import { createCategory } from "@/lib/actions"; // sesuaikan path-nya

interface CreateCategoryModalProps {
  className?: string;
}

export function CreateCategoryModal({ className }: CreateCategoryModalProps) {
  const [open, setOpen] = useState(false);
  const [categoryName, setCategoryName] = useState("");
  const [isPending, startTransition] = useTransition();

  const handleSubmit = () => {
    startTransition(() => {
      createCategory({ name: categoryName }).then(() => {
        setCategoryName("");
        setOpen(false);
      });
    });
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button className={cn("mb-4", className)}>Add Category</Button>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Tambah Kategori</DialogTitle>
        </DialogHeader>
        <div className="space-y-4">
          <div>
            <Label htmlFor="category-name">Nama Kategori</Label>
            <Input
              id="category-name"
              value={categoryName}
              onChange={(e) => setCategoryName(e.target.value)}
              placeholder="Contoh: Software Development"
              disabled={isPending}
            />
          </div>
          <Button onClick={handleSubmit} disabled={isPending || !categoryName}>
            Simpan
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
}

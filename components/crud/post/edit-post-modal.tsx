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
import { updatePost } from "@/lib/actions"; // Fungsi untuk update produk
import { cn } from "@/lib/utils"; // Untuk className

interface EditPostModalProps {
  post: {
    id: string;
    title: string;
    content: string;
    image?: string | null;
    authorId: string;
  };
  className?: string;
}

export const EditPostModal = ({ post, className }: EditPostModalProps) => {
  const [isOpen, setIsOpen] = useState(false);
  const [state, formAction] = useActionState(updatePost, {
    success: false,
    error: undefined,
  });
  const formRef = useRef<HTMLFormElement>(null);

  const [formData, setFormData] = useState({
    title: "",
    content: "",
    image: "",
  });

  useEffect(() => {
    if (state.success) {
      setTimeout(() => {
        setIsOpen(false);
        setFormData({ title: "", content: "", image: "" }); // Reset input hanya saat sukses
        formRef.current?.reset();
      }, 2000);
    }
  }, [state.success]);

  const handleOpenChange = (open: boolean) => {
    setIsOpen(open);
    if (open) {
      state.success = false;
      state.error = "";
    }
  };

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  return (
    <Dialog open={isOpen} onOpenChange={handleOpenChange}>
      <DialogTrigger asChild>
        <Button className={cn("p-6", className)}>Edit</Button>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Edit Post</DialogTitle>
        </DialogHeader>
        <form
          ref={formRef}
          action={formAction}
          className="mt-4 flex flex-col gap-4"
        >
          <input type="hidden" name="id" value={post.id} />
          <div>
            <label htmlFor="id" className="text-sm">
              Post ID
            </label>
            <Input
              name="name"
              value={post.id}
              disabled
              onChange={handleChange}
            />
          </div>
          <div>
            <label htmlFor="title" className="text-sm">
              Title
            </label>
            <Input
              name="title"
              required
              value={formData.title}
              onChange={handleChange}
            />
          </div>
          <div>
            <label htmlFor="content" className="text-sm">
              Description
            </label>
            <Textarea
              name="content"
              placeholder="e.g. Sistem Laundry untuk kebutuhan manajemen Laundry"
              required
              className="h-40"
              value={formData.content}
              onChange={handleChange}
            />
          </div>
          <div>
            <label htmlFor="authorId" className="text-sm">
              Author ID
            </label>
            <Input
              name="authorId"
              value={post.authorId}
              onChange={handleChange}
              disabled
            />
          </div>
          <div>
            <label htmlFor="image" className="text-sm">
              Image
            </label>
            <Input
              name="image"
              required
              value={formData.image}
              onChange={handleChange}
            />
          </div>

          <Button type="submit">Update</Button>
        </form>
        {state.success && (
          <p className="text-green-500">Post updated successfully!</p>
        )}
      </DialogContent>
    </Dialog>
  );
};

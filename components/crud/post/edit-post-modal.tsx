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
import { updatePost } from "@/lib/actions";
import { cn } from "@/lib/utils";
import Image from "next/image";

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
  const formRef = useRef<HTMLFormElement>(null);
  const [formData, setFormData] = useState({
    title: post.title,
    content: post.content,
  });
  const [imagePreview, setImagePreview] = useState<string | null>(
    post.image || null
  );
  const [selectedFile, setSelectedFile] = useState<File | null>(null);

  useEffect(() => {
    if (!isOpen) {
      setFormData({
        title: post.title,
        content: post.content,
      });
      setImagePreview(post.image || null);
      setSelectedFile(null);
    }
  }, [isOpen, post]);

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
      setImagePreview(URL.createObjectURL(file));
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    startTransition(async () => {
      const newFormData = new FormData();
      newFormData.append("id", post.id);
      newFormData.append("title", formData.title);
      newFormData.append("content", formData.content);

      if (selectedFile) {
        newFormData.append("image", selectedFile);
      }

      const result = await updatePost({}, newFormData);

      if (result.success) {
        setIsOpen(false);
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
          <DialogTitle>Edit Post</DialogTitle>
        </DialogHeader>
        <form
          ref={formRef}
          onSubmit={handleSubmit}
          className="mt-4 flex flex-col gap-4"
        >
          <div className="flex flex-col gap-1">
            <label htmlFor="title" className="text-sm">
              Title
            </label>
            <Input
              name="title"
              value={formData.title}
              onChange={handleChange}
              required
            />
          </div>
          <div className="flex flex-col gap-1">
            <label htmlFor="content" className="text-sm">
              Content
            </label>
            <Textarea
              name="content"
              value={formData.content}
              onChange={handleChange}
              required
            />
          </div>
          <div className="flex flex-col gap-1">
            <label htmlFor="image" className="text-sm">
              Upload Image
            </label>
            <Input
              type="file"
              name="image"
              accept="image/*"
              onChange={handleImageChange}
            />
            {imagePreview && (
              <>
                <Image
                  src={imagePreview}
                  alt="Preview"
                  className="object-cover rounded-md mx-auto mt-3"
                  width={200}
                  height={200}
                />
                <span className="text-xs mx-auto">{post.image}</span>
              </>
            )}
          </div>
          <Button type="submit">Update</Button>
        </form>
      </DialogContent>
    </Dialog>
  );
};

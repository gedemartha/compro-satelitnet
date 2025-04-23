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
import { createPost, getCategories } from "@/lib/actions";
import { cn } from "@/lib/utils"; // Import fungsi cn dari utils.ts
import Image from "next/image";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

interface CreatePostModalProps {
  className?: string;
}

export const CreatePostModal = ({ className }: CreatePostModalProps) => {
  const [isOpen, setIsOpen] = useState(false);
  const [currentUserId, setCurrentUserId] = useState<string | null>(null);
  useEffect(() => {
    if (isOpen) {
      fetch("/api/auth/user")
        .then((res) => res.json())
        .then((data) => setCurrentUserId(data.userId))
        .catch(() => setCurrentUserId(null));
    }
  }, [isOpen]);
  const [state, formAction] = useActionState(createPost, {
    success: false,
    error: undefined,
  });

  const formRef = useRef<HTMLFormElement>(null);
  const [imagePreview, setImagePreview] = useState<string | null>(null);
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [categories, setCategories] = useState<
    { label: string; value: string }[]
  >([]);
  const [selectedCategory, setSelectedCategory] = useState<string>("");

  useEffect(() => {
    getCategories().then((data) => setCategories(data));
  }, []);

  useEffect(() => {
    if (state.success) {
      setTimeout(() => {
        setIsOpen(false);
        formRef.current?.reset();
        setImagePreview(null);
        setSelectedFile(null);
        setSelectedCategory("");
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
        <Button className={cn("mb-4", className)}>Create Post</Button>
      </DialogTrigger>
      <DialogContent className="max-h-screen overflow-y-auto max-w-3xl">
        <DialogHeader>
          <DialogTitle>Create a New Post</DialogTitle>
        </DialogHeader>
        <form
          ref={formRef}
          action={async (formData) => {
            if (selectedFile) {
              formData.append("image", selectedFile);
            }
            formData.append("categoryId", selectedCategory);
            formAction(formData);
          }}
          className="mt-4 flex flex-col gap-4"
        >
          <div className="flex flex-col gap-1">
            <label htmlFor="title" className="text-sm">
              Title
            </label>
            <Input name="title" placeholder="Enter post title" required />
            {state.error?.title && (
              <p className="text-red-500 text-sm">{state.error.title}</p>
            )}
          </div>
          {/* Select Category */}
          <div className="flex flex-col gap-1">
            <label className="text-sm">Category</label>
            <Select
              value={selectedCategory}
              onValueChange={setSelectedCategory}
            >
              <SelectTrigger className="w-full">
                <SelectValue placeholder="Select category..." />
              </SelectTrigger>
              <SelectContent>
                <SelectGroup>
                  <SelectLabel>Available Categories</SelectLabel>
                  {categories.map((cat) => (
                    <SelectItem key={cat.value} value={cat.value}>
                      {cat.label}
                    </SelectItem>
                  ))}
                </SelectGroup>
              </SelectContent>
            </Select>
          </div>

          <div className="flex flex-col gap-1">
            <label htmlFor="content" className="text-sm">
              Content
            </label>
            <Textarea
              name="content"
              placeholder="Write something..."
              className="h-40"
              required
            />
            {state.error?.content && (
              <p className="text-red-500 text-sm">{state.error.content}</p>
            )}
          </div>
          <div className="flex flex-col gap-1">
            <Input name="authorId" type="hidden" value={currentUserId ?? ""} />
            {state.error?.authorId && (
              <p className="text-red-500 text-sm">{state.error.authorId}</p>
            )}
          </div>
          <div className="flex flex-col gap-1">
            <label htmlFor="image" className="text-sm">
              Upload Image
            </label>
            <Input type="file" accept="image/*" onChange={handleImageChange} />
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
          <p className="text-green-500">Post created successfully!</p>
        )}
      </DialogContent>
    </Dialog>
  );
};

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
import { createPost} from "@/lib/actions";
import { cn } from "@/lib/utils"; // Import fungsi cn dari utils.ts

interface CreatePostModalProps {
  className?: string;  // Menambahkan props className
}

export const CreatePostModal = ({ className}: CreatePostModalProps ) => {
  const [isOpen, setIsOpen] = useState(false);
  const [currentUserId, setCurrentUserId] = useState<string | null>(null); // State untuk user ID
  const [state, formAction] = useActionState(createPost, {
    success: false,
    error: undefined,
  });

  const [formData, setFormData] = useState({
    title: "",
    content: "",
    image: "",
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };
  
  const formRef = useRef<HTMLFormElement>(null); // Untuk mereset form

  // Tutup modal & reset form ketika produk berhasil dibuat
  useEffect(() => {
    if (state.success) {
      setTimeout(() => {
        setIsOpen(false); // Tutup modal setelah 1.5 detik
        setFormData({ title: "", content: "", image: ""}); // Reset input hanya saat sukses
        formRef.current?.reset(); // Reset form input
      }, 2000);
    }
  }, [state.success]);

  useEffect(() => {
    // Fetch currentUserId dari API saat modal dibuka
    if (isOpen) {
      fetch("/api/auth/user")
        .then((res) => res.json())
        .then((data) => setCurrentUserId(data.userId))
        .catch(() => setCurrentUserId(null));
    }
  }, [isOpen]);

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
        <Button className={cn("mb-4", className)}>Add Post</Button>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Create a New Post</DialogTitle>
        </DialogHeader>
        <form
          ref={formRef}
          action={formAction}
          className="mt-4 flex flex-col gap-4"
        >
          <div className="flex flex-col gap-1">
            <label htmlFor="title" className="text-sm">
              Post Title
            </label>
            <Input name="title" placeholder="e.g. Laundry System" required onChange={handleChange} value={formData.title}/>
            {state.error?.title && (
              <p className="text-red-500 text-sm">{state.error.title}</p>
            )}
          </div>
          <div className="flex flex-col gap-1">
            <label htmlFor="content" className="text-sm">
              Content
            </label>
            <Textarea
              name="content"
              placeholder="e.g. Lorem ipsum dolor sit amet consectetur adipisicing elit. Alias, veritatis." 
              required
              className="h-44"
              value={formData.content}
              onChange={handleChange}
            />
            {state.error?.content && (
              <p className="text-red-500 text-sm">{state.error.content}</p>
            )}
          </div>
          <div className="flex flex-col gap-1">
            <label htmlFor="authorId" className="text-sm hidden">
              Author ID 
            </label>
            <Input name="authorId" placeholder="(automatically)" type="hidden" defaultValue={currentUserId ?? ""}/>
            {state.error?.authorId && (
              <p className="text-red-500 text-sm">{state.error.authorId}</p>
            )}
          </div>
          <div className="flex flex-col gap-1">
            <label htmlFor="image" className="text-sm">
              Upload Image
            </label>

            <Input name="image" placeholder="Image Path" value={formData.image} required onChange={handleChange}/>
            {state.error?.image && (
              <p className="text-red-500 text-sm">{state.error.image}</p>
            )}
          </div>

          <Button type="submit">Create</Button>
        </form>
        {state.success && (
          <p className="text-green-500">Post added successfully!</p>
        )}
      </DialogContent>
    </Dialog>
  );
};

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
import { createTestimonial } from "@/lib/actions";
import { cn } from "@/lib/utils";
import { FaStar } from "react-icons/fa"; // Import icon bintang

interface CreatePostModalProps {
  className?: string;
}

export const CreateTestimonialModal = ({ className }: CreatePostModalProps) => {
  const [isOpen, setIsOpen] = useState(false);
  const [state, formAction] = useActionState(createTestimonial, {
    success: false,
    error: undefined,
  });

  const [formData, setFormData] = useState({
    name: "",
    content: "",
    logo: "",
    rating: 0,
  });

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  // Handle klik bintang untuk rating
  const handleRating = (value: number) => {
    setFormData((prev) => ({ ...prev, rating: value }));
  };

  const formRef = useRef<HTMLFormElement>(null);

  useEffect(() => {
    if (state.success) {
      setTimeout(() => {
        setIsOpen(false);
        setFormData({ name: "", content: "", logo: "", rating: 0 });
        formRef.current?.reset();
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

  return (
    <Dialog open={isOpen} onOpenChange={handleOpenChange}>
      <DialogTrigger asChild>
        <Button className={cn("mb-4", className)}>Add Testimonial</Button>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Create a New Testimonial</DialogTitle>
        </DialogHeader>
        <form
          ref={formRef}
          action={formAction}
          className="mt-4 flex flex-col gap-4"
        >
          {/* Name Input */}
          <div className="flex flex-col gap-1">
            <label htmlFor="name" className="text-sm">
              Name
            </label>
            <Input
              name="name"
              placeholder="e.g. John Doe"
              required
              onChange={handleChange}
              value={formData.name}
            />
            {state.error?.name && (
              <p className="text-red-500 text-sm">{state.error.name}</p>
            )}
          </div>

          {/* Content Input */}
          <div className="flex flex-col gap-1">
            <label htmlFor="content" className="text-sm">
              Content
            </label>
            <Textarea
              name="content"
              placeholder="Write your testimonial..."
              required
              className="h-44"
              value={formData.content}
              onChange={handleChange}
            />
            {state.error?.content && (
              <p className="text-red-500 text-sm">{state.error.content}</p>
            )}
          </div>

          {/* Upload Image Input */}
          <div className="flex flex-col gap-1">
            <label htmlFor="logo" className="text-sm">
              Upload Image
            </label>
            <Input
              name="logo"
              placeholder="Image Path"
              value={formData.logo}
              required
              onChange={handleChange}
            />
            {state.error?.logo && (
              <p className="text-red-500 text-sm">{state.error.logo}</p>
            )}
          </div>

          {/* Rating Input (Bintang) */}
          <div className="flex flex-col gap-1">
            <label className="text-sm">Rating</label>
            <div className="flex gap-1">
              {[1, 2, 3, 4, 5].map((star) => (
                <FaStar
                  key={star}
                  size={24}
                  className={`cursor-pointer transition-colors ${
                    formData.rating >= star
                      ? "text-yellow-400"
                      : "text-gray-300"
                  }`}
                  onClick={() => handleRating(star)}
                />
              ))}
            </div>
            {/* Hidden input untuk mengirim rating */}
            <input type="hidden" name="rating" value={formData.rating} />
            {state.error?.rating && (
              <p className="text-red-500 text-sm">{state.error.rating}</p>
            )}
          </div>

          <Button type="submit">Create</Button>
        </form>
        {state.success && (
          <p className="text-green-500">Testimonial added successfully!</p>
        )}
      </DialogContent>
    </Dialog>
  );
};

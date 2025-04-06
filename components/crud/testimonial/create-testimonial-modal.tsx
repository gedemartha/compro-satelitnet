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
import { FaStar } from "react-icons/fa";
import Image from "next/image";

interface CreatePostModalProps {
  className?: string;
}

export const CreateTestimonialModal = ({ className }: CreatePostModalProps) => {
  const [isOpen, setIsOpen] = useState(false);
  const [state, formAction] = useActionState(createTestimonial, {
    success: false,
    error: undefined,
  });

  const formRef = useRef<HTMLFormElement>(null);
  const [imagePreview, setImagePreview] = useState<string | null>(null);

  const [rating, setRating] = useState(0);

  const handleRating = (value: number) => {
    setRating(value);
  };

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const previewUrl = URL.createObjectURL(file);
      setImagePreview(previewUrl);
    } else {
      setImagePreview(null);
    }
  };

  useEffect(() => {
    if (state.success) {
      setTimeout(() => {
        setIsOpen(false);
        setImagePreview(null);
        setRating(0);
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
      <DialogContent className="max-h-screen sm:max-h-[85vh] overflow-y-auto">
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
              Company / Name
            </label>
            <Input name="name" placeholder="e.g. John Doe" required />
            {state.error?.name && (
              <p className="text-red-500 text-sm">{state.error.name}</p>
            )}
          </div>

          {/* Content Input */}
          <div className="flex flex-col gap-1">
            <label htmlFor="content" className="text-sm">
              Testimony Content
            </label>
            <Textarea
              name="content"
              placeholder="Write your testimonial..."
              required
              className="h-44"
            />
            {state.error?.content && (
              <p className="text-red-500 text-sm">{state.error.content}</p>
            )}
          </div>

          {/* Logo Upload */}
          <div className="flex flex-col gap-1">
            <label htmlFor="logo" className="text-sm">
              Upload Logo
            </label>
            <Input
              type="file"
              name="logo"
              accept="image/*"
              required
              onChange={handleImageChange}
            />
            {imagePreview && (
              <Image
                src={imagePreview}
                alt="Preview"
                width={200}
                height={200}
                className="rounded-md object-contain mx-auto"
              />
            )}
            {state.error?.logo && (
              <p className="text-red-500 text-sm">{state.error.logo}</p>
            )}
          </div>

          {/* Rating */}
          <div className="flex flex-col gap-1">
            <label className="text-sm">Rating</label>
            <div className="flex gap-1">
              {[1, 2, 3, 4, 5].map((star) => (
                <FaStar
                  key={star}
                  size={24}
                  className={`cursor-pointer transition-colors ${
                    rating >= star ? "text-yellow-400" : "text-gray-300"
                  }`}
                  onClick={() => handleRating(star)}
                />
              ))}
            </div>
            <input type="hidden" name="rating" value={rating} />
            {state.error?.rating && (
              <p className="text-red-500 text-sm">{state.error.rating}</p>
            )}
          </div>

          <Button type="submit">Create</Button>
        </form>

        {state.success && (
          <p className="text-green-500 text-sm mt-2">
            Testimonial added successfully!
          </p>
        )}
      </DialogContent>
    </Dialog>
  );
};

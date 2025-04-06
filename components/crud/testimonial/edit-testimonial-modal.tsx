"use client";

import { startTransition, useEffect, useRef, useState } from "react";
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
import { updateTestimonial } from "@/lib/actions";
import { cn } from "@/lib/utils";
import { FaStar } from "react-icons/fa";

interface EditTestimonialModalProps {
  testimonial: {
    id: string;
    name: string;
    content: string;
    logo: string | null;
    rating: number;
  };
  className?: string;
}

export const EditTestimonialModal = ({
  testimonial,
  className,
}: EditTestimonialModalProps) => {
  const [isOpen, setIsOpen] = useState(false);
  const [state, formAction] = useActionState(updateTestimonial, {
    success: false,
    error: undefined,
  });
  const formRef = useRef<HTMLFormElement>(null);

  const [formData, setFormData] = useState({
    name: testimonial.name,
    content: testimonial.content,
    rating: testimonial.rating,
  });

  const [file, setFile] = useState<File | null>(null);

  useEffect(() => {
    if (state.success) {
      setTimeout(() => {
        setIsOpen(false);
        formRef.current?.reset();
      }, 2000);
    }
  }, [state.success]);

  const handleOpenChange = (open: boolean) => {
    setIsOpen(open);
    if (open) {
      state.success = false;
      state.error = undefined;
    }
  };

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const selectedFile = e.target.files?.[0];
    if (selectedFile) {
      setFile(selectedFile);
    }
  };

  const handleRatingClick = (selectedRating: number) => {
    setFormData((prev) => ({
      ...prev,
      rating: selectedRating,
    }));
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const updatedFormData = new FormData();
    updatedFormData.append("id", testimonial.id);
    updatedFormData.append("name", formData.name);
    updatedFormData.append("content", formData.content);
    updatedFormData.append("rating", String(formData.rating));
    if (file) {
      updatedFormData.append("logo", file);
    }

    startTransition(() => {
      formAction(updatedFormData);
    });
  };

  return (
    <Dialog open={isOpen} onOpenChange={handleOpenChange}>
      <DialogTrigger asChild>
        <Button className={cn("p-6", className)}>Edit</Button>
      </DialogTrigger>
      <DialogContent className="max-h-screen sm:max-h-[85vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle>Edit Testimonial</DialogTitle>
        </DialogHeader>
        <form
          ref={formRef}
          onSubmit={handleSubmit}
          className="mt-4 flex flex-col gap-4"
        >
          {/* Hidden */}
          <input type="hidden" name="id" value={testimonial.id} />
          <input type="hidden" name="rating" value={formData.rating} />

          <div>
            <label htmlFor="name" className="text-sm">
              Name
            </label>
            <Input
              name="name"
              required
              value={formData.name}
              onChange={handleChange}
            />
          </div>

          <div>
            <label htmlFor="content" className="text-sm">
              Content
            </label>
            <Textarea
              name="content"
              required
              className="h-40"
              value={formData.content}
              onChange={handleChange}
            />
          </div>

          <div>
            <label htmlFor="logo" className="text-sm">
              Upload New Image
            </label>
            <Input
              name="logo"
              type="file"
              accept="image/*"
              onChange={handleFileChange}
            />
          </div>

          <div>
            <label className="text-sm">Rating</label>
            <div className="flex space-x-1">
              {[1, 2, 3, 4, 5].map((star) => (
                <FaStar
                  key={star}
                  className={`cursor-pointer text-xl ${
                    formData.rating >= star
                      ? "text-yellow-400"
                      : "text-gray-300"
                  }`}
                  onClick={() => handleRatingClick(star)}
                />
              ))}
            </div>
          </div>

          <Button type="submit">Update</Button>
          {state.success && (
            <p className="text-green-500">Testimonial updated successfully!</p>
          )}
        </form>
      </DialogContent>
    </Dialog>
  );
};

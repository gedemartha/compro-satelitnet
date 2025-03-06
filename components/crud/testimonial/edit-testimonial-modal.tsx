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
import { updateTestimonial } from "@/lib/actions"; // Fungsi untuk update testimonial
import { cn } from "@/lib/utils"; // Untuk className
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
    logo: testimonial.logo,
    rating: testimonial.rating,
  });

  useEffect(() => {
    console.log("Form State:", state);
  }, [state]);

  useEffect(() => {
    if (state.success) {
      setTimeout(() => {
        setIsOpen(false);
        setFormData({
          name: testimonial.name,
          content: testimonial.content,
          logo: testimonial.logo,
          rating: testimonial.rating,
        }); // Reset input hanya saat sukses
        formRef.current?.reset();
      }, 2000);
    }
  }, [state.success, testimonial]);

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
    const { name, value } = e.target;

    setFormData((prev) => ({
      ...prev,
      [name]: name === "rating" ? Math.max(1, Number(value) || 1) : value,
    }));
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);

    // Pastikan rating selalu berupa angka valid
    const rating = Math.max(1, Number(formData.get("rating")) || 1);

    // Buat FormData baru dan tambahkan data
    const updatedFormData = new FormData();
    updatedFormData.append("id", formData.get("id") as string);
    updatedFormData.append("name", formData.get("name") as string);
    updatedFormData.append("content", formData.get("content") as string);
    updatedFormData.append("logo", formData.get("logo") as string);
    updatedFormData.append("rating", rating.toString()); // Ubah angka ke string

    console.log(
      "Submitting FormData:",
      Object.fromEntries(updatedFormData.entries())
    ); // Debugging

    startTransition(() => {
      formAction(updatedFormData); // ✅ FormData valid
    });
  };
  const handleRatingClick = (selectedRating: number) => {
    setFormData((prev) => ({
      ...prev,
      rating: selectedRating, // Paksa tetap sesuai klik user
    }));
  };

  return (
    <Dialog open={isOpen} onOpenChange={handleOpenChange}>
      <DialogTrigger asChild>
        <Button className={cn("p-6", className)}>Edit</Button>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Edit Testimonial</DialogTitle>
        </DialogHeader>
        <form
          ref={formRef}
          action={formAction}
          onSubmit={handleSubmit}
          className="mt-4 flex flex-col gap-4"
        >
          <input type="hidden" name="rating" value={formData.rating} />
          <input type="hidden" name="id" value={testimonial.id} />
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
              Image Path
            </label>
            <Input
              name="logo"
              required
              value={formData.logo ?? ""}
              onChange={handleChange}
            />
          </div>
          <div>
            <label htmlFor="rating" className="text-sm">
              Rating
            </label>
            <div className="flex space-x-2">
              {[1, 2, 3, 4, 5].map((star) => (
                <FaStar
                  key={star}
                  className={`cursor-pointer ${
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
        </form>
        {state.success && (
          <p className="text-green-500">Testimonial updated successfully!</p>
        )}
      </DialogContent>
    </Dialog>
  );
};

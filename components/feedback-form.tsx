"use client";

import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { createFeedback } from "@/lib/actions";
import { useActionState, useEffect, useState } from "react";
import { FaStar } from "react-icons/fa";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
} from "@/components/ui/dialog";

const initialState: {
  error?: {
    name?: string[];
    email?: string[];
    content?: string[];
    rating?: string[];
  };
  success?: boolean;
} = {};

export default function FeedbackForm() {
  const [state, formAction] = useActionState(createFeedback, initialState);
  const [open, setOpen] = useState(false);

  // Controlled inputs state
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [content, setContent] = useState("");
  const [rating, setRating] = useState(0);

  // Reset form ketika submit sukses
  useEffect(() => {
    if (state.success) {
      setOpen(true);
      setName("");
      setEmail("");
      setContent("");
      setRating(0);
    }
  }, [state.success]);

  return (
    <>
      <form action={formAction} className="space-y-6 max-w-xl">
        {/* Nama */}
        <div className="flex flex-col gap-1">
          <label htmlFor="name" className="text-sm font-medium">
            Nama
          </label>
          <Input
            id="name"
            name="name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            placeholder="contoh: Jane Doe"
          />
          {state.error?.name && (
            <p className="text-sm text-red-500">{state.error.name}</p>
          )}
        </div>

        {/* Email */}
        <div className="flex flex-col gap-1">
          <label htmlFor="email" className="text-sm font-medium">
            Email
          </label>
          <Input
            id="email"
            name="email"
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="contoh: janedoe@mail.com"
          />
          {state.error?.email && (
            <p className="text-sm text-red-500">{state.error.email}</p>
          )}
        </div>

        {/* Pesan */}
        <div className="flex flex-col gap-1">
          <label htmlFor="content" className="text-sm font-medium">
            Pesan
          </label>
          <Textarea
            id="content"
            name="content"
            rows={5}
            value={content}
            onChange={(e) => setContent(e.target.value)}
            placeholder="contoh: Sistem Laundry buatan SatelitNET Komputer sangat bagus!"
          />
          {state.error?.content && (
            <p className="text-sm text-red-500">{state.error.content}</p>
          )}
        </div>

        {/* Rating */}
        <div className="flex flex-col gap-1">
          <label className="text-sm font-medium">Rating</label>
          <div className="flex gap-1">
            {[1, 2, 3, 4, 5].map((star) => (
              <FaStar
                key={star}
                size={24}
                className={`cursor-pointer transition-colors ${
                  rating >= star ? "text-yellow-400" : "text-gray-300"
                }`}
                onClick={() => setRating(star)}
              />
            ))}
          </div>
          <input type="hidden" name="rating" value={rating} />
          {state.error?.rating && (
            <p className="text-sm text-red-500">{state.error.rating}</p>
          )}
        </div>

        {/* Submit */}
        <button
          type="submit"
          className="px-4 py-2 bg-primary text-white rounded hover:bg-primary/90 transition"
        >
          Kirim Feedback
        </button>
      </form>

      {/* Dialog Sukses */}
      <Dialog open={open} onOpenChange={setOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Terima kasih!</DialogTitle>
            <DialogDescription>
              Feedback kamu sudah kami terima dengan baik. 🎉
            </DialogDescription>
          </DialogHeader>
        </DialogContent>
      </Dialog>
    </>
  );
}

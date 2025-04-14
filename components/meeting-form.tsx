"use client";

import { createMeeting } from "@/lib/actions";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { useActionState, useEffect, useState } from "react";
import { format } from "date-fns";
import { FaCalendarAlt } from "react-icons/fa";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { Calendar } from "@/components/ui/calendar";
import { cn } from "@/lib/utils";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "./ui/dialog";

const initialState:
  | { success: true }
  | {
      error: {
        name?: string[];
        email?: string[];
        notes?: string[];
        date?: string[];
      };
    } = {
  error: {},
};

export default function MeetingForm() {
  const [state, formAction] = useActionState(createMeeting, initialState);
  const [open, setOpen] = useState(false);

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [notes, setNotes] = useState("");
  const [date, setDate] = useState<Date>();

  // reset form if success
  useEffect(() => {
    if (state.success) {
      setOpen(true);
      setName("");
      setEmail("");
      setNotes("");
      setDate(undefined);
    }
  }, [state.success]);

  return (
    <form action={formAction} className="space-y-6 max-w-xl">
      <div className="flex flex-col gap-1">
        <label htmlFor="name" className="text-sm font-medium">
          Nama
        </label>
        <Input
          id="name"
          name="name"
          value={name}
          onChange={(e) => setName(e.target.value)}
        />
        {state.error?.name && (
          <p className="text-sm text-red-500">{state.error.name}</p>
        )}
      </div>

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
        />
        {state.error?.email && (
          <p className="text-sm text-red-500">{state.error.email}</p>
        )}
      </div>

      <div className="flex flex-col gap-1">
        <label htmlFor="notes" className="text-sm font-medium">
          Catatan
        </label>
        <Textarea
          id="notes"
          name="notes"
          rows={4}
          value={notes}
          onChange={(e) => setNotes(e.target.value)}
        />
        {state.error?.notes && (
          <p className="text-sm text-red-500">{state.error.notes}</p>
        )}
      </div>

      <div className="flex flex-col gap-1">
        <label className="text-sm font-medium">Tanggal Meeting</label>
        <Popover>
          <PopoverTrigger asChild>
            <Button
              variant="outline"
              className={cn(
                "w-full justify-start text-left font-normal",
                !date && "text-muted-foreground"
              )}
            >
              <FaCalendarAlt className="mr-2" />
              {date ? format(date, "PPP") : <span>Pilih tanggal</span>}
            </Button>
          </PopoverTrigger>
          <PopoverContent className="w-auto p-0">
            <Calendar
              mode="single"
              selected={date}
              onSelect={setDate}
              initialFocus
            />
          </PopoverContent>
        </Popover>
        {state.error?.date && (
          <p className="text-sm text-red-500">{state.error.date}</p>
        )}
        <input
          type="hidden"
          name="date"
          value={date ? date.toISOString() : ""}
        />
      </div>

      <Button type="submit">Kirim Jadwal Meeting</Button>

      {state.success && (
        <Dialog open={open} onOpenChange={setOpen}>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>Terima kasih!</DialogTitle>
              <DialogDescription>
                Penjadwalan Meeting sudah diterima, mohon tunggu respon kami
                lebih lanjut melalui email yang dikirim ke email anda ! 🎉
              </DialogDescription>
            </DialogHeader>
          </DialogContent>
        </Dialog>
      )}
    </form>
  );
}

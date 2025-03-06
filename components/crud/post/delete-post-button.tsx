"use client";

import { useState } from "react";
import { useActionState } from "react";
import { deletePost } from "@/lib/actions";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogFooter,
  DialogTitle,
} from "@/components/ui/dialog";

// Definisi tipe untuk state
type DeleteState = {
  success?: boolean;
  error?: string;
};

export function DeletePostButton({ postId }: { postId: string }) {
  const [isModalOpen, setModalOpen] = useState(false);

  const [state, formAction] = useActionState<DeleteState, FormData>(
    async (prevState: DeleteState, formData: FormData) => {
      return await deletePost(prevState, formData);
    },
    { success: false, error: undefined }
  );

  return (
    <>
      {/* Tombol untuk membuka modal */}
      <Button
        variant="destructive"
        className="w-full text-sm"
        onClick={() => setModalOpen(true)}
      >
        Delete
      </Button>

      {/* Modal Konfirmasi */}
      <Dialog open={isModalOpen} onOpenChange={setModalOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Confirm Deletion</DialogTitle>
            <p>Are you sure you want to delete this product?</p>
          </DialogHeader>

          <DialogFooter>
            <Button variant="outline" onClick={() => setModalOpen(false)}>
              Cancel
            </Button>

            {/* Form harus ada di dalam modal agar tetap terhubung */}
            <form
              action={formAction}
              onSubmit={() => setModalOpen(false)} // Modal ditutup setelah submit
            >
              <input type="hidden" name="id" value={postId} />
              <Button variant="destructive" type="submit">
                Yes, Delete
              </Button>
            </form>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* Tampilkan pesan error jika ada */}
      {state?.error && (
        <p className="text-red-500 text-xs mt-1">{state.error}</p>
      )}

      {/* Tampilkan pesan sukses jika berhasil */}
      {state?.success && (
        <p className="text-green-500 text-xs mt-1">
          Product deleted successfully!
        </p>
      )}
    </>
  );
}

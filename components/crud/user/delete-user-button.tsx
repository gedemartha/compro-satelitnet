"use client";

import { useState } from "react";
import { useActionState } from "react";
import { deleteUser } from "@/lib/actions";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogFooter,
  DialogTitle,
} from "@/components/ui/dialog";

type DeleteState = {
  success?: boolean;
  error?: string;
};

export function DeleteUserButton({
  userId,
  currentUserId, // Tambahkan ID user yang sedang login
}: {
  userId: string;
  currentUserId?: string;
}) {
  const [isModalOpen, setModalOpen] = useState(false);

  const [state, formAction] = useActionState<DeleteState, FormData>(
    async (prevState: DeleteState, formData: FormData) => {
      return await deleteUser(prevState, formData);
    },
    { success: false, error: undefined }
  );

  return (
    <>
      <Button
        variant="destructive"
        className="w-full text-sm"
        onClick={() => setModalOpen(true)}
      >
        Delete
      </Button>

      <Dialog open={isModalOpen} onOpenChange={setModalOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Confirm Deletion</DialogTitle>
            <p>Are you sure you want to delete this user?</p>
          </DialogHeader>

          <DialogFooter>
            <Button variant="outline" onClick={() => setModalOpen(false)}>
              Cancel
            </Button>

            <form
              action={formAction}
              onSubmit={(e) => {
                if (userId === currentUserId) {
                  e.preventDefault(); // Cegah pengiriman form
                }
                setModalOpen(false);
              }}
            >
              <input type="hidden" name="id" value={userId} />
              <Button
                variant="destructive"
                type="submit"
                disabled={userId === currentUserId}
              >
                {userId === currentUserId
                  ? "You can't delete yourself"
                  : "Delete"}
              </Button>
            </form>
          </DialogFooter>

          {/* Tampilkan error jika ada */}
          {state?.error && (
            <p className="text-red-500 text-xs mt-1">{state.error}</p>
          )}

          {state?.success && (
            <p className="text-green-500 text-xs mt-1">
              User deleted successfully!
            </p>
          )}
        </DialogContent>
      </Dialog>
    </>
  );
}

"use client";

import { useState, useTransition } from "react";
import { Button } from "@/components/ui/button";
import { updateMeetingStatus } from "@/lib/actions";
import { toast } from "react-hot-toast";

interface MeetingActionsProps {
  meetingId: string;
  initialStatus: string;
}

const MeetingActions: React.FC<MeetingActionsProps> = ({
  meetingId,
  initialStatus,
}) => {
  const [isPending, startTransition] = useTransition();
  const [loading, setLoading] = useState(false);
  const [status, setStatus] = useState(initialStatus); // Simpan status di state

  const handleStatusChange = (newStatus: "Approved" | "Rejected") => {
    setLoading(true);
    startTransition(async () => {
      try {
        await updateMeetingStatus(meetingId, newStatus);
        setStatus(newStatus); // Update status di frontend (tanpa menghilangkan tombol)
        toast.success(`Meeting ${newStatus.toLowerCase()} successfully!`);
      } catch (error) {
        toast.error(`Failed to update meeting status. Error: ${error}`);
      } finally {
        setLoading(false);
      }
    });
  };

  return (
    <div className="flex gap-2">
      <Button
        onClick={() => handleStatusChange("Approved")}
        disabled={loading || isPending}
        className={`bg-green-500 hover:bg-green-700 text-white px-3 py-1 text-sm ${
          status === "Approved" ? "opacity-50 cursor-not-allowed" : ""
        }`}
      >
        {loading && status === "Approved" ? "Processing..." : "Approve"}
      </Button>
      <Button
        onClick={() => handleStatusChange("Rejected")}
        disabled={loading || isPending}
        className={`bg-red-500 hover:bg-red-700 text-white px-3 py-1 text-sm ${
          status === "Rejected" ? "opacity-50 cursor-not-allowed" : ""
        }`}
      >
        {loading && status === "Rejected" ? "Processing..." : "Reject"}
      </Button>
    </div>
  );
};

export default MeetingActions;

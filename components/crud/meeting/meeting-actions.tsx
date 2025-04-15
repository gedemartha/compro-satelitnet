"use client";

import { useState, useTransition } from "react";
import { Button } from "@/components/ui/button";
import { updateMeetingStatus } from "@/lib/actions";
import { toast } from "react-hot-toast";

interface MeetingActionsProps {
  meetingId: string;
  initialStatus: string;
  email?: string; // tambahkan email agar bisa dipakai
  name?: string; // tambahkan nama agar bisa masuk ke body email
}

const MeetingActions: React.FC<MeetingActionsProps> = ({
  meetingId,
  initialStatus,
  email,
  name,
}) => {
  const [isPending, startTransition] = useTransition();
  const [loading, setLoading] = useState(false);
  const [status, setStatus] = useState(initialStatus);
  const [showSendEmail, setShowSendEmail] = useState(false); // untuk munculin tombol

  const handleStatusChange = (newStatus: "Approved" | "Rejected") => {
    if (newStatus === status) return;

    setLoading(true);
    startTransition(async () => {
      try {
        await updateMeetingStatus(meetingId, newStatus);
        setStatus(newStatus);
        toast.success(`Meeting ${newStatus.toLowerCase()} successfully!`);

        if (newStatus === "Approved") {
          setShowSendEmail(true); // munculin tombol email manual
        } else {
          setShowSendEmail(false);
        }
      } catch (error) {
        toast.error(`Failed to update meeting status. Error: ${error}`);
      } finally {
        setLoading(false);
      }
    });
  };

  return (
    <div className="flex flex-col gap-2 items-center">
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

      {showSendEmail && (
        <a
          href={`mailto:${email}?subject=${encodeURIComponent(
            "Jadwal Meeting Anda Telah Disetujui"
          )}&body=${encodeURIComponent(
            `Halo ${name},\n\nPermintaan meeting Anda telah disetujui.\nSilakan balas email ini untuk konfirmasi lebih lanjut.\n\nSalam,\nTim SatelitNET`
          )}`}
          target="_blank"
          rel="noopener noreferrer"
        >
          <Button className="mt-2 bg-blue-500 hover:bg-blue-700 text-white text-xs px-2 py-1">
            Kirim Email Manual
          </Button>
        </a>
      )}
    </div>
  );
};

export default MeetingActions;

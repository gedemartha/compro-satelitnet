import MeetingForm from "@/components/meeting-form";

import React from "react";

const MeetingPage = () => {
  return (
    <div className="max-w-2xl mx-auto px-6 py-12 border-border rounded-lg border-2 my-5">
      <h1 className="text-3xl font-bold mb-6">Hubungi Kami</h1>
      <p className="text-muted-foreground mb-6">
        Ingin berdiskusi mengenai kebutuhan proyek IT Anda? Tim SatelitNET siap
        membantu. Silakan isi formulir di bawah untuk menjadwalkan sesi
        konsultasi awal.
      </p>
      <MeetingForm />
    </div>
  );
};

export default MeetingPage;

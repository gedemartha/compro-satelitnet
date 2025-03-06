import MeetingTable from "@/components/meeting-table";
import React from "react";

const MeetingsPage = () => {
  return (
    <div className="min-h-screen">
      <div className=" max-w-screen-lg mx-auto py-10">
        <div className="w-full flex justify-between items-center">
          <h1 className="text-2xl font-bold text-foreground pb-5">
            Meeting List
          </h1>
        </div>
        <MeetingTable />
      </div>
    </div>
  );
};

export default MeetingsPage;

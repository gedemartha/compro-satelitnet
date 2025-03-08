import FeedbackTable from "@/components/feedback-table";
import React from "react";

const FeedbacksPage = () => {
  return (
    <div className="min-h-screen">
      <div className=" max-w-screen-lg mx-auto py-10">
        <div className="w-full flex justify-between items-center">
          <h1 className="text-2xl font-bold text-foreground pb-5">
            Feedback List
          </h1>
        </div>
        <FeedbackTable />
      </div>
    </div>
  );
};

export default FeedbacksPage;

import React from "react";
import FeedbackForm from "@/components/feedback-form";

const FeedbackPage = () => {
  return (
    <div className="max-w-2xl mx-auto px-6 py-12 border-border rounded-lg border-2 my-5">
      <h1 className="text-3xl font-bold mb-6">Kirim Feedback</h1>
      <p className="text-muted-foreground mb-6">
        Kami sangat menghargai masukan dan saran dari kamu.
      </p>
      <FeedbackForm />
    </div>
  );
};

export default FeedbackPage;

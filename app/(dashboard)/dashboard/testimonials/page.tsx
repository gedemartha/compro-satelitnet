import { CreateTestimonialModal } from "@/components/crud/testimonial/create-testimonial-modal";
import TestimonialTable from "@/components/testimonial-table";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Testimonials",
};

const TestimonialsPage = () => {
  return (
    <div className="min-h-screen ">
      <div className="max-w-screen-lg mx-auto py-10">
        <div className="w-full flex justify-between items-center">
          <h1 className="text-2xl font-bold text-foreground pb-5">
            Testimonials
          </h1>
          <CreateTestimonialModal className="" />
        </div>
        <TestimonialTable />
      </div>
    </div>
  );
};

export default TestimonialsPage;

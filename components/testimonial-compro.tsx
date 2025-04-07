"use client";

import React, { useEffect, useState } from "react";
import { InfiniteMovingCards } from "./ui/infinite-moving-cards";
import { getComproTestimonials } from "@/lib/actions"; // Pastikan path ini sesuai

const TestimonialCompro = () => {
  const [testimonials, setTestimonials] = useState<
    { quote: string; name: string; logo: string; rating: number }[]
  >([]);

  useEffect(() => {
    const fetchTestimonials = async () => {
      const data = await getComproTestimonials();
      if (data.length <= 0) {
        return <div>No Testimony found!</div>;
      }
      console.log(data);
      setTestimonials(data);
    };
    fetchTestimonials();
  }, []);

  return (
    <section className="w-full h-screen bg-gradient-to-b from-purple-satelit to-secondary ">
      <div className="max-w-6xl mx-auto px-4 ">
        <h2 className="text-main text-5xl font-bold text-center mb-16 py-1">
          Testimoni Pelanggan
        </h2>
        <InfiniteMovingCards
          items={testimonials}
          direction="right"
          speed="normal"
        />
      </div>
      {/* BOTTOM FADE TO TRANSPARENT */}
      <div className="absolute bottom-0 left-0 w-full h-24 bg-gradient-to-t from-secondary to-transparent pointer-events-none" />
    </section>
  );
};

export default TestimonialCompro;

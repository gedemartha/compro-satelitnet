import AboutUs from "@/components/about-us";
import { Hero } from "@/components/hero";
import Services from "@/components/services";
import React from "react";

const ComproPage = () => {
  return (
    <div className="min-h-screen relative ">
      <Hero />
      <AboutUs />
      <Services />
    </div>
  );
};

export default ComproPage;

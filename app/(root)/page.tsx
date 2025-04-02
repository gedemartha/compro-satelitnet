import AboutUs from "@/components/about-us";
import Advantages from "@/components/advantages";
import { Hero } from "@/components/hero";
import ProductCompro from "@/components/product-compro";
import Services from "@/components/services";
import React from "react";

const ComproPage = () => {
  return (
    <div className="min-h-screen relative ">
      <Hero />
      <AboutUs />
      <Services />
      <Advantages />
      <ProductCompro />
    </div>
  );
};

export default ComproPage;

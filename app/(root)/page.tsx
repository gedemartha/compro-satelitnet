import AboutUs from "@/components/about-us";
import Advantages from "@/components/advantages";
import { Hero } from "@/components/hero";
import ProductCompro from "@/components/product-compro";
import Services from "@/components/services";
import { getComproProducts } from "@/lib/actions";
import React from "react";

const ComproPage = async () => {
  const products = await getComproProducts();

  return (
    <div className="min-h-screen relative ">
      <Hero />
      <AboutUs />
      <Services />
      <Advantages />
      <ProductCompro products={products} />
    </div>
  );
};

export default ComproPage;

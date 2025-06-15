"use client";

import React from "react";
import { Button } from "./ui/button";
import Link from "next/link";

const CTA = () => {
  return (
    <section
      className="relative w-full bg-cover bg-center bg-no-repeat text-white h-[90vh] max-md:h-auto"
      style={{ backgroundImage: `url('/meeting-draft.jpg')` }}
      id="cta"
    >
      <div className="bg-black/50 dark:bg-black/70 absolute inset-0 z-0" />

      {/* TOP GRADIENT FADE */}
      <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-b from-secondary to-transparent z-10" />

      {/* BOTTOM GRADIENT FADE */}
      <div className="absolute bottom-0 left-0 w-full h-5 bg-gradient-to-t from-secondary to-transparent z-10" />

      <div className="relative z-10 max-w-6xl mx-auto px-6 h-full flex items-center justify-center max-md:py-20">
        <div className="flex w-full gap-10 items-center max-md:flex-col max-md:gap-6">
          {/* Kiri */}
          <div className="flex w-[55%] max-md:w-full">
            <h1 className="text-4xl md:text-5xl font-bold mb-6 text-left max-md:text-3xl max-md:text-center">
              Tingkatkan bisnis Anda menjadi lebih{" "}
              <span className="text-main">modern</span>
              <span className="inline-block max-md:block">bersama kami.</span>
            </h1>
          </div>

          {/* Kanan */}
          <div className="flex-1 flex flex-col items-start max-md:items-center max-md:w-full">
            <p className="text-xl mb-8 text-justify max-md:text-center max-md:text-base">
              Kami siap membantu Anda mewujudkan solusi digital yang tepat.
              Hubungi kami untuk informasi lebih lanjut!
            </p>

            <Button
              variant="outline"
              className="p-2 bg-primary hover:bg-purple-950 hover:underline hover:text-white w-max h-max max-md:text-base"
            >
              <Link
                href="/meeting"
                className="text-xl hover:text-white max-md:text-base"
              >
                Hubungi Kami
              </Link>
            </Button>
          </div>
        </div>
      </div>
    </section>
  );
};

export default CTA;

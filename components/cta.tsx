"use client";

import React from "react";
import { Button } from "./ui/button";
import Link from "next/link";
//comment selama development
// import { ContainerTextFlip } from "./ui/container-text-flip";

const CTA = () => {
  // const words = [   //comment selama development
  //   "cepat",
  //   "digital",
  //   "efisien",
  //   "modern",
  //   "otomatis",
  //   "scalable",
  //   "kompetitif",
  // ];

  return (
    <section
      className="relative w-full bg-cover bg-center bg-no-repeat text-white h-[90vh] "
      style={{ backgroundImage: `url('/meeting-draft.jpg')` }}
      id="cta"
    >
      <div className="bg-black/50 dark:bg-black/70 absolute inset-0 z-0" />

      {/* TOP GRADIENT FADE */}
      <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-b from-secondary to-transparent  z-10" />

      {/* BOTTOM GRADIENT FADE */}
      <div className="absolute bottom-0 left-0 w-full h-5 bg-gradient-to-t from-secondary to-transparent  z-10" />

      <div className="relative z-10 max-w-6xl mx-auto px-6 h-full flex items-center justify-center">
        <div className="flex w-full gap-10 items-center">
          {/* Kiri */}
          <div className="flex w-[55%] ">
            <h1 className="text-4xl md:text-5xl font-bold mb-6 text-left">
              Tingkatkan bisnis Anda menjadi lebih
              {/* <span suppressHydrationWarning className="ml-2 inline-block">       // comment selama development
                <ContainerTextFlip
                  words={words}
                  className="text-4xl md:text-5xl"
                />
              </span> */}
              <span className="inline-block mt-3">bersama kami.</span>
            </h1>
          </div>

          {/* Kanan */}
          <div className="flex-1 flex flex-col items-start ">
            <p className="text-xl mb-8 text-justify">
              Jadwalkan pertemuan dengan kami dan mulai transformasi digital
              bisnis Anda hari ini.
            </p>

            <Button
              variant="outline"
              className="p-2 bg-primary hover:bg-purple-950 hover:underline hover:text-white w-max h-max"
            >
              <Link
                href="/meeting-request"
                className="text-xl hover:text-white"
              >
                Jadwalkan Meeting
              </Link>
            </Button>
          </div>
        </div>
      </div>
    </section>
  );
};

export default CTA;

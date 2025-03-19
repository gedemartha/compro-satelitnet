"use client";
import React from "react";
import { Spotlight } from "@/components/ui/spotlight-new";

export function Hero() {
  return (
    <div className="h-[31rem] w-full  flex md:items-center md:justify-center bg-background antialiased relative overflow-hidden ">
      <Spotlight />
      <div className=" p-4 max-w-7xl  mx-auto relative z-10  w-full pt-20 md:pt-0 ">
        <h1 className="text-4xl md:text-7xl font-bold text-center bg-clip-text text-transparent bg-gradient-to-br dark:bg-gradient-to-br from-primary to-foreground dark:from-foreground dark:to-primary bg-opacity-50">
          SatelitNET Komputer
        </h1>
        <p className="mt-4 font-normal text-base text-foreground max-w-lg text-center mx-auto">
          Lorem ipsum dolor sit amet consectetur adipisicing elit. Alias tenetur
          repudiandae debitis aut expedita vitae quasi reprehenderit tempora
          natus quibusdam?
        </p>
      </div>
    </div>
  );
}

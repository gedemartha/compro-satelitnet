"use client";

import React from "react";
import { Spotlight } from "@/components/ui/spotlight-new";
import { Button } from "./ui/button";
import Link from "next/link";

export function Hero() {
  return (
    <div
      id="hero"
      className="relative h-[31rem] w-full bg-background antialiased overflow-hidden flex items-center justify-center"
    >
      <Spotlight />

      <div className="relative z-10 w-full max-w-7xl px-4 mx-auto flex flex-col items-center text-center">
        <h1 className="text-4xl md:text-7xl font-bold bg-clip-text text-transparent bg-gradient-to-br from-primary to-foreground dark:from-foreground dark:to-primary">
          SatelitNET Komputer
        </h1>

        <p className="mt-4 text-base md:text-lg max-w-3xl font-semibold text-foreground text-center">
          Solusi IT terintegrasi untuk bisnis masa kini.{" "}
          <br className="hidden md:block" />
          Digitalisasi bisnis Anda menjadi lebih mudah, cepat, dan efisien
          bersama kami.
        </p>

        <div className="mt-6 flex flex-col sm:flex-row items-center justify-center gap-4">
          <Link href="/#about" passHref>
            <Button className="px-6 py-3 rounded-lg text-base font-medium transition-all duration-300 bg-primary border-border  dark:bg-primary hover:bg-primary/80">
              Tentang Kami
            </Button>
          </Link>

          <Link href="/meeting" passHref>
            <Button
              variant="outline"
              className="px-6 py-3 rounded-lg text-base font-medium transition-all duration-300 border-border text-primary bg-white dark:text-foreground hover:bg-primary hover:text-white dark:bg-purple-satelit"
            >
              Hubungi Kami
            </Button>
          </Link>
        </div>
      </div>
    </div>
  );
}

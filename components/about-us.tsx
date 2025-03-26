import Image from "next/image";
import React from "react";

const AboutUs = () => {
  return (
    <section
      id="about"
      className="w-full h-[31rem] flex justify-center items-center bg-gradient-to-b from-background to-accent"
    >
      <div className="max-w-5xl mx-auto flex flex-row h-64 ">
        <div className="w-[50%] flex flex-col items-center gap-5 border border-purple-500 justify-center">
          <h1 className="text-3xl text-main font-extrabold text-center md:text-left ">
            Tentang SatelitNET Komputer
          </h1>
          <p className=" text-base text-center max-md:text-left leading-relaxed ">
            SatelitNET Komputer adalah penyedia solusi IT inovatif yang membantu
            bisnis dan individu berkembang melalui teknologi terbaik. Kecepatan,
            keamanan, dan kualitas adalah komitmen kami.
          </p>
        </div>
        <div className="border border-green-500 flex items-center w-[50%] justify-center">
          <Image
            src="/logo-satelitnet-transparent.png"
            width={300}
            height={300}
            alt="logo"
          />
        </div>
      </div>
    </section>
  );
};

export default AboutUs;

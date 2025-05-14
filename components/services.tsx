import Image from "next/image";
import Link from "next/link";
import React from "react";
import { Button } from "./ui/button";

const services = [
  {
    id: 1,
    title: "Sewa Internet / Warnet",
    description:
      "Nikmati koneksi internet cepat dan stabil dengan layanan warnet kami. Cocok untuk bekerja, belajar, atau gaming dengan nyaman.",
    image: "/warnet-draft.jpg",
    imagePosition: "left",
  },
  {
    id: 2,
    title: "Software Development",
    description:
      "Kami menyediakan layanan pengembangan perangkat lunak yang inovatif dan sesuai kebutuhan bisnis Anda, mulai dari sistem manajemen informasi hingga aplikasi berbasis web.",
    image: "/soft-dev-draft.jpg",
    imagePosition: "right",
  },
];

const Services = () => {
  return (
    <section
      id="services"
      className="w-full py-24 bg-gradient-to-b from-accent to-secondary"
    >
      <div className="max-w-5xl mx-auto space-y-16 px-6 max-md:mt-40">
        <h1 className="text-main text-5xl font-bold text-center pb-1 max-md:text-4xl">
          Layanan Kami
        </h1>

        {services.map((service) => (
          <div
            key={service.id}
            className={`flex items-center justify-between gap-12 max-md:flex-col ${
              service.imagePosition === "right"
                ? "flex-row-reverse max-md:flex-col-reverse"
                : "flex-row"
            }`}
          >
            {/* Kontainer Gambar */}
            <div className="flex-1 max-md:w-full">
              <Image
                src={service.image}
                width={500}
                height={300}
                alt={service.title}
                className="rounded-lg shadow-lg w-full max-md:max-w-[90%] mx-auto"
              />
            </div>

            {/* Kontainer Teks */}
            <div className="flex-1 max-md:text-center max-md:w-full">
              <h2 className="text-3xl font-bold text-main">{service.title}</h2>
              <p className="mt-4 text-lg">{service.description}</p>
              {service.id === 1 && (
                <>
                  <p className="mt-4 text-md font-semibold">
                    📍 Lokasi: Jl. Kenumang No.18, Gianyar, Kec. Gianyar,
                    Kabupaten Gianyar, Bali 80511
                  </p>
                  <p className="mt-4 text-md font-semibold">
                    🗺️ Google Maps:{" "}
                    <Link href={"https://maps.app.goo.gl/wqjzvAEpQW4Ci61M8"}>
                      <Button
                        variant={"link"}
                        className="text-base text-foreground m-0 p-0"
                      >
                        https://maps.app.goo.gl/wqjzvAEpQW4Ci61M8
                      </Button>
                    </Link>
                  </p>
                </>
              )}
            </div>
          </div>
        ))}
      </div>
    </section>
  );
};

export default Services;

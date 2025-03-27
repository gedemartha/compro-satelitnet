"use client";

import Image from "next/image";
import { useState } from "react";
import { motion } from "framer-motion";
import { FaInternetExplorer, FaLaptopCode } from "react-icons/fa";
import Link from "next/link";
import { Button } from "./ui/button";

interface ServiceType {
  title: string;
  description: string;
  icon: React.JSX.Element;
  image: string;
  link: string;
}

const listServices: ServiceType[] = [
  {
    title: "Sewa Internet / Warnet",
    description: "Layanan internet cepat dan stabil untuk kebutuhan harianmu.",
    icon: <FaInternetExplorer className="text-4xl text-primary" />,
    image: "/warnet-draft.jpg",
    link: "/warnet",
  },
  {
    title: "Software Development",
    description: "Pembuatan aplikasi dan sistem sesuai kebutuhan bisnis Anda.",
    icon: <FaLaptopCode className="text-4xl text-primary" />,
    image: "/soft-dev-draft.jpg",
    link: "/software-development",
  },
];

const Services = () => {
  const [selectedService, setSelectedService] = useState<ServiceType | null>(
    null
  );

  return (
    <section
      id="services"
      className="  w-full h-[50rem] flex gap-5 flex-col items-center bg-gradient-to-b from-accent to-secondary"
    >
      <div className="mt-[75px] pt-5 max-h-fit  ">
        <h1 className="text-main text-5xl font-bold leading-none relative overflow-visible  pb-1">
          Layanan Kami
        </h1>
      </div>

      <div className="grid grid-cols-2 gap-16 max-w-5xl w-full px-6 max-sm:max-w-xl max-sm:grid-cols-1">
        {listServices.map((service, index) => (
          <motion.div
            key={index}
            className="relative p-6 border border-border rounded-lg bg-background shadow-lg flex flex-col items-center text-center transition-all duration-300 hover:scale-105 overflow-hidden"
            whileHover={{ scale: 1.05 }}
          >
            <Image
              src={service.image}
              alt={service.title}
              width={400}
              height={250}
              className="rounded-lg object-cover w-full h-48"
            />
            <div className="mt-4 flex flex-col items-center">
              {service.icon}
              <h2 className="text-2xl font-semibold mt-2">{service.title}</h2>
              <p className="mt-2">{service.description}</p>
              <button
                className="mt-4 px-4 py-2 bg-primary text-white rounded-md hover:bg-primary/80 transition-all"
                onClick={() => setSelectedService(service)}
              >
                Pelajari Lebih Lanjut
              </button>
            </div>
          </motion.div>
        ))}
      </div>

      {/* Modal Pop-up */}
      {selectedService && (
        <div className="fixed inset-0 bg-black/60 flex justify-center items-center z-50">
          <div className="bg-background p-6 rounded-lg max-w-5xl w-full text-center">
            <h2 className="text-3xl font-bold text-foreground">
              {selectedService.title}
            </h2>
            <Image
              src={selectedService.image}
              alt={selectedService.title}
              width={400}
              height={250}
              className="rounded-lg object-contain w-full h-48 my-4"
            />
            <p className="text-gray-700">{selectedService.description}</p>
            <div className="mt-4 flex justify-center gap-4">
              <Link href={selectedService.link}>
                <button className="px-4 py-2 bg-primary text-white rounded-md hover:bg-primary/80 transition-all">
                  Lihat Detail
                </button>
              </Link>
              <Button
                className="px-4 py-2 bg-gray-400 text-white rounded-md hover:bg-gray-500 transition-all"
                onClick={() => setSelectedService(null)}
              >
                Tutup
              </Button>
            </div>
          </div>
        </div>
      )}
    </section>
  );
};

export default Services;

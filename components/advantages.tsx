import React from "react";
import {
  FaCheckCircle,
  FaShieldAlt,
  FaUserTie,
  FaLaptopCode,
} from "react-icons/fa";

const Advantages = () => {
  const features = [
    {
      icon: <FaCheckCircle className="text-primary text-5xl" />,
      title: "Layanan Terpercaya",
      description:
        "Kami menyediakan layanan yang andal dengan teknologi terbaru untuk memastikan kepuasan pelanggan.",
    },
    {
      icon: <FaShieldAlt className="text-primary text-5xl" />,
      title: "Keamanan Data",
      description:
        "Keamanan data pelanggan adalah prioritas utama kami dengan sistem perlindungan yang canggih.",
    },
    {
      icon: <FaUserTie className="text-primary text-5xl" />,
      title: "Tim Profesional",
      description:
        "Tim kami terdiri dari para ahli di bidangnya yang siap membantu dan memberikan solusi terbaik.",
    },
    {
      icon: <FaLaptopCode className="text-primary text-5xl" />,
      title: "Teknologi Terbaru",
      description:
        "Kami selalu menggunakan teknologi terbaru dalam pengembangan perangkat lunak dan layanan kami.",
    },
  ];

  return (
    <section
      id="advantages"
      className="w-full py-20 bg-gradient-to-b from-secondary to-toned  flex flex-col items-center"
    >
      <h2 className="text-main text-5xl font-bold mb-12 pb-1">
        Keunggulan Kami
      </h2>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 max-w-7xl items-center ">
        {features.map((feature, index) => (
          <div
            key={index}
            className="flex flex-col items-center text-center  p-6 rounded-lg  max-h-md h-full "
          >
            {feature.icon}
            <h3 className="text-2xl text-main font-semibold mt-4">
              {feature.title}
            </h3>
            <p className="mt-2">{feature.description}</p>
          </div>
        ))}
      </div>
    </section>
  );
};

export default Advantages;

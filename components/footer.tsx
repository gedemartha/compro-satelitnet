// components/Footer.tsx

import React from "react";
import { FaPhoneAlt, FaEnvelope, FaMapMarkerAlt } from "react-icons/fa";

const Footer = () => {
  return (
    <footer className="bg-background pt-12 pb-7 px-6 rounded mt-50">
      <div className="max-w-6xl mx-auto flex flex-col md:flex-row justify-around items-start gap-8 ">
        <div className="flex flex-col space-y-4">
          <h3 className="text-2xl font-semibold">SatelitNET Komputer</h3>
          <p className="max-w-md text-sm ">
            Kami hadir untuk membantu transformasi digital usaha dan bisnis Anda
            melalui solusi teknologi yang modern dan terpercaya.
          </p>
        </div>

        <div className="flex flex-col space-y-4">
          <h4 className="text-xl font-semibold mb-2">Hubungi Kami</h4>
          <div className="flex items-center gap-3 text-sm ">
            <FaPhoneAlt className="text-primary" />
            <span>+62 812-3456-7890</span>
          </div>
          <div className="flex items-center gap-3 text-sm ">
            <FaEnvelope className="text-primary" />
            <span>info@satelitnet.com</span>
          </div>
          <div className="flex items-center gap-3 text-sm ">
            <FaMapMarkerAlt className="text-primary" />
            <span>Jl. Teknologi No.123, Jakarta</span>
          </div>
        </div>
      </div>

      <div className="mt-8 text-foreground text-center text-sm border-t border-gray-700 flex-1 items-center justify-center pt-5">
        &copy; {new Date().getFullYear()} SatelitNET Komputer. All rights
        reserved.
      </div>
    </footer>
  );
};

export default Footer;

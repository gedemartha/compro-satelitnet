// components/Footer.tsx

import Link from "next/link";
import React from "react";
import { FaPhoneAlt, FaEnvelope, FaMapMarkerAlt } from "react-icons/fa";
import { Button } from "./ui/button";

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
            <span>+62 878-6019-2369</span>
          </div>
          <div className="flex items-center gap-3 text-sm ">
            <FaEnvelope className="text-primary" />
            <Link href="mailto:satelit.internet@gmail.com">
              <Button variant="link" className="p-0 m-0 text-foreground">
                satelit.internet@gmail.com
              </Button>
            </Link>
          </div>
          <div className="flex items-center gap-3 text-sm ">
            <FaMapMarkerAlt className="text-primary" />
            <span className="max-w-sm">
              Jl. Kenumang No.18, Gianyar, Kec. Gianyar, Kabupaten Gianyar, Bali
              80511
            </span>
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

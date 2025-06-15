"use client";

import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTrigger,
} from "@/components/ui/dialog";
import { DialogTitle } from "@radix-ui/react-dialog";
import Image from "next/image";
import Link from "next/link";
import { useState } from "react";
import { Button } from "./ui/button";

type Product = {
  id: string;
  name: string;
  image?: string | null;
  version: string;
  description: string;
};

export default function ProductModal({
  product,
  children,
}: {
  product: Product;
  children: React.ReactNode;
}) {
  const [open, setOpen] = useState(false);

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>{children}</DialogTrigger>
      <DialogContent className="max-w-2xl max-h-[80vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="text-2xl font-bold mb-4">
            {product.name}
          </DialogTitle>
        </DialogHeader>

        {product.image && (
          <Image
            src={product.image}
            alt={product.name}
            width={600}
            height={338} // rasio 16:9
            className="rounded-lg mb-4 object-cover w-full h-auto"
          />
        )}

        <p className="text-sm text-gray-400">Versi: {product.version}</p>
        <p>{product.description}</p>
        <div className="flex flex-col mt-6 gap-2">
          <p>Tertarik dengan produk ini?</p>
          <Link href="/meeting">
            <Button
              variant="outline"
              className=" p-2 bg-primary hover:bg-purple-950 hover:underline"
            >
              Tanyakan Produk
            </Button>
          </Link>
        </div>
      </DialogContent>
    </Dialog>
  );
}

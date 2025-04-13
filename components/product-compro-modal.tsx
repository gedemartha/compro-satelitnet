"use client";

import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTrigger,
} from "@/components/ui/dialog";
import { DialogTitle } from "@radix-ui/react-dialog";
import Image from "next/image";
import { useState } from "react";

type Product = {
  id: string;
  name: string;
  image?: string | null;
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

        <p className="mb-2">{product.description}</p>
      </DialogContent>
    </Dialog>
  );
}

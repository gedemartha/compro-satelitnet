"use client";

import { useState } from "react";
import Image from "next/image";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import Link from "next/link";

interface Product {
  id: string;
  name: string;
  description: string;
  image: string | null;
  version: string;
}

const ProductCompro = ({ products }: { products: Product[] }) => {
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);
  const [isOpen, setIsOpen] = useState(false);

  const openModal = (product: Product) => {
    setSelectedProduct(product);
    setIsOpen(true);
  };

  if (products.length <= 0) {
    return <div>No products found!</div>;
  }

  return (
    <section
      id="products"
      className="py-24 bg-gradient-to-b from-toned to-purple-satelit"
    >
      <div className="max-w-6xl mx-auto px-4 ">
        <h2 className="text-main text-4xl font-bold text-center mb-16">
          Produk Kami
        </h2>

        <div className="grid gap-10 grid-cols-1 sm:grid-cols-2 lg:grid-cols-3">
          {products.map((product) => (
            <div
              key={product.id}
              className="bg-card rounded-xl shadow-lg transform transition-all duration-300 hover:scale-[1.02] hover:shadow-2xl"
            >
              <div className="relative w-full h-56">
                <Image
                  src={product.image ?? "/placeholder.png"}
                  alt={product.name}
                  fill
                  className="object-cover"
                />
              </div>

              <div className="p-6 flex flex-col justify-between flex-grow w-full ">
                <div className="mb-4 w-full">
                  <div className="flex justify-between items-center mb-2">
                    <h3 className="text-2xl font-bold text-main max-w-[90%] break-words">
                      {product.name}
                    </h3>
                    <span className="text-sm bg-primary  py-1 px-2 rounded-full text-white">
                      {product.version}
                    </span>
                  </div>
                  <p className=" text-base leading-relaxed line-clamp-3 min-h-[84px] break-words max-w-[90%] text-justify">
                    {product.description}
                  </p>
                </div>

                <Button
                  variant="outline"
                  className="text-sm w-fit"
                  onClick={() => openModal(product)}
                >
                  Lihat Detail
                </Button>
              </div>
            </div>
          ))}
        </div>

        <Dialog open={isOpen} onOpenChange={setIsOpen}>
          <DialogContent className="max-w-2xl max-h-screen overflow-y-auto">
            {selectedProduct && (
              <>
                <div className="relative w-full h-fit mb-4">
                  <Image
                    src={selectedProduct.image ?? "/placeholder.png"}
                    alt={selectedProduct.name}
                    width={300}
                    height={200}
                    className="rounded-lg object-cover mx-auto"
                  />
                </div>
                <DialogHeader>
                  <DialogTitle className="max-w-xl break-words">
                    {selectedProduct.name}
                  </DialogTitle>
                </DialogHeader>
                <p className="text-base leading-relaxed max-w-xl overflow-y-auto ">
                  {selectedProduct.description}
                </p>
                <p className="text-sm mt-4">Versi: {selectedProduct.version}</p>
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
              </>
            )}
          </DialogContent>
        </Dialog>
      </div>
    </section>
  );
};

export default ProductCompro;

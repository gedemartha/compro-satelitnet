import { getComproProducts } from "@/lib/actions"; // fungsi ambil data produk dari database
import Image from "next/image";

import ProductModal from "@/components/product-compro-modal";

const ComproProductPage = async () => {
  const products = await getComproProducts();

  return (
    <div className="max-w-6xl mx-auto px-6 py-12">
      <h1 className="text-4xl font-bold mb-8">Produk Kami</h1>

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-8">
        {products.map((product) => (
          <ProductModal key={product.id} product={product}>
            <div className="bg-card p-4 rounded shadow hover:shadow-lg transition cursor-pointer border-border border-2">
              {product.image && (
                <Image
                  src={product.image}
                  alt={product.name}
                  width={400}
                  height={300}
                  className="rounded-t-md object-cover h-48 w-full   border-border "
                />
              )}
              <div className="rounded-b-md flex flex-col gap-2 items-start bg-toned ">
                <h2 className="text-xl font-bold pt-2 px-4 text-foreground">
                  {product.name}
                </h2>
                <p className=" text-md truncate pb-2 px-4 max-w-full">
                  {product.description}
                </p>
                <p className="text-sm pb-2 px-4">{product.version}</p>
              </div>
            </div>
          </ProductModal>
        ))}
      </div>
    </div>
  );
};

export default ComproProductPage;

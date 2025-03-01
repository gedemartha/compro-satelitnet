import { CreateProductModal } from "@/components/create-product-modal";
import { NewProductTable } from "@/components/product-table";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Products",
};

const ProductsPage = () => {
  return (
    <div className="min-h-screen ">
      <div className="max-w-screen-lg mx-auto py-10">
        <div className="w-full flex justify-between items-center">
          <h1 className="text-2xl font-bold text-foreground pb-5">
            Product List
          </h1>
          <CreateProductModal className="mr-6" />
        </div>
        <NewProductTable />
      </div>
    </div>
  );
};

export default ProductsPage;

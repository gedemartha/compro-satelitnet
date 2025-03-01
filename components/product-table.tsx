import React from "react";
import { getProducts } from "@/lib/data";
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import Image from "next/image";
import { Button } from "./ui/button";
import { EditProductModal } from "./edit-product-modal";

export const ProductTable = async () => {
  const products = await getProducts();
  if (!products?.length)
    return <h1 className="text-2xl">No products found!</h1>;
  return (
    <table className="w-full bg-white mt-3">
      <thead className="border-b border-gray-100 text-slate-500">
        <tr>
          <th className="py-3 px-6 text-left text-sm">Name</th>
          <th className="py-3 px-6 text-left text-sm">Image</th>
          <th className="py-3 px-6 text-left text-sm">Description</th>
          <th className="py-3 px-6 text-left text-sm">Version</th>
        </tr>
      </thead>
      <tbody>
        {products.map((product) => (
          <tr key={product.id} className="text-slate-900">
            <td className="py-3 px-6">{product.name}</td>
            <td className="py-3 px-6">{product.image}</td>
            <td className="py-3 px-6">{product.description}</td>
            <td className="py-3 px-6">{product.version}</td>
          </tr>
        ))}
      </tbody>
    </table>
  );
};

export const NewProductTable = async () => {
  const products = await getProducts();

  if (!products?.length) {
    return <h1 className="text-2xl">No products found!</h1>;
  }

  return (
    <Table className="border-2 rounded-full border-border dark:border-white">
      <TableCaption>A list of your products.</TableCaption>
      <TableHeader>
        <TableRow className="bg-secondary">
          <TableHead className="w-[50px] font-bold text-foreground">
            No.
          </TableHead>
          <TableHead className="w-[50px] font-bold text-center text-foreground">
            Product ID
          </TableHead>
          <TableHead className="w-[200px] pl-6 font-bold text-foreground">
            Name
          </TableHead>
          <TableHead className="w-[250px] font-bold text-foreground">
            Description
          </TableHead>
          <TableHead className="w-[200px] text-center font-bold text-foreground">
            Image
          </TableHead>
          <TableHead className="w-[50px] px-10 text-center font-bold text-foreground">
            Version
          </TableHead>
          <TableHead className="w-[100px] px-10 text-center font-bold text-foreground">
            Action
          </TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {products.map((product) => (
          <TableRow key={product.id}>
            <TableCell className="text-foreground">
              {products.indexOf(product) + 1}
            </TableCell>
            <TableCell className="max-w-xs font-bold text-foreground overflow-hidden break-words">
              {product.id}
            </TableCell>
            <TableCell className="font-medium pl-6 text-foreground">
              {product.name}
            </TableCell>
            <TableCell className="text-justify">
              {product.description}
            </TableCell>
            <TableCell className="">
              <Image
                src="/logo-satelitnet-transparent.png"
                alt={product.name}
                width={2000}
                height={2000}
              />
            </TableCell>
            <TableCell className="text-center text-foreground">
              {product.version}
            </TableCell>
            <TableCell>
              <div className="flex items-center justify-between ">
                <EditProductModal
                  product={product}
                  className="px-4 py-2 text-sm max-w-md w-full bg-orange-500"
                />

                <Button
                  variant={"destructive"}
                  className="px-4 py-2 ml-2 text-sm max-w-md w-full "
                >
                  Delete
                </Button>
              </div>
            </TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  );
};

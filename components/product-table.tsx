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
import { EditProductModal } from "./crud/product/edit-product-modal";
import { DeleteProductButton } from "./crud/product/delete-product-button";

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
    <Table className="border-2 rounded-lg border-border dark:border-white">
      <TableCaption>A list of your products.</TableCaption>
      <TableHeader>
        <TableRow className="bg-secondary">
          <TableHead className="w-[50px] font-bold text-foreground">
            No.
          </TableHead>
          <TableHead className="w-[100px] font-bold text-center text-foreground hidden">
            Product ID
          </TableHead>
          <TableHead className="w-[200px] font-bold text-center text-foreground">
            Name
          </TableHead>
          <TableHead className="w-[250px] font-bold text-foreground">
            Description
          </TableHead>
          <TableHead className="w-[250px] font-bold text-foreground">
            category
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
        {products.map((product, index) => (
          <TableRow key={product.id}>
            <TableCell className="text-foreground">{index + 1}</TableCell>
            <TableCell className="w-[100px] font-bold text-foreground break-words overflow-hidden text-justify hidden">
              <span className="block max-w-[100px] break-words overflow-hidden">
                {product.id}
              </span>
            </TableCell>
            <TableCell className="font-medium text-center text-foreground max-w-[100px] break-words">
              {product.name}
            </TableCell>
            <TableCell className="text-justify max-w-sm break-words">
              {product.description}
            </TableCell>
            <TableCell className="text-justify max-w-sm break-words">
              {product.category.name}
            </TableCell>
            <TableCell className="text-center">
              {product.image && product.image.startsWith("/") ? (
                <Image
                  src={product.image}
                  alt={product.name}
                  width={150}
                  height={150}
                  className="rounded-md object-cover mx-auto"
                />
              ) : (
                <span className="text-gray-500">No Image</span>
              )}
            </TableCell>
            <TableCell className="text-center text-foreground max-w-[100px] break-words">
              {product.version}
            </TableCell>
            <TableCell>
              <div className="flex items-center justify-between gap-3">
                <EditProductModal
                  product={product}
                  className="px-4 py-2 text-sm max-w-md w-full bg-orange-500 hover:bg-orange-950"
                />
                <DeleteProductButton productId={product.id} />
              </div>
            </TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  );
};

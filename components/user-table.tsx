import React from "react";
import { getUsers } from "@/lib/data";
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
// import { EditProductModal } from "./crud/product/edit-product-modal";
// import { DeleteProductButton } from "./crud/product/delete-product-button";

export const UserTable = async () => {
  const users = await getUsers();

  if (!users?.length) {
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
          <TableHead className="w-[100px] font-bold text-center text-foreground">
            User ID
          </TableHead>
          <TableHead className="w-[200px] font-bold text-center text-foreground">
            Name
          </TableHead>
          <TableHead className="w-[250px] font-bold text-foreground">
            Email
          </TableHead>
          <TableHead className="w-[150px] font-bold text-foreground text-center">
            Image
          </TableHead>
          <TableHead className="w-[200px] text-center font-bold text-foreground">
            Role
          </TableHead>
          <TableHead className="w-[100px] px-10 text-center font-bold text-foreground">
            Action
          </TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {users.map((user) => (
          <TableRow key={user.id}>
            <TableCell className="text-foreground">
              {users.indexOf(user) + 1}
            </TableCell>
            <TableCell className="w-[100px] font-bold text-foreground break-words overflow-hidden text-justify">
              <span className="block max-w-[100px] break-words overflow-hidden">
                {user.id}
              </span>
            </TableCell>
            <TableCell className="font-medium text-center text-foreground">
              {user.name}
            </TableCell>
            <TableCell className="text-justify">{user.email}</TableCell>
            <TableCell className="flex justify-center">
              <Image
                src="/avatar.png"
                alt={user.username}
                width={64}
                height={64}
              />
            </TableCell>
            <TableCell className="text-center text-foreground">
              {user.role}
            </TableCell>
            <TableCell>
              {/* <div className="flex items-center justify-between gap-3">
                <EditUserModal
                  user={user}
                  className="px-4 py-2 text-sm max-w-md w-full bg-orange-500 hover:bg-orange-950"
                />

                <DeleteUserButton userId={user.id} /> */}
              {/* </div> */}
            </TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  );
};

export default UserTable;

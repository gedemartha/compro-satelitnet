import { CreateUserModal } from "@/components/crud/user/create-user-modal";
import UserTable from "@/components/user-table";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Users",
};

const ProductsPage = () => {
  return (
    <div className="min-h-screen ">
      <div className="max-w-screen-lg mx-auto py-10">
        <div className="w-full flex justify-between items-center">
          <h1 className="text-2xl font-bold text-foreground pb-5">User List</h1>
          <CreateUserModal className="mr-6" />
        </div>
        <UserTable />
      </div>
    </div>
  );
};

export default ProductsPage;

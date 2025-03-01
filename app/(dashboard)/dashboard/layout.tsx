import React from "react";
import { NavbarCMS } from "@/components/navbar";

const DashboardLayout = ({ children }: { children: React.ReactNode }) => {
  return (
    <div>
      <NavbarCMS />
      <main>{children}</main>
    </div>
  );
};

export default DashboardLayout;

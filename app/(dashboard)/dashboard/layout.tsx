import React from "react";
import { NavbarCMS } from "@/components/navbar";
import ThemeButton from "@/components/theme-button";

const DashboardLayout = ({ children }: { children: React.ReactNode }) => {
  return (
    <div className="relative">
      <NavbarCMS />
      <div className="fixed bottom-4 right-4 z-50">
        <ThemeButton />
      </div>
      <main className="z-0">{children}</main>
    </div>
  );
};

export default DashboardLayout;

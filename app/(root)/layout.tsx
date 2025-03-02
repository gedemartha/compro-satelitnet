import { NavbarCompro } from "@/components/navbar-compro";
import ThemeButton from "@/components/theme-button";
import * as React from "react";

const Layout = ({ children }: { children: React.ReactNode }) => {
  return (
    <div className="relative">
      <NavbarCompro />
      <div className="fixed bottom-4 right-4 z-50">
        <ThemeButton />
      </div>
      <main className="z-0">{children}</main>
    </div>
  );
};

export default Layout;

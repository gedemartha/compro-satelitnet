import { NavbarCompro } from "@/components/navbar-compro";
import * as React from "react";

const Layout = ({ children }: { children: React.ReactNode }) => {
  return (
    <div>
      <div className="flex justify-between items-center">
        <NavbarCompro />
      </div>
      {children}
    </div>
  );
};

export default Layout;

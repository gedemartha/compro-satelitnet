import Image from "next/image";
import Link from "next/link";
import ThemeButton from "./theme-button";
export const NavbarCompro = () => {
  return (
    <nav className="w-full ">
      <div className="flex items-center justify-between mx-auto p-4 ">
        <div>
          <Link href="/">
            <Image
              src="/logo-satelitnet-transparent.png"
              alt="Logo"
              width={128}
              height={36}
              priority
            />
          </Link>
        </div>
        <div className="flex gap-5">
          <ul className="flex items-center gap-4">
            <Link href="#">
              <li>Home</li>
            </Link>
            <Link href="#">
              <li>Products</li>
            </Link>
            <Link href="#">
              <li>Testimonials</li>
            </Link>
            <Link href="#">
              <li>Book a Meeting</li>
            </Link>
          </ul>
          <ThemeButton />
        </div>
      </div>
    </nav>
  );
};

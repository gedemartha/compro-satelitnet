import Image from "next/image";
import Link from "next/link";
import { Button } from "./ui/button";
export const NavbarCompro = () => {
  return (
    <nav className="w-full border-b-2 border-border bg-background  sticky top-0 z-10 shadow-md">
      <div className="flex items-center justify-between mx-auto p-4 ">
        <div>
          <Link href="/dashboard">
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
            <Link href="/dashboard">
              <Button variant={"link"} className="text-foreground p-0">
                <li className="text-base">Home</li>
              </Button>
            </Link>
            <Link href="#">
              <Button variant={"link"} className="text-foreground p-0">
                <li className="text-base">About Us</li>
              </Button>
            </Link>
            <Link href="#">
              <Button variant={"link"} className="text-foreground p-0">
                <li className="text-base">Products</li>
              </Button>
            </Link>
            <Link href="#">
              <Button variant={"link"} className="text-foreground p-0">
                <li className="text-base">Testimonials</li>
              </Button>
            </Link>
            <Link href="#">
              <li>
                <Button variant={"link"} className="text-foreground p-0">
                  <li className="text-base">Feedback</li>
                </Button>
              </li>
            </Link>
            <Link href="#">
              <Button variant={"link"} className="text-foreground p-0">
                <li className="text-base">Book a Meeting</li>
              </Button>
            </Link>
          </ul>
        </div>
      </div>
    </nav>
  );
};

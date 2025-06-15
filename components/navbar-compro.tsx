import Image from "next/image";
import Link from "next/link";
import { Button } from "./ui/button";
export const NavbarCompro = () => {
  return (
    <nav className="w-full border-b-[1px] border-border bg-background sticky top-0 z-50 shadow-md ">
      <div className="flex items-center justify-between mx-auto px-4 py-2 ">
        <div>
          <Link href="/">
            <Image
              src="/logo-satelitnet-transparent.png"
              alt="Logo"
              width={120}
              height={24}
              priority
            />
          </Link>
        </div>
        <div className="max-md:hidden flex gap-5">
          <ul className="flex items-center gap-4">
            <li>
              <Link
                href="/dashboard"
                className="text-base text-foreground p-0 font-semibold hover:underline"
              >
                Home
              </Link>
            </li>
            <li>
              <Link
                href="/#about"
                className="cursor-pointer text-base text-foreground p-0 font-semibold hover:underline"
              >
                Tentang Kami
              </Link>
            </li>
            <li>
              <Link
                href="/#services"
                className="cursor-pointer text-base text-foreground p-0 font-semibold hover:underline"
              >
                Layanan
              </Link>
            </li>
            <li>
              <Link
                href="/blog"
                className="cursor-pointer text-base text-foreground p-0 font-semibold hover:underline"
              >
                Blog
              </Link>
            </li>
            <li>
              <Link
                href="/product"
                className="cursor-pointer text-base text-foreground p-0 font-semibold hover:underline"
              >
                Produk
              </Link>
            </li>
            <li>
              <Link
                href="/#testimonial"
                className="cursor-pointer text-base text-foreground p-0 font-semibold hover:underline"
              >
                Testimoni
              </Link>
            </li>

            <Link href="/feedback">
              <li>
                <Button
                  variant="outline"
                  className="p-2 bg-primary hover:bg-purple-950 hover:underline "
                >
                  <li className="text-base text-white">Beri Ulasan</li>
                </Button>
              </li>
            </Link>
            <Link href="/meeting">
              <Button
                variant="outline"
                className=" p-2 bg-primary hover:bg-purple-950 hover:underline"
              >
                <li className="text-base text-white  ">Hubungi Kami</li>
              </Button>
            </Link>
          </ul>
        </div>
      </div>
    </nav>
  );
};

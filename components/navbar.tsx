import Image from "next/image";
import Link from "next/link";
import { auth, signOut } from "@/auth";
import * as React from "react";
import { Button } from "./ui/button";

export const NavbarCMS = async () => {
  const session = await auth();
  return (
    <nav className="border-b-2 border-border bg-background  sticky top-0 z-10 shadow-md">
      <div className="max-wscreen-xl flex items-center justify-between mx-auto p-4">
        <Link href="/dashboard">
          <Image
            src="/logo-satelitnet-transparent.png"
            alt="Logo"
            width={128}
            height={36}
            priority
          />
        </Link>
        <div className="flex items-center gap-3">
          <ul className="hidden md:flex items-center gap-4 mr-5 font-semibold text-primary dark:text-primary-foreground">
            {session && (
              <>
                <Link href="/">
                  <Button variant={"link"} className="text-foreground p-0">
                    <li className="text-base">Home</li>
                  </Button>
                </Link>

                {session.user.role === "admin" ? (
                  <>
                    <Link href="/dashboard/users">
                      <Button variant={"link"} className="text-foreground p-0">
                        <li className="text-base">Users</li>
                      </Button>
                    </Link>
                    <Link href="/dashboard/products">
                      <Button variant={"link"} className="text-foreground p-0">
                        <li className="text-base">Products</li>
                      </Button>
                    </Link>
                    <Link href="/dashboard/posts">
                      <Button variant={"link"} className="text-foreground p-0">
                        <li className="text-base">Posts</li>
                      </Button>
                    </Link>
                    <Link href="/dashboard/meetings">
                      <Button variant={"link"} className="text-foreground p-0">
                        <li className="text-base">Meetings</li>
                      </Button>
                    </Link>
                    <Link href="/dashboard/feedbacks">
                      <Button variant={"link"} className="text-foreground p-0">
                        <li className="text-base">Feedbacks</li>
                      </Button>
                    </Link>
                    <Link href="/dashboard/testimonials">
                      <Button variant={"link"} className="text-foreground p-0">
                        <li className="text-base">Testimonials</li>
                      </Button>
                    </Link>
                  </>
                ) : null}
              </>
            )}
          </ul>
          {session && (
            <div className="flex gap-3 items-center">
              <div className="flex flex-col justify-center -space-y-1">
                <span className="font-semibold  text-right capitalize">
                  {session.user.name}
                </span>
                <span className="text-xs  text-right capitalize">
                  {session.user.role}
                </span>
              </div>
              <button
                type="button"
                className="text-sm ring-2 bg-gray-100 rounded-full"
              >
                <Image
                  src={session.user.image || "/avatarF.svg"}
                  alt="avatar"
                  width={64}
                  height={64}
                  className=" w-8 h-8 rounded-full"
                />
              </button>
            </div>
          )}
          {session ? (
            <form
              action={async () => {
                "use server";
                await signOut({ redirectTo: "/login" });
              }}
            >
              <button
                type="submit"
                className="bg-destructive text-white px-4 py-2 rounded-md hover:bg-red-500 "
              >
                Sign Out
              </button>
            </form>
          ) : (
            <Link
              href="/login"
              className="bg-red-400 text-white px-4 py-2 rounded-md hover:bg-red-500"
            >
              Sign In
            </Link>
          )}
        </div>
      </div>
    </nav>
  );
};

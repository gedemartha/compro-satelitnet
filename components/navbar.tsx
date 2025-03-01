import Image from "next/image";
import Link from "next/link";
import { auth, signOut } from "@/auth";
import * as React from "react";
import ThemeButton from "./theme-button";

export const NavbarCMS = async () => {
  const session = await auth();
  return (
    <nav className="border-b-2 border-border ">
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
            <li className="hover:text-gray-800">
              <Link href="/dashboard">Home</Link>
            </li>
            {session && (
              <>
                <li className="hover:text-gray-800">
                  <Link href="/dashboard/products">Products</Link>
                </li>
                {session.user.role === "admin" ? (
                  <li className="hover:text-gray-800">
                    <Link href="/dashboard/users">Users</Link>
                  </li>
                ) : null}
              </>
            )}
          </ul>
          {session && (
            <div className="flex gap-3 items-center">
              <div className="flex flex-col justify-center -space-y-1">
                <span className="font-semibold text-primary dark:text-primary-foreground text-right capitalize">
                  {session.user.name}
                </span>
                <span className="text-xs text-primary dark:text-primary-foreground text-right capitalize">
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
          <ThemeButton />
        </div>
      </div>
    </nav>
  );
};

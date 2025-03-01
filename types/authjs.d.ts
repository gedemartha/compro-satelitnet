import { type DefaultSession } from "next-auth";
// eslint-disable-next-line
import { JWT } from "next-auth/jwt";

declare module "next-auth" {
  interface Session {
    user: Partial<User> & DefaultSession["user"];
  }

  interface User {
    role?: string; // Jadikan optional
  }
}

declare module "next-auth/jwt" {
  interface JWT {
    sub: string;
    role: string;
  }
}

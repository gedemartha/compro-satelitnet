"use client";
import React from "react";
import { useActionState } from "react";
import Link from "next/link";
import { signInCredentials } from "@/lib/actions";
import { NewLoginButton } from "@/components/button";

const FormLogin = () => {
  const [state, formAction] = useActionState(signInCredentials, null);
  return (
    <form action={formAction} className="space-y-6">
      {state?.message ? (
        <div
          className="p-4 mb-4 text-sm text-destructive rounded-lg bg-red-100"
          role="alert"
        >
          <span className="font-medium">{state?.message}</span>
        </div>
      ) : null}

      <div>
        <label
          htmlFor="email"
          className="block text-sm font-medium text-gray-900"
        >
          Email
        </label>
        <input
          type="email"
          name="email"
          id="email"
          placeholder="JaneDoe@gmail.com"
          className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm text-foreground bg-background"
        />
        <div aria-live="polite" aria-atomic="true">
          <span className="text-sm text-red-500 mt-2">
            {state?.error?.email}
          </span>
        </div>
      </div>
      <div>
        <label
          htmlFor="password"
          className="block text-sm font-medium text-gray-900"
        >
          Password
        </label>
        <input
          type="password"
          name="password"
          id="password"
          placeholder="*******"
          className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm text-foreground bg-background"
        />
        <div aria-live="polite" aria-atomic="true">
          <span className="text-sm text-red-500 mt-2">
            {state?.error?.password}
          </span>
        </div>
      </div>

      <NewLoginButton />
      <div className="w-full flex items-center justify-center">
        <p className="text-sm font-light text-accent-foreground dark:text-accent">
          Don&apos;t have an account?{" "}
          <Link href="/register">
            <span className="font-medium pl-1 text-primary">Sign up here</span>
          </Link>
        </p>
      </div>
    </form>
  );
};

export default FormLogin;

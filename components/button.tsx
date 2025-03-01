"use client";
import React from "react";

import { useFormStatus } from "react-dom";
import { Button } from "./ui/button";
import { Loader2 } from "lucide-react";

export const LoginButton = () => {
  const { pending } = useFormStatus();
  return (
    <button
      type="submit"
      className="w-full text-white bg-blue-700 font-medium rounded-lg px-5 py-2.5 text-center uppercase hover:bg-blue-800"
    >
      {pending ? "Authenticating..." : "Sign In"}
    </button>
  );
};

export const RegisterButton = () => {
  const { pending } = useFormStatus();
  return (
    <button
      type="submit"
      className="w-full text-white bg-blue-700 font-medium rounded-lg px-5 py-2.5 text-center uppercase hover:bg-blue-800"
    >
      {pending ? "Registering..." : "Registered"}
    </button>
  );
};

export const NewLoginButton = () => {
  const { pending } = useFormStatus();
  return (
    <Button type="submit" disabled={pending} className="w-full bg-primary">
      {" "}
      {pending ? (
        <>
          <Loader2 className="animate-spin mr-2" />
          Authenticating...
        </>
      ) : (
        "Login"
      )}
    </Button>
  );
};

export const NewRegisterButton = () => {
  const { pending } = useFormStatus();
  return (
    <Button type="submit" disabled={pending} className="w-full bg-primary">
      {" "}
      {pending ? (
        <>
          <Loader2 className="animate-spin mr-2" />
          Registering...
        </>
      ) : (
        "Register"
      )}
    </Button>
  );
};

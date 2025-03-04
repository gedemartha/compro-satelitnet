"use server";
import {
  ProductSchema,
  RegisterSchema,
  SignInSchema,
  UserSchema,
} from "@/lib/zod";
import { hashSync } from "bcrypt-ts";
import { prisma } from "@/lib/prisma";
import { redirect } from "next/navigation";
import { signIn } from "@/auth";
import { AuthError } from "next-auth";
import { revalidatePath } from "next/cache";

//Register or Sign Up Action

export const signUpCredentials = async (
  prevState: unknown,
  formData: FormData
) => {
  const validatedFields = RegisterSchema.safeParse(
    Object.fromEntries(formData.entries())
  );

  if (!validatedFields.success) {
    return {
      error: validatedFields.error.flatten().fieldErrors,
    };
  }
  const { name, email, username, password } = validatedFields.data;
  const hashedPassword = hashSync(password, 10);

  try {
    await prisma.user.create({
      data: {
        name,
        username,
        email,
        role: "user",
        password: hashedPassword,
      },
    });
  } catch (error) {
    return { message: `Failed to register user ${error}` };
  }
  redirect("/login");
};

// Sign In Credentials action
export const signInCredentials = async (
  prevState: unknown,
  formData: FormData
) => {
  const validatedFields = SignInSchema.safeParse(
    Object.fromEntries(formData.entries())
  );

  if (!validatedFields.success) {
    return {
      error: validatedFields.error.flatten().fieldErrors,
    };
  }
  const { email, password } = validatedFields.data;

  try {
    await signIn("credentials", { email, password, redirectTo: "/dashboard" });
  } catch (error) {
    if (error instanceof AuthError) {
      switch (error.type) {
        case "CredentialsSignin":
          return { message: "Invalid credentials." };
        default:
          return { message: "Something went wrong." };
      }
    }
    throw error;
  }
};

//  Product Actions

export const createProduct = async (prevState: unknown, formData: FormData) => {
  const validatedFields = ProductSchema.safeParse(
    Object.fromEntries(formData.entries())
  );

  if (!validatedFields.success) {
    return {
      error: validatedFields.error.flatten().fieldErrors,
    };
  }

  const { name, description, version, image } = validatedFields.data;

  try {
    await prisma.product.create({
      data: { name, description, version, image },
    });
    revalidatePath("/dashboard/products");

    return { success: true };
  } catch (error) {
    return { success: false, message: `Failed to create product: ${error}` };
  }
};

export const updateProduct = async (prevState: unknown, formData: FormData) => {
  const id = formData.get("id") as string;
  const name = formData.get("name") as string;
  const description = formData.get("description") as string;
  const version = formData.get("version") as string;

  if (!id || !name || !description || !version) {
    return { error: "All fields are required" };
  }

  try {
    await prisma.product.update({
      where: { id },
      data: { name, description, version },
    });

    revalidatePath("/dashboard/products"); // Refresh tabel produk tanpa reload halaman
    return { success: true };
  } catch (error) {
    console.error("Update product failed:", error);
    return { error: "Failed to update product" };
  }
};

export async function deleteProduct(
  prevState: unknown,
  formData: FormData // Data yang dikirimkan dari form
) {
  const id = formData.get("id") as string;
  if (!id) return { error: "Product ID is required" };

  try {
    await prisma.product.delete({ where: { id } });
    revalidatePath("/dashboard/products");
    return { success: true }; // Mengembalikan objek sukses
    // eslint-disable-next-line
  } catch (error) {
    return { error: "Failed to delete product" }; // Mengembalikan error jika gagal
  }
}

// User Actions

export const createUser = async (prevState: unknown, formData: FormData) => {
  const validatedFields = UserSchema.safeParse(
    Object.fromEntries(formData.entries())
  );

  if (!validatedFields.success) {
    return {
      error: validatedFields.error.flatten().fieldErrors,
    };
  }
  const { name, email, username, password } = validatedFields.data;
  const hashedPassword = hashSync(password, 10);

  try {
    await prisma.user.create({
      data: {
        name,
        username,
        email,
        role: "user",
        password: hashedPassword,
      },
    });

    revalidatePath("/dashboard/users"); // Refresh tabel user tanpa reload halaman
    return { success: true };
  } catch (error) {
    return { message: `Failed to register user ${error}` };
  }
};

export async function deleteUser(
  prevState: unknown,
  formData: FormData // Data yang dikirimkan dari form
) {
  const id = formData.get("id") as string;
  if (!id) return { error: "User ID is required" };

  try {
    await prisma.user.delete({ where: { id } });
    revalidatePath("/dashboard/users");
    return { success: true }; // Mengembalikan objek sukses
    // eslint-disable-next-line
  } catch (error) {
    return { error: "Failed to delete user" }; // Mengembalikan error jika gagal
  }
}

export const updateUser = async (prevState: unknown, formData: FormData) => {
  const id = formData.get("id") as string;
  const name = formData.get("name") as string;
  const username = formData.get("username") as string;
  const role = formData.get("role") as string;
  const password = formData.get("password") as string;

  if (!id || !name || !username || !role || !password) {
    return { error: "All fields are required" };
  }

  const hashedPassword = hashSync(password, 10);

  try {
    await prisma.user.update({
      where: { id },
      data: { name, username, role, password: hashedPassword },
    });

    revalidatePath("/dashboard/users"); // Refresh tabel produk tanpa reload halaman
    return { success: true };
  } catch (error) {
    console.error("Update user failed:", error);
    return { error: "Failed to update user" };
  }
};

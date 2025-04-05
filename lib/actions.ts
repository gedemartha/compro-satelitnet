"use server";
import {
  PostSchema,
  ProductSchema,
  RegisterSchema,
  SignInSchema,
  TestimonialSchema,
  UserSchema,
} from "@/lib/zod";
import { hashSync } from "bcrypt-ts";
import { prisma } from "@/lib/prisma";
import { redirect } from "next/navigation";
import { signIn } from "@/auth";
import { AuthError } from "next-auth";
import { revalidatePath } from "next/cache";
import { unlink, writeFile } from "fs/promises";
import { join } from "path";

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
  // Ambil data dari formData
  const name = formData.get("name") as string;
  const description = formData.get("description") as string;
  const version = formData.get("version") as string;
  const image = formData.get("image") as File | null;

  /* debug */
  console.log("FormData received:", {
    name,
    description,
    version,
    image,
  });

  let imagePath = "";

  // Jika ada file image, simpan ke public/uploads/
  if (image) {
    try {
      const bytes = await image.arrayBuffer();
      const buffer = Buffer.from(bytes);
      const filename = `product-${Date.now()}-${image.name}`;
      const filepath = join(process.cwd(), "public/uploads", filename);

      console.log("Saving file to:", filepath); // debug

      await writeFile(filepath, buffer);
      imagePath = `/uploads/${filename}`;
    } catch (error) {
      return {
        success: false,
        message: `Failed to upload image, Error:${error}`,
      };
    }
  }

  // Validasi data menggunakan Zod
  const validatedFields = await ProductSchema.safeParseAsync({
    name,
    description,
    version,
    image: imagePath, // Pastikan imagePath dikirim sebagai string
  });

  console.log("Zod Validation:", validatedFields);

  if (!validatedFields.success) {
    return {
      error: validatedFields.error.flatten().fieldErrors,
    };
  }

  try {
    // Simpan ke database
    await prisma.product.create({
      data: {
        name,
        description,
        version,
        image: imagePath,
      },
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
  const image = formData.get("image") as File | null;

  if (!id || !name || !description || !version) {
    return { error: "All fields are required" };
  }

  try {
    // Ambil produk lama dari database
    const existingProduct = await prisma.product.findUnique({
      where: { id },
    });

    if (!existingProduct) {
      return { error: "Product not found" };
    }

    let imagePath = existingProduct.image || ""; // Gunakan gambar lama jika tidak diubah

    // Jika ada file gambar baru, simpan ke /public/uploads/
    if (image) {
      try {
        const bytes = await image.arrayBuffer();
        const buffer = Buffer.from(bytes);
        const filename = `${Date.now()}-${image.name}`;
        const filepath = join(process.cwd(), "public/uploads", filename);

        await writeFile(filepath, buffer);
        imagePath = `/uploads/${filename}`;
      } catch (error) {
        return { error: `Failed to upload image: ${error}` };
      }
    }

    // Validasi data menggunakan Zod
    const validatedFields = await ProductSchema.safeParseAsync({
      name,
      description,
      version,
      image: imagePath,
    });

    if (!validatedFields.success) {
      return {
        error: validatedFields.error.flatten().fieldErrors,
      };
    }

    // Update produk di database
    await prisma.product.update({
      where: { id },
      data: {
        name,
        description,
        version,
        image: imagePath,
      },
    });

    revalidatePath("/dashboard/products"); // Refresh tabel produk tanpa reload halaman

    return { success: true };
  } catch (error) {
    console.error("Update product failed:", error);
    return { error: "Failed to update product" };
  }
};

export async function deleteProduct(prevState: unknown, formData: FormData) {
  const id = formData.get("id") as string;
  if (!id) return { error: "Product ID is required" };

  try {
    // Ambil informasi produk terlebih dahulu
    const product = await prisma.product.findUnique({
      where: { id },
      select: { image: true },
    });

    if (!product) {
      return { error: "Product not found" };
    }

    // Jika ada gambar, hapus dari folder uploads
    if (product.image) {
      // Pastikan path benar dengan hanya mengambil nama file
      const filename = product.image.replace("/uploads/", "");
      const imagePath = join(process.cwd(), "public/uploads", filename);

      try {
        await unlink(imagePath);
        console.log(`Image deleted: ${imagePath}`);
      } catch (error) {
        console.error("Failed to delete image:", error);
      }
    }

    // Hapus produk dari database
    await prisma.product.delete({ where: { id } });

    revalidatePath("/dashboard/products");
    return { success: true };
  } catch (error) {
    console.error("Delete product failed:", error);
    return { error: "Failed to delete product" };
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
  const validatedFields = UserSchema.safeParse(
    Object.fromEntries(formData.entries())
  );

  if (!validatedFields.success) {
    return {
      error: validatedFields.error.flatten().fieldErrors,
    };
  }
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

// Post Actions

export const createPost = async (prevState: unknown, formData: FormData) => {
  // Ambil data dari formData
  const title = formData.get("title") as string;
  const content = formData.get("content") as string;
  const authorId = formData.get("authorId") as string;
  const image = formData.get("image") as File | null;

  let imagePath = "";

  // Jika ada file image, simpan ke public/uploads/
  if (image) {
    try {
      const bytes = await image.arrayBuffer();
      const buffer = Buffer.from(bytes);
      const filename = `post-${Date.now()}-${image.name}`;
      const filepath = join(process.cwd(), "public/uploads", filename);

      await writeFile(filepath, buffer);
      imagePath = `/uploads/${filename}`;
    } catch (error) {
      return {
        success: false,
        message: `Failed to upload image, Error: ${error}`,
      };
    }
  }

  // Validasi data menggunakan Zod
  const validatedFields = await PostSchema.safeParseAsync({
    title,
    content,
    authorId,
    image: imagePath, // Pastikan imagePath dikirim sebagai string
  });

  if (!validatedFields.success) {
    return {
      error: validatedFields.error.flatten().fieldErrors,
    };
  }

  try {
    // Simpan ke database
    await prisma.post.create({
      data: {
        title,
        content,
        authorId,
        image: imagePath,
      },
    });

    revalidatePath("/dashboard/posts");

    return { success: true };
  } catch (error) {
    return { success: false, message: `Failed to create post: ${error}` };
  }
};

export const updatePost = async (prevState: unknown, formData: FormData) => {
  const id = formData.get("id") as string;
  const title = formData.get("title") as string;
  const content = formData.get("content") as string;
  const image = formData.get("image") as File | null;

  let imagePath = "";

  if (image) {
    try {
      const bytes = await image.arrayBuffer();
      const buffer = Buffer.from(bytes);
      const filename = `post-${Date.now()}-${image.name}`;
      const filepath = join(process.cwd(), "public/uploads", filename);

      await writeFile(filepath, buffer);
      imagePath = `/uploads/${filename}`;
    } catch (error) {
      return { success: false, message: `Failed to upload image: ${error}` };
    }
  }

  try {
    await prisma.post.update({
      where: { id },
      data: {
        title,
        content,
        image: imagePath || undefined, // Jika tidak ada gambar baru, pakai yang lama
      },
    });

    revalidatePath("/dashboard/posts");
    return { success: true };
  } catch (error) {
    return { success: false, message: `Failed to update post: ${error}` };
  }
};

export async function deletePost(prevState: unknown, formData: FormData) {
  const id = formData.get("id") as string;
  if (!id) return { error: "Post ID is required" };

  try {
    // Ambil informasi post terlebih dahulu
    const post = await prisma.post.findUnique({
      where: { id },
      select: { image: true },
    });

    if (!post) {
      return { error: "Post not found" };
    }

    // Jika ada gambar, hapus dari folder uploads
    if (post.image) {
      // Filename diambil langsung dari database
      const imagePath = join(process.cwd(), "public/", post.image);

      try {
        await unlink(imagePath);
        console.log(`Image deleted: ${imagePath}`);
      } catch (error) {
        console.error("Failed to delete image:", error);
      }
    }

    // Hapus post dari database
    await prisma.post.delete({ where: { id } });

    revalidatePath("/dashboard/posts");
    return { success: true };
  } catch (error) {
    console.error("Delete post failed:", error);
    return { error: "Failed to delete post" };
  }
}

// Testimonial Actions

export const createTestimonial = async (
  prevState: unknown,
  formData: FormData
) => {
  const rawData = Object.fromEntries(formData.entries());

  // Buat objek baru dengan rating dikonversi ke number
  const validatedFields = TestimonialSchema.safeParse({
    ...rawData,
    rating: Number(rawData.rating), // Konversi rating ke number
  });

  if (!validatedFields.success) {
    return {
      error: validatedFields.error.flatten().fieldErrors,
    };
  }

  const { name, content, logo, rating } = validatedFields.data;

  try {
    await prisma.testimonial.create({
      data: { name, content, logo, rating },
    });
    revalidatePath("/dashboard/posts");

    return { success: true };
  } catch (error) {
    return { success: false, message: `Failed to create product: ${error}` };
  }
};

export const updateTestimonial = async (
  prevState: unknown,
  formData: FormData
) => {
  const validatedFields = TestimonialSchema.safeParse(
    Object.fromEntries(formData.entries())
  );
  console.log(validatedFields);

  if (!validatedFields.success) {
    return {
      error: validatedFields.error.flatten().fieldErrors,
    };
  }

  const id = formData.get("id") as string;
  const name = formData.get("name") as string;
  const content = formData.get("content") as string;
  const logo = formData.get("logo") as string;
  const rating = Number(formData.get("rating"));

  if (!id || !name || !content || !logo || isNaN(rating)) {
    return { error: "All fields are required" };
  }

  try {
    await prisma.testimonial.update({
      where: { id },
      data: { name, content, logo, rating },
    });

    revalidatePath("/dashboard/testimonials"); // Refresh tabel testimonial tanpa reload halaman
    return { success: true };
  } catch (error) {
    console.error("Update testimonial failed:", error);
    return { error: "Failed to update testimonial" };
  }
};

export async function deleteTestimonial(
  prevState: unknown,
  formData: FormData // Data yang dikirimkan dari form
) {
  const id = formData.get("id") as string;
  if (!id) return { error: "Product ID is required" };

  try {
    await prisma.testimonial.delete({ where: { id } });
    revalidatePath("/dashboard/testimonials");
    return { success: true }; // Mengembalikan objek sukses
    // eslint-disable-next-line
  } catch (error) {
    return { error: "Failed to delete product" }; // Mengembalikan error jika gagal
  }
}

// Meeting actions

export const updateMeetingStatus = async (
  meetingId: string,
  newStatus: "Approved" | "Rejected"
) => {
  try {
    await prisma.meeting.update({
      where: { id: meetingId },
      data: { status: newStatus },
    });
    revalidatePath("/dashboard/meetings");
    return true;
  } catch (error) {
    console.error("Failed to update meeting status:", error);
    return false;
  }
};

export async function getComproProducts() {
  const products = await prisma.product.findMany({
    orderBy: { createdAt: "desc" },
    take: 6, // tampilkan maksimal 6 produk
  });
  return products;
}

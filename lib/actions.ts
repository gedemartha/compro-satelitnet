"use server";
import {
  FeedbackSchema,
  MeetingSchema,
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
import { slugify } from "@/lib/slugify";
import path, { join } from "path";
import { sendMail } from "./mailer";

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
    const userCount = await prisma.user.count(); // Jangan lupa pakai await
    const role = userCount === 0 ? "admin" : "user"; // Cek apakah ini user pertama
    await prisma.user.create({
      data: {
        name,
        username,
        email,
        role,
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
  const name = formData.get("name") as string;
  const description = formData.get("description") as string;
  const version = formData.get("version") as string;
  const image = formData.get("image") as File | null;
  const categoryId = formData.get("categoryId") as string;

  console.log("FormData received:", {
    name,
    description,
    version,
    categoryId,
    image,
  });

  let imagePath = "";

  if (image) {
    try {
      const bytes = await image.arrayBuffer();
      const buffer = Buffer.from(bytes);
      const filename = `product-${Date.now()}-${image.name}`;
      const filepath = join(process.cwd(), "public/uploads", filename);

      console.log("Saving file to:", filepath);

      await writeFile(filepath, buffer);
      imagePath = `/uploads/${filename}`;
    } catch (error) {
      return {
        success: false,
        message: `Failed to upload image, Error: ${error}`,
      };
    }
  }

  const validatedFields = await ProductSchema.safeParseAsync({
    name,
    description,
    version,
    image: imagePath,
    categoryId,
  });

  console.log("Zod Validation:", validatedFields);

  if (!validatedFields.success) {
    return {
      error: validatedFields.error.flatten().fieldErrors,
    };
  }

  try {
    await prisma.product.create({
      data: {
        name,
        description,
        version,
        image: imagePath,
        categoryId,
      },
    });

    revalidatePath("/dashboard/products");

    return { success: true };
  } catch (error) {
    return {
      success: false,
      message: `Failed to create product: ${error}`,
    };
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
    const userCount = await prisma.user.count(); // Jangan lupa pakai await

    const role = userCount === 0 ? "admin" : "user"; // Cek apakah ini user pertama
    await prisma.user.create({
      data: {
        name,
        username,
        email,
        role,
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
  const categoryId = formData.get("categoryId") as string;

  console.log("FormData received:", {
    title,
    content,
    authorId,
    categoryId,
    image,
  });
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

  const slug = slugify(title);

  // Validasi data menggunakan Zod
  const validatedFields = await PostSchema.safeParseAsync({
    title,
    content,
    authorId,
    image: imagePath, // Pastikan imagePath dikirim sebagai string
    slug,
    categoryId,
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
        slug,
        categoryId,
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

  const slug = slugify(title);

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
        slug,
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
  const name = formData.get("name") as string;
  const content = formData.get("content") as string;
  const rating = parseInt(formData.get("rating") as string);
  const logo = formData.get("logo") as File | null;

  let logoPath = "";

  if (logo) {
    try {
      const bytes = await logo.arrayBuffer();
      const buffer = Buffer.from(bytes);
      const filename = `logo-${Date.now()}-${logo.name}`;
      const filepath = join(process.cwd(), "public/uploads", filename);

      await writeFile(filepath, buffer);
      logoPath = `/uploads/${filename}`;
    } catch (error) {
      return {
        success: false,
        message: `Failed to upload logo, error : ${error}`,
      };
    }
  }

  const validatedFields = await TestimonialSchema.safeParseAsync({
    name,
    content,
    rating,
    logo: logoPath,
  });

  if (!validatedFields.success) {
    return { error: validatedFields.error.flatten().fieldErrors };
  }

  await prisma.testimonial.create({
    data: {
      name,
      content,
      rating,
      logo: logoPath,
    },
  });

  revalidatePath("/dashboard/testimonials");
  return { success: true };
};

export const updateTestimonial = async (
  prevState: unknown,
  formData: FormData
) => {
  const id = formData.get("id") as string;
  const name = formData.get("name") as string;
  const content = formData.get("content") as string;
  const rating = Number(formData.get("rating"));
  const file = formData.get("logo") as File;

  if (!id || !name || !content || isNaN(rating)) {
    return { error: "All fields are required" };
  }

  let logoPath: string | null = null;

  if (file && typeof file === "object" && file.size > 0) {
    const buffer = Buffer.from(await file.arrayBuffer());
    const filename = `${Date.now()}-${file.name.replace(/\s+/g, "_")}`;
    const filePath = path.join(process.cwd(), "public", "uploads", filename);

    await writeFile(filePath, buffer);
    logoPath = `/uploads/${filename}`;
  }

  try {
    await prisma.testimonial.update({
      where: { id },
      data: {
        name,
        content,
        rating,
        ...(logoPath && { logo: logoPath }),
      },
    });

    revalidatePath("/dashboard/testimonials");
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

export async function getAllPosts() {
  const posts = await prisma.post.findMany({});
  return posts;
}
export async function getSlugPost(slug: string) {
  const post = await prisma.post.findUnique({
    where: { slug },
    include: {
      author: true, // pastikan relasi ini ada di schema prisma kamu
    },
  });

  return post;
}

export async function getComproTestimonials() {
  const testimonials = await prisma.testimonial.findMany({
    orderBy: {
      createdAt: "desc",
    },

    select: {
      id: true,
      name: true,
      content: true,
      logo: true,
      rating: true,
    },
  });

  return testimonials.map((t) => ({
    quote: t.content,
    name: t.name,
    logo: t.logo ?? "Logo",
    rating: t.rating,
  }));
}

export const createFeedback = async (
  prevState: unknown,
  formData: FormData
) => {
  const name = formData.get("name") as string;
  const email = formData.get("email") as string;
  const content = formData.get("content") as string;
  const rating = parseInt(formData.get("rating") as string);

  const validatedFields = await FeedbackSchema.safeParseAsync({
    name,
    email,
    content,
    rating,
  });

  if (!validatedFields.success) {
    return {
      error: validatedFields.error.flatten().fieldErrors,
    };
  }

  await prisma.feedback.create({
    data: {
      name,
      email,
      content,
      rating,
    },
  });
  sendMail({
    to: email,
    subject: "Terima Kasih atas Feedback Anda terhadap SatelitNET Komputer!",
    html: `
  <div style="font-family: Arial, sans-serif; max-width: 600px; margin: auto; padding: 24px; border: 1px solid #e0e0e0; border-radius: 8px;">
    <h2 style="color: #1e40af;">Terima Kasih, ${name}!</h2>

    <p>
      Kami sangat menghargai feedback yang telah Anda berikan kepada <strong>SatelitNET Komputer</strong>.
      Masukan Anda membantu kami untuk terus meningkatkan kualitas layanan.
    </p>

    <p style="margin-top: 16px;">
      Jika Anda memiliki saran atau pertanyaan lebih lanjut, jangan ragu untuk menghubungi kami kembali kapan saja.
    </p>

    <hr style="margin: 32px 0;" />

    <footer style="font-size: 14px; color: #6b7280;">
      <p><strong>SatelitNET Komputer</strong></p>
      <p>Jl. Kenumang No.18, Gianyar, Kec. Gianyar Kabupaten Gianyar, Bali 80511</p>
      <p>Email: satelit.internet@gmail.com | WhatsApp: +62 878-6019-2369</p>
      <p style="margin-top: 16px;">&copy; ${new Date().getFullYear()} SatelitNET Komputer. All rights reserved.</p>
    </footer>
  </div>
`,
  }).catch((err) => {
    console.error("Gagal kirim email feedback:", err);
  });

  revalidatePath("/dashboard/feedback");
  return { success: true };
};

export const createMeeting = async (
  prevState: {
    error?: {
      name?: string[];
      email?: string[];
      notes?: string[];
      date?: string[];
    };
    success?: boolean;
  },
  formData: FormData
) => {
  const name = formData.get("name") as string;
  const email = formData.get("email") as string;
  const notes = formData.get("notes") as string;
  const date = formData.get("date") as string;

  const validated = await MeetingSchema.safeParseAsync({
    name,
    email,
    notes,
    date,
  });

  if (!validated.success) {
    return {
      error: validated.error.flatten().fieldErrors,
    };
  }

  const {
    name: validName,
    email: validEmail,
    notes: validNotes,
    date: validDate,
  } = validated.data;

  await prisma.meeting.create({
    data: {
      name: validName,
      email: validEmail,
      notes: validNotes,
      date: validDate,
      status: "pending", // default status
    },
  });

  sendMail({
    to: email,
    subject:
      "Terima Kasih telah mengisi penjadwalan Meeting anda bersama SatelitNET Komputer!",
    html: `
      <div style="font-family: Arial, sans-serif; max-width: 600px; margin: auto; padding: 24px; border: 1px solid #e0e0e0; border-radius: 8px;">
        <h2 style="color: #1e40af;">Terima Kasih, ${name}!</h2>
    
        <p>
          Kami telah menerima permintaan meeting Anda bersama <strong>SatelitNET Komputer</strong>.
          Tim kami akan segera menghubungi Anda untuk mengonfirmasi waktu dan detail meeting.
        </p>
    
        <p style="margin-top: 16px;">
          Mohon ditunggu informasi selanjutnya melalui pesan email. Kami akan segera memberikan update terkait jadwal yang tersedia.
        </p>
    
        <hr style="margin: 32px 0;" />
    
        <footer style="font-size: 14px; color: #6b7280;">
          <p><strong>SatelitNET Komputer</strong></p>
          <p>Jl. Kenumang No.18, Gianyar, Kec. Gianyar Kabupaten Gianyar, Bali 80511</p>
          <p>Email: satelit.internet@gmail.com | WhatsApp: +62 878-6019-2369</p>
          <p style="margin-top: 16px;">&copy; ${new Date().getFullYear()} SatelitNET Komputer. All rights reserved.</p>
        </footer>
      </div>
    `,
  }).catch((err) => {
    console.error("Gagal kirim email feedback:", err);
  });
  revalidatePath("/meeting"); // kalau kamu punya list meeting nanti

  return {
    success: true,
  };
};

export async function createCategory(data: { name: string }) {
  return await prisma.category.create({
    data: {
      name: data.name,
    },
  });
}

export const getCategories = async () => {
  try {
    const categories = await prisma.category.findMany({
      orderBy: { name: "asc" },
    });

    return categories.map((cat) => ({
      label: cat.name,
      value: cat.id,
    }));
  } catch (error) {
    console.error("Failed to fetch categories:", error);
    return [];
  }
};

export async function getDashboardCounts() {
  const [
    postCount,
    productCount,
    testimonialCount,
    meetingCount,
    feedbackCount,
  ] = await Promise.all([
    prisma.post.count(),
    prisma.product.count(),
    prisma.testimonial.count(),
    prisma.meeting.count(),
    prisma.feedback.count(),
  ]);

  return {
    postCount,
    productCount,
    testimonialCount,
    meetingCount,
    feedbackCount,
  };
}

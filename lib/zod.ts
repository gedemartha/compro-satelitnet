import { object, string, z } from "zod";

export const SignInSchema = object({
  email: string().email("Invalid Email"),
  password: string()
    .min(6, "Password must be at least 6 characters")
    .max(32, "Password must be less than 32 characters"),
});

export const RegisterSchema = object({
  name: string().min(1, "Name must be more than 1 character"),
  username: string().min(1, "Username must be more than 1 character"),
  email: string().email("Invalid Email"),
  password: string()
    .min(6, "Password must be at least 6 characters")
    .max(32, "Password must be less than 32 characters"),
  ConfirmPassword: string()
    .min(6, "Password must be at least 6 characters")
    .max(32, "Password must be less than 32 characters"),
}).refine((data) => data.password === data.ConfirmPassword, {
  message: "| Password does not match",
  path: ["ConfirmPassword"],
});

export const ProductSchema = object({
  name: string().min(1, "Product name is required"),
  description: string().min(5, "Description must be at least 5 characters"),
  version: string().min(1, "Version is required"),
  image: string().optional(),
});

export const UserSchema = object({
  name: string().min(1, "Name must be more than 1 character"),
  username: string().min(1, "Username must be more than 1 character"),
  email: string().email("Invalid Email"),
  password: string()
    .min(6, "Password must be at least 8 characters")
    .max(32, "Password must be less than 32 characters"),
});

export const PostSchema = object({
  title: string().min(1, "Name must be more than 1 character"),
  content: string().min(1, "Username must be more than 1 character"),
  authorId: string().min(1, "Name must be more than 1 character"),
  image: string().optional(),
  slug: string().optional(),
});

export const TestimonialSchema = object({
  name: string().min(1, "Name must be more than 1 character"),
  content: string().min(1, "Username must be more than 1 character"),
  logo: string().min(1, "Image path is required"),
  rating: z.preprocess(
    (val) => (val === "" ? 0 : Number(val)), // Ubah "" jadi 0, lalu ubah ke number
    z.number().min(1).max(5, "Rating must be between 1 and 5")
  ),
});

export const FeedbackSchema = object({
  name: z.string().min(1, "Nama tidak boleh kosong"),
  email: z.string().email("Format email tidak valid"),
  content: z.string().min(1, "Isi feedback harus diisi"),
  rating: z.preprocess(
    (val) => (val === "" ? 0 : Number(val)),
    z.number().min(1, "Rating harus diisi").max(5)
  ),
});

export const MeetingSchema = z.object({
  name: z.string().min(1, "Nama tidak boleh kosong"),
  email: z.string().email("Email tidak valid"),
  notes: z.string().min(1, "Catatan tidak boleh kosong"),
  date: z.preprocess(
    (val) => (val instanceof Date ? val : new Date(val as string)),
    z.date({ required_error: "Tanggal harus dipilih" })
  ),
});

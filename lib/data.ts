import { prisma } from "@/lib/prisma";
import { auth } from "@/auth";
import { redirect } from "next/navigation";

export const getUsers = async () => {
  const session = await auth();
  if (!session || !session.user || session.user.role !== "admin")
    redirect("/dashboard");

  try {
    const users = await prisma.user.findMany();
    return users;
  } catch (error) {
    console.log(error);
  }
};

export const getProducts = async () => {
  const session = await auth();
  if (!session || !session.user || session.user.role !== "admin")
    redirect("/dashboard");
  const role = session.user.role;

  if (role === "admin") {
    try {
      const products = await prisma.product.findMany();
      return products;
    } catch (error) {
      console.log(error);
    }
  }
};

export const getPosts = async () => {
  const session = await auth();
  if (!session || !session.user || session.user.role !== "admin")
    redirect("/dashboard");
  const role = session.user.role;

  if (role === "admin") {
    try {
      const posts = await prisma.post.findMany({
        include: { author: { select: { id: true, name: true } } },
      });

      return posts;
    } catch (error) {
      console.log(error);
    }
  }
};

export const getTestimonials = async () => {
  const session = await auth();
  if (!session || !session.user || session.user.role !== "admin")
    redirect("/dashboard");
  const role = session.user.role;

  if (role === "admin") {
    try {
      const testimonials = await prisma.testimonial.findMany();

      return testimonials;
    } catch (error) {
      console.log(error);
    }
  }
};

export const getMeetings = async () => {
  const session = await auth();
  if (!session || !session.user || session.user.role !== "admin")
    redirect("/dashboard");
  const role = session.user.role;

  if (role === "admin") {
    try {
      const meetings = await prisma.meeting.findMany();

      return meetings;
    } catch (error) {
      console.log(error);
    }
  }
};

export const getFeedbacks = async () => {
  const session = await auth();
  if (!session || !session.user || session.user.role !== "admin")
    redirect("/dashboard");
  const role = session.user.role;

  if (role === "admin") {
    try {
      const feedbacks = await prisma.feedback.findMany();

      return feedbacks;
    } catch (error) {
      console.log(error);
    }
  }
};

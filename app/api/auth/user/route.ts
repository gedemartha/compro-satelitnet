import { auth } from "@/auth";
import { NextResponse } from "next/server";

export async function GET() {
  const session = await auth(); // Ambil session
  if (!session || !session.user) {
    return NextResponse.json({ userId: null }, { status: 401 });
  }

  return NextResponse.json({ userId: session.user.id });
}

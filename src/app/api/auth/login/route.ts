import { NextResponse } from "next/server";
import jwt from "jsonwebtoken";

const JWT_SECRET = process.env.JWT_SECRET || "your_secret_here";

export async function POST(request: Request) {
  const { phone } = await request.json();

  // TODO: check if user exists in DB or create user if new

  const token = jwt.sign({ phone }, JWT_SECRET, { expiresIn: "7d" });

  const response = NextResponse.json({ message: "Login success" });
  response.cookies.set({
    name: "token",
    value: token,
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    maxAge: 60 * 60 * 24 * 7, // 7 days
    path: "/",
    sameSite: "lax",
  });

  return response;
}

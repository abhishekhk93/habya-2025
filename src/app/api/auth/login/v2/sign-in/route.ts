import prisma from "@/lib/prisma/prisma";
import { NextRequest, NextResponse } from "next/server";
import jwt from "jsonwebtoken";
import { serialize } from "cookie";

const JWT_SECRET = "habya2025"; // Move to env in production

export async function POST(req: NextRequest) {
  const { phone, password } = await req.json();

  if (!phone || !password) {
    return NextResponse.json(
      { error: "Phone and password are required" },
      { status: 400 }
    );
  }

  try {
    const user = await prisma.users.findFirst({ where: { phone } });

    if (!user) {
      return NextResponse.json(
        { error: "Phone number not registered" },
        { status: 401 }
      );
    }

    const dob = new Date(user.dob);
    const dd = String(dob.getDate()).padStart(2, "0");
    const mm = String(dob.getMonth() + 1).padStart(2, "0");
    const yyyy = dob.getFullYear();

    const expectedPassword = `${dd}${mm}${yyyy}${user.id}`;

    if (password !== expectedPassword) {
      return NextResponse.json(
        { error: "Incorrect password" },
        { status: 401 }
      );
    }

    const token = jwt.sign(
      {
        id: user.id,
        name: user.name,
        phone: user.phone,
        dob: user.dob,
        gender: user.gender,
        role: user.role,
      },
      JWT_SECRET,
      { expiresIn: "7d" }
    );

    const response = NextResponse.json({ status: "logged-in", user });
    response.headers.set(
      "Set-Cookie",
      serialize("token", token, {
        httpOnly: true,
        secure: process.env.NODE_ENV === "production",
        sameSite: "lax",
        path: "/",
        maxAge: 60 * 60 * 24 * 7,
      })
    );

    return response;
  } catch (err) {
    console.error("Login error:", err);
    return NextResponse.json(
      { error: "Server error. Try again." },
      { status: 500 }
    );
  }
}

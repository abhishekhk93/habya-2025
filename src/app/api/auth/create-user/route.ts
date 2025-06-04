import prisma from "@/lib/prisma/prisma";
import { NextRequest, NextResponse } from "next/server";
import jwt from "jsonwebtoken";
import { serialize } from "cookie";

// TO-DO: move secrets to secure place
const JWT_SECRET = "habya2025";

export async function POST(req: NextRequest) {
  const body = await req.json();
  const { phone, name, gender, dob } = body;

  if (!phone || !name || !gender || !dob) {
    return NextResponse.json({ error: "Missing fields" }, { status: 400 });
  }

  try {
    const existing = await prisma.users.findFirst({ where: { phone } });
    if (existing) {
      return NextResponse.json(
        { error: "User already exists" },
        { status: 409 }
      );
    }

    const genderToLower = gender.lower
    const user = await prisma.users.create({
      data: { phone, name, gender , dob: new Date(dob) },
    });

    const token = jwt.sign(
      {
        id: user.id,
        name: user.name,
        phone: user.phone,
        dob: user.dob,
        gender: user.gender,
      },
      JWT_SECRET,
      {
        expiresIn: "7d",
      }
    );

    const response = NextResponse.json({
      status: "created",
      user: {
        id: user.id,
        name: user.name,
        phone: user.phone,
        dob: user.dob,
        gender: user.gender,
      },
    });

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
    return NextResponse.json({ error: "Internal error - user creation failed" }, { status: 500 });
  }
}

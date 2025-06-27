import prisma from "@/lib/prisma/prisma";
import { NextRequest, NextResponse } from "next/server";
import jwt from "jsonwebtoken";
import { serialize } from "cookie";

// TO-DO: move secrets to secure place
const JWT_SECRET = "habya2025";

export async function POST(req: NextRequest) {
  const body = await req.json();

  const { phone } = body;

  if (!phone) {
    return NextResponse.json(
      { error: "Phone number is required" },
      { status: 400 }
    );
  }

  try {
    const user = await prisma.users.findFirst({
      where: { phone },
    });
    console.log(user);
    if (user) {
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
        {
          expiresIn: "7d",
        }
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
    } else {
      return NextResponse.json({ status: "new-user" });
    }
  } catch (err) {
    console.error("Prisma error:", err);
    return NextResponse.json(
      { error: "Internal server error - Login failed: ", err },
      { status: 500 }
    );
  }
}

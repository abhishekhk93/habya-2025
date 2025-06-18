import prisma from "@/lib/prisma/prisma";
import { NextRequest, NextResponse } from "next/server";
import jwt from "jsonwebtoken";

// TO-DO: move secrets to a secure location (like env vars)
const JWT_SECRET = "habya2025";

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const { phone, name, gender, dob } = body;

    if (!phone || !name || !gender || !dob) {
      return NextResponse.json({ error: "Missing fields" }, { status: 400 });
    }

    // Find the user by phone
    const existing = await prisma.users.findFirst({ where: { phone } });
    if (!existing) {
      return NextResponse.json({ error: "User not found" }, { status: 404 });
    }

    // Update the user
    const updatedUser = await prisma.users.update({
      where: { id: existing.id  },
      data: {
        name,
        gender,
        dob: new Date(dob),
      },
    });

    // Refresh JWT with updated details
    const token = jwt.sign(
      {
        id: updatedUser.id,
        name: updatedUser.name,
        phone: updatedUser.phone,
        gender: updatedUser.gender,
        dob: updatedUser.dob,
        role: updatedUser.role,
      },
      JWT_SECRET,
      { expiresIn: "7d" }
    );

    const response = NextResponse.json({
      status: "updated",
      user: {
        id: updatedUser.id,
        name: updatedUser.name,
        phone: updatedUser.phone,
        gender: updatedUser.gender,
        dob: updatedUser.dob,
        role: updatedUser.role,
      },
    });

    // Update the cookie with the new JWT
    response.headers.set(
      "Set-Cookie",
      `token=${token}; HttpOnly; Path=/; Max-Age=${60 * 60 * 24 * 7}; SameSite=Lax; ${
        process.env.NODE_ENV === "production" ? "Secure;" : ""
      }`
    );

    return response;
  } catch (err) {
    console.error("Edit user failed", err);
    return NextResponse.json(
      { error: "Internal error - user update failed" },
      { status: 500 }
    );
  }
}

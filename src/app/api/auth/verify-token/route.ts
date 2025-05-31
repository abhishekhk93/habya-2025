import { NextResponse } from "next/server";
import jwt from "jsonwebtoken";
import prisma from "@/lib/prisma/prisma";

// TO-DO: move secrets to secure place
const JWT_SECRET = "habya2025";

export async function GET(req: Request & { cookies: { get: (key: string) => { value: string } | undefined } }) {
  const token = req.cookies.get('token')?.value;

  if (!token) {
    return NextResponse.json({ error: "Token missing" }, { status: 401 });
  }

  try {
    const decoded = jwt.verify(token, JWT_SECRET) as { id: string };
    // TO-DO: Check what happens if token fails. What happens to 'decoded'
    const user = await prisma.users.findUnique({
      where: { id: Number(decoded.id) },
      select: {
        id: true,
        name: true,
        phone: true,
        gender: true,
        dob: true,
      },
    });

    if (!user) {
      return NextResponse.json({ error: "User not found" }, { status: 404 });
    }

    // Add user info to response headers
    const response = NextResponse.json({ user });
    response.headers.set("x-user-id", user.id.toString());
    response.headers.set("x-user-gender", user.gender);
    response.headers.set("x-user-dob", user.dob.toISOString());

    return response;
  } catch (err) {
    return NextResponse.json(
      { error: "Invalid or expired token" },
      { status: 401 }
    );
  }
}

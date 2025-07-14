import { NextRequest, NextResponse } from "next/server";
import { jwtVerify } from "jose";
import prisma from "@/lib/prisma/prisma";

const JWT_SECRET = process.env.JWT_SECRET!;

export async function POST(req: NextRequest) {
  try {
    // 🔐 Check token from cookie
    const token = req.cookies.get("token")?.value;
    if (!token) {
      return NextResponse.json({ message: "Unauthorized" }, { status: 401 });
    }

    const encoder = new TextEncoder();
    const { payload } = await jwtVerify(token, encoder.encode(JWT_SECRET));

    if (payload.role !== "admin") {
      return NextResponse.json(
        {
          message:
            "You are not authorised to use this feature. Request the event organisers to add you as an admin. If you have been added as an admin, logout and login again",
        },
        { status: 403 }
      );
    }

    // 📞 Parse phone number from request
    const { phone } = await req.json();
    if (!/^\d{10}$/.test(phone)) {
      return NextResponse.json(
        { message: "Invalid phone number. It must be 10 digits." },
        { status: 400 }
      );
    }

    // 👤 Find user by phone number
    const user = await prisma.users.findFirst({
      where: { phone },
      select: {
        id: true,
      },
    });

    if (!user) {
      return NextResponse.json({ message: "User not found." }, { status: 404 });
    }

    // 👕 Fetch shirts by user_id
    const shirts = await prisma.shirts.findMany({
      where: {
        user_id: user.id,
      },
      select: {
        user_id: true,
        name: true,
        size: true,
        type: true,
      },
    });

    return NextResponse.json({ shirts });
  } catch (err: unknown) {
    const error = err instanceof Error ? err : new Error("Unknown error");
    return NextResponse.json(
      { message: "Internal Server Error", error: error.message },
      { status: 500 }
    );
  }
}

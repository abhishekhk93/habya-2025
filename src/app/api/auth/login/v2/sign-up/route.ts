import prisma from "@/lib/prisma/prisma";
import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
  const { phone } = await req.json();

  if (!phone) {
    return NextResponse.json(
      { error: "Phone number is required" },
      { status: 400 }
    );
  }

  try {
    const user = await prisma.users.findFirst({ where: { phone } });

    if (user) {
      return NextResponse.json({ status: "logged-in", user });
    } else {
      return NextResponse.json({ status: "new-user" });
    }
  } catch (err) {
    console.error("Error checking user:", err);
    return NextResponse.json(
      { error: "Internal Server Error" },
      { status: 500 }
    );
  }
}

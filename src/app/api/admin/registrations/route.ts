import { NextRequest, NextResponse } from "next/server";
import { jwtVerify } from "jose";
import prisma from "@/lib/prisma/prisma";
import { RegistrationResponse } from "./types";

const JWT_SECRET = process.env.JWT_SECRET!;

export async function GET(req: NextRequest) {
  try {
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

    // ✅ Get all users
    const allUsers = await prisma.users.findMany({
      select: { id: true },
    });

    // ✅ Get all registrations
    const registrations = await prisma.registrations.findMany({
      include: {
        events: true,
        users_registrations_player1_idTousers: true,
        users_registrations_player2_idTousers: true,
      },
    });

    // ✅ Format registrations output
    const formatted: RegistrationResponse[] = registrations.map((reg) => ({
      event_id: reg.event_id,
      player1_name: `${reg.users_registrations_player1_idTousers.name} (${reg.users_registrations_player1_idTousers.id})`,
      player2_name: reg.users_registrations_player2_idTousers
        ? `${reg.users_registrations_player2_idTousers.name} (${reg.users_registrations_player2_idTousers.id})`
        : null,
    }));

    // ✅ Count events per user
    const userEventCounts: Record<number, number> = {};

    registrations.forEach((reg) => {
      if (reg.player1_id) {
        userEventCounts[reg.player1_id] =
          (userEventCounts[reg.player1_id] || 0) + 1;
      }
      if (reg.player2_id) {
        userEventCounts[reg.player2_id] =
          (userEventCounts[reg.player2_id] || 0) + 1;
      }
    });

    // ✅ Stats for exactly 0, 1, 2, 3 events
    let exactly0 = 0;
    let exactly1 = 0;
    let exactly2 = 0;
    let exactly3 = 0;

    allUsers.forEach((user) => {
      const count = userEventCounts[user.id] || 0;
      if (count === 0) exactly0++;
      else if (count === 1) exactly1++;
      else if (count === 2) exactly2++;
      else if (count === 3) exactly3++;
      // Ignore >3 since you confirmed it doesn't happen
    });

    const stats = {
      exactly1,
      exactly2,
      exactly3,
      exactly0,
    };

    return NextResponse.json({ registrations: formatted, stats });
  } catch (err: unknown) {
    const error = err instanceof Error ? err : new Error("Unknown error");
    return NextResponse.json(
      { message: "Internal Server Error", error: error.message },
      { status: 500 }
    );
  }
}

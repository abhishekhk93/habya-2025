import { NextRequest, NextResponse } from "next/server";
import prisma from "@/lib/prisma/prisma";
import { isPlayerEligible } from "@/lib/events-utils/eligibilityUtils";
import { User } from "@/store/slices/userSlice";
import { type Gender } from "@/lib/events-utils/eventRules/types";
import { eventRules } from "@/lib/events-utils/eventRules";
import { jwtVerify } from "jose";
import { EligibleEvent } from "@/types/Event";

interface TokenPayload {
  id: number;
  dob: string;
  gender: string;
  phone?: string;
  name?: string;
  role?: string;
}

type eligibleEvent = {
  id: number;
  name: string;
};


const JWT_SECRET = process.env.JWT_SECRET!;
const encoder = new TextEncoder();

export async function GET(req: NextRequest) {
  try {
    const token = req.cookies.get("token")?.value;

    if (!token) {
      return NextResponse.json(
        { error: "Unauthorized: No token" },
        { status: 401 }
      );
    }

    const { payload } = (await jwtVerify(
      token,
      encoder.encode(JWT_SECRET)
    )) as { payload: TokenPayload };

    const userId = payload.id;
    const dob = new Date(payload.dob);
    const gender = String(payload.gender).toLowerCase();
    const phone = String(payload.phone);
    const name = String(payload.name);
    const role = String(payload.role);

    if (
      isNaN(userId) ||
      isNaN(dob.getTime()) ||
      !["male", "female"].includes(gender)
    ) {
      return NextResponse.json(
        { error: "Invalid user info in token" },
        { status: 400 }
      );
    }

    const player: User = {
      id: String(userId),
      dob,
      name,
      gender: gender as Gender,
      phone,
      role,
    };

    // --- Get all events from DB ---
    const allEvents = await prisma.events.findMany();

    // --- Get registrations where user is player1 or player2 ---
    const registrations = await prisma.registrations.findMany({
      where: {
        OR: [{ player1_id: userId }, { player2_id: userId }],
      },
      select: { event_id: true },
    });

    // --- Get registered event IDs ---
    const registeredEventIds = new Set(
      registrations.map((r: { event_id: number }) => r.event_id)
    );

    // --- Filter eligible events ---
    const eligibleEvents: EligibleEvent[] = allEvents
      .map((event: eligibleEvent) => ({
        id: event.id,
        name: event.name,
        isRegistered: registeredEventIds.has(event.id),
        type: eventRules[event.id - 1].type,
        eligible: isPlayerEligible(player, eventRules[event.id - 1]) === null,
      }))
      .filter((e: EligibleEvent) => e.eligible);

    return NextResponse.json({ eligibleEvents });
  } catch (error) {
    console.error("❌ Error in /api/user/events-eligible:", error);
    return NextResponse.json(
      { error: "Internal Server Error" },
      { status: 500 }
    );
  }
}

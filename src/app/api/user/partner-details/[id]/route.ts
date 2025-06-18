import { NextRequest, NextResponse } from "next/server";
import prisma from "@/lib/prisma/prisma";
import { PartnerResponse } from "@/app/menu/register/utils/fetchPartner";
import { Gender } from "@/lib/events-utils/eventRules";

export async function GET(
  req: NextRequest,
  context: { params: Promise<{ id: string }> }
) {
  const params = await context.params;
  const userId = parseInt(params.id);

  if (isNaN(userId)) {
    return NextResponse.json({ error: "Invalid user ID" }, { status: 400 });
  }

  try {
    const [user, registrations] = await Promise.all([
      prisma.users.findUnique({
        where: { id: userId },
      }),
      prisma.registrations.findMany({
        where: {
          OR: [{ player1_id: userId }, { player2_id: userId }],
        },
        select: { event_id: true },
      }),
    ]);

    if (!user) {
      return NextResponse.json({ error: "User not found" }, { status: 404 });
    }

    // Normalize and validate gender
    const gender = user.gender.toLowerCase() as Gender;

    const response: PartnerResponse = {
      id: String(user.id),
      name: user.name,
      dob: user.dob,
      gender,
      phone: user.phone,
      role: user.role,
      registrations: registrations.map((r: { event_id: number }) => r.event_id),
    };

    return NextResponse.json(response);
  } catch (error) {
    console.error("Error fetching partner details:", error);
    return NextResponse.json(
      { error: "Failed to fetch partner details" },
      { status: 500 }
    );
  }
}

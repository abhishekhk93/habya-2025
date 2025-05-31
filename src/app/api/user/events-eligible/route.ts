import { NextRequest, NextResponse } from 'next/server';
import prisma from '@/lib/prisma/prisma';
import { isPlayerEligible, type Player } from '@/lib/events-utils/eligibilityUtils';
import { type Gender } from '@/lib/events-utils/eventRules/types';
import { eventRules } from '@/lib/events-utils/eventRules';

export async function GET(req: NextRequest) {
  try {
    const userIdRaw = req.headers.get('x-user-id');
    const userDobRaw = req.headers.get('x-user-dob');
    const userGenderRaw = req.headers.get('x-user-gender');

    if (!userIdRaw || !userDobRaw || !userGenderRaw) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const userId = Number(userIdRaw);
    const dob = new Date(userDobRaw);
    const gender = userGenderRaw.toLowerCase();

    if (isNaN(userId) || isNaN(dob.getTime()) || !['male', 'female'].includes(gender)) {
      return NextResponse.json({ error: 'Invalid user info' }, { status: 400 });
    }

    const player: Player = {
      id: userId,
      dob,
      gender: gender as Gender,
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
    const eligibleEvents = allEvents.map((event) => ({
      id: event.id,
      name: event.name,
      isRegistered: registeredEventIds.has(event.id),
      type: eventRules[event.id - 1].type,
      eligible: isPlayerEligible(player, eventRules[event.id - 1]),
    })).filter((e) => e.eligible);

    return NextResponse.json({ eligibleEvents });
  } catch (error) {
    console.error('Error in /api/user/events-eligible:', error);
    return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
  }
}

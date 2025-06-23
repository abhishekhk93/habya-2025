import prisma from "@/lib/prisma/prisma";
import { RedeemedTimeSlotSummarySimple } from "./types";

// Convert IST date + hour to UTC Date
export function toUTC(dateString: string, hour: number, minute = 0): Date {
  const date = new Date(
    `${dateString}T${String(hour).padStart(2, "0")}:${String(minute).padStart(
      2,
      "0"
    )}:00+05:30`
  );
  return new Date(date.toISOString());
}

// Fetch count of redeemed coupons in a time range
export async function getRedeemedCount(from: Date, to: Date): Promise<number> {
  return prisma.coupons.count({
    where: {
      status: "redeemed",
      redeemed_at: {
        gte: from,
        lt: to,
      },
    },
  });
}

// Fetch all time slots from env and compute results
export async function getTimeSlotSummaries(): Promise<
  RedeemedTimeSlotSummarySimple[]
> {
  const slots = [
    {
      label: "Day 1 Lunch",
      date: process.env.DAY_1_LUNCH_DATE!,
      startHour: parseInt(process.env.DAY_1_LUNCH_START_HOUR!),
      endHour: parseInt(process.env.DAY_1_LUNCH_END_HOUR!),
    },
    {
      label: "Day 1 Snacks",
      date: process.env.DAY_1_SNACKS_DATE!,
      startHour: parseInt(process.env.DAY_1_SNACKS_START_HOUR!),
      endHour: parseInt(process.env.DAY_1_SNACKS_END_HOUR!),
    },
    {
      label: "Day 2 Lunch",
      date: process.env.DAY_2_LUNCH_DATE!,
      startHour: parseInt(process.env.DAY_2_LUNCH_START_HOUR!),
      endHour: parseInt(process.env.DAY_2_LUNCH_END_HOUR!),
    },
    {
      label: "Day 2 Snacks",
      date: process.env.DAY_2_SNACKS_DATE!,
      startHour: parseInt(process.env.DAY_2_SNACKS_START_HOUR!),
      endHour: parseInt(process.env.DAY_2_SNACKS_END_HOUR!),
    },
  ];

  const summaries: RedeemedTimeSlotSummarySimple[] = [];

  for (const slot of slots) {
    const from = toUTC(slot.date, slot.startHour);
    const to = toUTC(slot.date, slot.endHour);
    const count = await getRedeemedCount(from, to);
    summaries.push({ label: slot.label, redeemed: count });
  }

  return summaries;
}

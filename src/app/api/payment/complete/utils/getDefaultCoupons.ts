// lib/utils/getDefaultCoupons.ts
import prisma from "@/lib/prisma/prisma";

export async function getDefaultCouponsDataFromRegistrations(
  registrationData: {
    player1_id: number;
    player2_id: number | null;
  }[]
) {
  // Step 1: Extract unique user IDs from registrations
  const allUserIds = new Set<number>();
  registrationData.forEach((reg) => {
    allUserIds.add(reg.player1_id);
    if (reg.player2_id) allUserIds.add(reg.player2_id);
  });
  const userIds = Array.from(allUserIds);

  if (userIds.length === 0) return [];

  // Step 2: Find users who already have any 'default' coupon
  const usersWithDefaults = await prisma.coupons.findMany({
    where: {
      user_id: { in: userIds },
      type: "default",
    },
    select: { user_id: true },
    distinct: ["user_id"],
  });

  const userIdsWithDefaults = new Set(
    usersWithDefaults.map((u: { user_id: number }) => u.user_id)
  );

  // Step 3: Determine users needing default coupons
  const usersNeedingDefaults = userIds.filter(
    (id) => !userIdsWithDefaults.has(id)
  );

  // Step 4: Create 4 lunch and 4 snacks default coupons per user
  const defaultCoupons: {
    user_id: number;
    meal: "lunch" | "snack";
    type: "default";
    status: "active";
  }[] = [];

  for (const user_id of usersNeedingDefaults) {
    for (let i = 0; i < 4; i++) {
      defaultCoupons.push({
        user_id,
        meal: "lunch",
        type: "default",
        status: "active",
      });
      defaultCoupons.push({
        user_id,
        meal: "snack",
        type: "default",
        status: "active",
      });
    }
  }

  return defaultCoupons;
}

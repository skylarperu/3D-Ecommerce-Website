import { NextResponse } from "next/server";
import { prisma } from "@/lib/db/prisma";

export async function GET() {
  try {
    const [totalOrders, totalRevenue, totalUsers, recentOrders] =
      await Promise.all([
        prisma.order.count(),
        prisma.order.aggregate({
          _sum: { total: true },
        }),
        prisma.user.count(),
        prisma.order.findMany({
          take: 5,
          orderBy: { createdAt: "desc" },
          include: { user: { select: { email: true, name: true } } },
        }),
      ]);

    const revenue = totalRevenue._sum.total || 0;

    return NextResponse.json({
      totalOrders,
      totalRevenue: revenue,
      totalUsers,
      recentOrders,
    });
  } catch (error) {
    return NextResponse.json(
      { error: "Failed to fetch dashboard data" },
      { status: 500 }
    );
  }
}

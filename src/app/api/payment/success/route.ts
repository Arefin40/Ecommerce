import { db } from "@/db";
import { eq } from "drizzle-orm";
import { order } from "@/db/schema/checkout";
import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
   const orderId = req.nextUrl.searchParams.get("id");

   try {
      if (!orderId) return NextResponse.json({ error: "Order ID is required" }, { status: 400 });

      const _order = await db.select().from(order).where(eq(order.id, orderId)).limit(1);
      if (_order.length === 0)
         return NextResponse.json({ error: "Order not found" }, { status: 404 });

      await db
         .update(order)
         .set({ isPaid: true, confirmedAt: new Date(), status: "confirmed" })
         .where(eq(order.id, orderId));
      return NextResponse.redirect(new URL("/orders", req.nextUrl.origin), 303);
   } catch (error) {
      return new NextResponse(JSON.stringify(error), { status: 500 });
   }
}

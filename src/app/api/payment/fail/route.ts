import { NextRequest, NextResponse } from "next/server";

export async function GET(req: NextRequest) {
   const data = await req.json();
   console.log(data);
   return new NextResponse(JSON.stringify("GET: " + data));
}
export async function POST(req: NextRequest) {
   return NextResponse.redirect(new URL("/orders", req.nextUrl.origin), 303);
}

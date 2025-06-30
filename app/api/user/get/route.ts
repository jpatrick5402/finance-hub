import { NextRequest, NextResponse } from "next/server";
import { neon } from "@neondatabase/serverless";

export async function POST(req: NextRequest) {
  let body = await req.json();
  let email = body;
  let sql = neon(`${process.env.DATABASE_URL}`);
  let data = await sql`SELECT * FROM Users WHERE email=(${email})`;

  if (!data[0])
    return NextResponse.json({ message: "User not found" }, { status: 404 });

  return NextResponse.json(JSON.stringify(data[0]));
}

import User from "@models/User";
import { NextRequest, NextResponse } from "next/server";
import { neon } from "@neondatabase/serverless";

export async function GET(req: NextRequest) {
  const id = req.nextUrl.searchParams.get("id");
  const sql = neon(`${process.env.DATABASE_URL}`);
  const res = await sql`SELECT * FROM Users WHERE id=(${id})`;
  if (!res[0]) return NextResponse.error();

  let objectData = await res[0];

  if (!res[0]) return NextResponse.json(new User("", "", "", 0, [], [], []));

  const result = new User(
    objectData["id"],
    objectData["email"],
    objectData["full_name"],
    objectData["salary"],
    JSON.parse(objectData["assets"]),
    JSON.parse(objectData["debts"]),
    JSON.parse(objectData["expenses"])
  );

  return NextResponse.json(result, {
    status: 200,
  });
}

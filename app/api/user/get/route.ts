import { NextRequest, NextResponse } from "next/server";
import { neon } from "@neondatabase/serverless";
import { auth } from "@/auth";

export const POST = auth(async function POST(req) {
  if (!req.auth)
    return NextResponse.json({ message: "Not authenticated" }, { status: 401 });

  let body = await req.json();
  if (req.auth.user?.email != body) {
    console.error(
      "Suspicious activity on account: " + JSON.stringify(req.auth.user)
    );
    return NextResponse.json(
      { message: "Incorrect usage, this will be reported" },
      { status: 401 }
    );
  }

  let email = body;
  let sql = neon(`${process.env.DATABASE_URL}`);
  let data = await sql`SELECT * FROM data WHERE email=(${email})`;

  if (!data[0]) {
    // if there's no data for this email, insert blank data
    data =
      await sql`INSERT INTO data (email, full_name, salary, fixed_assets, invested_assets, debts, expenses, net_worth_history) VALUES (${email}, '', 0, '[]', '[]', '[]', '[]', '[]')`;
    data = await sql`SELECT * FROM data WHERE email=(${email})`;
    return NextResponse.json(JSON.stringify(data[0]));
  }

  return NextResponse.json(JSON.stringify(data[0]));
});

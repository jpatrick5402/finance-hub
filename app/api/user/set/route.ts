import { NextRequest, NextResponse } from "next/server";
import { neon } from "@neondatabase/serverless";

export async function POST(req: NextRequest) {
  let content = await req.json();
  let sql = neon(`${process.env.DATABASE_URL}`);
  let response =
    await sql`INSERT INTO Users (email, full_name, salary, assets, debts, expenses)
              VALUES (${content["email"]},${content["full_name"]},${
      content["salary"]
    },${JSON.stringify(content["assets"])},${JSON.stringify(
      content["debts"]
    )},${JSON.stringify(content["expenses"])})
              ON CONFLICT (email) DO UPDATE SET
              email=EXCLUDED.email, full_name=EXCLUDED.full_name, salary=EXCLUDED.salary, assets=EXCLUDED.assets, debts=EXCLUDED.debts, expenses=EXCLUDED.expenses`;

  return NextResponse.json(
    { message: "User information updated: " + response },
    { status: 200 }
  );
}

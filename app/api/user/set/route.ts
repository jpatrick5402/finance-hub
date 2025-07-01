import { NextResponse } from "next/server";
import { auth } from "@/auth";
import { neon } from "@neondatabase/serverless";

export const POST = auth(async function POST(req) {
  if (!req.auth)
    return NextResponse.json({ message: "Not authenticated" }, { status: 401 });

  let content = await req.json();
  if (content["email"] != req.auth.user?.email) {
    console.error(
      "Attacker present on account: " + JSON.stringify(req.auth.user)
    );
    return NextResponse.json(
      { message: "Incorrect usage, this will be reported" },
      { status: 401 }
    );
  }

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
});

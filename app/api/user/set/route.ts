import { NextResponse } from "next/server";
import { auth } from "@/auth";
import { neon } from "@neondatabase/serverless";

export const POST = auth(async function POST(req) {
  if (!req.auth)
    return NextResponse.json({ message: "Not authenticated" }, { status: 401 });

  let content = await req.json();
  if (content["email"] != req.auth.user?.email) {
    console.error(
      "Suspicious activity on account: " + JSON.stringify(req.auth.user)
    );
    return NextResponse.json(
      { message: "Incorrect usage, this will be reported" },
      { status: 401 }
    );
  }

  let sql = neon(`${process.env.DATABASE_URL}`);
  let response =
    await sql`INSERT INTO data (email, full_name, salary, fixed_assets, invested_assets, debts, expenses, net_worth_history)
              VALUES (${content["email"]},${content["full_name"]},${
      content["salary"]
    },${JSON.stringify(content["fixed_assets"])},${JSON.stringify(
      content["invested_assets"]
    )} ,${JSON.stringify(content["debts"])},${JSON.stringify(
      content["expenses"]
    )}, ${JSON.stringify(content["net_worth_history"])})
              ON CONFLICT (email) DO UPDATE SET
              email=EXCLUDED.email, full_name=EXCLUDED.full_name, salary=EXCLUDED.salary, fixed_assets=EXCLUDED.fixed_assets, invested_assets=EXCLUDED.invested_assets, debts=EXCLUDED.debts, expenses=EXCLUDED.expenses, net_worth_history=EXCLUDED.net_worth_history`;

  return NextResponse.json(
    { message: "User information updated: " + response },
    { status: 200 }
  );
});

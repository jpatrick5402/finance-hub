import { NextRequest, NextResponse } from "next/server";
import { auth } from "@/auth";
import User from "@models/User";
import client from "@utils/db";
import { Collection } from "mongodb";

export const POST = auth(async function POST(req) {
  if (!req.auth)
    return NextResponse.json({ message: "Not authenticated" }, { status: 401 });

  let body = await req.json();
  const inputEmail = body["email"];

  if (req.auth.user?.email != inputEmail) {
    console.error(
      "Suspicious activity on account: " + JSON.stringify(req.auth.user)
    );
    return NextResponse.json(
      { message: "Incorrect usage, this will be reported" },
      { status: 401 }
    );
  }

  await client.connect();
  const database = client.db("finance-hub"); // Replace with your database name
  const collection: Collection<User> = database.collection<User>("user_data"); // Replace with your collection name
  const result = await collection.findOne({ email: inputEmail });

  if (!result) {
    return NextResponse.json(
      JSON.stringify(new User("", "", 0, [], [], [], [], []))
    );
  }

  return NextResponse.json(
    JSON.stringify(
      new User(
        result["email"],
        result["full_name"],
        result["salary"],
        result["fixed_assets"],
        result["invested_assets"],
        result["debts"],
        result["expenses"],
        Array.isArray(result["net_worth_history"])
          ? result["net_worth_history"].map((item: any) => ({
              ...item,
              active: item.active ?? false,
            }))
          : []
      )
    )
  );
});

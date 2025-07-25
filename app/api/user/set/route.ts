import { NextResponse } from "next/server";
import { auth } from "@/auth";
import client from "@utils/db";
import { Collection, Db } from "mongodb";
import User from "@models/User";

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

  await client.connect();
  const database = client.db("finance-hub"); // Replace with your database name
  const collection: Collection<User> = database.collection<User>("user_data"); // Replace with your collection name
  const result = await collection.replaceOne(
    { email: content["email"] },
    { ...content },
    { upsert: true }
  );

  return NextResponse.json(
    { message: "User information updated: " + result.acknowledged },
    { status: 200 }
  );
});

import { neon } from "@neondatabase/serverless";
import User from "@models/User";

export async function getUserData(id: string) {
  "use server";
  const sql = neon(`${process.env.DATABASE_URL}`);
  // Insert the comment from the form into the Postgres database
  const res = await sql`SELECT * FROM Users WHERE id=(${id})`;
  let objectData = res[0];

  const result = new User(
    objectData["id"],
    objectData["email"],
    objectData["name"],
    objectData["salary"],
    JSON.parse(objectData["expenses"]),
    JSON.parse(objectData["assets"]),
    JSON.parse(objectData["debts"])
  );

  return result;
}

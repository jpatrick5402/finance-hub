import { neon } from "@neondatabase/serverless";
import User from "@models/User";

export async function getUserData(id: string) {
  "use server";
  const sql = neon(`${process.env.DATABASE_URL}`);
  // Insert the comment from the form into the Postgres database
  const res = await sql`SELECT * FROM Users WHERE id=(${id})`;
  let objectData = res[0];

  if (!res[0]) return new User("", "", "", 0, [], [], []);

  const result = new User(
    objectData["id"],
    objectData["email"],
    objectData["full_name"],
    objectData["salary"],
    JSON.parse(objectData["assets"]),
    JSON.parse(objectData["debts"]),
    JSON.parse(objectData["expenses"])
  );

  return result;
}

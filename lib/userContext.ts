"use client";
import { createContext } from "react";
import { neon } from "@neondatabase/serverless";
import User from "@models/User";

const email = "Billy@test.com";

const sql = neon(`${process.env.DATABASE_URL}`);
// Insert the comment from the form into the Postgres database
const res = await sql`SELECT * FROM Users WHERE email=(${email})`;
const objectData = res[0];

const result = new User(
  objectData["id"],
  objectData["email"],
  objectData["name"],
  objectData["salary"],
  JSON.parse(objectData["expenses"]),
  JSON.parse(objectData["assets"]),
  JSON.parse(objectData["debts"])
);

export const userContext = createContext(result);

"use client";

import { redirect } from "next/navigation";

export default function Login() {
  // if user is logged in, redirect to /dashboard

  let isLoggedIn = false;
  if (isLoggedIn) redirect("/dashboard");

  return <></>;
}

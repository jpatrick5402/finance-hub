"use client";

import { redirect } from "next/navigation";

export default function Login() {
  // if user is logged in, redirect to /dashboard

  let isLoggedIn = false;
  if (isLoggedIn) redirect("/dashboard");

  return (
    <form action="" className="container flex align-center">
      <div className="m-auto flex flex-col">
        <input
          type="text"
          placeholder="Username"
          className="rounded-md bg-(--background-accent) text-center m-2"
        />
        <input
          type="text"
          placeholder="Password"
          className="rounded-md bg-(--background-accent) text-center m-2"
        />
        <button className="btn" type="submit">
          Sign In
        </button>
      </div>
    </form>
  );
}

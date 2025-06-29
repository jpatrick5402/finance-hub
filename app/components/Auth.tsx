"use client";

import { login } from "@lib/auth";

export default function Auth() {
  return (
    <>
      <form action={() => login()} className="flex align-center">
        <button className="btn" type="submit">
          Sign In with Github
        </button>
      </form>
    </>
  );
}

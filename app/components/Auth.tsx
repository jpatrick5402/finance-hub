"use client";

import { login } from "@lib/auth";

export default function Auth() {
  return (
    <div className="container grid">
      <p>Please sign in or sign up</p>
      <div className="flex flex-col sm:flex-row m-auto self-center">
        <button
          className="btn"
          onClick={async () => {
            await login("github", "/dashboard");
          }}
        >
          Sign in with Github
        </button>
      </div>
    </div>
  );
}

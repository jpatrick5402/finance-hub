"use client";

import { login } from "@lib/auth";

export default function Auth() {
  let providers = ["google", "github"];
  return (
    <div className="container grid">
      <p>Please sign in to use the app :)</p>
      <div className="flex flex-col sm:flex-row m-auto self-center">
        {providers.map((provider) => {
          return (
            <button
              key={provider}
              className="btn m-3"
              onClick={async () => {
                await login(provider, "/dashboard");
              }}
            >
              Sign in with {provider}
            </button>
          );
        })}
      </div>
    </div>
  );
}

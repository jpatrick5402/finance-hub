"use client";

import { login } from "@utils/auth";
import { useSession } from "next-auth/react";

export default function Home() {
  const { data: session } = useSession();
  const authProviders = ["google", "github"];

  return (
    <div>
      {/* Auth */}
      {!session?.user ? (
        <div className="m-auto bg-(--color-container) grid gap-3 rounded-lg p-5 backdrop-blur-2xl shadow-2xl shadow-[#00000085]">
          <p className="m-auto text-xl">Please sign in to save your data :)</p>
          <div className="flex flex-col sm:flex-row m-auto self-center">
            {authProviders.map((provider) => {
              return (
                <button
                  key={provider}
                  className="btn m-3"
                  onClick={async () => {
                    await login(provider, "/dashboard");
                  }}
                >
                  <div className="flex flex-row gap-2">
                    <img
                      height={20}
                      width={30}
                      src={"/" + provider + ".png"}
                      alt={provider}
                    />
                    <p className="m-auto">Sign in with {provider}</p>
                  </div>
                </button>
              );
            })}
          </div>
          <p className="m-auto">- or -</p>
          <div className="flex flex-col sm:flex-row m-auto self-center">
            <form
              className="flex flex-col sm:flex-row"
              action={async (formData) => {
                const email = formData.get("email")?.toString();
                if (email && /^.+\@.+\..+/.test(email)) {
                  await login("resend", "/dashboard", email);
                }
              }}
            >
              <input
                className="border-b-2 border-b-(--color-primary) m-2"
                type="email"
                name="email"
                placeholder="Email"
              />
              <button className="btn" type="submit">
                Sign in with your email
              </button>
            </form>
          </div>
        </div>
      ) : null}
      <div className="container">
        <p>This application is currently in development</p>
      </div>
    </div>
  );
}

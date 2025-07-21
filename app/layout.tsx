import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import React from "react";
import Image from "next/image";

import { auth, signIn } from "@/auth";
import { login, logout } from "@utils/auth";

import "@styles/globals.css";
import { SessionProvider } from "next-auth/react";
import Link from "next/link";
import Links from "./Links";
import { CredentialsSignin } from "next-auth";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Finance Hub",
  description: "All-in-one finance management app",
  icons: {
    icon: "/favicon.ico",
    apple: "/apple-touch-icon.png",
  },
};

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const session = await auth();

  const links = [
    { href: "/dashboard", name: "Dashboard" },
    { href: "/net-worth", name: "Net Worth" },
    { href: "/budget", name: "Budget" },
    { href: "/assets", name: "Assets" },
    { href: "/debts", name: "Debts" },
  ];

  const authProviders = ["google", "github"];

  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased max-w-7xl mx-auto`}
      >
        <SessionProvider session={session} refetchOnWindowFocus={false}>
          <nav className="flex mt-3 mb-3 bg-(--color-header) p-1 rounded-lg items-center shadow-xl/20">
            <div className="m-auto sm:ml-0 flex flex-col sm:flex-row">
              <a
                href="/"
                className="
              m-auto min-w-20"
              >
                <Image
                  priority={true}
                  src="/octopus.png"
                  alt="Octopus Logo"
                  width={60}
                  height={60}
                  className="m-auto sm:m-2 w-auto h-auto hover:transform-[rotate(1440deg)] transition-all duration-300"
                />
              </a>
              <p className="text-3xl m-auto mt-auto sm:mt-auto sm:mb-auto sm:ml-2 sm:mr-2">
                Finance Hub
              </p>
              {/* Sign Out Button */}
              {session && (
                <form
                  className="m-auto"
                  action={async () => {
                    "use server";
                    await logout("/");
                  }}
                >
                  <button className="btn m-auto" type="submit">
                    Sign Out
                  </button>
                </form>
              )}
            </div>
            <div className="m-auto sm:m-2">
              <Links links={links} />
            </div>
          </nav>
          {/* Auth */}
          {!session?.user ? (
            <div className="m-auto bg-(--color-container) grid gap-3 rounded-lg p-5 backdrop-blur-2xl shadow-2xl shadow-[#00000085]">
              <p className="m-auto text-xl">
                Please sign in to save your data :)
              </p>
              <div className="flex flex-col sm:flex-row m-auto self-center">
                {authProviders.map((provider) => {
                  return (
                    <button
                      key={provider}
                      className="btn m-3"
                      onClick={async () => {
                        "use server";
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
                    "use server";
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
          <div className="grow-1">{children}</div>
          <footer className="flex justify-center items-center p-4 bg-(--color-footer) mt-8 rounded-t-lg flex-col sm:flex-row gap-2">
            <p className="text-sm mr-4 ml-4">
              &copy; {new Date().getFullYear()} Finance Hub. All rights
              reserved.
            </p>
            <p className="text-sm mr-4 ml-4">TY Mr. Carrier</p>
            <p className="text-sm mr-4 ml-4">
              Developed by <a href="https://github.com/jpatrick5402">JP</a>
            </p>
            <Link href={"https://coff.ee/jpatrick5402"} className="btn">
              <span className="flex flex-row gap-2">
                <img
                  className="h-auto w-auto max-h-10"
                  src="/bmc-logo-no-background.png"
                  alt="Coffee Cup"
                />
                <p className="m-auto text-center hidden sm:block">
                  Buy me a Coffee?
                </p>
              </span>
            </Link>
          </footer>
        </SessionProvider>
      </body>
    </html>
  );
}

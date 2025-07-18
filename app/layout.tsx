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
import { emailSchema } from "@lib/definitions";

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

  let links = [
    { href: "/dashboard", name: "Dashboard" },
    { href: "/net-worth", name: "Net Worth" },
    { href: "/budget", name: "Budget" },
    { href: "/assets", name: "Assets" },
    { href: "/debts", name: "Debts" },
  ];

  let authProviders = ["google", "github"];

  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased max-w-7xl mx-auto`}
      >
        <SessionProvider session={session} refetchOnWindowFocus={false}>
          {/* Auth */}
          {!session?.user ? (
            <div className="container grid gap-3">
              <p>Please sign in to use the app :)</p>
              <form
                className="m-auto"
                action={async (formData) => {
                  "use server";
                  if (!formData.get("email")) {
                    return;
                  }

                  await signIn("resend", formData);
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
                      Sign in with {provider}
                    </button>
                  );
                })}
              </div>
            </div>
          ) : null}
          <nav className="flex mt-3 mb-3 bg-(--color-header) p-1 rounded-lg items-center shadow-xl/20">
            <a href="/">
              <Image
                priority={true}
                src="/octopus.png"
                alt="Octopus Logo"
                width={60}
                height={60}
                className="m-2 w-auto h-auto hover:transform-[rotate(1440deg)] transition-all duration-300"
              />
            </a>
            <h1 className="text-3xl">Finance Hub</h1>
            {/* Sign Out Button */}
            {session && (
              <form
                action={async () => {
                  "use server";
                  await logout("/");
                }}
              >
                <button className="btn m-3" type="submit">
                  Sign Out
                </button>
              </form>
            )}
            <Links links={links} />
          </nav>
          <div className="grow-1">{children}</div>
          <footer className="flex justify-center items-center p-4 bg-(--color-footer) mt-8 rounded-t-lg">
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

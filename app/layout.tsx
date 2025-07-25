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
    { href: "/help", name: "Help" },
  ];

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
                  title="About"
                />
              </a>
              <p className="text-3xl m-auto mt-auto sm:mt-auto sm:mb-auto sm:ml-2 sm:mr-2">
                Finance Hub
              </p>
              {/* Sign Out Button */}
              {session ? (
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
              ) : (
                <form
                  className="m-auto"
                  action={async () => {
                    "use server";
                    await login();
                  }}
                >
                  <button className="btn m-auto" type="submit">
                    Sign In
                  </button>
                </form>
              )}
            </div>
            <div className="m-auto sm:m-2">
              <Links links={links} session={session} />
            </div>
          </nav>
          <div className="grow-1">{children}</div>
          <footer className="flex justify-center items-center p-4 bg-(--color-footer) mt-8 rounded-t-lg flex-col sm:flex-row gap-2">
            <p className="text-sm mr-4 ml-4">
              &copy; {new Date().getFullYear()} Finance Hub. All rights
              reserved.
            </p>
            <Link href={"https://coff.ee/jpatrick5402"} className="btn">
              <span className="flex flex-row gap-2">
                <img
                  className="h-auto w-auto max-h-8"
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

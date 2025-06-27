import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import { neon } from "@neondatabase/serverless";
import React, { ReactNode } from "react";

import Header from "@components/Header";
import Footer from "@components/Footer";
import User from "@models/User";

import "./globals.css";

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
  let id = "1";

  if (!id) return new User("", "", "", 0, [], [], []);

  const sql = neon(`${process.env.DATABASE_URL}`);
  const res = await sql`SELECT * FROM Users WHERE id=(${id})`;
  const userData = res[0];

  const user =
    !res[0] || !userData
      ? new User("", "", "", 0, [], [], [])
      : new User(
          userData["id"],
          userData["email"],
          userData["full_name"],
          userData["salary"],
          userData["assets"],
          userData["debts"],
          userData["expenses"]
        );

  console.log(user);

  interface ChildrenProps {
    children?: ReactNode;
  }

  let childrenWithParams = React.Children.map(children, (child) => {
    return React.isValidElement(child)
      ? React.cloneElement(child as React.ReactElement<any>, { user: user })
      : child;
  });

  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased max-w-7xl mx-auto`}
      >
        <Header />
        <div className="grow-1">{childrenWithParams}</div>
        <Footer />
      </body>
    </html>
  );
}

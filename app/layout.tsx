import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import React, { ReactNode } from "react";

import Header from "@components/AppHeader";
import Auth from "@components/Auth";
import Footer from "@components/Footer";
import { auth } from "@/auth";

import "@app/globals.css";

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
  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased max-w-7xl mx-auto`}
      >
        <Header />
        {!session?.user ? (
          <div className="grid container">
            <p>Please sign in or sign up</p>
            <div className="flex flex-col sm:flex-row m-auto self-center">
              <Auth />
            </div>
          </div>
        ) : null}
        <div className="grow-1">{children}</div>
        <Footer />
      </body>
    </html>
  );
}

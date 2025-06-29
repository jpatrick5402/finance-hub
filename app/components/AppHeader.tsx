"use client";
import Image from "next/image";
import { useSession } from "next-auth/react";

import Links from "@components/Links";
import { logout } from "@lib/auth";
import { useEffect, useState } from "react";

export default function Header() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const { data: session } = useSession();
  useEffect(() => {
    setIsLoggedIn(session == null);
  });
  return (
    <nav className="flex mt-3 mb-3 sm:mb-10 bg-(--color-header) p-1 rounded-lg items-center shadow-xl/20">
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
      <h1 className="text-3xl m-5">Finance Hub</h1>
      <Links />
      {!isLoggedIn ? (
        <form
          action={async () => {
            await logout("/");
            setIsLoggedIn(false);
          }}
        >
          <button className="btn">Sign Out</button>
        </form>
      ) : null}
    </nav>
  );
}

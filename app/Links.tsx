"use client";
import { Session } from "next-auth";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState } from "react";
import { Menu, X } from "lucide-react"; // You can use any icon library or SVGs

interface LinksType {
  href: string;
  name: string;
}
interface LinksParam {
  links: LinksType[];
  session: Session | null;
}

export default function Links({ links, session }: LinksParam) {
  const [open, setOpen] = useState(false);
  let current = "/" + usePathname().split("/")[1];

  return (
    <div className="ml-auto relative">
      {/* Hamburger button for small screens */}
      <button
        className="sm:hidden p-2"
        aria-label="Open menu"
        onClick={() => setOpen((v) => !v)}
      >
        {open ? <X size={36} /> : <Menu size={36} />}
      </button>
      {/* Links for small screens (collapsible) */}
      <div
        className={`${
          open ? "flex" : "hidden"
        } flex-col absolute right-5 top-14 bg-(--background-accent) shadow-lg rounded-lg p-4 gap-2 z-50 sm:hidden text-center`}
      >
        {links.map((link) => {
          let isLoggedIn = current === link.href;
          return (
            <Link
              key={link.href}
              href={link.href}
              className={
                isLoggedIn
                  ? "p-2 cursor-default border-b-3 border-b-(--color-primary)"
                  : "p-2 border-b-transparent border-b-3 hover:border-b-3 hover:border-b-(--color-secondary) transition-all duration-300 ease-in-out"
              }
              onClick={() => setOpen(false)}
            >
              {link.name}
            </Link>
          );
        })}
        <Link
          href={"/profile"}
          className={
            session?.user?.email
              ? ""
              : current === "/profile"
              ? "p-2 cursor-default border-b-3 border-b-(--color-primary)"
              : "p-2 border-b-transparent border-b-3 hover:border-b-3 hover:border-b-(--color-secondary) transition-all duration-300 ease-in-out"
          }
          onClick={() => setOpen(false)}
        >
          {session?.user?.image ? (
            <img
              src={session.user.image}
              alt=""
              className={`w-12 h-12 rounded-3xl m-auto ${
                current === "/profile"
                  ? "border-2 border-(--color-primary) cursor-default"
                  : "hover:border-1 hover:border-white"
              }`}
            />
          ) : (
            <p>Profile</p>
          )}
        </Link>
      </div>
      {/* Links for sm and up */}
      <span className="hidden sm:flex m-3 gap-2 sm:gap-5 items-center flex-col sm:flex-row">
        {links.map((link) => {
          let isLoggedIn = current === link.href;
          return (
            <Link
              key={link.href}
              href={link.href}
              className={
                isLoggedIn
                  ? "p-2 cursor-default border-b-3 border-b-(--color-primary)"
                  : "p-2 border-b-transparent border-b-3 hover:border-b-3 hover:border-b-(--color-secondary) transition-all duration-300 ease-in-out"
              }
            >
              {link.name}
            </Link>
          );
        })}
        <Link
          href={"/profile"}
          className={
            session?.user?.email
              ? ""
              : current === "/profile"
              ? "p-2 cursor-default border-b-3 border-b-(--color-primary)"
              : "p-2 border-b-transparent border-b-3 hover:border-b-3 hover:border-b-(--color-secondary) transition-all duration-300 ease-in-out"
          }
        >
          {session?.user?.image ? (
            <img
              src={session.user.image}
              alt=""
              className={`w-12 h-12 rounded-3xl m-auto ${
                current === "/profile"
                  ? "border-2 border-(--color-primary) cursor-default"
                  : "hover:border-1 hover:border-white"
              }`}
              title="Profile"
            />
          ) : (
            <p>Profile</p>
          )}
        </Link>
      </span>
    </div>
  );
}

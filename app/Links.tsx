"use client";
import UserContext from "@contexts/UserContext";
import { useSession } from "next-auth/react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useContext } from "react";

interface LinksType {
  href: string;
  name: string;
}
interface LinksParam {
  links: LinksType[];
}

export default function Links({ links }: LinksParam) {
  const { data: session } = useSession();

  let current = "/" + usePathname().split("/")[1];

  return (
    <span className="flex m-3 gap-2 ml-auto sm:gap-5 items-center flex-col sm:flex-row">
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
          session?.user?.image
            ? ""
            : current === "/profile"
            ? "p-2 cursor-default border-b-3 border-b-(--color-primary)"
            : "p-2 border-b-transparent border-b-3 hover:border-b-3 hover:border-b-(--color-secondary) transition-all duration-300 ease-in-out"
        }
      >
        {session?.user?.image ? (
          <img
            src={session?.user?.image ?? undefined}
            alt=""
            className="w-12 h-12 rounded-3xl hover:border-1 hover:border-white"
            title="Profile"
          />
        ) : (
          <p>Profile</p>
        )}
      </Link>
    </span>
  );
}

"use client";
import Link from "next/link";
import { usePathname } from "next/navigation";

interface LinksType {
  href: string;
  name: string;
}
interface LinksParam {
  links: LinksType[];
}

export default function Links({ links }: LinksParam) {
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
    </span>
  );
}

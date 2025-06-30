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
    <span className="flex ml-auto m-3 gap-5 items-center flex-col sm:flex-row">
      {links.map((link) => {
        let isLoggedIn = current === link.href;
        return (
          <Link
            key={link.href}
            href={link.href}
            className={
              isLoggedIn
                ? "rounded-lg p-2 bg-(--color-primary) shadow-lg cursor-default"
                : "rounded-lg p-2 hover:bg-(--color-secondary) hover:text-black hover:shadow-lg/20 transition-all duration-300 "
            }
          >
            {link.name}
          </Link>
        );
      })}
    </span>
  );
}

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
    <span className="flex m-3 gap-0 ml-auto sm:gap-5 items-center flex-row">
      {links.map((link, index) => {
        let isLoggedIn = current === link.href;
        return (
          <div
            key={index}
            className={
              isLoggedIn
                ? "rounded-lg p-2 bg-(--color-primary) shadow-lg cursor-default"
                : "rounded-lg p-2 hover:bg-(--color-secondary) hover:text-black hover:shadow-lg/20 hover:animate-pulse transition-all duration-300 "
            }
          >
            <Link key={index} href={link.href}>
              {link.name}
            </Link>
          </div>
        );
      })}
    </span>
  );
}

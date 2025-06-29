"use client";
import Link from "next/link";
import { usePathname } from "next/navigation";

interface LinkType {
  name: string;
  href: string;
}

interface LinksProps {
  links: LinkType[];
}

export default function Links({ links }: LinksProps) {
  const current = usePathname().split("/")[1];

  return (
    <span className="flex ml-auto m-3 gap-5 items-center flex-col sm:flex-row">
      {links.map((link: LinkType) => {
        console.log(current, link.href);
        const isActive: boolean = "/" + current === link.href;
        return (
          <Link
            key={link.href}
            href={link.href}
            className={
              isActive
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

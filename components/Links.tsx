"use client";
import Link from "next/link";
import { usePathname } from "next/navigation";
import Cookies from "js-cookie";
import { useState } from "react";

interface LinksProps {
  current?: string;
  setCurrent?: Function;
}

export default function Links({ current, setCurrent }: LinksProps) {
  return (
    <span className="flex ml-auto m-3 gap-5 items-center flex-col sm:flex-row">
      <Link
        href="/dashboard"
        className={
          current == "dashboard"
            ? "rounded-lg p-2 bg-(--color-primary) shadow-lg"
            : "rounded-lg p-2 hover:bg-(--color-secondary) hover:text-black hover:shadow-lg/20 transition-all duration-300 "
        }
      >
        Dashboard
      </Link>
      <Link
        href="/net-worth"
        className={
          current == "net-worth"
            ? "rounded-lg p-2 bg-(--color-primary)"
            : "rounded-lg p-2 hover:bg-(--color-secondary) hover:text-black hover:shadow-lg/20 transition-all duration-300 "
        }
      >
        Net Worth
      </Link>
      <Link
        href="/budget"
        className={
          current == "budget"
            ? "rounded-lg p-2 bg-(--color-primary)"
            : "rounded-lg p-2 hover:bg-(--color-secondary) hover:text-black hover:shadow-lg/20 transition-all duration-300 "
        }
      >
        Budget
      </Link>
      <Link
        href="/assets"
        className={
          current == "assets"
            ? "rounded-lg p-2 bg-(--color-primary)"
            : "rounded-lg p-2 hover:bg-(--color-secondary) hover:text-black hover:shadow-lg/20 transition-all duration-300 "
        }
      >
        Assets
      </Link>
      <Link
        href="/debts"
        className={
          current == "debts"
            ? "rounded-lg p-2 bg-(--color-primary)"
            : "rounded-lg p-2 hover:bg-(--color-secondary) hover:text-black hover:shadow-lg/20 transition-all duration-300 "
        }
      >
        Debts
      </Link>
    </span>
  );
}

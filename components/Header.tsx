"use client";
import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";

export default function Header() {
  let pathname = usePathname();
  return (
    <nav className="flex mt-5 mb-5 bg-(--background-accent) p-1 rounded-lg items-center shadow-xl/20">
      <Image width="70" height="70" src="/octopus.png" alt="Octopus Logo" />
      <h1 className="text-3xl m-5">Finance Hub</h1>
      <span className="flex gap-5 ml-10 items-center ">
        <Link
          href="/"
          className={
            pathname.split("/")[1] == ""
              ? "rounded-lg p-2 bg-(--color-primary)"
              : "rounded-lg p-2 hover:bg-(--color-secondary) hover:text-black hover:shadow-lg/20 transition-all duration-300 "
          }
        >
          Dashboard
        </Link>
        <Link
          href="/net-worth"
          className={
            pathname.split("/")[1] == "net-worth"
              ? "rounded-lg p-2 bg-(--color-primary)"
              : "rounded-lg p-2 hover:bg-(--color-secondary) hover:text-black hover:shadow-lg/20 transition-all duration-300 "
          }
        >
          Net Worth
        </Link>
        <Link
          href="/budget"
          className={
            pathname.split("/")[1] == "budget"
              ? "rounded-lg p-2 bg-(--color-primary)"
              : "rounded-lg p-2 hover:bg-(--color-secondary) hover:text-black hover:shadow-lg/20 transition-all duration-300 "
          }
        >
          Budget
        </Link>
        <Link
          href="/assets"
          className={
            pathname.split("/")[1] == "assets"
              ? "rounded-lg p-2 bg-(--color-primary)"
              : "rounded-lg p-2 hover:bg-(--color-secondary) hover:text-black hover:shadow-lg/20 transition-all duration-300 "
          }
        >
          Assets
        </Link>
        <Link
          href="/debts"
          className={
            pathname.split("/")[1] == "debts"
              ? "rounded-lg p-2 bg-(--color-primary)"
              : "rounded-lg p-2 hover:bg-(--color-secondary) hover:text-black hover:shadow-lg/20 transition-all duration-300 "
          }
        >
          Debts
        </Link>
      </span>
      <button
        className="ml-auto mr-5 bg-(--color-primary) p-3 rounded-lg transition-all duration-300 hover:shadow-xl/30"
        onClick={() => {
          alert("This is not yet implemented");
        }}
      >
        Sign in
      </button>
    </nav>
  );
}

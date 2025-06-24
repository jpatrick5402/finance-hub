"use client";
import Link from "next/link";
import { usePathname } from "next/navigation";

export default function Header() {
  let pathname = usePathname().split("/")[1];
  return (
    <nav className="flex mt-3 mb-3 sm:mb-14 bg-(--color-header) p-1 rounded-lg items-center shadow-xl/20">
      <img src="/octopus.png" alt="Octopus Logo" className="m-3 w-15" />
      <h1 className="text-3xl m-5">Finance Hub</h1>
      <span className="flex gap-5 items-center sm:flex-row flex-col">
        <Link
          href="/"
          className={
            pathname == ""
              ? "rounded-lg p-2 bg-(--color-primary) shadow-lg"
              : "rounded-lg p-2 hover:bg-(--color-secondary) hover:text-black hover:shadow-lg/20 transition-all duration-300 "
          }
        >
          Dashboard
        </Link>
        <Link
          href="/net-worth"
          className={
            pathname == "net-worth"
              ? "rounded-lg p-2 bg-(--color-primary)"
              : "rounded-lg p-2 hover:bg-(--color-secondary) hover:text-black hover:shadow-lg/20 transition-all duration-300 "
          }
        >
          Net Worth
        </Link>
        <Link
          href="/budget"
          className={
            pathname == "budget"
              ? "rounded-lg p-2 bg-(--color-primary)"
              : "rounded-lg p-2 hover:bg-(--color-secondary) hover:text-black hover:shadow-lg/20 transition-all duration-300 "
          }
        >
          Budget
        </Link>
        <Link
          href="/assets"
          className={
            pathname == "assets"
              ? "rounded-lg p-2 bg-(--color-primary)"
              : "rounded-lg p-2 hover:bg-(--color-secondary) hover:text-black hover:shadow-lg/20 transition-all duration-300 "
          }
        >
          Assets
        </Link>
        <Link
          href="/debts"
          className={
            pathname == "debts"
              ? "rounded-lg p-2 bg-(--color-primary)"
              : "rounded-lg p-2 hover:bg-(--color-secondary) hover:text-black hover:shadow-lg/20 transition-all duration-300 "
          }
        >
          Debts
        </Link>
      </span>
      <button
        className="m-3 ml-auto bg-(--color-primary) p-3 rounded-lg transition-all duration-300 hover:shadow-xl/30"
        onClick={() => {
          alert("This is not yet implemented");
        }}
      >
        Sign in
      </button>
    </nav>
  );
}

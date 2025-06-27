"use client";
import Link from "next/link";
import { usePathname } from "next/navigation";
import Cookies from "js-cookie";

export default function Links() {
  let pathname = usePathname().split("/")[1];
  return (
    <span className="flex gap-5 mb-3 sm:mb-0 items-center flex-col sm:flex-row">
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
      <div className="ml-auto">
        <input
          type="text"
          id="idInput"
          className="bg-(--background) m-3 p-3 rounded-lg text-(--foreground)"
          placeholder="User ID"
        />
        <button
          className="m-3 ml-auto bg-(--color-primary) p-3 rounded-lg transition-all duration-300 hover:shadow-xl/30 hover:bg-(--color-secondary) hover:text-black"
          onClick={() => {
            let el = document.getElementById(
              "idInput"
            ) as HTMLInputElement | null;
            if (!el) return;
            let value = el.value;
            Cookies.set("userId", value.toString(), { expires: 7 });
            location.reload();
          }}
        >
          Sign in
        </button>
      </div>
    </>
  );
}

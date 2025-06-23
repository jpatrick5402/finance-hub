"use client";
import Image from "next/image";
import Link from "next/link";

export default function Header() {
  return (
    <nav className="flex mt-5 mb-5 bg-stone-500 p-1 rounded-lg items-center">
      <Image width="70" height="70" src="/octopus.png" alt="Octopus Logo" />
      <h1 className="text-3xl m-5">Finance Hub</h1>
      <span className="flex gap-5 ml-10">
        <Link href="/">Dashboard</Link>
        <Link href="/">Net Worth</Link>
        <Link href="/">Budget</Link>
        <Link href="/">Assets</Link>
        <Link href="/">Debts</Link>
      </span>
    </nav>
  );
}

import Links from "@components/Links";

export default function Header() {
  return (
    <nav className="flex mt-3 mb-3 sm:mb-14 bg-(--color-header) p-1 rounded-lg items-center shadow-xl/20">
      <img src="/octopus.png" alt="Octopus Logo" className="m-3 w-15" />
      <h1 className="text-3xl m-5">Finance Hub</h1>
      <Links />
    </nav>
  );
}

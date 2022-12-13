import Link from "next/link";

export default function Navigation() {
  return (
    <nav className="px-8 py-4 flex justify-between">
      <Link href="/">Home</Link>
      <Link href="#">Sign In</Link>
    </nav>
  );
}

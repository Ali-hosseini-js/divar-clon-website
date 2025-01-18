import Link from "next/link";

export default function Home() {
  return (
    <div className="text-red-700">
      <Link href="/signin">ورود</Link>
    </div>
  );
}

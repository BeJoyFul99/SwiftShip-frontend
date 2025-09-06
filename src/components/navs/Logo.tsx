import Link from "next/link";

export default function Logo() {
  return (
    <div className="text-2xl font-bold">
      <Link href="/">{process.env["NEXT_PUBLIC_APP_NAME"]}</Link>
    </div>
  );
}

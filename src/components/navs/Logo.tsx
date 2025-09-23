import Link from "next/link";

export default function Logo({ targetPath = "/" }: { targetPath?: string }) {
  return (
    <div className="text-2xl font-bold">
      <Link href={targetPath} className="hover:text-primary transition-colors">
        {process.env["NEXT_PUBLIC_APP_NAME"]}
      </Link>
    </div>
  );
}

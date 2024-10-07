import Link from "next/link";

export default function Home() {
  return (
    <div>
      home | <Link href="/login">login</Link> |{" "}
      <Link href="/register">register</Link>
    </div>
  );
}

import { getChapters } from "@/db/chapters";
import Link from "next/link";

export default async function Page() {
  return (
    <ul>
      {getChapters().map((chapter) => (
        <li key={chapter.slug}>
          <Link href={`/chapter/${chapter.slug}`}>{chapter.bookTitle} {chapter.title}</Link>
        </li>
      ))}
    </ul>
  );
}

import { getChapters } from "@/db/chapters";
import Link from "next/link";

export default async function Page() {
  const chapters = [];
  let lastBookSubtitle = "";

  for (const chapter of getChapters()) {
    if (chapter.bookSubtitle !== lastBookSubtitle) {
      chapters.push(<div key={`${chapter.slug}-before`} className="book">
        <div>
          {chapter.bookTitle} - {chapter.bookSubtitle}
        </div>
      </div>);

      lastBookSubtitle = chapter.bookSubtitle;
    }

    chapters.push(<Link key={chapter.slug} href={`/${chapter.slug}`}>
      <div className="chapter">
        <div className="info">
          <div>{chapter.date.toLocaleDateString("pl-PL", { weekday: "long", month: "long", day: "numeric" })}</div>
          <div>{chapter.bookTitle.split(" ")[1]} - {chapter.title.split(" ")[1]} ({chapter.paragraf.length})</div>
        </div>
        <div>&nbsp;</div>
        <div>{chapter.subtitle}</div>
      </div>
    </Link>);

    if (chapter.nextDate.getDay() === 2) {
      chapters.push(<div key={`${chapter.slug}-after`} className="chapter muted">
        <div>
          {chapter.nextDate.toLocaleDateString("pl-PL", { weekday: "long", month: "long", day: "numeric" })}
        </div>
      </div>);
    }
  }

  return (
    <div className="chapters">
      {chapters}
    </div>
  );
}

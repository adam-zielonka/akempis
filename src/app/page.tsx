import { getChapters } from "@/db/chapters";
import Link from "next/link";
import { calculateSplit, formatDate, printSplit } from "./utils";

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

    chapter.dates.forEach(({ date, nextDate }, index, dates) => {
      chapters.push(<Link key={`${chapter.slug}-${index}`} href={`/chapter/${chapter.slug}`}>
        <div className="chapter">
          <div className="info">
            <div>{formatDate(date)}</div>
            <div>{chapter.bookTitle.split(" ")[1]} - {chapter.title.split(" ")[1]} ({chapter.paragraf.length})</div>
          </div>
          <div>&nbsp;</div>
          
          <div>
            {dates.length > 1 
              && <span className="split">
                {printSplit(calculateSplit(chapter.paragraf.length, dates.length)[index])} </span>}
            {chapter.subtitle}
          </div>
        </div>
      </Link>);

      if (nextDate.getDay() === 2) {
        chapters.push(<div key={`${chapter.slug}-${index}-after`} className="chapter muted">
          <div>{formatDate(nextDate)}</div>
        </div>);
      }
    });
  }

  return (
    <div className="chapters">
      {chapters}
    </div>
  );
}

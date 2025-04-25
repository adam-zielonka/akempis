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
        <div className={`chapter ${isToday(date) ? "today" : ""} ${isPrevious(date) ? "previous" : ""}`}>
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
        chapters.push(<div key={`${chapter.slug}-${index}-after`} 
          className={`chapter muted ${isToday(nextDate) ? "today" : ""}`}>
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

// TODO: check if date is today on fronted
function isToday(date: Date) {
  return false;
  
  const today = new Date();
  return date.getDate() === today.getDate() && date.getMonth() === today.getMonth() && date.getFullYear() === today.getFullYear();
}

function isPrevious(date: Date) {
  return false;
  
  const today = new Date();
  if (date.getFullYear() < today.getFullYear()) {
    return true;
  }
  if (date.getFullYear() === today.getFullYear()) {
    if (date.getMonth() < today.getMonth()) {
      return true;
    }
    if (date.getMonth() === today.getMonth()) {
      return date.getDate() < today.getDate();
    }
  }
  return false;
}

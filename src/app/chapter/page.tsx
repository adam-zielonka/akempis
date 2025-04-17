import { getChapters } from "@/db/chapters";
import Link from "next/link";

export default async function Page() {
  const chapters = [];
  let lastBookSubtitle = "";

  for (const chapter of getChapters()) {
    if (chapter.bookSubtitle !== lastBookSubtitle) {
      chapters.push(<tr key={`${chapter.slug}-before`} className="book">
        <td colSpan={5}>
          {chapter.bookTitle} - {chapter.bookSubtitle}
        </td>
      </tr>);

      lastBookSubtitle = chapter.bookSubtitle;
    }

    chapters.push(<tr key={chapter.slug}>
      <td>{chapter.date.toLocaleDateString("pl-PL", { weekday: "long", month: "long", day: "numeric" })}</td>
      <td>{chapter.bookTitle.split(" ")[1]}</td>
      <td>{chapter.title.split(" ")[1]}</td>
      <td>{chapter.paragraf.length}</td>
      <td><Link href={`/chapter/${chapter.slug}`}>{chapter.subtitle}</Link></td>
    </tr>);

    if (chapter.nextDate.getDay() === 2) {
      chapters.push(<tr key={`${chapter.slug}-after`} className="muted">
        <td>
          {chapter.nextDate.toLocaleDateString("pl-PL", { weekday: "long", month: "long", day: "numeric" })}
        </td>
        <td colSpan={4}>
        </td>
      </tr>);
    }
  }

  return (
    <div>
      <table>
        <thead>
          <tr>
            <th>Data</th>
            <th>Księga</th>
            <th>Rozdział</th>
            <th>Ilość paragrafów</th>
            <th>Tytuł</th>
          </tr>
        </thead>
        <tbody>
          {chapters}
        </tbody>
      </table>
    </div>
  );
}

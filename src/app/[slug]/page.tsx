import { getChapter, getNextChapter, getPreviousChapter } from "@/db/chapters";

import type { Metadata } from "next";
import Link from "next/link";
 
export async function generateMetadata(
  { params }: {params: Promise<{ slug: string }>}
): Promise<Metadata> {
  const slug = (await params).slug;
  const chapter = getChapter(slug);

  if (!chapter) {
    return {
      title: "Nie znaleziono rozdziału",
    };
  }
 
  return {
    title: `${chapter.bookTitle} ${chapter.title} | ${chapter.subtitle} | O Naśladowaniu Chrystusa`,
  };
}
 

export default async function Page({
  params,
}: {
    params: Promise<{ slug: string }>
  }) {
  const { slug } = await params;
  const chapter = getChapter(slug);
  const previousChapter = getPreviousChapter(slug);
  const nextChapter = getNextChapter(slug);

  if (!chapter) {
    return <div>Nie znaleziono rozdziału</div>;
  }

  return <div>
    <div className="navigation">
      {previousChapter && <Link href={`/${previousChapter.slug}`}>Poprzedni rozdział</Link>}
      <Link href={"/"}>Lista rozdziałów</Link>
      {nextChapter && <Link href={`/${nextChapter.slug}`}>Następny rozdział</Link>}
    </div>


    <p>{chapter.date.toLocaleDateString("pl-PL", { weekday: "long", month: "long", day: "numeric" })}</p>
    <h3>{chapter.bookTitle}<br/>{chapter.bookSubtitle}</h3>
    <h4>{chapter.title}<br/>{chapter.subtitle}</h4>

    {chapter.paragraf.map((paragraf, index) => (
      <p key={index}>{paragraf}</p>
    ))}
  </div>;
}

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
    title: `${chapter.bookTitle} ${chapter.title} | O Naśladowaniu Chrystusa`,
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
    <h2>{chapter.bookTitle} {chapter.bookSubtitle}</h2>
    <h3>{chapter.title} {chapter.subtitle}</h3>

    {chapter.paragraf.map((paragraf, index) => (
      <p key={index}>{paragraf}</p>
    ))}
  </div>;
}

import { getChapter } from "@/db/chapters";

import type { Metadata } from 'next'
 
export async function generateMetadata(
  { params }: {params: Promise<{ slug: string }>}
): Promise<Metadata> {
  const slug = (await params).slug
  const chapter = getChapter(slug);

  if (!chapter) {
    return {
      title: 'Nie znaleziono rozdziału',
    }
  }
 
  return {
    title: `${chapter.bookTitle} ${chapter.title} | O Naśladowaniu Chrystusa`,
  }
}
 

export default async function Page({
    params,
  }: {
    params: Promise<{ slug: string }>
  }) {
    const { slug } = await params
    const chapter = getChapter(slug);

    if (!chapter) {
        return <div>Nie znaleziono rozdziału</div>
    }

    return <div>
        <h2>{chapter.bookTitle} {chapter.bookSubtitle}</h2>
        <h3>{chapter.title} {chapter.subtitle}</h3>

        {chapter.paragraf.map((paragraf, index) => (
            <p key={index}>{paragraf}</p>
        ))}
    </div>
  }

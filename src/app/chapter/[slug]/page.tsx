import { getChapter } from "@/db/chapters";

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

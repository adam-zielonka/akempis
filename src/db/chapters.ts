import fullBook from "./book.json"

const db = getDB();

function getDB() {
    const chapters = [];

    for (const book of fullBook) {
        chapters.push(...book.chapters.map((chapter) => ({
            ...chapter,
            bookTitle: book.title,
            bookSubtitle: book.subtitle,
            slug: `${book.title.split(" ")[1]}-${chapter.title.split(" ")[1]}`,
        })))
    }

    return chapters;
}

export function getChapters() {
    return db;
}

export function getChapter(slug: string) {
    return db.find((chapter) => chapter.slug === slug);
}

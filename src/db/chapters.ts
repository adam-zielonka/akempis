import fullBook from "./book.json";

const startDateText = "2025-04-23";
const brakeDateText = "2025-06-24";
const afterBreakDateText = "2025-10-01";
const db = getDB();

function getDB() {
  const chapters = [];
  let date = new Date(startDateText);
  const brakeDate = new Date(brakeDateText);

  function calculateDay() {
    const newDate = new Date(date);

    date.setDate(date.getDate() + 1);
    if (date.getDay() === 2) {
      date.setDate(date.getDate() + 1);
    }

    if (date.getTime() > brakeDate.getTime() && date.getMonth() < 9) {
      date = new Date(afterBreakDateText);
    }

    const nextDate = new Date(date);
    nextDate.setDate(nextDate.getDate() + 1);

    return {
      date: newDate,
      nextDate: nextDate,
    };
  }

  for (const book of fullBook) {
    
    chapters.push(...book.chapters.map((chapter) => {
      const { date, nextDate } = calculateDay();

      return {
        ...chapter,
        bookTitle: book.title,
        bookSubtitle: book.subtitle,
        slug: `${book.title.split(" ")[1]}-${chapter.title.split(" ")[1]}`,
        date,
        nextDate,
      };
    }));
  }

  return chapters;
}

export function getChapters() {
  return db;
}

export function getChapter(slug: string) {
  return db.find((chapter) => chapter.slug === slug);
}

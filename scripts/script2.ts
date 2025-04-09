const text = await Deno.readTextFile("o.txt");

let lastLine = "";
let lastChapter = "";
let lastBook = "";

type Book = {
  title: string;
  subtitle: string;
  chapters: {
    title: string;
    subtitle: string;
    paragraf: string[];
  }[]
}

const books: Book[] = [];
let book: Book;
let chapter: Book["chapters"][number];
let paragraf: string[];

text.split("\n").forEach((line) => {
  if (line.match(/^\d+$/)) {
    return;
  }

  if (lastLine === "KSIĘGA") {
    // console.log(lastBook);
    // console.log(line);
    lastLine = "";
    book.subtitle = line;
    return;
  }

  if (lastLine === "Rozdział") {
    if (line.match(/^\d/)) {
      lastLine = "";
    } else {
      // console.log(line);
      chapter.subtitle = [chapter.subtitle, line].join(" ").trim();
      return; 
    }
  }

  if (line.match(/^KSIĘGA/)) {
    lastLine = "KSIĘGA";
    lastBook = line;
    if (paragraf && chapter) chapter.paragraf.push(paragraf.join(" "));
    paragraf = undefined;
    if (chapter) book.chapters.push(chapter);
    chapter = undefined;
    if (book) books.push(book);
    book = {
      title: line,
      subtitle: "",
      chapters: []
    };
    return;
  }

  if (line.match(/^Rozdział/)) {
    lastLine = "Rozdział";
    lastChapter = line;
    // console.log(lastChapter);
    if (paragraf && chapter) chapter.paragraf.push(paragraf.join(" "));
    paragraf = undefined;
    if (chapter) book.chapters.push(chapter);
    chapter = {
      title: line,
      subtitle: [],
      paragraf: []
    };
    return;
  }

  if (line.match(/^\d/)) {
    if (paragraf) {
      chapter.paragraf.push(paragraf.join(" "));
    }
    paragraf = [line];
  } else {
    if (paragraf) {
      paragraf.push(line);
    } else {
      paragraf = [line];
    }
  }
});

if (paragraf) chapter.paragraf.push(paragraf.join(" "));
if (chapter) book.chapters.push(chapter);
if (book) books.push(book);

console.log(JSON.stringify(books, null, 2));

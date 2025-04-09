import { makeAutoObservable, reaction } from "mobx";
import book from "./book.json";

type Book = typeof book[number];
type Chapter = Book["chapters"][number];

export class Store {
  book = book;
  selectedBook?: Book;
  selectedChapter?: Chapter;

  constructor() {
    makeAutoObservable(this);
  }

  get urlParams() {
    const urlParams = new URLSearchParams(window.location.search);
    urlParams.set("book", this.selectedBook?.title.split(" ")[1] || "");
    urlParams.set("chapter", this.selectedChapter?.title.split(" ")[1] || "");
    return urlParams.toString();
  }

  fromUrlParams = (urlParams: URLSearchParams) => {
    const bookID = urlParams.get("book");
    const chapterID = urlParams.get("chapter");
    if (bookID && chapterID) {
      const book = this.book.find((book) => book.title.split(" ")[1] === bookID);
      if (book) {
        const chapter = book.chapters.find((chapter) => chapter.title.split(" ")[1] === chapterID);
        if (chapter) {
          this.selectedBook = book;
          this.selectedChapter = chapter; 
        }
      }
    }
  };

  select = (book: Book, chapter: Chapter) => {
    this.selectedBook = book;
    this.selectedChapter = chapter;
  };
  
  clear = () => {  
    this.selectedBook = undefined;
    this.selectedChapter = undefined;
  };
}

export const store = new Store();
store.fromUrlParams(new URLSearchParams(window.location.search));

declare global { interface Window { store: Store } }
window.store = store;

reaction(() => store.urlParams, (urlParams) => {
  const url = new URL(window.location.href);
  url.search = urlParams;
  window.history.pushState({}, "", url.toString());
});

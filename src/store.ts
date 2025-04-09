import { makeAutoObservable } from "mobx";
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

declare global { interface Window { store: Store } }
window.store = store;

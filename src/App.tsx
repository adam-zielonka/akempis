import { observer } from "mobx-react-lite";
import book from "./book.json";
import { store } from "./store";

const App = observer(() => {
  return <div>
    <p>O NAŚLADOWANIU CHRYSTUSA</p>
    <p>tłumaczenie: Anna Kamieńska</p>

    <p>
      <button disabled={!store.selectedBook} onClick={store.clear}>Całość</button>
    </p>

    {book.map((item) => {
      return <p key={item.title}>{item.chapters.map((chapter) => {
        return <button key={chapter.title} onClick={() => {
          store.select(item, chapter);
        }} disabled={store.selectedBook?.title === item.title && store.selectedChapter?.title === chapter.title}>
          {item.title.split(" ")[1]} - {chapter.title.split(" ")[1]}
        </button>;
      })
      }</p>;
    })}

    {store.selectedBook && <div>
      <h2>{store.selectedBook?.title}</h2>
      <h2>{store.selectedBook?.subtitle}</h2>
      <div>
        <h3>{store.selectedChapter?.title}</h3>
        <h4>{store.selectedChapter?.subtitle}</h4>
        {store.selectedChapter?.paragraf.map((paragraf, index) => {
          return <p key={index}>
            {paragraf}
          </p>;})}
      </div>
    </div>}

    {!store.selectedBook && book.map((item, index) => {
      return <div key={index}>
        <h2>{item.title}</h2>
        <h2>{item.subtitle}</h2>
        <div>
          {item.chapters.map((chapter, index) => {
            return <div key={index}>
              <h3>{chapter.title}</h3>
              <h4>{chapter.subtitle}</h4>
              {chapter.paragraf.map((paragraf, index) => {
                return <p key={index}>
                  {paragraf}
                </p>;})}
            </div>;
          })}
        </div>
      </div>;})}
  </div>;
});

export default App;

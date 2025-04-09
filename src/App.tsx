import book from './book.json'

function App() {
  return <div>
    <h1>O NAŚLADOWANIU CHRYSTUSA</h1>
    <p>tłumaczenie: Anna Kamieńska</p>
    {book.map((item, index) => {
    return <div key={index} className="book">
      <h2>{item.title}</h2>
      <h2>{item.subtitle}</h2>
      <div>
        {item.chapters.map((chapter, index) => {
          return <div key={index} className="chapter">
            <h3>{chapter.title}</h3>
            <h4>{chapter.subtitle}</h4>
            {chapter.paragraf.map((paragraf, index) => {
              return <p key={index} className="paragraf">
                {paragraf}
              </p>})}
          </div>
        })}
      </div>
    </div>})}
  </div>
}

export default App

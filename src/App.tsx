import book from './book.json'

function App() {
  return <div>
    <p>O NAŚLADOWANIU CHRYSTUSA</p>
    <p>tłumaczenie: Anna Kamieńska</p>
    {book.map((item, index) => {
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
              </p>})}
          </div>
        })}
      </div>
    </div>})}
  </div>
}

export default App

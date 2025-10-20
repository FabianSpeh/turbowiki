import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'

async function getWikipediaContent(title) {
  const baseString = "http://localhost:5000/article/"
  const finalString = baseString+title
  const response = await fetch(finalString)
  const html = await response.text()
  return html
}

function App() {
  const [count, setCount] = useState(0)
  const [articleHtml, setArticleHtml] = useState("")

  return (
    <>
      <div>
        <a href="https://vite.dev" target="_blank">
          <img src={viteLogo} className="logo" alt="Vite logo" />
        </a>
        <a href="https://react.dev" target="_blank">
          <img src={reactLogo} className="logo react" alt="React logo" />
        </a>
      </div>
      <div className= "wiki-content" dangerouslySetInnerHTML={{__html: articleHtml}}></div>
      <h1>Vite + React</h1>
      <div className="card">
        <button onClick={() => getWikipediaContent("Albert_Einstein").then(html => setArticleHtml(html))}>
          count is {count}
        </button>
        
      </div>
      
    </>
  )
}

export default App

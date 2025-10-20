import { useState,useEffect } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import Article from './Article'



function App() {
  const [count, setCount] = useState(0)
  const [searchTerm, setSearchTerm] = useState("")
  const [articleTitle, setArticleTitle] = useState("")
  

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
      
      <h1>Vite + React</h1>
      <Article title ={articleTitle}></Article>
      <div className="card">
        
        <input name="search" value={searchTerm} onChange={e => setSearchTerm(e.target.value)}></input>
        <button onClick={() => setArticleTitle(searchTerm)}></button>
      </div>
      
    </>
  )
}

export default App

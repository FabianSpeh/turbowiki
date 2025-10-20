import { useState,useEffect } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import Article from './Article'



function App() {
  const [count, setCount] = useState(0)
  const [searchTerm, setSearchTerm] = useState("")
  const [articleTitle, setArticleTitle] = useState("")
  
  async function getRandomArticle(){
    const randomArticle = await fetch("http://localhost:5000/article/random")
    const title = await randomArticle.text()
    setArticleTitle(title)
    
}

  return (
    <>
    
      
      <h1>{articleTitle}</h1>
      <Article title ={articleTitle}></Article>
      <div className="card">
        
        <input name="search" value={searchTerm} onChange={e => setSearchTerm(e.target.value)}></input>
        <button onClick={getRandomArticle}></button>
      </div>
      
    </>
  )
}

export default App

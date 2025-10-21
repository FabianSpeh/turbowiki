import { useState,useEffect } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import Article from './Article'



function App() {
  const [count, setCount] = useState(0)
  const [searchTerm, setSearchTerm] = useState("")
  const [startingArticleTitle, setStartingArticleTitle] = useState("")
  const [currentArticle, setCurrentArticle] = useState("")
  const [goalArticleTitle, setGoalArticleTitle] = useState("")
  const [gameWon, setGameWon] = useState(false)
  
//   async function getRandomStartingArticle(){
//     const randomArticle = await fetch("http://localhost:5000/article/random")
//     const title = await randomArticle.text()
//     setStartingArticleTitle(title)
    
// }
// async function getRandomGoalArticle(){
//     const randomArticle = await fetch("http://localhost:5000/article/random")
//     const title = await randomArticle.text()
//     setGoalArticleTitle(title)
    
// }

async function getTwoRandomArticles(){
  const randomArticle1 = await fetch("http://localhost:5000/article/random")
    const title1 = await randomArticle1.text()
    setStartingArticleTitle(title1)

  const randomArticle2 = await fetch("http://localhost:5000/article/random")
    const title2 = await randomArticle2.text()
    setGoalArticleTitle(title2)
    
}

function formatStrings(title){
  return title.replaceAll("_", " ")
}


// every time the article changes, it checks for equality to see if the player has won
useEffect(() => {
  if (startingArticleTitle && startingArticleTitle === goalArticleTitle) {
    setGameWon(true);
  }
}, [startingArticleTitle, goalArticleTitle]);

// as soon as the player has won a message is logged
useEffect(() => {
  if (gameWon) {
    console.log("YOU WON!!!!");
    alert("🎉 YOU WON!!!! 🎉");
  }
}, [gameWon]);
  return (
    <>
    
      <div className='main-screen'>
        <div className='topbar'>
          <div className='menu'>
            
          </div>
          <div className='article-titles'>
             <h1>{formatStrings(startingArticleTitle)} → {formatStrings(goalArticleTitle)}</h1>
          </div>
         
        </div>
      <div className='playing-area'>
         <div className='sidebar'><button onClick={getTwoRandomArticles}></button></div>
      <div className='wiki-container'>
       
      <Article title ={startingArticleTitle} onNavigate={setStartingArticleTitle}></Article>
      </div>
      </div>
     
      
      </div>
      
    </>
  )

}
export default App

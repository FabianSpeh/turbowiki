import { useState,useEffect } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import Article from './Article'



function App() {


  useEffect(() => {
    function setViewportHeight() {
      // 1vh = 1% of the visible window height
      const vh = window.innerHeight * 0.01;
      document.documentElement.style.setProperty("--vh", `${vh}px`);
    }

    setViewportHeight(); // run once on load
    window.addEventListener("resize", setViewportHeight); // re-run on resize
    return () => window.removeEventListener("resize", setViewportHeight);
  }, []);
  const [clickCount, setClickCount] = useState(0)
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
            <button onClick={getTwoRandomArticles}></button>
          </div>
          <div className='article-titles'>
             <h1>{formatStrings(startingArticleTitle)} → {formatStrings(goalArticleTitle)}</h1>
          </div>
         
        </div>
      <div className='playing-area'>
         <div className='sidebar'>
          <div className="sidebar-history">
            test
          </div>
          
          <div className='sidebar-footer'>
            <div className='timer'>
            test
          </div>
          <div className='click-counter'>
            Clicks : {clickCount}
          </div>
          </div>
          
         </div>
      <div className='wiki-container'>
       
      <Article title ={startingArticleTitle} onNavigate={setStartingArticleTitle} onLinkClick={() => setClickCount(clickCount+1)}></Article>
      </div>
      </div>
     
      
      </div>
      
    </>
  )

}
export default App

import { useState,useEffect } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import Article from './Article'
import Timer from './Timer'



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
  const [startingArticleTitle, setStartingArticleTitle] = useState("")
  const [currentArticle, setCurrentArticle] = useState("")
  const [goalArticleTitle, setGoalArticleTitle] = useState("")
  const [gameWon, setGameWon] = useState(false)
  const [articleHistory, setArticleHistory] = useState([])
  const [currentTime, getCurrentTime] = useState([])
  
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


function addToHistory(title) {
  const entry = { title};
  setArticleHistory(prev => [...prev, entry]);
  console.log(articleHistory)
}

// fetches 2 random articles as starting and goal article
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
             <div className="topbar-right">
             
             </div>
             
          </div>
         
        </div>
      <div className='playing-area'>
         <div className='sidebar'>
          <div className="sidebar-history">
            <h3>History</h3>
            <h4>Article</h4>
            <ul>
            {articleHistory.map((item, i) => (
              <li key={i}>
                <span>{formatStrings(item.title)}</span>
              </li>
            ))}
            </ul>
            
          </div>
          
          <div className='sidebar-footer'>
          
        
          <h1 className='click-counter'>
            CLICKS : {clickCount}
          </h1> 
            <h1>|</h1>
             <h1 className='timer'>
            <Timer ></Timer>
          </h1>
          </div>
          
         </div>
      <div className='wiki-container'>
      <div className='current-article-title'>
       
      </div>
      <Article title ={startingArticleTitle} onNavigate={setStartingArticleTitle} onLinkClick={() => setClickCount(clickCount+1)} onHistoryAdd={addToHistory}></Article>
      </div>
      </div>
     
      
      </div>
      
    </>
  )

}
export default App

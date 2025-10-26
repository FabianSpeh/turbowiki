import { useState,useEffect } from "react"
import './Article.css'

function Article({title, onNavigate, onLinkClick, onHistoryAdd}) {


async function getWikipediaContent(title) {
  const baseString = "http://localhost:5000/article/"
  const finalString = baseString+title
  const response = await fetch(finalString)
  const html = await response.text()
  return html
}


let clicks = 0
const [articleHtml, setArticleHtml] = useState("")
const [isLoading, setIsLoading] = useState(false)

 useEffect(() => {
    if (!title) return
    setIsLoading(true)
    getWikipediaContent(title)
      .then(data => setArticleHtml(data))
      .finally(() => setIsLoading(false))
  }, [title])

useEffect(() => {
    // selects whole wiki content container
    const container = document.querySelector(".wiki-content");
    if(!container) return;

    // handles the clicking on a link
    //only need to attach a single event listener, since the event "bubbles up" to the parent container
    function handleClick(event) {
        const link = event.target.closest("a")
        if(!link) return;

        // finds actual link and changes the url so it doesn't redirect to actual wikipedia
        const href = link.getAttribute("href");
        if (href && href.startsWith("/wiki/")){
            event.preventDefault();
            const newTitle = decodeURIComponent(href.replace("/wiki/",""))
            
            onNavigate(newTitle)
            onHistoryAdd(newTitle)

        }

    }
    container.addEventListener("click",handleClick);
    return () => container.removeEventListener("click", handleClick);
   

}, [articleHtml])
if (isLoading) return <p>Loading Article..</p>
return <div className="wiki-content" dangerouslySetInnerHTML={{__html: articleHtml}}/>
}

export default Article
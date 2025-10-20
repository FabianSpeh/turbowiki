import { useState,useEffect } from "react"

function Article({title}) {

async function getWikipediaContent(title) {
  const baseString = "http://localhost:5000/article/"
  const finalString = baseString+title
  const response = await fetch(finalString)
  const html = await response.text()
  return html
}

const [articleHtml, setArticleHtml] = useState("")
const [isLoading, setIsLoading] = useState(false)

 useEffect(() => {
    if (!title) return
    setIsLoading(true)
    getWikipediaContent(title)
      .then(data => setArticleHtml(data))
      .finally(() => setIsLoading(false))
  }, [title])


if (isLoading) return <p>Loading Article..</p>
return <div className="wiki-content" dangerouslySetInnerHTML={{__html: articleHtml}}/>
}

export default Article
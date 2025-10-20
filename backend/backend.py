import time
from flask import Flask
from flask_cors import CORS
import requests


app = Flask(__name__)
CORS(app)

def format_title(title):
    new_title = title.replace(" ","_")
    return new_title
@app.route('/article/random')
def get_random_article():
    headers = {
    "User-Agent": "Turbowiki-MVP/0.1 (https://yourdomain.com; contact@example.com)"
}
    request = requests.get(f"https://en.wikipedia.org/w/api.php", params={
        "action": "query",
        "list": "random",
        "rnnamespace": "0",
        "rnlimit": 1,
        "format": "json",
    
    },
    headers = headers)
    data = request.json()
    
    title = data["query"]["random"][0]["title"]
    print(title)
    
    # response = {
    #     "title": request.text["parse"]["title"],
    #     "html": request.text["parse"]["text"]["*"],
    # }
    return format_title(title)
    
    

@app.route('/article/<title>')
def get_article(title):
    headers = {
    "User-Agent": "Turbowiki-MVP/0.1 (https://yourdomain.com; contact@example.com)"
}
    request = requests.get(f"https://en.wikipedia.org/w/api.php", params={
        "action": "parse",
        "page": title,
        "prop": "text",
        "format": "json",
    
    },
    headers = headers)
    data = request.json()
    
    
    # response = {
    #     "title": request.text["parse"]["title"],
    #     "html": request.text["parse"]["text"]["*"],
    # }
    return data["parse"]["text"]["*"]
    

if __name__ == "__main__":
    app.run(debug=True)
import time
from flask import Flask
from flask_cors import CORS
import requests


app = Flask(__name__)
CORS(app)

@app.route('/article/<title>')
def get_current_time(title):
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
    print(data)
    
    # response = {
    #     "title": request.text["parse"]["title"],
    #     "html": request.text["parse"]["text"]["*"],
    # }
    return data["parse"]["text"]["*"]
    

if __name__ == "__main__":
    app.run(debug=True)
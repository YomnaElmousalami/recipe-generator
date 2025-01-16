from flask import Flask, render_template, request, jsonify, send_file
from text_generation import generate_message

# Make sure to type: "pip install beautifulsoup4" in the command line
# Make sure to type "pip install gTTS" in the command line
from bs4 import BeautifulSoup
from gtts import gTTS
import os
import torch
from diffusers import DiffusionPipeline, DPMSolverMultistepScheduler
from diffusers.utils import export_to_video

app = Flask(__name__)

@app.route("/") #Get request, to display the website
def index():
    return render_template("index.html")


@app.route("/generateText", methods = ["POST"]) 
def generate_text():
    data = request.json
    text = data.get("text")
    
    if not text:
        return jsonify({"error": "No text provided"}), 400
    
    response = generate_message(text)
    
    return jsonify({"response": response})


@app.route("/retrieveText", methods = ["POST"]) #when user clicks the convert to audio button
def retrieve_text():
    data = request.json
    html_content = data.get("html", "")

    # Convert HTML to plain text
    soup = BeautifulSoup(html_content, "html.parser")
    recipe_text = soup.get_text()
    language = 'en' 
    # slow=False. (the converted audio should have a high speed)
    myobj = gTTS(text=recipe_text, lang=language, slow=False)
    
    name = "recipe.mp3"
    myobj.save(name)
    return send_file(name, mimetype="audio/mpeg", as_attachment=False) 

#@app.route("/generateVideo", methods = ["POST"]) #when user clicks generate video button

if __name__ == "__main__":
    app.run(debug=True)
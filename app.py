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


@app.route("/generateVideo", methods = ["POST"]) #when user clicks generate video button
def generate_video():
    data = request.json

    pipe = DiffusionPipeline.from_pretrained("ali-vilab/text-to-video-ms-1.7b", torch_dtype = torch.float16, variant="fp16")
    pipe.scheduler = DPMSolverMultistepScheduler.from_config(pipe.scheduler.config)
    pipe.enable_model_cpu_offload()
    
    html_content = data.get("html", "")
    # Convert HTML to plain text
    soup = BeautifulSoup(html_content, "html.parser")
    prompt = soup.get_text()
    video_frames = pipe(prompt, num_inference_steps = 25).frames
    video_path = export_to_video(video_frames[0])
    torch.cuda.empty_cache()
    return {"url": video_path}

if __name__ == "__main__":
    app.run(debug=True)
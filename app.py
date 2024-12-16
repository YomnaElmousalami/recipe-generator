from flask import Flask, render_template, request, jsonify
from text_generation import generate_message

app = Flask(__name__)

@app.route("/") #Get request, to display the website
def index():
    return render_template("index.html")

@app.route("/generateText", methods = ["POST"]) #when user generates method, this will run
def generate_text():
    data = request.json
    text = data.get("text")
    
    if not text:
        return jsonify({"error": "No text provided"}), 400
    
    response = generate_message(text)
    
    return jsonify({"response": response})

if __name__ == "__main__":
    app.run(debug=True)
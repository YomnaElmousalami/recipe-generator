import os
from openai import OpenAI
from dotenv import load_dotenv

#load .env variable
load_dotenv()
client = OpenAI(api_key=os.getenv("OPENAI_KEY"))

def generate_message(input):
    response = client.chat.completions.create(model="gpt-4",
    messages=[
        {"role": "system", 
         "content": "You are a helpful assistant."},
        {"role": "user", "content": input}
    ],)
    
    return response.choices[0].message.content
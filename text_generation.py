import os
from openai import OpenAI
from dotenv import load_dotenv

#load .env variable
load_dotenv()
client = OpenAI(api_key=os.getenv("OPENAI_KEY"))

def generate_message(message):
    response = client.chat.completions.create(model="gpt-4o",
    messages=[
        {"role": "system", 
         "content": "You are a helpful assistant. Please take the following request and generate a recipe. Make sure to include an ingredients list with their associated measurements. After, include step-by-step instructions on how to generate the recipe."},
        {"role": "user", "content": message}
    ],)
    
    return response.choices[0].message
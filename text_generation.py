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
         "content": 
         "You are a helpful assistant." 
         "Please generate a recipe with a list of ingridents and their measurements." 
         "Please list the ingridents in a bulleted list one after the other in a new line: Ingredients list:\n- chocolate chips: 1 cup\ngranulated sugar: 3/4 cups"
         "After, please include step by step instructions on how to create the food in a bulleted list one after another in a new line"
         },
        {"role": "user", "content": input}
    ],)
    return response.choices[0].message.content
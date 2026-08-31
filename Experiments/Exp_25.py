from google import genai
from google.genai import types

# Put your API key directly inside the Client definition
client = genai.Client(api_key="YOUR_API_KEY")

prompt = input("Enter Prompt: ")

response = client.models.generate_content(
    model="gemini-2.5-flash",
    contents=prompt,
    config=types.GenerateContentConfig(
        max_output_tokens=1000
    )
)

print(response.text)

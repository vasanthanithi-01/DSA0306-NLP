from transformers import pipeline

trans = pipeline(
    "translation_en_to_fr",
    model="Helsinki-NLP/opus-mt-en-fr"
)

english_text = "Hello"

result = trans(english_text)

print(result[0]["translation_text"])

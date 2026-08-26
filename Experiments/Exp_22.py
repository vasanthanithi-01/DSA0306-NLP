import nltk
import re
nltk.download('punkt_tab')
text = "John went to the store. He bought a book. It was expensive."

# Split text into sentences
sentences = nltk.sent_tokenize(text)

# Simple reference resolution
for sentence in sentences:
    print("Sentence:", sentence)

    if "He" in sentence:
        print("Reference: He -> John")

    if "It" in sentence:
        print("Reference: It -> book")

    print()
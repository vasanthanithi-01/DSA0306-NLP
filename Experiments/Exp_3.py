# Program 3: Morphological Analysis

import nltk
from nltk.tokenize import word_tokenize
from nltk.stem import WordNetLemmatizer

nltk.download('punkt')
nltk.download('wordnet')
nltk.download('averaged_perceptron_tagger')
nltk.download('omw-1.4')

lemmatizer = WordNetLemmatizer()

text = "The boys are running and the girls are writing."

tokens = word_tokenize(text)
tags = nltk.pos_tag(tokens)

print("Word\tPOS\tLemma")

for word, tag in tags:
    lemma = lemmatizer.lemmatize(word)
    print(word, "\t", tag, "\t", lemma)
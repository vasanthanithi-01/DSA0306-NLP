# Program 5: Porter Stemmer

import nltk
from nltk.stem import PorterStemmer

stemmer = PorterStemmer()

words = [
    "running",
    "playing",
    "studies",
    "studying",
    "connected",
    "connection",
    "happiness",
    "flying",
    "wolves",
    "cars"
]

print("Original\tStem")

for word in words:
    print(word, "\t", stemmer.stem(word))
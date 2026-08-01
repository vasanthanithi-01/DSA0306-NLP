# Program 7: POS Tagging

import nltk
from nltk.tokenize import word_tokenize

nltk.download('punkt')
nltk.download('averaged_perceptron_tagger')

sentence = "The little boy is playing football."

tokens = word_tokenize(sentence)

tags = nltk.pos_tag(tokens)

print("Word\tPOS")

for word, tag in tags:
    print(word, "\t", tag)
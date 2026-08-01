# Program 9: Rule-Based POS Tagging

from nltk.tag import RegexpTagger
from nltk.tokenize import word_tokenize

patterns = [
    (r'.*ing$', 'VBG'),
    (r'.*ed$', 'VBD'),
    (r'.*es$', 'VBZ'),
    (r'.*s$', 'NNS'),
    (r'[0-9]+', 'CD'),
    (r'.*', 'NN')
]

tagger = RegexpTagger(patterns)

sentence = "The boys are playing games"

tokens = word_tokenize(sentence)

tags = tagger.tag(tokens)

print("Word\tPOS")

for word, tag in tags:
    print(word, "\t", tag)
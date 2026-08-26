import nltk

from nltk import CFG
from nltk.parse import ChartParser

# Define grammar
grammar = CFG.fromstring("""
    S -> NP VP
    NP -> Det N
    VP -> V NP

    Det -> 'the' | 'a'
    N -> 'boy' | 'girl' | 'book'
    V -> 'reads' | 'likes'
""")

parser = ChartParser(grammar)

sentence = "the boy reads a book".split()

# Parse the sentence
for tree in parser.parse(sentence):
    print("Parse Tree:")
    print(tree)

    # Extract noun phrases
    print("\nNoun Phrases:")
    for subtree in tree.subtrees():
        if subtree.label() == "NP":
            print(" ".join(subtree.leaves()))
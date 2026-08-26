import nltk
from nltk import CFG
from nltk.parse import RecursiveDescentParser

# Define a context-free grammar
grammar = CFG.fromstring("""
    S -> NP VP
    NP -> Det N
    VP -> V NP
    Det -> 'the' | 'a'
    N -> 'cat' | 'dog' | 'mouse'
    V -> 'chases' | 'sees'
""")

# Create top-down parser
parser = RecursiveDescentParser(grammar)

# Input sentence
sentence = "the cat chases the mouse".split()

# Parse the sentence
print("Parse Trees:")
for tree in parser.parse(sentence):
    print(tree)
    tree.pretty_print()
    
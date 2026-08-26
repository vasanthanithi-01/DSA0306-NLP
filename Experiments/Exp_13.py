import nltk
from nltk import CFG
from nltk.parse import ChartParser

# Define a context-free grammar
grammar = CFG.fromstring("""
    S -> NP VP
    NP -> Det N
    VP -> V NP
    Det -> 'the' | 'a'
    N -> 'cat' | 'dog' | 'mouse'
    V -> 'chases' | 'sees'
""")

# Create parser
parser = ChartParser(grammar)

# Input sentence
sentence = "the cat chases the mouse".split()

# Generate parse tree
for tree in parser.parse(sentence):
    print("Parse Tree:")
    print(tree)
    tree.pretty_print()
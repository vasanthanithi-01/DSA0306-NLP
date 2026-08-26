from nltk import PCFG
from nltk.parse import ViterbiParser

# Define a probabilistic CFG
grammar = PCFG.fromstring("""
    S -> NP VP [1.0]

    NP -> Det N [0.6]
    NP -> 'John' [0.4]

    VP -> V NP [0.7]
    VP -> V [0.3]

    Det -> 'the' [1.0]

    N -> 'cat' [0.5]
    N -> 'dog' [0.5]

    V -> 'sees' [1.0]
""")

# Create Viterbi parser
parser = ViterbiParser(grammar)

# Input sentence
sentence = "John sees the dog".split()

# Parse sentence
print("Probabilistic Parse Tree:")

for tree in parser.parse(sentence):
    print(tree)
    tree.pretty_print()
from nltk import CFG
from nltk.parse import EarleyChartParser
grammer=CFG.fromstring("""S -> NP VP
NP -> Det N
VP -> V NP
Det -> 'the'
N -> 'boy'|'apple'
V -> 'ate'
""")
parser=EarleyChartParser(grammer)
sentence="the boy ate the apple".split()
tree=list(parser.parse(sentence))
if tree:
    print("Sentence Accepted")
    for trees in tree:
        trees.pretty_print()
else:
    print("sentence Rejected")
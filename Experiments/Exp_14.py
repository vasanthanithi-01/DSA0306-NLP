from nltk import CFG
from nltk.parse import ChartParser

# Define CFG with subject-verb agreement
grammar = CFG.fromstring("""
    S -> NP_S VP_S
    S -> NP_P VP_P

    NP_S -> Det_S N_S
    NP_P -> Det_P N_P

    VP_S -> V_S
    VP_P -> V_P

    Det_S -> 'the'
    Det_P -> 'the'

    N_S -> 'boy' | 'girl'
    N_P -> 'boys' | 'girls'

    V_S -> 'plays' | 'runs'
    V_P -> 'play' | 'run'
""")

parser = ChartParser(grammar)

sentences = [
    "the boy plays",
    "the boys play",
    "the boy play",
    "the boys plays"
]

for sentence in sentences:
    words = sentence.split()

    trees = list(parser.parse(words))

    if trees:
        print(sentence, "-> Correct agreement")
    else:
        print(sentence, "-> Incorrect agreement")
# Program 8: Stochastic POS Tagging

import random

model = {
    "I": ["PRP"],
    "can": ["MD", "NN", "VB"],
    "play": ["VB", "NN"],
    "football": ["NN"]
}

sentence = "I can play football"

print("Word\tPOS")

for word in sentence.split():

    if word in model:
        tag = random.choice(model[word])
    else:
        tag = "NN"

    print(word, "\t", tag)
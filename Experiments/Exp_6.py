# Program 6: Bigram Model

import random
from nltk.util import bigrams

text = "I love natural language processing and natural language is interesting"

words = text.split()

pairs = list(bigrams(words))

model = {}

for w1, w2 in pairs:
    model.setdefault(w1, []).append(w2)

word = "natural"

sentence = [word]

for i in range(10):
    if word in model:
        word = random.choice(model[word])
        sentence.append(word)
    else:
        break

print("Generated Sentence:")
print(" ".join(sentence))
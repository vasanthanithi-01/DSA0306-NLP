import nltk
from nltk.wsd import lesk
from nltk.corpus import wordnet

sentence="I sat by the river bank"

words=sentence.split()

result=lesk(words,"bank")

print("Sentence: ", sentence)
print("Ambiguous word: bank")

if result:
    print("Selected sense:", result.name())
    print("Defenition: ", result.definition())
else:
    print("No sense found!")

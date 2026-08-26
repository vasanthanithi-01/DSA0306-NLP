import nltk
from nltk.corpus import wordnet

nltk.download('wordnet')
nltk.download('omw-1.4')

word='car'

synsets=wordnet.synsets(word) 
print("Word: ", word)
print("Number of synsets: ", len(synsets))

for synset in synsets:
    print("\n synset: ", synset.name())
    print("Def: ", synset.definition())
    print("Example: ", synset.examples())


    synonyms=synset.lemmas()
    print("Synonyms: ", [lemma.name() for lemma in synonyms])
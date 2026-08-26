import spacy

# Load the pre-trained English NLP model
nlp = spacy.load("en_core_web_sm")

# Input text
text = "Dr. A.P.J. Abdul Kalam was born in Rameswaram and worked at ISRO."

# Process the text
doc = nlp(text)

# Display named entities
print("Named Entities:")

for ent in doc.ents:
    print(ent.text, "->", ent.label_)
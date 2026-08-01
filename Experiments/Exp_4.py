# Program 4: Morphological Parsing

def generate_plural(noun):

    if noun.endswith(("s", "x", "z", "ch", "sh")):
        return noun + "es"

    elif noun.endswith("y") and noun[-2].lower() not in "aeiou":
        return noun[:-1] + "ies"

    else:
        return noun + "s"

words = ["cat", "dog", "bus", "box", "church",
         "dish", "baby", "city", "toy", "book"]

print("Singular\tPlural")

for word in words:
    print(f"{word:10}\t{generate_plural(word)}")
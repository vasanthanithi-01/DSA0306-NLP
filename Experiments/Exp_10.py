# Program 10: Transformation-Based Tagging

sentence = ["The", "cats", "run", "fast"]

tags = [
    ("The", "NN"),
    ("cats", "NN"),
    ("run", "NN"),
    ("fast", "NN")
]

print("Before Transformation")

for word, tag in tags:
    print(word, "->", tag)

new_tags = []

for word, tag in tags:

    if word.lower() == "the":
        tag = "DT"

    elif word.endswith("s"):
        tag = "NNS"

    elif word.lower() == "run":
        tag = "VB"

    elif word.lower() == "fast":
        tag = "RB"

    new_tags.append((word, tag))

print("\nAfter Transformation")

for word, tag in new_tags:
    print(word, "->", tag)
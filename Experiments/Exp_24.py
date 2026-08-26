def recognize_dialog_act(sentence):
    sentence = sentence.lower().strip()

    if any(word in sentence for word in ["hello", "hi", "hey"]):
        return "Greeting"

    elif "?" in sentence or any(
        word in sentence for word in ["what", "where", "when", "why", "how"]
    ):
        return "Question"

    elif any(word in sentence for word in ["please", "can you", "could you"]):
        return "Request"

    elif any(word in sentence for word in ["thank", "thanks"]):
        return "Thanking"

    elif any(word in sentence for word in ["bye", "goodbye"]):
        return "Goodbye"

    else:
        return "Statement"


# Test dialog
dialog = [
    "Hello!",
    "Can you book an appointment?",
    "Please send me the details.",
    "Thank you.",
    "Goodbye!"
]

for sentence in dialog:
    print(sentence, "->", recognize_dialog_act(sentence))
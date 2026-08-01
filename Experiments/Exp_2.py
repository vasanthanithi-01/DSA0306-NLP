# Program 2: Finite State Automaton

def fsa(string):
    state = 0

    for ch in string:
        if state == 0:
            if ch == 'a':
                state = 1
            else:
                state = 0

        elif state == 1:
            if ch == 'b':
                state = 2
            elif ch == 'a':
                state = 1
            else:
                state = 0

        elif state == 2:
            if ch == 'a':
                state = 1
            else:
                state = 0

    return state == 2

words = ["ab", "cab", "aab", "abc", "abab", "baa"]

for word in words:
    print(word, "Accepted" if fsa(word) else "Rejected")
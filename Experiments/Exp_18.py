import re

def parse_fopc(expression):
    expression = expression.strip()

    # Predicate with one argument: P(x)
    match = re.match(r'^([A-Za-z]+)\(([^()]+)\)$', expression)

    if match:
        predicate = match.group(1)
        arguments = match.group(2).split(',')

        return {
            "Predicate": predicate,
            "Arguments": [arg.strip() for arg in arguments]
        }

    # Logical expression using AND / OR
    if " AND " in expression:
        parts = expression.split(" AND ")
        return {
            "Operator": "AND",
            "Expressions": [parse_fopc(part) for part in parts]
        }

    if " OR " in expression:
        parts = expression.split(" OR ")
        return {
            "Operator": "OR",
            "Expressions": [parse_fopc(part) for part in parts]
        }

    return {"Expression": expression}


# Test expressions
expressions = [
    "Human(John)",
    "Likes(John,Mary)",
    "Human(John) AND Student(John)",
    "Likes(John,Mary) OR Likes(Mary,John)"
]

for expression in expressions:
    print("\nExpression:", expression)
    print("Parsed:", parse_fopc(expression))
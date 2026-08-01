# Program 1: Regular Expressions

import re

text = "My email is student123@gmail.com and my phone number is 9876543210."

# Search email
email = re.search(r'\S+@\S+', text)

# Search phone number
phone = re.search(r'\d{10}', text)

print("Text:", text)

if email:
    print("Email Found:", email.group())

if phone:
    print("Phone Number Found:", phone.group())

    
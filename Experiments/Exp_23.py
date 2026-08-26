from sklearn.feature_extraction.text import TfidfVectorizer
from sklearn.metrics.pairwise import cosine_similarity

text = """
Machine learning is a branch of artificial intelligence.
Machine learning algorithms learn patterns from data.
These algorithms can be used for prediction and classification.
"""

# Split text into sentences
sentences = [
    sentence.strip()
    for sentence in text.strip().split(".")
    if sentence.strip()
]

# Convert sentences to TF-IDF vectors
vectorizer = TfidfVectorizer()
tfidf_matrix = vectorizer.fit_transform(sentences)

# Calculate similarity between consecutive sentences
similarities = []

for i in range(len(sentences) - 1):
    score = cosine_similarity(
        tfidf_matrix[i],
        tfidf_matrix[i + 1]
    )[0][0]

    similarities.append(score)

# Calculate average coherence
coherence = sum(similarities) / len(similarities)

print("Sentences:")
for sentence in sentences:
    print(sentence)

print("\nSimilarity Scores:")
for score in similarities:
    print(round(score, 3))

print("\nCoherence Score:", round(coherence, 3))

if coherence >= 0.3:
    print("Text is coherent.")
else:
    print("Text has low coherence.")
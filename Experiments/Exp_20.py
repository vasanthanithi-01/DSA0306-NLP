from sklearn.feature_extraction.text import TfidfVectorizer
from sklearn.metrics.pairwise import cosine_similarity


# Collection of documents
documents = [
    "Python is a popular programming language",
    "Machine learning uses algorithms to learn from data",
    "Python is widely used for machine learning",
    "Natural language processing is a field of artificial intelligence",
    "Deep learning is used in artificial intelligence"
]


# Create TF-IDF Vectorizer
vectorizer = TfidfVectorizer()

# Convert documents into TF-IDF vectors
tfidf_matrix = vectorizer.fit_transform(documents)


# Get search query
query = input("Enter your search query: ")


# Convert query into TF-IDF vector
query_vector = vectorizer.transform([query])


# Calculate cosine similarity
similarity_scores = cosine_similarity(
    query_vector,
    tfidf_matrix
).flatten()


# Rank documents
ranked_documents = similarity_scores.argsort()[::-1]


# Display results
print("\nSearch Results:\n")

for index in ranked_documents:
    print("Document:", documents[index])
    print("Similarity Score:", round(similarity_scores[index], 3))
    print()
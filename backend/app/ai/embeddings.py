"""
KrishiMitra Lightweight Vector & Term Similarity Engine
Zero external API dependency - works offline and inside sandboxed environments.
"""
import math
import re
from typing import List, Dict, Tuple

def tokenize(text: str) -> List[str]:
    """Tokenize and normalize text into clean lower-case terms."""
    cleaned = re.sub(r'[^\w\s]', ' ', text.lower())
    return [word for word in cleaned.split() if len(word) > 2]

class LightweightRetrieverVectorEngine:
    def __init__(self):
        self.vocabulary: Dict[str, int] = {}
        self.doc_vectors: List[Dict[str, float]] = []
        self.doc_lengths: List[int] = []
        self.idf: Dict[str, float] = {}

    def fit_transform(self, documents: List[str]):
        """Build IDF and normalized TF-IDF representations."""
        num_docs = len(documents)
        term_doc_count: Dict[str, int] = {}

        for doc in documents:
            tokens = set(tokenize(doc))
            for t in tokens:
                term_doc_count[t] = term_doc_count.get(t, 0) + 1

        self.idf = {
            t: math.log((num_docs + 1) / (count + 1)) + 1.0
            for t, count in term_doc_count.items()
        }

        self.doc_vectors = []
        for doc in documents:
            tokens = tokenize(doc)
            self.doc_lengths.append(len(tokens))
            tf: Dict[str, float] = {}
            for t in tokens:
                tf[t] = tf.get(t, 0) + 1
            
            # TF-IDF calculation
            vec = {t: (count / (len(tokens) or 1)) * self.idf.get(t, 1.0) for t, count in tf.items()}
            # Normalize vector
            norm = math.sqrt(sum(v * v for v in vec.values())) or 1.0
            normalized_vec = {t: v / norm for t, v in vec.items()}
            self.doc_vectors.append(normalized_vec)

    def query_similarity(self, query: str) -> List[Tuple[int, float]]:
        """Compute cosine similarity scores between query and all documents."""
        tokens = tokenize(query)
        if not tokens or not self.doc_vectors:
            return []

        q_tf: Dict[str, float] = {}
        for t in tokens:
            q_tf[t] = q_tf.get(t, 0) + 1
        
        q_vec = {t: (count / len(tokens)) * self.idf.get(t, 1.0) for t, count in q_tf.items()}
        q_norm = math.sqrt(sum(v * v for v in q_vec.values())) or 1.0
        q_norm_vec = {t: v / q_norm for t, v in q_vec.items()}

        scores = []
        for idx, doc_vec in enumerate(self.doc_vectors):
            dot_product = sum(q_norm_vec.get(t, 0) * doc_vec.get(t, 0) for t in q_norm_vec)
            scores.append((idx, float(dot_product)))

        scores.sort(key=lambda x: x[1], reverse=True)
        return scores

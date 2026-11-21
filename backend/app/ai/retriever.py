"""
KrishiMitra Agricultural Knowledge Retriever
Matches farmer queries against verified AAU and ICAR agronomy documents.
"""
from typing import List, Dict, Any, Optional
from app.ai.embeddings import LightweightRetrieverVectorEngine
from app.ai.source_manager import get_all_knowledge_documents

class AgriculturalRetriever:
    def __init__(self):
        self.documents = get_all_knowledge_documents()
        self.vector_engine = LightweightRetrieverVectorEngine()
        
        # Prepare text representation for vector indexing
        corpus = [
            f"{doc['title']} {doc['category']} {doc['region']} {' '.join(doc.get('crops', []))} {doc['content']}"
            for doc in self.documents
        ]
        self.vector_engine.fit_transform(corpus)

    def retrieve(
        self,
        query: str,
        top_k: int = 3,
        location: Optional[str] = None,
        crop: Optional[str] = None
    ) -> List[Dict[str, Any]]:
        """Retrieve most relevant agricultural documents matching query."""
        if not query.strip():
            return []

        search_query = query
        if location:
            search_query += f" {location}"
        if crop:
            search_query += f" {crop}"

        scores = self.vector_engine.query_similarity(search_query)
        
        results = []
        for idx, score in scores:
            if score > 0.04 or len(results) == 0:
                doc = self.documents[idx]
                snippet = doc["content"][:240] + "..." if len(doc["content"]) > 240 else doc["content"]
                results.append({
                    "title": doc["title"],
                    "organization": doc["organization"],
                    "document_type": doc["document_type"],
                    "source_url": doc.get("source_url"),
                    "relevance_snippet": snippet,
                    "full_content": doc["content"],
                    "score": round(score, 3)
                })
            if len(results) >= top_k:
                break

        # Fallback to general guidance if nothing matched above threshold
        if not results and self.documents:
            doc = self.documents[0]
            results.append({
                "title": doc["title"],
                "organization": doc["organization"],
                "document_type": doc["document_type"],
                "source_url": doc.get("source_url"),
                "relevance_snippet": doc["content"][:240] + "...",
                "full_content": doc["content"],
                "score": 0.05
            })

        return results

retriever = AgriculturalRetriever()

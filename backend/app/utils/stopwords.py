"""
Stop Words Utility Module
-------------------------
DATA STRUCTURE USED:
- Set (set[str]):
  A Python hash-set providing O(1) average time complexity for membership testing (word in STOPWORDS).
  This ensures optimal performance when filtering tokens out of questions.
"""

# Common English stop words tailored for question similarity analysis
STOPWORDS: set[str] = {
    # Question words / Pronouns
    "what", "which", "who", "whom", "this", "that", "these", "those",
    "am", "is", "are", "was", "were", "be", "been", "being",
    "have", "has", "had", "having", "do", "does", "did", "doing",
    "a", "an", "the", "and", "but", "if", "or", "because", "as",
    "until", "while", "of", "at", "by", "for", "with", "about",
    "against", "between", "into", "through", "during", "before",
    "after", "above", "below", "to", "from", "up", "down", "in",
    "out", "on", "off", "over", "under", "again", "further", "then",
    "once", "here", "there", "when", "where", "why", "how", "all",
    "any", "both", "each", "few", "more", "most", "other", "some",
    "such", "no", "nor", "not", "only", "own", "same", "so", "than",
    "too", "very", "can", "will", "just", "should", "now", "i", "me",
    "my", "myself", "we", "our", "ours", "ourselves", "you", "your",
    "yours", "yourself", "yourselves", "he", "him", "his", "himself",
    "she", "her", "hers", "herself", "it", "its", "itself", "they",
    "them", "their", "theirs", "themselves"
}


def get_stopwords() -> set[str]:
    """Returns the set of stopwords."""
    return STOPWORDS

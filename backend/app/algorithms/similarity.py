"""
Core Text Similarity & Duplicate Question Detection Algorithm
-------------------------------------------------------------
This module implements a complete, transparent, and manual Cosine Similarity
pipeline designed for academic and Data Structure Lab evaluation.

DATA STRUCTURES DEMONSTRATED:
1. String:
   Used in text preprocessing (lowercasing, character-by-character punctuation stripping).
2. List (Array):
   Used to store token sequences, processed words, vocabulary vectors, and ordered results.
3. Set:
   Used for O(1) stop word filtering, unique vocabulary union, and set-intersection for common words.
4. HashMap (Dictionary):
   Used for word frequency counting (key: word, value: occurrence count) with O(1) lookup/insert.
5. Sorting:
   Used to sort vocabulary and common words in deterministic alphabetical order for presentation.
"""

import math
import re
from typing import Dict, List, Set, Tuple
from app.utils.stopwords import STOPWORDS

# Configurable Project-Defined Threshold
DEFAULT_DUPLICATE_THRESHOLD: float = 0.70


def clean_text(text: str) -> str:
    """
    Step 1 & 2: Preprocess raw string.
    
    DATA STRUCTURE USED:
    - String:
      Low-level immutable character sequence.
      Applies lowercasing and regex-based punctuation removal.
      
    Example:
    "How Can I Learn Python?" -> "how can i learn python"
    """
    if not text:
        return ""
    
    # Convert to lowercase
    lowered = text.lower()
    
    # Remove punctuation, symbols, and extra whitespace
    # Replace non-alphanumeric characters (except spaces) with space
    cleaned = re.sub(r"[^\w\s]", " ", lowered)
    # Collapse multiple spaces into a single space and strip edges
    cleaned = re.sub(r"\s+", " ", cleaned).strip()
    return cleaned


def tokenize(text: str) -> List[str]:
    """
    Step 3: Tokenization.
    
    DATA STRUCTURE USED:
    - Array / List (list[str]):
      Stores the sequential tokens extracted from the cleaned text.
      
    Example:
    "how can i learn python" -> ["how", "can", "i", "learn", "python"]
    """
    cleaned = clean_text(text)
    if not cleaned:
        return []
    # Split string by whitespace into an array/list of word tokens
    tokens: List[str] = cleaned.split(" ")
    return [token for token in tokens if token]


def remove_stopwords(tokens: List[str], stopwords: Set[str] = None) -> List[str]:
    """
    Step 4: Stop Word Removal.
    
    DATA STRUCTURES USED:
    - Set (set[str]):
      Provides O(1) average lookup time to verify if a token is a stop word.
    - Array / List (list[str]):
      Stores the filtered meaningful content tokens.
      
    Example:
    ["how", "can", "i", "learn", "python"] -> ["learn", "python"]
    """
    if stopwords is None:
        stopwords = STOPWORDS
    
    # Retain tokens that are NOT in the stop word set
    filtered_tokens: List[str] = [token for token in tokens if token not in stopwords]
    
    # Fallback: if all words were removed (e.g. "Why is that?"), keep original tokens
    if not filtered_tokens and tokens:
        return tokens
        
    return filtered_tokens


def build_frequency_map(tokens: List[str]) -> Dict[str, int]:
    """
    Step 5: Word Frequency Counting.
    
    DATA STRUCTURE USED:
    - HashMap / Dictionary (dict[str, int]):
      Provides efficient key-value pairs (Word -> Count) with O(1) average
      time complexity for insertions and lookups.
      
    Example:
    ["learn", "python", "learn"] -> {"learn": 2, "python": 1}
    """
    frequency_map: Dict[str, int] = {}
    for token in tokens:
        if token in frequency_map:
            frequency_map[token] += 1
        else:
            frequency_map[token] = 1
    return frequency_map


def build_vocabulary(tokens1: List[str], tokens2: List[str]) -> List[str]:
    """
    Step 6: Unique Vocabulary Set & Sorted Array.
    
    DATA STRUCTURES USED:
    - Set (set[str]):
      Computes the mathematical UNION of unique words from both token lists,
      automatically eliminating duplicate words.
    - Sorting (sorted()):
      Sorts the unique set into a deterministic, ordered List so vectors
      maintain consistent coordinate indexes.
      
    Example:
    Q1: {"learn", "python"}
    Q2: {"learn", "coding"}
    Union Set: {"learn", "python", "coding"}
    Sorted List: ["coding", "learn", "python"]
    """
    # Set union
    unique_set: Set[str] = set(tokens1).union(set(tokens2))
    # Meaningful sorting for deterministic vector indexing and UI display
    sorted_vocabulary: List[str] = sorted(list(unique_set))
    return sorted_vocabulary


def create_vector(frequency_map: Dict[str, int], vocabulary: List[str]) -> List[int]:
    """
    Step 7: Vector Space Representation.
    
    DATA STRUCTURE USED:
    - Array / List (list[int]):
      Represents the question as an N-dimensional frequency vector, where N
      is the size of the combined vocabulary.
      
    Example:
    Vocabulary: ["coding", "learn", "python"]
    Freq Map: {"learn": 1, "python": 1}
    Vector: [0, 1, 1]
    """
    vector: List[int] = []
    for word in vocabulary:
        # Fetch frequency from HashMap in O(1) time; defaults to 0 if not present
        count = frequency_map.get(word, 0)
        vector.append(count)
    return vector


def calculate_cosine_similarity(vector1: List[int], vector2: List[int]) -> Tuple[float, int, float, float]:
    """
    Step 8: Cosine Similarity Calculation.
    
    FORMULA:
    Cosine Similarity = (A · B) / (||A|| × ||B||)
    
    where:
    - A · B is the dot product: Sum(A[i] * B[i])
    - ||A|| is the Euclidean magnitude: Sqrt(Sum(A[i]^2))
    - ||B|| is the Euclidean magnitude: Sqrt(Sum(B[i]^2))
    
    Returns:
    (similarity_score, dot_product, magnitude1, magnitude2)
    """
    if len(vector1) != len(vector2) or not vector1:
        return 0.0, 0, 0.0, 0.0
    
    # 1. Dot product calculation
    dot_product: int = 0
    sum_sq1: int = 0
    sum_sq2: int = 0
    
    for i in range(len(vector1)):
        val1 = vector1[i]
        val2 = vector2[i]
        dot_product += val1 * val2
        sum_sq1 += val1 * val1
        sum_sq2 += val2 * val2
        
    magnitude1: float = math.sqrt(sum_sq1)
    magnitude2: float = math.sqrt(sum_sq2)
    
    # Avoid division by zero
    if magnitude1 == 0.0 or magnitude2 == 0.0:
        return 0.0, dot_product, magnitude1, magnitude2
        
    similarity = dot_product / (magnitude1 * magnitude2)
    # Clip between 0.0 and 1.0 to guard against floating-point inaccuracies
    similarity = max(0.0, min(1.0, similarity))
    return similarity, dot_product, magnitude1, magnitude2


def get_common_words(tokens1: List[str], tokens2: List[str]) -> List[str]:
    """
    Extract common words between two token lists.
    
    DATA STRUCTURES USED:
    - Set (set[str]):
      Computes set intersection (set1 & set2) in O(min(len(s1), len(s2))) time.
    - Sorting:
      Sorts the resulting list alphabetically for clear UI presentation.
      
    Example:
    Q1 words: {"learn", "python", "programming"}
    Q2 words: {"learn", "python", "coding"}
    Common: ["learn", "python"]
    """
    set1 = set(tokens1)
    set2 = set(tokens2)
    common_set = set1.intersection(set2)
    return sorted(list(common_set))


def get_duplicate_status(similarity_pct: float, threshold_pct: float = 70.0) -> Tuple[bool, str]:
    """
    Determines duplicate categorization based on project-defined thresholds.
    
    Threshold Tiers:
    - 70% to 100%: Duplicate / Highly Similar
    - 40% to 69.9%: Possibly Similar
    - 0% to 39.9%: Not Duplicate
    """
    if similarity_pct >= threshold_pct:
        return True, "Duplicate / Highly Similar"
    elif similarity_pct >= 40.0:
        return False, "Possibly Similar"
    else:
        return False, "Not Duplicate"


def check_duplicate(
    question1: str,
    question2: str,
    threshold: float = DEFAULT_DUPLICATE_THRESHOLD
) -> Dict:
    """
    Complete Pipeline Controller:
    Executes the entire question similarity detection pipeline and returns
    both high-level results and step-by-step Data Structure inspection details.
    """
    # 1. Clean and Tokenize (String -> List)
    raw_tokens1 = tokenize(question1)
    raw_tokens2 = tokenize(question2)
    
    # 2. Stop Word Removal (List + Set -> Filtered List)
    processed_q1 = remove_stopwords(raw_tokens1)
    processed_q2 = remove_stopwords(raw_tokens2)
    
    # 3. Frequency Maps (HashMap / Dictionary)
    freq_map1 = build_frequency_map(processed_q1)
    freq_map2 = build_frequency_map(processed_q2)
    
    # 4. Vocabulary (Set Union + Sorting -> List)
    vocabulary = build_vocabulary(processed_q1, processed_q2)
    
    # 5. Common Words (Set Intersection + Sorting -> List)
    common_words = get_common_words(processed_q1, processed_q2)
    
    # 6. Vector Space Creation (List)
    vec1 = create_vector(freq_map1, vocabulary)
    vec2 = create_vector(freq_map2, vocabulary)
    
    # 7. Cosine Similarity Calculation
    cos_sim, dot_product, mag1, mag2 = calculate_cosine_similarity(vec1, vec2)
    
    # 8. Convert to Percentage (e.g. 0.875 -> 87.5)
    similarity_percentage = round(cos_sim * 100.0, 2)
    
    # 9. Apply Threshold
    threshold_pct = round(threshold * 100.0, 2)
    is_duplicate, status = get_duplicate_status(similarity_percentage, threshold_pct)
    
    return {
        "similarity": similarity_percentage,
        "is_duplicate": is_duplicate,
        "status": status,
        "threshold_used": threshold_pct,
        "common_words": common_words,
        "processed_question1": processed_q1,
        "processed_question2": processed_q2,
        # Extended details for Data Structure Lab Viva demonstration:
        "raw_tokens1": raw_tokens1,
        "raw_tokens2": raw_tokens2,
        "frequency_map1": freq_map1,
        "frequency_map2": freq_map2,
        "vocabulary": vocabulary,
        "vector1": vec1,
        "vector2": vec2,
        "dot_product": dot_product,
        "magnitude1": round(mag1, 4),
        "magnitude2": round(mag2, 4),
    }

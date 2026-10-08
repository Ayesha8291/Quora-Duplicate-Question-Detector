"""
Dataset Service
---------------
Provides utilities for reading and querying sample question pairs.
"""

import csv
import os
from typing import List
from app.models.schemas import SampleQuestionPair

# Resolve path to sample_questions.csv relative to this file or root
CSV_PATH = os.path.join(os.path.dirname(os.path.dirname(__file__)), "..", "data", "sample_questions.csv")


def load_sample_questions() -> List[SampleQuestionPair]:
    """Reads sample question pairs from CSV dataset."""
    samples: List[SampleQuestionPair] = []
    
    # Fallback to root dataset/ if backend/data/ is not found
    filepath = CSV_PATH
    if not os.path.exists(filepath):
        alt_path = os.path.join(os.path.dirname(os.path.dirname(os.path.dirname(__file__))), "dataset", "sample_questions.csv")
        if os.path.exists(alt_path):
            filepath = alt_path
        else:
            return samples
            
    try:
        with open(filepath, mode="r", encoding="utf-8") as f:
            reader = csv.DictReader(f)
            for row in reader:
                samples.append(
                    SampleQuestionPair(
                        id=int(row.get("id", 0)),
                        question1=row.get("question1", ""),
                        question2=row.get("question2", ""),
                        category=row.get("category", "Unspecified"),
                        description=row.get("description", "")
                    )
                )
    except Exception as e:
        print(f"Error loading sample questions CSV: {e}")
        
    return samples

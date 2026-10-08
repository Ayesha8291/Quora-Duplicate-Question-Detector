"""
Pydantic Schemas for API Request and Response Serialization
"""

from typing import Dict, List, Optional
from pydantic import BaseModel, Field


class DuplicateCheckRequest(BaseModel):
    question1: str = Field(..., description="First question input string")
    question2: str = Field(..., description="Second question input string")
    threshold: Optional[float] = Field(
        0.70,
        ge=0.0,
        le=1.0,
        description="Configurable duplicate threshold between 0.0 and 1.0 (default 0.70)"
    )


class DuplicateCheckResponse(BaseModel):
    similarity: float = Field(..., description="Similarity score as percentage (0-100%)")
    is_duplicate: bool = Field(..., description="Whether similarity meets or exceeds threshold")
    status: str = Field(..., description="Duplicate / Highly Similar, Possibly Similar, or Not Duplicate")
    threshold_used: float = Field(..., description="Threshold percentage applied")
    common_words: List[str] = Field(..., description="Alphabetically sorted common words")
    processed_question1: List[str] = Field(..., description="Tokens after punctuation cleaning & stopword removal")
    processed_question2: List[str] = Field(..., description="Tokens after punctuation cleaning & stopword removal")
    
    # Extended Viva / DS Inspection Details
    raw_tokens1: Optional[List[str]] = Field(None, description="Raw tokens before stopword removal")
    raw_tokens2: Optional[List[str]] = Field(None, description="Raw tokens before stopword removal")
    frequency_map1: Optional[Dict[str, int]] = Field(None, description="Word frequency HashMap for Q1")
    frequency_map2: Optional[Dict[str, int]] = Field(None, description="Word frequency HashMap for Q2")
    vocabulary: Optional[List[str]] = Field(None, description="Combined unique vocabulary sorted array")
    vector1: Optional[List[int]] = Field(None, description="Frequency vector for Q1")
    vector2: Optional[List[int]] = Field(None, description="Frequency vector for Q2")
    dot_product: Optional[int] = Field(None, description="Vector dot product (A · B)")
    magnitude1: Optional[float] = Field(None, description="Vector magnitude ||A||")
    magnitude2: Optional[float] = Field(None, description="Vector magnitude ||B||")


class SampleQuestionPair(BaseModel):
    id: int
    question1: str
    question2: str
    category: str
    description: str


class HealthResponse(BaseModel):
    status: str = "ok"
    version: str = "1.0.0"
    application: str = "Quora Duplicate Question Detector"

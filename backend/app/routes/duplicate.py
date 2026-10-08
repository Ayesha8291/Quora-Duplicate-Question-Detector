"""
Duplicate Question Detection and Samples Routes
"""

from typing import List
from fastapi import APIRouter, HTTPException, status
from app.algorithms.similarity import check_duplicate
from app.models.schemas import (
    DuplicateCheckRequest,
    DuplicateCheckResponse,
    SampleQuestionPair,
)
from app.services.dataset_service import load_sample_questions

router = APIRouter(tags=["Duplicate Detection"])


@router.post(
    "/check-duplicate",
    response_model=DuplicateCheckResponse,
    status_code=status.HTTP_200_OK,
    summary="Check similarity between two Quora questions"
)
def check_duplicate_questions(payload: DuplicateCheckRequest):
    """
    Analyzes two questions using the manual Cosine Similarity pipeline
    and returns similarity percentage, duplicate status, common words,
    and foundational data structure states.
    """
    q1 = payload.question1.strip() if payload.question1 else ""
    q2 = payload.question2.strip() if payload.question2 else ""
    
    # Requirement 15: Error handling for empty questions
    if not q1:
        raise HTTPException(
            status_code=status.HTTP_400_BAD_REQUEST,
            detail="Please enter Question 1."
        )
    if not q2:
        raise HTTPException(
            status_code=status.HTTP_400_BAD_REQUEST,
            detail="Please enter Question 2."
        )
        
    threshold = payload.threshold if payload.threshold is not None else 0.70
    
    try:
        result = check_duplicate(q1, q2, threshold=threshold)
        return DuplicateCheckResponse(**result)
    except Exception as e:
        raise HTTPException(
            status_code=status.HTTP_500_INTERNAL_SERVER_ERROR,
            detail=f"An error occurred while calculating similarity: {str(e)}"
        )


@router.get(
    "/samples",
    response_model=List[SampleQuestionPair],
    status_code=status.HTTP_200_OK,
    summary="Fetch curated sample question pairs"
)
def get_sample_questions():
    """Returns sample question pairs for demonstration and testing."""
    return load_sample_questions()

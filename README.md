# Detecting Duplicate Quora Questions
### Application: Quora Duplicate Question Detector
**A 2-Member College Mini Project for Data Structure Lab**

![Project Banner](https://img.shields.io/badge/Course-Data_Structures_Lab-red.svg)
![Status](https://img.shields.io/badge/Status-Fully_Functional-success.svg)
![Python](https://img.shields.io/badge/Python-3.12-blue.svg)
![FastAPI](https://img.shields.io/badge/Backend-FastAPI-009688.svg)
![React](https://img.shields.io/badge/Frontend-React_18_+_Vite-61DAFB.svg)
![Tailwind](https://img.shields.io/badge/Styling-Tailwind_CSS-38B2AC.svg)
![Dependencies](https://img.shields.io/badge/External_AI_APIs-Zero_(100%25_Local)-brightgreen.svg)

---

## 1. Abstract
Online community question-and-answer platforms such as Quora, Stack Overflow, and Reddit encounter high volumes of redundant and semantically overlapping user queries. Identifying duplicate questions consolidates community answers, reduces search latency, and enhances user satisfaction. This project implements an educational, transparent, and responsive web application titled **Quora Duplicate Question Detector**. Rather than delegating logic to black-box deep learning libraries or commercial third-party AI APIs, the entire pipeline is implemented manually using foundational Data Structures (**Array/List, HashMap/Dictionary, Set, String, and Sorting**) combined with **Cosine Similarity** vector mathematics. The application features a Python FastAPI backend and a modern React + Vite + Tailwind CSS frontend designed for academic viva evaluation.

---

## 2. Introduction & Problem Statement
On community QA websites, multiple users frequently post the same question phrased with different wording, punctuation, or grammatical filler. For example:
- **Question 1:** *"How can I learn Python?"*
- **Question 2:** *"What is the best way to learn Python?"*

Although these questions are lexically phrased differently, they express identical user intent. Without duplicate detection, answers become fragmented across multiple threads.

The core challenge for a **Data Structure Lab** mini project is to build an explainable software solution that:
1. Cleans and breaks down unstructured text into fundamental computer science data structures.
2. Formulates sentences into mathematical vectors without relying on black-box external AI libraries.
3. Quantifies similarity using linear algebra principles.
4. Exposes an interactive "Viva Inspection Panel" allowing students and examiners to inspect each data structure in real time.

---

## 3. Project Objectives
- Build a full-stack, local web application capable of detecting duplicate question pairs.
- Demonstrate explicit usage and time/space complexity benefits of core Data Structures (**String, List, HashMap, Set, and Sorting**).
- Implement a manual **Cosine Similarity** algorithm in a dedicated Python module (`backend/app/algorithms/similarity.py`).
- Implement robust input validation (empty fields, short questions, and API failure fallbacks).
- Supply an interactive dataset viewer with 15 pre-tested benchmark question pairs.
- Provide comprehensive viva preparation materials and clear team contribution demarcation.

---

## 4. Key Features
1. **Interactive Question Detector:** Textareas with character counters, quick test case buttons, swap, clear, and adjustable threshold controls.
2. **Prominent Academic Result Card:** Real-time similarity score gauge (e.g., `87%`), color-coded status badge, and sorted common word badges.
3. **Data Structure Lab Viva Inspector:** An expandable live dashboard visualizing:
   - Token sequences (**List**)
   - Word frequency maps (**HashMap / Dictionary**)
   - Vocabulary union and common words intersection (**Set**)
   - Vector space coordinates (**Array / Vectors**)
   - Mathematical Dot Product and Euclidean Norm breakdowns
4. **Interactive Flowchart Pipeline:** Step-by-step visual diagram illustrating the transition from raw input strings to cosine similarity output.
5. **Sample Dataset & Test Suite:** 15 curated benchmark pairs categorizing questions into *Duplicate / Highly Similar*, *Possibly Similar*, and *Not Duplicate*, with one-click "Test Live" capability.
6. **Academic Documentation & Viva Q&A:** Embedded technical report covering data structures, algorithmic complexities, limitations, and model viva answers.

---

## 5. Data Structures Used

| Data Structure | Implementation | Role in This Project | Practical Lab Justification |
| :--- | :--- | :--- | :--- |
| **String** | Python `str`, Regex `re.sub` | Preprocessing: lowercasing, punctuation removal | Strings store natural language inputs. Character-by-character parsing strips noise symbols (`?`, `!`, `.`, `,`). |
| **Array / List** | Python `list[str]`, `list[int]` | Tokenization, filtered token storage, frequency vectors | Provides sequential storage of words in order and indexed $O(1)$ random coordinate access for vector math. |
| **HashMap / Dict** | Python `dict[str, int]` | Word frequency counting (Term Frequency) | Key-value mapping (`{word: count}`) with $O(1)$ average insertion and lookup, avoiding $O(N^2)$ brute-force counting. |
| **Set** | Python `set[str]` | Stopword elimination, Vocabulary Union, Common Words | Hash-set provides $O(1)$ membership testing for stopwords, $O(N_1+N_2)$ union for vocabulary, and intersection for common words. |
| **Sorting** | Python Timsort `sorted()` | Vocabulary indexing & common words display | Aligns unique words alphabetically in $O(V \log V)$ time so Vector A and Vector B share identical coordinate indexes. |

---

## 6. Algorithmic Pipeline & Cosine Similarity

### 6.1 Algorithmic Pipeline
```
Question 1 ─────┐
                ↓
          Text Cleaning (String)
                ↓
           Tokenization (List)
                ↓
        Stop Word Removal (Set O(1))
                ↓
     HashMap (Freq) + Set (Vocab)
                ↓
      Vector Creation (Array A & B)
                ↓
  Cosine Similarity: (A · B) / (|A| × |B|)
                ↓
         Similarity Score %
                ↓
     Threshold Decision (≥70% Duplicate)
                ↑
Question 2 ─────┘
```

### 6.2 Mathematical Derivation
Given two questions transformed into frequency vectors $A$ and $B$ across a shared vocabulary $V$:

$$\text{Cosine Similarity } \cos(\theta) = \frac{A \cdot B}{\|A\| \times \|B\|}$$

Where:
1. **Dot Product ($A \cdot B$):**
   $$A \cdot B = \sum_{i=1}^{|V|} A_i \times B_i$$
2. **Euclidean Magnitude of Vector A ($\|A\|$):**
   $$\|A\| = \sqrt{\sum_{i=1}^{|V|} A_i^2}$$
3. **Euclidean Magnitude of Vector B ($\|B\|$):**
   $$\|B\| = \sqrt{\sum_{i=1}^{|V|} B_i^2}$$
4. **Percentage Score:**
   $$\text{Score (\%)} = \cos(\theta) \times 100$$

### 6.3 Configurable Threshold Tiers
- **70% to 100%:** `Duplicate / Highly Similar`
- **40% to 69%:** `Possibly Similar`
- **0% to 39%:** `Not Duplicate`

---

## 7. Project Architecture & Directory Structure

```
Quora-Duplicate-Question-Detector/
├── backend/
│   ├── app/
│   │   ├── algorithms/
│   │   │   ├── __init__.py
│   │   │   └── similarity.py       # Manual Cosine Similarity & DS operations
│   │   ├── models/
│   │   │   ├── __init__.py
│   │   │   └── schemas.py          # Pydantic schemas (Request / Response)
│   │   ├── routes/
│   │   │   ├── __init__.py
│   │   │   ├── duplicate.py        # /api/check-duplicate & /api/samples
│   │   │   └── health.py           # /api/health
│   │   ├── services/
│   │   │   ├── __init__.py
│   │   │   └── dataset_service.py  # CSV dataset reader
│   │   ├── utils/
│   │   │   ├── __init__.py
│   │   │   └── stopwords.py        # Stopwords Set collection
│   │   ├── __init__.py
│   │   └── main.py                 # FastAPI application & CORS config
│   ├── data/
│   │   └── sample_questions.csv    # Backend benchmark question pairs
│   ├── tests/
│   │   ├── __init__.py
│   │   └── test_similarity.py      # Automated pytest suite (16 tests)
│   └── requirements.txt            # Backend Python dependencies
│
├── frontend/
│   ├── public/
│   │   └── favicon.svg             # Application favicon
│   ├── src/
│   │   ├── components/
│   │   │   ├── Navbar.jsx          # Header with live status badge
│   │   │   ├── Footer.jsx          # Academic footer
│   │   │   ├── DataStructureBreakdown.jsx # Viva inspection panel
│   │   │   └── FlowDiagram.jsx     # Visual pipeline flowchart
│   │   ├── pages/
│   │   │   ├── Home.jsx            # Landing page
│   │   │   ├── Detector.jsx        # Main detector interface
│   │   │   ├── HowItWorks.jsx      # Technical pipeline documentation
│   │   │   ├── Dataset.jsx         # Benchmark dataset explorer
│   │   │   └── About.jsx           # Academic viva guide & team matrix
│   │   ├── services/
│   │   │   └── api.js              # Fetch client with error handling
│   │   ├── App.jsx                 # App state & tab routing
│   │   ├── index.css               # Tailwind CSS imports
│   │   └── main.jsx                # React root mount
│   ├── index.html
│   ├── package.json
│   ├── postcss.config.js
│   ├── tailwind.config.js
│   └── vite.config.js              # Vite server & API proxy config
│
├── dataset/
│   └── sample_questions.csv        # Standalone CSV dataset
├── docs/
│   └── viva_preparation_guide.md   # Data Structure Lab Viva Preparation Guide
├── README.md                       # Comprehensive Project Documentation
└── .gitignore
```

---

## 8. Backend API Documentation

### 8.1 Health Check
- **Endpoint:** `GET /api/health`
- **Description:** Verifies backend availability.
- **Sample Response:**
  ```json
  {
    "status": "ok",
    "version": "1.0.0",
    "application": "Quora Duplicate Question Detector"
  }
  ```

### 8.2 Check Duplicate Questions
- **Endpoint:** `POST /api/check-duplicate`
- **Request Body:**
  ```json
  {
    "question1": "How can I learn Python?",
    "question2": "What is the best way to learn Python?",
    "threshold": 0.70
  }
  ```
- **Sample Response:**
  ```json
  {
    "similarity": 87.5,
    "is_duplicate": true,
    "status": "Duplicate / Highly Similar",
    "threshold_used": 70.0,
    "common_words": ["learn", "python"],
    "processed_question1": ["learn", "python"],
    "processed_question2": ["best", "way", "learn", "python"],
    "frequency_map1": {"learn": 1, "python": 1},
    "frequency_map2": {"best": 1, "way": 1, "learn": 1, "python": 1},
    "vocabulary": ["best", "learn", "python", "way"],
    "vector1": [0, 1, 1, 0],
    "vector2": [1, 1, 1, 1],
    "dot_product": 2,
    "magnitude1": 1.4142,
    "magnitude2": 2.0
  }
  ```

### 8.3 Get Benchmark Samples
- **Endpoint:** `GET /api/samples`
- **Description:** Returns the list of curated sample question pairs.

---

## 9. Installation & Execution Guide

### Prerequisites
- **Python 3.10+** (Tested on Python 3.12)
- **Node.js 18+** & **npm** (Tested on Node v22, npm 10.9)
- **Windows PowerShell**

---

### Running the Backend

Open a PowerShell terminal in the project root:

```powershell
# 1. Navigate to backend directory
cd backend

# 2. (Optional) Create and activate virtual environment
python -m venv venv
.\venv\Scripts\Activate.ps1

# 3. Install required dependencies
pip install -r requirements.txt

# 4. Start the FastAPI server
python -m uvicorn app.main:app --reload --port 8000
```

- Backend API: `http://127.0.0.1:8000`
- Interactive Swagger UI: `http://127.0.0.1:8000/docs`
- Health Endpoint: `http://127.0.0.1:8000/api/health`

---

### Running the Frontend

Open a second PowerShell terminal in the project root:

```powershell
# 1. Navigate to frontend directory
cd frontend

# 2. Install npm dependencies
npm install

# 3. Launch Vite development server
npm run dev
```

- Frontend Application: `http://localhost:5173`

---

## 10. Automated Testing
The project includes a comprehensive automated test suite in `backend/tests/test_similarity.py` covering individual data structures, edge cases, and API endpoints.

To run tests:
```powershell
cd backend
python -m pytest tests/test_similarity.py -v
```

### Verified Test Results
```text
============================= test session starts =============================
collected 16 items

tests/test_similarity.py::test_clean_text PASSED                         [  6%]
tests/test_similarity.py::test_tokenize PASSED                           [ 12%]
tests/test_similarity.py::test_remove_stopwords PASSED                   [ 18%]
tests/test_similarity.py::test_build_frequency_map PASSED                [ 25%]
tests/test_similarity.py::test_build_vocabulary_and_vector PASSED        [ 31%]
tests/test_similarity.py::test_cosine_similarity_calculation PASSED      [ 37%]
tests/test_similarity.py::test_get_common_words PASSED                   [ 43%]
tests/test_similarity.py::test_test_case_1_high_similarity PASSED        [ 50%]
tests/test_similarity.py::test_test_case_2_unrelated PASSED              [ 56%]
tests/test_similarity.py::test_test_case_3_moderate_similarity PASSED    [ 62%]
tests/test_similarity.py::test_exact_duplicates PASSED                   [ 68%]
tests/test_similarity.py::test_health_endpoint PASSED                    [ 75%]
tests/test_similarity.py::test_api_check_duplicate_success PASSED        [ 81%]
tests/test_similarity.py::test_api_check_duplicate_empty_q1 PASSED       [ 87%]
tests/test_similarity.py::test_api_check_duplicate_empty_q2 PASSED       [ 93%]
tests/test_similarity.py::test_api_samples_endpoint PASSED               [100%]

======================= 16 passed, 2 warnings in 1.80s ========================
```

---

## 11. Sample Test Cases

| Case | Question 1 | Question 2 | Expected Category | Similarity Score | Common Words |
| :--- | :--- | :--- | :--- | :--- | :--- |
| **Test 1** | *How can I learn Python?* | *What is the best way to learn Python?* | Duplicate / Highly Similar | **87.5%** | `learn`, `python` |
| **Test 2** | *How can I improve my programming skills?* | *What are the best ways to improve coding skills?* | Possibly Similar | **51.6%** | `improve`, `skills` |
| **Test 3** | *How do I cook rice?* | *What is the capital of India?* | Not Duplicate | **0.0%** | None |

---

## 12. Limitations & Academic Integrity
1. **Lexical vs. Semantic:** The algorithm measures textual word token overlap. It cannot capture synonyms without an external synonym knowledge base (e.g., *"physician"* vs *"doctor"* produces 0% overlap).
2. **Word Order Invariance:** Because Bag-of-Words vectors disregard token ordering, queries like *"Is Python better than Java?"* and *"Is Java better than Python?"* produce identical similarity scores despite opposite intent.
3. **Heuristic Duplicate Threshold:** The 70% cutoff is a project-defined heuristic rather than a universal standard.
4. **Academic Integrity:** We explicitly state that this application is designed to demonstrate foundational Data Structures and vector calculations, rather than serving as an enterprise NLP engine.

---

## 13. Future Scope
- **TF-IDF (Term Frequency - Inverse Document Frequency):** Weight rare words higher than common domain words.
- **Dense Word Vectors (Word2Vec / GloVe):** Map semantic synonyms into neighboring coordinate spaces.
- **Transformer Embeddings (BERT / Sentence-BERT):** Context-aware deep sentence embeddings.
- **Scalable Indexing:** Utilize Trie or Inverted Index trees for sub-millisecond search across thousands of questions.

---

## 14. 2-Member Team Contribution

| Team Member | Official Role | Key Contributions & Deliverables |
| :--- | :--- | :--- |
| **Member 1** | **Full-Stack & Algorithms Lead** | • Full software implementation (Frontend + Backend)<br>• Data structures implementation (List, HashMap, Set, String, Sorting)<br>• Manual Cosine Similarity mathematical algorithm<br>• FastAPI REST API endpoints & CORS setup<br>• React + Vite + Tailwind CSS integration<br>• Automated test suite (`pytest`) |
| **Member 2** | **Dataset, Testing & Documentation Lead** | • Benchmark dataset curation (`sample_questions.csv`)<br>• Test case design (duplicate, similar, distinct pairs)<br>• Comprehensive documentation & README preparation<br>• Viva preparation guide (`docs/viva_preparation_guide.md`)<br>• Presentation slide deck (PPT) preparation<br>• UI review & presentation support |

---

## 15. Data Structure Lab Viva Questions & Answers

### Q1. Why is HashMap / Dictionary used?
> **Answer:**
> HashMap / Dictionary stores each word as a key and its frequency as a value (`{"python": 2, "learn": 1}`). It provides $O(1)$ average time complexity for insertions and lookups, allowing efficient construction of term frequency vectors.

### Q2. Why is Set used?
> **Answer:**
> Set stores unique elements and provides $O(1)$ average membership testing for stop word removal. It is also used to compute the Set Union for the combined vocabulary and Set Intersection for identifying common words between two questions.

### Q3. Why is List / Array used?
> **Answer:**
> List maintains the sequential tokens extracted after text preprocessing and stores the numerical coordinate vectors whose indexes correspond to the sorted vocabulary.

### Q4. What is Cosine Similarity?
> **Answer:**
> Cosine Similarity measures the cosine of the angle between two vectors:
> $$\text{Cosine Similarity} = \frac{A \cdot B}{\|A\| \times \|B\|}$$
> It evaluates directional alignment rather than Euclidean magnitude, making it invariant to sentence length.

### Q5. What is the purpose of Tokenization?
> **Answer:**
> Tokenization splits a cleaned continuous sentence string into individual word tokens for downstream stop word filtering and frequency counting.

### Q6. What is the Duplicate Threshold?
> **Answer:**
> It is a configurable similarity threshold (default: 70% or 0.70) above which the system classifies two questions as duplicate/similar.

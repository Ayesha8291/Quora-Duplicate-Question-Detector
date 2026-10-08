# Data Structure Lab Viva Preparation Guide
## Project: Detecting Duplicate Quora Questions

This guide is prepared to help both project members prepare for and excel in their **Data Structure Lab Viva Examination**.

---

## 1. Core Data Structures: Quick Reference Table

| Data Structure | Role in This Project | Concrete Implementation | Time Complexity | Space Complexity |
| :--- | :--- | :--- | :--- | :--- |
| **String** | Input text storage, lowercasing, punctuation stripping | Python `str`, Regex `re.sub` | $O(L)$ where $L$ = text length | $O(L)$ |
| **Array / List** | Sequential token storage, vector coordinate storage | Python `list[str]`, `list[int]` | Append: $O(1)$<br>Index Access: $O(1)$<br>Iteration: $O(N)$ | $O(N)$ |
| **HashMap / Dict** | Word-frequency counting (Term frequency map) | Python `dict[str, int]` | Insert: $O(1)$ avg<br>Lookup: $O(1)$ avg<br>Worst-case: $O(K)$ | $O(U)$ where $U$ = unique words |
| **Set** | Stopword filtering, Vocabulary Union, Common Words Intersection | Python `set[str]` | Membership Test: $O(1)$ avg<br>Union: $O(N_1 + N_2)$<br>Intersection: $O(\min(N_1, N_2))$ | $O(S)$ where $S$ = unique tokens |
| **Sorting** | Deterministic alphabetical ordering for vocabulary & vectors | Python Timsort `sorted()` | $O(V \log V)$ where $V$ = vocabulary size | $O(V)$ |

---

## 2. Top 10 Lab Viva Questions & Model Answers

### Q1. Why is HashMap / Dictionary used instead of searching a List for word frequencies?
> **Answer:**
> A List requires linear search ($O(N)$) to check if a word already exists every time a token is processed, leading to an overall frequency counting complexity of $O(N^2)$. A HashMap computes a hash of the word key, providing $O(1)$ average-time lookup and insertion, reducing the entire frequency counting step to $O(N)$.

### Q2. Why is Set used for stopword removal instead of a List?
> **Answer:**
> Checking whether a token is a stop word in a List of size $S$ requires $O(S)$ comparisons per token. By storing stopwords in a Set (hash table), membership testing is performed in $O(1)$ average time. For $N$ tokens, this reduces filtering time from $O(N \times S)$ to $O(N)$.

### Q3. What is Cosine Similarity and how does it differ from Euclidean Distance?
> **Answer:**
> Cosine Similarity measures the **cosine of the angle** between two multi-dimensional vectors:
> $$\text{Cosine Similarity} = \frac{A \cdot B}{\|A\| \times \|B\|} = \frac{\sum_{i=1}^V A_i B_i}{\sqrt{\sum_{i=1}^V A_i^2} \times \sqrt{\sum_{i=1}^V B_i^2}}$$
> Euclidean distance measures the straight-line coordinate distance, making it sensitive to document length (a long question and a short question on the exact same topic would yield a high Euclidean distance, incorrectly appearing dissimilar). Cosine Similarity normalizes vector magnitudes, evaluating purely directional alignment regardless of sentence length.

### Q4. What is the role of Sorting in this project?
> **Answer:**
> When two questions are merged to form the shared vocabulary Set, a Set does not guarantee consistent iteration ordering. We sort the vocabulary list alphabetically ($O(V \log V)$) so that Vector A and Vector B share identical coordinate alignments ($i$-th index in Vector A corresponds to the exact same word as the $i$-th index in Vector B).

### Q5. What is Tokenization?
> **Answer:**
> Tokenization is the process of splitting continuous natural language character strings into discrete units called "tokens" (usually words) based on whitespace and word boundaries.

### Q6. How is the Duplicate Threshold defined?
> **Answer:**
> The threshold is a project-defined heuristic cutoff (default 70% or 0.70). If the calculated cosine similarity percentage is $\ge 70\%$, questions are flagged as *"Duplicate / Highly Similar"*. Between 40% and 69%, they are *"Possibly Similar"*, and below 40%, *"Not Duplicate"*.

### Q7. What happens if two questions contain identical words but in different orders?
> **Answer:**
> Because this is a Bag-of-Words vector model, word frequencies and Set memberships are order-invariant. For example, "Is Python better than Java?" and "Is Java better than Python?" yield high cosine similarity. This is an acknowledged academic limitation of lexical models compared to deep sequence models like Transformers.

### Q8. What happens if questions have zero common words after stopword removal?
> **Answer:**
> Their Dot Product $A \cdot B$ evaluates to $0$. The cosine similarity calculates as $0 / (\|A\| \times \|B\|) = 0.0$ ($0\%$), correctly classifying them as *"Not Duplicate"*.

### Q9. How do you handle division by zero in Cosine Similarity?
> **Answer:**
> If an input is empty or consists purely of removed stop words, its vector magnitude $\sqrt{\sum A_i^2}$ will be $0$. Our implementation explicitly checks `if magnitude1 == 0.0 or magnitude2 == 0.0` and immediately returns $0.0$ without attempting division.

### Q10. What are the space and time complexities of the complete pipeline?
> **Answer:**
> - **Time Complexity:** $O(L_1 + L_2 + V \log V)$, where $L_1, L_2$ are sentence character lengths and $V$ is vocabulary size. In practice, since question lengths are short ($< 50$ tokens), execution takes under $5$ milliseconds.
> - **Space Complexity:** $O(N_1 + N_2 + V)$ auxiliary space to store token lists, frequency maps, and numerical vectors.

---

## 3. Team Member Division for Presentation

- **Member 1 (Technical & System Lead):**
  - Demonstrates the live application in the browser.
  - Explains the code in `backend/app/algorithms/similarity.py`.
  - Explains the vector calculations and mathematical dot products.
- **Member 2 (Dataset, Testing & Viva Lead):**
  - Explains the test cases from `dataset/sample_questions.csv`.
  - Answers viva questions on Data Structures (HashMap, Set, List) and time complexities.
  - Discusses project limitations, future scope, and documentation.

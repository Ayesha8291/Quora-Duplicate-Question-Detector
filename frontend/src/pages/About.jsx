import React, { useState } from 'react';
import { 
  BookOpen, 
  Code2, 
  Layers, 
  Cpu, 
  Users, 
  AlertTriangle, 
  Sparkles, 
  HelpCircle, 
  ChevronDown, 
  ChevronUp, 
  CheckCircle2,
  ShieldCheck
} from 'lucide-react';

export default function About() {
  const [openFaq, setOpenFaq] = useState(0);

  const technicalFaqs = [
    {
      q: "How does the system store and count word occurrences?",
      a: "The system uses an in-memory hash-map (associative dictionary) for term frequency mapping. This maps each unique word token to its occurrence count with average O(1) time complexity for insertions and lookups, allowing rapid vector construction."
    },
    {
      q: "How are stop words and common vocabulary filtered?",
      a: "A hash set data structure provides O(1) membership lookups to discard non-informative words ('what', 'is', 'how') and calculates the union of unique terms across both questions to define the comparison vector space."
    },
    {
      q: "Why is Cosine Similarity used instead of Euclidean Distance?",
      a: "Cosine Similarity calculates the cosine of the angle between two multi-dimensional term vectors: (A · B) / (||A|| × ||B||). Because it normalizes by vector magnitudes, it evaluates topical orientation rather than sentence length, preventing concise and verbose questions from being falsely categorized as different."
    },
    {
      q: "What is the purpose of text normalization and tokenization?",
      a: "Normalization converts strings to lowercase and strips non-alphanumeric punctuation marks, preventing identical words with differing capitalization or trailing punctuation (e.g., 'Python?' vs 'python') from being treated as separate words."
    },
    {
      q: "How is the duplicate threshold calibrated?",
      a: "The default duplicate cutoff is set to 70% (0.70). Scores between 70%–100% are classified as 'Duplicate / Highly Similar', 40%–69% as 'Possibly Similar', and below 40% as 'Not Duplicate'. This threshold is configurable in the application settings."
    },
    {
      q: "What are the computational time and space complexities?",
      a: "Time Complexity is O(N + M + V log V), where N and M are the token counts of Question 1 and 2, and V is the combined unique vocabulary size. Space Complexity is O(N + M + V) to store token arrays and frequency maps. In practice, responses execute in under 5 milliseconds."
    }
  ];

  return (
    <div className="py-6 max-w-5xl mx-auto space-y-12">
      {/* Header */}
      <div>
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-red-50 text-red-700 text-xs font-semibold uppercase tracking-wider mb-2 border border-red-200/60">
          <BookOpen className="w-3.5 h-3.5" />
          Technical Specifications
        </div>
        <h2 className="text-3xl font-extrabold text-slate-900 tracking-tight">
          System Overview & Specifications
        </h2>
        <p className="text-slate-600 mt-2 text-sm sm:text-base leading-relaxed">
          Detailed technical documentation covering the architectural design, algorithmic foundation, system parameters, and engineering team.
        </p>
      </div>

      {/* Product Overview */}
      <section className="bg-white border border-slate-200 rounded-3xl p-6 sm:p-8 shadow-xs space-y-4">
        <h3 className="text-xl font-bold text-slate-900 flex items-center gap-2">
          <CheckCircle2 className="w-5 h-5 text-red-600" />
          1. Product Overview
        </h3>
        <p className="text-sm text-slate-700 leading-relaxed">
          The <strong>Quora Duplicate Question Detector</strong> is an automated text similarity comparison engine engineered to identify duplicate and near-duplicate inquiries across online community QA forums. By analyzing lexical overlap and computing geometric vector alignment, the system delivers instantaneous duplicate classifications without relying on remote third-party AI APIs or black-box neural networks.
        </p>
      </section>

      {/* Core Engineering Components */}
      <section className="bg-white border border-slate-200 rounded-3xl p-6 sm:p-8 shadow-xs space-y-6">
        <h3 className="text-xl font-bold text-slate-900 flex items-center gap-2">
          <Layers className="w-5 h-5 text-slate-700" />
          2. Core Engineering Components
        </h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="p-5 rounded-2xl border border-slate-200 bg-slate-50/60">
            <h4 className="font-bold text-slate-900 text-sm mb-1.5">
              Sequential Tokenizer & Coordinate Vector Arrays
            </h4>
            <p className="text-xs text-slate-600 leading-relaxed">
              Splits preprocessed input strings into structured token sequences and formats numerical coordinates into array vectors for O(1) indexed access during linear algebra evaluations.
            </p>
          </div>

          <div className="p-5 rounded-2xl border border-slate-200 bg-slate-50/60">
            <h4 className="font-bold text-slate-900 text-sm mb-1.5">
              High-Speed Term Frequency Hash Mapping
            </h4>
            <p className="text-xs text-slate-600 leading-relaxed">
              Maintains an associative hash table linking each distinct token to its frequency count, ensuring O(1) average lookup performance during vector creation.
            </p>
          </div>

          <div className="p-5 rounded-2xl border border-slate-200 bg-slate-50/60">
            <h4 className="font-bold text-slate-900 text-sm mb-1.5">
              Hash Set Vocabulary Unions & Intersections
            </h4>
            <p className="text-xs text-slate-600 leading-relaxed">
              Performs rapid set membership testing for stop word elimination, computes the mathematical union to define the shared vector space, and derives matching common terms.
            </p>
          </div>

          <div className="p-5 rounded-2xl border border-slate-200 bg-slate-50/60">
            <h4 className="font-bold text-slate-900 text-sm mb-1.5">
              Deterministic Vocabulary Sorting
            </h4>
            <p className="text-xs text-slate-600 leading-relaxed">
              Orders unique vocabulary terms alphabetically in O(V log V) time, ensuring coordinate dimensions in Vector A and Vector B are uniformly aligned across comparisons.
            </p>
          </div>
        </div>
      </section>

      {/* Tech Stack */}
      <section className="bg-white border border-slate-200 rounded-3xl p-6 sm:p-8 shadow-xs space-y-4">
        <h3 className="text-xl font-bold text-slate-900 flex items-center gap-2">
          <Cpu className="w-5 h-5 text-slate-700" />
          3. Technology Stack
        </h3>
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 text-center text-xs">
          <div className="p-4 bg-slate-50 rounded-2xl border border-slate-200">
            <span className="font-bold text-slate-900 block text-sm mb-0.5">Frontend Client</span>
            <span className="text-slate-600 font-medium">React 18 & Vite</span>
          </div>
          <div className="p-4 bg-slate-50 rounded-2xl border border-slate-200">
            <span className="font-bold text-slate-900 block text-sm mb-0.5">Interface Design</span>
            <span className="text-slate-600 font-medium">Tailwind CSS</span>
          </div>
          <div className="p-4 bg-slate-50 rounded-2xl border border-slate-200">
            <span className="font-bold text-slate-900 block text-sm mb-0.5">Application Server</span>
            <span className="text-slate-600 font-medium">FastAPI & Uvicorn</span>
          </div>
          <div className="p-4 bg-slate-50 rounded-2xl border border-slate-200">
            <span className="font-bold text-slate-900 block text-sm mb-0.5">Communication</span>
            <span className="text-slate-600 font-medium">RESTful JSON / CORS</span>
          </div>
        </div>
      </section>

      {/* Boundaries & Roadmap */}
      <section className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="bg-white border border-slate-200 rounded-3xl p-6 shadow-xs space-y-3">
          <h3 className="text-base font-bold text-slate-900 flex items-center gap-2">
            <AlertTriangle className="w-5 h-5 text-amber-600" />
            System Scope & Boundaries
          </h3>
          <ul className="text-xs text-slate-600 space-y-2 list-disc list-inside leading-relaxed">
            <li><strong>Lexical Similarity Focus:</strong> Evaluates word token overlap; does not detect semantic synonyms without a synonym thesaurus.</li>
            <li><strong>Word Order Invariance:</strong> As a Bag-of-Words model, reversed questions share high similarity regardless of opposing perspectives.</li>
            <li><strong>Calibrated Threshold:</strong> The 70% duplicate threshold is a project-defined heuristic that can be adjusted in the UI.</li>
          </ul>
        </div>

        <div className="bg-white border border-slate-200 rounded-3xl p-6 shadow-xs space-y-3">
          <h3 className="text-base font-bold text-slate-900 flex items-center gap-2">
            <Sparkles className="w-5 h-5 text-emerald-600" />
            Future Product Roadmap
          </h3>
          <ul className="text-xs text-slate-600 space-y-2 list-disc list-inside leading-relaxed">
            <li><strong>TF-IDF Weighting:</strong> Down-weighting generic terms that appear across large corpora.</li>
            <li><strong>Continuous Word Embeddings:</strong> Integrating dense semantic vector representations (Word2Vec / GloVe).</li>
            <li><strong>Contextual Transformer Models:</strong> Incorporating Sentence-BERT for deep grammatical and semantic context.</li>
            <li><strong>Multilingual Support:</strong> Extending tokenization and stop word removal to international languages.</li>
          </ul>
        </div>
      </section>

      {/* Engineering Team */}
      <section className="bg-white border border-slate-200 rounded-3xl p-6 sm:p-8 shadow-xs space-y-6">
        <h3 className="text-xl font-bold text-slate-900 flex items-center gap-2">
          <Users className="w-5 h-5 text-slate-700" />
          4. Development Team & Responsibilities
        </h3>

        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs border-collapse">
            <thead>
              <tr className="bg-slate-50 border-b border-slate-200 text-slate-700">
                <th className="py-3 px-4 font-bold uppercase tracking-wider w-1/4">Team Member</th>
                <th className="py-3 px-4 font-bold uppercase tracking-wider w-1/4">Role</th>
                <th className="py-3 px-4 font-bold uppercase tracking-wider">Responsibilities & Deliverables</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              <tr className="hover:bg-slate-50/50">
                <td className="py-3.5 px-4 font-bold text-slate-900">Member 1</td>
                <td className="py-3.5 px-4 text-red-600 font-semibold">Full-Stack & Algorithms</td>
                <td className="py-3.5 px-4 text-slate-700 leading-relaxed">
                  Full-stack software development, implementation of Data Structures (List, HashMap, Set, String, Sorting), manual Cosine Similarity algorithm, FastAPI REST endpoints, React UI integration, and automated testing.
                </td>
              </tr>
              <tr className="hover:bg-slate-50/50">
                <td className="py-3.5 px-4 font-bold text-slate-900">Member 2</td>
                <td className="py-3.5 px-4 text-indigo-600 font-semibold">Dataset, Testing & Docs</td>
                <td className="py-3.5 px-4 text-slate-700 leading-relaxed">
                  Dataset curation (sample questions CSV), test case preparation (duplicate, similar, distinct pairs), comprehensive README & viva documentation, presentation slide deck (PPT) preparation, UI review, and presentation support.
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </section>

      {/* Technical FAQs */}
      <section className="bg-white border border-slate-200 rounded-3xl p-6 sm:p-8 shadow-xs space-y-6">
        <div>
          <h3 className="text-xl font-bold text-slate-900 flex items-center gap-2">
            <HelpCircle className="w-5 h-5 text-red-600" />
            5. Technical Frequently Asked Questions
          </h3>
          <p className="text-xs text-slate-500 mt-1">
            Common architectural and algorithmic inquiries regarding the similarity engine.
          </p>
        </div>

        <div className="space-y-3">
          {technicalFaqs.map((item, idx) => {
            const isOpen = openFaq === idx;
            return (
              <div
                key={idx}
                className="border border-slate-200 rounded-2xl overflow-hidden transition-all"
              >
                <button
                  onClick={() => setOpenFaq(isOpen ? -1 : idx)}
                  className="w-full flex items-center justify-between p-4 bg-slate-50 hover:bg-slate-100/70 text-left font-bold text-sm text-slate-800 transition-colors cursor-pointer"
                >
                  <span>{item.q}</span>
                  {isOpen ? (
                    <ChevronUp className="w-4 h-4 text-slate-500 shrink-0" />
                  ) : (
                    <ChevronDown className="w-4 h-4 text-slate-500 shrink-0" />
                  )}
                </button>
                {isOpen && (
                  <div className="p-4 bg-white border-t border-slate-100 text-xs sm:text-sm text-slate-700 leading-relaxed">
                    {item.a}
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </section>
    </div>
  );
}

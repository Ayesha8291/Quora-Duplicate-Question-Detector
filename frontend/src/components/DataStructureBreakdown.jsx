import React, { useState } from 'react';
import { 
  ChevronDown, 
  ChevronUp, 
  Hash, 
  Layers, 
  Binary, 
  Calculator, 
  Check, 
  SlidersHorizontal,
  Code
} from 'lucide-react';

export default function DataStructureBreakdown({ result }) {
  const [isOpen, setIsOpen] = useState(true);

  if (!result) return null;

  const {
    similarity,
    status,
    threshold_used,
    common_words = [],
    processed_question1 = [],
    processed_question2 = [],
    frequency_map1 = {},
    frequency_map2 = {},
    vocabulary = [],
    vector1 = [],
    vector2 = [],
    dot_product = 0,
    magnitude1 = 0,
    magnitude2 = 0,
  } = result;

  return (
    <div className="bg-white border border-slate-200 rounded-2xl shadow-sm overflow-hidden mt-8 transition-all">
      {/* Header bar */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="w-full flex items-center justify-between px-6 py-4 bg-slate-50 hover:bg-slate-100/80 border-b border-slate-200 transition-colors text-left"
      >
        <div className="flex items-center gap-3">
          <div className="w-9 h-9 rounded-xl bg-indigo-600 text-white flex items-center justify-center shadow-xs">
            <SlidersHorizontal className="w-5 h-5" />
          </div>
          <div>
            <h3 className="text-base font-bold text-slate-900">
              Data Structure Lab Viva Inspector
            </h3>
            <p className="text-xs text-slate-500">
              Interactive breakdown of Lists, HashMaps, Sets, and Vector calculations
            </p>
          </div>
        </div>
        <div className="flex items-center gap-2">
          <span className="text-xs font-semibold px-2.5 py-1 rounded-full bg-indigo-50 text-indigo-700 border border-indigo-200">
            Viva Demonstration Mode
          </span>
          {isOpen ? (
            <ChevronUp className="w-5 h-5 text-slate-500" />
          ) : (
            <ChevronDown className="w-5 h-5 text-slate-500" />
          )}
        </div>
      </button>

      {/* Content Body */}
      {isOpen && (
        <div className="p-6 space-y-6">
          {/* Section 1: Processed Tokens (List) */}
          <div>
            <div className="flex items-center justify-between mb-3">
              <h4 className="text-sm font-bold text-slate-800 flex items-center gap-2">
                <span className="w-6 h-6 rounded-md bg-blue-100 text-blue-700 text-xs font-mono font-bold flex items-center justify-center">
                  1
                </span>
                Array / List: Processed Question Tokens
              </h4>
              <span className="text-xs font-mono text-slate-500">
                Structure: <code className="text-blue-600 bg-blue-50 px-1.5 py-0.5 rounded">List[str]</code>
              </span>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="bg-slate-50 rounded-xl p-4 border border-slate-200">
                <span className="text-xs font-semibold text-slate-500 uppercase tracking-wider block mb-2">
                  Question 1 Filtered Tokens ({processed_question1.length})
                </span>
                <div className="flex flex-wrap gap-1.5 min-h-[36px] items-center">
                  {processed_question1.length > 0 ? (
                    processed_question1.map((token, idx) => (
                      <span
                        key={idx}
                        className="px-2.5 py-1 text-xs font-mono bg-white border border-slate-300 text-slate-800 rounded-md shadow-2xs"
                      >
                        {token}
                      </span>
                    ))
                  ) : (
                    <span className="text-xs text-slate-400 italic">No non-stopword tokens</span>
                  )}
                </div>
              </div>

              <div className="bg-slate-50 rounded-xl p-4 border border-slate-200">
                <span className="text-xs font-semibold text-slate-500 uppercase tracking-wider block mb-2">
                  Question 2 Filtered Tokens ({processed_question2.length})
                </span>
                <div className="flex flex-wrap gap-1.5 min-h-[36px] items-center">
                  {processed_question2.length > 0 ? (
                    processed_question2.map((token, idx) => (
                      <span
                        key={idx}
                        className="px-2.5 py-1 text-xs font-mono bg-white border border-slate-300 text-slate-800 rounded-md shadow-2xs"
                      >
                        {token}
                      </span>
                    ))
                  ) : (
                    <span className="text-xs text-slate-400 italic">No non-stopword tokens</span>
                  )}
                </div>
              </div>
            </div>
          </div>

          {/* Section 2: HashMap / Dictionary (Word Frequencies) */}
          <div>
            <div className="flex items-center justify-between mb-3">
              <h4 className="text-sm font-bold text-slate-800 flex items-center gap-2">
                <span className="w-6 h-6 rounded-md bg-amber-100 text-amber-800 text-xs font-mono font-bold flex items-center justify-center">
                  2
                </span>
                HashMap / Dictionary: Word Frequency Counts
              </h4>
              <span className="text-xs font-mono text-slate-500">
                Structure: <code className="text-amber-700 bg-amber-50 px-1.5 py-0.5 rounded">Dict[str, int] (O(1) lookup)</code>
              </span>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="bg-slate-50 rounded-xl p-4 border border-slate-200">
                <span className="text-xs font-semibold text-slate-500 uppercase tracking-wider block mb-2">
                  Q1 Frequency Map (Key → Value)
                </span>
                <div className="bg-white rounded-lg border border-slate-200 p-3 max-h-36 overflow-y-auto font-mono text-xs text-slate-700 space-y-1">
                  {Object.keys(frequency_map1).length > 0 ? (
                    Object.entries(frequency_map1).map(([word, count]) => (
                      <div key={word} className="flex items-center justify-between border-b border-slate-100 pb-1">
                        <span className="text-slate-800 font-semibold">"{word}"</span>
                        <span className="bg-amber-100 text-amber-900 px-2 py-0.5 rounded-full font-bold">
                          {count}
                        </span>
                      </div>
                    ))
                  ) : (
                    <span className="text-slate-400 italic">No entries</span>
                  )}
                </div>
              </div>

              <div className="bg-slate-50 rounded-xl p-4 border border-slate-200">
                <span className="text-xs font-semibold text-slate-500 uppercase tracking-wider block mb-2">
                  Q2 Frequency Map (Key → Value)
                </span>
                <div className="bg-white rounded-lg border border-slate-200 p-3 max-h-36 overflow-y-auto font-mono text-xs text-slate-700 space-y-1">
                  {Object.keys(frequency_map2).length > 0 ? (
                    Object.entries(frequency_map2).map(([word, count]) => (
                      <div key={word} className="flex items-center justify-between border-b border-slate-100 pb-1">
                        <span className="text-slate-800 font-semibold">"{word}"</span>
                        <span className="bg-amber-100 text-amber-900 px-2 py-0.5 rounded-full font-bold">
                          {count}
                        </span>
                      </div>
                    ))
                  ) : (
                    <span className="text-slate-400 italic">No entries</span>
                  )}
                </div>
              </div>
            </div>
          </div>

          {/* Section 3: Set Operations (Union & Intersection) */}
          <div>
            <div className="flex items-center justify-between mb-3">
              <h4 className="text-sm font-bold text-slate-800 flex items-center gap-2">
                <span className="w-6 h-6 rounded-md bg-emerald-100 text-emerald-800 text-xs font-mono font-bold flex items-center justify-center">
                  3
                </span>
                Set Operations: Unique Vocabulary Union & Common Intersection
              </h4>
              <span className="text-xs font-mono text-slate-500">
                Structure: <code className="text-emerald-700 bg-emerald-50 px-1.5 py-0.5 rounded">Set[str] + Sorted List</code>
              </span>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="bg-emerald-50/50 rounded-xl p-4 border border-emerald-200">
                <div className="flex items-center justify-between mb-2">
                  <span className="text-xs font-bold text-emerald-900 uppercase tracking-wider">
                    Common Words (Set Intersection: Q1 ∩ Q2)
                  </span>
                  <span className="text-xs font-semibold px-2 py-0.5 rounded-full bg-emerald-100 text-emerald-800">
                    {common_words.length} words
                  </span>
                </div>
                <div className="flex flex-wrap gap-1.5 min-h-[32px] items-center">
                  {common_words.length > 0 ? (
                    common_words.map((word, idx) => (
                      <span
                        key={idx}
                        className="px-2.5 py-1 text-xs font-mono font-bold bg-white text-emerald-800 border border-emerald-300 rounded-md shadow-xs flex items-center gap-1"
                      >
                        <Check className="w-3 h-3 text-emerald-600" />
                        {word}
                      </span>
                    ))
                  ) : (
                    <span className="text-xs text-slate-500 italic">No common content words found.</span>
                  )}
                </div>
              </div>

              <div className="bg-slate-50 rounded-xl p-4 border border-slate-200">
                <div className="flex items-center justify-between mb-2">
                  <span className="text-xs font-bold text-slate-700 uppercase tracking-wider">
                    Combined Vocabulary (Set Union: Q1 ∪ Q2)
                  </span>
                  <span className="text-xs font-semibold px-2 py-0.5 rounded-full bg-slate-200 text-slate-700">
                    {vocabulary.length} unique words
                  </span>
                </div>
                <div className="flex flex-wrap gap-1.5 max-h-24 overflow-y-auto">
                  {vocabulary.map((word, idx) => (
                    <span
                      key={idx}
                      className="px-2 py-0.5 text-xs font-mono bg-white border border-slate-200 text-slate-600 rounded"
                    >
                      {word}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          </div>

          {/* Section 4: Vector Space & Cosine Math Calculation */}
          <div className="bg-slate-900 text-white rounded-xl p-5 shadow-inner">
            <div className="flex items-center justify-between border-b border-slate-800 pb-3 mb-4">
              <h4 className="text-sm font-bold text-white flex items-center gap-2">
                <Calculator className="w-4 h-4 text-cyan-400" />
                Algorithm: Vector Space & Mathematical Cosine Calculation
              </h4>
              <span className="text-xs font-mono text-cyan-400">
                Formula: (A · B) / (||A|| × ||B||)
              </span>
            </div>

            {/* Aligned Vectors Table */}
            <div className="overflow-x-auto mb-4">
              <table className="w-full text-left font-mono text-xs border-collapse">
                <thead>
                  <tr className="border-b border-slate-800 text-slate-400">
                    <th className="py-2 px-3">Vector / Word</th>
                    {vocabulary.map((w, i) => (
                      <th key={i} className="py-2 px-3 text-center whitespace-nowrap text-slate-300">
                        {w}
                      </th>
                    ))}
                  </tr>
                </thead>
                <tbody>
                  <tr className="border-b border-slate-800/60 text-slate-200">
                    <td className="py-2 px-3 font-bold text-red-400">Vector A (Q1)</td>
                    {vector1.map((v, i) => (
                      <td key={i} className="py-2 px-3 text-center font-bold">
                        {v}
                      </td>
                    ))}
                  </tr>
                  <tr className="border-b border-slate-800/60 text-slate-200">
                    <td className="py-2 px-3 font-bold text-blue-400">Vector B (Q2)</td>
                    {vector2.map((v, i) => (
                      <td key={i} className="py-2 px-3 text-center font-bold">
                        {v}
                      </td>
                    ))}
                  </tr>
                  <tr className="text-amber-400">
                    <td className="py-2 px-3 font-bold">Product (A[i] * B[i])</td>
                    {vector1.map((v, i) => (
                      <td key={i} className="py-2 px-3 text-center font-bold">
                        {v * (vector2[i] || 0)}
                      </td>
                    ))}
                  </tr>
                </tbody>
              </table>
            </div>

            {/* Calculations Breakdown */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 pt-2 text-xs font-mono bg-slate-800/80 p-3.5 rounded-lg border border-slate-700">
              <div>
                <span className="text-slate-400 block mb-0.5">1. Dot Product (A · B):</span>
                <span className="text-base font-bold text-amber-300">{dot_product}</span>
              </div>
              <div>
                <span className="text-slate-400 block mb-0.5">2. Euclidean Norms:</span>
                <span className="text-slate-200">||A|| = {magnitude1}</span>
                <span className="text-slate-400 mx-1">|</span>
                <span className="text-slate-200">||B|| = {magnitude2}</span>
              </div>
              <div>
                <span className="text-slate-400 block mb-0.5">3. Cosine Score:</span>
                <span className="text-base font-bold text-emerald-400">
                  {similarity}%
                </span>
                <span className="text-slate-400 text-[11px] block">
                  Status: {status}
                </span>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

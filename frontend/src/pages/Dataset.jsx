import React, { useState, useEffect } from 'react';
import { Database, Search, Filter, Play, CheckCircle2, AlertTriangle, AlertCircle, ArrowRight } from 'lucide-react';
import { fetchSamples } from '../services/api';

const STATIC_SAMPLES = [
  { id: 1, question1: "How can I learn Python?", question2: "What is the best way to learn Python?", category: "Duplicate / Highly Similar", description: "Classic programming query rephrased" },
  { id: 2, question1: "How can I lose weight quickly?", question2: "What are the best methods to lose weight fast?", category: "Duplicate / Highly Similar", description: "Fitness advice inquiry with synonyms" },
  { id: 3, question1: "How do I start investing in the stock market?", question2: "What is the best way to begin investing in stocks?", category: "Duplicate / Highly Similar", description: "Financial market beginner query" },
  { id: 4, question1: "What is machine learning and how does it work?", question2: "Can you explain machine learning and its working?", category: "Duplicate / Highly Similar", description: "AI conceptual question" },
  { id: 5, question1: "How to prepare for a software engineering interview?", question2: "What are effective ways to prepare for coding interviews?", category: "Duplicate / Highly Similar", description: "Career and technical interview query" },
  { id: 6, question1: "How can I improve my programming skills?", question2: "What are the best ways to improve coding skills?", category: "Possibly Similar", description: "Overlapping concepts with synonymous phrasing" },
  { id: 7, question1: "Which is better, Java or Python?", question2: "Why do people prefer Python over Java?", category: "Possibly Similar", description: "Comparative programming language discussions" },
  { id: 8, question1: "What are good books to read for personal finance?", question2: "How can I learn personal money management?", category: "Possibly Similar", description: "Finance topic with differing lexical vocabulary" },
  { id: 9, question1: "How do I make a good cup of coffee?", question2: "What are the health benefits of drinking coffee?", category: "Possibly Similar", description: "Same central subject with divergent question intents" },
  { id: 10, question1: "How do I cook rice?", question2: "What is the capital of India?", category: "Not Duplicate", description: "Completely unrelated topics (culinary vs geography)" },
  { id: 11, question1: "How can I learn Python?", question2: "What is the capital of France?", category: "Not Duplicate", description: "Programming vs European capital" },
  { id: 12, question1: "What is quantum computing?", question2: "How do I bake chocolate chip cookies?", category: "Not Duplicate", description: "Theoretical physics vs baking recipe" },
  { id: 13, question1: "How does the human heart function?", question2: "What are the rules of cricket?", category: "Not Duplicate", description: "Biology vs sports rules" },
  { id: 14, question1: "What is the weather like in New York today?", question2: "How do I change a flat tire on a car?", category: "Not Duplicate", description: "Meteorology vs automotive repair" },
  { id: 15, question1: "Why does the sun shine?", question2: "What is the speed of light?", category: "Possibly Similar", description: "Astrophysics questions sharing physics domain vocabulary" }
];

export default function Dataset({ onSelectSample }) {
  const [samples, setSamples] = useState(STATIC_SAMPLES);
  const [selectedFilter, setSelectedFilter] = useState("All");
  const [searchTerm, setSearchTerm] = useState("");

  useEffect(() => {
    async function load() {
      const data = await fetchSamples();
      if (data && data.length > 0) {
        setSamples(data);
      }
    }
    load();
  }, []);

  const filteredSamples = samples.filter((s) => {
    const matchesFilter =
      selectedFilter === "All" ||
      s.category.toLowerCase().includes(selectedFilter.toLowerCase());

    const matchesSearch =
      s.question1.toLowerCase().includes(searchTerm.toLowerCase()) ||
      s.question2.toLowerCase().includes(searchTerm.toLowerCase()) ||
      s.description.toLowerCase().includes(searchTerm.toLowerCase());

    return matchesFilter && matchesSearch;
  });

  const getBadgeStyle = (category) => {
    if (category.includes("Duplicate") || category.includes("Highly")) {
      return "bg-emerald-50 text-emerald-800 border-emerald-200";
    } else if (category.includes("Possibly")) {
      return "bg-amber-50 text-amber-800 border-amber-200";
    } else {
      return "bg-slate-100 text-slate-700 border-slate-200";
    }
  };

  return (
    <div className="py-6 max-w-5xl mx-auto space-y-8">
      {/* Header */}
      <div>
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-slate-100 text-slate-700 text-xs font-semibold uppercase tracking-wider mb-2">
          <Database className="w-3.5 h-3.5 text-slate-500" />
          Benchmark Dataset
        </div>
        <h2 className="text-3xl font-extrabold text-slate-900 tracking-tight">
          Verified Test Question Pairs
        </h2>
        <p className="text-slate-600 mt-2 text-sm sm:text-base leading-relaxed">
          Pre-tested question pairs representing real-world user queries. Click <strong>"Compare"</strong> on any row to test the pair in the detector.
        </p>
      </div>

      {/* Filter Bar */}
      <div className="bg-white border border-slate-200 rounded-2xl p-4 sm:p-5 shadow-xs flex flex-col sm:flex-row items-center justify-between gap-4">
        <div className="relative w-full sm:w-72">
          <Search className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
          <input
            type="text"
            placeholder="Search questions or keywords..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full pl-9 pr-3 py-2 rounded-xl bg-slate-50 border border-slate-200 text-xs focus:bg-white focus:border-red-500 focus:ring-1 focus:ring-red-100 transition-all"
          />
        </div>

        <div className="flex flex-wrap items-center gap-1.5 w-full sm:w-auto">
          {["All", "Duplicate", "Possibly Similar", "Not Duplicate"].map((filter) => (
            <button
              key={filter}
              onClick={() => setSelectedFilter(filter)}
              className={`px-3 py-1.5 rounded-lg text-xs font-semibold transition-all cursor-pointer ${
                selectedFilter === filter
                  ? "bg-red-600 text-white shadow-xs"
                  : "bg-slate-100 text-slate-600 hover:bg-slate-200"
              }`}
            >
              {filter}
            </button>
          ))}
        </div>
      </div>

      {/* Table */}
      <div className="bg-white border border-slate-200 rounded-3xl shadow-xs overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left text-sm">
            <thead className="bg-slate-50 border-b border-slate-200 text-xs uppercase font-bold text-slate-500 tracking-wider">
              <tr>
                <th className="py-3.5 px-4 w-12 text-center">#</th>
                <th className="py-3.5 px-4">Question Pair</th>
                <th className="py-3.5 px-4 w-44">Target Status</th>
                <th className="py-3.5 px-4 w-32 text-center">Action</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {filteredSamples.length > 0 ? (
                filteredSamples.map((sample) => (
                  <tr key={sample.id} className="hover:bg-slate-50/60 transition-colors">
                    <td className="py-4 px-4 text-center font-mono text-xs text-slate-400">
                      {sample.id}
                    </td>
                    <td className="py-4 px-4 space-y-1.5">
                      <div className="flex items-start gap-2">
                        <span className="text-xs font-mono font-bold text-red-600 shrink-0 mt-0.5">Q1:</span>
                        <span className="text-sm font-medium text-slate-900">{sample.question1}</span>
                      </div>
                      <div className="flex items-start gap-2">
                        <span className="text-xs font-mono font-bold text-blue-600 shrink-0 mt-0.5">Q2:</span>
                        <span className="text-sm text-slate-700">{sample.question2}</span>
                      </div>
                      <p className="text-xs text-slate-400 italic pt-0.5">{sample.description}</p>
                    </td>
                    <td className="py-4 px-4">
                      <span className={`inline-flex items-center px-2.5 py-1 rounded-full text-xs font-semibold border ${getBadgeStyle(sample.category)}`}>
                        {sample.category}
                      </span>
                    </td>
                    <td className="py-4 px-4 text-center">
                      <button
                        onClick={() => onSelectSample(sample.question1, sample.question2)}
                        className="inline-flex items-center gap-1.5 px-3.5 py-1.5 bg-slate-900 hover:bg-red-600 text-white rounded-lg text-xs font-semibold shadow-xs transition-colors cursor-pointer whitespace-nowrap"
                      >
                        <Play className="w-3 h-3 fill-white" />
                        Compare
                      </button>
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan={4} className="py-8 text-center text-slate-500 text-sm italic">
                    No question pairs matched your search filter.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}

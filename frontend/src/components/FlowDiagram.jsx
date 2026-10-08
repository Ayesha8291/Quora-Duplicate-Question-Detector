import React from 'react';
import { 
  FileText, 
  Sparkles, 
  Search, 
  Compass, 
  CheckCircle2, 
  ArrowDown, 
  ArrowRight 
} from 'lucide-react';

export default function FlowDiagram() {
  const stages = [
    {
      step: 1,
      title: "Question Input",
      desc: "User enters two questions to compare.",
      detail: "Captures natural language query strings from the interface or external queries.",
      icon: FileText,
      color: "bg-blue-50 text-blue-700 border-blue-200"
    },
    {
      step: 2,
      title: "Text Processing",
      desc: "Normalizes text by lowercasing and removing punctuation.",
      detail: "Strips extraneous symbols (?, !, .) and standardizes casing for uniform token comparison.",
      icon: Sparkles,
      color: "bg-indigo-50 text-indigo-700 border-indigo-200"
    },
    {
      step: 3,
      title: "Keyword Analysis",
      desc: "Eliminates conversational filler and isolates essential terms.",
      detail: "Filters common stop words ('what', 'is', 'how') and extracts the distinguishing topical keywords.",
      icon: Search,
      color: "bg-purple-50 text-purple-700 border-purple-200"
    },
    {
      step: 4,
      title: "Similarity Calculation",
      desc: "Computes the directional cosine angle between the term vectors.",
      detail: "Determines how closely aligned the two questions are regardless of sentence length or verbosity.",
      icon: Compass,
      color: "bg-emerald-50 text-emerald-700 border-emerald-200"
    },
    {
      step: 5,
      title: "Duplicate Detection",
      desc: "Applies calibrated threshold to produce an actionable match status.",
      detail: "Categorizes pairs as Duplicate / Highly Similar, Possibly Similar, or Not Duplicate.",
      icon: CheckCircle2,
      color: "bg-red-50 text-red-700 border-red-200"
    }
  ];

  return (
    <div className="space-y-10">
      {/* High-Level Convergence Diagram */}
      <div className="bg-gradient-to-r from-slate-900 via-slate-800 to-slate-900 text-white rounded-3xl p-8 sm:p-10 shadow-lg border border-slate-700">
        <div className="max-w-xl mx-auto text-center space-y-2 mb-8">
          <h3 className="text-xl sm:text-2xl font-bold text-white tracking-tight">
            Comparison Pipeline Architecture
          </h3>
          <p className="text-slate-300 text-sm">
            How incoming queries flow from natural text into verified similarity determinations.
          </p>
        </div>

        {/* 5-Step Flowchart */}
        <div className="max-w-md mx-auto flex flex-col items-center">
          {/* Dual Inputs */}
          <div className="grid grid-cols-2 gap-4 w-full text-center">
            <div className="bg-slate-800 border border-slate-700 rounded-xl p-3 shadow-xs">
              <span className="text-[11px] font-mono text-red-400 font-bold block mb-1">INPUT 1</span>
              <span className="text-sm font-medium text-slate-100">Question 1</span>
            </div>
            <div className="bg-slate-800 border border-slate-700 rounded-xl p-3 shadow-xs">
              <span className="text-[11px] font-mono text-blue-400 font-bold block mb-1">INPUT 2</span>
              <span className="text-sm font-medium text-slate-100">Question 2</span>
            </div>
          </div>

          {/* Converging Arrow */}
          <div className="w-full flex justify-around my-2 text-slate-400">
            <ArrowDown className="w-4 h-4 text-red-400 animate-pulse" />
            <ArrowDown className="w-4 h-4 text-blue-400 animate-pulse" />
          </div>

          {/* Stages Flow */}
          <div className="w-full space-y-2.5">
            {[
              "Question Input",
              "Text Processing",
              "Keyword Analysis",
              "Similarity Calculation",
              "Duplicate Detection"
            ].map((stageName, idx) => (
              <div key={idx} className="flex flex-col items-center">
                <div className="w-full bg-slate-800/90 border border-slate-700 rounded-xl py-3 px-5 flex items-center justify-between shadow-xs">
                  <div className="flex items-center gap-3">
                    <span className="w-6 h-6 rounded-full bg-slate-700 text-xs font-mono font-bold flex items-center justify-center text-slate-200">
                      {idx + 1}
                    </span>
                    <span className="text-sm font-semibold text-slate-100">
                      {stageName}
                    </span>
                  </div>
                  <span className="text-xs text-slate-400 font-medium">
                    Step {idx + 1}
                  </span>
                </div>
                {idx < 4 && <ArrowDown className="w-4 h-4 text-slate-500 my-1" />}
              </div>
            ))}
          </div>

          {/* Output Banner */}
          <div className="mt-4 w-full bg-gradient-to-r from-red-600 to-rose-600 text-white rounded-xl p-3.5 text-center font-bold text-sm shadow-md border border-red-500 flex items-center justify-center gap-2">
            <CheckCircle2 className="w-5 h-5" />
            Similarity Score & Match Status
          </div>
        </div>
      </div>

      {/* Stage Detail Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
        {stages.map((stage) => {
          const Icon = stage.icon;
          return (
            <div 
              key={stage.step}
              className="bg-white border border-slate-200 rounded-2xl p-6 shadow-xs hover:shadow-md transition-shadow"
            >
              <div className="flex items-center gap-3 mb-4">
                <div className={`p-3 rounded-xl border ${stage.color}`}>
                  <Icon className="w-5 h-5" />
                </div>
                <div>
                  <span className="text-[11px] font-bold text-slate-400 uppercase tracking-wider block">
                    Phase {stage.step}
                  </span>
                  <h4 className="font-bold text-slate-900 text-base">
                    {stage.title}
                  </h4>
                </div>
              </div>
              <p className="text-sm font-medium text-slate-800 mb-1.5 leading-snug">
                {stage.desc}
              </p>
              <p className="text-xs text-slate-500 leading-relaxed">
                {stage.detail}
              </p>
            </div>
          );
        })}
      </div>
    </div>
  );
}

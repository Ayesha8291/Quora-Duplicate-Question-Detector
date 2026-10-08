import React from 'react';
import { 
  ArrowRight, 
  Layers, 
  HelpCircle, 
  Database, 
  Sparkles, 
  CheckCircle2, 
  Cpu, 
  Search, 
  Zap, 
  BarChart3, 
  FileCheck2, 
  ShieldCheck,
  Compass
} from 'lucide-react';

export default function Home({ setActiveTab, onSelectSample }) {
  const productCards = [
    {
      title: "Text Similarity",
      desc: "Cleans punctuation, standardizes character casing, and extracts the core meaningful terms to ensure accurate text matching.",
      icon: Search,
      tag: "Preprocessing"
    },
    {
      title: "Cosine Similarity",
      desc: "Measures the directional angle between question vectors, delivering length-invariant similarity evaluation across varying question styles.",
      icon: Compass,
      tag: "Vector Geometry"
    },
    {
      title: "Fast & Local",
      desc: "Operates 100% locally with zero latency, zero cloud subscriptions, and no reliance on third-party paid AI APIs.",
      icon: Zap,
      tag: "Zero Latency"
    },
    {
      title: "Clear Results",
      desc: "Delivers an instant percentage match score, actionable duplicate classification, and an explicit list of shared key terms.",
      icon: BarChart3,
      tag: "Interpretable"
    }
  ];

  return (
    <div className="space-y-16 py-6">
      {/* Hero Section */}
      <section className="relative overflow-hidden rounded-3xl bg-gradient-to-b from-white via-slate-50 to-slate-100/70 border border-slate-200/80 p-8 sm:p-14 lg:p-18 text-center shadow-xs">
        {/* Subtle background glow */}
        <div className="absolute -top-24 left-1/2 -translate-x-1/2 w-96 h-96 bg-red-100/40 rounded-full blur-3xl pointer-events-none" />

        <div className="relative z-10 max-w-4xl mx-auto space-y-6">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-red-50 text-red-700 text-xs font-semibold uppercase tracking-wider border border-red-200/60">
            <Sparkles className="w-3.5 h-3.5 text-red-600" />
            Intelligent Question Comparison Engine
          </div>

          <h1 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold text-slate-950 tracking-tight leading-tight">
            Quora Duplicate Question Detector
          </h1>

          <p className="text-lg sm:text-xl text-slate-600 max-w-2xl mx-auto leading-relaxed font-normal">
            Identify duplicate and similar questions using intelligent text similarity.
          </p>

          {/* Action CTAs */}
          <div className="pt-4 flex flex-wrap items-center justify-center gap-4">
            <button
              onClick={() => setActiveTab('detector')}
              className="flex items-center gap-2.5 px-8 py-3.5 rounded-xl bg-red-600 hover:bg-red-700 text-white font-bold text-base shadow-lg shadow-red-200 hover:shadow-red-300 transition-all transform hover:-translate-y-0.5 cursor-pointer"
            >
              Compare Questions
              <ArrowRight className="w-5 h-5" />
            </button>
            
            <button
              onClick={() => setActiveTab('how-it-works')}
              className="flex items-center gap-2 px-6 py-3.5 rounded-xl bg-white hover:bg-slate-100 text-slate-800 font-semibold text-base border border-slate-300 shadow-xs transition-all cursor-pointer"
            >
              <HelpCircle className="w-5 h-5 text-slate-500" />
              How It Works
            </button>
          </div>
        </div>
      </section>

      {/* 4 Professional Product Cards (Requirement 6) */}
      <section className="max-w-6xl mx-auto">
        <div className="text-center max-w-2xl mx-auto mb-10">
          <h2 className="text-2xl sm:text-3xl font-bold text-slate-900">
            Engineered for Precision & Speed
          </h2>
          <p className="text-sm sm:text-base text-slate-600 mt-2">
            A modular text similarity architecture providing deterministic, interpretable comparison results.
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {productCards.map((card, idx) => {
            const Icon = card.icon;
            return (
              <div 
                key={idx}
                className="bg-white rounded-2xl p-6 border border-slate-200 shadow-xs hover:shadow-md hover:border-red-200 transition-all flex flex-col justify-between"
              >
                <div>
                  <div className="w-11 h-11 rounded-xl bg-slate-100 text-slate-900 flex items-center justify-center mb-4">
                    <Icon className="w-5 h-5 text-red-600" />
                  </div>
                  <span className="text-[11px] font-bold uppercase tracking-wider text-slate-400 block mb-1">
                    {card.tag}
                  </span>
                  <h3 className="text-lg font-bold text-slate-900 mb-2">
                    {card.title}
                  </h3>
                  <p className="text-sm text-slate-600 leading-relaxed">
                    {card.desc}
                  </p>
                </div>
              </div>
            );
          })}
        </div>
      </section>

      {/* Interactive Quick Benchmark Showcase */}
      <section className="max-w-6xl mx-auto bg-slate-900 text-white rounded-3xl p-8 sm:p-10 border border-slate-800 shadow-xl">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-8">
          <div>
            <span className="text-xs font-semibold uppercase tracking-wider text-red-400 font-mono">
              Live Test Scenarios
            </span>
            <h3 className="text-2xl font-bold text-white mt-1">
              Explore Common Question Pairings
            </h3>
            <p className="text-sm text-slate-400 mt-1">
              Select any verified query pair to immediately test similarity in the detector.
            </p>
          </div>
          <button
            onClick={() => setActiveTab('dataset')}
            className="text-xs font-semibold text-slate-300 hover:text-white flex items-center gap-1.5 transition-colors self-start md:self-auto bg-slate-800 px-4 py-2 rounded-lg border border-slate-700"
          >
            View All Benchmarks
            <ArrowRight className="w-3.5 h-3.5" />
          </button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div 
            onClick={() => onSelectSample("How can I learn Python?", "What is the best way to learn Python?")}
            className="bg-slate-800/80 hover:bg-slate-800 border border-slate-700/80 hover:border-red-500/60 rounded-2xl p-5 transition-all cursor-pointer group"
          >
            <div className="flex items-center justify-between text-xs mb-3">
              <span className="text-slate-400 font-mono font-medium">Scenario A</span>
              <span className="px-2.5 py-0.5 rounded-full bg-emerald-500/20 text-emerald-300 font-semibold text-[11px]">
                Duplicate (~87%)
              </span>
            </div>
            <p className="text-xs text-slate-200 mb-1.5 font-medium leading-relaxed">
              <span className="text-red-400 font-mono">Q1:</span> How can I learn Python?
            </p>
            <p className="text-xs text-slate-300 mb-4 leading-relaxed">
              <span className="text-blue-400 font-mono">Q2:</span> What is the best way to learn Python?
            </p>
            <span className="text-xs text-red-400 font-semibold group-hover:underline flex items-center gap-1">
              Test in Detector &rarr;
            </span>
          </div>

          <div 
            onClick={() => onSelectSample("How can I improve my programming skills?", "What are the best ways to improve coding skills?")}
            className="bg-slate-800/80 hover:bg-slate-800 border border-slate-700/80 hover:border-amber-500/60 rounded-2xl p-5 transition-all cursor-pointer group"
          >
            <div className="flex items-center justify-between text-xs mb-3">
              <span className="text-slate-400 font-mono font-medium">Scenario B</span>
              <span className="px-2.5 py-0.5 rounded-full bg-amber-500/20 text-amber-300 font-semibold text-[11px]">
                Similar (~40-60%)
              </span>
            </div>
            <p className="text-xs text-slate-200 mb-1.5 font-medium leading-relaxed">
              <span className="text-amber-400 font-mono">Q1:</span> How can I improve my programming skills?
            </p>
            <p className="text-xs text-slate-300 mb-4 leading-relaxed">
              <span className="text-blue-400 font-mono">Q2:</span> What are the best ways to improve coding skills?
            </p>
            <span className="text-xs text-amber-400 font-semibold group-hover:underline flex items-center gap-1">
              Test in Detector &rarr;
            </span>
          </div>

          <div 
            onClick={() => onSelectSample("How do I cook rice?", "What is the capital of India?")}
            className="bg-slate-800/80 hover:bg-slate-800 border border-slate-700/80 hover:border-slate-500/60 rounded-2xl p-5 transition-all cursor-pointer group"
          >
            <div className="flex items-center justify-between text-xs mb-3">
              <span className="text-slate-400 font-mono font-medium">Scenario C</span>
              <span className="px-2.5 py-0.5 rounded-full bg-slate-700 text-slate-300 font-semibold text-[11px]">
                Not Duplicate (0%)
              </span>
            </div>
            <p className="text-xs text-slate-200 mb-1.5 font-medium leading-relaxed">
              <span className="text-slate-400 font-mono">Q1:</span> How do I cook rice?
            </p>
            <p className="text-xs text-slate-300 mb-4 leading-relaxed">
              <span className="text-blue-400 font-mono">Q2:</span> What is the capital of India?
            </p>
            <span className="text-xs text-slate-400 font-semibold group-hover:underline flex items-center gap-1">
              Test in Detector &rarr;
            </span>
          </div>
        </div>
      </section>
    </div>
  );
}

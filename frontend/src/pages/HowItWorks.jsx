import React from 'react';
import FlowDiagram from '../components/FlowDiagram';
import { 
  HelpCircle, 
  ArrowRight, 
  Compass, 
  Sparkles, 
  ShieldCheck,
  CheckCircle2
} from 'lucide-react';

export default function HowItWorks({ setActiveTab }) {
  return (
    <div className="py-6 max-w-5xl mx-auto space-y-12">
      {/* Header */}
      <div>
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-slate-100 text-slate-700 text-xs font-semibold uppercase tracking-wider mb-2">
          <HelpCircle className="w-3.5 h-3.5 text-slate-500" />
          System Architecture
        </div>
        <h2 className="text-3xl font-extrabold text-slate-900 tracking-tight">
          How It Works
        </h2>
        <p className="text-slate-600 mt-2 max-w-3xl leading-relaxed text-sm sm:text-base">
          Our duplicate detection system evaluates questions through a disciplined multi-stage text processing and geometric comparison engine.
        </p>
      </div>

      {/* 5-Stage Visual Diagram */}
      <FlowDiagram />

      {/* Deep-Dive Product Methodology */}
      <div className="space-y-6 pt-6 border-t border-slate-200">
        <h3 className="text-2xl font-bold text-slate-900">
          Algorithmic Foundation: Cosine Similarity
        </h3>

        <div className="bg-white border border-slate-200 rounded-3xl p-6 sm:p-8 space-y-6 shadow-xs">
          <p className="text-sm text-slate-600 leading-relaxed">
            Unlike simple string matching which checks if two sentences are worded identically, <strong>Cosine Similarity</strong> models questions as vectors in a shared keyword space. It measures the cosine of the angle between these directional vectors:
          </p>

          {/* Formula Card */}
          <div className="bg-slate-900 text-white rounded-2xl p-6 text-center font-mono">
            <span className="text-xs text-slate-400 block mb-2 uppercase tracking-widest">
              Directional Alignment Formula
            </span>
            <div className="text-2xl sm:text-3xl font-bold text-cyan-400 my-2">
              cos(θ) = (A · B) / ( ||A|| × ||B|| )
            </div>
            <p className="text-xs text-slate-400 mt-2 max-w-md mx-auto">
              Dot product of question vectors divided by the product of their Euclidean lengths.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-xs text-slate-700">
            <div className="p-4 bg-slate-50 rounded-xl border border-slate-200">
              <span className="font-bold text-slate-900 block mb-1 text-sm">Length Invariance</span>
              Because it normalizes by vector length, a concise question and an elaborated question on the same topic maintain high similarity.
            </div>
            <div className="p-4 bg-slate-50 rounded-xl border border-slate-200">
              <span className="font-bold text-slate-900 block mb-1 text-sm">Deterministic Outputs</span>
              Produces mathematically consistent results from 0% (orthogonal/unrelated) to 100% (identical topical focus).
            </div>
            <div className="p-4 bg-slate-50 rounded-xl border border-slate-200">
              <span className="font-bold text-slate-900 block mb-1 text-sm">Actionable Thresholds</span>
              Scores are calibrated against clear categorization bands: Duplicate, Possibly Similar, and Not Duplicate.
            </div>
          </div>
        </div>

        {/* CTA */}
        <div className="text-center pt-4">
          <button
            onClick={() => setActiveTab('detector')}
            className="inline-flex items-center gap-2 px-8 py-3.5 rounded-xl bg-red-600 hover:bg-red-700 text-white font-bold text-sm shadow-md shadow-red-200 hover:shadow-red-300 transition-all cursor-pointer"
          >
            Launch Duplicate Detector
            <ArrowRight className="w-4 h-4" />
          </button>
        </div>
      </div>
    </div>
  );
}

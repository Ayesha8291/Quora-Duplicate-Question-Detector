import React, { useState } from 'react';
import { 
  ArrowLeftRight, 
  RotateCcw, 
  Send, 
  CheckCircle2, 
  AlertCircle, 
  AlertTriangle, 
  Sliders, 
  Tag, 
  Sparkles,
  ArrowRight,
  HelpCircle
} from 'lucide-react';
import { checkDuplicate } from '../services/api';

export default function Detector({ 
  initialQ1 = "", 
  initialQ2 = "", 
  backendStatus 
}) {
  const [question1, setQuestion1] = useState(initialQ1 || "How can I learn Python?");
  const [question2, setQuestion2] = useState(initialQ2 || "What is the best way to learn Python?");
  const [threshold, setThreshold] = useState(0.70);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [warning, setWarning] = useState(null);
  const [result, setResult] = useState(null);

  // Sync props
  React.useEffect(() => {
    if (initialQ1) setQuestion1(initialQ1);
    if (initialQ2) setQuestion2(initialQ2);
  }, [initialQ1, initialQ2]);

  const handleSwap = () => {
    const temp = question1;
    setQuestion1(question2);
    setQuestion2(temp);
  };

  const handleClear = () => {
    setQuestion1("");
    setQuestion2("");
    setResult(null);
    setError(null);
    setWarning(null);
  };

  const handleQuickPreset = (q1, q2) => {
    setQuestion1(q1);
    setQuestion2(q2);
    setError(null);
    setWarning(null);
  };

  const handleSubmit = async (e) => {
    if (e) e.preventDefault();
    setError(null);
    setWarning(null);

    const trimmedQ1 = question1.trim();
    const trimmedQ2 = question2.trim();

    if (!trimmedQ1) {
      setError("Please enter Question 1.");
      return;
    }
    if (!trimmedQ2) {
      setError("Please enter Question 2.");
      return;
    }

    if (trimmedQ1.length < 5 || trimmedQ2.length < 5) {
      setWarning("One of your questions is very short. Comparison may produce skewed results.");
    }

    setLoading(true);
    const response = await checkDuplicate(trimmedQ1, trimmedQ2, threshold);
    setLoading(false);

    if (response.success) {
      setResult(response.data);
    } else {
      setError(response.error);
    }
  };

  const getStatusTheme = (status) => {
    if (status?.includes("Duplicate") || status?.includes("Highly Similar")) {
      return {
        bg: "bg-emerald-50/70",
        border: "border-emerald-200",
        pill: "bg-emerald-600 text-white",
        icon: CheckCircle2,
        textColor: "text-emerald-700",
        gaugeBg: "bg-emerald-500"
      };
    } else if (status?.includes("Possibly")) {
      return {
        bg: "bg-amber-50/70",
        border: "border-amber-200",
        pill: "bg-amber-500 text-white",
        icon: AlertTriangle,
        textColor: "text-amber-700",
        gaugeBg: "bg-amber-500"
      };
    } else {
      return {
        bg: "bg-slate-50",
        border: "border-slate-200",
        pill: "bg-slate-700 text-white",
        icon: AlertCircle,
        textColor: "text-slate-700",
        gaugeBg: "bg-slate-400"
      };
    }
  };

  return (
    <div className="py-6 max-w-4xl mx-auto space-y-8">
      {/* Header */}
      <div>
        <h2 className="text-2xl sm:text-3xl font-bold text-slate-900 tracking-tight">
          Duplicate Question Detector
        </h2>
        <p className="text-sm sm:text-base text-slate-600 mt-1">
          Compare any two questions to evaluate their textual overlap and determine if they represent duplicate inquiries.
        </p>
      </div>

      {/* Backend Alert if offline */}
      {!backendStatus.online && (
        <div className="bg-amber-50 border border-amber-200 text-amber-900 rounded-xl p-4 flex items-center justify-between text-sm">
          <div className="flex items-center gap-2">
            <AlertTriangle className="w-5 h-5 text-amber-600 shrink-0" />
            <span>
              <strong>Service Offline:</strong> The backend API is unreachable. Ensure the service is running on port 8000.
            </span>
          </div>
        </div>
      )}

      {/* Main Input Form */}
      <div className="bg-white border border-slate-200 rounded-3xl shadow-xs p-6 sm:p-8">
        {/* Presets Header */}
        <div className="flex flex-wrap items-center justify-between gap-3 pb-4 mb-6 border-b border-slate-100">
          <span className="text-xs font-semibold uppercase tracking-wider text-slate-400">
            Sample Scenarios:
          </span>
          <div className="flex flex-wrap gap-2">
            <button
              type="button"
              onClick={() => handleQuickPreset("How can I learn Python?", "What is the best way to learn Python?")}
              className="text-xs px-3 py-1 rounded-lg bg-slate-100 hover:bg-slate-200 text-slate-700 font-medium transition-colors cursor-pointer"
            >
              High Similarity
            </button>
            <button
              type="button"
              onClick={() => handleQuickPreset("How can I improve my programming skills?", "What are the best ways to improve coding skills?")}
              className="text-xs px-3 py-1 rounded-lg bg-slate-100 hover:bg-slate-200 text-slate-700 font-medium transition-colors cursor-pointer"
            >
              Moderate Overlap
            </button>
            <button
              type="button"
              onClick={() => handleQuickPreset("How do I cook rice?", "What is the capital of India?")}
              className="text-xs px-3 py-1 rounded-lg bg-slate-100 hover:bg-slate-200 text-slate-700 font-medium transition-colors cursor-pointer"
            >
              Unrelated
            </button>
          </div>
        </div>

        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="space-y-4">
            {/* Question 1 */}
            <div className="space-y-1.5">
              <div className="flex items-center justify-between">
                <label htmlFor="q1" className="text-xs font-bold uppercase tracking-wider text-slate-700">
                  Question 1
                </label>
                <span className="text-[11px] text-slate-400">
                  {question1.trim().length} chars
                </span>
              </div>
              <textarea
                id="q1"
                rows={3}
                value={question1}
                onChange={(e) => setQuestion1(e.target.value)}
                placeholder="Enter first question here..."
                className="w-full rounded-xl border border-slate-300 focus:border-red-500 focus:ring-2 focus:ring-red-100 p-3.5 text-sm text-slate-900 transition-all resize-y"
              />
            </div>

            {/* Question 2 */}
            <div className="space-y-1.5">
              <div className="flex items-center justify-between">
                <label htmlFor="q2" className="text-xs font-bold uppercase tracking-wider text-slate-700">
                  Question 2
                </label>
                <span className="text-[11px] text-slate-400">
                  {question2.trim().length} chars
                </span>
              </div>
              <textarea
                id="q2"
                rows={3}
                value={question2}
                onChange={(e) => setQuestion2(e.target.value)}
                placeholder="Enter second question here..."
                className="w-full rounded-xl border border-slate-300 focus:border-red-500 focus:ring-2 focus:ring-red-100 p-3.5 text-sm text-slate-900 transition-all resize-y"
              />
            </div>
          </div>

          {/* Controls & Action Button */}
          <div className="pt-2 flex flex-col sm:flex-row items-center justify-between gap-4 border-t border-slate-100">
            {/* Left Utility Actions */}
            <div className="flex items-center gap-2 w-full sm:w-auto">
              <button
                type="button"
                onClick={handleSwap}
                title="Swap Question 1 and Question 2"
                className="flex items-center gap-1.5 px-3 py-2 text-xs font-semibold text-slate-600 hover:text-slate-900 hover:bg-slate-100 rounded-lg border border-slate-200 transition-all cursor-pointer"
              >
                <ArrowLeftRight className="w-3.5 h-3.5" />
                Swap
              </button>
              <button
                type="button"
                onClick={handleClear}
                title="Clear input fields"
                className="flex items-center gap-1.5 px-3 py-2 text-xs font-semibold text-slate-600 hover:text-red-700 hover:bg-red-50 rounded-lg border border-slate-200 transition-all cursor-pointer"
              >
                <RotateCcw className="w-3.5 h-3.5" />
                Clear
              </button>

              {/* Threshold Selector */}
              <div className="hidden sm:flex items-center gap-2 pl-3 border-l border-slate-200 text-xs text-slate-600">
                <Sliders className="w-3.5 h-3.5 text-slate-400" />
                <span>Threshold:</span>
                <select
                  value={threshold}
                  onChange={(e) => setThreshold(parseFloat(e.target.value))}
                  className="bg-slate-50 border border-slate-200 rounded px-2 py-1 text-xs font-semibold text-slate-800"
                >
                  <option value={0.60}>60%</option>
                  <option value={0.70}>70% (Standard)</option>
                  <option value={0.80}>80% (Strict)</option>
                </select>
              </div>
            </div>

            {/* Compare Questions Button (Requirement 7) */}
            <button
              type="submit"
              disabled={loading}
              className={`w-full sm:w-auto flex items-center justify-center gap-2 px-8 py-3.5 rounded-xl text-white font-bold text-sm shadow-md transition-all cursor-pointer ${
                loading 
                  ? 'bg-slate-400 cursor-not-allowed' 
                  : 'bg-red-600 hover:bg-red-700 shadow-red-200 hover:shadow-red-300 transform hover:-translate-y-0.5'
              }`}
            >
              {loading ? (
                <>
                  <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
                  Comparing Questions...
                </>
              ) : (
                <>
                  <Send className="w-4 h-4" />
                  Compare Questions
                </>
              )}
            </button>
          </div>
        </form>

        {/* Errors / Warnings */}
        {error && (
          <div className="mt-5 bg-red-50 border border-red-200 text-red-700 rounded-xl p-4 flex items-center gap-3 text-sm">
            <AlertCircle className="w-5 h-5 shrink-0 text-red-600" />
            <span>{error}</span>
          </div>
        )}
        {warning && (
          <div className="mt-4 bg-amber-50 border border-amber-200 text-amber-800 rounded-xl p-3 flex items-center gap-2 text-xs">
            <AlertTriangle className="w-4 h-4 shrink-0 text-amber-600" />
            <span>{warning}</span>
          </div>
        )}
      </div>

      {/* Professional SaaS Result Card (Requirement 8) */}
      {result && (
        <div className="animate-fadeIn space-y-4">
          {(() => {
            const theme = getStatusTheme(result.status);
            const StatusIcon = theme.icon;

            return (
              <div className={`rounded-3xl border ${theme.border} ${theme.bg} p-8 sm:p-10 shadow-sm relative overflow-hidden`}>
                <div className="max-w-md mx-auto text-center space-y-4">
                  <span className="text-xs font-bold uppercase tracking-widest text-slate-400">
                    Similarity Score
                  </span>

                  {/* Primary Percentage */}
                  <div className="py-1">
                    <span className={`text-6xl sm:text-7xl font-extrabold tracking-tight font-sans ${theme.textColor}`}>
                      {result.similarity}%
                    </span>
                  </div>

                  {/* Classification Status Badge */}
                  <div>
                    <span className={`inline-flex items-center gap-2 px-5 py-2 rounded-full text-base font-bold shadow-xs ${theme.pill}`}>
                      <StatusIcon className="w-5 h-5" />
                      {result.status}
                    </span>
                  </div>

                  <p className="text-xs text-slate-500 pt-1">
                    Evaluated against a calibrated similarity threshold of {result.threshold_used}%.
                  </p>
                </div>

                {/* Common Terms Section */}
                <div className="mt-8 pt-6 border-t border-slate-200/80">
                  <div className="flex items-center justify-between gap-2 mb-3">
                    <span className="text-xs font-bold uppercase tracking-wider text-slate-700 flex items-center gap-1.5">
                      <Tag className="w-3.5 h-3.5 text-slate-500" />
                      Common Terms:
                    </span>
                    <span className="text-xs font-semibold px-2 py-0.5 rounded-full bg-slate-200/70 text-slate-700">
                      {result.common_words?.length || 0} matching terms
                    </span>
                  </div>

                  <div className="flex flex-wrap gap-2">
                    {result.common_words && result.common_words.length > 0 ? (
                      result.common_words.map((word, idx) => (
                        <span
                          key={idx}
                          className="px-3 py-1 bg-white border border-slate-300/80 text-slate-900 rounded-lg text-sm font-semibold shadow-2xs"
                        >
                          {word}
                        </span>
                      ))
                    ) : (
                      <span className="text-xs text-slate-500 italic">
                        No common key terms found between the two questions.
                      </span>
                    )}
                  </div>
                </div>
              </div>
            );
          })()}
        </div>
      )}
    </div>
  );
}

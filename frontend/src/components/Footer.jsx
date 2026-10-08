import React from 'react';
import { Layers, Database, HelpCircle, Info } from 'lucide-react';

export default function Footer({ setActiveTab }) {
  return (
    <footer className="bg-white border-t border-slate-200 mt-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {/* Brand Col */}
          <div className="md:col-span-2 space-y-3">
            <div className="flex items-center gap-2.5">
              <div className="w-8 h-8 rounded-lg bg-red-600 flex items-center justify-center text-white font-bold font-serif text-base">
                Q
              </div>
              <h3 className="font-bold text-slate-900 text-base tracking-tight">
                Quora Duplicate Question Detector
              </h3>
            </div>
            <p className="text-sm text-slate-600 max-w-md leading-relaxed">
              An intelligent text similarity detection engine designed to identify and group duplicate questions using high-precision vector mathematics.
            </p>
            <div className="flex items-center gap-2 pt-1 text-xs text-slate-500">
              <span className="px-2.5 py-1 bg-slate-100 rounded-md font-mono text-slate-700 font-medium">React + Vite</span>
              <span className="px-2.5 py-1 bg-slate-100 rounded-md font-mono text-slate-700 font-medium">FastAPI</span>
              <span className="px-2.5 py-1 bg-slate-100 rounded-md font-mono text-slate-700 font-medium">Tailwind CSS</span>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="font-semibold text-slate-900 text-sm mb-3">
              Application
            </h4>
            <ul className="space-y-2 text-sm text-slate-600">
              <li>
                <button onClick={() => setActiveTab('detector')} className="hover:text-red-600 transition-colors cursor-pointer">
                  Question Detector
                </button>
              </li>
              <li>
                <button onClick={() => setActiveTab('how-it-works')} className="hover:text-red-600 transition-colors cursor-pointer">
                  How It Works
                </button>
              </li>
              <li>
                <button onClick={() => setActiveTab('dataset')} className="hover:text-red-600 transition-colors cursor-pointer">
                  Benchmark Dataset
                </button>
              </li>
              <li>
                <button onClick={() => setActiveTab('about')} className="hover:text-red-600 transition-colors cursor-pointer">
                  System Specifications
                </button>
              </li>
            </ul>
          </div>

          {/* Product Info */}
          <div>
            <h4 className="font-semibold text-slate-900 text-sm mb-3">
              Product Details
            </h4>
            <div className="text-xs text-slate-600 space-y-2">
              <p>
                <span className="font-semibold text-slate-800">Engine:</span> Cosine Similarity Vector Space
              </p>
              <p>
                <span className="font-semibold text-slate-800">Execution:</span> 100% Local & In-Memory
              </p>
              <p>
                <span className="font-semibold text-slate-800">Security:</span> Zero Third-Party API Exposure
              </p>
              <p className="text-slate-500 pt-1">
                Calibrated for instant community query matching.
              </p>
            </div>
          </div>
        </div>

        <div className="border-t border-slate-100 mt-8 pt-6 flex flex-col sm:flex-row items-center justify-between text-xs text-slate-500 gap-3">
          <p>© {new Date().getFullYear()} Quora Duplicate Question Detector. All rights reserved.</p>
          <p className="flex items-center gap-1.5">
            Designed for high performance, reliability, and precision.
          </p>
        </div>
      </div>
    </footer>
  );
}

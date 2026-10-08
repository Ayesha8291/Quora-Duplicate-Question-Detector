import React from 'react';
import { Layers, HelpCircle, Database, Info, Sparkles, CheckCircle2 } from 'lucide-react';

export default function Navbar({ activeTab, setActiveTab, backendStatus, onRetryBackend }) {
  const navItems = [
    { id: 'home', label: 'Overview', icon: Sparkles },
    { id: 'detector', label: 'Detector', icon: Layers },
    { id: 'how-it-works', label: 'How It Works', icon: HelpCircle },
    { id: 'dataset', label: 'Benchmarks', icon: Database },
    { id: 'about', label: 'Specifications', icon: Info },
  ];

  return (
    <header className="sticky top-0 z-50 bg-white/95 backdrop-blur-md border-b border-slate-200 shadow-xs">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Brand Logo & Name */}
          <div 
            onClick={() => setActiveTab('home')}
            className="flex items-center gap-3 cursor-pointer group select-none"
          >
            <div className="w-9 h-9 rounded-xl bg-gradient-to-tr from-red-600 to-rose-500 flex items-center justify-center text-white shadow-md shadow-red-200 group-hover:scale-105 transition-transform">
              <span className="font-extrabold text-lg font-serif">Q</span>
            </div>
            <div>
              <div className="flex items-center gap-2">
                <span className="font-bold text-slate-900 text-base tracking-tight group-hover:text-red-700 transition-colors">
                  Quora Duplicate Detector
                </span>
                <span className="px-2 py-0.5 text-[11px] font-semibold bg-slate-100 text-slate-700 rounded-full border border-slate-200">
                  v1.0
                </span>
              </div>
              <p className="text-xs text-slate-500 hidden sm:block">
                Intelligent Text Similarity & Duplicate Detection
              </p>
            </div>
          </div>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center gap-1">
            {navItems.map((item) => {
              const Icon = item.icon;
              const isActive = activeTab === item.id;
              return (
                <button
                  key={item.id}
                  onClick={() => setActiveTab(item.id)}
                  className={`flex items-center gap-2 px-3.5 py-2 rounded-lg text-sm font-medium transition-all ${
                    isActive
                      ? 'bg-red-50 text-red-700 font-semibold shadow-2xs'
                      : 'text-slate-600 hover:text-slate-900 hover:bg-slate-100/80'
                  }`}
                >
                  <Icon className={`w-4 h-4 ${isActive ? 'text-red-600' : 'text-slate-400'}`} />
                  {item.label}
                </button>
              );
            })}
          </nav>

          {/* Right Status Badge */}
          <div className="flex items-center gap-3">
            <div 
              title={backendStatus.online ? "FastAPI backend service is operational" : backendStatus.message}
              className={`flex items-center gap-2 px-3 py-1.5 rounded-full text-xs font-medium border transition-colors ${
                backendStatus.online 
                  ? 'bg-emerald-50 text-emerald-800 border-emerald-200/80' 
                  : 'bg-amber-50 text-amber-800 border-amber-200'
              }`}
            >
              <span className={`w-2 h-2 rounded-full ${backendStatus.online ? 'bg-emerald-500 animate-pulse' : 'bg-amber-500'}`} />
              <span className="font-medium">{backendStatus.online ? 'System Ready' : 'Service Offline'}</span>
              {!backendStatus.online && (
                <button 
                  onClick={onRetryBackend}
                  className="ml-1 underline hover:text-amber-950 font-semibold text-[10px]"
                >
                  Reconnect
                </button>
              )}
            </div>

            <button
              onClick={() => setActiveTab('detector')}
              className="hidden lg:flex items-center gap-1.5 px-3.5 py-1.5 bg-red-600 hover:bg-red-700 text-white rounded-lg text-xs font-semibold shadow-xs transition-all hover:shadow-red-200 hover:-translate-y-0.5 cursor-pointer"
            >
              Launch Detector
            </button>
          </div>
        </div>

        {/* Mobile Nav Menu */}
        <div className="flex md:hidden overflow-x-auto py-2 gap-1 border-t border-slate-100 no-scrollbar">
          {navItems.map((item) => {
            const Icon = item.icon;
            const isActive = activeTab === item.id;
            return (
              <button
                key={item.id}
                onClick={() => setActiveTab(item.id)}
                className={`flex items-center gap-1.5 px-3 py-1.5 rounded-md text-xs whitespace-nowrap font-medium ${
                  isActive
                    ? 'bg-red-50 text-red-700 font-semibold'
                    : 'text-slate-600 hover:bg-slate-50'
                }`}
              >
                <Icon className="w-3.5 h-3.5" />
                {item.label}
              </button>
            );
          })}
        </div>
      </div>
    </header>
  );
}

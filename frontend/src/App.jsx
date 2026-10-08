import React, { useState, useEffect } from 'react';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import Home from './pages/Home';
import Detector from './pages/Detector';
import HowItWorks from './pages/HowItWorks';
import Dataset from './pages/Dataset';
import About from './pages/About';
import { checkBackendHealth } from './services/api';

export default function App() {
  const [activeTab, setActiveTab] = useState('home');
  const [initialQ1, setInitialQ1] = useState('');
  const [initialQ2, setInitialQ2] = useState('');
  const [backendStatus, setBackendStatus] = useState({ online: false, message: 'Checking...' });

  const verifyBackend = async () => {
    const status = await checkBackendHealth();
    setBackendStatus(status);
  };

  useEffect(() => {
    verifyBackend();
    // Periodic check every 15 seconds
    const interval = setInterval(verifyBackend, 15000);
    return () => clearInterval(interval);
  }, []);

  const handleSelectSample = (q1, q2) => {
    setInitialQ1(q1);
    setInitialQ2(q2);
    setActiveTab('detector');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <div className="min-h-screen flex flex-col bg-slate-50 text-slate-800">
      <Navbar 
        activeTab={activeTab} 
        setActiveTab={setActiveTab} 
        backendStatus={backendStatus}
        onRetryBackend={verifyBackend}
      />

      <main className="flex-1 max-w-7xl w-full mx-auto px-4 sm:px-6 lg:px-8 py-6">
        {activeTab === 'home' && (
          <Home 
            setActiveTab={setActiveTab} 
            onSelectSample={handleSelectSample} 
          />
        )}
        {activeTab === 'detector' && (
          <Detector 
            initialQ1={initialQ1} 
            initialQ2={initialQ2} 
            backendStatus={backendStatus} 
          />
        )}
        {activeTab === 'how-it-works' && (
          <HowItWorks setActiveTab={setActiveTab} />
        )}
        {activeTab === 'dataset' && (
          <Dataset onSelectSample={handleSelectSample} />
        )}
        {activeTab === 'about' && (
          <About />
        )}
      </main>

      <Footer setActiveTab={setActiveTab} />
    </div>
  );
}

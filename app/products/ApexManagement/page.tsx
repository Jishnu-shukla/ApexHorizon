'use client';

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import Image from 'next/image';
import Link from 'next/link';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import DeviceMockup from '@/components/home/DeviceMockup';
import PricingSection from '@/components/products/whatsappInventory/Pricing';
import { containerVariants, leftPanelVariants, rightPanelVariants } from "@/constants/variants";

export default function ApexManagementProductPage() {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [downloadStatus, setDownloadStatus] = useState<'idle' | 'loading' | 'success'>('idle');
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    mobile: '',
    business: ''
  });

  const handleOpenModal = (e: React.MouseEvent) => {
    e.preventDefault();
    setIsModalOpen(true);
    setDownloadStatus('idle');
  };

  const handleDownloadSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.name || !formData.email) return;

    setDownloadStatus('loading');

    try {
      const res = await fetch('/api/download', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData)
      });
      
      if (res.ok) {
        const data = await res.json();
        setDownloadStatus('success');
        // Trigger download
        window.location.href = data.downloadUrl;
        
        // Auto close after 3 seconds
        setTimeout(() => {
          setIsModalOpen(false);
        }, 3000);
      }
    } catch (error) {
      console.error("Download failed", error);
      setDownloadStatus('idle');
    }
  };

  const features = [
    {
      title: "100% Offline-First Architecture",
      description: "Never worry about internet outages. Your entire business runs locally on blazing fast JSON databases, syncing in the background only when connection is restored.",
      icon: "⚡"
    },
    {
      title: "Automated CA Ledger Exports",
      description: "Instantly compile all your transactions into beautifully formatted, native Excel (.xlsx) spreadsheets ready to hand over to your accountant.",
      icon: "📊"
    },
    {
      title: "Native WhatsApp Integration",
      description: "Automatically dispatch receipts, invoices, and transactional updates directly to your customers' WhatsApp with our embedded communication gateway.",
      icon: "💬"
    },
    {
      title: "Zero-Setup Portable Executable",
      description: "No installation required. Just double-click the .exe file and start running your business immediately with an embedded Java runtime environment.",
      icon: "🚀"
    }
  ];

  return (
    <main>
      <section className="relative min-h-screen w-full overflow-hidden bg-background text-foreground font-sans select-none">
        <Navbar />

        {/* Hero Section */}
        <motion.div 
          initial="hidden"
          animate="visible"
          variants={containerVariants}
          className="relative z-20 flex w-full items-center px-6 md:px-12 lg:px-20 pt-40 pb-20"
          style={{ perspective: "1400px" }}
        >
          <div className="mx-auto grid w-full max-w-7xl grid-cols-1 gap-12 lg:grid-cols-2 items-center">
            
            {/* Left Content Panel */}
            <motion.div 
              variants={{leftPanelVariants}}
              className="flex flex-col justify-center items-start relative p-4"
              style={{ transformStyle: "preserve-3d" }}
            >
              <div className="mb-6 inline-flex items-center gap-2 border border-blue-200 bg-blue-50/50 px-4 py-2 text-xs font-bold tracking-widest text-blue-700 backdrop-blur-md rounded-full shadow-sm">
                <span className="w-2 h-2 rounded-full bg-blue-500 animate-pulse shadow-[0_0_8px_rgba(59,130,246,0.6)]" />
                Apex Management <span className="text-blue-500/80">v1.0</span>
              </div>

              <h1 className="max-w-xl text-5xl font-black leading-[1.1] md:text-6xl lg:text-7xl text-zinc-900 tracking-tight drop-shadow-sm">
                The Ultimate <br />
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-600 via-indigo-500 to-purple-500">Offline-First Terminal.</span>
              </h1>

              <p className="mt-6 max-w-lg text-lg leading-relaxed text-zinc-600 font-medium drop-shadow-sm">
                Take total control of your retail operations. Built for unparalleled speed, 
                absolute reliability, and seamless accountant collaboration—no cloud dependency required.
              </p>

              <div className="mt-10 flex flex-wrap gap-4">
                <button 
                  onClick={handleOpenModal}
                  className="rounded-xl cursor-pointer bg-gradient-to-r from-blue-600 to-indigo-600 border border-transparent px-8 py-4 text-sm text-white font-bold tracking-wider transition-all duration-300 hover:from-blue-500 hover:to-indigo-500 hover:scale-[1.02] active:scale-95 shadow-lg shadow-blue-500/25 flex items-center gap-2"
                >
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4" />
                  </svg>
                  Download .RAR
                </button>
                <a 
                  href="#features"
                  className="rounded-xl border cursor-pointer border-zinc-200 bg-white px-8 py-4 text-sm text-zinc-700 font-bold tracking-wider transition-all duration-300 hover:text-zinc-900 hover:bg-zinc-50 hover:border-zinc-300 hover:shadow-md hover:scale-[1.02] active:scale-95"
                >
                  Explore Features
                </a>
              </div>
            </motion.div>

            {/* Right Panel Device Mockup */}
            <motion.div
              variants={{rightPanelVariants}}
              className="md:absolute relative md:w-[50%] right-[-10px] aspect-4/3 lg:aspect-auto lg:h-[80%]"
            >
              <DeviceMockup 
                laptopSrc="/dashboard.png" 
                mobileSrc="/mobile.jpeg"
                laptopAlt="ApexManagement Desktop Dashboard"
                mobileAlt="ApexManagement Mobile Companion"
              />
            </motion.div>

          </div>
        </motion.div>
      </section>

      {/* Features Section */}
      <section id="features" className="py-24 bg-zinc-50 relative">
        <div className="max-w-7xl mx-auto px-6 md:px-12 lg:px-20">
          <div className="text-center mb-20">
            <h2 className="text-4xl md:text-5xl font-black text-zinc-900 mb-6">Engineered for Dominance</h2>
            <p className="text-lg text-zinc-600 max-w-2xl mx-auto font-medium">
              Everything you need to run your storefront without the massive monthly cloud subscription fees. 
              Built with precision software engineering.
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {features.map((feature, idx) => (
              <motion.div 
                key={idx}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: idx * 0.1 }}
                className="bg-white p-10 rounded-3xl border border-zinc-200 shadow-sm hover:shadow-xl hover:border-blue-200 transition-all duration-300 group"
              >
                <div className="text-4xl mb-6 bg-blue-50 text-blue-600 w-16 h-16 flex items-center justify-center rounded-2xl group-hover:scale-110 group-hover:bg-blue-600 group-hover:text-white transition-all duration-300">
                  {feature.icon}
                </div>
                <h3 className="text-2xl font-bold text-zinc-900 mb-4">{feature.title}</h3>
                <p className="text-zinc-600 leading-relaxed font-medium">{feature.description}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Subscription / Pricing Section */}
      <PricingSection />

      {/* Bottom CTA */}
      <section className="py-24 bg-white relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-b from-transparent to-blue-50/50 pointer-events-none" />
        <div className="max-w-4xl mx-auto px-6 text-center relative z-10">
          <h2 className="text-4xl md:text-5xl font-black text-zinc-900 mb-8">Ready to upgrade your business?</h2>
          <p className="text-xl text-zinc-600 mb-10 font-medium">
            Join the revolution of offline-first retail management. No setup, no servers, absolute power.
          </p>
          <button 
            onClick={handleOpenModal}
            className="inline-flex rounded-xl cursor-pointer bg-gradient-to-r from-blue-600 to-indigo-600 border border-transparent px-12 py-5 text-lg text-white font-bold tracking-wide transition-all duration-300 hover:from-blue-500 hover:to-indigo-500 hover:scale-[1.02] shadow-[0_0_40px_rgba(59,130,246,0.4)]"
          >
            Get ApexManagement Now
          </button>
        </div>
      </section>

      <Footer />

      {/* Lead Capture Modal */}
      <AnimatePresence>
        {isModalOpen && (
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-zinc-900/40 backdrop-blur-sm"
          >
            <motion.div 
              initial={{ scale: 0.95, y: 20 }}
              animate={{ scale: 1, y: 0 }}
              exit={{ scale: 0.95, y: 20 }}
              className="bg-white rounded-2xl shadow-2xl w-full max-w-md overflow-hidden"
            >
              <div className="flex justify-between items-center p-6 border-b border-zinc-100">
                <h3 className="text-xl font-bold text-zinc-900">Download ApexManagement</h3>
                <button onClick={() => setIsModalOpen(false)} className="text-zinc-400 hover:text-zinc-700 transition">
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" /></svg>
                </button>
              </div>

              {downloadStatus === 'success' ? (
                <div className="p-10 text-center flex flex-col items-center">
                  <div className="w-16 h-16 bg-emerald-100 rounded-full flex items-center justify-center text-emerald-600 mb-4">
                    <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" /></svg>
                  </div>
                  <h4 className="text-2xl font-bold text-zinc-900 mb-2">Download Started!</h4>
                  <p className="text-zinc-600">Your .rar file is downloading. You can close this window.</p>
                </div>
              ) : (
                <form onSubmit={handleDownloadSubmit} className="p-6 space-y-4">
                  <p className="text-sm text-zinc-600 mb-4">Please tell us a bit about yourself before downloading.</p>
                  
                  <div>
                    <label className="block text-[10px] font-mono uppercase tracking-wider text-zinc-500 mb-1">Full Name *</label>
                    <input 
                      type="text" required
                      value={formData.name} onChange={e => setFormData({...formData, name: e.target.value})}
                      className="w-full border border-zinc-200 rounded-lg px-4 py-2 text-sm focus:outline-none focus:border-blue-500 text-zinc-900"
                      placeholder="John Doe"
                    />
                  </div>
                  <div>
                    <label className="block text-[10px] font-mono uppercase tracking-wider text-zinc-500 mb-1">Email Address *</label>
                    <input 
                      type="email" required
                      value={formData.email} onChange={e => setFormData({...formData, email: e.target.value})}
                      className="w-full border border-zinc-200 rounded-lg px-4 py-2 text-sm focus:outline-none focus:border-blue-500 text-zinc-900"
                      placeholder="john@company.com"
                    />
                  </div>
                  <div>
                    <label className="block text-[10px] font-mono uppercase tracking-wider text-zinc-500 mb-1">Mobile Number</label>
                    <input 
                      type="tel"
                      value={formData.mobile} onChange={e => setFormData({...formData, mobile: e.target.value})}
                      className="w-full border border-zinc-200 rounded-lg px-4 py-2 text-sm focus:outline-none focus:border-blue-500 text-zinc-900"
                      placeholder="+91 98765 43210"
                    />
                  </div>
                  <div>
                    <label className="block text-[10px] font-mono uppercase tracking-wider text-zinc-500 mb-1">Business Name</label>
                    <input 
                      type="text"
                      value={formData.business} onChange={e => setFormData({...formData, business: e.target.value})}
                      className="w-full border border-zinc-200 rounded-lg px-4 py-2 text-sm focus:outline-none focus:border-blue-500 text-zinc-900"
                      placeholder="Acme Corp"
                    />
                  </div>
                  
                  <button 
                    type="submit" 
                    disabled={downloadStatus === 'loading'}
                    className="w-full mt-4 bg-blue-600 hover:bg-blue-500 text-white font-bold py-3 rounded-lg transition disabled:opacity-70 flex justify-center items-center gap-2"
                  >
                    {downloadStatus === 'loading' ? (
                      <><svg className="animate-spin h-4 w-4 text-white" fill="none" viewBox="0 0 24 24"><circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle><path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path></svg> Preparing...</>
                    ) : 'Start Download'}
                  </button>
                </form>
              )}
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </main>
  );
}

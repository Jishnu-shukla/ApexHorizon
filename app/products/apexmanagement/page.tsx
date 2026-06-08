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
import { VerifyEmail } from '@/components/modals/VerifyEmail';
import { VerifyBusiness } from '@/components/modals/VerifyBusiness';

export default function ApexManagementProductPage() {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isVerifyModalOpen, setIsVerifyModalOpen] = useState(false);
  const [verifyStatus, setVerifyStatus] = useState<'idle' | 'loading' | 'success' | 'error'>('idle');

  const handleOpenModal = (e: React.MouseEvent) => {
    e.preventDefault();
    setIsModalOpen(true);
  };

  const handleOpenVerifyModal = (e: React.MouseEvent) => {
    e.preventDefault();
    setIsVerifyModalOpen(true);
    setVerifyStatus('idle');
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
                <br /><br />
                Apex Management is our flagship comprehensive business suite. It seamlessly integrates GST invoice generation, dynamic inventory tracking, local ledger exports, and native WhatsApp API communication into a single portable, offline-first executable. Just absolute power.
              </p>

              <div className="mt-10 flex flex-wrap gap-4">
                <button 
                  onClick={handleOpenModal}
                  className="rounded-xl cursor-pointer bg-gradient-to-r from-emerald-500 to-teal-600 border border-transparent px-8 py-4 text-sm text-white font-bold tracking-wider transition-all duration-300 hover:from-emerald-400 hover:to-teal-500 hover:scale-[1.02] active:scale-95 shadow-lg shadow-emerald-500/25 flex items-center gap-2"
                >
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>
                  Verify Business
                </button>
                <button 
                  onClick={handleOpenVerifyModal}
                  className="rounded-xl cursor-pointer bg-gradient-to-r from-blue-600 to-indigo-600 border border-transparent px-8 py-4 text-sm text-white font-bold tracking-wider transition-all duration-300 hover:from-blue-500 hover:to-indigo-500 hover:scale-[1.02] active:scale-95 shadow-lg shadow-blue-500/25 flex items-center gap-2"
                >
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4" />
                  </svg>
                  Download .RAR
                </button>
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
          <div className="flex justify-center gap-4 flex-wrap">
            <button 
              onClick={handleOpenVerifyModal}
              className="inline-flex rounded-xl cursor-pointer bg-gradient-to-r from-emerald-500 to-teal-600 border border-transparent px-12 py-5 text-lg text-white font-bold tracking-wide transition-all duration-300 hover:from-emerald-400 hover:to-teal-500 hover:scale-[1.02] shadow-[0_0_40px_rgba(16,185,129,0.4)]"
            >
              Verify Business
            </button>
            <button 
              onClick={handleOpenModal}
              className="inline-flex rounded-xl cursor-pointer bg-gradient-to-r from-blue-600 to-indigo-600 border border-transparent px-12 py-5 text-lg text-white font-bold tracking-wide transition-all duration-300 hover:from-blue-500 hover:to-indigo-500 hover:scale-[1.02] shadow-[0_0_40px_rgba(59,130,246,0.4)]"
            >
              Get ApexManagement Now
            </button>
          </div>
        </div>
      </section>

      <Footer />

      {/* Lead Capture Modal */}
      <AnimatePresence>
        {isModalOpen && <VerifyBusiness setIsModalOpen={setIsModalOpen} />}
      </AnimatePresence>

      {/* Verify Business Modal */}
      <AnimatePresence>
        {isVerifyModalOpen && <VerifyEmail setIsVerifyModalOpen={setIsVerifyModalOpen} verifyStatus={verifyStatus} setVerifyStatus={setVerifyStatus} />}
      </AnimatePresence>
    </main>
  );
}

'use client';

import React from 'react';
import { motion } from 'framer-motion';
import Link from 'next/link';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';

export default function NotFound() {
  return (
    <main>
      <section className="relative min-h-screen w-full flex flex-col justify-between overflow-hidden bg-background text-foreground font-sans">
        <Navbar />

        {/* 404 Content */}
        <div className="flex-1 flex flex-col items-center justify-center px-6 relative z-10 my-20">
          <motion.div 
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.5 }}
            className="text-center"
          >
            {/* Glitch-style Error Code */}
            <h1 className="text-8xl md:text-9xl font-black tracking-tighter mb-4 text-transparent bg-clip-text bg-gradient-to-r from-blue-600 via-indigo-500 to-purple-500 drop-shadow-sm">
              404
            </h1>
            
            <h2 className="text-3xl md:text-4xl font-bold text-zinc-900 mb-6">
              System offline or path unresolved.
            </h2>
            
            <p className="text-lg text-zinc-600 mb-10 max-w-lg mx-auto font-medium leading-relaxed">
              The endpoint you are trying to reach doesn't exist within the Apex Horizon network. It might have been moved, deleted, or never existed.
            </p>

            <Link 
              href="/"
              className="inline-flex rounded-xl cursor-pointer bg-gradient-to-r from-blue-600 to-indigo-600 border border-transparent px-10 py-4 text-sm text-white font-bold tracking-wider uppercase transition-all duration-300 hover:from-blue-500 hover:to-indigo-500 hover:scale-[1.02] active:scale-95 shadow-lg shadow-blue-500/25 flex items-center justify-center gap-2 mx-auto w-fit"
            >
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 19l-7-7m0 0l7-7m-7 7h18" />
              </svg>
              Return to Dashboard
            </Link>
          </motion.div>
        </div>

        {/* Decorative Grid Background */}
        <div
          className="absolute inset-0 opacity-[0.03] pointer-events-none z-0"
          style={{
            backgroundImage: `
              linear-gradient(rgba(0,0,0,0.1) 1px, transparent 1px),
              linear-gradient(90deg, rgba(0,0,0,0.1) 1px, transparent 1px)
            `,
            backgroundSize: "60px 60px",
          }}
        />

        <Footer />
      </section>
    </main>
  );
}

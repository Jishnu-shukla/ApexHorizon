'use client';

import React from 'react';
import { motion } from 'framer-motion';
import Link from 'next/link';
import Image from 'next/image';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';

const products = [
  {
    id: 'apex-management',
    title: 'Apex Management',
    description: 'The ultimate offline-first retail and billing terminal. Manage inventory, generate GST invoices, and dispatch WhatsApp receipts directly from a native executable.',
    icon: '/apexmanagement.png',
    link: '/products/ApexManagement',
    status: 'Live',
    gradient: 'from-blue-600 to-indigo-600',
    tags: ['Desktop Application', 'Offline First', 'Billing']
  },
  {
    id: 'email-nexus',
    title: 'Email Nexus',
    description: 'Next-generation intelligent email routing and customer support aggregation system designed specifically for high-volume enterprise queues.',
    icon: '/emailnexus.png',
    link: '#',
    status: 'Coming Soon',
    gradient: 'from-amber-500 to-orange-600',
    tags: ['Enterprise', 'AI Routing', 'Support']
  }
];

export default function ProductsPage() {
  return (
    <main className="min-h-screen bg-background text-foreground font-sans flex flex-col selection:bg-blue-200">
      <Navbar />

      <section className="relative pt-32 pb-20 px-6 md:px-12 lg:px-20 overflow-hidden flex-1">
        
        {/* Background Grid Pattern */}
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

        <div className="max-w-7xl mx-auto relative z-10">
          
          {/* Header */}
          <div className="text-center max-w-3xl mx-auto mb-20">
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              className="inline-flex items-center gap-2 mb-4 text-xs font-mono tracking-widest text-blue-600 uppercase bg-blue-50 border border-blue-100 px-4 py-2 rounded-full"
            >
              <span className="w-2 h-2 rounded-full bg-blue-500 animate-pulse" />
              Software Ecosystem
            </motion.div>
            
            <motion.h1 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.1 }}
              className="text-5xl md:text-6xl font-black tracking-tight mb-6 text-zinc-900"
            >
              Our Product Suite
            </motion.h1>
            
            <motion.p 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.2 }}
              className="text-xl text-zinc-600 font-medium"
            >
              Discover our engineered solutions designed to automate workflows, manage retail operations, and scale your business operations natively.
            </motion.p>
          </div>

          {/* Products Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {products.map((product, idx) => (
              <motion.div
                key={product.id}
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.3 + (idx * 0.1) }}
                className="group relative"
              >
                {/* Card Container */}
                <div className="h-full bg-white rounded-3xl border border-zinc-200 p-8 shadow-sm transition-all duration-300 hover:shadow-2xl hover:-translate-y-2 flex flex-col">
                  
                  {/* Icon & Status Banner */}
                  <div className="flex justify-between items-start mb-8">
                    <div className={`w-16 h-16 rounded-2xl flex items-center justify-center text-3xl shadow-inner bg-gradient-to-br text-white group-hover:scale-110 transition-transform duration-300`}>
                      <Image src={product.icon} alt={product.title} width={74} height={74} className='rounded-2xl' />
                    </div>
                    {product.status === 'Coming Soon' ? (
                      <span className="px-3 py-1 rounded-full bg-amber-50 text-amber-700 text-xs font-bold tracking-wider uppercase border border-amber-200">
                        {product.status}
                      </span>
                    ) : (
                      <span className="px-3 py-1 rounded-full bg-blue-50 text-blue-700 text-xs font-bold tracking-wider uppercase border border-blue-200">
                        {product.status}
                      </span>
                    )}
                  </div>

                  {/* Content */}
                  <h3 className="text-2xl font-bold text-zinc-900 mb-3 group-hover:text-blue-600 transition-colors">
                    {product.title}
                  </h3>
                  <p className="text-zinc-600 leading-relaxed font-medium mb-8 flex-1">
                    {product.description}
                  </p>

                  {/* Tags */}
                  <div className="flex flex-wrap gap-2 mb-8">
                    {product.tags.map(tag => (
                      <span key={tag} className="px-2 py-1 bg-zinc-100 text-zinc-600 text-[10px] uppercase tracking-wider font-bold rounded-md">
                        {tag}
                      </span>
                    ))}
                  </div>

                  {/* Action Link */}
                  {product.link !== '#' ? (
                    <Link 
                      href={product.link}
                      className="inline-flex items-center gap-2 text-sm font-bold text-blue-600 group-hover:gap-3 transition-all"
                    >
                      Explore Product 
                      <span className="text-blue-600 group-hover:translate-x-1 transition-transform">→</span>
                    </Link>
                  ) : (
                    <span className="inline-flex items-center gap-2 text-sm font-bold text-zinc-400 cursor-not-allowed">
                      In Development
                    </span>
                  )}
                  
                </div>
              </motion.div>
            ))}
          </div>

        </div>
      </section>

      <Footer />
    </main>
  );
}

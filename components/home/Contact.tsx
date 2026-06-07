"use client";

import React, { useState } from "react";
import { motion } from "framer-motion";
import { ToastContainer, toast } from 'react-toastify';
import { send } from "process";

export default function ContactSection() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    interest: "",
    message: "",
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async(e: React.FormEvent) => {
    e.preventDefault();

    if(!formData.email || formData.interest == "") {
      toast("Email and Interest are required!", { type: 'error' });
      return;
    }

    setLoading(true);

    try {
      const res = await fetch("/api/query", {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(formData)
      });

      if(res.ok) {
        toast("Successfully saved your query!", { type: 'success' });
        setFormData({ name: "", email: "", interest: "", message: "" });
      } else {
        toast("Failed to send message.", { type: 'error' });
      }
    } catch (error) {
      toast("Please try again later!", { type: 'error' });
    } finally {
      setLoading(false);
    }
  };

  const panelVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.8, ease: [0.16, 1, 0.3, 1] },
    },
  };

  return (
    <section id="contact" className="relative w-full bg-zinc-50 border-t border-zinc-200 text-zinc-900 py-24 px-6 md:px-12 lg:px-20 overflow-hidden font-sans">
      <ToastContainer />
      
      {/* Background Matrix Grid Alignment */}
      <div
        className="absolute inset-0 opacity-[0.05] pointer-events-none z-0"
        style={{
          backgroundImage: `
            linear-gradient(rgba(0,0,0,0.1) 1px, transparent 1px),
            linear-gradient(90deg, rgba(0,0,0,0.1) 1px, transparent 1px)
          `,
          backgroundSize: "60px 60px",
        }}
      />

      <div className="mx-auto max-w-7xl relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-16 items-start">
          
          {/* ================= LEFT SIDE: META INFO ================= */}
          <div className="lg:col-span-5 space-y-12">
            <div className="flex flex-col items-start">
              <div className="inline-flex items-center gap-2 mb-4 text-xs font-mono tracking-widest text-blue-400 uppercase">
                <span className="w-3 h-[1px] bg-blue-500" /> Contact
              </div>
              <h2 className="text-4xl md:text-5xl lg:text-6xl font-black tracking-tight leading-none text-zinc-900">
                Let's build <br />
                something real.
              </h2>
              <p className="mt-6 text-sm md:text-base text-zinc-600 max-w-sm leading-relaxed font-light">
                Tell us what you need — a product subscription, a client website, or something custom. We'll get back to you fast.
              </p>
            </div>

            {/* Metadata Rows Stack */}
            <div className="space-y-6 border-t border-zinc-200 pt-8">
              
              {/* Row 1: Email */}
              <div className="flex items-center gap-4 group">
                <div className="w-10 h-10 rounded-lg border border-zinc-200 bg-white flex items-center justify-center transition-colors group-hover:border-blue-200 group-hover:bg-blue-50">
                  <svg className="w-4 h-4 text-blue-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                  </svg>
                </div>
                <div>
                  <span className="block text-[10px] font-mono uppercase tracking-widest text-zinc-500">Email</span>
                  <a href="mailto:jayjoshi1912007@gmail.com" className="text-sm font-medium text-zinc-800 hover:text-blue-600 transition-colors">
                    jayjoshi1912007@gmail.com
                  </a>
                </div>
              </div>

              {/* Row 2: Location */}
              <div className="flex items-center gap-4 group">
                <div className="w-10 h-10 rounded-lg border border-zinc-200 bg-white flex items-center justify-center transition-colors group-hover:border-blue-200 group-hover:bg-blue-50">
                  <svg className="w-4 h-4 text-blue-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                  </svg>
                </div>
                <div>
                  <span className="block text-[10px] font-mono uppercase tracking-widest text-zinc-500">Location</span>
                  <span className="text-sm font-medium text-zinc-800">
                    Rajkot, Gujarat, India
                  </span>
                </div>
              </div>

              {/* Row 3: Response Time */}
              <div className="flex items-center gap-4 group">
                <div className="w-10 h-10 rounded-lg border border-zinc-200 bg-white flex items-center justify-center transition-colors group-hover:border-blue-200 group-hover:bg-blue-50">
                  <svg className="w-4 h-4 text-blue-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                </div>
                <div>
                  <span className="block text-[10px] font-mono uppercase tracking-widest text-zinc-500">Response Time</span>
                  <span className="text-sm font-medium text-zinc-800">
                    Within 24 hours
                  </span>
                </div>
              </div>

            </div>
          </div>

          {/* ================= RIGHT SIDE: MATRIX INQUIRY FORM ================= */}
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-100px" }}
            variants={{panelVariants}}
            className="lg:col-span-7 w-full border border-zinc-200 bg-white rounded-xl backdrop-blur-2xl overflow-hidden shadow-lg relative"
          >
            {/* Top glass reflection highlight */}
            <div className="absolute inset-x-0 top-0 h-[1px] bg-gradient-to-r from-transparent via-zinc-200 to-transparent pointer-events-none" />

            <form onSubmit={handleSubmit} className="flex flex-col">
              
              {/* Row 1: Name and Email */}
              <div className="grid grid-cols-1 md:grid-cols-2 border-b border-zinc-200">
                <div className="p-6 flex flex-col gap-1 border-b md:border-b-0 md:border-r border-zinc-200">
                  <label htmlFor="name" className="text-[10px] font-mono uppercase tracking-wider text-zinc-500">Name</label>
                  <input
                    type="text"
                    id="name"
                    name="name"
                    value={formData.name}
                    onChange={handleInputChange}
                    placeholder="Your name"
                    required
                    className="bg-transparent text-sm text-zinc-900 placeholder-zinc-400 focus:outline-none py-1 mt-1 font-light tracking-wide w-full"
                  />
                </div>
                <div className="p-6 flex flex-col gap-1">
                  <label htmlFor="email" className="text-[10px] font-mono uppercase tracking-wider text-zinc-500">Email</label>
                  <input
                    type="email"
                    id="email"
                    name="email"
                    value={formData.email}
                    onChange={handleInputChange}
                    placeholder="you@company.com"
                    required
                    className="bg-transparent text-sm text-zinc-900 placeholder-zinc-400 focus:outline-none py-1 mt-1 font-light tracking-wide w-full"
                  />
                </div>
              </div>

              {/* Row 2: Select Interest Custom Component */}
              <div className="p-6 flex flex-col gap-1 border-b border-zinc-200 relative group">
                <label htmlFor="interest" className="text-[10px] font-mono uppercase tracking-wider text-zinc-500">Interested In</label>
                <div className="relative flex items-center mt-1">
                  <select
                    id="interest"
                    name="interest"
                    value={formData.interest}
                    onChange={handleInputChange}
                    required
                    className="bg-transparent text-sm text-zinc-900 focus:outline-none py-1 tracking-wide w-full appearance-none cursor-pointer font-light"
                  >
                    <option value="" disabled className="bg-white text-zinc-400">Select...</option>
                    <option value="website" className="bg-white text-zinc-800">Custom Website Design</option>
                    <option value="saas" className="bg-white text-zinc-800">SaaS Engineering</option>
                    <option value="automation" className="bg-white text-zinc-800">Automation & Bots</option>
                    <option value="api" className="bg-white text-zinc-800">API Integration Systems</option>
                    <option value="other" className="bg-white text-zinc-800">Other</option>
                  </select>
                  <div className="absolute right-0 pointer-events-none text-zinc-400 group-hover:text-zinc-600 transition-colors">
                    <svg className="w-3 h-3" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                    </svg>
                  </div>
                </div>
              </div>

              {/* Row 3: Message Textarea */}
              <div className="p-6 flex flex-col gap-1 min-h-[160px]">
                <label htmlFor="message" className="text-[10px] font-mono uppercase tracking-wider text-zinc-500">Message</label>
                <textarea
                  id="message"
                  name="message"
                  value={formData.message}
                  onChange={handleInputChange}
                  placeholder="Tell us about your business and what you're trying to build..."
                  required
                  rows={4}
                  className="bg-transparent text-sm text-zinc-900 placeholder-zinc-400 focus:outline-none py-1 mt-1 font-light tracking-wide w-full resize-none leading-relaxed"
                />
              </div>

              {/* Action Submit Banner */}
              <button
                type="submit"
                disabled={loading}
                className="w-full bg-blue-600 hover:bg-blue-500 text-white font-bold text-sm py-5 tracking-wide transition-all duration-200 flex items-center justify-center gap-2 group shadow-lg shadow-blue-600/10 active:scale-[0.995] disabled:opacity-75 disabled:cursor-not-allowed"
              >
                {loading ? (
                  <span className="flex items-center gap-2">
                    <svg className="animate-spin -ml-1 mr-2 h-4 w-4 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                      <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                      <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                    </svg>
                    Sending...
                  </span>
                ) : (
                  <>
                    Send Message 
                    <span className="transform transition-transform duration-200 group-hover:translate-x-1">→</span>
                  </>
                )}
              </button>

            </form>
          </motion.div>

        </div>
      </div>
    </section>
  );
}
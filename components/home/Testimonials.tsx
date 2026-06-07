"use client";

import React from "react";
import { motion } from "framer-motion";

export default function TestimonialsSection() {
  const cardVariants = {
    hidden: { opacity: 0, y: 35, scale: 0.98 },
    visible: { 
      opacity: 1, 
      y: 0,
      scale: 1,
      transition: { duration: 0.8, ease: [0.16, 1, 0.3, 1] }
    }
  };

  return (
    <section id="testimonials" className="relative w-full bg-zinc-50 border-t border-zinc-200 text-zinc-900 py-24 px-6 md:px-12 lg:px-20 overflow-hidden font-sans">
      
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
        
        {/* Section Heading */}
        <div className="flex flex-col items-start mb-16">
          <div className="inline-flex items-center gap-2 mb-4 text-xs font-mono tracking-widest text-blue-400 uppercase">
            <span className="w-3 h-[1px] bg-blue-500" /> Testimonials
          </div>
          
          <h2 className="text-4xl md:text-5xl lg:text-6xl font-black tracking-tight leading-none text-zinc-900">
            What our clients say.
          </h2>
          
          <p className="mt-4 text-sm md:text-base text-zinc-600 max-w-xl leading-relaxed font-light">
            Feedback from partners who demand the same engineering standards we apply to our own builds.
          </p>
        </div>

        {/* Testimonial Quote Panel Layout */}
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-80px" }}
          variants={{cardVariants}}
          className="w-full border border-zinc-200 bg-white rounded-xl p-8 md:p-12 backdrop-blur-2xl relative shadow-md group transition-all duration-300 hover:border-zinc-300"
        >
          {/* Subtle Top Inner Edge Specular Sheen */}
          <div className="absolute inset-x-0 top-0 h-[1px] bg-gradient-to-r from-transparent via-zinc-200 to-transparent pointer-events-none" />
          
          <div className="flex items-start gap-6 md:gap-8">
            {/* Structural Custom Quote Icon */}
            <span className="text-2xl md:text-3xl font-serif text-blue-500/70 font-bold select-none leading-none">
              &ldquo;
            </span>

            {/* Testimonial Core Copy Block */}
            <div className="space-y-6 md:space-y-8 flex-1">
              <p className="text-base md:text-lg lg:text-xl text-zinc-800 leading-relaxed font-light italic tracking-wide drop-shadow-sm">
                An incredible partner from start to finish. They designed my company website and the process was seamless. The team was communicative, efficient, and the final product exceeded my expectations.
              </p>

              {/* Attribution Meta Data */}
              <div className="flex items-center gap-2 text-xs md:text-sm">
                <h4 className="font-bold tracking-wide text-zinc-900">
                  Abhay Vaghela
                </h4>
                <span className="text-zinc-400 font-mono">//</span>
                <p className="text-zinc-500 font-normal">
                  AB's Film Studio
                </p>
              </div>
            </div>
          </div>
        </motion.div>

      </div>
    </section>
  );
}
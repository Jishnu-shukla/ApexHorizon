"use client";

import React from "react";
import { motion } from "framer-motion";

export default function ServicesSection() {
  const serviceList = [
    {
      id: "01",
      title: "Custom Websites",
      description: "Professional sites for businesses, brands & portfolios",
    },
    {
      id: "02",
      title: "SaaS Development",
      description: "End-to-end product engineering — schema to billing",
    },
    {
      id: "03",
      title: "Automation & Bots",
      description: "WhatsApp bots, email workflows, tool integrations",
    },
    {
      id: "04",
      title: "API Integrations",
      description: "Connect your existing tools, eliminate duplicate work",
    },
  ];

  const listContainerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { staggerChildren: 0.1, delayChildren: 0.2 },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.6, ease: [0.16, 1, 0.3, 1] },
    },
  };

  return (
    <section id="services" className="relative w-full bg-zinc-50 border-t border-zinc-200 text-zinc-900 py-24 px-6 md:px-12 lg:px-20 overflow-hidden font-sans">
      
      {/* Background Matrix Grid */}
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
          
          {/* LEFT COLUMN: Section Branding (Sticky Context) */}
          <div className="lg:col-span-5 flex flex-col justify-center">
            <div className="inline-flex items-center gap-2 mb-4 text-xs font-mono tracking-widest text-blue-400 uppercase">
              <span className="w-3 h-[1px] bg-blue-500" /> Services
            </div>
            
            <h2 className="text-4xl md:text-5xl lg:text-6xl font-black tracking-tight leading-none text-zinc-900">
              We also build <br />
              <span className="text-zinc-500">for clients.</span>
            </h2>
            
            <p className="mt-6 text-sm md:text-base text-zinc-600 max-w-sm leading-relaxed font-light">
              Select client projects, done with the same engineering standard as our own products.
            </p>
          </div>

          {/* RIGHT COLUMN: Service Stack Interface Block */}
          <motion.div 
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-100px" }}
            variants={listContainerVariants}
            className="lg:col-span-7 w-full border border-zinc-200 bg-white rounded-xl backdrop-blur-2xl overflow-hidden shadow-lg"
          >
            {/* Inner top specular line */}
            <div className="absolute inset-x-0 top-0 h-[1px] bg-gradient-to-r from-transparent via-zinc-200 to-transparent pointer-events-none" />

            {serviceList.map((service, index) => (
              <motion.a
                key={service.id}
                href="#contact"
                variants={{itemVariants}}
                whileHover="hover"
                className={`group relative flex items-start gap-8 p-8 border-b border-zinc-200 last:border-0 cursor-pointer transition-colors duration-300 hover:bg-zinc-50`}
              >
                {/* Active Hover Glow Accent Effect */}
                <div className="absolute left-0 inset-y-0 w-[2px] bg-blue-500 scale-y-0 group-hover:scale-y-100 transition-transform duration-300 origin-center" />

                {/* Service Serial Index */}
                <motion.span 
                  variants={{
                    hover: { x: 4, color: "#3b82f6" }
                  }}
                  transition={{ duration: 0.2 }}
                  className="text-xs font-mono text-stone-600 tracking-wider pt-1.5 min-w-[40px]"
                >
                  // {service.id}
                </motion.span>

                {/* Service Meta Details */}
                <div className="space-y-2">
                  <h3 className="text-lg font-bold tracking-tight text-zinc-900 transition-colors duration-300 group-hover:text-blue-600">
                    {service.title}
                  </h3>
                  <p className="text-sm text-zinc-600 leading-relaxed font-light max-w-xl">
                    {service.description}
                  </p>
                </div>
              </motion.a>
            ))}
          </motion.div>

        </div>
      </div>
    </section>
  );
}
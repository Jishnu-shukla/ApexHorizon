import { motion } from "framer-motion";
import { useRef } from "react";
import Image from "next/image"
import { cardVariants } from "@/constants/variants";

export default function Products() {
  const chatContainerRef = useRef<HTMLDivElement>(null);

  return (
    <section  id="products" className="relative w-full bg-background border-t border-zinc-200 text-foreground py-24 px-6 md:px-12 lg:px-20 overflow-hidden font-sans">
      
      {/* Structural Precision Background Grid Alignment */}
      <div
        className="absolute inset-0 opacity-[0.03] pointer-events-none z-0"
        style={{
          backgroundImage: `
            linear-gradient(rgba(59,130,246,0.3) 1px, transparent 1px),
            linear-gradient(90deg, rgba(59,130,246,0.3) 1px, transparent 1px)
          `,
          backgroundSize: "60px 60px",
        }}
      />
      <div className="absolute top-0 left-1/4 w-[500px] h-[500px] bg-blue-500/10 rounded-full blur-[100px] -translate-y-1/2 pointer-events-none" />

      <div className="mx-auto max-w-7xl relative z-10">
        
        {/* Section Header Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 border-b border-zinc-200 pb-16 items-end">
          <div>
            <div className="inline-flex items-center gap-2 mb-4 text-xs font-mono tracking-widest text-blue-400 uppercase">
              <span className="w-3 h-[1px] bg-blue-500" /> Products
            </div>
            <h2 className="text-4xl md:text-5xl lg:text-6xl font-black tracking-tight leading-none text-zinc-900 drop-shadow-sm">
              Two products. <br />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-purple-600">Real problems solved.</span>
            </h2>
          </div>
          <div>
            <p className="text-sm md:text-base text-zinc-600 max-w-lg leading-relaxed font-light">
              Both built on subscription models, designed to automate the work that wastes your team's time every day.
            </p>
          </div>
        </div>

        {/* Two-Column Product Matrix */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 pt-16">
          
          {/* ================= PRODUCT 01: WHATSAPP INVENTORY MANAGER ================= */}
          <motion.div 
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-100px" }}
            variants={{cardVariants}}
            className="flex flex-col justify-between"
          >
            <div className="space-y-6">
              <span className="text-[10px] font-mono tracking-widest text-stone-500 uppercase">// PRODUCT // 01</span>
              <h3 className="text-2xl md:text-3xl font-extrabold tracking-tight text-zinc-900">
                WhatsApp Inventory Manager
              </h3>
              <p className="text-sm text-zinc-600 leading-relaxed font-light max-w-xl">
                Your inventory database, connected directly to WhatsApp. Check stock, update quantities, get low-stock alerts — all through a simple chat. No dashboards, no training needed.
              </p>
              
              {/* Tech Spec Badges */}
              <div className="flex flex-wrap gap-2 pt-2">
                {["WhatsApp API", "Real-time DB", "Multi-user", "Alerts", "REST API"].map((tag, idx) => (
                  <span 
                    key={tag} 
                    className={`text-[10px] font-mono px-2.5 py-1 rounded border ${
                      idx === 0 || idx === 1 
                        ? "border-blue-500/30 bg-blue-50/50 text-blue-600" 
                        : "border-zinc-200 bg-zinc-50/50 text-zinc-500"
                    }`}
                  >
                    {tag}
                  </span>
                ))}
              </div>
            </div>

            {/* Interactive WhatsApp Interface Card */}
            <div id="simulator" className="lg:col-span-5 flex flex-col gap-6 mt-10">
            <div className="w-full max-w-[380px] mx-auto rounded-[36px] border-[8px] border-white ring-1 ring-zinc-200 bg-[#075E54] overflow-hidden shadow-[0_30px_60px_-15px_rgba(0,0,0,0.15)] relative flex flex-col h-[520px]">

              {/* WhatsApp App Header */}
              <div className="bg-[#075E54] py-3.5 px-4 flex items-center justify-between text-white border-b border-[#128C7E]/40 shrink-0">
                <div className="flex items-center gap-2.5">
                  <div className="relative">
                    <div className="w-10 h-10 bg-gray-100 rounded-full flex items-center justify-center text-emerald-950 font-bold text-sm shadow">
                      <Image src={'/logo.png'} width={90} height={90} alt="Logo" />
                    </div>
                    <span className="absolute bottom-0 right-0 w-2.5 h-2.5 rounded-full bg-emerald-400 border border-[#075E54]" />
                  </div>
                  <div>
                    <h4 className="font-bold text-sm tracking-wide">Nexus Assistant</h4>
                    <span className="text-[10px] text-emerald-100 font-medium">AI Agent • Online</span>
                  </div>
                </div>
                <div className="flex items-center gap-3 opacity-80">
                  {/* Phone Icon */}
                  <svg xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 24 24" className="w-4 h-4">
                    <path d="M1.5 4.5a3 3 0 0 1 3-3h1.372c.86 0 1.61.586 1.819 1.42l1.105 4.423a1.875 1.875 0 0 1-.506 1.83l-2.24 2.24a15.562 15.562 0 0 0 6.59 6.59l2.24-2.24a1.875 1.875 0 0 1 1.83-.506l4.423 1.105a1.875 1.875 0 0 1 1.42 1.819V19.5a3 3 0 0 1-3 3h-2.25C8.552 22.5 1.5 15.448 1.5 6.75V4.5Z" />
                  </svg>
                  {/* Menu Icon */}
                  <svg xmlns="http://www.w3.org/2000/svg" fill="none" stroke="currentColor" strokeWidth="2.5" viewBox="0 0 24 24" className="w-4 h-4">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M12 6.75h.008v.008H12V6.75Zm0 5.25h.008v.008H12V12Zm0 5.25h.008v.008H12v-.008Z" />
                  </svg>
                </div>
              </div>

              {/* Chat Body */}
              <div ref={chatContainerRef} className="flex-1 min-h-0 bg-[#ECE5DD] p-4 overflow-y-auto flex flex-col gap-3.5 scrollbar-thin">

                <div className="max-w-[85%] rounded-2xl px-3 py-2 text-xs shadow-sm bg-[#DCF8C6] text-zinc-900 self-end rounded-tr-none">
                  stock check: Rice 5kg
                </div>

                <div className="max-w-[85%] rounded-2xl px-3 py-2 text-xs shadow-sm bg-white text-zinc-900 self-start rounded-tl-none">
                  <div className="space-y-1 text-[11px]">
                    <p className="flex justify-between"><span className="text-stone-500">Item :</span> <span className="text-gray-600 font-medium">Rice 5kg</span></p>
                    <p className="flex justify-between"><span className="text-stone-500">Stock :</span> <span className="text-gray-600 font-medium">148 units</span></p>
                    <p className="flex justify-between"><span className="text-stone-500">Alert :</span> <span className="text-red-400 font-medium">&lt; 20 units</span></p>
                    <p className="flex justify-between"><span className="text-stone-500">Sync :</span> <span className="text-gray-600">09:42 today</span></p>
                  </div>
                </div>

                <div className="max-w-[85%] rounded-2xl px-3 py-2 text-xs shadow-sm bg-[#DCF8C6] text-zinc-900 self-end rounded-tr-none">
                  add 50 units → Rice 5kg
                </div>

                <div className="max-w-[85%] rounded-2xl px-3 py-2 text-xs shadow-sm bg-white text-zinc-900 self-start rounded-tl-none">
                  ✓ updated → now 198 units
                </div>

              </div>

              {/* Chat Input Placeholder */}
              <div className="bg-[#f0f0f0] p-2 border-t border-zinc-200 flex items-center gap-2">
                <div className="flex-1 bg-white rounded-full px-3.5 py-1.5 text-xs text-zinc-400 border border-zinc-200">
                  Type a message...
                </div>
                <div className="w-8 h-8 rounded-full bg-[#128C7E] flex items-center justify-center text-white text-sm shadow">
                  🎤
                </div>
              </div>
            </div>
          </div>

          <div className="flex gap-3 mt-4 pt-4 border-t border-zinc-200">
                <button className="flex-1 py-3 rounded-xl bg-gradient-to-r from-blue-600 to-indigo-600 border border-transparent hover:from-blue-500 hover:to-indigo-500 text-white text-xs font-bold tracking-wider transition-all shadow-md hover:shadow-lg hover:-translate-y-0.5">
                  View Pricing
                </button>
                <button className="px-6 py-3 rounded-xl border border-zinc-200 bg-white hover:bg-zinc-50 hover:border-zinc-300 text-zinc-700 text-xs font-bold transition-all shadow-sm hover:shadow-md hover:-translate-y-0.5">
                  Early Access
                </button>
              </div>
          </motion.div>

          {/* ================= PRODUCT 02: EMAIL NEXUS ================= */}
          <motion.div 
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-100px" }}
            variants={{cardVariants}}
            className="flex flex-col justify-between lg:border-l lg:border-zinc-200 lg:pl-12"
          >
            <div className="space-y-6">
              <span className="text-[10px] font-mono tracking-widest text-stone-500 uppercase">// PRODUCT // 02</span>
              <h3 className="text-2xl md:text-3xl font-extrabold tracking-tight text-zinc-900">
                Email Nexus
              </h3>
              <p className="text-sm text-zinc-600 leading-relaxed font-light max-w-xl">
                A smart email automation and intelligence platform. Email Nexus connects your communication channels into a unified routing layer — full details coming soon. Join the waitlist to be first.
              </p>
              
              {/* Tech Spec Badges */}
              <div className="flex flex-wrap gap-2 pt-2">
                {["Email Automation", "Smart Routing", "CRM Sync", "Analytics", "Webhooks"].map((tag, idx) => (
                  <span 
                    key={tag} 
                    className={`text-[10px] font-mono px-2.5 py-1 rounded border ${
                      idx === 0 || idx === 1 
                        ? "border-blue-500/30 bg-blue-50 text-blue-600" 
                        : "border-zinc-200 bg-zinc-50 text-zinc-600"
                    }`}
                  >
                    {tag}
                  </span>
                ))}
              </div>
            </div>

            {/* Interactive Architecture Routing Canvas */}
            <div className="mt-12 w-full aspect-[16/10] rounded-xl border border-zinc-200 bg-zinc-50 p-5 backdrop-blur-3xl relative flex flex-col justify-between shadow-md">
              <div className="absolute inset-0 rounded-xl bg-gradient-to-b from-white to-transparent pointer-events-none" />

              {/* Status Header */}
              <div className="flex items-center justify-between border-b border-zinc-200 pb-3">
                <span className="text-[10px] font-mono tracking-wider text-stone-500">email-nexus / network</span>
                <span className="text-[9px] font-mono text-emerald-400 flex items-center gap-1.5 uppercase font-bold tracking-widest">
                  <span className="w-1 h-1 rounded-full bg-emerald-400 shadow-[0_0_6px_#10b981]" /> active
                </span>
              </div>

              {/* Central Isometric Hub Map */}
              <div className="flex-1 relative flex items-center justify-center min-h-[160px]">
                
                {/* Structural Link Vectors using clean CSS lines */}
                <svg className="absolute inset-0 w-full h-full opacity-30" xmlns="http://www.w3.org/2000/svg">
                  <line x1="20%" y1="30%" x2="50%" y2="50%" stroke="currentColor" strokeWidth="1" strokeDasharray="3" className="text-zinc-400" />
                  <line x1="50%" y1="20%" x2="50%" y2="50%" stroke="currentColor" strokeWidth="1" className="text-zinc-400" />
                  <line x1="80%" y1="30%" x2="50%" y2="50%" stroke="currentColor" strokeWidth="1" strokeDasharray="3" className="text-zinc-400" />
                  <line x1="20%" y1="75%" x2="50%" y2="50%" stroke="currentColor" strokeWidth="1" className="text-zinc-400" />
                  <line x1="80%" y1="75%" x2="50%" y2="50%" stroke="currentColor" strokeWidth="1" className="text-zinc-400" />
                </svg>

                {/* Core Nexus Terminal Block */}
                <div className="absolute z-10 px-4 py-3 border border-blue-200 bg-white shadow-xl rounded-lg text-center backdrop-blur-md">
                  <p className="text-[10px] font-mono tracking-widest text-blue-600 font-bold">EMAIL</p>
                  <p className="text-xs font-black tracking-tight text-zinc-900 mt-0.5">NEXUS</p>
                </div>

                {/* Peripheral System Nodes */}
                <div className="absolute top-[20%] left-[12%] px-2.5 py-1.5 rounded border border-zinc-200 bg-white text-[10px] font-mono text-zinc-500 shadow-sm">SMTP</div>
                <div className="absolute top-[10%] left-[45%] px-2.5 py-1.5 rounded border border-zinc-200 bg-white text-[10px] font-mono text-zinc-500 shadow-sm">ML</div>
                <div className="absolute top-[20%] right-[12%] px-2.5 py-1.5 rounded border border-zinc-200 bg-white text-[10px] font-mono text-zinc-500 shadow-sm">API</div>
                <div className="absolute bottom-[15%] left-[10%] px-2.5 py-1.5 rounded border border-zinc-200 bg-white text-[10px] font-mono text-zinc-500 shadow-sm">CRM</div>
                <div className="absolute bottom-[15%] right-[10%] px-2.5 py-1.5 rounded border border-zinc-200 bg-white text-[10px] font-mono text-zinc-500 shadow-sm flex items-center gap-1.5">
                  <span className="w-1 h-1 rounded-full bg-blue-500 shadow-[0_0_4px_#3b82f6]" /> WH
                </div>

                {/* Pulse Vector Signal Indicator */}
                <motion.div 
                  className="absolute w-1.5 h-1.5 bg-blue-400 rounded-full shadow-[0_0_8px_#3b82f6]"
                  animate={{
                    x: ["-90px", "0px"],
                    y: ["-30px", "0px"],
                    opacity: [0, 1, 1, 0]
                  }}
                  transition={{ duration: 3, repeat: Infinity, ease: "linear" }}
                />
              </div>

              {/* Action Frame Row */}
              <div className="flex items-center gap-4 mt-6 pt-5 border-t border-zinc-200">
                <button className="px-8 py-3 bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-500 hover:to-indigo-500 text-white font-bold text-xs rounded-xl tracking-wide transition-all shadow-md hover:shadow-lg hover:-translate-y-0.5 border border-transparent">
                  Join Waitlist
                </button>
                <span className="text-[10px] font-mono text-zinc-500 tracking-wider font-bold uppercase bg-zinc-100 px-3 py-1.5 rounded-full">// Launching Soon</span>
              </div>
            </div>
          </motion.div>

        </div>
      </div>
    </section>
  );
}
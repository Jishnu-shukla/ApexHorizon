"use client";
import Image from "next/image";
import { motion, useMotionValue, useSpring, useTransform } from "framer-motion"
import Navbar from "@/components/Navbar";
import { containerVariants, leftPanelVariants, rightPanelVariants } from "@/constants/variants";
import { useRef } from "react";
import Products from "@/components/home/products";
import ServicesSection from "@/components/home/Services";
import TestimonialsSection from "@/components/home/Testimonials";
import PricingSection from "@/components/products/whatsappInventory/Pricing";
import ContactSection from "@/components/home/Contact";
import Footer from "@/components/Footer";
import DeviceMockup from "@/components/home/DeviceMockup";
import { useRouter } from "next/navigation";

export default function Home() {
  const cardRef = useRef<HTMLDivElement>(null);
  const router = useRouter();
  const x = useMotionValue(0);
  const y = useMotionValue(0);

  const mouseXSpring = useSpring(x, { stiffness: 150, damping: 22 });
  const mouseYSpring = useSpring(y, { stiffness: 150, damping: 22 });

  return (
    <main>
    <section className="relative min-h-screen w-full overflow-hidden bg-background text-foreground font-sans select-none">

      <Navbar />

      <motion.div
        initial="hidden"
        animate="visible"
        variants={containerVariants}
        className="flex justify-center items-center mt-45 w-full">
          <Image src="/logo.png" alt="Apex Horizon" width={700} height={70} />
      </motion.div>

      {/* Spatial Perspective Workspace Viewport */}
      <motion.div 
        initial="hidden"
        animate="visible"
        variants={containerVariants}
        className="relative z-20 flex w-full items-center px-6 md:px-12 lg:px-20 py-32 mt-10"
        style={{ perspective: "1400px" }}
        >
        <div className="mx-auto grid w-full max-w-7xl grid-cols-1 gap-12 lg:grid-cols-2 items-center">
          
          {/* Left Canvas Window */}
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
              Apex Management <br />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-600 via-indigo-500 to-purple-500">WhataApp Powered.</span>
            </h1>

            <p className="mt-6 max-w-lg text-lg leading-relaxed text-zinc-600 font-medium drop-shadow-sm">
              Apex Horizon is a precision software studio. We design subscription-ready products and engineered local integrations for systems built to scale.
            </p>

            {/* Content Button Controls */}
            <div className="mt-10 flex flex-wrap gap-4">
              <button onClick={() => router.push('/products/ApexManagement')} className="rounded-xl cursor-pointer bg-gradient-to-r from-blue-600 to-indigo-600 border border-transparent px-8 py-4 text-xs text-white font-bold tracking-wider uppercase transition-all duration-300 hover:from-blue-500 hover:to-indigo-500 hover:scale-[1.02] active:scale-95 shadow-lg shadow-blue-500/25">
                Explore Apex Management
              </button>
              <button onClick={() => router.push('/#contact')} className="rounded-xl border cursor-pointer border-zinc-200 bg-white px-8 py-4 text-xs text-zinc-700 font-bold tracking-wider uppercase backdrop-blur-md transition-all duration-300 hover:text-zinc-900 hover:bg-zinc-50 hover:border-zinc-300 hover:shadow-md hover:scale-[1.02] active:scale-95">
                Start a Project
              </button>
            </div>
          </motion.div>

          {/* Interactive Floating Interface Node (Right Panel) */}
          {/* <motion.div 
            variants={{rightPanelVariants}}
            className="flex items-center justify-center py-6"
            style={{ transformStyle: "preserve-3d" }}
          >
            <motion.div
              ref={cardRef}
              onMouseMove={handleMouseMove}
              onMouseLeave={handleMouseLeave}
              style={{
                rotateX,
                rotateY,
                transformStyle: "preserve-3d",
              }}
              className="w-full max-w-xl rounded-2xl border border-white/[0.08] bg-white/[0.02] p-2 shadow-[0_40px_90px_rgba(0,0,0,0.65)] backdrop-blur-3xl relative group cursor-pointer transition-colors duration-300 hover:border-white/15"
            >
              Inner Specular Pass Highlight
              <div className="absolute inset-0 rounded-2xl bg-gradient-to-tr from-transparent via-white/[0.01] to-white/[0.06] pointer-events-none" />

              Display Canvas Shell
              <div 
                className="w-full rounded-xl overflow-hidden bg-stone-950/40 relative flex flex-col p-6 border border-white/[0.04]"
                style={{ transform: "translateZ(30px)", transformStyle: "preserve-3d" }}
              >
                Simulated Glass Window Title Bar
                <div className="flex items-center justify-between border-b border-white/[0.08] pb-4 mb-5">
                  <div className="flex gap-2">
                    <div className="h-2.5 w-2.5 rounded-full bg-red-500/50" />
                    <div className="h-2.5 w-2.5 rounded-full bg-amber-500/50" />
                    <div className="h-2.5 w-2.5 rounded-full bg-emerald-500/50" />
                  </div>
                  <span className="text-[10px] font-mono tracking-widest text-stone-400 uppercase">
                    apex-horizon // network-node
                  </span>
                </div>

                Dashboard Output Matrix
                <div className="space-y-5 font-mono text-xs md:text-sm text-stone-200">
                  <div className="space-y-2">
                    <p className="text-stone-500">
                      <span className="text-blue-400">❯</span> apex status --all
                    </p>
                    <div className="space-y-1.5 pl-3">
                      <p className="text-emerald-400 flex items-center gap-2">
                        <span className="w-1 h-1 rounded-full bg-emerald-400" /> ✓ inventory-manager running
                      </p>
                      <p className="text-stone-400 flex items-center gap-2">
                        <span className="w-1 h-1 rounded-full bg-blue-400" /> — client-sites <span className="text-blue-400 underline decoration-blue-400/30">3 live</span>
                      </p>
                    </div>
                  </div>

                  <div className="space-y-2 pt-1">
                    <p className="text-stone-500">
                      <span className="text-blue-400">❯</span> apex products --list
                    </p>
                    <div className="space-y-1 pl-3 text-stone-300">
                      <p>[01] WhatsApp Inventory Manager</p>
                      <p className="text-stone-500">[02] Email Nexus <span className="text-amber-400/70 text-xs font-sans font-normal">// coming soon</span></p>
                    </div>
                  </div>

                  Terminal Cursor Entry Point
                  <div className="flex items-center gap-2 text-blue-400 pt-1">
                    <span>❯</span>
                    <div className="h-4 w-1.5 animate-pulse bg-blue-400 shadow-[0_0_8px_#3b82f6]" />
                  </div>
                </div>
              </div>
            </motion.div>
          </motion.div> */}

          <motion.div
          variants={{rightPanelVariants}}
          className="md:absolute relative md:w-[50%] right-[-10px] aspect-4/3 lg:aspect-auto lg:h-[80%]">
            <DeviceMockup laptopSrc="/dashboard.png" mobileSrc="/mobile.jpeg"/>
          </motion.div>

        </div>
      </motion.div>

    </section>

    {/* <Products /> */}

    <ServicesSection />

    <TestimonialsSection />

    {/* <PricingSection /> */}

    <ContactSection />

    <Footer />
    </main>
  );
}

export default function Footer() {
  const handleScrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <footer className="relative w-full bg-zinc-50 border-t border-zinc-200 text-zinc-500 py-12 px-6 md:px-12 lg:px-20 font-sans z-30">
      
      {/* Symmetrical Matrix Grid Alignments */}
      <div className="mx-auto max-w-7xl flex flex-col sm:flex-row items-center justify-between gap-6 text-[11px] font-mono tracking-wider uppercase">
        
        {/* Left Side: System Verification & Copyright Logs */}
        <div className="flex flex-col sm:flex-row items-center gap-4 sm:gap-6 text-center sm:text-left">
          <span className="text-zinc-900 font-bold tracking-[0.15em]">
            © {new Date().getFullYear()} APEX HORIZON
          </span>
          <span className="hidden sm:inline text-zinc-300">|</span>
          <span className="flex items-center gap-2">
            <span className="w-1.5 h-1.5 rounded-full bg-emerald-500/80 shadow-[0_0_6px_#10b981]" />
            All Systems Operational // Local Inference Node
          </span>
        </div>

        {/* Right Side: Back to Top Interface Action */}
        <div className="flex items-center gap-6">
          <button 
            onClick={handleScrollToTop}
            className="text-zinc-600 hover:text-blue-600 transition-colors duration-200 flex items-center gap-2 group cursor-pointer"
          >
            Scroll to Viewport Top 
            <span className="transform transition-transform duration-200 group-hover:-translate-y-0.5 font-sans font-bold">↑</span>
          </button>
        </div>

      </div>

    </footer>
  );
}
import { globalUiVariants } from "@/constants/variants";
import { motion } from "framer-motion";
import Image from "next/image";
import Link from "next/link";

export default function Navbar() {
  return (
    <motion.nav 
        initial="hidden"
        animate="visible"
        variants={{globalUiVariants}}
        className="fixed top-0 left-0 right-0 z-50 flex justify-between items-center py-5 px-8 md:px-16 lg:px-24 w-full bg-white/70 backdrop-blur-xl border-b border-zinc-200/50 shadow-sm transition-all duration-300"
      >
      <Link href="/" className="flex items-center">
        <Image src="/logo.png" alt="Apex Horizon" width={180} height={28} className="cursor-pointer hover:opacity-90 transition-opacity" />
      </Link>
      <div className="hidden md:flex items-center gap-8 text-sm font-semibold text-zinc-600">
        <Link href="/products/ApexManagement" className="hover:text-blue-600 transition-colors">Products</Link>
        <Link href="/#services" className="hover:text-blue-600 transition-colors">Services</Link>
        <Link href="/#testimonials" className="hover:text-blue-600 transition-colors">Testimonials</Link>
        <Link href="/#contact" className="hover:text-blue-600 transition-colors">Contact</Link>
        <Link href="/#contact" className="ml-2 bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-500 hover:to-indigo-500 text-white px-5 py-2.5 rounded-xl transition-all duration-300 font-bold shadow-md shadow-blue-500/25 hover:shadow-lg hover:shadow-blue-500/40 hover:-translate-y-0.5">Get Started →</Link>
      </div>
      <div className="md:hidden">
        <button className="text-slate-600 hover:text-black transition-colors">
          <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
            <path strokeLinecap="round" strokeLinejoin="round" d="M3.75 6.633h16.5M3.75 12h16.5m-16.5 5.367h16.5" />
          </svg>
        </button>
      </div>
      </motion.nav>
  )
}
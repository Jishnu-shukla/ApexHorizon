import { motion } from "framer-motion"
import { useState } from "react";

export function VerifyEmail({ setIsVerifyModalOpen, verifyStatus, setVerifyStatus }: { setIsVerifyModalOpen: (value: boolean) => void; verifyStatus: 'idle' | 'loading' | 'success' | 'error', setVerifyStatus: (value: 'idle' | 'loading' | 'success' | 'error') => void }) {
    const [verifyEmail, setVerifyEmail] = useState('');

    const handleVerifySubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        if (!verifyEmail) return;
    
        setVerifyStatus('loading');
    
        try {
          const res = await fetch('/api/verify-email', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ email: verifyEmail })
          });
          
          if (res.ok) {
            setVerifyStatus('success');
            window.location.href = '/ApexManagement.rar';
            setTimeout(() => setIsVerifyModalOpen(false), 3000);
          } else {
            setVerifyStatus('error');
          }
        } catch (error) {
          console.error("Verification failed", error);
          setVerifyStatus('error');
        }
      };

    return (
        <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-zinc-900/40 backdrop-blur-sm"
          >
            <motion.div 
              initial={{ scale: 0.95, y: 20 }}
              animate={{ scale: 1, y: 0 }}
              exit={{ scale: 0.95, y: 20 }}
              className="bg-white rounded-2xl shadow-2xl w-full max-w-md overflow-hidden"
            >
              <div className="flex justify-between items-center p-6 border-b border-zinc-100">
                <h3 className="text-xl font-bold text-zinc-900">Verify Your Business</h3>
                <button onClick={() => setIsVerifyModalOpen(false)} className="text-zinc-400 hover:text-zinc-700 transition">
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" /></svg>
                </button>
              </div>

              {verifyStatus === 'success' ? (
                <div className="p-10 text-center flex flex-col items-center">
                  <div className="w-16 h-16 bg-emerald-100 rounded-full flex items-center justify-center text-emerald-600 mb-4">
                    <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" /></svg>
                  </div>
                  <h4 className="text-2xl font-bold text-zinc-900 mb-2">Verified Successfully!</h4>
                  <p className="text-zinc-600">Your .rar file is downloading. You can close this window.</p>
                </div>
              ) : (
                <form onSubmit={handleVerifySubmit} className="p-6 space-y-4">
                  <p className="text-sm text-zinc-600 mb-4">Enter your registered email. If verified, your download will start automatically.</p>
                  
                  <div>
                    <label className="block text-[10px] font-mono uppercase tracking-wider text-zinc-500 mb-1">Email Address *</label>
                    <input 
                      type="email" required
                      value={verifyEmail} onChange={e => setVerifyEmail(e.target.value)}
                      className="w-full border border-zinc-200 rounded-lg px-4 py-2 text-sm focus:outline-none focus:border-blue-500 text-zinc-900"
                      placeholder="owner@company.com"
                    />
                  </div>
                  
                  {verifyStatus === 'error' && (
                    <div className="p-3 bg-red-50 text-red-600 text-sm rounded-lg border border-red-100">
                      Email not registered. Please use the "Verify Business" button to register first.
                    </div>
                  )}

                  <button 
                    type="submit" 
                    disabled={verifyStatus === 'loading'}
                    className="w-full mt-4 bg-emerald-600 hover:bg-emerald-500 text-white font-bold py-3 rounded-lg transition disabled:opacity-70 flex justify-center items-center gap-2"
                  >
                    {verifyStatus === 'loading' ? (
                      <><svg className="animate-spin h-4 w-4 text-white" fill="none" viewBox="0 0 24 24"><circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle><path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path></svg> Verifying...</>
                    ) : 'Verify & Download'}
                  </button>
                </form>
              )}
            </motion.div>
          </motion.div>
    )
}
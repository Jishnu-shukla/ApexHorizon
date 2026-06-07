import { motion } from "framer-motion";
import { useRouter } from "next/navigation";

export default function PricingSection() {
  const router = useRouter()
  const plans = [
    {
      name: "FREE TRIAL",
      price: "0",
      period: "/mo",
      description: "For small businesses starting with inventory automation.",
      features: [
        "up to 30 messages/day",
        "Up to 500 items",
        "Basic stock queries",
        "Low-stock alerts",
        "Email support",
      ],
      buttonText: "Get Started",
      isPopular: false,
    },
    {
      name: "GROWTH",
      price: "1,999",
      period: "/mo",
      description: "For growing businesses needing multi-user access and analytics.",
      features: [
        "up to 100 messages/day",
        "Unlimited items",
        "Advanced queries",
        "Analytics dashboard",
        "Priority support",
      ],
      buttonText: "Start Free Trial",
      isPopular: true,
    },
    {
      name: "ENTERPRISE",
      price: "Custom",
      period: "",
      description: "For large operations needing custom workflows and integrations.",
      features: [
        "Unlimited messages",
        "Custom integrations",
        "Dedicated support",
        "SLA agreement",
        "Onboarding included",
      ],
      buttonText: "Talk to Us",
      isPopular: false,
    },
  ];

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { staggerChildren: 0.12, delayChildren: 0.1 }
    }
  };

  const cardVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.7, ease: [0.16, 1, 0.3, 1] }
    }
  };

  return (
    <section id="pricing" className="relative w-full bg-zinc-50 border-t border-zinc-200 text-zinc-900 py-24 px-6 md:px-12 lg:px-20 overflow-hidden font-sans">
      
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
        
        {/* Header Block */}
        <div className="flex flex-col items-start mb-16">
          <div className="inline-flex items-center gap-2 mb-4 text-xs font-mono tracking-widest text-blue-400 uppercase">
            <span className="w-3 h-[1px] bg-blue-500" /> Pricing
          </div>
          <h2 className="text-4xl md:text-5xl lg:text-6xl font-black tracking-tight text-zinc-900 leading-none">
            WhatsApp Inventory Manager
          </h2>
          <p className="mt-4 text-sm md:text-base text-zinc-600 max-w-xl font-light">
            Simple subscription plans. No setup fees. Cancel anytime.
          </p>
        </div>

        {/* 3-Column Plan Grid */}
        <motion.div 
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
          variants={containerVariants}
          className="grid grid-cols-1 md:grid-cols-3 border border-zinc-200 bg-white rounded-xl overflow-hidden shadow-lg backdrop-blur-2xl"
        >
          {plans.map((plan) => (
            <motion.div
              key={plan.name}
              variants={{cardVariants}}
              className={`p-8 lg:p-10 flex flex-col justify-between border-b md:border-b-0 md:border-r border-zinc-200 last:border-r-0 relative group transition-colors duration-300 ${
                plan.isPopular ? "bg-zinc-50" : ""
              }`}
            >
              {/* Internal Accent Glow for Highlight Card */}
              {plan.isPopular && (
                <div className="absolute inset-0 bg-gradient-to-b from-blue-500/[0.02] to-transparent pointer-events-none" />
              )}

              <div className="space-y-6">
                
                {/* Header Metadata */}
                <div className="flex items-center justify-between min-h-[24px]">
                  <span className="text-xs font-mono tracking-wider text-zinc-500 uppercase">
                    {plan.name}
                  </span>
                  {plan.isPopular && (
                    <span className="text-[9px] font-mono font-bold tracking-widest text-blue-600 border border-blue-200 bg-blue-50 px-2.5 py-1 rounded">
                      // MOST POPULAR
                    </span>
                  )}
                </div>

                {/* Price Display */}
                <div className="flex items-baseline text-zinc-900">
                  {plan.price !== "Custom" && (
                    <span className="text-2xl font-light tracking-tight mr-1 text-zinc-500">₹</span>
                  )}
                  <h3 className="text-4xl lg:text-5xl font-black tracking-tight">
                    {plan.price}
                  </h3>
                  <span className="text-xs font-mono text-zinc-500 ml-2 uppercase tracking-wider">
                    {plan.period}
                  </span>
                </div>

                {/* Description */}
                <p className="text-xs lg:text-sm text-zinc-600 leading-relaxed font-light min-h-[40px]">
                  {plan.description}
                </p>

                {/* Divider Line */}
                <div className="h-[1px] w-full bg-zinc-200" />

                {/* Features Checklist Grid */}
                <ul className="space-y-4 text-xs lg:text-sm text-zinc-700 font-light">
                  {plan.features.map((feature) => (
                    <li key={feature} className="flex items-center gap-3">
                      <span className="text-blue-500 font-mono text-xs select-none">→</span>
                      <span>{feature}</span>
                    </li>
                  ))}
                </ul>
              </div>

              {/* Action Buttons Frame */}
              <div className="mt-12">
                {plan.isPopular ? (
                  <button className="w-full py-3.5 rounded-xl bg-blue-600 border border-blue-500 hover:bg-blue-500 text-white text-xs font-bold tracking-wider uppercase transition shadow-lg shadow-blue-600/10 active:scale-[0.99]">
                    {plan.buttonText}
                  </button>
                ) : (
                  <button onClick={() => {plan.buttonText === "Talk to Us" ? router.push('/#contact') : ""}} className="w-full py-3.5 rounded-xl border border-zinc-300 bg-white hover:bg-zinc-50 hover:border-zinc-400 text-zinc-700 transition text-xs font-bold tracking-wider uppercase active:scale-[0.99]">
                    {plan.buttonText}
                  </button>
                )}
              </div>

            </motion.div>
          ))}
        </motion.div>

      </div>
    </section>
  );
}
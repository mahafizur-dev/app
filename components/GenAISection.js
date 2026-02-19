import React from "react";
import { Sparkles, MoreHorizontal, Clock } from "lucide-react";
import { motion } from "framer-motion";

const GenAISection = () => {
  // Updated: Faster floating animation
  const floatAnim = {
    y: [0, -12, 0],
    transition: {
      duration: 3, // Reduced from 8s to 3s for faster movement
      repeat: Infinity,
      ease: "easeInOut",
    },
  };

  return (
    <section className="bg-black py-24 px-4 sm:px-6 lg:px-8 relative overflow-hidden font-sans border-t border-white/5">
      {/* Ambient Background Glow (Static center glow) */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-[#2EC866]/5 blur-[120px] rounded-full pointer-events-none" />

      <div className="max-w-7xl mx-auto relative z-10">
        <div className="flex flex-col lg:flex-row gap-12 lg:gap-20 items-center">
          {/* Left Column: Text & Backlog Card */}
          <div className="lg:w-5/12 relative z-10 flex flex-col justify-center">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              viewport={{ once: true, margin: "-100px" }}
            >
              <h2 className="text-4xl md:text-5xl font-medium text-white mb-6 leading-[1.15] tracking-tight">
                <span className="text-[#2EC866] inline-block animate-pulse">
                  Presswayy
                </span>{" "}
                will execute <br />
                more mundane <br />
                automation tasks
              </h2>

              <p className="text-gray-400 text-lg mb-12 leading-relaxed max-w-md">
                Developers will orchestrate the work of AI agents while focusing
                on higher-level problem solving.
              </p>
            </motion.div>

            {/* Backlog Card - Floating */}
            <div className="relative pl-4">
              <motion.div
                animate={floatAnim}
                className="w-72 bg-[#0F1115] border border-white/10 p-5 rounded-2xl shadow-2xl relative z-10"
              >
                <div className="flex justify-between items-center mb-4">
                  <span className="text-slate-500 text-xs font-bold uppercase tracking-wider">
                    Backlog
                  </span>
                  <MoreHorizontal size={16} className="text-slate-600" />
                </div>

                <div className="space-y-3">
                  <div className="bg-[#1A1D24] p-3 rounded-xl border border-white/5 shadow-inner">
                    <p className="text-gray-300 text-sm mb-3 font-medium leading-snug">
                      Making API requests and handling responses
                    </p>
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-2">
                        <div className="bg-[#2EC866]/10 text-[#2EC866] text-[10px] font-bold px-2 py-1 rounded-md flex items-center gap-1 border border-[#2EC866]/20">
                          <Sparkles size={10} fill="currentColor" /> AI Help
                        </div>
                        <div className="w-5 h-5 rounded-full bg-yellow-600 border border-[#1A1D24] flex items-center justify-center text-[8px] text-white font-bold">
                          MP
                        </div>
                      </div>
                    </div>
                    <div className="mt-3 pt-3 border-t border-white/5 flex items-center gap-1.5 text-slate-500 text-[10px] font-medium">
                      <Clock size={10} />
                      <span>May 24 — July 1</span>
                    </div>
                  </div>
                </div>
              </motion.div>

              {/* Connecting Arrow - Continuous Drawing Animation (Faster) */}
              <div className="absolute -right-24 top-20 w-48 h-32 hidden lg:block pointer-events-none z-0">
                <svg
                  viewBox="0 0 200 120"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                  className="w-full h-full"
                >
                  {/* Dashed Path Line */}
                  <motion.path
                    d="M10 10 Q 100 90 180 80"
                    stroke="#2EC866"
                    strokeWidth="1.5"
                    strokeDasharray="6 4"
                    strokeLinecap="round"
                    fill="none"
                    initial={{ pathLength: 0, opacity: 0 }}
                    animate={{ pathLength: [0, 1, 1], opacity: [0, 1, 0] }}
                    transition={{
                      duration: 1.5,
                      repeat: Infinity,
                      ease: "easeInOut",
                      repeatDelay: 0.2,
                    }}
                  />
                  {/* Arrow Head */}
                  <motion.path
                    d="M170 75 L 180 80 L 172 88"
                    stroke="#2EC866"
                    strokeWidth="1.5"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    fill="none"
                    initial={{ pathLength: 0, opacity: 0 }}
                    animate={{ pathLength: [0, 1, 1], opacity: [0, 1, 0] }}
                    transition={{
                      duration: 1.5,
                      repeat: Infinity,
                      ease: "easeInOut",
                      times: [0, 0.8, 1],
                      repeatDelay: 0.2,
                    }}
                  />
                  {/* Text Label */}
                  <motion.text
                    x="100"
                    y="100"
                    fill="#E5E7EB"
                    fontSize="14"
                    fontFamily="cursive"
                    transform="rotate(-15 100,100)"
                    className="opacity-90 font-medium"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: [0, 1, 1, 0] }}
                    transition={{
                      duration: 1.5,
                      repeat: Infinity,
                      ease: "easeInOut",
                      times: [0, 0.5, 0.8, 1],
                      repeatDelay: 0.2,
                    }}
                  >
                    AI Delegated
                  </motion.text>
                </svg>
              </div>
            </div>
          </div>

          {/* Right Column: Visual & AI Delegated Cards */}
          <div className="lg:w-7/12 relative w-full">
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              whileInView={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.8 }}
              viewport={{ once: true }}
              className="relative rounded-[2.5rem] overflow-hidden bg-gray-900 aspect-[4/5] md:aspect-[4/3] lg:aspect-[4/3.2] shadow-2xl border border-white/5"
            >
              {/* Main Background Image */}
              <img
                src="https://images.unsplash.com/photo-1573164713988-8665fc963095?q=80&w=2069&auto=format&fit=crop"
                alt="Developer working"
                className="absolute inset-0 w-full h-full object-cover opacity-90 transition-transform duration-700 hover:scale-105"
              />
              {/* Vignette Overlay */}
              <div className="absolute inset-0 bg-gradient-to-t from-black via-black/20 to-transparent"></div>

              {/* AI Delegated Stack - Floating (Faster) */}
              <div className="absolute bottom-6 left-6 md:bottom-10 md:left-10 max-w-[280px] sm:max-w-sm w-full">
                <motion.div
                  animate={{ y: [0, 12, 0] }}
                  transition={{
                    duration: 4, // Reduced from 9s to 4s
                    repeat: Infinity,
                    ease: "easeInOut",
                    delay: 0.5,
                  }}
                  className="bg-[#0F1115]/80 backdrop-blur-xl border border-white/10 p-5 rounded-2xl shadow-2xl"
                >
                  <div className="flex justify-between items-center mb-4">
                    <span className="text-slate-400 text-xs font-bold uppercase tracking-wider">
                      AI delegated
                    </span>
                    <MoreHorizontal size={16} className="text-slate-600" />
                  </div>

                  <div className="space-y-4">
                    {/* Card 1 (Active) */}
                    <div className="bg-[#1A1D24] p-4 rounded-xl border border-white/10 shadow-lg relative z-10">
                      <p className="text-white text-sm mb-3 font-medium leading-snug">
                        Making API requests and handling responses
                      </p>
                      <div className="flex items-center gap-2 mb-3">
                        <div className="bg-[#2EC866]/10 text-[#2EC866] text-[10px] font-bold px-2 py-1 rounded-md flex items-center gap-1 border border-[#2EC866]/20 animate-pulse">
                          <Sparkles size={10} fill="currentColor" /> AI Help
                        </div>
                        <div className="w-5 h-5 rounded-full bg-yellow-600 border border-[#1A1D24] flex items-center justify-center text-[8px] text-white font-bold">
                          MP
                        </div>
                      </div>
                      <div className="flex items-center gap-1.5 text-slate-500 text-[10px] font-medium">
                        <Clock size={10} />
                        <span>May 24 — July 1</span>
                      </div>
                    </div>

                    {/* Card 2 (Stacked Below) */}
                    <div className="bg-[#1A1D24]/40 p-4 rounded-xl border border-white/5 opacity-50 scale-95 origin-top -mt-6 pt-6 -z-10">
                      <p className="text-gray-300 text-sm mb-2 font-medium">
                        Writing README files
                      </p>
                      <div className="flex items-center gap-2">
                        <div className="bg-[#2EC866]/10 text-[#2EC866] text-[10px] font-bold px-2 py-1 rounded-md flex items-center gap-1 border border-[#2EC866]/20">
                          <Sparkles size={10} fill="currentColor" /> AI Help
                        </div>
                        <div className="w-5 h-5 rounded-full bg-purple-600 border border-[#1A1D24] flex items-center justify-center text-[8px] text-white font-bold">
                          AH
                        </div>
                      </div>
                    </div>
                  </div>
                </motion.div>
              </div>
            </motion.div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default GenAISection;

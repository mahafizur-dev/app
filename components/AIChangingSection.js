import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Box, Code, Terminal, Hexagon } from "lucide-react";

// Custom Hexagon Badge Component
const HexagonBadge = ({ icon: Icon, label, stars }) => (
  <div className="flex flex-col items-center gap-2">
    <div className="relative flex items-center justify-center w-14 h-16">
      {/* Dark Hexagon Background */}
      <svg
        viewBox="0 0 24 24"
        fill="#1F2937"
        className="absolute w-full h-full drop-shadow-lg"
      >
        <path
          d="M12 2L21.5 7.5V16.5L12 22L2.5 16.5V7.5L12 2Z"
          stroke="#374151"
          strokeWidth="0.5"
        />
      </svg>
      {/* Icon */}
      <div className="absolute inset-0 flex items-center justify-center text-gray-400">
        <Icon size={20} strokeWidth={1.5} />
      </div>
    </div>
    <span className="text-[10px] text-gray-400 font-medium tracking-wide">
      {label}
    </span>
    {/* Star Rating */}
    <div className="flex gap-1">
      {[1, 2, 3].map((star) => (
        <div
          key={star}
          className={`w-1 h-1 rounded-full ${star <= stars ? "bg-yellow-600" : "bg-gray-700"}`}
        />
      ))}
    </div>
  </div>
);

const AIChangingSection = () => {
  const [activeStep, setActiveStep] = useState(0);
  const [isHovered, setIsHovered] = useState(false);

  // Auto-play logic for tabs
  useEffect(() => {
    let interval;
    if (!isHovered) {
      interval = setInterval(() => {
        setActiveStep((prev) => (prev + 1) % 3);
      }, 4000);
    }
    return () => clearInterval(interval);
  }, [isHovered]);

  const steps = [
    {
      title: "GenAI advances daily.",
      desc: "AI's ability to write code is evolving at a dizzying pace.",
    },
    {
      title: "GenAI is becoming a part of everything.",
      desc: "From autocomplete to full system architecture, AI is embedded.",
    },
    {
      title: "GenAI will execute more mundane development tasks.",
      desc: "Developers will orchestrate the work of AI agents while focusing on problem solving.",
    },
  ];

  return (
    <section className="bg-white pt-12 pb-24 px-4 sm:px-6 lg:px-8 overflow-hidden font-sans rounded-b-[3rem] border-none shadow-none">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-20">
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-4xl md:text-5xl font-medium text-slate-900 tracking-tight"
          >
            <span className="text-[#FF6900]">AI Changing</span> <br />
            Automation Business
          </motion.h2>
        </div>

        <div className="flex flex-col lg:flex-row gap-16 lg:gap-24 items-center">
          {/* LEFT COLUMN: Text Tabs */}
          <div
            className="lg:w-5/12 space-y-8"
            onMouseEnter={() => setIsHovered(true)}
            onMouseLeave={() => setIsHovered(false)}
          >
            {steps.map((step, idx) => (
              <div
                key={idx}
                onClick={() => setActiveStep(idx)}
                className={`cursor-pointer transition-all duration-500 group`}
              >
                <div
                  className={`pl-6 border-l-[3px] transition-colors duration-500 ${activeStep === idx ? "border-[#FF6900]" : "border-slate-200"}`}
                >
                  <h3
                    className={`text-2xl font-medium mb-3 transition-colors duration-500 ${activeStep === idx ? "text-slate-900" : "text-slate-400 group-hover:text-slate-600"}`}
                  >
                    {step.title}
                  </h3>
                  <AnimatePresence>
                    {activeStep === idx && (
                      <motion.p
                        initial={{ opacity: 0, height: 0 }}
                        animate={{ opacity: 1, height: "auto" }}
                        exit={{ opacity: 0, height: 0 }}
                        className="text-slate-600 text-lg leading-relaxed"
                      >
                        {step.desc}
                      </motion.p>
                    )}
                  </AnimatePresence>
                </div>
              </div>
            ))}
          </div>

          {/* RIGHT COLUMN: Visual Composition */}
          <div className="lg:w-7/12 relative w-full flex justify-center">
            <motion.div
              initial={{ opacity: 0, x: 50 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8 }}
              viewport={{ once: true }}
              className="relative w-full max-w-[600px] aspect-[4/3]"
            >
              {/* Background Image Container */}
              <div className="absolute top-0 right-0 w-[85%] h-[85%] rounded-[2rem] overflow-hidden">
                <img
                  src="https://images.unsplash.com/photo-1494790108377-be9c29b29330?q=80&w=1887&auto=format&fit=crop"
                  alt="Woman looking at city"
                  className="w-full h-full object-cover grayscale-[20%]"
                />
              </div>

              {/* Ada Profile Card - Floating Overlay */}
              <motion.div
                initial={{ y: 40, opacity: 0 }}
                whileInView={{ y: 0, opacity: 1 }}
                transition={{ duration: 0.8, delay: 0.2 }}
                viewport={{ once: true }}
                className="absolute bottom-0 left-0 w-[380px] bg-[#0F1115] rounded-3xl p-6 shadow-2xl border border-white/10 z-10"
              >
                {/* Profile Header */}
                <div className="flex items-center gap-4 mb-8">
                  <div className="w-14 h-14 rounded-full overflow-hidden border-2 border-white/10">
                    <img
                      src="https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?q=80&w=200&auto=format&fit=crop"
                      alt="Ada"
                      className="w-full h-full object-cover"
                    />
                  </div>
                  <div>
                    <h4 className="text-white font-bold text-lg">Ada</h4>
                    <p className="text-slate-400 text-xs tracking-wide">
                      Machine Learning Engineer
                    </p>
                  </div>
                </div>

                {/* Divider */}
                <div className="h-px w-full bg-gradient-to-r from-transparent via-white/10 to-transparent mb-6"></div>

                {/* Certifications */}
                <div className="mb-8">
                  <p className="text-[10px] font-bold text-slate-500 uppercase tracking-wider mb-3">
                    Certifications
                  </p>
                  <div className="flex gap-3">
                    {/* Cert 1 */}
                    <div className="flex-1 bg-[#1A1D24] p-3 rounded-xl border border-white/5 relative overflow-hidden group">
                      <div className="relative z-10">
                        <p className="text-[9px] text-slate-400 mb-1.5">
                          Machine Learning Engineer
                        </p>
                        <div className="h-1.5 w-full bg-slate-700 rounded-full overflow-hidden">
                          <motion.div
                            initial={{ width: 0 }}
                            whileInView={{ width: "70%" }}
                            transition={{ duration: 1, delay: 0.5 }}
                            className="h-full bg-slate-400"
                          />
                        </div>
                      </div>
                    </div>
                    {/* Cert 2 */}
                    <div className="flex-1 bg-[#1A1D24] p-3 rounded-xl border border-white/5 relative overflow-hidden">
                      <div className="relative z-10">
                        <p className="text-[9px] text-slate-400 mb-1.5">
                          Data Scientist
                        </p>
                        <div className="h-1.5 w-full bg-slate-700 rounded-full overflow-hidden">
                          <motion.div
                            initial={{ width: 0 }}
                            whileInView={{ width: "40%" }}
                            transition={{ duration: 1, delay: 0.7 }}
                            className="h-full bg-slate-400"
                          />
                        </div>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Badges */}
                <div>
                  <p className="text-[10px] font-bold text-slate-500 uppercase tracking-wider mb-3">
                    Badges
                  </p>
                  <div className="flex justify-between px-2">
                    <HexagonBadge icon={Box} label="Kubernetes" stars={3} />
                    <HexagonBadge icon={Terminal} label="PyTorch" stars={3} />
                    <HexagonBadge icon={Code} label="Python" stars={2} />
                  </div>
                </div>
              </motion.div>
            </motion.div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default AIChangingSection;

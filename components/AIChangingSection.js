import React, { useState, useEffect } from "react";
import { Bot, Check, Sparkles } from "lucide-react";

const AIChangingSection = () => {
  const [activeStep, setActiveStep] = useState(0);
  const [isAutoPlaying, setIsAutoPlaying] = useState(true);

  useEffect(() => {
    let interval;
    if (isAutoPlaying) {
      interval = setInterval(() => {
        setActiveStep((prev) => (prev + 1) % 3);
      }, 4000);
    }
    return () => clearInterval(interval);
  }, [isAutoPlaying]);

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
      title: "GenAI will execute more mundane tasks.",
      desc: "Developers will orchestrate the work of AI agents while focusing on problem solving.",
    },
  ];

  return (
    <div
      id="solutions"
      className="bg-white py-24 px-4 sm:px-6 lg:px-8 border-t border-slate-100 overflow-hidden"
    >
      <div className="max-w-7xl mx-auto">
        <h2 className="text-4xl md:text-6xl font-bold text-center text-slate-900 mb-20 tracking-tighter">
          AI Changing <br />
          <span className="bg-clip-text text-transparent bg-gradient-to-r from-[#2EC866] to-emerald-800">
            Software Development
          </span>
        </h2>

        <div className="flex flex-col lg:flex-row gap-16 items-center">
          {/* Left Text Column */}
          <div
            className="lg:w-1/2 space-y-8"
            onMouseEnter={() => setIsAutoPlaying(false)}
            onMouseLeave={() => setIsAutoPlaying(true)}
          >
            {steps.map((step, idx) => (
              <div
                key={idx}
                className={`transition-all duration-500 cursor-pointer p-6 rounded-2xl border-l-4 ${activeStep === idx ? "bg-slate-50 border-[#2EC866] shadow-sm scale-105" : "border-transparent hover:bg-slate-50/50 opacity-50 hover:opacity-100"}`}
                onClick={() => setActiveStep(idx)}
              >
                <h3
                  className={`text-2xl font-bold mb-2 ${activeStep === idx ? "text-black" : "text-slate-500"}`}
                >
                  {step.title}
                </h3>
                <p
                  className={`text-lg leading-relaxed ${activeStep === idx ? "text-slate-700" : "text-slate-400"}`}
                >
                  {step.desc}
                </p>
                {activeStep === idx && (
                  <div className="mt-4 h-1 w-full bg-slate-200 rounded-full overflow-hidden">
                    <div className="h-full bg-[#2EC866] animate-[width_4s_linear]"></div>
                    <style>{`@keyframes width { from { width: 0%; } to { width: 100%; } }`}</style>
                  </div>
                )}
              </div>
            ))}
          </div>

          {/* Right Visual Column */}
          <div className="lg:w-1/2 relative h-[500px] w-full perspective-1000">
            <div className="absolute inset-0 bg-[#F8F9FA] rounded-[3rem] border border-slate-200 shadow-inner overflow-hidden flex items-center justify-center">
              <div
                className="absolute inset-0 opacity-[0.03]"
                style={{
                  backgroundImage: "radial-gradient(#000 1px, transparent 1px)",
                  backgroundSize: "20px 20px",
                }}
              ></div>

              {/* SCENE 1 */}
              <div
                className={`absolute transition-all duration-700 ease-out transform ${activeStep === 0 ? "opacity-100 scale-100 translate-y-0 rotate-0" : "opacity-0 scale-90 translate-y-10 rotate-[-5deg]"}`}
              >
                <div className="w-80 bg-[#1A1A1A] rounded-3xl p-6 shadow-2xl border border-white/10">
                  <div className="flex items-center gap-4 mb-8">
                    <div className="w-14 h-14 bg-gradient-to-br from-purple-500 to-indigo-600 rounded-2xl flex items-center justify-center text-white font-bold text-xl shadow-lg">
                      A
                    </div>
                    <div>
                      <h4 className="text-white font-bold text-lg">Ada</h4>
                      <p className="text-slate-400 text-sm">
                        Machine Learning Engineer
                      </p>
                    </div>
                  </div>
                  <div className="space-y-4">
                    <div className="bg-white/5 p-4 rounded-xl border border-white/5">
                      <div className="flex justify-between items-center mb-2">
                        <span className="text-slate-400 text-xs uppercase font-bold">
                          Skill Score
                        </span>
                        <span className="text-[#2EC866] font-mono font-bold">
                          98/100
                        </span>
                      </div>
                      <div className="h-2 bg-slate-800 rounded-full overflow-hidden">
                        <div className="h-full w-[98%] bg-[#2EC866]"></div>
                      </div>
                    </div>
                    <div className="flex gap-3">
                      <div className="h-10 w-10 rounded-full bg-slate-800 border border-slate-700 flex items-center justify-center animate-pulse">
                        <Sparkles className="w-4 h-4 text-yellow-500" />
                      </div>
                      <div className="h-10 w-10 rounded-full bg-slate-800 border border-slate-700 flex items-center justify-center">
                        <Check className="w-4 h-4 text-[#2EC866]" />
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              {/* SCENE 2 */}
              <div
                className={`absolute transition-all duration-700 ease-out transform ${activeStep === 1 ? "opacity-100 scale-100 translate-y-0" : activeStep < 1 ? "opacity-0 translate-y-20" : "opacity-0 translate-y-[-20px] scale-95"}`}
              >
                <div className="relative w-80 h-80">
                  <div className="absolute top-0 left-1/2 -translate-x-1/2 bg-white border border-slate-200 p-4 rounded-xl shadow-xl z-20 w-40 text-center">
                    <div className="w-8 h-8 bg-blue-100 rounded-full mx-auto mb-2 flex items-center justify-center text-blue-600">
                      <Bot size={16} />
                    </div>
                    <span className="font-bold text-slate-800 text-sm">
                      AI Core
                    </span>
                  </div>
                  <div
                    className="absolute bottom-10 left-0 bg-white border border-slate-200 p-3 rounded-xl shadow-lg w-32 animate-float"
                    style={{ animationDelay: "0s" }}
                  >
                    <div className="h-2 w-16 bg-slate-200 rounded mb-2"></div>
                    <div className="h-2 w-10 bg-slate-100 rounded"></div>
                  </div>
                  <div
                    className="absolute bottom-20 right-0 bg-white border border-slate-200 p-3 rounded-xl shadow-lg w-32 animate-float"
                    style={{ animationDelay: "1s" }}
                  >
                    <div className="h-2 w-20 bg-slate-200 rounded mb-2"></div>
                    <div className="h-2 w-12 bg-slate-100 rounded"></div>
                  </div>
                </div>
              </div>

              {/* SCENE 3 */}
              <div
                className={`absolute transition-all duration-700 ease-out transform ${activeStep === 2 ? "opacity-100 scale-100 translate-y-0" : "opacity-0 scale-110 translate-y-10"}`}
              >
                <div className="w-96 bg-[#0F172A] rounded-2xl overflow-hidden shadow-2xl border border-slate-700">
                  <div className="bg-[#1E293B] px-4 py-3 flex items-center gap-2 border-b border-slate-700">
                    <div className="flex gap-1.5">
                      <div className="w-2.5 h-2.5 rounded-full bg-red-500"></div>
                      <div className="w-2.5 h-2.5 rounded-full bg-yellow-500"></div>
                      <div className="w-2.5 h-2.5 rounded-full bg-green-500"></div>
                    </div>
                    <div className="text-xs text-slate-400 ml-2 font-mono">
                      agent_task_001
                    </div>
                  </div>
                  <div className="p-4 space-y-3 font-mono text-xs">
                    <div className="flex gap-2">
                      <span className="text-[#2EC866]">➜</span>
                      <span className="text-slate-300">
                        Analyze repo coverage...
                      </span>
                    </div>
                    <div className="pl-4 text-slate-500">
                      Scanning 42 files...
                    </div>
                    <div className="bg-slate-800/50 p-3 rounded border-l-2 border-[#2EC866] text-slate-300">
                      <div className="flex justify-between mb-1">
                        <span>Unit Tests</span>
                        <span className="text-[#2EC866]">Passed</span>
                      </div>
                      <div className="flex justify-between">
                        <span>Integration</span>
                        <span className="text-yellow-500">Pending...</span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AIChangingSection;

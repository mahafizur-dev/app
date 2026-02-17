import React from "react";
import { ArrowRight } from "lucide-react";
import useOnScreen from "../hooks/useOnScreen";

const ChooseYourAdventure = () => {
  const [ref1, isVisible1] = useOnScreen({ threshold: 0.1 });
  const [ref2, isVisible2] = useOnScreen({ threshold: 0.1 });

  return (
    <div
      id="adventure"
      className="bg-white py-24 px-4 sm:px-6 lg:px-8 rounded-t-[3rem] -mt-10 relative z-20 shadow-[0_-20px_60px_-15px_rgba(0,0,0,0.5)]"
    >
      <div className="max-w-7xl mx-auto">
        <h2 className="text-4xl md:text-5xl font-bold text-center text-slate-900 mb-16 tracking-tight">
          Choose Your Adventure
        </h2>

        <div className="grid md:grid-cols-2 gap-8">
          {/* Developer Card */}
          <div
            ref={ref1}
            className={`bg-[#050505] rounded-[2rem] p-8 md:p-12 relative overflow-hidden group hover:shadow-2xl hover:shadow-black/20 transition-all duration-700 border border-slate-800 fade-in-section ${isVisible1 ? "is-visible" : ""}`}
          >
            <div className="relative z-10 flex flex-col h-full justify-between">
              <div>
                <h3 className="text-3xl font-bold text-white mb-4 group-hover:text-[#2EC866] transition-colors">
                  Product Suggestion
                </h3>
                <p className="text-slate-400 mb-8 text-lg leading-relaxed">
                  Presswayy is the AI platform that helps you automate Product
                  Suggestions and more all without hiring.
                </p>

                <ul className="space-y-5 mb-12">
                  {[
                    "Scale faster with AI",
                    "support smarter decision making",
                    "automate everything with AI",
                  ].map((item, i) => (
                    <li
                      key={i}
                      className="flex items-start gap-3 text-slate-300 group-hover:translate-x-1 transition-transform duration-300"
                      style={{ transitionDelay: `${i * 100}ms` }}
                    >
                      <div className="mt-1.5 w-1.5 h-1.5 rounded-full bg-[#2EC866] shadow-[0_0_8px_#2EC866]"></div>
                      {item}
                    </li>
                  ))}
                </ul>
              </div>

              <button className="w-full bg-[#2EC866] hover:bg-[#25a955] text-black font-bold py-5 rounded-2xl transition-all transform group-hover:translate-y-[-2px] hover:shadow-lg">
                Chat with AI
              </button>
            </div>

            {/* Background Gradient Blob */}
            <div className="absolute -top-20 -right-20 w-80 h-80 bg-[#2EC866]/10 rounded-full blur-[80px] group-hover:bg-[#2EC866]/20 transition-all duration-700"></div>
          </div>

          {/* Business Card */}
          <div
            ref={ref2}
            className={`bg-[#050505] rounded-[2rem] p-8 md:p-12 relative overflow-hidden group hover:shadow-2xl hover:shadow-black/20 transition-all duration-700 border border-slate-800 fade-in-section ${isVisible2 ? "is-visible" : ""}`}
            style={{ transitionDelay: "200ms" }}
          >
            <div className="relative z-10 flex flex-col h-full justify-between">
              <div>
                <h3 className="text-3xl font-bold text-white mb-4 group-hover:text-blue-400 transition-colors">
                  Customer Support
                </h3>
                <p className="text-slate-400 mb-8 text-lg leading-relaxed">
                  Presswayy is the AI platform that helps you automate Customer
                  Support and more all without hiring.
                </p>

                <ul className="space-y-5 mb-12">
                  {[
                    "Scale faster with AI",
                    "support smarter decision making",
                    "automate everything with AI",
                  ].map((item, i) => (
                    <li
                      key={i}
                      className="flex items-start gap-3 text-slate-300 group-hover:translate-x-1 transition-transform duration-300"
                      style={{ transitionDelay: `${i * 100}ms` }}
                    >
                      <div className="mt-1.5 w-1.5 h-1.5 rounded-full bg-blue-500 shadow-[0_0_8px_#3b82f6]"></div>
                      {item}
                    </li>
                  ))}
                </ul>
              </div>

              <button className="w-full bg-transparent border border-slate-700 text-white hover:bg-white/5 font-bold py-5 rounded-2xl transition-all flex items-center justify-center gap-2 group-hover:border-white/30">
                Business Solutions{" "}
                <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
              </button>
            </div>

            {/* Background Gradient Blob */}
            <div className="absolute -bottom-20 -left-20 w-80 h-80 bg-blue-500/10 rounded-full blur-[80px] group-hover:bg-blue-500/20 transition-all duration-700"></div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ChooseYourAdventure;

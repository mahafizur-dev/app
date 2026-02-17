import React from "react";
import { ArrowRight, FileText, PlayCircle, BookOpen } from "lucide-react";

const Resources = () => {
  const resources = [
    {
      id: 1,
      category: "Blog Post",
      title: "The Future of AI in Product Management",
      description:
        "Explore how generative AI is reshaping the entire product lifecycle from ideation to launch.",
      icon: <FileText className="w-6 h-6 text-[#2EC866]" />,
      readTime: "5 min read",
      gradient: "from-[#2EC866]/20 to-transparent",
    },
    {
      id: 2,
      category: "Webinar",
      title: "Scaling Customer Support without Hiring",
      description:
        "Watch our deep dive into automating L1 support while maintaining high CSAT scores.",
      icon: <PlayCircle className="w-6 h-6 text-blue-400" />,
      readTime: "45 min watch",
      gradient: "from-blue-500/20 to-transparent",
    },
    {
      id: 3,
      category: "Case Study",
      title: "How TechCorp Reduced Churn by 15%",
      description:
        "A detailed breakdown of the strategies used to identify at-risk customers using AI.",
      icon: <BookOpen className="w-6 h-6 text-purple-400" />,
      readTime: "8 min read",
      gradient: "from-purple-500/20 to-transparent",
    },
  ];

  return (
    <div
      id="resources"
      className="bg-black py-24 px-4 sm:px-6 lg:px-8 border-t border-slate-900 relative overflow-hidden"
    >
      {/* Background Decor */}
      <div className="absolute top-0 left-0 w-full h-full overflow-hidden pointer-events-none">
        <div className="absolute top-1/2 right-0 -translate-y-1/2 w-[500px] h-[500px] bg-[#2EC866]/5 blur-[120px] rounded-full"></div>
      </div>

      <div className="max-w-7xl mx-auto relative z-10">
        <div className="flex flex-col md:flex-row justify-between items-end mb-16 gap-6">
          <div>
            <h2 className="text-4xl md:text-5xl font-bold text-white mb-4 tracking-tight">
              Latest <span className="text-[#2EC866]">Resources</span>
            </h2>
            <p className="text-slate-400 text-lg max-w-xl">
              Insights, guides, and stories to help you leverage AI for business
              growth.
            </p>
          </div>
          <button className="text-white hover:text-[#2EC866] font-semibold flex items-center gap-2 transition-colors group">
            View all resources
            <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
          </button>
        </div>

        <div className="grid md:grid-cols-3 gap-8">
          {resources.map((item) => (
            <div
              key={item.id}
              className="group relative bg-[#0A0A0A] border border-white/10 rounded-2xl p-8 hover:border-[#2EC866]/50 transition-all duration-300 hover:-translate-y-1"
            >
              {/* Card Gradient Glow */}
              <div
                className={`absolute top-0 right-0 w-32 h-32 bg-gradient-to-br ${item.gradient} blur-3xl opacity-0 group-hover:opacity-100 transition-opacity duration-500 rounded-full`}
              ></div>

              <div className="relative z-10 flex flex-col h-full justify-between">
                <div>
                  <div className="flex justify-between items-start mb-6">
                    <div className="p-3 bg-white/5 rounded-xl border border-white/5 group-hover:border-white/10 transition-colors">
                      {item.icon}
                    </div>
                    <span className="text-xs font-mono text-slate-500 uppercase tracking-wider">
                      {item.category}
                    </span>
                  </div>

                  <h3 className="text-xl font-bold text-white mb-3 group-hover:text-[#2EC866] transition-colors">
                    {item.title}
                  </h3>
                  <p className="text-slate-400 text-sm leading-relaxed mb-6">
                    {item.description}
                  </p>
                </div>

                <div className="flex items-center justify-between border-t border-white/5 pt-6 mt-auto">
                  <span className="text-xs text-slate-500 font-medium">
                    {item.readTime}
                  </span>
                  <span className="text-sm font-bold text-white group-hover:translate-x-1 transition-transform flex items-center gap-1 cursor-pointer">
                    Read Now <ArrowRight className="w-4 h-4" />
                  </span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Resources;

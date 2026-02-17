import React from "react";
import { Check, Zap, Users, MonitorSmartphone } from "lucide-react";

const Pricing = () => {
  const plans = [
    {
      name: "Basic",
      originalPrice: "Tk. 4,500",
      price: "Tk. 3,999",
      period: "/month",
      banner: "100 User free after Integration",
      features: [
        "500 Unique customers/month",
        "One time setup fee applicable",
        "Instant reply",
        "24/7 Service",
        "Trained on your business",
        "Connect your website/database",
        "Send replies to 100+ customers simultaneously",
        "Easy reacharge",
        "Can read images and voice",
        "Manual pause option",
        "Orders in google sheets",
        "Handle customer queries",
        "Take orders on website",
        "Courier tracking",
        "Transfer to human agent",
        "5% VAT applicable",
      ],
      cta: "Choose Plan",
      gradient: "from-orange-500/10 to-transparent",
      popular: false,
    },
    {
      name: "Standard",
      originalPrice: "Tk. 8,500",
      price: "Tk. 7,499",
      period: "/month",
      banner: "100 User free after Integration",
      features: [
        "1,000 Unique customers/month",
        "One time setup fee applicable",
        "Instant reply",
        "24/7 Service",
        "Trained on your business",
        "Connect your website/database",
        "Send replies to 100+ customers simultaneously",
        "Easy reacharge",
        "Can read images and voice",
        "Manual pause option",
        "Orders in google sheets",
        "Handle customer queries",
        "Take orders on website",
        "Courier tracking",
        "Transfer to human agent",
        "5% VAT applicable",
      ],
      cta: "Choose Plan",
      gradient: "from-orange-500/20 to-transparent",
      popular: true,
    },
    {
      name: "Premium",
      originalPrice: "Tk. 19,500",
      price: "Tk. 17,999",
      period: "/month",
      banner: "100 User free after Integration",
      features: [
        "2,500 Unique customers/month",
        "One time setup fee applicable",
        "Instant reply",
        "24/7 Service",
        "Trained on your business",
        "Connect your website/database",
        "Send replies to 100+ customers simultaneously",
        "Easy reacharge",
        "Can read images and voice",
        "Manual pause option",
        "Orders in google sheets",
        "Handle customer queries",
        "Take orders on website",
        "Courier tracking",
        "Transfer to human agent",
        "5% VAT applicable",
      ],
      cta: "Choose Plan",
      gradient: "from-orange-500/10 to-transparent",
      popular: false,
    },
  ];

  return (
    <div
      id="pricing"
      className="bg-slate-950 py-24 px-4 sm:px-6 lg:px-8 border-t border-white/5 relative overflow-hidden font-sans"
    >
      {/* Background Decor */}
      <div className="absolute inset-0 z-0 bg-[linear-gradient(to_right,#80808012_1px,transparent_1px),linear-gradient(to_bottom,#80808012_1px,transparent_1px)] bg-[size:32px_32px] [mask-image:radial-gradient(ellipse_60%_50%_at_50%_0%,#000_70%,transparent_100%)] pointer-events-none"></div>
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full max-w-3xl h-[400px] bg-orange-500/5 blur-[100px] rounded-full pointer-events-none"></div>

      <div className="max-w-7xl mx-auto relative z-10">
        {/* Header */}
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold text-white mb-6 tracking-tight">
            Transparent <span className="text-orange-500">Pricing</span> Plans
          </h2>
          <p className="text-slate-400 text-lg max-w-xl mx-auto mb-8">
            Select the package that fits your business needs. All plans include
            core AI features.
          </p>
        </div>

        {/* Pricing Cards */}
        <div className="grid md:grid-cols-3 gap-8">
          {plans.map((plan, index) => (
            <div
              key={index}
              className={`relative flex flex-col p-6 rounded-3xl border transition-all duration-300 hover:-translate-y-2 group ${
                plan.popular
                  ? "bg-slate-900/80 border-orange-500 shadow-[0_0_30px_-10px_rgba(249,115,22,0.3)]"
                  : "bg-[#0A0A0A]/80 border-white/10 hover:border-white/20"
              }`}
            >
              {/* Internal Glow */}
              <div
                className={`absolute inset-0 bg-gradient-to-b ${plan.gradient} opacity-20 rounded-3xl pointer-events-none`}
              ></div>

              {/* Top Section */}
              <div className="mb-6 relative z-10">
                <div className="flex justify-between items-start mb-6">
                  {/* Icon */}
                  <div className="bg-white/5 p-3 rounded-xl">
                    <MonitorSmartphone
                      className="w-8 h-8 text-white"
                      strokeWidth={1.5}
                    />
                  </div>

                  {/* Badge */}
                  <span className="bg-orange-500 text-white text-xs font-bold px-3 py-1 rounded-full uppercase tracking-wider">
                    {plan.name}
                  </span>
                </div>

                {/* Pricing Block */}
                <div className="flex flex-col mb-2">
                  <span className="text-slate-500 text-sm line-through decoration-slate-500/50 decoration-1 mb-1">
                    {plan.originalPrice}/month
                  </span>
                  <div className="flex items-baseline gap-1">
                    <span className="text-3xl font-bold text-white">
                      {plan.price}
                    </span>
                    <span className="text-slate-500 text-sm font-medium">
                      {plan.period}
                    </span>
                  </div>
                </div>

                {/* Banner */}
                <div className="bg-orange-600 w-full py-1.5 px-3 rounded text-center mb-6">
                  <span className="text-white text-xs font-bold">
                    {plan.banner}
                  </span>
                </div>

                <div className="h-px w-full bg-white/10 mb-6"></div>

                {/* Features */}
                <ul className="space-y-3 mb-8 flex-1">
                  {plan.features.map((feature, i) => (
                    <li
                      key={i}
                      className="flex items-start gap-3 text-slate-300 text-sm"
                    >
                      <div className="mt-0.5 shrink-0">
                        <Check
                          size={14}
                          className="text-[#2EC866]"
                          strokeWidth={3}
                        />
                      </div>
                      <span className="leading-tight">{feature}</span>
                    </li>
                  ))}
                </ul>
              </div>

              {/* CTA Button */}
              <button className="w-full py-3.5 rounded-lg font-bold transition-all relative z-10 bg-orange-600 text-white hover:bg-orange-700 shadow-lg hover:shadow-orange-500/25 mt-auto">
                {plan.cta}
              </button>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Pricing;

import React from "react";
import Head from "next/head";
import Navbar from "../components/Navbar";
import Hero from "../components/Hero";
import ChooseYourAdventure from "../components/ChooseYourAdventure";
import AIChangingSection from "../components/AIChangingSection";
import Resources from "../components/Resources";
import Pricing from "@/components/Pricing";
import Footer from "../components/Footer";

export default function Home() {
  return (
    <div className="font-sans antialiased bg-black text-slate-900 selection:bg-[#2EC866] selection:text-black">
      <Head>
        <title>Presswayy</title>
        <meta name="viewport" content="width=device-width, initial-scale=1" />
      </Head>

      <Navbar />
      <Hero />
      <ChooseYourAdventure />
      <AIChangingSection />
      <Resources />
      <Pricing />
      <Footer />

      {/* <div className="fixed bottom-6 left-1/2 -translate-x-1/2 w-[90%] max-w-2xl bg-[#1A1A1A]/90 backdrop-blur-md border border-white/10 p-4 rounded-xl flex flex-col sm:flex-row items-center justify-between gap-4 z-[60] shadow-2xl animate-in slide-in-from-bottom-10 fade-in duration-700 delay-1000">
        <p className="text-xs text-slate-400 text-center sm:text-left">
          We use cookies to make your interaction dynamic and personalized.
        </p>
        <div className="flex gap-2">
          <button className="px-4 py-2 rounded-lg bg-transparent border border-white/10 text-white text-xs font-bold hover:bg-white/5 transition-colors">
            Decline
          </button>
          <button className="px-4 py-2 rounded-lg bg-[#2EC866] text-black text-xs font-bold hover:bg-[#25a955] transition-colors">
            Accept
          </button>
        </div>
      </div> */}
    </div>
  );
}

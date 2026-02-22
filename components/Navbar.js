import React, { useState, useEffect } from "react";
import { Menu, X } from "lucide-react";
import useModalStore from "../store/useModalStore";

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  // Use store for opening modal
  const openModal = useModalStore((state) => state.openModal);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Smooth scroll handler
  const handleScrollTo = (e, id) => {
    e.preventDefault();
    setIsOpen(false); // Close mobile menu if open

    const element = document.querySelector(id);
    if (element) {
      element.scrollIntoView({ behavior: "smooth" });
    }
  };

  // Defined links with specific targets
  const navLinks = [
    { name: "Platform", href: "#adventure" },
    { name: "Solutions", href: "#solutions" },
    { name: "Resources", href: "#resources" },
    { name: "Pricing", href: "#pricing" },
  ];

  return (
    <nav
      className={`fixed w-full z-50 transition-all duration-500 ${scrolled ? "bg-black/90 backdrop-blur-lg py-4 border-b border-white/5" : "bg-black/50 backdrop-blur-sm py-6"}`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex justify-between items-center">
        {/* Logo */}
        <div
          className="flex items-center group cursor-pointer"
          onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
        >
          <img
            src="/logo.png"
            alt="Presswayy Logo"
            className="h-12 md:h-16 w-auto transition-transform duration-300 group-hover:scale-105"
          />
        </div>

        {/* Center Links (Desktop) */}
        <div className="hidden lg:flex items-center gap-8">
          {navLinks.map((item) => (
            <a
              key={item.name}
              href={item.href}
              onClick={(e) =>
                item.href.startsWith("#") ? handleScrollTo(e, item.href) : null
              }
              className="text-sm font-medium text-slate-400 hover:text-white transition-colors cursor-pointer"
            >
              {item.name}
            </a>
          ))}
        </div>

        {/* Right Actions */}
        <div className="hidden md:flex items-center gap-6">
          {/* Brand color applied to Get Started button & its shadow */}
          <button
            onClick={openModal}
            className="bg-[#FF6900] hover:bg-[#E65C00] text-white px-5 py-2 rounded-lg text-sm font-bold transition-all hover:scale-105 shadow-[0_0_15px_rgba(255,105,0,0.4)]"
          >
            Get Started
          </button>
        </div>

        {/* Mobile Toggle */}
        <button
          onClick={() => setIsOpen(!isOpen)}
          className="md:hidden text-white hover:text-[#FF6900] transition-colors"
        >
          {isOpen ? <X /> : <Menu />}
        </button>
      </div>

      {/* Mobile Menu */}
      {isOpen && (
        <div className="absolute top-full left-0 w-full bg-black/95 backdrop-blur-xl border-t border-slate-800 p-6 md:hidden flex flex-col gap-6 shadow-2xl animate-in slide-in-from-top-5">
          {navLinks.map((item) => (
            <a
              key={item.name}
              href={item.href}
              onClick={(e) =>
                item.href.startsWith("#")
                  ? handleScrollTo(e, item.href)
                  : setIsOpen(false)
              }
              className="text-slate-300 font-medium text-lg hover:text-white cursor-pointer"
            >
              {item.name}
            </a>
          ))}
          <button
            onClick={() => {
              openModal();
              setIsOpen(false);
            }}
            className="bg-[#FF6900] text-white w-full py-4 rounded-xl font-bold text-lg"
          >
            Get Started
          </button>
        </div>
      )}
    </nav>
  );
};

export default Navbar;

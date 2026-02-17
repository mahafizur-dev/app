import React from "react";
import {
  MapPin,
  Mail,
  Phone,
  CheckCircle,
  Facebook,
  Youtube,
  Instagram,
} from "lucide-react";

const Footer = () => {
  return (
    <footer className="bg-black text-white py-16 border-t border-slate-900 z-10 relative font-sans">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-12 gap-12 mb-16">
          {/* Column 1: Branding & Socials (Span 5 cols) */}
          <div className="md:col-span-5 space-y-6">
            {/* Logo Area */}
            <div>
              <h2 className="text-4xl font-bold tracking-tight text-white mb-1">
                press<span className="text-white">w</span>
                <span className="text-orange-500">▼</span>
                <span className="text-white">yy</span>
              </h2>
              <p className="text-sm font-medium text-white">
                Powered by CLAREx Tech.
              </p>
            </div>

            {/* BASIS / Member Logos Placeholder */}
            {/* Using a placeholder visual structure since actual image assets aren't local */}
            <div className="flex items-center gap-0 bg-white/10 w-fit p-1 rounded-sm">
              <div className="bg-gray-300 h-10 w-24 flex items-center justify-center text-[10px] text-black font-bold mr-1">
                MEMBER
              </div>
              <div className="bg-white h-10 w-24 flex items-center justify-center text-[10px] text-black font-bold">
                BASIS
              </div>
            </div>

            {/* Social Icons */}
            <div className="flex gap-4 pt-2">
              <a
                href="#"
                className="w-10 h-10 bg-orange-600 rounded-full flex items-center justify-center hover:bg-orange-700 transition-colors"
              >
                <Facebook size={20} fill="white" stroke="none" />
              </a>
              <a
                href="#"
                className="w-10 h-10 bg-orange-600 rounded-full flex items-center justify-center hover:bg-orange-700 transition-colors"
              >
                <Youtube size={20} fill="white" stroke="none" />
              </a>
              <a
                href="#"
                className="w-10 h-10 bg-orange-600 rounded-full flex items-center justify-center hover:bg-orange-700 transition-colors"
              >
                <Instagram size={20} />
              </a>
            </div>

            <p className="text-slate-400 text-sm pt-4 md:hidden">
              Copyright © 2026 Presswayy | Powered by CLAREx Tech
            </p>
          </div>

          {/* Column 2: Company Links (Span 3 cols) */}
          <div className="md:col-span-3">
            <h4 className="text-orange-500 font-bold text-lg mb-6">Company</h4>
            <ul className="space-y-4 text-base font-medium">
              <li>
                <a href="#" className="hover:text-orange-500 transition-colors">
                  Pricing
                </a>
              </li>
              <li>
                <a href="#" className="hover:text-orange-500 transition-colors">
                  Platform
                </a>
              </li>
              <li>
                <a href="#" className="hover:text-orange-500 transition-colors">
                  Solutions
                </a>
              </li>
              <li>
                <a href="#" className="hover:text-orange-500 transition-colors">
                  Resources
                </a>
              </li>
            </ul>
          </div>

          {/* Column 3: Contact Us (Span 4 cols) */}
          <div className="md:col-span-4">
            <h4 className="text-orange-500 font-bold text-lg mb-6">
              Contact Us
            </h4>
            <ul className="space-y-4 text-sm">
              <li className="flex items-start gap-3">
                <MapPin className="text-orange-500 w-5 h-5 shrink-0 mt-0.5" />
                <span className="leading-tight">
                  House 336, Lane 5, Baridhara DOHS, Dhaka, Bangladesh
                </span>
              </li>
              <li className="flex items-center gap-3">
                <Mail className="text-orange-500 w-5 h-5 shrink-0" />
                <span>hello@presswayy.com</span>
              </li>
              <li className="flex items-center gap-3">
                <Phone className="text-orange-500 w-5 h-5 shrink-0" />
                <span>01886168979</span>
              </li>
              <li className="flex items-center gap-3">
                <CheckCircle className="text-orange-500 w-5 h-5 shrink-0" />
                <span>TRAD/DNCC/029884/2022</span>
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="pt-8 border-t border-slate-900 flex flex-col md:flex-row justify-between items-center gap-4 text-sm font-bold">
          <div className="hidden md:block text-slate-400 font-normal">
            Copyright © 2026 Presswayy | Powered by CLAREx Tech
          </div>
          <div className="flex flex-wrap justify-center gap-8">
            <a
              href="#"
              className="text-white hover:text-orange-500 transition-colors"
            >
              About Us
            </a>
            <a
              href="#"
              className="text-white hover:text-orange-500 transition-colors"
            >
              Contact Us
            </a>
            <a
              href="#"
              className="text-white hover:text-orange-500 transition-colors"
            >
              Privacy Policy
            </a>
            <a
              href="#"
              className="text-white hover:text-orange-500 transition-colors"
            >
              Terms & Conditions
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;

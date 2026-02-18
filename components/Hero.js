import React, { useRef, useState, useEffect } from "react";
import { Fingerprint } from "lucide-react";
import {
  motion,
  useMotionTemplate,
  useMotionValue,
  useSpring,
} from "framer-motion";
import GetStartedModal from "./GetStartedModal";
import useModalStore from "../store/useModalStore";

// --- Custom Star Icon ---
const AIStarIcon = ({ className }) => (
  <svg
    viewBox="0 0 24 24"
    fill="currentColor"
    className={className}
    xmlns="http://www.w3.org/2000/svg"
  >
    <path d="M12 0L14.59 9.41L24 12L14.59 14.59L12 24L9.41 14.59L0 12L9.41 9.41L12 0Z" />
  </svg>
);

// --- Floating Particles Component ---
const FloatingParticles = () => {
  const [particles, setParticles] = useState([]);

  useEffect(() => {
    const particleCount = 20;
    const newParticles = Array.from({ length: particleCount }).map((_, i) => ({
      id: i,
      x: Math.random() * 100,
      y: Math.random() * 100,
      size: Math.random() * 3 + 1,
      duration: Math.random() * 20 + 10,
      delay: Math.random() * 5,
    }));
    setParticles(newParticles);
  }, []);

  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none z-0">
      {particles.map((p) => (
        <motion.div
          key={p.id}
          className="absolute rounded-full bg-[#2EC866]/30 blur-[1px]"
          style={{
            left: `${p.x}%`,
            top: `${p.y}%`,
            width: p.size,
            height: p.size,
          }}
          animate={{
            y: [0, -100, 0],
            x: [0, Math.random() * 50 - 25, 0],
            opacity: [0, 1, 0],
          }}
          transition={{
            duration: p.duration,
            repeat: Infinity,
            delay: p.delay,
            ease: "linear",
          }}
        />
      ))}
    </div>
  );
};

// --- Magnetic Button Component ---
const MagneticButton = ({ children }) => {
  const ref = useRef(null);
  const x = useMotionValue(0);
  const y = useMotionValue(0);

  const springConfig = { damping: 15, stiffness: 150, mass: 0.1 };
  const springX = useSpring(x, springConfig);
  const springY = useSpring(y, springConfig);

  const handleMouseMove = (e) => {
    const { clientX, clientY } = e;
    const { height, width, left, top } = ref.current.getBoundingClientRect();
    const middleX = clientX - (left + width / 2);
    const middleY = clientY - (top + height / 2);
    x.set(middleX * 0.3);
    y.set(middleY * 0.3);
  };

  const handleMouseLeave = () => {
    x.set(0);
    y.set(0);
  };

  return (
    <motion.div
      ref={ref}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      style={{ x: springX, y: springY }}
    >
      {children}
    </motion.div>
  );
};

const Hero = () => {
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);

  // Use Zustand store action
  const openModal = useModalStore((state) => state.openModal);

  function handleMouseMove({ clientX, clientY, currentTarget }) {
    let { left, top } = currentTarget.getBoundingClientRect();
    mouseX.set(clientX - left);
    mouseY.set(clientY - top);
  }

  return (
    <div
      className="relative bg-black min-h-screen flex flex-col justify-center items-center text-center px-4 overflow-hidden pt-10 group"
      onMouseMove={handleMouseMove}
    >
      {/* 1. Floating Particles */}
      <FloatingParticles />

      {/* 2. Cinematic Grain Texture */}
      <div className="pointer-events-none absolute inset-0 z-0 opacity-[0.05]">
        <svg className="h-full w-full">
          <filter id="noise">
            <feTurbulence
              type="fractalNoise"
              baseFrequency="0.8"
              numOctaves="4"
              stitchTiles="stitch"
            />
          </filter>
          <rect width="100%" height="100%" filter="url(#noise)" />
        </svg>
      </div>

      {/* 3. Perspective Grid */}
      <div className="absolute inset-0 z-0 bg-[linear-gradient(to_right,#80808012_1px,transparent_1px),linear-gradient(to_bottom,#80808012_1px,transparent_1px)] bg-[size:24px_24px] [mask-image:radial-gradient(ellipse_60%_50%_at_50%_0%,#000_70%,transparent_100%)]"></div>

      {/* Interactive Spotlight */}
      <motion.div
        className="pointer-events-none absolute -inset-px rounded-xl opacity-0 transition duration-300 group-hover:opacity-100 z-0"
        style={{
          background: useMotionTemplate`
            radial-gradient(
              650px circle at ${mouseX}px ${mouseY}px,
              rgba(46, 200, 102, 0.08),
              transparent 80%
            )
          `,
        }}
      />

      {/* Background Glow */}
      <motion.div
        animate={{
          scale: [1, 1.1, 1],
          opacity: [0.3, 0.5, 0.3],
        }}
        transition={{
          duration: 8,
          repeat: Infinity,
          ease: "easeInOut",
        }}
        className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] bg-[#2EC866]/5 blur-[120px] rounded-full pointer-events-none z-0"
      />

      <div className="relative z-10 max-w-6xl mx-auto flex flex-col items-center">
        <h1 className="text-6xl md:text-8xl lg:text-8xl font-semibold tracking-tighter leading-[0.9] mb-12 select-none">
          <span className="block text-neutral-500">The future</span>

          <span className="block text-neutral-500">of development</span>

          <div className="flex flex-wrap justify-center items-center gap-3 md:gap-6 mt-2 md:mt-4">
            <span className="text-neutral-500">is</span>

            {/* Fingerprint Icon - Static Position */}
            <div className="relative w-12 h-12 md:w-20 md:h-20 text-[#2EC866] flex items-center justify-center transition-transform hover:scale-110 duration-300">
              <Fingerprint className="w-full h-full" strokeWidth={1.5} />
              <motion.div
                initial={{ top: "0%" }}
                animate={{ top: "100%", opacity: [0, 1, 0] }}
                transition={{
                  duration: 2,
                  repeat: Infinity,
                  ease: "linear",
                }}
                className="absolute w-full h-[2px] bg-[#2EC866] shadow-[0_0_15px_#2EC866] opacity-80"
              />
            </div>

            {/* Human Text - Normal */}
            <span className="text-white font-medium tracking-tight">human</span>

            <span className="text-neutral-500 mx-2 text-4xl md:text-7xl font-light">
              +
            </span>

            {/* Star Icon - Static Position */}
            <div className="relative w-12 h-12 md:w-20 md:h-20 text-[#2EC866] flex items-center justify-center transition-transform hover:scale-110 duration-300">
              <motion.div
                animate={{ rotate: 360 }}
                transition={{ duration: 10, repeat: Infinity, ease: "linear" }}
                className="w-full h-full"
              >
                <AIStarIcon className="w-full h-full drop-shadow-[0_0_20px_rgba(46,200,102,0.6)]" />
              </motion.div>
              <div className="absolute inset-0 bg-[#2EC866] blur-xl opacity-20 animate-pulse"></div>
            </div>

            {/* AI Text - Normal */}
            <span className="text-neutral-500 font-medium tracking-tight">
              AI
            </span>
          </div>
        </h1>

        <p className="text-slate-400 text-lg md:text-xl max-w-xl mx-auto mb-16 leading-relaxed font-medium">
          Creating AI solutions for your business that help you accelerate
          growth and scale fast.
        </p>

        <div>
          <MagneticButton>
            <button
              onClick={openModal}
              className="group relative inline-flex h-14 items-center justify-center overflow-hidden rounded-xl bg-transparent border border-white/20 px-10 font-bold text-white transition-all duration-300 hover:border-[#2EC866] hover:bg-[#2EC866]/10 hover:shadow-[0_0_25px_rgba(46,200,102,0.2)]"
            >
              <span className="relative z-10 text-lg">Get Started</span>
              <div className="absolute -bottom-2 left-1/2 -translate-x-1/2 w-3/4 h-2 bg-[#2EC866] blur-[15px] opacity-60 group-hover:opacity-100 transition-opacity duration-300"></div>
            </button>
          </MagneticButton>
        </div>
      </div>

      {/* --- EXTERNAL MODAL COMPONENT (Managed via Zustand) --- */}
      <GetStartedModal />
    </div>
  );
};

export default Hero;

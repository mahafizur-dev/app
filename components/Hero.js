import React, { useRef, useState, useEffect } from "react";
import { Fingerprint } from "lucide-react";
import {
  motion,
  useMotionTemplate,
  useMotionValue,
  useSpring,
  useScroll,
  useTransform,
} from "framer-motion";
import GetStartedModal from "./GetStartedModal";
import useModalStore from "../store/useModalStore";

// --- Perfect Sharp Sparkle Star Icon (Matches exactly with image_ea5ac0.png) ---
// Quadratic Bezier Curve bebohar kora hoyeche ekdom sharp edge anar jonno
const SparkleStar = ({ className, color = "currentColor", blur = 0 }) => (
  <svg
    viewBox="0 0 100 100"
    className={className}
    style={{ filter: blur ? `blur(${blur}px)` : "none" }}
    xmlns="http://www.w3.org/2000/svg"
  >
    <path
      d="M 50 0 Q 50 50 100 50 Q 50 50 50 100 Q 50 50 0 50 Q 50 50 50 0 Z"
      fill={color}
    />
  </svg>
);

// --- Magical Shining AI Star Component ---
const MagicAIStar = () => {
  return (
    <div className="relative w-16 h-16 md:w-24 md:h-24 flex items-center justify-center mx-1 md:mx-2 transition-transform hover:scale-110 duration-500 z-20">
      {/* Background er jonno soft green glow (Glow komano hoyeche) */}
      <motion.div
        animate={{ opacity: [0.3, 0.6, 0.3], scale: [0.8, 1.0, 0.8] }}
        transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
        className="absolute inset-0 bg-[#00E571] blur-[15px] rounded-full mix-blend-screen opacity-40 pointer-events-none"
      />

      {/* Main star ebong dot gulo ek sathe smooth vabe ghurbe */}
      <motion.div
        animate={{ rotate: 360 }}
        transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
        className="relative w-full h-full flex items-center justify-center pointer-events-none"
      >
        {/* Layer 1: Outer heavy green glow (Blur komano hoyeche) */}
        <SparkleStar
          className="absolute w-[85%] h-[85%]"
          color="#00E571"
          blur={4}
        />

        {/* Layer 2: Main crisp green star shape */}
        <SparkleStar className="absolute w-[80%] h-[80%]" color="#0AD96E" />

        {/* Layer 3: Inner white core glow */}
        <SparkleStar
          className="absolute w-[35%] h-[35%]"
          color="#FFFFFF"
          blur={2}
        />

        {/* Layer 4: Pure white center star */}
        <SparkleStar className="absolute w-[25%] h-[25%]" color="#FFFFFF" />

        {/* Orbiting Dots - (Dot gulo choto kora hoyeche) */}
        {/* Top Right Boro Sada Dot */}
        <div className="absolute top-[15%] right-[18%] w-1.5 h-1.5 md:w-2 md:h-2 bg-white rounded-full shadow-[0_0_8px_#fff,0_0_12px_#00E571]" />

        {/* Top Left Choto Shobuj Dot */}
        <div className="absolute top-[38%] left-[10%] w-0.5 h-0.5 md:w-1 md:h-1 bg-[#00E571] rounded-full shadow-[0_0_4px_#00E571]" />

        {/* Bottom Left Majhari Shobuj Dot */}
        <div className="absolute bottom-[22%] left-[22%] w-1 h-1 md:w-1.5 md:h-1.5 bg-[#00E571] rounded-full shadow-[0_0_6px_#00E571]" />

        {/* Bottom Right Choto Shobuj Dot */}
        <div className="absolute bottom-[32%] right-[12%] w-0.5 h-0.5 md:w-1 md:h-1 bg-[#00E571] rounded-full shadow-[0_0_4px_#00E571]" />
      </motion.div>
    </div>
  );
};

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

  // --- Scroll Animation Hooks ---
  const { scrollY } = useScroll();

  // Scroll korle smooth scale down ebong fade out hobe
  const contentOpacity = useTransform(scrollY, [0, 400], [1, 0]);
  const contentY = useTransform(scrollY, [0, 500], [0, 150]);
  const contentScale = useTransform(scrollY, [0, 500], [1, 0.85]);

  // Zustand store theke openModal call kora hocche
  const openModal = useModalStore((state) => state.openModal);

  function handleMouseMove({ clientX, clientY, currentTarget }) {
    let { left, top } = currentTarget.getBoundingClientRect();
    mouseX.set(clientX - left);
    mouseY.set(clientY - top);
  }

  // --- Initial Load Animations (Staggered Fade In) ---
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2,
        delayChildren: 0.1,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 30, filter: "blur(8px)" },
    visible: {
      opacity: 1,
      y: 0,
      filter: "blur(0px)",
      transition: {
        duration: 0.8,
        ease: [0.2, 0.8, 0.2, 1],
      },
    },
  };

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

      {/* --- Main Content with Scroll & Load Animations --- */}
      <motion.div
        variants={containerVariants}
        initial="hidden"
        animate="visible"
        style={{ opacity: contentOpacity, y: contentY, scale: contentScale }}
        className="relative z-10 max-w-6xl mx-auto flex flex-col items-center"
      >
        <h1 className="text-6xl md:text-7xl lg:text-8xl font-semibold tracking-tighter leading-[0.9] mb-12 select-none flex flex-col items-center">
          <motion.span
            variants={itemVariants}
            className="block bg-clip-text text-transparent bg-gradient-to-r from-[#292828] via-[#636362] to-[#292828] pb-1"
          >
            The future
          </motion.span>

          <motion.span
            variants={itemVariants}
            className="block bg-clip-text text-transparent bg-gradient-to-r from-[#292828] via-[#636362] to-[#292828] pb-1"
          >
            of development
          </motion.span>

          <motion.div
            variants={itemVariants}
            className="flex flex-wrap justify-center items-center gap-3 md:gap-6 mt-2 md:mt-4"
          >
            <span className="text-neutral-500">is</span>

            {/* Fingerprint Icon */}
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

            {/* Human Text */}
            <span className="text-white font-medium tracking-tight">human</span>

            <span className="text-neutral-500 text-4xl md:text-7xl font-light">
              +
            </span>

            {/* --- REPLACED: NEW Perfect Match AI Star --- */}
            <MagicAIStar />

            {/* AI Text */}
            <span className="text-neutral-500 font-medium tracking-tight">
              AI
            </span>
          </motion.div>
        </h1>

        <motion.p
          variants={itemVariants}
          className="text-slate-400 text-lg md:text-xl max-w-xl mx-auto mb-16 leading-relaxed font-medium"
        >
          Creating AI solutions for your business that help you accelerate
          growth and scale fast.
        </motion.p>

        <motion.div variants={itemVariants}>
          <MagneticButton>
            <button
              onClick={openModal}
              className="group relative inline-flex h-14 items-center justify-center overflow-hidden rounded-xl bg-transparent border border-white/20 px-10 font-bold text-white transition-all duration-300 hover:border-[#2EC866] hover:bg-[#2EC866]/10 hover:shadow-[0_0_25px_rgba(46,200,102,0.2)]"
            >
              <span className="relative z-10 text-lg">Get Started</span>
              <div className="absolute -bottom-2 left-1/2 -translate-x-1/2 w-3/4 h-2 bg-[#2EC866] blur-[15px] opacity-60 group-hover:opacity-100 transition-opacity duration-300"></div>
            </button>
          </MagneticButton>
        </motion.div>
      </motion.div>

      {/* --- EXTERNAL MODAL COMPONENT --- */}
      <GetStartedModal />
    </div>
  );
};

export default Hero;

import { useEffect, useRef } from "react";
import Hls from "hls.js";
import { motion } from "motion/react";
import { ArrowRight } from "lucide-react";

interface HeroProps {
  onExplore: () => void;
}

export default function Hero({ onExplore }: HeroProps) {
  const videoRef = useRef<HTMLVideoElement>(null);
  const videoSrc = "https://stream.mux.com/T6oQJQ02cQ6N01TR6iHwZkKFkbepS34dkkIc9iukgy400g.m3u8";
  const posterSrc =
    "https://images.unsplash.com/photo-1647356191320-d7a1f80ca777?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxhYnN0cmFjdCUyMGRhcmslMjB0ZWNobm9sb2d5JTIwbmV1cmFsJTIwbmV0d29ya3xlbnwxfHx8fDE3Njg5NzIyNTV8MA&ixlib=rb-4.1.0&q=80&w=1080";

  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;

    if (Hls.isSupported()) {
      const hls = new Hls();
      hls.loadSource(videoSrc);
      hls.attachMedia(video);
      hls.on(Hls.Events.MANIFEST_PARSED, () => {
        video.play().catch((e) => console.log("Auto-play prevented:", e));
      });
      return () => {
        hls.destroy();
      };
    } else if (video.canPlayType("application/vnd.apple.mpegurl")) {
      video.src = videoSrc;
      video.addEventListener("loadedmetadata", () => {
        video.play().catch((e) => console.log("Auto-play prevented:", e));
      });
    }
  }, []);

  return (
    <section
      id="hero-section"
      className="relative w-full min-h-screen bg-[#000000] text-white overflow-hidden flex flex-col justify-center items-center"
    >
      {/* Background Video Layer */}
      <video
        id="hero-background-video"
        ref={videoRef}
        poster={posterSrc}
        muted
        loop
        playsInline
        autoPlay
        className="absolute inset-0 w-full h-full object-cover opacity-60 pointer-events-none"
      />

      {/* Video Overlay */}
      <div
        id="hero-video-overlay"
        className="absolute inset-0 bg-black/60 backdrop-blur-[2px] pointer-events-none"
      />

      {/* Decorative Gradients */}
      <div
        id="decorative-gradient-top-left"
        className="absolute top-[-20%] left-[20%] w-[600px] h-[600px] rounded-full bg-blue-900/20 blur-[120px] mix-blend-screen pointer-events-none"
      />
      <div
        id="decorative-gradient-bottom-right"
        className="absolute bottom-[-10%] right-[20%] w-[500px] h-[500px] rounded-full bg-indigo-900/20 blur-[120px] mix-blend-screen pointer-events-none"
      />

      {/* Content Container */}
      <div
        id="hero-content-container"
        className="relative z-10 max-w-5xl mx-auto px-6 flex flex-col items-center text-center mt-20 space-y-12"
      >
        {/* Pre-headline */}
        <motion.p
          id="hero-pre-headline"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="font-['Instrument_Serif',serif] text-3xl sm:text-5xl lg:text-[48px] leading-[1.1] text-white"
        >
          Understand documents at the speed of thought
        </motion.p>

        {/* Main Headline */}
        <motion.h1
          id="hero-main-headline"
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.2, duration: 0.6 }}
          className="font-['Instrument_Sans',sans-serif] font-semibold text-6xl sm:text-8xl lg:text-[136px] leading-[0.9] tracking-tighter bg-gradient-to-b from-white via-white to-[#b4c0ff] bg-clip-text text-transparent select-none"
        >
          Ask Your Documents
        </motion.h1>

        {/* Subheadline */}
        <motion.p
          id="hero-subheadline"
          initial={{ opacity: 0 }}
          animate={{ opacity: 0.7 }}
          transition={{ delay: 0.4, duration: 0.6 }}
          className="font-['Instrument_Sans',sans-serif] text-lg sm:text-[20px] leading-[1.65] text-white max-w-xl mx-auto"
        >
          Search, understand, and question your documents with local-first AI, semantic retrieval, and grounded answers.
        </motion.p>

        {/* CTA Buttons */}
        <motion.div
          id="hero-cta-buttons"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.6, duration: 0.5 }}
          className="flex flex-col sm:flex-row gap-6 items-center justify-center pt-2"
        >
          {/* Primary Button */}
          <button
            onClick={onExplore}
            id="hero-primary-cta"
            type="button"
            className="group pl-6 pr-2 py-2 rounded-full bg-white inline-flex items-center gap-4 transition-all duration-300 hover:shadow-[0_0_20px_rgba(255,255,255,0.3)] hover:scale-105 cursor-pointer"
          >
            <span className="font-['Instrument_Sans',sans-serif] font-medium text-lg text-[#0a0400]">
              Analyze a Document
            </span>
            <div
              id="hero-primary-cta-arrow"
              className="w-10 h-10 rounded-full bg-[#3054ff] group-hover:bg-[#2040e0] flex items-center justify-center transition-colors duration-200"
            >
              <ArrowRight className="w-5 h-5 text-white" />
            </div>
          </button>

          {/* Secondary Button */}
          <a
            id="hero-secondary-cta"
            href="#how-it-works"
            className="group inline-flex items-center gap-2 text-base font-medium px-4 py-2 rounded-lg text-white/70 hover:text-white backdrop-blur-sm hover:bg-white/5 transition-all duration-200"
          >
            <span>See How It Works</span>
            <ArrowRight className="w-4 h-4 transition-transform duration-200 group-hover:translate-x-1" />
          </a>
        </motion.div>
      </div>
    </section>
  );
}

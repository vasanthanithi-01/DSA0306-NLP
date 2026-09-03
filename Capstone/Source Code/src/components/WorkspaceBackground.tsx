import { useEffect, useRef } from "react";
import Hls from "hls.js";

const VIDEO_SRC =
  "https://stream.mux.com/T6oQJQ02cQ6N01TR6iHwZkKFkbepS34dkkIc9iukgy400g.m3u8";

const POSTER_SRC =
  "https://images.unsplash.com/photo-1647356191320-d7a1f80ca777?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxhYnN0cmFjdCUyMGRhcmslMjB0ZWNobm9sb2d5JTIwbmV1dHJhbCUyMG5ldHdvcmt8ZW58MXx8fHwxNzY4OTcyMjU1fDA&ixlib=rb-4.1.0&q=80&w=1080";

export default function WorkspaceBackground() {
  const videoRef = useRef<HTMLVideoElement>(null);

  useEffect(() => {
    const video = videoRef.current;

    if (!video) return;

    if (Hls.isSupported()) {
      const hls = new Hls({
        enableWorker: true,
        lowLatencyMode: false,
      });

      hls.loadSource(VIDEO_SRC);
      hls.attachMedia(video);

      hls.on(Hls.Events.MANIFEST_PARSED, () => {
        video.play().catch(() => {});
      });

      return () => {
        hls.destroy();
      };
    }

    if (video.canPlayType("application/vnd.apple.mpegurl")) {
      video.src = VIDEO_SRC;

      const playVideo = () => {
        video.play().catch(() => {});
      };

      video.addEventListener("loadedmetadata", playVideo);

      return () => {
        video.removeEventListener("loadedmetadata", playVideo);
      };
    }
  }, []);

  return (
    <>
      {/* Animated background video */}
      <video
        ref={videoRef}
        poster={POSTER_SRC}
        muted
        loop
        playsInline
        autoPlay
        className="
          fixed inset-0
          h-full w-full
          object-cover
          opacity-45
          pointer-events-none
          z-0
        "
      />

      {/* Main dark overlay */}
      <div
        className="
          fixed inset-0
          bg-black/70
          backdrop-blur-[2px]
          pointer-events-none
          z-[1]
        "
      />

      {/* Top blue glow */}
      <div
        className="
          fixed
          top-[-18%]
          left-[18%]
          w-[650px]
          h-[650px]
          rounded-full
          bg-blue-900/20
          blur-[130px]
          mix-blend-screen
          pointer-events-none
          z-[2]
        "
      />

      {/* Bottom indigo glow */}
      <div
        className="
          fixed
          bottom-[-15%]
          right-[15%]
          w-[600px]
          h-[600px]
          rounded-full
          bg-indigo-900/20
          blur-[130px]
          mix-blend-screen
          pointer-events-none
          z-[2]
        "
      />

      {/* Subtle center glow */}
      <div
        className="
          fixed
          top-[35%]
          left-[45%]
          w-[350px]
          h-[350px]
          rounded-full
          bg-blue-950/10
          blur-[110px]
          pointer-events-none
          z-[2]
        "
      />
    </>
  );
}
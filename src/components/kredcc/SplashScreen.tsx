import { useEffect, useState } from "react";
import { IMAGES } from "@/lib/games";

const SplashScreen = () => {
  const [phase, setPhase] = useState<"show" | "leave" | "done">("show");

  useEffect(() => {
    document.body.style.overflow = "hidden";
    const leaveTimer = setTimeout(() => setPhase("leave"), 2000);
    const doneTimer = setTimeout(() => {
      setPhase("done");
      document.body.style.overflow = "";
    }, 2700);
    return () => {
      clearTimeout(leaveTimer);
      clearTimeout(doneTimer);
      document.body.style.overflow = "";
    };
  }, []);

  if (phase === "done") return null;

  return (
    <div
      className={`fixed inset-0 z-[100] grid place-items-center bg-background overflow-hidden ${
        phase === "leave" ? "animate-splash-out" : ""
      }`}
      aria-hidden="true"
    >
      {/* Animated gradient blobs */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div
          className="absolute -top-32 -left-32 w-[28rem] h-[28rem] rounded-full opacity-40 blur-3xl"
          style={{
            background: "var(--gradient-primary, linear-gradient(135deg, hsl(var(--primary)), hsl(var(--accent))))",
            animation: "splash-blob 3s ease-in-out infinite",
          }}
        />
        <div
          className="absolute -bottom-32 -right-32 w-[32rem] h-[32rem] rounded-full opacity-40 blur-3xl"
          style={{
            background: "var(--gradient-primary, linear-gradient(135deg, hsl(var(--accent)), hsl(var(--primary))))",
            animation: "splash-blob 3.5s ease-in-out infinite reverse",
          }}
        />
      </div>

      {/* Logo + brand */}
      <div className="relative flex flex-col items-center gap-6">
        <div className="relative animate-splash-logo">
          <div className="absolute inset-0 gradient-bg rounded-3xl blur-2xl opacity-70 animate-pulse" />
          <img
            src={IMAGES.logo}
            alt="KredCC"
            className="relative w-24 h-24 md:w-28 md:h-28 rounded-3xl object-cover shadow-glow"
          />
        </div>

        <h1 className="text-4xl md:text-6xl font-extrabold tracking-tight overflow-hidden">
          <span className="inline-block animate-splash-text-1">Kred</span>
          <span className="inline-block gradient-text animate-splash-text-2">CC</span>
        </h1>

        <div className="flex items-center gap-2 animate-splash-tagline">
          <span className="relative flex h-2 w-2">
            <span className="absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75 animate-ping" />
            <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500" />
          </span>
          <p className="text-xs md:text-sm font-semibold text-muted-foreground tracking-wider uppercase">
            India's Fastest Gaming Top-Up
          </p>
        </div>

        {/* Loading bar */}
        <div className="w-48 md:w-64 h-1 rounded-full bg-muted overflow-hidden mt-2">
          <div className="h-full gradient-bg animate-splash-loader" />
        </div>
      </div>
    </div>
  );
};

export default SplashScreen;

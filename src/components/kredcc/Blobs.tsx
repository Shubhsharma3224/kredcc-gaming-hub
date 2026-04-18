const Blobs = () => (
  <div aria-hidden className="fixed inset-0 -z-10 overflow-hidden pointer-events-none">
    {/* Mesh background overlay */}
    <div className="absolute inset-0 bg-mesh opacity-70" />

    {/* Animated floating blobs */}
    <div
      className="blob animate-blob-float"
      style={{ top: "-12%", left: "-12%", width: 560, height: 560, background: "hsl(234 89% 66%)" }}
    />
    <div
      className="blob animate-blob-float"
      style={{ top: "25%", right: "-18%", width: 640, height: 640, background: "hsl(292 84% 61%)", animationDelay: "-6s" }}
    />
    <div
      className="blob animate-blob-float"
      style={{ bottom: "-18%", left: "18%", width: 580, height: 580, background: "hsl(262 83% 64%)", animationDelay: "-12s" }}
    />
    <div
      className="blob animate-blob-float"
      style={{ top: "55%", left: "40%", width: 380, height: 380, background: "hsl(210 89% 70%)", animationDelay: "-3s", opacity: 0.3 }}
    />

    {/* Subtle grid overlay for depth */}
    <div
      className="absolute inset-0 opacity-[0.025]"
      style={{
        backgroundImage:
          "linear-gradient(hsl(var(--foreground)) 1px, transparent 1px), linear-gradient(90deg, hsl(var(--foreground)) 1px, transparent 1px)",
        backgroundSize: "48px 48px",
      }}
    />
  </div>
);
export default Blobs;

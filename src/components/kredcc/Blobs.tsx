const Blobs = () => (
  <div aria-hidden className="fixed inset-0 -z-10 overflow-hidden pointer-events-none">
    {/* Premium mesh gradient backdrop */}
    <div
      className="absolute inset-0 opacity-80"
      style={{ background: "var(--gradient-mesh)" }}
    />

    {/* Animated floating blobs with richer colors */}
    <div
      className="blob animate-blob-float"
      style={{ top: "-14%", left: "-14%", width: 600, height: 600, background: "hsl(var(--grad-1))", opacity: 0.45 }}
    />
    <div
      className="blob animate-blob-float"
      style={{ top: "20%", right: "-18%", width: 680, height: 680, background: "hsl(var(--grad-3))", animationDelay: "-6s", opacity: 0.42 }}
    />
    <div
      className="blob animate-blob-float"
      style={{ bottom: "-20%", left: "15%", width: 620, height: 620, background: "hsl(var(--grad-2))", animationDelay: "-12s", opacity: 0.42 }}
    />
    <div
      className="blob animate-blob-float"
      style={{ top: "50%", left: "38%", width: 420, height: 420, background: "hsl(var(--grad-4))", animationDelay: "-3s", opacity: 0.28 }}
    />
    {/* Gold accent blob for premium warmth */}
    <div
      className="blob animate-blob-float"
      style={{ top: "8%", right: "30%", width: 320, height: 320, background: "hsl(var(--grad-gold))", animationDelay: "-9s", opacity: 0.18 }}
    />

    {/* Subtle grid overlay for depth */}
    <div
      className="absolute inset-0 opacity-[0.022]"
      style={{
        backgroundImage:
          "linear-gradient(hsl(var(--foreground)) 1px, transparent 1px), linear-gradient(90deg, hsl(var(--foreground)) 1px, transparent 1px)",
        backgroundSize: "56px 56px",
      }}
    />

    {/* Film noise texture for premium feel */}
    <div
      className="absolute inset-0 opacity-[0.04] mix-blend-overlay"
      style={{
        backgroundImage:
          "url(\"data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='3' /%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)'/%3E%3C/svg%3E\")",
      }}
    />
  </div>
);
export default Blobs;

const Blobs = () => (
  <div aria-hidden className="fixed inset-0 -z-10 overflow-hidden pointer-events-none">
    {/* Deep premium base wash */}
    <div className="absolute inset-0" style={{ background: "var(--gradient-luxe-base)" }} />

    {/* Animated aurora mesh — slow shifting premium gradient */}
    <div
      className="absolute inset-0 opacity-90 aurora-anim"
      style={{ background: "var(--gradient-aurora)", backgroundSize: "220% 220%" }}
    />

    {/* Floating premium blobs */}
    <div
      className="blob blob-anim"
      style={{ top: "-14%", left: "-10%", width: 520, height: 520, background: "hsl(var(--grad-1))", opacity: 0.45 }}
    />
    <div
      className="blob blob-anim"
      style={{ top: "12%", right: "-18%", width: 580, height: 580, background: "hsl(var(--grad-3))", animationDelay: "-6s", opacity: 0.42 }}
    />
    <div
      className="blob blob-anim"
      style={{ bottom: "-20%", left: "22%", width: 520, height: 520, background: "hsl(var(--grad-2))", animationDelay: "-12s", opacity: 0.4 }}
    />
    <div
      className="blob blob-anim hidden md:block"
      style={{ top: "40%", left: "40%", width: 360, height: 360, background: "hsl(var(--grad-gold))", animationDelay: "-9s", opacity: 0.18 }}
    />

    {/* Fine grid overlay */}
    <div
      className="absolute inset-0 opacity-[0.025] hidden md:block"
      style={{
        backgroundImage:
          "linear-gradient(hsl(var(--foreground)) 1px, transparent 1px), linear-gradient(90deg, hsl(var(--foreground)) 1px, transparent 1px)",
        backgroundSize: "56px 56px",
      }}
    />

    {/* Soft vignette for depth */}
    <div
      className="absolute inset-0"
      style={{
        background:
          "radial-gradient(ellipse at center, transparent 55%, hsl(252 40% 12% / 0.08) 100%)",
      }}
    />
  </div>
);
export default Blobs;

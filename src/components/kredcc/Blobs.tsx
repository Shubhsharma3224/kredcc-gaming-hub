const Blobs = () => (
  <div aria-hidden className="fixed inset-0 -z-10 overflow-hidden pointer-events-none">
    {/* Premium mesh gradient backdrop — static, GPU-cheap */}
    <div
      className="absolute inset-0 opacity-80"
      style={{ background: "var(--gradient-mesh)" }}
    />

    {/* Reduced blob count + smaller sizes for performance.
        Animations only run on devices that opt-in (md+ screens). */}
    <div
      className="blob blob-anim"
      style={{ top: "-12%", left: "-12%", width: 460, height: 460, background: "hsl(var(--grad-1))", opacity: 0.4 }}
    />
    <div
      className="blob blob-anim"
      style={{ top: "18%", right: "-16%", width: 520, height: 520, background: "hsl(var(--grad-3))", animationDelay: "-6s", opacity: 0.38 }}
    />
    <div
      className="blob blob-anim"
      style={{ bottom: "-18%", left: "18%", width: 480, height: 480, background: "hsl(var(--grad-2))", animationDelay: "-12s", opacity: 0.36 }}
    />

    {/* Subtle grid overlay for depth — static, very cheap */}
    <div
      className="absolute inset-0 opacity-[0.022] hidden md:block"
      style={{
        backgroundImage:
          "linear-gradient(hsl(var(--foreground)) 1px, transparent 1px), linear-gradient(90deg, hsl(var(--foreground)) 1px, transparent 1px)",
        backgroundSize: "56px 56px",
      }}
    />
  </div>
);
export default Blobs;
